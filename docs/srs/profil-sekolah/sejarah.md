# SRS — Sejarah (Profil Sekolah)

> Mengikuti template dari `docs/context/SRS_TEMPLATE.md`

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Sejarah |
| Tipe Konten | Static |
| PIC Programmer | (Belum ditentukan) |
| Reviewer / Approver | (Belum ditentukan) |
| Component Registry Reference | Stacking card animation (UI Layouts) - digunakan sebagai referensi expandable behavior |
| Code Reference Folder | User provided HTML code reference di chat (sticky stack pattern) |
| Tanggal dibuat | 2026-08-13 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: 
  - Card lebar ~1 layar desktop dengan margin tidak terlalu besar
  - Rounded corners dengan border solid (bukan glassmorphism)
  - Background: gambar sekolah (`./layout_image/banner.jpeg`)
  - Text di tengah: "Sejarah Singkat SMKN 1 Cibinong"
  - Button "Read More" di tengah bawah (transparent, rounded)
  - Expandable content dengan animasi smooth

- **Deskripsi dari tim desain**: 
  - Card utama dengan background image sekolah
  - Judul section di center overlay
  - Button transparent "Read More" untuk expand konten
  - Saat di-click: expand untuk show konten sejarah dengan animasi smooth
  - Layout expanded: 2 kolom (kiri = text konten sejarah, kanan = placeholder gambar)
  - "Show Less" untuk collapse kembali
  - Font: Poppins untuk semua text
  - Color scheme: Biru & Putih (referensi dari https://profile.smkn1cibinong.sch.id/)

- **Component/Template yang dipakai**: 
  - Reference pattern dari UI Layouts Stacking Card untuk expandable behavior
  - Framer Motion untuk animasi smooth expand/collapse
  - Code reference HTML yang disediakan user di chat untuk layout struktur

- **Code reference yang wajib diikuti**: 
  - User provided HTML sticky stack pattern dengan 3 kolom layout
  - Kolom 1 (nomor): dihapus sesuai instruksi user
  - Kolom 2: konten text sejarah dengan bullet points/highlights
  - Kolom 3: card visual placeholder untuk gambar

- **Kalau component digenerate sendiri**: 
  - Mengadaptasi code reference HTML yang diberikan user
  - Warna: Biru (#1e3a8a, #2563eb) & Putih untuk konsistensi dengan website SMKN 1 Cibinong
  - Border: solid border dengan border-blue-200
  - Rounded: rounded-3xl untuk card utama, rounded-2xl untuk elemen dalam
  - Font: Poppins (weight 300-700) di semua text
  - Spacing: padding consistent dengan reference code
  - Shadow: shadow-2xl untuk depth

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-13 | AI (Kiro) | Setup font Poppins di `app/layout.tsx` | Done | Import Google Font Poppins dengan weight 300-700, setup CSS variable |
| 2026-08-13 | AI (Kiro) | Update `app/globals.css` untuk menggunakan Poppins | Done | Ubah body font-family ke var(--font-poppins) |
| 2026-08-13 | AI (Kiro) | Buat component `components/sections/profil-sekolah/sejarah-section.tsx` v1 | Done | Card dengan background image, expandable content dengan Framer Motion |
| 2026-08-13 | AI (Kiro) | Update `app/(public)/profil-sekolah/page.tsx` | Done | Import dan render SejarahSection component |
| 2026-08-13 | AI (Kiro) | **REVISI:** Refactor total component berdasarkan feedback user | Done | Perubahan major: fade transition, sticky scroll, 3 cards |
| 2026-08-13 | AI (Kiro) | Implementasi gradient diagonal (kiri atas → kanan bawah) | Done | linear-gradient(135deg) dengan opacity bertingkat |
| 2026-08-13 | AI (Kiro) | Ubah card jadi full width (max-w-[95vw]) | Done | Margin atas 20 (py-20), margin samping 12 |
| 2026-08-13 | AI (Kiro) | Implementasi **fade transition** (bukan expand ke bawah) | Done | AnimatePresence mode="wait", opacity transition 0.6s |
| 2026-08-13 | AI (Kiro) | Implementasi **sticky scroll behavior** dengan 3 cards | Done | Sticky top-32, top-36, top-40 dengan minHeight 2400px container |
| 2026-08-13 | AI (Kiro) | Set tinggi card gambar = tinggi konten (items-stretch) | Done | Flex items-stretch + Image fill untuk aspect ratio sama |
| 2026-08-13 | AI (Kiro) | Ganti placeholder gambar dengan banner.jpeg | Done | Semua 3 cards pakai /layout_image/banner.jpeg |
| 2026-08-13 | AI (Kiro) | Fix background card hero pakai banner.jpeg | Done | Image fill dengan gradient overlay diagonal biru |
| 2026-08-13 | AI (Kiro) | Perpendek konten text jadi lebih singkat | Done | 1 paragraf per card + 1 highlight bullet |
| 2026-08-13 | AI (Kiro) | Tambah button "Show Less" di bawah 3 cards | Done | Button biru solid dengan animasi fade in |
| 2026-08-13 | AI (Kiro) | **FIX:** Copy banner.jpeg ke folder public/ | Done | Next.js requires static assets in public/ folder |
| 2026-08-13 | AI (Kiro) | **REVISI 2:** Hapus button, implementasi scroll-triggered | Done | Hero fade saat scroll dengan useScroll & useTransform |
| 2026-08-13 | AI (Kiro) | Perbesar ukuran sticky cards | Done | Padding 16 (lg:p-16), gap 10, font size lebih besar |
| 2026-08-13 | AI (Kiro) | Tambah badge label per card (1965, 1990-2020, Prestasi) | Done | Badge dengan icon di atas heading setiap card |
| 2026-08-13 | AI (Kiro) | Tambah "Scroll untuk melihat lebih lanjut" text dengan icon | Done | Animated bounce arrow di hero card |
| 2026-08-13 | AI (Kiro) | Implementasi whileInView animation untuk setiap card | Done | Fade in + slide up saat card masuk viewport |
| 2026-08-13 | AI (Kiro) | Update path gambar dari /layout_image/ ke /banner.jpeg | Done | Semua Image component sekarang pakai /banner.jpeg |
| 2026-08-13 | AI (Kiro) | **REVISI 3:** Hero card scale down (bukan fade out) | Done | useTransform: scale 1→0.15, y 0→-400, realtime saat scroll |
| 2026-08-13 | AI (Kiro) | Perbesar tinggi sticky cards menjadi 70vh (3/4 hero) | Done | minHeight: 70vh per card untuk fokus baca konten |
| 2026-08-13 | AI (Kiro) | Perbesar font size konten cards | Done | Heading text-6xl, body text-2xl untuk readability |
| 2026-08-13 | AI (Kiro) | Set gambar cards min-h-[500px] dengan h-full | Done | Gambar lebih tinggi mengikuti card height |
| 2026-08-13 | AI (Kiro) | Adjust container minHeight jadi 450vh & 3200px | Done | Lebih smooth scroll transition |
| 2026-08-13 | AI (Kiro) | **REVISI 4:** Hero card hanya HEIGHT yang mengecil (gepeng) | Done | useTransform height: 88vh→12vh, width tetap seperti sticky cards |
| 2026-08-13 | AI (Kiro) | Tambah margin antara hero & sticky cards | Done | mt-16 pada cards container, mb-8 pada hero wrapper |
| 2026-08-13 | AI (Kiro) | Content sticky cards lebih center vertikal | Done | items-center pada grid (sebelumnya items-stretch) |
| 2026-08-13 | AI (Kiro) | Text body pakai text-justify (align left & right) | Done | text-justify pada semua paragraf dan bullet text |
| 2026-08-14 | AI (Kiro) | **FIX BUG:** Flicker saat scroll pelan dengan useState + RAF | Done | Ganti useTransform nested dengan useState + RAF + CSS transition |
| 2026-08-14 | AI (Kiro) | Fix sticky card 1 tertimpa hero gepeng | Done | Card 1 position top-40, cards container pt-32 |
| 2026-08-14 | AI (Kiro) | Tambah sticky card ke-4 "Era Digital & Inovasi" | Done | Total 4 cards dengan position top-40/48/56/64 |
| 2026-08-14 | AI (Kiro) | Adjust section height dan transisi untuk 4 cards | Done | Section 480vh, container 3400px, hero fade [0.6, 0.75] |

**Status Fase 1 saat ini**: `Done` ✅

> **User feedback final (2026-08-14):** "Oke untuk sekarang sudah pas dan cukup bagian sejarah"
> **Section Sejarah COMPLETED - Ready for next section (Visi & Misi)**

> **Perubahan Major yang Sudah Dilakukan (FINAL - APPROVED 2026-08-14):**
> 1. ✅ Gradient diagonal smooth (135deg) dari biru gelap ke biru terang
> 2. ✅ Card hero FULL WIDTH (95vw) dengan margin atas lebih besar
> 3. ✅ Background hero card pakai banner.jpeg dengan overlay
> 4. ✅ **Hero card HEIGHT mengecil (88vh → 12vh) jadi GEPENG, width tetap**
> 5. ✅ **Tidak scale proporsional** - hanya tinggi yang shrink
> 6. ✅ **Margin/padding antara hero & sticky cards** (mt-16, mb-8)
> 7. ✅ **Tidak ada button** - fully scroll-driven behavior
> 8. ✅ 3 cards sticky scroll behavior (top-24, top-32, top-40)
> 9. ✅ **Cards TINGGI 70vh** (3/4 dari hero card) untuk fokus baca
> 10. ✅ **Content cards lebih center vertikal** (items-center)
> 11. ✅ **Text justify** (align left & right) untuk semua body text
> 12. ✅ Font size lebih besar - heading text-6xl, body text-2xl
> 13. ✅ Gambar cards min-h-[500px] dengan h-full
> 14. ✅ Badge label per card dengan icon & timeline
> 15. ✅ whileInView animation per card (fade + slide up)
> 16. ✅ "Scroll untuk melihat lebih lanjut" dengan animated arrow
> 17. ✅ Path gambar fixed (public/banner.jpeg)
> 18. ✅ **Fix flicker bug** dengan useState + RAF approach (bukan useTransform nested)
> 19. ✅ **4 sticky cards** total (tambah card "Era Digital & Inovasi")
> 20. ✅ Sticky positions: top-40, top-48, top-56, top-64
> 21. ✅ Hero fade out adjusted untuk 4 cards: [0.6, 0.75]
> 22. ✅ Card 1 tidak tertimpa hero gepeng (spacing fixed)
> 
> **Status: ✅ DONE - Section Sejarah COMPLETED (2026-08-14)**
> **Files:**
> - `components/sections/profil-sekolah/sejarah-section.tsx`
> - `app/(public)/profil-sekolah/page.tsx`
> - `public/banner.jpeg`
> 
> **Ready for next section: Visi & Misi**

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Tidak berlaku — konten Static.** Sejarah adalah konten yang hardcoded di component, tidak memerlukan CRUD dari admin panel.

**Status Fase 2**: `N/A (Static Content)`

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Done | User | 2026-08-14 |
| Fase 2 | N/A (Static) | | |

**Ringkasan status SRS ini**: 🟢 Done - Section Sejarah COMPLETED (2026-08-14)
