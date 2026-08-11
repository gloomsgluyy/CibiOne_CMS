# Glossary — [NAMA_PROJECT]

> Istilah baku — pakai kata yang sama di seluruh SRS, commit message, dan percakapan dengan AI, supaya tidak ada ambiguitas lintas sesi/lintas orang.

---

## Istilah Domain

| Istilah | Definisi |
|---|---|
| **Section** | Satu blok konten di dalam halaman (contoh: "Hero Banner" adalah section di Halaman Home). Unit kerja terkecil yang punya SRS sendiri. |
| **Jurusan** | Kompetensi keahlian di SMKN 1 Cibinong (contoh: SIJA, TKJ). Punya admin sendiri (`jurusan_admin`) dan bisa punya landing page terpisah. |
| **Component Registry** | Daftar section → component/template/layout spesifik (`docs/context/component-registry.md`), dari berbagai sumber (Cult UI, UI Layouts, Magic UI, Aura Build, dll — tidak dibatasi 1-2 library). Sumber kebenaran untuk Strict Rule #1. |
| **Template Reference** | Entry di Component Registry berupa contoh halaman/dashboard PENUH (bukan 1 component), misal template admin dari Preline/TailAdmin/Flowbite. Kalau ditandai "referensi saja" (biasanya karena premium/berlisensi), dipakai sebagai acuan pattern/struktur, bukan di-copy verbatim. |
| **Layout Pattern** | Entry di Component Registry berupa pola susunan/grid (misal masonry grid), bukan 1 elemen visual spesifik. |
| **Static Content** | Konten yang tidak bisa diubah lewat CMS/admin — hardcode di kode. |
| **Dynamic Content – List** | Konten yang bisa CRUD (create/read/update/delete), jumlahnya banyak/berulang (contoh: daftar berita, daftar guru). |
| **Dynamic Content – Singleton** | Konten yang bisa diedit tapi cuma satu value per key, bukan list (contoh: nomor WhatsApp). |
| **Functional Section** | Bagian yang bukan "konten" biasa, tapi fitur/behavior (contoh: AI Chatbot widget, dashboard admin). |

---

## Istilah Teknis

| Istilah | Definisi |
|---|---|
| **Route Handler** | File `route.ts` di dalam `app/api/**` — tempat backend logic (Next.js App Router) ditulis. |
| **Server Component** | Komponen React yang jalan di server, bisa fetch data langsung tanpa API call terpisah. Dipakai di halaman publik. |
| **Response Envelope** | Bentuk JSON standar semua API: `{ success, data, error, meta }` — lihat `architecture.md`. |
| **ContentList Pattern** | Pattern tabel + CRUD API generik untuk Dynamic Content – List. |
| **SiteSetting Pattern** | Pattern tabel key-value untuk Dynamic Content – Singleton. |
| **Component Layering** | Urutan prioritas sumber komponen: Registry → shadcn/ui → Magic UI → Hero UI (fallback). |
| **ADR** | Architecture Decision Record — format catatan keputusan teknis di `decisions.md`. |

---

## Role & Akses

| Role | Deskripsi |
|---|---|
| `super_admin` | Admin sekolah pusat — akses semua section & `SiteSetting`. |
| `jurusan_admin` | Admin per jurusan — hanya bisa CRUD content yang `jurusan_id`-nya miliknya. |
| Public | Pengunjung website — read-only konten yang published, plus akses chatbot. |

---

## Istilah Alur Kerja SRS (WAJIB dipahami sebelum menulis/mengerjakan SRS apapun)

| Istilah | Definisi |
|---|---|
| **SRS (Software Requirement Spec)** | Dokumen spesifikasi 1 section, ditulis dari `docs/templates/SRS_TEMPLATE.md`, jadi satu-satunya sumber requirement untuk section itu. |
| **Fase / Episode** | Tahap kerja di dalam satu SRS. Standarnya 2 fase: **Fase 1 (Frontend Implementation)** dan **Fase 2 (Backend Logic CMS)** — Fase 2 di-skip kalau kontennya Static. Chatbot punya Fase 3 tambahan (lihat `architecture.md`). |
| **Execution Log** | Catatan progres per fase — apa yang dikerjakan, kapan, dan statusnya. Ditambah (bukan ditimpa) tiap ada progres baru. |
| **Status: Not Started** | Fase belum dikerjakan sama sekali. |
| **Status: In Progress** | Sedang dikerjakan, belum ada yang diajukan untuk direview. |
| **Status: Partial** | Sebagian sudah selesai, sisanya dijelaskan eksplisit di log ("sisa: ..."). |
| **Status: Waiting for Approval** | Sudah selesai dari sisi pengerjaan, menunggu review PIC/tim programming. **AI tidak boleh set status ini jadi Done sendiri.** |
| **Status: Rejected** | Ditolak reviewer, alasan penolakan **wajib** dicatat di log. Kerjaan lanjut dari titik ini setelah revisi, bukan mulai ulang dari nol. |
| **Status: Done** | Disetujui reviewer/tim programming. **Hanya manusia (PIC/reviewer) yang boleh set status ini** — bukan AI. Prasyarat untuk Fase 2 boleh mulai. |
| **Approval Gate** | Aturan bahwa Fase 2 tidak boleh dimulai sebelum Fase 1 = Done. |
