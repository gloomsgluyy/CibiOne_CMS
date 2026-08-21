# SRS UI Admin CMS

> Status: Draft untuk desain.  
> Tanggal: 2026-08-20  
> Acuan backend: `db/schema.ts`, `docs/planning/04-api-and-authorization-contract.md`.

## 1. Tujuan

Mendefinisikan halaman admin CMS SMKN 1 Cibinong agar desain menyediakan seluruh data, aksi, state, dan pembatasan role yang didukung backend MVP. Ini bukan referensi visual; desainer bebas menentukan gaya selama requirement interaksi dipenuhi.

## 2. Aturan Global

| Area | Requirement desain |
|---|---|
| Bahasa | Seluruh label, bantuan, validasi, dan empty state: Bahasa Indonesia. |
| Layout desktop | Sidebar permanen, top bar, area konten, breadcrumb. |
| Layout mobile | Sidebar menjadi drawer; top bar memuat pemicu drawer; tabel menjadi kartu atau tabel horizontal-scroll. |
| Top bar | Nama/role pengguna, konteks jurusan bila `jurusan_admin`, menu akun, keluar. Jangan tampilkan data sensitif. |
| Session | Saat sesi habis: arahkan ke `/login`; tampilkan pesan singkat. |
| Loading | Skeleton per kartu, tabel, editor, dan preview. Jangan gunakan halaman kosong. |
| Empty | Ilustrasi/teks, penjelasan singkat, CTA tambah data bila role berhak. |
| Error | Alert inline untuk gagal memuat; field error untuk `422`; pesan konflik slug untuk `409`; CTA coba lagi. |
| Mutasi | Tombol submit punya state loading dan disabled. Toast sukses/gagal. Refetch data setelah sukses. |
| Konfirmasi | Unpublish/hapus membutuhkan modal konfirmasi berisi nama record dan dampak publikasi. |
| Upload | Dropzone + pilih file + preview + progress + hapus/ganti. Hanya JPEG, PNG, WebP, AVIF; maksimum 5 MB. |
| Aksesibilitas | Label form eksplisit, focus state, navigasi keyboard, kontras AA, modal fokus-terkunci, alt text gambar. |
| API envelope | Sukses `{ success, data, meta? }`; gagal `{ success: false, error: { code, message } }`. |

## 3. Navigasi dan Role

| Menu | Route desain | `super_admin` | `jurusan_admin` |
|---|---|---:|---:|
| Dashboard | `/admin` | Ya | Ya |
| Konten | `/admin/konten` | Ya | Ya, data jurusan sendiri |
| Kategori Konten | `/admin/kategori-konten` | Ya | Ya, kategori jurusan sendiri |
| Guru & Staff | `/admin/guru` | Ya | Ya, data jurusan sendiri |
| Kategori Guru | `/admin/kategori-guru` | Ya | Ya, kategori jurusan sendiri |
| Sarana & Prasarana | `/admin/sarana-prasarana` | Ya | Tidak |
| Mitra Industri | `/admin/mitra-industri` | Ya | Ya, data jurusan sendiri |
| Pengaturan | `/admin/pengaturan` | Ya | Tidak |

`jurusan_admin` tidak boleh diberi kontrol pemilih jurusan. Backend menentukan `jurusanId` dari session. `super_admin` dapat memilih jurusan atau `Sekolah (umum)` pada resource yang mendukung scope jurusan.

## 4. Halaman Login

| Item | Requirement |
|---|---|
| Route | `/login` |
| Tujuan | Memulai sesi admin. |
| Field | `email` (email wajib), `password` (wajib), toggle tampilkan password. |
| Aksi | Masuk; submit dengan Enter. |
| API | `POST /api/auth/login`. |
| Sukses | Redirect ke `/admin`. |
| Gagal | Kredensial tidak valid, akun nonaktif, rate limit, jaringan. Jangan bedakan email/password salah. |
| Tidak ada | Pendaftaran, lupa password, login sosial. Belum ada backend. |

## 5. Dashboard

| Item | Requirement |
|---|---|
| Route | `/admin` |
| Tujuan | Ringkasan jumlah data yang dapat dikelola pengguna aktif. |
| Widget 1 | Kartu `Konten`: total seluruh `posts` dalam scope pengguna. CTA: `Kelola konten`. |
| Widget 2 | Kartu `Guru & Staff`: total `guru` dalam scope pengguna. CTA: `Kelola guru`. |
| Widget 3 | Kartu `Mitra Industri`: total `kerjasama_industri` dalam scope pengguna. CTA: `Kelola mitra`. |
| Widget 4 | Kartu `Sarana & Prasarana`: total `sarana_prasarana`. CTA: `Kelola sarana`; sembunyikan dari `jurusan_admin`. |
| Data | Server query `getDashboardSummary(session)`. Nilai: `posts`, `guru`, `partners`, `facilities`. |
| State | Loading skeleton empat kartu; zero count tetap `0`; gagal muat alert + coba lagi. |
| Tidak ada | Grafik views, total views, top posts, quality score, activity log, tren/perbandingan periode. Backend belum menyediakan metrik tersebut. |

