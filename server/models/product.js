const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  price_sale: { type: Number, required: false },
});

const imageSchema = new mongoose.Schema({
  img_url: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'active' },
  description: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Liên kết tới Category
  variants: [variantSchema], // Mảng biến thể sản phẩm (màu, size, ...)
  image: [imageSchema], // Mảng hình ảnh sản phẩm
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


