import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';
import LiveStatusCard from '../components/LiveStatusCard';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { Search, Activity, Users, TrendingUp, AlertCircle, MapPin } from 'lucide-react';

// Toggle Component
const DashboardToggle = ({ activeMode }) => {
    const navigate = useNavigate();

    const handleModeChange = (mode) => {
        if (mode === 'demo') {
            navigate('/demo');
        } else if (mode === 'live') {
            navigate('/dashboard');
        }
    };

    return (
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
                onClick={() => handleModeChange('demo')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeMode === 'demo'
                    ? 'bg-[#2C3E55] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                Demo Mode
            </button>
            <button
                onClick={() => handleModeChange('live')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeMode === 'live'
                    ? 'bg-[#2C3E55] text-white shadow-sm hover:bg-[#314766]'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                Live Mode
            </button>
        </div>
    );
};

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
        <div className="space-y-8 animate-fadeIn rounded-2xl border border-slate-200 bg-slate-50/40 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C3E55] mb-2">Live Dashboard</h1>
                    <p className="text-slate-600">Monitor real-time occupancy and busyness across your locations</p>
                </div>
                <div className="flex items-center gap-4">
                    <DashboardToggle activeMode="live" />
                    <button
                        onClick={fetchLocations}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                    >
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="transition-all duration-300 rounded-xl border border-slate-200 hover:border-[#2C3E55] hover:shadow-md hover:shadow-[#2C3E55]/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Locations</p>
                            <p className="text-3xl font-bold text-[#2C3E55]">{totalLocations}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#2C3E55]/10 flex items-center justify-center">
                            <Activity className="text-[#2C3E55]" size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="transition-all duration-300 rounded-xl border border-slate-200 hover:border-[#2C3E55] hover:shadow-md hover:shadow-[#2C3E55]/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Average Busyness</p>
                            <p className="text-3xl font-bold text-[#2C3E55]">{averageBusyness}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#2C3E55]/10 flex items-center justify-center">
                            <TrendingUp className="text-[#2C3E55]" size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="transition-all duration-300 rounded-xl border border-slate-200 hover:border-[#2C3E55] hover:shadow-md hover:shadow-[#2C3E55]/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Occupancy</p>
                            <p className="text-3xl font-bold text-[#2C3E55]">{totalOccupancy}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#2C3E55]/10 flex items-center justify-center">
                            <Users className="text-[#2C3E55]" size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card className="shadow-sm rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E55]/20 focus:border-[#2C3E55] transition-all"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E55]/20 focus:border-[#2C3E55] bg-white transition-all cursor-pointer hover:border-[#2C3E55]"
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
                <Card className="text-center py-16 border-blue-100 bg-blue-50 rounded-xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-[#2C3E55]" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-[#2C3E55] mb-2">Error Loading Locations</h3>
                    <p className="text-gray-600 max-w-md mx-auto">{error}</p>
                    <button
                        onClick={fetchLocations}
                        className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Try Again
                    </button>
                </Card>
            ) : filteredLocations.length === 0 ? (
                <Card className="text-center py-20 border-dashed rounded-xl">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="text-gray-400" size={40} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Locations Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        We couldn't find any locations matching your search criteria. Try adjusting your filters or search term.
                    </p>
                    {locations.length === 0 && (
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                            <AlertCircle size={16} className="mr-2" />
                            Database appears to be empty
                        </div>
                    )}
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLocations.map((location) => (
                        <div key={location._id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-xl">
                            <LiveStatusCard location={location} />
                        </div>
                    ))}
                </div>
            )}

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

export default Dashboard;
