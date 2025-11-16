import { NextRequest } from "next/server";
import { createPayment, tickets } from "@/lib/mockdb";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  ticketId: z.string(),
  method: z.enum(["momo","vnpay","zalopay","shopeepay","qr","cod"]),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.format()), { status: 400 });

  const t = tickets.get(parsed.data.ticketId);
  if (!t) return new Response("Ticket not found", { status: 404 });

  const p = createPayment(t.id, parsed.data.method);
  return Response.json(p, { status: 201 });
}
