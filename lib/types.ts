export type Operator = {
  id: string;
  name: string;
  logo?: string;
};

export type RouteItem = {
  id: string;
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  price: number;
  brand: string; // operator id
  departureTime: string; // HH:mm
  durationMin: number;
  seats: { id: string; available: boolean }[];
  pickupPoints: string[];
  dropoffPoints: string[];
};

export type Ticket = {
  id: string;
  routeId: string;
  fullName: string;
  phone: string;
  email: string;
  seats: string[];
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
};

export type PaymentIntent = {
  id: string;
  ticketId: string;
  method: "momo"|"vnpay"|"zalopay"|"shopeepay"|"qr"|"cod";
  status: "PENDING"|"SUCCESS"|"FAILED";
  redirectUrl: string;
  createdAt: string;
};
