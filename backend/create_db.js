const { Pool } = require('pg');
require('dotenv').config();

async function createDb() {
    try {
        const pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: 'postgres', // Connect to default DB
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        console.log('Connected to default DB. Creating "tinder_clone" database...');

        // Check if DB exists
        const res = await pool.query("SELECT 1 FROM pg_database WHERE datname='tinder_clone'");
        if (res.rows.length === 0) {
            await pool.query('CREATE DATABASE "tinder_clone"');
            console.log('Database "tinder_clone" created successfully.');
        } else {
            console.log('Database "tinder_clone" already exists.');
        }

        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('Error creating database:', err);
        process.exit(1);
    }
}

createDb();
