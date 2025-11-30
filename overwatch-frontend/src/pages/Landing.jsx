import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Eye, Zap, Shield, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
    const features = [
        {
            icon: Eye,
            title: 'Real-Time Monitoring',
            description: 'Track occupancy and busyness levels in real-time across all your locations with our advanced sensor network.',
        },
        {
            icon: Zap,
            title: 'Instant Insights',
            description: 'Get immediate alerts and actionable insights to optimize crowd management and resource allocation.',
        },
        {
            icon: TrendingUp,
            title: 'Historical Analytics',
            description: 'Analyze trends and patterns with comprehensive historical data to make informed decisions.',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and security protocols to protect your sensitive location data.',
        },
    ];

    const stats = [
        { label: 'Locations Tracked', value: '10K+' },
        { label: 'Active Users', value: '50K+' },
        { label: 'Data Points Daily', value: '1M+' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Navbar */}
            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Activity className="text-primary" size={28} />
                            <span className="text-2xl font-bold text-gray-900">OVERWATCH</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="secondary">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="section-spacing">
                <div className="container-custom text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Real-Time Environment Awareness
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Monitor busyness, crowd levels, and occupancy across your locations with intelligent sensors and live data analytics.
                        </p>
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <Link to="/register">
                                <Button className="text-base px-8 py-3">
                                    Start Free Trial
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link to="/demo">
                                <Button variant="secondary" className="text-base px-8 py-3">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center">
                                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                                <p className="text-gray-600 mt-2">{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="section-spacing bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="mb-4 text-gray-900">Powerful Features</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to monitor and optimize your physical spaces.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} hover className="flex flex-col">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="text-primary" size={24} />
                                    </div>
                                    <h3 className="mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section - fixed colors */}
            <section className="section-spacing">
                <div className="container-custom">
                    <Card className="bg-gradient-to-br from-slate-950 via-blue-900 to-blue-600 text-white rounded-3xl shadow-lg">
                        <div className="py-16 flex flex-col items-center text-center space-y-6">

                            <h2 className="text-4xl md:text-5xl font-semibold text-white">
                                Ready to get started?
                            </h2>

                            <p className="text-lg text-white/90 max-w-2xl">
                                Join thousands of businesses using OVERWATCH to optimize their operations.
                            </p>

                            <Link to="/register" className="pt-4">
                                <Button
                                    className="px-10 py-4 bg-white text-slate-900 font-semibold text-lg rounded-xl shadow hover:bg-gray-100 transition"
                                    variant="secondary"
                                >
                                    Start Your Free Trial
                                    <ArrowRight size={20} />
                                </Button>
                            </Link>

                        </div>
                    </Card>
                </div>
            </section>


            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="container-custom text-center text-gray-600">
                    <p>&copy; 2024 OVERWATCH. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
