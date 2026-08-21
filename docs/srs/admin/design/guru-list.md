# UI Design — Guru & Staff List

**Route:** `/admin/guru`  
**API:** `GET/POST /api/guru`, detail `/api/guru/[id]`

## Header and Filters

Title `Guru & Staff`, description, primary `Tambah guru/staff`. Filter category; jurusan only for super admin. Do not show a school-wide selector to jurusan admin.

## Table/Card

Columns desktop: avatar/name, position, category, scope, sort order, status, actions. Avatar 40x40, object-cover, initials fallback. Bio excluded from list. Mobile card retains avatar, name, position, status, overflow action.

## Actions and States

Edit, publish/unpublish, nonaktifkan with confirmation. Pagination metadata visible. Empty copy `Belum ada data guru atau staff.` Loading skeleton and API error alert required.

## Deliverables

Super admin, jurusan admin, mobile cards, empty, loading, error, confirmation.
