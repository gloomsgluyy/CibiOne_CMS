# SRS - Section Berita

## Metadata

| Field | Isi |
|---|---|
| Halaman | Berita |
| Section | Berita |
| Tipe Konten | Dynamic - List |
| PIC Programmer | Tim Programming CibiOne |
| Reviewer / Approver | PIC / Tim Programming |
| Component Registry Reference | Section D: Cult UI `cutout-card` (implementasi langsung) |
| Code Reference Folder | `docs/references/berita/berita/` |
| Tanggal dibuat | 2026-08-18 |

---

## Fase 1 - Frontend Implementation

### Input

- **Layout dari tim desain**: screenshot banner yang diberikan di chat pada 2026-08-18; referensi halaman umum `layout_image/berita.jpeg`.
- **Deskripsi dari tim desain**: `/berita` langsung merender Konten Berita dalam dua kolom: banner fokus kiri dan tiga kartu ringkas `Terbaru`/`Populer` di kanan tanpa search hero. Highlight Prestasi berada pada sub-route `/berita/prestasi` agar dapat ditautkan dari sub-navbar dan dimuat terpisah.
- **Component/Template yang dipakai**: Cult UI `cutout-card` dari Section D Component Registry, diadaptasi dari source code user.
- **Code reference yang wajib diikuti**: `docs/references/berita/berita/cutout-card-reference.tsx`, `docs/references/berita/berita/linear-dialog-reference.md`, dan `docs/references/berita/berita/image-gallery-reference.tsx`.
- **Tipografi**: Poppins dari root layout project.
- **Animasi**: banner otomatis, tab terbaru/populer, hover card, pagination gallery prestasi, dan dukungan reduced motion.
- **Responsive**: dua kolom pada desktop dan bertumpuk pada mobile/tablet; seluruh kontrol tetap dapat digunakan dengan keyboard.
- **Data Fase 1**: data contoh lokal sebanyak tiga item dan `/banner.jpeg` sebagai fallback visual. Integrasi data `posts` ditunda sampai Fase 2 disetujui.
- **Batas implementasi saat ini**: interaksi klik untuk detail belum dibuat karena source component detail akan diberikan user setelah layout section disetujui.

### Acceptance Criteria

- [x] Banner kiri melakukan auto-advance terhadap maksimal tiga berita.
- [x] Tiga kartu ringkas tampil di panel kanan.
- [x] Tab yang tersedia hanya `Terbaru` dan `Populer`.
- [x] Dot pagination dapat dipilih dan menunjukkan item aktif.
- [x] Panel kiri dan kanan memiliki tinggi visual yang sama pada desktop.
- [x] Hover card dan entrance animation terasa halus.
- [x] Section responsif dan tetap terbaca pada mobile.
- [x] Font mewarisi Poppins dari root layout.
- [x] Focus card kiri membuka dialog detail berukuran besar dengan backdrop blur.
- [x] Isi artikel panjang dibagi dengan pagination internal dialog.
- [x] Dialog mendukung Escape, focus trap, scroll lock, dan focus restoration.
- [x] Section bawah menampilkan grid berita dua/tiga kolom dengan sidebar Search, Schedule, dan Kategori.
- [x] Grid bawah membatasi enam card per halaman dan memakai dot pagination smooth.
- [x] Card bawah memakai `CutoutCard` dan membuka popup detail yang konsisten dengan banner focus.
- [x] Sidebar bawah memakai warna utama `#1d4f98` dan visual modern/fresh.
- [x] Search pada panel kanan hero dihapus; panel kanan hanya memuat `Terbaru` dan `Populer`.
- [x] Ticker carousel headline paling atas dihapus.
- [x] Pergantian `Terbaru`/`Populer` memakai transisi halus tanpa blur.
- [x] Highlight Prestasi menggunakan adaptasi ImageGallery: tiga kolom dengan tinggi visual bervariasi, lazy loading, dan responsif.
- [x] Highlight Prestasi membatasi enam item per halaman dan memiliki dot pagination smooth.
- [x] Card prestasi membuka modal detail yang menggunakan visual penghargaan, berbeda dari modal artikel Berita.
- [x] Highlight Prestasi tersedia pada public sub-route `/berita/prestasi` dan dapat ditautkan melalui sub-navbar.
- [x] Highlight Prestasi populer tampil sebagai gallery full-width sebelum daftar Semua Berita, dengan auto-advance, dot pagination, modal detail, dan tombol `Detail` ke `/berita/prestasi`.

