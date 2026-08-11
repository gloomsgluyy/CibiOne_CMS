# AI_CONTEXT.md — [NAMA_PROJECT] (SMKN 1 Cibinong — JHIC 2026)

> **Baca file ini duluan.** Ini adalah briefing single-source-of-truth untuk AI assistant mana pun (Claude, ChatGPT, Copilot, dll) yang mengerjakan codebase ini, di sesi chat manapun, oleh programmer manapun.
> Last updated: 2026-08-11
> Ganti `[NAMA_PROJECT]` di seluruh file `docs/context/*` setelah nama produk final ditentukan tim desain.

---

## Project Summary

[NAMA_PROJECT] adalah website CMS terdesentralisasi untuk SMKN 1 Cibinong, dibangun untuk kompetisi **Jagoan Hosting Innovation Competition (JHIC) 2026**. Tujuannya: menggantikan website sekolah lama yang lambat diupdate (1 admin pusat, 3–7 hari kerja per update) dengan sistem di mana **tiap jurusan punya kontrol mandiri** atas kontennya sendiri, plus **AI Chatbot** yang menjawab pertanyaan pengunjung 24/7 berdasarkan basis pengetahuan per jurusan.

Ini adalah **prototype/MVP untuk lomba**, dikerjakan lintas sesi "vibe coding" oleh 3 programmer berbeda secara paralel. File-file di `docs/context/` ini ada supaya siapapun (manusia atau AI agent) yang masuk ke sesi baru tetap mengikuti objektif, style, dan struktur data yang sama — **bukan reinvent pattern setiap kali dapat task baru.**

---

## Tim & Pembagian Kerja

| Peran | Jumlah | Tanggung jawab |
|---|---|---|
| Desain & Materi Lomba (PPT, UI layout, riset komponen) | 2 orang | Layout per section, deskripsi SRS, mencari & menentukan component/template dari library (shadcn, Magic UI, Hero UI, dll) |
| Programming | 3 orang | Menulis SRS per section (mengikuti `docs/templates/SRS_TEMPLATE.md`), implementasi Fase 1 & Fase 2, review & approve SRS teman satu tim |

Setiap section (lihat `project.md` untuk daftar lengkap) dikerjakan sebagai **satu SRS terpisah**, oleh satu PIC programmer, dengan phase & execution log wajib (lihat bagian bawah).

---

## Active Technology Stack

| Layer | Teknologi | Alasan singkat (detail di `decisions.md`) |
|---|---|---|
| Framework | **Next.js 15 (App Router)**, TypeScript | SSR/SSG untuk SEO halaman publik (berita, prestasi), API routes built-in = satu deploy, jalan native di Vercel |
| Styling & Component Base | **Tailwind CSS + shadcn/ui** | Copy-paste, no vendor lock, jadi source-of-truth design token |
| Component Sources | **Cult UI, UI Layouts, Magic UI, Aura Build**, dan sumber lain yang dikurasi tim desain — **tidak dibatasi ke 1-2 library** | Daftar aktual dengan link per section ada di `docs/context/component-registry.md` — itu rujukan sebenarnya, bukan tabel ini |
| Component Base (generic) | **shadcn/ui** — dipakai untuk primitives yang tidak dicover sumber manapun (button, input, table, dialog) | Bukan "base design system" tunggal, cuma fallback generik |
| Data fetching (public) | Next.js Server Components — fetch langsung di server | Paling cepat, tanpa JS client tambahan, bagus untuk SEO |
| Data fetching (admin/CMS) | **TanStack Query** | Caching, mutation, optimistic UI untuk dashboard admin yang interaktif |
| ORM & DB | **Drizzle ORM + PostgreSQL** | Ringan, cold-start cepat (cocok serverless/Vercel), type-safe |
| File/Image storage | **Vercel Blob** (atau S3-compatible) | JANGAN base64-in-DB — lihat catatan di `decisions.md` |
| Auth | Custom session token (cookie httpOnly) + role (`super_admin` / `jurusan_admin`) | Simple, cukup untuk scope prototype, scoping akses per jurusan built-in |
| Deployment | Vercel | Zero-config, gratis untuk kebutuhan lomba/demo |

