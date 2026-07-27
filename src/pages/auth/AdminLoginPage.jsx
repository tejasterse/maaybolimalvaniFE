import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import apiClient from '../../api/apiClient.js';
import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      toast.success('लॉगिन यशस्वी!');
      window.location.href = '/admin';
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'चुकीचा ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.';
      setError(msg);
      toast.error(msg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password: pass });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--navy)' }}
    >
      {/* Brand */}
      <div className="text-center mb-8 flex flex-col items-center">
        <img src="/logo.png" alt="मायबोली मालवणी" className="h-[120px] object-contain mb-3 drop-shadow-lg" />
        <div
          className="inline-block font-poppins text-[11px] font-bold uppercase tracking-[.15em] px-4 py-1 rounded-full"
          style={{ background: 'var(--gold)', color: 'var(--navy)' }}
        >
          ADMIN PANEL
        </div>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl w-full max-w-[420px] overflow-hidden"
        style={{ background: 'var(--navy-light)', boxShadow: '0 8px 40px rgba(0,0,0,.4)', border: '1.5px solid rgba(255,255,255,.1)' }}
      >
        {/* Card Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: 'var(--maroon-deep)', borderBottom: '3px solid var(--gold)' }}
        >
          <div className="font-poppins text-[12px] font-semibold text-gold-light uppercase tracking-[.12em]">
            सुरक्षित प्रवेश
          </div>
          <div className="font-tiro text-[22px] text-white mt-1">
            Admin / संपादक लॉगिन
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7">
          {error && (
            <div
              className="font-poppins text-[12.5px] text-white px-4 py-3 rounded-lg mb-4 flex items-center gap-2"
              style={{ background: 'var(--maroon)' }}
            >
              <AlertTriangle size={15} /> <span>{error}</span>
            </div>
          )}

          <div className="mb-5">
            <label className="block font-poppins text-[11.5px] mb-1.5 font-semibold" style={{ color: '#9fb0c2' }}>
              ईमेल पत्ता
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@maayboli.in"
              required
              className="w-full px-4 py-3 rounded-lg font-poppins text-[14px] text-white outline-none transition-all"
              style={{
                border: '1.5px solid rgba(255,255,255,.15)',
                background: 'rgba(255,255,255,.07)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,.15)')}
            />
          </div>

          <div className="mb-6">
            <label className="block font-poppins text-[11.5px] mb-1.5 font-semibold" style={{ color: '#9fb0c2' }}>
              पासवर्ड
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg font-poppins text-[14px] text-white outline-none transition-all"
              style={{
                border: '1.5px solid rgba(255,255,255,.15)',
                background: 'rgba(255,255,255,.07)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,.15)')}
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full font-poppins font-bold text-[14px] py-3.5 rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: 'var(--gold)',
              color: 'var(--navy)',
            }}
          >
            {loginMutation.isPending ? 'प्रतीक्षा करा...' : <span className="flex items-center justify-center">Admin म्हणून प्रवेश करा <ArrowRight size={14} className="ml-1" /></span>}
          </button>

          {/* Demo hint */}
          <div
            className="mt-5 px-4 py-3 rounded-lg font-poppins text-[11.5px] leading-relaxed"
            style={{ background: 'rgba(255,255,255,.06)', color: '#9fb0c2', border: '1px solid rgba(255,255,255,.1)' }}
          >
            <b style={{ color: 'var(--gold-light)' }}>डेमो:</b> admin@maayboli.in / malvan@2026
          </div>
        </form>
      </div>

      {/* User reader link */}
      <div className="mt-6 flex items-center gap-3">
        <span className="font-poppins text-[12.5px]" style={{ color: '#9fb0c2' }}>वाचक आहात?</span>
        <button
          onClick={() => navigate('/')}
          className="font-poppins font-semibold text-[12.5px] px-4 py-1.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,.1)', color: '#E8C169', border: '1.5px solid rgba(255,255,255,.2)' }}
        >
          वाचक लॉगिन <ArrowRight size={14} className="inline ml-1" />
        </button>
      </div>

      <div className="mt-8 font-poppins text-[11px] text-center" style={{ color: '#5a7090' }}>
        © २०२६ मायबोली मालवणी · केवळ अधिकृत कर्मचाऱ्यांसाठी
      </div>
    </div>
  );
}
