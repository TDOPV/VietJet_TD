-- ==============================================================================
-- TÊN DỰ ÁN: VIETJET TRAVEL & BOOKING
-- FILE: sample_queries.sql (Các câu truy vấn SQL mẫu phục vụ Frontend & Báo cáo)
-- VỊ TRÍ: SQLLITE/sample_queries.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TRUY VẤN TÌM KIẾM CHUYẾN BAY (TỪ TRANG CHỦ HOẶC TRANG FLIGHTS)
-- ------------------------------------------------------------------------------
-- Tìm tất cả chuyến bay từ TP.HCM (SGN) đi Hà Nội (HAN), sắp xếp giá tăng dần
SELECT 
    f.id,
    f.flight_number,
    a.name AS airline_name,
    a.logo_url AS airline_logo,
    f.departure_city,
    f.departure_code,
    f.destination_city,
    f.destination_code,
    f.departure_time,
    f.arrival_time,
    f.flight_duration,
    f.aircraft_type,
    f.price_economy,
    f.price_business,
    f.flight_type,
    f.stops,
    f.services
FROM flights f
JOIN airlines a ON f.airline_id = a.id
WHERE f.departure_code = 'SGN' 
  AND f.destination_code = 'HAN'
ORDER BY f.price_economy ASC;


-- ------------------------------------------------------------------------------
-- 2. TRUY VẤN LỌC CHUYẾN BAY THEO NHIỀU TIÊU CHÍ (FILTER SIDEBAR)
-- ------------------------------------------------------------------------------
-- Lọc: Hãng VietJet Air & Vietnam Airlines, giờ cất cánh buổi sáng (06:00 - 12:00), bay thẳng
SELECT 
    f.id,
    f.flight_number,
    a.name AS airline_name,
    a.logo_url AS airline_logo,
    f.departure_time,
    f.arrival_time,
    f.flight_duration,
    f.aircraft_type,
    f.price_economy,
    f.price_business
FROM flights f
JOIN airlines a ON f.airline_id = a.id
WHERE f.airline_id IN (1, 2)
  AND f.departure_time >= '06:00' 
  AND f.departure_time <= '12:00'
  AND f.stops = 0
ORDER BY f.price_economy ASC;


-- ------------------------------------------------------------------------------
-- 3. TRUY VẤN CHI TIẾT CHUYẾN BAY (FLIGHT DETAIL PAGE)
-- ------------------------------------------------------------------------------
SELECT 
    f.*,
    a.name AS airline_name,
    a.logo_url AS airline_logo,
    a.country AS airline_country
FROM flights f
JOIN airlines a ON f.airline_id = a.id
WHERE f.id = 1;


-- ------------------------------------------------------------------------------
-- 4. TRUY VẤN DANH SÁCH 8 TOUR NỔI BẬT (TRANG CHỦ & TRANG TOUR)
-- ------------------------------------------------------------------------------
SELECT 
    t.id,
    t.code,
    t.title,
    t.thumbnail_url,
    t.duration_days,
    t.duration_nights,
    t.price,
    a.name AS airline_name,
    a.logo_url AS airline_logo,
    t.departure_city,
    t.destination_city,
    t.aircraft_type,
    t.services
FROM tours t
JOIN airlines a ON t.airline_id = a.id
ORDER BY t.id ASC
LIMIT 8;


-- ------------------------------------------------------------------------------
-- 5. TRUY VẤN LỌC TOUR DU LỊCH THEO GIÁ & HÃNG BAY
-- ------------------------------------------------------------------------------
-- Lọc tour giá dưới 5.000.000 VND, sắp xếp giá giảm dần
SELECT 
    t.id,
    t.title,
    t.thumbnail_url,
    t.duration_days,
    t.duration_nights,
    t.price,
    a.name AS airline_name
FROM tours t
JOIN airlines a ON t.airline_id = a.id
WHERE t.price <= 5000000
ORDER BY t.price DESC;


-- ------------------------------------------------------------------------------
-- 6. THAO TÁC GIỎ HÀNG (CART CRUD)
-- ------------------------------------------------------------------------------
-- Thêm vé máy bay vào giỏ hàng
INSERT INTO cart_items (item_type, reference_id, title, ticket_class, quantity, unit_price, details_json)
VALUES (
    'flight',
    1,
    'Vé máy bay TP.HCM - Hà Nội (VJ-124)',
    'business',
    1,
    3250000,
    '{"airline":"VietJet Air","departure_time":"06:00","aircraft":"Airbus A321neo"}'
);

-- Thêm tour du lịch vào giỏ hàng
INSERT INTO cart_items (item_type, reference_id, title, ticket_class, quantity, unit_price, details_json)
VALUES (
    'tour',
    1,
    'Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills',
    'standard',
    2,
    3990000,
    '{"duration":"4 ngày 3 đêm","airline":"VietJet Air"}'
);

-- Xem danh sách sản phẩm trong giỏ hàng và tổng tiền
SELECT 
    id,
    item_type,
    reference_id,
    title,
    ticket_class,
    quantity,
    unit_price,
    (quantity * unit_price) AS subtotal,
    details_json
FROM cart_items
ORDER BY created_at DESC;

-- Tính tổng tiền toàn bộ giỏ hàng
SELECT COALESCE(SUM(quantity * unit_price), 0) AS total_cart_amount FROM cart_items;

-- Xóa 1 mục khỏi giỏ hàng
DELETE FROM cart_items WHERE id = 1;

-- Xóa sạch toàn bộ giỏ hàng
DELETE FROM cart_items;


-- ------------------------------------------------------------------------------
-- 7. THỰC HIỆN ĐẶT CHỖ & LƯU ĐƠN HÀNG (CHECKOUT TRANSACTION)
-- ------------------------------------------------------------------------------
BEGIN TRANSACTION;

-- Chèn thông tin khách hàng và mã đặt chỗ
INSERT INTO bookings (
    booking_code,
    customer_name,
    customer_phone,
    customer_email,
    customer_id_number,
    customer_notes,
    total_amount,
    status
) VALUES (
    'VJ-BK-893247',
    'Nguyễn Văn A',
    '0901234567',
    'nguyenvana@gmail.com',
    '079200001234',
    'Gia đình có trẻ nhỏ, xin xếp chỗ gần nhau',
    7240000,
    'CONFIRMED'
);

-- Chèn chi tiết các dịch vụ trong đơn đặt chỗ (sử dụng last_insert_rowid())
INSERT INTO booking_details (booking_id, item_type, title, ticket_class, quantity, unit_price, subtotal)
VALUES (last_insert_rowid(), 'flight', 'Vé máy bay VJ-124 SGN-HAN', 'business', 1, 3250000, 3250000);

INSERT INTO booking_details (booking_id, item_type, title, ticket_class, quantity, unit_price, subtotal)
VALUES (last_insert_rowid(), 'tour', 'Tour Đà Nẵng 4N3Đ', 'standard', 1, 3990000, 3990000);

-- Xóa sạch giỏ hàng sau khi đặt thành công
DELETE FROM cart_items;

COMMIT;

-- Xem chi tiết đơn hàng vừa tạo kèm danh sách vé/tour
SELECT 
    b.booking_code,
    b.customer_name,
    b.customer_phone,
    b.customer_email,
    b.total_amount,
    b.status,
    bd.title AS item_title,
    bd.ticket_class,
    bd.quantity,
    bd.unit_price,
    bd.subtotal
FROM bookings b
JOIN booking_details bd ON b.id = bd.booking_id
WHERE b.booking_code = 'VJ-BK-893247';
