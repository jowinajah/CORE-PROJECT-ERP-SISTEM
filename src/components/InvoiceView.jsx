import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit3, Trash2, Check, Printer, Calendar, ArrowLeft, X, Download } from 'lucide-react';

export default function InvoiceView() {
  const [invoiceList, setInvoiceList] = useState(() => {
    const saved = localStorage.getItem('core_invoice_list_simple_v1');
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
        status: 'Paid DP' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_invoice_list_simple_v1', JSON.stringify(invoiceList));
  }, [invoiceList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [currentInv, setCurrentInv] = useState({
    id: 'INV-2026-003', 
    date: new Date().toISOString().split('T')[0], 
    client: '', 
    items: [{ description: '', qty: '', price: '' }],
    dpAmount: '', 
    status: 'Unpaid'
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
      status: 'Unpaid'
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

  const handleDownloadPDF = () => {
    window.print();
  };

  // PREVIEW INVOICE SIMPLE 1 LEMBAR A4
  if (previewInvoice) {
    const sisaPelunasan = Number(previewInvoice.totalAmount) - Number(previewInvoice.dpAmount);
    return (
      <div className="max-w-[210mm] mx-auto text-slate-900 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl relative font-sans print:shadow-none print:p-6 print:w-full print:rounded-none">
        
        {/* Tombol Kembali / Unduh (Disembunyikan saat print) */}
        <div className="flex justify-between items-center print:hidden border-b border-slate-200 pb-3 mb-6">
          <button 
            onClick={() => setPreviewInvoice(null)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-2 shadow cursor-pointer"
          >
            <Download className="w-4 h-4" /> Unduh / Cetak PDF (A4)
          </button>
        </div>

        {/* HEADER / KOP INVOICE */}
        <div className="flex justify-between items-start border-b border-slate-300 pb-4 mb-4">
          <div>
            <h1 className="text-lg font-black tracking-wider uppercase text-slate-950">CORE PROJECT</h1>
            <p className="text-[11px] text-slate-600 mt-0.5">Konveksi, Garment, & Seragam Specialist</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">
              Jl. Sindangreret No. 25 & Jl. Cibiru Tonggoh No. 07, RT.04, <br/>
              Cibiru Wetan, Kec. Cibiru, Kota Bandung, Jawa Barat 40625<br/>
              Admin WA: <strong>081312646490</strong>
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-wider">INVOICE</h2>
            <p className="text-xs font-bold text-amber-700 mt-0.5">{previewInvoice.id}</p>
            <p className="text-[11px] text-slate-500">Tanggal: {previewInvoice.date}</p>
            <span className={`inline-block mt-1 px-2.5 py-0.5 text-[9px] font-extrabold rounded ${previewInvoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : previewInvoice.status === 'Paid DP' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
              {previewInvoice.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* INFORMASI KLIEN & PEMBAYARAN */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Kepada Yth:</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{previewInvoice.client}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pembayaran Transfer:</span>
            <p className="font-bold text-slate-900 mt-0.5">BCA: 2838446464</p>
            <p className="text-[11px] text-slate-600">a.n. Core Cipta Mode PT</p>
          </div>
        </div>

        {/* TABEL ITEM */}
        <table className="w-full text-left text-xs mb-4">
          <thead className="bg-slate-900 text-white uppercase text-[10px]">
            <tr>
              <th className="px-3 py-2 rounded-l-lg">Jenis Produk / Model Pesanan</th>
              <th className="px-3 py-2 text-center">Qty</th>
              <th className="px-3 py-2 text-right">Harga Satuan</th>
              <th className="px-3 py-2 text-right rounded-r-lg">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {previewInvoice.items.map((item, idx) => {
              const subtotal = Number(item.qty) * Number(item.price);
              return (
                <tr key={idx}>
                  <td className="px-3 py-2.5 font-medium">{idx + 1}. {item.description}</td>
                  <td className="px-3 py-2.5 text-center font-bold">{item.qty} Pcs</td>
                  <td className="px-3 py-2.5 text-right">{formatRupiah(item.price)}</td>
                  <td className="px-3 py-2.5 text-right font-bold">{formatRupiah(subtotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* RINGKASAN TOTAL */}
        <div className="flex justify-end mb-6">
          <div className="w-64 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Tagihan:</span>
              <span className="font-bold text-slate-900">{formatRupiah(previewInvoice.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>DP Terbayar:</span>
              <span>- {formatRupiah(previewInvoice.dpAmount)}</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 flex justify-between text-xs font-extrabold text-rose-600">
              <span>Sisa Pelunasan:</span>
              <span>{formatRupiah(sisaPelunasan)}</span>
            </div>
          </div>
        </div>

        {/* CATATAN & TANDA TANGAN (COMPACT 1 LEMBAR) */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-600">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Catatan:</p>
            <p className="text-slate-500">1. Pesanan yang diproduksi tidak dapat dibatalkan.</p>
            <p className="text-slate-500">2. Pelunasan dilakukan sebelum pengiriman.</p>
            <p className="font-bold text-amber-700 pt-1">Terimakasih Telah Order!</p>
          </div>
          <div className="text-center space-y-8">
            <p className="text-slate-700">Hormat Kami,<br/><strong className="text-slate-950">FINANCE CORE PROJECT</strong></p>
            <p className="font-bold text-amber-700 underline">( Bagian Keuangan )</p>
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
          <p className="text-slate-400 text-sm mt-1">Kelola tagihan multi-produk, rekening PT Core Cipta Mode, dan unduh nota format A4.</p>
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
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${inv.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : inv.status === 'Paid DP' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
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

      {/* MODAL TAMBAH/EDIT INVOICE */}
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
                <select value={currentInv.status} onChange={e => setCurrentInjStatus(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid DP">Paid DP</option>
                  <option value="Paid">Paid</option>
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
