const db = require('./db');

async function test() {
    try {
        console.log('Testing connection...');
        console.log('DB Config:', {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD ? '******' : '(not set)'
        });
        const res = await db.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);
        process.exit(0);
    } catch (err) {
        console.log('Connection failed to target DB:', err.message);

        // If DB doesn't exist (code 3D000), try connecting to 'postgres' to check creds
        if (err.code === '3D000') {
            console.log('Database does not exist. Attempting to connect to default "postgres" db...');
            try {
                const { Pool } = require('pg');
                const pool2 = new Pool({
                    user: process.env.DB_USER,
                    host: process.env.DB_HOST,
                    database: 'postgres',
                    password: process.env.DB_PASSWORD,
                    port: process.env.DB_PORT,
                });
                await pool2.query('SELECT 1');
                console.log('CREDENTIALS_OK_DB_MISSING');
            } catch (err2) {
                console.log('Connection to default DB failed:', err2.message);
            }
        }
        process.exit(1);
    }
}

test();
