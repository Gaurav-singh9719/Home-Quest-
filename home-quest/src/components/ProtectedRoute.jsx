import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in → redirect to login
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== allowedRole) {
    // User logged in but role mismatch → send back to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
