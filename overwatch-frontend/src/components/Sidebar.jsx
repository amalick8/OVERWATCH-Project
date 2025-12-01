import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, User, X, Menu } from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Locations', href: '/locations', icon: MapPin },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    const SidebarContent = () => (
        <div className="flex flex-col h-full pt-6">
            {/* Mobile Close Button (Visible only on mobile) */}
            <div className="lg:hidden flex justify-end px-6 pb-4">
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                ? 'bg-[#0f172a] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon size={20} className={active ? 'text-white' : 'text-gray-500'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet at Bottom */}
            <div className="p-4 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-[#0f172a]/10 flex items-center justify-center text-[#0f172a] font-bold text-xs">
                        AU
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@overwatch.com</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-100 border border-gray-200"
            >
                <Menu size={24} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar;
