
"use client"
import SearchForm from "@/components/search-form"
import PopularRoutes from "@/components/popular-routes"
import Operators from "@/components/operators"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Clock3, Ticket as TicketIcon, CreditCard, TrainFront, Plane, BusFront } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [mode, setMode] = useState<"bus"|"train"|"flight">("bus")

  return (
    <section className="space-y-12">
      <div className="relative overflow-hidden rounded-3xl border shadow-soft">
        <Image src="/images/hero-bg.svg" alt="hero" width={1600} height={600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-10 p-6 md:p-10 space-y-6">
          <div className="inline-flex rounded-2xl border bg-white/70 backdrop-blur p-1">
            {[
              {k:"bus", label:"Xe khách", icon:<BusFront className="h-4 w-4"/>},
              {k:"train", label:"Tàu hỏa", icon:<TrainFront className="h-4 w-4"/>},
              {k:"flight", label:"Máy bay", icon:<Plane className="h-4 w-4"/>},
            ].map(t=>(
              <button key={t.k} onClick={()=>setMode(t.k as any)}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm ${mode===t.k?'bg-white shadow':''}`}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h1 className="text-gradient text-4xl font-extrabold md:text-5xl leading-tight">
                So sánh & đặt vé {mode==="bus"?"xe khách":mode==="train"?"tàu hỏa":"máy bay"} – nhanh & mượt
              </h1>
              <p className="max-w-prose text-gray-700">
                So sánh giá, giờ khởi hành và tổng thời gian di chuyển. Lọc linh hoạt, chọn ghế trực quan, mTicket tiện lợi.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl glass p-3 flex items-center gap-2"><Clock3 className="h-4 w-4"/>Thời gian thực</div>
                <div className="rounded-2xl glass p-3 flex items-center gap-2"><ShieldCheck className="h-4 w-4"/>Bảo đảm & hỗ trợ</div>
                <div className="rounded-2xl glass p-3 flex items-center gap-2"><TicketIcon className="h-4 w-4"/>mTicket điện tử</div>
                <div className="rounded-2xl glass p-3 flex items-center gap-2"><CreditCard className="h-4 w-4"/>Nhiều kênh thanh toán</div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white/50 p-4 backdrop-blur border">
              <SearchForm />
              <p className="mt-2 text-xs text-muted-foreground">Gợi ý: Hà Nội ↔ Sa Pa • Sài Gòn ↔ Đà Lạt • Hà Nội ↔ Ninh Bình</p>
            </motion.div>
          </div>
        </div>
      </div>

      <Operators />
      <PopularRoutes />

      <div className="rounded-3xl border hero-gradient p-6 shadow-soft">
        <p className="text-lg font-semibold">Ưu đãi thanh toán ví điện tử • Quét QR lên xe</p>
        <p className="text-sm text-muted-foreground">Áp dụng trên Web/App & MoMo, VNPay, ZaloPay, ShopeePay.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Kết nối hệ sinh thái FUTA Group</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {["Xe Phương Trang","Xe buýt","Xe hợp đồng","Giao hàng"].map(s=>(
            <div key={s} className="rounded-2xl border p-4 text-sm">{s}</div>
          ))}
        </div>
      </section>
    </section>
  )
}
