import React, { useState } from 'react';
import Card from '../components/Card';
import { User, Bell, Shield, Key, LogOut, Mail, Building } from 'lucide-react';

const Profile = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        alerts: true
    });

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Profile</h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - User Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="shadow-sm rounded-xl border border-gray-100 text-center p-8">
                        <div className="w-24 h-24 bg-[#0f172a]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="text-[#0f172a]" size={48} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
                        <p className="text-gray-500 mb-6">admin@overwatch.com</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0f172a]/10 text-[#0f172a] text-sm font-medium">
                            <Shield size={14} className="mr-1.5" />
                            Administrator
                        </div>
                    </Card>
                </div>

                {/* Right Column - Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <Card className="shadow-sm rounded-xl border border-gray-100">
                        <h3 className="text-lg font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
                            <User size={20} className="text-gray-400" />
                            Personal Information
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Admin User"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@overwatch.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input
                                        type="text"
                                        defaultValue="Administrator"
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                    <input
                                        type="text"
                                        defaultValue="Overwatch Inc."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] outline-none"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="px-4 py-2 bg-[#0f172a] text-white rounded-lg hover:bg-[#0f172a]/90 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Notification Settings */}
                    <Card className="shadow-sm rounded-xl border border-gray-100">
                        <h3 className="text-lg font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-gray-400" />
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900">Email Notifications</p>
                                        <p className="text-sm text-gray-500">Receive daily summary reports</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications.email}
                                        onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0f172a]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f172a]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Bell className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900">Push Notifications</p>
                                        <p className="text-sm text-gray-500">Real-time alerts for high occupancy</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications.push}
                                        onChange={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0f172a]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f172a]"></div>
                                </label>
                            </div>
                        </div>
                    </Card>

                    {/* Account Actions */}
                    <Card className="shadow-sm rounded-xl border border-gray-100">
                        <h3 className="text-lg font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
                            <Shield size={20} className="text-gray-400" />
                            Security
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-1">
                                <Key size={18} />
                                Change Password
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex-1">
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

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

export default Profile;
