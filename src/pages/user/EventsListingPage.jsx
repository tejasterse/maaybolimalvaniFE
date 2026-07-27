import { useNavigate } from 'react-router-dom';
import { Calendar, Tent, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../api/events.js';
import { getMediaUrl } from '../../utils/media.js';

export default function EventsListingPage({ onNavigate }) {
  const routerNavigate = useNavigate();
  const navigate = (key, params) => {
    if (onNavigate) {
      onNavigate(key, params);
    } else {
      routerNavigate(key);
    }
  };

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
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
          <h1 className="font-tiro text-[28px] text-maroon-deep">गावचे सण, उत्सव आणि कार्यक्रम</h1>
          <p className="font-poppins text-[14px] text-grey mt-2">
            कोकणातील विविध गावांमध्ये होणारे सण, उत्सव आणि सांस्कृतिक कार्यक्रमांची माहिती
          </p>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full border-l-4"
              style={{ borderColor: 'var(--amber)', borderTop: '1px solid var(--line)', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
            >
              <img 
                src={item.image_type ? getMediaUrl(`/events/${item.id}/image`) : 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=300&fit=crop'} 
                alt={item.title} 
                className="w-full h-[160px] object-cover block flex-shrink-0" 
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-tiro text-[18px] leading-snug text-ink mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <div className="font-poppins text-[13px] text-grey mt-auto space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500"><Calendar size={18} /></span>
                    <span className="font-medium text-[#4a4a4a]">{item.event_date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal"><MapPin size={18} /></span>
                    <span className="text-[#4a4a4a] truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-1 md:col-span-4 text-center py-12 bg-white rounded-xl border border-line shadow-sm">
              <div className="flex justify-center mb-3"><Tent size={32} className="text-grey" /></div>
              <div className="font-tiro text-[18px] text-ink font-semibold">सध्या कोणत्याही कार्यक्रमांची माहिती उपलब्ध नाही.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
