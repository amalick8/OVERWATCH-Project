const express = require('express');
const router = express.Router();
const {
    updateLiveStatus,
    getLiveStatusByLocation,
    getLiveStatusHistory,
} = require('../controllers/liveStatusController');
const verifySensorKey = require('../middleware/verifySensorKey');

router.post('/update', verifySensorKey, updateLiveStatus);
router.get('/:locationId', getLiveStatusByLocation);
router.get('/:locationId/history', getLiveStatusHistory);

module.exports = router;
