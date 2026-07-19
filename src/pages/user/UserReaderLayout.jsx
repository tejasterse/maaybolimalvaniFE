import { useState } from 'react';
import UtilityBar from '../../components/shared/UtilityBar.jsx';
import ChatbotFab from '../../components/shared/ChatbotFab.jsx';
import Footer from '../../components/shared/Footer.jsx';
import HomePage from './HomePage.jsx';
import ArticlePage from './ArticlePage.jsx';
import ListingPage from './ListingPage.jsx';
import SearchPage from './SearchPage.jsx';
import GalleryPage from './GalleryPage.jsx';
import ChatbotPage from './ChatbotPage.jsx';
import { AboutUsPage, TermsPage, PrivacyPage } from './StaticPages.jsx';

const navItems = [
  { key: 'home', label: 'होम' },
  { key: 'listing', label: 'तालुका बातम्या' },
  { key: 'rajkaran', label: 'राजकारण' },
  { key: 'maasemari', label: 'मासेमारी-शेती' },
  { key: 'paryatan', label: 'पर्यटन' },
  { key: 'sanskriti', label: 'संस्कृती' },
  { key: 'krida', label: 'क्रीडा' },
  { key: 'gallery', label: 'गॅलरी' },
  { key: 'search', label: 'शोधा' },
];

// Category pages all use ListingPage with different labels
const categoryPages = ['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida'];

export default function UserReaderLayout({ onAdminLogin }) {
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = (key, params = null) => {
    setActivePage(key);
    setPageParams(params);
    setShowMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (activePage === 'home') return <HomePage onNavigate={navigate} />;
    if (activePage === 'article') return <ArticlePage onNavigate={navigate} />;
    if (activePage === 'listing' || categoryPages.includes(activePage))
      return <ListingPage onNavigate={navigate} categoryKey={activePage} initialTaluka={pageParams?.taluka} />;
    if (activePage === 'search') return <SearchPage onNavigate={navigate} />;
    if (activePage === 'gallery') return <GalleryPage />;
    if (activePage === 'chatbot') return <ChatbotPage />;
    if (activePage === 'about-us') return <AboutUsPage />;
    if (activePage === 'terms') return <TermsPage />;
    if (activePage === 'privacy') return <PrivacyPage />;
    return <HomePage onNavigate={navigate} />;
  };

  const activeNavKey = categoryPages.includes(activePage) ? activePage : activePage;

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--ink)', fontFamily: "'Mukta', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <UtilityBar onAdminLogin={onAdminLogin} onNavigate={navigate} />

      {/* Masthead */}
      <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)', paddingTop: 16 }}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => navigate('home')}
            >
              <img src="/logo.jpg" alt="मायबोली मालवणी" className="h-[60px] md:h-[70px] object-contain rounded-lg border border-gold" />
            </div>
            {/* Search bar in header */}
            <div className="hidden md:flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
                style={{ background: '#F0EAD9', border: '1px solid var(--line)' }}
                onClick={() => navigate('search')}
              >
                <span className="font-poppins text-[12.5px] text-grey">🔍 बातम्या शोधा…</span>
              </div>
            </div>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[22px] text-ink"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Primary Nav — desktop */}
        <nav style={{ background: 'var(--maroon)', marginTop: 14 }}>
          <div className="max-w-[1180px] mx-auto px-6">
            <ul className="hidden md:flex list-none justify-center flex-wrap gap-0.5 overflow-x-auto">
              {navItems.map(({ key, label }) => (
                <li key={key}>
                  <button
                    onClick={() => navigate(key)}
                    className={`block px-4 py-3 font-poppins text-[13px] font-medium border-r border-white/[0.08] nav-transition
                      ${activeNavKey === key ? 'bg-maroon-deep text-gold-light' : 'text-[#fbe8c9] hover:bg-maroon-deep hover:text-gold-light'}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden" style={{ background: 'var(--maroon-deep)', borderTop: '1px solid rgba(255,255,255,.1)' }}>
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className="block w-full text-left px-6 py-3 font-poppins text-[14px] font-medium border-b border-white/10"
                style={{ color: activeNavKey === key ? 'var(--gold-light)' : '#fbe8c9' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex-1">
        {renderPage()}
      </div>

      <Footer onNavigate={navigate} onAdminLogin={onAdminLogin} />

      <ChatbotFab onClick={() => navigate('chatbot')} />
    </div>
  );
}
