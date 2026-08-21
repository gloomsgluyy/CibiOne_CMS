# UI Design — Visi & Misi Editor

**Route:** `/admin/pengaturan/visi-misi`  
**API:** `GET/PUT /api/settings/school_vision_mission`

## Layout

Header with breadcrumb and actions `Batal`/`Simpan perubahan`. Desktop 7:5: left background image and public preview, right form. Mobile one column.

## Fields

Required background image URL. Two collapsible panels: Visi and Misi. Each contains title max 160, subtitle max 240, description max 5,000, and points repeater max 12. Point title max 160, description max 2,000.

## Repeater

Point row includes number, title, description, remove. `Tambah poin` disabled at 12. Up/down ordering may be client-side; save array order through PUT. No raw JSON editor.

## Preview

16:9 background preview with brand overlay. Show Visi/Misi public panel representation, not editable layout controls. Image upload uses shared upload states.

## States

Loading skeleton, setting not found, validation, save success/error, max-point state, forbidden for jurusan admin.
