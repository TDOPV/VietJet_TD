/**
 * ==============================================================================
 * js/db.js - SQLite Client-Side Database Engine (sql.js WebAssembly)
 * Tự động nạp trực tiếp file database: SQLLITE/vietjet.db
 * Thực thi 100% bằng câu lệnh SQL chuẩn (SELECT, INSERT, JOIN)
 * ==============================================================================
 */

const DB_FILE_PATH = 'SQLLITE/vietjet.db';
const DB_STORAGE_KEY = 'vietjet_sqlite_data';

// Dữ liệu hạt giống dự phòng (Khi DB mới tạo chưa có dữ liệu)
const DEFAULT_AIRLINES = [
  { id: 1, code: 'VJ', name: 'VietJet Air', logo_url: 'Images/vietjet-air.png', country: 'Việt Nam' },
  { id: 2, code: 'VN', name: 'Vietnam Airlines', logo_url: 'Images/vietnam-airlines.png', country: 'Việt Nam' },
  { id: 3, code: 'SQ', name: 'Singapore Airlines', logo_url: 'Images/singapore-airline.png', country: 'Singapore' },
  { id: 4, code: 'QH', name: 'Bamboo Airways', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bamboo_Airways_logo.svg/320px-Bamboo_Airways_logo.svg.png', country: 'Việt Nam' },
  { id: 5, code: 'VU', name: 'Vietravel Airlines', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Vietravel_Airlines_logo.svg/320px-Vietravel_Airlines_logo.svg.png', country: 'Việt Nam' },
  { id: 6, code: 'TG', name: 'Thai Airways', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Thai_Airways_Logo.svg/320px-Thai_Airways_Logo.svg.png', country: 'Thái Lan' },
  { id: 7, code: 'EK', name: 'Emirates', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/320px-Emirates_logo.svg.png', country: 'UAE' },
  { id: 8, code: 'KE', name: 'Korean Air', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Korean_Air_logo.svg/320px-Korean_Air_logo.svg.png', country: 'Hàn Quốc' }
];

const DEFAULT_TOURS = [
  {
    id: 1, code: 'VJ-TOUR-01', title: 'Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills',
    thumbnail_url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80',
    duration_days: 4, duration_nights: 3, price: 3990000, airline_id: 1,
    departure_city: 'Hà Nội', destination_city: 'Đà Nẵng', aircraft_type: 'Airbus A321neo', flight_time: '1h 20m',
    services: 'Khách sạn 4 sao biển Mỹ Khê, Vé cáp treo Bà Nà, Buffet trưa, Du thuyền sông Hàn',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'Hà Nội - Đà Nẵng - Bán đảo Sơn Trà', detail: 'Tập trung tại sân bay Nội Bài, bay VietJet đi Đà Nẵng. Tham quan Chùa Linh Ứng và tắm biển Mỹ Khê.' },
      { day: 2, title: 'Bà Nà Hills - Cầu Vàng - Fantasy Park', detail: 'Trải nghiệm cáp treo kỷ lục, chụp ảnh Cầu Vàng đôi bàn tay, ăn trưa buffet Á-Âu.' },
      { day: 3, title: 'Rừng dừa Bảy Mẫu - Phố Cổ Hội An', detail: 'Đi thuyền thúng xem biểu diễn chài lưới, ngắm phố cổ đèn lồng Hội An về đêm.' },
      { day: 4, title: 'Chợ Hàn Mua Sắm - Tiễn Bay Hà Nội', detail: 'Tự do mua sắm đặc sản chả bò, xe tiễn sân bay về lại Hà Nội.' }
    ])
  },
  {
    id: 2, code: 'VJ-TOUR-02', title: 'Thiên Đường Nghỉ Dưỡng Đảo Ngọc Phú Quốc - Sunset Town',
    thumbnail_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop&q=80',
    duration_days: 3, duration_nights: 2, price: 4590000, airline_id: 1,
    departure_city: 'TP. Hồ Chí Minh', destination_city: 'Phú Quốc', aircraft_type: 'Airbus A320', flight_time: '1h 05m',
    services: 'Resort 5 sao ven biển, Vé xem Cầu Hôn Kiss Bridge, Tour cano 4 đảo & Lặn san hô',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'SGN - Phú Quốc - Grand World', detail: 'Bay từ Tân Sơn Nhất đến Phú Quốc. Check-in resort, khám phá Grand World.' },
      { day: 2, title: 'Cano 4 Đảo - Cáp Treo Hòn Thơm', detail: 'Lặn ngắm san hô tại Hòn Mây Rút, trải nghiệm cáp treo vượt biển.' },
      { day: 3, title: 'Làng Chài Hàm Ninh - Mua Sắm Ngọc Trai - Về SGN', detail: 'Thưởng thức hải sản Hàm Ninh, ra sân bay về lại Sài Gòn.' }
    ])
  },
  {
    id: 3, code: 'VJ-TOUR-03', title: 'Hành Trình Tây Bắc: Hà Nội - Sapa - Chinh Phục Đỉnh Fansipan',
    thumbnail_url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80',
    duration_days: 4, duration_nights: 3, price: 3490000, airline_id: 2,
    departure_city: 'TP. Hồ Chí Minh', destination_city: 'Sapa - Lào Cai', aircraft_type: 'Boeing 787-9', flight_time: '2h 10m',
    services: 'Khách sạn 4 sao trung tâm, Vé cáp treo Fansipan, Bản Cát Cát',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'TP.HCM - Hà Nội - Lên Sapa', detail: 'Bay ra Hà Nội sáng sớm, xe Limousine đưa thẳng lên Sapa ngắm phong cảnh Tây Bắc.' },
      { day: 2, title: 'Bản Cát Cát - Thác Tiên Sa', detail: 'Khám phá văn hóa bản H Mông, check-in ruộng bậc thang tuyệt đẹp.' },
      { day: 3, title: 'Nóc Nhà Đông Dương Fansipan', detail: 'Chinh phục đỉnh 3.143m ngắm biển mây, viếng quần thể tâm linh.' },
      { day: 4, title: 'Chợ Sapa - Về Hà Nội - Bay Về SGN', detail: 'Mua sắm đặc sản và đón chuyến bay đêm về TP.HCM.' }
    ])
  },
  {
    id: 4, code: 'VJ-TOUR-04', title: 'Khám Phá Xứ Sở Chùa Vàng: Bangkok - Pattaya Bay Vietjet',
    thumbnail_url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop&q=80',
    duration_days: 5, duration_nights: 4, price: 6990000, airline_id: 1,
    departure_city: 'Hà Nội / TP.HCM', destination_city: 'Bangkok / Pattaya', aircraft_type: 'Airbus A321', flight_time: '1h 50m',
    services: 'Khách sạn 4 sao Thái Lan, Show Alcazar hoành tráng, Chùa Phật Vàng',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'Việt Nam - Bangkok - Pattaya', detail: 'Bay thẳng Bangkok, di chuyển về thiên đường giải trí Pattaya.' },
      { day: 2, title: 'Đảo San Hô Coral - Trân Bảo Phật Sơn', detail: 'Tắm biển đảo Coral, viếng tượng Phật dát vàng trên núi.' },
      { day: 3, title: 'Pattaya - Bangkok - Du Thuyền Chaophraya', detail: 'Ngắm hoàng hôn lãng mạn trên dòng sông Chaophraya.' },
      { day: 4, title: 'Chùa Wat Arun - Mua Sắm IconSiam', detail: 'Check-in bảo tháp Wat Arun lộng lẫy, mua sắm hàng hiệu.' },
      { day: 5, title: 'Chùa Phật Vàng - Bay Về Việt Nam', detail: 'Chiêm bái tượng Phật vàng 5.5 tấn, bay về Việt Nam.' }
    ])
  },
  {
    id: 5, code: 'VJ-TOUR-05', title: 'Mùa Hoa Anh Đào Nhật Bản: Tokyo - Núi Phú Sĩ - Kyoto - Osaka',
    thumbnail_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&q=80',
    duration_days: 6, duration_nights: 5, price: 26900000, airline_id: 1,
    departure_city: 'Hà Nội', destination_city: 'Tokyo / Osaka', aircraft_type: 'Airbus A330-300', flight_time: '5h 15m',
    services: 'Bay thẳng máy bay thân rộng A330 Vietjet, Tắm khoáng Onsen, Bò Kobe',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'Hà Nội - Sân Bay Narita Tokyo', detail: 'Đáp chuyến bay Vietjet đến Tokyo, làm thủ tục nhận phòng.' },
      { day: 2, title: 'Hoàng Cung Tokyo - Chùa Asakusa', detail: 'Tham quan chùa cổ Asakusa và chụp ảnh tháp Skytree.' },
      { day: 3, title: 'Núi Phú Sĩ - Làng Cổ Oshino - Onsen', detail: 'Lên trạm 5 núi Phú Sĩ, thư giãn tắm suối khoáng nóng Onsen.' },
      { day: 4, title: 'Tàu Shinkansen Về Kyoto', detail: 'Trải nghiệm tàu cao tốc Shinkansen 300km/h, viếng Cổng trời Fushimi Inari.' },
      { day: 5, title: 'Lâu Đài Osaka - Mua Sắm Dotonbori', detail: 'Thăm thành cổ Osaka, thưởng thức ẩm thực đường phố.' },
      { day: 6, title: 'Sân Bay Kansai - Bay Về Hà Nội', detail: 'Mua sắm miễn thuế và bay về Việt Nam.' }
    ])
  },
  {
    id: 6, code: 'VJ-TOUR-06', title: 'Mùa Thu Xứ Hàn: Seoul - Đảo Nami - Công Viên Lotte World',
    thumbnail_url: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&h=400&fit=crop&q=80',
    duration_days: 5, duration_nights: 4, price: 13990000, airline_id: 1,
    departure_city: 'TP. Hồ Chí Minh', destination_city: 'Seoul', aircraft_type: 'Airbus A321neo', flight_time: '5h 30m',
    services: 'Bay hãng Vietjet Air, Khách sạn 4 sao Seoul, Mặc đồ Hanbok check-in Cung Điện',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'TP.HCM - Sân Bay Incheon Seoul', detail: 'Bay chuyến đêm đến thủ đô Seoul xinh đẹp.' },
      { day: 2, title: 'Đảo Nami Bản Tình Ca Mùa Đông', detail: 'Dạo bước dưới hàng cây ngân hạnh rực rỡ sắc vàng đỏ.' },
      { day: 3, title: 'Cung Điện Gyeongbokgung - Bukchon Hanok', detail: 'Mặc trang phục Hanbok truyền thống chụp ảnh trong cung điện.' },
      { day: 4, title: 'Tháp Namsan - Mua Sắm Myeongdong', detail: 'Gắn ổ khóa tình yêu trên đỉnh Namsan, mua sắm mỹ phẩm.' },
      { day: 5, title: 'Incheon - Bay Trở Về TP.HCM', detail: 'Tạm biệt Hàn Quốc, đáp chuyến bay về TP.HCM.' }
    ])
  },
  {
    id: 7, code: 'VJ-TOUR-07', title: 'Khám Phá Đảo Quốc Sư Tử Singapore - Đảo Sentosa - Marina Bay',
    thumbnail_url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80',
    duration_days: 4, duration_nights: 3, price: 9890000, airline_id: 3,
    departure_city: 'Hà Nội', destination_city: 'Singapore', aircraft_type: 'Boeing 787 Dreamliner', flight_time: '3h 25m',
    services: 'Bay Singapore Airlines cao cấp, Vé Gardens by the Bay, Nhạc nước Spectra',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'Hà Nội - Sân Bay Changi Singapore', detail: 'Ngắm thác nước trong nhà Rain Vortex Changi, về nhận phòng.' },
      { day: 2, title: 'Công Viên Merlion - Gardens By The Bay', detail: 'Check-in tượng sư tử phun nước và nhà kính hoa mái vòm.' },
      { day: 3, title: 'Đảo Sentosa - Nhạc Nước Marina Bay', detail: 'Vui chơi tại Sentosa, tối thưởng thức nhạc nước ánh sáng hoành tráng.' },
      { day: 4, title: 'Chinatown - Mua Sắm Orchard - Về HN', detail: 'Khám phá ẩm thực Chinatown và mua sắm trước khi bay về.' }
    ])
  },
  {
    id: 8, code: 'VJ-TOUR-08', title: 'Vẻ Đẹp Di Sản: Hạ Long Du Thuyền 5 Sao - Tràng An Ninh Bình',
    thumbnail_url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80',
    duration_days: 3, duration_nights: 2, price: 3850000, airline_id: 2,
    departure_city: 'TP. Hồ Chí Minh', destination_city: 'Hạ Long - Ninh Bình', aircraft_type: 'Airbus A321', flight_time: '2h 15m',
    services: 'Ngủ đêm du thuyền 5 sao Hạ Long, Chèo Kayak, Thăm Tràng An',
    itinerary_json: JSON.stringify([
      { day: 1, title: 'TP.HCM - Hải Phòng - Du Thuyền Hạ Long', detail: 'Lên du thuyền 5 sao thưởng thức bữa trưa hải sản trên vịnh.' },
      { day: 2, title: 'Hang Sửng Sốt - Kayak - Đi Ninh Bình', detail: 'Chèo thuyền Kayak ngắm đảo đá vôi kỳ vĩ, di chuyển về Ninh Bình.' },
      { day: 3, title: 'Quần Thể Tràng An - Bái Đính - Về SGN', detail: 'Đi thuyền khám phá hang động Tràng An, viếng chùa Bái Đính.' }
    ])
  }
];

