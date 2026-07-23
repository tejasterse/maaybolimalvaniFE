import { useState } from 'react';
import { ArrowRight, X, Scroll, PenTool, Smile, Heart, Share2 } from 'lucide-react';
import { kavitaList, lekhList, vinodList } from '../../constants/data.jsx';

export default function KavitaLekhPage({ initialSection = 'kavita', onNavigate, onGoBack }) {
  const [activeTab, setActiveTab] = useState(initialSection);
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = [
    { key: 'kavita', label: <><Scroll size={16} className="inline mr-1" /> कविता</>, title: 'मालवणी कविता', desc: 'कोकणातील कवींच्या हृदयस्पर्शी आणि मालवणी बोलीतील सुरेल कविता' },
    { key: 'lekh', label: <><PenTool size={16} className="inline mr-1" /> लेख व विचार</>, title: 'लेख व विचार', desc: 'कोकणचा इतिहास, संस्कृती, निसर्ग आणि खाद्यसंस्कृतीवर वैचारिक लेख' },
    { key: 'vinod', label: <><Smile size={16} className="inline mr-1" /> मालवणी विनोद</>, title: 'मालवणी विनोद', desc: 'अस्सल मालवणी ठसक्याचे खमंग व खळाळून हसवणारे विनोद' },
  ];

  const currentTabInfo = tabs.find((t) => t.key === activeTab) || tabs[0];

  const handleShare = (title) => {
    alert(`"${title}" ची लिंक कॉपी केली आहे! मित्रांसोबत शेअर करा.`);
  };

  return (
    <div>
      {/* Category Banner */}
      <div
        className="py-10"
        style={{ background: 'linear-gradient(120deg, var(--navy) 0%, var(--teal) 100%)' }}
      >
        <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-end flex-wrap gap-4">
          <div>
            <span
              className="flag-tag-90 inline-block font-poppins font-bold text-[11.5px] px-4 py-1.5 mb-3 rounded-full"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}
            >
              मनोरंजन व साहित्य
            </span>
            <h1 className="font-tiro text-[34px] text-white">{currentTabInfo.title}</h1>
            <p className="font-poppins text-[13px] mt-2" style={{ color: '#c9d6e2' }}>
              {currentTabInfo.desc}
            </p>
          </div>
          {/* Sub-nav Tabs */}
          <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-poppins text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-gold text-navy shadow'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8">

        {/* 1. KAVITA LIST */}
        {activeTab === 'kavita' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kavitaList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-[150px] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80';
                      }}
                      className="w-full h-full object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="font-poppins text-[11px] font-bold text-white bg-maroon/90 px-3 py-1 rounded-full flex items-center gap-1">
                        <Scroll size={12} /> {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-poppins text-[11px] font-medium text-grey">
                        {item.date}
                      </span>
                      <span className="font-poppins text-[11.5px] font-semibold text-teal">
                        {item.author}
                      </span>
                    </div>
                    <h3 className="font-tiro text-[22px] text-navy mb-2">{item.title}</h3>
                    <p className="font-mukta text-[14.5px] text-ink leading-relaxed bg-cream p-3.5 rounded-xl border border-line mb-3 italic">
                      "{item.excerpt}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-line">
                  <span className="font-poppins text-[12px] text-grey flex items-center gap-1">
                    <Heart size={14} className="text-red-500" fill="currentColor" /> {item.likes} लाईक्स
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="font-poppins font-semibold text-[12.5px] text-maroon hover:underline"
                  >
                    पूर्ण कविता वाचा <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. LEKH LIST */}
        {activeTab === 'lekh' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lekhList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-[150px] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80';
                      }}
                      className="w-full h-full object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="font-poppins text-[11px] font-bold text-white bg-teal/90 px-3 py-1 rounded-full flex items-center gap-1">
                        <PenTool size={12} /> {item.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-tiro text-[20px] text-navy mb-2 leading-snug">{item.title}</h3>
                    <div className="font-poppins text-[12px] text-grey mb-3">लेखक: {item.author}</div>
                    <p className="font-mukta text-[14.5px] text-ink leading-relaxed mb-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-line">
                  <span className="font-poppins text-[11px] text-grey">{item.date}</span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="font-poppins font-semibold text-[12.5px] text-maroon hover:underline"
                  >
                    संपूर्ण लेख वाचा <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. VINOD LIST */}
        {activeTab === 'vinod' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vinodList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-[140px] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80';
                      }}
                      className="w-full h-full object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="font-poppins text-[11px] font-bold text-navy bg-gold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                        <Smile size={12} /> मालवणी विनोद
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-tiro text-[20px] text-navy mb-3">{item.title}</h3>
                    <div className="font-mukta text-[15.5px] text-ink leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 whitespace-pre-line mb-3 font-medium">
                      {item.joke}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-line">
                  <span className="font-poppins text-[12px] text-grey">लेखक: {item.author}</span>
                  <button
                    onClick={() => handleShare(item.title)}
                    className="font-poppins text-[12px] font-semibold text-teal hover:bg-teal/10 px-3 py-1.5 rounded-lg border border-teal/30"
                  >
                    <Share2 size={14} className="inline mr-1" /> शेअर करा
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full Modal View */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-[650px] w-full max-h-[85vh] overflow-y-auto p-7 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-grey hover:text-navy text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-grey-light"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl p-2 bg-cream rounded-xl text-maroon">
                {activeTab === 'kavita' ? <Scroll size={24} /> : activeTab === 'lekh' ? <PenTool size={24} /> : <Smile size={24} />}
              </span>
              <div>
                <h2 className="font-tiro text-[26px] text-navy leading-tight">{selectedItem.title}</h2>
                <div className="font-poppins text-[12.5px] text-teal font-medium">{selectedItem.author} · {selectedItem.date}</div>
              </div>
            </div>

            <hr className="my-4 border-line" />

            <div className="font-mukta text-[17px] leading-relaxed text-ink whitespace-pre-line bg-cream/60 p-5 rounded-xl border border-line">
              {selectedItem.fullText || selectedItem.content || selectedItem.joke}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="font-poppins text-[13px] font-semibold px-6 py-2.5 rounded-xl bg-maroon text-white hover:bg-maroon-deep transition-colors"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
