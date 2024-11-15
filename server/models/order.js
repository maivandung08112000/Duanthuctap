const mongoose = require('mongoose');

// Mô hình chi tiết từng biến thể sản phẩm trong đơn hàng
const orderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  img_url: { type: String },
  variants: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

// Mô hình đơn hàng
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết tới người dùng
  items: [orderItemSchema], // Các sản phẩm và biến thể trong đơn hàng
  total_price: { type: Number, required: true }, // Tổng tiền của đơn hàng
  receiver_name: { type: String, required: true }, // Tên người nhận
  receiver_phone: { type: String, required: true }, // Số điện thoại người nhận
  receiver_email: { type: String, required: true }, // Email người nhận
  receiver_address: { type: String, required: true }, // Địa chỉ nhận hàng
  note: { type: String }, // Ghi chú đơn hàng (nếu có)
  status: { type: String, default: 'Pending' }, // Trạng thái đơn hàng (Pending, Delivered, etc.)
  payment_method: {type: String, default: 'COD'},
  created_at: { type: Date, default: Date.now }, // Ngày đặt hàng
  updated_at: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
