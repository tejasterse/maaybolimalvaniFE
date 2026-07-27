import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  const role = (user.role || '').toUpperCase();
  if (role && role !== 'ADMIN' && user.roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

