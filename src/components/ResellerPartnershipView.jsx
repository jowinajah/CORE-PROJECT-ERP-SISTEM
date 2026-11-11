import React, { useState, useEffect } from 'react';
import { Store, Users, Phone, MapPin, Award, TrendingUp, Plus, Edit3, Trash2, Check, Search, Filter, ArrowLeft, DollarSign, Calendar, FileText, Package, Target } from 'lucide-react';

export default function ResellerPartnershipView() {
  const [resellers, setResellers] = useState(() => {
    const saved = localStorage.getItem('core_reseller_partners_v4');
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
        joinDate: '2026-03-15',
        monthlyTarget: 15000000,
        orders: [
          { id: 'PO-901', poName: 'PO Kemeja Kampus', model: 'Kemeja Unione Drill', qty: 50, totalPrice: 7500000, deadline: '2026-11-15', commission: 750000 },
          { id: 'PO-902', poName: 'PO Jaket komunitas', model: 'Jaket Taslan Waterproof', qty: 30, totalPrice: 6000000, deadline: '2026-11-25', commission: 600000 }
        ]
      },
      { 
        id: 'MITRA-002', 
        name: 'Siti Aminah', 
        storeName: 'Jatinangor Uniform Center', 
        tier: 'Silver', 
        phone: '085712345678', 
        city: 'Sumedang', 
        status: 'Aktif',
        joinDate: '2026-05-10',
        monthlyTarget: 10000000,
        orders: [
          { id: 'PO-903', poName: 'PO Kaos Event', model: 'Kaos Combed 30s', qty: 100, totalPrice: 8500000, deadline: '2026-11-20', commission: 850000 }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_reseller_partners_v4', JSON.stringify(resellers));
  }, [resellers]);

  const [selectedReseller, setSelectedReseller] = useState(null);

  // State Modal Reseller Utama (Tambah & Edit)
  const [showResellerModal, setShowResellerModal] = useState(false);
  const [isEditReseller, setIsEditReseller] = useState(false);
  const [currentReseller, setCurrentReseller] = useState({
    id: '', name: '', storeName: '', tier: 'Bronze', phone: '', city: '', status: 'Aktif', joinDate: new Date().toISOString().split('T')[0], monthlyTarget: 10000000, orders: []
  });

  // State Modal PO / Pesanan Mitra (Dashboard Detail)
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: '', poName: '', model: '', qty: '', totalPrice: '', deadline: '', commission: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('ALL');

  const tiers = ['Bronze', 'Silver', 'Gold', 'VIP'];
  const statuses = ['Aktif', 'Pending', 'Non-Aktif'];

  // --- HANDLER RESELLER ---
  const handleOpenAddReseller = () => {
    setIsEditReseller(false);
    setCurrentReseller({
      id: 'MITRA-' + Math.floor(100 + Math.random() * 900),
      name: '', storeName: '', tier: 'Bronze', phone: '', city: '', status: 'Aktif', joinDate: new Date().toISOString().split('T')[0], monthlyTarget: 10000000, orders: []
    });
    setShowResellerModal(true);
  };

  const handleOpenEditReseller = (reseller, e) => {
    if (e) e.stopPropagation();
    setIsEditReseller(true);
    setCurrentReseller(reseller);
    setShowResellerModal(true);
  };

  const handleSaveReseller = (e) => {
    e.preventDefault();
    if (!currentReseller.name || !currentReseller.storeName) return;

    if (isEditReseller) {
      const updated = resellers.map(r => r.id === currentReseller.id ? currentReseller : r);
      setResellers(updated);
      if (selectedReseller && selectedReseller.id === currentReseller.id) {
        setSelectedReseller(currentReseller);
      }
    } else {
      setResellers([currentReseller, ...resellers]);
    }
    setShowResellerModal(false);
  };

  const handleDeleteReseller = (id, e) => {
    if (e) e.stopPropagation();
    if (confirm('Yakin ingin menghapus data mitra ini beserta seluruh catatannya?')) {
      setResellers(resellers.filter(r => r.id !== id));
      if (selectedReseller && selectedReseller.id === id) setSelectedReseller(null);
    }
  };

  // --- HANDLER PO / ORDER DALAM DASHBOARD RESELLER ---
  const handleOpenAddOrder = () => {
    setIsEditOrder(false);
    setCurrentOrder({
      id: 'PO-' + Math.floor(1000 + Math.random() * 9000),
      poName: '', model: '', qty: '', totalPrice: '', deadline: new Date().toISOString().split('T')[0], commission: ''
    });
    setShowOrderModal(true);
  };

  const handleOpenEditOrder = (order) => {
    setIsEditOrder(true);
    setCurrentOrder(order);
    setShowOrderModal(true);
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    if (!currentOrder.poName || !currentOrder.totalPrice) return;

    const updatedOrders = isEditOrder
      ? selectedReseller.orders.map(o => o.id === currentOrder.id ? currentOrder : o)
      : [currentOrder, ...selectedReseller.orders];

    const updatedReseller = { ...selectedReseller, orders: updatedOrders };
    
    setResellers(resellers.map(r => r.id === updatedReseller.id ? updatedReseller : r));
    setSelectedReseller(updatedReseller);
    setShowOrderModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm('Hapus data PO pesanan ini dari dashboard mitra?')) {
      const updatedOrders = selectedReseller.orders.filter(o => o.id !== orderId);
      const updatedReseller = { ...selectedReseller, orders: updatedOrders };
      
      setResellers(resellers.map(r => r.id === updatedReseller.id ? updatedReseller : r));
      setSelectedReseller(updatedReseller);
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // --- DASHBOARD DETAIL TIAP AKUN RESELLER ---
  if (selectedReseller) {
    const totalOrdersCount = selectedReseller.orders.length;
    const totalRevenue = selectedReseller.orders.reduce((acc, o) => acc + Number(o.totalPrice || 0), 0);
    const totalCommission = selectedReseller.orders.reduce((acc, o) => acc + Number(o.commission || 0), 0);
    const monthlyTarget = Number(selectedReseller.monthlyTarget || 1);
    const targetProgress = Math.min(Math.round((totalRevenue / monthlyTarget) * 100), 100);

    return (
      <div className="space-y-6 text-slate-100 max-w-7xl mx-auto animate-in fade-in">
        {/* HEADER KEMBALI & PROFIL MITRA */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedReseller(null)}
              className="p-2.5 bg-slate-950 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 cursor-pointer transition-all"
              title="Kembali ke Daftar Mitra"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">Dashboard Reseller Rinci</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold text-[10px] rounded uppercase">Tier {selectedReseller.tier}</span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1">{selectedReseller.storeName}</h1>
              <p className="text-slate-400 text-xs mt-0.5">Pemilik: <strong>{selectedReseller.name}</strong> | WA: {selectedReseller.phone} | Kota: {selectedReseller.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => handleOpenEditReseller(selectedReseller, e)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" /> Edit Profil Mitra
            </button>
            <button 
              onClick={handleOpenAddOrder}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah PO / Pesanan
            </button>
          </div>
        </div>

        {/* KARTU STATISTIK & TARGET BULANAN */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl shadow-xl space-y-2">
            <div className="flex justify-between items-center text-amber-400">
              <span className="text-xs font-bold uppercase tracking-wider">Target Bulanan</span>
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-white">{formatRupiah(selectedReseller.monthlyTarget)}</h3>
            <p className="text-[11px] text-slate-400">Target omset periode bulan ini</p>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl shadow-xl space-y-2">
            <div className="flex justify-between items-center text-emerald-400">
              <span className="text-xs font-bold uppercase tracking-wider">Pencapaian Omset</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-emerald-400">{formatRupiah(totalRevenue)}</h3>
            <div className="w-full bg-slate-950 rounded-full h-2 mt-2 overflow-hidden border border-slate-800">
              <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${targetProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400 text-right font-bold">{targetProgress}% Tercapai</p>
          </div>

          <div className="bg-slate-900/90 border border-blue-500/30 p-5 rounded-2xl shadow-xl space-y-2">
            <div className="flex justify-between items-center text-blue-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total PO Dibawa</span>
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-white">{totalOrdersCount} Proyek PO</h3>
            <p className="text-[11px] text-slate-400">Jumlah pesanan aktif</p>
          </div>

          <div className="bg-slate-900/90 border border-purple-500/30 p-5 rounded-2xl shadow-xl space-y-2">
            <div className="flex justify-between items-center text-purple-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Komisi Mitra</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-purple-400">{formatRupiah(totalCommission)}</h3>
            <p className="text-[11px] text-slate-400">Hak komisi reseller</p>
          </div>
        </div>

        {/* TABEL PO / MODEL PESANAN RESELLER */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Rincian PO, Model, Dateline, & Komisi ({selectedReseller.orders.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">ID & Nama PO</th>
                  <th className="px-4 py-3">Model / Spesifikasi</th>
                  <th className="px-4 py-3 text-center">Jumlah (Qty)</th>
                  <th className="px-4 py-3 text-right">Harga Total</th>
                  <th className="px-4 py-3 text-center">Dateline</th>
                  <th className="px-4 py-3 text-right">Komisi Reseller</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {selectedReseller.orders.length > 0 ? (
                  selectedReseller.orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3">
                        <p className="font-bold text-amber-400">{order.id}</p>
                        <p className="font-semibold text-white text-sm">{order.poName}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-medium">
                        {order.model}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-amber-300">
                        {order.qty} Pcs
                      </td>
                      <td className="px-4 py-3 text-right font-black text-white">
                        {formatRupiah(order.totalPrice)}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-300">
                        <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" /> {order.deadline}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-black text-purple-400">
                        {formatRupiah(order.commission)}
                      </td>
                      <td className="px-4 py-3 text-center space-x-1">
                        <button onClick={() => handleOpenEditOrder(order)} title="Edit PO" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteOrder(order.id)} title="Hapus PO" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-500">Belum ada PO / pesanan yang diinput untuk mitra ini.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL TAMBAH / EDIT PO */}
        {showOrderModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleSaveOrder} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl text-xs">
              <h3 className="text-lg font-bold text-amber-400">{isEditOrder ? 'Edit PO Pesanan Mitra' : 'Tambah PO Pesanan Baru'}</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ID PO</label>
                  <input type="text" disabled value={currentOrder.id} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dateline</label>
                  <input type="date" required value={currentOrder.deadline} onChange={e => setCurrentOrder({...currentOrder, deadline: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama / Nomor PO</label>
                <input type="text" required placeholder="Cth: PO Kemeja Kampus UIN" value={currentOrder.poName} onChange={e => setCurrentOrder({...currentOrder, poName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold" />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Model / Spesifikasi Produk</label>
                <input type="text" required placeholder="Cth: Kemeja Unione Drill + Bordir" value={currentOrder.model} onChange={e => setCurrentOrder({...currentOrder, model: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jumlah (Qty Pcs)</label>
                  <input type="number" required placeholder="50" value={currentOrder.qty} onChange={e => setCurrentOrder({...currentOrder, qty: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Harga Total (Rp)</label>
                  <input type="number" required placeholder="7500000" value={currentOrder.totalPrice} onChange={e => setCurrentOrder({...currentOrder, totalPrice: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Komisi Reseller (Rp)</label>
                <input type="number" required placeholder="750000" value={currentOrder.commission} onChange={e => setCurrentOrder({...currentOrder, commission: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-purple-400 font-mono font-bold" />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowOrderModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan PO Pesanan</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // --- HALAMAN UTAMA: DAFTAR SEMUA RESELLER ---
  const totalPartners = resellers.length;
  const activePartners = resellers.filter(r => r.status === 'Aktif').length;
  const totalOmsetMitra = resellers.reduce((acc, curr) => {
    const rev = curr.orders ? curr.orders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0) : 0;
    return acc + rev;
  }, 0);

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
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-md uppercase tracking-wide">Modul Kemitraan & Reseller</span>
          <h1 className="text-2xl font-black text-white mt-1">Dashboard Jaringan Reseller & Partner</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Pilih salah satu mitra untuk membuka dashboard rincian PO, target bulanan, model, dateline, dan komisi.</p>
        </div>
        <button 
          onClick={handleOpenAddReseller}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Mitra Reseller Baru
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
          <p className="text-[11px] text-slate-400">Total penjualan dari seluruh mitra</p>
        </div>

        <div className="bg-slate-900/90 border border-purple-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Akses Dashboard</span>
            <Store className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">Target Bulanan Aktif</h3>
          <p className="text-[11px] text-slate-400">Pantau performa target per akun</p>
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

      {/* TABEL UTAMA DAFTAR MITRA */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <Store className="w-5 h-5" /> Pilih Mitra untuk Membuka Dashboard Detail ({filteredResellers.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">ID & Nama Pemilik</th>
                <th className="px-4 py-3">Nama Toko / Brand</th>
                <th className="px-4 py-3 text-center">Tier Mitra</th>
                <th className="px-4 py-3 text-right">Target Bulanan</th>
                <th className="px-4 py-3 text-right">Total Omset</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi & Dashboard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredResellers.length > 0 ? (
                filteredResellers.map((partner) => {
                  const partnerOmset = partner.orders ? partner.orders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0) : 0;

                  return (
                    <tr 
                      key={partner.id} 
                      onClick={() => setSelectedReseller(partner)}
                      className="hover:bg-amber-500/10 cursor-pointer transition-all"
                    >
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
                      <td className="px-4 py-3 text-right font-mono font-bold text-amber-300">
                        {formatRupiah(partner.monthlyTarget || 0)}
                      </td>
                      <td className="px-4 py-3 text-right font-black text-emerald-400">
                        {formatRupiah(partnerOmset)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          partner.status === 'Aktif' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-1" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => setSelectedReseller(partner)}
                          className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          Buka Dashboard
                        </button>
                        <button onClick={(e) => handleOpenEditReseller(partner, e)} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={(e) => handleDeleteReseller(partner.id, e)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-500">Tidak ada data mitra reseller yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT RESELLER UTAMA */}
      {showResellerModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveReseller} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
            <h3 className="text-lg font-bold text-amber-400">{isEditReseller ? 'Edit Data Mitra Reseller' : 'Tambah Mitra Reseller Baru'}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ID Mitra</label>
                <input type="text" disabled value={currentReseller.id} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal Bergabung</label>
                <input type="date" value={currentReseller.joinDate} onChange={e => setCurrentReseller({...currentReseller, joinDate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
