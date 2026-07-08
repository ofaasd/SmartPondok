import React, { useState, useEffect } from 'react';
import { ADDONS, PACKAGES, Tier, PricingModel, ProposalResponse } from '../types';
import { 
  Sparkles, 
  FileText, 
  Printer, 
  Copy, 
  RefreshCw, 
  Check, 
  ArrowRight, 
  Phone, 
  User, 
  Send,
  Loader2,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function AIProposal() {
  const [pesantrenName, setPesantrenName] = useState('');
  const [santriCount, setSantriCount] = useState(200);
  const [painPoints, setPainPoints] = useState('Pencatatan setoran hafalan Al-Quran santri lambat dilaporkan ke wali murid, dan penagihan SPP bulanan sering terlambat karena verifikasi transfer manual.');
  const [selectedTier, setSelectedTier] = useState<Tier>('gold');
  const [pricingModel, setPricingModel] = useState<PricingModel>('saas');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['wa-service', 'portal-wali']);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    'Menganalisis profil pesantren Anda...',
    'Menghubungkan tantangan operasional dengan solusi modul...',
    'Menyusun rincian penawaran finansial yang ramah anggaran...',
    'Merumuskan peta jalan (roadmap) sosialisasi dan implementasi...',
    'Membuat salam pembuka dan doa penutup bernuansa takzim islami...',
    'Menghasilkan dokumen final via Gemini AI...'
  ];

  // Rotate loading messages while generating
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesantrenName) {
      setError('Mohon isi nama pondok pesantren Anda.');
      return;
    }

    setLoading(true);
    setError(null);
    setProposal(null);

    const payload = {
      pesantrenName,
      santriCount,
      painPoints,
      selectedTier,
      pricingModel,
      addOns: selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name || id),
      contactName,
      phone
    };

    try {
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Gagal berkomunikasi dengan server proposal.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setProposal(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Koneksi terputus. Pastikan server sudah aktif dan konfigurasi benar.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!proposal) return;
    
    // Format text beautifully for pasting
    const textBlock = `
${proposal.title}

${proposal.intro}

I. RINGKASAN EKSEKUTIF
${proposal.executiveSummary}

II. ANALISIS KEBUTUHAN & SOLUSI
${proposal.needAnalysis}

III. RINCIAN MODUL FITUR UTAMA
${proposal.featuresBreakdown.map(cat => `* ${cat.category}:\n${cat.items.map(i => `  - ${i}`).join('\n')}`).join('\n\n')}

IV. RINCIAN LAYANAN OPSIONAL (ADDONS)
${proposal.addonsSelection.map(add => `* ${add.name}: ${add.benefit}`).join('\n')}

V. INVESTASI & SKEMA FINANSIAL
- Skema: ${proposal.financialModel.modelName}
- Deskripsi: ${proposal.financialModel.description}
- Rincian Biaya: ${proposal.financialModel.investmentBreakdown}

VI. PETA JALAN (ROADMAP) IMPLEMENTASI
${proposal.implementationRoadmap.map(r => `* ${r.phase} (${r.duration}): ${r.activities}`).join('\n')}

VII. PENUTUP
${proposal.closing}
    `.trim();

    navigator.clipboard.writeText(textBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="ai-proposal-section" className="w-full max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200/60 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.03)] overflow-hidden relative">
      
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="text-center mb-10">
        <span className="bg-emerald-50 text-emerald-950 border border-emerald-100 text-xs px-4 py-1.5 rounded-full font-semibold tracking-wider uppercase inline-flex items-center gap-1">
          <Sparkles size={12} className="text-emerald-850" />
          <span>Bantuan AI Pintar</span>
        </span>
        <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2">Dapatkan Proposal Kustom dalam 1 Menit</h3>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Butuh proposal penawaran resmi untuk diajukan ke jajaran Kyai, Yayasan, atau Pengurus? Isi form di bawah dan AI kami akan menyusunnya khusus untuk pesantren Anda.
        </p>
      </div>

      {!proposal ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm">
              <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Nama Pondok Pesantren <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder="contoh: Pondok Pesantren Al-Hidayah"
                  value={pesantrenName}
                  onChange={(e) => setPesantrenName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:border-emerald-700 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Estimasi Jumlah Santri</label>
              <input 
                type="number"
                placeholder="contoh: 250"
                value={santriCount}
                onChange={(e) => setSantriCount(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:border-emerald-700 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Tantangan Utama Saat Ini (Bahan Analisis AI)</label>
            <textarea 
              rows={3}
              placeholder="Jelaskan masalah utama pesantren Anda saat ini (misal: penagihan SPP manual menyulitkan bendahara, laporan setoran tahfidz ke wali santri telat, atau perizinan santri keluar-masuk kurang disiplin)."
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
              className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:border-emerald-700 outline-none transition-all leading-relaxed"
            ></textarea>
            <p className="text-[10px] text-slate-400 mt-1">AI akan membedah tantangan ini di bab "Analisis Kebutuhan" pada proposal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Paket Utama</label>
              <select 
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as Tier)}
                className="w-full border border-slate-200 rounded-xl py-3 px-3 text-sm bg-white text-slate-800 outline-none focus:border-emerald-700"
              >
                <option value="silver">Paket Silver (Maks. 150 Santri)</option>
                <option value="gold">Paket Gold (Maks. 500 Santri)</option>
                <option value="platinum">Paket Platinum (Unlimited Santri)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Skema Investasi</label>
              <select 
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                className="w-full border border-slate-200 rounded-xl py-3 px-3 text-sm bg-white text-slate-800 outline-none focus:border-emerald-700"
              >
                <option value="saas">SaaS (Langganan Bulanan/Tahunan)</option>
                <option value="on-premise">Jual Putus (Lisensi On-Premise)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Layanan Tambahan (Add-ons)</label>
              <div className="text-xs space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100 max-h-[110px] overflow-y-auto">
                {ADDONS.map(add => (
                  <label key={add.id} className="flex items-center gap-1.5 p-1 hover:bg-slate-100 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.includes(add.id)}
                      onChange={() => {
                        if (selectedAddons.includes(add.id)) {
                          setSelectedAddons(selectedAddons.filter(id => id !== add.id));
                        } else {
                          setSelectedAddons([...selectedAddons, add.id]);
                        }
                      }}
                      className="rounded text-emerald-700 focus:ring-emerald-600"
                    />
                    <span className="text-slate-700 truncate">{add.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Nama Anda (Penerima Proposal)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400">
                  <User size={16} />
                </span>
                <input 
                  type="text"
                  placeholder="contoh: Ust. Abdul Malik, M.Pd."
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:border-emerald-700 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">No. WhatsApp Hubungan</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400">
                  <Phone size={16} />
                </span>
                <input 
                  type="tel"
                  placeholder="contoh: 081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:border-emerald-700 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-900/35 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-900/10 inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Sedang Menyusun Naskah AI...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generasikan Proposal Kustom via AI ✨</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Ditenagai model <b>Gemini 3.5 Flash</b>. Data penawaran dijamin akurat dan selaras dengan standar harga SmartPondok by RMEDIA.
            </p>
          </div>
        </form>
      ) : (
        /* Dynamic Generated Proposal Output View */
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Check size={18} />
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-sm">Proposal Sukses Digenerasikan!</h5>
                <p className="text-[11px] text-slate-500">Proposal khusus untuk <b>{pesantrenName}</b></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Tersalin' : 'Salin Naskah'}</span>
              </button>
              <button 
                onClick={handlePrint}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer size={14} />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={() => setProposal(null)}
                className="bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 text-xs px-3 py-2 rounded-lg cursor-pointer"
                title="Buat Ulang"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Proposal Document Paper (Styled as premium corporate proposal) */}
          <div className="bg-[#FCFCFA] border border-slate-200 rounded-2xl p-6 sm:p-12 shadow-md print:shadow-none print:border-none max-w-4xl mx-auto font-serif text-slate-900 relative border-t-4 border-t-emerald-800">
            
            {/* Header watermarking for print */}
            <div className="absolute top-8 right-12 opacity-15 hidden sm:block pointer-events-none">
              <span className="text-[9px] font-mono border-2 border-emerald-900 text-emerald-900 rounded px-2 py-1 rotate-12 inline-block uppercase font-bold tracking-widest">SMARTPONDOK OFFICIAL</span>
            </div>

            {/* Official Letter Head */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-emerald-900 pb-6 mb-8 text-center sm:text-left gap-4">
              <div className="space-y-1 font-sans">
                <h4 className="text-lg font-bold tracking-wider text-emerald-950 uppercase font-serif">SMARTPONDOK by RMEDIA</h4>
                <p className="text-[10px] text-slate-500">Penyedia Sistem Manajemen & Ekosistem Digital Pondok Pesantren</p>
                <p className="text-[10px] text-slate-500">RMEDIA Technology Center • Jln. Pesantren Modern No. 45, Indonesia</p>
              </div>
              <div className="text-center sm:text-right font-sans space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">PROPOSAL PENAWARAN</span>
                <p className="text-[10px] text-slate-500 font-mono mt-1">NO: RMEDIA/SP-PROP/{new Date().getFullYear()}/09</p>
                <p className="text-[10px] text-slate-500">Tanggal: {new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
              </div>
            </div>

            {/* Proposal Content */}
            <div className="space-y-6 leading-relaxed text-sm md:text-base print:text-xs">
              
              {/* Title heading */}
              <h1 className="text-xl md:text-2xl font-bold text-center text-emerald-950 uppercase tracking-tight mb-6 font-sans">
                {proposal.title}
              </h1>

              {/* Intro section */}
              <div className="whitespace-pre-line text-slate-700 border-l-2 border-emerald-100 pl-4 italic">
                {proposal.intro}
              </div>

              {/* I. Ringkasan Eksekutif */}
              <div className="space-y-2 pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">I. Ringkasan Eksekutif</h2>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">{proposal.executiveSummary}</p>
              </div>

              {/* II. Analisis Kebutuhan */}
              <div className="space-y-2 pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">II. Analisis Kebutuhan & Solusi Permasalahan</h2>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">{proposal.needAnalysis}</p>
              </div>

              {/* III. Rincian Modul Fitur Utama */}
              <div className="space-y-4 pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">III. Spesifikasi Modul (Paket {PACKAGES[selectedTier].name})</h2>
                <div className="grid grid-cols-1 gap-4 font-sans">
                  {proposal.featuresBreakdown.map((cat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/60 space-y-2 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen size={12} className="text-emerald-700" />
                        <span>{cat.category}</span>
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* IV. Rincian Layanan Tambahan */}
              {proposal.addonsSelection && proposal.addonsSelection.length > 0 && (
                <div className="space-y-3 pt-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">IV. Integrasi Layanan Tambahan (Add-ons)</h2>
                  <div className="space-y-2.5 font-sans">
                    {proposal.addonsSelection.map((add, idx) => (
                      <div key={idx} className="bg-amber-50/20 p-3 rounded-lg border border-amber-100/50 text-xs flex gap-2">
                        <span className="text-amber-600 font-bold mt-0.5">★</span>
                        <div>
                          <strong className="text-slate-800 block mb-0.5">{add.name}</strong>
                          <span className="text-slate-600 leading-normal">{add.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* V. Skema Finansial */}
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">V. Nilai Investasi & Skema Pembiayaan</h2>
                <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-emerald-50 p-5 rounded-xl space-y-2.5 font-sans shadow-md">
                  <h4 className="text-xs font-bold tracking-widest text-emerald-300 uppercase">{proposal.financialModel.modelName}</h4>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">{proposal.financialModel.description}</p>
                  <div className="border-t border-emerald-900/60 pt-2 mt-2">
                    <strong className="text-xs text-white block mb-1">Rincian Estimasi Biaya:</strong>
                    <p className="text-[11px] text-emerald-200 leading-normal whitespace-pre-wrap font-mono">{proposal.financialModel.investmentBreakdown}</p>
                  </div>
                </div>
              </div>

              {/* VI. Peta Jalan Implementasi */}
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-slate-100 pb-1">VI. Alur Implementasi & Pelatihan</h2>
                <div className="border-l-2 border-dashed border-emerald-800 pl-4 ml-2 space-y-4 font-sans text-xs">
                  {proposal.implementationRoadmap.map((r, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-0 w-3.5 h-3.5 rounded-full bg-emerald-800 border-2 border-white"></div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <strong className="text-emerald-950 font-bold uppercase">{r.phase}</strong>
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono font-semibold">{r.duration}</span>
                        </div>
                        <p className="text-slate-600">{r.activities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* VII. Penutup */}
              <div className="whitespace-pre-line text-slate-700 pt-6 border-t border-slate-100 text-xs sm:text-sm">
                {proposal.closing}
              </div>

              {/* Signature block */}
              <div className="pt-8 flex justify-end font-sans">
                <div className="text-center w-64 space-y-12">
                  <div className="text-xs text-slate-500">
                    Hormat Kami,<br />
                    <b>SmartPondok RMEDIA Business Center</b>
                  </div>
                  <div className="text-xs font-bold text-emerald-950 border-t border-slate-200 pt-1.5">
                    Ibnu Fatchur Rohman, S.Kom, M.M.<br />
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono font-normal">DIREKTUR CV. RAHMAN MEDIA SOLUSINDO</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Loading Modal/Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-emerald-100">
            <div className="inline-flex p-3 bg-emerald-50 text-emerald-800 rounded-2xl animate-bounce">
              <Sparkles size={28} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-lg text-slate-900 font-bold">Menyusun Proposal AI</h4>
              <p className="text-xs text-slate-500">Mohon bersabar, sedang meluncurkan kecerdasan buatan...</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-600 font-mono italic min-h-[44px] flex items-center justify-center">
              {loadingMessages[loadingStep]}
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-700 h-full animate-progress rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
