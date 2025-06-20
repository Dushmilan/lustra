const db = require('../utils/db');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const [cartRows] = await db.pool.query(
            'SELECT c.*, p.* FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE c.user_id = ?',
            [req.user.id]
        );

        if (cartRows.length === 0) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Group items by cart ID
        const cart = {
            id: cartRows[0].id,
            user_id: cartRows[0].user_id,
            items: [],
            total: 0
        };

        // Calculate total and build items array
        cartRows.forEach(row => {
            const existingItem = cart.items.find(item => item.product_id === row.product_id);
            if (existingItem) {
                existingItem.quantity += row.quantity;
            } else {
                cart.items.push({
                    product_id: row.product_id,
                    product: {
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        image_url: row.image_url,
                        category: row.category,
                        description: row.description,
                        stock: row.stock
                    },
                    quantity: row.quantity
                });
            }
            cart.total += row.quantity * row.price;
        });

        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Add item to cart
exports.addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Get product details
        const [productRows] = await db.pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (productRows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Get or create cart
        const [cartRows] = await db.pool.query('SELECT * FROM carts WHERE user_id = ?', [req.user.id]);
        const cartId = cartRows.length > 0 ? cartRows[0].id : require('uuid').v4();

        // Check if item already exists in cart
        const [itemRows] = await db.pool.query(
            'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );

        if (itemRows.length > 0) {
            // Update quantity if item exists
            await db.pool.query(
                'UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?',
                [quantity, cartId, productId]
            );
        } else {
            // Insert new cart if it doesn't exist
            if (cartRows.length === 0) {
                await db.pool.query(
                    'INSERT INTO carts (id, user_id) VALUES (?, ?)',
                    [cartId, req.user.id]
                );
            }

            // Insert new cart item
            await db.pool.query(
                'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
                [cartId, productId, quantity]
            );
        }

        // Get updated cart
        const [updatedCartRows] = await db.pool.query(
            'SELECT c.*, p.* FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE c.id = ?',
            [cartId]
        );

        // Build response
        const cart = {
            id: cartId,
            user_id: req.user.id,
            items: [],
            total: 0
        };

        updatedCartRows.forEach(row => {
            const existingItem = cart.items.find(item => item.product_id === row.product_id);
            if (existingItem) {
                existingItem.quantity += row.quantity;
            } else {
                cart.items.push({
                    product_id: row.product_id,
                    product: {
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        image_url: row.image_url,
                        category: row.category,
                        description: row.description,
                        stock: row.stock
                    },
                    quantity: row.quantity
                });
            }
            cart.total += row.quantity * row.price;
        });

        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Update item quantity
exports.updateItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if cart item exists
        const [cartRows] = await db.pool.query(
            'SELECT c.*, ci.*, p.* FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE c.user_id = ? AND ci.product_id = ?',
            [req.user.id, productId]
        );

        if (cartRows.length === 0) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        // Update quantity
        await db.pool.query(
            'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
            [quantity, cartRows[0].cart_id, productId]
        );

        // Get updated cart
        const [updatedCartRows] = await db.pool.query(
            'SELECT c.*, p.* FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE c.id = ?',
            [cartRows[0].cart_id]
        );

        // Build response
        const cart = {
            id: cartRows[0].cart_id,
            user_id: req.user.id,
            items: [],
            total: 0
        };

        updatedCartRows.forEach(row => {
            const existingItem = cart.items.find(item => item.product_id === row.product_id);
            if (existingItem) {
                existingItem.quantity += row.quantity;
            } else {
                cart.items.push({
                    product_id: row.product_id,
                    product: {
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        image_url: row.image_url,
                        category: row.category,
                        description: row.description,
                        stock: row.stock
                    },
                    quantity: row.quantity
                });
            }
            cart.total += row.quantity * row.price;
        });

        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
    try {
        const { productId } = req.body;

        // Get cart ID
        const [cartRows] = await db.pool.query(
            'SELECT c.id FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'WHERE c.user_id = ? AND ci.product_id = ?',
            [req.user.id, productId]
        );

        if (cartRows.length === 0) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        // Delete cart item
        await db.pool.query(
            'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartRows[0].id, productId]
        );

        // Get updated cart
        const [updatedCartRows] = await db.pool.query(
            'SELECT c.*, p.* FROM carts c ' +
            'JOIN cart_items ci ON c.id = ci.cart_id ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE c.id = ?',
            [cartRows[0].id]
        );

        // Build response
        const cart = {
            id: cartRows[0].id,
            user_id: req.user.id,
            items: [],
            total: 0
        };

        updatedCartRows.forEach(row => {
            const existingItem = cart.items.find(item => item.product_id === row.product_id);
            if (existingItem) {
                existingItem.quantity += row.quantity;
            } else {
                cart.items.push({
                    product_id: row.product_id,
                    product: {
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        image_url: row.image_url,
                        category: row.category,
                        description: row.description,
                        stock: row.stock
                    },
                    quantity: row.quantity
                });
            }
            cart.total += row.quantity * row.price;
        });

        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};


