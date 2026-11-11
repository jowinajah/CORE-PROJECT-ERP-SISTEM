import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, Plus, Wallet, Calendar, Trash2, Check, Edit3, Paperclip, Eye, X, Image as ImageIcon, Sparkles, ScanLine, Loader2 } from 'lucide-react';

export default function CashflowView() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('core_cashflow_ledger_v3');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'TRX-001', date: '2026-10-25', type: 'IN', category: 'DP Pelanggan', desc: 'DP 50% Kemeja KKN UIN Bandung', amount: 9300000, account: 'BCA Utama', proofName: 'nota_dp.jpg', proof: '' },
      { id: 'TRX-002', date: '2026-10-26', type: 'OUT', category: 'Bahan Baku Kain', desc: 'Beli 3 Roll Kain Unione Drill', amount: 4500000, account: 'BCA Utama', proofName: 'struk_kain.jpg', proof: '' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_cashflow_ledger_v3', JSON.stringify(transactions));
  }, [transactions]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [filterType, setFilterType] = useState('ALL'); // ALL, IN, OUT
  const [previewImage, setPreviewImage] = useState(null); 
  
  // State khusus AI Scan Nota
  const [showScanModal, setShowScanModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPreview, setScanPreview] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'IN',
    category: 'DP Pelanggan',
    desc: '',
    amount: '',
    account: 'BCA Utama (2838446464)',
    proofName: '',
    proof: ''
  });

  const categoriesIn = ['DP Pelanggan', 'Pelunasan Proyek', 'Penjualan Ready Stock', 'Suntikan Modal / Lainnya'];
  const categoriesOut = ['Bahan Baku Kain', 'Upah Produksi / Jahit', 'Sablon & Bordir', 'Aksesoris (Kancing/Label)', 'Operasional Workshop', 'Gaji Staff / Admin'];
  const accounts = ['BCA Utama (2838446464)', 'Kas Tunai Workshop', 'Rekening Cadangan'];

  const handleOpenAdd = (typeDefault = 'IN') => {
    setIsEditMode(false);
    setCurrentId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: typeDefault,
      category: typeDefault === 'IN' ? categoriesIn[0] : categoriesOut[0],
      desc: '',
      amount: '',
      account: accounts[0],
      proofName: '',
      proof: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (trx) => {
    setIsEditMode(true);
    setCurrentId(trx.id);
    setFormData({
      date: trx.date,
      type: trx.type,
      category: trx.category,
      desc: trx.desc,
      amount: trx.amount,
      account: trx.account,
      proofName: trx.proofName || '',
      proof: trx.proof || ''
    });
    setShowModal(true);
  };

  // Simulasi AI Scan Nota & Ekstraksi Otomatis
  const handleAiScanUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setScanPreview(base64Image);
      setShowScanModal(true);
      setIsScanning(true);

      // Simulasi proses AI OCR membaca nota konveksi selama 2 detik
      setTimeout(() => {
        // Deteksi cerdas simulasi berdasarkan nama file atau acak cerdas untuk konveksi
        const isPengeluaran = file.name.toLowerCase().includes('beli') || file.name.toLowerCase().includes('struk') || file.name.toLowerCase().includes('kain') || Math.random() > 0.5;
        
        setFormData({
          date: new Date().toISOString().split('T')[0],
          type: isPengeluaran ? 'OUT' : 'IN',
          category: isPengeluaran ? 'Bahan Baku Kain' : 'Pelunasan Proyek',
          desc: isPengeluaran ? 'Belanja Material Kain / Perlengkapan Konveksi (AI Scanned)' : 'Pembayaran Klien Proyek Konveksi (AI Scanned)',
          amount: Math.floor(1500000 + Math.random() * 5000000),
          account: 'BCA Utama (2838446464)',
          proofName: file.name,
          proof: base64Image
        });
        setIsScanning(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          proofName: file.name,
          proof: reader.result 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.desc || !formData.amount) return;

    if (isEditMode) {
      setTransactions(transactions.map(t => t.id === currentId ? { ...t, ...formData, amount: Number(formData.amount) } : t));
    } else {
      const newTrx = {
        id: 'TRX-' + Date.now(),
        ...formData,
        amount: Number(formData.amount)
      };
      setTransactions([newTrx, ...transactions]);
    }
    setShowModal(false);
    setShowScanModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus catatan transaksi kas ini?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Kalkulasi Total Real-time
  let totalIn = 0;
  let totalOut = 0;
  transactions.forEach(t => {
    if (t.type === 'IN') totalIn += t.amount;
    else totalOut += t.amount;
  });
  const netBalance = totalIn - totalOut;

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'IN') return t.type === 'IN';
    if (filterType === 'OUT') return t.type === 'OUT';
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER DENGAN FITUR AI SCAN NOTA */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-md uppercase tracking-wide">Modul Accounting & AI OCR</span>
          <h1 className="text-2xl font-black text-white mt-1">Arus Kas & AI Scan Nota Otomatis</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Scan nota pemasukan/pengeluaran otomatis menyesuaikan saldo kas secara real-time.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* TOMBOL AI SCAN NOTA */}
          <label className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/30 cursor-pointer transition-all">
            <Sparkles className="w-4 h-4 animate-bounce" /> 🤖 AI Scan Nota Otomatis
            <input type="file" accept="image/*" onChange={handleAiScanUpload} className="hidden" />
          </label>

          <button 
            onClick={() => handleOpenAdd('IN')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" /> + Masuk
          </button>
          <button 
            onClick={() => handleOpenAdd('OUT')}
            className="bg-rose-500 hover:bg-rose-400 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20 cursor-pointer"
          >
            <TrendingDown className="w-4 h-4" /> - Keluar
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
          <p className="text-[11px] text-slate-400">Akumulasi Pemasukan Konveksi</p>
        </div>

        <div className="bg-slate-900/90 border border-rose-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-rose-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Kas Keluar (Out)</span>
            <TrendingDown className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-white">{formatRupiah(totalOut)}</h3>
          <p className="text-[11px] text-slate-400">Akumulasi Pengeluaran Produksi</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Saldo Kas Bersih</span>
            <Wallet className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-amber-400">{formatRupiah(netBalance)}</h3>
          <p className="text-[11px] text-slate-400">Posisi Saldo Real-time</p>
        </div>
      </div>

      {/* TABEL BUKU KAS HARIAN */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" /> Riwayat Buku Kas & Catatan Nota ({filteredTransactions.length})
          </h3>

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
              Pemasukan
            </button>
            <button 
              onClick={() => setFilterType('OUT')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${filterType === 'OUT' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Pengeluaran
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Jenis Nota & Kategori</th>
                <th className="px-4 py-3">Uraian / Keterangan</th>
                <th className="px-4 py-3">Sumber Akun</th>
                <th className="px-4 py-3 text-center">Bukti Nota</th>
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
                        {trx.type === 'IN' ? '📥 Pemasukan: ' : '📤 Pengeluaran: '} {trx.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">{trx.desc}</td>
                    <td className="px-4 py-3 text-slate-400">{trx.account}</td>
                    <td className="px-4 py-3 text-center">
                      {trx.proof ? (
                        <button 
                          onClick={() => setPreviewImage(trx.proof)}
                          className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Lihat Nota
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[10px]">Tidak ada</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-right font-black text-sm ${trx.type === 'IN' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {trx.type === 'IN' ? '+' : '-'} {formatRupiah(trx.amount)}
                    </td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => handleOpenEdit(trx)} title="Edit Transaksi" className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 cursor-pointer inline-block">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(trx.id)} title="Hapus Transaksi" className="p-1.5 text-rose-400 hover:text-white rounded hover:bg-rose-500/20 cursor-pointer inline-block">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-500">Belum ada data transaksi kas yang tercatat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL AI SCAN NOTA & REVIEW HASIL EKSTRAKSI */}
      {showScanModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 p-6 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> AI OCR Scan Nota Konveksi
              </h3>
              <button onClick={() => setShowScanModal(false)} className="text-slate-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isScanning ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">AI sedang memindai nota & membaca nominal...</p>
                  <p className="text-xs text-slate-400">Menganalisis jenis pemasukan/pengeluaran dan rincian transaksi.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="h-24 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    {scanPreview ? <img src={scanPreview} alt="Nota" className="h-full w-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-600" />}
                  </div>
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">✅ Berhasil Terbaca AI</span>
                    <p className="text-xs text-slate-300 font-medium">Data nota berhasil diekstrak otomatis. Silakan periksa kembali sebelum disimpan.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Nota</label>
                    <select value={formData.type} onChange={e => {
                      const t = e.target.value;
                      setFormData({...formData, type: t, category: t === 'IN' ? categoriesIn[0] : categoriesOut[0]});
                    }} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                      <option value="IN">📥 Pemasukan</option>
                      <option value="OUT">📤 Pengeluaran</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori Konveksi</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                    {(formData.type === 'IN' ? categoriesIn : categoriesOut).map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Uraian / Keterangan</label>
                  <input type="text" required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal Terbaca (Rp)</label>
                    <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-mono font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sumber Rekening</label>
                    <select value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                      {accounts.map((acc, i) => <option key={i} value={acc}>{acc}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowScanModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
                  <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
                    <Check className="w-4 h-4" /> Simpan & Perbarui Saldo Kas
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL PRATINJAU BUKTI NOTA */}
      {previewImage && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 p-4 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Pratinjau Bukti / Nota Transaksi
              </h3>
              <button onClick={() => setPreviewImage(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl flex items-center justify-center border border-slate-800 max-h-[70vh] overflow-auto">
              <img src={previewImage} alt="Bukti Transaksi" className="max-w-full h-auto rounded-lg object-contain" />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setPreviewImage(null)} className="px-4 py-2 bg-slate-800 text-xs font-bold rounded-xl cursor-pointer">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH & EDIT TRANSAKSI MANUAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              {formData.type === 'IN' ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />}
              {isEditMode ? 'Edit Transaksi Kas' : `Tambah Kas ${formData.type === 'IN' ? 'Pemasukan' : 'Pengeluaran'}`}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Nota</label>
                <select value={formData.type} onChange={e => {
                  const t = e.target.value;
                  setFormData({...formData, type: t, category: t === 'IN' ? categoriesIn[0] : categoriesOut[0]});
                }} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold">
                  <option value="IN">📥 Pemasukan</option>
                  <option value="OUT">📤 Pengeluaran</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori Konveksi</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                {(formData.type === 'IN' ? categoriesIn : categoriesOut).map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Uraian / Keterangan Klien & Pesanan</label>
              <input type="text" required placeholder="Cth: DP Kemeja / Beli Bahan Kain" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal (Rp)</label>
                <input type="number" required placeholder="5000000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-mono font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sumber Rekening</label>
                <select value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                  {accounts.map((acc, i) => <option key={i} value={acc}>{acc}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase">Unggah Bukti Nota / Foto (Opsional)</label>
              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer transition-all">
                  <Paperclip className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{formData.proofName ? formData.proofName : 'Pilih file gambar/nota...'}</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {formData.proof && (
                  <button type="button" onClick={() => setFormData({...formData, proof: '', proofName: ''})} className="p-2.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-xl hover:bg-rose-500/30 text-xs font-bold">
                    Hapus
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> {isEditMode ? 'Simpan Perubahan' : 'Simpan Transaksi'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
