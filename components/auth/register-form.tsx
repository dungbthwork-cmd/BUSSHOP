
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@/components/ui"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [pass, setPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !pass || !confirm) {
      setMessage("Vui lòng điền đầy đủ thông tin (demo, chưa nối API).")
      return
    }
    if (pass !== confirm) {
      setMessage("Mật khẩu nhập lại không khớp.")
      return
    }
    setMessage("Đăng ký demo thành công. Sau này chỉ cần nối API thật.")
  }

  return (
    <section className="mx-auto max-w-md space-y-4">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Tạo tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label>Họ tên</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label>Số điện thoại</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0987 654 321" />
            </div>
            <div>
              <Label>Mật khẩu</Label>
              <Input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
            </div>
            <div>
              <Label>Nhập lại mật khẩu</Label>
              <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" />
            </div>
            {message && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                {message}
              </p>
            )}
            <Button type="submit" className="btn-glow w-full">
              Đăng ký
            </Button>
            <p className="text-xs text-muted-foreground">
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <Link href="/dieu-khoan" className="underline">
                Điều khoản sử dụng
              </Link>
              .
            </p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="text-sm flex items-center justify-between gap-3">
          <span>Đã có tài khoản?</span>
          <Link href="/dang-nhap" className="underline text-amber-700">
            Đăng nhập
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
