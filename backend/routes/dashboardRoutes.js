const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/student', authMiddleware, dashboardController.getStudentDashboard);
router.get('/teacher', authMiddleware, dashboardController.getTeacherDashboard);
router.get('/admin', authMiddleware, dashboardController.getAdminDashboard);

module.exports = router;
