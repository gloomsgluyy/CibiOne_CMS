# Design System - Admin CMS CibiOne

> Dokumen ini adalah **design system visual utama** untuk desain UI Admin CMS.  
> Scope: tipografi, warna, asset, layout, komponen, responsive, aksesibilitas, dan aturan penggunaan.  
> Page specification terpisah: [`design/README.md`](./design/README.md).

## 1. Arah Desain

Admin CMS adalah ruang kerja editorial untuk mengelola konten sekolah. Visual harus terasa:

- Profesional dan institusional.
- Terang, rapi, dan mudah dipindai.
- Fokus pada pekerjaan, bukan dekorasi.
- Konsisten dengan identitas biru SMKN 1 Cibinong.
- Memakai aksen oranye JHIC secara terbatas.

Jangan gunakan dark dashboard generik, neon, glassmorphism penuh, gradient berlebihan, ilustrasi AI generik, card berlebihan, atau grafik yang datanya belum tersedia di backend.

## 2. Font dan Tipografi

### 2.1 Font

Gunakan **Poppins** untuk seluruh UI Admin.

- Source: `next/font/google`.
- Weight yang tersedia saat ini: `400`, `600`, `700`.
- Jangan memakai serif, Inter, Roboto, atau font lain.
- Jangan meminta weight `500` atau `800` pada desain sebelum font loading ditambahkan.

### 2.2 Type Scale

| Token | Weight | Desktop | Mobile | Line height | Pemakaian |
|---|---:|---:|---:|---:|---|
| Display | 700 | 32 px | 28 px | 1.15 | Heading login. |
| Page title | 700 | 24 px | 22 px | 1.25 | `Dashboard`, `Konten`. |
| Section title | 700 | 18 px | 18 px | 1.35 | Judul card/section. |
| Card metric | 700 | 30 px | 28 px | 1.10 | Angka dashboard. |
| Body | 400 | 14 px | 14 px | 1.55 | Tabel, deskripsi, form. |
| Body small | 400 | 12 px | 12 px | 1.45 | Helper text, metadata. |
| Label | 600 | 13 px | 13 px | 1.40 | Label input dan button. |
| Table header | 600 | 12 px | 12 px | 1.40 | Header tabel. |
| Eyebrow | 700 | 11 px | 11 px | 1.30 | Group label sidebar/status. |

### 2.3 Aturan Tipografi

- Gunakan Bahasa Indonesia dengan sentence case: `Tambah konten`, bukan `TAMBAH KONTEN`.
- Uppercase hanya untuk eyebrow, status ringkas, atau label kategori.
- Minimum ukuran teks: 12 px.
- Gunakan `tabular-nums` untuk angka dashboard, pagination, urutan, dan statistik.
- Judul page maksimal dua baris pada mobile.
- Paragraf bantuan maksimal sekitar 560 px agar mudah dibaca.
- Warna metadata tidak boleh dipakai untuk teks utama.

## 3. Warna

### 3.1 Token Warna

| Token | Hex | Fungsi |
|---|---|---|
| `brand-900` | `#082E70` | Overlay login, surface biru gelap. |
| `brand-800` | `#0B3477` | Hover dan pressed state. |
| `brand-700` | `#123E91` | Navigasi aktif kuat, panel identitas. |
| `brand-600` | `#1D4F98` | Primary action, link, focus ring. |
| `brand-100` | `#E8F1F6` | Selected nav, badge info, hover lembut. |
| `brand-50` | `#F4F8FA` | Background utama content. |
| `jhic-600` | `#E85D04` | Aksen JHIC, bukan primary action. |
| `jhic-100` | `#FFF0E6` | Background badge aksen. |
| `ink-950` | `#0F172A` | Heading dan teks terpenting. |
| `ink-700` | `#334155` | Body text. |
| `ink-500` | `#64748B` | Metadata, placeholder, helper. |
| `line-200` | `#E2E8F0` | Border dan divider. |
| `surface-0` | `#FFFFFF` | Card, input, popover, modal. |
| `surface-50` | `#F8FAFC` | Table header dan secondary surface. |
| `success-700` | `#15803D` | Published, success. |
| `success-100` | `#DCFCE7` | Surface success. |
| `warning-700` | `#B45309` | Draft, warning. |
| `warning-100` | `#FEF3C7` | Surface warning. |
| `danger-700` | `#B91C1C` | Error dan destructive action. |
| `danger-100` | `#FEE2E2` | Surface error. |

