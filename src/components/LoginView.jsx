import React, { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Muat daftar user saat halaman login dibuka & tampilkan di console untuk debug
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('core_user_management_list') || '[]');
    const defaults = [
      { id: 'USR-01', name: 'Kang Fahmi', email: 'fahmi@coreproject.com', password: '123', role: 'Owner / BOS JOW', division: 'Executive', status: 'Aktif' },
      { id: 'USR-02', name: 'Kodar', email: 'kodar@coreproject.com', password: '123', role: 'Staff Produksi', division: 'Div. Produksi', status: 'Aktif' },
      { id: 'USR-03', name: 'Sahrul', email: 'sahrul@coreproject.com', password: '123', role: 'Staff Office', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-04', name: 'Nita', email: 'nita@coreproject.com', password: '123', role: 'Staff Office & Admin', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-05', name: 'Bani', email: 'bani@coreproject.com', password: '123', role: 'Staff Office & Operasional', division: 'Div. Office', status: 'Aktif' },
    ];

    const activeList = saved.length > 0 ? saved : defaults;
    setRegisteredUsers(activeList);
    console.log("=== CORE PROJECT USER DATABASE ===", activeList);
  }, []);

  const handleLoginSubmit = (e, overrideUser = null) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    let foundUser = null;

    if (overrideUser) {
      foundUser = overrideUser;
    } else {
      const cleanInput = email.trim().toLowerCase();
      const cleanPass = String(password).trim();

      foundUser = registeredUsers.find(u => {
        const dbEmail = String(u.email || '').trim().toLowerCase();
        const dbName = String(u.name || '').trim().toLowerCase();
        const dbPass = String(u.password || '').trim();

        return (dbEmail === cleanInput || dbName === cleanInput) && dbPass === cleanPass;
      });
    }

    if (!foundUser) {
      setErrorMsg('Email/Username atau Password salah! Periksa kembali.');
      return;
    }

    if (foundUser.status === 'Non-Aktif') {
      setErrorMsg('Akun Anda dinonaktifkan oleh Owner.');
      return;
    }

    onLogin(foundUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold mx-auto shadow-lg shadow-amber-500/30 transform rotate-45">
            <div className="transform -rotate-45 font-extrabold text-lg">C</div>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-widest uppercase">CORE PROJECT</h1>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">ERP WORKSHOP LOGIN</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs rounded-xl text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={(e) => handleLoginSubmit(e)} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Email / Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required 
                placeholder="fahmi@coreproject.com atau kodar" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Masuk ke Sistem ERP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* QUICK TEST PANEL UNTUK MEMASTIKAN LOGIN BERHASIL */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Quick Test Akun Terdaftar:
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
            {registeredUsers.map((usr) => (
              <button
                key={usr.id}
                type="button"
                onClick={() => handleLoginSubmit(null, usr)}
                className="p-2 bg-slate-950 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left cursor-pointer transition-all"
              >
                <p className="text-[11px] font-bold text-white truncate">{usr.name}</p>
                <p className="text-[9px] text-slate-400 truncate">{usr.role}</p>
                <p className="text-[9px] text-amber-400 font-mono">Pass: {usr.password || '123'}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-2 border-t border-slate-800 text-[10px] text-slate-500">
          PT Core Cipta Mode • Secure ERP System
        </div>
      </div>
    </div>
  );
}
