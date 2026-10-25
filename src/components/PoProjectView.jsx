import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Search, Plus, Edit3, Trash2, FileText, Upload, Check, Download, User, Phone, Building } from 'lucide-react';

export default function PoProjectView() {
  const [searchTerm, setSearchTerm] = useState('');

  // Menyimpan data PO Project di localStorage agar tidak hilang saat di-refresh
  const [poList, setPoList] = useState(() => {
    const saved = localStorage.getItem('core_po_project_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'PO-2026-001', client: 'Himpunan Mahasiswa UIN Bandung', phone: '081234567890', entryDate: '2026-10-01', deadline: '2026-11-05', pic: 'Fauzi (Marketing)', mitra: 'Mitra Factory A', spkFile: 'SPK_KKN_UIN.pdf', spkUrl: null },
      { id: 'PO-2026-002', client: 'Cafe Kopi Senja', phone: '089876543210', entryDate: '2026-10-05', deadline: '2026-10-30', pic: 'Sahrul (CEO)', mitra: 'Mitra Konveksi B', spkFile: 'SPK_Kopi_Senja.pdf', spkUrl: null },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_po_project_list', JSON.stringify(poList));
  }, [poList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPo, setCurrentPo] = useState({
    id: '', client: '', phone: '', entryDate: '', deadline: '', pic: '', mitra: '', spkFile: '', spkUrl: null
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPo({
      id: `PO-2026-00${poList.length + 1}`,
      client: '',
      phone: '',
      entryDate: new Date().toISOString().split('T')[0],
      deadline: '',
      pic: '',
      mitra: '',
      spkFile: '',
      spkUrl: null
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    setCurrentPo(item);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPo.id || !currentPo.client) return;
    if (isEditMode) {
      setPoList(poList.map(item => item.id === currentPo.id ? currentPo : item));
    } else {
      setPoList([currentPo, ...poList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data PO Project ini?')) {
      setPoList(poList.filter(item => item.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentPo({ ...currentPo, spkFile: file.name, spkUrl: fileUrl });
    }
  };

  const handleDownloadPdf = (item) => {
    if (item.spkUrl) {
      const element = document.createElement("a");
      element.href = item.spkUrl;
      element.download = item.spkFile || "SPK_PO_Project.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      const element = document.createElement("a");
      const file = new Blob([`%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 100 700 Td (PO PROJECT SPK: ${item.id} - ${item.client}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000000 00000 n \n0000000096 00000 n \n0000000155 00000 n \n0000000282 00000 n \ntrailer\n<< /Root 1 0 R /Size 5 >>\nstartofxref\n387\n%%EOF`], {type: 'application/pdf'});
      element.href = URL.createObjectURL(file);
      element.download = item.spkFile || "SPK_PO_Project.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const filteredList = poList.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mitra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <FileSpreadsheet className="w-4 h-4" /> Modul PO Project CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">List PO Project & Manajemen SPK</h1>
          <p className="text-slate-400 text-sm mt-1">Data tersimpan otomatis, dilengkapi nomor telepon, tanggal masuk, PIC, mitra, dan dokumen SPK PDF.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah PO Project Baru
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3">
        <Search className="w-5 h-5 text-amber-400" />
        <input 
          type="text"
          placeholder="Cari berdasarkan No. PO, Nama Konsumen, PIC, atau Mitra..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
        />
      </div>

      {/* MODAL TAMBAH / EDIT PO PROJECT */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">
              {isEditMode ? 'Edit Data PO Project' : 'Tambah PO Project Baru'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. PO</label>
                <input 
                  type="text" required placeholder="Contoh: PO-2026-003"
                  value={currentPo.id} onChange={(e) => setCurrentPo({...currentPo, id: e.target.value})}
                  disabled={isEditMode}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. Telepon / WhatsApp</label>
                <input 
                  type="text" required placeholder="Contoh: 08123456789"
                  value={currentPo.phone} onChange={(e) => setCurrentPo({...currentPo, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Konsumen</label>
              <input 
                type="text" required placeholder="Contoh: PT Sumber Makmur"
                value={currentPo.client} onChange={(e) => setCurrentPo({...currentPo, client: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal Masuk PO</label>
                <input 
                  type="date" required
                  value={currentPo.entryDate} onChange={(e) => setCurrentPo({...currentPo, entryDate: e.target.value})}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Deadline / Target</label>
                <input 
                  type="date" required
                  value={currentPo.deadline} onChange={(e) => setCurrentPo({...currentPo, deadline: e.target.value})}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">PIC (Penanggung Jawab)</label>
                <input 
                  type="text" required placeholder="Contoh: Sahrul (Owner)"
                  value={currentPo.pic} onChange={(e) => setCurrentPo({...currentPo, pic: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Mitra (Vendor/Factory)</label>
                <input 
                  type="text" required placeholder="Contoh: Mitra Konveksi A"
                  value={currentPo.mitra} onChange={(e) => setCurrentPo({...currentPo, mitra: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Upload / Ganti File SPK (PDF)</label>
              <label className="flex items-center justify-center gap-2 bg-slate-950 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 text-xs text-slate-300 cursor-pointer">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{currentPo.spkFile || 'Pilih file PDF SPK...'}</span>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
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

      {/* TABEL LIST PO PROJECT */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" /> Daftar List PO Project ({filteredList.length} PO)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. PO</th>
                <th className="px-4 py-3">Nama Konsumen & Telepon (Edit)</th>
                <th className="px-4 py-3">Tgl Masuk & Deadline (Edit)</th>
                <th className="px-4 py-3">Dokumen SPK (PDF) & Edit</th>
                <th className="px-4 py-3">PIC & Mitra (Edit)</th>
                <th className="px-4 py-3 text-center">Aksi Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-bold text-amber-400">{item.id}</td>
                  
                  {/* Nama Konsumen & Telepon */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between group">
                      <div>
                        <p className="font-semibold text-white">{item.client}</p>
                        <p className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-400" /> {item.phone}
                        </p>
                      </div>
                      <button onClick={() => handleOpenEdit(item)} title="Edit Konsumen" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Tanggal Masuk & Deadline */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-slate-300">Masuk: {item.entryDate}</p>
                        <p className="text-amber-300 font-semibold">Deadline: {item.deadline}</p>
                      </div>
                      <button onClick={() => handleOpenEdit(item)} title="Edit Tanggal" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Dokumen SPK PDF */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
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
                      <button onClick={() => handleOpenEdit(item)} title="Ganti PDF" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* PIC & Mitra */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-white flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-400" /> {item.pic}
                        </p>
                        <p className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Building className="w-3 h-3 text-indigo-400" /> {item.mitra}
                        </p>
                      </div>
                      <button onClick={() => handleOpenEdit(item)} title="Edit PIC & Mitra" className="opacity-60 hover:opacity-100 text-amber-400 p-1 rounded hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Aksi Hapus */}
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      title="Hapus PO Project"
                      className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/80 bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">Tidak ada data PO Project yang sesuai dengan pencarian.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
