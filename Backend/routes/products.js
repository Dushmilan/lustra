const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create product (admin only)
router.post('/', [auth, admin], async (req, res) => {
    const { name, price, imageUrl, category, description, stock } = req.body;

    try {
        const product = new Product({
            name,
            price,
            imageUrl,
            category,
            description,
            stock
        });

        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update product (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
    const { name, price, imageUrl, category, description, stock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.imageUrl = imageUrl || product.imageUrl;
        product.category = category || product.category;
        product.description = description || product.description;
        product.stock = stock || product.stock;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete product (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
