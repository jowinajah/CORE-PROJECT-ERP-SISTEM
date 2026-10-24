import React, { useState, useEffect } from 'react';
import { Bell, Volume2, Sparkles } from 'lucide-react';

export default function AdzanNotifier() {
  const [timings, setTimings] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Ambil jadwal sholat otomatis untuk wilayah Bandung
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Bandung&country=Indonesia&method=2')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.timings) {
          setTimings(data.data.timings);
        }
      })
      .catch(err => console.log('Gagal memuat jadwal sholat', err));

    // Pengecekan waktu real-time setiap detik
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      setCurrentTime(timeStr);

      if (timings) {
        const prayers = {
          'Subuh': timings.Fajr,
          'Dzuhur': timings.Dhuhr,
          'Ashar': timings.Asr,
          'Maghrib': timings.Maghrib,
          'Isya': timings.Isha
        };

        for (const [name, time] of Object.entries(prayers)) {
          if (time && time.substring(0, 5) === timeStr) {
            setCurrentPrayer(name);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timings]);

  const triggerAdzanVoice = (prayerName = 'Sholat') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Perhatian BOS JOW dan seluruh tim workshop, waktu ${prayerName} telah tiba di wilayah Bandung. Mari segera menunaikan ibadah sholat.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/40 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Pengingat Adzan Otomatis (Wilayah Bandung)
          </div>
          <div className="text-sm font-semibold text-white mt-0.5">
            {currentPrayer ? `⚠️ Waktu ${currentPrayer} Telah Tiba di Bandung!` : `Jam Sistem Workshop: ${currentTime} WIB (Standby Adzan)`}
          </div>
        </div>
      </div>
      <button 
        onClick={() => triggerAdzanVoice(currentPrayer || 'Dzuhur')}
        className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all whitespace-nowrap"
      >
        <Volume2 className="w-4 h-4" /> Tes Suara Pengingat Adzan
      </button>
    </div>
  );
}
