# UI Design — Sarana & Prasarana Editor

**Routes:** `/admin/sarana-prasarana/baru`, `/admin/sarana-prasarana/[id]`  
**API:** `POST /api/sarana-prasarana`, `GET/PUT /api/sarana-prasarana/[id]`, upload `/api/uploads`

## Layout

Desktop 7:5. Left: title and description. Right: image upload, presentation slot, sort order, published state. Header actions. Mobile single column plus sticky actions.

## Fields

Title max 240 required. Description max 5,000. Image. Slot enum: featured_large, standard, tall, wide. Sort order >=0. Published toggle.

## Slot Picker

Four keyboard-selectable tiles show visual proportions and human labels. Preview canvas reflects selected slot. Empty image uses `Building2` placeholder. No drag/drop masonry editor.

## States

Upload, validation, save success/error, empty image, and 403 are required design states.
