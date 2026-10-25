import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Edit3, Trash2, Calendar, Clock, BellRing, Check } from 'lucide-react';

export default function MeetingHolidayView() {
  // 1. State Libur dengan localStorage
  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('core_holidays_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'H-01', title: 'Tahun Baru Masehi', date: '2026-01-01', type: 'Hari Besar Nasional' },
      { id: 'H-02', title: 'Hari Raya Idulfitri 1447H', date: '2026-03-20', type: 'Hari Besar Keagamaan' },
      { id: 'H-03', title: 'Hari Raya Iduladha 1447H', date: '2026-05-27', type: 'Hari Besar Keagamaan' },
      { id: 'H-04', title: 'Libur Rutin Hari Minggu', date: 'Setiap Hari Minggu', type: 'Libur Rutin' },
    ];
  });

  // 2. State Meeting dengan localStorage
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem('core_meetings_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'M-01', title: 'Briefing Pagi Koordinasi Produksi', category: 'Mingguan', datetime: 'Setiap Senin, 08:30 WIB', location: 'Ruang Meja Pola Utama' },
      { id: 'M-02', title: 'Evaluasi Keuangan Bulanan P&L', category: 'Bulanan', datetime: 'Tanggal 1 Setiap Bulan, 10:00 WIB', location: 'Zoom Meeting Executive' },
      { id: 'M-03', title: 'Rapat Kerja Tahunan & Target 2027', category: 'Tahunan', datetime: '2026-12-20, 13:00 WIB', location: 'Aula Utama Workshop' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_holidays_list', JSON.stringify(holidays));
  }, [holidays]);

  useEffect(() => {
    localStorage.setItem('core_meetings_list', JSON.stringify(meetings));
  }, [meetings]);

  // Modal states
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [holidayEdit, setHolidayEdit] = useState(null);
  const [holidayForm, setHolidayForm] = useState({ title: '', date: '', type: 'Custom BOS JOW' });

  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingEdit, setMeetingEdit] = useState(null);
  const [meetingForm, setMeetingForm] = useState({ title: '', category: 'Mingguan', datetime: '', location: '' });

  // Handlers Holiday
  const handleSaveHoliday = (e) => {
    e.preventDefault();
    if (!holidayForm.title || !holidayForm.date) return;
    if (holidayEdit) {
      setHolidays(holidays.map(h => h.id === holidayEdit.id ? { ...holidayForm, id: h.id } : h));
      setHolidayEdit(null);
    } else {
      setHolidays([...holidays, { ...holidayForm, id: 'H-' + Date.now() }]);
    }
    setHolidayForm({ title: '', date: '', type: 'Custom BOS JOW' });
    setShowHolidayModal(false);
  };

  const handleDeleteHoliday = (id) => {
    if (confirm('Yakin ingin menghapus jadwal libur ini?')) {
      setHolidays(holidays.filter(h => h.id !== id));
    }
  };

  // Handlers Meeting
  const handleSaveMeeting = (e) => {
    e.preventDefault();
    if (!meetingForm.title || !meetingForm.datetime) return;
    if (meetingEdit) {
      setMeetings(meetings.map(m => m.id === meetingEdit.id ? { ...meetingForm, id: m.id } : m));
      setMeetingEdit(null);
    } else {
      setMeetings([...meetings, { ...meetingForm, id: 'M-' + Date.now() }]);
    }
    setMeetingForm({ title: '', category: 'Mingguan', datetime: '', location: '' });
    setShowMeetingModal(false);
  };

  const handleDeleteMeeting = (id) => {
    if (confirm('Yakin ingin menghapus jadwal meeting ini?')) {
      setMeetings(meetings.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-8 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER NOTIFIKASI OTOMATIS */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-inner">
            <BellRing className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">Notifikasi Dashboard Aktif</span>
            <h2 className="text-lg font-bold text-white mt-1">Kalender Operasional & Agenda Workshop</h2>
            <p className="text-slate-400 text-xs">Sistem otomatis memantau jadwal libur nasional, keagamaan, serta rapat rutin divisi.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setHolidayEdit(null); setHolidayForm({ title: '', date: '', type: 'Custom BOS JOW' }); setShowHolidayModal(true); }} className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow cursor-pointer flex items-center gap-1.5 transition-all">
            <Plus className="w-3.5 h-3.5" /> Tambah Libur
          </button>
          <button onClick={() => { setMeetingEdit(null); setMeetingForm({ title: '', category: 'Mingguan', datetime: '', location: '' }); setShowMeetingModal(true); }} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl shadow cursor-pointer flex items-center gap-1.5 transition-all">
            <Plus className="w-3.5 h-3.5" /> Tambah Meeting
          </button>
        </div>
      </div>

      {/* SECTION 1: KALENDER HARI LIBUR */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" /> Kalender Hari Libur & Hari Besar (Eksklusif BOS JOW)
          </h3>
          <span className="text-xs text-slate-400">{holidays.length} Jadwal Libur Tercatat</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {holidays.map((item) => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 relative group hover:border-amber-500/40 transition-all shadow-md">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold rounded">
                  {item.type}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => { setHolidayEdit(item); setHolidayForm(item); setShowHolidayModal(true); }} title="Edit" className="p-1 text-slate-400 hover:text-amber-400 cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDeleteHoliday(item.id)} title="Hapus" className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: KALENDER JADWAL MEETING (MINGGUAN, BULANAN, TAHUNAN) */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Kalender Jadwal Meeting (Mingguan, Bulanan, Tahunan)
          </h3>
          <span className="text-xs text-slate-400">{meetings.length} Agenda Meeting</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Mingguan', 'Bulanan', 'Tahunan'].map((cat) => (
            <div key={cat} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">Agenda {cat}</h4>
                <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-semibold">Aktif</span>
              </div>
              <div className="space-y-3">
                {meetings.filter(m => m.category === cat).map((meeting) => (
                  <div key={meeting.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 relative group hover:border-amber-500/30 transition-all shadow">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-white text-xs">{meeting.title}</p>
                      <div className="flex gap-1">
                        <button onClick={() => { setMeetingEdit(meeting); setMeetingForm(meeting); setShowMeetingModal(true); }} title="Edit" className="p-1 text-slate-400 hover:text-amber-400 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteMeeting(meeting.id)} title="Hapus" className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-300/80 flex items-center gap-1"><Clock className="w-3 h-3" /> {meeting.datetime}</p>
                    <p className="text-[10px] text-slate-400">📍 {meeting.location}</p>
                  </div>
                ))}
                {meetings.filter(m => m.category === cat).length === 0 && (
                  <p className="text-xs text-slate-500 italic text-center py-4">Belum ada agenda {cat.toLowerCase()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TAMBAH/EDIT HOLIDAY */}
      {showHolidayModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveHoliday} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{holidayEdit ? 'Edit Jadwal Libur' : 'Tambah Jadwal Libur'}</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Hari Libur / Perayaan</label>
              <input type="text" required placeholder="Contoh: Cuti Bersama..." value={holidayForm.title} onChange={e => setHolidayForm({...holidayForm, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Tanggal / Keterangan</label>
              <input type="text" required placeholder="Contoh: 2026-06-15 atau Setiap Hari Minggu" value={holidayForm.date} onChange={e => setHolidayForm({...holidayForm, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori</label>
              <select value={holidayForm.type} onChange={e => setHolidayForm({...holidayForm, type: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option value="Hari Besar Nasional">Hari Besar Nasional</option>
                <option value="Hari Besar Keagamaan">Hari Besar Keagamaan</option>
                <option value="Libur Rutin">Libur Rutin</option>
                <option value="Custom BOS JOW">Custom BOS JOW</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowHolidayModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH/EDIT MEETING */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveMeeting} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{meetingEdit ? 'Edit Jadwal Meeting' : 'Tambah Jadwal Meeting'}</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Judul Meeting</label>
              <input type="text" required placeholder="Contoh: Rapat Evaluasi Mingguan..." value={meetingForm.title} onChange={e => setMeetingForm({...meetingForm, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kategori Jadwal</label>
              <select value={meetingForm.category} onChange={e => setMeetingForm({...meetingForm, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option value="Mingguan">Mingguan</option>
                <option value="Bulanan">Bulanan</option>
                <option value="Tahunan">Tahunan</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Waktu / Hari</label>
              <input type="text" required placeholder="Contoh: Setiap Senin, 09:00 WIB" value={meetingForm.datetime} onChange={e => setMeetingForm({...meetingForm, datetime: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Lokasi / Link</label>
              <input type="text" required placeholder="Contoh: Ruang Utama / Zoom" value={meetingForm.location} onChange={e => setMeetingForm({...meetingForm, location: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowMeetingModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