### 3.2 Rasio Penggunaan

- 70% surface netral: putih, `brand-50`, `surface-50`.
- 20% teks dan border.
- 10% brand blue/accent.
- Primary button selalu `brand-600`, hover `brand-800`.
- Oranye hanya untuk konteks JHIC, badge, atau penanda kecil.
- Jangan memakai oranye untuk `Simpan`, `Terbitkan`, atau CTA utama.
- Status wajib memiliki teks, bukan hanya warna.
- Kontras teks normal minimal WCAG AA 4.5:1.

## 4. Asset

### 4.1 Asset Existing

| Asset | Path | Penggunaan |
|---|---|---|
| Logo sekolah utama | `/cropped-logo-SMKN-1-Cbn.png` | Sidebar, login, mobile header. |
| Logo sekolah alternatif | `/logo smkn 1 cibinong.png` | Fallback komposisi vertikal. |
| Foto gedung | `/smkn-hero-banner.png` | Panel visual login. |
| Banner sekolah | `/banner.jpeg` | Preview background Visi/Misi/Akreditasi. |
| Banner alternatif | `/hero-banner.png`, `/hero-banner.jpeg` | Hanya bila diperlukan oleh layout. |
| Logo jurusan | `/logo jurusan/*` | Context jurusan, bukan logo utama. |

### 4.2 Aturan Asset

- Logo sekolah tidak boleh direcolor, dipotong, atau diberi efek berat.
- Logo sekolah tidak menjadi watermark di setiap card.
- Foto gedung pada login memakai overlay biru agar teks terbaca.
- Logo mitra memakai `object-contain`, bukan `object-cover`.
- Foto guru dan fasilitas memakai `object-cover`.
- Asset upload berasal dari hasil `POST /api/uploads`.
- Format upload: JPEG, PNG, WebP, AVIF.
- Batas upload: maksimum 5 MB.
- Jangan memakai base64 atau binary di database.
- Jangan memakai stock photo pada final design.
- Semua image punya alt text; image dekoratif memakai alt kosong.

### 4.3 Rasio Preview

| Resource | Rasio |
|---|---|
| Cover konten | 16:9 |
| Foto guru | 1:1 atau 3:4 |
| Sarana | 4:3 |
| Logo mitra | 1:1, contain |
| Background Visi/Misi | 16:9 |
| Akreditasi image card | Mengikuti slot layout |

## 5. Layout System

### 5.1 Desktop: >=1024 px

| Area | Spesifikasi |
|---|---|
| Sidebar | Fixed kiri, lebar 272 px, tinggi viewport. |
| Sidebar brand | Tinggi 88 px, padding 24 px, logo 38 px. |
| Main content | Margin kiri 272 px, background `brand-50`. |
| Top bar | Sticky, tinggi 72 px, background putih, border bawah. |
| Content padding | 32 px; 40 px pada viewport >=1440 px. |
| Content max width | 1440 px. |
| Page header | Breadcrumb, title, description, CTA. |

### 5.2 Tablet: 768-1023 px

- Sidebar 232 px atau compact rail 72 px.
- Content padding 24 px.
- Toolbar boleh wrap dua baris.
- Form dua kolom hanya bila setiap kolom minimal 320 px.

### 5.3 Mobile: <768 px

- Top bar tinggi 64 px.
- Sidebar berubah menjadi drawer lebar maksimal 320 px atau 88vw.
- Overlay drawer: `ink-950` 40%.
- Content padding 16 px.
- Header page berubah menjadi stack vertical.
- Primary CTA menjadi full width bila lebar layar <390 px.
- Tabel berubah menjadi card list.
- Editor memakai sticky bottom action bar.

## 6. App Shell

### 6.1 Sidebar

Brand block:

