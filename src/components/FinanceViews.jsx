import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowLeftRight, 
  BookOpen, 
  FileText, 
  ScanText, 
  Plus, 
  CheckCircle, 
  UploadCloud,
  DollarSign
} from 'lucide-react';

export default function FinanceViews({ tab }) {
  // State untuk Buku Kas / Accounting Ledger
  const [ledger, setLedger] = useState([
    { id: 1, date: '2026-10-24', desc: 'DP Kemeja KKN UIN Bandung', type: 'Masuk', amount: 3500000, balance: 18500000 },
    { id: 2, date: '2026-10-23', desc: 'Beli Kain Nagata Drill 5 Roll', type: 'Keluar', amount: 2500000, balance: 15000000 },
    { id: 3, date: '2026-10-22', desc: 'Pelunasan Jersey X-Rider', type: 'Masuk', amount: 5000000, balance: 17500000 },
  ]);

  // State untuk Invoice & Tagihan DP
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', client: 'Himpunan Mahasiswa UIN', total: 7500000, dp: 3500000, status: 'DP Dibayar', due: '2026-11-05' },
    { id: 'INV-002', client: 'Cafe Kopi Senja', total: 3200000, dp: 1000000, status: 'Belum Lunas', due: '2026-10-28' },
  ]);

  // State simulasi OCR Nota
  const [ocrResult, setOcrResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setOcrResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setOcrResult({
        store: 'Toko Aksesoris & Benang Jaya',
        date: '2026-10-24',
        items: 'Benang Jahit 10 Cone, Kancing Jas 100 Pcs',
        total: 450000,
        status: 'Berhasil Diekstrak oleh AI OCR'
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Wallet className="w-4 h-4" /> Modul Finance & Kas CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {tab === 'finance-pl' && 'Laporan Laba Rugi (Profit & Loss / P&L)'}
            {tab === 'finance-cashflow' && 'Cashflow & Arus Kas Real-Time'}
            {tab === 'finance-ledger' && 'Accounting & Buku Kas Harian'}
            {tab === 'finance-invoice' && 'Invoice & Tagihan DP Konsumen'}
            {tab === 'finance-ocr' && 'AI Scan OCR Nota & Struk Belanja'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Pusat kontrol keuangan, pencatatan kas masuk-keluar, dan audit otomatis.</p>
        </div>
      </div>

      {/* 1. LAPORAN LABA RUGI P&L */}
      {tab === 'finance-pl' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Ringkasan Laba Rugi Bulan Ini (Oktober 2026)
            </h3>
            <span className="text-xs bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
              Profit Margin: 47%
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total Pendapatan (Gross Revenue)</span>
              <h4 className="text-xl font-bold text-white">{formatRupiah(48500000)}</h4>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total HPP & Biaya Produksi</span>
              <h4 className="text-xl font-bold text-rose-400">{formatRupiah(25700000)}</h4>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Laba Bersih (Net Profit)</span>
              <h4 className="text-xl font-bold text-emerald-400">{formatRupiah(22800000)}</h4>
            </div>
          </div>
        </div>
      )}

      {/* 2. CASHFLOW & ARUS KAS */}
      {tab === 'finance-cashflow' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" /> Arus Kas Masuk & Keluar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-2">
              <p className="text-xs font-bold text-emerald-400 uppercase">Total Kas Masuk</p>
              <h4 className="text-2xl font-bold text-white">{formatRupiah(58500000)}</h4>
              <p className="text-[11px] text-slate-400">Dari pelunasan order, DP klien, dan penjualan langsung.</p>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/30 space-y-2">
              <p className="text-xs font-bold text-rose-400 uppercase">Total Kas Keluar</p>
              <h4 className="text-2xl font-bold text-white">{formatRupiah(35700000)}</h4>
              <p className="text-[11px] text-slate-400">Untuk belanja bahan baku, operasional workshop, dan gaji.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ACCOUNTING & BUKU KAS */}
      {tab === 'finance-ledger' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Buku Kas Harian Accounting
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Keterangan Transaksi</th>
                  <th className="px-4 py-3">Jenis</th>
                  <th className="px-4 py-3">Nominal</th>
                  <th className="px-4 py-3">Saldo Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {ledger.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-slate-400">{item.date}</td>
                    <td className="px-4 py-3 font-semibold text-white">{item.desc}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'Masuk' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-bold ${item.type === 'Masuk' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.type === 'Masuk' ? '+' : '-'}{formatRupiah(item.amount)}
                    </td>
                    <td className="px-4 py-3 font-bold text-amber-400">{formatRupiah(item.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. INVOICE & TAGIHAN DP */}
      {tab === 'finance-invoice' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Daftar Invoice & Tagihan DP Pelanggan
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">No. Invoice</th>
                  <th className="px-4 py-3">Nama Klien</th>
                  <th className="px-4 py-3">Total Tagihan</th>
                  <th className="px-4 py-3">Status DP / Pelunasan</th>
                  <th className="px-4 py-3">Jatuh Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {invoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-amber-400">{inv.id}</td>
                    <td className="px-4 py-3 text-white">{inv.client}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{formatRupiah(inv.total)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {inv.status} (DP: {formatRupiah(inv.dp)})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{inv.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. AI SCAN OCR NOTA */}
      {tab === 'finance-ocr' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-5 max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl mx-auto flex items-center justify-center">
            <ScanText className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Scan OCR Nota & Struk Belanja</h3>
            <p className="text-xs text-slate-400 mt-1">Upload foto nota belanja bahan baku, AI akan otomatis membaca toko, item, dan nominal rupiah.</p>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-2xl p-6 transition-colors bg-slate-950/40 cursor-pointer">
            <UploadCloud className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-semibold">Klik atau Seret Foto Nota ke Sini</p>
            <p className="text-[10px] text-slate-500 mt-1">Mendukung format JPG, PNG, PDF</p>
          </div>

          <button 
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
          >
            {isScanning ? 'AI Sedang Membaca Nota...' : 'Simulasi Scan & Ekstrak Otomatis'}
          </button>

          {ocrResult && (
            <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-4 h-4" /> {ocrResult.status}
              </div>
              <p className="text-xs text-white">Toko: <span className="font-semibold text-amber-400">{ocrResult.store}</span></p>
              <p className="text-xs text-white">Item: <span className="font-semibold text-slate-300">{ocrResult.items}</span></p>
              <p className="text-xs text-white">Total Nominal: <span className="font-bold text-emerald-400">{formatRupiah(ocrResult.total)}</span></p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
