"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Badge,
} from "@/components/ui"
import { useState } from "react"

type RouteForSeat = {
  id: string
  from: string
  to: string
  departAt: string
  seats: number
  taken: number[]
  price: number
  brand: string
}

type Props = {
  open: boolean
  onOpenChange: (o: boolean) => void
  route: RouteForSeat | null
  /** callback cho trang search tự điều hướng sang /checkout */
  onContinue?: (selectedSeats: number[]) => void
}

export default function SeatSelector({
  open,
  onOpenChange,
  route,
  onContinue,
}: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [deck, setDeck] = useState<"Tầng 1" | "Tầng 2">("Tầng 1")

  if (!route) return null

  const seatGrid = Array.from({ length: route.seats }, (_, i) => i + 1)

  const toggle = (i: number) =>
    setSelected((s) => {
      if (s.includes(i)) return s.filter((x) => x !== i)
      if (s.length >= 5) return s // giới hạn tối đa 5 ghế / lượt
      return [...s, i]
    })

  const clear = () => setSelected([])

  const findAdjacentPair = () => {
    const takenSet = new Set(route.taken)
    for (let i = 1; i < route.seats; i++) {
      if (!takenSet.has(i) && !takenSet.has(i + 1)) {
        return [i, i + 1]
      }
    }
    return null
  }

  const pickPair = () => {
    const pair = findAdjacentPair()
    if (!pair) {
      alert("Không còn 2 ghế liền nhau trống.")
      return
    }
    setSelected((s) => {
      const room = 5 - s.length
      if (room <= 0) return s
      return [...s, ...pair.slice(0, room)]
    })
  }

  const handleContinueClick = () => {
    if (!selected.length) return
    if (onContinue) {
      // dùng flow mới: truyền ghế đã chọn cho trang search
      onContinue(selected)
    } else {
      // fallback cũ: giữ nguyên behaviour cho code cũ (nếu có)
      const url = new URL(window.location.origin + "/checkout")
      url.searchParams.set("routeId", route.id)
      url.searchParams.set("seats", selected.join(","))
      window.location.assign(url.toString())
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Chọn ghế – {route.brand} ({route.from} → {route.to})
          </DialogTitle>
        </DialogHeader>

        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDeck("Tầng 1")}
              className={`rounded-full border px-3 py-1 ${
                deck === "Tầng 1"
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : ""
              }`}
            >
              Tầng 1
            </button>
            <button
              type="button"
              onClick={() => setDeck("Tầng 2")}
              className={`rounded-full border px-3 py-1 ${
                deck === "Tầng 2"
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : ""
              }`}
            >
              Tầng 2
            </button>
          </div>
          <span>Chọn tối đa 5 ghế / lượt</span>
        </div>

        {/* Lưới ghế đơn giản – demo */}
        <div className="mb-4 grid grid-cols-5 gap-2 text-xs">
          {seatGrid.map((n) => {
            // chia nửa: n <= seats/2: tầng 1, > seats/2: tầng 2
            const isDeck1 = n <= route.seats / 2
            const isOnCurrentDeck =
              (deck === "Tầng 1" && isDeck1) ||
              (deck === "Tầng 2" && !isDeck1)
            if (!isOnCurrentDeck) return null

            const disabled = route.taken.includes(n)
            const isSelected = selected.includes(n)

            return (
              <button
                key={n}
                type="button"
                disabled={disabled}
                onClick={() => toggle(n)}
                className={`flex h-8 items-center justify-center rounded-xl border text-xs transition-all ${
                  disabled
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : isSelected
                    ? "border-black bg-emerald-50 font-semibold shadow-sm"
                    : "hover:bg-gray-50"
                }`}
                title={disabled ? "Đã bán" : `Ghế ${n}`}
              >
                {n}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">
              Đã chọn: {selected.join(", ") || "—"}
            </Badge>
            <Badge variant="secondary">
              Tổng: {(selected.length * route.price).toLocaleString()}đ
            </Badge>
            <button
              type="button"
              onClick={clear}
              className="rounded-xl border px-3 py-1 text-xs"
            >
              Xóa chọn
            </button>
            <button
              type="button"
              onClick={pickPair}
              className="rounded-xl border px-3 py-1 text-xs"
            >
              Chọn 2 ghế liền
            </button>
          </div>
          <Button onClick={handleContinueClick}>Tiếp tục</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
