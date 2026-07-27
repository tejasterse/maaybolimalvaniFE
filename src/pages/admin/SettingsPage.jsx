import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSettings, updateSettings } from '../../api/settings.js';
import ToggleSwitch from '../../components/admin/ToggleSwitch.jsx';

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    site_name: 'मायबोली मालवणी',
    tagline: 'कोकणाचा आवाज · मालवणी अभिमान',
    ticker: 'सिंधुदुर्ग किल्ल्यावर आज पर्यटकांची विक्रमी गर्दी',
    whatsapp: 'wa.me/channel/maayboli-malvani',
    email: 'team@maayboli.in',
    phone: '',
    facebook: '',
    instagram: '',
    youtube: '',
    footer: '',
    seo_title: 'मायबोली मालवणी',
    seo_description: '',
    maintenance_mode: false
  });

  const [saved, setSaved] = useState(false);

  const { data: settingsData } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings
  });

  useEffect(() => {
    if (settingsData) {
      setFormData((prev) => ({
        ...prev,
        ...settingsData
      }));
    }
  }, [settingsData]);

  const saveMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const Box = ({ title, children }) => (
    <div className="bg-white rounded-[10px] p-5 shadow-sm mb-4 border border-line">
      <h3 className="font-poppins text-[13px] font-bold text-maroon-deep mb-4 uppercase tracking-[.05em]">{title}</h3>
      {children}
    </div>
  );

  const Field = ({ label, children }) => (
    <div className="mb-4">
      <label className="block font-poppins text-[11.5px] text-grey mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inputCls = 'w-full px-3 py-2.5 border border-line rounded-[6px] font-mukta text-sm outline-none focus:border-amber-500';

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">सेटिंग्ज</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">साईट सेटिंग्ज व सूचना</p>
        </div>
      </div>

      {saved && (
        <div
          className="font-poppins text-[13.5px] text-white px-4 py-3 rounded-lg mb-5 transition-opacity duration-300 flex items-center gap-2"
          style={{ background: '#2e7d4f' }}
        >
          <CheckCircle2 size={16} /> सेटिंग्ज यशस्वीरीत्या जतन केल्या गेल्या!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Box title="सामान्य सेटिंग्ज">
          <Field label="पोर्टलचे नाव">
            <input
              type="text"
              value={formData.site_name}
              onChange={(e) => handleChange('site_name', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="टॅगलाईन">
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="ब्रेकिंग न्यूज टिकर मजकूर">
            <textarea
              rows={3}
              value={formData.ticker || ''}
              onChange={(e) => handleChange('ticker', e.target.value)}
              className={inputCls}
            />
          </Field>
        </Box>

        <Box title="संपर्क व सोशल मीडिया">
          <Field label="व्हॉट्सॲप चॅनल लिंक">
            <input
              type="text"
              value={formData.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="अधिकृत ईमेल">
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="संपर्क फोन">
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={inputCls}
            />
          </Field>
        </Box>

        <Box title="सिस्टम मोड्स">
          <div className="flex items-center justify-between py-2.5">
            <span className="font-poppins text-[13px] text-ink">मेंटेनन्स मोड (Maintenance Mode)</span>
            <ToggleSwitch
              on={formData.maintenance_mode}
              onToggle={() => handleChange('maintenance_mode', !formData.maintenance_mode)}
            />
          </div>
        </Box>

        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="font-poppins font-bold text-[14px] px-8 py-3 rounded-lg text-white shadow-md transition-all"
          style={{ background: 'var(--maroon)' }}
        >
          {saveMutation.isPending ? 'जतन करत आहे...' : 'सेटिंग्ज जतन करा'}
        </button>
      </form>
    </div>
  );
}
