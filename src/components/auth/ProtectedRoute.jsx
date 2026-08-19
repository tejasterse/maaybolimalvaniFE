import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // Allow permission for all logged in users who have authenticated token
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}