Repo saat ini **belum ada scaffold** — ini masih greenfield. Programmer pertama yang mulai wajib set up struktur folder sesuai `architecture.md` sebelum siapapun mulai isi section masing-masing.

---

## 🔒 STRICT RULE #1 — Component & Template Reuse (WAJIB DIIKUTI TANPA KECUALI)

Tim desain sudah menyediakan **Component Registry** (`docs/context/component-registry.md`) — daftar section → component/template/layout spesifik. **Sumbernya beragam dan tidak terbatas ke satu-dua library** — sejauh ini sudah ada entry dari Cult UI, UI Layouts, Magic UI, dan Aura Build. **Jangan pernah berasumsi komponen cuma datang dari library tertentu** — cek daftar aktual di `docs/context/component-registry.md` (file hidup, terus bertambah) sebelum menulis kode UI apapun.

**Registry ini bukan cuma potongan component kecil.** Ada 3 jenis entry (lihat kolom "Tipe" di `component-registry.md`):
- **Component** — potongan UI siap pakai, di-copy langsung.
- **Layout Pattern** — pola susunan/grid, bukan 1 elemen visual.
- **Template Reference** — contoh halaman/dashboard PENUH dari situs lain (misal template admin dashboard). Untuk tipe ini, cek kolom "Cara Pakai": kalau ditandai **"Referensi struktur/visual saja"** (misal karena premium/berlisensi seperti Preline CMS Admin), tugas AI adalah **membangun ulang mengikuti pattern/struktur yang terlihat** — ini BUKAN pelanggaran rule "dilarang scratch", karena template itu sendiri memang tidak boleh di-copy verbatim. Kalau ditandai "Implementasi langsung", perlakukan seperti Component biasa di poin 2 di bawah.

**Alur wajib untuk setiap section:**

1. **Cek Component Registry dulu.** Apakah section ini punya component/template yang sudah ditentukan?
2. **Kalau ADA** → tugas AI/programmer HANYA **mengimplementasikan/mengintegrasikan** component/template tersebut ke dalam project. **DILARANG KERAS** menulis ulang, "meningkatkan", atau membangun ulang dari nol versi sendiri — walaupun AI merasa bisa membuat versi yang "lebih bagus". Modifikasi yang diizinkan hanya: sesuaikan data/props, sesuaikan warna ke design token project, sesuaikan copy teks bahasa Indonesia.
3. **Kalau TIDAK ADA di registry** → *baru* boleh generate sendiri, dengan syarat:
   - Wajib menyeragamkan gaya (spacing, radius, warna, tipografi) dengan komponen lain yang sudah dipakai di halaman/project yang sama, ATAU
   - Ikuti instruksi spesifik tambahan dari tim desain/user.
4. **Kalau ragu apakah sudah ada di registry atau belum** → tanya dulu ke user/PIC, jangan asumsi "belum ada" lalu langsung generate dari scratch.

> **Ini adalah rule paling sering dilanggar oleh AI coding assistant secara default** (kecenderungan alami AI adalah menulis semuanya dari nol). Programmer WAJIB menolak (Reject) hasil kerja AI yang melanggar rule ini di execution log, walau secara visual hasilnya bagus.

---

## 🔒 STRICT RULE #2 — Static vs Dynamic Content

Setiap section punya klasifikasi wajib (ditentukan final saat penulisan SRS, tapi standarnya didefinisikan di sini — lihat juga `architecture.md` untuk pattern teknisnya):

