const express = require('express');
const router = express.Router();
const {
    getDemoLiveStatus,
    getDemoPeakHours,
    getDemoDailyAverage
} = require('../controllers/demoController');

// All demo routes are public
router.get('/live/:locationId', getDemoLiveStatus);
router.get('/peak-hours/:locationId', getDemoPeakHours);
router.get('/daily-average/:locationId', getDemoDailyAverage);

module.exports = router;
