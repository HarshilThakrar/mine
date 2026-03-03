const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

// --- HOW TO USE ---
// 1. Install dependencies: npm install mysql2
// 2. Set your Service URI as an environment variable or paste it below:
const uri = process.env.AIVEN_URI || 'PASTE_YOUR_SERVICE_URI_HERE';

async function importDatabase() {
    if (uri === 'PASTE_YOUR_SERVICE_URI_HERE') {
        console.error('❌ Error: Please provide your Aiven Service URI in the script.');
        return;
    }

    try {
        console.log('Reading SQL file...');
        const sql = fs.readFileSync(path.join(__dirname, 'minehr(1).sql'), 'utf8');

        console.log('Connecting to Aiven MySQL...');
        const connection = await mysql.createConnection(uri + '&multipleStatements=true');

        console.log('Importing database... (Please wait)');
        await connection.query(sql);

        console.log('✅ Success! Your database has been imported to the cloud.');
        await connection.end();
    } catch (error) {
        console.error('❌ Error during import:', error.message);
    }
}

importDatabase();
