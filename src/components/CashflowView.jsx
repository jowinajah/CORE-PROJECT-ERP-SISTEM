import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, Plus, Wallet, Calendar, Tag, Trash2, Check, Filter } from 'lucide-react';

export default function CashflowView() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('core_cashflow_ledger_v2');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'TRX-001', date: '2026-10-25', type: 'IN', category: 'DP Pelanggan', desc: 'DP 50% Kemeja KKN UIN Bandung', amount: 9300000, account: 'BCA Utama' },
      { id: 'TRX-002', date: '2026-10-26', type: 'OUT', category: 'Bahan Baku Kain', desc: 'Beli 3 Roll Kain Unione Drill di Toko Kain', amount: 4500000, account: 'BCA Utama' },
      { id: 'TRX-003', date: '2026-10-27', type: 'OUT', category: 'Upah Produksi / Jahit', desc: 'Bayar Upah Penjahit Sesi 1 Kemeja KKN', amount: 2500000, account: 'Kas Tunai Workshop' },
      { id: 'TRX-004', date: '2026-10-28', type: 'IN', category: 'Pelunasan Proyek', desc: 'Pelunasan Apron Barista Cafe Kopi Senja', amount: 4750000, account: 'BCA Utama' },
      { id: 'TRX-005', date: '2026-10-29', type: 'OUT', category: 'Operasional Workshop', desc: 'Bayar Token PLN & IndiHome Bulanan', amount: 750000, account: 'BCA Utama' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_cashflow_ledger_v2', JSON.stringify(transactions));
  }, [transactions]);

  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('ALL'); // ALL, IN, OUT
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'IN',
    category: 'DP Pelanggan',
    desc: '',
    amount: '',
    account: 'BCA Utama'
  });

  // Kategori khusus konveksi & garment
  const categoriesIn = ['DP Pelanggan', 'Pelunasan Proyek', 'Penjualan Ready Stock', 'Suntikan Modal / Lainnya'];
  const categoriesOut = ['Bahan Baku Kain', 'Upah Produksi / Jahit', 'Sablon & Bordir', 'Aksesoris (Kancing/Label)', 'Operasional Workshop', 'Gaji Staff / Admin'];
  const accounts = ['BCA Utama (2838446464)', 'Kas Tunai Workshop', 'Rekening Cadangan'];

  const handleOpenAdd = (typeDefault = 'IN') => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: typeDefault,
      category: typeDefault === 'IN' ? categoriesIn[0] : categoriesOut[0],
      desc: '',
      amount: '',
      account: accounts[0]
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.desc || !formData.amount) return;

    const newTrx = {
      id: 'TRX-' + Date.now(),
      ...formData,
      amount: Number(formData.amount)
    };

    setTransactions([newTrx, ...transactions]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus catatan transaksi kas ini?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Kalkulasi Total
  let totalIn = 0;
  let totalOut = 0;
  transactions.forEach(t => {
    if (t.type === 'IN') totalIn += t.amount;
    else totalOut += t.amount;
  });
  const netBalance = totalIn - totalOut;

  // Filter transaksi
  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'IN') return t.type === 'IN';
    if (filterType === 'OUT') return t.type === 'OUT';
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-md uppercase tracking-wide">Modul Accounting & Cashflow</span>
          <h1 className="text-2xl font-black text-white mt-1">Arus Kas & Buku Kas Konveksi</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Pencatatan keluar masuk kas spesifik produksi garment (DP, Kain, Upah Jahit, Operasional).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenAdd('IN')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" /> + Kas Masuk
          </button>
          <button 
            onClick={() => handleOpenAdd('OUT')}
            className="bg-rose-500 hover:bg-rose-400 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20 cursor-pointer"
          >
            <TrendingDown className="w-4 h-4" /> - Kas Keluar
          </button>
        </div>
      </div>

      {/* RINGKASAN KARTU KEUANGAN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Kas Masuk (In)</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">{formatRupiah(totalIn)}</h3>
          <p className="text-[11px] text-slate-400">Akumulasi DP & Pelunasan Konsumen</p>
        </div>

        <div className="bg-slate-900/90 border border-rose-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-rose-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Kas Keluar (Out)</span>
            <TrendingDown className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">{formatRupiah(totalOut)}</h3>
          <p className="text-[11px] text-slate-400">Pembelian Kain, Upah Jahit & Operasional</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Saldo Kas Bersih</span>
            <Wallet className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-amber-400">{formatRupiah(netBalance)}</h3>
          <p className="text-[11px] text-slate-400">Posisi Kas Real-time Saat Ini</p>
        </div>
      </div>

      {/* TABEL BUKU KAS HARIAN */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" /> Riwayat Buku Kas & Transaksi ({filteredTransactions.length})
          </h3>

          {/* Filter Tombol */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button 
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${filterType === 'ALL' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilterType('IN')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${filterType === 'IN' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Masuk
            </button>
            <button 
              onClick={() => setFilterType('OUT')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${filterType === 'OUT' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Keluar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Kategori Konveksi</th>
                <th className="px-4 py-3">Keterangan / Uraian</th>
                <th className="px-4 py-3">Sumber Akun</th>
                <th className="px-4 py-3 text-right">Nominal (Rp)</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-slate-300 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {trx.date}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${trx.type === 'IN' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
                        {trx.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">{trx.desc}</td>
                    <td className="px-4 py-3 text-slate-400">{trx.account}</td>
                    <td className={`px-4 py-3 text-right font-black text-sm ${trx.type === 'IN' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {trx.type === 'IN' ? '+' : '-'} {formatRupiah(trx.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleDelete(trx.id)} title="Hapus Transaksi" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Belum ada data transaksi kas yang tercatat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH TRANSAKSI */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              {formData.type === 'IN' ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />}
              Tambah Catatan Kas {formData.type === 'IN' ? 'Masuk' : 'Keluar'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Kas</label>
                <select value={formData.type} onChange={e => {
                  const t = e.target.value;
                  setFormData({...formData, type: t, category: t === 'IN' ? categoriesIn[0] : categoriesOut[0]});
                }} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                  <option value="IN">Kas Masuk (IN)</option>
                  <option value="OUT">Kas Keluar (OUT)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori Transaksi Konveksi</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                {(formData.type === 'IN' ? categoriesIn : categoriesOut).map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Uraian / Keterangan Klien & Pesanan</label>
              <input type="text" required placeholder="Cth: DP 50% Kemeja KKN UIN / Beli 3 Roll Kain" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal (Rp)</label>
                <input type="number" required placeholder="5000000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-mono font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sumber Rekening / Kas</label>
                <select value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  {accounts.map((acc, i) => <option key={i} value={acc}>{acc}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Transaksi</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
