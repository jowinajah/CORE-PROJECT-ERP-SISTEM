import React from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export default function VisiMisiView() {
  const misiList = [
    "Memberikan hasil yang berkualitas dan inovatif.",
    "Memberikan layanan yang baik dan solusi yang bernilai positif kepada konsumen.",
    "Menciptakan suasana yang baik bagi karyawan sebagai kebanggan dalam kerja.",
    "Menjadikan acuan sebagai konveksi yang memiliki tata kelola yang baik.",
    "Mencetak pengusaha-pengusaha yang sanggup berkembang bersama.",
    "Mengurangi pengangguran dan mensejahterakan masyarakat sekitar."
  ];

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Target className="w-4 h-4" /> Company Profile CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Visi & Misi Perusahaan</h1>
          <p className="text-slate-400 text-sm mt-1">Landasan arah strategis, nilai, dan komitmen pelayanan workshop konveksi dan percetakan CORE Project.</p>
        </div>
      </div>

      {/* VISI SECTION */}
      <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 p-8 rounded-2xl shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-widest">VISI UTAMA</h3>
        </div>
        <blockquote className="text-base sm:text-lg font-medium text-slate-100 italic bg-slate-950/60 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-inner leading-relaxed">
          "Menjadi konveksi dan percetakan yang unggul, terkemuka dan terdepan dalam pelayanan, kinerja serta menjadi wadah pencetak pengusaha baru."
        </blockquote>
      </div>

      {/* MISI SECTION */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400">MISI PERUSAHAAN</h3>
            <p className="text-xs text-slate-400">Langkah nyata dan komitmen operasional CORE Project sehari-hari.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {misiList.map((item, index) => (
            <div key={index} className="bg-slate-950 border border-slate-800 hover:border-amber-500/30 p-5 rounded-2xl flex items-start gap-4 transition-all shadow-md group">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                0{index + 1}
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
