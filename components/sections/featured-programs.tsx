"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Program = {
  id: string;
  title: string;
  description: string;
  label: string;
  image: string;
};

const programs: Program[] = [
  {
    id: "portal-belajar",
    title: "Portal Belajar Online",
    description: "Lingkungan belajar digital untuk mendukung pembelajaran jarak jauh sesuai kurikulum sekolah.",
    label: "Pembelajaran digital",
    image: "/hero-banner.jpeg",
  },
  {
    id: "mikrotik-academy",
    title: "Academy Mikrotik",
    description: "Kelas Mikrotik bersertifikasi sebagai bagian dari kurikulum dan persiapan kompetensi siswa.",
    label: "Sertifikasi teknologi",
    image: "/smkn-hero-banner.png",
  },
  {
    id: "bk-online",
    title: "Sistem Informasi BK",
    description: "Layanan informasi bimbingan dan konseling yang lebih mudah dijangkau oleh siswa.",
    label: "Pendampingan siswa",
    image: "/hero-banner.png",
  },
  {
    id: "sertifikasi-lsp",
    title: "Sertifikasi LSP",
    description: "Layanan sertifikasi kompetensi untuk membuktikan kesiapan siswa memasuki dunia kerja.",
    label: "Kompetensi profesi",
    image: "/hero-banner.jpeg",
  },
];

export function FeaturedPrograms() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [progress, setProgress] = useState({ width: 100, left: 0 });

  const checkScrollability = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 8);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    const maxScroll = container.scrollWidth - container.clientWidth;
    setProgress({
      width: Math.min(100, (container.clientWidth / container.scrollWidth) * 100),
      left: maxScroll > 0 ? (container.scrollLeft / maxScroll) * (100 - (container.clientWidth / container.scrollWidth) * 100) : 0,
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new ResizeObserver(checkScrollability);
    observer.observe(container);
    container.addEventListener("scroll", checkScrollability, { passive: true });
    checkScrollability();
    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", checkScrollability);
    };
  }, [checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    const card = container?.querySelector<HTMLElement>("[data-program-card]");
    if (!container || !card) return;
    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
    container.scrollBy({ left: (card.offsetWidth + gap) * (direction === "left" ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section className="relative z-10 bg-[#f7f9fc] py-16 text-slate-950 md:py-24" aria-labelledby="featured-programs-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 px-4 md:px-8">
          <div>
            <h2 id="featured-programs-heading" className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Program Unggulan</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">Program sekolah yang memperkuat pembelajaran, pendampingan, dan kesiapan kerja siswa.</p>
          </div>
        </div>

        <div className="relative mx-4 md:mx-8">
          <div ref={scrollRef} className="featured-program-scroll flex snap-x snap-mandatory gap-5 overflow-x-auto py-3 md:gap-6">
            {programs.map((program) => (
              <article key={program.id} data-program-card className="group w-[84vw] shrink-0 snap-start sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_3rem)/3)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.16)] transition-shadow duration-300 group-hover:shadow-[0_18px_42px_rgba(15,23,42,0.22)]">
                  <Image src={program.image} alt="" fill sizes="380px" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/25 to-slate-950/95" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-blue-200">{program.label}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{program.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200">{program.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {canScrollLeft && <NavigationButton direction="left" onClick={() => scroll("left")} />}
          {canScrollRight && <NavigationButton direction="right" onClick={() => scroll("right")} />}
        </div>

        <div className="mx-4 mt-4 h-1 overflow-hidden rounded-full bg-slate-200 md:mx-8" aria-hidden="true">
          <div className="h-full origin-left rounded-full bg-blue-700 transition-transform duration-200" style={{ width: "100%", transform: `translateX(${progress.left}%) scaleX(${progress.width / 100})` }} />
        </div>
      </div>
    </section>
  );
}

function NavigationButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button type="button" onClick={onClick} aria-label={direction === "left" ? "Program sebelumnya" : "Program berikutnya"} className={`absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-content-center rounded-full bg-white text-blue-800 shadow-xl ring-1 ring-slate-950/10 transition hover:scale-105 md:size-14 ${direction === "left" ? "left-2 md:left-3" : "right-2 md:right-3"}`}>
      <Icon className="size-6" />
    </button>
  );
}
