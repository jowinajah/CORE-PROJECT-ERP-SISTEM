import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Plus, Edit3, Trash2, TrendingUp, TrendingDown, Wallet, Calendar, Check, FileText } from 'lucide-react';

export default function CashflowView() {
  // State Arus Kas & Petty Cash dengan localStorage
  const [cashflowList, setCashflowList] = useState(() => {
    const saved = localStorage.getItem('core_cashflow_petty_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'CF-001', date: '2026-10-01', category: 'Kas Masuk', source: 'Pelunasan PO Kemeja KKN', type: 'Cashflow Utama', amount: 3500000 },
      { id: 'CF-002', date: '2026-10-05', category: 'Kas Keluar', source: 'Beli Kain Nagata Rol-an', type: 'Cashflow Utama', amount: 1500000 },
      { id: 'CF-003', date: '2026-10-10', category: 'Kas Keluar', source: 'Beli Benang & Kancing (Petty Cash)', type: 'Petty Cash', amount: 150000 },
      { id: 'CF-004', date: '2026-10-15', category: 'Kas Masuk', source: 'DP 50% PO Seragam Tactical', type: 'Cashflow Utama', amount: 2000000 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_cashflow_petty_list', JSON.stringify(cashflowList));
  }, [cashflowList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCf, setCurrentCf] = useState({
    id: '', date: new Date().toISOString().split('T')[0], category: 'Kas Masuk', source: '', type: 'Cashflow Utama', amount: ''
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentCf({
      id: 'CF-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      category: 'Kas Masuk',
      source: '',
      type: 'Cashflow Utama',
      amount: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    setCurrentCf(item);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentCf.source || !currentCf.amount) return;
    const formatted = { ...currentCf, amount: Number(currentCf.amount) };
    if (isEditMode) {
      setCashflowList(cashflowList.map(item => item.id === currentCf.id ? formatted : item));
    } else {
      setCashflowList([formatted, ...cashflowList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data transaksi ini?')) {
      setCashflowList(cashflowList.filter(item => item.id !== id));
    }
  };

  // Kalkulasi Total
  const totalMasuk = cashflowList.filter(i => i.category === 'Kas Masuk').reduce((acc, i) => acc + i.amount, 0);
  const totalKeluar = cashflowList.filter(i => i.category === 'Kas Keluar').reduce((acc, i) => acc + i.amount, 0);
  const saldoAkhir = totalMasuk - totalKeluar;
  const totalPettyCash = cashflowList.filter(i => i.type === 'Petty Cash' && i.category === 'Kas Keluar').reduce((acc, i) => acc + i.amount, 0);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <ArrowLeftRight className="w-4 h-4" /> Modul Finance CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Cashflow & Petty Cash (Kas Kecil)</h1>
          <p className="text-slate-400 text-sm mt-1">Pantau arus kas masuk, kas keluar, dan pengeluaran operasional harian workshop dengan mudah.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Catat Transaksi Baru
        </button>
      </div>

      {/* RINGKASAN KARTU KEUANGAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Kas Masuk</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-400">{formatRupiah(totalMasuk)}</h3>
          <p className="text-[10px] text-slate-400">Akumulasi penerimaan dana</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Kas Keluar</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <h3 className="text-xl font-extrabold text-rose-400">{formatRupiah(totalKeluar)}</h3>
          <p className="text-[10px] text-slate-400">Akumulasi pengeluaran</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Saldo Kas Bersih</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-amber-400">{formatRupiah(saldoAkhir)}</h3>
          <p className="text-[10px] text-amber-300">Sisa saldo aktif saat ini</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-amber-300 text-xs font-semibold">
            <span>Total Petty Cash (Kas Kecil)</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-white">{formatRupiah(totalPettyCash)}</h3>
          <p className="text-[10px] text-amber-400">Pengeluaran operasional harian</p>
        </div>
      </div>

      {/* GRAFIK / STATISTIK BULANAN SEDERHANA */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> Grafik & Ringkasan Per Bulan
        </h3>
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Periode Bulan: Oktober 2026</span>
            <span className="text-amber-400 font-bold">Status: Stabil</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Pemasukan Bulanan</span>
                <span className="text-emerald-400 font-bold">{formatRupiah(totalMasuk)}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Pengeluaran & Petty Cash</span>
                <span className="text-rose-400 font-bold">{formatRupiah(totalKeluar)}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full" style={{ width: totalMasuk > 0 ? `${Math.min(100, (totalKeluar / totalMasuk) * 100)}%` : '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL TRANSAKSI KAS & PETTY CASH */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" /> Daftar Riwayat Transaksi Kas & Petty Cash ({cashflowList.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Keterangan / Sumber</th>
                <th className="px-4 py-3">Jenis Kas</th>
                <th className="px-4 py-3 text-right">Nominal</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {cashflowList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> {item.date}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${item.category === 'Kas Masuk' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">{item.source}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-amber-300 rounded text-[10px]">
                      {item.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${item.category === 'Kas Masuk' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.category === 'Kas Masuk' ? '+ ' : '- '}{formatRupiah(item.amount)}
                  </td>
                  <td className="px-4 py-3 text-center space-x-1">
                    <button onClick={() => handleOpenEdit(item)} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH/EDIT TRANSAKSI */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{isEditMode ? 'Edit Transaksi Kas' : 'Catat Transaksi Baru'}</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal</label>
                <input type="date" required value={currentCf.date} onChange={e => setCurrentCf({...currentCf, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori</label>
                <select value={currentCf.category} onChange={e => setCurrentCf({...currentCf, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  <option value="Kas Masuk">Kas Masuk</option>
                  <option value="Kas Keluar">Kas Keluar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sumber / Keterangan Transaksi</label>
              <input type="text" required placeholder="Contoh: Beli jarum jahit / Pelunasan PO..." value={currentCf.source} onChange={e => setCurrentCf({...currentCf, source: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Akun</label>
                <select value={currentCf.type} onChange={e => setCurrentCf({...currentCf, type: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  <option value="Cashflow Utama">Cashflow Utama</option>
                  <option value="Petty Cash">Petty Cash (Kas Kecil)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal (Rp)</label>
                <input type="number" required placeholder="150000" value={currentCf.amount} onChange={e => setCurrentCf({...currentCf, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
