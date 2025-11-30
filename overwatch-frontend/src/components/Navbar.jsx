import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, MapPin, BarChart2, Settings } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    // Mock auth state for now
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 fixed w-full top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">O</span>
                </div>
                <Link to="/" className="text-xl font-bold text-primary">Overwatch</Link>
            </div>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/dashboard" className="text-slate-600 hover:text-accent flex items-center gap-2">
                            <BarChart2 size={20} />
                            <span className="hidden md:block">Dashboard</span>
                        </Link>
                        <Link to="/locations" className="text-slate-600 hover:text-accent flex items-center gap-2">
                            <MapPin size={20} />
                            <span className="hidden md:block">Locations</span>
                        </Link>
                        <div className="flex items-center gap-4 ml-4 border-l border-slate-200 pl-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                    <User size={18} className="text-slate-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 hidden md:block">{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="text-slate-400 hover:text-danger">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-slate-600 hover:text-primary font-medium">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
