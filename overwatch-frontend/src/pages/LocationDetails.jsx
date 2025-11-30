import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Users, Activity, Clock, MapPin } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LocationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locRes, histRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/locations/${id}`),
                    axios.get(`http://localhost:5001/api/live/${id}/history`),
                ]);
                setLocation(locRes.data);
                setHistory(histRes.data.reverse()); // Reverse to show oldest to newest
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!location) return <div>Location not found</div>;

    const currentStatus = history.length > 0 ? history[history.length - 1] : { busynessScore: 0, occupancy: 0, movementScore: 0 };

    const chartData = {
        labels: history.map(h => new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [
            {
                label: 'Busyness Score',
                data: history.map(h => h.busynessScore),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Busyness Trend (Last 20 Updates)',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
            },
        },
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6">
                <ArrowLeft size={20} />
                Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{location.name}</h1>
                                <div className="flex items-center gap-2 text-slate-500 mt-2">
                                    <MapPin size={18} />
                                    <span>{location.address}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500">Current Status</p>
                                <p className={`text-3xl font-bold ${currentStatus.busynessScore > 70 ? 'text-danger' : currentStatus.busynessScore > 40 ? 'text-warning' : 'text-success'}`}>
                                    {currentStatus.busynessScore}% Busy
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Users size={18} />
                                    <span className="text-sm">Occupancy</span>
                                </div>
                                <p className="text-xl font-bold">{currentStatus.occupancy} / {location.capacity}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Activity size={18} />
                                    <span className="text-sm">Activity</span>
                                </div>
                                <p className="text-xl font-bold">{currentStatus.movementScore}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Clock size={18} />
                                    <span className="text-sm">Last Update</span>
                                </div>
                                <p className="text-xl font-bold">{new Date(currentStatus.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>

                        <div className="h-80">
                            <Line options={chartOptions} data={chartData} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card">
                        <h3 className="font-bold text-lg mb-4">Location Info</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">Type</p>
                                <p className="font-medium capitalize">{location.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Capacity</p>
                                <p className="font-medium">{location.capacity} People</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Description</p>
                                <p className="text-sm mt-1">{location.description || 'No description available.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetails;
