const LiveStatus = require('../models/liveStatusModel');
const Location = require('../models/locationModel');

// @desc    Get peak hours for a location (aggregated by hour of day)
// @route   GET /api/analytics/peak-hours/:locationId
// @access  Public
const getPeakHours = async (req, res) => {
    const { locationId } = req.params;

    try {
        const peakHours = await LiveStatus.aggregate([
            {
                $match: {
                    location: new mongoose.Types.ObjectId(locationId)
                }
            },
            {
                $project: {
                    hour: { $hour: "$timestamp" },
                    occupancy: "$occupancy",
                    busynessScore: "$busynessScore"
                }
            },
            {
                $group: {
                    _id: "$hour",
                    avgOccupancy: { $avg: "$occupancy" },
                    avgBusyness: { $avg: "$busynessScore" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by hour 0-23
            }
        ]);

        // Fill in missing hours with 0
        const fullDay = Array.from({ length: 24 }, (_, i) => {
            const found = peakHours.find(h => h._id === i);
            return {
                hour: i,
                occupancy: found ? Math.round(found.avgOccupancy) : 0,
                busyness: found ? Math.round(found.avgBusyness) : 0
            };
        });

        res.json(fullDay);
    } catch (error) {
        res.status(500);
        throw new Error('Error calculating peak hours: ' + error.message);
    }
};

// @desc    Get daily average occupancy for the last 7 days
// @route   GET /api/analytics/daily-average/:locationId
// @access  Public
const getDailyAverage = async (req, res) => {
    const { locationId } = req.params;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const dailyStats = await LiveStatus.aggregate([
            {
                $match: {
                    location: new mongoose.Types.ObjectId(locationId),
                    timestamp: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    avgOccupancy: { $avg: "$occupancy" },
                    maxOccupancy: { $max: "$occupancy" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json(dailyStats);
    } catch (error) {
        res.status(500);
        throw new Error('Error calculating daily averages: ' + error.message);
    }
};

// @desc    Get system health (sensor heartbeat)
// @route   GET /api/analytics/system-health
// @access  Private/Admin
const getSystemHealth = async (req, res) => {
    try {
        // Get all locations
        const locations = await Location.find({}, 'name type');

        const healthStatus = await Promise.all(locations.map(async (loc) => {
            const lastUpdate = await LiveStatus.findOne({ location: loc._id })
                .sort({ timestamp: -1 })
                .select('timestamp');

            let status = 'offline';
            let minutesSinceLastUpdate = -1;

            if (lastUpdate) {
                const now = new Date();
                const diffMs = now - new Date(lastUpdate.timestamp);
                minutesSinceLastUpdate = Math.floor(diffMs / 60000);

                if (minutesSinceLastUpdate < 10) status = 'online';
                else if (minutesSinceLastUpdate < 60) status = 'warning';
            }

            return {
                locationId: loc._id,
                name: loc.name,
                status,
                lastUpdate: lastUpdate ? lastUpdate.timestamp : null,
                minutesSinceLastUpdate
            };
        }));

        res.json(healthStatus);
    } catch (error) {
        res.status(500);
        throw new Error('Error checking system health: ' + error.message);
    }
};

const mongoose = require('mongoose');

module.exports = {
    getPeakHours,
    getDailyAverage,
    getSystemHealth
};
