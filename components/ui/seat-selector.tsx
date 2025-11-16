
"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Badge } from "@/components/ui"
import { useState } from "react"

type Props = { open: boolean; onOpenChange: (o:boolean)=>void; route?: { id:string; from:string; to:string; date:string; departAt:string; seats:number; taken:number[]; price:number; brand:string } | null }

export default function SeatSelector({ open, onOpenChange, route }: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [deck, setDeck] = useState<'Tầng 1'|'Tầng 2'>('Tầng 1')
  if (!route) return null
  const seatGrid = Array.from({ length: route.seats }, (_,i)=>i+1)

  const toggle = (i:number) => setSelected(s => {
    if (s.includes(i)) return s.filter(x=>x!==i)
    if (s.length >= 5) return s
    return [...s, i]
  })

  const clear = () => setSelected([])

  const findAdjacentPair = (): number[] => {
    const pairs: [number,number][] = []
    for (let i=1;i<=route.seats;i++){
      const col = i % 5 // 1,2,3(aisle),4,0
      if (col===1 && (i+1)<=route.seats && (i+1)%5===2) pairs.push([i,i+1])
      if (col===4 && (i+1)<=route.seats && (i+1)%5===0) pairs.push([i,i+1])
    }
    for (const [a,b] of pairs){
      if (!route.taken.includes(a) && !route.taken.includes(b) && !selected.includes(a) && !selected.includes(b)){
        return [a,b]
      }
    }
    return []
  }

  const pickPair = () => {
    const pair = findAdjacentPair()
    if (pair.length){
      setSelected(s => {
        const room = 5 - s.length
        if (room <= 0) return s
        return [...s, ...pair.slice(0, room)]
      })
    } else {
      alert("Không còn 2 ghế liền nhau trống.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle>Chọn ghế – {route.brand}</DialogTitle></DialogHeader>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-gray-200 border" /> Hết chỗ</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border" /> Trống</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border border-black" /> Đang chọn (tối đa 5)</span>
          </div>
          <div className="flex items-center gap-2">
            <button className={`rounded-xl border px-3 py-1 text-sm ${deck==="Tầng 1"?"bg-gray-50":""}`} onClick={()=>setDeck("Tầng 1")}>Tầng 1</button>
            <button className={`rounded-xl border px-3 py-1 text-sm ${deck==="Tầng 2"?"bg-gray-50":""}`} onClick={()=>setDeck("Tầng 2")}>Tầng 2</button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 p-2">
          {seatGrid.map(n => {
            const isAisle = n % 5 === 3
            if (isAisle) return <div key={`gap-${n}`} className="w-3" />
            const disabled = route.taken.includes(n)
            const isSelected = selected.includes(n)
            return (
              <button key={n} disabled={disabled} onClick={()=>toggle(n)}
                className={`rounded-xl border p-3 text-sm transition-all ${disabled ? 'bg-gray-200 text-gray-400' : isSelected ? 'border-black shadow-sm' : 'hover:bg-gray-50'}`}
                title={disabled ? "Đã bán" : `Ghế ${n}`}>
                {n}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Đã chọn: {selected.join(', ') || '—'}</Badge>
            <Badge variant="secondary">Tổng: {(selected.length * route.price).toLocaleString()}đ</Badge>
            <button onClick={clear} className="rounded-xl border px-3 py-1 text-xs">Xóa chọn</button>
            <button onClick={pickPair} className="rounded-xl border px-3 py-1 text-xs">Chọn 2 ghế liền</button>
          </div>
          <Button onClick={()=>{
            const url = new URL(location.origin + '/checkout')
            url.searchParams.set('routeId', route.id)
            if (selected.length) url.searchParams.set('seats', selected.join(','))
            location.assign(url.toString())
          }}>Tiếp tục</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
