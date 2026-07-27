import { useState } from 'react';
import { Scroll, PenTool, Smile, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEntertainment } from '../../api/entertainment.js';
import { getMediaUrl } from '../../utils/media.js';

export default function KavitaLekhPage({ initialSection = 'kavita', onNavigate, onGoBack }) {
  const [activeTab, setActiveTab] = useState(initialSection);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['entertainment'],
    queryFn: fetchEntertainment
  });

  const tabs = [
    { key: 'kavita', label: <><Scroll size={16} className="inline mr-1" /> कविता</>, title: 'मालवणी कविता', desc: 'कोकणातील कवींच्या हृदयस्पर्शी आणि मालवणी बोलीतील सुरेल कविता' },
    { key: 'lekh', label: <><PenTool size={16} className="inline mr-1" /> लेख व विचार</>, title: 'लेख व विचार', desc: 'कोकणचा इतिहास, संस्कृती, निसर्ग आणि खाद्यसंस्कृतीवर वैचारिक लेख' },
    { key: 'vinod', label: <><Smile size={16} className="inline mr-1" /> मालवणी विनोद</>, title: 'मालवणी विनोद', desc: 'अस्सल मालवणी ठसक्याचे खमंग व खळाळून हसवणारे विनोद' },
  ];

  const currentTabInfo = tabs.find((t) => t.key === activeTab) || tabs[0];

  // Filter items by active tab type if type field is populated
  const filteredItems = items.filter(item => {
    if (!item.type) return true;
    const itemType = item.type.toLowerCase();
    if (activeTab === 'kavita') return itemType.includes('kavita') || itemType.includes('poem') || itemType.includes('कविता');
    if (activeTab === 'lekh') return itemType.includes('lekh') || itemType.includes('article') || itemType.includes('लेख');
    if (activeTab === 'vinod') return itemType.includes('vinod') || itemType.includes('joke') || itemType.includes('विनोद');
    return true;
  });

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
        {isLoading ? (
          <div className="text-center py-12 font-poppins text-grey">माहिती लोड होत आहे...</div>
        ) : isError ? (
          <div className="text-center py-12 font-poppins text-red-500">माहिती लोड करताना त्रुटी आली.</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 font-poppins text-grey">या विभागात कोणत्याही नोंदी उपलब्ध नाहीत.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-line cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {item.image_type && (
                    <img
                      src={getMediaUrl(`/entertainment/${item.id}/image`)}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="font-tiro text-[22px] font-bold text-ink mb-2">{item.title}</h3>
                  {item.author && <p className="font-poppins text-[13px] text-teal font-semibold mb-3">कवी / लेखक: {item.author}</p>}
                  <p className="font-poppins text-[14px] text-charcoal line-clamp-4 whitespace-pre-line">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-grey hover:text-ink"
            >
              <X size={20} />
            </button>
            <h2 className="font-tiro text-[26px] font-bold text-ink mb-2">{selectedItem.title}</h2>
            {selectedItem.author && <p className="font-poppins text-[14px] text-teal font-semibold mb-4">लेखक / कवी: {selectedItem.author}</p>}
            {selectedItem.image_type && (
              <img
                src={getMediaUrl(`/entertainment/${selectedItem.id}/image`)}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
            )}
            <div className="font-poppins text-[15px] text-charcoal leading-relaxed whitespace-pre-line">
              {selectedItem.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