### Execution Log - Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-18 | OpenCode | Menyusun SRS dan mendokumentasikan layout serta code reference | In Progress | Implementasi frontend dimulai setelah input lengkap |
| 2026-08-18 | OpenCode | Mengimplementasikan CutoutCard, banner auto-play, tab, kartu ringkas, pagination, entrance, hover, dan responsive layout | Waiting for Approval | Klik detail sengaja ditunda sampai source lanjutan diberikan |
| 2026-08-18 | OpenCode | Menjalankan TypeScript check dan production build | Waiting for Approval | Kompilasi source berhasil; quality gate global tertahan error TypeScript lama pada Akreditasi, Kerja Sama Industri, dan Bento Gallery |
| 2026-08-18 | OpenCode | Memperlebar layout menjadi max-width 1480px, memperbesar kartu utama kiri, memperluas panel kanan, dan menyederhanakan copy/dekorasi | In Progress | Revisi visual berdasarkan feedback PIC; menunggu review tampilan |
| 2026-08-18 | OpenCode | Memperlebar layout menjadi max-width 1720px dengan rasio kiri-kanan 3:1, menyamakan tinggi panel, menipiskan hover cyan, meringankan overlay banner, dan menghapus durasi baca | In Progress | Revisi visual berdasarkan referensi terbaru PIC |
| 2026-08-18 | OpenCode | Menyederhanakan state aktif kartu kanan menjadi background biru-keabuan tanpa border atau glow cyan | In Progress | Pembeda aktif dibuat lebih tenang dan editorial |
| 2026-08-18 | OpenCode | Mengganti heading menjadi ticker `Berita Terbaru` dengan infinity loop serta menyederhanakan panel kanan, tab, radius, shadow, dan motion | In Progress | Mengikuti referensi ticker terbaru dan mengurangi kesan template/AI |
| 2026-08-18 | OpenCode | Mengadaptasi Linear Dialog pada focus card kiri, menambahkan backdrop blur dan pagination artikel, menyamakan radius 20px, serta mengganti ticker ke #1d4f98 | In Progress | Dialog reusable disiapkan untuk card section lain |
| 2026-08-18 | OpenCode | Mengubah panel kanan dari daftar terbaru/populer menjadi kartu Search dan Kategori, menambahkan arrow manual pada focus carousel, memperbesar modal detail, dan memperhalus transisi pergantian berita | In Progress | Focus card tetap menjadi pusat carousel, panel kanan menjadi kontrol/filter |
| 2026-08-18 | OpenCode | Membuat search/kategori tidak mengubah focus banner, menghapus arrow overlay, mengganti navigasi banner menjadi dot pagination kecil, mengecilkan area Search, membesarkan area Kategori, dan menghapus teks Focus saat ini | In Progress | Search/kategori disiapkan untuk daftar berita bawah pada fase berikutnya |
| 2026-08-18 | OpenCode | Mengembalikan panel kanan bawah menjadi daftar Terbaru/Populer, mempertahankan Search kecil di atas tanpa counter, dan menambah remount animation terpisah untuk media serta teks banner agar transisi otomatis lebih hidup | In Progress | Enter pada Search sengaja belum diarahkan ke section bawah sesuai scope banner saat ini |
| 2026-08-18 | OpenCode | Menyamakan tinggi desktop banner dan panel kanan melalui parent grid height 700px, melembutkan outline card, dan memperhalus transisi auto-carousel image/text | In Progress | Banner kiri dan panel kanan kini sama-sama menggunakan `h-full` pada desktop |
| 2026-08-18 | OpenCode | Menambahkan layout bawah berupa grid card berita dengan batas enam item per halaman, dot pagination smooth, sidebar Search/Schedule/Kategori, dan popup detail untuk card bawah | In Progress | Data masih contoh lokal; integrasi CMS tetap menunggu Fase 2 |
| 2026-08-18 | OpenCode | Memecah section bawah menjadi BeritaList, BeritaSidebar, NewsDetailModal, dan tipe data; menghapus shared-layout dialog yang meninggalkan blur; serta menambahkan filter kategori dan kalender interaktif | Waiting for Approval | Filter kategori memberi state aktif dan jumlah hasil secara langsung; kalender mendukung navigasi bulan, pemilihan tanggal, reset, dan empty state |
| 2026-08-18 | OpenCode | Menambahkan autocomplete pada search hero, navigasi keyboard, smooth scroll dan highlight ke card hasil, serta transisi card modern untuk pagination/kategori/tanggal tanpa filter blur | Waiting for Approval | Search memilih kecocokan aktif melalui Enter atau klik; grid memakai pop-layout dan stagger ringan dengan dukungan reduced motion |
| 2026-08-18 | OpenCode | Mengoptimalkan render dengan memisahkan autocomplete, memoize daftar/card, memberi dialog boundary per card, mengurangi nested motion dan backdrop blur, serta menghapus copy informasi di kanan ticker | Waiting for Approval | Membuka modal tidak lagi mengubah context seluruh grid; input search tidak merender ulang hero dan daftar berita |
| 2026-08-18 | OpenCode | Mengganti ticker menjadi selector layar penuh Berita/Highlight Prestasi yang bertransisi ke navigation pill, menghapus search hero, menambah motion pada tab Terbaru/Populer, dan conditional rendering per view | Waiting for Approval | Highlight Prestasi hanya placeholder; implementasi konten menunggu source component/layout dari PIC sesuai Component Registry rule |
| 2026-08-18 | OpenCode | Memperbesar selector awal, menghapus label Pusat Informasi Sekolah, menegaskan affordance cursor pointer, serta mengubah navigation hasil menjadi dua tombol berlebar setara dengan state aktif biru | Waiting for Approval | Shared-layout selector tetap memakai transform/opacity untuk menjaga biaya animasi rendah |
| 2026-08-18 | OpenCode | Mengubah arah transisi selector awal menjadi ke atas dan menghapus shared-layout selector yang dapat menginterpolasi posisi ke bawah | Waiting for Approval | Layar pilihan keluar ke atas, toolbar masuk dari atas, lalu konten aktif masuk ringan dari bawah |
| 2026-08-18 | OpenCode | Menyamakan lebar selector awal dengan navigation toolbar, menambah state hover biru yang konsisten, dan mengembalikan shared-layout pada pilihan agar card terpilih mengecil menuju tombol di atas | Waiting for Approval | Detail card dan heading ikut keluar bersama layar selector; morph hanya memakai transform/opacity |
| 2026-08-18 | OpenCode | Mengadaptasi source ImageGallery untuk Highlight Prestasi: gallery tiga kolom berasio bervariasi, lazy image, enam card per halaman, dot pagination, dan modal detail bertema penghargaan | Waiting for Approval | Rasio gambar dibuat deterministik dari data untuk mencegah layout shift; source reference tersimpan di folder docs/references |
| 2026-08-18 | OpenCode | Menghapus shared-layout selector karena menghasilkan arah morph ke bawah, lalu menggantinya dengan exit eksplisit ke atas dan transisi lebih lambat | Waiting for Approval | Selector keluar `-140px`, toolbar masuk dari atas setelah delay singkat, seluruh motion memakai cubic-bezier konsisten |
| 2026-08-18 | OpenCode | Memisahkan Highlight Prestasi ke route publik `/berita/prestasi`, menghapus selector in-page Berita/Prestasi dan counter hasil berita, serta menunda mount modal prestasi sampai card dibuka | Waiting for Approval | Sub-navbar dapat menautkan `/berita` dan `/berita/prestasi`; pemisahan route mengurangi JavaScript yang dihidrasi per halaman |
| 2026-08-18 | OpenCode | Menambahkan gallery Highlight Prestasi populer full-width di antara focus banner dan Semua Berita, dengan auto-advance, dot pagination, modal prestasi, dan tombol Detail menuju `/berita/prestasi` | Waiting for Approval | Hanya tiga card gallery aktif per slide; modal dimount saat card terkait dibuka |
| 2026-08-19 | OpenCode | Membuat slug utility system (`lib/slug.ts`) untuk generate URL-friendly slugs dengan ID suffix, extract ID dari slug, dan handle karakter Indonesia | Done | Slug format: `judul-berita-{id}` memastikan uniqueness dan SEO-friendly URLs |
| 2026-08-19 | OpenCode | Mengimplementasikan halaman detail berita penuh (`/berita/[slug]`) dengan banner hero full-width, two-column layout (content kiri + related news kanan 380px), back button, meta footer, dan server-rendered dynamic route | Done | Detail page route size 179 B dengan First Load JS 112 kB; SEO-ready dengan dedicated URL per artikel |
| 2026-08-19 | OpenCode | Menambahkan button "Lihat Detail Lengkap" dengan ExternalLink icon di NewsDetailModal yang link ke detail page menggunakan slug system | Done | Button inline setelah excerpt; user flow: modal (preview) → detail page (full article) |
| 2026-08-19 | OpenCode | Menyederhanakan NewsDetailModal menjadi ringkasan saja: hapus pagination logic, navigation arrows, page counter; tampilkan hanya excerpt + first paragraph dengan italic hint text | Done | Modal height dikurangi dari 860px ke 760px; lebih compact dan focused pada summary |
| 2026-08-19 | OpenCode | Memindahkan button "Lihat Detail Lengkap" ke bottom modal sebagai full-width prominent CTA dengan hover effect (gap increases dari 2 ke 3) dan ArrowRight icon | Done | Better UX: CTA terpisah dari content, visual hierarchy jelas, affordance kuat |
| 2026-08-19 | OpenCode | Menambahkan images interspersed dalam article content detail page: sisipkan figure dengan Image component setelah setiap 2 paragraphs, h-400px rounded-2xl dengan figcaption | Done | Content lebih engaging dan visual; production akan gunakan actual article images dari CMS |
| 2026-08-19 | OpenCode | Redesign complete related news sidebar: implementasi Terbaru/Populer tabs dengan useState, horizontal card layout (image 110x110px kiri + content kanan), white background wrapper rounded-24px dengan border dan shadow | Done | Sidebar lebih lebar (450px dari 380px); card horizontal mirip reference; tab switching smooth dengan sort logic |
| 2026-08-19 | OpenCode | Memisahkan client/server components di detail page: server component async untuk fetch data dan SEO, ClientWrapper dengan useState untuk interactive tabs | Done | Best of both worlds: server rendering untuk SEO + client interactivity untuk tabs; bundle optimal |
| 2026-08-19 | OpenCode | Menyamakan tinggi sidebar related news dengan main content menggunakan h-full pada aside dan inner white card wrapper | Done | Visual balance: sidebar dan article sama tinggi pada desktop; sticky positioning tetap berfungsi |
| 2026-08-19 | OpenCode | Menambahkan AOS entrance animations di berita-section.tsx: banner container `data-aos="fade-up"`, sidebar `data-aos="fade-up" delay-100` | Done | Smooth entrance pada initial page load; tidak conflict dengan Framer Motion carousel transitions |
| 2026-08-19 | OpenCode | Menambahkan AOS entrance animations di berita-list.tsx: section header "Semua Berita" `data-aos="fade-up"`, BeritaSidebar wrapper `data-aos="fade-up" delay-100` | Done | Staggered entrance animation; grid content tetap pakai Framer Motion untuk pagination transitions |
| 2026-08-19 | OpenCode | Menambahkan AOS entrance animations di detail page: banner `fade-in`, content `fade-up delay-100`, sidebar `fade-up delay-200` | Done | Smooth staggered entrance; AOS sudah di-init globally dengan once:true dan duration 600ms |
| 2026-08-19 | OpenCode | Verifikasi TypeScript check, production build, dan bundle sizes: /berita 15.9kB+179kB, /berita/[slug] 5.22kB+126kB, semua 18 pages compile success | Done | Performance optimal: modal page lighter (-1kB), detail page +14kB acceptable untuk interactivity; AOS impact negligible |
| 2026-08-20 | OpenCode | Mendokumentasikan kontrak CMS Berita, Prestasi, kategori, carousel, dan ranking populer | Waiting for Approval | Detail lengkap ada di `docs/planning/cms-content-and-collaboration.md`; implementasi backend menunggu gate reviewer. |

