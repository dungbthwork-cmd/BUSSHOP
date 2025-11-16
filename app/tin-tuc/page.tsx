"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"

const news = [
  {title:"Thanh toán MoMo – Giảm đến 50.000đ", date:"2025-08-26", tag:"Khuyến mãi", img:"/images/news/promo-momo.svg"},
  {title:"ZaloPay – Ưu đãi 25% cho khách mới", date:"2025-07-23", tag:"Khuyến mãi", img:"/images/news/promo-zalopay.svg"},
  {title:"VNPay – Hoàn tiền khi mua vé", date:"2025-10-10", tag:"Khuyến mãi", img:"/images/news/promo-vnpay.svg"},
]

export default function NewsPage(){
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Tin tức & Ưu đãi</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {news.map(n=> (
          <Card key={n.title} className="overflow-hidden">
            <Image src={n.img} alt={n.title} width={640} height={360} className="h-36 w-full object-cover" />
            <CardHeader><CardTitle className="text-base">{n.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Ngày: {n.date}</p>
              <p className="mt-2"><Badge>Thanh toán</Badge></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
