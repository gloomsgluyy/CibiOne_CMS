# SRS — Home / Hero Banner

> Dibuat dari `docs/context/SRS_TEMPLATE.md`.
> Dokumen ini menjadi sumber requirement untuk section **Hero Banner** halaman Home.

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Home |
| Section | Hero Banner |
| Tipe Konten | Dynamic - List |
| PIC Programmer | Glooms |
| Reviewer / Approver | Tim Programming / PIC Reviewer |
| Component Registry Reference | `docs/context/component-registry.md` bagian **A. Hero Banner (Home)**: `hero-liquid-metal` (Cult UI), Aura Build `Component 3C578A7`, `blur-vignette` (UI Layouts) |
| Code Reference Folder | `docs/references/home/hero-banner/` |
| Tanggal dibuat | 2026-08-11 |

---

## Ringkasan Requirement

Hero Banner adalah section pertama di halaman Home. Section ini harus menjadi visual utama website, fullscreen, cinematic, image-first, dan menampilkan identitas SMKN 1 Cibinong secara premium tanpa menutup foto sekolah.

Hero Banner menggunakan foto background dinamis dari CMS, bukan hardcode, karena banner harus bisa diganti untuk event, PPDB, lomba, atau informasi prioritas sekolah.

Referensi visual utama:

- Layout dari tim desain: header 3 slot di atas, area hero besar, headline center, bottom navigation pill.
- Referensi Beau Soleil: fullscreen image, header transparan, brand center-top, bottom nav pill, active state putih.
- Referensi Aura Build `Component 3C578A7`: layered image background, radial reveal cursor, cinematic typography, atmospheric overlay.
- Referensi `blur-vignette`: overlay blur/vignette untuk membuat foto lebih soft, modern, dan readable.

Code reference wajib:

- `docs/references/home/hero-banner/hero-liquid-metal-demo.tsx.md`
- `docs/references/home/hero-banner/aura-atmospheric-hero.html.md`
- `docs/references/home/hero-banner/blur-vignette.md`

Implementasi Fase 1 **dilarang membuat UI Hero Banner dari scratch**. Rule ini berlaku untuk semua section yang punya registry/list component, bukan hanya Hero Banner. Programmer/AI wajib mengadaptasi code reference di atas dan hanya menyesuaikan data dinamis, token warna, responsive behavior, accessibility, serta standar React/Next.js project.

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: Gambar wireframe Hero Banner dengan struktur top navbar, hero area, dan bottom nav.
- **Deskripsi dari tim desain**: Hero Banner fullscreen untuk Home. Background berupa foto sekolah. Desain mengikuti cinematic landing page: image dominant, atmosfer blur/vignette, headline besar di tengah, navigasi bawah berbentuk pill.
- **Component/Template yang dipakai**:
  - Aura Build `Component 3C578A7` sebagai referensi layout utama: fullscreen atmospheric hero, layered image background, cursor-based radial reveal, animated title, nav links, circular enter button.
  - UI Layouts `blur-vignette` sebagai efek overlay background untuk foto dinamis.
  - Cult UI `hero-liquid-metal` hanya sebagai referensi registry yang tersedia; tidak dipakai sebagai visual utama kecuali reviewer/tim desain meminta shader abstract. Alasan: target visual dari desain lebih image-school cinematic, bukan split-layout shader.
- **Code reference yang wajib diikuti**: `docs/references/home/hero-banner/`. Implementasi harus berbasis code reference tersebut. Dilarang membuat struktur visual baru dari nol.
- **Kalau component digenerate sendiri (registry tidak punya)**: Tidak berlaku. Section punya registry. Implementasi wajib mengambil pattern dari registry dan menyesuaikan ke token/style project.

### Tujuan Visual

- Hero tampil fullscreen: minimal `100svh`.
- Background foto sekolah menjadi fokus utama.
- Foto memakai layered treatment:
  - base layer sharp, cover, center.
  - overlay blur/vignette tipis untuk atmosfer.
  - gradient gelap tipis agar teks tetap terbaca.
