-- ==============================================================================
-- TÊN DỰ ÁN: VIETJET TRAVEL & BOOKING
-- FILE: schema.sql (Định nghĩa cấu trúc bảng SQLite - DDL)
-- VỊ TRÍ: SQLLITE/schema.sql
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- ------------------------------------------------------------------------------
-- 1. BẢNG HÃNG HÀNG KHÔNG (AIRLINES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS booking_details;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS tours;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS airlines;

CREATE TABLE airlines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,             -- Mã hãng: VJ, VN, SQ, QH, VU, TG, EK, KE
    name TEXT NOT NULL,                    -- Tên đầy đủ: VietJet Air, Vietnam Airlines...
    logo_url TEXT NOT NULL,                -- Đường dẫn logo (file cục bộ hoặc URL)
    country TEXT DEFAULT 'Việt Nam',       -- Quốc gia
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 2. BẢNG CHUYẾN BAY (FLIGHTS)
-- ------------------------------------------------------------------------------
CREATE TABLE flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_number TEXT NOT NULL,           -- Số hiệu chuyến bay (VJ-124, VN-216, SQ-178...)
    airline_id INTEGER NOT NULL,           -- ID hãng bay (Liên kết bảng airlines)
    departure_city TEXT NOT NULL,          -- Thành phố đi: TP. Hồ Chí Minh
    departure_code TEXT NOT NULL,          -- Mã sân bay đi: SGN
    destination_city TEXT NOT NULL,        -- Thành phố đến: Hà Nội
    destination_code TEXT NOT NULL,        -- Mã sân bay đến: HAN
    departure_time TEXT NOT NULL,          -- Giờ cất cánh (Định dạng HH:mm, ví dụ 06:15)
    arrival_time TEXT NOT NULL,            -- Giờ hạ cánh (Định dạng HH:mm, ví dụ 08:25)
    flight_duration TEXT NOT NULL,         -- Tổng thời gian bay (Ví dụ: 2h 10m)
    aircraft_type TEXT NOT NULL,           -- Dòng máy bay (Airbus A321neo, Boeing 787-9...)
    price_economy INTEGER NOT NULL,        -- Giá vé Hạng Phổ Thông (VND)
    price_business INTEGER NOT NULL,       -- Giá vé Hạng Thương Gia (VND)
    flight_type TEXT DEFAULT 'oneway',     -- 'oneway' (Một chiều) hoặc 'roundtrip' (Khứ hồi)
    stops INTEGER DEFAULT 0,               -- 0: Bay thẳng, 1: 1 điểm dừng, 2: Nhiều thành phố
    services TEXT,                         -- JSON mảng các dịch vụ đi kèm
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE CASCADE
);

-- Chỉ mục tối ưu tốc độ tìm kiếm chuyến bay
CREATE INDEX idx_flights_route ON flights(departure_code, destination_code);
CREATE INDEX idx_flights_airline ON flights(airline_id);
CREATE INDEX idx_flights_price ON flights(price_economy);
CREATE INDEX idx_flights_time ON flights(departure_time);

-- ------------------------------------------------------------------------------
-- 3. BẢNG TOUR DU LỊCH (TOURS)
-- ------------------------------------------------------------------------------
CREATE TABLE tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,             -- Mã tour (VJ-TOUR-01, VJ-TOUR-02...)
    title TEXT NOT NULL,                   -- Tên tour du lịch
    thumbnail_url TEXT NOT NULL,           -- Hình ảnh thumbnail chuẩn kích thước 600x400
    duration_days INTEGER NOT NULL,        -- Số ngày (Ví dụ: 4)
    duration_nights INTEGER NOT NULL,      -- Số đêm (Ví dụ: 3)
    price INTEGER NOT NULL,                -- Giá tour trọn gói (VND)
    airline_id INTEGER NOT NULL,           -- Hãng hàng không vận chuyển chính
    departure_city TEXT NOT NULL,          -- Điểm khởi hành (Hà Nội, TP.HCM...)
    destination_city TEXT NOT NULL,        -- Điểm đến (Đà Nẵng, Phú Quốc, Bangkok...)
    aircraft_type TEXT NOT NULL,           -- Loại máy bay chuyên chở (Airbus A321 / Boeing 787)
    flight_time TEXT NOT NULL,             -- Thời gian bay (Ví dụ: 1h 20m)
    services TEXT,                         -- Các dịch vụ tiêu biểu trong tour
    itinerary_json TEXT NOT NULL,          -- Chi tiết lịch trình theo ngày (Định dạng JSON)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE CASCADE
);

-- Chỉ mục tối ưu lọc tour
CREATE INDEX idx_tours_airline ON tours(airline_id);
CREATE INDEX idx_tours_price ON tours(price);

-- ------------------------------------------------------------------------------
-- 4. BẢNG GIỎ HÀNG (CART_ITEMS)
-- ------------------------------------------------------------------------------
CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_type TEXT NOT NULL,               -- 'flight' (Vé máy bay) hoặc 'tour' (Tour du lịch)
    reference_id INTEGER NOT NULL,         -- ID gốc của chuyến bay hoặc tour
    title TEXT NOT NULL,                   -- Tên vé hoặc Tên tour
    ticket_class TEXT DEFAULT 'economy',   -- 'economy' (Phổ thông) hoặc 'business' (Thương gia)
    quantity INTEGER DEFAULT 1,            -- Số lượng hành khách / vé
    unit_price INTEGER NOT NULL,           -- Đơn giá tại thời điểm đưa vào giỏ (VND)
    details_json TEXT,                     -- Dữ liệu bổ sung: ngày bay, giờ bay, hãng bay
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. BẢNG ĐƠN ĐĂNG KÝ / ĐẶT CHỖ (BOOKINGS)
-- ------------------------------------------------------------------------------
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_code TEXT UNIQUE NOT NULL,     -- Mã đặt chỗ ngẫu nhiên (Ví dụ: VJ-BK-893247)
    customer_name TEXT NOT NULL,           -- Họ và tên khách hàng
    customer_phone TEXT NOT NULL,          -- Số điện thoại liên hệ
    customer_email TEXT NOT NULL,          -- Email nhận vé (nhận thư từ tiendungotsuka@gmail.com)
    customer_id_number TEXT NOT NULL,      -- Số CCCD hoặc Hộ chiếu
    customer_notes TEXT,                   -- Ghi chú / Yêu cầu đặc biệt
    total_amount INTEGER NOT NULL,         -- Tổng số tiền thanh toán (VND)
    status TEXT DEFAULT 'CONFIRMED',       -- Trạng thái: 'CONFIRMED', 'PAID', 'CANCELLED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_code ON bookings(booking_code);
CREATE INDEX idx_bookings_email ON bookings(customer_email);

-- ------------------------------------------------------------------------------
-- 6. BẢNG CHI TIẾT ĐƠN ĐẶT CHỖ (BOOKING_DETAILS)
-- ------------------------------------------------------------------------------
CREATE TABLE booking_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER NOT NULL,           -- Khóa ngoại trỏ về bookings(id)
    item_type TEXT NOT NULL,               -- 'flight' hoặc 'tour'
    title TEXT NOT NULL,                   -- Tên vé / tour
    ticket_class TEXT,                     -- Hạng vé (nếu là vé máy bay)
    quantity INTEGER NOT NULL,             -- Số lượng
    unit_price INTEGER NOT NULL,           -- Đơn giá
    subtotal INTEGER NOT NULL,             -- Thành tiền = quantity * unit_price
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
