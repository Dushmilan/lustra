const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const productController = require('../controllers/productController');
const upload = require('../config/multer');

// Ensure uploads directory exists
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads/products');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', productController.getAllProducts);

// @route   GET api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', productController.getProduct);

// @route   POST api/products
// @desc    Create product
// @access  Private (Admin)
router.post('/', auth, admin, upload.single('image'), productController.createProduct);

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/:id', auth, admin, productController.updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router;
