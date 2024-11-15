const Cart = require('../models/cart');
const Order = require('../models/order');
const axios = require("axios");
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const moment = require('moment');
// Lấy toàn bộ đơn hàng
const getAllOrders = async (req, res) => {
  try {
    // Tìm tất cả các đơn hàng trong hệ thống, sắp xếp theo ngày đặt hàng mới nhất
    const orders = await Order.find().sort({ created_at: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      orders: orders.map((order) => ({
        order_id: order._id,
        user_id: order.user_id,
        items: order.items.map((item) => ({
          product_id: item.product_id,
          name: item.name,
          img_url: item.img_url,
          variants: item.variants.map((variant) => ({
            color: variant.color,
            size: variant.size,
            price: variant.price,
            quantity: variant.quantity,
          })),
        })),
        total_price: order.total_price,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        receiver_address: order.receiver_address,
        note: order.note,
        status: order.status,
        payment_method: order.payment_method,
        created_at: order.created_at,
        updated_at: order.updated_at,
      })),
    });
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
    res
      .status(500)
      .json({ message: 'Error fetching all orders', error: error.message });
  }
};

const placeOrder = async (req, res) => {
  const user_id = req.user._id; // Lấy user_id từ req.user (đã có middleware auth)
  const {
    receiver_name,
    receiver_phone,
    receiver_email,
    receiver_address,
    note,
  } = req.body;

  try {
    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ user_id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Tạo đơn hàng từ giỏ hàng
    const newOrder = new Order({
      user_id,
      items: cart.items, // Lấy các sản phẩm từ giỏ hàng
      total_price: cart.total_price, // Tổng giá trị đơn hàng
      receiver_name,
      receiver_phone,
      receiver_email,
      receiver_address,
      note, // Ghi chú đơn hàng
    });

    // Lưu đơn hàng
    await newOrder.save();

    // Xóa giỏ hàng sau khi đặt hàng thành công (nếu cần)
    await Cart.findOneAndDelete({ user_id });

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error.message);
    return res
      .status(500)
      .json({ message: 'Error placing order', error: error.message });
  }
};

// Cấu hình ZaloPay
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

// Hàm tạo đơn hàng ZaloPay
const createZaloPayOrder = async (req, res) => {
  const { amount, description } = req.body;
  const embed_data = { redirecturl: 'http://localhost:5555/api/' };
  const items = [];
  const transID = Math.floor(Math.random() * 1000000);
  
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // Unique transaction ID
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount,
    description: description || `Payment for order #${transID}`,
    bank_code: '',
    callback_url: 'https://breezy-forks-turn.loca.lt/callback'
  };

  // Chuỗi dữ liệu để tạo `MAC`
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    if (response.data.return_code === 1) {
      res.status(200).json({
        message: "Order created successfully",
        orderDetails: {
          app_id: order.app_id,
          app_trans_id: order.app_trans_id,
          amount: order.amount,
          description: order.description,
          paymentUrl: response.data.order_url,
          app_time: order.app_time,
          callback_url: order.callback_url,
          embed_data: order.embed_data,
        }
      });
    } else {
      res.status(400).json({ message: "Failed to create order", data: response.data });
    }
  } catch (error) {
    console.error("Error creating ZaloPay order:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const handleZaloPayCallback = (req, res) => {
  let result = {};

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    // Tạo lại MAC từ dataStr và key2 để xác minh callback
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = 'Invalid MAC';
    } else {
      const dataJson = JSON.parse(dataStr);
      console.log(`Update order status to success for app_trans_id = ${dataJson.app_trans_id}`);
      
      // Cập nhật trạng thái đơn hàng thành công trong cơ sở dữ liệu
      result.return_code = 1;
      result.return_message = 'Success';
    }
  } catch (error) {
    console.error("Callback error:", error.message);
    result.return_code = 0;
    result.return_message = error.message;
  }

  res.json(result);
};



// Hàm kiểm tra trạng thái đơn hàng
const checkOrderStatus = async (req, res) => {
  const { app_trans_id } = req.body;

  const postData = {
    app_id: config.app_id,
    app_trans_id
  };

  // Chuỗi dữ liệu để tạo `MAC`
  const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  const postConfig = {
    method: 'post',
    url: 'https://sb-openapi.zalopay.vn/v2/query',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: require('qs').stringify(postData),
  };

  try {
    const response = await axios(postConfig);
    console.log("Order status:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error checking order status:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Lấy danh sách đơn hàng của người dùng
const getUserOrders = async (req, res) => {
  const user_id = req.user._id; // Lấy user_id từ req.user (đã có middleware auth)

  try {
    // Tìm tất cả các đơn hàng thuộc về người dùng hiện tại
    const orders = await Order.find({ user_id }).sort({ created_at: -1 }); // Sắp xếp theo ngày đặt hàng mới nhất

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      orders: orders.map((order) => ({
        order_id: order._id,
        items: order.items.map((item) => ({
          product_id: item.product_id,
          name: item.name,
          img_url: item.img_url,
          variants: item.variants.map((variant) => ({
            color: variant.color,
            size: variant.size,
            price: variant.price,
            quantity: variant.quantity,
          })),
        })),
        total_price: order.total_price,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        receiver_address: order.receiver_address,
        note: order.note,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
      })),
    });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res
      .status(500)
      .json({ message: 'Error fetching orders', error: error.message });
  }
};

// Cập nhật thông tin đơn hàng
const updateOrder = async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ params
  const {
    receiver_name,
    receiver_phone,
    receiver_email,
    receiver_address,
    note,
    status,
  } = req.body; // Lấy thông tin từ body

  try {
    // Tìm đơn hàng theo ID
    const order = await Order.findById(orderId);

    // Nếu không tìm thấy đơn hàng
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Cập nhật các thông tin đơn hàng
    order.receiver_name = receiver_name || order.receiver_name;
    order.receiver_phone = receiver_phone || order.receiver_phone;
    order.receiver_email = receiver_email || order.receiver_email;
    order.receiver_address = receiver_address || order.receiver_address;
    order.note = note || order.note;
    order.status = status || order.status;

    // Lưu lại thay đổi
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error.message);
    res
      .status(500)
      .json({ message: 'Error updating order', error: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
  createZaloPayOrder,
  handleZaloPayCallback,
  checkOrderStatus
};
