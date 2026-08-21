# UI Design — Akreditasi Editor

**Route:** `/admin/pengaturan/akreditasi`  
**API:** `GET/PUT /api/settings/school_accreditation`

## Layout

Header with title, breadcrumb, `Simpan perubahan`. General fields at top. Below: card editor list on left and responsive grid preview on right desktop; stacked on mobile.

## General Fields

Heading max 240. Description max 5,000.

## Accreditation Card

Maximum 12. Add/edit drawer fields: slot, card type, tag max 120, title max 240, description max 2,000, image nullable. Card type `image` reveals upload; `text` hides image. Slot labels: Utama besar, Standar, Tinggi, Lebar.

## Card List

Each row: order, thumbnail/placeholder, tag, title, slot, type, edit/delete. Reorder is client-side and persisted in array order. Preview is a masonry/grid representation, not a freeform canvas.

## States

Empty cards, max 12, upload, image missing warning, validation, save error/success, and forbidden state.
