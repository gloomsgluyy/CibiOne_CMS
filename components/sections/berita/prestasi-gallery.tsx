"use client";

import { memo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dialog } from "@/components/ui/linear-dialog";
import { cn } from "@/lib/utils";

const loadAchievementModal = () => import("./achievement-modal").then((module) => module.AchievementModal);

const AchievementModal = dynamic(
  loadAchievementModal,
  { ssr: false },
);

export interface Achievement {
  id: number;
  title: string;
  recipient: string;
  date: string;
  level: string;
  image: string;
  ratio: "portrait" | "landscape" | "square";
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 1, title: "Juara Nasional Kompetisi Teknologi", recipient: "Tim SIJA", date: "18 Agustus 2026", level: "Nasional", image: "/banner.jpeg", ratio: "portrait", description: "Tim SIJA membawa pulang penghargaan nasional berkat inovasi teknologi yang dikembangkan bersama guru pembimbing." },
  { id: 2, title: "Medali Emas Olimpiade Sains", recipient: "Nadia Putri", date: "12 Agustus 2026", level: "Provinsi", image: "/banner.jpeg", ratio: "landscape", description: "Capaian ini menjadi hasil dari pembinaan rutin, latihan terarah, dan semangat belajar yang konsisten." },
  { id: 3, title: "Finalis Lomba Desain Kreatif", recipient: "Tim DKV", date: "10 Agustus 2026", level: "Nasional", image: "/banner.jpeg", ratio: "square", description: "Karya visual siswa terpilih sebagai finalis melalui proses kurasi bersama peserta dari berbagai daerah." },
  { id: 4, title: "Juara Debat Bahasa Indonesia", recipient: "Ekstrakurikuler Debat", date: "7 Agustus 2026", level: "Kabupaten", image: "/banner.jpeg", ratio: "landscape", description: "Tim debat menunjukkan argumentasi yang kuat dan kerja sama yang baik pada setiap babak kompetisi." },
  { id: 5, title: "Penghargaan Inovasi Pembelajaran", recipient: "Guru Produktif", date: "3 Agustus 2026", level: "Provinsi", image: "/banner.jpeg", ratio: "portrait", description: "Penghargaan diberikan atas pengembangan pembelajaran berbasis proyek yang relevan dengan dunia industri." },
  { id: 6, title: "Juara Turnamen Futsal Pelajar", recipient: "Tim Futsal SMKN 1", date: "29 Juli 2026", level: "Kabupaten", image: "/banner.jpeg", ratio: "square", description: "Perjuangan tim futsal berbuah prestasi melalui permainan disiplin dan dukungan seluruh warga sekolah." },
  { id: 7, title: "Best Project Kewirausahaan Siswa", recipient: "Tim BDP", date: "24 Juli 2026", level: "Nasional", image: "/banner.jpeg", ratio: "landscape", description: "Produk karya siswa diapresiasi karena memiliki gagasan bisnis yang matang dan berdampak bagi lingkungan." },
  { id: 8, title: "Juara Poster Digital Lingkungan", recipient: "Raka Pratama", date: "20 Juli 2026", level: "Provinsi", image: "/banner.jpeg", ratio: "portrait", description: "Poster digital siswa menyampaikan pesan lingkungan secara kreatif, jelas, dan mudah dipahami." },
  { id: 9, title: "Apresiasi Kepemimpinan Pelajar", recipient: "OSIS SMKN 1", date: "16 Juli 2026", level: "Kabupaten", image: "/banner.jpeg", ratio: "square", description: "Pengurus OSIS memperoleh apresiasi atas konsistensi program kepemimpinan dan kegiatan sosial siswa." },
];

const PER_PAGE = 6;
const ratioClassName = { portrait: "aspect-[4/5]", landscape: "aspect-[16/10]", square: "aspect-square" } as const;

const AchievementCard = memo(function AchievementCard({ achievement, onSelect }: { achievement: Achievement; onSelect: (achievement: Achievement) => void }) {
  return (
    <button className="group block w-full cursor-pointer overflow-hidden rounded-[24px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d4f98]" onClick={() => onSelect(achievement)} onFocus={() => void loadAchievementModal()} onMouseEnter={() => void loadAchievementModal()} onPointerDown={() => void loadAchievementModal()} type="button">
      <article className="relative overflow-hidden rounded-[24px] bg-slate-200">
        <div className={cn("relative", ratioClassName[achievement.ratio])}>
          <Image alt={achievement.title} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" src={achievement.image} />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] backdrop-blur-sm">{achievement.level}</span>
            <h3 className="mt-3 text-lg font-bold leading-tight tracking-[-0.02em] sm:text-xl">{achievement.title}</h3>
            <p className="mt-2 text-xs font-medium text-white/75">{achievement.recipient}</p>
          </div>
        </div>
      </article>
    </button>
  );
});

export function PrestasiGallery() {
  const [page, setPage] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const pageCount = Math.ceil(ACHIEVEMENTS.length / PER_PAGE);
  const pageItems = ACHIEVEMENTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const columns = [pageItems.filter((_, index) => index % 3 === 0), pageItems.filter((_, index) => index % 3 === 1), pageItems.filter((_, index) => index % 3 === 2)];

  async function openAchievement(achievement: Achievement) {
    await loadAchievementModal();
    setSelectedAchievement(achievement);
  }

  return (
    <section className="bg-[#f4f8fa] pb-16 pt-10 sm:pb-20" aria-labelledby="prestasi-gallery-title">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-10" data-aos="fade-up">
        <header className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up" data-aos-delay="50">
          <div><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d4f98]">Highlight Prestasi</span><h1 id="prestasi-gallery-title" className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Pencapaian Siswa SMKN 1 Cibinong</h1></div>
          <p className="max-w-md text-sm leading-6 text-slate-600">Kumpulan prestasi siswa, guru, dan sekolah dari berbagai kompetisi.</p>
        </header>
        <div data-aos="fade-up" data-aos-delay="150">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={page}>
            {columns.map((column, index) => <div className={cn("grid gap-5", index === 2 && "sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:block lg:space-y-5")} key={index}>{column.map((achievement) => <AchievementCard achievement={achievement} key={achievement.id} onSelect={(item) => void openAchievement(item)} />)}</div>)}
          </div>
        </div>
        {pageCount > 1 && <div className="mt-9 flex justify-center gap-2" data-aos="fade-up" data-aos-delay="250" role="group" aria-label="Pagination prestasi">{Array.from({ length: pageCount }, (_, index) => <button aria-current={page === index ? "true" : undefined} aria-label={`Tampilkan halaman prestasi ${index + 1}`} className="relative h-4 w-9 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4f98]" key={index} onClick={() => setPage(index)} type="button"><span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />{page === index && <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#1d4f98]" />}</button>)}</div>}
        {selectedAchievement && <Dialog open onOpenChange={(open) => !open && setSelectedAchievement(null)}><AchievementModal achievement={selectedAchievement} /></Dialog>}
      </div>
    </section>
  );
}
