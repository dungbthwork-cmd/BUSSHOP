
"use client"
import Image from "next/image"
import { motion } from "framer-motion"

const routes = [
  { from: 'Hà Nội', to: 'Sa Pa' },
  { from: 'Sài Gòn', to: 'Đà Lạt' },
  { from: 'Hà Nội', to: 'Ninh Bình' },
  { from: 'Sài Gòn', to: 'Phan Thiết' },
  { from: 'Hà Nội', to: 'Đà Nẵng' },
  { from: 'Sài Gòn', to: 'Nha Trang' },
]

export default function PopularRoutes() {
  const date = new Date().toISOString().slice(0,10)
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Tuyến phổ biến</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {routes.map((r, i) => (
          <motion.a key={r.from + r.to} href={`/search?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}&date=${date}`}
            className="flex items-center gap-4 rounded-3xl border bg-white p-4 card-hover btn-glow"
            whileHover={{ scale: 1.02, y: -1 }} transition={{ duration: 0.22, delay: i * 0.02 }}>
            <Image src="/images/route-thumb.svg" alt="route" width={96} height={64} className="h-16 w-24 rounded-xl object-cover" />
            <div>
              <p className="font-medium">{r.from} → {r.to}</p>
              <p className="text-xs text-muted-foreground">Tìm chuyến</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
