# UI Design — Konten List

**Route:** `/admin/konten`  
**API:** `GET/POST /api/posts`, detail `/api/posts/[id]`

## Header

Breadcrumb `Admin / Konten`. Title `Konten`. Description `Kelola berita, pengumuman, prestasi, dan agenda.` Primary button `Tambah konten`.

## Toolbar

Type select: Berita, Pengumuman, Prestasi, Agenda. Category select. Jurusan select for super admin only. Sort: Terbaru/Populer. Featured/highlighted filters may use compact selects. Search and status filter marked `Future`, because current list API does not support them.

## Table

Desktop columns: thumbnail + title, type, category, scope, status, published date, featured/highlighted, actions. Use 64x44 thumbnail; fallback type icon. Row min-height 64 px.

Actions menu: `Edit`, `Sembunyikan dari publik` or `Terbitkan` when supported by editor, `Nonaktifkan`. Current DELETE unpublishes; confirmation must say content will disappear from public site.

## Mobile

Card list: thumbnail, title, type/status badges, published date, overflow menu. Hide secondary columns.

## Pagination and States

Show `Menampilkan x-y dari z`, previous/next, page buttons. Empty copy: `Belum ada konten.` CTA `Tambah konten`. Loading skeleton table/card. Error alert + retry. 403 preserves permission state.

## Deliverables

Populated desktop/mobile, empty, filtered, loading, error, confirmation dialog.
