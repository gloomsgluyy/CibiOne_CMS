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

## ADR-002: shadcn/ui sebagai base design system, Magic UI sebagai extension, Hero UI sebagai fallback terakhir

- **Decision**: Prioritas komponen: (1) Component Registry tim desain, (2) shadcn/ui, (3) Magic UI, (4) Hero UI hanya kalau tidak ada pilihan lain.
- **Alasan**: shadcn/ui bukan library ter-install, tapi kode yang di-copy ke project — jadi otomatis jadi "milik" project ini dan gampang di-theming lewat Tailwind token, tanpa vendor lock-in. Magic UI dibangun di atas fondasi yang sama (Tailwind + Radix) jadi visualnya nyambung natural untuk block marketing/animasi (hero, showcase). Hero UI (dulu NextUI) punya sistem theming sendiri yang terpisah dari Tailwind biasa — kalau dipakai bebas tanpa restyle, hasilnya kelihatan "nyampur" dan melanggar prinsip konsistensi visual yang diminta project ini.
- **Alternatif dipertimbangkan**: Pakai satu library saja (misal Hero UI penuh) — lebih konsisten otomatis, tapi Component Registry tim desain sudah mereferensikan campuran dari beberapa sumber (Aurora, Cult UI, dll), jadi realistisnya tetap perlu strategi layering, bukan satu library eksklusif.
- **Impact**: Semua warna/spacing/radius didefinisikan sekali di `tailwind.config.ts`; komponen dari sumber manapun wajib pakai token itu, bukan hex/style bawaan library asal.
- **Status**: ✅ Active

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
