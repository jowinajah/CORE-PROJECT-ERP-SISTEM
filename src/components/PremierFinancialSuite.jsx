import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Calculator, DollarSign, Plus, Edit3, Trash2, Check, Layers, ShieldCheck } from 'lucide-react';

export default function PremierFinancialSuite() {
  // 1. State Target Penjualan dengan localStorage
  const [salesTarget, setSalesTarget] = useState(() => {
    const saved = localStorage.getItem('core_premier_sales_target');
    return saved ? JSON.parse(saved) : { target: 75000000, current: 42500000 };
  });

  // 2. State Fix Cost & Variable Cost dengan localStorage
  const [costs, setCosts] = useState(() => {
    const saved = localStorage.getItem('core_premier_cost_structure');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return {
      fixed: [
        { id: 'FC-1', name: 'Gaji Bulanan Tim Office & Penjahit', amount: 6500000 },
        { id: 'FC-2', name: 'Sewa Tempat & Listrik Workshop', amount: 2500000 }
      ],
      variable: [
        { id: 'VC-1', name: 'Kain Nagata / American Drill (per meter)', amount: 35000 },
        { id: 'VC-2', name: 'Upah Jahit & Finishing (per pcs)', amount: 25000 },
        { id: 'VC-3', name: 'Sablon / Bordir Komputer (per pcs)', amount: 15000 }
      ]
    };
  });

  // 3. State HPP & Hasil PO dengan localStorage
  const [poCalculations, setPoCalculations] = useState(() => {
    const saved = localStorage.getItem('core_premier_po_calc');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'PO-001', client: 'Hima UIN Bandung', product: 'Kemeja KKN', qty: 120, sellPrice: 130000, hppPerPcs: 75000 },
      { id: 'PO-002', client: 'Cafe Kopi Senja', product: 'Apron & Uniform', qty: 50, sellPrice: 95000, hppPerPcs: 50000 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_premier_sales_target', JSON.stringify(salesTarget));
  }, [salesTarget]);

  useEffect(() => {
    localStorage.setItem('core_premier_cost_structure', JSON.stringify(costs));
  }, [costs]);

  useEffect(() => {
    localStorage.setItem('core_premier_po_calc', JSON.stringify(poCalculations));
  }, [poCalculations]);

  // Modal / Form States
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetForm, setTargetForm] = useState(salesTarget);

  const [showPoModal, setShowPoModal] = useState(false);
  const [poEdit, setPoEdit] = useState(null);
  const [poForm, setPoForm] = useState({ id: '', client: '', product: '', qty: '', sellPrice: '', hppPerPcs: '' });

  const [showCostModal, setShowCostModal] = useState(false);
  const [costType, setCostType] = useState('fixed'); // 'fixed' or 'variable'
  const [costForm, setCostForm] = useState({ name: '', amount: '' });

  // Kalkulasi total
  const totalFixedCost = costs.fixed.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalVariableCostRate = costs.variable.reduce((acc, item) => acc + Number(item.amount), 0);
  
  const totalPoRevenue = poCalculations.reduce((acc, item) => acc + (Number(item.qty) * Number(item.sellPrice)), 0);
  const totalPoHpp = poCalculations.reduce((acc, item) => acc + (Number(item.qty) * Number(item.hppPerPcs)), 0);
  const totalPoGrossProfit = totalPoRevenue - totalPoHpp;

  const achievementPercentage = Math.min(100, Math.round((salesTarget.current / salesTarget.target) * 100));

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Handlers
  const handleSaveTarget = (e) => {
    e.preventDefault();
    setSalesTarget({
      target: Number(targetForm.target),
      current: Number(targetForm.current)
    });
    setShowTargetModal(false);
  };

  const handleSavePo = (e) => {
    e.preventDefault();
    if (!poForm.id || !poForm.client) return;
    const formatted = {
      ...poForm,
      qty: Number(poForm.qty),
      sellPrice: Number(poForm.sellPrice),
      hppPerPcs: Number(poForm.hppPerPcs)
    };
    if (poEdit) {
      setPoCalculations(poCalculations.map(item => item.id === poEdit.id ? formatted : item));
      setPoEdit(null);
    } else {
      setPoCalculations([formatted, ...poCalculations]);
    }
    setShowPoModal(false);
    setPoForm({ id: '', client: '', product: '', qty: '', sellPrice: '', hppPerPcs: '' });
  };

  const handleDeletePo = (id) => {
    if (confirm('Hapus data kalkulasi PO ini?')) {
      setPoCalculations(poCalculations.filter(item => item.id !== id));
    }
  };

  const handleSaveCost = (e) => {
    e.preventDefault();
    if (!costForm.name || !costForm.amount) return;
    const newItem = { id: 'C-' + Date.now(), name: costForm.name, amount: Number(costForm.amount) };
    if (costType === 'fixed') {
      setCosts({ ...costs, fixed: [...costs.fixed, newItem] });
    } else {
      setCosts({ ...costs, variable: [...costs.variable, newItem] });
    }
    setShowCostModal(false);
    setCostForm({ name: '', amount: '' });
  };

  const handleDeleteCost = (type, id) => {
    if (confirm('Hapus komponen biaya ini?')) {
      if (type === 'fixed') {
        setCosts({ ...costs, fixed: costs.fixed.filter(i => i.id !== id) });
      } else {
        setCosts({ ...costs, variable: costs.variable.filter(i => i.id !== id) });
      }
    }
  };

  return (
    <div className="space-y-8 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER PREMIER BOS JOW */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">⭐ Fitur Premier BOS JOW</span>
            <h2 className="text-xl font-bold text-white mt-1">Pusat Strategi Finansial & HPP Konveksi</h2>
            <p className="text-slate-400 text-xs">Analisis mendalam Target Penjualan, Struktur Biaya (Fix & Variable Cost), serta kalkulasi HPP dan Hasil PO.</p>
          </div>
        </div>
      </div>

      {/* SECTION 1: TARGET PENJUALAN & PENCAPAIAN */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <Target className="w-5 h-5" /> Target Penjualan & Pencapaian Omzet Bulanan
          </h3>
          <button 
            onClick={() => { setTargetForm(salesTarget); setShowTargetModal(true); }}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl cursor-pointer shadow flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" /> Atur Target
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-slate-400 uppercase tracking-wider font-semibold">Pencapaian Aktual</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{formatRupiah(salesTarget.current)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 uppercase tracking-wider font-semibold">Target Bulanan</p>
              <p className="text-2xl font-extrabold text-amber-400 mt-1">{formatRupiah(salesTarget.target)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Progress Pencapaian Omzet</span>
              <span className="text-amber-400">{achievementPercentage}% Tercapai</span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500" 
                style={{ width: `${achievementPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FIX COST & VARIABLE COST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fixed Cost */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Fixed Cost (Biaya Tetap)
              </h3>
              <button 
                onClick={() => { setCostType('fixed'); setShowCostModal(true); }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Tambah
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {costs.fixed.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-rose-400 font-semibold">{formatRupiah(item.amount)} / bln</p>
                  </div>
                  <button onClick={() => handleDeleteCost('fixed', item.id)} className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400">Total Fixed Cost:</span>
            <span className="text-rose-400 text-sm">{formatRupiah(totalFixedCost)}</span>
          </div>
        </div>

        {/* Variable Cost */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Variable Cost (Biaya Variabel Unit)
              </h3>
              <button 
                onClick={() => { setCostType('variable'); setShowCostModal(true); }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Tambah
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {costs.variable.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-amber-300 font-semibold">{formatRupiah(item.amount)}</p>
                  </div>
                  <button onClick={() => handleDeleteCost('variable', item.id)} className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400">Akumulasi Rate Variabel:</span>
            <span className="text-amber-400 text-sm">{formatRupiah(totalVariableCostRate)} / unit</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: HPP & HASIL PO (REVENUE & PROFIT) */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Kalkulasi HPP & Hasil PO (Revenue & Laba Kotor)
          </h3>
          <button 
            onClick={() => { setPoEdit(null); setPoForm({ id: `PO-00${poCalculations.length + 1}`, client: '', product: '', qty: '', sellPrice: '', hppPerPcs: '' }); setShowPoModal(true); }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl cursor-pointer shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Data PO & HPP
          </button>
        </div>

        {/* Ringkasan PO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs text-slate-400">Total Hasil PO (Revenue)</p>
            <p className="text-lg font-bold text-emerald-400 mt-1">{formatRupiah(totalPoRevenue)}</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs text-slate-400">Total Akumulasi HPP</p>
            <p className="text-lg font-bold text-rose-400 mt-1">{formatRupiah(totalPoHpp)}</p>
          </div>
          <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-xl">
            <p className="text-xs text-amber-300">Total Laba Kotor PO (Gross Profit)</p>
            <p className="text-lg font-bold text-amber-400 mt-1">{formatRupiah(totalPoGrossProfit)}</p>
          </div>
        </div>

        {/* Tabel PO */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">No. PO & Klien</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-right">Harga Jual / Pcs</th>
                <th className="px-4 py-3 text-right">HPP / Pcs</th>
                <th className="px-4 py-3 text-right">Total Hasil PO</th>
                <th className="px-4 py-3 text-right">Laba Kotor</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {poCalculations.map((item) => {
                const rev = Number(item.qty) * Number(item.sellPrice);
                const hpp = Number(item.qty) * Number(item.hppPerPcs);
                const profit = rev - hpp;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <span className="font-bold text-amber-400">{item.id}</span>
                      <p className="font-semibold text-white">{item.client}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{item.product}</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-400">{item.qty} Pcs</td>
                    <td className="px-4 py-3 text-right text-slate-300">{formatRupiah(item.sellPrice)}</td>
                    <td className="px-4 py-3 text-right text-rose-400">{formatRupiah(item.hppPerPcs)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">{formatRupiah(rev)}</td>
                    <td className="px-4 py-3 text-right font-bold text-amber-300">{formatRupiah(profit)}</td>
                    <td className="px-4 py-3 text-center space-x-1">
                      <button onClick={() => { setPoEdit(item); setPoForm(item); setShowPoModal(true); }} className="p-1 text-slate-400 hover:text-amber-400 cursor-pointer inline-block"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeletePo(item.id)} className="p-1 text-rose-400 hover:text-white cursor-pointer inline-block"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ATUR TARGET PENJUALAN */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveTarget} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">Atur Target & Pencapaian Penjualan</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Target Bulanan (Rp)</label>
              <input type="number" required value={targetForm.target} onChange={e => setTargetForm({...targetForm, target: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Pencapaian Aktual (Rp)</label>
              <input type="number" required value={targetForm.current} onChange={e => setTargetForm({...targetForm, current: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowTargetModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH/EDIT PO & HPP */}
      {showPoModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePo} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">{poEdit ? 'Edit Data PO & HPP' : 'Tambah Data PO & HPP Baru'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">No. PO</label>
                <input type="text" required placeholder="PO-003" value={poForm.id} onChange={e => setPoForm({...poForm, id: e.target.value})} disabled={poEdit} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Konsumen</label>
                <input type="text" required placeholder="PT Makmur Jaya" value={poForm.client} onChange={e => setPoForm({...poForm, client: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Produk / Jenis Pakaian</label>
              <input type="text" required placeholder="Kemeja PDH" value={poForm.product} onChange={e => setPoForm({...poForm, product: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Jumlah (Qty)</label>
                <input type="number" required placeholder="100" value={poForm.qty} onChange={e => setPoForm({...poForm, qty: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Harga Jual/Pcs</label>
                <input type="number" required placeholder="120000" value={poForm.sellPrice} onChange={e => setPoForm({...poForm, sellPrice: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">HPP / Pcs</label>
                <input type="number" required placeholder="75000" value={poForm.hppPerPcs} onChange={e => setPoForm({...poForm, hppPerPcs: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowPoModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH BIAYA (FIX / VARIABLE) */}
      {showCostModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveCost} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">Tambah Komponen {costType === 'fixed' ? 'Fixed Cost' : 'Variable Cost'}</h3>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nama Komponen Biaya</label>
              <input type="text" required placeholder="Contoh: Biaya Promosi..." value={costForm.name} onChange={e => setCostForm({...costForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nominal / Rate (Rp)</label>
              <input type="number" required placeholder="1500000" value={costForm.amount} onChange={e => setCostForm({...costForm, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowCostModal(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"><Check className="w-4 h-4" /> Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
