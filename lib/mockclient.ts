// lib/mockclient.ts - thuần FE, không cần gọi API
import { operators, routes, createTicket, createPayment, markPayment, payments } from "./mockdb";
import type { Ticket, PaymentIntent } from "./types";

export async function searchRoutes(params: { from?: string; to?: string; date?: string; brand?: string[] }) {
  const { from="", to="", date="", brand=[] } = params || {};
  await new Promise(r=>setTimeout(r, 200));
  const items = routes.filter(r =>
    (!from || r.from.toLowerCase().includes(from.toLowerCase())) &&
    (!to || r.to.toLowerCase().includes(to.toLowerCase())) &&
    (!date || r.date === date) &&
    ((brand?.length ?? 0) === 0 || brand!.includes(r.brand))
  ).map(r => {
    const op = operators.find(o=>o.id===r.brand) || null;
    const taken = (r.seats||[]).map((s,idx)=> s.available ? null : (idx+1)).filter(Boolean) as number[];
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
  return items;
}

export async function mockCreateTicket(input: { routeId: string; fullName: string; phone: string; email: string; seats: string[] }): Promise<Ticket> {
  await new Promise(r=>setTimeout(r, 150));
  return createTicket(input as any);
}

export async function mockCreatePayment(ticketId: string, method: "momo"|"vnpay"|"zalopay"|"shopeepay"|"qr"|"cod"): Promise<PaymentIntent> {
  await new Promise(r=>setTimeout(r, 150));
  return createPayment(ticketId, method as any);
}

export async function mockVerifyPayment(id: string, status?: "SUCCESS"|"FAILED"): Promise<PaymentIntent | null> {
  await new Promise(r=>setTimeout(r, 100));
  if (status) return markPayment(id, status as any);
  return payments.get(id) || null;
}

export async function mockMe() {
  await new Promise(r=>setTimeout(r, 80));
  return { user: { id: "demo-user", name: "Demo User", email: "demo@example.com" } };
}
