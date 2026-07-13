import React, { useState, useEffect } from 'react';
import { PACKAGES, ADDONS, Tier, PricingModel, BillingCycle } from '../types';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  Info,
  DollarSign,
  Smartphone,
  Globe,
  CreditCard,
  Building2
} from 'lucide-react';

interface PricingCalculatorProps {
  santriCount: number;
  setSantriCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PricingCalculator({ santriCount, setSantriCount }: PricingCalculatorProps) {
  const [pricingModel, setPricingModel] = useState<PricingModel>('saas');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const [selectedTier, setSelectedTier] = useState<Tier>('gold');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['wa-service']);

  // Auto-recommend package tier based on student count
  useEffect(() => {
    if (santriCount <= 150) {
      setSelectedTier('silver');
    } else if (santriCount <= 500) {
      setSelectedTier('gold');
    } else {
      setSelectedTier('platinum');
    }
  }, [santriCount]);

  // Toggle addon selection
  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Helper to format currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  // Calculate prices
  const getBasePrice = () => {
    const pkg = PACKAGES[selectedTier];
    if (pricingModel === 'on-premise') {
      return pkg.onPremisePrice;
    } else {
      return billingCycle === 'annually' ? pkg.saasPriceAnnual : pkg.saasPriceMonthly;
    }
  };

  const getAddonsPrice = () => {
    let total = 0;
    selectedAddons.forEach(addonId => {
      const add = ADDONS.find(a => a.id === addonId);
      if (add) {
        if (pricingModel === 'on-premise') {
          total += add.onPremisePrice;
        } else {
          // If annual, multiply monthly price by 10 (giving 2 months discount)
          total += billingCycle === 'annually' ? add.saasPrice * 10 : add.saasPrice;
        }
      }
    });
    return total;
  };

  const getSetupFee = () => {
    const pkg = PACKAGES[selectedTier];
    if (pricingModel === 'on-premise') {
      // In on-premise, setup fee is typically included or customized. We show the initial training cost
      return selectedTier === 'silver' ? 1000000 : selectedTier === 'gold' ? 2500000 : 5000000;
    } else {
      return selectedTier === 'silver' ? 500000 : selectedTier === 'gold' ? 1000000 : 2500000;
    }
  };

  const getAddonAnnualSavings = () => {
    if (pricingModel !== 'saas' || billingCycle !== 'annually') return 0;
    let savings = 0;
    selectedAddons.forEach(addonId => {
      const add = ADDONS.find(a => a.id === addonId);
      if (add) {
        // Regular monthly * 12 vs annual rate (*10)
        savings += (add.saasPrice * 12) - (add.saasPrice * 10);
      }
    });
    return savings;
  };

  const getPackageAnnualSavings = () => {
    if (pricingModel !== 'saas' || billingCycle !== 'annually') return 0;
    const pkg = PACKAGES[selectedTier];
    return (pkg.saasPriceMonthly * 12) - pkg.saasPriceAnnual;
  };

