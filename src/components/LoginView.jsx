import React, { useState } from 'react';
import { User, KeyRound, Scissors } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === 'bosjow' && password === '123') {
      onLogin({ name: 'BOS JOW', role: 'Owner / CEO', username: 'bosjow' });
    } else if (username === 'marketing' && password === '123') {
      onLogin({ name: 'Tim Marketing', role: 'Marketing & Sales', username: 'marketing' });
    } else if (username === 'produksi' && password === '123') {
      onLogin({ name: 'Kepala Workshop', role: 'Factory & Produksi', username: 'produksi' });
    } else {
      setError('Username atau Password salah! (Gunakan tombol demo di bawah)');
    }
  };

  const handleQuickLogin = (userRole) => {
    if (userRole === 'bosjow') {
      onLogin({ name: 'BOS JOW', role: 'Owner / CEO', username: 'bosjow' });
    } else if (userRole === 'marketing') {
      onLogin({ name: 'Tim Marketing', role: 'Marketing & Sales', username: 'marketing' });
    } else if (userRole === 'produksi') {
      onLogin({ name: 'Kepala Workshop', role: 'Factory & Produksi', username: 'produksi' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-md w-full bg-slate-900 border border-amber-500/30 p-8 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700"></div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 items-center justify-center shadow-lg shadow-amber-500/30 border border-amber-100 transform rotate-45 mb-2">
            <div className="w-6 h-6 bg-slate-950 rounded-sm transform -rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase tracking-widest">
            CORE PROJECT
          </h1>
          <p className="text-xs text-amber-400/80 font-semibold tracking-wider">ERP WORKSHOP & CONFECTION</p>
          <p className="text-xs text-slate-400 pt-2">Silakan login untuk masuk ke sistem perusahaan.</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required 
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                required 
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
          >
            Masuk ke Sistem
          </button>
        </form>

        {/* Tombol Login Cepat untuk Demo */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[10px] text-slate-400 uppercase font-bold text-center">⚡ Login Cepat (Mode Demo):</p>
          <div className="grid grid-cols-3 gap-2">
            <button 
              type="button"
              onClick={() => handleQuickLogin('bosjow')}
              className="px-2 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
            >
              👑 BOS JOW (Owner)
            </button>
            <button 
              type="button"
              onClick={() => handleQuickLogin('marketing')}
              className="px-2 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
            >
              📈 Marketing
            </button>
            <button 
              type="button"
              onClick={() => handleQuickLogin('produksi')}
              className="px-2 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
            >
              🏭 Produksi
            </button>
          </div>
          <p className="text-[9px] text-slate-500 text-center pt-1">*Password untuk semua akun demo: <span className="text-amber-400 font-mono">123</span></p>
        </div>

      </div>
    </div>
  );
}
