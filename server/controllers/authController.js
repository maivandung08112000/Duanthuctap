const User = require('../models/user');
const generateToken = require('../config/jwt');

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Tạo người dùng mới
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Nếu người dùng được tạo, trả về thông tin người dùng kèm token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
        addresses: user.addresses,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
        addresses: user.addresses,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
