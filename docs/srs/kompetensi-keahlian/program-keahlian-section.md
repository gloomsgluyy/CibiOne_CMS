# SRS - Daftar Program Keahlian

## 1. Metadata

| Field | Isi |
|---|---|
| Halaman | Kompetensi Keahlian |
| Section | Daftar Program Keahlian: focus card, grid, filter, pagination, dan modal detail |
| Tipe konten | Dynamic - List |
| Pattern data | ContentList (resource `jurusan`) |
| PIC programmer | Belum ditetapkan untuk Fase 2 |
| Reviewer / approver | PIC programming |
| Issue / pull request | Belum dibuat |
| Tanggal dibuat | 2026-08-14 |
| Terakhir dirapikan | 2026-08-20 |
| Status SRS | In Progress |

## 2. Referensi Wajib

| Referensi | Lokasi / tautan | Status |
|---|---|---|
| Implementasi UI saat ini | `components/sections/kompetensi-section.tsx` | Ada |
| Halaman pembungkus | `app/(public)/kompetensi-keahlian/page.tsx` | Ada |
| Component Registry | Bagian K, `Aura Build - indie-showcase-56` | Perlu konfirmasi tim desain; belum boleh diklaim sebagai implementasi langsung |
| Sumber konten | `https://profile.smkn1cibinong.sch.id` | Perlu verifikasi ulang PIC konten sebelum seed produksi |
| Arsitektur | `docs/context/architecture.md`, Pattern `ContentList` | Aktif |
| Keputusan teknis | ADR-005 dan ADR-008 di `docs/context/decisions.md` | Aktif |

## 3. Requirement

### Tujuan

Menampilkan seluruh program keahlian SMKN 1 Cibinong secara mudah dieksplorasi. Data jurusan harus dapat dikelola oleh `super_admin` tanpa perubahan kode, sementara pengunjung hanya dapat melihat jurusan aktif dan dipublikasikan.

### Konten dan perilaku

| Elemen | Requirement | Sumber data | Kriteria selesai |
|---|---|---|---|
| Header | Menampilkan judul halaman dan pengantar singkat | Static | Responsif pada mobile dan desktop |
| Filter | Filter `Semua`, `IT`, dan `Teknik` | `category` | Mengatur kartu, focus card, dan pagination secara konsisten |
| Focus card | Menampilkan satu jurusan aktif: logo, kategori, kode, nama, dan deskripsi | `jurusan` | Berpindah saat kartu/pagination dipilih; auto-rotate dapat dijeda |
| Grid kartu | Maksimal 6 jurusan per halaman | `jurusan` | Klik kartu mengubah focus card |
| Modal detail | Menampilkan deskripsi, kompetensi, fokus keahlian, dan prospek karier | `jurusan` | Dapat ditutup tombol, backdrop, dan tombol Escape; fokus keyboard dikelola |
| State data | Seed preview ditampilkan saat API/database belum tersedia atau belum berisi data; API mengganti seed saat mengembalikan data | API / seed lokal | Demo tetap menampilkan 10 jurusan tanpa `DATABASE_URL` |

### Acceptance criteria

- [x] UI focus card, grid, filter, pagination, modal, dan pause/resume telah tersedia pada implementasi Fase 1.
- [x] Data mencakup 10 jurusan: SIJA, RPL, DKV, TKJ, TKP, TP, TOI, TKR, TFLM, dan DPIB.
- [x] Halaman publik menampilkan seed lokal sebagai preview lalu menggantinya dengan data API saat database sudah berisi data.
- [ ] `GET /api/jurusan` mendukung filter kategori, pagination, dan hanya mengembalikan jurusan publik.
- [ ] `super_admin` dapat membuat, mengubah, mengatur urutan, menonaktifkan, dan menghapus jurusan melalui API/admin.
- [ ] Gambar logo dan gambar latar menggunakan URL object storage.
- [ ] UI diuji pada lebar 375 px, 768 px, dan 1280 px; modal dapat digunakan dengan keyboard.

### Di luar scope

- Landing page mandiri untuk tiap jurusan.
- Akses CRUD oleh `jurusan_admin`; resource master jurusan dikelola `super_admin`.
- Analitik, berbagi, dan ekspor PDF.

## 4. Kontrak Data dan API

### Model data `jurusan`

| Field | Tipe | Wajib | Aturan / contoh |
|---|---|---|---|
| `id` | integer | Ya | Primary key |
| `code` | string | Ya | Unik, contoh `SIJA` |
| `name` | string | Ya | Nama pendek untuk UI |
| `full_name` | string | Ya | Nama lengkap program |
| `slug` | string | Ya | Unik, format lowercase kebab-case |
| `category` | enum | Ya | `IT` atau `Teknik` |
| `description` | string | Ya | Ringkasan program |
| `kompetensi` | JSON array string | Ya | Daftar kompetensi yang dipelajari |
| `fokus_keahlian` | JSON array object | Ya | Objek `{ title, icon }`; icon berupa nama/icon yang disetujui UI |
| `prospek` | string | Ya | Ringkasan prospek karier |
| `logo_url` | URL | Ya | URL Vercel Blob/S3 |
| `bg_image_url` | URL | Tidak | Fallback visual ditetapkan UI bila null |
| `website_url` | URL | Tidak | Landing page resmi jurusan bila tersedia |
| `is_active` | boolean | Ya | Default `true`; `false` tidak tampil publik |
| `is_published` | boolean | Ya | Default `true`; draft tidak tampil publik |
| `sort_order` | integer | Ya | Default `0`, urut menaik lalu `name` |
| `created_at`, `updated_at` | timestamptz | Ya | Audit waktu |

