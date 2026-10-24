import React, { useState } from 'react';
import { 
  UsersRound, 
  UserPlus, 
  ScanFace, 
  CalendarCheck, 
  Clock, 
  ReceiptText, 
  Award, 
  Banknote, 
  Plus, 
  CheckCircle2, 
  Camera
} from 'lucide-react';

export default function HrdViews({ tab }) {
  // State data simulasi untuk HRD
  const [candidates] = useState([
    { name: 'Rian Pratama', pos: 'Operator Jahit Senior', status: 'Interview HRD', score: '88%' },
    { name: 'Siti Rahmawati', pos: 'Tim Sablon DTF', status: 'Review Portofolio', score: '92%' }
  ]);

  const [attendance] = useState([
    { name: 'Pak Ujang (Mandor Jahit)', time: '07:45 WIB', status: 'Hadir (Face ID Match)', verified: true },
    { name: 'Budi (Cutting)', time: '07:50 WIB', status: 'Hadir (Face ID Match)', verified: true }
  ]);

  const [overtimes, setOvertimes] = useState([
    { name: 'Asep Saepudin', hours: '2 Jam', reason: 'Lembur Kejar Target Kemeja KKN', status: 'Disetujui BOS' }
  ]);

  const [reimburs, setReimburs] = useState([
    { name: 'Rian Hidayat', desc: 'Beli Aksesoris Resleting Tambahan', nominal: 150000, status: 'Menunggu Approval' }
  ]);

  const [kpiList] = useState([
    { name: 'Pak Ujang', role: 'Kepala Produksi', score: 95, grade: 'A (Sangat Baik)' },
    { name: 'Siti Rahmawati', role: 'Bagian Sablon', score: 88, grade: 'B+ (Baik)' }
  ]);

  const [cashAdvances, setCashAdvances] = useState([
    { name: 'Asep Saepudin', nominal: 500000, desc: 'Keperluan Berobat Keluarga', status: 'Dicicil (Potong Gaji)' }
  ]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleFaceScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <UsersRound className="w-4 h-4" /> Modul HRD & Karyawan CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {tab === 'hrd-ats' && 'Rekruitmen HRD ATS (Applicant Tracking System)'}
            {tab === 'hrd-faceid' && 'Absensi Face ID Biometrik Karyawan'}
            {tab === 'hrd-calendar' && 'Kalender Kerja & Hari Libur Workshop'}
            {tab === 'hrd-overtime' && 'Pengajuan & Approval Lembur Karyawan'}
            {tab === 'hrd-reimburse' && 'Klaim Reimburse Biaya Operasional'}
            {tab === 'hrd-kpi' && 'Penilaian Kinerja KPI Karyawan'}
            {tab === 'hrd-cashadvance' && 'Manajemen Kasbon & Pinjaman Karyawan'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Pusat manajemen sumber daya manusia, presisi absensi, dan kesejahteraan tim workshop.</p>
        </div>
      </div>

      {/* 1. REKRUITMEN HRD ATS */}
      {tab === 'hrd-ats' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Kandidat Pelamar Masuk (ATS Pipeline)
          </h3>
          <div className="space-y-3">
            {candidates.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-slate-400 mt-0.5">Melamar sebagai: <span className="text-amber-400 font-semibold">{c.pos}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">Skor AI: {c.score}</span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. ABSENSI FACE ID */}
      {tab === 'hrd-faceid' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-5 max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl mx-auto flex items-center justify-center">
            <ScanFace className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Terminal Absensi Face ID Workshop</h3>
            <p className="text-xs text-slate-400 mt-1">Verifikasi wajah karyawan secara real-time untuk pencatatan kehadiran shift pagi.</p>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-2xl p-6 transition-colors bg-slate-950/40">
            <Camera className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-semibold">Kamera Biometrik Standby</p>
            <p className="text-[10px] text-slate-500 mt-1">Arahkan wajah ke kamera depan perangkat</p>
          </div>

          <button 
            onClick={handleFaceScan}
            disabled={isScanning}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
          >
            {isScanning ? 'Memindai Wajah...' : 'Simulasi Scan Wajah Kehadiran'}
          </button>

          {scanSuccess && (
            <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl text-left space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" /> Absensi Berhasil Tercatat!
              </div>
              <p className="text-xs text-white">Karyawan: <span className="font-semibold text-amber-400">BOS JOW / Staff Workshop</span></p>
              <p className="text-xs text-slate-400">Waktu: Pukul 08:00 WIB (Tepat Waktu)</p>
            </div>
          )}

          <div className="text-left pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Log Kehadiran Hari Ini</h4>
            <div className="space-y-2">
              {attendance.map((att, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between text-xs">
                  <span className="font-semibold text-white">{att.name}</span>
                  <span className="text-emerald-400">{att.time} ({att.status})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. KALENDER KERJA & LIBUR */}
      {tab === 'hrd-calendar' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" /> Jadwal Operasional & Hari Libur Workshop
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Hari Kerja Aktif</span>
              <h4 className="font-bold text-white text-sm">Senin s.d. Sabtu</h4>
              <p className="text-xs text-slate-400">Jam Kerja: 08.00 - 16.30 WIB (Shift Pagi & Lembur)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold">Agenda Libur</span>
              <h4 className="font-bold text-white text-sm">Cuti Bersama / Hari Besar</h4>
              <p className="text-xs text-slate-400">Tanggal Merah & Libur Nasional Workshop Tutup.</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. PENGAJUAN LEMBUR */}
      {tab === 'hrd-overtime' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Daftar Pengajuan Lembur Karyawan
          </h3>
          <div className="space-y-3">
            {overtimes.map((ov, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{ov.name} <span className="text-amber-400">({ov.hours})</span></p>
                  <p className="text-slate-400 mt-0.5">Alasan: {ov.reason}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">{ov.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. KLAIM REIMBURSE */}
      {tab === 'hrd-reimburse' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <ReceiptText className="w-5 h-5" /> Klaim Biaya & Reimburse Karyawan
          </h3>
          <div className="space-y-3">
            {reimburs.map((rb, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{rb.name}</p>
                  <p className="text-slate-400 mt-0.5">Keperluan: {rb.desc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400 text-sm">{formatRupiah(rb.nominal)}</p>
                  <span className="text-[10px] text-amber-400 font-semibold">{rb.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PENILAIAN KPI */}
      {tab === 'hrd-kpi' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Award className="w-5 h-5" /> Penilaian Key Performance Indicator (KPI)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Nama Karyawan</th>
                  <th className="px-4 py-3">Jabatan / Peran</th>
                  <th className="px-4 py-3">Skor KPI</th>
                  <th className="px-4 py-3">Grade Kinerja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {kpiList.map((kpi, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-white">{kpi.name}</td>
                    <td className="px-4 py-3 text-slate-300">{kpi.role}</td>
                    <td className="px-4 py-3 font-bold text-amber-400">{kpi.score} / 100</td>
                    <td className="px-4 py-3"><span className="text-emerald-400 font-bold">{kpi.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. KASBON KARYAWAN */}
      {tab === 'hrd-cashadvance' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Banknote className="w-5 h-5" /> Daftar Kasbon & Pinjaman Karyawan
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Nama Karyawan</th>
                  <th className="px-4 py-3">Nominal Pinjaman</th>
                  <th className="px-4 py-3">Keperluan</th>
                  <th className="px-4 py-3">Skema Pelunasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {cashAdvances.map((ca, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-white">{ca.name}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{formatRupiah(ca.nominal)}</td>
                    <td className="px-4 py-3 text-slate-300">{ca.desc}</td>
                    <td className="px-4 py-3"><span className="text-amber-400 font-semibold">{ca.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
