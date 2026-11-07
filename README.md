# BỘ TÀI LIỆU THIẾT KẾ & TRIỂN KHAI DỰ ÁN VIETJET TRAVEL & BOOKING
## XÂY DỰNG BẰNG ANTIGRAVITY (HTML, CSS, JS THUẦN - SQLITE WASM - NO BACKEND)

Chào bạn! Bộ hồ sơ kiến trúc và đặc tả kỹ thuật dạng Markdown (`.md`) đã được tạo đầy đủ và hoàn chỉnh trong thư mục làm việc `d:\VietJet_TD`. 

Bộ tài liệu này được thiết kế theo tiêu chuẩn công nghệ cao nhất, giúp bạn sử dụng **Antigravity** để sinh mã nguồn tự động, nhanh chóng và chính xác 100% theo đúng mọi yêu cầu bạn đã đề ra.

---

## 1. DANH MỤC CÁC TÀI LIỆU ĐÃ TẠO

| STT | Tên File | Chức năng chính |
| :---: | :--- | :--- |
| 1 | [PRD.md](file:///d:/VietJet_TD/PRD.md) | **Tài liệu Yêu cầu Sản phẩm:** Mô tả chi tiết chức năng toàn bộ các trang (Trang chủ, Chuyến bay, Chi tiết chuyến bay, Tour, Chi tiết tour, Giỏ hàng, Gửi email). |
| 2 | [DATABASE_SCHEMA.md](file:///d:/VietJet_TD/DATABASE_SCHEMA.md) | **Cơ sở dữ liệu SQLite:** Giải pháp SQLite chạy trực tiếp trên trình duyệt bằng `sql.js` (WebAssembly), toàn bộ câu lệnh DDL tạo 6 bảng và dữ liệu mẫu đầy đủ cho 8 tour nổi bật, các chuyến bay, các hãng hàng không. |
| 3 | [UI_UX_SPEC.md](file:///d:/VietJet_TD/UI_UX_SPEC.md) | **Quy chuẩn Thiết kế Giao diện:** Bảng màu chủ đạo Đỏ Vietjet (`#ee1d23`), nhấn Vàng (`#f8b300`), nền trắng sáng, chuẩn kích thước thumbnail tour 600x400, bảng so sánh 2 hạng vé. |
| 4 | [ARCHITECTURE.md](file:///d:/VietJet_TD/ARCHITECTURE.md) | **Kiến trúc Kỹ thuật:** Cấu trúc file, luồng dữ liệu, cơ chế đồng bộ giỏ hàng, và giải pháp gửi email xác nhận từ `tiendungotsuka@gmail.com` qua EmailJS SDK. |
| 5 | [IMPLEMENTATION_PLAN.md](file:///d:/VietJet_TD/IMPLEMENTATION_PLAN.md) | **Kế hoạch Triển khai Chi tiết:** 6 giai đoạn với checklist từng đầu mục công việc cụ thể để Antigravity thực thi. |
| 6 | [ANTIGRAVITY_PROMPT.md](file:///d:/VietJet_TD/ANTIGRAVITY_PROMPT.md) | **Mẫu Lệnh Thực Thi Cho Antigravity:** Câu lệnh chuẩn sẵn sàng để bạn ra lệnh cho Antigravity bắt đầu viết mã nguồn tự động. |

---

## 2. TÓM TẮT ĐẶC TẢ KỸ THUẬT QUAN TRỌNG

### 2.1. Công nghệ
* **Frontend:** HTML5, CSS3, JavaScript thuần (Vanilla JS ES6+). Hoàn toàn không phụ thuộc NodeJS hay backend server phức tạp.
* **Database:** **SQLite WebAssembly** (`sql.js`) nạp qua CDN `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js`. Dữ liệu được lưu trữ và phục hồi bền vững qua `localStorage`.
* **Gửi Email tự động:** Sử dụng thư viện **EmailJS** gửi trực tiếp từ trình duyệt của khách hàng, lấy hòm thư đại diện gửi đi là `tiendungotsuka@gmail.com`.

### 2.2. Giao diện & Trải nghiệm
* **Tông màu:** Nền trắng tinh khiết sáng sủa, màu chủ đạo là Đỏ cờ Vietjet (`#ee1d23`), màu phụ Vàng tươi (`#f8b300`).
* **Trang chủ (`index.html`):**
  * Khung tìm kiếm vé máy bay (Khứ hồi/Một chiều, Điểm đi, Điểm đến, Ngày đi, Ngày về, Hành khách). Nút "Tìm Kiếm" dẫn sang trang Chuyến Bay.
  * Danh mục **8 tour du lịch nổi bật**: Hình thumbnail tỷ lệ chuẩn `600x400px`, hiển thị hãng du lịch, số ngày/đêm (`4N3Đ`), giá tour tiền VND nổi bật. Click dẫn sang chi tiết tour.
  * Danh mục đối tác hàng không: Logo các hãng VietJet Air, Vietnam Airlines, Singapore Airlines, Bamboo Airways... Click logo sẽ lọc chuyến bay của hãng đó.
* **Chuyến bay (`flights.html`):**
  * Cột trái: Bộ lọc sắp xếp giá tăng/giảm dần, vé khứ hồi/một chiều, bay thẳng, nhiều thành phố, hãng bay, giờ cất cánh, hạng dịch vụ (phổ thông/thương gia).
  * Cột phải: Thẻ danh sách các chuyến bay, ngày giờ cất cánh, thời gian bay, giá tiền, dịch vụ. Nút chọn chuyến bay dẫn sang chi tiết.
* **Chi tiết chuyến bay (`flight-detail.html`):**
  * Điểm đi/đến, thời gian bay, hãng bay, loại máy bay (Boeing 787, Airbus A321...).
  * Chọn giá vé: Bảng so sánh 2 cột **Hạng Phổ Thông** và **Hạng Thương Gia**.
  * Chọn hạng vé sẽ tự động lưu vào Giỏ Hàng.
* **Tour (`tour.html`):**
  * Cột trái: Bộ lọc giá tăng/giảm, hãng hàng không, thời gian cất cánh.
  * Cột phải: Danh sách các tour, ngày cất cánh, thời gian bay, giá tiền, dịch vụ.
* **Chi tiết Tour (`tour-detail.html`):**
  * Điểm đi/đến, thời gian bay, hãng bay, loại máy bay (Boeing, Airbus...).
  * Lịch trình chi tiết từng ngày (Ngày 1, Ngày 2, Ngày 3, Ngày 4...).
  * Nút "Chọn tour" lưu vào Giỏ Hàng.
* **Giỏ Hàng (`cart.html`):**
  * Bảng danh sách chuyến bay và tour đã chọn. Cho phép xóa từng mục hoặc xóa toàn bộ giỏ hàng.
  * Form nhập thông tin cá nhân: Họ tên, Số điện thoại, Email, Số CCCD, Ghi chú.
  * Nút **Đăng ký** -> Hiển thị thông báo hoàn thành đơn hàng sang trọng.
  * Tự động gửi email xác nhận từ `tiendungotsuka@gmail.com` đến hòm thư của khách hàng.

---

## 3. CÁCH DÙNG BỘ FILE NÀY VỚI ANTIGRAVITY

Để yêu cầu Antigravity bắt tay vào viết toàn bộ mã nguồn website ngay lập tức, bạn có 2 cách rất đơn giản:

### Cách 1: Gõ lệnh trực tiếp trong chat
Bạn chỉ cần gửi tin nhắn:
> *"Antigravity ơi, hãy đọc file [IMPLEMENTATION_PLAN.md](file:///d:/VietJet_TD/IMPLEMENTATION_PLAN.md) và [ANTIGRAVITY_PROMPT.md](file:///d:/VietJet_TD/ANTIGRAVITY_PROMPT.md), sau đó tiến hành lập trình toàn bộ mã nguồn HTML, CSS, JS cho tôi nhé!"*

### Cách 2: Sử dụng Slash Command `/goal`
Bạn có thể gõ lệnh `/goal` trong ô chat để Antigravity kích hoạt chế độ tự động thực thi chuyên sâu và hoàn thành trọn gói toàn bộ dự án từ A đến Z không cần bạn phải can thiệp nhiều lần.
