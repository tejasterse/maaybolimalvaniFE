export default function Sidebar({ activePage, onNavigate, onLogout }) {
  const navItems = [
    { key: 'dashboard', label: 'डॅशबोर्ड', icon: '📊' },
    { key: 'articles',  label: 'लेख', icon: '📝' },
    { key: 'media',     label: 'मीडिया लायब्ररी', icon: '🖼️' },
    { key: 'review',    label: 'रिव्ह्यू क्यू', icon: '✅' },
    { key: 'taluka',    label: 'विभाग व तालुका', icon: '🗺️' },
    { key: 'users',     label: 'युजर्स व भूमिका', icon: '👥' },
    { key: 'settings',  label: 'सेटिंग्ज', icon: '⚙️' },
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
            onClick={() => onNavigate(key)}
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
            🚪 लॉगआउट
          </button>
        )}
      </div>
    </aside>
  );
}
