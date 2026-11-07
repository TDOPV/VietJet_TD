/**
 * ==============================================================================
 * js/flights.js - Xử lý tìm kiếm và bộ lọc danh sách chuyến bay
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', async () => {
  const flightListContainer = document.getElementById('flightResultsList');
  const resultCountEl = document.getElementById('flightResultCount');
  if (!flightListContainer) return;

  // Lấy tham số từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const fromParam = urlParams.get('from') || '';
  const toParam = urlParams.get('to') || '';
  const airlineParam = urlParams.get('airline') || '';
  const typeParam = urlParams.get('type') || '';

  // Khởi tạo trạng thái bộ lọc
  const currentFilter = {
    from: fromParam,
    to: toParam,
    flight_type: typeParam,
    sort: 'price_asc',
    airlines: airlineParam ? [airlineParam] : [],
    timeSlots: [],
    stops: 'all'
  };

  // Đồng bộ trạng thái vào form tìm kiếm trên header nếu có
  const searchFromInput = document.getElementById('filterFrom');
  const searchToInput = document.getElementById('filterTo');
  if (searchFromInput && fromParam) searchFromInput.value = fromParam;
  if (searchToInput && toParam) searchToInput.value = toParam;

  // Render danh sách các hãng bay vào Filter Sidebar
  async function loadAirlineCheckboxes() {
    const airlinesContainer = document.getElementById('airlineFilterList');
    if (!airlinesContainer) return;

    const airlines = await window.dbApp.getAirlines();
    airlinesContainer.innerHTML = airlines.map(a => `
      <label class="checkbox-label">
        <input type="checkbox" value="${a.id}" class="airline-filter-checkbox" ${currentFilter.airlines.includes(String(a.id)) ? 'checked' : ''}>
        <span>${a.name}</span>
      </label>
    `).join('');

    document.querySelectorAll('.airline-filter-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedAirlines = Array.from(document.querySelectorAll('.airline-filter-checkbox:checked')).map(c => c.value);
        currentFilter.airlines = checkedAirlines;
        renderFlightResults();
      });
    });
  }

  // Lắng nghe thay đổi bộ lọc sắp xếp giá
  const sortSelect = document.getElementById('sortPriceSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilter.sort = e.target.value;
      renderFlightResults();
    });
  }

  // Lắng nghe loại chuyến bay (radio hoặc checkbox)
  document.querySelectorAll('input[name="flightTypeFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilter.flight_type = e.target.value;
      renderFlightResults();
    });
  });

  // Lắng nghe khung giờ bay
  document.querySelectorAll('.time-slot-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const checkedSlots = Array.from(document.querySelectorAll('.time-slot-checkbox:checked')).map(c => c.value);
      currentFilter.timeSlots = checkedSlots;
      renderFlightResults();
    });
  });

  // Hàm render danh sách chuyến bay
  async function renderFlightResults() {
    flightListContainer.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">Đang tải danh sách chuyến bay...</p>
      </div>
    `;

    const flights = await window.dbApp.getFlights(currentFilter);

    if (resultCountEl) {
      resultCountEl.textContent = `Tìm thấy ${flights.length} chuyến bay`;
    }

    if (flights.length === 0) {
      flightListContainer.innerHTML = `
        <div class="card p-5 text-center">
          <i class="fas fa-plane-slash text-muted" style="font-size: 48px; margin-bottom: 16px;"></i>
          <h3>Không tìm thấy chuyến bay phù hợp</h3>
          <p class="text-muted">Vui lòng điều chỉnh lại bộ lọc hoặc chọn ngày bay khác.</p>
          <button class="btn btn-outline mt-3" style="max-width: 200px; margin: 0 auto;" id="btnResetFilters">Xóa bộ lọc</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          window.location.href = 'flights.html';
        });
      }
      return;
    }

    flightListContainer.innerHTML = flights.map(f => {
      let servicesArr = [];
      try {
        servicesArr = JSON.parse(f.services || '[]');
      } catch (e) {
        servicesArr = ['Hành lý xách tay 7kg'];
      }

      return `
        <div class="flight-item-card">
          <!-- Cột hãng bay -->
          <div class="flight-airline-col">
            <img src="${f.airline_logo}" alt="${f.airline_name}" class="flight-airline-logo">
            <span class="flight-code">${f.flight_number} • ${f.airline_name}</span>
            <span class="flight-aircraft">${f.aircraft_type}</span>
          </div>

          <!-- Cột hành trình -->
          <div class="flight-route-col">
            <div class="time-point">
              <div class="time-val">${f.departure_time}</div>
              <div class="airport-code">${f.departure_code} (${f.departure_city})</div>
            </div>

            <div class="flight-line-indicator">
              <span class="flight-duration-txt">${f.flight_duration}</span>
              <div class="route-bar">
                <i class="fas fa-plane"></i>
              </div>
              <span class="flight-stop-txt">${f.stops === 0 ? 'Bay thẳng' : f.stops + ' điểm dừng'}</span>
            </div>

            <div class="time-point">
              <div class="time-val">${f.arrival_time}</div>
              <div class="airport-code">${f.destination_code} (${f.destination_city})</div>
            </div>
          </div>

          <!-- Cột giá và chọn -->
          <div class="flight-action-col">
            <div class="flight-price-box">
              <div class="text-muted" style="font-size: 11px;">Giá vé từ</div>
              <div class="flight-price-num">${formatVND(f.price_economy)}</div>
              <div class="text-muted" style="font-size: 11px;">/ khách (chưa gồm thuế)</div>
            </div>
            <a href="flight-detail.html?id=${f.id}" class="btn btn-primary btn-sm">
              Chọn chuyến bay <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Khởi động
  await loadAirlineCheckboxes();
  await renderFlightResults();
});
