
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, Card, CardHeader, CardContent, CardTitle, Input, Label, Separator } from "@/components/ui"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu (demo, chưa nối API).")
      return
    }
    setMessage("Đăng nhập demo thành công. Sau này chỉ cần nối API thật.")
  }

  return (
    <section className="mx-auto max-w-md space-y-4">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {message && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                {message}
              </p>
            )}
            <Button type="submit" className="btn-glow w-full">
              Đăng nhập
            </Button>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Đây là form mock theo giao diện FUTA. Chưa kết nối backend, chỉ xử lý trên frontend.
            </p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between gap-3 text-sm">
          <span>Chưa có tài khoản?</span>
          <Link href="/dang-ky" className="underline text-amber-700">
            Đăng ký ngay
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
