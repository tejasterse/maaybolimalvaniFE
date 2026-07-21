import { useState } from 'react';
import { galleryItems, albums } from '../../constants/data.jsx';

export default function GalleryPage({ initialTab = 'सर्व', onNavigate, onGoBack }) {
  const [lightbox, setLightbox] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);

  const openLB = (item) => setLightbox(item);
  const closeLB = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('lb-close')) {
      setLightbox(null);
    }
  };

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'सर्व') return true;
    if (activeTab === 'फोटो') return !item.isVideo;
    if (activeTab === 'व्हिडिओ') return item.isVideo;
    return true;
  });

  return (
    <div>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Gallery Head */}
        <div className="py-7 flex justify-between items-end flex-wrap gap-3">
          <div>
            <h1 className="font-tiro text-[30px] text-maroon-deep">फोटो व व्हिडिओ गॅलरी</h1>
            <p className="font-poppins text-[12.5px] text-grey mt-1.5">
              कोकणातल्या घडामोडींचे क्षणचित्रे — सण, उत्सव, बातम्या
            </p>
          </div>
          <div className="flex gap-2">
            {['सर्व', 'फोटो', 'व्हिडिओ'].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-poppins text-[12.5px] font-semibold px-[18px] py-2 rounded-[18px] cursor-pointer border-[1.5px] nav-transition"
                style={
                  activeTab === tab
                    ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' }
                    : { background: '#fff', color: 'var(--teal)', borderColor: 'var(--line)' }
                }
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Album Strip */}
        <div className="flex gap-3.5 overflow-x-auto pb-5 mb-2">
          {albums.map((album) => (
            <div
              key={album.label}
              className="flex-shrink-0 w-[160px] rounded-[10px] overflow-hidden relative cursor-pointer"
            >
              <img src={album.img} alt={album.label} className="w-full h-[100px] object-cover block" />
              <div
                className="absolute inset-0 flex items-end p-2.5"
                style={{ background: 'linear-gradient(0deg, rgba(14,42,71,.85), transparent 60%)' }}
              >
                <span className="font-poppins text-[11.5px] font-bold text-white leading-snug">{album.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredItems.map((item) => (
            <div
              key={item.title}
              className="masonry-item rounded-[10px] overflow-hidden bg-white shadow-sm relative cursor-pointer"
              onClick={() => openLB(item)}
            >
              <img src={item.img} alt={item.title} className="w-full block" />
              {item.isVideo && (
                <div
                  className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full flex items-center justify-center text-[12px] text-white"
                  style={{ background: 'rgba(14,42,71,.85)' }}
                >
                  ▶
                </div>
              )}
              <div className="p-2.5">
                <div className="font-poppins text-[11.5px] font-semibold text-ink">{item.title}</div>
                <div className="font-poppins text-[10px] text-grey mt-0.5">{item.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100] p-10"
          style={{ background: 'rgba(14,42,71,.92)' }}
          onClick={closeLB}
        >
          <span
            className="lb-close absolute top-6 right-8 text-white text-[26px] cursor-pointer font-poppins"
            onClick={closeLB}
          >
            ✕
          </span>
          <img
            src={lightbox.img}
            alt={lightbox.title}
            className="max-w-[800px] max-h-[80vh] rounded-lg"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}
          />
          <div className="absolute bottom-7 left-0 right-0 text-center text-white font-poppins text-[13px]">
            {lightbox.title} · {lightbox.meta}
          </div>
        </div>
      )}
    </div>
  );
}
