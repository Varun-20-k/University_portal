# MUSE PORTAL (Mysore University School of Engineering)

MUSE is a comprehensive academic portal for students, teachers, and administrators. It features dynamic dashboards, timetable management, attendance tracking, and performance analytics.

## Project Structure

- **/frontend**: React + Vite application for the user interface.
- **/backend**: Node.js + Express + PostgreSQL for the API and database management.

## Setup Instructions

### 1. Database Setup
- Ensure PostgreSQL is installed and running.
- Create a database named `MUSE`.
- Update the password in `backend/.env`.
- Run the seeding script to initialize the schema and data:
  ```bash
  cd backend
  npm install
  node seed.js
  node seed_v2.js
  ```

### 2. Backend Setup
- Navigate to the backend directory:
  ```bash
  cd backend
  npm install
  npm run dev
  ```

### 3. Frontend Setup
- Navigate to the frontend directory:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

---

## Login Credentials

### Administrator
| User ID (Email) | Password |
| :--- | :--- |
| `admin@muse.com` | `admin@123` |

### Teachers (Faculty)
| Name | User ID (Email) | Password |
| :--- | :--- | :--- |
| Dr. Sarah Wilson (Default) | `teacher@muse.com` | `teacher@123` |
| Dr. Syed Salim | `syed@muse.com` | `teacher@123` |
| Naveen | `naveen@muse.com` | `teacher@123` |
| Shreyas | `shreyas@muse.com` | `teacher@123` |
| Karthik | `karthik@muse.com` | `teacher@123` |
| Rajesh | `rajesh@muse.com` | `teacher@123` |

### Students
| Name | User ID (Roll Number) | Email | Password |
| :--- | :--- | :--- | :--- |
| John Doe (Default) | `student@muse.com` | `student@muse.com` | `student@123` |
| Varun K | `22SECD92` | `varun@muse.com` | `student@123` |
| Ayush M | `22SECD16` | `ayush@muse.com` | `student@123` |
| Lohith Kumar | `22SECD32` | `lohith@muse.com` | `student@123` |
| Vijeth Gowda | `22SECD93` | `vijeth@muse.com` | `student@123` |

---

## Features
- **Dynamic Dashboards**: Role-based views for Admin, Teacher, and Student.
- **Attendance & Marks**: Automated calculation and visualization of academic progress.
- **Timetable**: Live daily timetable view.
- **Management**: Admin panel to manage users and system configuration.
- **Responsive Design**: Modern UI with dark mode support.
