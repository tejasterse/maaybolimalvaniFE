import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMedia, uploadMediaFile, deleteMediaItem } from '../../api/media.js';
import { getMediaUrl } from '../../utils/media.js';
import { Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MediaPage() {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderInput, setFolderInput] = useState('General');

  const { data: mediaData, isLoading, isError } = useQuery({
    queryKey: ['media-items'],
    queryFn: () => fetchMedia({ limit: 100 })
  });

  const files = mediaData?.media || [];

  const uploadMutation = useMutation({
    mutationFn: ({ file, folder }) => uploadMediaFile(file, folder),
    onSuccess: () => {
      queryClient.invalidateQueries(['media-items']);
      setSelectedFile(null);
      toast.success('फाईल यशस्वीरित्या अपलोड केली!');
    },
    onError: (err) => toast.error('अपलोड करताना त्रुटी: ' + (err.response?.data?.message || err.message))
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMediaItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['media-items']);
      toast.success('फाईल काढून टाकली!');
    },
    onError: (err) => toast.error('हटवताना त्रुटी: ' + (err.response?.data?.message || err.message))
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    uploadMutation.mutate({ file: selectedFile, folder: folderInput });
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep font-bold">मीडिया लायब्ररी</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">फोटो, व्हिडिओ आणि दस्तऐवज व्यवस्थापन</p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-line mb-8">
        <h3 className="font-poppins font-bold text-sm text-ink mb-4 flex items-center gap-2">
          <Upload size={16} /> नवीन फाईल अपलोड करा
        </h3>
        <form onSubmit={handleUploadSubmit} className="flex flex-wrap gap-4 items-center">
          <input
            type="file"
            required
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="font-poppins text-xs"
          />
          <input
            type="text"
            placeholder="फोल्डर नाव (उदा. General, Events)"
            value={folderInput}
            onChange={(e) => setFolderInput(e.target.value)}
            className="px-3 py-1.5 border rounded text-xs font-poppins"
          />
          <button
            type="submit"
            disabled={uploadMutation.isPending || !selectedFile}
            className="font-poppins font-bold text-xs px-5 py-2 bg-maroon text-white rounded-lg shadow"
          >
            {uploadMutation.isPending ? 'अपलोड होत आहे...' : 'अपलोड करा'}
          </button>
        </form>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="text-center py-12 font-poppins text-grey">मीडिया फाईल्स लोड होत आहेत...</div>
      ) : isError ? (
        <div className="text-center py-12 font-poppins text-red-500">मीडिया लोड करताना त्रुटी आली.</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 font-poppins text-grey">कोणत्याही फाईल्स उपलब्ध नाहीत.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {files.map((f) => (
            <div key={f.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-line p-3 flex flex-col justify-between">
              <div>
                {f.type === 'image' ? (
                  <img
                    src={getMediaUrl(f.url)}
                    alt={f.name}
                    className="w-full h-36 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full h-36 bg-navy/10 rounded-lg flex items-center justify-center font-poppins font-bold text-navy text-xs p-2 text-center">
                    {f.name}
                  </div>
                )}
                <div className="font-poppins font-semibold text-xs text-ink truncate mt-1">{f.name}</div>
                <div className="font-poppins text-[11px] text-grey">{f.folder || 'General'}</div>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-line">
                <a
                  href={getMediaUrl(f.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-poppins text-[11px] text-teal font-bold hover:underline"
                >
                  पहा / डाउनलोड
                </a>
                <button
                  onClick={() => {
                    if (confirm('नक्की हटवायचे?')) deleteMutation.mutate(f.id);
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
