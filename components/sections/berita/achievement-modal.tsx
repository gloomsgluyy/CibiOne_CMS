"use client";

import { CalendarDays } from "lucide-react";

import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/linear-dialog";
import { CutoutCardImage } from "@/components/ui/cutout-card";

import type { Achievement } from "./prestasi-gallery";

export function AchievementModal({ achievement }: { achievement: Achievement }) {
  return (
    <DialogContainer>
      <DialogContent className="relative flex h-[min(760px,94vh)] w-[min(1120px,96vw)] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">
        <DialogClose className="z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-md transition-colors hover:bg-white" />
        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-slate-900 lg:min-h-full">
            <CutoutCardImage alt={achievement.title} className="brightness-[0.82]" sizes="(max-width: 1024px) 100vw, 48vw" src={achievement.image} />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-white/85">{achievement.level}</p></div>
          </div>
          <div className="flex min-h-0 flex-col justify-between p-7 sm:p-9 lg:p-12">
            <div>
              <span className="inline-flex rounded-full bg-[#e8f1f6] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#1d4f98]">Highlight Prestasi</span>
              <DialogTitle className="mt-6 pr-8 text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">{achievement.title}</DialogTitle>
              <p className="mt-4 text-base font-semibold text-[#1d4f98]">{achievement.recipient}</p>
              <DialogDescription className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{achievement.description}</DialogDescription>
            </div>
            <div className="mt-8 flex items-center gap-2 border-t border-slate-200 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500"><CalendarDays className="h-4 w-4 text-[#1d4f98]" /> {achievement.date}</div>
          </div>
        </div>
      </DialogContent>
    </DialogContainer>
  );
}
