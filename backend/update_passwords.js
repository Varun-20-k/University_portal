const db = require('./config/db');
const bcrypt = require('bcryptjs');

const updatePasswords = async () => {
    try {
        console.log('Updating all user passwords for consistency...');
        
        const teacherPassword = await bcrypt.hash('teacher@123', 10);
        const studentPassword = await bcrypt.hash('student@123', 10);

        // Update all teachers
        await db.query('UPDATE users SET password = $1 WHERE role = \'teacher\'', [teacherPassword]);
        console.log('All teacher passwords updated to: teacher@123');

        // Update all students
        await db.query('UPDATE users SET password = $1 WHERE role = \'student\'', [studentPassword]);
        console.log('All student passwords updated to: student@123');

        console.log('Password update completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error updating passwords:', err);
        process.exit(1);
    }
};

updatePasswords();
