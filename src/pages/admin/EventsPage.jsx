import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../api/events.js';
import { getMediaUrl } from '../../utils/media.js';
import toast from 'react-hot-toast';

export default function EventsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      closeModal();
      toast.success('नवीन कार्यक्रम यशस्वीरित्या जोडला!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      closeModal();
      toast.success('कार्यक्रम माहिती अपडेट केली!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('कार्यक्रम काढून टाकला!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const compressImage = (file) => {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) return resolve(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const scale = Math.min(1, MAX_WIDTH / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) return resolve(file);
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.8);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setEventDate(item.event_date);
      setLocation(item.location);
      setExistingImage(item.image ? getMediaUrl(item.image) : getMediaUrl(`/events/${item.id}/image`));
    } else {
      setEditingItem(null);
      setTitle('');
      setEventDate('');
      setLocation('');
      setExistingImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('event_date', eventDate);
    formData.append('location', location);

    if (imageFile) {
      const optimizedImage = await compressImage(imageFile);
      formData.append('image', optimizedImage);
    }

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
          <h1 className="font-tiro text-[28px] text-ink mb-1">सण व उत्सव</h1>
          <p className="font-poppins text-[13px] text-grey">होमपेजवर दिसणारे सण आणि कार्यक्रम व्यवस्थापित करा</p>
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
              <th className="px-6 py-4 font-medium">तारीख/वेळ</th>
              <th className="px-6 py-4 font-medium">ठिकाण</th>
              <th className="px-6 py-4 font-medium text-right">कृती</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={item.image ? getMediaUrl(item.image) : getMediaUrl(`/events/${item.id}/image`)}
                    alt={item.title}
                    className="w-16 h-12 object-cover rounded border border-line flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop';
                    }}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-ink">{item.title}</td>
                <td className="px-6 py-4 text-grey">{item.event_date}</td>
                <td className="px-6 py-4 text-grey">{item.location}</td>
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
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">तारीख/वेळ (उदा. '२५ जुलै')</label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-poppins text-[12px] font-medium text-grey mb-1.5">ठिकाण</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                  required
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
                    id="event-image"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/*"
                  />
                  <label htmlFor="event-image" className="inline-block px-4 py-1.5 bg-gray-100 border border-line rounded cursor-pointer text-[12px] hover:bg-gray-200">
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
