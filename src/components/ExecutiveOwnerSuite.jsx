import React, { useState, useEffect } from 'react';
import AdzanNotifier from './AdzanNotifier';
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
  Volume2,
  Clock,
  Calendar,
  Edit3,
  Check
} from 'lucide-react';

export default function ExecutiveOwnerSuite() {
  const [stats] = useState({
    omsetBulanIni: 48500000,
    pesananAktif: 14,
    produksiJalan: 6,
    selesaiBulanIni: 38
  });

  // State Waktu Real-time (Hari, Tanggal, Bulan, Tahun, Jam)
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Tanggal Indonesia
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('id-ID', optionsDate);
  const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // State Quotes & Sapaan Harian (Bisa diedit dan disimpan)
  const todayIndex = now.getDay(); // 0 (Minggu) - 6 (Sabtu)
  const defaultGreetings = [
    "Selamat hari Minggu, BOS JOW! Waktunya istirahat sejenak atau susun strategi bisnis baru.",
    "Selamat hari Senin, BOS JOW! Semangat gasspol produksi konveksi minggu ini!",
    "Selamat hari Selasa, BOS JOW! Pastikan antrean sablon dan cutting berjalan lancar tanpa macet.",
    "Selamat hari Rabu, BOS JOW! Pertengahan minggu, saatnya genjot omset dan kontrol kualitas jahit.",
    "Selamat hari Kamis, BOS JOW! Cek kembali deadline SPK klien agar tepat waktu.",
    "Selamat hari Jumat, BOS JOW! Berkah melimpah, semoga semua batch produksi selesai tuntas.",
    "Selamat hari Sabtu, BOS JOW! Evaluasi workshop dan siapkan rekap laporan mingguan."
  ];

  // Simpan quotes per hari di localStorage agar bisa diedit permanen di browser
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem('core_daily_quotes');
    return saved ? JSON.parse(saved) : defaultGreetings;
  });

  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [currentQuoteText, setCurrentQuoteText] = useState(quotes[todayIndex]);

  // Update text jika hari berganti
  useEffect(() => {
    setCurrentQuoteText(quotes[todayIndex]);
  }, [todayIndex, quotes]);

  const handleSaveQuote = (e) => {
    e.preventDefault();
    const updated = [...quotes];
    updated[todayIndex] = currentQuoteText;
    setQuotes(updated);
    localStorage.setItem('core_daily_quotes', JSON.stringify(updated));
    setIsEditingQuote(false);
  };

  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuoteText);
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
      
      {/* FITUR ADZAN OTOMATIS */}
      <AdzanNotifier />

      {/* BANNER UTAMA DENGAN REAL-TIME CLOCK & EDITABLE QUOTES */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        
        {/* Sisi Kiri: Sapaan & Quotes */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            Selamat Datang, BOS JOW! • CORE Project Executive Suite
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            Dashboard Overview & Workshop Control
          </h1>

          {/* Kotak Quotes Harian (Bisa Diedit) */}
          <div className="bg-slate-950/60 border border-amber-500/20 p-3.5 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                ⭐ Quotes & Sapaan Jadwal Harian
              </span>
              <button 
                onClick={() => setIsEditingQuote(!isEditingQuote)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                <Edit3 className="w-3.5 h-3.5" /> {isEditingQuote ? 'Tutup Editor' : 'Edit Quotes Hari Ini'}
              </button>
            </div>

            {isEditingQuote ? (
              <form onSubmit={handleSaveQuote} className="space-y-2 pt-1">
                <textarea 
                  rows="2"
                  value={currentQuoteText}
                  onChange={(e) => setCurrentQuoteText(e.target.value)}
                  className="w-full bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Tulis sapaan atau quotes harian..."
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button type="submit" className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer">
                    <Check className="w-3.5 h-3.5" /> Simpan Quotes
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-xs md:text-sm text-slate-300 italic">
                "{currentQuoteText}"
              </p>
            )}
          </div>
        </div>

        {/* Sisi Kanan: Real-time Date, Clock & Action Buttons */}
        <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
          
          {/* Widget Tanggal & Jam Realtime */}
          <div className="bg-slate-950/80 border border-amber-500/30 px-4 py-2.5 rounded-xl text-right space-y-0.5 w-full lg:w-auto">
            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 justify-start lg:justify-end">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {formattedDate}
            </div>
            <div className="text-base font-extrabold text-amber-400 flex items-center gap-1.5 justify-start lg:justify-end tracking-wider">
              <Clock className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '10s' }} /> {formattedTime} <span className="text-[10px] text-slate-400 font-normal">WIB</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <button 
              onClick={speakGreeting}
              className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 animate-bounce" /> Putar Suara
            </button>
            <button className="flex-1 lg:flex-none bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Buat SPK Baru
            </button>
          </div>
        </div>

      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Omset Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{formatRupiah(stats.omsetBulanIni)}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-xs mt-4 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /><span>+12.5% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan Aktif</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.pesananAktif} SPK</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Menunggu antrean & proses</p>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sedang Dikerjakan</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.produksiJalan} Batch</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Scissors className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Jahit, Sablon & Cutting</p>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selesai Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.selesaiBulanIni} Order</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Siap ambil / Kirim</p>
        </div>
      </div>

      {/* Alur Chanel Produksi */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" /> Alur Chanel (Rantai Estafet Workshop)
          </h2>
          <span className="text-xs px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full font-medium">
            Bottleneck Monitor: Aman
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">1. Meja Potong & Cutting</p>
            <p className="text-xl font-bold text-white">4 Batch</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">2. Sablon DTF & Bordir</p>
            <p className="text-xl font-bold text-white">90 Pcs</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">3. Meja Jahit & Perakitan</p>
            <p className="text-xl font-bold text-white">24 Pcs</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">4. Finishing & QC</p>
            <p className="text-xl font-bold text-white">80 Pcs</p>
          </div>
        </div>
      </div>

    </div>
  );
}
