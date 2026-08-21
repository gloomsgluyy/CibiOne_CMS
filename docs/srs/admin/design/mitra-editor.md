# UI Design — Mitra Industri Editor

**Routes:** `/admin/mitra-industri/baru`, `/admin/mitra-industri/[id]`  
**API:** `POST /api/kerjasama-industri`, `GET/PUT /api/kerjasama-industri/[id]`, upload `/api/uploads`

## Layout

Desktop 7:5. Left: name, description, website. Right: logo upload, jurusan, sort order, published state. Header actions; mobile sticky actions.

## Fields

Name max 240 required. Logo nullable. Description max 5,000. Website URL nullable. Jurusan scope. Sort order >=0. Published toggle.

## Preview

Logo card uses white surface and object-contain so transparent marks remain readable. Website validation is inline; do not auto-open URL.

## States

Empty logo, upload progress/error, invalid URL, validation, save error/success, and scope-forbidden state.
