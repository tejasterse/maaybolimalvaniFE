import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart2, FileText, Image as ImageIcon, CheckSquare, MapPin, Megaphone, Film, Tent, Images, Users, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (key) => {
    if (key === 'dashboard') navigate('/admin');
    else navigate(`/admin/${key}`);
  };

  // Determine active page from URL
  const pathParts = location.pathname.split('/');
  const activePage = pathParts[2] || 'dashboard';
  const navItems = [
    { key: 'dashboard', label: 'डॅशबोर्ड', icon: <BarChart2 size={18} /> },
    { key: 'articles',  label: 'लेख', icon: <FileText size={18} /> },
    { key: 'media',     label: 'मीडिया लायब्ररी', icon: <ImageIcon size={18} /> },
    { key: 'review',    label: 'रिव्ह्यू क्यू', icon: <CheckSquare size={18} /> },
    { key: 'taluka',    label: 'विभाग व तालुका', icon: <MapPin size={18} /> },
    { key: 'ads',       label: 'जाहिराती', icon: <Megaphone size={18} /> },
    { key: 'entertainment', label: 'मनोरंजन', icon: <Film size={18} /> },
    { key: 'events',    label: 'सण व उत्सव', icon: <Tent size={18} /> },
    { key: 'gallery',   label: 'गॅलरी', icon: <Images size={18} /> },
    { key: 'users',     label: 'युजर्स व भूमिका', icon: <Users size={18} /> },
    { key: 'settings',  label: 'सेटिंग्ज', icon: <Settings size={18} /> },
  ];

  return (
    <aside
      className="w-[230px] flex-shrink-0 flex flex-col py-5 min-h-screen"
      style={{ background: 'var(--navy)', color: '#cfd9e4' }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2.5 px-5 pb-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}
      >
        <img src="/logo.png" alt="मायबोली मालवणी" className="w-[65px] h-[65px] object-contain drop-shadow-md animate-fade-in" />
        <div>
          <span className="block font-tiro text-[14px] text-white font-bold leading-tight">मायबोली मालवणी</span>
          <span className="block font-poppins text-[8.5px] tracking-[.1em] text-gold-light mt-0.5">ADMIN PANEL</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-3 flex-1">
        {navItems.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => handleNavigate(key)}
            className={`flex items-center gap-3 px-5 py-[11px] font-poppins text-[13px] font-medium cursor-pointer nav-transition
              ${activePage === key ? 'sidebar-item-active' : 'sidebar-item text-[#a9b8c8] hover:bg-navy-light hover:text-white'}`}
          >
            <span className="text-[15px]">{icon}</span>
            {label}
          </div>
        ))}
      </nav>

      {/* Profile + Logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="px-5 pt-4 pb-3 flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-poppins font-bold text-[13px] flex-shrink-0"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
          >
            SP
          </div>
          <div className="font-poppins text-[12px] leading-snug">
            सारिका पवार
            <div className="text-[10px]" style={{ color: '#8fa0b3' }}>Editor</div>
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mx-5 mb-4 font-poppins font-semibold text-[12px] py-2 rounded-lg text-center"
            style={{
              background: 'rgba(255,255,255,.08)',
              color: '#cfd9e4',
              border: '1px solid rgba(255,255,255,.15)',
              width: 'calc(100% - 40px)',
              display: 'block',
            }}
          >
            <LogOut size={16} className="inline mr-2" /> लॉगआउट
          </button>
        )}
      </div>
    </aside>
  );
}
