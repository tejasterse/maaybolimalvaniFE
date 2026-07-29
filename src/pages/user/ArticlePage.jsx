import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, X, ArrowRight, Camera, Video, Link2, Eye } from 'lucide-react';
import { fetchPostById, fetchPosts } from '../../api/posts.js';
import { fetchAds } from '../../api/ads.js';
import { getMediaUrl } from '../../utils/media.js';
import AdCarousel from '../../components/shared/AdCarousel.jsx';


export default function ArticlePage({ articleData, onNavigate, onGoBack }) {
  const { id: routeId } = useParams();
  const id = articleData || routeId;
  const routerNavigate = useNavigate();

  const navigate = (path) => {
    if (onNavigate) {
      if (path === '/') {
        onNavigate('home');
      } else if (path.startsWith('/article/')) {
        const targetId = path.split('/').pop();
        onNavigate('article', targetId);
      } else {
        onNavigate('home');
      }
    } else {
      routerNavigate(path);
    }
  };
  const [activeMedia, setActiveMedia] = useState('photo'); // 'photo' | 'video'

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

  if (isLoading) return <div className="py-20 text-center font-poppins text-grey">बातमी लोड होतहा...</div>;
  if (isError || !post) return <div className="py-20 text-center font-poppins text-maroon">बातमी गावूक नाय.</div>;

  const viewsCount = post.views || Math.floor(250 + (post.id * 317) % 2400);

  const data = {
    tag: post.categoryName || 'बातमी',
    title: post.title,
    author: post.authorName || 'संपादक',
    authorInitial: post.authorName ? post.authorName[0] : 'स',
    time: `${new Date(post.createdAt).toLocaleDateString('mr-IN')}`,
    img: post.image ? getMediaUrl(post.image) : post.image_type ? getMediaUrl(`/posts/${post.id}/image`) : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=1000&h=560&fit=crop',
    hasVideo: !!(post.video_type || post.video_url || post.hasVideo || post.isVideo),
    videoUrl: post.video_type ? getMediaUrl(`/posts/${post.id}/video`) : post.video_url || null,
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
      alert('लिंक कॉपी जाली!');
    } else {
      alert(`ही बातमी ${platform} चेर शेअर केल्याबद्दल धन्यवाद!`);
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
                <div className="text-[11px] text-grey flex items-center gap-2">
                  <span>{data.time}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-navy">
                    <Eye size={12} className="text-teal" /> {viewsCount} वाचक
                  </span>
                </div>
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
                <Link2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Media Toggle Buttons */}
      <div className="max-w-[900px] mx-auto px-4 mb-4 flex justify-center">
        <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-full border border-line shadow-inner">
          <button
            onClick={() => setActiveMedia('photo')}
            className={`py-1.5 px-4 rounded-full font-poppins font-semibold text-[12px] transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMedia === 'photo'
                ? 'bg-teal text-white shadow-sm'
                : 'bg-transparent text-navy hover:bg-white/60'
            }`}
          >
            <Camera size={14} /> फोटो (Photos)
          </button>
          <button
            onClick={() => {
              if (data.hasVideo) {
                setActiveMedia('video');
              } else {
                if (onNavigate) onNavigate('gallery', { tab: 'व्हिडिओ' });
                else navigate('/gallery');
              }
            }}
            className={`py-1.5 px-4 rounded-full font-poppins font-semibold text-[12px] transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMedia === 'video'
                ? 'bg-maroon text-gold-light shadow-sm'
                : 'bg-transparent text-navy hover:bg-white/60'
            }`}
          >
            <Video size={14} /> व्हिडिओ (Videos)
          </button>
        </div>
      </div>

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
                  <img src={r.image ? getMediaUrl(r.image) : r.image_type ? getMediaUrl(`/posts/${r.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'} alt={r.title} className="w-full h-[110px] object-cover block" />
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
        <div className="max-w-[1180px] mx-auto px-6 py-6">
          <AdCarousel ads={ads} className="my-4" />
        </div>
      )}
    </div>
  );
}

