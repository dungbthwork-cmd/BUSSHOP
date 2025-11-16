
"use client"
import Image from "next/image"
import { motion } from "framer-motion"

const ops = [
  { name: 'FUTA Bus', img: '/images/operators/futa.svg' },
  { name: 'Thành Bưởi', img: '/images/operators/thanhbuoi.svg' },
  { name: 'Luxury Limousine', img: '/images/operators/limousine.svg' },
  { name: 'Camel Travel', img: '/images/operators/camel.svg' },
  { name: 'Gia Phúc', img: '/images/operators/giaphuc.svg' },
]

export default function Operators() {
  const date = new Date().toISOString().slice(0,10)
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Các hãng xe nổi bật</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {ops.map((o, i) => (
          <motion.a key={o.name} href={`/search?from=Hà%20Nội&to=Sa%20Pa&date=${date}`}
            className="rounded-3xl border bg-white p-2 card-hover"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.02 }}>
            <div className="overflow-hidden rounded-2xl">
              <Image src={o.img} alt={o.name} width={320} height={200} className="h-32 w-full object-cover" />
            </div>
            <div className="px-2 py-3">
              <p className="font-medium">{o.name}</p>
              <p className="text-xs text-muted-foreground">Xem chuyến</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
