
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@/components/ui"
import Link from "next/link"

export default function DangKyPage(){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  return (
    <section className="mx-auto max-w-md space-y-4">
      <Card>
        <CardHeader><CardTitle>Tạo tài khoản</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div><Label>Họ tên</Label><Input value={name} onChange={e=>setName(e.target.value)} /></div>
          <div><Label>Email</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><Label>Mật khẩu</Label><Input type="password" value={pass} onChange={e=>setPass(e.target.value)} /></div>
          <Button className="btn-glow">Đăng ký</Button>
          <div className="text-xs text-muted-foreground">Bằng việc đăng ký, bạn đồng ý với <a href="/dieu-khoan" className="underline">Điều khoản</a>.</div>
        </CardContent>
      </Card>
      <Card><CardContent className="text-sm">Đã có tài khoản? <Link href="/dang-nhap" className="underline">Đăng nhập</Link></CardContent></Card>
    </section>
  )
}
