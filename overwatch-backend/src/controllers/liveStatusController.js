const LiveStatus = require('../models/liveStatusModel');
const Location = require('../models/locationModel');

// @desc    Update live status (from sensor)
// @route   POST /api/live/update
// @access  Public (should be protected by API key in production)
const updateLiveStatus = async (req, res) => {
    const { locationId, busynessScore, occupancy, movementScore } = req.body;

    const location = await Location.findById(locationId);

    if (!location) {
        res.status(404);
        throw new Error('Location not found');
    }

    const liveStatus = new LiveStatus({
        location: locationId,
        busynessScore,
        occupancy,
        movementScore,
    });

    const createdStatus = await liveStatus.save();
    res.status(201).json(createdStatus);
};

// @desc    Get live status by location ID
// @route   GET /api/live/:locationId
// @access  Public
const getLiveStatusByLocation = async (req, res) => {
    const status = await LiveStatus.findOne({ location: req.params.locationId }).sort(
        { timestamp: -1 }
    );

    if (status) {
        res.json(status);
    } else {
        // Return a default status if no data exists yet
        res.json({
            location: req.params.locationId,
            busynessScore: 0,
            occupancy: 0,
            movementScore: 0,
            timestamp: new Date(),
        });
    }
};

// @desc    Get history of live status for a location
// @route   GET /api/live/:locationId/history
// @access  Public
const getLiveStatusHistory = async (req, res) => {
    const history = await LiveStatus.find({ location: req.params.locationId })
        .sort({ timestamp: -1 })
        .limit(20); // Limit to last 20 updates

    res.json(history);
};

module.exports = {
    updateLiveStatus,
    getLiveStatusByLocation,
    getLiveStatusHistory,
};
