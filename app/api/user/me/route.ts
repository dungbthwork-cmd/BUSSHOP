import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(_: NextRequest) {
  return Response.json({
    user: { id: "demo-user", name: "Demo User", email: "demo@example.com" }
  });
}
