# IMPLEMENTATION_PLAN.md - KẾ HOẠCH TRIỂN KHAI DỰ ÁN CHI TIẾT
## DỰ ÁN: WEBSITE VIETJET TRAVEL & BOOKING

Tài liệu này cung cấp lộ trình thực thi theo từng giai đoạn (Phase) với các đầu mục công việc cụ thể, có thể giao trực tiếp cho **Antigravity** thực thi tuần tự.

---

## BẢNG TỔNG QUAN CÁC GIAI ĐOẠN

| Giai đoạn | Nội dung chính | Kết quả đầu ra |
| :--- | :--- | :--- |
| **Giai đoạn 1** | Thiết lập Cơ sở dữ liệu SQLite & Khung CSS dùng chung | `db.js`, `variables.css`, `base.css`, `components.css` |
| **Giai đoạn 2** | Xây dựng Trang Chủ (`index.html`) | Khung tìm kiếm, 8 Tour 600x400, Logo đối tác |
| **Giai đoạn 3** | Xây dựng Chuyến Bay & Chi Tiết Vé Máy Bay | `flights.html`, `flight-detail.html`, `flights.js` |
| **Giai đoạn 4** | Xây dựng Danh Sách Tour & Chi Tiết Lịch Trình | `tour.html`, `tour-detail.html`, `tour.js` |
| **Giai đoạn 5** | Xây dựng Giỏ Hàng & Tích Hợp Gửi Email Tự Động | `cart.html`, `cart.js`, `email.js` |
| **Giai đoạn 6** | Tinh chỉnh UI/UX, Responsive Mobile & Kiểm Thử | Toàn bộ hệ thống hoàn chỉnh 100% |

---

## CHI TIẾT TỪNG BƯỚC THỰC HIỆN (ACTION CHECKLIST)

### GIAI ĐOẠN 1: THIẾT LẬP CƠ SỞ DỮ LIỆU & HỆ THỐNG GIAO DIỆN NỀN TẢNG
- [ ] **1.1. Tạo cấu trúc thư mục:**
  - Tạo các thư mục `css/`, `js/`, `assets/images/`, `assets/icons/`.
- [ ] **1.2. Xây dựng module Cơ sở dữ liệu `js/db.js`:**
  - Nhúng thư viện `sql.js` (WebAssembly).
  - Tự động chạy toàn bộ DDL tạo 6 bảng: `airlines`, `flights`, `tours`, `cart_items`, `bookings`, `booking_details`.
  - Nạp đầy đủ dữ liệu mẫu (8 tour nổi bật, 12 chuyến bay đa dạng, 8 hãng hàng không).
  - Viết các hàm tiện ích: `dbApp.getFlights(filter)`, `dbApp.getTourById(id)`, `dbApp.createBooking(data)`.
- [ ] **1.3. Xây dựng hệ thống CSS nền tảng:**
  - Tạo `css/variables.css`: Khai báo mã màu chủ đạo `#ee1d23`, nền trắng `#ffffff`, màu vàng `#f8b300`.
  - Tạo `css/base.css`: Chuẩn hóa font chữ tiếng Việt, container, grid hệ thống.
  - Tạo `css/components.css`: Nút bấm button, ô input, badge, modal thông báo, toast popup.
  - Tạo `css/header-footer.css`: Thanh điều hướng cố định (Sticky Navbar), giỏ hàng có số đếm và footer chuẩn thương hiệu.

---

### GIAI ĐOẠN 2: PHÁT TRIỂN TRANG CHỦ (`index.html`)
- [ ] **2.1. Header & Banner Hero:**
  - Logo Vietjet rực rỡ, thanh menu liên kết.
  - Hero banner du lịch bầu trời tươi sáng.
- [ ] **2.2. Khung Tìm Kiếm Chuyến Bay:**
  - Chọn Khứ hồi / Một chiều.
  - Chọn điểm xuất phát & điểm đến (Hà Nội, TP.HCM, Đà Nẵng, Phú Quốc, Singapore, Bangkok...).
  - Nút hoán đổi (Swap) điểm đi - đến.
  - Chọn ngày đi & ngày về.
  - Nút `Tìm Kiếm` (chuyển hướng sang `flights.html` kèm query string).
- [ ] **2.3. Danh sách 8 Tour Du Lịch Nổi Bật:**
  - Grid 4 cột x 2 hàng hiển thị 8 tour nổi bật truy vấn từ SQLite.
  - Kích thước thumbnail chuẩn `600x400px`.
  - Hiển thị hãng bay, số ngày/đêm (`4N3Đ`), giá tiền VND rõ nét.
  - Click vào dẫn đến `tour-detail.html?id=...`.
- [ ] **2.4. Phần Đối Tác Hãng Hàng Không:**
  - Hiển thị logo VietJet Air, Vietnam Airlines, Bamboo Airways, Singapore Airlines, Thai Airways, Emirates...
  - Click vào logo hãng dẫn sang `flights.html?airline=...`.

