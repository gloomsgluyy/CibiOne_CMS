# SRS — Kerja Sama Industri Section (Profil Sekolah)

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Kerja Sama Industri |
| Tipe Konten | Dynamic - List |
| PIC Programmer | AI Agent |
| Reviewer / Approver | User |
| Component Registry Reference | User-provided source code (LogoCloud + InfiniteSlider component) |
| Code Reference Folder | User provided component source code in chat |
| Tanggal dibuat | 2026-08-16 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

**Layout dari tim desain**: 
- `layout_image/layout_profil.jpeg` — section "Kerja Sama Industri" (section terakhir)
- User description: Logo carousel dengan animasi infinity loop, auto-scroll only (no user interaction)

**Deskripsi dari tim desain**:
- Section title: "Kerja Sama Industri" (sesuai dengan section lain)
- Subtitle: Deskripsi singkat tentang partnership industri SMKN 1 Cibinong
- Logo carousel: Infinite horizontal scroll, seamless loop
- Background: **#1b4d96** (dark blue - berbeda dari section lain)
- Auto-scroll only: User tidak bisa drag/swipe, purely display
- Typography: Sama dengan section sebelumnya (text-4xl/5xl/6xl title, text-lg subtitle, gray-900 atau white untuk dark bg)
- Font: Poppins (already configured in project)
- Responsive: Mobile → Tablet → Desktop

**Component/Template yang dipakai**:
- **User-provided source code**: `LogoCloud` component + `InfiniteSlider` component
- Component structure:
  ```tsx
  <LogoCloud logos={logos} />
  // Uses InfiniteSlider with props: gap, reverse, speed, speedOnHover
  ```
- Logo array format: `{ src: string, alt: string, width?: number, height?: number }`
- Mask effect: `linear-gradient(to_right,transparent,black,transparent)` untuk fade edges
- Animation: Continuous scroll dengan `InfiniteSlider` (no pause, no drag)

**Code reference yang wajib diikuti**:
User provided full component code:
1. `LogoCloud` component (wrapper dengan mask-image gradient)
2. `InfiniteSlider` component (handles infinite scroll animation)
3. Usage example dengan 8 company logos

**Component implementation plan**:
1. Create `components/ui/infinite-slider.tsx` (reusable infinite carousel primitive)
2. Create `components/ui/logo-cloud.tsx` (logo-specific wrapper)
3. Create `components/sections/profil-sekolah/kerja-sama-industri-section.tsx` (section wrapper)
4. Populate dengan logo mitra industri SMKN 1 Cibinong (placeholder atau dari website)

