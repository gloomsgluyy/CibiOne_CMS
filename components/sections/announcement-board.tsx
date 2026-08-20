import { ArrowUpRight, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const announcements = [
  { date: "20", month: "Agu", title: "Daftar Ulang Peserta Didik Baru", label: "Penting", slug: "daftar-ulang-peserta-didik-baru", image: "/smkn-hero-banner.png" },
  { date: "18", month: "Agu", title: "Pembagian Kelas Tahun Ajaran 2026/2027", label: "Akademik", slug: "pembagian-kelas-2026", image: null },
  { date: "15", month: "Agu", title: "Jadwal Masa Pengenalan Lingkungan Sekolah", label: "Kesiswaan", slug: "jadwal-mpls-2026", image: null },
  { date: "12", month: "Agu", title: "Pengambilan Kartu Pelajar Siswa Baru", label: "Administrasi", slug: "pengambilan-kartu-pelajar", image: "/hero-banner.jpeg" },
] as const;

export function AnnouncementBoard() {
  const featured = announcements[0];

  return (
    <section className="relative z-10 bg-[#eef5ff] px-4 py-20 text-slate-950 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5 md:mb-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Pengumuman</h2>
          </div>
          <Link href="/berita" className="hidden items-center gap-2 text-sm text-slate-600 transition hover:text-blue-700 sm:inline-flex">
            Lihat semua <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-[7fr_5fr]">
          <article className="relative overflow-hidden rounded-3xl bg-blue-700 p-6 text-white md:min-h-[520px] md:p-10">
            {featured.image ? (
              <>
                <Image src={featured.image} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/65 to-blue-900/20" />
              </>
            ) : (
              <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sky-300/20 blur-2xl" />
            )}
            <div className="relative flex h-full min-h-72 flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">{featured.label}</span>
                <Bell className="size-6 text-blue-200" />
              </div>
              <div className="mt-auto pt-16">
                <p className="text-sm text-blue-100">Batas konfirmasi 20 Agustus 2026</p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">{featured.title}</h3>
                <Link href={`/berita/${featured.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                  Baca pengumuman <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {announcements.slice(1).map((item) => (
              <article key={item.slug} className="relative min-h-40 overflow-hidden rounded-3xl bg-blue-700 text-white">
                {item.image ? (
                  <>
                    <Image src={item.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/75 to-blue-900/30" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
                )}
                <div className="relative flex min-h-40 items-center gap-5 p-5 md:p-6">
                  <span className="grid size-14 shrink-0 place-content-center rounded-2xl bg-white/15 text-center backdrop-blur-sm">
                    <strong className="text-xl leading-none">{item.date}</strong><small className="mt-1 text-[10px] uppercase">{item.month}</small>
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-blue-200">{item.label}</span>
                    <h3 className="mt-1 text-lg font-semibold leading-snug">{item.title}</h3>
                  </div>
                  <Link href={`/berita/${item.slug}`} aria-label={`Baca ${item.title}`} className="ml-auto grid size-10 shrink-0 place-content-center rounded-full bg-white text-blue-700 transition hover:bg-blue-50">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Link href="/berita" className="mt-5 flex items-center justify-center gap-2 rounded-full border border-blue-200 py-3 text-sm font-semibold text-blue-700 sm:hidden">
          Semua pengumuman <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
