const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promise wrapper for pool
const promisePool = pool.promise();

// Helper functions
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

// Export pool and helpers
module.exports = {
    pool: promisePool,
    hashPassword,
    comparePassword
};