## 6. Konten: Daftar

| Item | Requirement |
|---|---|
| Route | `/admin/konten` |
| Tujuan | Menemukan, memfilter, membuat, mengubah, menerbitkan, atau menyembunyikan Berita/Pengumuman/Prestasi/Agenda. |
| Header | Judul, deskripsi singkat, tombol `Tambah konten`. |
| Filter | Tipe: Berita, Pengumuman, Prestasi, Agenda; kategori; jurusan untuk `super_admin`; status: semua/terbit/draft. Status belum didukung parameter API, desain simpan sebagai filter UI yang memerlukan kontrak backend sebelum implementasi. |
| Urutkan | Terbaru, Terpopuler. API mendukung `sort=latest|popular`. |
| Tabel/kartu | Thumbnail, judul, tipe, kategori, scope jurusan/sekolah, status, terbit pada, featured, highlighted, views, aksi. |
| Aksi per record | Lihat/edit, publish/unpublish lewat form edit, hapus/unpublish dengan konfirmasi. `DELETE` saat ini mengubah `isPublished=false`, bukan hard delete. |
| Pagination | Nomor halaman, sebelumnya/berikutnya, total item. `limit` 1-50; default 10. |
| API | `GET /api/posts?type=&category=&jurusan_id=&featured=&highlighted=&sort=&page=&limit=`; `POST /api/posts`; detail/mutasi `/api/posts/[id]`. |
| Role | `jurusan_admin` hanya melihat record scope sendiri; filter jurusan tidak boleh mengubah scope tersebut. |

## 7. Konten: Tambah/Edit

| Item | Requirement |
|---|---|
| Route | `/admin/konten/baru`, `/admin/konten/[id]` |
| Header | Breadcrumb, judul `Tambah konten`/`Edit konten`, badge Draft/Terbit, aksi `Simpan draft`, `Terbitkan` atau `Simpan perubahan`, `Batal`. |
| Identitas | `type` wajib: berita/pengumuman/prestasi/agenda; `title` wajib maks. 240; `slug` wajib, lowercase kebab-case, maks. 240; `categoryId` opsional. |
| Isi | `excerpt` opsional maks. 500; `body` Markdown opsional maks. 50.000; editor Markdown dengan preview aman. Jangan desain rich-text HTML editor. |
| Media | `imageUrl` utama opsional; `galleryUrls` maks. 20. Upload memakai `POST /api/uploads`; URL hasil upload dimasukkan form. |
| Waktu | `eventDate` wajib bila type `agenda`; `publishedAt` wajib saat terbit, dapat dijadwalkan/dipilih. Backend otomatis mengisi waktu sekarang bila publish tanpa tanggal. |
| Penayangan | `isPublished`; `isFeatured` + `featuredOrder`; `isHighlighted` + `highlightOrder`; `isPopularOverride`. Tampilkan field urutan hanya saat toggle terkait aktif. |
| Scope | Pemilih jurusan/sekolah hanya `super_admin`; hidden dan server-controlled bagi `jurusan_admin`. |
| Validasi | Validasi inline sesuai batas di atas; error API `422` harus dipetakan ke field; slug duplikat `409`. |
| API | Baru: `POST /api/posts`. Edit: `GET`/`PUT /api/posts/[id]`. |

## 8. Kategori Konten

| Item | Requirement |
|---|---|
| Route | `/admin/kategori-konten` |
| Tujuan | Master kategori untuk posts. |
| Tampilan | Tabel/kartu: nama, slug, deskripsi, scope jurusan/sekolah, status aktif, dibuat/diubah, aksi. |
| Form modal/drawer | `name` wajib maks. 120; `slug` wajib kebab-case maks. 120; `description` opsional maks. 500; `jurusanId`; `isActive`. |
| Aksi | Tambah, edit, aktif/nonaktif, hapus dengan konfirmasi. Kategori yang terkait post harus dinonaktifkan, bukan dihapus permanen. |
| API | `GET`/`POST /api/post-categories`; `PUT`/`DELETE /api/post-categories/[id]`. |
| Role | `super_admin`: kategori sekolah atau jurusan; `jurusan_admin`: jurusan sendiri saja. |

## 9. Guru & Staff: Daftar

