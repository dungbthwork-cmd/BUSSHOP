
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@/components/ui"
import Image from "next/image"

export default function LienHePage(){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [msg,setMsg]=useState("")
  const [ok,setOk]=useState(false)
  return (
    <section className="grid gap-6 md:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader><CardTitle>Gửi thông tin liên hệ</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div><Label>Họ tên</Label><Input value={name} onChange={e=>setName(e.target.value)} /></div>
          <div><Label>Email</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><Label>Nội dung</Label><textarea className="min-h-[120px] w-full rounded-2xl border p-2" value={msg} onChange={e=>setMsg(e.target.value)}></textarea></div>
         <Button onClick={()=>setOk(true)} className="btn-glow">Gửi</Button>
          {ok && <p className="text-green-600 text-sm">Đã gửi! Chúng tôi sẽ phản hồi sớm qua email/hotline.</p>}
        </CardContent>
      </Card>
      <div className="space-y-3">
        <Card>
          <CardHeader><CardTitle>Trung tâm CSKH</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <p>Hotline: <b>1900 6067</b></p>
            <p>Email: <b>hotro@futa.vn</b></p>
            <p>Thời gian: 24/7</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <Image src="/images/contact/map.svg" alt="map" width={960} height={320} className="h-40 w-full object-cover" />
        </Card>
      </div>
    </section>
  )
}
