import { useNavigate } from 'react';
import { Pen, Image as ImageIcon, CheckSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchDashboardActivity } from '../../api/dashboard.js';

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: fetchDashboardActivity
  });

  const statCards = [
    { color: 'var(--maroon)', label: 'प्रकाशित लेख', num: stats?.publishedPosts || 0, desc: 'एकूण प्रसिद्ध बातम्या' },
    { color: 'var(--amber)',  label: 'प्रलंबित/ड्राफ्ट', num: (stats?.draftPosts || 0) + (stats?.pendingReviews || 0), desc: 'तपासणीसाठी प्रलंबित' },
    { color: 'var(--teal)',   label: 'एकूण वापरकर्ते', num: stats?.totalUsers || 0, desc: 'नोंदणीकृत सदस्य' },
    { color: 'var(--navy)',   label: 'एकूण वाचक', num: stats?.totalViews || 0, desc: 'एकूण लेख वाचन' },
  ];

  return (
    <div>
      {/* Page Head */}
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[24px] md:text-[26px] text-maroon-deep">डॅशबोर्ड</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">
            {new Date().toLocaleDateString('mr-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — थेट आढावा
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-[10px] p-4 shadow-sm border border-line">
            <span
              className="flag-tag inline-block font-poppins text-[10px] font-bold text-white px-3 py-1 mb-3 rounded-md"
              style={{ background: s.color }}
            >
              {s.label}
            </span>
            <div className="font-tiro text-[28px] md:text-[32px] text-ink">{s.num}</div>
            <div className="font-poppins text-[11px] text-grey mt-1">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {/* Recent Activity */}
        <div className="md:col-span-2 bg-white rounded-[10px] p-5 shadow-sm border border-line">
          <h2 className="font-poppins text-sm font-semibold text-ink mb-4">अलीकडील प्रकाशित बातम्या</h2>
          {activityLoading ? (
            <div className="text-center py-6 font-poppins text-grey text-xs">लोड करत आहे...</div>
          ) : activityData?.latestPosts?.length === 0 ? (
            <div className="text-center py-6 font-poppins text-grey text-xs">कोणत्याही घडामोडी उपलब्ध नाहीत.</div>
          ) : (
            <div className="divide-y divide-line">
              {activityData?.latestPosts?.map((p) => (
                <div key={p.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-tiro text-[15px] font-bold text-ink">{p.title}</div>
                    <div className="font-poppins text-[11px] text-grey">लेखक: {p.author || 'प्रशासक'} • {new Date(p.createdAt).toLocaleDateString('mr-IN')}</div>
                  </div>
                  <span className="font-poppins text-[11px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links & Users */}
        <div className="space-y-5">
          <div className="bg-white rounded-[10px] p-5 shadow-sm border border-line">
            <h2 className="font-poppins text-sm font-semibold text-ink mb-3">जलद कृती</h2>
            <div className="space-y-2 font-poppins text-xs font-semibold">
              <button onClick={() => navigate('/admin/articles/new')} className="w-full text-left p-2.5 bg-amber-50 text-amber-900 rounded-lg hover:bg-amber-100 flex items-center gap-2">
                <Pen size={14} /> नवीन लेख लिहा
              </button>
              <button onClick={() => navigate('/admin/media')} className="w-full text-left p-2.5 bg-teal/10 text-teal rounded-lg hover:bg-teal/20 flex items-center gap-2">
                <ImageIcon size={14} /> फोटो/व्हिडिओ व्यवस्थापन
              </button>
              <button onClick={() => navigate('/admin/review')} className="w-full text-left p-2.5 bg-maroon/10 text-maroon rounded-lg hover:bg-maroon/20 flex items-center gap-2">
                <CheckSquare size={14} /> रिव्ह्यू क्यू तपासा
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[10px] p-5 shadow-sm border border-line">
            <h2 className="font-poppins text-sm font-semibold text-ink mb-3">नवीन सदस्य</h2>
            <div className="space-y-2">
              {activityData?.latestUsers?.map((u) => (
                <div key={u.id} className="font-poppins text-xs flex justify-between py-1 border-b border-line">
                  <span className="font-semibold text-ink">{u.name}</span>
                  <span className="text-grey">{u.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
