// services/crudService.js
const addDocument = async (Model, data) => {
    try {
      const document = new Model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  };
  
  const getDocuments = async (Model, query = {}) => {
    try {
      return await Model.find(query);
    } catch (error) {
      throw new Error(`Error fetching documents: ${error.message}`);
    }
  };
  
  const updateDocumentById = async (Model, id, data) => {
    try {
      const document = await Model.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }
  
      Object.assign(document, data);
      document.updated_at = Date.now();
  
      return await document.save();
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  };
  
  const softDeleteDocumentById = async (Model, id) => {
    try {
      const document = await Model.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }
  
      document.status = 'inactive';
      document.updated_at = Date.now();
  
      return await document.save();
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  };
  
  module.exports = {
    addDocument,
    getDocuments,
    updateDocumentById,
    softDeleteDocumentById,
  };
  