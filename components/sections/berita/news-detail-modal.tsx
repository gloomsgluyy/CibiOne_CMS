"use client";

import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

import { CutoutCardImage } from "@/components/ui/cutout-card";
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/linear-dialog";
import { generateSlugWithId } from "@/lib/slug";

import type { NewsItem } from "./berita-types";

interface NewsDetailModalProps {
  news: NewsItem;
}

export function NewsDetailModal({ news }: NewsDetailModalProps) {
  // Get first paragraph as preview
  const previewContent = news.content[0]?.[0] || "";

  return (
    <DialogContainer>
      <DialogContent className="relative flex h-[min(760px,92vh)] w-[min(1380px,95vw)] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">
        <DialogClose className="z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-md transition-colors hover:bg-white" />
        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.05fr_1.15fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-slate-900 lg:min-h-full">
            <CutoutCardImage
              alt={news.title}
              className="brightness-[0.82]"
              sizes="(max-width: 1024px) 100vw, 42vw"
              src={news.image}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-200">{news.category}</span>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/75">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {news.date}
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-col p-6 sm:p-8 lg:p-12">
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#1d4f98]">
                <span className="rounded-full bg-[#e8f1f6] px-3 py-1.5">{news.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-500">{news.date}</span>
              </div>
              <DialogTitle className="pr-10 text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
                {news.title}
              </DialogTitle>
              <DialogDescription className="mt-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                <p className="mb-6 text-lg font-medium leading-8 text-slate-700">{news.excerpt}</p>
                <p className="text-slate-600">{previewContent}</p>
                <p className="mt-4 text-sm italic text-slate-500">Lihat detail lengkap untuk membaca seluruh artikel...</p>
              </DialogDescription>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <Link 
                href={`/berita/${generateSlugWithId(news.title, news.id)}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1d4f98] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#173f7a] hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4f98]"
              >
                Lihat Detail Lengkap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogContainer>
  );
}
