# ANTIGRAVITY_PROMPT.md - HƯỚNG DẪN DÀNH CHO AGENT ANTIGRAVITY
## DỰ ÁN: XÂY DỰNG WEBSITE VIETJET TRAVEL & BOOKING

> **Tài liệu này được thiết kế để bạn chỉ cần gửi lệnh cho Antigravity:**  
> *"Antigravity, hãy đọc file ANTIGRAVITY_PROMPT.md và IMPLEMENTATION_PLAN.md rồi tiến hành code hoàn chỉnh toàn bộ website."*

---

## 1. NGUYÊN TẮC THI CÔNG DÀNH CHO ANTIGRAVITY

1. **Công nghệ:** Chỉ sử dụng **HTML5, CSS3, JavaScript thuần (Vanilla JS)**. Tuyệt đối không dùng Framework (React, Vue, Node.js backend).
2. **Cơ sở dữ liệu:** Tích hợp **SQLite WebAssembly (`sql.js`)** nạp qua CDN `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js`. Lưu trữ đồng bộ vào `localStorage`.
3. **Màu sắc & Giao diện:** Nền trắng sáng, màu chủ đạo là Đỏ Vietjet (`#ee1d23`), nhấn Vàng (`#f8b300`).
4. **Ảnh thumbnail Tour:** Tất cả 8 tour du lịch bắt buộc dùng ảnh kích thước chuẩn **600x400** (sử dụng Unsplash URLs chất lượng cao kèm tham số `w=600&h=400&fit=crop`).
5. **Gửi Email:** Tích hợp thư viện EmailJS gửi email từ tài khoản đại diện `tiendungotsuka@gmail.com` đến hòm thư khách hàng khi nhấn Đăng ký.
6. **Tính liên kết giữa các trang:** Mọi liên kết URL và tham số Query String (`?id=...`, `?airline=...`) phải hoạt động liền mạch và mượt mà.

---

## 2. LỆNH THỰC THI NHANH (PROMPT CHO ANTIGRAVITY)

Khi bạn muốn Antigravity bắt đầu tạo toàn bộ mã nguồn, bạn hãy sao chép prompt dưới đây:

```markdown
Chào Antigravity!
Hãy đọc kỹ các file đặc tả trong thư mục:
- PRD.md: Yêu cầu tính năng và luồng người dùng
- DATABASE_SCHEMA.md: Bảng SQLite và dữ liệu mẫu 8 tour, chuyến bay
- UI_UX_SPEC.md: Hệ thống màu sắc đỏ #ee1d23, typography, components
- ARCHITECTURE.md: Cấu trúc thư mục và tích hợp EmailJS
- IMPLEMENTATION_PLAN.md: Danh sách công việc theo từng giai đoạn

Nhiệm vụ của bạn: Hãy lập trình hoàn chỉnh 100% tất cả các file mã nguồn:
1. css/variables.css, css/base.css, css/components.css, css/header-footer.css, css/pages.css, css/responsive.css
2. js/db.js (Tích hợp SQLite WASM sql.js đầy đủ DDL và 8 tours, flights, airlines)
3. js/cart.js (Quản lý giỏ hàng và cập nhật số lượng)
4. js/email.js (Tích hợp gửi email từ tiendungotsuka@gmail.com)
5. js/app.js, js/flights.js, js/tour.js
6. index.html (Trang chủ: Hero tìm kiếm vé, 8 tour 600x400, logo hãng bay)
7. flights.html (Danh sách chuyến bay + bộ lọc chi tiết)
8. flight-detail.html (Chi tiết chuyến bay + chọn 2 hạng vé Phổ thông / Thương gia)
9. tour.html (Danh sách tour + bộ lọc)
10. tour-detail.html (Chi tiết tour + timeline lịch trình)
11. cart.html (Giỏ hàng + form thông tin cá nhân + nút đăng ký gửi email)

Hãy tiến hành viết code ngay bây giờ!
```
