import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEntertainment } from '../../api/entertainment.js';
import { fetchAds } from '../../api/ads.js';
import { getMediaUrl } from '../../utils/media.js';
import AdCarousel from '../../components/shared/AdCarousel.jsx';

export default function EntertainmentListingPage({ onNavigate, onGoBack }) {
  const routerNavigate = useNavigate();
  const navigate = (key, params) => {
    if (onNavigate) {
      onNavigate(key, params);
    } else {
      routerNavigate(`/entertainment/${params}`);
    }
  };

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['entertainment'],
    queryFn: fetchEntertainment
  });

  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });

  if (isLoading) {
    return <div className="max-w-[1180px] mx-auto px-6 py-12 text-center font-poppins text-grey">माहिती लोड होत आहे...</div>;
  }

  if (isError) {
    return <div className="max-w-[1180px] mx-auto px-6 py-12 text-center font-poppins text-red-500">माहिती लोड करताना त्रुटी आली.</div>;
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm mb-8 py-6 border-b border-line">
        <div className="max-w-[1180px] mx-auto px-6">
          <h1 className="font-tiro text-[28px] text-maroon-deep">मनोरंजन व साहित्य</h1>
          <p className="font-poppins text-[14px] text-grey mt-2">
            मालवणी साहित्य, कविता, लेख आणि विनोदांचा आनंद घ्या
          </p>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('entertainment-article', item.id)}
              className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1 flex flex-col h-full"
              style={{ border: '1px solid var(--line)' }}
            >
              <img 
                src={item.image_type ? getMediaUrl(`/entertainment/${item.id}/image`) : 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop'} 
                alt={item.title} 
                className="w-full h-[180px] object-cover block flex-shrink-0" 
              />
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block font-poppins text-[10px] text-amber font-bold uppercase tracking-wide bg-amber bg-opacity-10 px-2.5 py-1 rounded-full self-start mb-2">
                  {item.type}
                </span>
                <h3 className="font-tiro text-[18px] leading-snug text-ink mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="font-poppins text-[12px] text-grey mt-auto">
                  लेखक: <span className="font-medium text-navy">{item.author || 'अज्ञात'}</span>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-1 md:col-span-4 text-center py-12 bg-white rounded-xl border border-line shadow-sm">
              <div className="flex justify-center mb-3"><FileText size={32} className="text-grey" /></div>
              <div className="font-tiro text-[18px] text-ink font-semibold">सध्या कोणतेही साहित्य उपलब्ध नाही.</div>
            </div>
          )}
        </div>

        {/* Advertisement Carousel */}
        <AdCarousel ads={ads} className="mt-10" />
      </div>
    </div>
  );
}
