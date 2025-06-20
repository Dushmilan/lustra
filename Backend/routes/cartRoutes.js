const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addItem, updateItem, removeItem } = require('../controllers/cartController');

// @route   GET api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, getCart);

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', auth, addItem);

// @route   PUT api/cart
// @desc    Update item quantity
// @access  Private
router.put('/', auth, updateItem);

// @route   DELETE api/cart
// @desc    Remove item from cart
// @access  Private
router.delete('/', auth, removeItem);

module.exports = router;
