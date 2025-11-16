
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get("from") || "Hà Nội"
  const to = searchParams.get("to") || "Đà Lạt"
  const date = searchParams.get("date") || new Date().toISOString().slice(0,10)

  const sample = Array.from({length: 14}).map((_,i)=> ({
    id: `r${i+1}`, brand: i%2? "FUTA Bus":"Luxury Van Limousine",
    from, to, date,
    departAt: `${String(6 + (i%8)*2).padStart(2,"0")}:00`,
    price: 220000 + (i%7)*30000 + (i*5000),
    seats: 36, taken: Array.from({length: i%12}, (_,j)=> j+1),
    coachType: i%3? "Giường nằm":"Limousine"
  }))

  return NextResponse.json(sample)
}
