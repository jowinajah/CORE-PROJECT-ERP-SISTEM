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
  MapPin,
  Tag,
  Pencil
} from 'lucide-react';

export default function ClientCRM() {
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Rian Hidayat', 
      org: 'Himpunan Mahasiswa UIN Bandung', 
      phone: '081234567890', 
      city: 'Bandung',
      productType: 'Kemeja PDH 2in1',
      totalOrders: 3, 
      totalSpent: 7500000, 
      status: 'VIP KKN / Kampus' 
    },
    { 
      id: 2, 
      name: 'Chef Aris', 
      org: 'Cafe Kopi Senja', 
      phone: '081988776655', 
      city: 'Cimahi',
      productType: 'Worksheet',
      totalOrders: 2, 
      totalSpent: 3200000, 
      status: 'Reguler / FnB' 
    },
    { 
      id: 3, 
      name: 'Budi Santoso', 
      org: 'Komunitas Motor X-Rider', 
      phone: '085611223344', 
      city: 'Bandung',
      productType: 'Jersey',
      totalOrders: 5, 
      totalSpent: 14500000, 
      status: 'VIP Komunitas' 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = Tambah baru, berisikan ID = Mode Edit

  // State form untuk tambah atau edit data
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    phone: '',
    city: '',
    status: 'Reguler',
    productType: 'Kemeja PDH',
    totalOrders: 1,
    totalSpent: 0
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  // Filter pencarian klien
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Buka modal untuk Tambah Klien Baru
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      org: '',
      phone: '',
      city: '',
      status: 'Reguler',
      productType: 'Kemeja PDH',
      totalOrders: 1,
      totalSpent: 0
    });
    setShowModal(true);
  };

  // Buka modal untuk Edit Klien yang sudah ada
  const handleOpenEditModal = (client) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      org: client.org,
      phone: client.phone,
      city: client.city,
      status: client.status,
      productType: client.productType,
      totalOrders: client.totalOrders,
      totalSpent: client.totalSpent
    });
    setShowModal(true);
  };

  // Handle Simpan (bisa untuk Tambah maupun Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.org) return;

    if (editingId !== null) {
      // Proses Update Klien Lama
      setClients(clients.map(c => c.id === editingId ? {
        ...c,
        ...formData,
        totalOrders: Number(formData.totalOrders) || 1,
        totalSpent: Number(formData.totalSpent) || 0
      } : c));
    } else {
      // Proses Tambah Klien Baru
      const newClient = {
        id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
        ...formData,
        totalOrders: Number(formData.totalOrders) || 1,
        totalSpent: Number(formData.totalSpent) || 0
      };
      setClients([newClient, ...clients]);
    }

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
            Database Klien & Partner Konveksi
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Kelola data instansi, kampus, komunitas, jenis pesanan, serta pembaruan data secara real-time.
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
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
            placeholder="Cari nama, instansi, atau produk..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="text-sm text-slate-400 font-medium">
          Total Klien Terdaftar: <span className="text-indigo-400 font-bold">{clients.length} Klien</span>
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
                <th className="px-4 py-3">Jenis Pesanan Utama</th>
                <th className="px-4 py-3">Status / Tier</th>
                <th className="px-4 py-3">Total Order</th>
                <th className="px-4 py-3">Total Transaksi</th>
                <th className="px-4 py-3 rounded-r-lg text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-xs text-indigo-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" /> {client.org} ({client.city})
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 text-xs font-medium">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        {client.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 w-fit">
                        <Tag className="w-3 h-3 text-indigo-400" />
                        {client.productType}
                      </span>
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
                    <td className="px-4 py-3 font-bold text-emerald-400">
                      {formatRupiah(client.totalSpent)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleOpenEditModal(client)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1 mx-auto cursor-pointer"
                        title="Edit Data Klien"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-500 text-sm">
                    Tidak ada klien yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Klien */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                {editingId !== null ? 'Edit Data Klien & Order' : 'Tambah Klien & Riwayat Order Baru'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama PIC / Kontak</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Sahrul"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama Instansi / Kampus / Komunitas</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: KKN UIN Bandung"
                    value={formData.org}
                    onChange={(e) => setFormData({...formData, org: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">No WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="0812xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Kota</label>
                  <input 
                    type="text" 
                    placeholder="Bandung"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Pilihan Jenis Pesanan Konveksi Lengkap */}
              <div>
                <label className="block text-xs font-semibold text-indigo-400 uppercase mb-1">Jenis Pesanan</label>
                <select 
                  value={formData.productType}
                  onChange={(e) => setFormData({...formData, productType: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Kemeja PDH">Kemeja PDH</option>
                  <option value="Kemeja PDH 2in1">Kemeja PDH 2in1</option>
                  <option value="Worksheet / Workshirt">Worksheet / Workshirt</option>
                  <option value="Kemeja Pendek">Kemeja Pendek</option>
                  <option value="Kemeja Tactical">Kemeja Tactical</option>
                  <option value="Kemeja Reguler">Kemeja Reguler</option>
                  <option value="Kaos">Kaos</option>
                  <option value="Jaket Reguler">Jaket Reguler</option>
                  <option value="Jaket Bomber">Jaket Bomber</option>
                  <option value="Jaket Varsity">Jaket Varsity</option>
                  <option value="Work Jaket">Work Jaket</option>
                  <option value="Crewneck / Hoodie">Crewneck & Hoodie</option>
                  <option value="Jaket Coach">Jaket Coach</option>
                  <option value="Jas Almamater">Jas Almamater</option>
                  <option value="Jas Formal">Jas Formal</option>
                  <option value="Jas Hujan">Jas Hujan</option>
                  <option value="Wearpack">Wearpack</option>
                  <option value="Rompi">Rompi</option>
                  <option value="Celana">Celana</option>
                  <option value="Jersey">Jersey</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Total Order (Frekuensi)</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.totalOrders}
                    onChange={(e) => setFormData({...formData, totalOrders: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-400 uppercase mb-1">Total Transaksi (Rp)</label>
                  <input 
                    type="number" 
                    step="50000"
                    placeholder="Contoh: 2500000"
                    value={formData.totalSpent}
                    onChange={(e) => setFormData({...formData, totalSpent: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status / Tier Klien</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Reguler">Reguler</option>
                  <option value="VIP KKN / Kampus">VIP KKN / Kampus</option>
                  <option value="VIP Komunitas">VIP Komunitas</option>
                  <option value="FnB / Cafe">FnB / Cafe</option>
                  <option value="Instansi / Kantor">Instansi / Kantor</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" /> {editingId !== null ? 'Simpan Perubahan' : 'Simpan Klien'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
