const mongoose = require('mongoose');

const liveStatusSchema = mongoose.Schema(
    {
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            required: true,
        },
        busynessScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        occupancy: {
            type: Number,
            required: true,
        },
        movementScore: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const LiveStatus = mongoose.model('LiveStatus', liveStatusSchema);

module.exports = LiveStatus;
