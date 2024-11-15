const mongoose = require('mongoose');

// Mô hình chi tiết từng biến thể của sản phẩm trong giỏ hàng
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true }, // Giá của biến thể
  quantity: { type: Number, required: true } // Số lượng biến thể trong giỏ hàng
});

// Mô hình chi tiết từng sản phẩm trong giỏ hàng
const cartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String }, // Tên sản phẩm để hiển thị
  img_url: { type: String }, // URL ảnh của sản phẩm
  variants: [variantSchema] // Mảng chứa các biến thể của sản phẩm
});

// Mô hình giỏ hàng của người dùng
const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết tới người dùng
  items: [cartItemSchema], // Mảng chứa các sản phẩm trong giỏ hàng
  total_price: { type: Number, default: 0 }, // Tổng tiền của giỏ hàng
  total_items: { type: Number, default: 0 }, // Tổng số lượng biến thể trong giỏ hàng
  created_at: { type: Date, default: Date.now }, // Thời điểm giỏ hàng được tạo
  updated_at: { type: Date, default: Date.now } // Thời điểm giỏ hàng được cập nhật
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
