import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"
import Link from "next/link"
import dynamic from "next/dynamic"
// Client header (Topbar + Header) is loaded only on the client to avoid importing client components into a Server Component
const HeaderClient = dynamic(() => import("@/components/client/header-client"), { ssr: false })

export const metadata: Metadata = {
  title: "Vé Xe – Đặt vé hiện đại",
  description: "So sánh, lọc, chọn ghế, thanh toán mượt.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white text-gray-900 antialiased">
        <Providers>
          {/* Client header (Topbar + Header) — loaded only on client */}
          <HeaderClient />

          <main className="container p-4">{children}</main>

          <footer className="border-t" id="tai-app">
            <div className="container grid gap-6 p-6 md:grid-cols-3">
              <div>
                <p className="text-lg font-semibold">Tải ứng dụng FUTA</p>
                <p className="text-sm text-muted-foreground">Mua vé, quét QR lên xe, theo dõi hành trình.</p>
                <div className="mt-3 flex gap-2">
                  <a className="rounded-xl border px-3 py-2 text-sm" href="#">App Store</a>
                  <a className="rounded-xl border px-3 py-2 text-sm" href="#">Google Play</a>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Liên hệ</p>
                <p className="text-sm">Hotline: <b>1900 6067</b></p>
                <p className="text-sm">Email: hotro@futa.vn</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Chính sách</p>
                <ul className="text-sm space-y-1">
                  <li><Link className="hover:underline" href="/dieu-khoan">Điều khoản sử dụng</Link></li>
                  <li><Link className="hover:underline" href="/faq">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t">
              <div className="container p-4 text-sm text-muted-foreground">
                © {new Date().getFullYear()} VéXe — Tham khảo trải nghiệm FUTA để tối ưu UX.
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
