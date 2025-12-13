const db = require('./db');
require('dotenv').config();

async function verify() {
    try {
        console.log('Verifying implementation...');

        // 1. Check if users have location data
        const userCheck = await db.query('SELECT count(*) FROM users WHERE latitude IS NOT NULL AND longitude IS NOT NULL');
        console.log(`Users with location data: ${userCheck.rows[0].count}`);

        if (parseInt(userCheck.rows[0].count) === 0) {
            console.error('No users have location data!');
            process.exit(1);
        }

        // 2. Test the Haversine query logic directly
        console.log('Testing distance query (simulating NYC search)...');
        const lat = 40.7128;
        const lon = -74.0060;
        const radius = 10;

        const query = `
            SELECT id, name, latitude, longitude,
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
            LIMIT 5
        `;

        const results = await db.query(query, [lat, lon, radius]);
        console.log(`Found ${results.rows.length} users within ${radius} miles.`);
        results.rows.forEach(r => {
            console.log(`- ${r.name}: ${parseFloat(r.distance).toFixed(2)} miles`);
        });

        console.log('Verification successful!');
        process.exit(0);
    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
}

verify();