| Item | Requirement |
|---|---|
| Route | `/admin/guru` |
| Tujuan | Mengelola daftar Guru & Staff untuk halaman publik. |
| Header | Judul, filter kategori, filter jurusan untuk `super_admin`, tombol `Tambah guru/staff`. |
| Tabel/kartu | Foto, nama, jabatan, kategori, scope jurusan/sekolah, urutan, status, aksi. |
| Aksi | Tambah, edit, publish/unpublish, hapus/unpublish dengan konfirmasi. |
| Pagination | Nomor halaman, sebelumnya/berikutnya, total. |
| API | `GET /api/guru?category=&jurusan_id=&page=&limit=`; `POST /api/guru`; detail/mutasi `/api/guru/[id]`. |
| Role | Scope identik dengan Konten. |

## 10. Guru & Staff: Tambah/Edit

| Item | Requirement |
|---|---|
| Route | `/admin/guru/baru`, `/admin/guru/[id]` |
| Field | `name` wajib maks. 160; `position` opsional maks. 160; `bio` opsional maks. 5.000; `imageUrl` opsional; `categoryId` opsional; `sortOrder` minimum 0; `isPublished`. |
| Media | Upload foto dengan aturan global; preview rasio foto yang dipakai halaman publik. |
| Scope | Pemilih jurusan/sekolah hanya `super_admin`; server memaksa scope `jurusan_admin`. |
| Aksi | Simpan draft, terbitkan/simpan, batalkan. |
| API | `POST /api/guru`; `GET`/`PUT /api/guru/[id]`; upload `/api/uploads`. |

## 11. Kategori Guru

| Item | Requirement |
|---|---|
| Route | `/admin/kategori-guru` |
| Tujuan | Master filter/kategori Guru & Staff. |
| Tampilan | Tabel: nama, slug, urutan, scope jurusan/sekolah, status aktif, aksi. |
| Form | `name` wajib maks. 120; `slug` kebab-case wajib; `sortOrder` minimum 0; `jurusanId`; `isActive`. Deskripsi tidak dipersist untuk kategori guru. |
| Aksi | Tambah, edit, aktif/nonaktif, hapus dengan konfirmasi. |
| API | `GET`/`POST /api/guru-categories`; `PUT`/`DELETE /api/guru-categories/[id]`. |
| Role | Scope identik dengan Konten. |

## 12. Sarana & Prasarana: Daftar

| Item | Requirement |
|---|---|
| Route | `/admin/sarana-prasarana` |
| Tujuan | Mengelola fasilitas sekolah pada halaman publik. |
| Role | `super_admin` saja. Jangan tampilkan menu/route kepada `jurusan_admin`. |
| Tabel/kartu | Gambar, judul, presentation slot, urutan, status, aksi. |
| Aksi | Tambah, edit, publish/unpublish, hapus/unpublish dengan konfirmasi. |
| Pagination | Nomor halaman, sebelumnya/berikutnya, total. |
| API | `GET /api/sarana-prasarana?page=&limit=`; `POST /api/sarana-prasarana`; detail/mutasi `/api/sarana-prasarana/[id]`. |

## 13. Sarana & Prasarana: Tambah/Edit

| Item | Requirement |
|---|---|
| Route | `/admin/sarana-prasarana/baru`, `/admin/sarana-prasarana/[id]` |
| Field | `title` wajib maks. 240; `description` opsional maks. 5.000; `imageUrl` opsional; `presentationSlot`: `featured_large`, `standard`, `tall`, `wide`; `sortOrder` minimum 0; `isPublished`. |
| Preview | Wajib menyediakan preview slot agar desainer/editor memahami dampak ukuran kartu publik. |
| Media | Upload gambar dengan aturan global. |
| API | `POST /api/sarana-prasarana`; `GET`/`PUT /api/sarana-prasarana/[id]`; upload `/api/uploads`. |

## 14. Mitra Industri: Daftar

| Item | Requirement |
|---|---|
| Route | `/admin/mitra-industri` |
| Tujuan | Mengelola logo dan informasi kerja sama industri. |
| Tabel/kartu | Logo, nama, URL website, scope jurusan/sekolah, urutan, status, aksi. |
| Aksi | Tambah, edit, publish/unpublish, hapus/unpublish dengan konfirmasi. |
| Pagination | Nomor halaman, sebelumnya/berikutnya, total. |
| API | `GET /api/kerjasama-industri?jurusan_id=&page=&limit=`; `POST /api/kerjasama-industri`; detail/mutasi `/api/kerjasama-industri/[id]`. |
| Role | `super_admin` semua scope; `jurusan_admin` scope sendiri. |

## 15. Mitra Industri: Tambah/Edit

