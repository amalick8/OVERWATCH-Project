const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

// Validation rules for location
const locationValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required and must be valid').isIn(['gym', 'library', 'mall', 'dining', 'field', 'other']),
    check('capacity', 'Capacity must be a number greater than 0').isInt({ min: 1 }),
    check('address', 'Address is required').not().isEmpty(),
];

router.route('/')
    .get(getLocations)
    .post(
        protect,
        locationValidation,
        validateRequest,
        createLocation
    );

router.route('/:id')
    .get(getLocationById)
    .put(
        protect,
        locationValidation,
        validateRequest,
        updateLocation
    )
    .delete(protect, deleteLocation);

module.exports = router;
