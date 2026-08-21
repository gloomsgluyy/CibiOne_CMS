# UI Design — Mitra Industri List

**Route:** `/admin/mitra-industri`  
**API:** `GET/POST /api/kerjasama-industri`, detail `/api/kerjasama-industri/[id]`

## Header and Table

Header `Mitra Industri`, description, primary `Tambah mitra`. Columns: logo, name, website, scope, order, status, actions. Logo tile 48x48, white background, object-contain. Website one line with tooltip/focus reveal.

## Mobile

Card retains logo, name, website, status, and overflow actions. Scope metadata remains visible for super admin.

## States

Empty `Belum ada mitra industri.`; loading skeleton; API error; pagination; confirmation. Scope selector/filter is unavailable to jurusan admin except their fixed context.
