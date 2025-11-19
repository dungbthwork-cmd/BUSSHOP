"use client"

import { useSearchParams } from "next/navigation"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Label,
    Separator,
} from "@/components/ui/primitives"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { paymentSchema } from "@/lib/validators"
import { z } from "zod"

type PaymentForm = z.infer<typeof paymentSchema>

const METHODS = [
    { id: "vietqr", label: "Thanh toán VietQR" },
    { id: "futa", label: "FUTAPay" },
    { id: "zalopay", label: "ZaloPay" },
    { id: "vnpay", label: "VNPAY" },
    { id: "shopee", label: "ShopeePay" },
    { id: "momo", label: "MoMo" },
    { id: "atm", label: "Thẻ ATM nội địa" },
    { id: "visa", label: "Thẻ Visa/Master/JCB" },
]

export default function PaymentPage() {
    const sp = useSearchParams()

    const route = {
        from: sp.get("from") ?? "",
        to: sp.get("to") ?? "",
        date: sp.get("date") ?? "",
        departAt: sp.get("departAt") ?? "",
        brand: sp.get("brand") ?? "",
        price: Number(sp.get("price") ?? "0"),
    }

    const seats = (sp.get("seats") ?? "").split(",").filter(Boolean)
    const fullName = sp.get("fullName") ?? ""
    const phone = sp.get("phone") ?? ""
    const email = sp.get("email") ?? ""
    const total = Number(sp.get("total") ?? "0")


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PaymentForm>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            method: "futa",
            accept: false,
        },
    })

    const selectedMethod = watch("method")

    const onSubmit = (values: PaymentForm) => {
        console.log("Payment submit", { values, route, seats, fullName })
        alert("Demo: thanh toán thành công (frontend mock).")
    }

    return (
        <div className="bg-slate-50 pb-10 pt-6">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:flex-row">
                {/* Danh sách phương thức + QR */}
                <div className="flex-[1.2] space-y-4">
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">
                                Chọn phương thức thanh toán
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 py-4 lg:flex-row">
                            <form
                                className="flex-1 space-y-2 text-sm"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="space-y-1">
                                    {METHODS.map((m) => (
                                        <label
                                            key={m.id}
                                            className="flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
                                        >
                                            <input
                                                type="radio"
                                                value={m.id}
                                                {...register("method")}
                                                className="h-4 w-4"
                                            />
                                            <span>{m.label}</span>
                                        </label>
                                    ))}
                                    {errors.method && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.method.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-2 flex items-start gap-2 text-xs">
                                    <input
                                        type="checkbox"
                                        {...register("accept")}
                                        className="mt-[3px] h-4 w-4"
                                    />
                                    <Label className="text-xs text-slate-700">
                                        Tôi đã đọc và đồng ý với điều khoản &amp; chính sách
                                        của FUTA Bus Lines.
                                    </Label>
                                </div>
                                {errors.accept && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.accept.message}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="mt-3 rounded-2xl bg-amber-600 text-sm font-semibold text-white shadow-lg hover:opacity-95"
                                >
                                    Xác nhận thanh toán
                                </Button>
                            </form>

                            <div className="flex-1 rounded-2xl bg-white p-4 text-sm">
                                <p className="mb-2 text-xs text-slate-500">
                                    Tổng thanh toán
                                </p>
                                <p className="mb-4 text-3xl font-bold text-orange-600">
                                    {total.toLocaleString()}đ
                                </p>
                                <div className="mb-3 flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
                                    QR demo cho phương thức{" "}
                                    <span className="ml-1 font-semibold">
                                        {METHODS.find((m) => m.id === selectedMethod)?.label}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    Đây là màn hình minh họa QR thanh toán, chưa kết nối cổng
                                    thanh toán thực tế.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tóm tắt thông tin hành khách & chuyến */}
                <div className="flex-1 space-y-4">
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">
                                Thông tin hành khách
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 py-4 text-sm">
                            <p>
                                <span className="font-semibold">Họ và tên:</span>{" "}
                                {fullName || "—"}
                            </p>
                            <p>
                                <span className="font-semibold">Số điện thoại:</span>{" "}
                                {phone || "—"}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {email || "—"}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">
                                Thông tin lượt đi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 py-4 text-sm">
                            <p className="font-semibold">
                                {route.from} – {route.to}
                            </p>
                            <p className="text-xs text-slate-600">
                                Thời gian xuất bến: {route.departAt} ngày {route.date}
                            </p>
                            <p className="text-xs text-slate-600">
                                Số ghế: {seats.join(", ") || "—"}
                            </p>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between text-sm">
                                <span>Giá vé lượt đi</span>
                                <span>{total.toLocaleString()}đ</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-semibold text-orange-600">
                                <span>Tổng tiền</span>
                                <span>{total.toLocaleString()}đ</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
