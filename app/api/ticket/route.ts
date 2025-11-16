import { NextRequest } from "next/server";
import { createTicket } from "@/lib/mockdb";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  routeId: z.string(),
  fullName: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  seats: z.array(z.string()).min(1),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return new Response(JSON.stringify(parsed.error.format()), { status: 400 });
  }
  const t = createTicket(parsed.data as any);
  return Response.json(t, { status: 201 });
}
