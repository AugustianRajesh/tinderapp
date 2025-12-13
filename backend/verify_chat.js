const http = require('http');

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: data ? JSON.parse(data) : null });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function verify() {
    try {
        console.log('Verifying Chat API...');

        // 1. Send a message
        console.log('1. Sending message...');
        const sendRes = await request('POST', '/api/messages', {
            receiver_id: 2, // Assuming user 2 exists from seed
            content: 'Hello from verification script!'
        });
        console.log('Send status:', sendRes.statusCode);
        if (sendRes.statusCode !== 200) throw new Error('Failed to send message');

        // 2. Fetch conversation
        console.log('2. Fetching conversation...');
        const histRes = await request('GET', '/api/messages/2'); // Fetch chat with user 2
        console.log('History status:', histRes.statusCode);
        const messages = histRes.body;
        console.log(`Found ${messages.length} messages.`);

        const found = messages.find(m => m.content === 'Hello from verification script!');
        if (!found) throw new Error('Sent message not found in history');
        console.log('Verified message persistence.');

        // 3. (Optional) List conversations
        console.log('3. Listing conversations...');
        const listRes = await request('GET', '/api/messages');
        console.log('List status:', listRes.statusCode);
        const convos = listRes.body;
        console.log(`Found ${convos.length} conversations.`);

        console.log('Chat API Verification Successful!');
    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
}

verify();
