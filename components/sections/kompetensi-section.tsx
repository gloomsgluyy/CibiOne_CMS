"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type JurusanCategory = "All" | "IT" | "Teknik";

interface Jurusan {
  code: string;
  name: string;
  fullName: string;
  description: string;
  logoUrl: string;
  category: "IT" | "Teknik";
  bgImage?: string;
  kompetensi: string[];
  prospek: string;
  fokusKeahlian: Array<{ title: string; icon: string }>;
}

interface JurusanApiItem {
  code: string;
  name: string;
  fullName: string;
  description: string;
  logoUrl: string;
  category: "IT" | "Teknik";
  bgImageUrl: string | null;
  kompetensi: string[];
  prospek: string;
  fokusKeahlian: Array<{ title: string; icon: string }>;
}

const JURUSAN_DATA: Jurusan[] = [
  {
    code: "SIJA",
    name: "SIJA",
    fullName: "Sistem Informasi, Jaringan dan Aplikasi",
    description: "Program keahlian 4 tahun yang mencetak generasi handal di bidang teknologi yang berakhlak dan berkarakter, dengan penekanan pada softskill seperti disiplin, etos kerja, dan kejujuran untuk bersaing di dunia teknologi.",
    logoUrl: "/logo jurusan/sija.png",
    category: "IT",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Cybersecurity", "Cloud Computing", "Networking", "Web Development", "Database Management", "System Administration", "IoT (Internet of Things)", "Network Security"],
    prospek: "Network Administrator, System Administrator, Cybersecurity Specialist, Cloud Engineer, IT Support, Network Engineer, DevOps Engineer",
    fokusKeahlian: [
      { title: "Cybersecurity", icon: "🔒" },
      { title: "Cloud Computing", icon: "☁️" },
      { title: "Networking", icon: "🌐" },
      { title: "IoT", icon: "📡" },
    ]
  },
  {
    code: "RPL",
    name: "RPL",
    fullName: "Rekayasa Perangkat Lunak",
    description: "Program keahlian yang fokus pada perancangan, pembuatan, dan pengembangan aplikasi software dengan pembelajaran berbasis Teaching Factory yang link and match dengan industri untuk menghasilkan lulusan berkompeten dan berdaya saing global.",
    logoUrl: "/logo jurusan/rpl.png",
    category: "IT",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Algoritma dan Pemrograman", "Basis Data & SQL", "Pemrograman Berorientasi Objek", "Web Design & Development", "Aplikasi Berbasis Desktop", "Aplikasi Berbasis Mobile", "Software Testing", "Pemrograman Visual"],
    prospek: "Software Developer, Web Developer, Mobile Developer, Database Administrator, Software Tester, System Analyst, Full Stack Developer",
    fokusKeahlian: [
      { title: "Programming", icon: "💻" },
      { title: "Web Dev", icon: "🌐" },
      { title: "Mobile Dev", icon: "📱" },
      { title: "Database", icon: "🗄️" },
    ]
  },
  {
    code: "DKV",
    name: "DKV",
    fullName: "Desain Komunikasi Visual",
    description: "Program keahlian yang mengembangkan kreativitas dalam desain grafis, multimedia, dan komunikasi visual untuk kebutuhan cetak maupun digital dengan teknologi terkini.",
    logoUrl: "/logo jurusan/logo-DKV_New-Revisi_Fix-1-e1731551656251.png",
    category: "IT",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Desain Grafis", "Ilustrasi Digital", "Fotografi", "Video Editing", "Animasi 2D/3D", "Multimedia", "Digital Imaging", "Typography", "UI/UX Design"],
    prospek: "Graphic Designer, Illustrator, Video Editor, Animator, Content Creator, Photographer, UI/UX Designer, Multimedia Designer",
    fokusKeahlian: [
      { title: "Graphic Design", icon: "🎨" },
      { title: "Video Editing", icon: "🎬" },
      { title: "Animation", icon: "🎞️" },
      { title: "Photography", icon: "📷" },
    ]
  },
  {
    code: "TKJ",
    name: "TKJ",
    fullName: "Teknik Komputer dan Jaringan",
    description: "Program keahlian unggulan yang menghasilkan lulusan kompeten dalam instalasi, konfigurasi, dan maintenance sistem komputer serta jaringan dengan standar nasional dan internasional, didukung sertifikasi dan prestasi tingkat nasional.",
    logoUrl: "/logo jurusan/tkj.png",
    category: "IT",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Instalasi dan Perakitan Komputer", "Sistem Operasi", "Jaringan Komputer", "Wide Area Network (WAN)", "Server Administration", "Network Security", "Database", "Troubleshooting", "Mikrotik"],
    prospek: "Network Technician, IT Support, Network Administrator, System Administrator, Server Administrator, Network Engineer, IT Infrastructure Specialist",
    fokusKeahlian: [
      { title: "Networking", icon: "🌐" },
      { title: "Server Admin", icon: "💻" },
      { title: "Hardware", icon: "🖥️" },
      { title: "Troubleshooting", icon: "🔧" },
    ]
  },
  {
    code: "TKP",
    name: "TKP",
    fullName: "Teknik Konstruksi dan Perumahan",
    description: "Program keahlian yang mempelajari proses pembangunan dan pekerjaan konstruksi bangunan serta perumahan dengan keterampilan praktis dalam struktur, konstruksi kayu, dan penyelesaian bangunan.",
    logoUrl: "/logo jurusan/tkp baru.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Konstruksi Bangunan", "Pekerjaan Kayu", "Sambungan Kayu", "Struktur Bangunan", "Bekisting", "Pekerjaan Atap", "Pembuatan Pintu dan Jendela", "Finishing Bangunan", "Carpentry"],
    prospek: "Teknisi Konstruksi, Pelaksana Lapangan, Tukang Kayu Profesional, Supervisor Bangunan, Estimator Konstruksi, Drafter Konstruksi",
    fokusKeahlian: [
      { title: "Construction", icon: "🏗️" },
      { title: "Woodworking", icon: "🪵" },
      { title: "Structure", icon: "🏛️" },
      { title: "Finishing", icon: "🎨" },
    ]
  },
  {
    code: "TP",
    name: "TP",
    fullName: "Teknik Pemesinan",
    description: "Program keahlian yang mempelajari proses pemesinan dan manufaktur modern dengan teknologi CNC untuk menghasilkan lulusan terampil dalam industri manufaktur.",
    logoUrl: "/logo jurusan/Logo-TP-1536x991.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Gambar Teknik", "Metrologi Industri", "Teknik Pemesinan", "CNC Operation", "Mesin Produksi", "Proses Manufaktur", "Quality Control", "Kerja Bangku", "NC/CNC Programming"],
    prospek: "Operator Mesin CNC, Operator Produksi, Teknisi Pemesinan, Quality Control Inspector, Teknisi Manufaktur, Machinist",
    fokusKeahlian: [
      { title: "Machining", icon: "⚙️" },
      { title: "CNC", icon: "🤖" },
      { title: "Manufacturing", icon: "🏭" },
      { title: "QC", icon: "✓" },
    ]
  },
  {
    code: "TOI",
    name: "TOI",
    fullName: "Teknik Otomasi Industri",
    description: "Program keahlian yang mempelajari sistem otomasi, kendali, dan teknologi industri modern untuk menghasilkan teknisi yang mampu merancang, mengoperasikan, dan memelihara sistem otomasi industri.",
    logoUrl: "/logo jurusan/toi.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["PLC Programming", "SCADA System", "Industrial Automation", "Sensor dan Transducer", "Pneumatik & Elektropneumatik", "Motor Listrik", "Sistem Kendali Digital", "Electrical Control", "Aktuator"],
    prospek: "Teknisi Otomasi Industri, PLC Programmer, Teknisi Maintenance, Teknisi Electrical Control, Automation Engineer, Control System Technician",
    fokusKeahlian: [
      { title: "PLC", icon: "🔌" },
      { title: "SCADA", icon: "📊" },
      { title: "Automation", icon: "🤖" },
      { title: "Control", icon: "⚡" },
    ]
  },
  {
    code: "TKR",
    name: "TKR",
    fullName: "Teknik Kendaraan Ringan",
    description: "Program keahlian yang fokus pada teknologi dan perawatan kendaraan ringan dengan pembelajaran sistem mesin, kelistrikan, chassis, dan sistem kendaraan modern.",
    logoUrl: "/logo jurusan/tkr.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Mesin Kendaraan", "Sistem Kelistrikan Otomotif", "Chassis & Powertrain", "Sistem Pemindah Tenaga", "Sistem Rem", "Sistem Kemudi", "Sistem Suspensi", "Sistem AC Kendaraan", "Troubleshooting", "Engine Tune-up"],
    prospek: "Teknisi Otomotif, Mekanik Kendaraan Ringan, Service Advisor, Teknisi Kelistrikan Kendaraan, Workshop Supervisor, Automotive Engineer",
    fokusKeahlian: [
      { title: "Engine", icon: "🚗" },
      { title: "Electrical", icon: "⚡" },
      { title: "Chassis", icon: "🔧" },
      { title: "AC System", icon: "❄️" },
    ]
  },
  {
    code: "TFLM",
    name: "TFLM",
    fullName: "Teknik Fabrikasi Logam dan Manufaktur",
    description: "Program keahlian yang fokus pada proses fabrikasi, pengelasan, dan kegiatan manufaktur dengan teknologi modern untuk industri logam dan manufaktur.",
    logoUrl: "/logo jurusan/tflm.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Gambar Teknik", "Fabrikasi Logam", "Teknik Pengelasan", "Teknik Pemesinan", "Proses Manufaktur", "Metrologi", "Pengoperasian Mesin Produksi", "Pembuatan Komponen", "Welding Technology"],
    prospek: "Welder Profesional, Teknisi Fabrikasi, Operator Produksi, Quality Control, Teknisi Pengelasan, Supervisor Produksi, Fabrication Engineer",
    fokusKeahlian: [
      { title: "Welding", icon: "🔥" },
      { title: "Fabrication", icon: "🔩" },
      { title: "Manufacturing", icon: "🏭" },
      { title: "Production", icon: "🔧" },
    ]
  },
  {
    code: "DPIB",
    name: "DPIB",
    fullName: "Desain Pemodelan dan Informasi Bangunan",
    description: "Program keahlian yang mempelajari perencanaan, penggambaran, pemodelan, dan penyajian informasi bangunan dengan teknologi BIM (Building Information Modeling) dan software desain modern.",
    logoUrl: "/logo jurusan/dpib.png",
    category: "Teknik",
    bgImage: "/img_ref/banner.jpg",
    kompetensi: ["Gambar Teknik Bangunan", "BIM Modeling", "Gambar Konstruksi", "Konstruksi Kayu", "Desain Interior & Eksterior", "Pemodelan Bangunan", "CAD Software", "Konstruksi Beton", "Utilitas Bangunan"],
    prospek: "Drafter Bangunan, BIM Modeler, Desainer Bangunan, Teknisi Konstruksi, CAD Operator, Building Designer, Estimator Proyek",
    fokusKeahlian: [
      { title: "BIM", icon: "🏗️" },
      { title: "CAD", icon: "💻" },
      { title: "Drawing", icon: "📐" },
      { title: "Design", icon: "📏" },
    ]
  },
];

