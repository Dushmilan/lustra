const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lustra'
});

// Read schema file
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Initialize database
connection.query(schema, (err) => {
    if (err) {
        console.error('Error initializing database:', err);
        return;
    }
    console.log('Database initialized successfully');
});

// Create default admin user if not exists
connection.query(
    'SELECT id FROM users WHERE email = ?',
    ['admin@example.com'],
    (err, results) => {
        if (err) {
            console.error('Error checking admin user:', err);
            return;
        }

        if (results.length === 0) {
            const password = 'admin123';
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return;
                }

                const userId = require('uuid').v4();
                connection.query(
                    'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
                    [userId, 'Admin User', 'admin@example.com', hashedPassword, 'admin'],
                    (err) => {
                        if (err) {
                            console.error('Error creating admin user:', err);
                        } else {
                            console.log('Admin user created successfully');
                        }
                    }
                );
            });
        }
    }
);

// Close connection after 2 seconds
setTimeout(() => {
    connection.end();
}, 2000);
