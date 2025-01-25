import React from "react";
import { Navigate } from "react-router-dom"; // For navigation
import { useAuth } from "../store/auth";// Import your `useAuth` hook

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the child component (Dashboard)
  return children;
};

export default ProtectedRoute;
