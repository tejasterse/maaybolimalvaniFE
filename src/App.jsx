import { useState } from 'react';
import AdminLoginPage from './pages/auth/AdminLoginPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import UserReaderLayout from './pages/user/UserReaderLayout.jsx';

// Application views: 'reader' (public, default), 'admin-login', 'admin'

export default function App() {
  const [view, setView] = useState('reader');

  // 1. Logged in as admin
  if (view === 'admin') {
    return <AdminLayout onLogout={() => setView('reader')} />;
  }

  // 2. Admin Login page
  if (view === 'admin-login') {
    return (
      <AdminLoginPage
        onLogin={() => setView('admin')}
        onGoUser={() => setView('reader')}
      />
    );
  }

  // 3. Public User/Reader Layout (Default)
  return <UserReaderLayout onAdminLogin={() => setView('admin-login')} />;
}
