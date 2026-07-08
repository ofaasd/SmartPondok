import React, { useState } from 'react';
import { 
  BookOpen, 
  CreditCard, 
  Clock, 
  Building2, 
  Check, 
  MessageSquare, 
  UserCheck, 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  ArrowRight,
  TrendingUp,
  User,
  Activity,
  Award
} from 'lucide-react';

export default function InteractiveMockup() {
  const [activeTab, setActiveTab] = useState<'tahfidz' | 'rfid' | 'perizinan' | 'spp'>('tahfidz');

  // --- Tahfidz Simulator State ---
  const [tahfidzList, setTahfidzList] = useState([
    { id: 1, name: 'Ahmad Fauzi', surah: 'An-Naba', verses: '1-20', status: 'Sangat Lancar', date: 'Hari ini, 08:30' },
    { id: 2, name: 'Zahra Aliyah', surah: 'An-Naziat', verses: '1-15', status: 'Lancar (Lulus)', date: 'Hari ini, 07:15' },
    { id: 3, name: 'M. Reyhan', surah: 'Abasa', verses: '1-40', status: 'Perlu Lancarkan', date: 'Kemarin' },
  ]);
  const [newSetoran, setNewSetoran] = useState({
    name: 'Ahmad Fauzi',
    surah: 'An-Naba',
    verses: '21-40',
    status: 'Sangat Lancar'
  });
  const [waNotification, setWaNotification] = useState<string | null>(null);

  const handleSaveSetoran = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: newSetoran.name,
      surah: newSetoran.surah,
      verses: newSetoran.verses,
      status: newSetoran.status,
      date: 'Baru saja'
    };
    setTahfidzList([newEntry, ...tahfidzList]);
    
    // Simulate WhatsApp text
    const waText = `Bismillah. Assalamu'alaikum Wr. Wb. Kami menginfokan bahwa putra/putri Anda, *${newSetoran.name}*, baru saja menyelesaikan setoran hafalan Surah *${newSetoran.surah}* ayat *${newSetoran.verses}* dengan predikat *${newSetoran.status}*. Semoga barokah & mutqin. Jazakumullah khair. - Pengasuh SmartPondok`;
    setWaNotification(waText);
    setTimeout(() => {
      // Clear notification after 6 seconds
    }, 8000);
  };

  // --- RFID Cashless Simulator State ---
  const [rfidBalance, setRfidBalance] = useState(45000);
  const [rfidHistory, setRfidHistory] = useState([
    { id: 1, item: 'Susu UHT & Roti', cost: 7500, type: 'Kantin', date: '09:45' },
    { id: 2, item: 'Buku Tulis Sidu', cost: 12000, type: 'Koperasi', date: 'Kemarin' },
  ]);
  const [purchaseItem, setPurchaseItem] = useState('Nasi Kuning');
  const [purchaseCost, setPurchaseCost] = useState(10000);
  const [rfidMessage, setRfidMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanRFID = () => {
    setIsScanning(true);
    setRfidMessage(null);
    setTimeout(() => {
      setIsScanning(false);
      if (rfidBalance < purchaseCost) {
        setRfidMessage({ text: 'Transaksi Gagal: Saldo RFID Tidak Mencukupi!', error: true });
      } else {
        const newBalance = rfidBalance - purchaseCost;
        setRfidBalance(newBalance);
        setRfidHistory([
          { id: Date.now(), item: purchaseItem, cost: purchaseCost, type: 'Kantin', date: 'Sekarang' },
          ...rfidHistory
        ]);
        setRfidMessage({ text: `Transaksi Berhasil! Saldo didebit Rp ${purchaseCost.toLocaleString('id-ID')}. Sisa saldo: Rp ${newBalance.toLocaleString('id-ID')}`, error: false });
      }
    }, 1500);
  };

  // --- Perizinan Simulator State ---
  const [izinList, setIzinList] = useState([
    { id: 1, name: 'M. Hafiz', type: 'Izin Pulang (Sakit)', status: 'Menunggu Persetujuan', outDate: '08 Juli 2026', inDate: '11 Juli 2026' },
    { id: 2, name: 'Siti Aminah', type: 'Izin Keluar (Beli Kitab)', status: 'Disetujui (Di Luar)', outDate: '08 Juli 09:00', inDate: '08 Juli 13:00' },
    { id: 3, name: 'Rizky Pratama', type: 'Izin Pulang (Nikahan Kakak)', status: 'Sudah Kembali', outDate: '01 Juli 2026', inDate: '05 Juli 2026' },
  ]);
  const [activeOutside, setActiveOutside] = useState(1);
  const [insidePondok, setInsidePondok] = useState(249);

  const handleApproveIzin = (id: number) => {
    setIzinList(izinList.map(item => {
      if (item.id === id) {
        setActiveOutside(activeOutside + 1);
        setInsidePondok(insidePondok - 1);
        return { ...item, status: 'Disetujui (Di Luar)' };
      }
      return item;
    }));
  };

  // --- SPP Virtual Account State ---
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [pesantrenCash, setPesantrenCash] = useState(145800000);

  const handlePaySPP = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setInvoicePaid(true);
      setPesantrenCash(pesantrenCash + 750000);
    }, 2000);
  };

  return (
    <div id="demo-tour" className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_-6px_rgba(0,0,0,0.03)] border border-slate-200/60 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-6 md:p-8 text-white relative overflow-hidden">
        {/* Background Decorative Mesh Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-emerald-800),_transparent_60%)] opacity-30 pointer-events-none"></div>
        <span className="bg-emerald-800/80 text-emerald-200 text-xs px-3.5 py-1 rounded-full font-medium tracking-wider uppercase border border-emerald-700/50 inline-block relative z-10">Live Interactive Demo</span>
        <h3 className="text-2xl md:text-3xl font-serif mt-2 relative z-10">Coba Langsung Sistem SmartPondok</h3>
        <p className="text-emerald-200/80 mt-2 max-w-2xl text-sm md:text-base relative z-10">
          Gunakan tombol di bawah untuk mencoba mensimulasikan fitur utama. Lihat bagaimana data saling terintegrasi secara otomatis.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap border-b border-slate-200/50 bg-slate-50/80 p-2 gap-1.5">
        <button
          onClick={() => setActiveTab('tahfidz')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'tahfidz' ? 'bg-emerald-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}`}
        >
          <BookOpen size={16} />
          <span>Setoran Tahfidz & WA</span>
        </button>
        <button
          onClick={() => setActiveTab('rfid')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'rfid' ? 'bg-emerald-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}`}
        >
          <CreditCard size={16} />
          <span>Kantin RFID Cashless</span>
        </button>
        <button
          onClick={() => setActiveTab('perizinan')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'perizinan' ? 'bg-emerald-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}`}
        >
          <Clock size={16} />
          <span>Peta Santri / Perizinan</span>
        </button>
        <button
          onClick={() => setActiveTab('spp')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'spp' ? 'bg-emerald-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}`}
        >
          <Building2 size={16} />
          <span>Virtual Account & SPP</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left Side Simulator controls */}
        <div className="lg:col-span-5 p-6 bg-[#F8FAFC] border-r border-slate-200/50 flex flex-col justify-between">
          <div>
            {activeTab === 'tahfidz' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                    <BookOpen size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-800">Ustadz / Pengasuh - Input Hafalan</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Asatidzah menginput surah dan ayat yang disetorkan santri hari ini. Sistem otomatis mencatat perkembangan juz dan mengirim pesan WA ke orang tua.
                </p>

                <form onSubmit={handleSaveSetoran} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Nama Santri</label>
                    <select 
                      value={newSetoran.name} 
                      onChange={(e) => setNewSetoran({ ...newSetoran, name: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 outline-none focus:border-emerald-600"
                    >
                      <option value="Ahmad Fauzi">Ahmad Fauzi (Kamar Al-Ghazali)</option>
                      <option value="Zahra Aliyah">Zahra Aliyah (Kamar Fatimah 1)</option>
                      <option value="M. Reyhan">M. Reyhan (Kamar Al-Farabi)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Surah</label>
                      <input 
                        type="text" 
                        value={newSetoran.surah}
                        onChange={(e) => setNewSetoran({ ...newSetoran, surah: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 outline-none focus:border-emerald-600"
                        placeholder="contoh: An-Naba"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Ayat</label>
                      <input 
                        type="text" 
                        value={newSetoran.verses}
                        onChange={(e) => setNewSetoran({ ...newSetoran, verses: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 outline-none focus:border-emerald-600"
                        placeholder="contoh: 1-15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Predikat Kelancaran</label>
                    <select 
                      value={newSetoran.status} 
                      onChange={(e) => setNewSetoran({ ...newSetoran, status: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 outline-none focus:border-emerald-600"
                    >
                      <option value="Sangat Lancar">Sangat Lancar (Mumtaz)</option>
                      <option value="Lancar (Lulus)">Lancar (Lulus)</option>
                      <option value="Perlu Lancarkan">Perlu Diulang / Belum Lancar</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/10 cursor-pointer"
                  >
                    <span>Simpan Hafalan & Kirim WA</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'rfid' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                    <CreditCard size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-800">Santri Jajan Cashless RFID</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Santri jajan di kantin koperasi pondok menggunakan kartu RFID. Orang tua dapat mengunci batas jajan maksimal harian dan menyetop kartu dari jauh jika hilang.
                </p>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-3 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-sm font-bold font-mono">
                      MD
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-slate-800">M. Danish (Kamar Ibnu Sina)</h5>
                      <p className="text-[10px] text-slate-400">ID Kartu: RFID-901842-88</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span className="text-xs text-slate-500">Saldo Kartu Saat Ini</span>
                    <span className="text-sm font-bold text-slate-800">Rp {rfidBalance.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded-md">
                    <span>Limit Belanja Harian</span>
                    <span>Rp 20.000 (Sisa: Rp 20.000)</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => { setPurchaseItem('Nasi Kuning'); setPurchaseCost(10000); }}
                      className={`text-xs p-2 rounded-lg border text-left transition-all ${purchaseItem === 'Nasi Kuning' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      🍳 Nasi Kuning (Rp 10k)
                    </button>
                    <button 
                      onClick={() => { setPurchaseItem('Susu & Roti'); setPurchaseCost(7500); }}
                      className={`text-xs p-2 rounded-lg border text-left transition-all ${purchaseItem === 'Susu & Roti' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      🥯 Roti & Susu (Rp 7,5k)
                    </button>
                    <button 
                      onClick={() => { setPurchaseItem('Kitab Hadits'); setPurchaseCost(50000); }}
                      className={`text-xs p-2 rounded-lg border text-left transition-all ${purchaseItem === 'Kitab Hadits' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      📚 Kitab Hadits (Rp 50k)
                    </button>
                    <button 
                      onClick={() => { setPurchaseItem('Air Mineral'); setPurchaseCost(3000); }}
                      className={`text-xs p-2 rounded-lg border text-left transition-all ${purchaseItem === 'Air Mineral' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      💧 Air Mineral (Rp 3k)
                    </button>
                  </div>

                  <button 
                    onClick={handleScanRFID}
                    disabled={isScanning}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-medium text-xs py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-700/10"
                  >
                    <CreditCard size={14} />
                    <span>{isScanning ? 'Menunggu Ketukan Kartu...' : 'Ketuk Kartu RFID (Simulasi)'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'perizinan' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                    <Clock size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-800">Sistem Perizinan & Peta Santri</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Santri mengajukan izin keluar melalui ustadz asrama. Pengasuh utama dapat memverifikasi status, dan santri memindai QR Code di gerbang saat kembali.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-800 text-white p-3 rounded-xl shadow-sm text-center">
                    <div className="text-[10px] text-emerald-200/90 font-medium uppercase tracking-wider">Santri di Pondok</div>
                    <div className="text-2xl font-bold font-mono mt-0.5">{insidePondok}</div>
                  </div>
                  <div className="bg-amber-600 text-white p-3 rounded-xl shadow-sm text-center">
                    <div className="text-[10px] text-amber-100 font-medium uppercase tracking-wider">Izin di Luar</div>
                    <div className="text-2xl font-bold font-mono mt-0.5">{activeOutside}</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                  <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Pengajuan Izin Masuk Baru</h5>
                  <div className="border border-slate-100 p-2.5 rounded-lg bg-slate-50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-semibold text-slate-800">M. Hafiz</div>
                        <div className="text-[10px] text-slate-500">Izin Pulang (Sakit) • 3 hari</div>
                      </div>
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Menunggu</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApproveIzin(1)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold py-1.5 rounded-md cursor-pointer text-center"
                      >
                        Setujui Izin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spp' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                    <Building2 size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-800">Virtual Account SPP Otomatis</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Setiap santri mendapatkan nomor VA Bank unik. Begitu wali murid membayar SPP via m-banking, sistem kas pondok langsung terupdate otomatis detik itu juga tanpa verifikasi manual.
                </p>

                <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3 shadow-inner">
                  <div className="flex justify-between items-center text-xs border-b border-dashed border-slate-100 pb-2">
                    <span className="text-slate-500">Tagihan SPP Juli 2026</span>
                    <span className="font-bold text-slate-800">Siti Nurhaliza</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">No. Virtual Account BSI</span>
                    <span className="font-mono font-semibold text-slate-700">9882-0129-8732-0012</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Jumlah Tagihan</span>
                    <span className="font-bold text-slate-800">Rp 750.000</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-500">Status Pembayaran</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${invoicePaid ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                      {invoicePaid ? 'LUNAS (Otomatis)' : 'BELUM BAYAR'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={handlePaySPP}
                    disabled={invoicePaid || isPaying}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-800/10 disabled:text-emerald-800/50 font-medium text-xs py-3 px-4 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-700/10"
                  >
                    {isPaying ? (
                      <span>Simulasi Membayar via Bank...</span>
                    ) : invoicePaid ? (
                      <span className="flex items-center gap-1"><Check size={14} /> Berhasil Terbayar</span>
                    ) : (
                      <span>Simulasikan Wali Bayar SPP</span>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Tekan tombol untuk melihat simulasi real-time sinkronisasi kas pesantren.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100/60 hidden sm:block">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>RMS Technology Security Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Side Simulated Application View */}
        <div className="lg:col-span-7 bg-slate-900 text-slate-200 p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative font-sans">
          
          {/* Top panel mockup header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
              <span className="text-slate-400 text-xs font-semibold tracking-wider font-mono ml-2">SMARTPONDOK-ADMIN-v2.1</span>
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded-md text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>SINKRON</span>
            </div>
          </div>

          {/* Core App View */}
          <div className="flex-1">
            {activeTab === 'tahfidz' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-semibold tracking-wide text-white">REKAP MONITORING SETORAN TAHFIDZ</h5>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900">Live Database</span>
                </div>
                
                {/* Simulated Table */}
                <div className="bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[10px] uppercase font-semibold">
                        <th className="p-3">Santri</th>
                        <th className="p-3">Surah / Ayat</th>
                        <th className="p-3">Kualitas</th>
                        <th className="p-3">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {tahfidzList.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-900/40 transition-all duration-150">
                          <td className="p-3 font-medium text-slate-300">{entry.name}</td>
                          <td className="p-3 font-mono text-amber-300">{entry.surah} ({entry.verses})</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium inline-block ${
                              entry.status.includes('Sangat') 
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900' 
                                : entry.status.includes('Lancar') 
                                ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-900'
                                : 'bg-amber-950/80 text-amber-400 border border-amber-900'
                            }`}>
                              {entry.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500 font-mono">{entry.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Simulated Smartphone WhatsApp Popup */}
                {waNotification && (
                  <div className="bg-emerald-950/85 border border-emerald-800 rounded-xl p-3 text-xs shadow-xl animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                    <div className="flex justify-between items-center mb-1 text-emerald-400 text-[10px] font-bold">
                      <div className="flex items-center gap-1">
                        <MessageSquare size={10} />
                        <span>SISTEM WHATSAPP GATEWAY (DIKIRIM OTOMATIS)</span>
                      </div>
                      <span>Baru saja</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">{waNotification}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rfid' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-semibold tracking-wide text-white">REKAP TRANSAKSI HARIAN KANTIN (RFID)</h5>
                  <div className="flex gap-2">
                    <span className="text-[10px] text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-900 font-mono">Batas: Rp20.000/hari</span>
                  </div>
                </div>

                {/* Terminal Log Scanner Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col justify-center items-center">
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isScanning ? 'border-amber-500 bg-amber-950/30 text-amber-400 scale-105 animate-pulse' : 'border-slate-700 text-slate-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div className="text-[11px] font-mono mt-3 uppercase text-slate-400">Scanner RFID</div>
                    <div className="text-[10px] font-bold mt-1 text-slate-500">KOPERASI UTAMA</div>
                  </div>

                  <div className="md:col-span-8 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-3.5 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Histori Jajan Terakhir</div>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto">
                      {rfidHistory.map((h) => (
                        <div key={h.id} className="flex justify-between items-center text-xs bg-slate-900/50 p-2 rounded border border-slate-800/40">
                          <div>
                            <span className="font-medium text-slate-200">{h.item}</span>
                            <span className="text-[10px] text-slate-500 block">Kategori: {h.type} • Jam: {h.date}</span>
                          </div>
                          <span className="font-mono text-red-400 font-bold">- Rp {h.cost.toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message notification */}
                {rfidMessage && (
                  <div className={`p-3 rounded-lg text-xs font-mono border ${rfidMessage.error ? 'bg-red-950/85 border-red-900 text-red-200' : 'bg-emerald-950/85 border-emerald-900 text-emerald-200'}`}>
                    {rfidMessage.text}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'perizinan' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-semibold tracking-wide text-white">LOG PERIZINAN KELUAR-MASUK (PETA SANTRI)</h5>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-900">30 Hari Terakhir</span>
                </div>

                {/* Permits table */}
                <div className="bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800 text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[10px] uppercase font-semibold">
                        <th className="p-3">Nama Santri</th>
                        <th className="p-3">Keperluan Izin</th>
                        <th className="p-3">Status Izin</th>
                        <th className="p-3">Tanggal Kembali</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {izinList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/30">
                          <td className="p-3 font-medium text-slate-300">{item.name}</td>
                          <td className="p-3 text-slate-400">{item.type}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'Menunggu Persetujuan' 
                                ? 'bg-amber-950/70 text-amber-400 border border-amber-900/50' 
                                : item.status === 'Disetujui (Di Luar)'
                                ? 'bg-red-950/75 text-red-400 border border-red-900/40'
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-slate-500">{item.inDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                  💡 <b className="text-white">Fakta Peta Santri:</b> Ketika santri kembali ke pondok, mereka men-scan QR code pada surat izin di kamera gerbang pengawas. Status otomatis berubah menjadi <span className="text-emerald-400">Sudah Kembali</span> tanpa perlu mencoret-coret buku izin manual.
                </div>
              </div>
            )}

            {activeTab === 'spp' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-semibold tracking-wide text-white">REKAP MONITORING KAS & VIRTUAL ACCOUNT</h5>
                  <div className="bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800 font-mono text-[10px] flex items-center gap-1">
                    <Activity size={10} className="text-emerald-400" />
                    <span>MUTASI DETIK INI</span>
                  </div>
                </div>

                {/* Financial overview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Kas Pondok</div>
                    <div className="text-xl font-bold font-mono text-emerald-400 mt-1">Rp {pesantrenCash.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">SPP Terbayar Bulan Ini</div>
                    <div className="text-xl font-bold font-mono text-white mt-1">Rp 187.500.000</div>
                  </div>
                </div>

                {/* Last transaction list */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Mutasi Masuk Terbaru (Virtual Account)</div>
                  
                  {invoicePaid ? (
                    <div className="flex justify-between items-center text-xs bg-emerald-950/45 p-2 rounded.5 border border-emerald-900/60 animate-pulse">
                      <div>
                        <span className="font-semibold text-slate-200">Siti Nurhaliza (VA Bank Syariah Indonesia)</span>
                        <span className="text-[9px] text-emerald-500 block font-mono">BSI VA-9882012987320012 • Berhasil Dicocokkan</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold">+ Rp 750.000</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-2 italic font-mono">Belum ada mutasi masuk baru dalam 5 menit terakhir.</p>
                  )}

                  <div className="flex justify-between items-center text-xs bg-slate-900/40 p-2 rounded border border-slate-800/60">
                    <div>
                      <span className="font-medium text-slate-300">Rizwan Kamil (VA Bank Mandiri)</span>
                      <span className="text-[9px] text-slate-500 block font-mono font-normal">MANDIRI VA-89020912830018 • 10 menit lalu</span>
                    </div>
                    <span className="font-mono text-slate-400 font-bold">+ Rp 750.000</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel footer description */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap justify-between items-center text-slate-500 text-[10px]">
            <span>© RMS Technology & SmartPondok Ecosystem</span>
            <span>Semua simulasi menggunakan enkripsi data terisolasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
