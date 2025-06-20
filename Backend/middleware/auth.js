const jwt = require('jsonwebtoken');
const db = require('../utils/db');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from database
            const [rows] = await db.pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [decoded.user.id]);
            if (rows.length === 0) {
                return res.status(401).json({ msg: 'User not found' });
            }
            
            // Add user to request object
            req.user = rows[0];
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

module.exports = auth;
