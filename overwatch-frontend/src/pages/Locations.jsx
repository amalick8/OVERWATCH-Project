import React, { useState } from 'react';
import Card from '../components/Card';
import { Search, MapPin, MoreVertical, Filter } from 'lucide-react';

const Locations = () => {
    const [search, setSearch] = useState('');

    // Mock Data
    const locations = [
        { id: 1, name: 'Main Library', type: 'Library', occupancy: 124, capacity: 200, status: 'Active' },
        { id: 2, name: 'Student Center', type: 'Dining', occupancy: 85, capacity: 150, status: 'Active' },
        { id: 3, name: 'Campus Gym', type: 'Gym', occupancy: 45, capacity: 100, status: 'Maintenance' },
        { id: 4, name: 'Science Hall', type: 'Academic', occupancy: 210, capacity: 300, status: 'Active' },
        { id: 5, name: 'North Parking', type: 'Parking', occupancy: 50, capacity: 500, status: 'Inactive' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#2C3E55] mb-2">Locations</h1>
                <p className="text-gray-600">Manage and view all monitored locations</p>
            </div>

            {/* Actions Bar */}
            <Card className="shadow-sm rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E55]/20 focus:border-[#2C3E55] transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-[#2C3E55] transition-all">
                        <Filter size={20} />
                        <span>Filter</span>
                    </button>
                </div>
            </Card>

            {/* Locations Table */}
            <Card className="shadow-sm rounded-xl border border-gray-100 overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Occupancy</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {locations.map((loc) => (
                                <tr key={loc.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-[#2C3E55]/5 rounded-lg flex items-center justify-center">
                                                <MapPin className="text-[#2C3E55]" size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{loc.name}</div>
                                                <div className="text-sm text-gray-500">ID: LOC-{loc.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {loc.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{loc.occupancy} / {loc.capacity}</div>
                                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                                            <div
                                                className="h-1.5 bg-[#2C3E55] rounded-full"
                                                style={{ width: `${(loc.occupancy / loc.capacity) * 100}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${loc.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                loc.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {loc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-[#2C3E55]">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Locations;
