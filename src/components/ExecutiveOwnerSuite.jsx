import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  DollarSign, 
  Scissors, 
  Layers, 
  Palette, 
  MessageSquareQuote, 
  PlusCircle, 
  Send,
  Volume2
} from 'lucide-react';

export default function ExecutiveOwnerSuite() {
  const [stats] = useState({
    omsetBulanIni: 48500000,
    pesananAktif: 14,
    produksiJalan: 6,
    selesaiBulanIni: 38
  });

  const dailyGreetings = [
    "Selamat hari Minggu, BOS JOW! Waktunya istirahat sejenak atau susun strategi bisnis baru.",
    "Selamat hari Senin, BOS JOW! Semangat gasspol produksi konveksi minggu ini!",
    "Selamat hari Selasa, BOS JOW! Pastikan antrean sablon dan cutting berjalan lancar tanpa macet.",
    "Selamat hari Rabu, BOS JOW! Pertengahan minggu, saatnya genjot omset dan kontrol kualitas jahit.",
    "Selamat hari Kamis, BOS JOW! Cek kembali deadline SPK klien agar tepat waktu.",
    "Selamat hari Jumat, BOS JOW! Berkah melimpah, semoga semua batch produksi selesai tuntas.",
    "Selamat hari Sabtu, BOS JOW! Evaluasi workshop dan siapkan rekap laporan mingguan."
  ];

  const todayIndex = new Date().getDay();
  const currentGreetingText = dailyGreetings[todayIndex];

  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentGreetingText);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, sender: 'Tim Jahit Lt. 2', text: 'Mesin obras butuh pelumasan berkala minggu ini.', date: 'Hari ini' },
    { id: 2, sender: 'Bagian Cutting', text: 'Stok kain Nagata Drill hitam menipis, perlu restock.', date: 'Kemarin' }
  ]);
  const [newFeedback, setNewFeedback] = useState('');
  const [senderName, setSenderName] = useState('');

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
    setFeedbacks([{ id: Date.now(), sender: senderName || 'Tim', text: newFeedback, date: 'Baru saja' }, ...feedbacks]);
    setNewFeedback('');
    setSenderName('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Banner Sapaan */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Selamat Datang, BOS JOW! • CORE Project Executive Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Dashboard Overview & Workshop Control
          </h1>
          <p className="text-slate-400 text-sm mt-1">{currentGreetingText}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={speakGreeting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 animate-bounce" /> Putar Suara Sapaan
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer">
            <PlusCircle className="w-4 h-4" /> Buat SPK Baru
          </button>
        </div>
      </div>

      {/* Grid Statistik */}
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

      {/* Alur Chanel Produksi */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Alur Chanel (Rantai Estafet Workshop)
          </h2>
          <span className="text-xs px-3 py-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full font-medium">
            Bottleneck Monitor: Aman
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">1. Meja Potong & Cutting</p>
            <p className="text-xl font-bold text-white">4 Batch</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">2. Sablon DTF & Bordir</p>
            <p className="text-xl font-bold text-white">90 Pcs</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">3. Meja Jahit & Perakitan</p>
            <p className="text-xl font-bold text-white">24 Pcs</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">4. Finishing & QC</p>
            <p className="text-xl font-bold text-white">80 Pcs</p>
          </div>
        </div>
      </div>

      {/* Lab Desain & Kotak Aduan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="text-md font-bold text-white flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-purple-400" /> Lab Tim Desain & Mockup
          </h3>
          <p className="text-xs text-slate-400 mb-4">Pusat perancangan mockups 2D/3D custom streetwear & kemeja PDH.</p>
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Mockup Kemeja KKN UIN</span>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">Review</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="text-md font-bold text-white flex items-center gap-2 mb-3">
            <MessageSquareQuote className="w-4 h-4 text-emerald-400" /> Kotak Aduan & Saran
          </h3>
          <form onSubmit={handleAddFeedback} className="space-y-2">
            <input 
              type="text" 
              placeholder="Nama / Divisi" 
              value={senderName} 
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Tulis aduan..." 
                value={newFeedback} 
                onChange={(e) => setNewFeedback(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
