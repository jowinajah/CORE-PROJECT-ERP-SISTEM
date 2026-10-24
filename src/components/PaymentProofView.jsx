import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

export default function PaymentProofView() {
  const [payments] = useState([
    { id: 'PAY-001', client: 'Himpunan Mahasiswa UIN', nominal: 5000000, type: 'DP 50%', status: 'Terverifikasi BOS', date: '2026-10-21' },
    { id: 'PAY-002', client: 'Cafe Kopi Senja', nominal: 1600000, type: 'Lunas', status: 'Menunggu Verifikasi', date: '2026-10-23' },
  ]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Receipt className="w-4 h-4" /> Keuangan & Kasir
          </div>
          <h1 className="text-2xl font-bold text-white">Bukti Payment (Pembayaran Masuk)</h1>
          <p className="text-slate-400 text-sm mt-1">Verifikasi bukti transfer DP atau pelunasan dari klien konveksi secara real-time.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">ID Transaksi</th>
              <th className="px-4 py-3">Nama Klien</th>
              <th className="px-4 py-3">Jenis Pembayaran</th>
              <th className="px-4 py-3">Nominal</th>
              <th className="px-4 py-3">Status Bukti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {payments.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-semibold text-amber-400">{p.id}</td>
                <td className="px-4 py-3 text-white">{p.client}</td>
                <td className="px-4 py-3 text-slate-300">{p.type}</td>
                <td className="px-4 py-3 font-bold text-emerald-400">{formatRupiah(p.nominal)}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
