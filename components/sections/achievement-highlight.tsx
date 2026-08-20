"use client";

import { ChevronLeft, ChevronRight, MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const achievements = [
  {
    id: 1,
    image: "/smkn-hero-banner.png",
    title: "Juara LKS Tingkat Nasional",
    slug: "juara-lks-tingkat-nasional",
    level: "nasional",
  },
  {
    id: 2,
    image: "/hero-banner.jpeg",
    title: "Medali LKS Tingkat Provinsi",
    slug: "medali-lks-tingkat-provinsi",
    level: "provinsi",
  },
  {
    id: 3,
    image: "/hero-banner.png",
    title: "Juara Kompetensi Kabupaten",
    slug: "juara-kompetensi-kabupaten",
    level: "kabupaten",
  },
  {
    id: 4,
    image: "/smkn-hero-banner.png",
    title: "Prestasi Siswa SMKN 1 Cibinong",
    slug: "prestasi-siswa-smkn-1-cibinong",
    level: "sekolah",
  },
] as const;

const spans = {
  nasional: "sm:col-span-7",
  provinsi: "sm:col-span-5",
  kabupaten: "sm:col-span-5",
  sekolah: "sm:col-span-7",
};

export function AchievementHighlight() {
  const [page, setPage] = useState(0);

  return (
    <section className="relative z-10 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#2865c7_0%,#124ba3_38%,#082e70_100%)] px-4 pb-16 pt-64 sm:pt-44 md:px-8 md:pb-24 md:pt-48">
      <div className="absolute left-[8%] top-1/3 size-72 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="absolute bottom-0 right-[5%] size-96 rounded-full bg-blue-950/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-white">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Prestasi</h2>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`group relative col-span-12 aspect-[4/3] overflow-hidden rounded-2xl ${index !== page ? "hidden sm:block" : ""} ${spans[achievement.level]} sm:aspect-auto sm:min-h-72 md:min-h-96`}
            >
              <Image
                src={achievement.image}
                alt={achievement.title}
                fill
                sizes="(min-width: 640px) 60vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
                <h3 className="max-w-[80%] rounded-xl bg-black px-4 py-2 text-sm font-medium text-white md:text-xl">
                  {achievement.title}
                </h3>
                <Link
                  href={`/berita/${achievement.slug}`}
                  aria-label={`Baca ${achievement.title}`}
                  className="grid size-11 shrink-0 place-content-center rounded-full bg-white text-blue-800 shadow-sm transition group-hover:-translate-y-1 md:size-12"
                >
                  <MoveUpRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <button
            type="button"
            aria-label="Prestasi sebelumnya"
            onClick={() => setPage((page - 1 + achievements.length) % achievements.length)}
            className="grid size-11 place-content-center rounded-full border border-white/25 text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2" aria-label={`Halaman ${page + 1} dari ${achievements.length}`}>
            {achievements.map((achievement, index) => (
              <button
                key={achievement.id}
                type="button"
                aria-label={`Tampilkan prestasi ${index + 1}`}
                onClick={() => setPage(index)}
                className="grid size-6 place-content-center rounded-full"
              >
                <span className={`block h-2 rounded-full transition-all ${index === page ? "w-7 bg-white" : "w-2 bg-white/40"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Prestasi berikutnya"
            onClick={() => setPage((page + 1) % achievements.length)}
            className="grid size-11 place-content-center rounded-full border border-white/25 text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
