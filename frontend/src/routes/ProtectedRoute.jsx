// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {  } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles, element: Component, children }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Checking credentials...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Support usage with either `element={<Component />}` or child components
  if (Component) return Component;
  return children || <Outlet />;
};

export default ProtectedRoute;
