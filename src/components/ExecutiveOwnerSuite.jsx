import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  DollarSign, 
  Scissors, 
  Video, 
  Layers, 
  NotebookPen, 
  Palette, 
  MessageSquareQuote, 
  PlusCircle, 
  ExternalLink,
  Send,
  Check,
  Volume2
} from 'lucide-react';

export default function ExecutiveOwnerSuite() {
  const [stats] = useState({
    omsetBulanIni: 48500000,
    pesananAktif: 14,
    produksiJalan: 6,
    selesaiBulanIni: 38
  });

  // Daftar sapaan suara harian otomatis berganti setiap hari (Minggu - Sabtu)
  const dailyGreetings = [
    "Selamat hari Minggu, BOS JOW! Waktunya istirahat sejenak atau susun strategi bisnis baru.",
    "Selamat hari Senin, BOS JOW! Semangat gasspol produksi konveksi minggu ini!",
    "Selamat hari Selasa, BOS JOW! Pastikan antrean sablon dan cutting berjalan lancar tanpa macet.",
    "Selamat hari Rabu, BOS JOW! Pertengahan minggu, saatnya genjot omset dan kontrol kualitas jahit.",
    "Selamat hari Kamis, BOS JOW! Cek kembali deadline SPK klien agar tepat waktu.",
    "Selamat hari Jumat, BOS JOW! Berkah melimpah, semoga semua batch produksi selesai tuntas.",
    "Selamat hari Sabtu, BOS JOW! Evaluasi workshop dan siapkan rekap laporan mingguan."
  ];

  const todayIndex = new Date().getDay(); // 0 (Minggu) sampai 6 (Sabtu)
  const currentGreetingText = dailyGreetings[todayIndex];

  // Fungsi untuk memutar suara sapaan menggunakan Web Speech API browser
  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentGreetingText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, browser Anda tidak mendukung fitur suara sapaan.");
    }
  };

  const [notes, setNotes] = useState([
    { id: 1, text: 'Briefing pagi koordinasi bahan kain & SPK urgent KKN UIN', done: true },
    { id: 2, text: 'Cek hasil cetak sablon DTF batch Komunitas X-Rider', done: false },
    { id: 3, text: 'Review sample kemeja PDH 2in1 pesanan klien baru', done: false }
  ]);
  const [newNote, setNewNote] = useState('');

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, sender: 'Tim Jahit Lt. 2', text: 'Mesin obras butuh pelumasan berkala minggu ini.', date: 'Hari ini' },
    { id: 2, sender: 'Bagian Cutting', text: 'Stok kain Nagata Drill hitam menipis, perlu restock.', date: 'Kemarin' }
  ]);
  const [newFeedback, setNewFeedback] = useState('');
  const [senderName, setSenderName] = useState('');

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, done: false }, ...notes]);
    setNewNote('');
  };

  const toggleNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, done: !n.done } : n));
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
    setFeedbacks([{ id: Date.now(), sender: senderName || 'Anonim / Tim', text: newFeedback, date: 'Baru saja' }, ...feedbacks]);
    setNewFeedback('');
    setSenderName('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* 1. EXECUTIVE SUMMARY OVERVIEW BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Selamat Datang, BOS JOW! • CORE Project Executive Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Dashboard Overview & Workshop Control
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {currentGreetingText}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={speakGreeting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 animate-bounce" /> Putar Suara Sapaan
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer">
            <PlusCircle className="w-4 h-4" />
            Buat SPK / Order Baru
          </button>
        </div>
      </div>

      {/* Grid Statistik Keuangan & Produksi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Omset Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{formatRupiah(stats.omsetBulanIni)}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs mt-4 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /><span>+12.5% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan Aktif</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.pesananAktif} SPK</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Menunggu antrean & proses</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sedang Dikerjakan</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.produksiJalan} Batch</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Scissors className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Jahit, Sablon & Cutting</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selesai Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.selesaiBulanIni} Order</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Siap ambil / Kirim</p>
        </div>
      </div>

      {/* 2. ALUR CHANEL / RANTAI ESTAFET PRODUKSI */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Alur Chanel (Rantai Estafet Workshop)
          </h2>
          <span className="text-xs px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
            Bottleneck Monitor: Aman
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">1. Meja Potong & Cutting</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-xl font-bold text-white">4 Batch <span className="text-xs font-normal text-slate-400">Kain digelar</span></p>
            <p className="text-xs text-indigo-400 mt-2">Antrean: 1 SPK</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">2. Sablon DTF & Bordir</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            </div>
            <p className="text-xl font-bold text-white">90 Pcs <span className="text-xs font-normal text-slate-400">Proses cetak</span></p>
            <p className="text-xs text-amber-400 mt-2">Antrean: 2 SPK (Optimal)</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">3. Meja Jahit & Perakitan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-xl font-bold text-white">24 Pcs <span className="text-xs font-normal text-slate-400">Stik & obras</span></p>
            <p className="text-xs text-indigo-400 mt-2">Antrean: 1 SPK</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">4. Finishing & QC</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            </div>
            <p className="text-xl font-bold text-white">80 Pcs <span className="text-xs font-normal text-slate-400">Cleaning benang</span></p>
            <p className="text-xs text-emerald-400 mt-2">Siap Packing</p>
          </div>
        </div>
      </div>

      {/* Grid 3 Kolom: Notes | Zoom | Lab Desain */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. NOTES & KEGIATAN */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-white flex items-center gap-2 mb-4">
              <NotebookPen className="w-4 h-4 text-indigo-400" />
              Notes & Kegiatan Harian
            </h3>
            
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {notes.map((note) => (
                <div 
                  key={note.id} 
                  onClick={() => toggleNote(note.id)}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-all ${
                    note.done 
                      ? 'bg-slate-950/40 border-slate-900 text-slate-500 line-through' 
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${note.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700'}`}>
                    {note.done && <Check className="w-3 h-3" />}
                  </div>
                  <span className="flex-1">{note.text}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddNote} className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              placeholder="Tambah kegiatan baru..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer">
              Tambah
            </button>
          </form>
        </div>

        {/* 4. ZOOM MEET CORE PROJECT */}
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/50 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Live Briefing
              </span>
              <Video className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Zoom Meet CORE Project</h3>
            <p className="text-xs text-slate-400 mt-1">
              Ruang rapat virtual harian untuk koordinasi workshop konveksi, mandor jahit, dan tim sablon.
            </p>

            <div className="mt-4 bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Jadwal Rapat:</span>
                <span className="text-white font-medium">Setiap Hari 08:30 WIB</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Host / Pemimpin:</span>
                <span className="text-indigo-400 font-medium">BOS JOW</span>
              </div>
            </div>
          </div>

          <a 
            href="https://zoom.us" 
            target="_blank" 
            rel="noreferrer"
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Video className="w-4 h-4" /> Masuk Zoom Meeting <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 5. LAB TIM DESIGN */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                Lab Tim Desain & Mockup
              </h3>
              <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-medium">3 Active</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Pusat perancangan mockups 2D/3D custom streetwear, kemeja PDH, dan sublimasi jersey.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">Mockup Kemeja KKN UIN</p>
                  <p className="text-[10px] text-slate-400">Revisi bordir dada & skoder</p>
                </div>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px]">Review</span>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">Vector Blueprint Jersey</p>
                  <p className="text-[10px] text-slate-400">Pattern size S to XXL</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px]">Selesai</span>
              </div>
            </div>
          </div>

          <button className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer">
            Buka Studio Desain
          </button>
        </div>

      </div>

      {/* 6. KOTAK ADUAN & SARAN */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Kotak Aduan & Saran Workshop</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Kirimkan masukan, kendala alat produksi, atau saran peningkatan efisiensi kerja secara transparan.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aduan & Aspirasi Terbaru</h4>
            <div className="space-y-2.5">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-indigo-400">{fb.sender}</span>
                    <span className="text-[10px] text-slate-500">{fb.date}</span>
                  </div>
                  <p className="text-xs text-slate-300">{fb.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Tulis Pesan / Saran Baru</h4>
            <form onSubmit={handleAddFeedback} className="space-y-3">
              <div>
                <input 
                  type="text" 
                  placeholder="Nama / Divisi (Opsional)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <textarea 
                  rows="3"
                  required
                  placeholder="Tulis saran atau kendala di workshop..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all">
                <Send className="w-3.5 h-3.5" /> Kirim Aduan & Saran
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