  const getTotalUpfront = () => {
    return getBasePrice() + getAddonsPrice() + getSetupFee();
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe size={18} className="text-emerald-700" />;
      case 'Smartphone': return <Smartphone size={18} className="text-emerald-700" />;
      case 'MessageSquare': return <MessageSquare size={18} className="text-emerald-700" />;
      case 'CreditCard': return <CreditCard size={18} className="text-emerald-700" />;
      case 'Building2': return <Building2 size={18} className="text-emerald-700" />;
      default: return <Info size={18} className="text-emerald-700" />;
    }
  };

  // Generate WhatsApp text for lead redirect
  const getWhatsAppLink = () => {
    const pkg = PACKAGES[selectedTier];
    const modelText = pricingModel === 'saas' 
      ? `SaaS Berlangganan ${billingCycle === 'annually' ? 'Tahunan (Diskon)' : 'Bulanan'}`
      : 'Beli Jual Putus (On-Premise)';
      
    const addonsText = selectedAddons.length > 0
      ? selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).join(', ')
      : 'Tanpa Add-on';

    const text = `Bismillah, Assalamu'alaikum Wr. Wb. Tim SmartPondok RMEDIA,%0A%0ASaya tertarik dengan sistem informasi *SmartPondok by RMEDIA*. Berikut adalah simulasi konfigurasi pesantren kami:%0A%0A- *Nama Pondok*: [Tuliskan Nama Pondok Pesantren Anda]%0A- *Estimasi Santri*: ${santriCount} santri%0A- *Paket Dipilih*: Paket ${pkg.name}%0A- *Skema Biaya*: ${modelText}%0A- *Fitur Tambahan (Add-ons)*: ${addonsText}%0A- *Estimasi Total Investasi*: ${formatIDR(getTotalUpfront())}%0A%0AMohon bantuan untuk menjadwalkan demo sistem / konsultasi gratis lebih lanjut. Jazakumullah khair.`;
    return `https://wa.me/6282210009903?text=${text}`;
  };

  return (
    <div id="calculator-section" className="w-full max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200/60 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.03)]">
      <div className="text-center mb-10">
        <span className="bg-emerald-50 text-emerald-950 border border-emerald-100 text-xs px-4 py-1.5 rounded-full font-semibold tracking-wider uppercase inline-flex items-center gap-1">
          <Calculator size={12} />
          <span>Kalkulator & Simulasi Investasi</span>
        </span>
        <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2">Hitung Simulasi Anggaran Sesuai Kebutuhan</h3>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Sesuaikan jumlah santri dan pilih modul tambahan untuk mendapatkan estimasi penawaran harga terbaik yang transparan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-200/60 space-y-6">
          
          {/* Step 1: Student count slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="bg-emerald-800 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Jumlah Santri Aktif</span>
              </label>
              <span className="bg-emerald-50 text-emerald-950 font-bold px-3 py-1 rounded-lg border border-emerald-100 text-sm font-mono">
                {santriCount} Santri
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Sistem akan merekomendasikan paket terbaik berdasarkan kuota santri pondok Anda.
            </p>
            <div className="relative pt-2">
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="10"
                value={santriCount}
                onChange={(e) => setSantriCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-750"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 px-1">
                <span>50 Santri</span>
                <span>150 (Silver)</span>
                <span>500 (Gold)</span>
                <span>1000+ (Platinum)</span>
              </div>
            </div>
          </div>

          {/* Step 2: Model Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="bg-emerald-800 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Pilih Skema Lisensi</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setPricingModel('saas')}
                className={`p-3.5 rounded-xl border text-left transition-all ${pricingModel === 'saas' ? 'border-emerald-700 bg-emerald-50/30 text-emerald-950 ring-1 ring-emerald-700/20' : 'border-slate-200/60 hover:border-slate-300 bg-white'}`}
              >
                <div className="font-bold text-xs sm:text-sm">SaaS (Langganan Berkala)</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Biaya awal sangat terjangkau, include server & cloud.</div>
              </button>
              <button 
                onClick={() => setPricingModel('on-premise')}
                className={`p-3.5 rounded-xl border text-left transition-all ${pricingModel === 'on-premise' ? 'border-emerald-700 bg-emerald-50/30 text-emerald-950 ring-1 ring-emerald-700/20' : 'border-slate-200/60 hover:border-slate-300 bg-white'}`}
              >
                <div className="font-bold text-xs sm:text-sm">Jual Putus (Lisensi On-Premise)</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Satu kali bayar lisensi selamanya, dipasang di server pondok.</div>
              </button>
            </div>
          </div>

          {/* Billing Cycle Option (SaaS only) */}
          {pricingModel === 'saas' && (
            <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">Siklus Pembayaran</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">
                  Hemat 2 Bulan
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white shadow text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Bayar Bulanan
                </button>
                <button 
                  onClick={() => setBillingCycle('annually')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${billingCycle === 'annually' ? 'bg-white shadow text-emerald-950 font-semibold border border-emerald-100' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Bayar Tahunan (Diskon)
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Recommend Package Box */}
          <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-5 rounded-xl space-y-3 relative overflow-hidden shadow-lg shadow-emerald-950/10">
            <div className="absolute right-0 bottom-0 opacity-10">
              <Sparkles size={120} />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider">Rekomendasi Paket</span>
                <h4 className="text-lg font-serif mt-1 font-bold">Paket {PACKAGES[selectedTier].name}</h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-1 rounded">
                {PACKAGES[selectedTier].maxSantriText}
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {PACKAGES[selectedTier].description}
            </p>
            <div className="border-t border-emerald-800 pt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
              <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                <Check size={12} /> {PACKAGES[selectedTier].features.length} modul aktif
              </span>
              <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                <Check size={12} /> Bantuan Setup Awal
              </span>
            </div>
          </div>

          {/* Step 4: Optional Add-ons */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="bg-emerald-800 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Pilih Modul Tambahan (Opsional)</span>
            </label>
            <p className="text-xs text-slate-500">
              Pondok Pesantren dapat menambahkan fitur modular berikut untuk melengkapi sistem manajemen.
            </p>
            <div className="space-y-2.5">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                const priceText = pricingModel === 'on-premise'
                  ? `${formatIDR(addon.onPremisePrice)} (Lisensi)`
                  : billingCycle === 'annually'
                  ? `${formatIDR(addon.saasPrice * 10)}/thn (Diskon)`
                  : `${formatIDR(addon.saasPrice)}/bln`;

                return (
                  <div 
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isSelected 
                        ? 'border-emerald-700 bg-emerald-50/30 shadow-[0_2px_12px_rgba(4,120,87,0.02)]' 
                        : 'border-slate-200/60 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="mt-0.5 p-2 bg-slate-100 rounded-lg">
                      {getIcon(addon.iconName)}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex justify-between items-start gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-800">{addon.name}</h5>
                          {addon.badge && (
                            <span className="text-[8px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {addon.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-800">{priceText}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-500">{addon.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-1 transition-all ${
                      isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Invoice Breakdown Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-6 border-b border-slate-900 relative">
              <div className="absolute right-4 top-4 text-emerald-400">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-emerald-400">ESTIMASI INVESTASI</h4>
              <h3 className="text-xl font-serif text-white mt-1">SmartPondok by RMS</h3>
              <p className="text-[11px] text-slate-400 font-mono mt-1">REF: SP-{santriCount}-{selectedTier.toUpperCase()}</p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              
              {/* Core Package line */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Paket Utama (Kategori {PACKAGES[selectedTier].name})</span>
                  <span className="font-mono text-white font-bold">{formatIDR(getBasePrice())}</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-normal">
                  Sistem dasar SIM Pondok • Kuota {PACKAGES[selectedTier].maxSantriText} • {pricingModel === 'saas' ? `Billing ${billingCycle === 'annually' ? 'Tahunan' : 'Bulanan'}` : 'Lisensi Selamanya'}
                </div>
              </div>

              {/* Addons summary */}
              {selectedAddons.length > 0 && (
                <div className="space-y-2 border-t border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>Modul Tambahan ({selectedAddons.length} Modul)</span>
                    <span className="font-mono text-amber-400 font-bold">{formatIDR(getAddonsPrice())}</span>
                  </div>
                  <div className="space-y-1 pl-2 border-l border-slate-800">
                    {selectedAddons.map(id => {
                      const add = ADDONS.find(a => a.id === id);
                      if (!add) return null;
                      return (
                        <div key={id} className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>• {add.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Setup fee line */}
              <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                <div>
                  <span>Biaya Setup & Training Penggunaan</span>
                  <span className="text-[10px] text-slate-500 block">Satu kali pembayaran awal (one-time setup)</span>
                </div>
                <span className="font-mono text-white font-bold">{formatIDR(getSetupFee())}</span>
              </div>

              {/* Annual Savings Alert */}
              {pricingModel === 'saas' && billingCycle === 'annually' && (
                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/60 text-[11px] text-emerald-400 space-y-1">
                  <div className="font-bold flex items-center gap-1 font-mono uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Hemat Paket Tahunan</span>
                  </div>
                  <p className="text-slate-300">
                    Pondok menghemat hingga <b className="text-emerald-300 font-mono">{formatIDR(getPackageAnnualSavings() + getAddonAnnualSavings())}</b> dibanding berlangganan bulanan.
                  </p>
                </div>
              )}

              {/* Summary totals */}
              <div className="border-t-2 border-dashed border-slate-800 pt-4 space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Estimasi Investasi Awal</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{formatIDR(getTotalUpfront())}</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-normal text-right">
                  {pricingModel === 'saas' 
                    ? `Sudah termasuk Setup Fee + Berlangganan Periode Pertama (${billingCycle === 'annually' ? '1 Tahun' : '1 Bulan'}).`
                    : 'Sudah termasuk pembelian lisensi penuh selamanya (On-Premise) + biaya instalasi.'
                  }
                </div>
              </div>

              {/* Maintenance terms */}
              <div className="text-[10px] text-slate-500 border-t border-slate-800/40 pt-3 leading-normal">
                {pricingModel === 'saas' 
                  ? 'Perpanjangan berikutnya hanya dikenakan tarif berlangganan bulanan/tahunan (bebas biaya setup).'
                  : `Tahun ke-2 dikenakan Annual Maintenance Fee sebesar 10% (${formatIDR(getBasePrice() * 0.1)}/tahun) untuk pembaruan fitur, keamanan, & perbaikan bug.`
                }
              </div>

              {/* Redirect Action Button */}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/15 hover:-translate-y-0.5 text-white font-bold tracking-wide text-xs py-4 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-center shadow-lg duration-200"
              >
                <MessageSquare size={16} />
                <span>Konsultasi Penawaran & Demo via WA</span>
              </a>

            </div>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200/60 text-[11px] text-slate-600 space-y-2 leading-relaxed shadow-sm">
            <h5 className="font-bold text-slate-800">💡 Mengapa SPP Siswa Bisa Membayar Ini?</h5>
            <p>
              Tarif paket Gold untuk 250 santri adalah Rp 8,5 Juta/tahun. Jika dibebankan ke SPP santri, biayanya kurang dari <b>Rp 3.000 per santri/bulan</b>! Investasi yang sangat murah demi modernitas & kebanggaan pondok pesantren.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
