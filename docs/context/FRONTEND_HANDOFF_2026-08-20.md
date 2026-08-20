# Frontend Handoff

> Baseline: `main` commit `8a762d6` (`2026-08-20`). Baca sebelum memperbaiki FE. Dokumen ini melengkapi `AI_CONTEXT.md`, bukan menggantikannya.

## Status Ringkas

- Stack: Next.js 15.5.23 App Router, React 19, TypeScript strict, Tailwind CSS v4, Motion (`motion/react` dan `framer-motion`), `next/image`.
- Publik: Home, Profil Sekolah, Kompetensi Keahlian, Berita, Prestasi, Kontak.
- Layout publik memasang `SiteNavbar` dan lazy AI chatbot untuk seluruh route publik.
- Build produksi serta `npx tsc --noEmit` lulus pada baseline ini.
- API/DB belum lengkap. Jangan menganggap semua UI terhubung data produksi.

## Mulai Dari Sini

1. Baca `docs/context/AI_CONTEXT.md`, `project.md`, `architecture.md`, `component-registry.md`.
2. Baca SRS section target di `docs/srs/<halaman>/<section>.md` dan reference yang dirujuknya.
3. Jalankan `npm run dev`, periksa desktop dan mobile pada route target.
4. Sesudah perubahan, jalankan `npx tsc --noEmit`, `npm run build`, dan `git diff --check`.

## Struktur FE Aktual

| Area | Lokasi | Catatan |
|---|---|---|
| Layout publik | `app/(public)/layout.tsx` | Memasang Navbar dan `AIChatLoader`; jangan memasang navbar kedua per-page. |
| Home | `app/(public)/page.tsx` | Menyusun seluruh section Home. |
| Navbar | `components/ui/site-navbar.tsx` | Navbar tunggal seluruh publik; client component. |
| Hero Home | `components/sections/hero-banner.tsx` | Tidak lagi memiliki navbar sendiri. |
| Profil | `app/(public)/profil-sekolah/page.tsx`, `components/sections/profil-sekolah/` | Sejarah memakai sticky clipping dan timeline. |
| Kompetensi | `app/(public)/kompetensi-keahlian/page.tsx`, `components/sections/kompetensi-section.tsx` | UI client dengan fallback seed lokal. |
| Berita | `app/(public)/berita/`, `components/sections/berita/` | List, detail, prestasi. |
| Kontak | `app/(public)/kontak/page.tsx` | Section publik kontak. |
| Shared primitives | `components/ui/` | Pertahankan convention komponen yang ada; Button memakai Base UI. |
| Global CSS | `app/globals.css` | CSS global serta utilitas/animasi section. |

## Navbar: Kontrak Penting

File: `components/ui/site-navbar.tsx`.

- Navbar berada di public layout, `fixed`, `z-[60]`.
- Home: transparan di awal, berubah biru glass saat scroll. Padding menyusut saat scroll.
- Profil: white glass pada hero awal, berubah biru glass setelah scroll.
- Route publik lain: blue glass statis dengan spacer `h-[72px] md:h-[80px]` dari Navbar.
- Mobile: tombol hamburger, drawer glass, tutup saat navigasi, backdrop, atau `Escape`; scroll body dikunci saat drawer terbuka.
- Desktop: link aktif memakai `layoutId="active-nav"`; CTA `Hubungi` tersembunyi pada layar sangat kecil.
- Jika menambah route publik, tambahkan item hanya bila memang harus muncul di navigasi. Pastikan aturan warna/spacer route tersebut tetap benar.
- Jangan pindahkan Navbar kembali ke `HeroBanner` atau section individual. Itu menciptakan navbar ganda di route lain.

## Hero Dan Profil: Area Sensitif

### Home hero

File: `components/sections/hero-banner.tsx`.

- Tinggi section `135svh`; gambar fixed agar saat scroll menjadi transisi reveal ke section berikutnya.
- `clip-path` dihasilkan Motion. Jangan menggantinya dengan state per-scroll; versi state sebelumnya memicu render berulang dan animasi kurang halus.
- `heroBottomInset` memakai asumsi navbar desktop `72px`. Ada komentar `ponytail` untuk upgrade bila tinggi Navbar menjadi configurable.
- Gambar hero wajib `priority`, `fetchPriority="high"`, `quality={55}`, `sizes="100vw"`.

### Sejarah Profil

