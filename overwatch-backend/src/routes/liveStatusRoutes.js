const express = require('express');
const router = express.Router();
const {
    updateLiveStatus,
    getLiveStatusByLocation,
    getLiveStatusHistory,
} = require('../controllers/liveStatusController');

router.post('/update', updateLiveStatus);
router.get('/:locationId', getLiveStatusByLocation);
router.get('/:locationId/history', getLiveStatusHistory);

module.exports = router;
