import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Eye, Calendar, MapPin, Video, ArrowLeft, X } from 'lucide-react';
import { fetchPosts } from '../../api/posts.js';
import { getMediaUrl } from '../../utils/media.js';
import SEOHead from '../../components/shared/SEOHead.jsx';
import { generateVideoObjectSchema } from '../../utils/seo.js';

// Extract YouTube Video ID from any YouTube URL format
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideosPage({ onNavigate, onGoBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { data: postsData = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Filter posts that have videos or YouTube URLs
  const videoPosts = postsData.filter((post) => {
    const ytId = getYouTubeId(post.video_url);
    const hasVideoField = !!(post.video_url || post.video_type || post.hasVideo || (post.videos && post.videos.length > 0));
    return ytId || hasVideoField;
  });

  const videoSchemas = videoPosts.slice(0, 5).map(post => {
    const ytId = getYouTubeId(post.video_url);
    const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
    return generateVideoObjectSchema(post.title, post.video_url || '', thumb, post.createdAt);
  }).filter(Boolean);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 font-mukta">
      <SEOHead
        title="मालवणी व्हिडिओ बातम्या | Konkan Video News | मायबोली मालवणी"
        description="सिंधुदुर्ग आणि कोकणातील सर्व महत्त्वाच्या ताज्या व्हिडिओ बातम्या, ग्राउंड रिपोर्ट व मुलाखती पहा."
        canonicalUrl="/videos"
        jsonLd={videoSchemas}
      />
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="p-2 rounded-xl bg-white border border-line hover:bg-amber-50 text-navy transition-colors shadow-sm"
              title="मागे जा"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <Video size={26} className="text-red-600" />
              <h1 className="font-tiro text-[26px] sm:text-[32px] font-bold text-navy leading-none">
                युट्यूब व्हिडिओ चॅनल (Video News)
              </h1>
            </div>
            <p className="font-poppins text-[12.5px] text-grey mt-1">
              मायबोली मालवणीचे सर्व ताज्या बातम्या व विशेष व्हिडिओ पहा
            </p>
          </div>
        </div>
        <div className="hidden sm:block font-poppins text-[12px] bg-red-50 text-red-700 px-3.5 py-1.5 rounded-full border border-red-200 font-semibold">
          एकूण व्हिडिओ: {videoPosts.length}
        </div>
      </div>

      {/* Video Content Grid */}
      {isLoading ? (
        <div className="py-20 text-center font-poppins text-grey">व्हिडिओ लोड होत आहेत...</div>
      ) : videoPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-line shadow-sm max-w-[600px] mx-auto my-8">
          <Video size={48} className="text-gray-300 mx-auto mb-3" />
          <h3 className="font-tiro text-[20px] font-bold text-navy mb-1">कोणतेही व्हिडिओ सापडले नाहीत</h3>
          <p className="font-poppins text-[13px] text-grey">
            अ‍ॅडमिन पॅनलमध्ये बातमी अपलोड करताना युट्यूब व्हिडिओ लिंक जोडल्यास ते येथे आपोआप दिसतील.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoPosts.map((post) => {
            const ytId = getYouTubeId(post.video_url);
            const thumbnailUrl = ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : post.image
              ? getMediaUrl(post.image)
              : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=800&h=450&fit=crop';

            const formattedDate = new Date(post.createdAt || Date.now()).toLocaleDateString('mr-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-line/80 shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                {/* Thumbnail with Play Overlay */}
                <div
                  className="relative aspect-[16/9] bg-black cursor-pointer overflow-hidden"
                  onClick={() => setSelectedVideo({ ...post, ytId })}
                >
                  <img
                    src={thumbnailUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={26} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  {post.categoryName && (
                    <span className="absolute top-3 left-3 bg-navy/90 text-gold-light font-poppins text-[11px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                      {post.categoryName}
                    </span>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    onClick={() => setSelectedVideo({ ...post, ytId })}
                    className="font-tiro text-[17px] font-bold text-navy line-clamp-2 hover:text-teal cursor-pointer mb-2 leading-snug"
                  >
                    {post.title}
                  </h3>

                  <div className="mt-auto pt-3 border-t border-line/50 flex items-center justify-between text-[12px] text-grey font-poppins">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {formattedDate}
                    </span>
                    {post.districtName && (
                      <span className="flex items-center gap-1 font-semibold text-navy">
                        <MapPin size={13} className="text-teal" /> {post.districtName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative bg-navy text-white rounded-2xl max-w-[850px] w-full overflow-hidden shadow-2xl border border-gold/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-navy-light flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 pr-4">
                <Video size={22} className="text-red-500 flex-shrink-0" />
                <h3 className="font-tiro text-[17px] font-bold text-gold-light line-clamp-1">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Embed Player */}
            <div className="relative aspect-[16/9] bg-black">
              {selectedVideo.ytId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.ytId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : selectedVideo.video_url ? (
                <video
                  src={getMediaUrl(selectedVideo.video_url)}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-grey">
                  व्हिडिओ प्ले होत नाही.
                </div>
              )}
            </div>

            {/* Modal Footer / Navigation to Full Article */}
            <div className="p-4 bg-navy flex items-center justify-between gap-4 flex-wrap">
              <div className="font-mukta text-[14px] text-gray-300">
                प्रतिनिधी: <span className="text-gold-light font-bold">{selectedVideo.reporter_name || 'मायबोली मालवणी'}</span>
              </div>
              <button
                onClick={() => {
                  const id = selectedVideo.id;
                  setSelectedVideo(null);
                  if (onNavigate) onNavigate('article', id);
                }}
                className="font-poppins text-[12.5px] font-semibold px-4 py-1.5 rounded-lg bg-teal text-white hover:bg-teal-light transition-colors"
              >
                सविस्तर बातमी वाचा →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
