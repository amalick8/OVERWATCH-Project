import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{payload[0].payload.hour}</p>
                <p className="text-sm font-semibold text-gray-900">
                    {payload[0].value} people
                </p>
            </div>
        );
    }
    return null;
};

const HourlyOccupancyChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                    dataKey="hour"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px', fontWeight: '500' }}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px', fontWeight: '500' }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                <Bar
                    dataKey="occupancy"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={60}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                >
                    {data && data.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HourlyOccupancyChart;
