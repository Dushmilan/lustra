const db = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        // Validate role
        if (role && !['user', 'admin'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid role' });
        }

        // Check if user exists
        const [rows] = await db.pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate UUID for user ID
        const userId = require('uuid').v4();

        // Insert user
        await db.pool.query(
            'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [userId, name, email, hashedPassword, role]
        );

        // Get user details including role
        const [userRows] = await db.pool.query('SELECT id, role FROM users WHERE email = ?', [email]);
        const user = userRows[0];

        // Return token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [rows] = await db.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Return token and user data
        const payload = {
            user: {
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                role: rows[0].role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
};

// Get user data
exports.getUser = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
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
