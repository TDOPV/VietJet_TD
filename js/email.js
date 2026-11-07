/**
 * ==============================================================================
 * js/email.js - Xử lý gửi Email xác nhận từ tiendungotsuka@gmail.com
 * Sử dụng thư viện EmailJS SDK cho môi trường Không có Backend
 * ==============================================================================
 */

const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'USER_PUBLIC_KEY',       // Cấu hình từ tài khoản EmailJS
  SERVICE_ID: 'vietjet_service',
  TEMPLATE_ID: 'vietjet_booking_template',
  SENDER_EMAIL: 'tiendungotsuka@gmail.com'
};

// Khởi tạo EmailJS SDK nếu đã nhúng thư viện
(function initEmailClient() {
  if (typeof window.emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'USER_PUBLIC_KEY') {
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
})();

/**
 * Gửi email xác nhận đặt chỗ cho khách hàng
 * @param {Object} bookingDetails Thông tin đơn hàng
 * @returns {Promise<Object>}
 */
async function sendBookingConfirmationEmail(bookingDetails) {
  const formattedPrice = Number(bookingDetails.total_amount).toLocaleString('vi-VN') + ' ₫';
  
  const templateParams = {
    sender_email: EMAILJS_CONFIG.SENDER_EMAIL,
    to_name: bookingDetails.customer_name,
    to_email: bookingDetails.customer_email,
    booking_code: bookingDetails.booking_code,
    phone: bookingDetails.customer_phone,
    id_number: bookingDetails.customer_id_number,
    total_amount: formattedPrice,
    booking_date: new Date().toLocaleString('vi-VN'),
    booking_items: bookingDetails.items_summary || 'Vé máy bay & Tour Vietjet'
  };

  console.log(`[Email Service] Chuẩn bị gửi email xác nhận từ: ${EMAILJS_CONFIG.SENDER_EMAIL} đến: ${bookingDetails.customer_email}`);

  try {
    if (typeof window.emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'USER_PUBLIC_KEY') {
      const response = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      console.log('[Email Service] Email thực tế đã được gửi thành công!', response);
      return { success: true, mode: 'real', response };
    } else {
      // Chế độ mô phỏng trực quan Client-Side
      console.log('%c[Email Giả Lập - Sent from tiendungotsuka@gmail.com]', 'color: #ee1d23; font-weight: bold; font-size: 14px;');
      console.table(templateParams);
      return {
        success: true,
        mode: 'simulation',
        sender: EMAILJS_CONFIG.SENDER_EMAIL,
        recipient: bookingDetails.customer_email,
        message: `Hệ thống đã gửi thư xác nhận đặt chỗ từ ${EMAILJS_CONFIG.SENDER_EMAIL} đến hộp thư ${bookingDetails.customer_email}!`
      };
    }
  } catch (error) {
    console.error('[Email Service Error]', error);
    return { success: false, error };
  }
}

window.sendBookingConfirmationEmail = sendBookingConfirmationEmail;
