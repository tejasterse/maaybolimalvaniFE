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
import TalukaNewsPage from './TalukaNewsPage.jsx';

const navItems = [
  { key: 'home', label: 'होम' },
  { key: 'listing', label: 'तालुक्याच्यो बातम्या' },
  { key: 'videos', label: 'युट्यूब व्हिडिओ' },
  { key: 'rajkaran', label: 'राजकारण' },
  { key: 'maasemari', label: 'मासेमारी-शेती' },
  { key: 'paryatan', label: 'पर्यटन' },
  { key: 'sanskriti', label: 'संस्कृती' },
  { key: 'krida', label: 'खेळ' },
  { key: 'itar-batme', label: 'इतर बातमे' },
  { key: 'gunhe', label: 'गुन्हे' },
  { key: 'kavita-lekh', label: 'कविता-लेख-विनोद' },
  { key: 'utsav', label: 'सण आनि उत्सव' },
  { key: 'gallery', label: 'गॅलरी' },
  { key: 'search', label: 'शोधा' },
];

// Category pages all use ListingPage with different labels
const categoryPages = ['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida', 'gunhe', 'itar-batme', 'itar'];

export default function UserReaderLayout({ onAdminLogin }) {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [pageParams, setPageParams] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const talukas = ['sindhudurg', 'malvan', 'sawantwadi', 'kankavli', 'kudal', 'vengurla', 'devgad', 'vaibhavwadi', 'dodamarg'];

  // Sync URL changes to activePage state
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActivePage('home');
      setPageParams(null);
    } else if (path.startsWith('/news/')) {
      const id = path.split('/').pop();
      setActivePage('article');
      setPageParams(id);
    } else if (path.startsWith('/article/')) {
      const id = path.split('/').pop();
      setActivePage('article');
      setPageParams(id);
    } else if (talukas.includes(path.substring(1))) {
      setActivePage('taluka');
      setPageParams(path.substring(1));
    } else if (path === '/listing') {
      setActivePage('listing');
      setPageParams(location.state || null);
    } else if (['rajkaran', 'maasemari', 'paryatan', 'sanskriti', 'krida', 'gunhe', 'itar-batme', 'itar'].includes(path.substring(1))) {
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
    if (talukas.includes(key)) {
      setActivePage('taluka');
      setPageParams(key);
      setShowMobileMenu(false);
      window.scrollTo(0, 0);
      routerNavigate(`/${key}`);
      return;
    }

    setActivePage(key);
    setPageParams(params);
    setShowMobileMenu(false);
    window.scrollTo(0, 0);

    // Sync state actions back to react-router URL
    if (key === 'home') routerNavigate('/');
    else if (key === 'article') routerNavigate(`/news/${params}`);
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
    if (activePage === 'taluka') return <TalukaNewsPage talukaKey={pageParams} onNavigate={navigate} onGoBack={goBack} />;
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

      {/* Header with Logos and Responsive Navigation */}
      <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)' }} className="py-2.5 sm:py-3 relative">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6">
          
          {/* Top Row: Both Logos with Center Website Title */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
            {/* 1. Primary Circular Badge Logo (logo.png) */}
            <div
              className="cursor-pointer flex-shrink-0 leading-none flex items-center gap-2"
              onClick={() => navigate('home')}
            >
              <img
                src="/logo.png"
                alt="मायबोली मालवणी"
                className="h-[60px] xs:h-[75px] sm:h-[130px] lg:h-[155px] w-auto object-contain drop-shadow-xl transition-transform hover:scale-[1.02] block -my-2"
              />
            </div>

            {/* 2. Center Website Title - Prominent & Large in Mobile View */}
            <div
              className="flex flex-col items-center justify-center text-center cursor-pointer px-1 flex-1 select-none"
              onClick={() => navigate('home')}
            >
              <h1 className="font-tiro text-[25px] xs:text-[29px] sm:text-[44px] lg:text-[56px] font-black text-maroon-deep leading-tight tracking-tight drop-shadow-md whitespace-nowrap">
                मायबोली मालवणी
              </h1>
              <div className="flex items-center gap-1 sm:gap-2.5 mt-0.5 sm:mt-1">
                <span className="hidden xs:inline-block h-[1.5px] sm:h-[2px] w-3 sm:w-12 bg-gold"></span>
                <p className="font-poppins text-[11px] xs:text-[13px] sm:text-[16px] lg:text-[18.5px] font-extrabold text-[#a36b08] tracking-wide whitespace-nowrap">
                  कोकणाचो आवाज, मालवणी अभिमान!
                </p>
                <span className="hidden xs:inline-block h-[1.5px] sm:h-[2px] w-3 sm:w-12 bg-gold"></span>
              </div>
            </div>

            {/* 3. Banner Header Logo (header-logo.jpg) - ONLY IN DESKTOP VIEW */}
            <div
              className="cursor-pointer flex-shrink-0 items-center hidden lg:flex header-right-image"
              onClick={() => navigate('home')}
            >
              <img
                src="/header-logo.jpg"
                alt="मायबोली मालवणी डिजिटल बातम्या"
                className="h-[75px] sm:h-[105px] lg:h-[125px] w-auto max-w-[220px] sm:max-w-[360px] lg:max-w-[460px] object-contain rounded-2xl border-2 border-gold/50 shadow-md transition-transform hover:scale-[1.01] block opacity-100"
              />
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-maroon bg-white p-2 sm:p-2.5 rounded-xl border border-line shadow-sm flex items-center justify-center hover:bg-cream transition-colors flex-shrink-0"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
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

        {/* Mobile hamburger menu overlay */}
        {showMobileMenu && (
          <div className="lg:hidden animate-fadeIn" style={{ background: 'var(--maroon-deep)', borderTop: '1px solid rgba(255,255,255,.1)' }}>
            
            {/* Header image at right side now rendered inside hamburger with reduced opacity on mobile */}
            <div className="p-4 bg-black/25 flex flex-col items-center justify-center border-b border-white/10 text-center">
              <div
                className="cursor-pointer"
                onClick={() => { navigate('home'); setShowMobileMenu(false); }}
              >
                <img
                  src="/header-logo.jpg"
                  alt="मायबोली मालवणी डिजिटल बातम्या"
                  className="h-[85px] sm:h-[110px] w-auto object-contain rounded-xl border border-gold/40 shadow-md mobile-hamburger-image transition-opacity duration-200"
                />
              </div>
              <p className="font-poppins text-[12.5px] text-gold-light mt-2 font-bold tracking-wide">
                मायबोली मालवणी डिजिटल बातम्या
              </p>
            </div>

            <div className="py-2">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  className="block w-full text-left px-6 py-3 font-poppins text-[14px] font-medium border-b border-white/10 hover:bg-white/5 transition-colors flex items-center justify-between"
                  style={{ color: activeNavKey === key ? 'var(--gold-light)' : '#fbe8c9' }}
                >
                  <span>{label}</span>
                  {activeNavKey === key && <span className="w-2 h-2 rounded-full bg-gold"></span>}
                </button>
              ))}
            </div>
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
              <span>फाटी‌ बघा(Go Back)</span>
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
