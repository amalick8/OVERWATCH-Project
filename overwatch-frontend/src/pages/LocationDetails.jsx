import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import Card from '../components/Card';
import BusynessBadge from '../components/BusynessBadge';
import { ArrowLeft, Users, Activity, Clock, MapPin, Building2, AlertCircle } from 'lucide-react';
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
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LocationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchData = async () => {
        try {
            setError('');
            const [locRes, histRes] = await Promise.all([
                axios.get(`${API_URL}/api/locations/${id}`),
                axios.get(`${API_URL}/api/live/${id}/history`),
            ]);
            setLocation(locRes.data);
            setHistory(histRes.data.reverse());
            setLoading(false);
        } catch (error) {
            console.error('Error fetching details:', error);
            setError('Failed to load location details.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader size="lg" />
                </div>
            </div>
        );
    }

    if (error || !location) {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <Card className="max-w-md text-center">
                        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                        <h2 className="mb-2">Error Loading Location</h2>
                        <p className="text-gray-600 mb-6">{error || 'Location not found'}</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
                        >
                            Back to Dashboard
                        </button>
                    </Card>
                </div>
            </div>
        );
    }

    const currentStatus = history.length > 0 ? history[history.length - 1] : {
        busynessScore: 0,
        occupancy: 0,
        movementScore: 0,
        timestamp: new Date()
    };

    const chartData = {
        labels: history.map(h => new Date(h.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })),
        datasets: [
            {
                label: 'Busyness Score',
                data: history.map(h => h.busynessScore),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    color: '#f3f4f6',
                },
                ticks: {
                    callback: (value) => value + '%',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                    <div className="px-6 py-6">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </button>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl mb-2">{location.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={18} />
                                    <span>{location.address}</span>
                                </div>
                            </div>
                            <BusynessBadge score={currentStatus.busynessScore} size="lg" />
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Current Occupancy</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {currentStatus.occupancy} / {location.capacity}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {Math.round((currentStatus.occupancy / location.capacity) * 100)}% full
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Users className="text-primary" size={24} />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Movement Activity</p>
                                    <p className="text-3xl font-bold text-gray-900">{currentStatus.movementScore || 0}</p>
                                    <p className="text-sm text-gray-500 mt-1">activity score</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <Activity className="text-accent" size={24} />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {new Date(currentStatus.timestamp || Date.now()).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">real-time data</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                                    <Clock className="text-success" size={24} />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Busyness Trend Chart */}
                    <Card>
                        <h3 className="mb-6">Busyness Trend</h3>
                        <div className="h-80">
                            {history.length > 0 ? (
                                <Line options={chartOptions} data={chartData} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No historical data available
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Location Info */}
                    <Card>
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="text-primary" size={24} />
                            <h3>Location Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Type</p>
                                <p className="text-lg font-semibold text-gray-900 capitalize">{location.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Capacity</p>
                                <p className="text-lg font-semibold text-gray-900">{location.capacity} people</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500 mb-1">Description</p>
                                <p className="text-gray-700 leading-relaxed">
                                    {location.description || 'No description available for this location.'}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LocationDetails;
