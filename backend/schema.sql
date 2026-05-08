-- MUSE Database Schema for PostgreSQL

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    specific_id VARCHAR(50) UNIQUE NOT NULL, -- USN, EmpID, or Username
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    program VARCHAR(100),
    semester VARCHAR(50),
    mentor_id INTEGER REFERENCES users(id), -- Points to a teacher user
    fees_status VARCHAR(20) DEFAULT 'Clear',
    hostel BOOLEAN DEFAULT FALSE,
    cgpa DECIMAL(3, 2),
    attendance DECIMAL(5, 2) DEFAULT 0.00
);

-- Create Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    dept VARCHAR(100),
    designation VARCHAR(100)
);

-- Create Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Faculty teaching this
    dept VARCHAR(100)
);

-- Create Student_Subjects Table (Enrollment, Attendance, Marks)
CREATE TABLE IF NOT EXISTS student_subjects (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    attendance DECIMAL(5, 2) DEFAULT 0.00,
    ia1 INTEGER DEFAULT 0,
    ia2 INTEGER DEFAULT 0,
    UNIQUE(student_id, subject_id)
);

-- Create Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    due_date DATE,
    priority VARCHAR(10) CHECK (priority IN ('high', 'med', 'low'))
);

-- Create Student_Assignments Table
CREATE TABLE IF NOT EXISTS student_assignments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded')),
    UNIQUE(student_id, assignment_id)
);

-- Create Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    type VARCHAR(10) CHECK (type IN ('warn', 'info', 'ok', 'alert')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Timetable Table
CREATE TABLE IF NOT EXISTS timetable (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    day_of_week VARCHAR(15), -- Monday, Tuesday, etc.
    start_time TIME,
    room VARCHAR(50)
);
