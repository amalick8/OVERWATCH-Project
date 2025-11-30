import React, { useState } from 'react';
import DemoCard from '../components/demo/DemoCard';
import DemoPreview from '../components/demo/DemoPreview';
import DemoToggle from '../components/demo/DemoToggle';

// Generate fake trend data
const generateTrendData = () => {
    const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'];
    return times.map(time => ({
        time,
        busyness: Math.floor(Math.random() * 40) + 40
    }));
};

// Generate fake hourly data
const generateHourlyData = () => {
    const hours = ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'];
    return hours.map(hour => ({
        hour,
        occupancy: Math.floor(Math.random() * 300) + 100
    }));
};

const DEMO_DATA = {
    campus: {
        id: 'campus',
        title: 'Campus',
        description: 'Monitor student activity across libraries, dining halls, and study spaces.',
        icon: '🎓',
        locationCount: 12,
        stats: {
            totalLocations: 12,
            avgBusyness: 58,
            totalOccupancy: 847,
        },
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: [
            { id: 1, name: 'Main Library - Floor 3', occupancy: 124, capacity: 150, busyness: 82 },
            { id: 2, name: 'Student Center Café', occupancy: 45, capacity: 80, busyness: 56 },
            { id: 3, name: 'Engineering Study Room', occupancy: 18, capacity: 25, busyness: 72 },
            { id: 4, name: 'Campus Gym', occupancy: 67, capacity: 120, busyness: 55 },
            { id: 5, name: 'Science Building Lobby', occupancy: 32, capacity: 60, busyness: 53 },
        ],
    },
    mall: {
        id: 'mall',
        title: 'Shopping Mall',
        description: 'Track foot traffic in retail zones, food courts, and parking areas.',
        icon: '🛍️',
        locationCount: 8,
        stats: {
            totalLocations: 8,
            avgBusyness: 71,
            totalOccupancy: 1523,
        },
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: [
            { id: 1, name: 'Food Court - East Wing', occupancy: 342, capacity: 400, busyness: 85 },
            { id: 2, name: 'Main Entrance Atrium', occupancy: 215, capacity: 300, busyness: 71 },
            { id: 3, name: 'Electronics Store', occupancy: 89, capacity: 120, busyness: 74 },
            { id: 4, name: 'Fashion District', occupancy: 156, capacity: 200, busyness: 78 },
            { id: 5, name: 'Parking Garage - Level 2', occupancy: 187, capacity: 250, busyness: 74 },
        ],
    },
    airport: {
        id: 'airport',
        title: 'Airport',
        description: 'Real-time monitoring of terminals, security checkpoints, and lounges.',
        icon: '✈️',
        locationCount: 15,
        stats: {
            totalLocations: 15,
            avgBusyness: 64,
            totalOccupancy: 2847,
        },
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: [
            { id: 1, name: 'Terminal A - Security Checkpoint', occupancy: 245, capacity: 300, busyness: 81 },
            { id: 2, name: 'Gate 12-18 Waiting Area', occupancy: 178, capacity: 250, busyness: 71 },
            { id: 3, name: 'International Arrivals Hall', occupancy: 432, capacity: 600, busyness: 72 },
            { id: 4, name: 'Premium Lounge', occupancy: 34, capacity: 80, busyness: 42 },
            { id: 5, name: 'Baggage Claim - Carousel 3', occupancy: 156, capacity: 200, busyness: 78 },
        ],
    },
    city: {
        id: 'city',
        title: 'Smart City',
        description: 'Monitor public spaces, transit hubs, and community centers citywide.',
        icon: '🏙️',
        locationCount: 20,
        stats: {
            totalLocations: 20,
            avgBusyness: 52,
            totalOccupancy: 3421,
        },
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: [
            { id: 1, name: 'Central Train Station', occupancy: 567, capacity: 800, busyness: 70 },
            { id: 2, name: 'City Park - North Entrance', occupancy: 234, capacity: 500, busyness: 46 },
            { id: 3, name: 'Public Library - Downtown', occupancy: 145, capacity: 250, busyness: 58 },
            { id: 4, name: 'Bus Terminal - Main Hub', occupancy: 289, capacity: 400, busyness: 72 },
            { id: 5, name: 'Community Recreation Center', occupancy: 98, capacity: 180, busyness: 54 },
        ],
    },
    sports: {
        id: 'sports',
        title: 'Sports Facility',
        description: 'Track attendance at stadiums, courts, gyms, and training facilities.',
        icon: '⚽',
        locationCount: 10,
        stats: {
            totalLocations: 10,
            avgBusyness: 68,
            totalOccupancy: 1654,
        },
        trendData: generateTrendData(),
        hourlyData: generateHourlyData(),
        locations: [
            { id: 1, name: 'Main Stadium - Section A', occupancy: 456, capacity: 600, busyness: 76 },
            { id: 2, name: 'Indoor Basketball Courts', occupancy: 78, capacity: 120, busyness: 65 },
            { id: 3, name: 'Olympic Pool Complex', occupancy: 134, capacity: 200, busyness: 67 },
            { id: 4, name: 'Tennis Center', occupancy: 45, capacity: 80, busyness: 56 },
            { id: 5, name: 'Fitness Training Area', occupancy: 92, capacity: 150, busyness: 61 },
        ],
    },
};

const Demo = () => {
    const [selectedDemo, setSelectedDemo] = useState('campus');

    const demos = Object.values(DEMO_DATA);
    const currentDemo = DEMO_DATA[selectedDemo];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header with Toggle */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                    <h1 className="mb-2">Interactive Demos</h1>
                    <p className="text-gray-600">
                        Explore OVERWATCH in action across different industries and use cases
                    </p>
                </div>
                <DemoToggle activeMode="demo" />
            </div>

            {/* Demo Selection Cards */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Select a Demo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {demos.map((demo) => (
                        <DemoCard
                            key={demo.id}
                            demo={demo}
                            isSelected={selectedDemo === demo.id}
                            onClick={() => setSelectedDemo(demo.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Demo Preview */}
            <div key={selectedDemo} className="animate-soft-fade">
                <DemoPreview demoData={currentDemo} />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }

                @keyframes softFade {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-soft-fade {
                    animation: softFade 1.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Demo;