- Logo `/cropped-logo-SMKN-1-Cbn.png`, tinggi 38 px.
- Nama `CibiOne CMS`.
- Subteks `SMKN 1 Cibinong`.

Menu `super_admin`:

- Dashboard.
- Konten.
- Kategori Konten.
- Guru & Staff.
- Kategori Guru.
- Sarana & Prasarana.
- Mitra Industri.
- Pengaturan.

Menu `jurusan_admin`:

- Dashboard.
- Konten.
- Kategori Konten.
- Guru & Staff.
- Kategori Guru.
- Mitra Industri.

Nav item:

- Minimum height 44 px.
- Padding horizontal 12 px.
- Radius 10 px.
- Gap icon-label 12 px.
- Active background `brand-100`, text `brand-800`.
- Icon 18-20 px.
- Group label 11 px uppercase, letter spacing 0.1em.

### 6.2 Top Bar

- Breadcrumb di area content, bukan top bar global.
- Top bar menampilkan konteks produk dan user menu.
- Avatar menggunakan inisial bila avatar image tidak tersedia.
- Label role: `Super Admin` atau `Admin Jurusan`.
- Context jurusan tampil untuk `jurusan_admin`.
- Menu user: role, context jurusan, divider, `Keluar`.
- Jangan tampilkan password, token, atau data sesi sensitif.

## 7. Spacing, Radius, Elevation

Gunakan kelipatan 4 px. Nilai utama:

| Token | Value | Use |
|---|---:|---|
| `space-1` | 4 px | Gap sangat rapat. |
| `space-2` | 8 px | Label-helper, icon-label kecil. |
| `space-3` | 12 px | Button group, cell. |
| `space-4` | 16 px | Padding card/input. |
| `space-5` | 20 px | Toolbar/card dashboard. |
| `space-6` | 24 px | Section gap. |
| `space-8` | 32 px | Page header/content. |
| `space-10` | 40 px | Form section separator. |
| `radius-sm` | 8 px | Input, button, badge kotak. |
| `radius-md` | 12 px | Card, upload zone. |
| `radius-lg` | 16 px | Dashboard card, dialog. |
| `radius-xl` | 24 px | Login card/panel. |
| `shadow-1` | `0 1px 2px rgba(15,23,42,.05)` | Card default. |
| `shadow-2` | `0 12px 28px rgba(15,23,42,.08)` | Popover/drawer. |
| `shadow-3` | `0 24px 64px rgba(8,46,112,.18)` | Login panel only. |

Card default: border `line-200` + `shadow-1`. Jangan memakai shadow besar pada semua card.

## 8. Component Specification

### 8.1 Button

| Variant | Style | Use |
|---|---|---|
| Primary | Blue filled, white text, 40 px | Tambah, simpan, terbitkan. |
| Secondary | White, border, dark text | Batal, preview, refresh. |
| Ghost | Transparent, hover surface | Toolbar ringan. |
| Destructive | Red filled | Konfirmasi nonaktif/unpublish. |
| Link | Text blue | Navigasi ringan. |

Sizes: small 32 px, default 40 px, large 44 px. Icon-only minimum 40x40 px. Disabled opacity 45% dan cursor disabled.

### 8.2 Form

- Input/select height 40 px.
- Textarea minimum height 120 px.
- Label selalu di atas field.
- Required memakai `*` plus helper `Wajib` bila perlu.
- Focus: border `brand-600` + ring 3 px blue 16%.
- Error: border `danger-700`, error text 12 px, icon, dan pesan spesifik.
- Placeholder bukan pengganti label.
- Select searchable hanya untuk jurusan/kategori panjang.

### 8.3 Badge

| Status | Background | Text |
|---|---|---|
| Terbit | `success-100` | `success-700` |
| Draft | `warning-100` | `warning-700` |
| Nonaktif | `surface-50` | `ink-500` |
| Sekolah | `brand-100` | `brand-800` |
| Jurusan | `jhic-100` | `jhic-600` |

Badge height 24 px, radius pill, padding horizontal 8-10 px. Status selalu memiliki teks.

### 8.4 Table

