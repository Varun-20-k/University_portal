const db = require('./config/db');

const inspectDatabase = async () => {
    try {
        console.log('Inspecting database tables...');
        
        // Query to get all table names
        const tablesResult = await db.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
        `);

        const tables = tablesResult.rows.map(row => row.table_name);
        console.log(`Found ${tables.length} tables: ${tables.join(', ')}`);
        console.log('\nRow counts:');
        console.log('----------------------------------');

        for (const table of tables) {
            const countResult = await db.query(`SELECT COUNT(*) FROM ${table}`);
            console.log(`${table.padEnd(20)} : ${countResult.rows[0].count} rows`);
        }
        
        console.log('----------------------------------');
        
        // Show sample users
        console.log('\nSample Users:');
        const usersResult = await db.query('SELECT id, name, email, role, specific_id FROM users');
        console.table(usersResult.rows);

        process.exit(0);
    } catch (err) {
        console.error('Error inspecting database:', err);
        process.exit(1);
    }
};

inspectDatabase();