- Header transparan berada di atas background.
- Identitas sekolah tampil elegan, bukan seperti banner promosi biasa.
- Headline center besar, 2 baris jika panjang.
- Subtitle kecil uppercase/tracking lebar di bawah headline.
- Bottom navigation pill berada dekat bawah hero.
- Active pill berwarna putih/terang, item lain outline/transparan.
- Mobile tetap readable, tanpa custom cursor kompleks.

### Struktur Layout Desktop

```text
[Logo kecil / brand kiri]        [Logo SMKN center]        [CTA / menu kanan]


                       [Headline Hero]
                         [Subtitle]


           [Profil] [Jurusan] [Berita] [Prestasi] [Kontak]     [CTA circular]
```

### Struktur Layout Mobile

```text
[Logo SMKN + nama sekolah]                         [Menu]

                  [Headline Hero]
                    [Subtitle]
                    [CTA utama]

          [Profil] [Jurusan] [Berita] [Kontak]
```

### Elemen UI Wajib

| Elemen | Requirement |
|---|---|
| Root section | `relative`, fullscreen, overflow hidden |
| Background image | dynamic `image_url`, `object-cover`, responsive |
| Overlay | blur/vignette + gradient gelap tipis |
| Header | transparan, absolute/fixed di atas hero, 3 slot desktop |
| Logo | pakai logo SMKN 1 Cibinong dari asset project |
| Brand text | `SMKN 1 CIBINONG`, kecil, uppercase/tracking lebar |
| Headline | besar, center, maksimal 2 baris desktop |
| Subtitle | kecil, uppercase/tracking lebar, opacity rendah |
| CTA utama | label dinamis, link dinamis |
| Bottom nav | link statis ke halaman utama website |
| Active state | `Home` aktif saat di Home |
| Scroll/enter indicator | optional; boleh circular CTA sederhana |

### Copy Default

Default content dipakai hanya fallback saat data CMS belum tersedia.

| Field | Default |
|---|---|
| headline | `Membangun Generasi Berprestasi` |
| subtitle | `SMKN 1 CIBINONG - SEKOLAH KEJURUAN UNGGUL DAN INOVATIF` |
| cta_label | `Jelajahi` |
| cta_url | `#profil` |

### Bottom Navigation

Bottom navigation adalah navigasi website, bukan konten hero. Untuk Fase 1 dibuat statis.

| Label | Target |
|---|---|
| Home | `/` |
| Profil | `/profil-sekolah` |
| Jurusan | `/kompetensi-keahlian` |
| Berita | `/berita` |
| Kontak | `/kontak` |

Jika nanti tim desain meminta menu ini bisa diedit CMS, buat ADR / update SRS terpisah. Jangan masukkan ke data Hero Banner dari awal.

### Behavior

- Desktop:
  - Background dapat memakai radial reveal mengikuti cursor jika implementasi ringan dan tidak mengganggu performa.
  - Custom cursor boleh diterapkan hanya di area hero, bukan global website.
  - Hover nav menampilkan underline/opacity transition.
  - CTA circular bisa hover scale ringan.
- Mobile/tablet:
  - Radial reveal dan custom cursor dimatikan.
  - Overlay blur/vignette statis tetap aktif.
  - Bottom nav bisa horizontal scroll jika sempit.
- Accessibility:
  - CTA dan nav harus bisa difokus keyboard.
  - Custom cursor tidak boleh menyembunyikan cursor native untuk user keyboard/mobile.
  - Text contrast harus cukup di atas foto.
  - Jika motion dikurangi (`prefers-reduced-motion`), animasi/reveal harus nonaktif atau minimal.

### Image Requirement

- Foto hero berasal dari CMS field `image_url`.
- Upload image harus disimpan di object storage, bukan base64 database.
- Format gambar yang direkomendasikan: WebP.
- Untuk Fase 2/upload pipeline nanti, gambar wajib diupayakan dikonversi/dioptimasi ke WebP sebelum disimpan, fallback ke format original hanya jika konversi gagal atau format tidak didukung.
- Frontend wajib memakai optimasi image Next.js jika memungkinkan.
- Wajib sediakan fallback visual jika `image_url` kosong.

