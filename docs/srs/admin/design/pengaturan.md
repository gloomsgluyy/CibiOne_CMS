# UI Design — Pengaturan Index

**Route:** `/admin/pengaturan`  
**Role:** super admin only

## Layout

Header `Pengaturan`, description `Kelola konten singleton halaman sekolah.`. Two navigation cards in 2-column desktop grid, one column mobile.

## Cards

- `Visi & Misi`: icon `Target`, description, last updated when available, CTA `Kelola`.
- `Akreditasi`: icon `BadgeCheck`, description, last updated when available, CTA `Kelola`.

## Scope

Do not add cards for Hero, Sambutan, Video, Kontak, Struktur Organisasi, or other settings; no matching admin API in MVP. Jurusan admin receives 403 state on direct access.
