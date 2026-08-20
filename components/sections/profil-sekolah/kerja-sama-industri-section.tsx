"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { X } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const partnerLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
    width: 120,
    name: "Google LLC",
    description: "Partnership dalam program Google Developer Student Clubs dan sertifikasi Google IT Support Professional untuk meningkatkan kompetensi siswa di bidang teknologi cloud dan digital."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
    width: 140,
    name: "Microsoft Corporation",
    description: "Kerja sama dalam program Microsoft Learn Student Ambassador dan akses ke Azure for Education untuk pembelajaran cloud computing dan pengembangan software modern."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
    width: 100,
    name: "IBM Indonesia",
    description: "Partnership dalam IBM SkillsBuild program untuk pelatihan AI, data science, dan cybersecurity dengan sertifikasi internasional yang diakui industri."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/250px-Amazon_Web_Services_Logo.svg.png",
    alt: "AWS",
    width: 80,
    name: "Amazon Web Services",
    description: "Kolaborasi dalam AWS Educate program memberikan akses ke cloud computing resources dan training untuk mempersiapkan siswa menjadi cloud practitioner."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/250px-Cisco_logo_blue_2016.svg.png",
    alt: "Cisco",
    width: 100,
    name: "Cisco Systems Indonesia",
    description: "Partnership dalam Cisco Networking Academy untuk sertifikasi CCNA dan pelatihan jaringan komputer yang memenuhi standar industri global."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Oracle_red_logo.svg/250px-Oracle_red_logo.svg.png",
    alt: "Oracle",
    width: 120,
    name: "Oracle Indonesia",
    description: "Kerja sama dalam Oracle Academy program untuk pembelajaran database management, Java programming, dan enterprise software development."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/250px-Intel-logo.svg.png",
    alt: "Intel",
    width: 80,
    name: "Intel Indonesia",
    description: "Partnership dalam Intel AI for Youth program dan pelatihan Internet of Things (IoT) untuk membekali siswa dengan keterampilan teknologi masa depan."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/250px-Dell_logo_2016.svg.png",
    alt: "Dell",
    width: 80,
    name: "Dell Technologies Indonesia",
    description: "Kolaborasi dalam program magang dan workshop hardware assembly, troubleshooting, dan IT infrastructure management untuk pengalaman praktis siswa."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/250px-HP_logo_2012.svg.png",
    alt: "HP",
    width: 60,
    name: "HP Indonesia",
    description: "Partnership dalam program HP LIFE (Learning Initiative for Entrepreneurs) untuk pengembangan keterampilan digital dan entrepreneurship bagi siswa."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/250px-Samsung_Logo.svg.png",
    alt: "Samsung",
    width: 120,
    name: "Samsung Electronics Indonesia",
    description: "Kerja sama dalam Samsung Innovation Campus untuk pelatihan mobile development, AI, dan IoT dengan peralatan dan mentor dari Samsung."
  },
];

export function KerjaSamaIndustriSection() {
  const [selectedCompany, setSelectedCompany] = useState<typeof partnerLogos[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = (logo: typeof partnerLogos[0], index: number) => {
    setSelectedCompany(logo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#1b4d96" }}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Kerja Sama Industri
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
          >
            Membangun partnership strategis dengan industri terkemuka untuk memastikan lulusan siap kerja dan berdaya saing tinggi.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <LogoCloud logos={partnerLogos} onLogoClick={handleLogoClick} />
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <img
                      src={selectedCompany.src}
                      alt={selectedCompany.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedCompany.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Mitra Industri
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Program Kerja Sama
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCompany.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
