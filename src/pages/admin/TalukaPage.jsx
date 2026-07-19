import { useState } from 'react';
import { categories, talukas } from '../../constants/data.jsx';

export default function TalukaPage() {
  const [cats, setCats] = useState(categories);
  const [talks, setTalks] = useState(talukas);
  const [newCat, setNewCat] = useState('');
  const [newTaluka, setNewTaluka] = useState('');

  // Custom modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // { type: 'cat' | 'taluka', index }
  const [editNameInput, setEditNameInput] = useState('');

  const addCat = () => {
    if (newCat.trim()) {
      setCats([...cats, { name: newCat, count: '0 लेख' }]);
      setNewCat('');
    }
  };

  const addTaluka = () => {
    if (newTaluka.trim()) {
      setTalks([...talks, { name: newTaluka, count: '0 लेख' }]);
      setNewTaluka('');
    }
  };

  const triggerRename = (type, index, currentName) => {
    setEditTarget({ type, index });
    setEditNameInput(currentName);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editNameInput.trim() || !editTarget) return;

    if (editTarget.type === 'cat') {
      const updated = [...cats];
      updated[editTarget.index].name = editNameInput.trim();
      setCats(updated);
    } else if (editTarget.type === 'taluka') {
      const updated = [...talks];
      updated[editTarget.index].name = editNameInput.trim();
      setTalks(updated);
    }

    setShowEditModal(false);
    setEditTarget(null);
    setEditNameInput('');
  };

  const renderList = (items, newVal, setNew, onAdd, type, placeholder) => (
    <div className="bg-white rounded-[10px] p-5 shadow-sm">
      <h3
        className="font-poppins text-[13px] font-bold text-maroon-deep mb-3.5 uppercase tracking-[.05em]"
      >
        {type === 'cat' ? 'विभाग (Categories)' : 'तालुका (Talukas)'}
      </h3>
      {items.map((item, i) => (
        <div
          key={item.name}
          className="flex justify-between items-center py-[11px] font-mukta text-[15px]"
          style={{ borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none' }}
        >
          <span>
            {item.name}{' '}
            <span className="font-poppins text-[11px] text-grey ml-2">{item.count}</span>
          </span>
          <button
            onClick={() => triggerRename(type, i, item.name)}
            className="font-poppins text-[11.5px] text-teal font-semibold cursor-pointer hover:underline animate-fade-in"
          >
            संपादित करा
          </button>
        </div>
      ))}
      <div className="flex gap-2 mt-3.5">
        <input
          type="text"
          value={newVal}
          onChange={(e) => setNew(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-line rounded-[6px] font-poppins text-[12.5px] outline-none focus:border-teal"
        />
        <button
          onClick={onAdd}
          className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] text-[#fbe8c9] nav-transition hover:opacity-95"
          style={{ background: 'var(--maroon)' }}
        >
          + जोडा
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">विभाग व तालुका</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">श्रेणी व तालुका टॅग्ज व्यवस्थापित करा</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderList(cats, newCat, setNewCat, addCat, 'cat', 'नवीन विभाग नाव…')}
        {renderList(talks, newTaluka, setNewTaluka, addTaluka, 'taluka', 'नवीन तालुका नाव…')}
      </div>

      {/* Edit Category/Taluka Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-[400px] w-full p-6 mx-4 animate-scale-up">
            <h2 className="font-tiro text-[20px] text-maroon-deep mb-4 font-semibold">
              {editTarget?.type === 'cat' ? 'विभाग' : 'तालुका'} चे नाव सुधारा
            </h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-5">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">नाव</label>
                <input
                  type="text"
                  required
                  value={editNameInput}
                  onChange={(e) => setEditNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-grey border border-line hover:bg-grey-light transition-colors"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors"
                  style={{ background: 'var(--maroon)' }}
                >
                  जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
