import { GraduationCap, ShoppingBag, Plane, Building2, Dumbbell } from "lucide-react";

// Helper to generate consistent initial trend data
const generateTrendData = () => {
    const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'];
    return times.map(time => ({
        time,
        busyness: Math.floor(Math.random() * 30) + 45 // 45-75% base range
    }));
};

// Helper to generate consistent initial hourly data
const generateHourlyData = () => {
    const hours = ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'];
    return hours.map(hour => ({
        hour,
        occupancy: Math.floor(Math.random() * 200) + 150 // 150-350 base range
    }));
};

// Helper to calculate stats from locations
const calculateStats = (locations) => {
    const totalOccupancy = locations.reduce((acc, loc) => acc + loc.occupancy, 0);
    const totalCapacity = locations.reduce((acc, loc) => acc + loc.capacity, 0);
    const avgBusyness = Math.round(locations.reduce((acc, loc) => acc + loc.busyness, 0) / locations.length);

    return {
        totalLocations: locations.length,
        avgBusyness,
        totalOccupancy,
        totalCapacity
    };
};

// Base locations data
const campusLocations = [
    { id: 1, name: 'Main Library - Floor 3', occupancy: 124, capacity: 180, busyness: 68 },
    { id: 2, name: 'Student Center Café', occupancy: 85, capacity: 150, busyness: 56 },
    { id: 3, name: 'Engineering Study Room', occupancy: 42, capacity: 60, busyness: 70 },
    { id: 4, name: 'Campus Gym', occupancy: 145, capacity: 200, busyness: 72 },
    { id: 5, name: 'Science Building Lobby', occupancy: 65, capacity: 120, busyness: 54 },
];

const mallLocations = [
    { id: 1, name: 'Food Court - East Wing', occupancy: 342, capacity: 450, busyness: 76 },
    { id: 2, name: 'Main Entrance Atrium', occupancy: 215, capacity: 350, busyness: 61 },
    { id: 3, name: 'Electronics Store', occupancy: 89, capacity: 150, busyness: 59 },
    { id: 4, name: 'Fashion District', occupancy: 156, capacity: 250, busyness: 62 },
    { id: 5, name: 'Parking Garage - Level 2', occupancy: 287, capacity: 400, busyness: 71 },
];

const airportLocations = [
    { id: 1, name: 'Terminal A - Security', occupancy: 245, capacity: 350, busyness: 70 },
    { id: 2, name: 'Gate 12-18 Waiting Area', occupancy: 178, capacity: 300, busyness: 59 },
    { id: 3, name: 'Intl Arrivals Hall', occupancy: 432, capacity: 600, busyness: 72 },
    { id: 4, name: 'Premium Lounge', occupancy: 64, capacity: 100, busyness: 64 },
    { id: 5, name: 'Baggage Claim 3', occupancy: 156, capacity: 250, busyness: 62 },
];

const cityLocations = [
    { id: 1, name: 'Central Train Station', occupancy: 567, capacity: 800, busyness: 70 },
    { id: 2, name: 'City Park - North', occupancy: 234, capacity: 500, busyness: 46 },
    { id: 3, name: 'Public Library', occupancy: 145, capacity: 300, busyness: 48 },
    { id: 4, name: 'Bus Terminal Hub', occupancy: 289, capacity: 450, busyness: 64 },
    { id: 5, name: 'Rec Center', occupancy: 98, capacity: 200, busyness: 49 },
];

const sportsLocations = [
    { id: 1, name: 'Main Stadium - Sec A', occupancy: 456, capacity: 600, busyness: 76 },
    { id: 2, name: 'Indoor Courts', occupancy: 78, capacity: 150, busyness: 52 },
    { id: 3, name: 'Olympic Pool', occupancy: 134, capacity: 250, busyness: 53 },
    { id: 4, name: 'Tennis Center', occupancy: 45, capacity: 100, busyness: 45 },
    { id: 5, name: 'Training Area', occupancy: 92, capacity: 180, busyness: 51 },
];

export const DEMO_DATA = {
    campus: {
        id: 'campus',
        title: 'Campus',
        description: 'Monitor student activity across libraries, dining halls, and study spaces.',
        icon: '🎓',
        locationCount: campusLocations.length,
        stats: calculateStats(campusLocations),
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: campusLocations,
    },
    mall: {
        id: 'mall',
        title: 'Shopping Mall',
        description: 'Track foot traffic in retail zones, food courts, and parking areas.',
        icon: '🛍️',
        locationCount: mallLocations.length,
        stats: calculateStats(mallLocations),
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: mallLocations,
    },
    airport: {
        id: 'airport',
        title: 'Airport',
        description: 'Real-time monitoring of terminals, security checkpoints, and lounges.',
        icon: '✈️',
        locationCount: airportLocations.length,
        stats: calculateStats(airportLocations),
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: airportLocations,
    },
    city: {
        id: 'city',
        title: 'Smart City',
        description: 'Monitor public spaces, transit hubs, and community centers citywide.',
        icon: '🏙️',
        locationCount: cityLocations.length,
        stats: calculateStats(cityLocations),
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: cityLocations,
    },
    sports: {
        id: 'sports',
        title: 'Sports Facility',
        description: 'Track attendance at stadiums, courts, gyms, and training facilities.',
        icon: '⚽',
        locationCount: sportsLocations.length,
        stats: calculateStats(sportsLocations),
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: sportsLocations,
    },
};
