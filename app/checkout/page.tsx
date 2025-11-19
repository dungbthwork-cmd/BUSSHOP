"use client"

import { useSearchParams, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Separator,
  Badge,
} from "@/components/ui/primitives"
import { useState } from "react"

type Errors = {
  fullName?: string
  phone?: string
  email?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const sp = useSearchParams()

  const route = {
    id: sp.get("routeId") ?? "",
    from: sp.get("from") ?? "",
    to: sp.get("to") ?? "",
    date: sp.get("date") ?? "",
    departAt: sp.get("departAt") ?? "",
    price: Number(sp.get("price") ?? "0"),
    brand: sp.get("brand") ?? "",
  }

  const seats = (sp.get("seats") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const total = route.price * seats.length

  // ---- state form thuần ----
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Errors = {}
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Nhập họ tên"
    }
    if (!phone.trim() || phone.trim().length < 8) {
      newErrors.phone = "SĐT không hợp lệ"
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Email không hợp lệ"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // hợp lệ -> push sang /payment (demo)
    const params = new URLSearchParams({
      routeId: route.id,
      from: route.from,
      to: route.to,
      date: route.date,
      departAt: route.departAt,
      brand: route.brand,
      price: String(route.price),
      seats: seats.join(","),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      total: String(total),
    })

    router.push(`/payment?${params.toString()}`)
  }

  return (
    <div className="bg-slate-50 pb-10 pt-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:flex-row">
        {/* Cột chọn ghế + đón trả */}
        <div className="flex-1 space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Chọn ghế
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 py-4 text-sm">
              <p className="text-xs text-slate-600">
                Bạn đã chọn {seats.length} ghế trên tuyến {route.from} –{" "}
                {route.to} lúc {route.departAt} ngày {route.date}.
              </p>
              <div className="flex flex-wrap gap-2">
                {seats.map((s) => (
                  <Badge key={s} variant="default">
                    Ghế {s}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                (Demo FE) Sơ đồ ghế chi tiết được hiển thị ở bước trước.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Thông tin đón trả
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 py-4 text-sm">
              <div>
                <Label className="mb-1 block text-xs uppercase text-slate-500">
                  Điểm đón
                </Label>
                <Input defaultValue="(Bến xe / Văn phòng)" />
              </div>
              <div>
                <Label className="mb-1 block text-xs uppercase text-slate-500">
                  Điểm trả
                </Label>
                <Input defaultValue="(Trung chuyển / Văn phòng)" />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Ghi chú: thông tin đón/trả là demo để minh họa giao diện,
                chưa kết nối API thực.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cột thông tin khách + tóm tắt */}
        <div className="flex-[1.1] space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 py-4 text-sm">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <Label className="mb-1 block text-xs uppercase text-slate-500">
                    Họ và tên
                  </Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-xs uppercase text-slate-500">
                      Số điện thoại
                    </Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs uppercase text-slate-500">
                      Email
                    </Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3 text-[11px] leading-relaxed text-slate-700">
                  <p className="font-semibold text-orange-700">
                    Điều khoản &amp; lưu ý
                  </p>
                  <p>
                    Quý khách vui lòng có mặt tại bến xuất phát trước giờ xe
                    khởi hành ít nhất 30 phút, mang theo mã vé hoặc CMND/CCCD.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-amber-600 text-sm font-semibold text-white shadow-lg hover:opacity-95"
                >
                  Thanh toán
                </Button>
              </form>
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
                {route.from || "—"} – {route.to || "—"}
              </p>
              <p className="text-xs text-slate-600">
                Thời gian xuất bến: {route.departAt || "—"} ngày{" "}
                {route.date || "—"}
              </p>
              <p className="text-xs text-slate-600">
                Số ghế: {seats.join(", ") || "—"}
              </p>
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-sm">
                <span>Giá vé lượt đi</span>
                <span>
                  {route.price.toLocaleString()}đ x {seats.length}
                </span>
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
