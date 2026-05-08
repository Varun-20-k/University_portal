const db = require('./config/db');

const debugStudent = async () => {
    const userId = 7; // John Doe
    try {
        console.log('Testing student details...');
        await db.query('SELECT s.*, u.name, u.email FROM students s JOIN users u ON s.user_id = u.id WHERE u.id = $1', [userId]);
        
        console.log('Testing subjects...');
        await db.query('SELECT sub.name, sub.code, ss.attendance as att, ss.ia1, ss.ia2 FROM student_subjects ss JOIN subjects sub ON ss.subject_id = sub.id WHERE ss.student_id = $1', [userId]);

        console.log('Testing assignments...');
        await db.query('SELECT a.id, a.title, sub.code as subject, a.due_date as due, sa.status, a.priority FROM assignments a JOIN student_assignments sa ON a.id = sa.assignment_id JOIN subjects sub ON a.subject_id = sub.id WHERE sa.student_id = $1', [userId]);

        console.log('Testing timetable...');
        // Let's test the subquery separately
        const dayRes = await db.query('SELECT TRIM(TO_CHAR(CURRENT_DATE, \'Day\'))');
        console.log('Day:', dayRes.rows[0]);
        
        await db.query('SELECT t.time, sub.name as subject, t.room, u.name as faculty FROM timetable t JOIN subjects sub ON t.subject_id = sub.id JOIN users u ON sub.teacher_id = u.id WHERE t.day_of_week = (SELECT TRIM(TO_CHAR(CURRENT_DATE, \'Day\')))');

        console.log('Testing notifications...');
        await db.query('SELECT id, text, type, is_read as read, created_at as time FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [userId]);

        console.log('All queries passed!');
        process.exit(0);
    } catch (err) {
        console.error('Query failed:', err);
        process.exit(1);
    }
};

debugStudent();
