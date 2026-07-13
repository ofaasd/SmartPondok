import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  ChevronRight, 
  ShieldCheck, 
  Menu, 
  X, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  CreditCard, 
  Building2, 
  TrendingDown, 
  UserCheck, 
  Heart, 
  DollarSign, 
  Users, 
  Smartphone,
  Globe,
  Info,
  Calendar,
  Zap,
  Star,
  Send
} from 'lucide-react';
import InteractiveMockup from './components/InteractiveMockup';
import PricingCalculator from './components/PricingCalculator';
import AIProposal from './components/AIProposal';
import { COPYWRITING, PACKAGES, ADDONS, Tier } from './types';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [consultForm, setConsultForm] = useState({
    pesantrenName: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [santriCount, setSantriCount] = useState<number>(250);
  
  const [currentView, setCurrentView] = useState<'home' | 'proposal'>(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (
      path === '/proposal-ai' || 
      path === '/proposal' || 
      path === '/proposal-rahasia' || 
      params.get('view') === 'proposal' || 
      params.get('akses') === 'proposal' || 
      params.get('secret') === 'proposal'
    ) {
      return 'proposal';
    }
    return 'home';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      if (
        path === '/proposal-ai' || 
        path === '/proposal' || 
        path === '/proposal-rahasia' || 
        params.get('view') === 'proposal' || 
        params.get('akses') === 'proposal' || 
        params.get('secret') === 'proposal'
      ) {
        setCurrentView('proposal');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // FAQ Data
  const faqs = [
    {
      q: 'Apakah asatidzah (guru) yang sepuh tetap bisa mengoperasikan sistem ini?',
      a: 'Sangat bisa! SmartPondok by RMEDIA didesain dengan antarmuka yang sangat sederhana dalam Bahasa Indonesia. Pengasuh asrama hanya perlu mengetuk beberapa tombol di layar untuk absensi atau input setoran tahfidz. Kami juga menyediakan panduan video pendek dan sesi training langsung bagi seluruh staf pesantren.'
    },
    {
      q: 'Bagaimana jika koneksi internet di pondok pesantren tidak stabil?',
      a: 'Untuk pondok pesantren dengan kendala internet, kami merekomendasikan skema lisensi Jual Putus (On-Premise). Sistem akan ditanam di server lokal pesantren yang dapat diakses di area pondok menggunakan jaringan WiFi lokal tanpa kuota internet luar. Data akan tersinkronisasi otomatis saat internet kembali menyala.'
    },
    {
      q: 'Apakah wali santri wajib mendownload aplikasi mobile untuk memantau anaknya?',
      a: 'Tidak wajib. Wali santri dapat memantau melalui Portal Web yang bisa dibuka dari browser HP apa saja tanpa instalasi tambahan. Selain itu, jika Anda menggunakan modul WhatsApp Gateway, wali santri akan menerima pesan laporan tahfidz, izin pulang, atau rincian SPP otomatis langsung di chat WhatsApp pribadi mereka tanpa perlu membuka aplikasi apa pun.'
    },
    {
      q: 'Bagaimana jaminan keamanan data santri dan keuangan pondok?',
      a: 'Keamanan data adalah prioritas utama kami. Di model SaaS, kami menyimpan data menggunakan enkripsi SSL tingkat tinggi di cloud server Google Cloud Platform Indonesia. Di model On-Premise, database berada 100% di tangan Anda. Kami juga menyediakan backup data terjadwal agar terhindar dari risiko kehilangan berkas.'
    },
    {
      q: 'Apakah SmartPondok menerima kustomisasi fitur khusus?',
      a: 'Tentu. Bagi pengguna Paket Platinum, kami menyediakan layanan kustomisasi minor secara gratis dan integrasi dengan sistem eksternal (seperti sinkronisasi mesin absensi sidik jari/RFID yang sudah dimiliki pesantren atau integrasi kustom Bank daerah pilihan).'
    }
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.pesantrenName || !consultForm.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      // Simulate close / reset
    }, 5000);
  };

  const getProblemIcon = (icon: string) => {
    switch (icon) {
      case 'TrendingDown': return <TrendingDown size={24} className="text-emerald-700" />;
      case 'BookOpen': return <BookOpen size={24} className="text-emerald-700" />;
      case 'Clock': return <Clock size={24} className="text-emerald-700" />;
      case 'UserCheck': return <UserCheck size={24} className="text-emerald-700" />;
      default: return <Info size={24} className="text-emerald-700" />;
    }
  };

  const getWhyIcon = (icon: string) => {
    switch (icon) {
      case 'Heart': return <Heart size={24} className="text-emerald-700" />;
      case 'DollarSign': return <DollarSign size={24} className="text-emerald-700" />;
      case 'Users': return <Users size={24} className="text-emerald-700" />;
      case 'ShieldCheck': return <ShieldCheck size={24} className="text-emerald-700" />;
      default: return <Zap size={24} className="text-emerald-700" />;
    }
  };

  const getAddonIcon = (id: string) => {
    switch (id) {
      case 'portal-wali': return <Globe size={18} className="text-amber-600" />;
      case 'mobile-app': return <Smartphone size={18} className="text-amber-600" />;
      case 'wa-service': return <MessageSquare size={18} className="text-amber-600" />;
      case 'rfid-cashless': return <CreditCard size={18} className="text-amber-600" />;
      case 'va-bank': return <Building2 size={18} className="text-amber-600" />;
      default: return <Info size={18} className="text-amber-600" />;
    }
  };

  if (currentView === 'proposal') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        {/* Simplified Header for Secret Proposal Page */}
        <header className="sticky top-0 bg-white border-b border-slate-200/60 py-4 px-6 flex justify-between items-center shadow-sm z-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-800 rounded-xl flex items-center justify-center text-white font-bold font-serif text-base">
              SP
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block leading-none">
                SmartPondok <span className="text-emerald-700 font-normal">by RMEDIA</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block mt-0.5">
                RMEDIA SOLUSINDO
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/');
              setCurrentView('home');
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Kembali ke Beranda
          </button>
        </header>

        {/* Dedicated Standalone Proposal Section */}
        <main className="py-12 bg-gradient-to-b from-white to-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="bg-emerald-50 text-emerald-950 border border-emerald-100 text-[10px] px-3.5 py-1.5 rounded-full font-semibold tracking-wider uppercase inline-flex items-center gap-1">
                Akses Khusus Internal
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-slate-900 mt-2 font-bold">Simulator Generator Proposal AI</h1>
              <p className="text-xs text-slate-500 mt-1">Halaman rahasia yang tersembunyi dari publik. Hanya dapat diakses melalui link kustom ini.</p>
            </div>
            <AIProposal />
          </div>
        </main>

        <footer className="py-8 bg-slate-950 text-slate-400 text-center text-xs font-mono border-t border-slate-900">
          <div>© {new Date().getFullYear()} SmartPondok by RMEDIA. All rights reserved.</div>
          <div className="text-[10px] text-slate-600 mt-1">Sistem Administrasi Pesantren Modern Terintegrasi • Powered by RMEDIA Solusindo</div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 1. HEADER & NAVIGATION */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 z-40 transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-800/15 font-bold font-serif text-lg group-hover:scale-[1.03] duration-300 transition-all">
              SP
            </div>
            <div>
              <span className="text-lg font-bold font-display text-slate-900 tracking-tight block">
                SmartPondok <span className="text-emerald-700">by RMEDIA</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block -mt-1">
                RMEDIA SOLUSINDO
              </span>
            </div>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#masalah" className="hover:text-emerald-800 transition-colors">Tantangan</a>
            <a href="#fitur" className="hover:text-emerald-800 transition-colors">Fitur Unggulan</a>
            <a href="#demo-tour" className="hover:text-emerald-800 transition-colors">Live Demo</a>
            <a href="#calculator-section" className="hover:text-emerald-800 transition-colors">Kalkulator Biaya</a>
            <a href="#faq" className="hover:text-emerald-800 transition-colors">FAQ</a>
          </nav>

          {/* Header CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#konsultasi"
              className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
            >
              Tanya Admin
            </a>
            <a 
              href="#calculator-section"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-emerald-800/10 hover:-translate-y-0.5 duration-200"
            >
              Coba Simulasi Harga
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 shadow-lg absolute w-full left-0 animate-fade-in z-50">
            <a 
              href="#masalah" 
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
            >
              Tantangan Pondok
            </a>
            <a 
              href="#fitur" 
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
            >
              Fitur Unggulan per Paket
            </a>
            <a 
              href="#demo-tour" 
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
            >
              Live Demo Interaktif
            </a>
            <a 
              href="#calculator-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
            >
              Kalkulator Biaya Investasi
            </a>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <a 
                href="#konsultasi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Tanya Admin
              </a>
              <a 
                href="#calculator-section"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg bg-emerald-800 text-white text-xs font-semibold"
              >
                Coba Simulasi
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:py-24 bg-gradient-to-b from-emerald-50/20 via-white to-[#F8FAFC] overflow-hidden">
        
        {/* Absolute Background Elements */}
        <div className="absolute left-1/2 -translate-x-1/2 top-12 w-full max-w-7xl h-[400px] pointer-events-none -z-10 opacity-[0.03]">
          {/* Simulated Geometric Islamic Pattern placeholder */}
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#047857_1px,_transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
          
          {/* Dynamic badge with spark effects */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-950 text-xs px-4 py-2 rounded-full font-semibold border border-emerald-100 tracking-wide shadow-sm uppercase animate-fade-in">
            <Award size={14} className="text-emerald-800 animate-pulse" />
            <span>Sistem Informasi Pesantren Terbaik 2026</span>
          </div>

          {/* Headline Copy */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-tight md:leading-tight">
              {COPYWRITING.headline}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {COPYWRITING.subheadline}
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a 
              href="#calculator-section" 
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-800/15 inline-flex items-center gap-1.5 hover:-translate-y-0.5 duration-200 cursor-pointer"
            >
              <span>{COPYWRITING.heroCTA}</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="#demo-tour" 
              className="bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-slate-900/15 inline-flex items-center gap-1.5 hover:-translate-y-0.5 duration-200 cursor-pointer"
            >
              <ChevronRight size={16} className="text-emerald-400 animate-pulse" />
              <span>{COPYWRITING.heroSecondaryCTA}</span>
            </a>
          </div>

          {/* Social Proof Stats Banner */}
          <div className="pt-10 max-w-3xl mx-auto grid grid-cols-3 gap-4 border-t border-slate-200/60">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 block tracking-tight">45+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase block">Pesantren Aktif</span>
            </div>
            <div className="space-y-1 border-x border-slate-200/60">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 block tracking-tight">15K+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase block">Santri Terkelola</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 block tracking-tight">99.8%</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase block">Tingkat SLA Aktif</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PROBLEM CLASSIC SECTION */}
      <section id="masalah" className="py-20 bg-[#F8FAFC] border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase block">
              {COPYWRITING.problemSection.tagline}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
              {COPYWRITING.problemSection.title}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
              {COPYWRITING.problemSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COPYWRITING.problemSection.problems.map((prob, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-10px_rgba(4,120,87,0.06)] hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300">
                  {getProblemIcon(prob.icon)}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-emerald-950 transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. VALUE PROP & SOLUTION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase block">
              {COPYWRITING.solutionSection.tagline}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              {COPYWRITING.solutionSection.title}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {COPYWRITING.solutionSection.subtitle}
            </p>
          </div>

          {/* Grid Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COPYWRITING.whyChooseUs.map((val, idx) => (
              <div key={idx} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/40 hover:bg-white hover:border-emerald-100 hover:shadow-[0_8px_30px_rgb(4,120,87,0.02)] hover:-translate-y-1 duration-300 transition-all space-y-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                  {getWhyIcon(val.icon)}
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-950 text-base">{val.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE LIVE PRODUCT TOUR (DEMO) */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMockup />
        </div>
      </section>

      {/* 6. FEATURES PER PACKAGE DETAILS SECTION */}
      <section id="fitur" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase block">Rincian Modul</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Pembagian Fitur Berdasarkan Kategori Paket</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Pilih tingkat digitalisasi yang paling sesuai dengan kesiapan pesantren, SDM pengurus, dan anggaran operasional Yayasan Anda.
            </p>
          </div>

          {/* Display Silver, Gold, Platinum as responsive comparative blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {(Object.keys(PACKAGES) as Tier[]).map((tierKey) => {
              const pkg = PACKAGES[tierKey];
              const isGold = tierKey === 'gold';
              const isPlatinum = tierKey === 'platinum';

              return (
                <div 
                  key={tierKey}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative ${
                    isGold 
                      ? 'border-2 border-emerald-600 bg-white shadow-xl shadow-emerald-800/10' 
                      : isPlatinum
                      ? 'bg-slate-900 border border-slate-800 text-white shadow-lg'
                      : 'border border-slate-200/80 bg-white shadow-sm hover:border-slate-300'
                  }`}
                >
                  {/* Badge Header for featured items */}
                  {pkg.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest border-none ${
                      isGold 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15' 
                        : isPlatinum
                        ? 'bg-slate-800 text-slate-200 border border-slate-700'
                        : 'bg-emerald-50 text-emerald-900'
                    }`}>
                      {pkg.badge}
                    </span>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block ${isPlatinum ? 'text-slate-400' : 'text-slate-400'}`}>Kategori</span>
                      <h3 className={`text-2xl font-serif font-bold flex items-center gap-2 ${isPlatinum ? 'text-white' : 'text-slate-950'}`}>
                        <span>Paket {pkg.name}</span>
                        {isGold && <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isPlatinum ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.description}</p>
                    </div>

                    {/* Student Limit Badge */}
                    <div className={`rounded-xl p-3 flex justify-between items-center text-xs border ${
                      isPlatinum 
                        ? 'bg-slate-950 border-slate-800 text-slate-300' 
                        : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}>
                      <span className="font-medium">Batas Kapasitas Santri</span>
                      <span className={`font-mono font-bold ${isPlatinum ? 'text-emerald-400' : 'text-slate-800'}`}>{pkg.maxSantriText}</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${isPlatinum ? 'text-slate-300' : 'text-slate-700'}`}>Daftar Modul Fitur:</h4>
                      <ul className="space-y-2.5">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className={`flex items-start gap-2.5 text-xs ${isPlatinum ? 'text-slate-300' : 'text-slate-600'}`}>
                            <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                              isPlatinum ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-800'
                            }`}>
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <span className="leading-normal">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className={`pt-8 border-t mt-8 space-y-3 ${isPlatinum ? 'border-slate-800' : 'border-slate-100'}`}>
                    <a 
                      href="#calculator-section"
                      onClick={() => {
                        const targetLimit = tierKey === 'silver' ? 150 : tierKey === 'gold' ? 500 : 1000;
                        setSantriCount(targetLimit);
                      }}
                      className={`w-full py-3.5 text-center rounded-xl font-bold text-xs block transition-all hover:-translate-y-0.5 duration-200 ${
                        isGold 
                          ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg shadow-emerald-800/15' 
                          : isPlatinum
                          ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-md'
                          : 'bg-slate-900 hover:bg-slate-950 text-white shadow-sm'
                      }`}
                    >
                      Pilih & Hitung Anggaran {pkg.name}
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. DETAILED PRICING SCHEME & CALCULATOR ENGINE */}
      <section className="py-20 bg-[#F8FAFC]/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main cost comparison summary banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider uppercase block">Perbandingan Skema Bisnis</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-slate-950 leading-tight">Berlangganan SaaS (Bulanan) vs Beli Jual Putus</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Kami memberikan fleksibilitas kepemilikan mutlak. Pilih skema <b>SaaS (Software-as-a-Service)</b> untuk menghemat anggaran operasional awal pesantren tanpa server lokal, atau beli lisensi <b>Jual Putus</b> untuk kendali data penuh selamanya di komputer pusat pesantren.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/30 p-4.5 rounded-xl border border-emerald-100/40 space-y-1.5">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">Model SaaS</span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  <li>• Rp 350rb - Rp 2.5jt / bulan</li>
                  <li>• Bebas biaya server & cloud backup</li>
                  <li>• Pembaruan sistem otomatis</li>
                  <li>• Gratis setup training dasar</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200/60 space-y-1.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">Model Jual Putus</span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  <li>• Rp 15jt - Rp 120jt+ (Satu kali)</li>
                  <li>• Dipasang di server lokal pondok</li>
                  <li>• Kepemilikan data 100% lokal</li>
                  <li>• Biaya perawatan tahunan 10%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Calculator component */}
          <PricingCalculator santriCount={santriCount} setSantriCount={setSantriCount} />

        </div>
      </section>

      {/* 8. OPTIONAL MODULAR ADD-ONS WITH BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase block">Modul Tambahan</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Percepat Layanan Pondok dengan Modul Premium</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Tingkatkan gengsi, keamanan, dan kenyamanan asrama dengan mengintegrasikan perangkat keras & layanan modern berikut secara bertahap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ADDONS.map((add) => (
              <div 
                key={add.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:border-emerald-200 hover:shadow-[0_12px_30px_rgba(4,120,87,0.04)] hover:-translate-y-1 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                  {getAddonIcon(add.id)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-base">{add.name}</h4>
                    {add.badge && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {add.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{add.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/50 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Investasi Tambahan</span>
                  <span className="font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-slate-200">
                    SaaS: +Rp {add.saasPrice.toLocaleString('id-ID')}/bln
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* 10. FAQS */}
      <section id="faq" className="py-20 bg-[#F8FAFC] border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase block">Klarifikasi Umum</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Menjawab kekhawatiran dan ragu seputar integrasi sistem informasi di pesantren.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/60 overflow-hidden transition-all duration-300 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] hover:shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                    <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. LEAD GENERATION CONSULTATION CALL FORM */}
      <section id="konsultasi" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Info side */}
            <div className="lg:col-span-5 p-8 sm:p-12 text-white bg-emerald-900 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded inline-block">RMEDIA Care</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">Hubungi Konsultan Kami Sekarang</h3>
                <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                  Masih bingung menentukan modul, atau ingin menjadwalkan <b>Zoom Presentation gratis</b> dengan pengurus Yayasan? Tinggalkan data Anda, konsultan kami akan membalas via WhatsApp dalam jam kerja.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-emerald-800">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300">
                    <Check size={14} />
                  </div>
                  <span>Respon Cepat via WhatsApp (Jam Kerja)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300">
                    <Check size={14} />
                  </div>
                  <span>Gratis Sesi Presentasi & Demo Zoom</span>
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center space-y-4 py-8">
                  <div className="inline-flex p-3 bg-emerald-100 text-emerald-800 rounded-full">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-100 font-serif">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    Jazakumullah khair. Konsultan SmartPondok by RMEDIA akan segera menghubungi nomor WhatsApp Anda untuk menjadwalkan demo / konsultasi gratis.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); setConsultForm({ pesantrenName: '', phone: '', message: '' }); }}
                    className="text-emerald-400 font-bold text-xs hover:underline pt-2 cursor-pointer"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Nama Pondok Pesantren <span className="text-emerald-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="contoh: Ponpes Modern Daarul Hikmah"
                      value={consultForm.pesantrenName}
                      onChange={(e) => setConsultForm({ ...consultForm, pesantrenName: e.target.value })}
                      className="w-full bg-emerald-900/20 border border-slate-700/60 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">No. WhatsApp Aktif <span className="text-emerald-500">*</span></label>
                    <input 
                      type="tel" 
                      required
                      placeholder="contoh: 081234567890"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                      className="w-full bg-emerald-900/20 border border-slate-700/60 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Catatan Khusus (Opsional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Tuliskan jika ada kendala spesifik, atau usulan waktu presentasi online."
                      value={consultForm.message}
                      onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                      className="w-full bg-emerald-900/20 border border-slate-700/60 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500 leading-relaxed"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-800/10"
                  >
                    <span>Kirim Pengajuan Konsultasi</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  SP
                </div>
                <span className="text-white font-bold font-display text-base tracking-tight">
                  SmartPondok <span className="text-emerald-400">by RMEDIA</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Penyedia teknologi digitalisasi manajemen pondok pesantren modern, kredibel, dan berintegritas tinggi di bawah naungan RMEDIA Solusindo.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Enkripsi Database Berlapis (SSL)</span>
              </div>
            </div>

            {/* Links columns */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider font-display">Navigasi</h5>
              <ul className="text-xs space-y-2 font-medium">
                <li><a href="#masalah" className="hover:text-white transition-colors">Tantangan Pondok</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">Daftar Modul Paket</a></li>
                <li><a href="#demo-tour" className="hover:text-white transition-colors">Uji Coba Live Demo</a></li>
                <li><a href="#calculator-section" className="hover:text-white transition-colors">Kalkulator Biaya</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider font-display">Layanan Opsional</h5>
              <ul className="text-xs space-y-2 font-medium">
                <li><a href="#fitur" className="hover:text-white transition-colors">Portal Wali Santri</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">Mobile App Android & iOS</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">WhatsApp Service Gateway</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">RFID Cashless & Bank VA</a></li>
              </ul>
            </div>

            {/* Support column */}
            <div className="md:col-span-2 space-y-3">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider font-display font-sans">Hubungi RMEDIA</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                Butuh bantuan implementasi kilat atau tanya kustomisasi sistem? Hubungi WhatsApp kami di <b>0822-1000-9903</b> atau via tombol di bawah.
              </p>
              <a 
                href="https://wa.me/6282210009903" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all"
              >
                <MessageSquare size={12} />
                <span>WhatsApp Care</span>
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap justify-between items-center text-[10px] sm:text-xs text-slate-600 font-mono">
            <span>© {new Date().getFullYear()} SmartPondok by RMEDIA. All rights reserved.</span>
            <span>Handcrafted in Indonesia for Pesantren Digitalization</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
