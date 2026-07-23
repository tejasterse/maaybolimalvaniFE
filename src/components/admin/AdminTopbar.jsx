import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';

export default function AdminTopbar({ onMenuToggle }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white flex items-center justify-between px-4 md:px-7 py-3 flex-shrink-0"
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      {/* Mobile hamburger */}
      <button
        className="md:hidden text-[20px] text-ink mr-3"
        onClick={onMenuToggle}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div
        className="font-poppins text-[13px] text-grey rounded-lg px-4 py-2 flex-1 max-w-[320px] flex items-center gap-2"
        style={{ background: '#F6F1E6' }}
      >
        <Search size={14} className="sm:hidden" />
        <span className="hidden sm:inline">लेख, टॅग किंवा लेखक शोधा…</span>
        <span className="sm:hidden">शोधा…</span>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="text-[18px] text-grey relative cursor-pointer">
          <Bell size={20} />
          <span
            className="absolute -top-0.5 -right-1 w-[7px] h-[7px] rounded-full"
            style={{ background: 'var(--maroon)' }}
          />
        </div>
        <button
          onClick={() => navigate('/admin/articles/new')}
          className="font-poppins font-semibold text-[12px] md:text-[13px] px-3 md:px-[18px] py-2 md:py-2.5 rounded-[7px] text-[#fbe8c9] whitespace-nowrap"
          style={{ background: 'var(--maroon)' }}
        >
          <span className="hidden sm:inline">+ नवीन लेख</span>
          <span className="sm:hidden">+ लेख</span>
        </button>
      </div>
    </div>
  );
}
