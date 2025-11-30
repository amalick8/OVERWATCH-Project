import React from 'react';

const BusynessBadge = ({ score, size = 'md', showLabel = true }) => {
    const getColor = (score) => {
        if (score <= 33) return 'bg-green-100 text-green-800 border-green-200';
        if (score <= 66) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getStatus = (score) => {
        if (score <= 33) return 'Low';
        if (score <= 66) return 'Moderate';
        return 'High';
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${getColor(score)} ${sizes[size]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            {showLabel && <span>{getStatus(score)}</span>}
            <span className="font-semibold">{score}%</span>
        </span>
    );
};

export default BusynessBadge;
