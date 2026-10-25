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
                  activeTab === 'po-project' ? 'bg-amber-400
