const verifySensorKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Check if key exists and matches the environment variable
    if (apiKey && apiKey === process.env.SENSOR_API_KEY) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized, invalid API key');
    }
};

module.exports = verifySensorKey;
