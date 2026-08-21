# UI Design — Dashboard

**Route:** `/admin`  
**Data:** `getDashboardSummary(session)`

## Layout

Header: `Dashboard` plus `Ringkasan konten yang dapat Anda kelola.`. For `jurusan_admin`, show scope chip `Konten jurusan Anda`. Desktop grid: four cards for super admin; three cards for jurusan admin. Mobile: one column.

## Widgets

Each card has 40 px icon tile, label, large tabular number, and text link with arrow.

| Card | Icon | Value | CTA |
|---|---|---|---|
| Konten | `Newspaper` | `posts` | `Kelola konten` |
| Guru & Staff | `GraduationCap` | `guru` | `Kelola guru` |
| Mitra Industri | `Handshake` | `partners` | `Kelola mitra` |
| Sarana & Prasarana | `Building2` | `facilities` | `Kelola sarana` |

Sarana card hidden for jurusan admin. Zero is valid data, not an error.

## States

Four structural skeleton cards while loading. Alert + `Coba lagi` on query failure. No-data fallback still shows zero cards.

## Top Posts

- Tampilkan maksimal lima post berdasarkan `viewCount` tertinggi.
- Setiap row: ranking, banner, judul, kategori/tipe, tanggal terbit, views, dan CTA edit.
- Preview lokal tanpa database boleh memakai dummy fixture agar desain dapat direview; production wajib memakai query database.

## Explicitly Excluded

No views time-series chart, quality score, activity log, trend, or progress circle. Top posts memakai `posts.viewCount` yang sudah tersedia.

## Deliverables

Super admin desktop/mobile. Jurusan admin desktop/mobile. Loading and error.
