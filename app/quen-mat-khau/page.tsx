
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@/components/ui"
import Link from "next/link"

export default function QuenMatKhauPage(){
  const [email,setEmail]=useState("")
  const [sent,setSent]=useState(false)
  return (
    <section className="mx-auto max-w-md space-y-4">
      <Card>
        <CardHeader><CardTitle>Quên mật khẩu</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div><Label>Email</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/></div>
          <Button className="btn-glow" onClick={()=>setSent(true)}>Gửi liên kết đặt lại</Button>
          {sent && <p className="text-xs text-green-600">Đã gửi liên kết đặt lại mật khẩu tới email của bạn (demo).</p>}
          <div className="text-xs text-muted-foreground">
            <Link href="/dang-nhap" className="underline">Quay lại đăng nhập</Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
