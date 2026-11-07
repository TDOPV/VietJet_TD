/**
 * ==============================================================================
 * js/app.js - Tiện ích giao diện dùng chung (Common UI Helpers)
 * ==============================================================================
 */

// Định dạng tiền VND
function formatVND(amount) {
  return Number(amount || 0).toLocaleString('vi-VN') + ' ₫';
}
window.formatVND = formatVND;

// Hệ thống hiển thị Toast Popup
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle text-success' : 'fa-info-circle text-primary'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

// Kích hoạt trạng thái active cho Menu tương ứng trang hiện tại
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Xử lý nút Swap đảo chiều Đi - Đến
  const swapBtn = document.getElementById('btnSwapRoute');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const fromInput = document.getElementById('searchFrom');
      const toInput = document.getElementById('searchTo');
      if (fromInput && toInput) {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
      }
    });
  }

  // Xử lý radio Khứ hồi / Một chiều
  const radioOneway = document.getElementById('tripOneway');
  const radioRoundtrip = document.getElementById('tripRoundtrip');
  const returnDateInput = document.getElementById('searchReturnDate');

  if (radioOneway && radioRoundtrip && returnDateInput) {
    const updateDateState = () => {
      if (radioOneway.checked) {
        returnDateInput.disabled = true;
        returnDateInput.style.opacity = '0.5';
      } else {
        returnDateInput.disabled = false;
        returnDateInput.style.opacity = '1';
      }
    };

    radioOneway.addEventListener('change', updateDateState);
    radioRoundtrip.addEventListener('change', updateDateState);
    updateDateState();
  }
});
