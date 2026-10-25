import React, { useState } from 'react';
import LoginView from './components/LoginView';
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
import MarketingViews from './components/MarketingViews';
import RantaiProduksiView from './components/RantaiProduksiView';
import VisiMisiView from './components/VisiMisiView';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Video, 
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
  X,
  Zap,
  LogOut,
  Bell,
  MessageSquare,
  Send,
  Target
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('core_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('core_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('core_current_user');
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topMenuOpen, setTopMenuOpen] = useState(false);

  // State untuk Modal Notifikasi & Widget Live Chat Mengambang di Pojok Kiri Bawah
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Marketing', text: 'Min, PO baru untuk Kemeja KKN UIN sudah di-input ya.', time: '14:00' },
    { sender: 'Produksi', text: 'Siap, bahan kain Nagata Drill sedang dipotong di meja cutting.', time: '14:05' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: currentUser.name, text: chatInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setChatInput('');
  };

  // State untuk mengontrol Accordion Menu
  const [openSections, setOpenSections] = useState({
    main: true,
    workshop: true,
    finance: true,
    hrd: true,
    marketing: true,
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

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans relative">
      
      {/* Header Mobile */}
      <div className="md:hidden bg-slate-900 border-b border-amber-500/20 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/30 border border-amber-100 transform rotate-45">
            <div className="w-4 h-4 bg-slate-950 transform -rotate-45"></div>
          </div>
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
        <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 border border-amber-100 flex-shrink-0 transform rotate-45">
              <div className="w-4 h-4 bg-slate-950 rounded-sm transform -rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-xs tracking-wider uppercase">
                CORE PROJECT
              </h1>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 text-[9px] font-bold text-amber-400 rounded-md tracking-wide uppercase">
                ERP WORKSHOP
              </span>
            </div>
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
            
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSections.main ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
              </button>
              <button
                onClick={() => { setActiveTab('visi-misi'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'visi-misi' ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Target className="w-4 h-4 text-amber-400" /> Visi & Misi CORE
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
              <button
                onClick={() => { setActiveTab('rantai-produksi'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'rantai-produksi' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" /> Rantai Estafet Produksi
              </button>
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

          {/* Kategori 4: Marketing & Sales */}
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

            <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSections.premier ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
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
              <button
                onClick={() => { setActiveTab('crm'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'crm' ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-amber-300/80 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4 text-amber-400" /> 3. Database Konsumen & CRM
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

        {/* Profil & Logout BOS JOW */}
        <div className="p-4 border-t border-amber-500/20 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/40">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400">{currentUser.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Keluar / Logout"
            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA DENGAN TOP ACTION BAR */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-950 overflow-y-auto relative">
        
        {/* TOP ACTION BAR DENGAN MENU DI POJOK KANAN */}
        <header className="bg-slate-900 border-b border-amber-500/20 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Quick Workshop:
            </span>
            <button 
              onClick={() => setActiveTab('rantai-produksi')} 
              className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>⚡ Rantai Estafet</span> 
              <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 rounded text-[10px] font-bold">7 Tahap</span>
            </button>
            <button 
              onClick={() => setActiveTab('hrd-faceid')} 
              className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/20 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>👤 Absen Face ID</span>
            </button>
            <button 
              onClick={() => setActiveTab('factory-barcode')} 
              className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/20 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>📷 Scan Barcode</span>
            </button>
            <button 
              onClick={() => setActiveTab('finance-cashflow')} 
              className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>💰 Arus Kas</span>
            </button>
          </div>

          {/* Bagian Kanan Header: Profil User & Tombol Garis Tiga (Notifikasi & Logout) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl whitespace-nowrap">
              <span>👑 {currentUser.name} ({currentUser.role})</span>
            </div>

            {/* Tombol Garis Tiga di Pojok Kanan */}
            <div className="relative">
              <button 
                onClick={() => setTopMenuOpen(!topMenuOpen)}
                className="p-2 bg-slate-950 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-sm"
                title="Menu Cepat"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Dropdown Menu Bar di Pojok Kanan */}
              {topMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl py-2 z-50 space-y-1">
                  <div className="px-4 py-2 border-b border-slate-800 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Menu Cepat Perusahaan
                  </div>
                  <button 
                    onClick={() => { setShowNotifModal(true); setTopMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-amber-400" /> Notifikasi Sistem
                  </button>
                  <div className="border-t border-slate-800 pt-1">
                    <button 
                      onClick={() => { handleLogout(); setTopMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 cursor-pointer font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" /> Logout / Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MODAL NOTIFIKASI */}
        {showNotifModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-400" /> Notifikasi Sistem & Workshop
                </h3>
                <button onClick={() => setShowNotifModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <p className="font-bold text-white">SPK PO-001 Telah Diperbarui</p>
                  <p className="text-slate-400">Status produksi beralih ke tahap Sewing/Jahit.</p>
                  <span className="text-[10px] text-amber-400">10 menit yang lalu</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <p className="font-bold text-white">Absensi Karyawan Harian</p>
                  <p className="text-slate-400">Semua pegawai lantai produksi telah melakukan Face ID.</p>
                  <span className="text-[10px] text-amber-400">1 jam yang lalu</span>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setShowNotifModal(false)} className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KONTEN UTAMA */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <ExecutiveOwnerSuite />}
            {activeTab === 'visi-misi' && <VisiMisiView />}
            {activeTab === 'rantai-produksi' && <RantaiProduksiView />}
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

        {/* WIDGET LIVE CHAT MENGAMBANG DI POJOK KIRI BAWAH */}
        <div className="fixed bottom-6 left-6 z-50">
          {!isChatOpen ? (
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 transition-all cursor-pointer border border-amber-200 relative group"
              title="Live Chat Antar Divisi"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                2
              </span>
              <span className="absolute left-16 bg-slate-900 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                💬 Live Chat Antar Divisi
              </span>
            </button>
          ) : (
            <div className="w-80 sm:w-96 h-[440px] bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
              {/* Header Chat */}
              <div className="bg-slate-950 px-4 py-3 border-b border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Live Chat Antar Divisi</h3>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-white cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Area Pesan */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs bg-slate-900/90">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`p-3 rounded-2xl space-y-1 ${msg.sender === currentUser.name ? 'bg-amber-500/15 border border-amber-500/30 ml-8' : 'bg-slate-950 border border-slate-800 mr-8'}`}>
                    <div className="flex justify-between items-center text-[10px] text-amber-400 font-bold">
                      <span>{msg.sender}</span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-white leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Form Input Chat */}
              <form onSubmit={handleSendChat} className="p-3 bg-slate-950 border-t border-amber-500/30 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ketik pesan antar divisi..." 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center cursor-pointer shadow-md">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* WIDGET PEMUTAR MUSIK MENGAMBANG */}
        <FloatingMusicPlayer />

      </div>

    </div>
  );
}
