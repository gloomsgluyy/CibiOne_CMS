# SRS — Home / Berita Terbaru

## Requirement

- Section appears after Highlight Prestasi.
- Layout uses responsive masonry columns: one mobile, two tablet, three desktop.
- Cards use the supplied Cutout Card compound component.
- Variable media ratios create visual hierarchy.
- Final data source is published CMS posts; current content is mock layout data.
- Clicking a card opens a shared-layout detail popup; its CTA links to `/berita/[slug]`.
- Popup traps focus, locks background scroll, and closes through backdrop, close button, or Escape.

## Execution Log

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-15 | AI Assistant | Menambahkan source component `CutoutCard`, dependency controllable state, dan masonry Berita Terbaru dengan enam mock berita. | Waiting for Approval | Build production lolos; integrasi query CMS belum dilakukan. |
| 2026-08-15 | AI Assistant | Menambahkan fase popup detail shared-layout saat card Berita diklik. | Waiting for Approval | CTA detail tetap menuju route berita. |
