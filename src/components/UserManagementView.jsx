import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, Edit3, Trash2, Check, Lock } from 'lucide-react';

export default function UserManagementView() {
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('core_user_management_list');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'USR-01', name: 'Kang Fahmi', email: 'fahmi@coreproject.com', password: '123', role: 'Owner / BOS JOW', division: 'Executive', status: 'Aktif' },
      { id: 'USR-02', name: 'Kodar', email: 'kodar@coreproject.com', password: '123', role: 'Staff Produksi', division: 'Div. Produksi', status: 'Aktif' },
      { id: 'USR-03', name: 'Sahrul', email: 'sahrul@coreproject.com', password: '123', role: 'Staff Office', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-04', name: 'Nita', email: 'nita@coreproject.com', password: '123', role: 'Staff Office & Admin', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-05', name: 'Bani', email: 'bani@coreproject.com', password: '123', role: 'Staff Office & Operasional', division: 'Div. Office', status: 'Aktif' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_user_management_list', JSON.stringify(usersList));
  }, [usersList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '', name: '', email: '', password: '123', role: 'Staff Produksi', division: 'Div. Produksi', status: 'Aktif'
  });

  const divisions = ['Executive', 'Div. Produksi', 'Div. Office', 'Tim Design', 'Div. Marketing', 'Mitra'];

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentUser({
      id: 'USR-' + Date.now(),
      name: '',
      email: '',
      password: 'core' + Math.floor(100 + Math.random() * 900), // Password awal otomatis dari BOS
      role: 'Staff Produksi',
      division: 'Div. Produksi',
      status: 'Aktif'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentUser.name || !currentUser.email) return;

    if (isEditMode) {
      setUsersList(usersList.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      setUsersList([currentUser, ...usersList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus akses pengguna ini dari sistem?')) {
      setUsersList(usersList.filter(u => u.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Aktif' ? 'Non-Aktif' : 'Aktif' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">⭐ Fitur Premier BOS JOW</span>
            <h2 className="text-xl font-bold text-white mt-1">Manajemen Akun Pengguna & Password Awal</h2>
            <p className="text-slate-400 text-xs">BOS memberikan password awal saat pembuatan akun, dan staf dapat mengubah password secara mandiri.</p>
          </div>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Tambah Akun & Password Awal
        </button>
      </div>

      {/* TABEL USERS */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Daftar Akun Pengguna ({usersList.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Nama & Email</th>
                <th className="px-4 py-3">Password Awal / Aktif</th>
                <th className="px-4 py-3">Divisi & Role</th>
                <th className="px-4 py-3 text-center">Status Akses</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center border border-amber-500/40">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{user.name}</p>
                        <p className="text-[10px] text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-950 border border-slate-800 text-amber-300 rounded font-mono text-[11px] flex items-center gap-1.5 w-max">
                      <Lock className="w-3 h-3 text-amber-400" /> {user.password || '123'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-amber-300 border border-slate-700 font-semibold rounded text-[10px]">
                      {user.division}
                    </span>
                    <p className="text-slate-300 font-medium mt-0.5">{user.role}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] cursor-pointer transition-all ${user.status === 'Aktif' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center space-x-1">
                    <button onClick={() => handleOpenEdit(user)} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(user.id)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT USER */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun & Password Awal'}</h3>
            
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Lengkap</label>
              <input type="text" required placeholder="Contoh: Andi Pratama" value={currentUser.name} onChange={e => setCurrentUser({...currentUser, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Email / Username</label>
              <input type="email" required placeholder="andi@coreproject.com" value={currentUser.email} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Password Awal (Diberikan oleh BOS)</label>
              <input type="text" required placeholder="Contoh: core123" value={currentUser.password} onChange={e => setCurrentUser({...currentUser, password: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono font-bold" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Divisi</label>
                <select value={currentUser.division} onChange={e => setCurrentUser({...currentUser, division: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  {divisions.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Status Akses</label>
                <select value={currentUser.status} onChange={e => setCurrentUser({...currentUser, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Role / Jabatan</label>
              <input type="text" required placeholder="Staff Produksi / Tim Design" value={currentUser.role} onChange={e => setCurrentUser({...currentUser, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Akun</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
