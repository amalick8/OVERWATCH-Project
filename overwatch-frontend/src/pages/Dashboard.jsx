import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../api';
import Sidebar from '../components/Sidebar';
import LiveStatusCard from '../components/LiveStatusCard';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { Search, Activity, Users, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLocations();
        const interval = setInterval(fetchLocations, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchLocations = async () => {
        try {
            setError('');
            const { data } = await axios.get(`${API_URL}/api/locations`);

            const locationsWithStatus = await Promise.all(
                data.map(async (loc) => {
                    try {
                        const statusRes = await axios.get(`${API_URL}/api/live/${loc._id}`);
                        return { ...loc, liveStatus: statusRes.data };
                    } catch (err) {
                        return { ...loc, liveStatus: null };
                    }
                })
            );

            setLocations(locationsWithStatus);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setError('Failed to load locations. Please try again.');
            setLoading(false);
        }
    };

    const filteredLocations = locations.filter((loc) => {
        const matchesFilter = filter === 'all' || loc.type === filter;
        const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Calculate stats
    const totalLocations = locations.length;
    const averageBusyness = locations.length > 0
        ? Math.round(locations.reduce((sum, loc) => sum + (loc.liveStatus?.busynessScore || 0), 0) / locations.length)
        : 0;
    const totalOccupancy = locations.reduce((sum, loc) => sum + (loc.liveStatus?.occupancy || 0), 0);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                    <div className="px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl">Live Dashboard</h1>
                                <p className="text-gray-600 mt-2">Monitor real-time occupancy and busyness</p>
                            </div>
                            <button
                                onClick={fetchLocations}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Locations</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalLocations}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Activity className="text-primary" size={24} />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Average Busyness</p>
                                    <p className="text-3xl font-bold text-gray-900">{averageBusyness}%</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <TrendingUp className="text-accent" size={24} />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Occupancy</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalOccupancy}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                                    <Users className="text-success" size={24} />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Search and Filter */}
                    <Card>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search locations..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                            >
                                <option value="all">All Types</option>
                                <option value="gym">Gyms</option>
                                <option value="library">Libraries</option>
                                <option value="dining">Dining</option>
                                <option value="mall">Malls</option>
                            </select>
                        </div>
                    </Card>

                    {/* Content States */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader size="lg" />
                        </div>
                    ) : error ? (
                        <Card className="text-center py-12">
                            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                            <p className="text-lg text-gray-900 mb-2">Error Loading Locations</p>
                            <p className="text-gray-600">{error}</p>
                        </Card>
                    ) : filteredLocations.length === 0 ? (
                        <Card className="text-center py-12">
                            <Activity className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-lg text-gray-900 mb-2">No Locations Found</p>
                            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLocations.map((location) => (
                                <LiveStatusCard key={location._id} location={location} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
