# UI Design — Sarana & Prasarana List

**Route:** `/admin/sarana-prasarana`  
**API:** `GET/POST /api/sarana-prasarana`, detail `/api/sarana-prasarana/[id]`

## Access

Super admin only. Hide menu for jurusan admin. Direct unauthorized route shows 403 panel: `Anda tidak memiliki akses ke Sarana & Prasarana.` and `Kembali ke dashboard`.

## Layout

Header `Sarana & Prasarana`, description, primary `Tambah sarana`. Table/card columns: image, title, presentation slot, order, status, actions. Image tile 64x48 object-cover; building icon fallback.

## Slot Labels

Map API values to `Utama besar`, `Standar`, `Tinggi`, `Lebar`. Use badges, not raw enum strings.

## States

Empty, loading, API error, 403, pagination, confirmation. Mobile hides secondary metadata.
