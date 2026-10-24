import React, { useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';

export default function MeetingHolidayView() {
  const [events] = useState([
    { id: 1, title: 'Rapat Evaluasi Mingguan Workshop', date: '2026-10-25', time: '09:00 WIB', type: 'Meeting' },
    { id: 2, title: 'Libur Nasional / Cuti Bersama', date: '2026-10-28', time: 'Full Day', type: 'Libur' },
  ]);

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <CalendarDays className="w-4 h-4" /> Jadwal & Kalender
          </div>
          <h1 className="text-2xl font-bold text-white">Meeting & Libur Workshop</h1>
          <p className="text-slate-400 text-sm mt-1">Agenda rapat koordinasi mandor serta jadwal libur operasional.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {ev.type}
              </span>
              <span className="text-xs text-slate-400">{ev.date}</span>
            </div>
            <h3 className="text-lg font-bold text-white">{ev.title}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Pukul: {ev.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
