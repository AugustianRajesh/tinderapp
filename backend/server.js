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

// GET /api/users/nearby - Find users within radius
app.get('/api/users/nearby', async (req, res) => {
    try {
        const { lat, lon, radius = 5 } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and Longitude are required' });
        }

        // Haversine formula for distance in miles (3959 is Earth's radius in miles)
        const query = `
            SELECT id, name, image_url, age, profession, latitude, longitude,
            (
                3959 * acos(
                    cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
                    sin(radians($1)) * sin(radians(latitude))
                )
            ) AS distance
            FROM users
            WHERE (
                3959 * acos(
                    cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
                    sin(radians($1)) * sin(radians(latitude))
                )
            ) < $3
            ORDER BY distance ASC
        `;

        const { rows } = await db.query(query, [lat, lon, radius]);
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
