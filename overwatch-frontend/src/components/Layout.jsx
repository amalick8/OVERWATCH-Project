import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto pb-12">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
