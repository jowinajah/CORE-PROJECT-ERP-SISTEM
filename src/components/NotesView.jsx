import React, { useState, useEffect } from 'react';
import { NotebookPen, Plus, Edit3, Trash2, Upload, Image as ImageIcon, Check, Clock } from 'lucide-react';

export default function NotesView() {
  const teamMembers = [
    { name: 'Kodar', division: 'Div. Produksi', avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { name: 'Sahrul', division: 'Div. Office', avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
    { name: 'Nita', division: 'Div. Office', avatarBg: 'bg-pink-500/20 text-pink-400 border-pink-500/40' },
    { name: 'Bani', division: 'Div. Office', avatarBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' },
  ];

  // Menyimpan catatan di localStorage agar tidak hilang saat di-refresh
  const [notesList, setNotesList] = useState(() => {
    const saved = localStorage.getItem('core_notes_kegiatan_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'N-01', member: 'Kodar', division: 'Div. Produksi', text: 'Penyelesaian cutting batch pertama kain Nagata Drill untuk Kemeja KKN selesai.', timestamp: '25 Okt 2026, 10:30 WIB', fileImage: 'cutting_kkn.jpg', imageUrl: null },
      { id: 'N-02', member: 'Sahrul', division: 'Div. Office', text: 'Melakukan rekapitulasi data pesanan masuk dan konfirmasi DP klien.', timestamp: '25 Okt 2026, 11:15 WIB', fileImage: 'rekap_po.jpg', imageUrl: null },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_notes_kegiatan_list', JSON.stringify(notesList));
  }, [notesList]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: '', member: 'Kodar', division: 'Div. Produksi', text: '', timestamp: '', fileImage: '', imageUrl: null
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentNote({
      id: 'N-' + Date.now(),
      member: 'Kodar',
      division: 'Div. Produksi',
      text: '',
      timestamp: '',
      fileImage: '',
      imageUrl: null
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    setCurrentNote(item);
    setShowModal(true);
  };

  const handleMemberChange = (memberName) => {
    const found = teamMembers.find(m => m.name === memberName);
    if (found) {
      setCurrentNote({ ...currentNote, member: found.name, division: found.division });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentNote({ ...currentNote, fileImage: file.name, imageUrl: fileUrl });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentNote.text) return;

    // Timestamp realtime saat di-save / upload
    const timeNow = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
    const dataToSave = {
      ...currentNote,
      timestamp: timeNow
    };

    if (isEditMode) {
      setNotesList(notesList.map(item => item.id === currentNote.id ? dataToSave : item));
    } else {
      setNotesList([dataToSave, ...notesList]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus catatan kegiatan ini?')) {
      setNotesList(notesList.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <NotebookPen className="w-4 h-4" /> Modul Notes & Kegiatan Harian CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white">Catatan & Kegiatan Harian Tim</h1>
          <p className="text-slate-400 text-sm mt-1">Aktivitas Kodar, Sahrul, Nita, dan Bani lengkap dengan timestamp realtime dan upload file JPG.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Kegiatan Baru
        </button>
      </div>

      {/* MODAL TAMBAH / EDIT NOTES */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">
              {isEditMode ? 'Edit Catatan Kegiatan' : 'Tambah Catatan Kegiatan Harian'}
            </h3>
            
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Pilih Anggota Tim</label>
              <select 
                value={currentNote.member} 
                onChange={(e) => handleMemberChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {teamMembers.map((m, idx) => (
                  <option key={idx} value={m.name}>{m.name} ({m.division})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Isi Notes & Kegiatan Harian</label>
              <textarea 
                rows="3"
                required 
                placeholder="Tuliskan detail kegiatan hari ini..."
                value={currentNote.text} 
                onChange={(e) => setCurrentNote({...currentNote, text: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Upload File Lampiran (JPG/PNG)</label>
              <label className="flex items-center justify-center gap-2 bg-slate-950 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 text-xs text-slate-300 cursor-pointer">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{currentNote.fileImage || 'Pilih file foto kegiatan (JPG)...'}</span>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Simpan Kegiatan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIST NOTES & KEGIATAN */}
      <div className="space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <NotebookPen className="w-5 h-5" /> Feed Aktivitas Harian Tim ({notesList.length} Catatan)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notesList.map((item) => {
            const memberData = teamMembers.find(m => m.name === item.member) || { division: item.division || 'Divisi', avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
            return (
              <div key={item.id} className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 p-5 rounded-2xl shadow-md space-y-4 flex flex-col justify-between transition-all">
                <div className="space-y-3">
                  {/* Avatar & Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border shadow-md ${memberData.avatarBg}`}>
                        {item.member.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.member}</h4>
                        <span className="inline-block px-2 py-0.5 bg-slate-800 text-amber-400 border border-slate-700 text-[10px] font-bold rounded-md">
                          {item.division}
                        </span>
                      </div>
                    </div>

                    {/* Aksi Edit & Hapus */}
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit(item)} title="Edit Catatan" className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} title="Hapus Catatan" className="p-1.5 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500/20 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Teks Kegiatan */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    {item.text}
                  </p>

                  {/* Lampiran Foto JPG */}
                  {item.fileImage && (
                    <div className="flex items-center gap-2 pt-1">
                      <a 
                        href={item.imageUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-[11px] font-medium cursor-pointer transition-all shadow-sm"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{item.fileImage}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Timestamp Realtime */}
                <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Di-upload pada: {item.timestamp}</span>
                </div>
              </div>
            );
          })}
          {notesList.length === 0 && (
            <div className="col-span-2 text-center py-8 text-slate-500 italic">
              Belum ada catatan atau kegiatan harian yang di-input.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
