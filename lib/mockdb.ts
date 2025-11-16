import { RouteItem, Ticket, PaymentIntent, Operator } from "./types";

export const operators: Operator[] = [
  { id: "futa", name: "FUTA Bus Lines", logo: "/images/futa.png" },
  { id: "thanhbuoi", name: "Thành Bưởi" },
  { id: "phuongtrang", name: "Phương Trang" },
];

const today = new Date();
const dateStr = (d: Date) => d.toISOString().slice(0,10);
const d0 = dateStr(today);
const d1 = dateStr(new Date(today.getTime()+86400000));

function makeSeats() {
  return Array.from({length: 40}, (_,i)=> ({
    id: (i+1).toString().padStart(2, "0"),
    available: Math.random() > 0.3
  }));
}

export const routes: RouteItem[] = [
  {
    id: "r1", from: "TP.HCM", to: "Đà Lạt", date: d0,
    price: 320000, brand: "futa", departureTime: "08:00", durationMin: 300,
    seats: makeSeats(), pickupPoints: ["Q.1", "Q.5", "BX Miền Đông"], dropoffPoints: ["Đà Lạt Center", "BX Đà Lạt"]
  },
  {
    id: "r2", from: "TP.HCM", to: "Đà Lạt", date: d0,
    price: 380000, brand: "thanhbuoi", departureTime: "10:00", durationMin: 310,
    seats: makeSeats(), pickupPoints: ["Q.1", "BX Miền Đông"], dropoffPoints: ["Đà Lạt Center"]
  },
  {
    id: "r3", from: "TP.HCM", to: "Nha Trang", date: d1,
    price: 420000, brand: "futa", departureTime: "20:00", durationMin: 420,
    seats: makeSeats(), pickupPoints: ["Q.1", "Q.10"], dropoffPoints: ["BX Nha Trang"]
  },
  {
    id: "r4", from: "Hà Nội", to: "Sa Pa", date: d0,
    price: 350000, brand: "phuongtrang", departureTime: "07:00", durationMin: 360,
    seats: makeSeats(), pickupPoints: ["BX Mỹ Đình"], dropoffPoints: ["Sa Pa Center"]
  },
];

export const tickets = new Map<string, Ticket>();
export const payments = new Map<string, PaymentIntent>();

let ticketSeq = 1;
let paySeq = 1;

export function createTicket(input: Omit<Ticket,"id"|"status"|"createdAt">): Ticket {
  const id = `T${(ticketSeq++).toString().padStart(5,"0")}`;
  const t: Ticket = { id, status: "PENDING", createdAt: new Date().toISOString(), ...input };
  tickets.set(id, t);
  return t;
}

export function updateTicket(id: string, patch: Partial<Ticket>) {
  const t = tickets.get(id);
  if (!t) return null;
  const u = { ...t, ...patch };
  tickets.set(id, u);
  return u;
}

export function createPayment(ticketId: string, method: PaymentIntent["method"]): PaymentIntent {
  const id = `P${(paySeq++).toString().padStart(5,"0")}`;
  const p: PaymentIntent = {
    id, ticketId, method, status: "PENDING",
    redirectUrl: `/thanh-toan/gia-lap/${id}`,
    createdAt: new Date().toISOString()
  };
  payments.set(id, p);
  return p;
}

export function markPayment(id: string, status: PaymentIntent["status"]) {
  const p = payments.get(id);
  if (!p) return null;
  const u = { ...p, status };
  payments.set(id, u);
  if (status === "SUCCESS") {
    const t = tickets.get(p.ticketId);
    if (t) tickets.set(t.id, { ...t, status: "PAID" });
  }
  if (status === "FAILED") {
    const t = tickets.get(p.ticketId);
    if (t) tickets.set(t.id, { ...t, status: "PENDING" });
  }
  return u;
}
