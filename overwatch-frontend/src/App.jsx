import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Placeholder pages
const Landing = () => <div className="text-center mt-20"><h1 className="text-4xl font-bold">Welcome to Overwatch</h1><p className="mt-4 text-xl text-slate-600">Real-time environment awareness.</p></div>;
const Login = () => <div className="max-w-md mx-auto mt-20 card"><h2 className="text-2xl font-bold mb-6">Login</h2><p>Login form goes here.</p></div>;
const Register = () => <div className="max-w-md mx-auto mt-20 card"><h2 className="text-2xl font-bold mb-6">Register</h2><p>Register form goes here.</p></div>;
const Dashboard = () => <div><h2 className="text-2xl font-bold mb-6">Dashboard</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="card"><h3>Busyness</h3><p className="text-3xl font-bold text-accent mt-2">78%</p></div></div></div>;
const LocationDetails = () => <div><h2 className="text-2xl font-bold mb-6">Location Details</h2></div>;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/locations/:id"
                        element={
                            <ProtectedRoute>
                                <LocationDetails />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
