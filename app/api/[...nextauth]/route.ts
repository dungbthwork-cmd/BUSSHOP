// app/api/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const runtime = "nodejs";

const handler = NextAuth({
  debug: false,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Demo: chấp nhận mọi email/pass không rỗng
        return { id: "demo-user", name: "Demo User", email: credentials.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "dev-secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).user = user;
      return token;
    },
    async session({ session, token }) {
      if ((token as any)?.user) (session as any).user = (token as any).user;
      return session;
    },
  },
  pages: { signIn: "/dang-nhap" },
});

export { handler as GET, handler as POST };
