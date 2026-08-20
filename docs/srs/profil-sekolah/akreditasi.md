# SRS — Akreditasi Section (Profil Sekolah)

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Akreditasi (Membangun Standar Pendidikan yang Terpercaya) |
| Tipe Konten | Dynamic - Singleton |
| PIC Programmer | AI Agent |
| Reviewer / Approver | User |
| Component Registry Reference | Bento Grid Layout Pattern (user provided custom source code — asymmetric grid) |
| Code Reference Folder | User provided HTML source code in chat (bento grid pricing section) |
| Tanggal dibuat | 2026-08-15 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

**Layout dari tim desain**: 
- `layout_image/layout_profil.jpeg` — section "Membangun Standar Pendidikan yang Terpercaya"
- User-provided reference images showing bento grid layout with header + asymmetric cards

**Deskripsi dari tim desain**:
- Section title: "Membangun Standar Pendidikan yang Terpercaya"
- Description: "SMKN 1 Cibinong berkomitmen mewujudkan pendidikan berkualitas dengan standar akreditasi yang terpercaya. Melalui fasilitas lengkap, tenaga pendidik berkompeten, dan kurikulum yang terus berkembang, kami memastikan lulusan siap bersaing di industri"
- Full-screen height (min-h-screen)
- Background: **Blue gradient** (biru muda/cyan — berbeda dari section sebelumnya yang white/gray)
- Bento grid layout dengan card asymmetric (berbagai ukuran grid)
- Card content: Mix of text-only cards dan image cards (TIDAK boleh image saja, harus ada text description)
- Smooth scroll animations (fade + slide in dengan stagger delays)
- Responsive: Mobile (1 col) → Tablet (6 cols) → Desktop (12 cols grid)

**Component/Template yang dipakai**:
- **User-provided HTML code** (bento grid pricing section) — akan diadaptasi untuk konten akreditasi sekolah
- Layout Pattern: Asymmetric bento grid (`grid-cols-12` dengan `col-span` dan `row-span` bervariasi)
- Animation: `[animation:fadeSlideIn_0.8s_ease-out_<delay>_both]` pattern dengan `animate-on-scroll` class
- Card styles: `rounded-3xl`, `border-gradient`, glass effect backgrounds

**Code reference yang wajib diikuti**:
- User provided full HTML bento grid code in chat
- Struktur grid: `grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12` dengan `auto-rows-[200px]`
- Cards dengan varying spans: `md:col-span-3 lg:col-span-6`, `md:row-span-2`, etc.
- Animation delays: 0.3s, 0.4s, 0.5s, 0.6s, 0.7s, 0.8s, 0.9s, 1s (staggered)
- Border gradient utility class (sudah ada di project)
- Background variations: glass effect `bg-white/5`, solid white cards, gradient overlays

