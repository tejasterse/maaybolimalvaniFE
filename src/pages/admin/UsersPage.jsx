import { useState } from 'react';
import { users } from '../../constants/data.jsx';
import { CheckCircle2, Clock } from 'lucide-react';

const roleColors = {
  admin: { bg: 'var(--maroon)', color: '#fbe8c9' },
  editor: { bg: 'var(--teal)', color: '#fff' },
  reporter: { bg: '#F6F1E6', color: 'var(--grey)' },
};

export default function UsersPage() {
  const [members, setMembers] = useState(users);

  // Custom modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState('reporter');

  // Edit/Manage role modal states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [newRoleVal, setNewRoleVal] = useState('reporter');

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;

    let role = 'Reporter';
    if (roleInput === 'admin') role = 'Admin';
    else if (roleInput === 'editor') role = 'Editor';

    const newMember = {
      name: nameInput.trim(),
      email: emailInput.trim(),
      role,
      roleKey: roleInput,
      joined: 'आत्ताच',
      status: '⏳ आमंत्रण प्रलंबित',
      action: 'पुन्हा पाठवा',
    };

    setMembers([...members, newMember]);
    setShowInviteModal(false);
    setNameInput('');
    setEmailInput('');
    setRoleInput('reporter');
  };

  const handleActionClick = (m) => {
    if (m.action === 'पुन्हा पाठवा') {
      alert(`${m.name} ला पुन्हा आमंत्रण ईमेल पाठवला गेला आहे!`);
    } else {
      setActiveMember(m);
      setNewRoleVal(m.roleKey);
      setShowRoleModal(true);
    }
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (!activeMember) return;

    const updated = members.map((x) => {
      if (x.email === activeMember.email) {
        let role = 'Reporter';
        if (newRoleVal === 'admin') role = 'Admin';
        else if (newRoleVal === 'editor') role = 'Editor';
        return { ...x, role, roleKey: newRoleVal };
      }
      return x;
    });

    setMembers(updated);
    setShowRoleModal(false);
    setActiveMember(null);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">युजर्स व भूमिका</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">टीम मेंबर्स व त्यांची भूमिका ({members.length})</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] nav-transition hover:opacity-95"
          style={{ background: 'var(--maroon)' }}
        >
          + युजर आमंत्रित करा
        </button>
      </div>

      <div className="overflow-hidden rounded-[10px] shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#F6F1E6' }}>
              {['नाव', 'ईमेल', 'भूमिका', 'सामील झाले', 'स्थिती', ''].map((h) => (
                <th key={h} className="font-poppins text-[11px] uppercase tracking-[.06em] text-grey text-left px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((u) => (
              <tr key={u.email} style={{ borderTop: '1px solid var(--line)' }}>
                <td className="font-poppins text-[14px] font-semibold text-ink px-4 py-3.5">{u.name}</td>
                <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{u.email}</td>
                <td className="px-4 py-3.5">
                  <span
                    className="font-poppins text-[10.5px] font-bold px-3 py-1 rounded-[14px]"
                    style={roleColors[u.roleKey]}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{u.joined}</td>
                <td className="font-poppins text-[12px] text-grey px-4 py-3.5">
                  {u.status.includes('सक्रिय') ? (
                    <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                      <CheckCircle2 size={13} className="text-green-600" /> {u.status.replace('🟢 ', '')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
                      <Clock size={13} className="text-amber-500" /> {u.status.replace('⏳ ', '')}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => handleActionClick(u)}
                    className="font-poppins text-[12px] text-teal font-semibold hover:underline"
                  >
                    {u.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-[400px] w-full p-6 mx-4 animate-scale-up">
            <h2 className="font-tiro text-[20px] text-maroon-deep mb-4 font-semibold">नवीन युजर आमंत्रित करा</h2>
            <form onSubmit={handleInviteSubmit}>
              <div className="mb-4">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">नाव</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. विलास साळवी"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>
              <div className="mb-4">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">ईमेल पत्ता</label>
                <input
                  type="email"
                  required
                  placeholder="उदा. vilas@maayboli.in"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal"
                />
              </div>
              <div className="mb-5">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">भूमिका</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal bg-white cursor-pointer"
                >
                  <option value="reporter">Reporter</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-grey border border-line hover:bg-grey-light transition-colors"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors"
                  style={{ background: 'var(--maroon)' }}
                >
                  आमंत्रित करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-[400px] w-full p-6 mx-4 animate-scale-up">
            <h2 className="font-tiro text-[20px] text-maroon-deep mb-4 font-semibold">{activeMember?.name} ची भूमिका बदला</h2>
            <form onSubmit={handleRoleSubmit}>
              <div className="mb-5">
                <label className="block font-poppins text-[12px] text-grey mb-1.5 font-semibold">भूमिका</label>
                <select
                  value={newRoleVal}
                  onChange={(e) => setNewRoleVal(e.target.value)}
                  className="w-full px-3.5 py-2 border border-line rounded-lg font-poppins text-[13px] outline-none focus:border-teal bg-white cursor-pointer"
                >
                  <option value="reporter">Reporter</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-grey border border-line hover:bg-grey-light transition-colors"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-poppins text-[13px] text-[#fbe8c9] transition-colors"
                  style={{ background: 'var(--maroon)' }}
                >
                  जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
