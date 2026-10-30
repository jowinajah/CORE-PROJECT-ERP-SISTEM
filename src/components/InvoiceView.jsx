import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit3, Trash2, Check, Printer, Calendar, ArrowLeft, X, DollarSign } from 'lucide-react';

export default function InvoiceView() {
  const [invoiceList, setInvoiceList] = useState(() => {
    const saved = localStorage.getItem('core_invoice_list_v3');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { 
        id: 'INV-2026-001', 
        date: '2026-10-25', 
        client: 'Hima UIN Bandung', 
        items: [
          { description: 'Kemeja KKN (Nagata Drill)', qty: 120, price: 130000 },
          { description: 'Topi KKN Bordir Logo Custom', qty: 120, price: 25000 }
        ],
        totalAmount: 18600000,
        dpAmount: 9300000, 
        status: 'UNPAID' 
      },
      { 
        id: 'INV-2026-002', 
        date: '2026-10-28', 
        client: 'Cafe Kopi Senja', 
        items: [
          { description: 'Apron Barista Kanvas Premium', qty: 50, price: 95000 }
        ],
        totalAmount: 4750000,
        dpAmount: 4750000, 
        status: 'PAID' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_invoice_list_v3', JSON.stringify(invoiceList));
  }, [invoiceList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [currentInv, setCurrentInv] = useState({
    id: 'INV-2026-003', 
    date: new Date().toISOString().split('T')[0], 
    client: '', 
    items: [{ description: '', qty: '', price: '' }],
    dpAmount: '', 
    status: 'UNPAID'
  });

  const [previewInvoice, setPreviewInvoice] = useState(null);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentInv({
      id: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().split('T')[0],
      client: '',
      items: [{ description: '', qty: '', price: '' }],
      dpAmount: '',
      status: 'UNPAID'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (inv) => {
    setIsEditMode(true);
    setCurrentInv(inv);
    setShowModal(true);
  };

  const handleAddItemRow = () => {
    setCurrentInv({
      ...currentInv,
      items: [...currentInv.items, { description: '', qty: '', price: '' }]
    });
  };

  const handleRemoveItemRow = (index) => {
    if (currentInv.items.length === 1) return;
    const updatedItems = currentInv.items.filter((_, i) => i !== index);
    setCurrentInv({ ...currentInv, items: updatedItems });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...currentInv.items];
    updatedItems[index][field] = value;
    setCurrentInv({ ...currentInv, items: updatedItems });
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentInv.client || currentInv.items.length === 0) return;

    const total = calculateTotal(currentInv.items);
    const dp = Number(currentInv.dpAmount) || 0;

    const formatted = { 
      ...currentInv, 
      items: currentInv.items.map(i => ({ description: i.description, qty: Number(i.qty), price: Number(i.price) })),
      totalAmount: total, 
      dpAmount: dp
    };

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

  // PREVIEW INVOICE PROFESIONAL UNTUK PELANGGAN
  if (previewInvoice) {
    const sisaPelunasan = Number(previewInvoice.totalAmount) - Number(previewInvoice.dpAmount);
    return (
      <div className="space-y-6 max-w-4xl mx-auto text-slate-900 bg-white p-8 sm:p-12 rounded-3xl shadow-2xl relative font-sans">
        <div className="flex justify-between items-center print:hidden border-b border-slate-200 pb-4 mb-6">
          <button 
            onClick={() => setPreviewInvoice(null)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Invoice
          </button>
          <button 
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / Unduh PDF Invoice
          </button>
        </div>

        {/* KOP SURAT INVOICE */}
        <div className="flex justify-between items-start border-b-2 border-amber-500 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 font-bold transform rotate-45">
                <div className="transform -rotate-45 text-xs">C</div>
              </div>
              <h1 className="text-xl font-extrabold tracking-widest uppercase text-slate-950">CORE PROJECT</h1>
            </div>
            <p className="text-xs text-slate-500">Konveksi, Garment, Seragam, & Digital Mockup Specialist</p>
            <p className="text-[11px] text-slate-500">Workshop: Bandung, Jawa Barat | Telp/WA: 0812-3456-7890</p>
          </div>
          <div className="text-right space-y-1">
            <h2 className="text-2xl font-black text-amber-600 uppercase tracking-wider">INVOICE RESMI</h2>
            <p className="text-xs font-bold text-slate-700">{previewInvoice.id}</p>
            <p className="text-xs text-slate-500">Tanggal: {previewInvoice.date}</p>
            <span className={`inline-block mt-1 px-3 py-1 text-[10px] font-extrabold rounded-full ${previewInvoice.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              STATUS: {previewInvoice.status}
            </span>
          </div>
        </div>

        {/* INFORMASI KLIEN & REKENING */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kepada Yth:</p>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{previewInvoice.client}</h3>
            <p className="text-xs text-slate-600">Pelanggan Setia CORE Project</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metode Pembayaran:</p>
            <p className="text-xs font-bold text-slate-900 mt-0.5">Transfer Bank BCA: 2838446464</p>
            <p className="text-xs text-slate-600">a.n. Core Cipta Mode PT</p>
          </div>
        </div>

        {/* TABEL MULTI-ITEM PESANAN */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">No. Jenis Produk & Model Pesanan</th>
                <th className="px-4 py-3 text-center">Jumlah (Qty)</th>
                <th className="px-4 py-3 text-right">Harga Satuan</th>
                <th className="px-4 py-3 text-right rounded-r-xl">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {previewInvoice.items.map((item, idx) => {
                const subtotal = Number(item.qty) * Number(item.price);
                return (
                  <tr key={idx}>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      {idx + 1}. {item.description}
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-slate-800">{item.qty} Pcs</td>
                    <td className="px-4 py-4 text-right text-slate-700">{formatRupiah(item.price)}</td>
                    <td className="px-4 py-4 text-right font-bold text-slate-900">{formatRupiah(subtotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* RINCIAN TOTAL & PEMBAYARAN */}
        <div className="flex justify-end pt-4">
          <div className="w-72 space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Tagihan:</span>
              <span className="font-bold text-slate-900">{formatRupiah(previewInvoice.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>DP / Uang Muka Terbayar:</span>
              <span>- {formatRupiah(previewInvoice.dpAmount)}</span>
            </div>
            <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-extrabold text-rose-600">
              <span>Sisa Pelunasan:</span>
              <span>{formatRupiah(sisaPelunasan)}</span>
            </div>
          </div>
        </div>

        {/* CATATAN & TANDA TANGAN */}
        <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Catatan:</p>
            <p className="text-[11px] text-slate-500">1. Barang yang sudah diproduksi tidak dapat dibatalkan.</p>
            <p className="text-[11px] text-slate-500">2. Pelunasan wajib dilakukan sebelum pengiriman pesanan.</p>
          </div>
          <div className="text-center space-y-12">
            <p className="font-semibold text-slate-800">Hormat Kami,<br/><strong className="text-slate-950">Tim Finance CORE Project</strong></p>
            <p className="text-[11px] font-bold text-amber-600 underline">( Bagian Keuangan CORE Project )</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">Modul Finance CORE</span>
          <h1 className="text-2xl font-bold text-white mt-1">Invoice & Tagihan DP Konsumen</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola tagihan multi-produk, rekening PT Core Cipta Mode, dan status PAID/UNPAID.</p>
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
                <th className="px-4 py-3">Nama Konsumen & Ringkasan Item</th>
                <th className="px-4 py-3 text-right">Total Tagihan</th>
                <th className="px-4 py-3 text-right">DP / Dibayar</th>
                <th className="px-4 py-3 text-right">Sisa Pelunasan</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi & Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {invoiceList.map((inv) => {
                const sisaPelunasan = Number(inv.totalAmount) - Number(inv.dpAmount);
                const itemSummary = inv.items ? inv.items.map(i => `${i.description} (${i.qty} Pcs)`).join(', ') : '';
                return (
                  <tr key={inv.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-bold text-amber-400">{inv.id}</td>
                    <td className="px-4 py-3 text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {inv.date}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white text-sm">{inv.client}</p>
                      <p className="text-slate-400 text-[11px] truncate max-w-xs">{itemSummary}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">{formatRupiah(inv.totalAmount)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">{formatRupiah(inv.dpAmount)}</td>
                    <td className="px-4 py-3 text-right font-bold text-rose-400">{formatRupiah(sisaPelunasan)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${inv.status === 'PAID' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => setPreviewInvoice(inv)} title="Lihat & Cetak Nota Profesional" className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 rounded-lg text-[10px] font-bold cursor-pointer inline-flex items-center gap-1">
                        <Printer className="w-3.5 h-3.5" /> Nota
                      </button>
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

      {/* MODAL TAMBAH/EDIT INVOICE DENGAN TOTAL HASIL OTOMATIS */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-amber-400">{isEditMode ? 'Edit Tagihan Invoice' : 'Buat Invoice Multi-Item Baru'}</h3>
            
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

            {/* DAFTAR ITEM / MODEL PESANAN */}
            <div className="space-y-3 border-t border-slate-800 pt-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">Rincian Jenis Produk & Model Pesanan:</label>
                <button 
                  type="button" 
                  onClick={handleAddItemRow}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Tambah Model Lain
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {currentInv.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        required 
                        placeholder="Nama Produk / Model (Cth: Kemeja PDH)" 
                        value={item.description} 
                        onChange={e => handleItemChange(index, 'description', e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="w-20">
                      <input 
                        type="number" 
                        required 
                        placeholder="Qty" 
                        value={item.qty} 
                        onChange={e => handleItemChange(index, 'qty', e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                    <div className="w-28">
                      <input 
                        type="number" 
                        required 
                        placeholder="Harga/Pcs" 
                        value={item.price} 
                        onChange={e => handleItemChange(index, 'price', e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white text-right"
                      />
                    </div>
                    {currentInv.items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItemRow(index)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg cursor-pointer"
                        title="Hapus Baris"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* KOLOM TOTAL HASIL KESELURUHAN PESANAN */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase font-bold">Total Hasil Keseluruhan Pesanan:</span>
                <span className="text-base font-extrabold text-amber-400">{formatRupiah(calculateTotal(currentInv.items))}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">DP / Uang Muka (Rp)</label>
                <input type="number" required placeholder="5000000" value={currentInv.dpAmount} onChange={e => setCurrentInv({...currentInv, dpAmount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Status Pembayaran</label>
                <select value={currentInv.status} onChange={e => setCurrentInv({...currentInv, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                  <option value="UNPAID">UNPAID (Belum Lunas / DP)</option>
                  <option value="PAID">PAID (Lunas Penuh)</option>
                </select>
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
