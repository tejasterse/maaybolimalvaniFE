import { useState } from 'react';
import { X, User, Phone, Mail, MapPin, FileText, Send, CheckCircle2 } from 'lucide-react';
import { applyForReporter } from '../../api/reporters.js';
import toast from 'react-hot-toast';

const talukaOptions = ['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'वैभववाडी', 'दोडामार्ग'];

export default function ReporterRegistrationModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [taluka, setTaluka] = useState('मालवण');
  const [experience, setExperience] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !email.trim()) {
      toast.error('कृपया नाव, मोबाईल नंबर आणि ई-मेल पत्ता अनिवार्यपणे भरा.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await applyForReporter({
        name,
        mobile,
        email,
        taluka,
        experience
      });
      setSuccessMsg(res.message || 'तुमची माहिती यशस्वीरित्या जतन झाली आहे. आम्ही तुमच्याशी लवकरच संपर्क साधू!');
      toast.success('अर्ज यशस्वीरित्या सादर झाला!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'अर्ज सादर करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessMsg(null);
    setName('');
    setMobile('');
    setEmail('');
    setExperience('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      style={{ background: 'rgba(10, 25, 41, 0.85)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-[550px] w-full overflow-hidden shadow-2xl border border-gold/40 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy text-white px-6 py-5 flex items-center justify-between border-b-2 border-gold">
          <div>
            <h3 className="font-tiro text-[22px] font-bold text-gold-light">
              प्रतिनिधी / रिपोर्टर नोंदणी अर्ज
            </h3>
            <p className="font-poppins text-[12px] text-gray-300 mt-0.5">
              सिंधुदुर्ग जिल्हा वार्ताहर नोंदणी फॉर्म
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#9fb0c2] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successMsg ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={38} />
              </div>
              <h4 className="font-tiro text-[22px] font-bold text-navy">
                धन्यवाद!
              </h4>
              <p className="font-mukta text-[16px] text-gray-700 max-w-[420px] mx-auto leading-relaxed bg-amber-50 p-4 rounded-xl border border-gold/40">
                {successMsg}
              </p>
              <button
                onClick={handleClose}
                className="mt-4 font-poppins font-semibold text-[13px] px-8 py-2.5 rounded-xl bg-navy text-white hover:bg-navy-light transition-colors shadow-md"
              >
                बंद करा
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block font-poppins text-[12.5px] font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-teal" /> तुमचे पूर्ण नाव (Full Name)*
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. संतोष शांताराम मुळीक"
                  className="w-full px-3.5 py-2.5 border border-line rounded-xl font-mukta text-[15px] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              {/* Mobile & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-[12.5px] font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                    <Phone size={14} className="text-teal" /> मोबाईल नंबर (Mobile)*
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="१० अंकी मोबाईल नंबर"
                    className="w-full px-3.5 py-2.5 border border-line rounded-xl font-mukta text-[15px] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-[12.5px] font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} className="text-teal" /> ई-मेल पत्ता (Email)*
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full px-3.5 py-2.5 border border-line rounded-xl font-mukta text-[15px] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                  />
                </div>
              </div>

              {/* Taluka Dropdown */}
              <div>
                <label className="block font-poppins text-[12.5px] font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                  <MapPin size={14} className="text-teal" /> तुमचा तालुका (Taluka)*
                </label>
                <select
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-line rounded-xl font-poppins text-[13.5px] bg-white text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal cursor-pointer"
                >
                  {talukaOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Experience / Message */}
              <div>
                <label className="block font-poppins text-[12.5px] font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                  <FileText size={14} className="text-teal" /> पत्रकारिता अनुभव / संदेश (Optional)
                </label>
                <textarea
                  rows="3"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="पत्रकारितेचा अनुभव असल्यास नमूद करा किंवा काही विशेष संदेश लिहा..."
                  className="w-full px-3.5 py-2.5 border border-line rounded-xl font-mukta text-[14.5px] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-poppins font-bold text-[14px] py-3 px-6 rounded-xl text-white bg-gradient-to-r from-teal to-navy hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    'माहिती जतन होत आहे...'
                  ) : (
                    <>
                      <Send size={16} /> अर्ज सादर करा (Submit Registration)
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
