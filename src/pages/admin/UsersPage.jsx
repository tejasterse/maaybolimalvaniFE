import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { fetchUsers, createUser, updateUserRole, updateUserStatus, deleteUser } from '../../api/users.js';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [roleInput, setRoleInput] = useState('USER');

  // Edit role modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [newRoleVal, setNewRoleVal] = useState('USER');

  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers({ limit: 100 })
  });

  const members = usersData?.users || [];

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setShowInviteModal(false);
      setNameInput('');
      setEmailInput('');
      setPhoneInput('');
      toast.success('नवीन वापरकर्ता यशस्वीरित्या जोडला गेला!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setShowRoleModal(false);
      toast.success('वापरकर्त्याची भूमिका अपडेट केली!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('वापरकर्ता स्थिती अपडेट केली!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('वापरकर्ता काढून टाकला!');
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message)
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    createUserMutation.mutate({
      name: nameInput.trim(),
      email: emailInput.trim(),
      phone: phoneInput.trim(),
      password: passwordInput,
      role: roleInput
    });
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (!activeMember) return;
    updateRoleMutation.mutate({ id: activeMember.id, role: newRoleVal });
  };

  return (
    <div>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-tiro text-[24px] text-ink font-bold">वापरकर्ते आणि भूमिका व्यवस्थापन</h1>
          <p className="font-poppins text-[13px] text-grey">सिंहावलोकन आणि सदस्य हक्क नियंत्रण</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="font-poppins font-semibold text-[13.5px] px-4 py-2.5 rounded-[8px] cursor-pointer"
          style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
        >
          + नवीन वापरकर्ता जोडा
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 font-poppins text-grey">वापरकर्ते लोड होत आहेत...</div>
      ) : isError ? (
        <div className="text-center py-12 font-poppins text-red-500">वापरकर्ते लोड करताना त्रुटी आली.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-line overflow-x-auto">
          <table className="w-full text-left font-poppins text-[13.5px]">
            <thead className="bg-[#FAF9F5] border-b border-line text-grey uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-3 px-4">नाव / ईमेल</th>
                <th className="py-3 px-4">भूमिका</th>
                <th className="py-3 px-4">फोन</th>
                <th className="py-3 px-4">स्थिती</th>
                <th className="py-3 px-4 text-right">कृती</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {members.map((u) => (
                <tr key={u.id} className="hover:bg-amber-50/20">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-ink">{u.name}</div>
                    <div className="text-[12px] text-grey">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-teal">{u.roleName || 'USER'}</td>
                  <td className="py-3.5 px-4 text-grey">{u.phone || '-'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${u.status === 'INACTIVE' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {u.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setActiveMember(u);
                        setNewRoleVal(u.roleName || 'USER');
                        setShowRoleModal(true);
                      }}
                      className="text-teal hover:underline font-semibold"
                    >
                      भूमिका बदला
                    </button>
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: u.id, status: u.status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE' })}
                      className="text-amber-600 hover:underline font-semibold"
                    >
                      {u.status === 'INACTIVE' ? 'सक्रिय करा' : 'निष्क्रिय करा'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`नक्की ${u.name} ला हटवायचे आहे का?`)) {
                          deleteUserMutation.mutate(u.id);
                        }
                      }}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      हटवा
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="font-tiro text-xl font-bold text-ink mb-4">नवीन वापरकर्ता जोडा</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-4 font-poppins text-sm">
              <div>
                <label className="block text-grey mb-1">नाव</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-grey mb-1">ईमेल</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-grey mb-1">फोन (पर्यायी)</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-grey mb-1">संकेतशब्द (Password)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label={showPassword ? 'पासवर्ड लपवा' : 'पासवर्ड दाखवा'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-grey mb-1">भूमिका (Role)</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="READER">READER</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-4 py-2 bg-maroon text-white font-bold rounded-lg"
                >
                  {createUserMutation.isPending ? 'जतन करत आहे...' : 'जतन करा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && activeMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="font-tiro text-xl font-bold text-ink mb-4">{activeMember.name} ची भूमिका बदला</h3>
            <form onSubmit={handleRoleSubmit} className="space-y-4 font-poppins text-sm">
              <div>
                <label className="block text-grey mb-1">नवी भूमिका</label>
                <select
                  value={newRoleVal}
                  onChange={(e) => setNewRoleVal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="READER">READER</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  disabled={updateRoleMutation.isPending}
                  className="px-4 py-2 bg-teal text-white font-bold rounded-lg"
                >
                  अपडेट करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
