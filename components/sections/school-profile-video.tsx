"use client";

import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { TimelineAnimation } from "@/components/ui/timeline-animation";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Pembelajaran Berbasis Industri",
    description: "Kompetensi siswa dibentuk melalui praktik, proyek, dan pengalaman yang selaras dengan kebutuhan dunia kerja.",
  },
  {
    icon: GraduationCap,
    title: "Lingkungan Belajar Berkarakter",
    description: "Budaya sekolah mendorong kedisiplinan, kreativitas, kolaborasi, dan keberanian untuk terus berkembang.",
  },
];

export function SchoolProfileVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden bg-white px-4 py-20 text-slate-950 md:px-8 md:py-28">
      <div className="absolute left-0 top-1/3 size-80 -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute bottom-0 right-0 size-96 translate-x-1/3 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <TimelineAnimation timelineRef={sectionRef} animationNum={0}>
          <div className="rounded-[36px] bg-gradient-to-br from-blue-700 via-blue-500 to-sky-200 p-3 shadow-[0_30px_80px_rgba(30,64,175,0.2)] sm:p-5">
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/IBLtgpoUlqc?autoplay=1&rel=0"
              thumbnailSrc="https://i.ytimg.com/vi/IBLtgpoUlqc/maxresdefault.jpg"
              thumbnailAlt="Cuplikan Company Profile SMKN 1 Cibinong 2025"
            />
          </div>
        </TimelineAnimation>

        <TimelineAnimation timelineRef={sectionRef} animationNum={1}>
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl">
            Tempat bertumbuh, berkarya, dan menyiapkan masa depan
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Saksikan perjalanan SMKN 1 Cibinong dalam membangun pendidikan vokasi yang adaptif, berkarakter, dan dekat dengan dunia industri.
          </p>

          <div className="mt-8 space-y-6 border-t border-slate-200 pt-7">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-content-center rounded-full bg-blue-100 text-blue-700">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-slate-200 py-7">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Sekolah Vokasi</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">Kompetensi siap kerja dan berkarya</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Berbasis Industri</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">Pembelajaran relevan dan adaptif</p>
            </div>
          </div>

          <Link
            href="/profil-sekolah"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-blue-600 to-blue-800 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-800/20 transition hover:-translate-y-0.5"
          >
            Jelajahi Profil Sekolah
            <ArrowUpRight className="size-4" />
          </Link>
        </TimelineAnimation>
      </div>
    </section>
  );
}
