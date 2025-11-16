"use client"
import Link from "next/link"
import { Button } from "@/components/ui/primitives"
import { Globe, UserRound, Download, Newspaper, Phone } from "lucide-react"
import AuthMini from "@/components/ui/auth-mini"

export default function HeaderClient(){
  return (
    <>
      {/* Topbar */}
      <div className="w-full border-b bg-white/70 backdrop-blur">
        <div className="container flex items-center justify-between p-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              Hotline: <b>1900 6067</b>
            </span>
            <Link className="hover:underline" href="/faq">FAQ</Link>
            <Link className="hover:underline" href="/dieu-khoan">Điều khoản</Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex gap-1">
              <Globe className="h-4 w-4" />
              VI
            </Button>
            <a
              href="#tai-app"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Tải ứng dụng
            </a>
           {/*  <Link
              href="/dang-nhap"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-gray-50"
            >
              <UserRound className="h-4 w-4" />
              Đăng nhập/Đăng ký
            </Link> */}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b glass">
        <div className="container p-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold text-gradient tracking-tight">
            VéXe
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <Link href="/lich-trinh" className="hover:underline">Lịch trình</Link>
            <Link href="/tra-cuu-ve" className="hover:underline">Tra cứu vé</Link>
            <Link href="/tin-tuc" className="hover:underline flex items-center gap-1">
              <Newspaper className="h-4 w-4" />
              Tin tức
            </Link>
            <a href="https://hoadon.futabus.vn" target="_blank" rel="noreferrer" className="hover:underline">
              Hóa đơn
            </a>
            <Link href="/lien-he" className="hover:underline">Liên hệ</Link>
            <Link href="/ve-chung-toi" className="hover:underline">Về chúng tôi</Link>
            <div className="relative group">
              <button className="hover:underline">Khác ▾</button>
              <div className="absolute right-0 mt-2 hidden min-w-[240px] rounded-2xl border bg-white p-2 shadow group-hover:block">
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/tuyen-dung">Tuyển dụng</Link>
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/mang-luoi">Mạng lưới văn phòng</Link>
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/dieu-khoan">Điều khoản sử dụng</Link>
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/faq">Câu hỏi thường gặp</Link>
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/huong-dan-dat-ve">Hướng dẫn đặt vé trên Web</Link>
                <Link className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/huong-dan-nap-tien">Hướng dẫn nạp tiền trên App</Link>
              </div>
            </div>
          </nav>

          {/* Auth mini phải ở bên trong Providers để dùng SessionProvider */}
          <div className="hidden md:block">
            <AuthMini />
          </div>
        </div>
      </header>
    </>
  )
}
