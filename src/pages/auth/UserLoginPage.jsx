import { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function UserLoginPage({ onLogin, onGoAdmin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email.trim().toLowerCase() === 'reader@maayboli.in' && pass.trim() === 'kokan@2026') {
      onLogin('user');
    } else {
      setError('चुकीचा ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--cream)' }}
    >
      {/* Brand */}
      <div className="text-center mb-8 flex flex-col items-center">
        <img src="/logo.png" alt="मायबोली मालवणी" className="h-[120px] object-contain mb-3 drop-shadow-lg" />
        <div
          className="inline-block font-poppins text-[11px] font-bold uppercase tracking-[.15em] px-4 py-1 rounded-full"
          style={{ background: 'var(--gold)', color: 'var(--navy)' }}
        >
          कोकणाचा आवाज · मालवणी अभिमान
        </div>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-[400px] overflow-hidden"
        style={{ boxShadow: '0 8px 32px rgba(14,42,71,.12)' }}
      >
        {/* Card Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: 'var(--maroon)', borderBottom: '3px solid var(--gold)' }}
        >
          <div className="font-poppins text-[13px] font-semibold text-[#fbe8c9] uppercase tracking-[.1em]">
            वाचक लॉगिन
          </div>
          <div className="font-tiro text-[22px] text-white mt-1">
            आपल्या खात्यात प्रवेश करा
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7">
          {error && (
            <div
              className="font-poppins text-[12.5px] text-white px-4 py-3 rounded-lg mb-4 flex items-center gap-2"
              style={{ background: 'var(--amber)' }}
            >
              <AlertTriangle size={15} /> <span>{error}</span>
            </div>
          )}

          <div className="mb-5">
            <label className="block font-poppins text-[11.5px] text-grey mb-1.5 font-semibold">
              ईमेल पत्ता
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@maayboli.in"
              required
              className="w-full px-4 py-3 rounded-lg font-mukta text-[15px] text-ink outline-none transition-all"
              style={{
                border: '1.5px solid var(--line)',
                background: '#FDFAF4',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
            />
          </div>

          <div className="mb-6">
            <label className="block font-poppins text-[11.5px] text-grey mb-1.5 font-semibold">
              पासवर्ड
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg font-mukta text-[15px] text-ink outline-none transition-all"
              style={{
                border: '1.5px solid var(--line)',
                background: '#FDFAF4',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
            />
          </div>

          <button
            type="submit"
            className="w-full font-poppins font-bold text-[14px] py-3.5 rounded-lg transition-all hover:opacity-90"
            style={{
              background: 'var(--maroon)',
              color: '#fbe8c9',
            }}
          >
            लॉगिन करा <ArrowRight size={14} className="inline ml-1" />
          </button>

          {/* Demo hint */}
          <div
            className="mt-5 px-4 py-3 rounded-lg font-poppins text-[11.5px] leading-relaxed"
            style={{ background: '#F6F1E6', color: 'var(--teal)' }}
          >
            <b>डेमो:</b> reader@maayboli.in / kokan@2026
          </div>
        </form>
      </div>

      {/* Admin link */}
      <div className="mt-6 flex items-center gap-3">
        <span className="font-poppins text-[12.5px] text-grey">संपादक / Admin आहात?</span>
        <button
          onClick={onGoAdmin}
          className="font-poppins font-semibold text-[12.5px] px-4 py-1.5 rounded-lg border-[1.5px] border-teal text-teal bg-white"
        >
          Admin लॉगिन <ArrowRight size={14} className="inline ml-1" />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 font-poppins text-[11px] text-grey text-center">
        © २०२६ मायबोली मालवणी · सिंधुदुर्ग जिल्हा
      </div>
    </div>
  );
}
