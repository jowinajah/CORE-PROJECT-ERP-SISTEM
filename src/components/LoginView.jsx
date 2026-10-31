import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanInput = email.trim().toLowerCase();
    const cleanPass = String(password).trim();

    // 1. MASTER OVERRIDE UNTUK BOS JOW (DIJAMIN LANGSUNG MASUK)
    if ((cleanInput === 'fahmi@coreproject.com' || cleanInput === 'kang fahmi' || cleanInput === 'fahmi') && cleanPass === '123') {
      const ownerUser = {
        id: 'USR-01',
        name: 'Kang Fahmi',
        email: 'fahmi@coreproject.com',
        role: 'Owner / BOS JOW',
        division: 'Executive',
        status: 'Aktif'
      };
      onLogin(ownerUser);
      return;
    }

    // 2. CEK DATABASE KARYAWAN DARI LOCALSTORAGE
    const savedUsers = JSON.parse(localStorage.getItem('core_user_management_list') || '[]');
    const defaultUsers = [
      { id: 'USR-01', name: 'Kang Fahmi', email: 'fahmi@coreproject.com', password: '123', role: 'Owner / BOS JOW', division: 'Executive', status: 'Aktif' },
      { id: 'USR-02', name: 'Kodar', email: 'kodar@coreproject.com', password: '123', role: 'Staff Produksi', division: 'Div. Produksi', status: 'Aktif' },
      { id: 'USR-03', name: 'Sahrul', email: 'sahrul@coreproject.com', password: '123', role: 'Staff Office', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-04', name: 'Nita', email: 'nita@coreproject.com', password: '123', role: 'Staff Office & Admin', division: 'Div. Office', status: 'Aktif' },
      { id: 'USR-05', name: 'Bani', email: 'bani@coreproject.com', password: '123', role: 'Staff Office & Operasional', division: 'Div. Office', status: 'Aktif' },
    ];

    const userDatabase = savedUsers.length > 0 ? savedUsers : defaultUsers;

    const foundUser = userDatabase.find(
      u => (u.email.toLowerCase() === cleanInput || u.name.toLowerCase() === cleanInput) && 
           String(u.password).trim() === cleanPass
    );

    if (!foundUser) {
      setErrorMsg('Email/Username atau Password salah! (Gunakan: fahmi@coreproject.com & Pass: 123)');
      return;
    }

    if (foundUser.status === 'Non-Aktif') {
      setErrorMsg('Akun Anda dinonaktifkan oleh Owner. Akses ditolak.');
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

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Email / Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required 
                placeholder="fahmi@coreproject.com" 
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

        <div className="text-center pt-2 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
          <p>Login Owner: <strong className="text-amber-400">fahmi@coreproject.com</strong></p>
          <p>Password: <strong className="text-amber-400">123</strong></p>
        </div>
      </div>
    </div>
  );
}
