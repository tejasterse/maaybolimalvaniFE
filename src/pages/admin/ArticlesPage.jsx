import { useState } from 'react';
import { articles } from '../../constants/data.jsx';

const statusColors = {
  draft: 'var(--grey)',
  review: 'var(--amber)',
  scheduled: 'var(--teal)',
  published: 'var(--maroon)',
};

const filters = ['सर्व', 'ड्राफ्ट', 'रिव्ह्यूमध्ये', 'शेड्यूल्ड', 'प्रकाशित'];

export default function ArticlesPage({ onEdit }) {
  const [active, setActive] = useState('सर्व');
  const [selectedTaluka, setSelectedTaluka] = useState('सर्व तालुके');
  const [selectedCategory, setSelectedCategory] = useState('सर्व विभाग');
  const [selectedAuthor, setSelectedAuthor] = useState('सर्व लेखक');

  const statusMap = {
    'सर्व': 'all',
    'ड्राफ्ट': 'draft',
    'रिव्ह्यूमध्ये': 'review',
    'शेड्यूल्ड': 'scheduled',
    'प्रकाशित': 'published',
  };

  const filteredArticles = articles.filter((a) => {
    const matchesStatus = active === 'सर्व' || a.status === statusMap[active];
    const matchesTaluka = selectedTaluka === 'सर्व तालुके' || a.taluka === selectedTaluka;
    const matchesCategory = selectedCategory === 'सर्व विभाग' || a.category === selectedCategory;
    const matchesAuthor = selectedAuthor === 'सर्व लेखक' || a.author === selectedAuthor;
    return matchesStatus && matchesTaluka && matchesCategory && matchesAuthor;
  });

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">लेख</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">सर्व लेख — ड्राफ्ट, प्रकाशित व शेड्यूल्ड</p>
        </div>
        <button
          onClick={() => onEdit && onEdit({})}
          className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] nav-transition"
          style={{ background: 'var(--maroon)' }}
        >
          + नवीन लेख
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <span
              key={f}
              onClick={() => setActive(f)}
              className={`font-poppins text-[12px] px-3.5 py-[7px] rounded-[20px] cursor-pointer border-[1.5px] transition-colors
                ${active === f
                  ? 'bg-teal text-white border-teal'
                  : 'bg-white text-teal border-line'
                }`}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTaluka}
            onChange={(e) => setSelectedTaluka(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व तालुके</option>
            <option>मालवण</option>
            <option>कणकवली</option>
            <option>कुडाळ</option>
            <option>सावंतवाडी</option>
            <option>वेंगुर्ला</option>
            <option>देवगड</option>
            <option>वैभववाडी</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व विभाग</option>
            <option>पर्यटन</option>
            <option>राजकारण</option>
            <option>मासेमारी-शेती</option>
            <option>संस्कृती</option>
            <option>क्रीडा</option>
          </select>

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व लेखक</option>
            <option>सारिका पवार</option>
            <option>राजेश कदम</option>
            <option>मीना जाधव</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[10px] shadow-sm" style={{ background: '#fff' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#F6F1E6' }}>
              {['शीर्षक', 'स्थिती', 'विभाग', 'तालुका', 'लेखक', 'अपडेट', ''].map((h) => (
                <th
                  key={h}
                  className="font-poppins text-[11px] uppercase tracking-[.06em] text-grey text-left px-4 py-3 font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((a) => (
                <tr key={a.id} style={{ borderTop: '1px solid var(--line)' }}>
                  <td className="font-tiro text-[16px] text-ink px-4 py-3.5 max-w-[280px]">{a.title}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className="flag-tag inline-block font-poppins text-[10.5px] font-bold text-white px-3 py-1"
                      style={{ background: statusColors[a.status] }}
                    >
                      {a.statusLabel}
                    </span>
                  </td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.category}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.taluka}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.author}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.updated}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => onEdit && onEdit(a)}
                      className="font-poppins text-[12px] text-teal font-semibold hover:underline"
                    >
                      संपादित करा
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center font-mukta text-[15px] text-grey">
                  जुळणारे कोणतेही लेख सापडले नाहीत.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
