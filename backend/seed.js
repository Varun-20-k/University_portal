const db = require('./config/db');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const seed = async () => {
    try {
        console.log('Starting database seeding...');

        // 1. Read and execute schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('Initializing schema...');
        await db.query(schemaSql);
        console.log('Schema initialized successfully.');

        // 2. Clear existing users (ensures clean seed)
        await db.query('TRUNCATE users CASCADE');

        // 3. Define users
        const users = [
            {
                name: 'System Admin',
                email: 'admin@muse.com',
                password: 'admin@123',
                role: 'admin',
                specific_id: 'admin@muse.com'
            },
            {
                name: 'Dr. Sarah Wilson',
                email: 'teacher@muse.com',
                password: 'teacher@123',
                role: 'teacher',
                specific_id: 'teacher@muse.com'
            },
            {
                name: 'John Doe',
                email: 'student@muse.com',
                password: 'student@123',
                role: 'student',
                specific_id: 'student@muse.com'
            }
        ];

        console.log('Creating users...');
        for (const user of users) {
            // Check if user already exists
            const existingUser = await db.query('SELECT id FROM users WHERE specific_id = $1', [user.specific_id]);
            
            if (existingUser.rows.length === 0) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const userResult = await db.query(
                    'INSERT INTO users (name, email, password, role, specific_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                    [user.name, user.email, hashedPassword, user.role, user.specific_id]
                );
                
                const userId = userResult.rows[0].id;
                console.log(`Created user: ${user.name} (${user.role})`);

                // 4. Populate role-specific tables
                if (user.role === 'student') {
                    await db.query(
                        'INSERT INTO students (user_id, program, semester, cgpa, attendance) VALUES ($1, $2, $3, $4, $5)',
                        [userId, 'Computer Science', '6th Semester', 8.5, 92.0]
                    );
                } else if (user.role === 'teacher') {
                    await db.query(
                        'INSERT INTO teachers (user_id, dept, designation) VALUES ($1, $2, $3)',
                        [userId, 'Computer Science', 'Senior Professor']
                    );
                }
            } else {
                console.log(`User ${user.name} already exists. Skipping.`);
            }
        }

        console.log('Database seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error during seeding:', err);
        process.exit(1);
    }
};

seed();