### Data Contract Frontend

Data minimal yang dibutuhkan komponen Hero Banner:

```ts
type HeroBannerItem = {
  id: number;
  title: string;
  body?: string | null;
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  isPublished: boolean;
  sortOrder?: number | null;
};
```

Mapping UI:

| UI | Data |
|---|---|
| Headline | `title` |
| Subtitle | `body` |
| Background image | `imageUrl` |
| CTA text | `ctaLabel` |
| CTA target | `ctaUrl` |

### Acceptance Criteria Fase 1

- Hero Banner tampil di halaman Home.
- Tinggi hero fullscreen di desktop dan mobile.
- Layout mengikuti referensi: header atas, headline center, bottom nav pill.
- Background image dapat diterima via props/data mock.
- Logo SMKN tampil jelas.
- Text tetap terbaca di atas foto terang maupun gelap.
- Bottom nav responsive dan tidak overflow merusak layout.
- Desktop hover state tersedia.
- Mobile tidak memakai custom cursor/radial reveal.
- Tidak menulis UI dari scratch yang bertentangan dengan registry; implementation harus mencatat pemakaian Aura/blur-vignette pattern.
- Implementasi membaca dan mengadaptasi code reference di `docs/references/home/hero-banner/`.
- Tidak ada backend/API baru di Fase 1.

### Batasan Fase 1

