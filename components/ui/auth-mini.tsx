// components/ui/auth-mini.tsx
"use client"
import Link from "next/link"
// (Nếu dùng next-auth thì import { signIn, signOut, useSession } from "next-auth/react")

export default function AuthMini() {
  // Nếu chưa cấu hình next-auth, trả UI đơn giản:
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/dang-nhap" className="underline">Đăng nhập</Link>
      <span className="opacity-50">/</span>
      <Link href="/dang-ky" className="underline">Đăng ký</Link>
    </div>
  )
}