| Tipe | Definisi | Konsekuensi teknis |
|---|---|---|
| **Static** | Tidak bisa diubah lewat CMS/admin. Contoh: logo sekolah, nama sekolah, visi & misi, sejarah. | Hardcode di kode/config. **Tidak butuh tabel DB, tidak butuh API, tidak butuh form admin.** Fase 2 SRS otomatis di-skip. |
| **Dynamic – List** | Bisa ditambah/ubah/hapus, jumlahnya banyak/berulang. Contoh: berita, guru, prestasi, kerja sama industri. | Tabel DB + CRUD API + form admin, ikuti pattern `ContentList` di `architecture.md`. |
| **Dynamic – Singleton** | Bisa diubah tapi cuma satu record/value per key, bukan list. Contoh: nomor WhatsApp, alamat, embed maps. | Pattern `SiteSetting` (key-value), bukan tabel CRUD penuh. |

AI **tidak boleh** memutuskan sendiri sebuah section itu static atau dynamic kalau belum ditentukan di SRS — itu keputusan tim desain/programming, bukan asumsi AI.

---

## Repository Rules

1. Struktur folder ikut Next.js App Router convention — detail di `architecture.md`.
2. Setiap resource dinamis (berita, guru, jurusan, dll) API route-nya ikut pattern `/api/{resource}` — **jangan bikin pattern baru per programmer.**
3. Setiap section = satu file SRS di `docs/srs/<halaman>/<section>.md`, dibuat dari `docs/templates/SRS_TEMPLATE.md`. **Jangan mulai coding sebelum SRS-nya ada dan Fase 1-nya terisi.**
4. Bahasa UI & konten = Bahasa Indonesia. Kode (variabel, komentar, commit message) = Bahasa Inggris.
5. Commit message diprefix nama fase: `[Fase1]`, `[Fase2]`, `chore:`, `fix:`.

---

## Coding Conventions

- TypeScript strict mode.
- Komponen React: functional component, named export dari folder `components/`.
- Styling: Tailwind utility classes saja, tidak ada CSS module/styled-components tambahan supaya konsisten dengan shadcn/Magic UI.
- Form & validasi: `zod` untuk schema validation, dipakai di client dan server (server actions/route handlers) supaya satu source of truth validasi.
- Response API selalu pakai envelope yang sama — lihat `architecture.md`.

---

## Things AI Should NEVER Do

1. **Menulis UI dari scratch** kalau component/template-nya sudah ada di Component Registry (lihat Strict Rule #1).
2. **Menandai status SRS sendiri jadi "Done".** Status "Done" hanya boleh diubah oleh reviewer/PIC programming setelah approve — AI hanya boleh mengajukan "Waiting for Approval".
3. **Mulai Fase 2 (backend logic)** sebelum Fase 1 section itu berstatus **Done**.
4. **Menyimpan gambar sebagai base64 di database.** Selalu pakai object storage (Vercel Blob).
5. **Membuat tabel/endpoint baru di luar pattern `ContentList`/`SiteSetting`** tanpa alasan kuat — kalau memang perlu pattern baru, catat sebagai proposal ADR baru di `decisions.md`, jangan diam-diam bikin sendiri.
6. **Mencampur banyak library komponen dalam satu section** tanpa menyeragamkan visualnya (lihat urutan prioritas: shadcn/ui → Magic UI → Hero UI sebagai fallback terakhir).

---

## Dokumen yang Wajib Dibaca AI Sebelum Edit Apapun

| Prioritas | File | Isi |
|---|---|---|
| 1 | `docs/context/AI_CONTEXT.md` (file ini) | Rule inti, jangan dilanggar |
| 2 | `docs/context/project.md` | Peta halaman & section, klasifikasi konten |
| 3 | `docs/context/architecture.md` | Stack teknis, pattern backend, struktur folder |
| 4 | `docs/context/decisions.md` | Alasan tiap keputusan teknis (ADR) |
| 5 | `docs/context/glossary.md` | Istilah baku supaya semua orang/AI pakai kata yang sama |
| 6 | `docs/templates/SRS_TEMPLATE.md` | Template wajib untuk tiap SRS section |
| 7 | `docs/context/component-registry.md` | Daftar aktual component/template per section, dengan link — **ini yang dicek, bukan asumsi dari technology stack table di atas** |
| 8 | `docs/srs/<halaman>/<section>.md` | SRS spesifik section yang sedang dikerjakan |