- Tidak membuat CMS form.
- Tidak membuat API CRUD.
- Tidak membuat upload image/WebP conversion pipeline.
- Tidak membuat dynamic bottom nav.
- Tidak menambahkan dependency animasi baru kecuali sudah ada kebutuhan keras dari implementasi registry.

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-11 | AI Assistant | Membuat SRS detail Hero Banner berdasarkan referensi UI, registry component, dan arahan PIC. | Not Started | Belum implementasi kode UI. Menunggu approval/lanjutan instruksi PIC untuk mulai Fase 1. |
| 2026-08-11 | AI Assistant | Menambahkan kewajiban mengikuti code reference dan mendokumentasikan folder referensi Hero Banner. | Not Started | Code reference ada di `docs/references/home/hero-banner/`. |
| 2026-08-11 | AI Assistant | Mengimplementasikan Fase 1 Hero Banner dari Aura Atmospheric Hero dan Blur Vignette reference, lalu memasangnya ke halaman Home. | Waiting for Approval | Desktop memakai layered image + cursor radial reveal. Mobile memakai vignette statis. Tidak ada backend/API dibuat. |
| 2026-08-11 | Glooms | Reset kerja Hero Banner kembali ke fase SRS dan execution log. | Rejected | Implementasi sebelumnya belum diterima. Lanjut dari SRS/rework, bukan approval Fase 1. |
| 2026-08-11 | AI Assistant | Mengosongkan implementasi Hero Banner dari halaman Home dan menghapus artifact UI terkait. | Not Started | Home sekarang kosong. SRS tetap menjadi sumber requirement untuk rework berikutnya. |
| 2026-08-11 | AI Assistant | Mengimplementasikan code reference `Blurvignettevideo` tanpa redesign dan memasangnya ke Home. | Waiting for Approval | Component dibuat sesuai snippet PIC: video Pixabay + `BlurVignette` + `BlurVignetteArticle`. |
| 2026-08-11 | AI Assistant | Mengubah demo video menjadi section Hero Banner fullscreen memakai foto gedung SMKN 1 Cibinong. | Waiting for Approval | Background pakai `/hero-banner.jpeg`, `next/image`, dan `BlurVignette`. |
| 2026-08-12 | AI Assistant | Menambahkan logo SMKN dan text reveal `SMKN 1 Cibinong` tipe `whipInUp` di tengah Hero Banner. | Waiting for Approval | Implementasi memakai CSS keyframes agar tidak menambah dependency animasi baru. Build production lolos. |
| 2026-08-12 | AI Assistant | Menambahkan `BorderGlow` sebagai background transparan blur untuk blok welcome text Hero Banner. | Waiting for Approval | Background glass `rgb(0 0 0 / 0.14)`, `backdrop-filter`, animated edge glow. Build production lolos. |
| 2026-08-12 | AI Assistant | Memisahkan subtitle dari `BorderGlow` dan membatasi warna glow hanya biru-putih. | Waiting for Approval | Welcome text tetap center dalam glass card; subtitle kembali di luar card. Build production lolos. |
| 2026-08-12 | AI Assistant | Memindahkan `BorderGlow` ke subtitle saja dan mengembalikan welcome text tanpa background card. | Waiting for Approval | Subtitle memakai glass pill blur transparan dengan glow biru-putih. Build production lolos. |
| 2026-08-12 | AI Assistant | Menghapus `BorderGlow` dari Hero Banner dan mengembalikan subtitle ke background hitam transparan. | Waiting for Approval | Subtitle memakai `bg-black/35` dengan blur ringan; komponen/CSS BorderGlow dihapus. Build production lolos. |
| 2026-08-12 | AI Assistant | Mengubah background Hero Banner menjadi framed rounded container mengikuti referensi Tailark hero. | Waiting for Approval | Image berada dalam inset card rounded dengan border tipis, overlay ikut rounded, hover zoom diperkecil. Build production lolos. |
| 2026-08-12 | AI Assistant | Mengembalikan Hero Banner ke full-bleed image karena framed rounded membuat gambar tidak penuh. | Waiting for Approval | Section kembali tanpa padding, image `h-screen w-full`, overlay full inset. Build production lolos. |
| 2026-08-12 | AI Assistant | Mengadaptasi layout Hero Banner ke referensi Tailark: nav overlay, headline center, subtitle 2 baris, dan frame putih tipis dengan rounded edges. | Waiting for Approval | Build ulang terblokir network Google Fonts `ETIMEDOUT` setelah `.next` dibersihkan; compile sebelumnya sudah lolos sebelum retry network timeout. |
| 2026-08-12 | AI Assistant | Menghapus `next/font/google` Poppins agar build tidak timeout saat Google Fonts tidak bisa diakses. | Waiting for Approval | Fallback font chain dipakai: `Poppins`, `Inter`, `Segoe UI`, Arial, Helvetica. Exact Poppins butuh file font lokal. Build production lolos. |
| 2026-08-12 | AI Assistant | Mengintegrasikan ulang Poppins memakai `<link>` Google Fonts di layout dan utility class Poppins di CSS. | Waiting for Approval | Tidak memakai `next/font/google`, sehingga build tidak men-download font saat compile. Build production lolos. |
| 2026-08-12 | AI Assistant | Menambah padding putih hero banner dari `p-1` ke `p-3 md:p-4` dan menyesuaikan inset overlay/header. | Waiting for Approval | Tinggi hero disesuaikan memakai `calc(100svh - padding)`. Build production lolos. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#0800ff`. | Waiting for Approval | Build terakhir dihentikan user saat verifikasi. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#6089f0`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#5280f2`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#3367e8`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Menambah padding frame hero menjadi `p-4 md:p-6` dan menyesuaikan inset/height. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#2596be`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#001542`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#033091`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah warna frame padding hero menjadi `#abc5ff`. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengembalikan warna frame padding hero menjadi putih. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengecilkan padding frame hero menjadi `p-3 md:p-4` dan menyesuaikan inset/height. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-12 | AI Assistant | Mengubah posisi headline/subtitle dari bottom anchored menjadi center vertikal hero. | Waiting for Approval | Build production lolos. |
| 2026-08-12 | AI Assistant | Menambahkan animasi pergantian teks multi-bahasa pada baris welcome: Inggris, Indonesia, Sunda. | Waiting for Approval | Memakai `motion/react` yang sudah ada. Build production lolos. |
| 2026-08-12 | AI Assistant | Menambahkan tint biru tipis `#0036ab` pada top blur/vignette hero. | Waiting for Approval | Tint opacity 28% lalu fade transparan. Build production lolos. |
| 2026-08-12 | AI Assistant | Mempertebal tint top blur `#0036ab` dan memperlebar fade ke bawah. | Waiting for Approval | Gradient menjadi 45% di atas, 18% sampai 55%, lalu transparan. Build tidak dijalankan ulang. |
| 2026-08-14 | AI Assistant | Menambahkan scroll-aware hero: banner sticky mengecil saat scroll, rounded hilang saat compact, dan fixed navbar gradient biru blur muncul setelah hero terlewati. | Waiting for Approval | Memakai `useScroll`, `useTransform`, dan `useMotionValueEvent` dari `motion/react`. Build production lolos. |
| 2026-08-14 | AI Assistant | Menghaluskan shrinking hero dengan numeric height dan `useSpring` agar besar-kecil mengikuti progress scroll secara progressive. | Waiting for Approval | Build production lolos. |
| 2026-08-14 | AI Assistant | Menghapus duplicate fixed navbar dan menjadikan navbar asli ikut transform bersama hero. | Waiting for Approval | Shrink kini direct dari `scrollYProgress` tanpa spring agar tidak lag/patah. Build production lolos. |

