import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, ShieldAlert, Scale } from 'lucide-react';
import ReporterRegistrationModal from './ReporterRegistrationModal.jsx';

export default function Footer({ onNavigate, onAdminLogin }) {
  const navigate = useNavigate();
  const [isReporterModalOpen, setIsReporterModalOpen] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
          
          {/* Column 1: Chief Editor Profile */}
          <div className="space-y-4">
            <div className="border-b-2 border-gold/60 pb-1 mb-2">
              <h3 className="font-tiro text-[18px] font-bold text-white tracking-wide">
                मुख्य-संपादक
              </h3>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center shadow-lg">
              <img
                src="/editor-santosh-mulik.jpg"
                alt="मुख्य संपादक संतोष शांताराम मुळीक"
                className="w-[200px] h-[210px] object-cover rounded-2xl mx-auto border-3 border-maroon shadow-md mb-3 block"
              />
              <div
                className="font-tiro font-bold text-[14px] py-2 px-3 rounded-lg shadow-md text-center border border-gold tracking-wide"
                style={{ background: 'var(--gold-light)', color: 'var(--maroon-deep)' }}
              >
                ह्योचो मुख्य संपादक संतोष शांताराम मुळीक
              </div>
            </div>
          </div>

          {/* Column 2: Public Declaration & Legal Jurisdiction */}
          <div className="space-y-5">
            {/* Public Declaration (जाहीर प्रगटन) */}
            <div>
              <div className="border-b-2 border-gold/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <ShieldAlert size={18} className="text-gold-light" />
                <h4 className="font-tiro text-[17px] font-bold text-gold-light">
                  जाहीर प्रगटन
                </h4>
              </div>
              <p className="font-mukta text-[13px] leading-relaxed text-[#9fb0c2] bg-white/5 p-3.5 rounded-xl border border-white/10">
                ह्या संकेतस्थळार इलेले बातमे, लेख हे संपादक म्हणान संतोष शांताराम मुळीक हेनी प्रसिध्दीक घातले असले तरी सगळ्याच बातमेक ते राजी असतीत असा नाय
              </p>
            </div>

            {/* Legal Jurisdiction Box (न्यायालयीन अधिकार) */}
            <div>
              <div className="border-b-2 border-gold/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <Scale size={18} className="text-gold-light" />
                <h4 className="font-tiro text-[17px] font-bold text-gold-light">
                  न्यायालयीन अधिकार
                </h4>
              </div>
              <p className="font-mukta text-[13px] leading-relaxed text-[#9fb0c2] bg-white/5 p-3.5 rounded-xl border border-white/10">
                कोर्ट कचेरीसाठी वकील महेश राऊळ आणि रामनाथ बावकर ह्यांका अधिकार आसत.. सगळा काय ता सावंतवाडी न्याय कक्षेत चलतला..
              </p>
            </div>
          </div>

          {/* Column 3: Reporter Join, Categories & Information */}
          <div className="space-y-5">
            {/* Reporter Registration Section */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="border-b border-white/15 pb-2 mb-2.5">
                <h4 className="font-tiro text-[16.5px] font-bold text-gold-light flex items-center gap-2">
                  <UserPlus size={18} className="text-teal" /> बातमीदार होतल्यात (Reporter Join)
                </h4>
              </div>
              <p className="font-mukta text-[12.5px] text-[#8fa0b3] mb-3 leading-snug">
                आमच्या मालवणी मायबोली मालवणीसाठी तुमका खबरी म्हणजे बातमीदार होवचा आसा तर ह्यो नमुनो भरा
              </p>
              <button
                onClick={() => setIsReporterModalOpen(true)}
                className="w-full font-poppins font-bold text-[12.5px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal to-navy border border-teal-light text-white shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                प्रतिनिधी नोंदणी करा <ArrowRight size={14} />
              </button>
            </div>

            {/* Categories & Talukas Quick Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-2">
                  प्रमुख विभाग
                </h4>
                <div className="space-y-1">
                  {[
                    { label: 'राजकारण', key: 'rajkaran' },
                    { label: 'पर्यटन', key: 'paryatan' },
                    { label: 'मासेमारी-शेती', key: 'maasemari' },
                    { label: 'संस्कृती', key: 'sanskriti' },
                    { label: 'इतर बातमे', key: 'itar-batme' },
                    { label: 'सण व उत्सव', key: 'utsav' },
                  ].map(({ label, key }) => (
                    <button
                      key={key}
                      onClick={() => handleNavigate(key)}
                      className="block font-mukta text-[13px] text-left hover:text-white text-[#8fa0b3] transition-colors"
                    >
                      • {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-poppins font-bold text-[11px] uppercase tracking-[.1em] text-gold-light mb-2">
                  सिंधुदुर्ग तालुके
                </h4>
                <div className="space-y-1">
                  {['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'देवगड'].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleNavigate('listing', { taluka: t })}
                      className="block font-mukta text-[13px] text-left hover:text-white text-[#8fa0b3] transition-colors"
                    >
                      • {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Bottom Links & Admin Login */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 font-mukta text-[13px] text-[#8fa0b3]">
              <div className="flex items-center gap-2">
                <button onClick={() => handleNavigate('about-us')} className="hover:text-white transition-colors">आमच्याबद्दल</button>
                <span>•</span>
                <button onClick={() => handleNavigate('terms')} className="hover:text-white transition-colors">नियम</button>
                <span>•</span>
                <button onClick={() => handleNavigate('privacy')} className="hover:text-white transition-colors">गोपनीयता</button>
              </div>
              <button
                onClick={() => onAdminLogin ? onAdminLogin() : navigate('/admin-login')}
                className="font-poppins font-semibold text-[11.5px] text-gold-light hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
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

      {/* Reporter Application Modal */}
      <ReporterRegistrationModal
        isOpen={isReporterModalOpen}
        onClose={() => setIsReporterModalOpen(false)}
      />
    </footer>
  );
}

