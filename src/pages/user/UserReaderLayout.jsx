import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Search, Menu, X } from 'lucide-react';
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
import EntertainmentListingPage from './EntertainmentListingPage.jsx';
import EntertainmentArticlePage from './EntertainmentArticlePage.jsx';
import EventsListingPage from './EventsListingPage.jsx';
import VideosPage from './VideosPage.jsx';

const navItems = [
  { key: 'home', label: 'होम' },
  { key: 'listing', label: 'तालुक्याच्यो बातम्या' },
  { key: 'videos', label: 'युट्यूब व्हिडिओ' },
  { key: 'rajkaran', label: 'राजकारण' },
  { key: 'maasemari', label: 'मासेमारी-शेती' },
  { key: 'paryatan', label: 'पर्यटन' },
  { key: 'sanskriti', label: 'संस्कृती' },
  { key: 'krida', label: 'क्रीडा' },
  { key: 'gunhe', label: 'गुन्हे' },
  { key: 'kavita-lekh', label: 'कविता-लेख-विनोद' },
  { key: 'utsav', label: 'सण आनि उत्सव' },
  { key: 'gallery', label: 'गॅलरी' },
  { key: 'search', label: 'शोधा' },
];

// Category pages all use ListingPage with different labels
const categoryPages = ['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida', 'gunhe'];

