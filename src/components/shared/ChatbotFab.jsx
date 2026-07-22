import { useNavigate } from 'react-router-dom';

// Chatbot floating action button
export default function ChatbotFab() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/chatbot')}
      className="fixed bottom-6 right-6 font-poppins font-semibold text-[13.5px] px-5 py-3.5 rounded-[30px] flex items-center gap-2.5 cursor-pointer z-40"
      style={{
        background: 'var(--navy)',
        color: '#fbe8c9',
        boxShadow: '0 8px 24px rgba(14,42,71,.35)',
        border: '2px solid var(--gold)',
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold"
        style={{ background: 'var(--gold)', color: 'var(--navy)' }}
      >
        ✓
      </span>
      मायबोली AI ला विचारा
    </div>
  );
}
