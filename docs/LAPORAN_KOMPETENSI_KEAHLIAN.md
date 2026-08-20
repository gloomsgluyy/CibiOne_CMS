# Laporan Perubahan - Section Kompetensi Keahlian

> Tanggal laporan: 2026-08-20
> Scope: `app/(public)/kompetensi-keahlian`, `components/sections/kompetensi-section.tsx`, API dan dokumentasi jurusan terkait.

## Ringkasan

Section Kompetensi Keahlian telah memiliki implementasi frontend interaktif untuk 10 program keahlian SMKN 1 Cibinong. Perubahan utamanya adalah pola tampilan focus card dan grid, filter kategori, navigasi halaman, modal detail, serta kontrol auto-rotate. Fase frontend tercatat selesai pada 2026-08-17.

Status saat laporan dibuat: tampilan publik menggunakan 10 data lokal sebagai **seed preview**, lalu mencoba memuat API jurusan. Jika API/database belum tersedia atau belum memiliki data, seed tetap ditampilkan agar demo dapat berjalan tanpa `DATABASE_URL`. Saat API mengembalikan data, UI otomatis memakai data tersebut.

## Perubahan Yang Sudah Ada

| Area | Perubahan | Lokasi |
|---|---|---|
| Halaman publik | Menambahkan halaman Kompetensi Keahlian yang me-render section utama | `app/(public)/kompetensi-keahlian/page.tsx` |
| Data tampilan | Menambahkan 10 data jurusan: SIJA, RPL, DKV, TKJ, TKP, TP, TOI, TKR, TFLM, DPIB | `components/sections/kompetensi-section.tsx` |
| Focus card | Kartu besar menampilkan logo, kategori, kode, nama lengkap, deskripsi, dan tautan detail | `components/sections/kompetensi-section.tsx` |
| Grid jurusan | Grid tiga kolom dan dua baris, maksimal enam kartu per halaman | `components/sections/kompetensi-section.tsx` |
| Filter | Filter `All`, `IT`, `Teknik` | `components/sections/kompetensi-section.tsx` |
| Pagination | Dot pagination saat jumlah data lebih dari enam | `components/sections/kompetensi-section.tsx` |
| Detail | Modal berisi program, kompetensi, fokus keahlian, dan prospek karier | `components/sections/kompetensi-section.tsx` |
| Interaksi | Auto-rotate lima detik, pause/resume, animasi Framer Motion, penutupan modal melalui backdrop | `components/sections/kompetensi-section.tsx` |
| Performa | Durasi transisi dipersingkat dan animasi berat pada area scroll dikurangi | `components/sections/kompetensi-section.tsx` |

## Konten Jurusan Saat Ini

| Kategori | Jurusan |
|---|---|
| IT | SIJA, RPL, DKV, TKJ |
| Teknik | TKP, TP, TOI, TKR, TFLM, DPIB |

Setiap item saat ini memiliki kode, nama lengkap, deskripsi, kategori, daftar kompetensi, fokus keahlian, prospek karier, logo, dan gambar latar. Informasi awal disebut berasal dari website profil resmi sekolah; PIC konten tetap perlu memverifikasi ulang fakta dan aset sebelum publikasi produksi.

## Gap Menuju Konten Dinamis

| Kebutuhan | Kondisi sekarang | Tindakan wajib |
|---|---|---|
| Schema `jurusan` | Hanya memiliki field generik `title`, `slug`, `body`, `imageUrl`, dan status publikasi | Tambahkan field khusus: kode, nama, kategori, kompetensi, fokus, prospek, logo/latar, urutan, dan status aktif |
| List API | `GET /api/jurusan` selalu mengembalikan array kosong | Query database, filter kategori, pagination, dan filter data publik |
| Detail API | Endpoint detail mengembalikan `501 NOT_IMPLEMENTED` | Implementasikan detail, 404, serta filter publish/aktif |
| CRUD | Tidak ada POST/PUT/DELETE | Implementasikan validasi Zod dan otorisasi `super_admin` |
| UI publik | Seed lokal dipakai sebagai fallback preview | API sudah dicoba saat halaman dimuat; tambahkan status sinkronisasi/admin bila diperlukan |
| Data awal | Belum ada seed/migrasi untuk 10 jurusan | Tambahkan migration dan seed yang telah disetujui PIC konten |
| Media | Path gambar lokal digunakan langsung | Pindahkan aset yang dikelola CMS ke Vercel Blob/S3 dan simpan URL |
| Admin | Belum tersedia | Buat halaman manajemen jurusan setelah API siap |

## Keputusan Dokumentasi

- SRS jurusan dirapikan pada `docs/srs/kompetensi-keahlian/program-keahlian-section.md` agar mengikuti template baru dan kondisi codebase yang sebenarnya.
- `docs/context/SRS_TEMPLATE.md` diringkas menjadi format operasional: metadata, referensi, requirement, kontrak data/API, rencana fase, log, pengujian, dan approval.
- Status Fase 1 tetap tercatat `Done` sesuai approval sebelumnya. Status Fase 2 tetap `Not Started`; laporan ini tidak mengklaim backend telah selesai.

## Rekomendasi Implementasi Berikutnya

1. Tetapkan PIC Fase 2 dan verifikasi konten serta aset 10 jurusan.
2. Ubah schema dan buat migration sebelum memodifikasi UI, karena frontend perlu kontrak data stabil.
3. Buat seed data untuk seluruh jurusan sehingga halaman tidak kosong pada deployment baru.
4. Implementasikan GET list/detail terlebih dahulu, lalu ganti sumber data pada halaman publik.
5. Tambahkan autentikasi dan otorisasi `super_admin` sebelum membuka endpoint mutasi.
6. Buat admin CRUD dan uji upload media object storage setelah API aman.

## Batasan Laporan

Laporan ini merupakan audit dokumentasi dari file yang ada, bukan bukti bahwa klaim performa 60 fps, kompatibilitas lintas-browser, atau aksesibilitas telah diuji ulang. Bukti tersebut perlu dicatat pada bagian pengujian SRS saat Fase 2 dan sebelum rilis.

Pemeriksaan `npx tsc --noEmit` lulus pada 2026-08-20 setelah perubahan dokumentasi dan integrasi list API. `npm run build` belum dapat diselesaikan di workspace ini karena `DATABASE_URL` belum tersedia; koneksi database saat ini diwajibkan saat modul database dimuat.
