/**
 * ==============================================================================
 * js/tour.js - Xử lý tìm kiếm và bộ lọc danh sách tour du lịch
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', async () => {
  const tourListContainer = document.getElementById('tourResultsList');
  const resultCountEl = document.getElementById('tourResultCount');
  if (!tourListContainer) return;

  const currentTourFilter = {
    sort: 'price_asc',
    airline_id: ''
  };

  // Render checkbox hãng bay cho tour
  async function loadTourAirlines() {
    const airlinesContainer = document.getElementById('tourAirlineFilter');
    if (!airlinesContainer) return;

    const airlines = await window.dbApp.getAirlines();
    airlinesContainer.innerHTML = airlines.map(a => `
      <label class="checkbox-label">
        <input type="radio" name="tourAirline" value="${a.id}" class="tour-airline-radio">
        <span>${a.name}</span>
      </label>
    `).join('');

    document.querySelectorAll('.tour-airline-radio').forEach(rb => {
      rb.addEventListener('change', (e) => {
        currentTourFilter.airline_id = e.target.value;
        renderTourResults();
      });
    });
  }

  // Sắp xếp giá tour
  const sortTourSelect = document.getElementById('sortTourPrice');
  if (sortTourSelect) {
    sortTourSelect.addEventListener('change', (e) => {
      currentTourFilter.sort = e.target.value;
      renderTourResults();
    });
  }

  // Render danh sách Tour
  async function renderTourResults() {
    tourListContainer.innerHTML = `
      <div class="text-center py-5" style="grid-column: 1 / -1;">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">Đang tải danh sách tour du lịch...</p>
      </div>
    `;

    const tours = await window.dbApp.getTours(currentTourFilter);

    if (resultCountEl) {
      resultCountEl.textContent = `Tìm thấy ${tours.length} tour du lịch`;
    }

    if (tours.length === 0) {
      tourListContainer.innerHTML = `
        <div class="card p-5 text-center" style="grid-column: 1 / -1;">
          <i class="fas fa-map-marked-alt text-muted" style="font-size: 48px; margin-bottom: 16px;"></i>
          <h3>Không tìm thấy tour phù hợp</h3>
          <p class="text-muted">Vui lòng thử lại với tiêu chí tìm kiếm khác.</p>
        </div>
      `;
      return;
    }

    tourListContainer.innerHTML = tours.map(t => `
      <div class="tour-card">
        <div class="tour-thumb-wrap">
          <img src="${t.thumbnail_url}" alt="${t.title}" loading="lazy">
          <div class="tour-badge-days">${t.duration_days}N${t.duration_nights}Đ</div>
          <div class="tour-airline-tag">
            <i class="fas fa-plane"></i> ${t.airline_name}
          </div>
        </div>
        <div class="tour-card-body">
          <h3 class="tour-card-title">${t.title}</h3>
          <div class="tour-route-meta">
            <i class="fas fa-map-marker-alt text-primary"></i> ${t.departure_city} ➔ ${t.destination_city}
          </div>
          <p class="text-muted" style="font-size: 12px; margin-bottom: 12px;">
            <i class="fas fa-shield-alt text-success"></i> ${t.services || 'Khách sạn 4 sao, Vé máy bay khứ hồi'}
          </p>
          <div class="tour-card-footer">
            <div class="tour-price-box">
              <span class="tour-price-label">Giá trọn gói từ</span>
              <span class="tour-price-val">${formatVND(t.price)}</span>
            </div>
            <a href="tour-detail.html?id=${t.id}" class="btn btn-outline btn-sm">
              Chi tiết tour
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  await loadTourAirlines();
  await renderTourResults();
});
