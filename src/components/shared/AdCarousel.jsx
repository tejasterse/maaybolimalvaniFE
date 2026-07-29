import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function AdCarousel({ ads, className = "mb-10" }) {
  const defaultAds = [
    { 
      id: 'ad-santosh', 
      title: 'Santosh Tours & Travels Sawantwadi', 
      image_url: '/ads/santosh_tours.png', 
      link_url: '' 
    },
    { 
      id: 'ad-uparkar', 
      title: 'Uparkar Shooting Academy', 
      image_url: '/ads/uparkar_shooting.jpg', 
      link_url: '' 
    }
  ];

  // Strictly use ONLY these 2 images requested by user
  const activeAdsList = (ads && ads.length >= 2) ? ads : defaultAds;

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [lightboxAd, setLightboxAd] = useState(null);

  // Continuous automatic horizontal transition every 3.5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % activeAdsList.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [activeAdsList.length]);

  // Touch swipe gesture support for mobile devices
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 30) {
      setCurrentAdIndex((prev) => (prev + 1) % activeAdsList.length);
    } else if (distance < -30) {
      setCurrentAdIndex((prev) => (prev - 1 + activeAdsList.length) % activeAdsList.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <div 
        className={`relative w-full rounded-2xl overflow-hidden shadow-md bg-white border border-line group ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Track Container */}
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] overflow-hidden select-none bg-slate-900">
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
          >
            {activeAdsList.map((ad, idx) => (
              <div
                key={ad.id || idx}
                onClick={() => ad.link_url ? window.open(ad.link_url, '_blank') : setLightboxAd(ad)}
                className="w-full h-full flex-shrink-0 relative cursor-pointer flex items-center justify-center bg-slate-950/90 overflow-hidden"
              >
                {/* Subtle background blur fill */}
                <img
                  src={ad.image_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                />
                
                {/* Main Ad Image */}
                <img
                  src={ad.image_url}
                  alt={ad.title || "Jahirata"}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.jpg'; }}
                  className="relative max-w-full max-h-full object-contain z-10 drop-shadow-xl"
                />

                <div className="absolute top-3 left-3 bg-black/75 text-gold-light text-[10px] font-poppins px-3.5 py-1 rounded-full backdrop-blur-md uppercase tracking-wider font-semibold z-20 shadow-md border border-gold/40">
                  जाहिरात (SPONSORED)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentAdIndex(prev => (prev - 1 + activeAdsList.length) % activeAdsList.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
          aria-label="Previous advertisement"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentAdIndex(prev => (prev + 1) % activeAdsList.length); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
          aria-label="Next advertisement"
        >
          <ChevronRight size={22} />
        </button>
        
        {/* Horizontal Slide Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
          {activeAdsList.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentAdIndex(idx); }}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentAdIndex ? 'w-8 bg-gold shadow-md' : 'w-2.5 bg-white/60 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxAd && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(14,42,71,.94)' }}
          onClick={() => setLightboxAd(null)}
        >
          <button
            className="absolute top-5 right-6 text-white hover:text-gold cursor-pointer font-poppins hover:scale-110 transition-transform bg-black/40 p-2 rounded-full backdrop-blur-sm"
            onClick={() => setLightboxAd(null)}
          >
            <X size={26} />
          </button>
          <img
            src={lightboxAd.image_url}
            alt="Advertisement"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.jpg'; }}
            className="max-w-[900px] max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10"
          />
        </div>
      )}
    </>
  );
}
