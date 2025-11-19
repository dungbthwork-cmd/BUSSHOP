import { z } from "zod"

const today = new Date()
today.setHours(0, 0, 0, 0)

// --- search form ---
export const searchFormSchema = z.object({
  from: z.string().min(1, "Vui lòng nhập điểm đi"),
  to: z.string().min(1, "Vui lòng nhập điểm đến"),
  date: z
    .date({
      required_error: "Vui lòng chọn ngày đi",
      invalid_type_error: "Ngày đi không hợp lệ",
    })
    .refine((d) => {
      const dd = new Date(d)
      dd.setHours(0, 0, 0, 0)
      return dd >= today
    }, { message: "Ngày đi không hợp lệ" }),
})

export type SearchFormSchema = z.infer<typeof searchFormSchema>

// --- passenger info (checkout) ---
export const passengerSchema = z.object({
  fullName: z.string().min(2, "Nhập họ tên"),
  phone: z.string().min(8, "SĐT không hợp lệ").max(20, "SĐT không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
})
export type PassengerSchema = z.infer<typeof passengerSchema>

// --- payment ---
export const paymentSchema = z.object({
  method: z.enum(["momo", "vnpay", "zalopay", "shopeepay", "qr", "cod"]),
  accept: z.boolean().refine((v) => v === true, {
    message: "Bạn cần đồng ý điều khoản",
  }),
})
export type PaymentSchema = z.infer<typeof paymentSchema>
