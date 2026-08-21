# UI Design — Guru & Staff Editor

**Routes:** `/admin/guru/baru`, `/admin/guru/[id]`  
**API:** `POST /api/guru`, `GET/PUT /api/guru/[id]`, upload `/api/uploads`

## Layout

Desktop 7:5. Left card: name, position, bio. Right card: photo upload, category, scope, order, published toggle. Header actions match content editor. Mobile single column with sticky actions.

## Fields

Name max 160 required. Position max 160. Bio max 5,000. Image. Category. Jurusan. Sort order >=0. Published state.

## Image

Portrait preview 1:1 or 3:4, object-cover, replace/remove states. Cropper is Future; do not design crop controls as persisted behavior.

## Preview and States

Show compact public-like profile card. Validate inline; preserve form on error; show upload error separately. Scope selector is super-admin-only.
