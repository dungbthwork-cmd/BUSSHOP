"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema, paymentSchema } from "@/lib/validators";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
  Separator,
} from "@/components/ui";
import { useMemo, useState } from "react";
import {
  mockCreateTicket,
  mockCreatePayment,
  mockVerifyPayment,
} from "@/lib/mockclient";

type PassengerForm = z.infer<typeof passengerSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
  const search = useSearchParams();
  const router = useRouter();

  const routeId = search.get("routeId") || "";
  const seatsParam = search.get("seats") || "";
  const seatList = useMemo(
    () => (seatsParam ? seatsParam.split(",").filter(Boolean) : []),
    [seatsParam]
  );

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passengerForm = useForm<PassengerForm>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
    },
  });

  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: "momo",
      accept: false,
    } as any,
  });

  const handlePassengerSubmit = passengerForm.handleSubmit(async (values) => {
    if (!routeId || !seatList.length) {
      setError("Thiếu thông tin tuyến hoặc ghế đã chọn.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const ticket = await mockCreateTicket({
        routeId,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        seats: seatList,
      });
      setTicketId(ticket.id);
      setStep(2);
    } catch (e: any) {
      setError(e?.message || "Không tạo được vé. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  });

  const handlePaymentSubmit = paymentForm.handleSubmit(async (values) => {
    if (!ticketId) {
      setError("Chưa có vé để thanh toán.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payment = await mockCreatePayment(ticketId, values.method);
      setPaymentId(payment.id);
      await mockVerifyPayment(payment.id, "SUCCESS");
      setStep(3);
    } catch (e: any) {
      setError(e?.message || "Lỗi thanh toán. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 lg:px-0">
      <h1 className="text-xl font-semibold">Thanh toán vé xe</h1>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[2fr,1.3fr]">
        {/* Cột trái: 3 bước */}
        <div className="space-y-4">
          {/* Bước 1: Hành khách */}
          {step === 1 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">
                  1. Thông tin hành khách
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <form className="space-y-3" onSubmit={handlePassengerSubmit}>
                  <div>
                    <Label>Họ tên</Label>
                    <Input {...passengerForm.register("fullName")} />
                    <p className="mt-1 text-xs text-red-500">
                      {passengerForm.formState.errors.fullName?.message}
                    </p>
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <Input {...passengerForm.register("phone")} />
                    <p className="mt-1 text-xs text-red-500">
                      {passengerForm.formState.errors.phone?.message}
                    </p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" {...passengerForm.register("email")} />
                    <p className="mt-1 text-xs text-red-500">
                      {passengerForm.formState.errors.email?.message}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-glow"
                    >
                      {loading ? "Đang tạo vé..." : "Tiếp tục"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Bước 2: Thanh toán */}
          {step === 2 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">
                  2. Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handlePaymentSubmit}>
                  <div className="space-y-2 text-sm">
                    <Label>Chọn phương thức</Label>
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      {...paymentForm.register("method")}
                    >
                      <option value="momo">MoMo</option>
                      <option value="vnpay">VNPay</option>
                      <option value="zalopay">ZaloPay</option>
                      <option value="shopeepay">ShopeePay</option>
                      <option value="qr">QR ngân hàng</option>
                      <option value="cod">Thanh toán khi lên xe</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2 text-xs">
                    <input
                      type="checkbox"
                      className="mt-1"
                      {...paymentForm.register("accept")}
                    />
                    <span>
                      Tôi đồng ý với điều khoản và chính sách hoàn/hủy vé.
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-red-500">
                    {
                      paymentForm.formState.errors.accept
                        ?.message as any /* "Bạn cần đồng ý điều khoản" */
                    }
                  </p>

                  <div className="flex justify-between gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Quay lại
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-glow"
                    >
                      {loading ? "Đang thanh toán..." : "Thanh toán"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Bước 3: Hoàn tất */}
          {step === 3 && (
            <Card className="rounded-2xl border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-base text-green-700">
                  3. Hoàn tất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-green-800">
                <p>Thanh toán thành công! Vé của bạn đã được ghi nhận.</p>
                <p>
                  Mã vé: <span className="font-semibold">{ticketId}</span>
                </p>
                <p>
                  Mã thanh toán:{" "}
                  <span className="font-semibold">{paymentId}</span>
                </p>
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => router.push("/")}
                >
                  Về trang chủ
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cột phải: tóm tắt */}
        <Card className="h-fit rounded-2xl bg-slate-50/60">
          <CardHeader>
            <CardTitle className="text-base">Tóm tắt đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">
                Tuyến: {search.get("from") || "–"} →{" "}
                {search.get("to") || "–"}
              </p>
              <p className="text-xs text-muted-foreground">
                Ngày đi: {search.get("date") || "–"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Ghế đã chọn</p>
              <p className="font-medium">
                {seatList.join(", ") || "Chưa chọn"}
              </p>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Đây là mock checkout dùng dữ liệu giả lập. Khi gắn backend thật,
              chỉ cần thay endpoint mà không đổi UI.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
