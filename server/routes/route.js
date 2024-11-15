const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { addCategory, getCategories, updateCategory, softDeleteCategory } = require('../controllers/categoryController');
const { addProduct, getProductById, getProductsByCategory,  getAllProducts, updateProduct, softDeleteProduct } = require('../controllers/productController');
const { addToCart, getCartDetails } = require('../controllers/cartController');
const { placeOrder, getUserOrders, getAllOrders, updateOrder, createZaloPayOrder, handleZaloPayCallback, checkOrderStatus } = require('../controllers/orderController.js');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = require('../config/multerConfig'); // Cấu hình multer để upload file

const router = express.Router();

// QUẢN LÝ NGƯỜI DÙNG
// Route đăng ký người dùng
router.post('/auth/register', registerUser);

// Route đăng nhập người dùng
router.post('/auth/login', loginUser);


// QUẢN LÝ DANH MỤC
// Route thêm danh mục mới
router.post('/categories/add', addCategory);

// Route lấy tất cả danh mục (chỉ danh mục 'active')
router.get('/categories/', getCategories);

// Route cập nhật danh mục
router.put('/categories/update/:id', updateCategory);

// Route xóa mềm danh mục
router.delete('/categories/delete/:id', softDeleteCategory);

// QUẢN LÝ SẢN PHẨM
// Route thêm sản phẩm mới
router.post('/product/add', upload.array('images', 10), addProduct);

// Route sửa sản phẩm
router.put('/product/update/:id', upload.array('images', 10), updateProduct);

// Route lấy sản phẩm theo ID
router.get('/product/:id', getProductById);

// Route lấy sản phẩm theo danh mục
router.get('/product-category/:categoryId', getProductsByCategory);

// Route lấy tất cả sản phẩm (chỉ sản phẩm 'active')
router.get('/product/', getAllProducts);

// Route cập nhật sản phẩm
router.put('/product/update/:id', updateProduct);

// Route xóa mềm sản phẩm
router.delete('/product/delete/:id', softDeleteProduct);



// GIỎ HÀNG - CART
// Thêm giỏ hàng
router.post('/add-to-cart', authMiddleware, addToCart);

// list giỏ hàng
router.get('/cart', authMiddleware, getCartDetails);

// ĐƠN HÀNG 
// đặt hàng  
router.post('/place-order', authMiddleware, placeOrder);


// đặt hàng  
router.post('/place-order-zalo', createZaloPayOrder);


// Route callback ZaloPay
router.post('/callback', handleZaloPayCallback);

// Route kiểm tra trạng thái đơn hàng
router.post('/check-status-order', checkOrderStatus);

// lấy danh sách đơn hàng của người dùng
router.get('/orders', authMiddleware, getUserOrders);

// Admin lấy toàn bộ đơn hàng
router.get('/all-orders', getAllOrders);

// Route cập nhật đơn hàng
router.put('/order/:orderId', updateOrder);

module.exports = router;

