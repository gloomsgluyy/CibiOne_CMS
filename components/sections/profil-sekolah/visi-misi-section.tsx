"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const visiMisiData = [
  {
    id: 'visi',
    label: 'VISI',
    title: 'Visi SMKN 1 Cibinong',
    subtitle: 'Menjadi SMK Unggul dan Berkarakter',
    description: 'Mewujudkan SMK Negeri 1 Cibinong sebagai lembaga pendidikan kejuruan yang unggul dalam prestasi, berkarakter kuat, dan berwawasan lingkungan untuk menghasilkan lulusan yang kompeten dan siap kerja di era global.',
    points: [
      {
        title: 'Unggul dalam Prestasi',
        desc: 'Menghasilkan lulusan yang berprestasi di tingkat nasional dan internasional.',
      },
      {
        title: 'Berkarakter Kuat',
        desc: 'Membentuk siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.',
      },
      {
        title: 'Berwawasan Lingkungan',
        desc: 'Menanamkan kepedulian terhadap kelestarian lingkungan hidup.',
      },
      {
        title: 'Siap Kerja Global',
        desc: 'Membekali kompetensi yang dibutuhkan industri 4.0 dan era digital.',
      }
    ]
  },
  {
    id: 'misi',
    label: 'MISI',
    title: 'Misi SMKN 1 Cibinong',
    subtitle: 'Langkah Strategis Menuju Keunggulan',
    description: 'Melaksanakan program-program strategis untuk mewujudkan visi sekolah melalui pembelajaran berkualitas, kerjasama industri, dan pembinaan karakter yang berkelanjutan.',
    points: [
      {
        title: 'Pembelajaran Berkualitas',
        desc: 'Menyelenggarakan pembelajaran berbasis kompetensi dengan standar industri.',
      },
      {
        title: 'Kerjasama Industri',
        desc: 'Membangun kemitraan strategis dengan dunia usaha dan dunia industri.',
      },
      {
        title: 'Pembinaan Karakter',
        desc: 'Mengintegrasikan nilai-nilai karakter dalam setiap kegiatan pembelajaran.',
      },
      {
        title: 'Fasilitas Modern',
        desc: 'Menyediakan sarana prasarana pembelajaran yang modern dan relevan.',
      }
    ]
  }
];

export function VisiMisiSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-gray-50 py-8 px-6 lg:px-12 flex flex-col mt-12 items-center min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4"
          >
            Visi & Misi
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-600"
          >
            Visi & Misi dari sekolah SMKN 1 Cibinong
          </motion.p>
        </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[85vw] mx-auto"
      >
        <div className="flex md:gap-6 gap-4 h-[72vh] min-h-[500px]">
          {visiMisiData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative rounded-3xl border-2 border-blue-200 shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'flex-[4]' : 'flex-[0.5]'
              }`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src="/banner.jpeg"
                  alt={item.label}
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: activeIndex === index 
                      ? "linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(37, 99, 235, 0.90) 100%)"
                      : "linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(37, 99, 235, 0.75) 100%)"
                  }}
                />
              </div>

              Kiri atas badge
              {/* {activeIndex === index && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white font-semibold shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20"/>
                    </svg>
                    <span>{item.label}</span>
                  </div>
                </div>
              )} */}

              {/* Content Container */}
              <div className="relative h-full w-full p-14 flex flex-col">
                <AnimatePresence mode="wait">
                  {activeIndex === index ? (
                    <motion.div
                      key={`${item.id}-active`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col"
                    >
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {item.title}
                      </h2>

                      <p className="text-xl md:text-2xl text-white/90 mb-6">
                        {item.subtitle}
                      </p>

                      <p className="text-base text-white/80 leading-relaxed mb-8 text-justify">
                        {item.description}
                      </p>

                      {/* Points List dengan Glassmorphism - kecil dan bagus */}
                      <div className="grid md:grid-cols-2 gap-12 flex-1 overflow-y-auto pr-2">
                        {item.points.map((point, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (idx * 0.05) }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg flex flex-col items-center text-center min-h-[120px]"
                          >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                              <span className="text-white font-bold text-xl md:text-2xl">{idx + 1}</span>
                            </div>
                            <h4 className="text-white font-semibold text-base md:text-lg mb-2">
                              {point.title}
                            </h4>
                            <p className="text-white/80 text-sm md:text-base leading-snug">
                              {point.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${item.id}-inactive`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex items-center justify-center"
                    >
                      <h3 
                        className="text-white font-bold text-3xl md:text-4xl lg:text-5xl"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed'
                        }}
                      >
                        {item.label}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
