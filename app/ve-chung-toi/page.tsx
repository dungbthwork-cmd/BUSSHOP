
import Image from "next/image"

export default function AboutPage(){
  const stats = [
    {k:"20+ triệu", s:"lượt khách/năm"},
    {k:"350+", s:"Phòng vé – Bưu cục"},
    {k:"1.000+", s:"chuyến/ngày"}
  ]
  const timeline = [
    {y:"2003", t:"Thành lập & vận hành tuyến nội vùng"},
    {y:"2010", t:"Mở rộng trục Bắc – Nam"},
    {y:"2018", t:"Đầu tư limousine, nâng chuẩn dịch vụ"},
    {y:"2024", t:"Số hóa mTicket & theo dõi trực tiếp"},
  ]
  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Về chúng tôi</h1>
      <Image src="/images/about/fleet.svg" alt="fleet" width={960} height={320} className="h-40 w-full rounded-3xl object-cover" />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(x=>(
          <div key={x.k} className="rounded-3xl border p-5 text-center">
            <p className="text-2xl font-extrabold text-gradient">{x.k}</p>
            <p className="text-sm text-muted-foreground">{x.s}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border p-4">
        <p className="font-medium mb-2">Cột mốc phát triển</p>
        <ol className="grid gap-2 md:grid-cols-4">
          {timeline.map(m => (
            <li key={m.y} className="rounded-2xl border p-3 text-sm">
              <p className="font-semibold">{m.y}</p>
              <p className="text-muted-foreground">{m.t}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-sm text-muted-foreground">Kết nối hệ sinh thái FUTA Group: Xe Phương Trang, Xe buýt, Xe hợp đồng, Giao hàng...</p>
    </section>
  )
}
