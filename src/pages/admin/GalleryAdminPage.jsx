import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../../api/gallery.js';
import { getMediaUrl } from '../../utils/media.js';

export default function GalleryAdminPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [existingMedia, setExistingMedia] = useState(null);
  const [existingIsVideo, setExistingIsVideo] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery
  });

  const createMutation = useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
    }
  });

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setMeta(item.meta || '');
      setExistingMedia(getMediaUrl(item.image || item.media_url || `/gallery/${item.id}/media`));
      setExistingIsVideo(item.is_video);
    } else {
      setEditingItem(null);
      setTitle('');
      setMeta('');
      setExistingMedia(null);
      setExistingIsVideo(false);
    }
    setMediaFile(null);
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
    formData.append('meta', meta);
    if (mediaFile) formData.append('media', mediaFile);

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
    <div className="animate-fade-in p-7">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-tiro text-[28px] text-ink mb-1">गॅलरी व्यवस्थापन</h1>
          <p className="font-poppins text-[13px] text-grey">फोटो आणि व्हिडिओ व्यवस्थापित करा</p>
        </div>
        <button
          onClick={() => openModal()}
          className="font-poppins font-medium text-[13px] px-5 py-2.5 rounded-lg text-white transition-colors hover:bg-opacity-90"
          style={{ background: 'var(--teal)' }}
        >
          + नवीन जोडा
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-line overflow-hidden flex flex-col group">
            <div className="relative h-[160px] bg-black">
              {item.is_video === 1 ? (
                <video src={getMediaUrl(item.image || item.media_url || `/gallery/${item.id}/media`)} className="w-full h-full object-cover opacity-80" muted />
              ) : (
                <img src={getMediaUrl(item.image || item.media_url || `/gallery/${item.id}/media`)} alt={item.title} className="w-full h-full object-cover" />
              )}
              {item.is_video === 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-[10px] px-2 py-1 rounded">VIDEO</div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                <button onClick={() => openModal(item)} className="bg-white text-teal px-3 py-1.5 rounded text-sm font-semibold hover:bg-gray-100">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-600">Delete</button>
              </div>
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-tiro text-[16px] text-ink line-clamp-1 mb-1">{item.title}</h3>
              <p className="font-poppins text-[11px] text-grey">{item.meta || '-'}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 py-10 text-center text-grey font-poppins">कोणतीही माहिती उपलब्ध नाही.</div>
        )}
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
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">माहिती (उदा. 'मालवण · १८ जुलै')</label>
                <input
                  type="text"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>

              <div className="mb-6">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">फाईल अपलोड करा (फोटो किंवा व्हिडिओ)</label>
                <div className="border-2 border-dashed border-line rounded-lg p-4 text-center">
                  {existingMedia && !mediaFile && (
                    <div className="mb-3 flex justify-center">
                      {existingIsVideo ? (
                        <video src={existingMedia} className="max-h-24 rounded" controls />
                      ) : (
                        <img src={existingMedia} alt="Current" className="max-h-24 rounded" />
                      )}
                    </div>
                  )}
                  {mediaFile && (
                    <div className="mb-2 text-teal text-[12px]">{mediaFile.name}</div>
                  )}
                  <input
                    type="file"
                    id="media-file"
                    className="hidden"
                    onChange={(e) => setMediaFile(e.target.files[0])}
                    accept="image/*,video/*"
                  />
                  <label htmlFor="media-file" className="inline-block px-4 py-1.5 bg-gray-100 border border-line rounded cursor-pointer text-[12px] hover:bg-gray-200">
                    फाईल निवडा
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
