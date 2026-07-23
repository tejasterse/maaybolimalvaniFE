import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAds, createAd, deleteAd } from '../../api/ads.js';

export default function AdsPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });

  const createMutation = useMutation({
    mutationFn: createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      setShowModal(false);
      setImageFile(null);
      setLinkUrl('');
    },
    onError: (err) => {
      alert('Error uploading ad: ' + (err.response?.data?.message || err.message));
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    onError: (err) => {
      alert('Error deleting ad: ' + (err.response?.data?.message || err.message));
    }
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('कृपया एक फोटो निवडा');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    if (linkUrl) {
      formData.append('link_url', linkUrl);
    }
    createMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    if (window.confirm('तुम्हाला खात्री आहे की ही जाहिरात हटवायची आहे?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">जाहिराती व्यवस्थापन (Advertisements)</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">तुमच्या मुख्य पानावरील जाहिराती येथे व्यवस्थापित करा.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] nav-transition hover:opacity-90"
          style={{ background: 'var(--maroon)' }}
        >
          + जाहिरात अपलोड करा
        </button>
      </div>

      {isLoading ? (
        <div className="text-center font-poppins py-10">लोड होत आहे...</div>
      ) : (
        <div className="grid gap-3.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Upload tile */}
          <div
            onClick={() => setShowModal(true)}
            className="border-[1.5px] border-dashed border-gold rounded-lg flex flex-col items-center justify-center min-h-[180px] font-poppins text-[11.5px] font-semibold text-maroon-deep cursor-pointer hover:bg-white/40 transition-colors"
          >
            <span className="mb-2"><Plus size={24} /></span>
            अपलोड करा
          </div>

          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-0.5 relative group">
              <img src={`https://maayboli-backend.yuktiyantra.com/api/banners/${ad.id}/image`} alt="Ad" className="w-full h-[150px] object-cover block" />
              <div className="px-2.5 py-3">
                <div className="font-poppins text-[11px] text-ink font-semibold truncate mb-1">
                  {ad.link_url ? <a href={ad.link_url} target="_blank" rel="noreferrer" className="text-teal hover:underline">{ad.link_url}</a> : 'कोणतीही लिंक नाही'}
                </div>
                <div className="font-poppins text-[10px] text-grey">
                  {new Date(ad.createdAt).toLocaleDateString('mr-IN')}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(ad.id)}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Delete Ad"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-[400px] w-full p-6 mx-4 animate-scale-up">
            <h2 className="font-tiro text-[20px] text-maroon-deep mb-4 font-semibold">नवीन जाहिरात जोडा</h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">फोटो निवडा *</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>
              <div className="mb-5">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">लिंक (पर्यायी)</label>
                <input
                  type="url"
                  placeholder="उदा. https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal bg-white"
                />
                <p className="font-poppins text-[10px] text-grey mt-1">जर वापरकर्त्याने जाहिरातीवर क्लिक केले तर या लिंकवर जाईल.</p>
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
                  disabled={createMutation.isPending}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors disabled:opacity-50"
                  style={{ background: 'var(--maroon)' }}
                >
                  {createMutation.isPending ? 'अपलोड होत आहे...' : 'अपलोड करा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
