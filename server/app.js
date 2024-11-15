const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const Route = require('./routes/route');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Đường dẫn đến file model User
require('dotenv').config();

const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connectDB()
.then(async () => {
  console.log('Connected to MongoDB');
  await initializeAdminUser(); // Gọi hàm tạo tài khoản admin sau khi kết nối DB thành công
})
.catch((error) => console.error('Could not connect to MongoDB:', error));

// Hàm khởi tạo tài khoản admin
async function initializeAdminUser() {
try {
  const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });

  if (!existingAdmin) {
    const adminUser = new User({
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123@123ab',
      role: 'admin',
      active: 'active'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
} catch (error) {
  console.error('Error initializing admin user:', error);
}
}

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

// Cấu hình để express có thể phục vụ các file trong thư mục "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', Route);

// Khởi động server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
