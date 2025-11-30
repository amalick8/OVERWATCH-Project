import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp, Clock } from 'lucide-react';
import Card from './Card';
import BusynessBadge from './BusynessBadge';

const LiveStatusCard = ({ location }) => {
    const navigate = useNavigate();
    const liveStatus = location.liveStatus || { busynessScore: 0, occupancy: 0, movementScore: 0 };

    const getOccupancyPercentage = () => {
        if (!location.capacity) return 0;
        return Math.round((liveStatus.occupancy / location.capacity) * 100);
    };

    return (
        <Card
            hover
            onClick={() => navigate(`/locations/${location._id}`)}
            className="group"
        >
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="truncate group-hover:text-primary transition-colors">
                            {location.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                            <MapPin size={14} />
                            <span className="truncate">{location.address}</span>
                        </div>
                    </div>
                </div>

                {/* Busyness Badge */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Busyness</span>
                    <BusynessBadge score={liveStatus.busynessScore} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Users size={16} />
                            <span className="text-xs">Occupancy</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {liveStatus.occupancy}/{location.capacity}
                        </p>
                        <p className="text-xs text-gray-500">{getOccupancyPercentage()}% full</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <TrendingUp size={16} />
                            <span className="text-xs">Activity</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {liveStatus.movementScore || 0}
                        </p>
                        <p className="text-xs text-gray-500">movement score</p>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <Clock size={14} />
                    <span>
                        Updated {new Date(liveStatus.timestamp || Date.now()).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default LiveStatusCard;