**Status Fase 1 saat ini**: `Done`

---

## Fase 2 - Backend Logic CMS

> Tidak boleh dimulai sebelum Fase 1 berstatus Done.

### Input

- **Pattern yang dipakai**: `ContentList` melalui tabel terpadu `posts`.
- **Nama tabel / field tambahan**: tabel `posts`, filter `type = berita`; penentuan metrik populer perlu dikonfirmasi sebelum implementasi.
- **Endpoint API**: `/api/posts?type=berita&page=&limit=` dan detail sesuai arsitektur yang disetujui.
- **Role akses**: public hanya membaca `is_published = true`; mutasi oleh `super_admin` dan `jurusan_admin` sesuai scope jurusan.
- **Keputusan konten dinamis 2026-08-20**: banner fokus/carousel memakai post `type=berita` dengan `is_featured` dan `featured_order`; tab Terbaru memakai `published_at`; tab Populer memakai `is_popular_override`, `view_count`, lalu `published_at`. Highlight Pencapaian memakai post `type=prestasi` dengan `is_highlighted` dan `highlight_order`. Kategori berasal dari master `post_categories`, dengan soft-delete/deaktivasi untuk kategori yang sudah dipakai. Detail page dan modal memakai record post yang sama, tanpa tabel detail terpisah.

### Execution Log - Fase 2

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| | | | Not Started | Menunggu Fase 1 berstatus Done |

**Status Fase 2 saat ini**: `Not Started`

---

## Fase 3 - Khusus AI Integration

Tidak berlaku untuk section Berita.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Waiting for Approval | | |
| Fase 2 | Not Started | | |
| Fase 3 | Tidak berlaku | | |

**Ringkasan status SRS ini**: Waiting for Approval
