"use client";

import { LogoCloud } from "@/components/sections/logo-cloud";
import { InfiniteSliderRef } from "@/components/ui/infinite-slider";
import { useState, useEffect, useRef } from "react";

const JURUSAN_LOGOS = [
  {
    src: "/logo jurusan/dpib.png",
    alt: "DPIB - Desain Pemodelan dan Informasi Bangunan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/logo-DKV_New-Revisi_Fix-1-e1731551656251.png",
    alt: "DKV - Desain Komunikasi Visual",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/Logo-TP-1536x991.png",
    alt: "TP - Teknik Pengelasan",
    width: 180,
    height: 180
  },
  {
    src: "/logo jurusan/rpl.png",
    alt: "RPL - Rekayasa Perangkat Lunak",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/sija.png",
    alt: "SIJA - Sistem Informasi Jaringan dan Aplikasi",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tflm.png",
    alt: "TFLM - Teknik Fabrikasi Logam dan Manufaktur",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkj.png",
    alt: "TKJ - Teknik Komputer dan Jaringan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkp baru.png",
    alt: "TKP - Teknik Konstruksi dan Perumahan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkr.png",
    alt: "TKR - Teknik Kendaraan Ringan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/toi.png",
    alt: "TOI - Teknik Otomasi Industri",
    width: 120,
    height: 120
  }
];

