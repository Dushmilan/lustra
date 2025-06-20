const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.json({ items: [], total: 0 });
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id });
        }

        // Check if item already exists in cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        
        if (itemIndex >= 0) {
            // Update quantity if item exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update cart item quantity
router.put('/update/:itemId', auth, async (req, res) => {
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
