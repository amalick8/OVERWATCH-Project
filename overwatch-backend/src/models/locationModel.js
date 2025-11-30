const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['gym', 'library', 'mall', 'dining', 'field', 'other'],
        },
        capacity: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        imageUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