---

### GIAI ĐOẠN 3: PHÁT TRIỂN CHUYẾN BAY & CHI TIẾT CHUYẾN BAY
- [ ] **3.1. Trang Danh Sách Chuyến Bay (`flights.html`):**
  - **Cột trái (Sidebar bộ lọc):**
    - Sắp xếp giá tăng/giảm dần.
    - Vé khứ hồi / một chiều / bay thẳng / nhiều thành phố.
    - Checkbox lọc theo hãng hàng không.
    - Lọc theo khung giờ cất cánh (Sáng sớm, Sáng, Chiều, Tối).
    - Hạng dịch vụ (Phổ thông, Thương gia).
  - **Cột phải (Danh sách chuyến bay):**
    - Hiển thị giờ cất cánh, giờ hạ cánh, thời gian bay, mã chuyến bay, logo hãng, dịch vụ hành lý.
    - Giá vé hấp dẫn kèm nút `Chọn chuyến bay`.
    - Click nút dẫn đến `flight-detail.html?id=...`.
- [ ] **3.2. Trang Chi Tiết Chuyến Bay (`flight-detail.html`):**
  - Hiển thị chi tiết hành trình, sân bay đi/đến, thời gian bay.
  - Dòng máy bay hiện đại: Boeing 787-9 Dreamliner, Airbus A321neo...
  - **Bảng chọn giá vé 2 hạng:**
    - Cột Hạng Phổ Thông (Economy) & Giá vé.
    - Cột Hạng Thương Gia (Business Class) & Giá vé kèm đặc quyền VIP.
  - Nút bấm `Chọn vé & Thêm vào giỏ hàng` -> Lưu vào `cart` và chuyển đến `cart.html`.

---

### GIAI ĐOẠN 4: PHÁT TRIỂN DANH SÁCH TOUR & CHI TIẾT TOUR
- [ ] **4.1. Trang Danh Sách Tour (`tour.html`):**
  - Cột trái: Bộ lọc giá vé tăng/giảm dần, hãng hàng không, thời gian khởi hành.
  - Cột phải: Lưới danh sách tour du lịch, ảnh 600x400, giá tour trọn gói, hãng hàng không vận chuyển.
  - Nút `Chi tiết Tour` dẫn đến `tour-detail.html?id=...`.
- [ ] **4.2. Trang Chi Tiết Tour (`tour-detail.html`):**
  - Thông tin điểm đi, điểm đến, hãng bay, loại máy bay (Airbus/Boeing).
  - **Lịch trình chi tiết:** Trục thời gian (Timeline) Ngày 1, Ngày 2, Ngày 3, Ngày 4...
  - Nút `Chọn tour` -> Lưu vào Giỏ Hàng.

---

### GIAI ĐOẠN 5: PHÁT TRIỂN GIỎ HÀNG & GỬI EMAIL TỰ ĐỘNG
- [ ] **5.1. Trang Giỏ Hàng (`cart.html`):**
  - Bảng tổng hợp các chuyến bay và tour đã chọn.
  - Chức năng xóa từng mục và nút xóa toàn bộ giỏ hàng.
  - Tự động cộng tổng tiền thanh toán theo thời gian thực.
- [ ] **5.2. Form Đăng Ký Thông Tin Cá Nhân:**
  - Nhập Họ và tên, Số điện thoại, Email, Số CCCD/Hộ chiếu, Ghi chú.
  - Kiểm tra tính hợp lệ dữ liệu (Validation).
- [ ] **5.3. Xử lý Đăng Ký & Gửi Email (`js/email.js`):**
  - Sinh mã đặt chỗ PNR ngẫu nhiên (Ví dụ: `VJ-BK-789021`).
  - Lưu bản ghi vào bảng `bookings` trong cơ sở dữ liệu SQLite.
  - Gửi email tự động từ `tiendungotsuka@gmail.com` tới email khách hàng bằng EmailJS SDK.
  - Hiển thị Modal thông báo hoàn thành đơn hàng sang trọng, làm mới giỏ hàng.

---

### GIAI ĐOẠN 6: TỐI ƯU HÓA & KIỂM THỬ TỔNG THỂ
- [ ] Kiểm tra responsive trên các kích thước màn hình: Mobile (375px, 414px), Tablet (768px, 1024px), Desktop (1440px).
- [ ] Kiểm tra tính bền vững của dữ liệu SQLite trong LocalStorage khi F5 hoặc mở tab mới.
- [ ] Kiểm tra độ sắc nét của hình ảnh thumbnail 600x400 và logo các hãng.
- [ ] Kiểm tra toàn bộ luồng từ Trang chủ -> Chọn chuyến bay/Tour -> Giỏ hàng -> Đăng ký -> Nhận thông báo & gửi email.
