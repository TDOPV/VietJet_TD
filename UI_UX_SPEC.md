# UI_UX_SPEC.md - QUY CHUẨN THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG
## DỰ ÁN: VIETJET TRAVEL & BOOKING

---

## 1. HỆ THỐNG MÀU SẮC THƯƠNG HIỆU (COLOR PALETTE)

Thiết kế tuân thủ nguyên tắc: **Nền trắng sáng chủ đạo, điểm nhấn mạnh mẽ với sắc Đỏ cờ Vietjet và sắc Vàng năng động**.

| Tên màu | Mã Hex | RGB | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Vietjet Red (Chính)** | `#ee1d23` | `rgb(238, 29, 35)` | Nút CTA chính, logo, giá vé nổi bật, tiêu đề nhấn mạnh, icon chính. |
| **Vietjet Red Dark** | `#c91419` | `rgb(201, 20, 25)` | Trạng thái hover/active của các nút bấm màu đỏ. |
| **Vietjet Yellow** | `#f8b300` | `rgb(248, 179, 0)` | Huy hiệu khuyến mãi (badge), sao đánh giá, nút phụ, thanh bar trang trí. |
| **Vietjet Yellow Light**| `#fff8e1` | `rgb(255, 248, 225)`| Nền thông báo nhẹ, nền highlight hạng thương gia. |
| **Pure White** | `#ffffff` | `rgb(255, 255, 255)`| Nền toàn trang, nền thẻ Card, nền khung tìm kiếm. |
| **Off-White / Light Gray**| `#f8fafc` | `rgb(248, 250, 252)`| Nền các section phụ, nền sidebar bộ lọc. |
| **Border Gray** | `#e2e8f0` | `rgb(226, 232, 240)`| Đường viền ngăn cách card, ô input, bảng phân chia. |
| **Text Dark (Primary)** | `#0f172a` | `rgb(15, 23, 42)` | Văn bản chính, tiêu đề, số tiền, đảm bảo độ tương phản chuẩn WCAG AA. |
| **Text Muted (Secondary)**| `#64748b` | `rgb(100, 116, 139)`| Chú thích thời gian, ngày bay, hãng bay, điều khoản. |
| **Success Green** | `#16a34a` | `rgb(22, 163, 74)` | Thông báo đặt chỗ thành công, vé còn chỗ. |

---

## 2. QUY CHUẨN TYPOGRAPHY & FONT CHỮ

* **Font chữ chuẩn:** `Inter` hoặc `'Be Vietnam Pro', sans-serif` (Tối ưu hiển thị tiếng Việt có dấu, chữ nét rõ ràng, thanh thoát).
* **Cỡ chữ (Font Sizes) & Trọng số (Font Weights):**
  * `Heading 1 (Hero Title):` 36px - 44px, Bold (700)
  * `Heading 2 (Section Title):` 28px - 32px, Bold (700), màu đỏ `#ee1d23` hoặc `#0f172a`
  * `Heading 3 (Card Title):` 18px - 22px, Semi-Bold (600)
  * `Body Text:` 15px - 16px, Regular (400), line-height 1.6
  * `Small / Caption:` 12px - 14px, Regular (400) hoặc Medium (500)
  * `Price Text:` 20px - 26px, Bold (700), màu `#ee1d23`

---

## 3. THIẾT KẾ CÁC THÀNH PHẦN GIAO DIỆN CỐT LÕI (CORE COMPONENTS)

