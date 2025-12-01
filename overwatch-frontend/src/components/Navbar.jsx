import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Premium button styling - Lighter Navy
    const premiumBtnClass = "bg-[#2C3E55] text-white shadow-sm shadow-[#2C3E55]/20 hover:bg-[#314766] hover:scale-[1.02] active:bg-[#233246] transition-all duration-200 border-none";

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Activity className="text-[#2C3E55]" size={28} />
                        <span className="text-xl font-bold text-[#2C3E55]">OVERWATCH</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                                    <UserIcon size={16} className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                </div>
                                <Button variant="secondary" onClick={handleLogout}>
                                    <LogOut size={16} />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button className={premiumBtnClass}>Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button className={premiumBtnClass}>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
