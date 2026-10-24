import React, { useState } from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';

export default function PoProjectView() {
  const [poList, setPoList] = useState([
    { id: 'PO-001', client: 'Himpunan Mahasiswa UIN', item: 'Kemeja PDH 2in1 (50 Pcs)', status: 'Approved / PO Terbit', date: '2026-10-20' },
    { id: 'PO-002', client: 'Cafe Kopi Senja', item: 'Worksheet (20 Pcs)', status: 'Menunggu Konfirmasi', date: '2026-10-23' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPo, setNewPo] = useState({ client: '', item: '', date: '' });

  const handleAddPo = (e) => {
    e.preventDefault();
    if (!newPo.client || !newPo.item) return;
    setPoList([{ id: `PO-00${poList.length + 1}`, ...newPo, status: 'PO Terbit' }, ...poList]);
    setNewPo({ client: '', item: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <FileSpreadsheet className="w-4 h-4" /> Manajemen Workshop
          </div>
          <h1 className="text-2xl font-bold text-white">Purchase Order (PO PROJECT)</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola dan terbitkan surat PO resmi untuk setiap proyek konveksi.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Buat PO Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddPo} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
          <h3 className="text-md font-bold text-amber-400">Form PO Proyek Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input 
              type="text" 
              placeholder="Nama Klien / Instansi" 
              value={newPo.client}
              onChange={(e) => setNewPo({...newPo, client: e.target.value})}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              required
            />
            <input 
              type="text" 
              placeholder="Jenis & Jumlah Pesanan" 
              value={newPo.item}
              onChange={(e) => setNewPo({...newPo, item: e.target.value})}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              required
            />
            <input 
              type="date" 
              value={newPo.date}
              onChange={(e) => setNewPo({...newPo, date: e.target.value})}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
            <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Simpan PO</button>
          </div>
        </form>
      )}

      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">ID PO</th>
              <th className="px-4 py-3">Klien / Instansi</th>
              <th className="px-4 py-3">Detail Pesanan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {poList.map((po, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-semibold text-amber-400">{po.id}</td>
                <td className="px-4 py-3 text-white">{po.client}</td>
                <td className="px-4 py-3 text-slate-300">{po.item}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{po.date || '2026-10-24'}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
