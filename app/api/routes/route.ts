import { NextRequest } from "next/server";
import { routes, operators } from "@/lib/mockdb";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const date = searchParams.get("date") ?? "";

  await new Promise(r => setTimeout(r, 200));

  const result = routes
    .filter(r =>
      (!from || r.from.toLowerCase().includes(from.toLowerCase())) &&
      (!to || r.to.toLowerCase().includes(to.toLowerCase())) &&
      (!date || r.date === date)
    )
    .map(r => {
      const op = operators.find(o=>o.id===r.brand) || null;
      const taken = (r.seats||[]).map((s,idx)=> s.available ? null : (idx+1)).filter(Boolean);
      return {
        ...r,
        operator: op,
        departAt: r.departureTime,
        brand: op?.name || r.brand,
        operatorId: r.brand,
        pickups: r.pickupPoints,
        dropoffs: r.dropoffPoints,
        seats: r.seats?.length ?? 40,
        taken,
      };
    });

  return Response.json(result);
}
