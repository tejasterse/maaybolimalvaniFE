import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UtilityBar({ onNavigate, onAdminLogin }) {
  const routerNavigate = useNavigate();

  // Dynamic daily Date & Day in Marathi
  const currentDateFormatted = new Date().toLocaleDateString('mr-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Dynamic live Weather for Sindhudurg
  const [weatherText, setWeatherText] = useState('सिंधुदुर्ग: २९°C, ढगाळ');

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=16.03&longitude=73.71&current_weather=true');
        const data = await res.json();
        if (isMounted && data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          const code = data.current_weather.weathercode;
          let statusText = 'ढगाळ';
          if (code === 0) statusText = 'स्वच्छ आकाश';
          else if (code >= 1 && code <= 3) statusText = 'भागशः ढगाळ';
          else if (code >= 51 && code <= 82) statusText = 'पाऊस';
          else if (code >= 95) statusText = 'वादळी पाऊस';

          const marathiTemp = temp.toString().replace(/\d/g, d => '०१२३४५६७८९'[d]);
          setWeatherText(`सिंधुदुर्ग: ${marathiTemp}°C, ${statusText}`);
        }
      } catch (e) {
        // Fallback gracefully
      }
    };
    fetchWeather();
    return () => { isMounted = false; };
  }, []);

  const navigate = (path) => {
    if (onNavigate) {
      if (path === '/about-us') {
        onNavigate('about-us');
      } else if (path === '/admin-login') {
        if (onAdminLogin) {
          onAdminLogin();
        } else {
          routerNavigate('/admin-login');
        }
      }
    } else {
      if (path === '/admin-login' && onAdminLogin) {
        onAdminLogin();
      } else {
        routerNavigate(path);
      }
    }
  };
  const handleSocialClick = (platform) => {
    alert(`${platform} वर मायबोली मालवणीक कनेक्ट केल्याबद्दल धन्यवाद!`);
  };

  return (
    <div className="bg-navy text-[#cfd9e4] font-poppins text-[11.5px]">
      <div className="flex justify-between items-center px-6 py-2 max-w-[1180px] mx-auto">
        <div className="flex items-center gap-4">
          <span className="opacity-90 font-medium">{currentDateFormatted}</span>
          <span className="hidden sm:inline opacity-85 border-l border-white/20 pl-4">{weatherText}</span>
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
