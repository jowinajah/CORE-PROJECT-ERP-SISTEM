import React, { useState, useEffect } from 'react';
import { Store, Users, Phone, MapPin, Award, TrendingUp, Plus, Edit3, Trash2, Check, Search, Filter, Shield, DollarSign, X, Calendar } from 'lucide-react';

export default function ResellerPartnershipView() {
  const [resellers, setResellers] = useState(() => {
    const saved = localStorage.getItem('core_reseller_partners_v1');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { 
        id: 'MITRA-001', 
        name: 'Rian Maulana', 
        storeName: 'Bandung Clothing Distro', 
        tier: 'Gold', 
        phone: '081234567890', 
        city: 'Bandung', 
        status: 'Aktif', 
        totalOrders: 45, 
        revenue: 28500000,
        joinDate: '2026-03-15' 
      },
      { 
        id: 'MITRA-002', 
        name: 'Siti Aminah', 
        storeName: 'Jatinangor Uniform Center', 
        tier: 'Silver', 
        phone: '085712345678', 
        city: 'Sumedang', 
        status: 'Aktif', 
        totalOrders: 20, 
        revenue: 14200000,
        joinDate: '2026-05-10' 
      },
      { 
        id: 'MITRA-003', 
        name: 'Reza Pratama', 
        storeName: 'Jakarta Streetwear Vendor', 
        tier: 'VIP', 
        phone: '081898765432', 
        city: 'Jakarta Selatan', 
        status: 'Aktif', 
        totalOrders: 85, 
        revenue: 65000000,
        joinDate: '2026-01-20' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_reseller_partners_v1', JSON.stringify(resellers));
  }, [resellers]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('ALL');

  const [currentPartner, setCurrentPartner] = useState({
    id: '',
    name: '',
    storeName: '',
    tier: 'Bronze',
    phone: '',
    city: '',
    status: 'Aktif',
    totalOrders: 0,
    revenue: 0,
    joinDate: new Date().toISOString().split('T')[0]
  });

  const tiers = ['Bronze', 'Silver', 'Gold', 'VIP'];
  const statuses = ['Aktif', 'Pending', 'Non-Aktif'];

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPartner({
      id: 'MITRA-' + Math.floor(100 + Math.random() * 900),
      name: '',
      storeName: '',
      tier: 'Bronze',
      phone: '',
      city: '',
      status: 'Aktif',
      totalOrders: 0,
      revenue: 0,
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleOpenEdit = (partner) => {
    setIsEditMode(true);
    setCurrentPartner(partner);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPartner.name || !currentPartner.storeName || !currentPartner.phone) return;

    if (isEditMode) {
      setResellers(resellers.map(p => p.id === currentPartner.id ? currentPartner : p));
    } else {
      setResellers([currentPartner, ...resellers]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data mitra reseller ini?')) {
      setResellers(resellers.filter(p => p.id !== id));
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Statistik Ringkasan
  const totalPartners = resellers.length;
  const activePartners = resellers.filter(r => r.status === 'Aktif').length;
  const totalOmsetMitra = resellers.reduce((acc, curr) => acc + Number(curr.revenue), 0);

  // Filter & Pencarian
  const filteredResellers = resellers.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.storeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTier = filterTier === 'ALL' || r.tier === filterTier;
    return matchSearch && matchTier;
  });

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-md uppercase tracking-wide">Modul Kemitraan CORE</span>
          <h1 className="text-2xl font-black text-white mt-1">Pendataan Reseller & Partner Konveksi</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Kelola jaringan distribusi, tier keanggotaan, kontak WhatsApp, dan performa omset mitra.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Mitra Baru
        </button>
      </div>

      {/* KARTU STATISTIK RINGKASAN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Mitra Terdaftar</span>
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">{totalPartners} Orang</h3>
          <p className="text-[11px] text-slate-400">{activePartners} Mitra berstatus Aktif</p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Akumulasi Omset Jaringan</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">{formatRupiah(totalOmsetMitra)}</h3>
          <p className="text-[11px] text-slate-400">Total kontribusi penjualan dari mitra</p>
        </div>

        <div className="bg-slate-900/90 border border-purple-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Wilayah Distribusi</span>
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">Bandung, Jakarta, Dll</h3>
          <p className="text-[11px] text-slate-400">Jaringan pemasaran aktif</p>
        </div>
      </div>

      {/* KONTROL PENCARIAN & FILTER */}
      <div className="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Cari nama, toko, atau kota..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Tier:</span>
          {['ALL', 'Bronze', 'Silver', 'Gold', 'VIP'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                filterTier === tier ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* TABEL DATA RESELLER & KEMITRAAN */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <Store className="w-5 h-5" /> Daftar Jaringan Reseller & Partner ({filteredResellers.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">ID & Nama Pemilik</th>
                <th className="px-4 py-3">Nama Toko / Brand</th>
                <th className="px-4 py-3 text-center">Tier Mitra</th>
                <th className="px-4 py-3">Kontak WhatsApp & Kota</th>
                <th className="px-4 py-3 text-center">Total PO</th>
                <th className="px-4 py-3 text-right">Kontribusi Omset</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredResellers.length > 0 ? (
                filteredResellers.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <p className="font-bold text-amber-400">{partner.id}</p>
                      <p className="font-semibold text-white text-sm">{partner.name}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-200">
                      {partner.storeName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase ${
                        partner.tier === 'VIP' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' :
                        partner.tier === 'Gold' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        partner.tier === 'Silver' ? 'bg-slate-300/20 text-slate-300 border border-slate-300/40' :
                        'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      }`}>
                        ⭐ {partner.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-mono text-slate-300 flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> {partner.phone}</p>
                      <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-slate-500" /> {partner.city}</p>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-white">
                      {partner.totalOrders} Pesanan
                    </td>
                    <td className="px-4 py-3 text-right font-black text-emerald-400">
                      {formatRupiah(partner.revenue)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        partner.status === 'Aktif' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => handleOpenEdit(partner)} title="Edit Mitra" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(partner.id)} title="Hapus Mitra" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-slate-500">Tidak ada data mitra reseller yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT MITRA */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
            <h3 className="text-lg font-bold text-amber-400">{isEditMode ? 'Edit Data Mitra Reseller' : 'Tambah Mitra Reseller Baru'}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ID Mitra</label>
                <input type="text" disabled value={currentPartner.id} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal Bergabung</label>
                <input type="date" value={currentPartner.joinDate} onChange={e => setCurrentPartner({...currentPartner, joinDate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Pemilik / PIC</label>
                <input type="text" required placeholder="Cth: Rian Maulana" value={currentPartner.name} onChange={e => setCurrentPartner({...currentPartner, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Toko / Brand</label>
                <input type="text" required placeholder="Cth: Bandung Clothing" value={currentPartner.storeName} onChange={e => setCurrentPartner({...currentPartner, storeName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tier / Level Mitra</label>
                <select value={currentPartner.tier} onChange={e => setCurrentPartner({...currentPartner, tier: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold">
                  {tiers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Status Keanggotaan</label>
                <select value={currentPartner.status} onChange={e => setCurrentPartner({...currentPartner, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. WhatsApp</label>
                <input type="text" required placeholder="Cth: 081234567890" value={currentPartner.phone} onChange={e => setCurrentPartner({...currentPartner, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kota / Wilayah</label>
                <input type="text" required placeholder="Cth: Bandung" value={currentPartner.city} onChange={e => setCurrentPartner({...currentPartner, city: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Total Pesanan (PO)</label>
                <input type="number" value={currentPartner.totalOrders} onChange={e => setCurrentPartner({...currentPartner, totalOrders: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kontribusi Omset (Rp)</label>
                <input type="number" value={currentPartner.revenue} onChange={e => setCurrentPartner({...currentPartner, revenue: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Data Mitra</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
