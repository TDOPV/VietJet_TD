/**
 * ==============================================================================
 * js/cart.js - Quản lý Giỏ hàng (Cart State Manager)
 * Lưu trữ bền vững trong LocalStorage và tự động đồng bộ huy hiệu số lượng
 * ==============================================================================
 */

const CART_STORAGE_KEY = 'vietjet_cart_items';

class CartManager {
  constructor() {
    this.items = this.loadCart();
    document.addEventListener('DOMContentLoaded', () => this.updateBadge());
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Không thể đọc giỏ hàng:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.updateBadge();
    } catch (e) {
      console.error('Không thể lưu giỏ hàng:', e);
    }
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    // Thêm timestamp và ID độc nhất
    const cartItem = {
      ...item,
      cart_id: Date.now() + Math.random().toString(36).substring(2, 6),
      quantity: item.quantity || 1
    };
    this.items.push(cartItem);
    this.saveCart();

    if (window.showToast) {
      window.showToast(`Đã thêm "${item.title}" vào giỏ hàng!`, 'success');
    }
    return cartItem;
  }

  removeItem(cartId) {
    const prevLen = this.items.length;
    this.items = this.items.filter(item => item.cart_id !== cartId);
    if (this.items.length < prevLen) {
      this.saveCart();
      if (window.showToast) {
        window.showToast('Đã xóa mục khỏi giỏ hàng.', 'info');
      }
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    if (window.showToast) {
      window.showToast('Đã làm trống giỏ hàng.', 'info');
    }
  }

  getTotalAmount() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.items.length;
  }

  updateBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }
}

// Khởi tạo Cart Manager toàn cục
window.cartApp = new CartManager();
