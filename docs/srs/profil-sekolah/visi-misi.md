# SRS — Visi & Misi (Profil Sekolah)

> Mengikuti template dari `docs/context/SRS_TEMPLATE.md`

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Visi & Misi |
| Tipe Konten | Dynamic - Singleton |
| PIC Programmer | (Belum ditentukan) |
| Reviewer / Approver | (Belum ditentukan) |
| Component Registry Reference | User provided custom component (accordion modal pattern) |
| Code Reference Folder | `docs/references/profil-sekolah/visi-misi/` |
| Tanggal dibuat | 2026-08-14 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: 
  - Layout reference di `layout_image/fix_2.png`
  - 2 panel horizontal side-by-side (Visi kiri, Misi kanan)
  - Ketika diklik: gambar pindah ke kiri, konten pindah ke kanan (switch)
  - Gambar setengah dari konten di layout
  - Label "VISI" dan "MISI" dalam gambar sebagai indikasi click area

- **Deskripsi dari tim desain**: 
  - Accordion horizontal dengan 2 items (Visi dan Misi)
  - Item aktif: menampilkan full konten dengan badge, title, subtitle, description, dan points list
  - Item tidak aktif: menampilkan label vertical di tengah gambar
  - Hover/click: smooth transition switch antara item
  - Font: Poppins
  - Background: `banner.jpeg` dengan opacity gradient
  - Color scheme: Biru (#1e3a8a, #2563eb) sesuai brand

- **Component/Template yang dipakai**: 
  - User provided custom accordion modal component
  - Modified menjadi 2 items (Visi & Misi)
  - Layout: horizontal flex dengan flex-[4] (active) dan flex-[0.5] (inactive)
  - Framer Motion untuk smooth transitions

- **Code reference yang wajib diikuti**: 
  - User provided source code di chat (AccordionModal component)
  - Adaptasi untuk 2 items dengan layout berbeda
  - Background `banner.jpeg` dengan opacity gradient
  - Label vertical di inactive state

- **Kalau component digenerate sendiri**: 
  - Adaptasi dari user provided component
  - Warna: Biru gradient dengan overlay
  - Font: Poppins untuk semua text
  - Layout: horizontal flex dengan responsive behavior
  - Spacing: consistent dengan section Sejarah

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-14 | AI (Kiro) | Buat component `visi-misi-section.tsx` | Done | Accordion horizontal dengan 2 items (Visi & Misi) |
| 2026-08-14 | AI (Kiro) | Update `page.tsx` untuk render VisiMisiSection | Done | Import dan render component setelah SejarahSection |
| 2026-08-14 | AI (Kiro) | Implementasi horizontal accordion behavior | Done | flex-[4] active, flex-[0.5] inactive dengan smooth transition |
| 2026-08-14 | AI (Kiro) | Implementasi switch layout (gambar ke kiri, konten ke kanan) | Done | Switch position saat item aktif dengan Framer Motion |
| 2026-08-14 | AI (Kiro) | Background `banner.jpeg` dengan opacity gradient | Done | linear-gradient dengan overlay biru |
| 2026-08-14 | AI (Kiro) | Content dummy (Visi & Misi text) | Done | Placeholder konten sebelum konten real dari user |
| 2026-08-14 | AI (Kiro) | Font Poppins | Done | Menggunakan font yang sudah di-setup di layout.tsx |
| 2026-08-14 | AI (Kiro) | Points list dengan icon checkmark | Done | 4 points per item dengan checklist style |
| 2026-08-14 | AI (Kiro) | Card lebih kecil (max-w-[90vw]) | Done | Ukurannya lebih proporsional |
| 2026-08-14 | AI (Kiro) | Min-height cards 80vh/550px | Done | Lebih compact dari 85vh |
| 2026-08-14 | AI (Kiro) | Points jadi card dengan background putih | Done | Card putih rounded-2xl shadow-lg |
| 2026-08-14 | AI (Kiro) | Icon di tengah dengan warna biru | Done | Icon svg dengan bg-blue-100 border biru |
| 2026-08-14 | AI (Kiro) | Description di bawah icon | Done | Text-gray-600, text-sm |
| 2026-08-14 | AI (Kiro) | Scrollable points list | Done | overflow-y-auto pada points container |
| 2026-08-14 | AI (Kiro) | Added background gray-50 di page | Done | bg-gray-50 untuk mengisi gap putih |
| 2026-08-14 | AI (Kiro) | **Revisi:** Padding lebih besar | Done | p-8 pada content container |
| 2026-08-14 | AI (Kiro) | **Revisi:** Logo lebih besar dan kontras | Done | w-14 h-14, bg-blue-600 dengan text-white |
| 2026-08-14 | AI (Kiro) | **Revisi:** Ukuran card diperkecil | Done | max-w-[85vw], h-[72vh], min-h-[500px] |
| 2026-08-14 | AI (Kiro) | **Revisi:** Card content lebih kecil | Done | p-3 pada points cards, text-sm |
| 2026-08-14 | AI (Kiro) | **Revisi:** Gap antar section lebih kecil | Done | py-8 (64px) pada section |
| 2026-08-14 | AI (Kiro) | **Revisi:** Text ukuran lebih kecil | Done | Heading text-2xl/3xl/4xl, sub text-base/md:text-lg |
| 2026-08-14 | AI (Kiro) | **Revisi:** Icon lebih besar | Done | 32x32px dengan stroke 2 |
| 2026-08-20 | OpenCode | Mendokumentasikan perubahan klasifikasi menjadi Dynamic - Singleton | Waiting for Approval | Keputusan PIC: super admin dapat mengubah isi dan background; UI/animasi tetap sama. Implementasi Fase 2 menunggu gate reviewer. |

---

## Fase 2 — Backend Logic CMS

> Menunggu reviewer menyatakan Fase 1 `Done` sebelum implementasi dimulai.

- **Pattern yang dipakai**: `SiteSetting`.
- **Key/value**: key `school_vision_mission`; value JSON berisi `backgroundImageUrl`, objek `vision` dan `mission`, serta daftar point masing-masing.
- **Endpoint API**: `GET /api/settings/school_vision_mission`, `PUT /api/settings/school_vision_mission`.
- **Role akses**: public read; hanya `super_admin` dapat mengubah.
- **UI invariant**: accordion dua panel, struktur point, dan animasi tetap component-owned; admin hanya mengganti konten dan gambar latar.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Done | User | 2026-08-14 |
| Fase 2 | Not Started | | |

**Ringkasan status SRS ini**: 🟢 Done - Section Visi & Misi COMPLETED (2026-08-14)

> **Revisi terakhir (2026-08-14):**
> 1. ✅ Padding lebih besar: p-8
> 2. ✅ Logo lebih besar: 32x32px, w-14 h-14
> 3. ✅ Logo kontras: bg-blue-600 text-white
> 4. ✅ Ukuran card diperkecil: max-w-[85vw], h-[72vh]
> 5. ✅ Card content lebih kecil: p-3, text-sm
> 6. ✅ Gap antar section lebih kecil: py-8
> 7. ✅ Icon lebih besar: 32x32px
> 8. ✅ Text sizes lebih kecil untuk balance
