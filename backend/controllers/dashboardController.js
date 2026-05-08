const db = require('../config/db');

exports.getStudentDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Fetch student details
        const studentRes = await db.query(
            `SELECT s.*, u.name, u.email, u.specific_id as usn, mu.name as mentor_name 
             FROM students s 
             JOIN users u ON s.user_id = u.id 
             LEFT JOIN users mu ON s.mentor_id = mu.id
             WHERE u.id = $1`,
            [userId]
        );
        const student = studentRes.rows[0] || {};

        // Fetch subjects and attendance
        const subjectsRes = await db.query(
            'SELECT sub.name, sub.code, ss.attendance as att, ss.ia1, ss.ia2 FROM student_subjects ss JOIN subjects sub ON ss.subject_id = sub.id WHERE ss.student_id = $1',
            [userId]
        );
        const subjects = subjectsRes.rows || [];

        // Format marks for the frontend chart
        const marks = [
            { test: 'IA-1' },
            { test: 'IA-2' }
        ];
        subjects.forEach(s => {
            marks[0][s.code] = s.ia1;
            marks[1][s.code] = s.ia2;
        });

        // Fetch assignments
        const assignmentsRes = await db.query(
            'SELECT a.id, a.title, sub.code as subject, a.due_date as due, sa.status, a.priority FROM assignments a JOIN student_assignments sa ON a.id = sa.assignment_id JOIN subjects sub ON a.subject_id = sub.id WHERE sa.student_id = $1',
            [userId]
        );

        // Fetch timetable - Fixed SQL syntax (start_time as time)
        const timetableRes = await db.query(
            `SELECT t.start_time as time, sub.name as subject, t.room, u.name as faculty 
             FROM timetable t 
             JOIN subjects sub ON t.subject_id = sub.id 
             JOIN users u ON sub.teacher_id = u.id 
             WHERE t.day_of_week = (SELECT TRIM(TO_CHAR(CURRENT_DATE, 'Day')))`
        );

        // Fetch notifications
        const notificationsRes = await db.query(
            'SELECT id, text, type, is_read as read, created_at as time FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
            [userId]
        );

        res.json({
            ...student,
            usn: student.usn,
            mentor: student.mentor_name || 'Not Assigned',
            phone: '', // Not in schema, providing empty
            fees: student.fees_status || 'Clear',
            subjects: subjects,
            marks: marks,
            assignments: assignmentsRes.rows || [],
            timetable: timetableRes.rows || [],
            notifications: notificationsRes.rows || []
        });
    } catch (err) {
        console.error('Student Dashboard Error:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getTeacherDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch teacher details
        const teacherRes = await db.query(
            'SELECT t.*, u.name, u.email FROM teachers t JOIN users u ON t.user_id = u.id WHERE u.id = $1',
            [userId]
        );
        const teacher = teacherRes.rows[0] || {};

        // Fetch courses taught by this teacher
        const coursesRes = await db.query(
            'SELECT s.id, s.code, s.name, s.dept FROM subjects s WHERE s.teacher_id = $1',
            [userId]
        );
        const courses = coursesRes.rows || [];

        // For each course, fetch the list of students
        const coursesWithStudents = await Promise.all(courses.map(async (course) => {
            const studentsRes = await db.query(
                `SELECT u.name, u.specific_id as usn, ss.attendance as att, ss.ia1, ss.ia2 
                 FROM student_subjects ss 
                 JOIN users u ON ss.student_id = u.id 
                 WHERE ss.subject_id = $1`,
                [course.id]
            );
            return {
                ...course,
                list: studentsRes.rows || [],
                avgAtt: studentsRes.rows.length > 0 ? (studentsRes.rows.reduce((acc, curr) => acc + parseFloat(curr.att), 0) / studentsRes.rows.length).toFixed(2) : 0,
                risk: { high: 0, med: 0, low: studentsRes.rows.length }, // Placeholder
                todayAtt: {}, // Expected by frontend state
                ia2: {}      // Expected by frontend state
            };
        }));

        // Fetch announcements
        const announcementsRes = await db.query(
            'SELECT * FROM announcements WHERE teacher_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            ...teacher,
            courses: coursesWithStudents,
            announcements: announcementsRes.rows || [],
            tasks: [], // Placeholder for frontend
            trend: []  // Placeholder for frontend
        });
    } catch (err) {
        console.error('Teacher Dashboard Error:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        // Basic KPIs
        const statsRes = await db.query(`
            SELECT 
                (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
                (SELECT COUNT(*) FROM users WHERE role = 'teacher') as total_faculty,
                (SELECT COUNT(*) FROM subjects) as active_courses
        `);
        const stats = statsRes.rows[0] || { total_students: 0, total_faculty: 0, active_courses: 0 };

        // Users list
        const usersRes = await db.query(
            'SELECT id, name, role, email, specific_id as last, \'active\' as status, \'CSE\' as dept FROM users ORDER BY created_at DESC LIMIT 20'
        );

        // Prepare KPIs in the format expected by the frontend
        const kpis = [
            { label: 'Total Students', value: stats.total_students, delta: '+2', up: true, icon: 'Users' },
            { label: 'Total Faculty', value: stats.total_faculty, delta: '0', up: null, icon: 'Users' },
            { label: 'Active Courses', value: stats.active_courses, delta: '+1', up: true, icon: 'BookOpen' },
            { label: 'System Health', value: '98%', delta: 'Optimal', up: true, icon: 'Activity' }
        ];

        res.json({
            kpis: kpis,
            riskDist: [
                { name: 'High Risk', value: 2, color: '#F87171' },
                { name: 'Medium Risk', value: 5, color: '#FBBF24' },
                { name: 'Low Risk', value: 15, color: '#34D399' }
            ],
            deptRisk: [
                { dept: 'AI & ML', high: 1, med: 2, low: 10 },
                { dept: 'CS & DS', high: 1, med: 3, low: 5 }
            ],
            fee: { collected: 85, pending: 12, defaulters: 3 },
            attTrend: [
                { month: 'Sep', avg: 88 },
                { month: 'Oct', avg: 82 },
                { month: 'Nov', avg: 85 },
                { month: 'Dec', avg: 84 }
            ],
            activity: [
                { id: 1, text: 'System backup completed', type: 'ok', time: '2h ago' },
                { id: 2, text: 'New faculty registration: Dr. Smith', type: 'info', time: '4h ago' }
            ],
            users: usersRes.rows || [],
            config: {},
            cors: [],
            secs: []
        });
    } catch (err) {
        console.error('Admin Dashboard Error:', err.message);
        res.status(500).send('Server error');
    }
};
