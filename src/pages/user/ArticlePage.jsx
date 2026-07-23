import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, X, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, fetchPosts } from '../../api/posts.js';
import { fetchAds } from '../../api/ads.js';


export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeMedia, setActiveMedia] = useState('photo'); // 'photo' | 'video'
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [lightboxAd, setLightboxAd] = useState(null);

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id)
  });

  const { data: postsData = {} } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
  const allPosts = postsData.posts || [];

  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });

  // Cycle through ads every 5 seconds
  useEffect(() => {
    if (ads.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [ads.length]);

  if (isLoading) return <div className="py-20 text-center font-poppins text-grey">बातमी लोड होत आहे...</div>;
  if (isError || !post) return <div className="py-20 text-center font-poppins text-maroon">बातमी सापडली नाही.</div>;

  const data = {
    tag: post.categoryName || 'बातमी',
    title: post.title,
    author: post.authorName || 'संपादक',
    authorInitial: post.authorName ? post.authorName[0] : 'स',
    time: `${new Date(post.createdAt).toLocaleDateString('mr-IN')}`,
    img: (post.image || post.image_type) ? `https://maayboli-backend.yuktiyantra.com/api/posts/${post.id}/image` : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=1000&h=560&fit=crop',
    hasVideo: !!post.video_type,
    videoUrl: post.video_type ? `https://maayboli-backend.yuktiyantra.com/api/posts/${post.id}/video` : null,
    imgCaption: '',
    quote: '',
    tags: [`#${post.categoryName || 'बातमी'}`, `#${post.districtName || 'सिंधुदुर्ग'}`]
  };

  const relatedArticles = allPosts
    .filter(p => p.id !== parseInt(id) && p.categoryName === post.categoryName)
    .slice(0, 4);

  const handleSocialShare = (platform) => {
    if (platform === 'link') {
      navigator.clipboard.writeText(window.location.href);
      alert('लिंक कॉपी केली!');
    } else {
      alert(`ही बातमी ${platform} वर शेअर केल्याबद्दल धन्यवाद!`);
    }
  };

  const handleAdClick = (e, ad) => {
    if (!ad?.link_url) {
      e.preventDefault();
      setLightboxAd(ad);
    }
  };

  return (
    <div>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="font-poppins font-medium text-[12.5px] text-grey mb-4">
          <button onClick={() => navigate('/')} className="text-teal">होम</button> /{' '}
          <button onClick={() => navigate('/listing')} className="text-teal">{data.tag}</button> / <span className="line-clamp-1 inline-block align-bottom">{data.title}</span>
        </div>

        {/* Article Head */}
        <div className="pt-4 pb-6 max-w-[760px]">
          <span
            className="flag-tag-90 inline-block font-poppins text-[11px] font-bold text-[#fbe8c9] px-4 py-1.5 mb-4"
            style={{ background: 'var(--maroon)' }}
          >
            {data.tag}
          </span>
          <h1 className="font-tiro text-[34px] leading-[1.35] text-ink mb-3.5">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-poppins font-bold text-[13px] text-white flex-shrink-0"
                style={{ background: 'var(--teal)' }}
              >
                {data.authorInitial}
              </div>
              <div className="font-poppins text-[13px] leading-snug">
                {data.author}
                <div className="text-[11px] text-grey">{data.time}</div>
              </div>
            </div>
            <div className="flex gap-1.5 ml-auto">
              {['whatsapp', 'facebook', 'twitter'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleSocialShare(platform)}
                  className="w-8 h-8 rounded-full border border-line flex items-center justify-center transition-colors hover:bg-gray-50 text-[14px]"
                >
                  {platform === 'whatsapp' ? <MessageCircle size={16} /> : platform === 'facebook' ? 'f' : '𝕏'}
                </button>
              ))}
              <button
                onClick={() => handleSocialShare('link')}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center transition-colors hover:bg-gray-50 text-[14px] text-grey"
                title="लिंक कॉपी करा"
              >
                🔗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Toggle */}
      {data.hasVideo && (
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveMedia('photo')}
            className={`font-poppins font-medium text-[13px] px-6 py-2 rounded-full transition-colors ${activeMedia === 'photo' ? 'bg-[#2e7d4f] text-white' : 'bg-white text-grey border border-line hover:bg-gray-50'}`}
          >
            📷 फोटो
          </button>
          <button
            onClick={() => setActiveMedia('video')}
            className={`font-poppins font-medium text-[13px] px-6 py-2 rounded-full transition-colors ${activeMedia === 'video' ? 'bg-[#2e7d4f] text-white' : 'bg-white text-grey border border-line hover:bg-gray-50'}`}
          >
            🎥 व्हिडिओ
          </button>
        </div>
      )}

      {/* Hero Image / Video */}
      {activeMedia === 'video' && data.hasVideo ? (
        <video
          src={data.videoUrl}
          controls
          className="w-full max-w-[900px] h-auto max-h-[500px] object-contain rounded-[10px] mx-auto block mb-2 shadow-sm bg-black/5"
        />
      ) : (
        <img
          src={data.img}
          alt={data.title}
          className="w-full max-w-[900px] h-auto max-h-[500px] object-contain rounded-[10px] mx-auto block mb-2 shadow-sm bg-black/5"
        />
      )}
      
      <div className="max-w-[900px] mx-auto mb-8 font-poppins text-[11.5px] text-grey text-center">
        {data.imgCaption}
      </div>

      {/* Media Column (Only 2 options: Photos & Videos) — Placed at the top */}
      <ArticleMediaSection onNavigate={onNavigate} />

      {/* Article Body */}
      <div
        className="max-w-[760px] mx-auto mb-10 font-mukta text-[18px] leading-[2] px-6"
        style={{ color: '#3a2e20' }}
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {data.quote && (
          <div
            className="border-l-4 border-gold pl-5 my-7 font-tiro text-[23px] italic text-maroon-deep leading-[1.5]"
          >
            {data.quote}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="max-w-[760px] mx-auto mb-10 flex gap-2.5 flex-wrap px-6">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="font-poppins text-[12.5px] text-teal bg-white border-[1.5px] border-line px-4 py-[7px] rounded-[18px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <div className="bg-white pt-10 pb-12 mt-2">
          <div className="max-w-[1180px] mx-auto px-6">
            <h2 className="font-tiro text-[24px] text-maroon-deep mb-5">संबंधित बातम्या</h2>
            <div className="related-grid grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArticles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => { navigate(`/article/${r.id}`); window.scrollTo(0,0); }}
                  className="rounded-[10px] overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5"
                  style={{ background: 'var(--cream)' }}
                >
                  <img src={(r.image || r.image_type) ? `https://maayboli-backend.yuktiyantra.com/api/posts/${r.id}/image` : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'} alt={r.title} className="w-full h-[110px] object-cover block" />
                  <div className="p-3">
                    <h3 className="font-tiro text-[14.5px] leading-snug text-ink line-clamp-2">{r.title}</h3>
                    <div className="font-poppins text-[10px] text-grey mt-2">{r.districtName || 'सिंधुदुर्ग'} · {new Date(r.createdAt).toLocaleDateString('mr-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ad Section at the bottom */}
      {ads.length > 0 && (
        <div className="max-w-[1180px] mx-auto px-6 py-8 flex justify-center">
          <div className="bg-white border-2 border-line rounded-lg w-[900px] max-w-full overflow-hidden shadow-md flex items-center justify-center bg-gray-50 transition-all duration-500">
            <a 
              href={ads[currentAdIndex]?.link_url || '#'} 
              target={ads[currentAdIndex]?.link_url ? "_blank" : "_self"} 
              rel="noopener noreferrer" 
              className="w-full flex justify-center"
              onClick={(e) => handleAdClick(e, ads[currentAdIndex])}
            >
              <img src={`https://maayboli-backend.yuktiyantra.com/api/banners/${ads[currentAdIndex]?.id}/image`} alt="Advertisement" className="max-w-full h-auto object-contain max-h-[250px]" />
            </a>
          </div>
        </div>
      )}

      {/* Lightbox for Ad */}
      {lightboxAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(14,42,71,.92)' }}
          onClick={() => setLightboxAd(null)}
        >
          <span
            className="absolute top-6 right-8 text-white text-[26px] cursor-pointer font-poppins"
            onClick={() => setLightboxAd(null)}
          >
            <X size={24} />
          </span>
          <img
            src={`https://maayboli-backend.yuktiyantra.com/api/banners/${lightboxAd.id}/image`}
            alt="Advertisement"
            className="max-w-[800px] max-h-[80vh] rounded-lg"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}
          />
        </div>
      )}
    </div>
  );
}

// Media Column Sub-component: ONLY 2 Options (Photos & Videos)
function ArticleMediaSection({ onNavigate }) {
  return (
    <div className="max-w-[760px] mx-auto mb-8 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Photos Option */}
        <div
          onClick={() => onNavigate && onNavigate('gallery', { tab: 'फोटो' })}
          className="bg-white rounded-2xl p-5 shadow-sm border border-line cursor-pointer flex items-center justify-between transition-all hover:shadow-md hover:border-teal group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📷
            </div>
            <div>
              <div className="font-tiro text-[20px] text-navy font-bold">फोटो (Photos)</div>
              <div className="font-poppins text-[12px] text-grey">बातमीचे फोटो दालन उघडा</div>
            </div>
          </div>
          <span className="font-poppins text-lg text-teal group-hover:translate-x-1 transition-transform"><ArrowRight size={18} /></span>
        </div>

        {/* 2. Videos Option */}
        <div
          onClick={() => onNavigate && onNavigate('gallery', { tab: 'व्हिडिओ' })}
          className="bg-white rounded-2xl p-5 shadow-sm border border-line cursor-pointer flex items-center justify-between transition-all hover:shadow-md hover:border-maroon group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-maroon/10 text-maroon flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🎥
            </div>
            <div>
              <div className="font-tiro text-[20px] text-navy font-bold">व्हिडिओ (Videos)</div>
              <div className="font-poppins text-[12px] text-grey">बातमीचे व्हिडिओ उघडा</div>
            </div>
          </div>
          <span className="font-poppins text-lg text-maroon group-hover:translate-x-1 transition-transform"><ArrowRight size={18} /></span>
        </div>
      </div>
    </div>
  );
}

