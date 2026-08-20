"use client";

import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop";
import { Building2 } from "lucide-react";

const partners: LogoItem[] = Array.from({ length: 8 }, (_, index) => ({
  node: (
    <span className="flex h-16 items-center gap-3 rounded-2xl border border-blue-950/10 bg-white px-6 text-slate-700 shadow-sm">
      <span className="grid size-9 place-content-center rounded-lg bg-blue-50 text-blue-700"><Building2 className="size-5" /></span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight">Mitra {String(index + 1).padStart(2, "0")}</span>
    </span>
  ),
  title: `Placeholder Mitra ${index + 1}`,
}));

export function IndustryPartners() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#f5f8ff] py-16 text-slate-950 md:py-20">
      <div className="mx-auto mb-9 max-w-7xl px-4 text-center md:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-700">Kolaborasi dunia kerja</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Mitra Industri Kami</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">Bersama mitra industri, kami menghadirkan pembelajaran yang relevan dengan kebutuhan dunia kerja.</p>
      </div>
      <LogoLoop logos={partners} speed={52} direction="left" logoHeight={64} gap={20} hoverSpeed={10} scaleOnHover fadeOut fadeOutColor="#f5f8ff" ariaLabel="Daftar mitra industri SMKN 1 Cibinong" />
    </section>
  );
}
