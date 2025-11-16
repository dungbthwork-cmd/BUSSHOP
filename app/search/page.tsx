
"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Card, CardContent, CardHeader, CardTitle, Button, Skeleton, Badge, Separator, Slider,
  Dialog, DialogContent, DialogHeader, DialogTitle
} from   "@/components/ui/primitives";
import { useFilterStore } from "@/store/filter-store";
import SeatSelector from "@/components/ui/seat-selector";
import { useEffect, useMemo, useState } from "react";
import { Bus, ArrowUpDown, MapPin, Clock3, BadgePercent } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { searchRoutes as mockSearchRoutes } from "@/lib/mockclient";

type UiRoute = {
  id: string;
  from: string;
  to: string;
  date: string;
  departAt: string;
  durationMin: number;
  price: number;
  brand: string;
  operatorId: string;
  seats: number;
  taken: number[];
  pickups: string[];
  dropoffs: string[];
};

const BRANDS = ["FUTA Bus", "Thành Bưởi", "Luxury Van Limousine", "Camel Travel"];

export default function SearchPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "";
  const to = sp.get("to") || "";
  const date = sp.get("date") || "";

  const {
    brands, departureHours, priceRange,
    toggleBrand, toggleHour, setPriceRange, setMorning, setAfternoon, setEvening, clearAll
  } = useFilterStore();

  const [sort, setSort] = useState<"price"|"time"|"rating">("price");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [selecting, setSelecting] = useState<UiRoute | null>(null);
  const [liveRoute, setLiveRoute] = useState<UiRoute | null>(null);
  const [liveOpen, setLiveOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["routes", { from, to, date }],
    queryFn: () => mockSearchRoutes({ from, to, date }) as Promise<UiRoute[]>,
  });

  const filtered = (data ?? [])
    .map(r => ({
      ...r,
      amenities: ["Wifi", "Điều hòa", "Nước uống", "Bảo hiểm"] as const,
      rating: 4.2,
      reviews: 420,
      pickup: r.pickups?.[0] || "Bến xe trung tâm / Flexi pick-up",
      dropoff: r.dropoffs?.[0] || "Trung tâm thành phố / Trả tận nơi",
      promo: Math.random() > .5 ? "GIẢM 10% hôm nay" : ""
    }))
    .filter(r => {
      const hour = Number(r.departAt.split(":")[0]);
      const brandOk = brands.length ? brands.includes(r.brand) : true;
      const priceOk = r.price >= priceRange[0] && r.price <= priceRange[1];
      const hourOk = departureHours.length ? departureHours.includes(hour) : true;
      return brandOk && priceOk && hourOk;
    });

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "price") arr.sort((a,b)=> a.price - b.price);
    else if (sort === "time") arr.sort((a,b)=> Number(a.departAt.split(":")[0]) - Number(b.departAt.split(":")[0]));
    else arr.sort((a,b)=> (b.rating??0) - (a.rating??0));
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const current = useMemo(
    () => sorted.slice((page-1)*perPage, page*perPage),
    [sorted, page]
  );

  useEffect(()=>{ setPage(1); }, [from, to, date, brands, departureHours, priceRange]);

  const handleSeatContinue = (selectedSeats: number[]) => {
    if (!selecting || !selectedSeats.length) return;
    const seatsStr = selectedSeats.join(",");
    router.push(`/checkout?routeId=${selecting.id}&seats=${encodeURIComponent(seatsStr)}`);
  };

  return (
    <section className="mx-auto flex max-w-6xl gap-8 px-4 py-6 lg:px-0">
      <aside className="hidden w-64 space-y-6 rounded-2xl border bg-white p-5 shadow-sm lg:block">
        <div>
          <p className="mb-3 text-sm font-semibold">Hãng xe</p>
          <div className="flex flex-wrap gap-2">
            {BRANDS.map(b => (
              <Badge
                key={b}
                variant={brands.includes(b) ? "default" : "outline"}
                onClick={() => toggleBrand(b)}
                className="cursor-pointer"
              >
                {b}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">Giờ đi</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button onClick={()=>setMorning()} className="rounded-full border px-2 py-0.5">Sáng</button>
            <button onClick={()=>setAfternoon()} className="rounded-full border px-2 py-0.5">Chiều</button>
            <button onClick={()=>setEvening()} className="rounded-full border px-2 py-0.5">Tối</button>
            <button onClick={()=>clearAll()} className="rounded-full border px-2 py-0.5">Xóa lọc</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[6,8,10,12,14,16,18,20].map(h => (
              <Badge
                key={h}
                variant={departureHours.includes(h) ? 'default' : 'outline'}
                onClick={() => toggleHour(h)}
                className="cursor-pointer"
              >
                {h}:00
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">Giá</p>
          <Slider
            min={100000}
            max={1000000}
            step={50000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {priceRange[0].toLocaleString()}đ – {priceRange[1].toLocaleString()}đ
          </p>
        </div>
      </aside>

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">
              {from || "Chưa chọn"} → {to || "Chưa chọn"} {date && `(${date})`}
            </h1>
            <p className="text-xs text-muted-foreground">
              Chúng tôi tìm thấy {sorted.length} chuyến phù hợp.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>Sắp xếp:</span>
            <Button size="sm" variant={sort==='price'?'default':'outline'} onClick={()=>setSort('price')}>Giá</Button>
            <Button size="sm" variant={sort==='time'?'default':'outline'} onClick={()=>setSort('time')}>Giờ đi</Button>
            <Button size="sm" variant={sort==='rating'?'default':'outline'} onClick={()=>setSort('rating')}>Đánh giá</Button>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {Array.from({length:3}).map((_,i)=>(
              <Skeleton key={i} className="h-32 w-full rounded-2xl"/>
            ))}
          </div>
        )}

        {!isLoading && !sorted.length && (
          <Card className="rounded-2xl">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Không có chuyến phù hợp. Hãy nới lỏng bộ lọc.
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {current.map(item => (
            <motion.div key={item.id} layout>
              <Card className="overflow-hidden rounded-2xl border bg-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-gradient-to-r from-orange-50/60 to-amber-50/60">
                  <CardTitle className="flex items-center gap-3 text-sm">
                    <Image src="/images/route-thumb.svg" alt="route" width={48} height={32} className="h-8 w-12 rounded-lg object-cover" />
                    {item.brand}
                    <span className="ml-2 text-xs text-muted-foreground">Giường nằm</span>
                  </CardTitle>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{item.price.toLocaleString()}đ</p>
                    <p className="text-xs text-muted-foreground">/ vé</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-emerald-600"/>
                    <span className="font-medium">{item.from}</span>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                    <span>{item.to}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4"/>
                      <span>{item.departAt} • {Math.round(item.durationMin/60)}h</span>
                    </div>
                    <span>Điểm đón: {item.pickup}</span>
                    <span>Điểm trả: {item.dropoff}</span>
                    {item.promo && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-amber-50 text-amber-700">
                        <BadgePercent className="h-3 w-3"/>{item.promo}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">Còn khoảng {item.seats - item.taken.length} ghế</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={()=>{ setLiveRoute(item); setLiveOpen(true); }}>Theo dõi trực tiếp</Button>
                      <Button variant="outline" size="sm">Điểm đón/trả</Button>
                      <Button size="sm" className="btn-glow" onClick={()=>setSelecting(item)}>Chọn ghế</Button>
                      <Button size="sm" variant="outline">Đặt ngay</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 text-xs">
          <span>Trang {page} / {totalPages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>←</Button>
            <Button size="sm" variant="outline" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>→</Button>
          </div>
        </div>
      </div>

      {/* Seat selector modal */}
      <SeatSelector
        open={!!selecting}
        onOpenChange={(o)=>{ if(!o) setSelecting(null); }}
        route={selecting ? {
          id: selecting.id,
          from: selecting.from,
          to: selecting.to,
          date: selecting.date,
          departAt: selecting.departAt,
          seats: selecting.seats,
          taken: selecting.taken,
          price: selecting.price,
          brand: selecting.brand,
        } : null}
        onContinue={handleSeatContinue}
      />

      {/* Live tracking demo modal */}
      <Dialog open={liveOpen} onOpenChange={setLiveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Theo dõi vị trí xe (demo)</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p>Xe {liveRoute?.brand} tuyến {liveRoute?.from} → {liveRoute?.to}</p>
            <div className="h-40 rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 flex items-center justify-center text-xs text-muted-foreground">
              Bản đồ minh họa (placeholder)
            </div>
            <p className="text-xs text-muted-foreground">Mô phỏng UI, không phải dữ liệu thật.</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
