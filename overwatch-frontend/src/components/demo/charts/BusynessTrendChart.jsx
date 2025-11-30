import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{payload[0].payload.time}</p>
                <p className="text-sm font-semibold text-gray-900">
                    {payload[0].value}% Busy
                </p>
            </div>
        );
    }
    return null;
};

const BusynessTrendChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="busynessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                    dataKey="time"
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
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }} />
                <Area
                    type="monotone"
                    dataKey="busyness"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#busynessGradient)"
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default BusynessTrendChart;