### 3.1. Khung Tìm Kiếm Chuyến Bay Nổi (Hero Flight Search Box)
* **Vị trí:** Đặt nổi trên nền Banner sân bay/máy bay tươi sáng.
* **Hình thức:** Khối hộp bo góc `border-radius: 16px`, đổ bóng nhẹ `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08)`, nền trắng tinh khiết `#ffffff`.
* **Cấu trúc:**
  1. *Thanh loại vé (Radio Tabs):* Nằm ở mép trên: `Khứ hồi (Round trip)` và `Một chiều (One way)` có radio custom tròn màu đỏ.
  2. *Cụm Điểm đi & Điểm đến:* Ô input có icon máy bay cất cánh / hạ cánh, ở giữa có nút bấm tròn hai mũi tên ngược chiều (Swap Button) để đảo ngược điểm đi - đến mượt mà.
  3. *Cụm Ngày bay:* Hai ô chọn ngày (Ngày đi & Ngày về). Nếu chọn Một chiều, ô Ngày về mờ đi (disabled) có nhãn "Một chiều".
  4. *Nút Tìm Kiếm:* Kích thước lớn, màu `#ee1d23`, chữ trắng in hoa, icon kính lúp, hiệu ứng hover phóng to nhẹ 1.02x.

### 3.2. Thẻ Tour Du Lịch (Tour Card) - Chuẩn Kích Thước 600x400
* **Tỷ lệ ảnh:** Chuẩn `600x400 px` (`aspect-ratio: 3 / 2`), bo góc trên `12px 12px 0 0`.
* **Hiệu ứng Hover:** Ảnh phóng to nhẹ (`transform: scale(1.05); transition: 0.3s ease; overflow: hidden;`), bóng thẻ nổi lên `box-shadow: 0 12px 24px rgba(0,0,0,0.12)`.
* **Các thành phần trên Card:**
  * **Badge Thời lượng:** Góc trên bên phải ảnh: Nền đen mờ 60% bo tròn, chữ trắng `4N3Đ`.
  * **Badge Hãng bay:** Góc dưới bên trái ảnh: Nền trắng bo tròn, logo nhỏ VietJet Air hoặc tên hãng bay.
  * **Tên Tour:** Giới hạn tối đa 2 dòng (`line-clamp: 2`), font-weight 600, màu `#1e293b`.
  * **Chấm tiện ích:** Icon khách sạn, xe du lịch, vé tham quan.
  * **Giá Tour:** Nổi bật góc dưới: `3.990.000 ₫` màu đỏ `#ee1d23`, kèm chữ nhỏ `/ khách`.
  * **Nút bấm:** Nút viền đỏ chữ đỏ hoặc nút đỏ bo cong `Xem Chi Tiết`.

### 3.3. Dải Logo Đối Tác Hãng Hàng Không (Airline Partners Carousel/Grid)
* **Thiết kế:** Dải nền xám siêu nhạt `#f8fafc`, bo viền `#e2e8f0`.
* **Hiển thị:** Dạng lưới ngang (Flexbox/Grid 4 đến 8 cột).
* **Mỗi Logo Card:** Nền trắng `#ffffff`, viền nhẹ, bo góc `8px`, hiệu ứng hover nâng thẻ và viền chuyển sang màu đỏ Vietjet kèm con trỏ chuột `cursor: pointer`.
* **Tương tác:** Click vào logo nào thì chuyển trang `flights.html` và tự động tick sẵn bộ lọc hãng bay đó.

### 3.4. Thẻ Kết Quả Chuyến Bay (Flight Card)
* **Bố cục hàng ngang (Desktop):**
  * *Cột 1 (25%):* Logo hãng bay, tên hãng (VietJet Air), mã chuyến bay (`VJ-124`), loại máy bay (`A321neo`).
  * *Cột 2 (45%):* Dải hành trình:
    * Giờ đi (`06:00`) - Tên viết tắt sân bay (`SGN`)
    * Đường kẻ ngang có icon máy bay ở giữa, hiển thị thời gian bay (`2h 10m`) và chữ `Bay thẳng`.
    * Giờ đến (`08:10`) - Tên viết tắt sân bay (`HAN`).
  * *Cột 3 (30%):* Dịch vụ đính kèm (hành lý 7kg), Giá vé từ `1.250.000 ₫ / khách`, Nút màu đỏ `Chọn Chuyến Bay`.

