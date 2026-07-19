import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar.jsx';
import AdminTopbar from '../../components/admin/AdminTopbar.jsx';
import DashboardPage from './DashboardPage.jsx';
import ArticlesPage from './ArticlesPage.jsx';
import MediaPage from './MediaPage.jsx';
import ReviewPage from './ReviewPage.jsx';
import TalukaPage from './TalukaPage.jsx';
import UsersPage from './UsersPage.jsx';
import SettingsPage from './SettingsPage.jsx';
import ArticleEditorPage from './ArticleEditorPage.jsx';

export default function AdminLayout({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [editingArticle, setEditingArticle] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (key) => {
    setActivePage(key);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleEdit = (a) => setEditingArticle(a);
  const handleNewArticle = () => setEditingArticle({});

  if (editingArticle !== null) {
    return <ArticleEditorPage article={editingArticle} onBack={() => setEditingArticle(null)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage onNavigate={navigate} />;
      case 'articles':  return <ArticlesPage onEdit={handleEdit} />;
      case 'media':     return <MediaPage />;
      case 'review':    return <ReviewPage />;
      case 'taluka':    return <TalukaPage />;
      case 'users':     return <UsersPage />;
      case 'settings':  return <SettingsPage />;
      default:          return <DashboardPage onNavigate={navigate} />;
    }
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
        <Sidebar activePage={activePage} onNavigate={navigate} onLogout={onLogout} />
      </div>

      {/* Main */}
      <div className="admin-main flex-1 flex flex-col min-w-0 w-full">
        <AdminTopbar
          onNewArticle={handleNewArticle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-auto p-4 md:p-7">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
