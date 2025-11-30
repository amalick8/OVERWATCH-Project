import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../api';
import LiveStatusCard from '../components/LiveStatusCard';
import { Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/locations`);
                // For each location, fetch its live status
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
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
        // Poll every 30 seconds
        const interval = setInterval(fetchLocations, 30000);
        return () => clearInterval(interval);
    }, []);

    const filteredLocations = locations.filter((loc) => {
        const matchesFilter = filter === 'all' || loc.type === filter;
        const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Live Dashboard</h1>
                    <p className="text-slate-500 mt-1">Real-time occupancy and busyness updates</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent appearance-none bg-white"
                        >
                            <option value="all">All Types</option>
                            <option value="gym">Gyms</option>
                            <option value="library">Libraries</option>
                            <option value="dining">Dining</option>
                            <option value="mall">Malls</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLocations.map((location) => (
                        <LiveStatusCard key={location._id} location={location} />
                    ))}
                </div>
            )}

            {!loading && filteredLocations.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">No locations found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
