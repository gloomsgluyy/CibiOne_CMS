"use client";

import { memo } from "react";
import { CalendarDays, Camera } from "lucide-react";

import {
  CutoutCard,
  CutoutCardContent,
  CutoutCardImage,
  CutoutCardMedia,
  CutoutCardOverlay,
  cutoutCardSurfaceClassName,
} from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";

import type { NewsItem } from "./berita-types";

interface BeritaCardProps {
  highlighted: boolean;
  news: NewsItem;
  onSelect: (news: NewsItem) => void;
}

export const BeritaCard = memo(function BeritaCard({ highlighted, news, onSelect }: BeritaCardProps) {
  return (
    <button className="h-full w-full rounded-[24px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d4f98]" onClick={() => onSelect(news)} type="button">
        <CutoutCard
          className={cn(
            cutoutCardSurfaceClassName,
            "h-full rounded-[24px] border-slate-200/80 bg-white shadow-[0_16px_38px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-100 hover:border-[#bfd3e6] hover:shadow-[0_22px_48px_-34px_rgba(29,79,152,0.35)]",
            highlighted && "border-[#1d4f98] ring-4 ring-[#1d4f98]/20",
          )}
          id={`berita-card-${news.id}`}
          role="article"
        >
          <CutoutCardMedia className="h-60 rounded-t-[24px] bg-slate-200">
            <CutoutCardImage alt={news.title} quality={60} sizes="(max-width: 767px) calc(100vw - 34px), (max-width: 1279px) 45vw, 27vw" src={news.image} />
            <CutoutCardOverlay className="from-slate-950/45 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-2xl bg-[#1d4f98] text-white shadow-lg shadow-[#1d4f98]/25">
              <Camera className="h-5 w-5" aria-hidden />
            </span>
          </CutoutCardMedia>
          <CutoutCardContent className="p-5 sm:p-6">
            <span className="rounded-full bg-[#e8f1f6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1d4f98]">{news.category}</span>
            <h3 className="mt-4 line-clamp-3 text-xl font-bold leading-tight tracking-[-0.025em] text-slate-950">{news.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{news.excerpt}</p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              <CalendarDays className="h-4 w-4 text-[#1d4f98]" aria-hidden />
              {news.date}
            </div>
          </CutoutCardContent>
        </CutoutCard>
    </button>
  );
});
