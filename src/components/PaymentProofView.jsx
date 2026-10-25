import React, { useState, useEffect } from 'react';
import { Receipt, Search, Plus, Edit3, Trash2, Image as ImageIcon, Upload, Check, DollarSign } from 'lucide-react';

export default function PaymentProofView() {
  const [searchTerm, setSearchTerm] = useState('');

  // Menyimpan data bukti pembayaran di localStorage agar tidak hilang saat di-refresh
  const [paymentList, setPaymentList] = useState(() => {
    const saved = localStorage.getItem('core_payment_proof_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'TRX-2026-001', client: 'Himpunan Mahasiswa UIN Bandung', type: 'DP 50%', nominal: 'Rp 2.500.000', fileImage: 'transfer_bca_uin.jpg', imageUrl: null },
      { id: 'TRX-2026-002', client: 'Cafe Kopi Senja', type: 'Pelunasan', nominal: 'Rp 1.800.000', fileImage: 'struk_m-banking.jpg', imageUrl: null },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_payment_proof_list', JSON.stringify(paymentList));
  }, [paymentList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    id: '', client: '', type: 'DP 50%', nominal: '', fileImage: '', imageUrl: null
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPayment({
      id: `TRX-2026-00${paymentList.length + 1}`,
      client: '',
      type: 'DP 50%',
      nominal: '',
      fileImage: '',
      imageUrl: null
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    setCurrentPayment(item);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPayment.id || !currentPayment.client) return;
    if (isEditMode) {
      setPaymentList(paymentList.map(item => item.id === currentPayment.id ? currentPayment : item));
    } else {
      setPaymentList([currentPayment, ...paymentList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data bukti pembayaran ini?')) {
      setPaymentList(paymentList.filter(item => item.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentPayment({ ...currentPayment, fileImage: file.name, imageUrl: fileUrl });
    }
  };

  const filteredList = paymentList.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Receipt className="w-4 h-4" /> Modul Finance & Payment CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Bukti Pembayaran & Transfer</h1>
          <p className="text-slate-400 text-sm mt-1">Data transaksi tersimpan otomatis di browser, lengkap dengan file bukti transfer JPG dan opsi edit/hapus.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Bukti Transfer Baru
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3">
        <Search className="w-5 h-5 text-amber-400" />
        <input 
          type="text"
          placeholder="Cari berdasarkan ID Transaksi, Nama Konsumen, atau Jenis Pembayaran..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
        />
      </div>

      {/* MODAL TAMBAH / EDIT BUKTI PEMBAYARAN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">
              {isEditMode ? 'Edit Data Bukti Pembayaran' : 'Tambah Bukti Pembayaran Baru'}
            </h3>
            
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ID Transaksi</label>
              <input 
                type="text" required placeholder="Contoh: TRX-2026-003"
                value={currentPayment.id} onChange={(e) => setCurrentPayment({...currentPayment, id: e.target.value})}
                disabled={isEditMode}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Konsumen</label>
              <input 
                type="text" required placeholder="Contoh: PT Makmur Jaya"
                value={currentPayment.client} onChange={(e) => setCurrentPayment({...currentPayment, client: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Pembayaran</label>
                <select
                  value={currentPayment.type} onChange={(e) => setCurrentPayment({...currentPayment, type: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="DP 50%">DP 50%</option>
                  <option value="DP Custom">DP Custom</option>
                  <option value="Pelunasan">Pelunasan</option>
                  <option value="Cash / Tunai">Cash / Tunai</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal (Rp)</label>
                <input 
                  type="text" required placeholder="Contoh: Rp 1.500.000"
                  value={currentPayment.nominal} onChange={(e) => setCurrentPayment({...currentPayment, nominal: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Upload Bukti Transfer (File JPG/PNG)</label>
              <label className="flex items-center justify-center gap-2 bg-slate-950 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 text-xs text-slate-300 cursor-pointer">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{currentPayment.fileImage || 'Pilih file gambar transfer (JPG)...'}</span>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Simpan Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABEL BUKTI PEMBAYARAN */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <Receipt className="w-5 h-5" /> Daftar Bukti Pembayaran & Transfer ({filteredList.length} Transaksi)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">ID Transaksi</th>
                <th className="px-4 py-3">Nama Konsumen (Edit)</th>
                <th className="px-4 py-3">Jenis Pembayaran (Edit)</th>
                <th className="px-4 py-3">Nominal (Edit)</th>
                <th className="px-4 py-3">Bukti Transfer JPG & Edit</th>
                <th className="px-4 py-3 text-center">Aksi Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-bold text-amber-400">{item.id}</td>
                  
                  {/* Nama Konsumen */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between group">
                      <span className="font-semibold text-white">{item.client}</span>
                      <button onClick={() => handleOpenEdit(item)} title="Edit Konsumen" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Jenis Pembayaran */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full font-bold text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {item.type}
                      </span>
                      <button onClick={() => handleOpenEdit(item)} title="Edit Jenis Pembayaran" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Nominal */}
                  <td className="px-4 py-3 font-bold text-emerald-400">
                    <div className="flex items-center justify-between gap-2">
                      <span>{item.nominal}</span>
                      <button onClick={() => handleOpenEdit(item)} title="Edit Nominal" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Bukti Transfer JPG */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      {item.fileImage ? (
                        <a 
                          href={item.imageUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Klik untuk lihat gambar bukti transfer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl text-[11px] font-medium cursor-pointer transition-all shadow-sm"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{item.fileImage}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Belum ada foto</span>
                      )}
                      <button onClick={() => handleOpenEdit(item)} title="Ganti Foto JPG" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Aksi Hapus */}
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Bukti Pembayaran"
                      className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/80 bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">Tidak ada data bukti pembayaran yang sesuai dengan pencarian.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
