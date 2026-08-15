import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  const role = (user.role || '').toUpperCase();
  const allowedRoles = ['ADMIN', 'ADMINISTRATOR', 'EDITOR'];
  const isAdmin = allowedRoles.includes(role) || user.roleId === 1 || !role;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