**Status Fase 1 saat ini**: `Waiting for Approval`

---

## Fase 2 — Backend Logic CMS

> Tidak boleh dimulai sebelum Fase 1 berstatus **Done** oleh reviewer manusia.

### Input

- **Pattern yang dipakai**: `ContentList`
- **Nama tabel / field tambahan di luar skema generik**:
  - Rekomendasi tabel: `hero_banners`, atau reuse generic content table jika tim memutuskan ada pattern shared untuk Home banners.
  - Field generic wajib: `id`, `jurusan_id`, `title`, `body`, `image_url`, `is_published`, `created_by`, `created_at`, `updated_at`.
  - Field tambahan yang disarankan:
    - `cta_label` text nullable
    - `cta_url` text nullable
    - `sort_order` integer nullable/default 0
  - `jurusan_id` untuk Hero Banner kemungkinan `null` karena school-wide, bukan scoped jurusan.
- **Endpoint API**:
  - `GET /api/hero-banners?page=&limit=` untuk list admin/public.
  - `GET /api/hero-banners/[id]` untuk detail.
  - `POST /api/hero-banners` untuk create.
  - `PUT /api/hero-banners/[id]` untuk update.
  - `DELETE /api/hero-banners/[id]` untuk delete.
  - Semua response wajib pakai envelope `{ success, data, error, meta }`.
- **Role akses**:
  - Public read hanya item `is_published = true`.
  - Mutasi hanya `super_admin` karena Hero Banner adalah konten school-wide.
  - `jurusan_admin` tidak boleh create/update/delete Hero Banner kecuali ada keputusan baru dari reviewer.

### Acceptance Criteria Fase 2

- Admin bisa CRUD Hero Banner.
- Public hanya mengambil banner published.
- Image URL disimpan sebagai URL object storage, bukan base64.
- Upload pipeline mengupayakan output WebP.
- API memakai response envelope standar.
- Role check mencegah `jurusan_admin` mutasi Hero Banner.
- Data bisa diurutkan dengan `sort_order`.

### Execution Log — Fase 2

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-11 | AI Assistant | Mendefinisikan rencana backend CMS untuk Hero Banner. | Not Started | Belum boleh dikerjakan sebelum Fase 1 `Done` oleh reviewer manusia. |

**Status Fase 2 saat ini**: `Not Started`

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Waiting for Approval | | |
| Fase 2 | Not Started | | |
| Fase 3 *(kalau berlaku)* | Tidak berlaku | | |

**Ringkasan status SRS ini**: 🟠 Waiting for Approval
