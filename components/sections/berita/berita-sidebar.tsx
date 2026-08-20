"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface CategoryItem {
  name: string;
  total: number;
}

interface BeritaSidebarProps {
  activeCategory: string;
  activeDate: string | null;
  categories: CategoryItem[];
  month: Date;
  query: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
  onDateChange: (date: string | null) => void;
  onMonthChange: (month: Date) => void;
  onQueryChange: (query: string) => void;
}

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BeritaSidebar({
  activeCategory,
  activeDate,
  categories,
  month,
  query,
  onCategoryChange,
  onClearFilters,
  onDateChange,
  onMonthChange,
  onQueryChange,
}: BeritaSidebarProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const hasFilters = Boolean(query || activeCategory !== "Semua" || activeDate);

  function moveMonth(offset: number) {
    onMonthChange(new Date(year, monthIndex + offset, 1));
    onDateChange(null);
  }

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.45)] ring-1 ring-slate-100">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#1d4f98] text-white shadow-lg shadow-[#1d4f98]/20">
            <Search className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950">Cari Berita</h3>
            <p className="text-xs text-slate-500">Hasil diperbarui langsung saat mengetik.</p>
          </div>
        </div>
        <label className="sr-only" htmlFor="news-search-bottom">Cari berita</label>
        <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1 transition-colors focus-within:border-[#1d4f98] focus-within:bg-white">
          <input
            className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            id="news-search-bottom"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Judul, topik, kategori..."
            type="search"
            value={query}
          />
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d4f98] text-white">
            <Search className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_42px_-34px_rgba(15,23,42,0.45)] ring-1 ring-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#e8f1f6] text-[#1d4f98]">
              <CalendarDays className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <h3 className="font-bold text-slate-950">Kalender Berita</h3>
              <p className="text-[11px] text-slate-500">Pilih tanggal untuk memfilter.</p>
            </div>
          </div>
          {activeDate && (
            <button
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:border-[#1d4f98] hover:text-[#1d4f98]"
              onClick={() => onDateChange(null)}
              type="button"
            >
              Semua
            </button>
          )}
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <button
              aria-label="Bulan sebelumnya"
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-[#e8f1f6] hover:text-[#1d4f98]"
              onClick={() => moveMonth(-1)}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold text-slate-950"
                exit={{ opacity: 0, y: -4 }}
                initial={{ opacity: 0, y: 4 }}
                key={`${year}-${monthIndex}`}
                transition={{ duration: 0.16 }}
              >
                {month.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
              </motion.span>
            </AnimatePresence>
            <button
              aria-label="Bulan berikutnya"
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-[#e8f1f6] hover:text-[#1d4f98]"
              onClick={() => moveMonth(1)}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((day) => (
              <span className="py-1 text-[10px] font-bold uppercase text-slate-600" key={day}>{day}</span>
            ))}
            {calendarCells.map((day, index) => {
              if (!day) return <span aria-hidden className="aspect-square" key={`empty-${index}`} />;
              const dateKey = toDateKey(year, monthIndex, day);
              const selected = dateKey === activeDate;
              return (
                <button
                  aria-label={`Filter berita tanggal ${day} ${month.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`}
                  aria-pressed={selected}
                  className={cn(
                    "relative grid aspect-square place-items-center rounded-xl text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1d4f98]",
                    selected
                      ? "bg-[#1d4f98] text-white shadow-md shadow-[#1d4f98]/20"
                      : "text-slate-600 hover:bg-[#e8f1f6] hover:text-[#1d4f98]",
                  )}
                  key={dateKey}
                  onClick={() => onDateChange(selected ? null : dateKey)}
                  type="button"
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.45)] ring-1 ring-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-950">Kategori</h3>
          {hasFilters && (
            <button
              aria-label="Hapus semua filter"
              className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#1d4f98]"
              onClick={onClearFilters}
              type="button"
            >
              <X className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>
        <div className="space-y-2">
          {[{ name: "Semua", total: categories.reduce((sum, category) => sum + category.total, 0) }, ...categories].map((category) => {
            const active = activeCategory === category.name;
              return (
                <motion.button
                  aria-pressed={active}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-colors",
                  active
                    ? "border-[#bfd3e6] bg-[#e8f1f6] text-[#1d4f98]"
                    : "border-transparent text-slate-600 hover:border-[#d7e6f0] hover:bg-slate-50 hover:text-[#1d4f98]",
                )}
                  key={category.name}
                  layout
                  onClick={() => onCategoryChange(category.name)}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  type="button"
                >
                  <span>{category.name}</span>
                  <motion.span
                    animate={{ scale: active ? 1.05 : 1 }}
                    className={cn("rounded-full px-2 py-1 text-xs", active ? "bg-white text-[#1d4f98]" : "bg-slate-100 text-slate-500")}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  >
                    {category.total}
                  </motion.span>
                </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
