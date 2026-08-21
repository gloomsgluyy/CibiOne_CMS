# UI Design — Kategori Guru

**Route:** `/admin/kategori-guru`  
**API:** `/api/guru-categories`, `/api/guru-categories/[id]`

## Layout

Header `Kategori Guru`, primary `Tambah kategori`. Desktop table/mobile cards. Add/edit right drawer; full-screen mobile.

## Table and Form

Columns: Nama, Slug, Urutan, Scope, Status aktif, actions. Form fields only: Nama, Slug, Urutan, Scope, Status aktif. No description field; backend does not persist one.

## States

Empty, skeleton, validation, conflict, forbidden, and confirmation for deactivate/delete. Scope locked to own jurusan for jurusan admin.
