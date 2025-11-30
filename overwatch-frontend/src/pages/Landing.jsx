import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Shield, Zap } from 'lucide-react';

const Landing = () => {
    return (
        <div className="text-center">
            <div className="py-20">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                    See the World <span className="text-accent">Real-Time</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                    Overwatch provides live environment awareness, crowd density tracking, and busyness scores for your favorite locations.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                        Get Started
                    </Link>
                    <Link to="/login" className="btn btn-secondary text-lg px-8 py-3">
                        Login
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                <div className="card">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Eye className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Live Monitoring</h3>
                    <p className="text-slate-600">
                        Real-time updates on crowd levels and occupancy using advanced computer vision.
                    </p>
                </div>
                <div className="card">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="text-success" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Instant Alerts</h3>
                    <p className="text-slate-600">
                        Get notified when your favorite gym or library is empty or too busy.
                    </p>
                </div>
                <div className="card">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                    <p className="text-slate-600">
                        We only track density and movement patterns, never individual identities.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
