// controllers/categoryController.js
const Category = require('../models/category'); // Model cụ thể cho bảng danh mục
const crudService = require('../services/crudService');

// Thêm danh mục mới
const addCategory = async (req, res) => {
  const data = req.body; // Dữ liệu từ request

  try {
    const newDocument = await crudService.addDocument(Category, data);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document', error: error.message });
  }
};

// Lấy tất cả danh mục (chỉ hiện danh mục active)
const getCategories = async (req, res) => {
  // const query = { status: 'active' }; // Lọc chỉ danh mục active

  try {
    // const documents = await crudService.getDocuments(Category, query);
    const documents = await crudService.getDocuments(Category);
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  const { id } = req.params; // ID của danh mục
  const data = req.body; // Dữ liệu cập nhật

  try {
    const updatedDocument = await crudService.updateDocumentById(Category, id, data);
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error: error.message });
  }
};

// Xóa mềm danh mục (thay đổi status thành 'inactive')
const softDeleteCategory = async (req, res) => {
  const { id } = req.params; // ID của danh mục

  try {
    const deletedDocument = await crudService.softDeleteDocumentById(Category, id);
    res.status(200).json({ message: 'Document soft deleted', document: deletedDocument });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  softDeleteCategory,
};
