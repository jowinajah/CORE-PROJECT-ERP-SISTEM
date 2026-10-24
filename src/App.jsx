import React, { useState } from 'react';
import ExecutiveOwnerSuite from './components/ExecutiveOwnerSuite';
import ClientCRM from './components/ClientCRM';
import NotesView from './components/NotesView';
import ZoomView from './components/ZoomView';
import AiAssistant from './components/AiAssistant';
import BossNotesRealtime from './components/BossNotesRealtime';
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
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Header Mobile */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            CP
          </div>
          <span className="font-bold text-white text-sm">CORE Project ERP</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR UTAMA */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-68 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-600/30">
            CP
          </div>
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide">CORE PROJECT</h1>
            <p className="text-[10px] text-indigo-400">ERP Konveksi & Percetakan</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Menu Utama */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu Utama</p>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
              </button>

              <button
                onClick={() => { setActiveTab('crm'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'crm' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4" /> Database Konsumen & CRM
              </button>
            </div>
          </div>

          {/* Fitur Workshop */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Fitur Workshop</p>
            <div className="space-y-1">
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <Layers className="w-4 h-4 text-indigo-400" /> Rantai Estafet Produksi
              </div>
              <button
                onClick={() => { setActiveTab('notes'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'notes' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <NotebookPen className="w-4 h-4 text-amber-400" /> Notes & Kegiatan Harian
              </button>
              <button
                onClick={() => { setActiveTab('zoom'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'zoom' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Video className="w-4 h-4 text-rose-400" /> Zoom Meet CORE Project
              </button>
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <Palette className="w-4 h-4 text-purple-400" /> Lab Tim Desain
              </div>
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <MessageSquareQuote className="w-4 h-4 text-emerald-400" /> Kotak Aduan & Saran
              </div>
            </div>
          </div>

          {/* FITUR PREMIER BOS JOW */}
          <div className="bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 p-3 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 px-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>⭐</span> Fitur Premier BOS JOW
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('ai-assistant'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ai-assistant' ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-amber-300/80 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Bot className="w-4 h-4 text-amber-400" /> 1. Asisten BOS (AI & Suara)
              </button>
              <button
                onClick={() => { setActiveTab('boss-notes'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'boss-notes' ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'text-amber-300/80 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BellRing className="w-4 h-4 text-amber-400" /> 2. Catatan Realtime BOS
              </button>
            </div>
          </div>

        </div>

        {/* Profil BOS JOW */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              BJ
            </div>
            <div>
              <p className="text-xs font-semibold text-white">BOS JOW</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Premier Active
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
          {activeTab === 'notes' && <NotesView />}
          {activeTab === 'zoom' && <ZoomView />}
          {activeTab === 'ai-assistant' && <AiAssistant />}
          {activeTab === 'boss-notes' && <BossNotesRealtime />}
        </div>
      </main>

    </div>
  );
}
