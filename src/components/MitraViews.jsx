import React, { useState } from 'react';
import { Handshake, Building2, Truck, Store, Phone, Plus } from 'lucide-react';

export default function MitraViews({ tab }) {
  const [mitraList, setMitraList] = useState([
    { id: 1, name: 'PT Textilindo Maju', type: 'Mitra Supplier', pic: 'Bapak Hendra', phone: '081299887766', status: 'Aktif' },
    { id: 2, name: 'Konveksi Mitra Sejahtera', type: 'Mitra Factory', pic: 'Ibu Rina', phone: '081355443322', status: 'Mitra Utama' },
    { id: 3, name: 'Distro Streetwear BDG', type: 'Mitra Reseller', pic: 'Aldi', phone: '085677889900', status: 'Gold Reseller' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMitra, setNewMitra] = useState({ name: '', pic: '', phone: '', status: 'Aktif' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMitra.name) return;
    const typeLabel = tab === 'mitra-factory' ? 'Mitra Factory' : tab === 'mitra-supplier' ? 'Mitra Supplier' : 'Mitra Reseller';
    setMitraList([{ id: Date.now(), ...newMitra, type: typeLabel }, ...mitraList]);
    setNewMitra({ name: '', pic: '', phone: '', status: 'Aktif' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Handshake className="w-4 h-4" /> Manajemen Mitra Core CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {tab === 'mitra-factory' && 'Mitra Factory (Pabrik Rekanan / Makloon)'}
            {tab === 'mitra-supplier' && 'Mitra Supplier (Penyedia Kain & Bahan)'}
            {tab === 'mitra-reseller' && 'Mitra Reseller & Distributor Resmi'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Pusat jaringan kerja sama strategis untuk mendukung operasional konveksi dan distribusi.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Mitra Baru
        </button>
      </div>

      {showModal && (
        <form onSubmit={handleAdd} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 max-w-lg">
          <h3 className="text-md font-bold text-amber-400">Tambah Data Mitra</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama Perusahaan / Usaha</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: PT Textilindo Maju"
              value={newMitra.name}
              onChange={(e) => setNewMitra({...newMitra, name: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama PIC / Kontak</label>
            <input 
              type="text" 
              placeholder="Contoh: Bapak Hendra"
              value={newMitra.pic}
              onChange={(e) => setNewMitra({...newMitra, pic: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">No WhatsApp</label>
            <input 
              type="text" 
              placeholder="0812xxxxxxxx"
              value={newMitra.phone}
              onChange={(e) => setNewMitra({...newMitra, phone: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
            <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Simpan Mitra</button>
          </div>
        </form>
      )}

      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          {tab === 'mitra-factory' && <Building2 className="w-5 h-5" />}
          {tab === 'mitra-supplier' && <Truck className="w-5 h-5" />}
          {tab === 'mitra-reseller' && <Store className="w-5 h-5" />}
          Daftar {tab === 'mitra-factory' ? 'Factory Rekanan' : tab === 'mitra-supplier' ? 'Supplier Bahan Baku' : 'Reseller Resmi'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Nama Mitra</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">PIC / Kontak Utama</th>
                <th className="px-4 py-3">No WhatsApp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {mitraList
                .filter(m => {
                  if (tab === 'mitra-factory') return m.type === 'Mitra Factory';
                  if (tab === 'mitra-supplier') return m.type === 'Mitra Supplier';
                  if (tab === 'mitra-reseller') return m.type === 'Mitra Reseller';
                  return true;
                })
                .map((mitra, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-white">{mitra.name}</td>
                    <td className="px-4 py-3 text-amber-400 font-medium">{mitra.type}</td>
                    <td className="px-4 py-3 text-slate-300">{mitra.pic}</td>
                    <td className="px-4 py-3 text-slate-300 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> {mitra.phone}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {mitra.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