| Item | Requirement |
|---|---|
| Route | `/admin/mitra-industri/baru`, `/admin/mitra-industri/[id]` |
| Field | `name` wajib maks. 240; `logoUrl` opsional; `description` opsional maks. 5.000; `websiteUrl` opsional URL/path valid; `jurusanId`; `sortOrder` minimum 0; `isPublished`. |
| Media | Upload logo dengan aturan global; preview bentuk logo di kartu publik. |
| Scope | Pemilih jurusan/sekolah hanya `super_admin`; server memaksa scope `jurusan_admin`. |
| API | `POST /api/kerjasama-industri`; `GET`/`PUT /api/kerjasama-industri/[id]`; upload `/api/uploads`. |

## 16. Pengaturan: Indeks

| Item | Requirement |
|---|---|
| Route | `/admin/pengaturan` |
| Role | `super_admin` saja. |
| Tampilan | Dua kartu navigasi: `Visi & Misi`, `Akreditasi`; status terakhir diubah bila tersedia. |
| Tidak ada | Pengaturan hero, sambutan kepala sekolah, video profil, kontak, struktur organisasi. Item tersebut di luar scope CMS saat ini. |

## 17. Pengaturan: Visi & Misi

| Item | Requirement |
|---|---|
| Route | `/admin/pengaturan/visi-misi` |
| Data | Key `school_vision_mission`. API `GET`/`PUT /api/settings/school_vision_mission`. |
| Field umum | `backgroundImageUrl` wajib. Gunakan upload gambar. |
| Panel visi | `title` maks. 160; `subtitle` maks. 240; `description` maks. 5.000; `points` 0-12 item: `title` maks. 160, `description` maks. 2.000. |
| Panel misi | Field dan batas identik dengan visi. |
| Tampilan | Form terstruktur/repeater, preview publik, simpan, batalkan, timestamp terakhir diubah. |
| Validasi | Error field-level. Jangan gunakan input JSON mentah sebagai UI utama. |

## 18. Pengaturan: Akreditasi

| Item | Requirement |
|---|---|
| Route | `/admin/pengaturan/akreditasi` |
| Data | Key `school_accreditation`. API `GET`/`PUT /api/settings/school_accreditation`. |
| Field umum | `heading` maks. 240; `description` maks. 5.000. |
| Kartu | Maks. 12 kartu. Per kartu: `slot` wajib (`featured_large`, `standard`, `tall`, `wide`); `title` maks. 240; `description` maks. 2.000; `tag` maks. 120; `cardType` `image|text`; `imageUrl` nullable. |
| Interaksi | Tambah, edit, hapus, urutkan kartu. Saat `cardType=image`, tampilkan upload gambar; saat `text`, sembunyikan field gambar. |
| Tampilan | Preview grid kartu menurut slot, simpan, batalkan, timestamp terakhir diubah. |

## 19. Akun dan Keluar

| Item | Requirement |
|---|---|
| Route | Menu popover global; halaman profil tidak diperlukan untuk MVP. |
| Informasi | Role; konteks jurusan bila ada; expiry sesi opsional. Jangan tampilkan email jika DTO belum menyediakannya. |
| Aksi | `Keluar` dengan konfirmasi ringan. API `POST /api/auth/logout`; redirect `/login`. |
| Tidak ada | Ubah profil, ubah password, manajemen akun. Belum ada endpoint. |

## 20. Ditahan: Jangan Didisain sebagai Halaman Operasional MVP

| Fitur | Alasan |
|---|---|
| Dashboard analytics | Tidak ada event/time-series views, top posts, activity log, atau content-quality API. |
| Media library | Upload satu file tersedia; list/delete media dan lifecycle orphan belum ada. |
| Manajemen pengguna | Tabel user ada, API CRUD user tidak ada. |
| Manajemen jurusan | API hanya public read; belum ada mutasi admin. |
| Knowledge chatbot | Tabel ada, tetapi CRUD knowledge admin belum ada. |
| Struktur organisasi | Explicitly held. |
| Hero, sambutan, video, kontak/newsletter | Di luar CMS scope yang disetujui. |

## 21. Kontrak Implementasi

- Admin memakai protected client components dan TanStack Query.
- Detail editor mengambil data dari endpoint `[id]`; list tidak boleh mengandalkan data hardcoded.
- Semua URL gambar berasal dari hasil upload atau URL tervalidasi.
- Preview adalah representasi desain publik, bukan sumber data kedua.
- `isPublished=false` berarti Draft/Tidak tampil publik. Aksi delete API saat ini juga melakukan unpublish.
- `isActive=false` hanya untuk kategori; record lama tetap dapat menampilkan kategori historis.
- Jangan desain aksi yang API-nya belum tersedia tanpa label `Future / membutuhkan backend`.
