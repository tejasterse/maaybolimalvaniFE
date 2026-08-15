import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, UserPlus, ShieldAlert } from 'lucide-react';

export default function Footer({ onNavigate, onAdminLogin }) {
  const navigate = useNavigate();
  const handleNavigate = (key) => {
    if (onNavigate) {
      onNavigate(key);
    } else {
      navigate(key === 'home' ? '/' : `/${key}`);
    }
  };

  const handleWhatsAppClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? 'whatsapp://send?text=' + encodeURIComponent('मायबोली मालवणी बातम्या वाचण्यासाठी व्हॉट्सॲप ग्रुप जॉईन करा!')
      : 'https://api.whatsapp.com/send?text=' + encodeURIComponent('मायबोली मालवणी बातम्या वाचण्यासाठी व्हॉट्सॲप ग्रुप जॉईन करा!');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer style={{ background: '#0d1b2a', borderTop: '3px solid var(--gold)' }} className="py-10 mt-12 text-[#cfd9e4]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Chief Editor & Public Declaration (जाहीर प्रगटन) */}
          <div className="space-y-6">
            {/* Chief Editor Card */}
            <div>
              <div className="border-b-2 border-gold/60 pb-1 mb-3">
                <h3 className="font-tiro text-[19px] font-bold text-white tracking-wide">
                  मुख्य-संपादक
                </h3>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 max-w-[260px] text-center shadow-lg">
                <img
                  src="/editor-santosh-mulik.jpg"
                  alt="मुख्य संपादक संतोष शांताराम मुळीक"
                  className="w-[200px] h-[210px] object-cover rounded-2xl mx-auto border-3 border-maroon shadow-md mb-2.5 block"
                />
                <div
                  className="font-tiro font-bold text-[14px] py-1.5 px-2.5 rounded-lg shadow-md text-center border border-gold tracking-wide"
                  style={{ background: 'var(--gold-light)', color: 'var(--maroon-deep)' }}
                >
                  ह्योचो मुख्य संपादक संतोष शांताराम मुळीक
                </div>
              </div>
            </div>

            {/* Public Declaration (जाहीर प्रगटन) */}
            <div>
              <div className="border-b-2 border-gold/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <ShieldAlert size={18} className="text-gold-light" />
                <h4 className="font-tiro text-[17px] font-bold text-gold-light">
                  जाहीर प्रगटन
                </h4>
              </div>
              <p className="font-mukta text-[13px] leading-relaxed text-[#9fb0c2] bg-white/5 p-3 rounded-xl border border-white/10">
                या संकेतस्थळावर प्रसिद्ध करण्यात आलेल्या बातम्या व लेख मायबोली मालवणी चे मुख्य संपादक संतोष शांताराम मुळीक यांनी प्रसारित केले असून प्रत्येक मताशी ते सहमत असतीलच असे नाही.
              </p>
            </div>
          </div>

          {/* Column 2: Reporter Registration & Categories */}
          <div className="space-y-6">

            {/* Reporter Registration Section */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="border-b border-white/15 pb-2 mb-3">
                <h4 className="font-tiro text-[17px] font-bold text-gold-light flex items-center gap-2">
                  <UserPlus size={18} className="text-teal" /> प्रतिनिधी नोंदणी (Reporter Join)
                </h4>
              </div>
              <p className="font-mukta text-[13px] text-[#8fa0b3] mb-3 leading-snug">
                सिंधुदुर्ग जिल्ह्यातून वार्ताहर किंवा प्रतिनिधी म्हणून काम करण्यासाठी नोंदणी करा.
              </p>
              <button
                onClick={() => handleNavigate('about-us')}
                className="w-full font-poppins font-bold text-[12.5px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal to-navy border border-teal-light text-white shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                प्रतिनिधी नोंदणी करा <ArrowRight size={14} />
              </button>
            </div>

            {/* Categories Quick Grid */}
            <div>
              <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-2.5">
                प्रमुख विभाग
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'राजकारण', key: 'rajkaran' },
                  { label: 'पर्यटन', key: 'paryatan' },
                  { label: 'मासेमारी-शेती', key: 'maasemari' },
                  { label: 'संस्कृती', key: 'sanskriti' },
                  { label: 'क्रीडा', key: 'krida' },
                  { label: 'गुन्हे बातम्या', key: 'gunhe' },
                  { label: 'कविता-लेख', key: 'kavita-lekh' },
                  { label: 'सण व उत्सव', key: 'utsav' },
                ].map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => handleNavigate(key)}
                    className="font-mukta text-[13px] text-left hover:text-white text-[#8fa0b3] transition-colors py-0.5"
                  >
                    • {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Taluka Navigation & Information / Developer Credit */}
          <div className="space-y-6">
            {/* Logo & Tagline */}
            <div>
              <div
                className="mb-2 cursor-pointer"
                onClick={() => handleNavigate('home')}
              >
                <img src="/logo.png" alt="मायबोली मालवणी" className="h-[75px] object-contain drop-shadow-md p-0 m-0 block" />
              </div>
              <div className="font-poppins text-[11.5px] leading-relaxed text-[#8fa0b3]">
                कोकणाचो आवाज · मालवणी अभिमान<br />सिंधुदुर्ग जिल्ह्यातलो विश्वासार्ह मराठी बातमीपत्र
              </div>
            </div>

            {/* Talukas List */}
            <div>
              <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-2.5">
                सिंधुदुर्ग तालुके
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'वैभववाडी', 'दोडामार्ग'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('listing', { taluka: t });
                      } else {
                        navigate('/listing', { state: { taluka: t } });
                      }
                    }}
                    className="font-mukta text-[13px] text-left hover:text-white text-[#8fa0b3] transition-colors py-0.5"
                  >
                    • {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Rules & Admin Link */}
            <div>
              <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-2">
                म्हायती आनि नियम
              </h4>
              <div className="flex items-center gap-3 flex-wrap font-mukta text-[13px] text-[#8fa0b3]">
                <button onClick={() => handleNavigate('about-us')} className="hover:text-white transition-colors">आमच्याबद्दल</button>
                <span>•</span>
                <button onClick={() => handleNavigate('terms')} className="hover:text-white transition-colors">नियम व अटी</button>
                <span>•</span>
                <button onClick={() => handleNavigate('privacy')} className="hover:text-white transition-colors">गोपनीयता</button>
              </div>
              <button
                onClick={() => onAdminLogin ? onAdminLogin() : navigate('/admin-login')}
                className="font-poppins font-semibold text-[11.5px] text-gold-light hover:text-white transition-colors mt-3 flex items-center gap-1"
              >
                संपादक लॉगिन <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Novynth Labs Pvt Ltd */}
        <div
          className="pt-4 pb-14 md:pb-4 font-poppins text-[11.5px] text-center flex flex-col md:flex-row items-center justify-between gap-2 md:pr-[220px]"
          style={{ borderTop: '1px solid rgba(255,255,255,.1)', color: '#7a92ad' }}
        >
          <div>
            © २०२६ मायबोली मालवणी · सगळे हक्क राखीव · सिंधुदुर्ग, महाराष्ट्र
          </div>
          <div className="flex items-center gap-1 text-[#8fa0b3] font-medium">
            <span>Developed by</span>
            <span className="text-gold-light font-bold tracking-wide">
              Novynth Labs Pvt Ltd
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

