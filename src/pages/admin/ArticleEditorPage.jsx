import { useState } from 'react';
import ToggleSwitch from '../../components/admin/ToggleSwitch.jsx';

const talukaOptions = ['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड'];

export default function ArticleEditorPage({ article, onBack }) {
  const [title, setTitle] = useState(article?.title || '');
  const [body, setBody] = useState(article?.excerpt || '');
  const [selectedTaluka, setSelectedTaluka] = useState(article?.taluka || 'मालवण');
  const [category, setCategory] = useState(article?.category || 'पर्यटन');
  const [pubDate, setPubDate] = useState('2026-07-18');
  const [author, setAuthor] = useState(article?.author || 'सारिका पवार');
  const [breakingOn, setBreakingOn] = useState(article?.status === 'published' ? true : false);
  const [featureOn, setFeatureOn] = useState(false);
  const [originalText, setOriginalText] = useState(article?.excerpt || '');
  const [aiDraft, setAiDraft] = useState('');

  const handleInsert = () => {
    if (aiDraft.trim() && aiDraft !== "भाषांतर होत आहे...") {
      setBody((prev) => prev + '\n\n' + aiDraft);
    }
  };

  const handleRegenerate = () => {
    if (originalText.trim()) {
      setAiDraft("भाषांतर होत आहे...");
      setTimeout(() => {
        let translated = originalText
          .replace(/दिसून आली/g, 'दिसान इली')
          .replace(/गर्दी होती/g, 'गर्दी हुती')
          .replace(/आले होते/g, 'इले हुते')
          .replace(/चालला आहे/g, 'चाल्ला हा')
          .replace(/आहे/g, 'हाय');
        setAiDraft(translated);
      }, 700);
    }
  };

  const toolbarBtns = ['B', 'I', 'H2', '" "', '🔗', '🖼️'];

  return (
    <div>
      {/* Topbar */}
      <div
        className="flex items-center justify-between px-7 py-3.5 text-white"
        style={{ background: 'var(--navy)' }}
      >
        <div className="flex items-center gap-3.5">
          <span
            onClick={onBack}
            className="font-poppins text-[13px] text-gold-light cursor-pointer"
          >
            ← लेखांकडे परत
          </span>
          <span className="font-tiro text-[15px] text-white">मायबोली मालवणी</span>
        </div>
        <div className="font-poppins text-[11.5px]" style={{ color: '#9fb0c2' }}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
            style={{ background: '#4CAF7D' }}
          />
          स्वयं-जतन झाले · २ मिनिटांपूर्वी
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => { alert('लेख ड्राफ्ट म्हणून यशस्वीरित्या जतन केला गेला आहे!'); onBack(); }}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] bg-transparent border border-white/25 transition-colors hover:bg-white/10"
            style={{ color: '#d9c9a8' }}
          >
            ड्राफ्ट जतन करा
          </button>
          <button
            onClick={() => { alert('लेख रिव्ह्यूसाठी यशस्वीरित्या सादर केला गेला आहे!'); onBack(); }}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] text-white transition-colors hover:opacity-90"
            style={{ background: 'var(--teal)' }}
          >
            रिव्ह्यूसाठी सादर करा
          </button>
          <button
            onClick={() => { alert('लेख यशस्वीरित्या प्रकाशित केला गेला आहे!'); onBack(); }}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] transition-colors hover:opacity-90"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            प्रकाशित करा
          </button>
        </div>
      </div>

      {/* Layout */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 p-6 max-w-[1400px] mx-auto"
        style={{ background: '#F6F1E6', minHeight: 'calc(100vh - 56px)' }}
      >
        {/* Editor Column */}
        <div>
          <div className="bg-white rounded-[10px] p-6 shadow-sm">
            {/* Title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="लेखाचे शीर्षक टाइप करा…"
              className="w-full font-tiro text-[26px] text-ink outline-none pb-3.5 mb-4"
              style={{
                border: 'none',
                borderBottom: '1px solid var(--line)',
                background: 'transparent',
              }}
            />

            {/* Toolbar */}
            <div
              className="flex gap-1.5 pb-3.5 mb-4"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              {toolbarBtns.map((b) => (
                <button
                  key={b}
                  className="font-poppins font-semibold text-[12.5px] text-grey px-3 py-[7px] rounded-[6px]"
                  style={{ background: '#F6F1E6' }}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Body */}
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="मालवणी भाषेत लेख इथे लिहा…"
              className="w-full font-mukta text-[17px] leading-[1.9] text-ink outline-none resize-y"
              style={{ border: 'none', minHeight: 340, background: 'transparent' }}
            />
          </div>

          {/* AI Translation Assist */}
          <div
            className="rounded-[10px] p-5 mt-5 border-[1.5px] border-gold"
            style={{ background: 'linear-gradient(180deg,#FBF3E3 0%, #F6ECD6 100%)' }}
          >
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-poppins text-[13.5px] font-bold text-maroon-deep flex items-center gap-2">
                🌐 AI भाषांतर सहाय्य
                <span
                  className="font-poppins text-[9.5px] px-2 py-0.5 rounded-[10px] font-bold"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                >
                  BETA
                </span>
              </h3>
            </div>
            <p className="font-poppins text-[11.5px] mb-4 leading-relaxed" style={{ color: '#8a7a5e' }}>
              मराठी किंवा इंग्रजीतील मजकूर डावीकडे टाका — AI मालवणी ड्राफ्ट उजवीकडे तयार करेल. संपादकाने तपासून व दुरुस्त करूनच तो लेखात समाविष्ट होईल — AI आपोआप काहीही बदलत नाही.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Original */}
              <div className="bg-white rounded-lg p-3.5">
                <div className="font-poppins text-[10px] font-bold uppercase tracking-[.06em] text-teal mb-2">
                  मूळ मजकूर (मराठी/इंग्रजी)
                </div>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="इथे मूळ मजकूर पेस्ट करा…"
                  className="w-full border border-line rounded-[6px] px-2.5 py-2.5 font-mukta text-sm leading-relaxed resize-y outline-none"
                  style={{ minHeight: 110 }}
                />
              </div>
              {/* AI Draft */}
              <div className="bg-white rounded-lg p-3.5 border-[1.5px] border-dashed border-gold">
                <div className="font-poppins text-[10px] font-bold uppercase tracking-[.06em] text-teal mb-2">
                  AI मालवणी ड्राफ्ट
                </div>
                <textarea
                  value={aiDraft}
                  onChange={(e) => setAiDraft(e.target.value)}
                  placeholder="AI ड्राफ्ट इथे दिसेल…"
                  className="w-full border border-line rounded-[6px] px-2.5 py-2.5 font-mukta text-sm leading-relaxed resize-y outline-none"
                  style={{ minHeight: 110 }}
                />
                <div className="flex items-center gap-2 mt-2.5 font-poppins text-[11px] text-grey">
                  विश्वासार्हता
                  <div className="flex-1 h-[5px] rounded-[3px] overflow-hidden" style={{ background: 'var(--line)' }}>
                    <div className="w-[78%] h-full" style={{ background: 'var(--amber)' }} />
                  </div>
                  मध्यम — कृपया तपासा
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2.5 mt-3.5">
              <button
                onClick={handleRegenerate}
                className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] bg-white text-teal border-[1.5px] border-line transition-colors hover:bg-[#F6F1E6]"
              >
                पुन्हा तयार करा
              </button>
              <button
                onClick={handleInsert}
                className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] transition-colors hover:opacity-90"
                style={{ background: 'var(--maroon-deep)', color: '#fbe8c9' }}
              >
                लेखात समाविष्ट करा →
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4">
          {/* Publication Details */}
          <div className="bg-white rounded-[10px] p-4 shadow-sm">
            <h4 className="font-poppins text-[12px] font-bold uppercase tracking-[.06em] text-grey mb-3.5">
              प्रकाशन तपशील
            </h4>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">विभाग</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white cursor-pointer"
              >
                {['पर्यटन', 'राजकारण', 'मासेमारी-शेती', 'संस्कृती', 'क्रीडा'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">तालुका</label>
              <div className="flex flex-wrap gap-1.5">
                {talukaOptions.map((t) => (
                  <span
                    key={t}
                    onClick={() => setSelectedTaluka(t)}
                    className="font-poppins text-[11.5px] px-2.5 py-1 rounded-[14px] cursor-pointer transition-colors"
                    style={
                      selectedTaluka === t
                        ? { background: 'var(--teal)', color: '#fff' }
                        : { background: '#F6F1E6', color: 'var(--teal)' }
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">प्रकाशन तारीख</label>
              <input
                type="date"
                value={pubDate}
                onChange={(e) => setPubDate(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white"
              />
            </div>
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="font-poppins text-[13px] text-ink">ब्रेकिंग न्यूज</span>
              <ToggleSwitch on={breakingOn} onToggle={() => setBreakingOn(!breakingOn)} />
            </div>
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="font-poppins text-[13px] text-ink">होमपेजवर फीचर करा</span>
              <ToggleSwitch on={featureOn} onToggle={() => setFeatureOn(!featureOn)} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-[10px] p-4 shadow-sm">
            <h4 className="font-poppins text-[12px] font-bold uppercase tracking-[.06em] text-grey mb-3.5">
              फीचर्ड इमेज
            </h4>
            <div
              className="border-[1.5px] border-dashed border-line rounded-lg px-2.5 py-6 text-center font-poppins text-[12px] text-grey cursor-pointer"
            >
              <span className="block text-[22px] mb-2">🖼️</span>
              फोटो अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग करा
              <br />
              <span className="opacity-70">JPG/PNG, कमाल 5MB</span>
            </div>
          </div>

          {/* Author */}
          <div className="bg-white rounded-[10px] p-4 shadow-sm">
            <h4 className="font-poppins text-[12px] font-bold uppercase tracking-[.06em] text-grey mb-3.5">
              लेखक
            </h4>
            <div>
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">लेखक निवडा</label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white cursor-pointer"
              >
                <option value="सारिका पवार">सारिका पवार</option>
                <option value="राजेश कदम">राजेश कदम</option>
                <option value="मीना जाधव">मीना जाधव</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
