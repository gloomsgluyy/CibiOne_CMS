# Decision Log — [NAMA_PROJECT]

> Format ADR (Architecture Decision Record). Tambah entri baru di bawah kalau ada keputusan teknis baru — jangan diam-diam berubah pattern tanpa dicatat di sini, supaya AI/programmer lain di sesi lain tahu alasannya.

---

## ADR-001: Next.js 15 (App Router) sebagai base framework

- **Decision**: Pakai Next.js App Router, bukan Vite + React SPA murni, bukan pisah frontend/backend seperti arsitektur microservice.
- **Alasan**: Halaman publik (Berita, Prestasi, Profil Jurusan) butuh SEO supaya bisa diindex Google — SPA client-render kalah di sini. App Router = Server Components (fetch data langsung di server, JS ke client minim = cepat) + Route Handlers built-in jadi backend, satu deploy ke Vercel, tanpa perlu setup server terpisah. Ini juga yang paling cocok dipasangkan dengan shadcn/ui dan Magic UI (keduanya didesain dengan Next.js sebagai target utama).
- **Alternatif dipertimbangkan**:
  - Vite + React SPA — lebih ringan di build time, tapi SEO buruk untuk konten publik dan butuh backend terpisah (nambah kompleksitas untuk tim kecil).
  - Framework terpisah (Express/Encore/Fastify) + frontend terpisah — lebih fleksibel tapi nambah 1 layer deploy & 1 layer network hop, bertentangan dengan requirement "ringan dan kenceng".
- **Impact**: Semua programmer harus paham konsep Server vs Client Component. Route Handlers = satu-satunya tempat backend logic ditulis, jangan bikin server Express terpisah di folder lain.
- **Status**: ✅ Active

---

## ADR-002: Component Registry multi-sumber (Cult UI, UI Layouts, Magic UI, Aura Build, dll), shadcn/ui sebagai basis primitives, disatukan lewat Tailwind token

- **Decision**: Component/template project ini **boleh berasal dari banyak sumber sekaligus** — bukan satu design system eksklusif. Sejauh ini sudah terpakai: **Cult UI, UI Layouts, Magic UI, Aura Build**. Daftar lengkap + mapping ke section ada di `docs/context/component-registry.md`. **shadcn/ui** dipakai sebagai basis hanya untuk elemen generik (button, input, table) yang tidak ada assignment spesifik di registry.
- **Alasan**: Tim desain riset & pilih komponen terbaik per section dari berbagai sumber sesuai kebutuhan visual masing-masing section (bukan dipaksa satu ekosistem) — pendekatan realistis untuk timeline lomba yang ketat. Konsekuensinya: konsistensi visual **tidak bisa** dijaga dengan cara "pilih 1 library favorit lalu jadikan itu satu-satunya sumber" (pendekatan awal yang salah di draf pertama file ini) — harus dijaga lewat token Tailwind yang seragam, apapun sumber komponennya.
- **Alternatif dipertimbangkan**: Pakai satu design system eksklusif (misal shadcn/ui penuh untuk semuanya) — lebih konsisten otomatis tanpa perlu disiplin token, tapi membatasi/membuang riset visual yang sudah dilakukan tim desain dari beberapa sumber.
- **Impact**: Setiap komponen yang di-copy dari sumber manapun **wajib direstyle** mengikuti token di `tailwind.config.ts`, bukan dipakai apa adanya dengan style bawaan sumbernya. `component-registry.md` adalah rujukan wajib untuk tahu "component ini dari mana" — bukan technology stack table di `AI_CONTEXT.md`.
- **Status**: ✅ Active (direvisi 2026-08-11 setelah registry aktual diterima dari tim desain — versi awal ADR ini salah mengasumsikan sumber terbatas ke shadcn/Magic UI/Hero UI)

---

## ADR-003: Drizzle ORM + PostgreSQL (bukan Prisma)

- **Decision**: Pakai Drizzle ORM untuk akses database.
- **Alasan**: Cold-start lebih cepat dibanding Prisma di lingkungan serverless (Vercel functions) — relevan karena tiap request admin/API lewat serverless function. Query-nya lebih dekat ke SQL asli (lebih gampang di-debug programmer yang baru belajar), type-safe dari schema TypeScript.
- **Alternatif dipertimbangkan**: Prisma — DX bagus & dokumentasi banyak, tapi lebih berat dan cold-start lebih lambat; kurang cocok untuk requirement "seringan dan sekenceng mungkin".
- **Impact**: Migration ditulis manual/generate via `drizzle-kit`, bukan Prisma Migrate. Semua tabel didefinisikan di satu file `db/schema.ts`.
- **Status**: ✅ Active

---

## ADR-004: TanStack Query untuk admin/CMS, Server Components untuk halaman publik

- **Decision**: Bukan pakai TanStack Query di semua tempat — hanya dipakai di sisi Admin (`app/admin/**`). Halaman publik fetch data langsung lewat Server Component.
- **Alasan**: Halaman publik: fetch server-side lebih cepat (tidak ada round-trip client), lebih SEO-friendly, tidak butuh caching client-side kompleks karena tidak banyak interaksi. Sisi Admin: banyak form, create/update/delete, butuh optimistic update dan cache invalidation — ini kekuatan utama TanStack Query.
- **Alternatif dipertimbangkan**: Pakai TanStack Query di semua tempat termasuk publik — lebih "seragam" tapi menambah JS bundle & kompleksitas tanpa manfaat nyata di halaman yang mostly read-only publik.
- **Impact**: Programmer perlu paham kapan pakai Server Component fetch vs kapan pakai hook TanStack Query — dijelaskan per section di `architecture.md`.
- **Status**: ✅ Active

---

## ADR-005: Dua pattern konten — `ContentList` vs `SiteSetting`

