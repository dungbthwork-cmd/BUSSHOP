// app/lien-he/page.tsx
import { Card, CardContent, CardTitle } from "@/components/ui"

export default function LienHePage() {
  return (
    <div className="bg-slate-50 pb-10 pt-6">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-xl font-semibold text-slate-900">
          LIÊN HỆ VỚI CHÚNG TÔI
        </h1>

        <Card>
          <CardContent className="grid gap-6 py-5 md:grid-cols-[1.3fr,1fr]">
            {/* Thông tin của bạn */}
            <div>
              <CardTitle className="mb-3 text-sm">
                THÔNG TIN LIÊN HỆ
              </CardTitle>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Tên đơn vị:</span>{" "}
                  Công ty XYZ (bạn sửa lại tên của bạn)
                </li>
                <li>
                  <span className="font-semibold">Địa chỉ:</span>{" "}
                  123 Đường ABC, Quận 1, TP.HCM
                </li>
                <li>
                  <span className="font-semibold">Điện thoại:</span>{" "}
                  0909 000 000
                </li>
                <li>
                  <span className="font-semibold">Email:</span>{" "}
                  contact@yourcompany.com
                </li>
                <li>
                  <span className="font-semibold">Website:</span>{" "}
                  yourdomain.com
                </li>
              </ul>
            </div>

            {/* Ghi chú / hướng dẫn */}
            <div className="rounded-2xl bg-orange-50 p-4 text-sm text-slate-700">
              <p className="mb-2 font-semibold text-orange-700">
                Gửi góp ý & hỗ trợ
              </p>
              <p>
                Nếu bạn có bất kỳ thắc mắc, góp ý hoặc cần hỗ trợ, vui
                lòng liên hệ qua số điện thoại hoặc email bên cạnh. Chúng
                tôi sẽ phản hồi trong thời gian sớm nhất.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
