import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './pages/auth/AdminLoginPage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import UserReaderLayout from './pages/user/UserReaderLayout.jsx';

// User Pages
import HomePage from './pages/user/HomePage.jsx';
import ArticlePage from './pages/user/ArticlePage.jsx';
import ListingPage from './pages/user/ListingPage.jsx';
import SearchPage from './pages/user/SearchPage.jsx';
import GalleryPage from './pages/user/GalleryPage.jsx';
import KavitaLekhPage from './pages/user/KavitaLekhPage.jsx';
import FestivalsPage from './pages/user/FestivalsPage.jsx';
import EntertainmentListingPage from './pages/user/EntertainmentListingPage.jsx';
import EntertainmentArticlePage from './pages/user/EntertainmentArticlePage.jsx';
import EventsListingPage from './pages/user/EventsListingPage.jsx';
import { AboutUsPage, TermsPage, PrivacyPage } from './pages/user/StaticPages.jsx';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage.jsx';
import ArticlesPage from './pages/admin/ArticlesPage.jsx';
import MediaPage from './pages/admin/MediaPage.jsx';
import ReviewPage from './pages/admin/ReviewPage.jsx';
import TalukaPage from './pages/admin/TalukaPage.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';
import ArticleEditorPage from './pages/admin/ArticleEditorPage.jsx';
import AdsPage from './pages/admin/AdsPage.jsx';
import EntertainmentPage from './pages/admin/EntertainmentPage.jsx';
import EventsPage from './pages/admin/EventsPage.jsx';
import GalleryAdminPage from './pages/admin/GalleryAdminPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* 1. Public Reader Routes */}
      <Route path="/" element={<UserReaderLayout />}>
        <Route index element={<HomePage />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="listing" element={<ListingPage />} />
        <Route path="category/:categoryKey" element={<ListingPage />} />
        <Route path="rajkaran" element={<ListingPage categoryKey="rajkaran" />} />
        <Route path="maasemari" element={<ListingPage categoryKey="maasemari" />} />
        <Route path="paryatan" element={<ListingPage categoryKey="paryatan" />} />
        <Route path="sanskriti" element={<ListingPage categoryKey="sanskriti" />} />
        <Route path="krida" element={<ListingPage categoryKey="krida" />} />
        <Route path="gunhe" element={<ListingPage categoryKey="gunhe" />} />
        <Route path="utsav" element={<FestivalsPage />} />
        <Route path="kavita-lekh" element={<KavitaLekhPage />} />
        <Route path="kavita" element={<KavitaLekhPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="entertainment" element={<EntertainmentListingPage />} />
        <Route path="entertainment/:id" element={<EntertainmentArticlePage />} />
        <Route path="events" element={<EventsListingPage />} />
        <Route path="chatbot" element={<Navigate to="/" replace />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>

      {/* 2. Admin Login */}
      <Route path="/admin-login" element={<AdminLoginPage />} />

      {/* 3. Admin Panel Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/new" element={<ArticleEditorPage />} />
          <Route path="articles/edit" element={<ArticleEditorPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="taluka" element={<TalukaPage />} />
          <Route path="ads" element={<AdsPage />} />
          <Route path="entertainment" element={<EntertainmentPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="gallery" element={<GalleryAdminPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