- **Decision**: Semua konten dinamis dikategorikan ke salah satu dari 2 pattern generik ini (lihat `architecture.md` untuk skema detail), bukan bikin bentuk tabel/API bebas per section.
- **Alasan**: Project ini dikerjakan paralel oleh 3 programmer berbeda lintas sesi chat AI. Tanpa pattern generik yang dipaksakan, tiap orang/tiap sesi AI akan reinvent bentuk API sendiri-sendiri (nama field beda, response shape beda) — bikin frontend admin susah dipakai lintas section.
- **Impact**: Sebelum menulis SRS, PIC wajib menentukan section itu masuk `ContentList` atau `SiteSetting`. Kalau ternyata ada kebutuhan yang tidak cocok keduanya, wajib diajukan sebagai ADR baru, bukan langsung dikerjakan bebas.
- **Status**: ✅ Active

---

## ADR-006: Satu tabel `posts` untuk Berita/Pengumuman/Prestasi/Agenda

- **Decision**: Tidak bikin 4 tabel terpisah untuk Halaman Berita — satu tabel `posts` dengan field `type` (enum: `berita`/`pengumuman`/`prestasi`/`agenda`).
- **Alasan**: Keempat jenis konten ini punya bentuk data identik (judul, tanggal, isi, gambar, jurusan opsional). 3 programmer kemungkinan besar mengerjakan 4 section ini terpisah — kalau masing-masing bikin tabel & API sendiri, hasilnya 4x kode duplikat untuk hal yang sama, dan field/behavior gampang jadi tidak konsisten.
- **Alternatif dipertimbangkan**: 4 tabel terpisah — lebih "jelas" secara nama, tapi menambah kerja duplikat tanpa manfaat teknis nyata di skala data prototype ini.
- **Impact**: Section "Highlight Prestasi" di Home dan "Berita Terbaru" di Home tinggal query `posts` dengan filter `type` berbeda — tidak perlu endpoint terpisah.
- **Status**: ✅ Active

---

## ADR-007: Custom session token (bukan NextAuth/JWT) dengan role scoping

- **Decision**: Auth pakai token random disimpan di tabel `sessions`, cookie httpOnly, expiry 7 hari. Role: `super_admin` dan `jurusan_admin`.
- **Alasan**: Scope login sederhana — hanya admin sekolah & admin per jurusan, tidak ada login publik/pasien seperti platform lain. NextAuth/JWT menambah kompleksitas (provider config, refresh token) yang tidak dibutuhkan untuk 2 role saja.
- **Alternatif dipertimbangkan**: NextAuth.js — lebih "standar industri" tapi over-engineered untuk 2 role sederhana dalam scope lomba.
- **Impact**: Revoke akses = hapus row di `sessions`, langsung efektif (beda dengan JWT yang perlu blocklist tambahan).
- **Status**: ✅ Active

---

## ADR-008: Object storage untuk gambar, BUKAN base64-in-DB

- **Decision**: Semua upload gambar (foto guru, gambar berita, logo jurusan, dll) disimpan via **Vercel Blob** (atau S3-compatible lain), field DB hanya menyimpan `image_url`.
- **Alasan**: Base64-in-DB adalah antipattern yang diketahui membesarkan ukuran row & memperlambat query — ini pelajaran langsung dari prototype lain yang sempat pakai base64 dan harus migrasi ulang sebelum production. Lebih murah dihindari dari awal daripada dibenerin belakangan.
- **Impact**: Butuh setup Vercel Blob (atau alternatif) di awal setup project, sebelum section manapun yang butuh upload gambar mulai dikerjakan.
- **Status**: ✅ Active

---

## ADR-009: Component Reuse Policy (formalisasi Strict Rule #1)

- **Decision**: AI/programmer wajib cek Component Registry tim desain sebelum menulis kode UI apapun. Kalau tersedia → implementasi saja, dilarang generate ulang dari scratch. Kalau tidak tersedia → boleh generate, wajib menyeragamkan dengan komponen lain yang sudah ada.
- **Alasan**: Tim desain sudah investasi waktu riset & kurasi component supaya hasil akhir visual konsisten dan cepat dibangun (memakai template teruji, bukan trial-error dari nol). Kalau AI bebas generate ulang, waktu riset itu sia-sia dan hasil akhir jadi tidak konsisten antar section yang dikerjakan orang/sesi berbeda.
- **Impact**: Setiap SRS wajib mencantumkan referensi component/template yang dipakai di Fase 1 (lihat `SRS_TEMPLATE.md`) — kalau field itu kosong, Fase 1 tidak boleh dimulai.
- **Status**: ✅ Active

---

## ADR-010: CMS content scope for Profil Sekolah and Berita

- **Decision**: Visi/Misi dan Akreditasi menggunakan `SiteSetting` singleton. Guru & Staff, Sarana & Prasarana, serta Kerja Sama Industri menggunakan `ContentList`. Berita dan Prestasi tetap menggunakan tabel `posts` bersama, dengan master `post_categories`, ranking `view_count`, dan editorial flags untuk carousel/highlight.
- **Alasan**: UI saat ini memiliki interaksi dan layout yang harus dipertahankan, tetapi kontennya perlu dikelola CMS. Pemisahan ini menghindari duplikasi tabel/endpoint, memberi super admin kontrol sekolah-wide, dan membatasi jurusan admin pada konten serta kategori jurusannya.
- **Impact**: Category yang sudah dipakai tidak boleh hard-delete dan menjadi nonaktif. Slot bento untuk Sarana/Akreditasi disimpan sebagai enum semantic, bukan class Tailwind. Kontrak lengkap ada di `docs/planning/cms-content-and-collaboration.md`.
- **Status**: ✅ Active (2026-08-20)
