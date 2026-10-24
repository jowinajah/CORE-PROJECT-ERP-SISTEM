import React, { useState } from 'react';
import { Bot, Send, Volume2, Sparkles } from 'lucide-react';

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Halo BOS JOW! Saya Asisten AI CORE Project. Ada strategi produksi, analisis omset, atau bahan konveksi yang ingin didiskusikan hari ini?' }
  ]);
  const [input, setInput] = useState('');

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    const newMsgs = [...messages, { sender: 'BOS JOW', text: userMsg }];
    setMessages(newMsgs);
    setInput('');

    // Respon AI cerdas seputar konveksi
    setTimeout(() => {
      let reply = "Siap BOS JOW! Untuk pesanan tersebut akan saya koordinasikan dengan mandor workshop dan bagian logistik.";
      if (userMsg.toLowerCase().includes('omset') || userMsg.toLowerCase().includes('keuangan')) {
        reply = "Omset bulan ini sudah mencapai Rp 48.500.000, naik 12.5% dibanding bulan lalu. Performa yang sangat cemerlang!";
      } else if (userMsg.toLowerCase().includes('kain') || userMsg.toLowerCase().includes('bahan')) {
        reply = "Catatan stok kain Nagata Drill dan American Drill terpantau aman, namun perlu perhatian untuk stok kain katun combed hitam.";
      }
      
      setMessages([...newMsgs, { sender: 'AI', text: reply }]);
      speakText(reply);
    }, 800);
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-amber-900/40 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Fitur Premier BOS JOW
          </div>
          <h1 className="text-2xl font-bold text-white">Asisten BOS (AI & Suara Pintar)</h1>
          <p className="text-slate-400 text-sm mt-1">Konsultasikan operasional konveksi dan percetakan langsung dengan AI berfitur suara.</p>
        </div>
        <Bot className="w-12 h-12 text-amber-400 animate-pulse hidden sm:block" />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-[450px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'BOS JOW' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-slate-400 mb-1 font-semibold">{m.sender}</span>
              <div className={`p-3 rounded-2xl max-w-md text-xs sm:text-sm flex items-start gap-2 ${
                m.sender === 'BOS JOW' ? 'bg-amber-500 text-slate-950 font-medium' : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}>
                <span className="flex-1">{m.text}</span>
                {m.sender === 'AI' && (
                  <button onClick={() => speakText(m.text)} className="text-amber-400 hover:text-amber-300 cursor-pointer pt-0.5">
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
          <input 
            type="text" 
            placeholder="Ketik perintah atau tanya ke Asisten AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
          />
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer">
            <Send className="w-4 h-4" /> Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
