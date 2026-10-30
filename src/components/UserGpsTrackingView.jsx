import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink, Clock, ShieldCheck, Radar } from 'lucide-react';

export default function UserGpsTrackingView({ currentUser }) {
  const [trackingList, setTrackingList] = useState(() => {
    const saved = localStorage.getItem('core_user_gps_tracking');
    if (saved) { try { return JSON.parse(saved); } catch(e){ console.error(e); } }
    return [
      { id: 'T-01', name: 'Kodar', division: 'Div. Produksi', lat: -6.917500, lng: 107.619100, locationName: 'Workshop Utama CORE Project, Bandung', status: 'Di Workshop', lastUpdate: 'Hari ini, 10:30 WIB' },
      { id: 'T-02', name: 'Sahrul', division: 'Div. Office', lat: -6.920000, lng: 107.610000, locationName: 'Kantor Administrasi & Resepsionis', status: 'Standby Kantor', lastUpdate: 'Hari ini, 11:15 WIB' },
      { id: 'T-03', name: 'Nita', division: 'Div. Office', lat: -6.915000, lng: 107.625000, locationName: 'Kawasan Gedung Sate, Bandung', status: 'Pengiriman Dokumen PO', lastUpdate: 'Hari ini, 09:45 WIB' },
      { id: 'T-04', name: 'Bani', division: 'Div. Office', lat: -6.930000, lng: 107.600000, locationName: 'Sentra Kain Textile Cigondewah', status: 'Belanja Bahan Baku', lastUpdate: 'Hari ini, 11:00 WIB' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('core_user_gps_tracking', JSON.stringify(trackingList));
  }, [trackingList]);

  // AUTO-TRACKING: Begitu halaman GPS dibuka oleh user, sistem otomatis mendeteksi & mengirim koordinat
  useEffect(() => {
    if (!navigator.geolocation || !currentUser) return;

    const updateAutoLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const timeNow = 'Hari ini, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB';

          setTrackingList(prev => {
            const exists = prev.find(item => item.name === currentUser.name);
            if (exists) {
              return prev.map(item => item.name === currentUser.name ? {
                ...item,
                lat,
                lng,
                locationName: `Koordinat GPS Otomatis (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                status: 'Aktif / Terpantau',
                lastUpdate: timeNow
              } : item);
            } else {
              return [{
                id: 'T-' + Date.now(),
                name: currentUser.name,
                division: currentUser.division || 'Div. Umum',
                lat,
                lng,
                locationName: `Koordinat GPS Otomatis (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                status: 'Aktif / Terpantau',
                lastUpdate: timeNow
              }, ...prev];
            }
          });
        },
        (error) => {
          console.log("Auto GPS silent sync skipped or denied.");
        },
        { enableHighAccuracy: true }
      );
    };

    updateAutoLocation();
  }, [currentUser]);

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto">
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <Radar className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wide">⭐ Fitur Premier BOS JOW</span>
            <h2 className="text-xl font-bold text-white mt-1">Live Tracking GPS Karyawan (Silent Mode)</h2>
            <p className="text-slate-400 text-xs">Lokasi seluruh staff otomatis tersinkronisasi ke sistem tanpa tombol manual, terintegrasi langsung dengan Google Maps.</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-slate-950 border border-amber-500/30 rounded-xl text-xs text-amber-400 font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Status: Auto-Tracking Aktif</span>
        </div>
      </div>

      {/* GRID KARTU LOKASI KARYAWAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trackingList.map((item) => {
          const gmapsUrl = `https://www.google.com/maps?q=${item.lat},${item.lng}`;
          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl shadow-md space-y-4 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center border border-amber-500/40 shadow">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="px-2 py-0.5 bg-slate-800 text-amber-400 border border-slate-700 text-[10px] font-bold rounded-md">
                        {item.division}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {item.status}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Posisi Terpantau:</p>
                      <p className="text-slate-400 text-[11px]">{item.locationName}</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    Koordinat: {item.lat.toFixed(6)}, {item.lng.toFixed(6)}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.lastUpdate}</span>
                </div>
                <a 
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