File: `components/sections/profil-sekolah/sejarah-section.tsx`.

- Hero sticky mengecil dengan `clip-path` dari bawah menjadi strip sekitar `8vh`.
- Timeline berada di layer bawah, muncul setelah progress scroll `0.32` sampai `0.4`.
- Jangan mengembalikan `useState` + listener `scrollYProgress.on("change")`; transform Motion saat ini menghindari rerender pada setiap scroll.
- Uji viewport pendek, mobile, dan desktop setelah mengubah offset/sticky/stacking (`z-index`).

## Kompetensi Keahlian

File: `components/sections/kompetensi-section.tsx`.

- Halaman wrapper sengaja minimal: `app/(public)/kompetensi-keahlian/page.tsx`.
- Fitur FE: 10 jurusan, filter IT/Teknik, card fokus, grid 3x2, pagination, modal detail, auto-rotate yang pause saat interaksi.
- Data tetap dapat dirender tanpa DB lewat fallback seed lokal. Jangan menghapus fallback sebelum API dan deployment DB stabil.
- API list: `GET /api/jurusan`; mendukung filter kategori dan pagination, hanya data aktif/published bila DB tersedia.
- Detail `/api/jurusan/[id]` masih `501 NOT_IMPLEMENTED`. Status backend lengkap ada di `docs/LAPORAN_KOMPETENSI_KEAHLIAN.md` dan SRS Kompetensi.

## Image Dan Performa

- Konfigurasi image: `next.config.ts`.
- Format aktif: AVIF, WebP. Quality yang valid hanya `55`, `60`, `65`, `75`; pilih salah satu nilai ini pada `next/image`.
- Remote image yang diizinkan saat ini hanya `https://i.ytimg.com/vi/**`. Tambah `remotePatterns` hanya untuk host yang benar-benar dipakai.
- Prioritaskan `next/image`, `sizes` yang realistis, dan `priority` hanya untuk LCP image.
- AI chatbot di-load melalui `components/ui/ai-chat-loader.tsx`; pertahankan lazy loading agar bundle awal tidak membesar.
- Jangan menambah library UI/animasi hanya untuk fix kecil. Gunakan dependency yang sudah ada atau CSS/Tailwind.

## Riwayat Integrasi

| Commit | Isi |
|---|---|
| `176aee9` | Integrasi FE branch `pino`: Berita, Prestasi, Profil. |
| `ff779d3` | Integrasi awal FE branch `apis`: Kontak, Kompetensi, asset, docs. |
| `0b6a7a2` | Memulihkan FE Home lokal setelah integrasi branch. |
| `d816db8` | Integrasi Kompetensi/API Jurusan terbaru tanpa menimpa Navbar/Profile lokal. |
| `8a762d6` | Navbar shared responsif, pembersihan navbar Hero, transisi Sejarah Profil, image quality. |

Perubahan dari branch tersebut sudah berada di `main`. Jangan merge ulang branch lama tanpa membandingkan diff terhadap `main`.

## Batasan Dan Backlog Diketahui

- Banyak endpoint API selain list belum diimplementasikan: detail jurusan, post, guru, setting, chatbot memakai `501 NOT_IMPLEMENTED`.
- Validasi end-to-end DB memerlukan `DATABASE_URL`; tanpa itu, hanya fallback UI/API behavior yang bisa diuji.
- `npm audit` sebelumnya melaporkan 8 vulnerability. Jangan upgrade dependency massal sebagai bagian fix FE tanpa scope terpisah.
- Lighthouse produksi pasca-integrasi belum direkam ulang. Jalankan pada deployment nyata bila task mencakup performa.
- SRS Kompetensi: Fase 1 `Done`; Fase 2 `Not Started`. Jangan mengubah status `Done` tanpa approval PIC/reviewer.

## Checklist Fix FE

- Cek Component Registry dan SRS target sebelum mengubah UI.
- Pertahankan Bahasa Indonesia untuk copy UI.
- Uji 375px, sekitar 768px, dan desktop; cek keyboard, focus, `Escape`, backdrop untuk dialog/drawer.
- Pastikan tidak ada navbar ganda, content tertutup navbar, atau regression sticky/clip-path.
- Jalankan:

```powershell
npx tsc --noEmit
npm run build
```

- Commit kecil per scope. Jangan menyentuh perubahan worktree orang lain.
