import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
    const location = useLocation();
    const isDemo = location.pathname === '/demo';

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {isDemo ? (
                // Classic Layout for Demo Mode (Unchanged)
                <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto pb-12">
                    <Outlet />
                </main>
            ) : (
                // Premium App Shell for Live Dashboard, Locations, Profile
                <div className="flex w-full max-w-[1600px] mx-auto mt-4 h-[calc(100vh-5rem)] overflow-hidden">
                    {/* Sidebar - Flush and Unchanged */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
                        {/* Premium Viewport Frame */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-full relative flex flex-col">
                            {/* Top Accent Bar */}
                            <div className="h-1 w-full rounded-t-2xl bg-[#2C3E55] opacity-[0.04]" />

                            {/* Inner Content Padding */}
                            <div className="p-8 md:p-10 flex-1">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default Layout;
