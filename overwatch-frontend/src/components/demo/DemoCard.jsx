import React from 'react';
import Card from '../Card';

import {
    GraduationCap,
    ShoppingBag,
    Plane,
    Building2,
    Dumbbell
} from "lucide-react";

// Map demo IDs to icons
const ICON_MAP = {
    campus: GraduationCap,
    mall: ShoppingBag,
    airport: Plane,
    city: Building2,
    sports: Dumbbell,
};

// Soft pastel background colors for each icon
const ICON_BG = {
    campus: "bg-blue-100",
    mall: "bg-pink-100",
    airport: "bg-cyan-100",
    city: "bg-gray-100",
    sports: "bg-green-100",
};

const DemoCard = ({ demo, isSelected, onClick }) => {
    const { id, title, description, locationCount } = demo;

    const Icon = ICON_MAP[id];
    const bgColor = ICON_BG[id];

    return (
        <Card
            hover
            onClick={onClick}
            className={`cursor-pointer transition-all duration-300 transform
                hover:scale-105 hover:-translate-y-1
                ${isSelected ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-xl'}
            `}
        >
            <div className="space-y-4">
                
                {/* Icon + Active badge */}
                <div className="flex items-start justify-between">
                    <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center
                            transition-transform duration-300 ${bgColor}
                            ${isSelected ? 'scale-110' : ''}
                        `}
                    >
                        <Icon className="w-6 h-6 text-gray-800" strokeWidth={2} />
                    </div>

                    {isSelected && (
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full animate-pulse">
                            Active
                        </span>
                    )}
                </div>

                {/* Title + Description */}
                <div>
                    <h3 className="mb-2">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>

                {/* Location Count */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        {locationCount} locations
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default DemoCard;
