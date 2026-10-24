import React, { useState } from 'react';
import { Factory, Calendar, Activity, Boxes, Calculator, ScanLine, GitBranch, CheckCircle, AlertCircle } from 'lucide-react';

export default function FactoryViews({ tab }) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    setScanResult({
      code: barcodeInput,
      item: 'Kemeja PDH 2in1 (Batch #402)',
      status: 'Sedang di Meja Jahit & Perakitan',
      operator: 'Pak Ujang',
      time: 'Baru saja discan'
    });
    setBarcodeInput('');
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Factory className="w-4 h-4" /> Modul Factory & Produksi CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {tab === 'factory-deadline' && 'Kalender Dateline Produksi'}
            {tab === 'factory-tracking' && 'Tracking Proses Real-Time'}
            {tab === 'factory-stock' && 'Manajemen Stok Bahan Baku'}
            {tab === 'factory-calc' && 'Kalkulator Kebutuhan Bahan Baku'}
            {tab === 'factory-barcode' && 'Scan Barcode Factory (Workshop)'}
            {tab === 'factory-bom' && 'BOM & Alur Produksi Lanjutan'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sistem kontrol operasional lantai pabrik konveksi dan percetakan.</p>
        </div>
      </div>

      {/* 1. KALENDER DATELINE */}
      {tab === 'factory-deadline' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Jadwal Dateline SPK & Pengiriman
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold">Urgensinya Tinggi</span>
              <h4 className="font-bold text-white text-sm">Kemeja KKN UIN Bandung</h4>
              <p className="text-xs text-slate-400">Dateline: 05 November 2026</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">Proses Jahit</span>
              <h4 className="font-bold text-white text-sm">Apron Cafe Kopi Senja</h4>
              <p className="text-xs text-slate-400">Dateline: 28 Oktober 2026</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Finishing</span>
              <h4 className="font-bold text-white text-sm">Jersey Komunitas X-Rider</h4>
              <p className="text-xs text-slate-400">Dateline: 26 Oktober 2026</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRACKING PROSES */}
      {tab === 'factory-tracking' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Status Alur Estafet Batch Aktif
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-white text-sm">SPK-001: Kemeja PDH 2in1 (50 Pcs)</p>
                <p className="text-slate-400 mt-0.5">Posisi saat ini: <span className="text-amber-400 font-semibold">Meja Jahit & Perakitan</span></p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">75% Selesai</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-white text-sm">SPK-002: Worksheet Cafe (20 Pcs)</p>
                <p className="text-slate-400 mt-0.5">Posisi saat ini: <span className="text-indigo-400 font-semibold">Sablon DTF & Bordir</span></p>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full font-bold">40% Selesai</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. STOK BAHAN BAKU */}
      {tab === 'factory-stock' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Boxes className="w-5 h-5" /> Inventaris Gudang Kain & Aksesoris
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Nama Bahan Baku</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Stok Tersedia</th>
                  <th className="px-4 py-3">Status Gudang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Kain Nagata Drill (Black)</td>
                  <td className="px-4 py-3 text-slate-300">Kain Kemeja / PDH</td>
                  <td className="px-4 py-3 font-bold text-amber-400">120 Roll</td>
                  <td className="px-4 py-3"><span className="text-emerald-400">Aman</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Kain American Drill (Navy)</td>
                  <td className="px-4 py-3 text-slate-300">Kain Karang Taruna</td>
                  <td className="px-4 py-3 font-bold text-amber-400">15 Roll</td>
                  <td className="px-4 py-3"><span className="text-amber-400">Menipis (Restock)</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Benang Jahit Polyester</td>
                  <td className="px-4 py-3 text-slate-300">Aksesoris Jahit</td>
                  <td className="px-4 py-3 font-bold text-amber-400">45 Cone</td>
                  <td className="px-4 py-3"><span className="text-emerald-400">Aman</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. HITUNG KEBUTUHAN BAHAN BAKU */}
      {tab === 'factory-calc' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Calculator className="w-5 h-5" /> Kalkulator Otomatis Kebutuhan Kain & Benang
          </h3>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Pilih Produk</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option>Kemeja PDH / Lapangan (Estimasi 1.2 Meter/pcs)</option>
                <option>Jaket Varsity / Bomber (Estimasi 1.8 Meter/pcs)</option>
                <option>Jersey Sublimasi (Estimasi 0.9 Meter/pcs)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Jumlah Pcs Pesanan</label>
              <input type="number" defaultValue="50" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
              <p className="font-bold text-amber-400">Hasil Kalkulasi Otomatis:</p>
              <p className="text-white">Total Kain Dibutuhkan: <span className="font-bold text-amber-400">60 Meter (± 5 Roll)</span></p>
              <p className="text-white">Estimasi Kebutuhan Benang: <span className="font-bold text-amber-400">3 Cone</span></p>
            </div>
          </div>
        </div>
      )}

      {/* 5. SCAN BARCODE FACTORY */}
      {tab === 'factory-barcode' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <ScanLine className="w-5 h-5" /> Scanner Barcode SPK & Batch Produksi
          </h3>
          <form onSubmit={handleScan} className="flex gap-2 max-w-md">
            <input 
              type="text" 
              placeholder="Scan atau ketik kode barcode SPK (Cth: SPK-001)..." 
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
              Scan
            </button>
          </form>

          {scanResult && (
            <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl max-w-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-4 h-4" /> Barcode Berhasil Diverifikasi!
              </div>
              <p className="text-xs text-white">Item: <span className="font-semibold text-amber-400">{scanResult.item}</span></p>
              <p className="text-xs text-white">Status Posisi: <span className="font-semibold text-indigo-400">{scanResult.status}</span></p>
              <p className="text-xs text-white">Operator: <span className="font-semibold text-slate-300">{scanResult.operator}</span></p>
            </div>
          )}
        </div>
      )}

      {/* 6. BOM & ALUR LANJUTAN */}
      {tab === 'factory-bom' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <GitBranch className="w-5 h-5" /> Bill of Materials (BOM) & Alur Kerja Standar
          </h3>
          <p className="text-xs text-slate-400">Struktur bahan baku standar per 1 unit Kemeja PDH:</p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 max-w-lg">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-300">1. Kain Utama (Nagata Drill)</span>
              <span className="font-bold text-amber-400">1.2 Meter</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-300">2. Kancing Jas (Besar & Kecil)</span>
              <span className="font-bold text-amber-400">12 Pcs</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-300">3. Kain Keras / Interlining</span>
              <span className="font-bold text-amber-400">0.3 Meter</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">4. Benang Jahit Warna Senada</span>
              <span className="font-bold text-amber-400">0.05 Cone</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
