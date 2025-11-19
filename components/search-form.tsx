"use client"

import { useRouter } from "next/navigation"
import {
  Button,
  Input,
  Label,
  Calendar,
} from "@/components/ui"
import { ArrowLeftRight, Minus, Plus, MapPin } from "lucide-react"
import { useState } from "react"

const SUGGESTIONS = [
  "Hà Nội",
  "Sài Gòn",
  "TP.HCM",
  "Đà Lạt",
  "Sa Pa",
  "Ninh Bình",
  "Đà Nẵng",
  "Nha Trang",
  "Phan Thiết",
  "Cần Thơ",
  "Buôn Ma Thuột",
  "Vũng Tàu",
  "Huế",
]

function toISODate(d: Date) {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy.toISOString().slice(0, 10)
}

export default function SearchForm() {
  const router = useRouter()

  // --- state thuần cho form ---
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [qty, setQty] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [fromSuggestOpen, setFromSuggestOpen] = useState(false)
  const [toSuggestOpen, setToSuggestOpen] = useState(false)

  const [errorFrom, setErrorFrom] = useState<string | null>(null)
  const [errorTo, setErrorTo] = useState<string | null>(null)

  const swapFromTo = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSelectSuggestion = (field: "from" | "to", value: string) => {
    if (field === "from") {
      setFrom(value)
      setErrorFrom(null)
      setFromSuggestOpen(false)
    } else {
      setTo(value)
      setErrorTo(null)
      setToSuggestOpen(false)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // validate đơn giản
    let ok = true
    if (!from.trim()) {
      setErrorFrom("Vui lòng nhập điểm đi")
      ok = false
    }
    if (!to.trim()) {
      setErrorTo("Vui lòng nhập điểm đến")
      ok = false
    }
    if (!ok) return

    setIsSubmitting(true)
    try {
      const params = new URLSearchParams({
        from: from.trim(),
        to: to.trim(),
        date: toISODate(date),
        passengers: String(qty),
      })
      router.push(`/search?${params.toString()}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-2xl bg-white/80 p-4 shadow-xl backdrop-blur"
    >
      <div className="grid gap-3 md:grid-cols-[1.2fr,auto,1.2fr]">
        {/* Điểm đi */}
        <div>
          <Label htmlFor="from" className="mb-1 block text-sm font-medium">
            ĐIỂM ĐI
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              id="from"
              className="pl-9"
              placeholder="Ví dụ: Sài Gòn"
              autoComplete="off"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value)
                if (errorFrom) setErrorFrom(null)
              }}
              onFocus={() => setFromSuggestOpen(true)}
            />
            {errorFrom && (
              <p className="mt-1 text-xs text-red-500">{errorFrom}</p>
            )}
            {fromSuggestOpen && (
              <div className="absolute z-20 mt-1 max-h-40 w-full overflow-auto rounded-xl border bg-white text-sm shadow">
                {SUGGESTIONS.filter((s) =>
                  s.toLowerCase().includes(from.toLowerCase()),
                ).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-50"
                    onClick={() => handleSelectSuggestion("from", s)}
                  >
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{s}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="flex w-full justify-end px-3 py-1 text-[11px] text-slate-500"
                  onClick={() => setFromSuggestOpen(false)}
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nút đổi chiều */}
        <div className="flex items-center justify-center pt-5 md:pt-7">
          <button
            type="button"
            onClick={swapFromTo}
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Điểm đến */}
        <div>
          <Label htmlFor="to" className="mb-1 block text-sm font-medium">
            ĐIỂM ĐẾN
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              id="to"
              className="pl-9"
              placeholder="Ví dụ: Đà Lạt"
              autoComplete="off"
              value={to}
              onChange={(e) => {
                setTo(e.target.value)
                if (errorTo) setErrorTo(null)
              }}
              onFocus={() => setToSuggestOpen(true)}
            />
            {errorTo && (
              <p className="mt-1 text-xs text-red-500">{errorTo}</p>
            )}
            {toSuggestOpen && (
              <div className="absolute z-20 mt-1 max-h-40 w-full overflow-auto rounded-xl border bg-white text-sm shadow">
                {SUGGESTIONS.filter((s) =>
                  s.toLowerCase().includes(to.toLowerCase()),
                ).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-50"
                    onClick={() => handleSelectSuggestion("to", s)}
                  >
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{s}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="flex w-full justify-end px-3 py-1 text-[11px] text-slate-500"
                  onClick={() => setToSuggestOpen(false)}
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ngày đi + số khách + nút submit */}
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.3fr),auto,auto] md:items-end">
        {/* Ngày đi */}
        <div>
          <Label className="mb-1 block text-sm font-medium">NGÀY ĐI</Label>
          <Calendar
            selected={date}
            onSelect={(d) => d && setDate(d)}
          />
        </div>

        {/* Số hành khách */}
        <div>
          <Label className="mb-1 block text-sm font-medium">HÀNH KHÁCH</Label>
          <div className="inline-flex items-center rounded-2xl border bg-white px-2 py-1.5 text-sm">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-3 min-w-[1.5rem] text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Tối đa 10 hành khách / lượt.
          </p>
        </div>

        {/* Submit */}
        <div>
          <Button
            type="submit"
            className="mt-1 w-full rounded-2xl bg-amber-600 text-sm font-semibold text-white shadow-lg hover:opacity-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang tìm chuyến..." : "Tìm chuyến"}
          </Button>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Gợi ý: gõ vài ký tự để thấy gợi ý thành phố; nhấn vào gợi ý để chọn;
        dùng nút mũi tên để đổi chiều nhanh.
      </p>
    </form>
  )
}
