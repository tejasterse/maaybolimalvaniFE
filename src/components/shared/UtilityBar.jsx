import { useNavigate } from 'react-router-dom';

export default function UtilityBar() {
  const navigate = useNavigate();
  const handleSocialClick = (platform) => {
    alert(`${platform} वर मायबोली मालवणीला कनेक्ट केल्याबद्दल धन्यवाद!`);
  };

  return (
    <div className="bg-navy text-[#cfd9e4] font-poppins text-[11.5px]">
      <div className="flex justify-between items-center px-6 py-2 max-w-[1180px] mx-auto">
        <div className="flex">
          <span className="mr-4 opacity-85">शनिवार, १८ जुलै २०२६</span>
          <span className="hidden sm:inline opacity-85">सिंधुदुर्ग: २९°C, ढगाळ</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSocialClick('WhatsApp चॅनल')}
            className="hidden sm:inline opacity-90 hover:text-white transition-colors"
          >
            WhatsApp चॅनल
          </button>
          <button
            onClick={() => handleSocialClick('Facebook')}
            className="hidden sm:inline opacity-90 ml-3 hover:text-white transition-colors"
          >
            Facebook
          </button>
          <button
            onClick={() => navigate('/about-us')}
            className="hidden sm:inline opacity-90 ml-3 hover:text-white transition-colors"
          >
            आमच्याबद्दल
          </button>
          <button
            onClick={() => navigate('/admin-login')}
            className="ml-3 font-poppins font-semibold text-[11px] px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
            style={{ background: 'rgba(255,255,255,.12)', color: '#cfd9e4', border: '1px solid rgba(255,255,255,.2)' }}
          >
            संपादक लॉगिन
          </button>
        </div>
      </div>
    </div>
  );
}
