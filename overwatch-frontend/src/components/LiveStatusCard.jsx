import React from 'react';
import { Users, Activity, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveStatusCard = ({ location }) => {
    // Mock live status if not available
    const status = location.liveStatus || {
        busynessScore: 0,
        occupancy: 0,
        movementScore: 0,
        timestamp: new Date(),
    };

    const getBusynessColor = (score) => {
        if (score < 40) return 'text-success';
        if (score < 70) return 'text-warning';
        return 'text-danger';
    };

    const getBusynessBg = (score) => {
        if (score < 40) return 'bg-green-100';
        if (score < 70) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <Link to={`/locations/${location._id}`} className="card hover:shadow-md transition-shadow block">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-slate-800">{location.name}</h3>
                    <p className="text-sm text-slate-500 capitalize">{location.type}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getBusynessBg(status.busynessScore)} ${getBusynessColor(status.busynessScore)}`}>
                    {status.busynessScore}% Busy
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <Users size={18} className="text-slate-400" />
                    <div>
                        <p className="text-xs text-slate-500">Occupancy</p>
                        <p className="font-semibold">{status.occupancy} / {location.capacity}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Activity size={18} className="text-slate-400" />
                    <div>
                        <p className="text-xs text-slate-500">Activity</p>
                        <p className="font-semibold">{status.movementScore}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <Clock size={14} />
                <span>Updated {new Date(status.timestamp).toLocaleTimeString()}</span>
            </div>
        </Link>
    );
};

export default LiveStatusCard;
