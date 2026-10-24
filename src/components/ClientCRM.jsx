import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  PlusCircle, 
  Phone, 
  Building2, 
  ShoppingBag, 
  DollarSign,
  X,
  CheckCircle,
  MapPin
} from 'lucide-react';

export default function ClientCRM() {
  // Data awal klien konveksi CORE Project
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Triumma Indramayu', 
      org: 'Ikmada Indramayu', 
      phone: '0812-3456-7890', 
      city: 'Bandung',
      totalOrders: 3, 
      totalSpent: 7500000, 
      status: 'VIP Kemeja Pdh / Orda' 
    },
    { 
      id: 2, 
      name: 'Reza', 
      org: 'Disdik jabar', 
      phone: '0819-8877-6655', 
      city: 'Bandung',
      totalOrders: 2, 
      totalSpent: 3200000, 
      status: 'Reguler / FnB' 
    },
    { 
      id: 3, 
      name: 'Budi Santoso', 
      org: 'Komunitas Nmax Bandung', 
      phone: '0856-1122-3344', 
      city: 'Bandung',
      totalOrders: 5, 
      totalSpent: 14500000, 
      status: 'VIP Komunitas' 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // State form tambah klien baru
  const [newClient, setNewClient] = useState({
    name: '',
    org: '',
    phone: '',
    city: '',
    status: 'Reguler'
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  // Filter pencarian klien
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.org) return;

    const clientToAdd = {
      id: clients.length + 1,
      ...newClient,
      totalOrders: 1,
      totalSpent: 0
    };

    setClients([clientToAdd, ...clients]);
    setNewClient({ name: '', org: '', phone: '', city: '', status: 'Reguler' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <Users className="w-4 h-4" />
            CORE Project ERP • Manajemen Pelanggan & CRM
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Database Klien & Partner
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Kelola data instansi, kampus, kafe, dan riwayat pesanan konveksi dengan mudah.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Klien Baru
        </button>
      </div>

      {/* Bar Pencarian & Statistik Singkat */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama klien / instansi..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="text-sm text-slate-400 font-medium">
          Total Terdaftar: <span className="text-indigo-400 font-bold">{clients.length} Klien</span>
        </div>
      </div>

      {/* Tabel Klien */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Nama & Instansi</th>
                <th className="px-4 py-3">Kontak WhatsApp</th>
                <th className="px-4 py-3">Kota</th>
                <th className="px-4 py-3">Status / Tier</th>
                <th className="px-4 py-3">Total Order</th>
                <th className="px-4 py-3 rounded-r-lg">Total Transaksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-xs text-indigo-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" /> {client.org}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 text-xs font-medium">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        {client.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-xs flex items-center gap-1 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {client.city}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-200 font-medium">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-400" /> {client.totalOrders}x Order
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">
                      {formatRupiah(client.totalSpent)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500 text-sm">
                    Tidak ada klien yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Klien */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Tambah Klien Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama PIC / Kontak</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Sahrul Gunawan"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama Instansi / Komunitas / Kampus</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: KKN UIN Bandung"
                  value={newClient.org}
                  onChange={(e) => setNewClient({...newClient, org: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">No WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="0812xxxxxxxx"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Kota</label>
                  <input 
                    type="text" 
                    placeholder="Bandung"
                    value={newClient.city}
                    onChange={(e) => setNewClient({...newClient, city: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status / Kategori</label>
                <select 
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Reguler">Reguler</option>
                  <option value="VIP KKN / Kampus">VIP KKN / Kampus</option>
                  <option value="VIP Komunitas">VIP Komunitas</option>
                  <option value="FnB / Cafe">FnB / Cafe</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Simpan Klien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
