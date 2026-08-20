# SRS — Guru & Staff Section Revision (Profil Sekolah)

## Metadata

| Field | Isi |
|---|---|
| Halaman | Profil Sekolah |
| Section | Guru & Staff (Revision/Enhancement) |
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
- Existing Guru & Staff section with horizontal accordion
- User requirements: Add filtering, pagination, auto-advance, smooth animations

**Deskripsi dari tim desain**:
- **Filtering system**: 12 filter buttons (General, Staff, SIJA, RPL, TKJ, DKV, TKP, DPIB, TP, TFLM, TKR, TOI)
- **Pagination**: 5 items per page with dot indicators
- **Auto-advance**: Auto-scroll every 5 seconds
- **Pause on interaction**: Auto-advance pauses for 10 seconds when user clicks accordion or pagination dots
- **Smooth animations**: Scroll animations when sections appear, slide transition when data changes (no flickering)
- **Background color**: #eff7ff (light blue)
- **Responsive**: Mobile → Tablet → Desktop
- **Data**: Expand from 5 to 59 staff members across all categories

**Component yang direvisi**:
- `components/sections/profil-sekolah/guru-staff-section.tsx`
- Existing: Horizontal accordion with 5 leadership staff, modal detail view
- Added: Filtering, pagination, auto-advance, animations, expanded data

**Design Tokens**:
- Background: `#eff7ff` (light blue, different from other sections)
- Filter buttons:
  - Active: `bg-blue-600 text-white shadow-lg scale-105`
  - Inactive: `bg-white text-gray-700 hover:bg-blue-50 border border-gray-200`
- Pagination dots:
  - Active: `w-8 h-3 bg-blue-600` (wider)
  - Inactive: `w-3 h-3 bg-gray-300 hover:bg-gray-400`
- Typography: Maintained from existing (text-4xl/5xl/6xl title, text-lg subtitle)
- Animations:
  - Scroll: fade + slide (y: 30 → 0), duration 0.6s
  - Data change: slide (x: 50 → 0 → -50), duration 0.5s
  - Layout: smooth position changes with Framer Motion layout prop

**Features implemented**:
1. **Data expansion**: 59 staff members with category field
2. **Filtering**: 12 filter buttons, active state, click to filter
3. **Pagination**: 5 items per page, calculated totalPages
4. **Auto-advance**: setInterval 5000ms, cycles through pages
5. **Pause on interaction**: 10 second pause after user clicks accordion or dots
6. **Scroll animations**: Filter buttons, accordion container, pagination dots
7. **Slide transition**: Smooth left/right slide when changing pages/filters
8. **Reset logic**: currentPage resets to 0 when filter changes
9. **Responsive**: Maintained existing responsive design

---

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-16 | AI Agent | Expand guruStaffData array with categories | Done | Added 54 new staff members, total 59 across 12 categories (General, Staff, SIJA, RPL, TKJ, DKV, TKP, DPIB, TP, TFLM, TKR, TOI), compact format, ~59 lines |
| 2026-08-16 | AI Agent | Add useEffect import | Done | Added useEffect to imports for auto-advance logic |
| 2026-08-16 | AI Agent | Add filter & pagination state + logic | Done | useState for activeFilter/currentPage, filtering logic, pagination logic (5 per page), auto-advance useEffect (5s interval), reset page on filter change, ~32 lines |
| 2026-08-16 | AI Agent | Add filter buttons UI | Done | 12 filter buttons with active state styling, motion.div with whileInView scroll animation, ~22 lines |
| 2026-08-16 | AI Agent | Update accordion to use paginatedData | Done | Changed guruStaffData.map to paginatedData.map, 1 line |
| 2026-08-16 | AI Agent | Add pagination dots UI | Done | Dots navigation with active state, clickable to navigate pages, motion.div with scroll animation, ~23 lines |
| 2026-08-16 | AI Agent | Add scroll animations to accordion | Done | Wrapped accordion container with motion.div, initial/whileInView props, ~18 lines |
| 2026-08-16 | AI Agent | Change background color | Done | Changed bg-gray-50 to style={{ backgroundColor: '#eff7ff' }}, 1 line |
| 2026-08-16 | AI Agent | Fix flickering with slide animation | Done | User feedback: flickering on auto-advance. Restructured to slide container approach, AnimatePresence mode="wait", slide x animation (50→0→-50), removed item-level animations, ~15 lines |
| 2026-08-16 | AI Agent | Fix closing tags for slide container | Done | Added closing tag for new motion.div wrapper, 1 line |
| 2026-08-16 | AI Agent | Add pause-on-interaction logic | Done | User: pause auto-advance saat user click. Added lastInteractionTime state, modified auto-advance to check interaction (10s pause), ~8 lines |
| 2026-08-16 | AI Agent | Wire accordion onClick to pause | Done | Updated accordion onClick to set lastInteractionTime, ~4 lines |
| 2026-08-16 | AI Agent | Wire pagination dots onClick to pause | Done | Updated dots onClick to set lastInteractionTime, ~4 lines |

**Status Fase 1 saat ini**: `Done` ✅

**Final Deliverables**:
- ✅ Component: `guru-staff-section.tsx` (~405 lines after revision)
- ✅ Data: 59 staff members across 12 categories
- ✅ Filtering: 12 filter buttons (General, Staff, SIJA, RPL, TKJ, DKV, TKP, DPIB, TP, TFLM, TKR, TOI)
- ✅ Pagination: 5 items per page, calculated totalPages, smooth transitions
- ✅ Auto-advance: Every 5 seconds, cycles through pages automatically
- ✅ Pause on interaction: 10 second pause after user clicks accordion or pagination dots
- ✅ Animations:
  - Scroll: Filter buttons, accordion container, pagination dots (fade + slide)
  - Data change: Slide transition (x: 50 → 0 → -50, no flickering)
  - Layout: Smooth accordion expansion/collapse
- ✅ Background: #eff7ff (light blue)
- ✅ Responsive: Mobile → Tablet → Desktop
- ✅ Existing features preserved: Horizontal accordion, modal detail view, activeIndex state

**Chunked Write Protocol Compliance**:
- Total operations: 13
- Largest operation: 59 lines (data array)
- All operations: 1-59 lines each
- 100% compliance with <350 line limit ✅

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Tidak berlaku — konten Static.** Staff data di-hardcode di component untuk prototype. Tidak ada dynamic CMS functionality untuk Fase 1.

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

**Ringkasan status SRS ini**: 🟢 Done - Guru & Staff section revision complete dan approved untuk production
