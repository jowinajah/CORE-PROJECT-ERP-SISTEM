import React from 'react';
import CashflowView from './CashflowView';
import { Wallet } from 'lucide-react';

export default function FinanceViews({ tab }) {
  return (
    <div className="w-full">
      {/* Jika tab yang dipilih adalah cashflow / arus kas */}
      {tab === 'finance-cashflow' && <CashflowView />}

      {/* Jika memilih tab Laba Rugi (P&L) */}
      {tab === 'finance-pl' && (
        <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
          <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl space-y-2">
            <h1 className="text-2xl font-bold text-amber-400">Modul Laba Rugi (P&L) Keuangan</h1>
            <p className="text-slate-400 text-xs">Ringkasan performa laba bersih konveksi dan percetakan CORE Project.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-3">
            <Wallet className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white">Laba Rugi Terintegrasi</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Data pendapatan dari PO dan pengeluaran operasional Anda sudah tersinkronisasi otomatis ke sistem utama dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Placeholder untuk tab finance lainnya jika belum dibuat */}
      {tab !== 'finance-cashflow' && tab !== 'finance-pl' && (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wider">Modul Finance: {tab}</h2>
          <p className="text-xs text-slate-400">Fitur dan catatan untuk bagian ini sedang aktif dalam mode standby.</p>
        </div>
      )}
    </div>
  );
}
