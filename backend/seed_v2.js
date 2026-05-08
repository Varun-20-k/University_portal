const db = require('./config/db');
const bcrypt = require('bcryptjs');

const seedV2 = async () => {
    try {
        console.log('Starting secondary database seeding...');

        const students = [
            { name: 'Varun K', email: 'varun@muse.com', password: 'password-student@123', role: 'student', specific_id: '22SECD92' },
            { name: 'Ayush M', email: 'ayush@muse.com', password: 'password-student@123', role: 'student', specific_id: '22SECD16' },
            { name: 'Lohith Kumar', email: 'lohith@muse.com', password: 'password-student@123', role: 'student', specific_id: '22SECD32' },
            { name: 'Vijeth Gowda', email: 'vijeth@muse.com', password: 'password-student@123', role: 'student', specific_id: '22SECD93' }
        ];

        const teachers = [
            { name: 'Dr. Syed Salim', email: 'syed@muse.com', password: 'password-teacher@123', role: 'teacher', specific_id: 'syed@muse.com' },
            { name: 'Naveen', email: 'naveen@muse.com', password: 'password-teacher@123', role: 'teacher', specific_id: 'naveen@muse.com' },
            { name: 'Shreyas', email: 'shreyas@muse.com', password: 'password-teacher@123', role: 'teacher', specific_id: 'shreyas@muse.com' },
            { name: 'Karthik', email: 'karthik@muse.com', password: 'password-teacher@123', role: 'teacher', specific_id: 'karthik@muse.com' },
            { name: 'Rajesh', email: 'rajesh@muse.com', password: 'password-teacher@123', role: 'teacher', specific_id: 'rajesh@muse.com' }
        ];

        console.log('Processing students...');
        for (const s of students) {
            const hashedPassword = await bcrypt.hash(s.password, 10);
            const userRes = await db.query(
                'INSERT INTO users (name, email, password, role, specific_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (specific_id) DO UPDATE SET name = $1 RETURNING id',
                [s.name, s.email, hashedPassword, s.role, s.specific_id]
            );
            const userId = userRes.rows[0].id;
            
            const existingStudent = await db.query('SELECT id FROM students WHERE user_id = $1', [userId]);
            if (existingStudent.rows.length === 0) {
                await db.query(
                    'INSERT INTO students (user_id, program, semester, cgpa, attendance) VALUES ($1, $2, $3, $4, $5)',
                    [userId, 'Computer Science', '4th Semester', 8.8, 85.0]
                );
            }
        }

        console.log('Processing teachers...');
        for (const t of teachers) {
            const hashedPassword = await bcrypt.hash(t.password, 10);
            const userRes = await db.query(
                'INSERT INTO users (name, email, password, role, specific_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (specific_id) DO UPDATE SET name = $1 RETURNING id',
                [t.name, t.email, hashedPassword, t.role, t.specific_id]
            );
            const userId = userRes.rows[0].id;

            const existingTeacher = await db.query('SELECT id FROM teachers WHERE user_id = $1', [userId]);
            if (existingTeacher.rows.length === 0) {
                await db.query(
                    'INSERT INTO teachers (user_id, dept, designation) VALUES ($1, $2, $3)',
                    [userId, 'CSE', 'Assistant Professor']
                );
            }
        }

        // Add some subjects and link them to teachers
        console.log('Creating subjects...');
        const subjects = [
            { code: 'CS401', name: 'Machine Learning', teacher_email: 'syed@muse.com' },
            { code: 'CS402', name: 'Data Structures', teacher_email: 'naveen@muse.com' },
            { code: 'CS403', name: 'Web Technology', teacher_email: 'shreyas@muse.com' },
            { code: 'CS404', name: 'Operating Systems', teacher_email: 'karthik@muse.com' },
            { code: 'CS405', name: 'Computer Networks', teacher_email: 'rajesh@muse.com' }
        ];

        for (const sub of subjects) {
            const teacherRes = await db.query('SELECT id FROM users WHERE email = $1', [sub.teacher_email]);
            if (teacherRes.rows.length > 0) {
                await db.query(
                    'INSERT INTO subjects (code, name, teacher_id, dept) VALUES ($1, $2, $3, $4) ON CONFLICT (code) DO UPDATE SET name = $2',
                    [sub.code, sub.name, teacherRes.rows[0].id, 'CSE']
                );
            }
        }

        // Enroll students in subjects
        console.log('Enrolling students...');
        const studentUsers = await db.query('SELECT id FROM users WHERE role = \'student\'');
        const subjectList = await db.query('SELECT id FROM subjects');

        for (const sUser of studentUsers.rows) {
            for (const sub of subjectList.rows) {
                await db.query(
                    'INSERT INTO student_subjects (student_id, subject_id, attendance, ia1, ia2) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (student_id, subject_id) DO NOTHING',
                    [sUser.id, sub.id, parseFloat((80 + Math.random() * 15).toFixed(2)), Math.floor(18 + Math.random() * 7), Math.floor(19 + Math.random() * 6)]
                );
            }
        }

        console.log('Secondary seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedV2();
