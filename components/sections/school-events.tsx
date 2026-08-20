"use client";

import { Expandable, ExpandableCard, ExpandableContent, ExpandableTrigger } from "@/components/ui/expandable";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const events = [
  { id: 1, badge: "7 hari lagi", date: "24 Agustus 2026", title: "Pembukaan Tahun Ajaran Baru", time: "07.00 - 09.30 WIB", location: "Lapangan Utama", description: "Pembukaan kegiatan belajar dan pengarahan awal bagi seluruh siswa SMKN 1 Cibinong.", slug: "pembukaan-tahun-ajaran-baru", color: "bg-blue-700" },
  { id: 2, badge: "12 hari lagi", date: "29 Agustus 2026", title: "Seminar Karier dan Industri", time: "09.00 - 12.00 WIB", location: "Aula Sekolah", description: "Sesi bersama mitra industri untuk mengenal kebutuhan kompetensi dan peluang karier lulusan.", slug: "seminar-karier-industri", color: "bg-slate-900" },
  { id: 3, badge: "18 hari lagi", date: "4 September 2026", title: "Pameran Karya Siswa", time: "08.00 - 15.00 WIB", location: "Gedung Praktik", description: "Presentasi karya terbaik dari berbagai kompetensi keahlian untuk warga sekolah dan publik.", slug: "pameran-karya-siswa", color: "bg-sky-700" },
] as const;

export function SchoolEvents() {
  const [page, setPage] = useState(0);

  return (
    <section className="relative z-10 bg-white px-4 py-20 text-slate-950 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl border-t border-slate-200 pt-10">
        <div className="mb-8 flex items-end justify-between gap-5 md:mb-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Event Sekolah</h2>
          </div>
          <Link href="/berita" className="hidden items-center gap-2 text-sm text-slate-600 transition hover:text-blue-700 sm:inline-flex">Semua event <ArrowUpRight className="size-4" /></Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:items-start">
          {events.map((event, index) => (
            <div key={event.id} className={index === page ? "block" : "hidden md:block"}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between md:hidden">
          <button type="button" aria-label="Event sebelumnya" onClick={() => setPage((page - 1 + events.length) % events.length)} className="grid size-11 place-content-center rounded-full border border-slate-200"><ChevronLeft className="size-5" /></button>
          <span className="text-sm text-slate-500">{page + 1} / {events.length}</span>
          <button type="button" aria-label="Event berikutnya" onClick={() => setPage((page + 1) % events.length)} className="grid size-11 place-content-center rounded-full border border-slate-200"><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <Expandable>
      <ExpandableCard className={`${event.color} group rounded-[2rem] p-6 text-white shadow-xl shadow-slate-950/10`}>
        <ExpandableTrigger className="block w-full">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold">{event.badge}</span>
            <span className="grid size-11 place-content-center rounded-xl border border-white/15 bg-white/10"><CalendarDays className="size-5" /></span>
          </div>
          <p className="mt-8 text-sm text-white/85">{event.date}</p>
          <h3 className="mt-2 min-h-16 text-2xl font-semibold leading-tight">{event.title}</h3>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-sm"><Clock3 className="size-4" />{event.time}</span>
            <Plus className="size-5 transition-transform group-data-[expanded=true]:rotate-45" />
          </div>
        </ExpandableTrigger>
        <ExpandableContent className="border-t border-white/15 pt-5 mt-5">
          <p className="flex items-center gap-2 text-sm font-medium"><MapPin className="size-4" />{event.location}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{event.description}</p>
          <Link href={`/berita/${event.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Lihat detail <ArrowUpRight className="size-4" /></Link>
        </ExpandableContent>
      </ExpandableCard>
    </Expandable>
  );
}
