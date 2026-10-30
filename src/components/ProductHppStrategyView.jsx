import React, { useState, useEffect } from 'react';
import { Target, Calculator, DollarSign, Plus, Edit3, Trash2, Check, TrendingUp, ShieldCheck, Layers, Calendar } from 'lucide-react';

export default function ProductHppStrategyView() {
  // 1. State Target Keuangan Bulanan & Fixed Cost
  const [financialGoals, setFinancialGoals] = useState(() => {
    const saved = localStorage.getItem('core_product_hpp_goals');
    return saved ? JSON.parse(saved) : { targetProfit: 15000000, fixedCost: 8500000, workingDays: 26 };
  });

  // 2. State Daftar Produk, Proporsi, Harga Jual, dan HPP dengan localStorage
  const [productList, setProductList] = useState(() => {
    const saved = localStorage.getItem('core_product_hpp_list');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'PRD-01', name: 'Kemeja KKN / PDH (Nagata Drill)', proportionPct: 40, sellPrice: 130000, hppPcs: 80000 },
      { id: 'PRD-02', name: 'Kaos Event / Distro (Cotton Combed)', proportionPct: 35, sellPrice: 75000, hppPcs: 45000 },
      { id: 'PRD-03', name: 'Jersey Fullprint Sublimasi', proportionPct: 25, sellPrice: 150000, hppPcs: 95000 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_product_hpp_goals', JSON.stringify(financialGoals));
  }, [financialGoals]);

  useEffect(() => {
    localStorage.setItem('core_product_hpp_list', JSON.stringify(productList));
  }, [productList]);

  // Modal States
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalForm, setGoalForm] = useState(financialGoals);

  const [showProductModal, setShowProductModal] = useState(false);
  const [productEdit, setProductEdit] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', proportionPct: '', sellPrice: '', hppPcs: '' });

  // Kalkulasi Finansial
  const totalTargetRevenueNeeded = financialGoals.fixedCost + financialGoals.targetProfit;
  
  // Total proporsi persentase harus mendekati 100% untuk pembagian target yang akurat
  const totalProportionPct = productList.reduce((acc, item) => acc + Number(item.proportionPct), 0) || 1;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Handlers Goal
  const handleSaveGoals = (e) => {
    e.preventDefault();
    setFinancialGoals({
      targetProfit: Number(goalForm.targetProfit),
      fixedCost: Number(goalForm.fixedCost),
      workingDays: Number(goalForm.workingDays)
    });
    setShowGoalModal(false);
  };

  // Handlers Product
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) return;
    const formatted = {
      ...productForm,
      proportionPct: Number(productForm.proportionPct),
      sellPrice: Number(productForm.sellPrice),
      hppPcs: Number(productForm.hppPcs)
    };
    if (productEdit) {
      setProductList(productList.map(item => item.id === productEdit.id ? { ...formatted, id: item.id } : item));
      setProductEdit(null);
    } else {
      setProductList([...productList, { ...formatted, id: 'PRD-' + Date.now() }]);
    }
    setShowProductModal(false);
    setProductForm({ name: '', proportionPct: '', sellPrice: '', hppPcs: '' });
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Hapus jenis produk ini dari strategi HPP?')) {
      setProductList(productList.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-8 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">⭐ Premier BOS JOW</span>
            <h2 className="text-xl font-bold text-white mt-1">Strategi HPP & Target Penjualan Produk</h2>
            <p className="text-slate-400 text-xs">Rancang target laba bulanan, alokasi HPP, dan kuota penjualan harian per produk secara presisi.</p>
          </div>
        </div>
        <button 
          onClick={() => { setGoalForm(financialGoals); setShowGoalModal(true); }}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Calculator className="w-4 h-4" /> Atur Target Laba & Biaya Tetap
        </button>
      </div>

      {/* KARTU RINGKASAN STRATEGI KEUANGAN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <p className="text-xs text-slate-400 uppercase font-semibold">Target Laba 1 Bulan (Net Profit)</p>
          <h3 className="text-2xl font-extrabold text-emerald-400">{formatRupiah(financialGoals.targetProfit)}</h3>
          <p className="text-[10px] text-slate-400">Keuntungan bersih yang ingin dicapai</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow">
          <p className="text-xs text-slate-400 uppercase font-semibold">Total Fixed Cost (Biaya Tetap)</p>
          <h3 className="text-2xl font-extrabold text-rose-400">{formatRupiah(financialGoals.fixedCost)}</h3>
          <p className="text-[10px] text-slate-400">Gaji, sewa & operasional bulanan</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-5 rounded-2xl space-y-2 shadow-xl">
          <p className="text-xs text-amber-300 uppercase font-semibold">Total Margin Kontribusi Dibutuhkan</p>
          <h3 className="text-2xl font-extrabold text-amber-400">{formatRupiah(totalTargetRevenueNeeded)}</h3>
          <p className="text-[10px] text-amber-400">Fixed Cost + Target Laba Bulanan</p>
        </div>
      </div>

      {/* TABEL STRATEGI HPP & TARGET PRODUK */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Layers className="w-5 h-5" /> Matriks Target & HPP Per Jenis Produk ({productList.length} Produk)
          </h3>
          <button 
            onClick={() => { setProductEdit(null); setProductForm({ name: '', proportionPct: '', sellPrice: '', hppPcs: '' }); setShowProductModal(true); }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl cursor-pointer shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Jenis Produk
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Jenis Produk Core Project</th>
                <th className="px-4 py-3 text-center">Proporsi (%)</th>
                <th className="px-4 py-3 text-right">Harga Jual / Pcs</th>
                <th className="px-4 py-3 text-right">HPP / Pcs</th>
                <th className="px-4 py-3 text-right">Laba / Pcs</th>
                <th className="px-4 py-3 text-center">Target Bulanan (Pcs)</th>
                <th className="px-4 py-3 text-center">Target Harian (Pcs/Hari)</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {productList.map((item, idx) => {
                const profitPerPcs = Number(item.sellPrice) - Number(item.hppPcs);
                const proportionWeight = Number(item.proportionPct) / totalProportionPct;
                
                // Kalkulasi Target Pcs Bulanan berdasarkan kontribusi profit dan target total
                // Jika laba per pcs > 0, kita estimasi kuota berdasarkan proporsi permintaan pasar (%)
                const totalEstimatedMonthlyUnits = profitPerPcs > 0 ? Math.round((totalTargetRevenueNeeded / profitPerPcs) * proportionWeight) : 0;
                const targetDailyUnits = (totalEstimatedMonthlyUnits / financialGoals.workingDays).toFixed(1);

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-bold text-slate-400">0{idx + 1}</td>
                    <td className="px-4 py-3 font-bold text-white">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full font-bold">
                        {item.proportionPct}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-200">{formatRupiah(item.sellPrice)}</td>
                    <td className="px-4 py-3 text-right text-rose-400">{formatRupiah(item.hppPcs)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">{formatRupiah(profitPerPcs)}</td>
                    
                    {/* Target Bulanan Pcs */}
                    <td className="px-4 py-3 text-center font-extrabold text-amber-400 bg-amber-500/5">
                      {totalEstimatedMonthlyUnits} Pcs
                    </td>

                    {/* Target Harian Pcs */}
                    <td className="px-4 py-3 text-center font-extrabold text-cyan-400 bg-cyan-500/5">
                      {targetDailyUnits} Pcs / hari
                    </td>

                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => { setProductEdit(item); setProductForm(item); setShowProductModal(true); }} className="p-1.5 text-slate-400 hover:text-amber-400 cursor-pointer inline-block rounded hover:bg-slate-800"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteProduct(item.id)} className="p-1.5 text-rose-400 hover:text-white cursor-pointer inline-block rounded hover:bg-rose-500/20"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
              {productList.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-slate-500 italic">Belum ada data produk yang di-input.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center justify-between">
          <span>💡 <strong>Catatan Target:</strong> Target bulanan dan harian dihitung otomatis oleh sistem berdasarkan proporsi (%) dan total laba yang diharapkan bersama Fixed Cost.</span>
          <span className="text-amber-400">Hari Kerja Workshop: {financialGoals.workingDays} Hari / Bulan</span>
        </div>
      </div>

      {/* MODAL ATUR TARGET LABA & BIAYA TETAP */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveGoals} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">Atur Target Laba & Biaya Tetap</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Target Laba 1 Bulan (Rp)</label>
              <input type="number" required value={goalForm.targetProfit} onChange={e => setGoalForm({...goalForm, targetProfit: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Total Fixed Cost Bulanan (Rp)</label>
              <input type="number" required value={goalForm.fixedCost} onChange={e => setGoalForm({...goalForm, fixedCost: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Hari Kerja Workshop / Bulan</label>
              <input type="number" required value={goalForm.workingDays} onChange={e => setGoalForm({...goalForm, workingDays: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowGoalModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH/EDIT PRODUK */}
      {showProductModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveProduct} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{productEdit ? 'Edit Produk & HPP' : 'Tambah Jenis Produk Baru'}</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Jenis Produk</label>
              <input type="text" required placeholder="Contoh: Kemeja Tactical PDL..." value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Proporsi Penjualan (%)</label>
                <input type="number" required placeholder="Contoh: 40" value={productForm.proportionPct} onChange={e => setProductForm({...productForm, proportionPct: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Harga Jual / Pcs (Rp)</label>
                <input type="number" required placeholder="130000" value={productForm.sellPrice} onChange={e => setProductForm({...productForm, sellPrice: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">HPP / Pcs (Rp)</label>
              <input type="number" required placeholder="80000" value={productForm.hppPcs} onChange={e => setProductForm({...productForm, hppPcs: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan Produk</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
