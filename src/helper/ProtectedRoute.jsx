import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component that checks if the user is authenticated
 * by looking for a token in localStorage.
 * 
 * If authenticated, it renders the child routes (via Outlet)
 * If not authenticated, it redirects to the home page
 */
const ProtectedRoute = () => {
  // Check if there's a token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // If authenticated, render the child routes
  // Otherwise, redirect to the home page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;