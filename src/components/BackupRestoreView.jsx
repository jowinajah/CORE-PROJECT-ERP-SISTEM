import React, { useState } from 'react';
import { Download, Upload, Database } from 'lucide-react';

export default function BackupRestoreView() {
  const [statusMsg, setStatusMsg] = useState('');

  // FUNGSI EKSPOR SEMUA DATA CORE PROJECT
  const handleExportData = () => {
    try {
      const backupData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('core_')) {
          backupData[key] = JSON.parse(localStorage.getItem(key));
        }
      }

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `core_project_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setStatusMsg('✅ Backup data berhasil diunduh! Silakan pindahkan file ini ke komputer lain.');
    } catch (error) {
      setStatusMsg('❌ Gagal melakukan backup data.');
    }
  };

  // FUNGSI IMPOR / RESTORE DATA (PERBAIKAN TYPO)
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        Object.keys(importedData).forEach(key => {
          if (key.startsWith('core_')) {
            localStorage.setItem(key, JSON.stringify(importedData[key]));
          }
        });
        setStatusMsg('✅ Pemulihan data berhasil! Memuat ulang sistem...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        setStatusMsg('❌ File backup tidak valid atau rusak.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-4xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">⭐ Fitur Premier BOS JOW</span>
          <h1 className="text-2xl font-black text-white mt-1">Backup & Sinkronisasi Data Antar Komputer</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Pindahkan seluruh data ERP antar komputer dengan praktis.</p>
        </div>
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 hidden sm:block">
          <Database className="w-8 h-8" />
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-slate-900 border border-amber-500/40 text-amber-300 text-xs rounded-2xl text-center font-bold shadow-lg">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KARTU EKSPOR */}
        <div className="bg-slate-900/90 border border-amber-500/30 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Unduh Data (Backup)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Klik tombol di bawah untuk mendownload seluruh catatan terbaru dari komputer ini menjadi satu file `.json`.
            </p>
          </div>
          <button 
            onClick={handleExportData}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" /> Download File Backup (.json)
          </button>
        </div>

        {/* KARTU IMPOR */}
        <div className="bg-slate-900/90 border border-amber-500/30 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Unggah Data (Restore)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pilih dan unggah file backup (.json) ke komputer lain untuk menyamakan data secara instan.
            </p>
          </div>
          <label className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all">
            <Upload className="w-4 h-4" /> Pilih & Unggah File Backup
            <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