**Konten placeholder** (dari https://profile.smkn1cibinong.sch.id/):
- Akreditasi A (BAN-S/M)
- Program keahlian terakreditasi
- Sertifikasi ISO
- Kerjasama dengan industri
- Fasilitas standar industri
- Tenaga pengajar bersertifikat
- Kurikulum adaptif industri
- Lulusan terserap industri (persentase)

**Design Tokens** (dari project existing):
- Colors: 
  - Background section: `bg-gradient-to-b from-blue-50 to-cyan-50` (light blue gradient)
  - Text title: `text-gray-900`
  - Text description: `text-gray-600`
  - Card backgrounds: white cards (`bg-white`), glass cards (`bg-white/5` or `bg-gray-900/5`)
  - Accent: `text-blue-600`, `bg-blue-500/10`
- Typography:
  - Section title: `text-4xl sm:text-5xl font-bold tracking-tight`
  - Section desc: `text-lg text-gray-600 max-w-3xl`
  - Card title: `text-xl sm:text-2xl font-semibold tracking-tight`
  - Card text: `text-sm text-gray-600`
- Spacing: `py-24`, `px-4`, `gap-4 md:gap-6`
- Radius: `rounded-3xl`, `rounded-2xl`
- Border: `border border-gray-200/50` atau `border-gradient` class

**Adaptasi dari source code**:
- Full section wrapper: `min-h-screen flex items-center` untuk full-screen height
- Background: Ganti dark background dengan light blue gradient
- Grid structure: Keep asymmetric layout tapi adjust card content untuk akreditasi
- Cards type:
  1. **Stat cards** (white bg) — Akreditasi A, percentage stats
  2. **Image cards** dengan text overlay — fasilitas, kegiatan
  3. **Text-only cards** (glass bg) — deskripsi program, sertifikasi
  4. **Icon cards** — visual indicators untuk achievement
- Animation: Intersection Observer untuk trigger `animate-on-scroll` (atau Framer Motion `whileInView`)

**File structure**:
- Component: `components/sections/profil-sekolah/akreditasi-section.tsx`
- Usage: Import di `app/(public)/profil-sekolah/page.tsx`

---

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-15 | AI Agent | Create SRS document | Done | Ready for implementation |
| 2026-08-15 | AI Agent | Create `akreditasi-section.tsx` component (v1) | Done | Initial bento grid with mixed card types |
| 2026-08-15 | AI Agent | Add AkreditasiSection to profil-sekolah page | Done | Import + render in page.tsx |
| 2026-08-15 | AI Agent | Revamp layout to masonry gallery style | Done | User feedback: layout kurang pas, ubah jadi portfolio masonry grid seperti reference image |
| 2026-08-15 | AI Agent | Complete rewrite akreditasi-section.tsx (v2) | Done | 125 lines - Masonry portfolio gallery dengan image cards + text overlay |
| 2026-08-15 | AI Agent | Fix file structure error | Done | User reported: "struktur file ancur dan error" - cleaned up duplicate/orphaned code at EOF, full rewrite 155 lines |
| 2026-08-15 | AI Agent | Major layout revision (v3) | Done | User feedback: grid bolong, semua bg image, judul kurang besar. Changes: 7 cards full grid (col-span 3/4/5), mix image+text cards, text cards dengan backdrop white/70, judul lg:text-6xl dengan <br/>, subtitle ringkas + spacing |
| 2026-08-15 | AI Agent | Fill gap in row 2 middle (v4) | Done | User: "yang kosong bagian tengah itu diisi" - added card #5 (Kurikulum Adaptif text card, col-span-3) to fill row 2 middle gap, total 8 cards, reordered for proper flow |
| 2026-08-15 | AI Agent | Fix card heights + enhance backdrops (v5) | Done | User: card Pembelajaran terlalu tinggi, minta backdrop lebih bagus. Changes: card #7 row-span-2→1, col-span-5→6, row 3 now 3+6+3; Enhanced backdrops: image cards (gradient 95/60/20, backdrop-blur, drop-shadow), text cards (bg-white/80, backdrop-blur-xl, shadow-lg) |
| 2026-08-15 | User | User approval v5 | Approved | User: "oke untuk sekarang sudah pas" - Section approved and ready for production |
| 2026-08-20 | OpenCode | Mendokumentasikan perubahan Akreditasi menjadi Dynamic - Singleton | Waiting for Approval | Super admin mengelola setting dan card per slot; struktur bento/animasi tidak dapat diubah CMS. |

**Status Fase 1 saat ini**: `Done` ✅

**Final Deliverables (v5)**:
- ✅ Component: `components/sections/profil-sekolah/akreditasi-section.tsx` (178 lines)
- ✅ Layout: Masonry portfolio grid, 8 cards, full-screen height, responsive mobile→tablet→desktop
- ✅ Background: Blue gradient (from-blue-50 to-cyan-50) - distinctive from other sections
- ✅ Header: text-4xl/5xl/6xl title dengan line break, text-lg subtitle, gray-900/600 colors
- ✅ Grid: 12-column responsive (col-span-3/4/5/6), auto-rows-[280px], no gaps
- ✅ Cards: 4 image cards + 4 text cards
  - Image cards: gradient overlay (95/60/20), backdrop-blur, drop-shadows, hover scale effect
  - Text cards: bg-white/80, backdrop-blur-xl, shadow-lg, blue accent tags
- ✅ Content: Akreditasi A, Fasilitas, 92% Lulusan, Sertifikasi ISO, Kurikulum, 100% Guru, Pembelajaran Inovatif, Program Keahlian
- ✅ Animations: Framer Motion stagger (0.08s), fade+slide (y:30→0), duration 0.6s
- ✅ Integrated: Added to `app/(public)/profil-sekolah/page.tsx`

**Summary v2** (latest):
- ✅ Layout: Masonry-style portfolio grid (seperti reference image user)
- ✅ 6 gallery cards dengan varying sizes (col-span-4 row-span-2, col-span-4 row-span-1)
- ✅ All cards: Image background + gradient overlay + text content
- ✅ Card structure: Tag badge → Title → Description (all overlay on image)
- ✅ Content: Akreditasi A, Fasilitas, 92% Lulusan, Sertifikasi ISO, Pembelajaran Inovatif, Guru 100%
- ✅ Hover effects: Image scale-110, title translate-y
- ✅ Background: `bg-gradient-to-b from-blue-50 to-cyan-50` (full-screen)
- ✅ Typography: text-4xl/5xl title, text-lg desc (Poppins from project config)
- ✅ Animations: Framer Motion stagger (0.08s delay), fade+slide (y:30 → 0), duration 0.6s
- ✅ Responsive: grid-cols-1 (mobile) → md:grid-cols-6 → lg:grid-cols-12, auto-rows-[280px]
- ✅ Styling: rounded-2xl, gradient overlay from-gray-900/90, backdrop-blur tags

---

## Fase 2 — Backend Logic CMS

> Menunggu reviewer menyatakan Fase 1 `Done` sebelum implementasi dimulai.

- **Pattern yang dipakai**: `SiteSetting`.
- **Key/value**: key `school_accreditation`; value JSON berisi heading, deskripsi, serta card data (`slot`, `title`, `description`, `tag`, `imageUrl`, `cardType`).
- **Endpoint API**: `GET /api/settings/school_accreditation`, `PUT /api/settings/school_accreditation`.
- **Role akses**: public read; hanya `super_admin` dapat mengubah.
- **UI invariant**: admin memasukkan card satu-per-satu ke slot presentation yang telah disediakan; bento grid, ukuran slot, dan animasi tetap sama.

---

## Fase 3 — Khusus AI Integration

> ⚠️ **Tidak berlaku.** Section ini bukan AI Chatbot.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Done ✅ | User | 2026-08-15 |
| Fase 2 | Not Started | | |
| Fase 3 | N/A | | |

**Ringkasan status SRS ini**: 🟢 Done - Section Akreditasi complete dan approved untuk production
