const http = require('http');

function request(method, path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data ? JSON.parse(data) : null }));
        });
        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function verify() {
    try {
        console.log('Verifying User Preferences...');
        // Verify /api/users/nearby includes preferences
        const res = await request('GET', '/api/users/nearby?lat=40.7128&lon=-74.0060');
        if (res.statusCode !== 200) throw new Error('Failed to fetch nearby users');

        const users = res.body;
        console.log(`Fetched ${users.length} users.`);

        const withPrefs = users.filter(u => u.preferences && u.preferences.hobbies);
        console.log(`Users with preferences: ${withPrefs.length}`);

        if (withPrefs.length > 0) {
            console.log('Sample User Preferences:', JSON.stringify(withPrefs[0].preferences, null, 2));
            console.log('Verification Successful!');
        } else {
            console.error('No preferences found on users!');
            process.exit(1);
        }
    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
}

verify();
