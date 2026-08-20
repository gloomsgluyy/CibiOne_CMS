# SRS — Sarana & Prasarana (Profil Sekolah)

> Mengikuti template dari `docs/context/SRS_TEMPLATE.md`

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Sarana & Prasarana |
| Tipe Konten | Dynamic - List |
| PIC Programmer | (Belum ditentukan) |
| Reviewer / Approver | (Belum ditentukan) |
| Component Registry Reference | User provided custom bento-gallery component (interactive image gallery dengan drag & modal) |
| Code Reference Folder | User provided source code di chat (bento-gallery.tsx) |
| Tanggal dibuat | 2026-08-14 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: 
  - Layout reference di `layout_image/layout_profil.jpeg`
  - Grid gallery dengan berbagai ukuran item (bento style)
  - Horizontal scroll carousel dengan infinite loop capability
  - Tinggi & lebar visible dalam 1 desktop screen (sama dengan section sebelumnya)
  - Title "Sarana & Prasarana" di atas content cards (bukan di samping seperti di layout)

- **Deskripsi dari tim desain**: 
  - Gallery untuk menampilkan gambar fasilitas sekolah (kelas, lab, lapangan, dll)
  - Setiap image memiliki tinggi berbeda (bento grid pattern)
  - Hover effect: opacity menurun + menampilkan text deskripsi ruangan
  - Click: modal untuk melihat gambar full size
  - Horizontal scroll/drag untuk navigasi ketika items banyak
  - Infinite looping carousel capability
  - Responsive untuk mobile dan desktop
  - Font: Poppins (sudah di-setup)
  - Color scheme: Biru (#1e3a8a, #2563eb) sesuai brand

- **Component/Template yang dipakai**: 
  - User provided custom `bento-gallery` component (InteractiveImageBentoGallery)
  - Features:
    - Bento grid layout dengan custom span per item
    - Drag to scroll horizontal
    - Click to expand modal
    - Hover overlay dengan gradient dan text
    - Framer Motion animations
    - Responsive grid
  - Adaptasi untuk Sarana & Prasarana dengan placeholder images

- **Code reference yang wajib diikuti**: 
  - User provided source code `bento-gallery.tsx` (full component ~200 lines)
  - Props: imageItems (array), title (string), description (string)
  - ImageItem type: id, title, desc, url, span (grid span classes)
  - Drag constraints dengan horizontal scroll
  - Modal untuk view full image
  - Gradient overlay pada hover

- **Kalau component digenerate sendiri**: 
  - N/A - menggunakan user provided component
  - Adaptasi styling:
    - Background: bg-gray-50 untuk section (konsisten dengan page)
    - Warna accent: Biru sesuai brand
    - Font: Poppins untuk semua text
    - Spacing: konsisten dengan section Sejarah dan Visi-Misi
  - Placeholder: menggunakan `/banner.jpeg` untuk semua gambar saat prototype
  - Data: fasilitas sekolah (Ruang Kelas, Laboratorium Komputer, Perpustakaan, Lapangan, dll)

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-14 | AI (Kiro) | Setup SRS file | Done | Template SRS diisi dengan metadata |
| 2026-08-14 | AI (Kiro) | Buat `components/ui/bento-gallery.tsx` | Done | Component ~195 lines dengan drag, modal, hover effects |
| 2026-08-14 | AI (Kiro) | Buat `sarana-prasarana-section.tsx` | Done | 12 items fasilitas dengan bento grid spans |
| 2026-08-14 | AI (Kiro) | Update `page.tsx` untuk render section | Done | Import dan render SaranaPrasaranaSection setelah GuruStaffSection |
| 2026-08-14 | AI (Kiro) | Fix error: Buat `lib/utils.ts` | Done | Simple cn function untuk merge classes |
| 2026-08-14 | AI (Kiro) | **ENHANCEMENT:** Auto-play infinite carousel | Done | Rewrite bento-gallery (~240 lines) dengan auto-scroll, infinite loop, pause on hover |
| 2026-08-14 | AI (Kiro) | **ENHANCEMENT:** Smooth entrance animations | Done | Enhanced itemVariants: y:30, scale:0.9, spring stiffness:120 |
| 2026-08-14 | AI (Kiro) | Enable autoPlay di sarana-prasarana-section | Done | autoPlay={true}, autoPlaySpeed={1.2}, pauseOnHover={true} |
| 2026-08-14 | AI (Kiro) | **BUG FIX:** Infinite loop seamless reset | Done | Ganti animate() ke requestAnimationFrame() untuk continuous smooth scroll |
| 2026-08-14 | AI (Kiro) | **BUG FIX:** Manual drag empty space | Done | onDragEnd dengan position normalization (modulo logic) |
| 2026-08-14 | AI (Kiro) | **BUG FIX:** Blank screen after loops (v1) | Done | 2x → 3x duplication, reset threshold *2 |
| 2026-08-14 | AI (Kiro) | **BUG FIX:** Blank screen after loops (v2) | Done | 3x → 4x duplication, shift reset (bukan jump to 0), threshold *3 |
| 2026-08-14 | AI (Kiro) | **STYLE FIX:** Match text colors with project | Done | text-foreground → text-gray-900, text-muted-foreground → text-gray-600 |
| 2026-08-14 | AI (Kiro) | Test auto-play & infinite loop behavior | Done | User approved - smooth tanpa jump |
| 2026-08-14 | AI (Kiro) | Test pause on hover & manual drag | Done | User approved - lancar jaya |
| 2026-08-14 | AI (Kiro) | Test modal click behavior | Done | Modal full image berfungsi dengan baik |
| 2026-08-14 | AI (Kiro) | Test responsive mobile | Done | Layout responsive (perlu test lebih lanjut saat demo) |
| 2026-08-20 | OpenCode | Menetapkan Sarana & Prasarana sebagai Dynamic - List | Waiting for Approval | Data CMS memakai presentation slot semantic agar bento layout tetap sama. Implementasi Fase 2 menunggu gate reviewer. |

**Status Fase 1 saat ini**: `Done` ✅ (User approved: "oke sip" - implementasi final completed)

> **Final Implementation Summary (2026-08-14):**
> 
> **Features:**
> 1. ✅ Bento grid gallery dengan varied heights (row-span-1, row-span-2, col-span-2)
> 2. ✅ Auto-play infinite carousel - bergerak sendiri dengan loop seamless
> 3. ✅ Pause on hover & manual drag - auto-scroll pause saat hover/drag
> 4. ✅ Click to expand modal - full image view dengan backdrop blur
> 5. ✅ Smooth entrance animations - fade + slide + scale dengan stagger
> 6. ✅ Status indicator - "Auto-scroll aktif" / "Dijeda" / "Manual scroll"
> 
> **Technical Implementation:**
> 1. ✅ 4x item duplication untuk buffer besar (seamless infinite loop)
> 2. ✅ requestAnimationFrame untuk continuous smooth scroll
> 3. ✅ Reset dengan shift (+singleSetWidth) bukan jump to 0
> 4. ✅ Reset threshold di singleSetWidth * 3 (very late reset)
> 5. ✅ Manual drag position normalization dengan modulo logic
> 6. ✅ Grid layout: `grid-flow-col` + `auto-cols-[minmax(15rem,1fr)]`
> 
> **Files:**
> - `components/ui/bento-gallery.tsx` (~250 lines final)
> - `components/sections/profil-sekolah/sarana-prasarana-section.tsx`
> - `app/(public)/profil-sekolah/page.tsx` (updated)
> - `lib/utils.ts` (created)
> 
> **Ready for next section**

---

## Fase 2 — Backend Logic CMS

> Menunggu reviewer menyatakan Fase 1 `Done` sebelum implementasi dimulai.

### Input

- **Pattern yang dipakai**: `ContentList` (untuk future implementation)
- **Nama tabel**: `sarana_prasarana`
- **Field tambahan di luar skema generik**:
  - `category` enum('ruang_kelas', 'laboratorium', 'perpustakaan', 'lapangan', 'fasilitas_lain')
  - `capacity` integer nullable (kapasitas ruangan)
   - `presentation_slot` enum untuk memetakan slot bento; admin tidak memasukkan Tailwind class mentah
- **Endpoint API**: 
  - GET `/api/sarana-prasarana` (list dengan filter category)
  - GET `/api/sarana-prasarana/[id]` (detail)
  - POST `/api/sarana-prasarana` (create - super_admin only)
  - PUT `/api/sarana-prasarana/[id]` (update - super_admin only)
  - DELETE `/api/sarana-prasarana/[id]` (delete - super_admin only)
- **Role akses**: `super_admin` only (fasilitas sekolah umum)

**Status Fase 2**: `Not Started`

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | In Progress | (Menunggu review) | |
| Fase 2 | Not Started | | |

**Ringkasan status SRS ini**: 🟡 In Progress - Fase 1 sedang dikerjakan
