// Shared Masthead + Primary Nav for user-facing pages
export default function Masthead({ activeNav = 'होम' }) {
  const navItems = ['होम', 'तालुक्याच्यो बातम्या', 'राजकारण', 'मासेमारी-शेती', 'पर्यटन', 'संस्कृती', 'खेळ', 'इतर बातमे', 'गॅलरी', 'शोधा'];

  return (
    <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)', paddingTop: 20 }}>
        <div className="flex justify-center items-center gap-3 mb-2 px-4">
          <img src="/header-mayboli.jpeg" alt="मायबोली" className="h-[75px] sm:h-[115px] w-auto object-contain rounded-2xl border-2 border-gold/40 shadow-lg" />
          <img src="/header-malvani.jpeg" alt="मालवणी" className="h-[75px] sm:h-[115px] w-auto object-contain rounded-2xl border-2 border-gold/40 shadow-lg" />
        </div>
      <nav style={{ background: 'var(--maroon)', marginTop: 16 }}>
        <div className="max-w-[1180px] mx-auto px-6">
          <ul className="list-none flex justify-center flex-wrap gap-0.5">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`block px-4 py-3 font-poppins text-[13px] font-medium border-r border-white/[0.08]
                    ${item === activeNav
                      ? 'bg-maroon-deep text-gold-light'
                      : 'text-[#fbe8c9] hover:bg-maroon-deep hover:text-gold-light'
                    }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
