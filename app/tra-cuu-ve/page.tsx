
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@/components/ui"

export default function TraCuuVePage(){
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [result, setResult] = useState<any|null>(null)

  const submit = async () => {
    setResult({
      code: code || "AB12CD",
      status: "Đã thanh toán",
      route: "Hà Nội → Sa Pa",
      date: "2025-12-01",
      seats: ["B12","B13"],
      price: 640000
    })
  }

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_400px]">
      <Card>
        <CardHeader><CardTitle>Tra cứu thông tin đặt vé</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div><Label>Số điện thoại</Label><Input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="VD: 090..." /></div>
          <div><Label>Mã vé</Label><Input value={code} onChange={e=>setCode(e.target.value)} placeholder="VD: AB12CD" /></div>
          <Button onClick={submit}>Tra cứu</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Kết quả</CardTitle></CardHeader>
        <CardContent className="text-sm">
          {!result ? <p className="text-muted-foreground">Nhập SĐT & Mã vé để xem thông tin.</p> :
          <div className="space-y-1">
            <p>Mã vé: <b>{result.code}</b></p>
            <p>Trạng thái: <b>{result.status}</b></p>
            <p>Hành trình: <b>{result.route}</b></p>
            <p>Ngày đi: <b>{result.date}</b></p>
            <p>Ghế: <b>{result.seats.join(", ")}</b></p>
            <p>Thanh toán: <b>{result.price.toLocaleString()}đ</b></p>
          </div>}
        </CardContent>
      </Card>
    </section>
  )
}
