import React, { useState } from 'react';
import { NotebookPen, Check, Plus } from 'lucide-react';

export default function NotesView() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Briefing pagi koordinasi bahan kain & SPK urgent KKN UIN', done: true },
    { id: 2, text: 'Cek hasil cetak sablon DTF batch Komunitas X-Rider', done: false },
    { id: 3, text: 'Review sample kemeja PDH 2in1 pesanan klien baru', done: false }
  ]);
  const [newNote, setNewNote] = useState('');

  const toggleNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, done: !n.done } : n));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, done: false }, ...notes]);
    setNewNote('');
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-3xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <NotebookPen className="w-4 h-4" /> Workshop Management
          </div>
          <h1 className="text-2xl font-bold text-white">Notes & Kegiatan Harian</h1>
          <p className="text-slate-400 text-sm mt-1">Daftar tugas operasional konveksi dan kontrol harian workshop.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Tambah kegiatan atau tugas harian baru..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </form>

        <div className="space-y-3 pt-2">
          {notes.map((note) => (
            <div 
              key={note.id} 
              onClick={() => toggleNote(note.id)}
              className={`p-4 rounded-xl border text-sm flex items-center gap-3 cursor-pointer transition-all ${
                note.done ? 'bg-slate-950/40 border-slate-900 text-slate-500 line-through' : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500/50'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${note.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700'}`}>
                {note.done && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="flex-1">{note.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
