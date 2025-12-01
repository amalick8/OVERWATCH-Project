import { useState, useEffect, useCallback } from 'react';

// Configuration for simulation
const SIM_CONFIG = {
    INTERVAL_MS: 3000,
    OCCUPANCY_DRIFT: { MIN: 3, MAX: 10 },
    BUSYNESS_DRIFT: { MIN: 2, MAX: 5 },
    CHART_JITTER: 0.05, // 5% jitter
};

// Helper to drift a number by a random amount within range
const driftValue = (current, minDrift, maxDrift, minLimit, maxLimit) => {
    const drift = Math.floor(Math.random() * (maxDrift - minDrift + 1)) + minDrift;
    const direction = Math.random() > 0.5 ? 1 : -1;
    let newValue = current + (drift * direction);

    // Clamp values
    return Math.min(Math.max(newValue, minLimit), maxLimit);
};

// Helper to jitter chart data
const jitterChartData = (data, key) => {
    return data.map(item => {
        const val = item[key];
        const jitter = Math.floor(val * SIM_CONFIG.CHART_JITTER);
        const direction = Math.random() > 0.5 ? 1 : -1;
        // Ensure we don't jitter too far or go below 0
        const newValue = Math.max(0, val + (Math.random() * jitter * direction));
        return { ...item, [key]: Math.round(newValue) };
    });
};

export const useDemoSimulator = (initialData) => {
    const [data, setData] = useState(initialData);

    // Reset data when initialData changes (e.g. switching demos)
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const tick = useCallback(() => {
        setData(prevData => {
            if (!prevData) return prevData;

            // 1. Drift locations
            const newLocations = prevData.locations.map(loc => {
                const newOccupancy = driftValue(
                    loc.occupancy,
                    SIM_CONFIG.OCCUPANCY_DRIFT.MIN,
                    SIM_CONFIG.OCCUPANCY_DRIFT.MAX,
                    0,
                    loc.capacity
                );

                // Recalculate busyness based on new occupancy, but also add some noise
                // Busyness is roughly occupancy/capacity * 100, but with noise
                const baseBusyness = Math.round((newOccupancy / loc.capacity) * 100);
                const newBusyness = driftValue(
                    baseBusyness, // Target the calculated busyness
                    SIM_CONFIG.BUSYNESS_DRIFT.MIN,
                    SIM_CONFIG.BUSYNESS_DRIFT.MAX,
                    0,
                    100
                );

                return {
                    ...loc,
                    occupancy: newOccupancy,
                    busyness: newBusyness
                };
            });

            // 2. Recalculate stats
            const totalOccupancy = newLocations.reduce((acc, loc) => acc + loc.occupancy, 0);
            const totalCapacity = newLocations.reduce((acc, loc) => acc + loc.capacity, 0);
            const avgBusyness = Math.round(newLocations.reduce((acc, loc) => acc + loc.busyness, 0) / newLocations.length);

            // 3. Jitter charts
            const newTrendData = jitterChartData(prevData.trendData, 'busyness');
            const newHourlyData = jitterChartData(prevData.hourlyData, 'occupancy');

            return {
                ...prevData,
                stats: {
                    ...prevData.stats,
                    totalOccupancy,
                    totalCapacity,
                    avgBusyness
                },
                locations: newLocations,
                trendData: newTrendData,
                hourlyData: newHourlyData
            };
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(tick, SIM_CONFIG.INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [tick]);

    return data;
};
