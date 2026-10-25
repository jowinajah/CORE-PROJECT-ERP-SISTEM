import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Sliders, X, Disc, Radio } from 'lucide-react';

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Playlist Full Album Perunggu (Memorandum & Hits Lainnya)
  const playlist = [
    {
      title: 'Menaruh Perhatian',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      title: '3 Menit 30 Detik',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      title: 'Kalibata Bawah',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'Pergi Bersua',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    {
      title: 'Ini Abadi',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      title: 'Biar',
      artist: 'Perunggu',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
  ];

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio play error:", e));
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* AUDIO ELEMENT */}
      <audio 
        ref={audioRef}
        src={playlist[currentTrackIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      {/* TOMBOL MENGAMBANG CONTROL CENTER */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 hover:scale-110 transition-all cursor-pointer border-2 border-amber-100 relative group animate-pulse"
          title="Buka Pusat Kontrol Musik Perunggu"
        >
          <Sliders className="w-6 h-6 animate-spin-slow" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          <span className="absolute right-16 bg-slate-900 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            🎸 Perunggu - Full Album
          </span>
        </button>
      ) : (
        /* WIDGET PEMUTAR MUSIK UTAMA */
        <div className="w-80 sm:w-96 bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700"></div>

          {/* HEADER PUSAT KONTROL */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Perunggu - Memorandum</h4>
                <p className="text-[10px] text-amber-400">Workshop Indie Rock Stream</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ALBUM ART / DISC ANIMATION */}
          <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md ${isPlaying ? 'animate-spin' : ''}`}>
              <Disc className="w-7 h-7" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-white truncate">{playlist[currentTrackIndex].title}</p>
              <p className="text-[10px] text-amber-400/80 truncate">{playlist[currentTrackIndex].artist}</p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="space-y-1">
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-amber-400 h-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* TOMBOL KONTROL UTAMA */}
          <div className="flex items-center justify-center gap-4 py-1">
            <button 
              onClick={handlePrev}
              className="p-2 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="Lagu Sebelumnya"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 cursor-pointer transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button 
              onClick={handleNext}
              className="p-2 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="Lagu Selanjutnya"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* PENGATUR VOLUME & PLAYLIST ALBUM PERUNGGU */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white cursor-pointer">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                className="w-full accent-amber-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* DAFTAR TRACK PERUNGGU */}
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Album Memorandum - Perunggu:</p>
              {playlist.map((track, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-[11px] flex items-center justify-center justify-between cursor-pointer transition-all ${currentTrackIndex === idx ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}
                >
                  <span className="truncate">{idx + 1}. {track.title}</span>
                  {currentTrackIndex === idx && isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
