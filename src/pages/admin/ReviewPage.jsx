import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, updatePostStatus } from '../../api/posts.js';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { getMediaUrl } from '../../utils/media.js';

export default function ReviewPage() {
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState({}); // { itemId: 'approved' | 'changes' | 'rejected' }

  const { data = {}, isLoading } = useQuery({
    queryKey: ['posts', 'review'],
    queryFn: () => fetchPosts({ admin: true, limit: 100 }),
  });

  const posts = data.posts || [];
  const queue = posts.filter(post => post.status === 'PENDING_REVIEW');

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updatePostStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'review'] });
    }
  });

  const handleAction = (id, uiAction, dbStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: uiAction }));
    statusMutation.mutate({ id, status: dbStatus });
  };

  const pendingCount = queue.length;

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">रिव्ह्यू क्यू</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">
            रिपोर्टर्सनी सादर केलेले लेख — मंजुरीसाठी प्रलंबित ({pendingCount})
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center font-poppins py-10">लोड होत आहे...</div>
      ) : queue.length === 0 ? (
        <div className="text-center font-poppins py-10 text-grey">रिव्ह्यूसाठी कोणतेही लेख प्रलंबित नाहीत.</div>
      ) : queue.map((item) => {
        const status = statuses[item.id];
        return (
          <div
            key={item.id}
            className="review-card-inner bg-white rounded-[10px] p-5 shadow-sm mb-3.5 flex gap-4 transition-all"
          >
            <img
              src={item.image ? getMediaUrl(item.image) : item.image_type ? getMediaUrl(`/posts/${item.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'}
              alt={item.title}
              className="w-[120px] h-[90px] object-cover rounded-[6px] flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-tiro text-[18px] text-ink mb-1.5">{item.title}</h3>
              <div className="font-poppins text-[11.5px] text-grey mb-2.5">{item.authorName} • {new Date(item.createdAt).toLocaleDateString('mr-IN')}</div>
              <div className="font-mukta text-sm text-[#5a4c3a] leading-relaxed mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.content }} />

              {status ? (
                <div
                  className="font-poppins text-[13px] font-semibold p-3.5 rounded-lg inline-block"
                  style={
                    status === 'approved'
                      ? { background: '#e8f5e9', color: '#2e7d4f' }
                      : status === 'changes'
                      ? { background: '#fff8e1', color: 'var(--amber)' }
                      : { background: '#ffebee', color: 'var(--maroon)' }
                  }
                >
                  {status === 'approved' && <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> लेख मंजूर करून यशस्वीरित्या प्रकाशित केला आहे!</span>}
                  {status === 'changes' && <span className="flex items-center gap-1.5"><AlertTriangle size={16} /> बदल सुचवले आहेत; लेख दुरुस्तीसाठी रिपोर्टरकडे पाठवला आहे.</span>}
                  {status === 'rejected' && <span className="flex items-center gap-1.5"><XCircle size={16} /> लेख नाकारला गेला आहे.</span>}
                </div>
              ) : (
                <div className="flex gap-2.5 flex-wrap">
                  <button
                    onClick={() => handleAction(item.id, 'approved', 'PUBLISHED')}
                    disabled={statusMutation.isPending}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5"
                    style={{ background: '#2e7d4f' }}
                  >
                    <CheckCircle2 size={15} /> मंजूर करा व प्रकाशित करा
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'changes', 'DRAFT')}
                    disabled={statusMutation.isPending}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'var(--amber)' }}
                  >
                    बदल सुचवा (ड्राफ्टमध्ये पाठवा)
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'rejected', 'DRAFT')}
                    disabled={statusMutation.isPending}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] border-[1.5px] border-maroon text-maroon bg-transparent transition-all hover:bg-maroon hover:text-white disabled:opacity-50"
                  >
                    नाकारा (ड्राफ्टमध्ये पाठवा)
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
