import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ToggleSwitch from '../../components/admin/ToggleSwitch.jsx';

export default function SettingsPage() {
  const [tickerOn, setTickerOn] = useState(true);
  const [broadcastOn, setBroadcastOn] = useState(true);
  const [pushOn, setPushOn] = useState(false);
  const [tickerText, setTickerText] = useState(
    'सिंधुदुर्ग किल्ल्यावर आज पर्यटकांची विक्रमी गर्दी\nकणकवलीत उद्या वीजपुरवठा खंडित राहणार\nमालवण बंदरात नवीन मासळी लिलाव केंद्र सुरू'
  );
  const [waLink, setWaLink] = useState('wa.me/channel/maayboli-malvani');
  const [tagline, setTagline] = useState('कोकणाचा आवाज · मालवणी अभिमान');
  const [email, setEmail] = useState('team@maayboli.in');

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Box = ({ title, children }) => (
    <div className="bg-white rounded-[10px] p-5 shadow-sm mb-4">
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

  const inputCls = 'w-full px-3 py-2.5 border border-line rounded-[6px] font-mukta text-sm';
  const toggleRow = (label, val, setter, noBorder) => (
    <div
      className="flex items-center justify-between py-2.5"
      style={noBorder ? {} : { borderTop: '1px solid var(--line)' }}
    >
      <span className="font-poppins text-[13px] text-ink">{label}</span>
      <ToggleSwitch on={val} onToggle={() => setter(!val)} />
    </div>
  );

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
          <CheckCircle2 size={16} /> <span>बदल यशस्वीरित्या जतन केले आहेत!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Box title="ब्रेकिंग न्यूज टिकर">
            <Field label="टिकरमध्ये दाखवायचे लेख (कमाल ३)">
              <textarea
                className={inputCls}
                style={{ minHeight: 70, resize: 'vertical' }}
                value={tickerText}
                onChange={(e) => setTickerText(e.target.value)}
              />
            </Field>
            {toggleRow('टिकर सक्रिय आहे', tickerOn, setTickerOn, true)}
          </Box>
          <Box title="होमपेज फीचर्ड STORY">
            <Field label="मुख्य फीचर्ड लेख निवडा">
              <select className="w-full px-3 py-2.5 border border-line rounded-[6px] font-poppins text-[13px] text-ink">
                <option>सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी</option>
                <option>ग्रामपंचायत निवडणुकीची घोषणा</option>
              </select>
            </Field>
          </Box>
        </div>
        <div>
          <Box title="WhatsApp / नोटिफिकेशन ब्रॉडकास्ट">
            <Field label="WhatsApp चॅनल लिंक">
              <input
                type="text"
                className={inputCls}
                value={waLink}
                onChange={(e) => setWaLink(e.target.value)}
              />
            </Field>
            {toggleRow('ब्रेकिंग न्यूजसाठी स्वयं-ब्रॉडकास्ट', broadcastOn, setBroadcastOn, true)}
            {toggleRow('रीडर्ससाठी पुश नोटिफिकेशन', pushOn, setPushOn)}
          </Box>
          <Box title="साईट माहिती">
            <Field label="साईट टॅगलाईन">
              <input type="text" className={inputCls} value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </Field>
            <Field label="संपर्क ईमेल">
              <input type="text" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </Box>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] mt-2 nav-transition"
        style={{ background: 'var(--maroon)' }}
      >
        बदल जतन करा
      </button>
    </div>
  );
}
