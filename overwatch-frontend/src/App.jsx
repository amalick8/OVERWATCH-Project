import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Locations from "./pages/Locations.jsx";
import Profile from "./pages/Profile.jsx";
import LocationDetails from "./pages/LocationDetails.jsx";
import Demo from "./pages/Demo.jsx";

import Layout from "./components/Layout.jsx";

function App() {
    return (
        <Router>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected / Layout Routes */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/locations/:id" element={<LocationDetails />} />
                    <Route path="/demo" element={<Demo />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
