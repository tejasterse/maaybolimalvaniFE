import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../api/categories.js';
import { fetchDistricts, createDistrict, updateDistrict, deleteDistrict } from '../../api/districts.js';

export default function TalukaPage() {
  const queryClient = useQueryClient();
  const [newCat, setNewCat] = useState('');
  const [newTaluka, setNewTaluka] = useState('');

  const { data: cats = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: talks = [] } = useQuery({ queryKey: ['districts'], queryFn: fetchDistricts });

  // Custom modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // { type: 'cat' | 'taluka', id }
  const [editNameInput, setEditNameInput] = useState('');

  const createCatMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['categories'] }); setNewCat(''); },
    onError: (err) => alert(err.response?.data?.message || err.message)
  });

  const createTalukaMutation = useMutation({
    mutationFn: createDistrict,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['districts'] }); setNewTaluka(''); },
    onError: (err) => alert(err.response?.data?.message || err.message)
  });
  
  const updateCatMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowEditModal(false);
    },
    onError: (err) => alert(err.response?.data?.message || err.message)
  });

  const updateTalukaMutation = useMutation({
    mutationFn: updateDistrict,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] });
      setShowEditModal(false);
    },
    onError: (err) => alert(err.response?.data?.message || err.message)
  });

  const deleteCatMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (err) => alert(err.response?.data?.message || err.message)
  });

  const deleteTalukaMutation = useMutation({
    mutationFn: deleteDistrict,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['districts'] }),
    onError: (err) => alert(err.response?.data?.message || err.message)
  });

  const addCat = () => {
    if (newCat.trim()) createCatMutation.mutate({ name: newCat });
  };

  const addTaluka = () => {
    if (newTaluka.trim()) createTalukaMutation.mutate({ name: newTaluka });
  };

  const triggerRename = (type, id, currentName) => {
    setEditTarget({ type, id });
    setEditNameInput(currentName);
    setShowEditModal(true);
  };
  
  const triggerDelete = (type, id) => {
    if (window.confirm('तुम्हाला खात्री आहे का की तुम्ही हा घटक काढून टाकू इच्छिता?')) {
        if (type === 'cat') deleteCatMutation.mutate(id);
        else deleteTalukaMutation.mutate(id);
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editNameInput.trim() || !editTarget) return;

    if (editTarget.type === 'cat') {
      updateCatMutation.mutate({ id: editTarget.id, name: editNameInput.trim() });
    } else if (editTarget.type === 'taluka') {
      updateTalukaMutation.mutate({ id: editTarget.id, name: editNameInput.trim() });
    }
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
          key={item.id}
          className="flex justify-between items-center py-[11px] font-mukta text-[15px]"
          style={{ borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none' }}
        >
          <span>
            {item.name}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => triggerRename(type, item.id, item.name)}
              className="font-poppins text-[11.5px] text-teal font-semibold cursor-pointer hover:underline animate-fade-in"
            >
              संपादित करा
            </button>
            <button
              onClick={() => triggerDelete(type, item.id)}
              className="font-poppins text-[11.5px] text-red-500 font-semibold cursor-pointer hover:underline animate-fade-in"
            >
              काढून टाका
            </button>
          </div>
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
                  disabled={updateCatMutation.isPending || updateTalukaMutation.isPending}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors disabled:opacity-50"
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