### 3.5. Bảng So Sánh Chọn Hạng Vé (Chi Tiết Chuyến Bay)
* Thiết kế 2 thẻ song song (2 Columns):
  * **Cột 1: Hạng Phổ Thông (Economy)**
    * Header nền xám bạc nhẹ, tiêu đề `Hạng Phổ Thông`.
    * Giá vé: `1.450.000 ₫`.
    * Danh sách quyền lợi dạng tích xanh (`✓`): 7kg hành lý xách tay, ghế tiêu chuẩn, nước uống.
    * Nút chọn: `Chọn Vé Phổ Thông` (Viền đỏ, chữ đỏ).
  * **Cột 2: Hạng Thương Gia (Business Class - Highlight)**
    * Header nền vàng kim sang trọng `#fff8e1`, viền vàng/đỏ nổi bật, có huy hiệu `"VIP Khuyên dùng"`.
    * Giá vé: `3.850.000 ₫`.
    * Danh sách quyền lợi đặc quyền: Phòng chờ Bông Sen / VIP Lounge, 14kg xách tay + 30kg ký gửi, suất ăn nóng ẩm thực chọn lọc, ưu tiên làm thủ tục.
    * Nút chọn: `Chọn Vé Thương Gia` (Nền đỏ `#ee1d23`, chữ trắng).

### 3.6. Lịch Trình Tour Dạng Timeline (Chi Tiết Tour)
* Bố cục trục thời gian thẳng đứng (Vertical Timeline) với các nút tròn đỏ đánh số `1`, `2`, `3`, `4`.
* Mỗi ngày có tiêu đề đậm, danh sách hoạt động, hình ảnh minh họa nhỏ và thực đơn kèm theo.

### 3.7. Giỏ Hàng & Form Đặt Chỗ (Cart & Checkout)
* **Bảng giỏ hàng:**
  * Hiển thị rõ: Loại (Vé máy bay / Tour), Tên hành trình, Hạng vé, Số lượng, Đơn giá, Thành tiền.
  * Icon thùng rác đỏ để xóa từng dòng (kèm hiệu ứng xóa trượt).
  * Nút `Xóa tất cả` để làm trống giỏ hàng.
* **Khung tổng kết chi phí (Order Summary Sticky):**
  * Tạm tính.
  * Thuế & phí dịch vụ: `0 ₫` (Đã bao gồm thuế phí).
  * **Tổng thanh toán:** Chữ số lớn 24px, màu đỏ `#ee1d23`.
* **Form khách hàng:**
  * Các ô input có floating label hoặc icon minh họa (User, Phone, Mail, ID Card).
  * Báo lỗi viền đỏ nếu để trống hoặc nhập sai định dạng email/SĐT.
* **Nút Xác Nhận:** Nút màu đỏ toàn chiều rộng (Full-width), chữ in hoa, có hiệu ứng loading spinner khi đang xử lý lưu SQLite và gửi email.

---

## 4. TƯƠNG THÍCH ĐA THIẾT BỊ (RESPONSIVE BREAKPOINTS)

* **Desktop lớn (`≥ 1200px`):** Container rộng tối đa `1140px` - `1200px`, hiển thị đầy đủ 2 cột (Filter bên trái 280px, Danh sách bên phải).
* **Tablet (`768px - 1023px`):** Khung tìm kiếm xếp 2 dòng, Grid tour 2 cột, bảng chuyến bay thu gọn font.
* **Mobile (`< 768px`):**
  * Bộ lọc chuyển sang dạng nút bấm mở trượt Modal/Drawer (Off-canvas Filter).
  * Thẻ chuyến bay chuyển sang dạng xếp chồng dọc (Vertical Stack).
  * Khung tóm tắt giỏ hàng cố định thanh bar dưới đáy màn hình (Bottom Sticky Bar).
  * Menu chính chuyển sang dạng Burger Menu mượt mà.
