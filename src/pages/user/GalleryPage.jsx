import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '../../api/gallery.js';

export default function GalleryPage({ initialTab = 'सर्व', onNavigate, onGoBack }) {
  const [lightbox, setLightbox] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data: dbGallery = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery
  });

  const openLB = (item) => setLightbox(item);
  const closeLB = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('lb-close')) {
      setLightbox(null);
    }
  };

  const filteredItems = dbGallery.filter((item) => {
    if (activeTab === 'सर्व') return true;
    if (activeTab === 'फोटो') return !item.is_video;
    if (activeTab === 'व्हिडिओ') return item.is_video;
    return true;
  });

  if (isLoading) {
    return <div className="max-w-[1180px] mx-auto px-6 py-12 text-center font-poppins text-grey">माहिती लोड होत आहे...</div>;
  }

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

        {/* Masonry Grid */}
        <div className="masonry-grid pb-12 mt-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="masonry-item rounded-[10px] overflow-hidden bg-white shadow-sm relative cursor-pointer"
              onClick={() => openLB(item)}
            >
              <div className="relative">
                {item.is_video === 1 ? (
                  <video src={`http://localhost:5000/api/gallery/${item.id}/media`} className="w-full block" muted />
                ) : (
                  <img src={`http://localhost:5000/api/gallery/${item.id}/media`} alt={item.title} className="w-full block" />
                )}
                {item.is_video === 1 && (
                  <div
                    className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full flex items-center justify-center text-[12px] text-white"
                    style={{ background: 'rgba(14,42,71,.85)' }}
                  >
                    ▶
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <div className="font-poppins text-[11.5px] font-semibold text-ink">{item.title}</div>
                {item.meta && <div className="font-poppins text-[10px] text-grey mt-0.5">{item.meta}</div>}
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-grey font-poppins text-sm w-full">सध्या कोणतीही माहिती उपलब्ध नाही.</div>
          )}
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
          {lightbox.is_video === 1 ? (
            <video
              src={`http://localhost:5000/api/gallery/${lightbox.id}/media`}
              controls
              autoPlay
              className="max-w-[800px] max-h-[80vh] rounded-lg"
              style={{ boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}
            />
          ) : (
            <img
              src={`http://localhost:5000/api/gallery/${lightbox.id}/media`}
              alt={lightbox.title}
              className="max-w-[800px] max-h-[80vh] rounded-lg"
              style={{ boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}
            />
          )}
          <div className="absolute bottom-7 left-0 right-0 text-center text-white font-poppins text-[14px]">
            {lightbox.title} {lightbox.meta && <span className="text-gray-300 ml-2">· {lightbox.meta}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
