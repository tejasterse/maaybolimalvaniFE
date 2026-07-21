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
import KavitaLekhPage from './KavitaLekhPage.jsx';
import FestivalsPage from './FestivalsPage.jsx';
import { AboutUsPage, TermsPage, PrivacyPage } from './StaticPages.jsx';

const navItems = [
  { key: 'home', label: 'होम' },
  { key: 'listing', label: 'तालुका बातम्या' },
  { key: 'rajkaran', label: 'राजकारण' },
  { key: 'maasemari', label: 'मासेमारी-शेती' },
  { key: 'paryatan', label: 'पर्यटन' },
  { key: 'sanskriti', label: 'संस्कृती' },
  { key: 'krida', label: 'क्रीडा' },
  { key: 'gunhe', label: 'गुन्हे' },
  { key: 'kavita-lekh', label: 'कविता-लेख-विनोद' },
  { key: 'utsav', label: 'सण व उत्सव' },
  { key: 'gallery', label: 'गॅलरी' },
  { key: 'search', label: 'शोधा' },
];

// Category pages all use ListingPage with different labels
const categoryPages = ['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida', 'gunhe'];

export default function UserReaderLayout({ onAdminLogin }) {
  const [activePage, setActivePage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [pageParams, setPageParams] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = (key, params = null) => {
    if (key !== activePage) {
      setPageHistory((prev) => [...prev, key]);
    }
    setActivePage(key);
    setPageParams(params);
    setShowMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const updatedHistory = [...pageHistory];
      updatedHistory.pop(); // remove current page
      const previous = updatedHistory[updatedHistory.length - 1] || 'home';
      setPageHistory(updatedHistory);
      setActivePage(previous);
    } else {
      setActivePage('home');
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (activePage === 'home') return <HomePage onNavigate={navigate} />;
    if (activePage === 'article') return <ArticlePage onNavigate={navigate} onGoBack={goBack} articleData={pageParams} />;
    if (activePage === 'listing' || categoryPages.includes(activePage))
      return <ListingPage onNavigate={navigate} onGoBack={goBack} categoryKey={activePage} initialTaluka={pageParams?.taluka} />;
    if (activePage === 'kavita-lekh') return <KavitaLekhPage onNavigate={navigate} onGoBack={goBack} initialSection={pageParams?.section || 'kavita'} />;
    if (activePage === 'utsav') return <FestivalsPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'search') return <SearchPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'gallery') return <GalleryPage onNavigate={navigate} onGoBack={goBack} initialTab={pageParams?.tab || 'सर्व'} />;
    if (activePage === 'chatbot') return <ChatbotPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'about-us') return <AboutUsPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'terms') return <TermsPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'privacy') return <PrivacyPage onNavigate={navigate} onGoBack={goBack} />;
    return <HomePage onNavigate={navigate} />;
  };

  const activeNavKey = categoryPages.includes(activePage) ? activePage : activePage;

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--ink)', fontFamily: "'Mukta', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <UtilityBar onAdminLogin={onAdminLogin} onNavigate={navigate} />

      {/* Header with Logo on Left and Navbar on Right */}
      <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)' }}>
        <div className="max-w-[1240px] mx-auto px-4 flex items-center justify-between gap-3 py-1">
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0 p-0 m-0 leading-none flex items-center"
            onClick={() => navigate('home')}
          >
            <img src="/logo.png" alt="मायबोली मालवणी" className="h-[80px] md:h-[95px] object-contain drop-shadow-md transition-transform hover:scale-105 p-0 m-0 block" />
          </div>

          {/* Primary Nav — positioned directly on right side of logo */}
          <nav className="hidden lg:flex items-center flex-1 justify-end gap-1 bg-maroon p-1.5 rounded-xl border border-gold/40 shadow-sm overflow-x-auto">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`px-3 py-2 rounded-lg font-poppins text-[12.5px] font-semibold transition-all whitespace-nowrap ${
                  activeNavKey === key
                    ? 'bg-maroon-deep text-gold-light shadow'
                    : 'text-[#fbe8c9] hover:bg-maroon-deep hover:text-gold-light'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate('search')}
              className="p-2 rounded-lg text-gold-light hover:bg-maroon-deep text-[14px] ml-1"
              title="शोधा"
            >
              🔍
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[24px] text-maroon bg-white px-3 py-1.5 rounded-xl border border-line shadow-sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="lg:hidden" style={{ background: 'var(--maroon-deep)', borderTop: '1px solid rgba(255,255,255,.1)' }}>
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

      {/* Back Navigation Bar for opened inner pages */}
      {activePage !== 'home' && (
        <div className="bg-[#F6F1E5] border-b border-gold/30 py-2.5 px-6 shadow-inner">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center gap-2 font-poppins font-bold text-[13px] text-maroon hover:text-maroon-deep bg-white border border-gold/50 px-4 py-1.5 rounded-full shadow-sm hover:shadow transition-all"
            >
              <span className="text-base">←</span>
              <span>मागे जा (Go Back)</span>
            </button>
            <button
              onClick={() => navigate('home')}
              className="font-poppins text-[12px] font-semibold text-teal hover:underline flex items-center gap-1"
            >
              <span>🏠 मुख्य पानावर जा</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1">
        {renderPage()}
      </div>

      <Footer onNavigate={navigate} onAdminLogin={onAdminLogin} />

      <ChatbotFab onClick={() => navigate('chatbot')} />
    </div>
  );
}
