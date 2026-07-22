import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const handleNavigate = (key) => navigate(key === 'home' ? '/' : `/${key}`);
  return (
    <footer style={{ background: 'var(--navy)', borderTop: '3px solid var(--gold)' }} className="py-8 mt-12 text-[#cfd9e4]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Logo and Brand tagline */}
          <div>
            <div
              className="mb-2 cursor-pointer"
              onClick={() => handleNavigate('home')}
            >
              <img src="/logo.png" alt="मायबोली मालवणी" className="h-[75px] object-contain drop-shadow-md p-0 m-0 block" />
            </div>
            <div className="font-poppins text-[11.5px] leading-relaxed" style={{ color: '#8fa0b3' }}>
              कोकणाचा आवाज · मालवणी अभिमान<br />सिंधुदुर्ग जिल्ह्यातील विश्वासार्ह मराठी बातमीपत्र
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-3">विभाग</h4>
            <div className="space-y-1">
              {[
                { label: 'राजकारण', key: 'rajkaran' },
                { label: 'पर्यटन', key: 'paryatan' },
                { label: 'मासेमारी-शेती', key: 'maasemari' },
                { label: 'संस्कृती', key: 'sanskriti' },
                { label: 'क्रीडा', key: 'krida' },
                { label: 'गुन्हे', key: 'gunhe' },
                { label: 'कविता-लेख-विनोद', key: 'kavita-lekh' },
                { label: 'सण व उत्सव', key: 'utsav' },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className="block font-mukta text-[13.5px] text-left hover:text-white transition-colors"
                  style={{ color: '#8fa0b3' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Talukas */}
          <div>
            <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-3">तालुके</h4>
            <div className="space-y-1">
              {['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleNavigate('listing')}
                  className="block font-mukta text-[13.5px] text-left hover:text-white transition-colors"
                  style={{ color: '#8fa0b3' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Static Pages (No main navigation items) */}
          <div>
            <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-3">माहिती व नियम</h4>
            <div className="space-y-1">
              {[
                { label: 'आमच्याबद्दल', key: 'about-us' },
                { label: 'नियम आणि अटी', key: 'terms' },
                { label: 'गोपनीयता धोरण', key: 'privacy' },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className="block font-mukta text-[13.5px] text-left hover:text-white transition-colors"
                  style={{ color: '#8fa0b3' }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => navigate('/admin-login')}
                className="block font-mukta text-[13.5px] text-left text-gold-light hover:text-white transition-colors mt-2"
              >
                संपादक लॉगिन →
              </button>
            </div>
          </div>
        </div>

        <div
          className="pt-4 font-poppins text-[11px] text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,.08)', color: '#5a7090' }}
        >
          © २०२६ मायबोली मालवणी · सर्व हक्क राखीव · सिंधुदुर्ग, महाराष्ट्र
        </div>
      </div>
    </footer>
  );
}
