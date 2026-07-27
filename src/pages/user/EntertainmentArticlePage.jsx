import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEntertainmentById } from '../../api/entertainment.js';
import { getMediaUrl } from '../../utils/media.js';

export default function EntertainmentArticlePage({ articleId, onNavigate, onGoBack }) {
  const { id: routeId } = useParams();
  const id = articleId || routeId;
  const routerNavigate = useNavigate();

  const navigate = (key, params) => {
    if (onNavigate) {
      onNavigate(key, params);
    } else {
      routerNavigate(key);
    }
  };

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ['entertainment', id],
    queryFn: () => fetchEntertainmentById(id),
    enabled: !!id
  });

  if (isLoading) {
    return <div className="max-w-[800px] mx-auto px-6 py-20 text-center font-poppins text-grey">लेख लोड होत आहे...</div>;
  }

  if (isError || !item) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center font-poppins text-red-500">
        लेख सापडला नाही.
        <br />
        <button onClick={() => navigate('/entertainment')} className="mt-4 text-teal underline">मागे जा</button>
      </div>
    );
  }

  const imageUrl = item.image_type ? getMediaUrl(`/entertainment/${item.id}/image`) : 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=500&fit=crop';

  return (
    <div className="bg-[#fafafa] min-h-screen pb-16 pt-8">
      <div className="max-w-[800px] mx-auto px-6 bg-white rounded-xl shadow-sm border border-line overflow-hidden pb-10">
        
        {/* Header Image */}
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="w-full h-auto max-h-[450px] object-cover block bg-gray-100" 
        />
        
        <div className="px-8 pt-8">
          {/* Metadata */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-poppins text-[11px] font-bold uppercase tracking-wide bg-amber bg-opacity-15 text-amber-600 px-3 py-1 rounded-full">
              {item.type}
            </span>
            <span className="font-poppins text-[12px] text-grey">
              {new Date(item.createdAt).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-tiro text-[32px] md:text-[38px] leading-tight text-ink mb-6">
            {item.title}
          </h1>
          
          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-line">
            <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-poppins font-bold text-[16px]">
              {(item.author ? item.author[0] : 'अ')}
            </div>
            <div>
              <div className="font-poppins text-[14px] font-semibold text-navy">
                {item.author || 'अज्ञात लेखक'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="font-mukta text-[18px] leading-relaxed text-[#3a3a3a] whitespace-pre-wrap">
            {item.content || <span className="italic text-gray-400">या साहित्यासाठी कोणताही मजकूर दिलेला नाही.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
