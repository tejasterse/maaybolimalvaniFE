import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw } from 'lucide-react';
import { searchResults } from '../../constants/data.jsx';

export default function SearchPage() {
  const navigate = useNavigate();
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div>
      {/* Search Hero */}
      <div className="bg-white py-8" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="max-w-[640px] mx-auto flex gap-2.5">
          <input
            type="text"
            defaultValue="सिंधुदुर्ग किल्ला"
            className="flex-1 px-[18px] py-3.5 font-mukta text-[16px] text-ink rounded-[10px] outline-none"
            style={{ border: '2px solid var(--gold)' }}
          />
          <button
            className="font-poppins font-semibold text-[14px] px-6 rounded-[10px]"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            शोधा
          </button>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid gap-6 py-7" style={{ gridTemplateColumns: '230px 1fr' }}>
          {/* Filters Sidebar */}
          <aside className="bg-white rounded-[10px] p-5 shadow-sm self-start">
            <h4 className="font-poppins text-[11.5px] uppercase tracking-[.06em] text-grey mb-2.5">विभाग</h4>
            {['पर्यटन', 'राजकारण', 'संस्कृती', 'क्रीडा'].map((c, i) => (
              <label key={c} className="flex items-center gap-2 font-mukta text-sm text-ink py-1 cursor-pointer">
                <input type="checkbox" defaultChecked={i === 0} />
                {c}
              </label>
            ))}
            <h4 className="font-poppins text-[11.5px] uppercase tracking-[.06em] text-grey mt-4 mb-2.5">तालुका</h4>
            {['मालवण', 'कणकवली', 'कुडाळ'].map((t, i) => (
              <label key={t} className="flex items-center gap-2 font-mukta text-sm text-ink py-1 cursor-pointer">
                <input type="checkbox" defaultChecked={i === 0} />
                {t}
              </label>
            ))}
            <h4 className="font-poppins text-[11.5px] uppercase tracking-[.06em] text-grey mt-4 mb-2.5">कालावधी</h4>
            {['कधीही', 'गेल्या ७ दिवसांत', 'गेल्या महिन्यात'].map((d, i) => (
              <label key={d} className="flex items-center gap-2 font-mukta text-sm text-ink py-1 cursor-pointer">
                <input type="radio" name="d" defaultChecked={i === 0} />
                {d}
              </label>
            ))}
          </aside>

          {/* Results */}
          <div>
            <button
              onClick={() => setShowEmpty(!showEmpty)}
              className="font-poppins text-[11.5px] text-teal underline cursor-pointer block mb-4"
            >
              <RefreshCw size={14} className="inline mr-1" /> रिकाम्या परिणामांचे उदाहरण बघा
            </button>

            {!showEmpty ? (
              <>
                <div className="font-poppins text-[13px] text-grey mb-4">
                  <b className="text-ink">१२</b> परिणाम सापडले "<b className="text-ink">सिंधुदुर्ग किल्ला</b>" साठी
                </div>
                {searchResults.map((r) => (
                  <div key={r.title} className="bg-white rounded-[10px] px-5 py-4 mb-3.5 shadow-sm">
                    <span className="font-poppins text-[10.5px] text-teal font-bold uppercase">{r.tag}</span>
                    <h3 className="font-tiro text-[19px] text-ink my-1.5">{r.title}</h3>
                    <p className="font-mukta text-[14.5px] leading-relaxed" style={{ color: '#5a4c3a' }}>
                      {r.excerpt.split(r.highlight).map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <span key={i}>
                            {part}
                            <mark
                              className="rounded px-0.5"
                              style={{ background: 'var(--gold-light)', color: 'var(--maroon-deep)' }}
                            >
                              {r.highlight}
                            </mark>
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                    <div className="font-poppins text-[11px] text-grey mt-2.5">{r.meta}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="font-poppins text-[13px] text-grey mb-4">
                  <b className="text-ink">०</b> परिणाम सापडले "<b className="text-ink">राजापूर तालुका बातम्या</b>" साठी
                </div>
                <div className="bg-white rounded-[10px] px-7 py-14 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <Search size={48} className="text-grey" />
                </div>
                  <h3 className="font-tiro text-[20px] text-ink mb-2">काही सापडले नाही</h3>
                  <p className="font-poppins text-[13px] text-grey mb-1.5">तुमच्या शोधाशी जुळणारी कोणतीही बातमी सापडली नाही.</p>
                  <p className="font-poppins text-[13px] text-grey">शब्दलेखन तपासा किंवा वेगळे शब्द वापरून पुन्हा शोधा.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
