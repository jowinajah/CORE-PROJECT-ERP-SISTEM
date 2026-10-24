import React, { useState } from 'react';
import { TrendingUp, Wallet, CreditCard, Target, Check, Edit3, ShieldCheck } from 'lucide-react';

export default function ExecutiveOwnerSuite() {
  // State untuk target bulanan agar bisa diedit interaktif
  const [targetOmset, setTargetOmset] = useState(155000000);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetOmset);

  // Data dummy finansial (bisa nanti dihubungkan ke Database Cloudflare D1)
  const financialData = {
    netProfit: 22343500,
    profitMargin: 47, // dalam persen
    grossRevenue: 47927000,
    activeOrdersCount: 12,
    kasLiquid: 11500000,
    piutang: 27251000,
  };

  // Hitung persentase pencapaian target
  const achievementPercentage = Math.min(
    Math.round((financialData.grossRevenue / targetOmset) * 100), 
    100
  );

  const handleSaveTarget = () => {
    setTargetOmset(Number(tempTarget));
    setIsEditingTarget(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
      
      {/* Header Suite */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-medium">
              CORE PROJECT HQ
            </span>
            <span className="text-xs text-slate-400">September 2026</span>
          </div>
          <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
            Executive Owner Suite <ShieldCheck className="w-5 h-5 text-blue-400" />
          </h2>
          <p className="text-xs text-slate-400">Pusat kendali finansial & performa pesanan konveksi secara real-time</p>
        </div>
        
        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
          Mode Akses: <span className="text-emerald-400 font-semibold">Owner (Direktur Utama)</span>
        </div>
      </div>

      {/* Grid Kartu Finansial Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* 1. Net Profit & Margin */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium">NET PROFIT & MARGIN</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mb-1">
            Rp {financialData.netProfit.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {financialData.profitMargin}% Margin
            </span> 
            <span>Keuntungan bersih bersih workshop</span>
          </div>
        </div>

        {/* 2. Gross Revenue (Omset Kotor) */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium">GROSS REVENUE (OMSET)</span>
            <Wallet className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            Rp {financialData.grossRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-slate-400">
            Dari <span className="text-white font-medium">{financialData.activeOrdersCount} pesanan aktif</span> bulan ini
          </div>
        </div>

        {/* 3. Kas Liquid & Piutang */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium">KAS LIQUID & PIUTANG</span>
            <CreditCard className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Kas Bank (BCA/Mandiri):</span>
              <span className="font-semibold text-emerald-400">Rp {financialData.kasLiquid.toLocaleString('id-ID')}</span>[cite: 1]
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Piutang Pelanggan:</span>
              <span className="font-semibold text-amber-400">Rp {financialData.piutang.toLocaleString('id-ID')}</span>[cite: 1]
            </div>
          </div>
        </div>

      </div>

      {/* Target Omset Bulanan Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-200">Target Omset Bulan Ini (September 2026)</h3>[cite: 1]
          </div>

          {/* Opsi Edit Target Cepat */}
          {!isEditingTarget ? (
            <button 
              onClick={() => setIsEditingTarget(true)} 
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Ubah Target
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={tempTarget} 
                onChange={(e) => setTempTarget(e.target.value)}
                className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg text-xs w-36 text-white focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={handleSaveTarget}
                className="bg-amber-600 hover:bg-amber-500 text-white p-1.5 rounded-lg text-xs"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar & Informasi Persentase */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">Pencapaian: <strong className="text-white">{achievementPercentage}%</strong> dari Target Rp {targetOmset.toLocaleString('id-ID')}</span>
            <span className="text-amber-400 font-semibold">{achievementPercentage >= 100 ? 'Target Tercapai! 🔥' : 'On Track'}</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${achievementPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
}
