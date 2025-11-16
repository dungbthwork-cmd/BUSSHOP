import { NextRequest } from "next/server";
import { tickets, updateTicket } from "@/lib/mockdb";

export const runtime = "edge";

export async function GET(_: NextRequest, { params }: { params: { id: string }}) {
  const t = tickets.get(params.id);
  if (!t) return new Response("Not found", { status: 404 });
  return Response.json(t);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string }}) {
  const t = tickets.get(params.id);
  if (!t) return new Response("Not found", { status: 404 });
  updateTicket(params.id, { status: "CANCELLED" });
  return new Response(null, { status: 204 });
}
