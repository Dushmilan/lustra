require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./utils/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 

// Add a health check route
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT 1');
        res.json({
            status: 'ok',
            database: 'MySQL Connected',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            database: 'MySQL Connection Failed',
            error: err.message
        });
    }
});

// Routes
try {
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/products', require('./routes/productRoutes'));
    app.use('/api/cart', require('./routes/cartRoutes'));
} catch (err) {
    console.error('Error loading routes:', err);
    process.exit(1);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
