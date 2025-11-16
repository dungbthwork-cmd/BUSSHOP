"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { searchSchema } from "@/lib/validators"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button, Input, Label, Popover, PopoverTrigger, PopoverContent, Calendar } from "@/components/ui"
import { format } from "date-fns"
import { ArrowLeftRight, Minus, Plus, MapPin } from "lucide-react"
import { useMemo, useState } from "react"

const SUGGESTIONS = [
  "Hà Nội", "Sài Gòn", "TP.HCM", "Đà Lạt", "Sa Pa", "Ninh Bình", "Đà Nẵng",
  "Nha Trang", "Phan Thiết", "Cần Thơ", "Buôn Ma Thuột", "Vũng Tàu", "Huế"
]

export default function SearchForm() {
  const router = useRouter()
  const [roundTrip] = useState(false)
  const [qty, setQty] = useState(1)
  const [focusFrom, setFocusFrom] = useState(false)
  const [focusTo, setFocusTo] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "",
      to: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  })

  const fromValue = watch("from") || ""
  const toValue = watch("to") || ""
  const dateValue = watch("date") || format(new Date(), "yyyy-MM-dd")

  const fromList = useMemo(() => SUGGESTIONS
    .filter(s => s.toLowerCase().includes(fromValue.toLowerCase()) && s !== toValue)
    .slice(0, 7), [fromValue, toValue])

  const toList = useMemo(() => SUGGESTIONS
    .filter(s => s.toLowerCase().includes(toValue.toLowerCase()) && s !== fromValue)
    .slice(0, 7), [toValue, fromValue])

  const chooseFrom = (val: string) => { setValue("from", val); setFocusFrom(false) }
  const chooseTo = (val: string) => { setValue("to", val); setFocusTo(false) }

  const swap = () => {
    const f = getValues("from"); const t = getValues("to");
    setValue("from", t || ""); setValue("to", f || "")
  }

  const onSubmit = (data: z.infer<typeof searchSchema>) => {
    const params = new URLSearchParams({ ...data, rt: String(roundTrip), n: String(qty) } as any)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-3xl glass border p-4 shadow-soft">
      {/* Hàng 1: Điểm đi / nút đổi / Điểm đến */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
        <div className="relative">
          <Label htmlFor="from">Điểm đi</Label>
          <Input
            id="from"
            placeholder="VD: Hà Nội"
            {...register("from")}
            onFocus={() => setFocusFrom(true)}
            onBlur={() => setTimeout(() => setFocusFrom(false), 120)}
            autoComplete="off"
          />
          {focusFrom && (
            <div className="absolute left-0 right-0 top-[72px] z-50 rounded-2xl border bg-white shadow">
              {(fromList.length === 0)
                ? <div className="px-3 py-2 text-xs text-muted-foreground">Không tìm thấy</div>
                : fromList.map(val => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => chooseFrom(val)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4 text-emerald-600" />{val}
                  </button>
                ))
              }
            </div>
          )}
        </div>

        <div className="flex items-end justify-center pb-1">
          <button
            type="button"
            aria-label="Đổi điểm đi/đến"
            onClick={swap}
            className="mb-[2px] inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <Label htmlFor="to">Điểm đến</Label>
          <Input
            id="to"
            placeholder="VD: Sa Pa"
            {...register("to")}
            onFocus={() => setFocusTo(true)}
            onBlur={() => setTimeout(() => setFocusTo(false), 120)}
            autoComplete="off"
          />
          {focusTo && (
            <div className="absolute left-0 right-0 top-[72px] z-50 rounded-2xl border bg-white shadow">
              {(toList.length === 0)
                ? <div className="px-3 py-2 text-xs text-muted-foreground">Không tìm thấy</div>
                : toList.map(val => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => chooseTo(val)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4 text-rose-600" />{val}
                  </button>
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* Hàng 2: Ngày / Số vé / nút tìm chuyến */}
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_auto] gap-2">
        <div>
          <Label>Ngày đi</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-full items-center justify-between rounded-2xl border bg-white px-3 text-left text-sm"
              >
                <span>{format(new Date(dateValue), "dd/MM/yyyy")}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <Calendar
                selected={new Date(dateValue)}
                onSelect={(d: Date) => setValue("date", d.toISOString().slice(0, 10))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Số vé</Label>
          <div className="flex h-11 items-center justify-between rounded-2xl border bg-white px-3 text-sm">
            <button
              type="button"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span>{qty}</span>
            <button
              type="button"
              onClick={() => setQty(q => q + 1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="btn-glow h-11 w-full">
            Tìm chuyến
          </Button>
        </div>
      </div>

      {/* Hiển thị tuyến đang chọn */}
      <p className="text-xs">
        <span className="text-muted-foreground">Tuyến đang chọn:&nbsp;</span>
        <span className="font-semibold text-gray-900">
          {fromValue || "Chưa chọn"}
        </span>
        <span className="mx-1 text-muted-foreground">↔</span>
        <span className="font-semibold text-gray-900">
          {toValue || "Chưa chọn"}
        </span>
      </p>

      <p className="text-xs text-muted-foreground">
        Gợi ý: gõ vài ký tự để thấy gợi ý thành phố; nhấn ↵ để chọn. Dùng nút mũi tên để đổi chiều nhanh.
      </p>
    </form>
  )
}
