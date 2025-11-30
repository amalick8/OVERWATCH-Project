const Location = require('../models/locationModel');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
    const locations = await Location.find({});
    res.json(locations);
};

// @desc    Get location by ID
// @route   GET /api/locations/:id
// @access  Public
const getLocationById = async (req, res) => {
    const location = await Location.findById(req.params.id);

    if (location) {
        res.json(location);
    } else {
        res.status(404);
        throw new Error('Location not found');
    }
};

// @desc    Create a location
// @route   POST /api/locations
// @access  Private/Admin/Business
const createLocation = async (req, res) => {
    const { name, type, capacity, address, description, imageUrl } = req.body;

    const location = new Location({
        name,
        type,
        capacity,
        address,
        description,
        imageUrl,
        owner: req.user._id,
    });

    const createdLocation = await location.save();
    res.status(201).json(createdLocation);
};

// @desc    Update a location
// @route   PUT /api/locations/:id
// @access  Private/Admin/Business
const updateLocation = async (req, res) => {
    const { name, type, capacity, address, description, imageUrl } = req.body;

    const location = await Location.findById(req.params.id);

    if (location) {
        if (location.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this location');
        }

        location.name = name || location.name;
        location.type = type || location.type;
        location.capacity = capacity || location.capacity;
        location.address = address || location.address;
        location.description = description || location.description;
        location.imageUrl = imageUrl || location.imageUrl;

        const updatedLocation = await location.save();
        res.json(updatedLocation);
    } else {
        res.status(404);
        throw new Error('Location not found');
    }
};

// @desc    Delete a location
// @route   DELETE /api/locations/:id
// @access  Private/Admin/Business
const deleteLocation = async (req, res) => {
    const location = await Location.findById(req.params.id);

    if (location) {
        if (location.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to delete this location');
        }

        await location.deleteOne();
        res.json({ message: 'Location removed' });
    } else {
        res.status(404);
        throw new Error('Location not found');
    }
};

module.exports = {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
};
