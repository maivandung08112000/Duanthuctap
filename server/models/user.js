const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String},
  active: { type: String, default: 'active' }, // Trạng thái tài khoản mặc định là 'active'/'inactive
  addresses: [], // Mảng địa chỉ
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// So sánh mật khẩu
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;