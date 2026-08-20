# SRS — Guru & Staff (Profil Sekolah)

> Mengikuti template dari `docs/context/SRS_TEMPLATE.md`

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Guru & Staff |
| Tipe Konten | Dynamic – List (contentList pattern) |
| PIC Programmer | (Belum ditentukan) |
| Reviewer / Approver | (Belum ditentukan) |
| Component Registry Reference | User provided custom accordion modal component |
| Code Reference Folder | (Akan diisi setelah user berikan instruksi) |
| Tanggal dibuat | 2026-08-14 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: 
  - (Menunggu layout/reference dari user)
  
- **Deskripsi dari tim desain**: 
  - Accordion modal dengan carousel/pagination untuk banyak guru
  - Thumbnail slider kecil di bawah/kiri gambar utama
  - Saat thumbnail diklik: gambar dan info berpindah
  - Klik gambar utama: modal detail muncul
  - Font: Poppins
  - Background: sesuai brand (biru)

- **Component/Template yang dipakai**: 
  - User provided custom accordion modal component (dari source)
  - Adaptasi untuk Guru & Staff dengan placeholder
  - Carousel/pagination untuk multiple items
  - Modal detail saat click gambar

- **Code reference yang wajib diikuti**: 
  - User provided source code di chat (AccordionModal component)
  - Adaptasi untuk data Guru & Staff
  - Placeholder: nama, jabatan, foto
  - Background `banner.jpeg`

- **Kalau component digenerate sendiri**: 
  - Adaptasi dari user provided component
  - Warna: Biru gradient dengan overlay
  - Font: Poppins untuk semua text
  - Carousel/pagination untuk navigation
  - Modal detail dengan glassmorphism

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-14 | AI (Kiro) | Setup SRS template | Done | SRS template diisi |
| 2026-08-14 | AI (Kiro) | Buat komponen accordion modal | Pending | Adaptasi dari source user |
| 2026-08-14 | AI (Kiro) | Carousel/pagination system | Pending | Navigation untuk banyak guru |
| 2026-08-14 | AI (Kiro) | Modal detail saat click | Pending | Glassmorphism backdrop |
| 2026-08-14 | AI (Kiro) | Smooth animations | Pending | Framer Motion |
| 2026-08-14 | AI (Kiro) | Update page.tsx | Pending | Render GuruStaffSection |
| 2026-08-20 | OpenCode | Mendokumentasikan kontrak CMS Guru & Staff | Waiting for Approval | Filter menjadi master data yang dapat dikelola admin; aturan card tertutup dan badge dicatat untuk integrasi mendatang. |

**Status Fase 1 saat ini**: `Pending`

> **Catatan:** SRS dibuat terlebih dahulu untuk dokumentasi, tapi implementasi kode akan dilakukan setelah user memberikan instruksi spesifik dan layout reference.

---

## Fase 2 — Backend Logic CMS

> Menunggu reviewer menyatakan Fase 1 `Done` sebelum implementasi dimulai.

- **Pattern yang dipakai**: `ContentList` melalui tabel `guru` dan master filter `guru_categories`.
- **Field tambahan**: `category_id`, `position`, `bio`, `image_url`, `sort_order`, dan `is_published`; filter default di-seed dari kategori yang saat ini tampil.
- **Endpoint API**: `/api/guru`, `/api/guru/[id]`, `/api/guru-categories`, dan `/api/guru-categories/[id]`.
- **Role akses**: public membaca guru terbit; `super_admin` mengelola semua; `jurusan_admin` hanya mengelola guru/kategori dengan `jurusan_id` miliknya.
- **UI invariant**: accordion, filter, pagination, dan modal dipertahankan. Card tertutup hanya menampilkan foto; badge active berada di pojok atas.

**Status Fase 2**: `Not Started`

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Pending | (Menunggu instruksi user) | |
| Fase 2 | Not Started | | |

**Ringkasan status SRS ini**: 🟠 Menunggu Instruksi User (Fase 1 belum dimulai)
