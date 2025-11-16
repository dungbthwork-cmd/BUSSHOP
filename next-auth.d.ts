// next-auth.d.ts (optional, for better TS DX)
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
    }
  }
}
