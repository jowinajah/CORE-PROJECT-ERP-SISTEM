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
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* SIDEBAR UTAMA - GOLD ELEGANT & LOGO */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-amber-500/20 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header dengan Logo Asli & Teks Elegan */}
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

        {/* Menu Navigasi */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu Utama</p>
            <div className="space-y-1">
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

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Fitur Workshop</p>
            <div className="space-y-1">
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

          {/* FITUR PREMIER BOS JOW */}
          <div className="bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 p-3 rounded-2xl space-y-2 shadow-lg">
            <div className="flex items-center gap-2 px-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>⭐</span> Fitur Premier BOS JOW
            </div>
            <div className="space-y-1">
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
        </div>
      </main>

    </div>
  );
}
