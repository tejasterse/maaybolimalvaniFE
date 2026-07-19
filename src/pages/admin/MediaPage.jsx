import { useState } from 'react';
import { mediaFiles } from '../../constants/data.jsx';

export default function MediaPage() {
  const [files, setFiles] = useState(mediaFiles);
  const [active, setActive] = useState('सर्व');
  const [sortBy, setSortBy] = useState('latest');

  // Custom modal state
  const [showModal, setShowModal] = useState(false);
  const [fileNameInput, setFileNameInput] = useState('');
  const [fileTypeInput, setFileTypeInput] = useState('photo');

  // Filter logic
  const filteredFiles = files.filter((f) => {
    if (active === 'सर्व') return true;
    if (active === 'फोटो') return f.type === 'photo';
    if (active === 'व्हिडिओ') return f.type === 'video';
    if (active === 'मोठ्या फाईल्स') return f.warn === true;
    return true;
  });

  // Sort logic
  const sortedFiles = [...filteredFiles];
  if (sortBy === 'large') {
    sortedFiles.sort((a, b) => {
      const getBytes = (str) => {
        const num = parseFloat(str);
        if (str.includes('MB')) return num * 1024 * 1024;
        if (str.includes('KB')) return num * 1024;
        return num;
      };
      return getBytes(b.size) - getBytes(a.size);
    });
  }

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileNameInput.trim()) return;

    const newFile = {
      name: fileNameInput.trim(),
      size: fileTypeInput === 'video' ? '15.4 MB' : '1.5 MB',
      type: fileTypeInput,
      warn: fileTypeInput === 'video' ? false : Math.random() > 0.7,
      warnLabel: 'कॉम्प्रेस करा — मोठी फाईल',
      img: fileTypeInput === 'video'
        ? 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop'
        : 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=150&fit=crop',
    };

    setFiles([newFile, ...files]);
    setShowModal(false);
    setFileNameInput('');
    setFileTypeInput('photo');
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">मीडिया लायब्ररी</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">{files.length} फाईल्स · २.३ GB वापरले</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] nav-transition hover:opacity-90"
          style={{ background: 'var(--maroon)' }}
        >
          + अपलोड करा
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {['सर्व', 'फोटो', 'व्हिडिओ', 'मोठ्या फाईल्स'].map((f) => (
            <span
              key={f}
              onClick={() => setActive(f)}
              className={`font-poppins text-[12px] px-3.5 py-[7px] rounded-[20px] cursor-pointer border-[1.5px] transition-colors
                ${active === f ? 'bg-teal text-white border-teal' : 'bg-white text-teal border-line'}`}
            >
              {f}
            </span>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3.5 py-1.5 rounded-[20px] outline-none cursor-pointer"
        >
          <option value="latest">नवीनतम आधी ▾</option>
          <option value="large">मोठ्या फाईल्स आधी ▾</option>
        </select>
      </div>

      {/* Media Grid */}
      <div className="grid gap-3.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {/* Upload tile */}
        <div
          onClick={() => setShowModal(true)}
          className="border-[1.5px] border-dashed border-gold rounded-lg flex flex-col items-center justify-center min-h-[150px] font-poppins text-[11.5px] font-semibold text-maroon-deep cursor-pointer hover:bg-white/40 transition-colors"
        >
          <span className="text-[22px] mb-2">＋</span>
          अपलोड करा
        </div>

        {sortedFiles.map((f, index) => (
          <div key={f.name + index} className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-0.5">
            <img src={f.img} alt={f.name} className="w-full h-[110px] object-cover block" />
            <div className="px-2.5 py-2">
              <div className="font-poppins text-[11px] text-ink font-semibold truncate">{f.name}</div>
              <div className={`font-poppins text-[10px] mt-0.5 ${f.warn ? 'text-amber font-bold' : 'text-grey'}`}>
                {f.warn ? f.warnLabel : f.size}
              </div>
              {f.warn && <div className="font-poppins text-[10px] text-grey">{f.size}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-[400px] w-full p-6 mx-4 animate-scale-up">
            <h2 className="font-tiro text-[20px] text-maroon-deep mb-4 font-semibold">नवीन मीडिया फाईल अपलोड करा</h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">फाईलचे नाव</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. scuba-diving.jpg"
                  value={fileNameInput}
                  onChange={(e) => setFileNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>
              <div className="mb-5">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">प्रकार</label>
                <select
                  value={fileTypeInput}
                  onChange={(e) => setFileTypeInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal bg-white cursor-pointer"
                >
                  <option value="photo">फोटो</option>
                  <option value="video">व्हिडिओ</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-grey border border-line hover:bg-grey-light transition-colors"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors"
                  style={{ background: 'var(--maroon)' }}
                >
                  अपलोड करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