interface KompetensiSectionProps {
  className?: string;
}

const ITEMS_PER_PAGE = 6;

export function KompetensiSection({ className }: KompetensiSectionProps) {
  // Keep the verified preview data visible until the CMS database is populated.
  const [jurusanData, setJurusanData] = useState<Jurusan[]>(JURUSAN_DATA);
  const [activeCategory, setActiveCategory] = useState<JurusanCategory>("All");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [direction, setDirection] = useState(1);

  // Memoize filtered data untuk performa
  const filteredJurusan = useMemo(() => 
    jurusanData.filter((j) => activeCategory === "All" || j.category === activeCategory),
    [activeCategory, jurusanData]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadJurusan() {
      try {
        const response = await fetch("/api/jurusan?limit=100");
        const payload = await response.json() as { success: boolean; data?: JurusanApiItem[] };
        if (!response.ok || !payload.success || !payload.data) {
          throw new Error("Gagal memuat jurusan");
        }

        if (isMounted && payload.data.length > 0) {
          setJurusanData(payload.data.map((item) => ({
            ...item,
            bgImage: item.bgImageUrl ?? undefined,
          })));
        }
      } catch {
        // The local seed remains the preview source when the CMS API is unavailable.
      }
    }

    loadJurusan();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = useMemo(() => 
    Math.ceil(filteredJurusan.length / ITEMS_PER_PAGE),
    [filteredJurusan.length]
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = useMemo(() => 
    filteredJurusan.slice(startIndex, endIndex),
    [filteredJurusan, startIndex, endIndex]
  );

  const focusedJurusan = filteredJurusan[focusedIndex];

  // Auto-rotate
  useEffect(() => {
    if (!isAutoRotating || isModalOpen) return;

    const interval = setInterval(() => {
      setFocusedIndex((prev) => {
        if (filteredJurusan.length === 0) return 0;
        const nextIndex = (prev + 1) % filteredJurusan.length;
        setDirection(1);
        const nextPage = Math.floor(nextIndex / ITEMS_PER_PAGE);
        if (nextPage !== currentPage) {
          setCurrentPage(nextPage);
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating, isModalOpen, filteredJurusan.length, currentPage]);

  // Reset on category change
  useEffect(() => {
    setFocusedIndex(0);
    setCurrentPage(0);
    setDirection(1);
  }, [activeCategory]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleCardClick = (index: number) => {
    const globalIndex = startIndex + index;
    setDirection(globalIndex > focusedIndex ? 1 : -1);
    setFocusedIndex(globalIndex);
  };

  const handlePageChange = (page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    setFocusedIndex(page * ITEMS_PER_PAGE);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsAutoRotating(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsAutoRotating(true);
  };

  // Framer Motion Variants
  const focusCardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className={cn("relative overflow-hidden bg-white py-10 lg:flex lg:h-[calc(100svh-80px)] lg:items-center lg:py-4", className)}>
      <div className="container relative z-10 mx-auto w-full px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 text-center md:text-left lg:mb-4"
        >
          <div className="mb-5 grid items-start gap-4 md:grid-cols-2 md:gap-8 lg:mb-3">
            <div>
              <h1 className="mb-1 text-4xl font-bold text-[#1c4e97] poppins-bold md:text-5xl lg:text-5xl">
                Kompetensi Keahlian
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 poppins-semibold">
                SMKN 1 Cibinong
              </p>
            </div>
            <p className="text-base md:text-lg text-gray-600 poppins-regular leading-relaxed">
              SMKN 1 Cibinong menawarkan 10 program keahlian unggulan yang dirancang untuk mempersiapkan siswa menghadapi tantangan industri modern dengan kompetensi yang relevan dan berbasis teknologi terkini.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {(["All", "IT", "Teknik"] as JurusanCategory[]).map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-3 rounded-full poppins-semibold text-base transition-all duration-300",
                    activeCategory === category
                      ? "bg-[#1c4e97] text-white hover:bg-[#1c4e97]/90 shadow-xl"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  )}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredJurusan.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-700">Belum ada jurusan yang dipublikasikan pada kategori ini.</p>
        ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:gap-8">
          {/* Focus Card - Kiri */}
          <motion.div 
            className="relative h-[500px] md:h-[600px] lg:h-[calc(100svh-270px)] lg:min-h-[410px] lg:max-h-[570px]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={focusedIndex}
                custom={direction}
                variants={focusCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 group cursor-pointer rounded-3xl overflow-hidden"
                onClick={handleModalOpen}
                style={{
                  backgroundImage: `url(${focusedJurusan?.bgImage || "/img_ref/banner.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                whileHover={{ scale: 1.015 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:from-black/95" />

                <motion.div 
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={focusedJurusan?.logoUrl}
                    alt={focusedJurusan?.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm poppins-medium border border-white/30">
                      {focusedJurusan?.category}
                    </span>
                  </motion.div>
                  <motion.h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white poppins-bold mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {focusedJurusan?.code}
                  </motion.h2>
                  <motion.p 
                    className="text-xl md:text-2xl text-white/90 poppins-semibold mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {focusedJurusan?.fullName}
                  </motion.p>
                  <motion.p 
                    className="text-base md:text-lg text-white/80 poppins-regular leading-relaxed max-w-2xl mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {focusedJurusan?.description}
                  </motion.p>
                  <motion.div 
                    className="flex items-center gap-2 text-white/90 poppins-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>Klik untuk detail lengkap</span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </motion.svg>
                  </motion.div>
                </div>

                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Grid Cards - Kanan */}
          <div className="flex h-[500px] flex-col md:h-[600px] lg:h-[calc(100svh-270px)] lg:min-h-[410px] lg:max-h-[570px]">
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate="show"
              key={`page-${currentPage}`}
              className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 flex-1"
            >
              {currentPageData.map((jurusan, index) => {
                const globalIndex = startIndex + index;
                const isFocused = focusedIndex === globalIndex;
                
                return (
                  <motion.div
                    key={`${jurusan.code}-${globalIndex}`}
                    variants={cardVariants}
                    onClick={() => handleCardClick(index)}
                    className={cn(
                      "group relative rounded-2xl overflow-hidden cursor-pointer",
                      isFocused && "ring-4 ring-white shadow-2xl z-10"
                    )}
                    style={{
                      backgroundImage: `url(/img_ref/banner.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Overlay dengan transisi cepat */}
                    <div
                      className={cn(
                        "absolute inset-0 transition-all duration-200",
                        isFocused
                          ? "bg-gradient-to-t from-[#1c4e97]/98 via-[#1c4e97]/85 to-[#1c4e97]/60"
                          : "bg-gradient-to-t from-black/90 via-black/60 to-black/40 group-hover:from-[#1c4e97]/95 group-hover:via-[#1c4e97]/75 group-hover:to-[#1c4e97]/50"
                      )}
                    />

                    {/* Logo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                      <img
                        src={jurusan.logoUrl}
                        alt={jurusan.code}
                        className="w-20 h-20 md:w-24 md:h-24 object-contain"
                      />
                    </div>

                    {/* Jurusan Code */}
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 z-10">
                      <h3
                        className={cn(
                          "text-base md:text-lg lg:text-xl font-bold text-white poppins-bold transition-transform duration-200",
                          isFocused && "scale-110"
                        )}
                      >
                        {jurusan.code}
                      </h3>
                      <p className="text-[10px] md:text-xs text-white/80 poppins-regular mt-1 line-clamp-1">
                        {jurusan.fullName}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    <AnimatePresence>
                      {isFocused && (
                        <motion.div 
                          className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 md:p-2 z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div 
                            className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <motion.div 
                className="flex justify-center gap-2 py-4 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <motion.button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex)}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      currentPage === pageIndex
                        ? "w-8 h-3 bg-white shadow-lg"
                        : "w-3 h-3 bg-white/40"
                    )}
                    whileHover={{ scale: 1.3, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to page ${pageIndex + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
        )}

      </div>

      {/* Modal Detail - Optimized untuk mencegah freeze */}
      <AnimatePresence>
        {isModalOpen && focusedJurusan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="relative h-64 md:h-80 overflow-hidden"
                style={{
                  backgroundImage: `url(${focusedJurusan.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                <motion.button
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-3 group z-10 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </motion.button>

                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-end gap-4">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                    <img src={focusedJurusan.logoUrl} alt={focusedJurusan.name} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm poppins-medium border border-white/30 mb-2">
                      {focusedJurusan.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white poppins-bold mb-1">{focusedJurusan.code}</h2>
                    <p className="text-lg md:text-xl text-white/90 poppins-semibold">{focusedJurusan.fullName}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content - Optimized untuk scroll performance */}
              <div className="p-6 md:p-10 max-h-[calc(90vh-20rem-80px)] overflow-y-auto custom-scrollbar" style={{ willChange: "scroll-position" }}>
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 poppins-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1c4e97]"></span>
                    Tentang Program
                  </h3>
                  <div 
                    className="text-base md:text-lg text-gray-800 poppins-regular leading-relaxed p-6 rounded-2xl shadow-sm"
                    style={{
                      background: "rgba(239, 246, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    {focusedJurusan.description}
                  </div>
                </div>

                {/* Kompetensi - Removed animations on scroll */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 poppins-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1c4e97]"></span>
                    Kompetensi yang Dipelajari
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {focusedJurusan.kompetensi.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:translate-x-1"
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(229, 231, 235, 0.8)",
                          willChange: "transform",
                        }}
                      >
                        <span className="text-[#1c4e97] text-lg mt-0.5 font-bold">✓</span>
                        <span className="text-gray-800 poppins-regular font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fokus Keahlian - Simplified hover */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 poppins-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1c4e97]"></span>
                    Fokus Keahlian
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {focusedJurusan.fokusKeahlian.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-3 p-5 rounded-2xl shadow-md cursor-pointer group transition-all duration-150 hover:scale-105 hover:-translate-y-1"
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(229, 231, 235, 0.8)",
                          willChange: "transform",
                        }}
                      >
                        <span className="text-4xl transition-transform duration-150 group-hover:scale-110 group-hover:rotate-6">
                          {item.icon}
                        </span>
                        <span className="text-gray-900 poppins-semibold text-sm text-center">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prospek Karier */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 poppins-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1c4e97]"></span>
                    Prospek Karier
                  </h3>
                  <div 
                    className="text-base md:text-lg text-gray-800 poppins-regular leading-relaxed p-6 rounded-2xl shadow-sm"
                    style={{
                      background: "rgba(239, 246, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    {focusedJurusan.prospek}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
