import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Edit3, Trash2, DollarSign, PieChart, Check, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinanceViews({ tab }) {
  // 1. State Data PO & HPP (Pendapatan & HPP Produk) dengan localStorage
  const [poFinanceList, setPoFinanceList] = useState(() => {
    const saved = localStorage.getItem('core_finance_po_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'PO-001', client: 'Himpunan Mahasiswa UIN Bandung', product: 'Kemeja KKN (Nagata Drill)', qty: 120, sellPrice: 130000, hppPrice: 85000 },
      { id: 'PO-002', client: 'Cafe Kopi Senja', product: 'Apron & Barista Shirt', qty: 45, sellPrice: 90000, hppPrice: 55000 },
      { id: 'PO-003', client: 'X-Rider Community', product: 'Jersey Sublimasi Fullprint', qty: 80, sellPrice: 150000, hppPrice: 95000 },
    ];
  });

  // 2. State Biaya Operasional dengan localStorage
  const [operationalCostList, setOperationalCostList] = useState(() => {
    const saved = localStorage.getItem('core_finance_op_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'OP-1', name: 'Gaji Pegawai Office & Penjahit Bulanan', amount: 4500000 },
      { id: 'OP-2', name: 'Listrik, Air & Internet Workshop', amount: 850000 },
      { id: 'OP-3', name: 'Biaya Marketing & Iklan Sosmed', amount: 500000 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_finance_po_list', JSON.stringify(poFinanceList));
  }, [poFinanceList]);

  useEffect(() => {
    localStorage.setItem('core_finance_op_list', JSON.stringify(operationalCostList));
  }, [operationalCostList]);

  // Modal States untuk PO / HPP
  const [showPoModal, setShowPoModal] = useState(false);
  const [poEdit, setPoEdit] = useState(null);
  const [poForm, setPoForm] = useState({ id: '', client: '', product: '', qty: '', sellPrice: '', hppPrice: '' });

  // Modal States untuk Biaya Operasional
  const [showOpModal, setShowOpModal] = useState(false);
  const [opEdit, setOpEdit] = useState(null);
  const [opForm, setOpForm] = useState({ id: '', name: '', amount: '' });

  // Kalkulasi Otomatis Keuangan
  const totalRevenue = poFinanceList.reduce((acc, item) => acc + (Number(item.qty) * Number(item.sellPrice)), 0);
  const totalHpp = poFinanceList.reduce((acc, item) => acc + (Number(item.qty) * Number(item.hppPrice)), 0);
  const grossProfit = totalRevenue - totalHpp;
  const totalOperational = operationalCostList.reduce((acc, item) => acc + Number(item.amount), 0);
  const netProfit = grossProfit - totalOperational;

  // Handlers PO & HPP
  const handleSavePo = (e) => {
    e.preventDefault();
    if (!poForm.id || !poForm.client) return;
    const formattedData = {
      ...poForm,
      qty: Number(poForm.qty),
      sellPrice: Number(poForm.sellPrice),
      hppPrice: Number(poForm.hppPrice)
    };
    if (poEdit) {
      setPoFinanceList(poFinanceList.map(item => item.id === poEdit.id ? formattedData : item));
      setPoEdit(null);
    } else {
      setPoFinanceList([formattedData, ...poFinanceList]);
    }
    setPoForm({ id: '', client: '', product: '', qty: '', sellPrice: '', hppPrice: '' });
    setShowPoModal(false);
  };

  const handleDeletePo = (id) => {
    if (confirm('Yakin ingin menghapus data transaksi PO ini?')) {
      setPoFinanceList(poFinanceList.filter(item => item.id !== id));
    }
  };

  // Handlers Operasional
  const handleSaveOp = (e) => {
    e.preventDefault();
    if (!opForm.name || !opForm.amount) return;
    const formattedOp = { ...opForm, amount: Number(opForm.amount) };
    if (opEdit) {
      setOperationalCostList(operationalCostList.map(op => op.id === opEdit.id ? formattedOp : op));
      setOpEdit(null);
    } else {
      setOperationalCostList([...operationalCostList, { ...formattedOp, id: 'OP-' + Date.now() }]);
    }
    setOpForm({ id: '', name: '', amount: '' });
    setShowOpModal(false);
  };

  const handleDeleteOp = (id) => {
    if (confirm('Yakin ingin menghapus biaya operasional ini?')) {
      setOperationalCostList(operationalCostList.filter(op => op.id !== id));
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <TrendingUp className="w-4 h-4" /> Modul Laba Rugi (P&L) Konveksi CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Laporan Keuangan & Analisis Laba Rugi</h1>
          <p className="text-slate-400 text-sm mt-1">Perhitungan otomatis bersumber dari Uang Masuk PO dikurangi HPP Produk dan Biaya Operasional.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setPoEdit(null); setPoForm({ id: `PO-00${poFinanceList.length + 1}`, client: '', product: '', qty: '', sellPrice: '', hppPrice: '' }); setShowPoModal(true); }} className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer">
            <Plus className="w-4 h-4" /> Tambah Transaksi PO & HPP
          </button>
        </div>
      </div>

      {/* RINGKASAN EKSEKUTIF / KARTU LABA RUGI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Uang Masuk (PO)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-xl font-extrabold text-white">{formatRupiah(totalRevenue)}</h3>
          <p className="text-[10px] text-emerald-400 font-medium">Akumulasi penjualan kotor konveksi</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total HPP Produk</span>
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
          </div>
          <h3 className="text-xl font-extrabold text-white">{formatRupiah(totalHpp)}</h3>
          <p className="text-[10px] text-rose-400 font-medium">Bahan baku, upah jahit & bordir</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Laba Kotor (Gross Profit)</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-amber-400">{formatRupiah(grossProfit)}</h3>
          <p className="text-[10px] text-amber-300 font-medium">Pendapatan dikurangi HPP</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-amber-300 text-xs font-semibold">
            <span>Laba Bersih (Net Profit)</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-400">{formatRupiah(netProfit)}</h3>
          <p className="text-[10px] text-amber-400 font-medium">Hasil akhir setelah biaya operasional</p>
        </div>
      </div>

      {/* TABEL 1: RINCIAN PENDAPATAN & HPP PER PO */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Rincian Uang Masuk PO & HPP Produk
          </h3>
          <span className="text-xs text-slate-400">{poFinanceList.length} Proyek PO Tercatat</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. PO & Klien</th>
                <th className="px-4 py-3">Produk / Jenis Pakaian</th>
                <th className="px-4 py-3 text-center">Qty (Pcs)</th>
                <th className="px-4 py-3 text-right">Harga Jual / Pcs</th>
                <th className="px-4 py-3 text-right">HPP / Pcs</th>
                <th className="px-4 py-3 text-right">Total Laba Kotor</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {poFinanceList.map((item, idx) => {
                const itemRevenue = Number(item.qty) * Number(item.sellPrice);
                const itemHpp = Number(item.qty) * Number(item.hppPrice);
                const itemProfit = itemRevenue - itemHpp;
                return (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <p className="font-bold text-amber-400">{item.id}</p>
                      <p className="text-white font-semibold">{item.client}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{item.product}</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-400">{item.qty} Pcs</td>
                    <td className="px-4 py-3 text-right text-slate-300">{formatRupiah(item.sellPrice)}</td>
                    <td className="px-4 py-3 text-right text-rose-400">{formatRupiah(item.hppPrice)}</td>
                    <td className="px-4 py-3 text-right font-bold text-amber-300">{formatRupiah(itemProfit)}</td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => { setPoEdit(item); setPoForm(item); setShowPoModal(true); }} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeletePo(item.id)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABEL 2: BIAYA OPERASIONAL */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <PieChart className="w-5 h-5" /> Biaya Operasional Bulanan
          </h3>
          <button onClick={() => { setOpEdit(null); setOpForm({ id: '', name: '', amount: '' }); setShowOpModal(true); }} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Tambah Biaya
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Nama Pengeluaran Operasional</th>
                <th className="px-4 py-3 text-right">Jumlah Nominal</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {operationalCostList.map((op) => (
                <tr key={op.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-semibold text-white">{op.name}</td>
                  <td className="px-4 py-3 text-right font-bold text-rose-400">{formatRupiah(op.amount)}</td>
                  <td className="px-4 py-3 text-center space-x-1">
                    <button onClick={() => { setOpEdit(op); setOpForm(op); setShowOpModal(true); }} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteOp(op.id)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH/EDIT PO & HPP */}
      {showPoModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePo} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{poEdit ? 'Edit Transaksi PO & HPP' : 'Tambah Transaksi PO & HPP Baru'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. PO</label>
                <input type="text" required placeholder="PO-004" value={poForm.id} onChange={e => setPoForm({...poForm, id: e.target.value})} disabled={poEdit} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Konsumen</label>
                <input type="text" required placeholder="PT Makmur Jaya" value={poForm.client} onChange={e => setPoForm({...poForm, client: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Produk / Pakaian</label>
              <input type="text" required placeholder="Kemeja PDH American Drill" value={poForm.product} onChange={e => setPoForm({...poForm, product: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jumlah (Qty)</label>
                <input type="number" required placeholder="100" value={poForm.qty} onChange={e => setPoForm({...poForm, qty: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Harga Jual / Pcs</label>
                <input type="number" required placeholder="120000" value={poForm.sellPrice} onChange={e => setPoForm({...poForm, sellPrice: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">HPP / Pcs</label>
                <input type="number" required placeholder="75000" value={poForm.hppPrice} onChange={e => setPoForm({...poForm, hppPrice: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowPoModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Data</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL FORM TAMBAH/EDIT BIAYA OPERASIONAL */}
      {showOpModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveOp} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{opEdit ? 'Edit Biaya Operasional' : 'Tambah Biaya Operasional'}</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Pengeluaran</label>
              <input type="text" required placeholder="Contoh: Biaya Transportasi..." value={opForm.name} onChange={e => setOpForm({...opForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal (Rp)</label>
              <input type="number" required placeholder="Contoh: 350000" value={opForm.amount} onChange={e => setOpForm({...opForm, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowOpModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
