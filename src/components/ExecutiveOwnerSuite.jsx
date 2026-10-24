import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Printer, 
  Scissors, 
  ArrowUpRight,
  PlusCircle,
  FileText
} from 'lucide-react';

export default function ExecutiveOwnerSuite() {
  // Data ringkasan keuangan & produksi (bisa nanti dihubungkan ke database D1)
  const [stats] = useState({
    omsetBulanIni: 48500000,
    pesananAktif: 14,
    produksiJalan: 6,
    selesaiBulanIni: 38
  });

  const [recentOrders] = useState([
    { id: 'SPK-001', client: 'Himpunan Mahasiswa UIN', item: 'Kemeja KKN (50 Pcs)', status: 'Cutting / Jahit', deadline: '2026-11-05' },
    { id: 'SPK-002', client: 'Cafe Kopi Senja', item: 'Apron & Uniform (20 Pcs)', status: 'Sablon / Print', deadline: '2026-10-28' },
    { id: 'SPK-003', client: 'Komunitas Motor Bandung', item: 'Jersey Full Printing (35 Pcs)', status: 'Finishing', deadline: '2026-10-26' },
  ]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            CORE Project ERP System • Executive Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Dashboard Pemilik & Workshop
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Pantau omset, status pesanan konveksi, dan progres produksi secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all">
            <PlusCircle className="w-4 h-4" />
            Buat SPK Baru
          </button>
        </div>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Omset */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Omset Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{formatRupiah(stats.omsetBulanIni)}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs mt-4 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.5% dari bulan lalu</span>
          </div>
        </div>

        {/* Card 2: Pesanan Aktif */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan Aktif</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.pesananAktif} SPK</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Menunggu antrean & proses</p>
        </div>

        {/* Card 3: Produksi Berjalan */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sedang Dikerjakan</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.produksiJalan} Batch</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Scissors className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Jahit, Sablon & Cutting</p>
        </div>

        {/* Card 4: Selesai */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selesai Bulan Ini</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{stats.selesaiBulanIni} Order</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4">Siap ambil / Kirim</p>
        </div>
      </div>

      {/* Bagian Bawah: Tabel SPK Terbaru & Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabel Pesanan Terbaru */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Status SPK & Produksi Terbaru
            </h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Lihat Semua</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">ID SPK</th>
                  <th className="px-4 py-3">Klien</th>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-indigo-400">{order.id}</td>
                    <td className="px-4 py-3 text-slate-200">{order.client}</td>
                    <td className="px-4 py-3 text-slate-300">{order.item}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{order.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Pintasan / Aktivitas */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Pintasan Modul</h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Workshop Kanban Board</h4>
                    <p className="text-xs text-slate-400">Atur status potong, jahit, sablon</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </div>

              <div className="p-3 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Kalkulator Harga Otomatis</h4>
                    <p className="text-xs text-slate-400">Hitung estimasi baju & cetak</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </div>

              <div className="p-3 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Database Klien & CRM</h4>
                    <p className="text-xs text-slate-400">Daftar pelanggan & riwayat order</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">CORE Project ERP v1.0.0 • Cloudflare Powered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