**Design Tokens**:
- Background: `bg-[#1b4d96]` (dark blue, bukan gradient)
- Text colors (on dark bg):
  - Title: `text-white` (contrast terhadap #1b4d96)
  - Subtitle: `text-white/80` atau `text-blue-100`
- Typography:
  - Section title: `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight`
  - Section subtitle: `text-base sm:text-lg`
- Logo styling:
  - Height: `h-8 md:h-10` (adjust based on logo clarity)
  - Filter untuk contrast: `brightness-0 invert` (jika logo dark, convert to white for visibility on dark bg)
  - Grayscale option: `grayscale opacity-80 hover:grayscale-0 hover:opacity-100` (subtle effect)
- Carousel settings:
  - Gap: `42px` (from reference)
  - Speed: `80` (from reference, adjust jika terlalu cepat/lambat)
  - SpeedOnHover: `25` (slower on hover, dari reference)
  - Reverse: `false` (default left-to-right)
- Mask gradient: `[mask-image:linear-gradient(to_right,transparent,black,transparent)]`
- Spacing: `py-24 px-4`, section min-height sesuai content

**Logo mitra placeholder** (akan diisi dengan logo asli SMKN 1 Cibinong):
- Industri teknologi (software houses, IT companies)
- Perusahaan manufaktur
- Lembaga sertifikasi
- Universitas partner
- Government institutions

**Responsive behavior**:
- Mobile: Logo height `h-6`, gap smaller
- Tablet: Logo height `h-8`, standard gap
- Desktop: Logo height `h-10`, full gap
- Scroll speed konsisten di semua breakpoints

**File structure**:
- `components/ui/infinite-slider.tsx` — Core infinite scroll logic
- `components/ui/logo-cloud.tsx` — Logo carousel wrapper
- `components/sections/profil-sekolah/kerja-sama-industri-section.tsx` — Section component
- Usage: Import di `app/(public)/profil-sekolah/page.tsx`

---

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-16 | AI Agent | Create SRS document | Done | User instruction: buat SRS dulu, hold revisions, finalize SRS after user approval |
| 2026-08-16 | AI Agent | Create infinite-slider.tsx | Done | 70 lines - Core infinite scroll animation component dengan hover speed control |
| 2026-08-16 | AI Agent | Create logo-cloud.tsx | Done | 40 lines - Logo carousel wrapper dengan mask gradient edges |
| 2026-08-16 | AI Agent | Create kerja-sama-industri-section.tsx | Done | 95 lines - Section dengan bg #1b4d96, title white, 8 placeholder logos |
| 2026-08-16 | AI Agent | Add to profil-sekolah page | Done | Import + render KerjaSamaIndustriSection |
| 2026-08-16 | AI Agent | Add CSS animation keyframes | Done | Added @keyframes infinite-scroll dan .animate-infinite-scroll class to app/globals.css |
| 2026-08-16 | AI Agent | Revisi: update logos, height, sizes | Done | User feedback: logos tidak muncul, section terlalu tinggi, logo terlalu kecil. Changes: logo array updated ke Wikipedia URLs (10 logos), section height py-24→py-16 removed min-h-screen, logo sizes h-8/10→h-12/16/20, gap 42→60 |
| 2026-08-16 | AI Agent | Fix hover speed bug + add click feature | Done | User: speed berbeda saat hover (bug), minta click logo untuk show detail. Changes: removed hover speed logic dari InfiniteSlider, added onClick handler to LogoCloud (pointer-events-auto, cursor-pointer, hover:scale-110), added company descriptions to partner data, implemented modal UI dengan AnimatePresence for smooth animations |
| 2026-08-16 | AI Agent | Increase carousel height | Done | User: "logo infinity loop agak lebih tinggi sedikit" - increased py-4 → py-8 in LogoCloud for more vertical space |
| 2026-08-16 | User | User approval final | Approved | User: "oke sip" - Section approved and ready for production |
| 2026-08-20 | OpenCode | Menetapkan Kerja Sama Industri sebagai Dynamic - List | Waiting for Approval | Logo, deskripsi, urutan, dan scope jurusan akan dikelola CMS; slider/modal tetap sama. |

**Status Fase 1 saat ini**: `Done` ✅

**Final Deliverables**:
- ✅ Components: InfiniteSlider (52 lines), LogoCloud (42 lines), KerjaSamaIndustriSection (230 lines)
- ✅ Background: #1b4d96 (dark blue - distinctive from other sections)
- ✅ Logo carousel: 10 tech companies (Google, Microsoft, IBM, AWS, Cisco, Oracle, Intel, Dell, HP, Samsung)
- ✅ Logo sizes: h-12 md:h-16 lg:h-20, gap 60px, py-8 vertical padding
- ✅ Animation: Infinite scroll, speed 80s (consistent, no hover variation), CSS keyframes
- ✅ Interactive: Click logo to open modal with company name + partnership description
- ✅ Modal: AnimatePresence fade animations, backdrop blur, click outside/X to close
- ✅ Company data: Each partner has name, description of partnership program
- ✅ Typography: text-4xl/5xl/6xl title white, text-lg subtitle white/80
- ✅ Section height: py-16 (1/4-1/2 screen height as requested)
- ✅ Integrated: Added to profil-sekolah page.tsx
- ✅ CSS: Added @keyframes infinite-scroll to globals.css

**Summary**:
- ✅ Components created: InfiniteSlider, LogoCloud, KerjaSamaIndustriSection
- ✅ Background: #1b4d96 (dark blue)
- ✅ Typography: text-4xl/5xl/6xl title white, text-lg subtitle white/80
- ✅ Logo carousel: 8 placeholder logos (Google, Microsoft, IBM, Oracle, Cisco, AWS, Intel, Dell)
- ✅ Animation: infinite scroll, speed 80, speedOnHover 25, no user drag
- ✅ Mask effect: linear-gradient fade on edges
- ✅ Integrated to page.tsx
- ✅ CSS keyframes added to globals.css for infinite-scroll animation

---

## Fase 2 — Backend Logic CMS

> Menunggu reviewer menyatakan Fase 1 `Done` sebelum implementasi dimulai.

- **Pattern yang dipakai**: `ContentList` melalui tabel `kerjasama_industri`.
- **Field tambahan**: `name`, `logo_url`, `description`, `website_url`, `sort_order`, `jurusan_id`, `is_published`.
- **Endpoint API**: `/api/kerjasama-industri` dan `/api/kerjasama-industri/[id]`.
- **Role akses**: public membaca mitra terbit; `super_admin` mengelola semua; `jurusan_admin` hanya mengelola mitra dengan `jurusan_id` miliknya.
- **UI invariant**: logo cloud, infinite slider, dan modal detail membaca record yang sama tanpa mengubah pola visual.

---

## Fase 3 — Khusus AI Integration

> ⚠️ **Tidak berlaku.** Section ini bukan AI Chatbot.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Done ✅ | User | 2026-08-16 |
| Fase 2 | Not Started | | |
| Fase 3 | N/A | | |

**Ringkasan status SRS ini**: 🟢 Done - Section Kerja Sama Industri complete dan approved untuk production
