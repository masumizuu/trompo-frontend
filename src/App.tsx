import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrompoLayout from "./pages/trompo";
import LandingPage from "./pages/LandingPage";
import SignUpForm from "./pages/SignUp";
import LoginForm from "./pages/Login";
import Browse from "./pages/Browse";
import BusinessOwnerDashboard from "./pages/bus_own/BODashboard.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./ProtectedRoute";
import StoreView from "./pages/StoreView.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MAIN VIEW (All Screens Inside TrompoLayout) */}
                <Route path="/" element={<TrompoLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="browse" element={<Browse />} />
                    <Route path="profile" element={<Profile />} />

                    {/* ✅ Store View Route (Passes Business ID) */}
                    <Route path="store/:businessId" element={<StoreView />} />


                    {/* ✅ Protected Business Owner Route */}
                    <Route element={<ProtectedRoute allowedRoles={["BUSINESS_OWNER"]} />}>
                        <Route path="business-dashboard" element={<BusinessOwnerDashboard />} />
                    </Route>
                </Route>

                {/* STANDALONE ROUTES */}
                {/* ✅ Protected Admin Route */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>

                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
            </Routes>
        </BrowserRouter>
    );
}