- Container putih, border, radius 16 px.
- Header height 44 px, background `surface-50`.
- Row minimum height 64 px.
- Hover background `brand-50`.
- Thumbnail konten/fasilitas 48x36 atau 64x44 px.
- Avatar guru 40x40 px.
- Logo mitra 40-48 px contain.
- Title maximum 2 lines.
- Action menu: Edit, Publish/Unpublish, Nonaktifkan.
- Mobile: card list dengan metadata penting saja.

### 8.5 Filter dan Pagination

- Filter bar berada di bawah page header.
- Type, category, jurusan, sort, featured, highlighted mengikuti API.
- Search dan status filter diberi label `Future` sampai backend mendukung query-nya.
- Filter aktif menjadi removable chips.
- Pagination menampilkan `Menampilkan 1-10 dari 42`.
- Page button maksimal lima, gunakan ellipsis bila perlu.

### 8.6 Upload

States:

1. Empty: dashed dropzone, icon, format, limit.
2. Drag over: blue border/background.
3. Uploading: thumbnail placeholder, filename, progress.
4. Success: preview, `Ganti`, `Hapus dari form`.
5. Failed: error text, `Coba lagi`.

`Hapus dari form` hanya menghapus URL dari form. Jangan menampilkan seolah-olah object storage sudah terhapus karena lifecycle delete belum tersedia.

### 8.7 Dialog, Drawer, Toast

- Dialog maksimum 560 px, radius 16 px.
- Backdrop `ink-950` 48%.
- Escape menutup dialog.
- Focus trap wajib.
- Drawer desktop 480 px dari kanan; mobile full screen.
- Toast desktop kanan atas; mobile di bawah top bar.
- Toast tampil 4-6 detik dan dapat ditutup.
- Confirmation menampilkan nama record dan dampak publikasi.

## 9. State Design

| State | Design |
|---|---|
| Loading | Structural skeleton mengikuti layout final. |
| Refetching | Data lama tetap tampil, indikator kecil. |
| Empty | Icon, heading, explanation, CTA sesuai role. |
| 401 | Redirect login. |
| 403 | Permission panel, bukan empty state. |
| 404 | Record tidak ditemukan + kembali ke list. |
| 409 | Inline conflict pada field unik, input tetap dipertahankan. |
| 422 | Error per field, fokus ke error pertama. |
| 500/network | Alert aman + `Coba lagi`; jangan tampilkan stack trace. |
| Upload error | Error hanya pada upload field; field lain tetap utuh. |

## 10. Motion

| Interaction | Duration | Easing |
|---|---:|---|
| Hover/focus color | 120-160 ms | ease-out |
| Drawer | 220 ms | `cubic-bezier(.22,1,.36,1)` |
| Dialog | 180 ms | ease-out |
| Toast | 180 ms | ease-out |
| Skeleton shimmer | 1.4 s | ease-in-out |

Respect `prefers-reduced-motion`. Tidak ada parallax, count-up number, autoplay carousel, rotating card, atau motion yang menunda akses ke form.

## 11. Aksesibilitas

- Semua input memiliki label eksplisit.
- Semua icon-only button memiliki tooltip dan `aria-label`.
- Semua interaksi bisa dilakukan dengan keyboard.
- Focus ring terlihat dan kontras.
- Dialog mengunci focus dan dapat ditutup dengan Escape.
- Status tidak dibedakan dari warna saja.
- Gambar memiliki alt text.
- Kontras minimal WCAG AA.
- Touch target minimum 40x40 px.
- Tabel mobile tidak boleh menyembunyikan aksi utama tanpa menu keyboard-accessible.

## 12. Handoff Figma

Wajib disediakan:

- Variables warna sesuai token.
- Text styles sesuai type scale.
- Spacing, radius, dan elevation styles.
- Component variants: button, input, select, badge, table row, drawer, dialog, toast, upload, skeleton, empty, 403.
- Breakpoint frames: desktop >=1024, tablet 768-1023, mobile <768.
- Annotation route, role, API, field, dan state.
- Asset lokal dibedakan dari asset upload.
- Semua fitur `Future / membutuhkan backend` diberi label eksplisit.