const DEFAULT_FLIGHTS = [
  { id: 1, flight_number: 'VJ-124', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '06:00', arrival_time: '08:10', flight_duration: '2h 10m', aircraft_type: 'Airbus A321neo', price_economy: 1250000, price_business: 3250000, flight_type: 'roundtrip', stops: 0, services: '["Hành lý xách tay 7kg", "Check-in online"]' },
  { id: 2, flight_number: 'VJ-132', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '09:30', arrival_time: '11:40', flight_duration: '2h 10m', aircraft_type: 'Airbus A321neo', price_economy: 1450000, price_business: 3650000, flight_type: 'roundtrip', stops: 0, services: '["Hành lý xách tay 7kg", "Ghế ngồi êm ái"]' },
  { id: 3, flight_number: 'VN-216', airline_id: 2, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '07:15', arrival_time: '09:25', flight_duration: '2h 10m', aircraft_type: 'Boeing 787-9 Dreamliner', price_economy: 1890000, price_business: 4890000, flight_type: 'roundtrip', stops: 0, services: '["Hành lý 12kg xách tay", "Ký gửi 23kg", "Suất ăn nóng"]' },
  { id: 4, flight_number: 'QH-204', airline_id: 4, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '11:00', arrival_time: '13:10', flight_duration: '2h 10m', aircraft_type: 'Boeing 787-9', price_economy: 1650000, price_business: 4200000, flight_type: 'oneway', stops: 0, services: '["Hành lý xách tay 7kg", "Ký gửi 20kg"]' },
  { id: 5, flight_number: 'VJ-156', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '14:20', arrival_time: '16:30', flight_duration: '2h 10m', aircraft_type: 'Airbus A321', price_economy: 1320000, price_business: 3400000, flight_type: 'oneway', stops: 0, services: '["Hành lý xách tay 7kg"]' },
  { id: 6, flight_number: 'VN-258', airline_id: 2, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '17:45', arrival_time: '19:55', flight_duration: '2h 10m', aircraft_type: 'Airbus A350-900', price_economy: 1980000, price_business: 5200000, flight_type: 'roundtrip', stops: 0, services: '["Hành lý ký gửi 23kg", "Suất ăn tối cao cấp"]' },
  { id: 7, flight_number: 'VJ-198', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Hà Nội', destination_code: 'HAN', departure_time: '21:00', arrival_time: '23:10', flight_duration: '2h 10m', aircraft_type: 'Airbus A321', price_economy: 990000, price_business: 2900000, flight_type: 'oneway', stops: 0, services: '["Giá siêu tiết kiệm", "Hành lý 7kg"]' },
  { id: 8, flight_number: 'SQ-178', airline_id: 3, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Singapore', destination_code: 'SIN', departure_time: '12:15', arrival_time: '15:25', flight_duration: '2h 10m', aircraft_type: 'Boeing 787-10', price_economy: 3200000, price_business: 8900000, flight_type: 'roundtrip', stops: 0, services: '["Chuẩn 5 sao", "Hành lý 25kg", "Ẩm thực thượng hạng"]' },
  { id: 9, flight_number: 'VJ-801', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Bangkok', destination_code: 'BKK', departure_time: '08:45', arrival_time: '10:15', flight_duration: '1h 30m', aircraft_type: 'Airbus A321neo', price_economy: 1580000, price_business: 3800000, flight_type: 'roundtrip', stops: 0, services: '["Bay quốc tế tiện lợi", "Hành lý 7kg"]' },
  { id: 10, flight_number: 'VJ-320', airline_id: 1, departure_city: 'TP. Hồ Chí Minh', departure_code: 'SGN', destination_city: 'Đà Nẵng', destination_code: 'DAD', departure_time: '07:00', arrival_time: '08:20', flight_duration: '1h 20m', aircraft_type: 'Airbus A320', price_economy: 890000, price_business: 2450000, flight_type: 'oneway', stops: 0, services: '["Hành lý xách tay 7kg"]' },
  { id: 11, flight_number: 'VN-112', airline_id: 2, departure_city: 'Hà Nội', departure_code: 'HAN', destination_city: 'Đà Nẵng', destination_code: 'DAD', departure_time: '10:30', arrival_time: '11:50', flight_duration: '1h 20m', aircraft_type: 'Airbus A321', price_economy: 1350000, price_business: 3100000, flight_type: 'roundtrip', stops: 0, services: '["Hành lý ký gửi 23kg", "Nước suối khăn lạnh"]' },
  { id: 12, flight_number: 'VJ-450', airline_id: 1, departure_city: 'Hà Nội', departure_code: 'HAN', destination_city: 'Phú Quốc', destination_code: 'PQC', departure_time: '08:15', arrival_time: '10:25', flight_duration: '2h 10m', aircraft_type: 'Airbus A321', price_economy: 1750000, price_business: 4100000, flight_type: 'roundtrip', stops: 0, services: '["Bay thẳng Đảo Ngọc", "Hành lý 7kg"]' }
];

class VietjetDatabase {
  constructor() {
    this.db = null;
    this.isWasmReady = false;
    this.source = 'none';
    this.readyPromise = this.init();
  }

  async init() {
    try {
      if (typeof window.initSqlJs === 'function') {
        const SQL = await window.initSqlJs({
          locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        // 1. Cố gắng nạp trực tiếp file SQLLITE/vietjet.db
        let dbLoaded = false;
        try {
          const response = await fetch(DB_FILE_PATH, { cache: 'no-store' });
          if (response.ok) {
            const buf = await response.arrayBuffer();
            if (buf.byteLength > 0) {
              this.db = new SQL.Database(new Uint8Array(buf));
              this.source = 'file:SQLLITE/vietjet.db';
              console.log(`[SQLite WASM] Đã nạp thành công database từ ${DB_FILE_PATH} (${buf.byteLength} bytes)`);
              dbLoaded = true;
            }
          }
        } catch (fetchErr) {
          console.info(`[SQLite Info] Không thể fetch trực tiếp file ${DB_FILE_PATH} (thường gặp khi chạy file://):`, fetchErr.message);
        }

        // 2. Nếu fetch không được, kiểm tra LocalStorage
        if (!dbLoaded) {
          const saved = localStorage.getItem(DB_STORAGE_KEY);
          if (saved) {
            const uInt8Array = new Uint8Array(JSON.parse(saved));
            this.db = new SQL.Database(uInt8Array);
            this.source = 'localStorage';
            console.log('[SQLite WASM] Khôi phục database từ LocalStorage');
            dbLoaded = true;
          }
        }

        // 3. Nếu chưa có DB, khởi tạo Database mới trong bộ nhớ
        if (!dbLoaded) {
          this.db = new SQL.Database();
          this.source = 'in-memory-wasm';
          this.initSchemaAndSeed();
          this.saveToStorage();
          console.log('[SQLite WASM] Khởi tạo Database SQLite mới và nạp dữ liệu hoàn tất.');
        } else {
          // Kiểm tra xem các bảng đã có dữ liệu chưa, nếu chưa có (mới chạy schema) thì nạp seed
          try {
            const check = this.db.exec("SELECT count(*) AS c FROM flights;");
            const count = check[0]?.values[0][0] || 0;
            if (count === 0) {
              console.log('[SQLite WASM] Database có bảng nhưng chưa có dữ liệu hàng. Đang nạp dữ liệu hạt giống...');
              this.seedDataOnly();
              this.saveToStorage();
            }
          } catch (e) {
            console.warn('[SQLite WASM Check Error] Khởi tạo lại schema và seed:', e);
            this.initSchemaAndSeed();
            this.saveToStorage();
          }
        }

        this.isWasmReady = true;
        this.updateDatabaseStatusUI();
      } else {
        console.warn('[SQLite] Không tìm thấy thư viện initSqlJs, kích hoạt chế độ Fallback.');
      }
    } catch (err) {
      console.warn('[SQLite Init Error] Chuyển sang fallback JavaScript:', err);
    }
  }

  updateDatabaseStatusUI() {
    console.log(`%c[SQLite Active] Nguồn dữ liệu: ${this.source}`, 'background: #ee1d23; color: white; padding: 4px 8px; border-radius: 4px;');
  }

  initSchemaAndSeed() {
    if (!this.db) return;
    this.db.run(`
      CREATE TABLE IF NOT EXISTS airlines (
        id INTEGER PRIMARY KEY, code TEXT, name TEXT, logo_url TEXT, country TEXT
      );
      CREATE TABLE IF NOT EXISTS tours (
        id INTEGER PRIMARY KEY, code TEXT, title TEXT, thumbnail_url TEXT,
        duration_days INTEGER, duration_nights INTEGER, price INTEGER,
        airline_id INTEGER, departure_city TEXT, destination_city TEXT,
        aircraft_type TEXT, flight_time TEXT, services TEXT, itinerary_json TEXT
      );
      CREATE TABLE IF NOT EXISTS flights (
        id INTEGER PRIMARY KEY, flight_number TEXT, airline_id INTEGER,
        departure_city TEXT, departure_code TEXT, destination_city TEXT, destination_code TEXT,
        departure_time TEXT, arrival_time TEXT, flight_duration TEXT, aircraft_type TEXT,
        price_economy INTEGER, price_business INTEGER, flight_type TEXT, stops INTEGER, services TEXT
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT, booking_code TEXT UNIQUE,
        customer_name TEXT, customer_phone TEXT, customer_email TEXT,
        customer_id_number TEXT, customer_notes TEXT, total_amount INTEGER,
        status TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS booking_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT, booking_id INTEGER,
        item_type TEXT, title TEXT, ticket_class TEXT, quantity INTEGER,
        unit_price INTEGER, subtotal INTEGER
      );
    `);
    this.seedDataOnly();
  }

  seedDataOnly() {
    if (!this.db) return;
    try {
      this.db.run("DELETE FROM airlines; DELETE FROM tours; DELETE FROM flights;");

      const stmtAirline = this.db.prepare("INSERT INTO airlines VALUES (?,?,?,?,?)");
      DEFAULT_AIRLINES.forEach(a => stmtAirline.run([a.id, a.code, a.name, a.logo_url, a.country]));
      stmtAirline.free();

      const stmtTour = this.db.prepare("INSERT INTO tours VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      DEFAULT_TOURS.forEach(t => stmtTour.run([t.id, t.code, t.title, t.thumbnail_url, t.duration_days, t.duration_nights, t.price, t.airline_id, t.departure_city, t.destination_city, t.aircraft_type, t.flight_time, t.services, t.itinerary_json]));
      stmtTour.free();

      const stmtFlight = this.db.prepare("INSERT INTO flights VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      DEFAULT_FLIGHTS.forEach(f => stmtFlight.run([f.id, f.flight_number, f.airline_id, f.departure_city, f.departure_code, f.destination_city, f.destination_code, f.departure_time, f.arrival_time, f.flight_duration, f.aircraft_type, f.price_economy, f.price_business, f.flight_type, f.stops, f.services]));
      stmtFlight.free();
    } catch (e) {
      console.error('Lỗi khi nạp dữ liệu hạt giống vào SQLite:', e);
    }
  }

  saveToStorage() {
    if (!this.db) return;
    try {
      const data = this.db.export();
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(Array.from(data)));
    } catch (e) {
      console.error('Không thể lưu DB vào localStorage:', e);
    }
  }

  // Chuyển kết quả exec() của sql.js thành mảng đối tượng JavaScript
  parseSqlResults(res) {
    if (!res || res.length === 0) return [];
    const columns = res[0].columns;
    return res[0].values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => { obj[col] = row[idx]; });
      return obj;
    });
  }

  // 1. LẤY DANH SÁCH HÃNG BAY (SQL THUẦN)
  async getAirlines() {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        const res = this.db.exec("SELECT * FROM airlines ORDER BY id ASC");
        const list = this.parseSqlResults(res);
        if (list.length > 0) return list;
      } catch (e) {
        console.error('Lỗi query getAirlines:', e);
      }
    }
    return DEFAULT_AIRLINES;
  }

  // 2. LẤY DANH SÁCH TOUR DU LỊCH (SQL JOIN VỚI AIRLINES)
  async getTours(filters = {}) {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        let sql = `
          SELECT t.*, a.name AS airline_name, a.logo_url AS airline_logo
          FROM tours t
          LEFT JOIN airlines a ON t.airline_id = a.id
          WHERE 1=1
        `;
        if (filters.airline_id) {
          sql += ` AND t.airline_id = ${parseInt(filters.airline_id)}`;
        }
        if (filters.sort === 'price_desc') {
          sql += ` ORDER BY t.price DESC`;
        } else {
          sql += ` ORDER BY t.price ASC`;
        }

        const res = this.db.exec(sql);
        const list = this.parseSqlResults(res);
        if (list.length > 0) return list;
      } catch (e) {
        console.error('Lỗi query getTours:', e);
      }
    }

    // Fallback
    let list = DEFAULT_TOURS.map(t => {
      const airline = DEFAULT_AIRLINES.find(a => a.id === t.airline_id);
      return { ...t, airline_name: airline ? airline.name : 'VietJet Air', airline_logo: airline ? airline.logo_url : '' };
    });
    if (filters.airline_id) list = list.filter(t => t.airline_id === parseInt(filters.airline_id));
    if (filters.sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => a.price - b.price);
    return list;
  }

  // 3. CHI TIẾT TOUR DU LỊCH THEO ID (SQL QUERY)
  async getTourById(id) {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        const sql = `
          SELECT t.*, a.name AS airline_name, a.logo_url AS airline_logo
          FROM tours t
          LEFT JOIN airlines a ON t.airline_id = a.id
          WHERE t.id = ${parseInt(id)}
        `;
        const res = this.db.exec(sql);
        const rows = this.parseSqlResults(res);
        if (rows.length > 0) return rows[0];
      } catch (e) {
        console.error('Lỗi query getTourById:', e);
      }
    }

    const tour = DEFAULT_TOURS.find(t => t.id === parseInt(id));
    if (!tour) return null;
    const airline = DEFAULT_AIRLINES.find(a => a.id === tour.airline_id);
    return { ...tour, airline_name: airline ? airline.name : 'VietJet Air', airline_logo: airline ? airline.logo_url : '' };
  }

  // 4. LẤY DANH SÁCH CHUYẾN BAY (SQL JOIN VÀ NHIỀU ĐIỀU KIỆN LỌC)
  async getFlights(filters = {}) {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        let sql = `
          SELECT f.*, a.name AS airline_name, a.logo_url AS airline_logo
          FROM flights f
          LEFT JOIN airlines a ON f.airline_id = a.id
          WHERE 1=1
        `;

        if (filters.from) {
          const fromSafe = filters.from.replace(/'/g, "''");
          sql += ` AND (f.departure_code LIKE '%${fromSafe}%' OR f.departure_city LIKE '%${fromSafe}%')`;
        }
        if (filters.to) {
          const toSafe = filters.to.replace(/'/g, "''");
          sql += ` AND (f.destination_code LIKE '%${toSafe}%' OR f.destination_city LIKE '%${toSafe}%')`;
        }
        if (filters.flight_type && filters.flight_type !== 'all') {
          sql += ` AND f.flight_type = '${filters.flight_type}'`;
        }
        if (filters.airlines && filters.airlines.length > 0) {
          const ids = filters.airlines.map(x => parseInt(x)).filter(x => !isNaN(x)).join(',');
          if (ids) sql += ` AND f.airline_id IN (${ids})`;
        }

        if (filters.sort === 'price_desc') {
          sql += ` ORDER BY f.price_economy DESC`;
        } else {
          sql += ` ORDER BY f.price_economy ASC`;
        }

        const res = this.db.exec(sql);
        let list = this.parseSqlResults(res);

        // Lọc giờ bay trên kết quả
        if (filters.timeSlots && filters.timeSlots.length > 0) {
          list = list.filter(f => {
            const hour = parseInt(String(f.departure_time).split(':')[0]);
            if (filters.timeSlots.includes('early') && hour >= 0 && hour < 6) return true;
            if (filters.timeSlots.includes('morning') && hour >= 6 && hour < 12) return true;
            if (filters.timeSlots.includes('afternoon') && hour >= 12 && hour < 18) return true;
            if (filters.timeSlots.includes('evening') && hour >= 18 && hour < 24) return true;
            return false;
          });
        }

        if (list.length > 0 || (filters.from || filters.to)) return list;
      } catch (e) {
        console.error('Lỗi query getFlights:', e);
      }
    }

    // Fallback
    let list = DEFAULT_FLIGHTS.map(f => {
      const airline = DEFAULT_AIRLINES.find(a => a.id === f.airline_id);
      return { ...f, airline_name: airline ? airline.name : 'VietJet Air', airline_logo: airline ? airline.logo_url : '' };
    });
    if (filters.from) {
      list = list.filter(f => f.departure_code.toLowerCase().includes(filters.from.toLowerCase()) || f.departure_city.toLowerCase().includes(filters.from.toLowerCase()));
    }
    if (filters.to) {
      list = list.filter(f => f.destination_code.toLowerCase().includes(filters.to.toLowerCase()) || f.destination_city.toLowerCase().includes(filters.to.toLowerCase()));
    }
    if (filters.airlines && filters.airlines.length > 0) {
      list = list.filter(f => filters.airlines.includes(String(f.airline_id)));
    }
    if (filters.sort === 'price_desc') list.sort((a, b) => b.price_economy - a.price_economy);
    else list.sort((a, b) => a.price_economy - b.price_economy);
    return list;
  }

  // 5. CHI TIẾT CHUYẾN BAY THEO ID (SQL QUERY)
  async getFlightById(id) {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        const sql = `
          SELECT f.*, a.name AS airline_name, a.logo_url AS airline_logo, a.country AS airline_country
          FROM flights f
          LEFT JOIN airlines a ON f.airline_id = a.id
          WHERE f.id = ${parseInt(id)}
        `;
        const res = this.db.exec(sql);
        const rows = this.parseSqlResults(res);
        if (rows.length > 0) return rows[0];
      } catch (e) {
        console.error('Lỗi query getFlightById:', e);
      }
    }

    const flight = DEFAULT_FLIGHTS.find(f => f.id === parseInt(id));
    if (!flight) return null;
    const airline = DEFAULT_AIRLINES.find(a => a.id === flight.airline_id);
    return { ...flight, airline_name: airline ? airline.name : 'VietJet Air', airline_logo: airline ? airline.logo_url : '' };
  }

  // 6. LƯU ĐƠN ĐĂNG KÝ VÀO SQLITE (TRANSACTION SQL)
  async saveBooking(bookingData) {
    await this.readyPromise;
    if (this.isWasmReady && this.db) {
      try {
        const stmt = this.db.prepare(`
          INSERT INTO bookings (booking_code, customer_name, customer_phone, customer_email, customer_id_number, customer_notes, total_amount, status)
          VALUES (?,?,?,?,?,?,?,?)
        `);
        stmt.run([
          bookingData.booking_code, bookingData.customer_name, bookingData.customer_phone,
          bookingData.customer_email, bookingData.customer_id_number, bookingData.customer_notes || '',
          bookingData.total_amount, 'CONFIRMED'
        ]);
        stmt.free();
        this.saveToStorage();
        console.log(`[SQLite WASM] Đã lưu thành công đơn hàng ${bookingData.booking_code} vào bảng bookings.`);
      } catch (err) {
        console.error('Lỗi lưu SQLite booking:', err);
      }
    }

    // Lưu song song vào localStorage
    const localBookings = JSON.parse(localStorage.getItem('vietjet_bookings_history') || '[]');
    localBookings.push(bookingData);
    localStorage.setItem('vietjet_bookings_history', JSON.stringify(localBookings));
    return true;
  }
}

// Khởi tạo đối tượng DB toàn cục
window.dbApp = new VietjetDatabase();
