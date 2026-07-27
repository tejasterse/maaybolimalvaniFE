import { useState } from 'react';
import { Calendar, CheckCircle, MapPin, Share2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../api/events.js';
import { getMediaUrl } from '../../utils/media.js';

export default function FestivalsPage({ onNavigate, onGoBack }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const { data: eventsList = [], isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  return (
    <div>
      {/* Category Banner */}
      <div
        className="py-10"
        style={{ background: 'linear-gradient(120deg, var(--maroon-deep) 0%, var(--maroon) 100%)' }}
      >
        <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-end flex-wrap gap-4">
          <div>
            <span
              className="flag-tag-90 inline-block font-poppins font-bold text-[11.5px] px-4 py-1.5 mb-3 rounded-full"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}
            >
              संस्कृती व सणोत्सव
            </span>
            <h1 className="font-tiro text-[34px] text-white">सण, उत्सव आणि कार्यक्रम</h1>
            <p className="font-poppins text-[13px] mt-2" style={{ color: '#fbe8c9' }}>
              सिंधुदुर्ग जिल्ह्यातील आगामी आणि संपन्न झालेले प्रमुख सण, जत्रा आणि सांस्कृतिक उत्सव
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`font-poppins text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'upcoming'
                  ? 'bg-gold text-navy shadow-lg font-bold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-1"><Calendar size={14} /> कार्यक्रम</span>
              <span className="bg-navy/20 px-2 py-0.5 rounded-full text-[11px]">{eventsList.length}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12 font-poppins text-grey">माहिती लोड होत आहे...</div>
        ) : isError ? (
          <div className="text-center py-12 font-poppins text-red-500">माहिती लोड करताना त्रुटी आली.</div>
        ) : eventsList.length === 0 ? (
          <div className="text-center py-12 font-poppins text-grey">कोणतेही कार्यक्रम उपलब्ध नाहीत.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-line flex flex-col"
              >
                <img
                  src={item.image_type ? getMediaUrl(`/events/${item.id}/image`) : 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=300&fit=crop'}
                  alt={item.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-tiro text-[20px] font-bold text-ink mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <div className="space-y-2 font-poppins text-[13px] text-grey mb-4">
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <Calendar size={16} />
                      <span>{item.event_date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal font-medium">
                      <MapPin size={16} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
