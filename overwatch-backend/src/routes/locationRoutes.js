const express = require('express');
const router = express.Router();
const {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLocations).post(protect, createLocation);
router
    .route('/:id')
    .get(getLocationById)
    .put(protect, updateLocation)
    .delete(protect, deleteLocation);

module.exports = router;
