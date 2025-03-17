import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userType = localStorage.getItem("user_type"); // Retrieve user role

    if (!userType) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    if (!allowedRoles.includes(userType)) {
        return <Navigate to="/" replace />; // Redirect if not authorized
    }

    return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;