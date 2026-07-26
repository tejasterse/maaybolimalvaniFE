import { useState } from 'react';
import { Calendar, CheckCircle, MapPin, Share2, Camera, Download, Sparkles } from 'lucide-react';
import { upcomingFestivals, pastFestivals } from '../../constants/data.jsx';

export default function FestivalsPage({ onNavigate, onGoBack }) {
  const [activeTab, setActiveTab] = useState('upcoming');

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
              <span className="flex items-center gap-1"><Calendar size={14} /> आगामी कार्यक्रम</span>
              <span className="bg-navy/20 px-2 py-0.5 rounded-full text-[11px]">{upcomingFestivals.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`font-poppins text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'past'
                  ? 'bg-gold text-navy shadow-lg font-bold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-1"><CheckCircle size={14} /> संपन्न झालेले</span>
              <span className="bg-navy/20 px-2 py-0.5 rounded-full text-[11px]">{pastFestivals.length}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8">

        {/* 1. UPCOMING FESTIVALS */}
        {activeTab === 'upcoming' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-amber animate-ping"></span>
              <h2 className="font-tiro text-[24px] text-navy">नजीकच्या काळातील उत्सव व कार्यक्रम</h2>
            </div>
            {upcomingFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingFestivals.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow relative"
                  >
                    <div>
                      <div className="relative h-[160px] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80';
                          }}
                          className="w-full h-full object-cover bg-gray-100"
                        />
                        <div className="absolute top-2 right-2 bg-amber/95 text-navy font-poppins font-bold text-[11px] px-3 py-1 rounded-lg shadow border border-amber-300">
                          {item.daysLeft}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-poppins font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                          <Calendar size={12} className="text-amber" /> <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-tiro text-[21px] text-navy mb-2 leading-snug">{item.title}</h3>
                        <div className="font-poppins text-[12px] text-grey mb-3 flex items-center gap-1.5">
                          <MapPin size={13} className="text-grey" /> {item.location}
                        </div>
                        <p className="font-mukta text-[14px] text-ink leading-relaxed bg-cream p-3.5 rounded-xl border border-line mb-3">
                          {item.description}
                        </p>
                        <div className="space-y-1 mb-3">
                          <div className="font-poppins text-[11.5px] font-bold text-navy uppercase tracking-wider mb-1">प्रमुख आकर्षणे:</div>
                          {item.highlights.map((hl, idx) => (
                            <div key={idx} className="font-mukta text-[13.5px] text-grey flex items-center gap-2">
                              <Sparkles size={12} className="text-amber flex-shrink-0" /> <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-line flex items-center justify-between text-[12px] font-poppins text-grey">
                      <span>आयोजक: {item.organizer}</span>
                      <button
                        onClick={() => alert(`"${item.title}" कार्यक्रमाची माहिती शेअर केली!`)}
                        className="font-poppins text-[12px] font-semibold text-teal hover:underline flex items-center gap-1"
                      >
                        शेअर करा <Share2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-line shadow-sm p-8">
                <Calendar size={40} className="mx-auto text-grey/40 mb-3" />
                <p className="font-mukta text-[18px] text-navy font-semibold">कोणताही आगामी उत्सव किंवा कार्यक्रम उपलब्ध नाही</p>
                <p className="font-poppins text-[13px] text-grey mt-1">नवीन कार्यक्रम लवकरच अपडेट केले जातील.</p>
              </div>
            )}
          </div>
        )}

        {/* 2. PAST FESTIVALS */}
        {activeTab === 'past' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-teal"></span>
              <h2 className="font-tiro text-[24px] text-navy">पार पडलेले उत्सव आणि झलक (फोटो/व्हिडिओ)</h2>
            </div>
            {pastFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastFestivals.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="relative h-[160px] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80';
                          }}
                          className="w-full h-full object-cover bg-gray-100"
                        />
                        <div className="absolute top-2 right-2 bg-teal/90 text-white font-poppins font-bold text-[11px] px-3 py-1 rounded-lg shadow flex items-center gap-1">
                          <Camera size={12} /> {item.photosCount}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-poppins font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                          <Calendar size={12} className="text-teal" /> <span>{item.heldDate}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-tiro text-[21px] text-navy mb-2 leading-snug">{item.title}</h3>
                        <div className="font-poppins text-[12px] text-grey mb-3 flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </div>
                        <p className="font-mukta text-[14px] text-ink leading-relaxed bg-cream p-3.5 rounded-xl border border-line mb-3">
                          {item.summary}
                        </p>
                        <div className="space-y-1 mb-3">
                          <div className="font-poppins text-[11.5px] font-bold text-navy uppercase tracking-wider mb-1">विशेष झलक:</div>
                          {item.highlights.map((hl, idx) => (
                            <div key={idx} className="font-mukta text-[13.5px] text-grey flex items-center gap-2">
                              <CheckCircle size={12} className="text-teal flex-shrink-0" /> <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-line text-right">
                      <button
                        onClick={() => alert(`"${item.title}" चे फोटो डाऊनलोड झाले!`)}
                        className="font-poppins text-[12px] font-semibold text-teal hover:underline inline-flex items-center gap-1"
                      >
                        फोटो पाहा व डाऊनलोड करा <Download size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-line shadow-sm p-8">
                <Camera size={40} className="mx-auto text-grey/40 mb-3" />
                <p className="font-mukta text-[18px] text-navy font-semibold">कोणताही पार पडलेला कार्यक्रम उपलब्ध नाही</p>
                <p className="font-poppins text-[13px] text-grey mt-1">मागील कार्यक्रमांची माहिती लवकरच जोडली जाईल.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
