import React, { useState } from 'react';
import { Layers, Search, Plus, Package } from 'lucide-react';

export default function RantaiProduksiView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productionList, setProductionList] = useState([
    { id: 'PO-001', client: 'Himpunan Mahasiswa UIN Bandung', jenis: 'Kemeja KKN (Nagata Drill)', stage: 'Cutting', qty: '120 Pcs', deadline: '2026-11-05' },
    { id: 'PO-002', client: 'Cafe Kopi Senja', jenis: 'Apron & Barista Shirt', stage: 'Pengadaan Bahan Baku', qty: '45 Pcs', deadline: '2026-10-30' },
    { id: 'PO-003', client: 'X-Rider Community', jenis: 'Jersey Sublimasi Fullprint', stage: 'Bordir/Sablon/Sublimasi', qty: '80 Pcs', deadline: '2026-11-02' },
    { id: 'PO-004', client: 'PT Textilindo Maju', jenis: 'Seragam Lapangan Tactical', stage: 'Sewing/Jahit', qty: '200 Pcs', deadline: '2026-11-10' },
    { id: 'PO-005', client: 'Distro Streetwear BDG', jenis: 'Oversized Boxy Hoodie', stage: 'Quality Control', qty: '60 Pcs', deadline: '2026-10-28' },
    { id: 'PO-006', client: 'Sman 1 Cimahi', jenis: 'Jaket Angkatan', stage: 'Selesai', qty: '150 Pcs', deadline: '2026-10-20' },
  ]);

  const stages = [
    'List PO & Jenis',
    'Pengadaan Bahan Baku',
    'Cutting',
    'Bordir/Sablon/Sublimasi',
    'Sewing/Jahit',
    'Quality Control',
    'Selesai'
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPo, setNewPo] = useState({ id: '', client: '', jenis: '', stage: 'List PO & Jenis', qty: '', deadline: '' });

  const handleAddPo = (e) => {
    e.preventDefault();
    if (!newPo.id || !newPo.client) return;
    setProductionList([newPo, ...productionList]);
    setNewPo({ id: '', client: '', jenis: '', stage: 'List PO & Jenis', qty: '', deadline: '' });
    setShowAddModal(false);
  };

  const moveStage = (id, direction) => {
    setProductionList(productionList.map(item => {
      if (item.id === id) {
        const currentIndex = stages.indexOf(item.stage);
        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < stages.length) {
          return { ...item, stage: stages[nextIndex] };
        }
      }
      return item;
    }));
  };

  const filteredList = productionList.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Layers className="w-4 h-4" /> Modul Workshop CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Rantai Estafet Produksi (7 Tahap)</h1>
          <p className="text-slate-400 text-sm mt-1">Pantau dan pindahkan alur SPK dari List PO hingga selesai dengan mudah.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah SPK / PO Baru
        </button>
      </div>

      {/* PENCARIAN PO & JENIS */}
      <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3">
        <Search className="w-5 h-5 text-amber-400" />
        <input 
          type="text"
          placeholder="Cari berdasarkan No. PO, Nama Klien, Jenis Pakaian, atau Tahapan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
        />
      </div>

      {/* MODAL TAMBAH PO */}
      {showAddModal && (
        <form onSubmit={handleAddPo} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 max-w-lg">
          <h3 className="text-md font-bold text-amber-400">Tambah SPK / PO ke Rantai Produksi</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. PO / SPK</label>
              <input 
                type="text" required placeholder="Contoh: PO-007"
                value={newPo.id} onChange={(e) => setNewPo({...newPo, id: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jumlah (Qty)</label>
              <input 
                type="text" required placeholder="Contoh: 100 Pcs"
                value={newPo.qty} onChange={(e) => setNewPo({...newPo, qty: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Klien</label>
            <input 
              type="text" required placeholder="Contoh: PT Maju Jaya"
              value={newPo.client} onChange={(e) => setNewPo({...newPo, client: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Pakaian / Bahan</label>
            <input 
              type="text" required placeholder="Contoh: Kemeja PDH American Drill"
              value={newPo.jenis} onChange={(e) => setNewPo({...newPo, jenis: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Deadline / Target Selesai</label>
            <input 
              type="date" required
              value={newPo.deadline} onChange={(e) => setNewPo({...newPo, deadline: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
            <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Simpan & Masukkan ke Rantai</button>
          </div>
        </form>
      )}

      {/* TABEL / KANBAN DAFTAR PO */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <Package className="w-5 h-5" /> Daftar Tracking Status Produksi ({filteredList.length} PO)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. PO</th>
                <th className="px-4 py-3">Klien & Jenis Pakaian</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Tahapan Saat Ini (7 Langkah)</th>
                <th className="px-4 py-3 text-center">Aksi Pindah Tahap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-bold text-amber-400">{item.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{item.client}</p>
                    <p className="text-slate-400 text-[11px]">{item.jenis}</p>
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-400">{item.qty}</td>
                  <td className="px-4 py-3 text-slate-300">{item.deadline}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full font-bold text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {item.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button 
                      onClick={() => moveStage(item.id, 'prev')}
                      disabled={item.stage === stages[0]}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-[10px] font-semibold cursor-pointer"
                    >
                      ← Mundur
                    </button>
                    <button 
                      onClick={() => moveStage(item.id, 'next')}
                      disabled={item.stage === stages[stages.length - 1]}
                      className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 rounded-lg text-[10px] font-bold cursor-pointer"
                    >
                      Lanjut →
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">Tidak ada data PO yang sesuai dengan pencarian.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
