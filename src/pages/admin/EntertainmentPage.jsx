import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEntertainment, createEntertainment, updateEntertainment, deleteEntertainment } from '../../api/entertainment.js';

export default function EntertainmentPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('कविता');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['entertainment'],
    queryFn: fetchEntertainment
  });

  const createMutation = useMutation({
    mutationFn: createEntertainment,
    onSuccess: () => {
      queryClient.invalidateQueries(['entertainment']);
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateEntertainment,
    onSuccess: () => {
      queryClient.invalidateQueries(['entertainment']);
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntertainment,
    onSuccess: () => {
      queryClient.invalidateQueries(['entertainment']);
    }
  });

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setAuthor(item.author || '');
      setType(item.type);
      setContent(item.content || '');
      setExistingImage(item.image_type ? `http://localhost:5000/api/entertainment/${item.id}/image` : null);
    } else {
      setEditingItem(null);
      setTitle('');
      setAuthor('');
      setType('कविता');
      setContent('');
      setExistingImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type', type);
    formData.append('content', content);
    if (imageFile) formData.append('image', imageFile);

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('तुम्हाला नक्की डिलीट करायचे आहे का?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-7">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-tiro text-[28px] text-ink mb-1">कविता, लेख आणि मनोरंजन</h1>
          <p className="font-poppins text-[13px] text-grey">होमपेजवर दिसणारे साहित्य व्यवस्थापित करा</p>
        </div>
        <button
          onClick={() => openModal()}
          className="font-poppins font-medium text-[13px] px-5 py-2.5 rounded-lg text-white transition-colors hover:bg-opacity-90"
          style={{ background: 'var(--teal)' }}
        >
          + नवीन जोडा
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <table className="w-full text-left font-poppins">
          <thead className="bg-[#fafafa] border-b border-line text-[12px] text-grey uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">इमेज</th>
              <th className="px-6 py-4 font-medium">शीर्षक</th>
              <th className="px-6 py-4 font-medium">प्रकार</th>
              <th className="px-6 py-4 font-medium">लेखक</th>
              <th className="px-6 py-4 font-medium text-right">कृती</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  {item.image_type ? (
                    <img src={`http://localhost:5000/api/entertainment/${item.id}/image`} alt={item.title} className="w-16 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-ink">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-amber bg-opacity-20 text-amber-600 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-grey">{item.author || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openModal(item)} className="text-teal hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-grey">सध्या कोणताही डेटा उपलब्ध नाही.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-line flex justify-between items-center bg-[#fafafa]">
              <h2 className="font-tiro text-[20px] text-ink">{editingItem ? 'अपडेट करा' : 'नवीन जोडा'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              
              <div className="mb-4">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">प्रकार निवडा</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                  required
                >
                  <option value="कविता">कविता</option>
                  <option value="लेख">लेख</option>
                  <option value="विनोद">विनोद</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">शीर्षक</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">लेखकाचे नाव (पर्यायी)</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>

              <div className="mb-4">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">मजकूर (Content)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-mukta text-[14px] outline-none focus:border-teal resize-y"
                  rows={6}
                  placeholder="कविता किंवा लेखाचा मजकूर इथे लिहा..."
                />
              </div>

              <div className="mb-6">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">इमेज अपलोड करा</label>
                <div className="border-2 border-dashed border-line rounded-lg p-4 text-center">
                  {existingImage && !imageFile && (
                    <img src={existingImage} alt="Current" className="max-h-24 mx-auto mb-2 rounded" />
                  )}
                  {imageFile && (
                    <div className="mb-2 text-teal text-[12px]">{imageFile.name}</div>
                  )}
                  <input
                    type="file"
                    id="ent-image"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/*"
                  />
                  <label htmlFor="ent-image" className="inline-block px-4 py-1.5 bg-gray-100 border border-line rounded cursor-pointer text-[12px] hover:bg-gray-200">
                    इमेज निवडा
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 font-poppins text-[13px] text-grey hover:bg-gray-100 rounded-lg">रद्द करा</button>
                <button 
                  type="submit" 
                  className="px-6 py-2 font-poppins text-[13px] text-white rounded-lg bg-teal hover:bg-teal-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'सेव्ह होत आहे...' : 'सेव्ह करा'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
