import React from 'react';
import Card from '../Card';
import BusynessBadge from '../BusynessBadge';
import BusynessTrendChart from './charts/BusynessTrendChart';
import HourlyOccupancyChart from './charts/HourlyOccupancyChart';
import CapacityGauge from './charts/CapacityGauge';
import { Activity, Users, TrendingUp, MapPin } from 'lucide-react';

const DemoPreview = ({ demoData }) => {
    const { title, stats, locations, trendData, hourlyData } = demoData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="mb-2">{title} Demo</h2>
                <p className="text-gray-600">Preview of live monitoring data for this scenario</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Locations</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalLocations}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Activity className="text-primary" size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Avg Busyness</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.avgBusyness}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <TrendingUp className="text-accent" size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Occupancy</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalOccupancy}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                            <Users className="text-success" size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="transition-all duration-500 hover:shadow-lg">
                    <h3 className="mb-4">Busyness Trend</h3>
                    <BusynessTrendChart data={trendData} />
                </Card>

                <Card className="transition-all duration-500 hover:shadow-lg">
                    <h3 className="mb-4">Hourly Occupancy</h3>
                    <HourlyOccupancyChart data={hourlyData} />
                </Card>
            </div>

            {/* Capacity Gauge - Full Width */}
            <Card className="transition-all duration-500 hover:shadow-lg">
                <h3 className="mb-2 text-center">Overall Capacity Usage</h3>
                <CapacityGauge
                    percentage={Math.round(
                        (stats.totalOccupancy / (stats.totalLocations * 100)) * 100
                    )}
                />
            </Card>

            {/* Locations List */}
            <Card className="transition-all duration-500 hover:shadow-lg">
                <h3 className="mb-4">Live Locations</h3>
                <div className="space-y-3">
                    {locations.map((location) => (
                        <div
                            key={location.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            <div className="flex items-start gap-3 flex-1">
                                <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">
                                        {location.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {location.occupancy}/{location.capacity} occupancy
                                    </p>
                                </div>
                            </div>
                            <BusynessBadge score={location.busyness} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DemoPreview;
