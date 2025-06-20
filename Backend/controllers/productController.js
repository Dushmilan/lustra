const db = require('../utils/db');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        // Get the uploaded file
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: 'No image uploaded' });
        }

        // Get form data
        const name = req.body.name;
        const price = parseFloat(req.body.price);
        const category = req.body.category;
        const description = req.body.description;
        const stock = parseInt(req.body.stock);

        // Validate required fields
        if (!name || !price || !category || !description || !stock) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        
        // Generate UUID for product ID
        const productId = require('uuid').v4();

        // Set image URL using the uploaded file's filename
        const imageUrl = `/uploads/products/${file.filename}`;

        await db.pool.query(
            'INSERT INTO products (id, name, price, image_url, category, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [productId, name, price, imageUrl, category, description, stock]
        );

        // Get the newly created product
        const [rows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const updateFields = [];
        const values = [];

        if (req.body.name) {
            updateFields.push('name = ?');
            values.push(req.body.name);
        }
        if (req.body.price) {
            updateFields.push('price = ?');
            values.push(req.body.price);
        }
        if (req.body.imageUrl) {
            updateFields.push('image_url = ?');
            values.push(req.body.imageUrl);
        }
        if (req.body.category) {
            updateFields.push('category = ?');
            values.push(req.body.category);
        }
        if (req.body.description) {
            updateFields.push('description = ?');
            values.push(req.body.description);
        }
        if (req.body.stock) {
            updateFields.push('stock = ?');
            values.push(req.body.stock);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ msg: 'No fields to update' });
        }

        values.push(req.params.id);
        const updateQuery = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;

        await db.pool.query(updateQuery, values);
        
        const [updatedRows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        res.json(updatedRows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await db.pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};
