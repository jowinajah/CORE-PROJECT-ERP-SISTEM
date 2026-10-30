import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit3, Trash2, Check, Printer, Calendar, DollarSign, User } from 'lucide-react';

export default function InvoiceView() {
  const [invoiceList, setInvoiceList] = useState(() => {
    const saved = localStorage.getItem('core_invoice_list');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'INV-001', date: '2026-10-25', client: 'Hima UIN Bandung', product: 'Kemeja KKN', totalAmount: 15600000, dpAmount: 7800000, status: 'DP 50% Lunas' },
      { id: 'INV-002', date: '2026-10-28', client: 'Cafe Kopi Senja', product: 'Apron & Uniform', totalAmount: 4750000, dpAmount: 4750000, status: 'Lunas (Full)' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_invoice_list', JSON.stringify(invoiceList));
  }, [invoiceList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentInv, setCurrentInv] = useState({
    id: 'INV-003', date: new Date().toISOString().split('T')[0], client: '', product: '', totalAmount: '', dpAmount: '', status: 'Belum DP'
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentInv({
      id: 'INV-' + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().split('T')[0],
      client: '',
      product: '',
      totalAmount: '',
      dpAmount: '',
      status: 'Belum DP'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (inv) => {
    setIsEditMode(true);
    setCurrentInv(inv);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentInv.client || !currentInv.totalAmount) return;

    const total = Number(currentInv.totalAmount);
    const dp = Number(currentInv.dpAmount);
    let calculatedStatus = currentInv.status;
    if (dp >= total) calculatedStatus = 'Lunas (Full)';
    else if (dp > 0) calculatedStatus = 'DP Terbayar';
    else calculatedStatus = 'Belum DP';

    const formatted = { ...currentInv, totalAmount: total, dpAmount: dp, status: calculatedStatus };

    if (isEditMode) {
      setInvoiceList(invoiceList.map(item => item.id === currentInv.id ? formatted : item));
    } else {
      setInvoiceList([formatted, ...invoiceList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus tagihan invoice ini?')) {
      setInvoiceList(invoiceList.filter(item => item.id !== id));
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">Modul Finance CORE</span>
          <h1 className="text-2xl font-bold text-white mt-1">Invoice & Tagihan DP Konsumen</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola pembuatan tagihan, pantau pembayaran DP (Uang Muka), dan sisa pelunasan PO.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Buat Invoice Baru
        </button>
      </div>

      {/* TABEL INVOICE */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <FileText className="w-5 h-5" /> Daftar Tagihan & Status Pembayaran ({invoiceList.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. Invoice</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Konsumen & Produk</th>
                <th className="px-4 py-3 text-right">Total Tagihan</th>
                <th className="px-4 py-3 text-right">DP / Dibayar</th>
                <th className="px-4 py-3 text-right">Sisa Pelunasan</th>
                <th className="px-4 py-3 text-center">Status Pembayaran</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {invoiceList.map((inv) => {
                const sisaPelunasan = Number(inv.totalAmount) - Number(inv.dpAmount);
                return (
                  <tr key={inv.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-bold text-amber-400">{inv.id}</td>
                    <td className="px-4 py-3 text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {inv.date}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white text-sm">{inv.client}</p>
                      <p className="text-slate-400 text-[11px]">{inv.product}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">{formatRupiah(inv.totalAmount)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">{formatRupiah(inv.dpAmount)}</td>
                    <td className="px-4 py-3 text-right font-bold text-rose-400">{formatRupiah(sisaPelunasan)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${inv.status.includes('Lunas') ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => window.print()} title="Cetak / Print" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Printer className="w-4 h-4" /></button>
                      <button onClick={() => handleOpenEdit(inv)} title="Edit" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(inv.id)} title="Hapus" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH/EDIT INVOICE */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{isEditMode ? 'Edit Tagihan Invoice' : 'Buat Invoice & Tagihan Baru'}</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. Invoice</label>
                <input type="text" required value={currentInv.id} onChange={e => setCurrentInv({...currentInv, id: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal</label>
                <input type="date" required value={currentInv.date} onChange={e => setCurrentInv({...currentInv, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Konsumen / Klien</label>
              <input type="text" required placeholder="Contoh: PT Makmur Jaya" value={currentInv.client} onChange={e => setCurrentInv({...currentInv, client: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Produk / Keterangan PO</label>
              <input type="text" required placeholder="Contoh: Kemeja PDH 100 Pcs" value={currentInv.product} onChange={e => setCurrentInv({...currentInv, product: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Total Tagihan (Rp)</label>
                <input type="number" required placeholder="15000000" value={currentInv.totalAmount} onChange={e => setCurrentInv({...currentInv, totalAmount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">DP / Bayar Awal (Rp)</label>
                <input type="number" required placeholder="7500000" value={currentInv.dpAmount} onChange={e => setCurrentInv({...currentInv, dpAmount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Invoice</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
