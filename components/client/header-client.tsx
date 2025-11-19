"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/", label: "TRANG CHỦ" },
  { href: "/lich-trinh", label: "LỊCH TRÌNH" },
  { href: "/tra-cuu-ve", label: "TRA CỨU VÉ" },
  { href: "/tin-tuc", label: "TIN TỨC" },
  { href: "/lien-he", label: "LIÊN HỆ" },
]

export default function HeaderClient() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-orange-200 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-28 rounded bg-white" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            FUTA Bus Lines
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-wide md:flex">
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-full px-3 py-1 " +
                  (active ? "bg-white text-orange-600" : "hover:bg-white/15")
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
