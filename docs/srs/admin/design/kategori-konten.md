# UI Design — Kategori Konten

**Route:** `/admin/kategori-konten`  
**API:** `/api/post-categories`, `/api/post-categories/[id]`

## Layout

Page header `Kategori Konten`, description, primary `Tambah kategori`. Desktop table; mobile cards. Add/edit opens right drawer 480 px, full-screen on mobile.

## Table

Columns: Nama, Slug, Scope, Status aktif, Terakhir diubah, actions. Row actions: Edit, Aktifkan/Nonaktifkan, Nonaktifkan record when deletion requested.

## Drawer

Fields: Nama, Slug, Deskripsi, Scope, Status aktif. Scope selector only super admin. Footer sticky `Batal` + `Simpan kategori`.

## Safety and States

Associated categories use `isActive=false`; dialog copy explains historical posts retain the category. Empty, skeleton, validation, conflict, and 403 states required.
