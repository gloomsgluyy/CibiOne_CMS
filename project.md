# Project Overview — [NAMA_PROJECT]

> Last updated: 2026-08-11

---

## Apa Ini?

[NAMA_PROJECT] adalah CMS website sekolah untuk **SMKN 1 Cibinong**, dibuat untuk **Jagoan Hosting Innovation Competition (JHIC) 2026**. Bedanya dengan website sekolah biasa: pengelolaan kontennya **terdesentralisasi per jurusan** (tiap jurusan/kompetensi keahlian punya akses admin sendiri untuk update konten mereka, tanpa harus lewat satu admin pusat), dan dilengkapi **AI Chatbot** yang menjawab pertanyaan pengunjung berdasarkan basis pengetahuan spesifik tiap jurusan.

Masalah yang diselesaikan:
- Update info jurusan lama makan waktu 3–7 hari kerja karena bottleneck di 1 admin pusat.
- Semua jurusan "tenggelam" di bawah info sekolah umum — padahal tiap jurusan punya prestasi & mitra industri berbeda.
- Tidak ada cara cepat bagi calon siswa untuk dapat jawaban — semua manual.

---

## Site Map — Halaman & Section

> Kolom **Tipe Konten** adalah **usulan awal** berdasarkan sifat datanya — **wajib dikonfirmasi ulang** oleh PIC programmer saat menulis SRS masing-masing section (lihat `docs/templates/SRS_TEMPLATE.md`). Kalau ada section yang menurut tim desain harus beda tipe, itu final call-nya SRS, bukan tabel ini.

### 1. Halaman Home

| Section | Tipe Konten (usulan) | Catatan |
|---|---|---|
| Hero Banner | Dynamic – List | Bisa ganti gambar/headline/CTA per event |
| Sambutan Kepala Sekolah | Dynamic – Singleton | Foto + teks, jarang berubah tapi harus editable (ganti kepsek) |
| Highlight Prestasi | Dynamic – List (auto-pulled) | Ambil N item terbaru dari data Prestasi (lihat halaman Berita) |
| Berita Terbaru | Dynamic – List (auto-pulled) | Ambil N item terbaru dari data Berita |
| Pengumuman | Dynamic – List (auto-pulled) | Ambil dari data Pengumuman |
| Event Sekolah | Dynamic – List (auto-pulled) | Ambil dari data Agenda |
| Video Profil | Dynamic – Singleton | Cukup 1 field URL video (YouTube embed), diedit super admin |
| AI Chatbot | **Functional** (bukan content) | Widget, lihat catatan khusus di `architecture.md` |

### 2. Halaman Profil Sekolah

| Section | Tipe Konten (usulan) | Catatan |
|---|---|---|
| Sejarah | Static | Hardcode, jarang/tidak pernah berubah |
| Visi & Misi | Static | Hardcode |
| Struktur Organisasi | Dynamic – List | Berubah saat ada rotasi jabatan |
| Guru & Staff | Dynamic – List | CRUD penuh, per jurusan bisa scoped |
| Sarana Prasarana | Dynamic – List | CRUD, update tidak sering |
| Akreditasi | Dynamic – Singleton | Update tiap beberapa tahun, tapi harus bisa diedit tanpa redeploy |
| Kerja Sama Industri | Dynamic – List | CRUD, sering bertambah |

### 3. Halaman Kompetensi Keahlian

| Section | Tipe Konten (usulan) | Catatan |
|---|---|---|
| Daftar Jurusan (SIJA, TKJ, ...) | Dynamic – List | Tiap entri: nama, deskripsi singkat, logo, link "Kunjungi Website" (landing page jurusan masing-masing) |

> Halaman jurusan itu sendiri (landing page tiap jurusan) di luar scope 6 halaman utama ini — dianggap produk terpisah per jurusan yang linknya dikelola di sini.

### 4. Halaman Berita

| Section | Tipe Konten (usulan) | Catatan |
|---|---|---|
| Berita | Dynamic – List | |
| Pengumuman | Dynamic – List | |
| Prestasi | Dynamic – List | |
| Agenda | Dynamic – List | |

> **Rekomendasi arsitektur:** keempat section ini punya bentuk data yang sama (judul, tanggal, isi, gambar, jurusan terkait opsional) — direkomendasikan **satu model data `posts`** dengan field `type` (`berita` / `pengumuman` / `prestasi` / `agenda`) daripada 4 tabel terpisah. Detail di `architecture.md`. Ini supaya 3 programmer yang kerja paralel di 4 section ini otomatis pakai API & pattern yang sama, bukan reinvent 4x.

### 5. Halaman Kontak

| Section | Tipe Konten (usulan) | Catatan |
|---|---|---|
| Lokasi | Dynamic – Singleton | Teks alamat |
| Maps | Dynamic – Singleton | Embed URL / lat-long |
| WhatsApp | Dynamic – Singleton | Nomor |
| Email | Dynamic – Singleton | Alamat email |

> Semua section di halaman ini masuk pattern `SiteSetting` — bukan tabel CRUD list, cukup key-value.

### 6. Halaman Admin

| Section | Tipe Konten | Catatan |
|---|---|---|
| Halaman Utama (dashboard) | Functional | Ringkasan aktivitas, bukan content section |
| Chatbot (config) | Functional | Tempat jurusan_admin upload/edit knowledge base chatbot mereka |

---

## Roles

| Role | Akses |
|---|---|
| `super_admin` | Akses semua section di semua halaman, termasuk Static content (lewat kode/config, bukan lewat CMS UI) dan seluruh `SiteSetting` |
| `jurusan_admin` | Hanya bisa CRUD content yang `jurusan_id`-nya = jurusan dia (mis. guru, prestasi, kerja sama industri miliknya sendiri) |
| Public (pengunjung) | Read-only semua Dynamic content yang `is_published = true`, plus akses AI Chatbot |

---

## Status Proyek

Repo: **belum dimulai** (greenfield per 2026-08-11). Urutan kerja yang direkomendasikan:
1. Setup scaffold sesuai `architecture.md` (1 programmer).
2. Setup DB schema dasar: `posts`, `jurusan`, `guru`, `sarana_prasarana`, `kerjasama_industri`, `struktur_organisasi`, `site_settings`, `users`/`sessions`.
3. Baru masing-masing section dikerjakan sebagai SRS terpisah secara paralel oleh 3 programmer, ikuti `docs/templates/SRS_TEMPLATE.md`.
