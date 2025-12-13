const fs = require('fs');
const path = require('path');
const db = require('./db');

async function applySchema() {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        console.log('Applying schema...');

        // Split by semicolon to handle multiple statements
        const statements = schemaSql.split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            console.log('Executing statement:', statement.substring(0, 50) + '...');
            await db.query(statement);
        }

        console.log('Schema applied successfully!');
        process.exit(0);
    } catch (err) {
        console.log('Error applying schema:', err.message);
        console.log('Full error:', JSON.stringify(err, null, 2));
        process.exit(1);
    }
}

applySchema();
