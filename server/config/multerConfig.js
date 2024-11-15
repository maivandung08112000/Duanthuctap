// config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ và cách đặt tên file khi upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục để lưu file upload
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Tạo tên file ngẫu nhiên bằng timestamp
  }
});

// Kiểm tra loại file (chỉ cho phép upload ảnh)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed!');
  }
};

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file 5MB
  fileFilter: fileFilter
});

module.exports = upload;
