// Shared Masthead + Primary Nav for user-facing pages
export default function Masthead({ activeNav = 'होम' }) {
  const navItems = ['होम', 'तालुक्याच्यो बातम्या', 'राजकारण', 'मासेमारी-शेती', 'पर्यटन', 'संस्कृती', 'क्रीडा', 'गॅलरी', 'शोधा'];

  return (
    <header style={{ background: 'var(--cream)', borderBottom: '3px solid var(--gold)', paddingTop: 20 }}>
        <div className="flex justify-center mb-1">
          <img src="/logo.png" alt="मायबोली मालवणी" className="h-[150px] object-contain drop-shadow-md" />
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
