import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CapacityGauge = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

    const getColor = (pct) => {
        if (pct <= 45) return '#22c55e'; // Green - Low
        if (pct <= 75) return '#f59e0b'; // Orange - Medium
        return '#ef4444'; // Red - High
    };

    const getStatus = (pct) => {
        if (pct <= 45) return 'Low';
        if (pct <= 75) return 'Medium';
        return 'High';
    };

    const color = getColor(normalizedPercentage);
    const status = getStatus(normalizedPercentage);

    // Create data for pie chart (filled portion and empty portion)
    const data = [
        { name: 'Used', value: normalizedPercentage },
        { name: 'Available', value: 100 - normalizedPercentage },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-4">
            {/* Gauge Chart */}
            <div className="relative w-full max-w-xs">
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="90%"
                            paddingAngle={0}
                            dataKey="value"
                            animationDuration={1200}
                            animationEasing="ease-out"
                        >
                            <Cell fill={color} />
                            <Cell fill="#e5e7eb" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-5xl font-bold text-gray-900" style={{ marginTop: '40px' }}>
                        {normalizedPercentage}%
                    </div>
                    <div className="text-sm font-medium text-gray-500 mt-1">
                        {status} Usage
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 font-medium">Low (0-45%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-gray-600 font-medium">Medium (46-75%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-600 font-medium">High (76-100%)</span>
                </div>
            </div>
        </div>
    );
};

export default CapacityGauge;
