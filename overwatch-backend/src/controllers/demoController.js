// Deterministic seeded random number generator
// Returns a number between 0 and 1
const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Helper to generate a numeric seed from a string ID
const getSeedFromId = (id) => {
    // Simple hash of the ID string to get a number
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = ((hash << 5) - hash) + id.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// @desc    Get deterministic demo live status
// @route   GET /api/demo/live/:locationId
// @access  Public
const getDemoLiveStatus = (req, res) => {
    const { locationId } = req.params;
    const baseSeed = getSeedFromId(locationId);

    // Use current time to simulate "live" movement, but keep it deterministic
    const now = new Date();
    const timeSeed = Math.floor(now.getTime() / 10000); // Changes every 10 seconds

    // Generate base occupancy using sine wave to simulate daily rhythm
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeOfDay = hour + minute / 60;

    // Peak hours around 12pm and 6pm (18:00)
    const dailyPattern = (Math.sin((timeOfDay - 9) * 0.5) + 1) / 2; // 0 to 1

    // Add deterministic noise
    const noise = seededRandom(baseSeed + timeSeed);

    // Calculate final values
    let occupancy = Math.floor((dailyPattern * 60) + (noise * 40)); // Mix of pattern and noise
    occupancy = Math.min(Math.max(occupancy, 0), 100); // Clamp between 0-100

    // Busyness score correlates with occupancy but varies slightly
    let busynessScore = Math.floor(occupancy * 1.1);
    busynessScore = Math.min(Math.max(busynessScore, 0), 100);

    // Movement score is more random
    const movementScore = Math.floor(seededRandom(baseSeed + timeSeed + 1) * 100);

    res.json({
        location: locationId,
        occupancy,
        busynessScore,
        movementScore,
        timestamp: now,
        isDemo: true
    });
};

// @desc    Get deterministic demo peak hours
// @route   GET /api/demo/peak-hours/:locationId
// @access  Public
const getDemoPeakHours = (req, res) => {
    const { locationId } = req.params;
    const baseSeed = getSeedFromId(locationId);

    const hours = Array.from({ length: 24 }, (_, i) => {
        // Create a realistic daily curve
        // Morning peak: 9am, Lunch peak: 12pm, Evening peak: 6pm
        let baseLoad = 0;

        if (i >= 6 && i < 22) { // Active hours
            // Simple double-hump curve simulation
            const morningPeak = Math.exp(-Math.pow(i - 9, 2) / 8);
            const eveningPeak = Math.exp(-Math.pow(i - 18, 2) / 12);
            baseLoad = (morningPeak * 0.6 + eveningPeak * 0.8) * 100;
        }

        // Add location-specific variation
        const variation = seededRandom(baseSeed + i) * 20 - 10; // +/- 10

        let avg = Math.floor(baseLoad + variation);
        avg = Math.min(Math.max(avg, 5), 95); // Ensure reasonable bounds

        return {
            hour: i,
            avgOccupancy: avg,
            avgBusyness: Math.min(avg + 5, 100)
        };
    });

    res.json(hours);
};

// @desc    Get deterministic demo daily averages (last 7 days)
// @route   GET /api/demo/daily-average/:locationId
// @access  Public
const getDemoDailyAverage = (req, res) => {
    const { locationId } = req.params;
    const baseSeed = getSeedFromId(locationId);
    const today = new Date();

    const dailyStats = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i)); // Go back from today
        const dateString = date.toISOString().split('T')[0];

        // Use day of week to influence traffic (weekends vs weekdays)
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Base traffic level
        let baseTraffic = isWeekend ? 65 : 45;

        // Add location and date specific variation
        const daySeed = baseSeed + i * 100;
        const variation = seededRandom(daySeed) * 30;

        let avg = Math.floor(baseTraffic + variation);

        return {
            _id: dateString,
            avgOccupancy: avg,
            maxOccupancy: Math.min(avg + 25, 100)
        };
    });

    res.json(dailyStats);
};

module.exports = {
    getDemoLiveStatus,
    getDemoPeakHours,
    getDemoDailyAverage
};
