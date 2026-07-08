export type PricingModel = 'saas' | 'on-premise';
export type BillingCycle = 'monthly' | 'annually';
export type Tier = 'silver' | 'gold' | 'platinum';

export interface AddOn {
  id: string;
  name: string;
  iconName: string;
  saasPrice: number; // monthly
  onPremisePrice: number; // one-time
  description: string;
  badge?: string;
}

export interface PackageDetail {
  id: Tier;
  name: string;
  description: string;
  maxSantriText: string;
  maxSantriLimit: number;
  features: string[];
  saasPriceMonthly: number;
  saasPriceAnnual: number; // monthly rate or total annual rate. Let's make it monthly rate billed annually
  onPremisePrice: number;
  setupFee: string;
  badge?: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export interface ProposalRequest {
  pesantrenName: string;
  santriCount: number;
  painPoints: string;
  selectedTier: Tier;
  pricingModel: PricingModel;
  addOns: string[];
  contactName: string;
  phone: string;
}

export interface ProposalResponse {
  title: string;
  intro: string;
  executiveSummary: string;
  needAnalysis: string;
  featuresBreakdown: {
    category: string;
    items: string[];
  }[];
  addonsSelection: {
    name: string;
    benefit: string;
  }[];
  financialModel: {
    modelName: string;
    description: string;
    investmentBreakdown: string;
  };
  implementationRoadmap: {
    phase: string;
    duration: string;
    activities: string;
  }[];
  closing: string;
}

// Pricing configurations in IDR (Rupiah)
export const PACKAGES: Record<Tier, PackageDetail> = {
  silver: {
    id: 'silver',
    name: 'Silver',
    description: 'Fokus administrasi dasar dan pencatatan harian kesantrian.',
    maxSantriText: 'Maks. 150 Santri',
    maxSantriLimit: 150,
    features: [
      'Manajemen Santri (Data Induk & Profil)',
      'Manajemen Kamar Santri (Plotting Asrama)',
      'Presensi Santri (Harian & Kamar/Kondisi)',
      'Pencatatan Tahfidz Santri (Setoran & Progres)',
      'Pencatatan Pelanggaran & Prestasi',
      'Perizinan Keluar-Masuk (Peta Santri & Izin Pulang)',
      'Dukungan Teknis Standar (Jam Kerja via Chat)'
    ],
    saasPriceMonthly: 400000, // Rp 400.000 / bulan
    saasPriceAnnual: 3500000, // Rp 3.500.000 / tahun (~ Rp 291k/bln)
    onPremisePrice: 18000000, // Rp 18.000.000 (One-Time)
    setupFee: 'Rp 500.000',
    colorClass: 'text-slate-600',
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-200'
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    description: 'Akademik, kepegawaian komprehensif, dan transparansi wali murid.',
    maxSantriText: 'Maks. 500 Santri',
    maxSantriLimit: 500,
    badge: 'Paling Populer',
    features: [
      'Semua fitur Paket Silver',
      'Manajemen Kurikulum (Jadwal, Mata Pelajaran)',
      'Manajemen Nilai Santri (Rapor Digital Pesantren)',
      'Keuangan Santri (Tabungan & Uang Saku Masuk-Keluar)',
      'Pelaporan Keuangan Santri langsung ke Wali Murid',
      'Manajemen Pegawai & Guru (Database & Penugasan)',
      'Sistem Absensi Kehadiran Pegawai',
      'Portal Pendaftaran Santri Baru (PSB Online)',
      'Dukungan Teknis Prioritas & Training Penggunaan'
    ],
    saasPriceMonthly: 950000, // Rp 950.000 / bulan
    saasPriceAnnual: 8500000, // Rp 8.500.000 / tahun (~ Rp 708k/bln)
    onPremisePrice: 45000000, // Rp 45.000.000 (One-Time)
    setupFee: 'Rp 1.000.000',
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50/40',
    borderClass: 'border-amber-200'
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum',
    description: 'Enterprise terintegrasi penuh, penggajian otomatis, & pengelolaan aset.',
    maxSantriText: 'Tanpa Batasan Santri (Unlimited)',
    maxSantriLimit: 999999,
    badge: 'Fitur Terlengkap',
    features: [
      'Semua fitur Paket Gold',
      'Sistem Penggajian Pegawai (Payroll & Slip Gaji Otomatis)',
      'Sistem Manajemen Aset Pondok (Inventarisasi Barang & Bangunan)',
      'Manajemen Kelulusan dan Wisuda Santri',
      'Manajemen Alumni Pondok (Tracer Study & Database Alumni)',
      'Akses Multi-Kampus / Multi-Cabang',
      'Bisa Request Kustomisasi Minor & Integrasi RFID Mesin Absensi',
      'Dukungan Teknis 24/7 dengan SLA Cepat'
    ],
    saasPriceMonthly: 2000000, // Rp 2.000.000 / bulan
    saasPriceAnnual: 18000000, // Rp 18.000.000 / tahun (~ Rp 1.5M/bln)
    onPremisePrice: 95000000, // Rp 95.000.000 (One-Time)
    setupFee: 'Rp 2.500.000+',
    colorClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50/30',
    borderClass: 'border-emerald-200'
  }
};

export const ADDONS: AddOn[] = [
  {
    id: 'portal-wali',
    name: 'Portal Web Informasi Kesantrian',
    iconName: 'Globe',
    saasPrice: 100000,
    onPremisePrice: 5000000,
    description: 'Portal web khusus wali santri untuk memantau prestasi, tahfidz harian, pelanggaran, dan administrasi dari browser.'
  },
  {
    id: 'mobile-app',
    name: 'Mobile Apps Wali Santri',
    iconName: 'Smartphone',
    saasPrice: 200000,
    onPremisePrice: 10000000,
    description: 'Aplikasi Android & iOS native/PWA berlogo pondok Anda untuk kemudahan notifikasi realtime perkembangan santri.',
    badge: 'Terfavorit'
  },
  {
    id: 'wa-service',
    name: 'Integrasi WhatsApp Gateway',
    iconName: 'MessageSquare',
    saasPrice: 150000,
    onPremisePrice: 4500000,
    description: 'Kirim notifikasi otomatis (izin keluar, setoran tahfidz, SPP, & pelanggaran) langsung ke WhatsApp nomor orang tua.'
  },
  {
    id: 'rfid-cashless',
    name: 'Cashless RFID Kesantrian',
    iconName: 'CreditCard',
    saasPrice: 250000,
    onPremisePrice: 15000000,
    description: 'Kartu santri RFID pintar untuk jajan cashless di kantin, absensi ketuk, & batas kontrol belanja harian dari asrama.'
  },
  {
    id: 'va-bank',
    name: 'Integrasi Virtual Account Bank',
    iconName: 'Building2',
    saasPrice: 300000,
    onPremisePrice: 20000000,
    description: 'Integrasi penagihan SPP via Bank Mandiri/BRI/BNI/BSI dengan pencatatan mutasi otomatis & real-time ke sistem pondok.'
  }
];

// Copywriting hooks and techniques in Indonesian
export const COPYWRITING = {
  headline: 'Transformasikan Manajemen Pesantren ke Era Digital dengan Lebih Berkah & Efisien',
  subheadline: 'SmartPondok by RMS membantu mengelola akademik, kepengasuhan, keuangan, hingga aset pesantren Anda dalam satu platform terintegrasi. Dibangun khusus dengan nilai-nilai kepesantrenan.',
  heroCTA: 'Hitung Simulasi Harga',
  heroSecondaryCTA: 'Generasikan Proposal AI',
  problemSection: {
    tagline: 'TANTANGAN NYATA PESANTREN',
    title: 'Sering Mengalami Masalah-Masalah Klasik Ini?',
    subtitle: 'Mengelola ratusan hingga ribuan santri dengan sistem manual sangat rentan kesalahan, melelahkan, dan memakan waktu berharga pengurus.',
    problems: [
      {
        title: 'Tunggakan SPP & Keuangan Tidak Tercatat',
        description: 'Kebingungan memverifikasi transfer wali santri secara manual, memicu risiko salah catat atau ketidakteraturan kas pondok.',
        icon: 'TrendingDown'
      },
      {
        title: 'Laporan Tahfidz & Akademik Lambat',
        description: 'Orang tua di rumah selalu cemas menanyakan perkembangan setoran Al-Quran anaknya karena pencatatan asatidzah masih di buku fisik.',
        icon: 'BookOpen'
      },
      {
        title: 'Sirkulasi Santri Sulit Dipantau',
        description: 'Perizinan keluar-masuk (izin pulang) sering bocor, santri mangkir tanpa ketahuan, dan pengurus kewalahan mengontrol asrama.',
        icon: 'Clock'
      },
      {
        title: 'Administrasi Guru & Payroll Rumit',
        description: 'Proses rekap absensi guru, penghitungan jam mengajar, pembagian slip gaji bulanan masih dikerjakan satu per satu.',
        icon: 'UserCheck'
      }
    ]
  },
  solutionSection: {
    tagline: 'SOLUSI TERINTEGRASI',
    title: 'Satu Sistem, Berjuta Kemudahan Khidmah',
    subtitle: 'SmartPondok by RMS didesain intim dengan budaya pesantren Indonesia, memadukan ketegasan manajemen modern dan keluhuran akhlak santri.'
  },
  whyChooseUs: [
    {
      title: 'Ramah Budaya Pesantren',
      description: 'Dari plotting kamar santri, perizinan ta\'zir (pelanggaran), pelacakan setoran juz/surah, hingga tata krama perizinan.',
      icon: 'Heart'
    },
    {
      title: 'SaaS Murah vs Jual Putus',
      description: 'Pilih model berlangganan bulanan tanpa beban awal yang besar, atau beli lisensi selamanya untuk ditanam di server lokal pondok.',
      icon: 'DollarSign'
    },
    {
      title: 'Keterlibatan Penuh Wali Santri',
      description: 'Menghilangkan kekhawatiran wali santri. Mereka dapat melihat uang saku, presensi asrama, raport, dan progres tahfidz lewat HP.',
      icon: 'Users'
    },
    {
      title: 'Keamanan Data Berlapis',
      description: 'Enkripsi data pribadi santri dan keuangan pondok secara aman di server cloud modern atau database lokal pesantren Anda.',
      icon: 'ShieldCheck'
    }
  ]
};
