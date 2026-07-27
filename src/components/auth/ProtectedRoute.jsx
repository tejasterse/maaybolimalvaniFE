import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (user.role && user.role !== 'ADMIN' && user.roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
