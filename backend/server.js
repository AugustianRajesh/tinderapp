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
// GET /api/messages - Fetch all conversations (unique users)
app.get('/api/messages', async (req, res) => {
    try {
        const query = `
        SELECT DISTINCT ON (
            LEAST(m.sender_id, m.receiver_id), 
            GREATEST(m.sender_id, m.receiver_id)
        ) 
        m.id, m.sender_id, m.receiver_id, m.content, m.timestamp,
        CASE 
            WHEN m.sender_id = 1 THEN u_recv.name 
            ELSE u_send.name 
        END as name,
        CASE 
            WHEN m.sender_id = 1 THEN u_recv.image_url 
            ELSE u_send.image_url 
        END as image_url,
        CASE 
            WHEN m.sender_id = 1 THEN u_recv.id 
            ELSE u_send.id 
        END as other_user_id
        FROM messages m
        LEFT JOIN users u_send ON m.sender_id = u_send.id
        LEFT JOIN users u_recv ON m.receiver_id = u_recv.id
        WHERE m.sender_id = 1 OR m.receiver_id = 1
        ORDER BY 
            LEAST(m.sender_id, m.receiver_id), 
            GREATEST(m.sender_id, m.receiver_id),
            m.timestamp DESC
      `;
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/messages/:userId - Get conversation with specific user
app.get('/api/messages/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = 1; // Hardcoded for demo

        const query = `
            SELECT * FROM messages 
            WHERE (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)
            ORDER BY timestamp ASC
        `;
        const { rows } = await db.query(query, [currentUserId, userId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/messages - Send a message
app.post('/api/messages', async (req, res) => {
    try {
        const { receiver_id, content } = req.body;
        const sender_id = 1; // Hardcoded for demo

        const { rows } = await db.query(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
            [sender_id, receiver_id, content]
        );
        res.json(rows[0]);
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
