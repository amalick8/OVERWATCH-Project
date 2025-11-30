import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LocationDetails from "./pages/LocationDetails.jsx";

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
                    <Route path="/locations/:id" element={<LocationDetails />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
