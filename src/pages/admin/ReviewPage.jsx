import { useState } from 'react';
import { reviewQueue } from '../../constants/data.jsx';

export default function ReviewPage() {
  const [queue, setQueue] = useState(reviewQueue);
  const [statuses, setStatuses] = useState({}); // { itemId: 'approved' | 'changes' | 'rejected' }

  const handleAction = (id, action) => {
    setStatuses((prev) => ({ ...prev, [id]: action }));
  };

  const pendingCount = queue.filter(item => !statuses[item.id]).length;

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

      {queue.map((item) => {
        const status = statuses[item.id];
        return (
          <div
            key={item.id}
            className="review-card-inner bg-white rounded-[10px] p-5 shadow-sm mb-3.5 flex gap-4 transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[120px] h-[90px] object-cover rounded-[6px] flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-tiro text-[18px] text-ink mb-1.5">{item.title}</h3>
              <div className="font-poppins text-[11.5px] text-grey mb-2.5">{item.meta}</div>
              <div className="font-mukta text-sm text-[#5a4c3a] leading-relaxed mb-3">{item.excerpt}</div>

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
                  {status === 'approved' && '✓ लेख मंजूर करून यशस्वीरित्या प्रकाशित केला आहे!'}
                  {status === 'changes' && '⚠️ बदल सुचवले आहेत; लेख दुरुस्तीसाठी रिपोर्टरकडे पाठवला आहे.'}
                  {status === 'rejected' && '❌ लेख नाकारला गेला आहे.'}
                </div>
              ) : (
                <div className="flex gap-2.5 flex-wrap">
                  <button
                    onClick={() => handleAction(item.id, 'approved')}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] text-white transition-all hover:opacity-90"
                    style={{ background: '#2e7d4f' }}
                  >
                    ✓ मंजूर करा व प्रकाशित करा
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'changes')}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--amber)' }}
                  >
                    बदल सुचवा
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'rejected')}
                    className="font-poppins font-semibold text-[13px] px-4 py-2 rounded-[7px] border-[1.5px] border-maroon text-maroon bg-transparent transition-all hover:bg-maroon hover:text-white"
                  >
                    नाकारा
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
