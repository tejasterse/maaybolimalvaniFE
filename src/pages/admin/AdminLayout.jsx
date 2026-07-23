import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar.jsx';
import AdminTopbar from '../../components/admin/AdminTopbar.jsx';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // perform any logout logic if needed
    navigate('/');
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: '#F6F1E6', color: 'var(--ink)', fontFamily: "'Mukta', sans-serif" }}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[300] md:hidden"
          style={{ background: 'rgba(0,0,0,.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar fixed md:relative z-[400] md:z-auto h-full md:h-auto transition-transform md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <Sidebar onLogout={handleLogout} />
      </div>

      {/* Main */}
      <div className="admin-main flex-1 flex flex-col min-w-0 w-full">
        <AdminTopbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-auto p-4 md:p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
