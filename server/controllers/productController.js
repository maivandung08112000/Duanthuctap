const mongoose = require('mongoose'); // Thêm dòng này để import mongoose
const crudService = require('../services/crudService');
const Product = require('../models/product'); // Model cho bảng Sản Phẩm

// Thêm sản phẩm mới kèm album ảnh
const addProduct = async (req, res) => {
  const data = req.body;

  try {
    // Nếu có file ảnh được upload
    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({ img_url: `/uploads/${file.filename}` }));
      data.image = images; // Gắn mảng ảnh vào data
    }

    // Nếu có variants, kiểm tra xem nó có phải là mảng không
    if (data.variants) {
      if (Array.isArray(data.variants)) {
        data.variants = data.variants.map(variant => JSON.parse(variant)); // Chuyển đổi từng variant từ chuỗi sang đối tượng
      } else {
        data.variants = JSON.parse(data.variants); // Nếu không phải là mảng, chuyển đổi trực tiếp
      }
    }

    const newProduct = await crudService.addDocument(Product, data);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await crudService.getDocuments(Product, { _id: id });
      if (!product || product.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product[0]); // Trả về phần tử đầu tiên
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  };
  

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Kiểm tra xem categoryId có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    // Sử dụng `new` để tạo ObjectId hợp lệ
    const products = await Product.find({
      category_id: new mongoose.Types.ObjectId(categoryId), // Sử dụng `new` để tạo ObjectId
      status: 'active' // Chỉ lấy sản phẩm có trạng thái 'active'
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    // Trả về danh sách sản phẩm
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error.message);
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
};

// Lấy tất cả sản phẩm (chỉ sản phẩm active)
const getAllProducts = async (req, res) => {
  try {
    const products = await crudService.getDocuments(Product, { status: 'active' });
    // const products = await crudService.getDocuments(Product);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Hàm cập nhật sản phẩm
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Nếu có file ảnh mới được upload
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({ img_url: `/uploads/${file.filename}` }));
      product.image = newImages;  // Gắn mảng đường dẫn ảnh mới vào sản phẩm
    }

    // Cập nhật các trường khác của sản phẩm
    product.name = updatedData.name || product.name;
    product.status = updatedData.status || product.status;
    product.description = updatedData.description || product.description;
    product.category_id = updatedData.category_id || product.category_id;

    // Nếu có biến thể mới (variants), kiểm tra để đảm bảo là mảng
    if (Array.isArray(updatedData.variants)) {
      product.variants = updatedData.variants.map(variant => JSON.parse(variant));  // Ghi đè biến thể mới nếu có
    }

    // Lưu sản phẩm sau khi cập nhật
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};


// Xóa mềm sản phẩm (thay đổi trạng thái thành 'inactive')
const softDeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await crudService.softDeleteDocumentById(Product, id);
    res.status(200).json({ message: 'Product soft deleted', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  softDeleteProduct,
  getProductById,
  getProductsByCategory,
};
