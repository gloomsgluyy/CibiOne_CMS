# SRS — Visi & Misi Section Revision (Profil Sekolah)

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Visi & Misi (Revision/Enhancement) |
| Tipe Konten | Static |
| PIC Programmer | AI Agent |
| Reviewer / Approver | User |
| Component Registry Reference | N/A (revision of existing component) |
| Code Reference Folder | N/A |
| Tanggal dibuat | 2026-08-16 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

**Layout dari tim desain**: 
- Existing Visi & Misi section with horizontal accordion (2 items: Visi and Misi)
- User requirements: Add scroll animations, adjust logo/icon sizes, increase text sizes, ensure responsive

**Deskripsi dari tim desain**:
- **Scroll animations**: Add fade + slide animation when accordion container appears on scroll
- **Logo size adjustment**: Increase numbered circle icons in point cards for better visibility
- **Text size increases**: 
  - Title in point cards: larger for readability
  - Description in point cards: larger for readability
- **Responsive**: Ensure all size changes work across mobile → tablet → desktop
- User reference: Screenshot showing desired logo and text sizing proportions

**Component yang direvisi**:
- `components/sections/profil-sekolah/visi-misi-section.tsx`
- Existing: Horizontal accordion with 2 items (Visi, Misi), each with 4 point cards
- Enhanced: Scroll animations, larger logos, larger text, responsive sizing

**Design Tokens**:
- Logo/Icon sizes:
  - Before: `w-12 h-12`, `text-lg` number
  - After: `w-16 h-16 md:w-20 md:h-20`, `text-xl md:text-2xl` number
- Text sizes in point cards:
  - Title before: `text-sm`
  - Title after: `text-base md:text-lg`
  - Description before: `text-xs`
  - Description after: `text-sm md:text-base`
- Animations:
  - Scroll: fade + slide (initial: opacity 0, y: 30 → animate: opacity 1, y: 0)
  - Duration: 0.6s, easing: cubic-bezier [0.22, 1, 0.36, 1]
- Background: Maintained existing bg-gray-50
- Typography: Maintained existing header styles (text-4xl/5xl/6xl)

**Features implemented**:
1. **Scroll animation on accordion container**: fade + slide when entering viewport
2. **Responsive logo sizes**: w-16 h-16 (mobile) → w-20 h-20 (tablet/desktop)
3. **Responsive text sizes**: Progressive scaling from mobile to desktop
4. **Maintained existing functionality**: Accordion expansion, hover effects, card interactions

---

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-16 | AI Agent | Add scroll animation to accordion container | Done | Wrapped accordion container with motion.div, added initial/whileInView props (opacity 0 y:30 → 1 y:0), duration 0.6s, ~7 lines |
| 2026-08-16 | AI Agent | Increase logo and text sizes with responsive classes | Done | Logo: w-12 h-12 → w-16 h-16 md:w-20 md:h-20, logo number: text-lg → text-xl md:text-2xl, title: text-sm → text-base md:text-lg, desc: text-xs → text-sm md:text-base, mb-2 → mb-3, ~9 lines |

**Status Fase 1 saat ini**: `Done` ✅

**Final Deliverables**:
- ✅ Component: `visi-misi-section.tsx` (~210 lines after revision, +6 lines net)
- ✅ Scroll animation: Accordion container fades + slides in when entering viewport
- ✅ Logo sizes: 
  - Mobile: w-16 h-16, text-xl number
  - Tablet/Desktop: w-20 h-20, text-2xl number
- ✅ Text sizes in point cards:
  - Title: text-base (mobile) → text-lg (tablet/desktop)
  - Description: text-sm (mobile) → text-base (tablet/desktop)
- ✅ Responsive: All size changes scale progressively across breakpoints
- ✅ Existing features preserved: Horizontal accordion, 2 items (Visi/Misi), 4 point cards each, expansion animation

**Chunked Write Protocol Compliance**:
- Total operations: 2
- Largest operation: 9 lines
- All operations: 7-9 lines each
- 100% compliance with <350 line limit ✅

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Tidak berlaku — konten Static.** Visi & Misi content di-hardcode di component. Tidak ada dynamic CMS functionality untuk Fase 1.

---

## Fase 3 — Khusus AI Integration

> ⚠️ **Tidak berlaku.** Section ini bukan AI Chatbot.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Done ✅ | User | 2026-08-16 |
| Fase 2 | N/A (Static) | | |
| Fase 3 | N/A | | |

**Ringkasan status SRS ini**: 🟢 Done - Visi & Misi section revision complete dan approved untuk production
