export type SearchParams = { from?: string; to?: string; date?: string; brand?: string[] };

function toQuery(obj: Record<string, any>) {
  const s = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) v.forEach(x => s.append(k, String(x)));
    else s.append(k, String(v));
  });
  return s.toString();
}

export async function searchRoutes(p: SearchParams) {
  const q = toQuery({ ...p, rt: false });
  const res = await fetch(`/api/routes?${q}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Routes ${res.status}`);
  return res.json() as Promise<any[]>;
}

export async function createTicket(body: {
  routeId: string; fullName: string; phone: string; email: string; seats: string[];
}) {
  const res = await fetch("/api/ticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Create ticket ${res.status}`);
  return res.json();
}

export async function createPayment(body: { ticketId: string; method: "momo"|"vnpay"|"zalopay"|"shopeepay"|"qr"|"cod" }) {
  const res = await fetch("/api/check-out", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Create payment ${res.status}`);
  return res.json();
}

export async function verifyPayment(id: string, status?: "SUCCESS"|"FAILED") {
  const q = new URLSearchParams();
  q.set("id", id);
  if (status) q.set("status", status);
  const res = await fetch(`/api/check-out/verify?${q.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Verify ${res.status}`);
  return res.json();
}

export async function getMe() {
  const res = await fetch("/api/user/me", { cache: "no-store" });
  if (!res.ok) throw new Error(`Me ${res.status}`);
  return res.json();
}
