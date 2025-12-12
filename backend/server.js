const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes

// GET /api/users - Fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/messages - Fetch all conversations (unique users)
app.get('/api/messages', async (req, res) => {
    try {
        // Logic: Get users who have exchanged messages
        // For simplicity, just returning all messages join with users
        const query = `
        SELECT m.*, u.name, u.image_url 
        FROM messages m
        JOIN users u ON (m.sender_id = u.id OR m.receiver_id = u.id)
        WHERE u.id != 1 -- assuming current user is ID 1
        ORDER BY m.timestamp DESC
      `;
        // This is a simplified query.
        const { rows } = await db.query('SELECT * FROM messages');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