### Endpoint

| Method | Route | Tujuan | Akses | Request / query | Respons |
|---|---|---|---|---|---|
| GET | `/api/jurusan` | List publik | Public | `category`, `page`, `limit` | Envelope list + meta |
| GET | `/api/jurusan/[id]` | Detail berdasarkan ID | Public bila aktif-published | - | Envelope satu jurusan |
| POST | `/api/jurusan` | Membuat jurusan | `super_admin` | Seluruh field valid | 201 + envelope |
| PUT | `/api/jurusan/[id]` | Mengubah jurusan | `super_admin` | Field yang dapat diubah | Envelope satu jurusan |
| DELETE | `/api/jurusan/[id]` | Menghapus atau menonaktifkan jurusan | `super_admin` | Strategi diputuskan sebelum implementasi | 204 atau envelope |

### Validasi dan keamanan

- Gunakan Zod di Route Handler untuk create/update serta validasi URL, slug, enum kategori, dan array JSON.
- Semua respons memakai `apiSuccess()` atau `apiError()`.
- Middleware/helper autentikasi harus memastikan endpoint mutasi hanya menerima `super_admin`.
- Upload logo/latar dipisahkan dari tabel dan menyimpan URL hasil Vercel Blob/S3.
- API publik menyaring `is_active = true` dan `is_published = true`.

## 5. Rencana Implementasi

### Fase 1 - Frontend

| Langkah | File terdampak | Bukti uji |
|---|---|---|
| Implementasi focus card, grid, filter, modal, dan auto-rotate | `components/sections/kompetensi-section.tsx` | Uji manual dicatat pada log lama |
| Integrasi section ke halaman publik | `app/(public)/kompetensi-keahlian/page.tsx` | Halaman merender section |
| Perbaikan performa modal dan hover | Komponen section dan `app/globals.css` | Klaim 60 fps perlu diukur ulang sebelum rilis |

**Status Fase 1:** `Done` - disetujui User pada 2026-08-17 (berdasarkan log sebelumnya).

### Fase 2 - CMS / Backend

| Langkah | File terdampak | Bukti uji |
|---|---|---|
| Selaraskan schema Drizzle dengan kontrak data di atas dan buat migrasi | `db/schema.ts`, migrasi Drizzle | Migrasi berhasil pada database kosong |
| Seed 10 jurusan yang telah diverifikasi PIC konten | `db/seed-*` atau mekanisme seed tim | List publik menampilkan 10 data |
| Implementasi GET, detail, dan endpoint mutasi dengan Zod/auth | `app/api/jurusan/**` | Kasus sukses, validasi, 401, 403, dan 404 diuji |
| Gunakan seed lokal untuk preview lalu ganti dengan data API jika tersedia | Halaman publik dan section | Halaman tetap aman saat API kosong/gagal |
| Buat UI admin sesuai template yang sudah disetujui | `app/admin/jurusan/**`, `components/admin/**` | CRUD dan urutan data diuji |

**Status Fase 2:** `Not Started`

### Fase 3 - AI Integration

Tidak berlaku.

## 6. Execution Log

| Tanggal | Fase | Pelaksana | Perubahan / hasil | Status | Catatan atau blocker |
|---|---|---|---|---|---|
| 2026-08-14 | 1 | AI (Kiro) | Membuat SRS awal dan dependensi UI | Done | Riwayat diringkas dari SRS sebelumnya |
| 2026-08-17 | 1 | AI (Kiro) | Membuat focus card, grid 3x2, filter, pagination, modal, dan kontrol auto-rotate | Done | Data masih hardcoded |
| 2026-08-17 | 1 | AI (Kiro) | Mengoptimalkan transisi modal, hover, dan scroll | Done | Perlu benchmark ulang saat data dinamis aktif |
| 2026-08-20 | Dokumentasi | OpenCode | Merapikan SRS dan menyelaraskan requirement Fase 2 dengan arsitektur project | In Progress | Menunggu PIC menetapkan owner Fase 2 dan memverifikasi sumber konten |
| 2026-08-20 | Preview | OpenCode | Menjadikan 10 data jurusan lokal sebagai fallback seed; API menggantikan data ini saat CMS tersedia | Done | Preview tidak membutuhkan `DATABASE_URL` |

## 7. Pengujian dan Handover

| Area | Cara uji | Hasil | Bukti / catatan |
|---|---|---|---|
| TypeScript | Jalankan `npx tsc --noEmit` | Lulus pada 2026-08-20 | Tidak ada output/error |
| Production build | Jalankan `npm run build` dengan `DATABASE_URL` valid | Terblokir konfigurasi | Build memuat `db/index.ts` dan berhenti bila `DATABASE_URL` belum tersedia |
| UI desktop dan mobile | 375 px, 768 px, 1280 px; klik, filter, modal, Escape | Sebagian diklaim selesai | Bukti screenshot/video belum ditautkan |
| API / validasi | Uji list, detail, filter, pagination, input tidak valid | Belum ada | Fase 2 |
| Akses / otorisasi | Public, tanpa sesi, `jurusan_admin`, `super_admin` | Belum ada | Fase 2 |

## 8. Approval Gate

| Fase | Status | Disetujui oleh | Tanggal | Catatan review |
|---|---|---|---|---|
| Fase 1 | Done | User | 2026-08-17 | Tercatat pada SRS sebelumnya |
| Fase 2 | Not Started | | | Menunggu PIC dan implementasi |
| Fase 3 | N/A | | | |

**Ringkasan:** Fase 1 selesai; data jurusan belum dinamis sampai Fase 2 diimplementasikan.
