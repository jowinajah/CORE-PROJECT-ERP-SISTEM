import React, { useState } from 'react';
import { Layers, Search, Plus, Package, Edit3, Trash2, FileText, Upload, Check, Download } from 'lucide-react';

export default function RantaiProduksiView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productionList, setProductionList] = useState([
    { id: 'PO-001', client: 'Himpunan Mahasiswa UIN Bandung', jenis: 'Kemeja KKN (Nagata Drill)', stage: 'Sewing/Jahit', qty: '120 Pcs', deadline: '2026-11-05', spkFile: 'SPK_KKN_UIN.pdf', spkUrl: null },
    { id: 'PO-002', client: 'Cafe Kopi Senja', jenis: 'Apron & Barista Shirt', stage: 'Selesai', qty: '45 Pcs', deadline: '2026-10-30', spkFile: 'SPK_Kopi_Senja.pdf', spkUrl: null },
    { id: 'PO-003', client: 'X-Rider Community', jenis: 'Jersey Sublimasi Fullprint', stage: 'Bordir/Sablon/Sublimasi', qty: '80 Pcs', deadline: '2026-11-02', spkFile: 'SPK_XRider.pdf', spkUrl: null },
    { id: 'PO-004', client: 'PT Textilindo Maju', jenis: 'Seragam Lapangan Tactical', stage: 'Sewing/Jahit', qty: '200 Pcs', deadline: '2026-11-10', spkFile: 'SPK_Textilindo.pdf', spkUrl: null },
    { id: 'PO-005', client: 'Distro Streetwear BDG', jenis: 'Oversized Boxy Hoodie', stage: 'Quality Control', qty: '60 Pcs', deadline: '2026-10-28', spkFile: 'SPK_Distro_BDG.pdf', spkUrl: null },
    { id: 'PO-006', client: 'Sman 1 Cimahi', jenis: 'Jaket Angkatan', stage: 'Selesai', qty: '150 Pcs', deadline: '2026-10-20', spkFile: 'SPK_Sman1.pdf', spkUrl: null },
  ]);

  const stages = [
    'List PO & Jenis',
    'Pengadaan Bahan Baku',
    'Cutting',
    'Bordir/Sablon/Sublimasi',
    'Sewing/Jahit',
    'Quality Control',
    'Selesai'
  ];

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPo, setCurrentPo] = useState({ id: '', client: '', jenis: '', stage: 'List PO & Jenis', qty: '', deadline: '', spkFile: '', spkUrl: null });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPo({ id: `PO-00${productionList.length + 1}`, client: '', jenis: '', stage: 'List PO & Jenis', qty: '', deadline: '', spkFile: '', spkUrl: null });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    setCurrentPo(item);
    setShowModal(true);
  };

  const handleSavePo = (e) => {
    e.preventDefault();
    if (!currentPo.id || !currentPo.client) return;
    
    if (isEditMode) {
      setProductionList(productionList.map(item => item.id === currentPo.id ? currentPo : item));
    } else {
      setProductionList([currentPo, ...productionList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data PO dan SPK ini?')) {
      setProductionList(productionList.filter(item => item.id !== id));
    }
  };

  // Menangkap file PDF asli yang di-upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentPo({ ...currentPo, spkFile: file.name, spkUrl: fileUrl });
    }
  };

  // Fungsi download file PDF asli
  const handleDownloadPdf = (item) => {
    if (item.spkUrl) {
      const element = document.createElement("a");
      element.href = item.spkUrl;
      element.download = item.spkFile || "SPK_Produksi.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      // Jika data bawaan awal yang belum punya URL file asli, buatkan file PDF contoh yang valid
      const element = document.createElement("a");
      const file = new Blob([`%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 100 700 Td (SURAT PERINTAH KERJA: ${item.id} - ${item.client}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n000000000.0 00000 n \n0000000096 00000 n \n0000000155 00000 n \n0000000282 00000 n \ntrailer\n<< /Root 1 0 R /Size 5 >>\nstartofxref\n387\n%%EOF`], {type: 'application/pdf'});
      element.href = URL.createObjectURL(file);
      element.download = item.spkFile || "SPK_Produksi.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const filteredList = productionList.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Layers className="w-4 h-4" /> Modul Workshop CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Rantai Estafet Produksi & SPK</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola data klien, jenis pakaian, jumlah, deadline, proses, serta download file SPK PDF asli.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah PO & SPK Baru
        </button>
      </div>

      {/* PENCARIAN PO & JENIS */}
      <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3">
        <Search className="w-5 h-5 text-amber-400" />
        <input 
          type="text"
          placeholder="Cari berdasarkan No. PO, Nama Klien, Jenis Pakaian, atau Proses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
        />
      </div>

      {/* MODAL TAMBAH / EDIT PO & SPK */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePo} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">
              {isEditMode ? 'Edit Data PO & SPK Produksi' : 'Tambah PO & SPK Baru'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. PO / SPK</label>
                <input 
                  type="text" required placeholder="Contoh: PO-007"
                  value={currentPo.id} onChange={(e) => setCurrentPo({...currentPo, id: e.target.value})}
                  disabled={isEditMode}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jumlah (Qty)</label>
                <input 
                  type="text" required placeholder="Contoh: 100 Pcs"
                  value={currentPo.qty} onChange={(e) => setCurrentPo({...currentPo, qty: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Klien</label>
              <input 
                type="text" required placeholder="Contoh: PT Maju Jaya"
                value={currentPo.client} onChange={(e) => setCurrentPo({...currentPo, client: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jenis Pakaian / Bahan</label>
              <input 
                type="text" required placeholder="Contoh: Kemeja PDH American Drill"
                value={currentPo.jenis} onChange={(e) => setCurrentPo({...currentPo, jenis: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Deadline / Target</label>
                <input 
                  type="date" required
                  value={currentPo.deadline} onChange={(e) => setCurrentPo({...currentPo, deadline: e.target.value})}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Proses Produksi</label>
                <select
                  value={currentPo.stage} onChange={(e) => setCurrentPo({...currentPo, stage: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {stages.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Upload / Ganti File SPK (PDF)</label>
              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 text-xs text-slate-300 cursor-pointer">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{currentPo.spkFile || 'Pilih file PDF SPK...'}</span>
                  <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
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

      {/* TABEL DAFTAR PO & SPK */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <Package className="w-5 h-5" /> Daftar Tracking Status Produksi & SPK ({filteredList.length} PO)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. PO / SPK</th>
                <th className="px-4 py-3">Klien & Jenis Pakaian (Edit)</th>
                <th className="px-4 py-3">Jumlah (Edit)</th>
                <th className="px-4 py-3">Deadline (Edit)</th>
                <th className="px-4 py-3">Proses (Edit)</th>
                <th className="px-4 py-3">Dokumen SPK (PDF) & Aksi Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-bold text-amber-400">{item.id}</td>
                  
                  {/* Klien & Jenis */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between group">
                      <div>
                        <p className="font-semibold text-white">{item.client}</p>
                        <p className="text-slate-400 text-[11px]">{item.jenis}</p>
                      </div>
                      <button 
                        onClick={() => handleOpenEdit(item)} 
                        title="Edit Klien & Jenis"
                        className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Jumlah */}
                  <td className="px-4 py-3 font-bold text-emerald-400">
                    <div className="flex items-center justify-between gap-2">
                      <span>{item.qty}</span>
                      <button 
                        onClick={() => handleOpenEdit(item)} 
                        title="Edit Jumlah"
                        className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Deadline */}
                  <td className="px-4 py-3 text-slate-300">
                    <div className="flex items-center justify-between gap-2">
                      <span>{item.deadline}</span>
                      <button 
                        onClick={() => handleOpenEdit(item)} 
                        title="Edit Deadline"
                        className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Proses */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full font-bold text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {item.stage}
                      </span>
                      <button 
                        onClick={() => handleOpenEdit(item)} 
                        title="Edit Proses"
                        className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Dokumen SPK & Hapus */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {item.spkFile ? (
                          <button 
                            onClick={() => handleDownloadPdf(item)}
                            title="Klik untuk download PDF SPK"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-[11px] font-medium cursor-pointer transition-all shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" /> 
                            <span>{item.spkFile}</span>
                            <Download className="w-3 h-3 ml-1 text-blue-300 animate-pulse" />
                          </button>
                        ) : (
                          <span className="text-slate-500 italic">Belum ada PDF</span>
                        )}
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          title="Ganti / Edit SPK PDF"
                          className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button 
                        onClick={() => handleDelete(item.id)}
                        title="Hapus PO & SPK"
                        className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/80 bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">Tidak ada data PO yang sesuai dengan pencarian.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