export default function KompetensiKeahlianPage() {
  const [selectedJurusan, setSelectedJurusan] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeJurusanIndex, setActiveJurusanIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<InfiniteSliderRef>(null);

  // Handle center logo change from carousel
  const handleCenterIndexChange = (index: number) => {
    if (!isTransitioning) {
      setActiveJurusanIndex(index);
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedJurusan) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedJurusan]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedJurusan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJurusan]);

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedJurusan(null);
      setCurrentStep(0);
    }, 300);
  };

  const openModal = (jurusanCode: string) => {
    setSelectedJurusan(jurusanCode);
    setCurrentStep(0);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const handleNextJurusan = () => {
    if (isTransitioning) return; // Prevent spam clicks
    
    setIsTransitioning(true);
    
    // Calculate next index (logical)
    const nextIndex = (activeJurusanIndex + 1) % JURUSAN_LOGOS.length;
    
    // Pause auto-scroll and move ONE step
    if (sliderRef.current) {
      sliderRef.current.pause();
      sliderRef.current.moveOneStep(); // This only moves ONE slot
    }
    
    // Update active index after slight delay to sync with visual movement
    setTimeout(() => {
      setActiveJurusanIndex(nextIndex);
    }, 100); // Small delay to let movement start
    
    // Resume auto-scroll after transition completes
    setTimeout(() => {
      setIsTransitioning(false);
      if (sliderRef.current) {
        sliderRef.current.resume();
      }
    }, 650); // 650ms = 550ms transition + 100ms buffer
  };

  const activeJurusan = JURUSAN_LOGOS[activeJurusanIndex];
  const activeJurusanCode = activeJurusan.alt.split(' - ')[0];

  const jurusanDetails = {
    "DPIB": {
      name: "DPIB — Desain Pemodelan dan Informasi Bangunan",
      description: "Desain Pemodelan dan Informasi Bangunan (DPIB) merupakan konsentrasi keahlian yang mempelajari perencanaan, penggambaran, pemodelan, dan penyajian informasi bangunan. Peserta didik dibekali kemampuan dalam membuat gambar teknik dan gambar konstruksi serta memahami berbagai komponen bangunan dengan bantuan teknologi dan perangkat lunak desain.",
      kompetensi: ["Gambar teknik bangunan", "Gambar konstruksi beton", "Konstruksi kayu", "Konstruksi tangga", "Gambar lantai dan dinding", "Gambar utilitas bangunan", "Desain interior dan eksterior", "Pemodelan bangunan", "Penggunaan perangkat lunak desain bangunan"],
      fokus: [
        { title: "Gambar Teknik", icon: "📐" },
        { title: "Pemodelan Bangunan", icon: "🏗️" },
        { title: "Konstruksi", icon: "🔨" },
        { title: "Interior & Eksterior", icon: "🎨" },
        { title: "Desain Bangunan", icon: "📏" }
      ],
      prospek: "Lulusan dapat berkarier sebagai drafter, tenaga gambar bangunan, teknisi konstruksi, pemodel bangunan, staf perusahaan konstruksi, maupun melanjutkan pendidikan di bidang teknik sipil, arsitektur, dan bidang terkait.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Prestasi DPIB di Lomba Nasional", date: "2026-08-10", link: "#" }
      ]
    },
    "DKV": {
      name: "DKV — Desain Komunikasi Visual",
      description: "Desain Komunikasi Visual (DKV) merupakan konsentrasi keahlian yang berfokus pada penyampaian informasi dan pesan melalui media visual. Peserta didik mengembangkan kemampuan kreatif dalam menghasilkan karya desain untuk kebutuhan cetak maupun digital.",
      kompetensi: ["Dasar-dasar desain grafis", "Desain komunikasi visual", "Ilustrasi", "Fotografi", "Pengolahan gambar digital", "Desain media digital", "Video editing", "Animasi", "Multimedia", "Pengembangan karya kreatif"],
      fokus: [
        { title: "Graphic Design", icon: "✏️" },
        { title: "Digital Imaging", icon: "🖼️" },
        { title: "Illustration", icon: "🎨" },
        { title: "Photography", icon: "📷" },
        { title: "Video Editing", icon: "🎬" },
        { title: "Animation", icon: "🎞️" },
        { title: "Multimedia", icon: "💻" }
      ],
      prospek: "Lulusan dapat berkarier sebagai graphic designer, illustrator, video editor, animator, multimedia designer, content creator, fotografer, maupun melanjutkan pendidikan di bidang desain dan multimedia.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Karya DKV Dipamerkan di Galeri Nasional", date: "2026-08-12", link: "#" }
      ]
    },
    "TP": {
      name: "TP — Teknik Pemesinan",
      description: "Teknik Pemesinan (TP) merupakan konsentrasi keahlian yang mempelajari proses pembuatan dan pengerjaan berbagai komponen menggunakan teknik pemesinan. Peserta didik dibekali kemampuan membaca gambar teknik, melakukan pengukuran, mengoperasikan mesin produksi, serta memahami teknologi pemesinan modern.",
      kompetensi: ["Gambar teknik", "Kerja bangku", "Metrologi industri", "Pengukuran teknik", "Pengoperasian mesin produksi", "Teknik pemesinan", "Proses manufaktur", "Mesin NC", "Mesin CNC", "Pemeriksaan hasil produksi"],
      fokus: [
        { title: "Gambar Teknik", icon: "📐" },
        { title: "Metrologi", icon: "📏" },
        { title: "Pemesinan", icon: "⚙️" },
        { title: "Manufaktur", icon: "🏭" },
        { title: "Mesin Produksi", icon: "🔧" },
        { title: "CNC", icon: "🤖" }
      ],
      prospek: "Lulusan dapat berkarier sebagai operator mesin, operator CNC, teknisi pemesinan, tenaga produksi, quality control, teknisi manufaktur, maupun melanjutkan pendidikan di bidang teknik mesin.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Siswa TP Raih Juara Lomba Welding", date: "2026-08-08", link: "#" }
      ]
    },
    "RPL": {
      name: "RPL — Rekayasa Perangkat Lunak",
      description: "Rekayasa Perangkat Lunak (RPL) merupakan konsentrasi keahlian yang berfokus pada perancangan, pembuatan, pengembangan, pengujian, dan pemeliharaan perangkat lunak. Peserta didik mempelajari pemrograman, basis data, pengembangan aplikasi, dan teknologi web.",
      kompetensi: ["Algoritma dan pemrograman", "Pemrograman berorientasi objek", "Pemrograman visual", "Basis data", "SQL", "Web design", "Web development", "Pengembangan aplikasi", "Software development", "Pengujian perangkat lunak"],
      fokus: [
        { title: "Programming", icon: "💻" },
        { title: "Web Development", icon: "🌐" },
        { title: "Database", icon: "🗄️" },
        { title: "SQL", icon: "📊" },
        { title: "Software Development", icon: "⚡" },
        { title: "App Development", icon: "📱" }
      ],
      prospek: "Lulusan dapat berkarier sebagai programmer, web developer, software developer, database administrator, software tester, junior system analyst, maupun mengembangkan usaha di bidang teknologi informasi.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Aplikasi Buatan RPL Menang Kompetisi", date: "2026-08-11", link: "#" }
      ]
    },
    "SIJA": {
      name: "SIJA — Sistem Informasi, Jaringan dan Aplikasi",
      description: "Sistem Informasi, Jaringan dan Aplikasi (SIJA) merupakan konsentrasi keahlian yang berfokus pada pengembangan dan pengelolaan teknologi informasi, jaringan komputer, sistem, aplikasi, dan infrastruktur digital. Peserta didik dibekali kemampuan yang relevan dengan kebutuhan industri teknologi informasi.",
      kompetensi: ["Jaringan komputer", "Administrasi jaringan", "Sistem operasi", "Administrasi server", "Web development", "Database", "Cloud computing", "Internet of Things (IoT)", "Cybersecurity", "System administration", "Infrastruktur teknologi informasi"],
      fokus: [
        { title: "Networking", icon: "🌐" },
        { title: "System Administration", icon: "💻" },
        { title: "Web Development", icon: "🔧" },
        { title: "Database", icon: "🗄️" },
        { title: "Cloud Computing", icon: "☁️" },
        { title: "Cybersecurity", icon: "🔒" },
        { title: "IoT", icon: "📡" }
      ],
      prospek: "Lulusan dapat berkarier sebagai network engineer, system administrator, IT support, network administrator, web developer, cloud engineer, cybersecurity practitioner, DevOps junior, maupun melanjutkan pendidikan di bidang teknologi informasi.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "SIJA Juara Cyber Security Competition", date: "2026-08-09", link: "#" }
      ]
    },
    "TFLM": {
      name: "TFLM — Teknik Fabrikasi Logam dan Manufaktur",
      description: "Teknik Fabrikasi Logam dan Manufaktur (TFLM) merupakan konsentrasi keahlian yang berfokus pada proses fabrikasi, pengolahan logam, dan kegiatan manufaktur. Peserta didik mempelajari proses produksi serta penggunaan berbagai peralatan dan teknologi yang digunakan dalam industri manufaktur.",
      kompetensi: ["Gambar teknik", "Fabrikasi logam", "Teknik pengelasan", "Teknik pemesinan", "Proses manufaktur", "Pengukuran dan metrologi", "Pengoperasian mesin produksi", "Pembuatan komponen", "Proses produksi industri"],
      fokus: [
        { title: "Metal Fabrication", icon: "🔩" },
        { title: "Welding", icon: "🔥" },
        { title: "Machining", icon: "⚙️" },
        { title: "Manufacturing", icon: "🏭" },
        { title: "Production", icon: "🔧" },
        { title: "Engineering Drawing", icon: "📐" }
      ],
      prospek: "Lulusan dapat berkarier di industri manufaktur, fabrikasi logam, pengelasan, pemesinan, produksi, quality control, maintenance, maupun melanjutkan pendidikan di bidang teknik.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Produk TFLM Dilirik Industri", date: "2026-08-07", link: "#" }
      ]
    },
    "TKJ": {
      name: "TKJ — Teknik Komputer dan Jaringan",
      description: "Teknik Komputer dan Jaringan (TKJ) merupakan konsentrasi keahlian yang mempelajari komputer, sistem operasi, jaringan komputer, server, dan infrastruktur jaringan. Peserta didik dibekali kemampuan untuk melakukan instalasi, konfigurasi, pemeliharaan, monitoring, dan troubleshooting sistem komputer serta jaringan.",
      kompetensi: ["Perakitan komputer", "Instalasi sistem operasi", "Instalasi perangkat lunak", "Jaringan komputer", "Konfigurasi jaringan", "Wide Area Network (WAN)", "Sistem operasi jaringan", "Administrasi server", "Database", "Troubleshooting komputer dan jaringan"],
      fokus: [
        { title: "Computer Hardware", icon: "🖥️" },
        { title: "Networking", icon: "🌐" },
        { title: "Server Administration", icon: "💻" },
        { title: "Operating System", icon: "⚙️" },
        { title: "WAN", icon: "📡" },
        { title: "Database", icon: "🗄️" },
        { title: "Troubleshooting", icon: "🔧" }
      ],
      prospek: "Lulusan dapat berkarier sebagai IT support, network technician, network administrator, system administrator, teknisi komputer, teknisi jaringan, maupun melanjutkan pendidikan di bidang teknologi informasi.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "TKJ Bangun Infrastruktur Jaringan Sekolah", date: "2026-08-13", link: "#" }
      ]
    },
    "TKP": {
      name: "TKP — Teknik Konstruksi dan Perumahan",
      description: "Teknik Konstruksi dan Perumahan (TKP) merupakan konsentrasi keahlian yang mempelajari proses pembangunan dan pekerjaan konstruksi bangunan serta perumahan. Peserta didik dibekali keterampilan dalam pekerjaan struktur, konstruksi kayu, penggunaan peralatan, hingga penyelesaian bagian bangunan.",
      kompetensi: ["Dasar konstruksi bangunan", "Pekerjaan konstruksi", "Pekerjaan kayu", "Sambungan kayu", "Penggunaan peralatan konstruksi", "Struktur bangunan", "Pekerjaan atap", "Pembuatan pintu dan jendela", "Bekisting", "Finishing bangunan"],
      fokus: [
        { title: "Building Construction", icon: "🏗️" },
        { title: "Woodworking", icon: "🪵" },
        { title: "Building Structure", icon: "🏛️" },
        { title: "Roofing", icon: "🏠" },
        { title: "Carpentry", icon: "🔨" },
        { title: "Finishing", icon: "🎨" }
      ],
      prospek: "Lulusan dapat berkarier di bidang konstruksi bangunan, pembangunan perumahan, pekerjaan kayu, pelaksana konstruksi, teknisi bangunan, maupun melanjutkan pendidikan di bidang konstruksi dan teknik sipil.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "TKP Prakerin di Proyek Megah", date: "2026-08-06", link: "#" }
      ]
    },
    "TKR": {
      name: "TKR — Teknik Kendaraan Ringan",
      description: "Teknik Kendaraan Ringan (TKR) merupakan konsentrasi keahlian yang berfokus pada teknologi dan perawatan kendaraan ringan. Peserta didik mempelajari berbagai sistem kendaraan serta melakukan pemeriksaan, perawatan, diagnosis, dan perbaikan kendaraan.",
      kompetensi: ["Mesin kendaraan", "Pemeliharaan motor otomotif", "Sistem chassis", "Sistem pemindah tenaga", "Sistem kelistrikan otomotif", "Sistem rem", "Sistem kemudi", "Sistem suspensi", "Sistem pendingin", "Sistem AC kendaraan", "Troubleshooting kendaraan"],
      fokus: [
        { title: "Automotive Engine", icon: "🚗" },
        { title: "Chassis", icon: "🔧" },
        { title: "Powertrain", icon: "⚙️" },
        { title: "Automotive Electrical", icon: "⚡" },
        { title: "Suspension", icon: "🛞" },
        { title: "Braking", icon: "🛑" },
        { title: "Vehicle AC", icon: "❄️" }
      ],
      prospek: "Lulusan dapat berkarier sebagai teknisi otomotif, mekanik kendaraan ringan, teknisi kelistrikan kendaraan, teknisi bengkel, service advisor, maupun membuka usaha jasa perawatan dan perbaikan kendaraan.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "TKR Servis Gratis untuk Masyarakat", date: "2026-08-05", link: "#" }
      ]
    },
    "TOI": {
      name: "TOI — Teknik Otomasi Industri",
      description: "Teknik Otomasi Industri (TOI) merupakan konsentrasi keahlian yang mempelajari sistem otomasi, kendali, dan teknologi yang digunakan dalam proses industri. Peserta didik dibekali kemampuan dalam memahami, merancang, mengoperasikan, dan melakukan pemeliharaan sistem kendali industri.",
      kompetensi: ["Sistem kendali elektromekanik", "Sistem kendali elektronik", "Sistem kendali digital", "Sensor dan transducer", "Motor listrik", "Aktuator", "Pneumatik", "Elektropneumatik", "Programmable Logic Controller (PLC)", "Supervisory Control and Data Acquisition (SCADA)", "Pemeliharaan sistem otomasi"],
      fokus: [
        { title: "Industrial Automation", icon: "🤖" },
        { title: "PLC", icon: "🔌" },
        { title: "SCADA", icon: "📊" },
        { title: "Sensors", icon: "📡" },
        { title: "Pneumatics", icon: "💨" },
        { title: "Electrical Control", icon: "⚡" },
        { title: "Digital Control", icon: "💻" }
      ],
      prospek: "Lulusan dapat berkarier sebagai teknisi otomasi industri, teknisi maintenance, teknisi electrical, PLC programmer, teknisi sistem kendali, teknisi manufaktur, maupun melanjutkan pendidikan di bidang teknik elektro dan otomasi.",
      images: ["/placeholder-jurusan.jpg", "/placeholder-jurusan.jpg"],
      news: [
        { title: "Robot TOI Tampil di Pameran Teknologi", date: "2026-08-04", link: "#" }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl text-center mb-2 text-blue-900 poppins-bold">Kompetensi Keahlian</h2>
      <LogoCloud 
        ref={sliderRef}
        logos={JURUSAN_LOGOS} 
        onCenterIndexChange={handleCenterIndexChange}
        activeIndex={activeJurusanIndex}
        isTransitioning={isTransitioning}
      />
      
      {/* Decorative Separator */}
      <div className="flex items-center justify-center my-4 opacity-40">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32"></div>
        <div className="mx-4 flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32"></div>
      </div>
      
      {/* Jurusan Card Section - 2 Cards */}
      <div className="max-w-6xl mx-auto">
        {/* 2 Card Jurusan yang Aktif */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Pertama - Current Active */}
          <div 
            key={`card-1-${activeJurusanIndex}`}
            className="group cursor-pointer bg-gradient-to-br from-white/90 to-white/70 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => openModal(activeJurusanCode)}
            style={{
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              animation: 'fadeIn 0.5s ease-out'
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-28 h-28 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(239, 246, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <img
                  src={activeJurusan.src}
                  alt={activeJurusan.alt}
                  className={`object-contain ${
                    activeJurusanCode === 'TP' ? 'w-32 h-32' : 'w-24 h-24'
                  }`}
                />
              </div>
              <div className="flex-1 text-center w-full">
                <h3 className="text-3xl poppins-bold text-blue-900 mb-2">{activeJurusanCode}</h3>
                <p className="text-base poppins-regular text-gray-700 mb-4">{activeJurusan.alt.split(' - ')[1]}</p>
                <div className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white poppins-medium rounded-2xl group-hover:bg-blue-700 transition-colors">
                  Lihat Detail
                </div>
              </div>
            </div>
          </div>

          {/* Card Kedua - Next Jurusan */}
          {(() => {
            const nextIndex = (activeJurusanIndex + 1) % JURUSAN_LOGOS.length;
            const nextJurusan = JURUSAN_LOGOS[nextIndex];
            const nextJurusanCode = nextJurusan.alt.split(' - ')[0];
            
            return (
              <div 
                key={`card-2-${nextIndex}`}
                className="group cursor-pointer bg-gradient-to-br from-white/90 to-white/70 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                onClick={() => openModal(nextJurusanCode)}
                style={{
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                  animation: 'fadeIn 0.5s ease-out'
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-28 h-28 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(239, 246, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <img
                      src={nextJurusan.src}
                      alt={nextJurusan.alt}
                      className={`object-contain ${
                        nextJurusanCode === 'TP' ? 'w-32 h-32' : 'w-24 h-24'
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-center w-full">
                    <h3 className="text-3xl poppins-bold text-blue-900 mb-2">{nextJurusanCode}</h3>
                    <p className="text-base poppins-regular text-gray-700 mb-4">{nextJurusan.alt.split(' - ')[1]}</p>
                    <div className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white poppins-medium rounded-2xl group-hover:bg-blue-700 transition-colors">
                      Lihat Detail
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNextJurusan}
            disabled={isTransitioning}
            className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white poppins-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span>Jurusan Selanjutnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Popup with White Glassmorphism */}
      {selectedJurusan && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
          style={{ 
            backdropFilter: isModalVisible ? 'blur(16px)' : 'blur(0px)', 
            backgroundColor: 'rgba(0, 0, 0, 0.6)' 
          }}
        >
          <div 
            className={`w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col transition-all duration-500 ease-out ${isModalVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 50%, rgba(243, 244, 246, 0.98) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-90 group"
                style={{
                  background: 'rgba(243, 244, 246, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.6)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 transition-transform duration-300">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>

              {/* Content Area - Scrollable but hide scrollbar */}
              <div className="p-8 md:p-10 flex-1 overflow-y-auto hide-scrollbar">
                {/* Header */}
                <div className="flex items-center gap-6 mb-8 animate-slideInFromLeft">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-3"
                    style={{
                      background: 'rgba(239, 246, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.1)'
                    }}
                  >
                    <img
                      src={JURUSAN_LOGOS.find(j => j.alt.startsWith(selectedJurusan))?.src}
                      alt={selectedJurusan}
                      className="w-16 h-16 object-contain transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl poppins-bold text-blue-900 drop-shadow-sm">{jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.name}</h3>
                    <div className="h-1 w-24 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                </div>

                {/* Carousel Content */}
                <div>
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      <div className="animate-slideInFromBottom">
                        <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Tentang Program
                        </h4>
                        <p className="poppins-regular text-gray-700 leading-relaxed text-base bg-blue-50/60 p-5 rounded-2xl backdrop-blur-sm border border-blue-100">
                          {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.description}
                        </p>
                      </div>
                      
                      <div className="animate-slideInFromBottom animate-delay-100">
                        <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Kompetensi yang Dipelajari
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.kompetensi.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-3 poppins-regular text-gray-700 text-sm bg-white/80 p-4 rounded-xl backdrop-blur-sm border border-gray-200 transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:shadow-lg hover:border-blue-200"
                            >
                              <span className="text-blue-600 text-lg mt-0.5">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="animate-slideInFromBottom animate-delay-200">
                        <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Fokus Keahlian
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.fokus.map((item, idx) => (
                            <div 
                              key={idx}
                              className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                              style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(229, 231, 235, 0.6)',
                                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.08)'
                              }}
                            >
                              <span className="text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{item.icon}</span>
                              <span className="poppins-semibold text-blue-900 text-xs text-center leading-tight">{item.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="animate-slideInFromBottom animate-delay-300">
                        <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Prospek Karier
                        </h4>
                        <p className="poppins-regular text-gray-700 leading-relaxed text-base bg-blue-50/60 p-5 rounded-2xl backdrop-blur-sm border border-blue-100">
                          {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.prospek}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Galeri Foto
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="group relative aspect-video rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                            style={{
                              border: '1px solid rgba(229, 231, 235, 0.6)',
                            }}
                          >
                            <img 
                              src={img} 
                              alt={`Foto ${idx + 1}`} 
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h5 className="text-white poppins-semibold text-lg mb-1">
                                  {selectedJurusan} - Aktivitas {idx + 1}
                                </h5>
                                <p className="text-white/90 poppins-regular text-sm">
                                  Dokumentasi kegiatan pembelajaran dan praktik
                                </p>
                              </div>
                            </div>
                            {/* Corner decoration */}
                            <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <span className="text-white text-xs poppins-medium">View</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h4 className="text-xl poppins-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Berita Terkini
                      </h4>
                      <div className="space-y-4">
                        {jurusanDetails[selectedJurusan as keyof typeof jurusanDetails]?.news.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.link}
                            className="group block bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-200"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h5 className="poppins-semibold text-blue-900 text-lg mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                  {item.title}
                                </h5>
                                <p className="poppins-regular text-sm text-gray-600 flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                  </svg>
                                  {item.date}
                                </p>
                              </div>
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                  <path d="M5 12h14"></path>
                                  <path d="m12 5 7 7-7 7"></path>
                                </svg>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation - Fixed at bottom with Blue Theme */}
              <div 
                className="flex items-center justify-between px-8 md:px-10 py-6 border-t backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.9) 100%)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="group flex items-center gap-2 px-6 py-3 poppins-medium text-white disabled:text-white/40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 bg-white/10 rounded-xl disabled:bg-transparent border border-white/20 disabled:border-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  Previous
                </button>
                <div className="flex gap-3">
                  {[0, 1, 2].map((step) => (
                    <button
                      key={step}
                      onClick={() => setCurrentStep(step)}
                      className={`transition-all duration-300 rounded-full ${
                        currentStep === step 
                          ? 'w-10 h-3 bg-white shadow-lg' 
                          : 'w-3 h-3 bg-white/40 hover:bg-white/60 hover:scale-125'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
                  disabled={currentStep === 2}
                  className="group flex items-center gap-2 px-6 py-3 poppins-medium text-white bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 border border-white/30 disabled:border-white/10 shadow-lg"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