export default function UserReaderLayout({ onAdminLogin }) {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [pageParams, setPageParams] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sync URL changes to activePage state
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActivePage('home');
      setPageParams(null);
    } else if (path.startsWith('/article/')) {
      const id = path.split('/').pop();
      setActivePage('article');
      setPageParams(id);
    } else if (path === '/listing') {
      setActivePage('listing');
      // If we entered listing via history or direct link, check state
      setPageParams(location.state || null);
    } else if (['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida', 'gunhe'].includes(path.substring(1))) {
      setActivePage(path.substring(1));
      setPageParams(null);
    } else if (path === '/search') {
      setActivePage('search');
      setPageParams(null);
    } else if (path === '/gallery') {
      setActivePage('gallery');
      setPageParams(null);
    } else if (path === '/chatbot') {
      setActivePage('chatbot');
      setPageParams(null);
    } else if (path === '/about-us') {
      setActivePage('about-us');
      setPageParams(null);
    } else if (path === '/terms') {
      setActivePage('terms');
      setPageParams(null);
    } else if (path === '/privacy') {
      setActivePage('privacy');
      setPageParams(null);
    } else if (path === '/entertainment') {
      setActivePage('entertainment');
      setPageParams(null);
    } else if (path.startsWith('/entertainment/')) {
      const id = path.split('/').pop();
      setActivePage('entertainment-article');
      setPageParams(id);
    } else if (path === '/events') {
      setActivePage('events');
      setPageParams(null);
    } else if (path === '/videos') {
      setActivePage('videos');
      setPageParams(null);
    } else if (path === '/utsav') {
      setActivePage('utsav');
      setPageParams(null);
    } else if (path === '/kavita-lekh' || path === '/kavita') {
      setActivePage('kavita-lekh');
      setPageParams(null);
    }
  }, [location.pathname]);

  const navigate = (rawKey, params = null) => {
    const key = rawKey === 'kavita' ? 'kavita-lekh' : rawKey;
    if (key !== activePage) {
      setPageHistory((prev) => [...prev, key]);
    }
    setActivePage(key);
    setPageParams(params);
    setShowMobileMenu(false);
    window.scrollTo(0, 0);

    // Sync state actions back to react-router URL
    if (key === 'home') routerNavigate('/');
    else if (key === 'article') routerNavigate(`/article/${params}`);
    else if (key === 'entertainment-article') routerNavigate(`/entertainment/${params}`);
    else if (key === 'listing') {
      if (params?.taluka) {
        routerNavigate('/listing', { state: { taluka: params.taluka } });
      } else {
        routerNavigate('/listing');
      }
    }
    else routerNavigate(`/${key}`);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const updatedHistory = [...pageHistory];
      updatedHistory.pop(); // remove current page
      const previous = updatedHistory[updatedHistory.length - 1] || 'home';
      setPageHistory(updatedHistory);
      setActivePage(previous);

      // Trigger URL sync via navigation to the previous state
      if (previous === 'home') routerNavigate('/');
      else routerNavigate(`/${previous}`);
    } else {
      setActivePage('home');
      routerNavigate('/');
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
    if (activePage === 'entertainment') return <EntertainmentListingPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'entertainment-article') return <EntertainmentArticlePage onNavigate={navigate} onGoBack={goBack} articleId={pageParams} />;
    if (activePage === 'events') return <EventsListingPage onNavigate={navigate} onGoBack={goBack} />;
    if (activePage === 'videos') return <VideosPage onNavigate={navigate} onGoBack={goBack} />;
    return <HomePage onNavigate={navigate} />;
  };

  const activeNavKey = categoryPages.includes(activePage) ? activePage : activePage;

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--ink)', fontFamily: "'Mukta', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <UtilityBar onAdminLogin={onAdminLogin} onNavigate={navigate} />

      {/* Header with BOTH Logos (logo.png enlarged + header-logo.jpg) and Maroon Pill Navbar */}
      <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)' }} className="py-3 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          {/* Top Row: Both Logos with Center Website Title */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3">
            {/* 1. Primary Circular Badge Logo (logo.png) */}
            <div
              className="cursor-pointer flex-shrink-0 leading-none flex items-center"
              onClick={() => navigate('home')}
            >
              <img
                src="/logo.png"
                alt="मायबोली मालवणी"
                className="h-[95px] sm:h-[130px] lg:h-[155px] w-auto object-contain drop-shadow-xl transition-transform hover:scale-[1.02] block -my-2"
              />
            </div>

            {/* 2. Center Website Title */}
            <div
              className="hidden sm:flex flex-col items-center justify-center text-center cursor-pointer px-2 flex-1 select-none"
              onClick={() => navigate('home')}
            >
              <h1 className="font-tiro text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold text-maroon-deep leading-none tracking-tight drop-shadow-sm">
                मायबोली मालवणी
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="h-[1.5px] w-5 sm:w-8 bg-gold/70"></span>
                <p className="font-poppins text-[11px] sm:text-[12.5px] lg:text-[13.5px] font-bold text-[#b47a12] tracking-wide">
                  कोकणाचो आवाज, मालवणी अभिमान!
                </p>
                <span className="h-[1.5px] w-5 sm:w-8 bg-gold/70"></span>
              </div>
            </div>

            {/* 3. Banner Header Logo (header-logo.jpg) */}
            <div
              className="cursor-pointer flex-shrink-0 flex items-center"
              onClick={() => navigate('home')}
            >
              <img
                src="/header-logo.jpg"
                alt="मायबोली मालवणी डिजिटल बातम्या"
                className="h-[75px] sm:h-[105px] lg:h-[125px] w-auto max-w-[220px] sm:max-w-[360px] lg:max-w-[460px] object-contain rounded-2xl border-2 border-gold/50 shadow-md transition-transform hover:scale-[1.01] block"
              />
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-maroon bg-white p-2.5 rounded-xl border border-line shadow-sm flex items-center justify-center"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Bottom Row: Primary Maroon Pill Nav Bar */}
          <nav className="hidden lg:flex items-center bg-maroon p-1.5 px-4 rounded-full border border-gold/40 shadow-lg justify-between w-full">
            <div className="flex items-center justify-between w-full gap-0.5 no-scrollbar overflow-x-auto">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  className={`px-3 py-1.5 rounded-full font-poppins text-[12.5px] font-semibold transition-all whitespace-nowrap ${
                    activeNavKey === key
                      ? 'bg-maroon-deep text-gold-light shadow-sm border border-gold/40'
                      : 'text-[#fbe8c9] hover:bg-maroon-deep hover:text-gold-light'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => navigate('search')}
                className="p-1.5 rounded-full text-gold-light hover:bg-maroon-deep flex items-center justify-center flex-shrink-0 ml-1 border border-transparent hover:border-gold/30 transition-colors"
                title="शोधा"
              >
                <Search size={16} />
              </button>
            </div>
          </nav>
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
              <ArrowLeft size={14} />
              <span>फाटी वचा (Go Back)</span>
            </button>
            <button
              onClick={() => navigate('home')}
              className="font-poppins text-[12px] font-semibold text-teal hover:underline flex items-center gap-1.5"
            >
              <Home size={14} />
              <span>मुख्य पानाव वचा</span>
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
