import React, { useState } from 'react';
import ExecutiveOwnerSuite from './components/ExecutiveOwnerSuite';
import ClientCRM from './components/ClientCRM';
import NotesView from './components/NotesView';
import ZoomView from './components/ZoomView';
import AiAssistant from './components/AiAssistant';
import BossNotesRealtime from './components/BossNotesRealtime';
import PoProjectView from './components/PoProjectView';
import PaymentProofView from './components/PaymentProofView';
import MeetingHolidayView from './components/MeetingHolidayView';
import FactoryViews from './components/FactoryViews';
import MitraViews from './components/MitraViews';
import FinanceViews from './components/FinanceViews';
import HrdViews from './components/HrdViews';
import MarketingViews from './components/MarketingViews'; // <-- Import modul Marketing
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Video, 
  Palette, 
  MessageSquareQuote, 
  NotebookPen,
  Bot,
  BellRing,
  FileSpreadsheet,
  Receipt,
  CalendarDays,
  Factory,
  Calendar,
  Activity,
  Boxes,
  Calculator,
  ScanLine,
  GitBranch,
  Handshake,
  Building2,
  Truck,
  Store,
  Wallet,
  TrendingUp,
  ArrowLeftRight,
  BookOpen,
  FileText,
  ScanText,
  UsersRound,
  UserPlus,
  ScanFace,
  CalendarCheck,
  Clock,
  ReceiptText,
  Award,
  Banknote,
  Megaphone,
  Clapperboard,
  CreditCard,
  Trophy,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State untuk mengontrol Accordion Menu
  const [openSections, setOpenSections] = useState({
    main: true,
    workshop: true,
    finance: true,
    hrd: true,
    marketing: true, // <-- State Accordion Marketing
    mitra: true,
    premier: true,
    factory: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Header Mobile */}
      <div className="md:hidden bg-slate-900 border-b border-amber-500/20 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain rounded-lg border border-amber-500/40 bg-slate-950 p-0.5"
            onError={(e)=>{e.target.style.display='none';}} 
          />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-sm tracking-widest uppercase">
            CORE PROJECT
          </span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR UTAMA - ACCORDION MENU */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-amber-500/20 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-amber-500/20 flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-transparent">
          <img 
            src="/logo.png" 
            alt="CORE Project Logo" 
            className="w-11 h-11 object-contain rounded-xl border border-amber-500/40 bg-slate-950 p-1 shadow-lg shadow-amber-500/20"
            onError={(e)=>{e.target.style.display='none';}} 
          />
          <div>
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-sm tracking-widest uppercase drop-shadow">
              CORE PROJECT
            </h1>
            <p className="text-[10px] font-medium text-amber-400/80 tracking-wider">ERP Konveksi & Percetakan</p>
          </div>
        </div>

        {/* Menu Navigasi dengan Accordion */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Kategori 1: Menu Utama */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('main')}
              className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Menu Utama</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.main ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>
            
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSections.main ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
              </button>

              <button
                onClick={() => { setActiveTab('crm'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'crm' ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4" /> Database Konsumen & CRM
              </button>
            </div>
          </div>

          {/* Kategori 2: Fitur Workshop */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <button 
              onClick={() => toggleSection('workshop')}
              className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Fitur Workshop</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.workshop ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSections.workshop ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <Layers className="w-4 h-4 text-amber-400" /> Rantai Estafet Produksi
              </div>
              <button
                onClick={() => { setActiveTab('po-project'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'po-project' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" /> PO PROJECT
              </button>
              <button
                onClick={() => { setActiveTab('payment'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'payment' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Receipt className="w-4 h-4 text-amber-400" /> BUKTI PAYMENT
              </button>
              <button
                onClick={() => { setActiveTab('meeting-libur'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'meeting-libur' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <CalendarDays className="w-4 h-4 text-amber-400" /> MEETING & LIBUR
              </button>
              <button
                onClick={() => { setActiveTab('notes'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'notes' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <NotebookPen className="w-4 h-4 text-amber-400" /> Notes & Kegiatan Harian
              </button>
              <button
                onClick={() => { setActiveTab('zoom'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'zoom' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Video className="w-4 h-4 text-amber-400" /> Zoom Meet CORE Project
              </button>
            </div>
          </div>

          {/* Kategori 3: Finance & Kas */}
          <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-md">
            <button 
              onClick={() => toggleSection('finance')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><Wallet className="w-4 h-4" /> Finance & Kas</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.finance ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 text-xs overflow-hidden transition-all duration-300 ease-in-out ${openSections.finance ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('finance-pl'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance-pl' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-amber-400" /> Laba Rugi (P&L)
              </button>
              <button
                onClick={() => { setActiveTab('finance-cashflow'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance-cashflow' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4 text-amber-400" /> Cashflow & Arus Kas
              </button>
              <button
                onClick={() => { setActiveTab('finance-ledger'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance-ledger' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" /> Accounting & Buku Kas
              </button>
              <button
                onClick={() => { setActiveTab('finance-invoice'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance-invoice' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" /> Invoice & Tagihan DP
              </button>
              <button
                onClick={() => { setActiveTab('finance-ocr'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance-ocr' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ScanText className="w-4 h-4 text-amber-400" /> AI Scan OCR Nota
              </button>
            </div>
          </div>

          {/* Kategori 4: Marketing & Sales (BARU) */}
          <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-md">
            <button 
              onClick={() => toggleSection('marketing')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Marketing & Sales</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.marketing ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 text-xs overflow-hidden transition-all duration-300 ease-in-out ${openSections.marketing ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('marketing-reseller'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketing-reseller' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4 text-amber-400" /> Reseller & Kemitraan
              </button>
              <button
                onClick={() => { setActiveTab('marketing-content'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketing-content' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Clapperboard className="w-4 h-4 text-amber-400" /> Content Creator Labs
              </button>
              <button
                onClick={() => { setActiveTab('marketing-rekening'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketing-rekening' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" /> No Rekening Marketing
              </button>
              <button
                onClick={() => { setActiveTab('marketing-ranking'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketing-ranking' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" /> Rangking Marketing
              </button>
            </div>
          </div>

          {/* Kategori 5: HRD & KARYAWAN */}
          <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-md">
            <button 
              onClick={() => toggleSection('hrd')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><UsersRound className="w-4 h-4" /> HRD & Karyawan</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.hrd ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 text-xs overflow-hidden transition-all duration-300 ease-in-out ${openSections.hrd ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('hrd-ats'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-ats' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <UserPlus className="w-4 h-4 text-amber-400" /> Rekruitmen HRD ATS
              </button>
              <button
                onClick={() => { setActiveTab('hrd-faceid'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-faceid' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ScanFace className="w-4 h-4 text-amber-400" /> Absensi Face ID
              </button>
              <button
                onClick={() => { setActiveTab('hrd-calendar'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-calendar' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-amber-400" /> Kalender Kerja & Libur
              </button>
              <button
                onClick={() => { setActiveTab('hrd-overtime'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-overtime' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-400" /> Pengajuan Lembur
              </button>
              <button
                onClick={() => { setActiveTab('hrd-reimburse'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-reimburse' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ReceiptText className="w-4 h-4 text-amber-400" /> Klaim Reimburse
              </button>
              <button
                onClick={() => { setActiveTab('hrd-kpi'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-kpi' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" /> Penilaian KPI
              </button>
              <button
                onClick={() => { setActiveTab('hrd-cashadvance'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'hrd-cashadvance' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Banknote className="w-4 h-4 text-amber-400" /> Kasbon Karyawan
              </button>
            </div>
          </div>

          {/* Kategori 6: Mitra Core */}
          <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-md">
            <button 
              onClick={() => toggleSection('mitra')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><Handshake className="w-4 h-4" /> Mitra Core</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.mitra ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 text-xs overflow-hidden transition-all duration-300 ease-in-out ${openSections.mitra ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('mitra-factory'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'mitra-factory' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-400" /> Mitra Factory
              </button>
              <button
                onClick={() => { setActiveTab('mitra-supplier'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'mitra-supplier' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-400" /> Mitra Supplier
              </button>
              <button
                onClick={() => { setActiveTab('mitra-reseller'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'mitra-reseller' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Store className="w-4 h-4 text-amber-400" /> Mitra Reseller
              </button>
            </div>
          </div>

          {/* Kategori 7: Fitur Premier BOS JOW */}
          <div className="bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 p-3 rounded-2xl space-y-2 shadow-lg">
            <button 
              onClick={() => toggleSection('premier')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><span>⭐</span> Fitur Premier BOS JOW</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.premier ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSections.premier ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('ai-assistant'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ai-assistant' ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-amber-300/80 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Bot className="w-4 h-4 text-amber-400" /> 1. Asisten BOS (AI & Suara)
              </button>
              <button
                onClick={() => { setActiveTab('boss-notes'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'boss-notes' ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-amber-300/80 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BellRing className="w-4 h-4 text-amber-400" /> 2. Catatan Realtime BOS
              </button>
            </div>
          </div>

          {/* Kategori 8: Factory & Produksi */}
          <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-md">
            <button 
              onClick={() => toggleSection('factory')}
              className="w-full flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider px-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2"><Factory className="w-4 h-4" /> Factory & Produksi</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.factory ? 'rotate-180 text-amber-400' : 'rotate-0'}`} />
            </button>

            <div className={`space-y-1 text-xs overflow-hidden transition-all duration-300 ease-in-out ${openSections.factory ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('factory-deadline'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-deadline' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" /> Kalender Dateline
              </button>
              <button
                onClick={() => { setActiveTab('factory-tracking'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-tracking' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-4 h-4 text-amber-400" /> Tracking Proses
              </button>
              <button
                onClick={() => { setActiveTab('factory-stock'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-stock' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Boxes className="w-4 h-4 text-amber-400" /> Stok Bahan Baku
              </button>
              <button
                onClick={() => { setActiveTab('factory-calc'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-calc' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-400" /> Hitung Kebutuhan Bahan
              </button>
              <button
                onClick={() => { setActiveTab('factory-barcode'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-barcode' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ScanLine className="w-4 h-4 text-amber-400" /> Scan Barcode Factory
              </button>
              <button
                onClick={() => { setActiveTab('factory-bom'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'factory-bom' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <GitBranch className="w-4 h-4 text-amber-400" /> BOM & Alur Lanjutan
              </button>
            </div>
          </div>

        </div>

        {/* Profil BOS JOW */}
        <div className="p-4 border-t border-amber-500/20 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/40">
              BJ
            </div>
            <div>
              <p className="text-xs font-semibold text-white">BOS JOW</p>
              <p className="text-[10px] text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Gold Elegant Active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-screen bg-slate-950 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <ExecutiveOwnerSuite />}
          {activeTab === 'crm' && <ClientCRM />}
          {activeTab === 'po-project' && <PoProjectView />}
          {activeTab === 'payment' && <PaymentProofView />}
          {activeTab === 'meeting-libur' && <MeetingHolidayView />}
          {activeTab === 'notes' && <NotesView />}
          {activeTab === 'zoom' && <ZoomView />}
          {activeTab === 'ai-assistant' && <AiAssistant />}
          {activeTab === 'boss-notes' && <BossNotesRealtime />}
          {activeTab.startsWith('factory-') && <FactoryViews tab={activeTab} />}
          {activeTab.startsWith('mitra-') && <MitraViews tab={activeTab} />}
          {activeTab.startsWith('finance-') && <FinanceViews tab={activeTab} />}
          {activeTab.startsWith('hrd-') && <HrdViews tab={activeTab} />}
          {activeTab.startsWith('marketing-') && <MarketingViews tab={activeTab} />}
        </div>
      </main>

    </div>
  );
}
