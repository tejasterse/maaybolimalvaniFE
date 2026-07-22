import { Outlet, useNavigate, useLocation, } from 'react-router-dom';
import UtilityBar from '../../components/shared/UtilityBar.jsx';
import ChatbotFab from '../../components/shared/ChatbotFab.jsx';
import Footer from '../../components/shared/Footer.jsx';
import { useState } from 'react';

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

export default function UserReaderLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (key) => {
    setShowMobileMenu(false);
    window.scrollTo(0, 0);
    if (key === 'home') navigate('/');
    else navigate(`/${key}`);
  };

  const activeNavKey = location.pathname.substring(1) || 'home';

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--ink)', fontFamily: "'Mukta', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <UtilityBar />

      {/* Masthead */}
      <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)', paddingTop: 16 }}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => handleNavigate('home')}
            >
              <img src="/logo.jpg" alt="मायबोली मालवणी" className="h-[60px] md:h-[70px] object-contain rounded-lg border border-gold" />
            </div>
            {/* Search bar in header */}
            <div className="hidden md:flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
                style={{ background: '#F0EAD9', border: '1px solid var(--line)' }}
                onClick={() => handleNavigate('search')}
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
                    onClick={() => handleNavigate(key)}
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
                onClick={() => handleNavigate(key)}
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
        <Outlet />
      </div>

      <Footer />

      <ChatbotFab />
    </div>
  );
}
