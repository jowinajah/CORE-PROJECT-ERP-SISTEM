import React, { useState } from 'react';
import { 
  Megaphone, 
  Users, 
  Clapperboard, 
  CreditCard, 
  Trophy, 
  Plus, 
  CheckCircle, 
  Phone 
} from 'lucide-react';

export default function MarketingViews({ tab }) {
  const [resellers, setResellers] = useState([
    { name: 'Distro X-Rider Bandung', tier: 'Gold Partner', sales: '45 Pcs/bln', pic: 'Budi Santoso' },
    { name: 'Store Kemeja Cimahi', tier: 'Silver Partner', sales: '20 Pcs/bln', pic: 'Siti Aminah' }
  ]);

  const [contents, setContents] = useState([
    { title: 'Review Bahan Nagata Drill vs American Drill', platform: 'TikTok / Reels', status: 'Draft Script' },
    { title: 'OOTD Styling Kemeja PDH 2in1', platform: 'Instagram Reels', status: 'Ready to Upload' }
  ]);

  const [accounts] = useState([
    { bank: 'BCA', holder: 'CORE Project Marketing', number: '1234567890', type: 'Komisi Reseller' },
    { bank: 'Mandiri', holder: 'Kemitraan CORE', number: '0987654321', type: 'Dana Kampanye Ads' }
  ]);

  const [rankings] = useState([
    { rank: 1, name: 'Aldi (Team A)', closedDeals: 18, omset: 'Rp 14.500.000' },
    { rank: 2, name: 'Rian (Team B)', closedDeals: 12, omset: 'Rp 9.800.000' },
    { rank: 3, name: 'Dewi (Team C)', closedDeals: 9, omset: 'Rp 7.200.000' }
  ]);

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Megaphone className="w-4 h-4" /> Modul Marketing & Sales CORE Project
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {tab === 'marketing-reseller' && 'Reseller & Kemitraan Strategis'}
            {tab === 'marketing-content' && 'Content Creator Labs & Ide Konten'}
            {tab === 'marketing-rekening' && 'Nomor Rekening Marketing & Kemitraan'}
            {tab === 'marketing-ranking' && 'Rangking & Leaderboard Marketing'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Pusat ekspansi penjualan, pengelolaan kreator, keuangan komisi, dan performa tim.</p>
        </div>
      </div>

      {/* 1. RESELLER & KEMITRAAN */}
      {tab === 'marketing-reseller' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Users className="w-5 h-5" /> Daftar Reseller & Mitra Aktif
          </h3>
          <div className="space-y-3">
            {resellers.map((r, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-slate-400 mt-0.5">PIC: <span className="text-amber-400 font-semibold">{r.pic}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">Penjualan: {r.sales}</span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">{r.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CONTENT CREATOR LABS */}
      {tab === 'marketing-content' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Clapperboard className="w-5 h-5" /> Content Creator Labs & Jadwal Konten
          </h3>
          <div className="space-y-3">
            {contents.map((cnt, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{cnt.title}</p>
                  <p className="text-slate-400 mt-0.5">Platform: <span className="text-indigo-400 font-semibold">{cnt.platform}</span></p>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">{cnt.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. NO REKENING MARKETING & KEMITRAAN */}
      {tab === 'marketing-rekening' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Daftar Rekening Payout Komisi & Kemitraan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((acc, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">{acc.type}</span>
                <h4 className="font-bold text-white text-base">{acc.bank} - {acc.number}</h4>
                <p className="text-xs text-slate-400">Atas Nama: {acc.holder}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RANGKING MARKETING */}
      {tab === 'marketing-ranking' && (
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Trophy className="w-5 h-5" /> Leaderboard Rangking Tim Marketing
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Ranking</th>
                  <th className="px-4 py-3">Nama Tim / Marketer</th>
                  <th className="px-4 py-3">Closed Deals</th>
                  <th className="px-4 py-3">Total Omset Ditutup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {rankings.map((rk, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-bold text-amber-400">#{rk.rank}</td>
                    <td className="px-4 py-3 font-semibold text-white">{rk.name}</td>
                    <td className="px-4 py-3 text-slate-300">{rk.closedDeals} Klien</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{rk.omset}</td>
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
