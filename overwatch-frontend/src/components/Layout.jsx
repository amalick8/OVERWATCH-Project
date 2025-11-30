import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto pb-12">
                {children}
            </main>
        </div>
    );
};

export default Layout;
