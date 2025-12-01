const express = require('express');
const router = express.Router();
const {
    getPeakHours,
    getDailyAverage,
    getSystemHealth
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/peak-hours/:locationId', getPeakHours);
router.get('/daily-average/:locationId', getDailyAverage);
router.get('/system-health', protect, admin, getSystemHealth);

module.exports = router;
