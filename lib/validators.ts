
import { z } from "zod"

export const searchSchema = z.object({
  from: z.string().min(1, "Vui lòng nhập điểm đi"),
  to: z.string().min(1, "Vui lòng nhập điểm đến"),
  date: z.string().min(1, "Chọn ngày đi")
}).refine(d=> new Date(d.date) >= new Date(new Date().setHours(0,0,0,0)), { path:["date"], message:"Ngày đi không hợp lệ" })

export const passengerSchema = z.object({
  fullName: z.string().min(2, "Nhập họ tên"),
  phone: z.string().min(8, "SĐT không hợp lệ"),
  email: z.string().email("Email không hợp lệ")
})

export const paymentSchema = z.object({
  method: z.enum(["momo","vnpay","zalopay","shopeepay","qr","cod"]),
  accept: z.boolean().refine(v=>v===true, { message: "Bạn cần đồng ý điều khoản" })
})
