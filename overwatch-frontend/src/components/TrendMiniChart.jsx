import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const TrendMiniChart = ({ data = [], color = '#2563eb' }) => {
    // Transform data if needed
    const chartData = Array.isArray(data)
        ? data.map((value, index) => ({ value, index }))
        : [];

    if (chartData.length === 0) {
        return <div className="h-12 w-24 bg-gray-100 rounded animate-pulse"></div>;
    }

    return (
        <ResponsiveContainer width="100%" height={48}>
            <LineChart data={chartData}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TrendMiniChart;
