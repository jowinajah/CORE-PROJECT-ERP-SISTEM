import React from 'react';
import { Video, ExternalLink } from 'lucide-react';

export default function ZoomView() {
  return (
    <div className="space-y-6 text-slate-100 max-w-3xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-1">
            <Video className="w-4 h-4" /> Virtual Meeting Room
          </div>
          <h1 className="text-2xl font-bold text-white">Zoom Meet CORE Project</h1>
          <p className="text-slate-400 text-sm mt-1">Ruang rapat virtual harian untuk koordinasi workshop konveksi dan mandor.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl mx-auto flex items-center justify-center">
          <Video className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white">Briefing Pagi & Koordinasi Produksi</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Jadwal meeting rutin dilaksanakan setiap hari pukul 08:30 WIB dipimpin langsung oleh BOS JOW.
        </p>
        <div className="pt-4">
          <a 
            href="https://zoom.us" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Video className="w-4 h-4" /> Masuk Zoom Meeting <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
