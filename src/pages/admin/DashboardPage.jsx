import { useNavigate } from 'react-router-dom';
import { Pen, Image as ImageIcon, CheckSquare } from 'lucide-react';
import { activities } from '../../constants/data.jsx';

const stats = [
  { color: 'var(--maroon)', label: 'या आठवड्यात', num: '१८', desc: 'प्रकाशित लेख' },
  { color: 'var(--grey)',   label: 'प्रलंबित',     num: '५',   desc: 'ड्राफ्ट्स' },
  { color: 'var(--amber)',  label: 'प्रतीक्षेत',   num: '३',   desc: 'रिव्ह्यूसाठी प्रलंबित' },
  { color: 'var(--teal)',   label: 'AI बॉट',       num: '२४२', desc: 'या आठवड्यातील प्रश्न' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const quickActions = [
    { label: <><Pen size={14} className="inline mr-1" /> नवीन लेख लिहा</>,          action: 'articles' },
    { label: <><ImageIcon size={14} className="inline mr-1" /> फोटो/व्हिडिओ अपलोड करा</>, action: 'media' },
    { label: <><CheckSquare size={14} className="inline mr-1" /> रिव्ह्यू क्यू तपासा (३)</>,  action: 'review' },
  ];

  return (
    <div>
      {/* Page Head */}
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[24px] md:text-[26px] text-maroon-deep">डॅशबोर्ड</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">शनिवार, १८ जुलै २०२६ — आजचा आढावा</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {stats.map((s) => (
          <div key={s.desc} className="bg-white rounded-[10px] p-4 shadow-sm">
            <span
              className="flag-tag inline-block font-poppins text-[10px] font-bold text-white px-3 py-1 mb-3"
              style={{ background: s.color }}
            >
              {s.label}
            </span>
            <div className="font-tiro text-[28px] md:text-[32px] text-ink">{s.num}</div>
            <div className="font-poppins text-[11px] text-grey mt-1">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Dash Grid */}
      <div className="dash-grid grid gap-5" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        {/* Recent Activity */}
        <div className="bg-white rounded-[10px] p-5 shadow-sm">
          <h2 className="font-poppins text-sm font-semibold text-ink mb-4">अलीकडील घडामोडी</h2>
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex gap-3 py-3"
              style={{ borderBottom: i < activities.length - 1 ? '1px solid var(--line)' : 'none' }}
            >
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-poppins text-[11.5px] font-bold flex-shrink-0 text-white"
                style={{ background: 'var(--teal)' }}
              >
                {a.initials}
              </div>
              <div>
                <div className="font-mukta text-sm leading-snug text-ink">{a.text}</div>
                <div className="font-poppins text-[10.5px] text-grey mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[10px] p-5 shadow-sm">
          <h2 className="font-poppins text-sm font-semibold text-ink mb-4">पटकन सुरू करा</h2>
          {quickActions.map(({ label, action }) => (
            <button
              key={label}
              onClick={() => navigate(action === 'articles' ? '/admin/articles' : `/admin/${action}`)}
              className="block w-full text-left font-poppins font-semibold text-[13px] text-maroon-deep px-4 py-4 rounded-lg mb-3 border border-dashed border-gold nav-transition hover:bg-maroon hover:text-[#fbe8c9]"
              style={{ background: 'var(--cream)' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
