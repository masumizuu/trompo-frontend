import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrompoLayout from "./pages/trompo";
import LandingPage from "./pages/LandingPage";
import SignUpForm from "./pages/SignUp";
import LoginForm from "./pages/Login";
import Browse from "./pages/Browse";
import BusinessOwnerDashboard from "./pages/bus_own/BODashboard.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TrompoLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="browse" element={<Browse />} />
                </Route>

                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/business-dashboard" element={<BusinessOwnerDashboard />} />
                <Route path="/customer-home" element={<div>Customer Home Placeholder</div>} />
            </Routes>
        </BrowserRouter>
    );
}
