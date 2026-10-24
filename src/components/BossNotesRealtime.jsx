import React, { useState } from 'react';
import { BellRing, Send, Volume2, CheckCircle2, Megaphone } from 'lucide-react';

export default function BossNotesRealtime() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Urgensi Bahan Kemeja KKN', text: 'Semua tim cutting pastikan kain Nagata Drill dicek ulang sebelum dipotong besok pagi!', time: 'Baru saja', active: true }
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const speakAnnouncement = (titleText, bodyText) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const fullText = `Perhatian untuk seluruh tim workshop CORE Project. Pengumuman penting dari BOS JOW: ${titleText}. ${bodyText}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAnnounce = {
      id: Date.now(),
      title,
      text: content,
      time: 'Baru saja',
      active: true
    };

    setAnnouncements([newAnnounce, ...announcements]);
    speakAnnouncement(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-amber-900/40 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BellRing className="w-4 h-4" /> Fitur Premier BOS JOW
          </div>
          <h1 className="text-2xl font-bold text-white">Catatan Realtime & Notifikasi Suara</h1>
          <p className="text-slate-400 text-sm mt-1">Kirim instruksi penting yang langsung disuarakan dan disiarkan ke seluruh workshop secara realtime.</p>
        </div>
        <Megaphone className="w-12 h-12 text-amber-400 animate-bounce hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Input Catatan Realtime */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm md:col-span-1">
          <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" /> Buat Instruksi Baru
          </h3>
          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Judul Pengumuman</label>
              <input 
                type="text" 
                required
                placeholder="Contoh: Lembur Jahit Malam Ini"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Isi Instruksi / Catatan</label>
              <textarea 
                rows="4"
                required
                placeholder="Tulis instruksi untuk tim workshop..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer">
              <Megaphone className="w-4 h-4" /> Siarkan & Suarakan Realtime
            </button>
          </form>
        </div>

        {/* Riwayat Notifikasi & Siaran */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm md:col-span-2 space-y-3">
          <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Riwayat Siaran Catatan BOS JOW
          </h3>
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {announcements.map((item) => (
              <div key={item.id} className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span> {item.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                    <button 
                      onClick={() => speakAnnouncement(item.title, item.text)}
                      className="p-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition-colors cursor-pointer"
                      title="Putar Ulang Suara"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
