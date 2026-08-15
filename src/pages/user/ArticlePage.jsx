import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, X, ArrowRight, Camera, Video, Link2, Eye, MapPin, Calendar, UserCheck, Flame, Share2 } from 'lucide-react';
import { fetchPostById, fetchPosts } from '../../api/posts.js';
import { fetchAds } from '../../api/ads.js';
import { getMediaUrl } from '../../utils/media.js';
import AdCarousel from '../../components/shared/AdCarousel.jsx';
import toast from 'react-hot-toast';

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
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

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
  if (isError || !post) return <div className="py-20 text-center font-poppins text-maroon font-semibold">बातमी गावूक नाय.</div>;

  const viewsCount = Number(post.viewer_count ?? post.views ?? 0);

  const mainImageUrl = post.image
    ? getMediaUrl(post.image)
    : post.image_type
      ? getMediaUrl(`/posts/${post.id}/image`)
      : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=1000&h=560&fit=crop';

  const hasVideo = !!(post.video_type || post.video_url || post.hasVideo || post.isVideo || (post.videos && post.videos.length > 0));
  const videoUrl = post.video_url
    ? getMediaUrl(post.video_url)
    : post.video_type
      ? getMediaUrl(`/posts/${post.id}/video`)
      : (post.videos && post.videos.length > 0)
        ? getMediaUrl(post.videos[0].video_url)
        : null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString('mr-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const relatedArticles = allPosts
    .filter(p => p.id !== parseInt(id) && p.categoryName === post.categoryName)
    .slice(0, 4);

  const handleSocialShare = (platform) => {
    const pageUrl = window.location.href;
    const title = post.title || '';
    const reporter = post.reporter_name || post.authorName || 'मायबोली मालवणी';
    const districtInfo = post.districtName ? `स्थान: ${post.districtName}\n` : '';
    const categoryTag = post.categoryName ? `#${post.categoryName.replace(/\s+/g, '')}` : '#बातमी';

    const shareText =
      `*मायबोली मालवणी*
───────────────
*${title}*

${districtInfo}प्रतिनिधी: ${reporter}
तारीख: ${formattedDate}

सविस्तर बातमी वाचण्यासाठी खालील लिंकवर क्लिक करा:
${pageUrl}

#मायबोलीमालवणी ${categoryTag} #कोकणबातम्या`;

    if (platform === 'whatsapp') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
    } else if (platform === 'twitter') {
      const tweetText = `${title}\n\nसविस्तर बातमी वाचण्यासाठी (मायबोली मालवणी):\n${pageUrl}\n\n#मायबोलीमालवणी ${categoryTag}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
    } else if (platform === 'link') {
      const copyText = `${title}\n${pageUrl}`;
      navigator.clipboard.writeText(copyText);
      toast.success('बातमीचे शीर्षक आणि लिंक कॉपी झाले!');
    }
  };

  return (
    <div>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="font-poppins font-medium text-[12.5px] text-grey mb-4 flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigate('/')} className="text-teal hover:underline">होम</button>
          <span>/</span>
          <button onClick={() => navigate('/listing')} className="text-teal hover:underline">{post.categoryName || 'बातमी'}</button>
          {post.districtName && (
            <>
              <span>/</span>
              <span className="text-navy font-semibold">{post.districtName}</span>
            </>
          )}
          <span>/</span>
          <span className="line-clamp-1 max-w-[300px] text-grey">{post.title}</span>
        </div>

        {/* Article Head */}
        <div className="pt-2 pb-6 max-w-[820px]">
          <div className="flex items-center gap-2 flex-wrap mb-3.5">
            {/* Category Tag */}
            <span
              className="font-poppins text-[11px] font-bold text-[#fbe8c9] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm"
              style={{ background: 'var(--maroon)' }}
            >
              {post.categoryName || 'बातमी'}
            </span>

            {/* District / Taluka Tag */}
            {post.districtName && (
              <span className="font-poppins text-[11.5px] font-bold text-maroon-deep bg-amber-50 px-3.5 py-1 rounded-full border border-gold/60 flex items-center gap-1 shadow-sm">
                <MapPin size={13} className="text-teal" /> {post.districtName}
              </span>
            )}

            {/* Breaking News Tag */}
            {Boolean(post.is_breaking) && (
              <span className="font-poppins text-[11px] font-bold text-white bg-red-600 px-3.5 py-1 rounded-full animate-pulse flex items-center gap-1 shadow-sm">
                <Flame size={12} /> ब्रेकिंग न्यूज
              </span>
            )}
          </div>

          <h1 className="font-tiro text-[28px] sm:text-[36px] leading-[1.3] text-ink mb-4 font-semibold">
            {post.title}
          </h1>

          {/* Author / Reporter / Metadata row */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-line/60">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-[14px] text-white flex-shrink-0 shadow-sm"
                style={{ background: 'var(--teal)' }}
              >
                {(post.reporter_name || post.authorName || 'म')[0]}
              </div>
              <div className="font-poppins text-[13px] leading-snug">
                {post.reporter_name ? (
                  <div className="flex items-center gap-1.5 font-semibold text-maroon-deep">
                    <UserCheck size={14} className="text-teal" />
                    <span>प्रतिनिधी: <strong className="text-teal font-bold">{post.reporter_name}</strong></span>
                  </div>
                ) : (
                  <div className="font-semibold text-navy">
                    लेखक: <strong className="text-teal">{post.authorName || 'संपादक'}</strong>
                  </div>
                )}
                <div className="text-[11.5px] text-grey flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formattedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-navy">
                    <Eye size={13} className="text-teal" /> {viewsCount.toLocaleString('en-IN')} वाचक
                  </span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="font-poppins text-[11px] text-grey font-medium hidden sm:inline">शेअर करा:</span>
              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                title="WhatsApp वर शेअर करा"
              >
                <MessageCircle size={18} />
              </button>
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                title="Facebook वर शेअर करा"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-9 h-9 rounded-full bg-black hover:bg-slate-800 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                title="Twitter/X वर शेअर करा"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleSocialShare('link')}
                className="w-9 h-9 rounded-full border border-line bg-gray-50 hover:bg-gray-100 text-grey flex items-center justify-center transition-transform hover:scale-105"
                title="लिंक कॉपी करा"
              >
                <Link2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Toggle Buttons (If Video Available) */}
      {hasVideo && (
        <div className="max-w-[900px] mx-auto px-4 mb-4 flex justify-center">
          <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-full border border-line shadow-inner">
            <button
              onClick={() => setActiveMedia('photo')}
              className={`py-1.5 px-4 rounded-full font-poppins font-semibold text-[12px] transition-all flex items-center gap-1.5 cursor-pointer ${activeMedia === 'photo'
                ? 'bg-teal text-white shadow-sm'
                : 'bg-transparent text-navy hover:bg-white/60'
                }`}
            >
              <Camera size={14} /> फोटो (Photos)
            </button>
            <button
              onClick={() => setActiveMedia('video')}
              className={`py-1.5 px-4 rounded-full font-poppins font-semibold text-[12px] transition-all flex items-center gap-1.5 cursor-pointer ${activeMedia === 'video'
                ? 'bg-maroon text-gold-light shadow-sm'
                : 'bg-transparent text-navy hover:bg-white/60'
                }`}
            >
              <Video size={14} /> व्हिडिओ (Videos)
            </button>
          </div>
        </div>
      )}

      {/* Main Image / Video View */}
      {activeMedia === 'video' && hasVideo ? (
        <video
          src={videoUrl}
          controls
          className="w-full max-w-[900px] h-auto max-h-[500px] object-contain rounded-[12px] mx-auto block mb-3 shadow-md bg-black/5"
        />
      ) : (
        <img
          src={selectedGalleryImage || mainImageUrl}
          alt={post.title}
          className="w-full max-w-[900px] h-auto max-h-[500px] object-contain rounded-[12px] mx-auto block mb-3 shadow-md bg-black/5 transition-all duration-300"
        />
      )}

      {/* Reporter Name display badge below photo */}
      {post.reporter_name && (
        <div className="max-w-[900px] mx-auto px-4 mb-5 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-gold/40 text-maroon-deep font-poppins text-[13px] shadow-sm">
            <span className="font-bold text-teal">प्रतिनिधी / रिपोर्टर:</span>
            <span className="font-semibold text-ink">{post.reporter_name}</span>
          </div>
        </div>
      )}

      {/* Additional Photos Gallery (if post has extra images in posts_images table) */}
      {Array.isArray(post.images) && post.images.length > 0 && (
        <div className="max-w-[900px] mx-auto px-4 mb-6">
          <h3 className="font-poppins text-[12.5px] font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Camera size={14} className="text-teal" /> बातमीचे अधिक फोटो (Extra Photos):
          </h3>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            <img
              src={mainImageUrl}
              alt="Main"
              onClick={() => setSelectedGalleryImage(mainImageUrl)}
              className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all flex-shrink-0 ${(selectedGalleryImage === null || selectedGalleryImage === mainImageUrl)
                ? 'border-teal scale-105 shadow-md'
                : 'border-transparent opacity-70 hover:opacity-100'
                }`}
            />
            {post.images.map((imgObj, idx) => {
              const imgUrl = getMediaUrl(imgObj.image);
              return (
                <img
                  key={imgObj.id || idx}
                  src={imgUrl}
                  alt={`Photo ${idx + 1}`}
                  onClick={() => setSelectedGalleryImage(imgUrl)}
                  className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all flex-shrink-0 ${selectedGalleryImage === imgUrl
                    ? 'border-teal scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Article Body Content Card */}
      <div
        className="article-body-content max-w-[760px] w-full mx-auto mb-6 p-6 sm:p-8 bg-white border border-line/80 border-t-4 border-t-maroon rounded-2xl shadow-sm text-left overflow-hidden break-words box-border"
        style={{ color: '#2b2319' }}
      >
        <div className="w-full max-w-full overflow-hidden break-words" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Reporter Credit Sign-off at bottom of article */}
        {post.reporter_name && (
          <div className="mt-8 pt-4 border-t border-line/70 flex items-center justify-between gap-4 font-poppins text-[13.5px] bg-amber-50/50 px-4 py-3 rounded-lg border border-gold/40 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-teal">विशेष प्रतिनिधी / रिपोर्टर:</span>
              <span className="font-semibold text-maroon-deep">{post.reporter_name}</span>
            </div>
            {post.districtName && (
              <span className="text-[12px] text-slate-600 font-medium">स्थान: {post.districtName}</span>
            )}
          </div>
        )}
      </div>

      {/* News Share Bar Box */}
      <div className="max-w-[760px] mx-auto mb-10 p-5 sm:p-6 bg-white border border-line/80 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
              <Share2 size={18} className="text-teal" />
            </div>
            <h4 className="font-tiro text-[19px] text-maroon-deep font-bold leading-tight">
              ही बातमी आपल्या मित्रांना शेअर करा!
            </h4>
          </div>

          <p className="font-poppins text-[13px] text-slate-600 font-medium leading-relaxed pl-12">
            कोकणातील ताज्या घडामोडींशी जोडलेले रहा — एका क्लिकवर व्हॉट्सॲप आणि सोशल मीडियावर पाठवा.
          </p>

          <div className="flex items-center gap-2.5 flex-wrap pt-3 border-t border-line/60 mt-1">
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-poppins text-[13px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer"
            >
              <MessageCircle size={17} /> WhatsApp
            </button>
            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-poppins text-[13px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073 z" />
              </svg> Facebook
            </button>
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white font-poppins text-[13px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117 z" />
              </svg> Twitter
            </button>
            <button
              onClick={() => handleSocialShare('link')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-line bg-white hover:bg-gray-50 text-navy font-poppins text-[13px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer"
            >
              <Link2 size={17} /> लिंक कॉपी
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="bg-white pt-10 pb-12 mt-4 border-t border-line/50">
          <div className="max-w-[1180px] mx-auto px-6">
            <h2 className="font-tiro text-[24px] text-maroon-deep mb-5 font-semibold">संबंधित बातम्या</h2>
            <div className="related-grid grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArticles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => { navigate(`/article/${r.id}`); window.scrollTo(0, 0); }}
                  className="rounded-[10px] overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5 border border-line/40 shadow-sm bg-white"
                >
                  <img
                    src={r.image ? getMediaUrl(r.image) : r.image_type ? getMediaUrl(`/posts/${r.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'}
                    alt={r.title}
                    className="w-full h-[120px] object-cover block"
                  />
                  <div className="p-3">
                    <h3 className="font-tiro text-[14.5px] leading-snug text-ink line-clamp-2">{r.title}</h3>
                    <div className="font-poppins text-[10px] text-grey mt-2 flex items-center justify-between">
                      <span>{r.districtName || 'सिंधुदुर्ग'}</span>
                      <span>{new Date(r.createdAt).toLocaleDateString('mr-IN')}</span>
                    </div>
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

