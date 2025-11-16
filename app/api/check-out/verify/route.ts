import { NextRequest } from "next/server";
import { markPayment, payments } from "@/lib/mockdb";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status") as "SUCCESS"|"FAILED"|null;

  if (!id) return new Response("Missing id", { status: 400 });
  if (!payments.has(id)) return new Response("Not found", { status: 404 });

  if (status) {
    const p = markPayment(id, status);
    return Response.json(p);
  }
  return Response.json(payments.get(id));
}
