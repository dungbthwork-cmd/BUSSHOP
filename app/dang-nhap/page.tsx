"use client"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button, Card, CardHeader, CardContent, CardTitle, Input, Label, Separator } from "@/components/ui"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("demo123")

  if (status === "loading") return <div className="text-sm text-muted-foreground">Đang tải phiên đăng nhập…</div>

  if (session?.user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader><CardTitle>Xin chào, {session.user.name || session.user.email}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Bạn đã đăng nhập.</p>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Đăng xuất</Button>
          <Separator />
          <Link className="underline text-sm" href="/">Về trang chủ</Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle>Đăng nhập</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button onClick={() => signIn("credentials", { email, password, redirect: true, callbackUrl: "/" })}>Đăng nhập</Button>
        <Separator />
        <p className="text-xs text-muted-foreground">Demo: nhận bất kỳ email/mật khẩu khác rỗng.</p>
      </CardContent>
    </Card>
  )
}
