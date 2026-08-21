# Admin UI Design Foundations

## Visual Direction

Editorial workspace: terang, tenang, presisi. Poppins sebagai font utama. Biru sekolah sebagai aksi utama; oranye JHIC sebagai aksen terbatas. Hindari dark dashboard generik, neon, glassmorphism penuh, dan animasi dekoratif.

## Tokens

| Token | Value | Use |
|---|---|---|
| `brand-900` | `#082E70` | Login overlay, surface gelap |
| `brand-800` | `#0B3477` | Hover/pressed |
| `brand-700` | `#123E91` | Selected nav |
| `brand-600` | `#1D4F98` | Primary action, link, focus |
| `brand-100` | `#E8F1F6` | Selected/soft surface |
| `brand-50` | `#F4F8FA` | Main canvas |
| `jhic-600` | `#E85D04` | Accent/badge only |
| `jhic-100` | `#FFF0E6` | Accent surface |
| `ink-950` | `#0F172A` | Heading |
| `ink-700` | `#334155` | Body |
| `ink-500` | `#64748B` | Metadata/placeholder |
| `line-200` | `#E2E8F0` | Border/divider |
| `surface-0` | `#FFFFFF` | Card/input |
| `surface-50` | `#F8FAFC` | Table header/secondary surface |
| `success` | `#15803D` / `#DCFCE7` | Published |
| `warning` | `#B45309` / `#FEF3C7` | Draft |
| `danger` | `#B91C1C` / `#FEE2E2` | Error/destructive |

Typography: Poppins 400/600/700. Page title 24/22 px desktop/mobile. Section title 18 px. Body 14 px, helper 12 px, label 13 px 600, metric 30/28 px. Minimum text 12 px.

Spacing: 4 px grid. Common values 8, 12, 16, 20, 24, 32, 40 px. Radius: input/button 8 px, card 12-16 px, dialog 16 px. Card border `line-200` + subtle shadow; no heavy shadow except login card.

## Shell

- Desktop >=1024: sidebar 272 px fixed; top bar 72 px sticky; content padding 32 px; canvas `brand-50`.
- Tablet 768-1023: sidebar 232 px or compact rail; content padding 24 px.
- Mobile <768: top bar 64 px; sidebar drawer max 320 px; content padding 16 px; editor actions sticky bottom.
- Sidebar: logo `/cropped-logo-SMKN-1-Cbn.png`, product name `CibiOne CMS`, menu active background `brand-100` and text `brand-800`.
- Menu `jurusan_admin`: Dashboard, Konten, Kategori Konten, Guru & Staff, Kategori Guru, Mitra Industri.
- Menu `super_admin`: all above plus Sarana & Prasarana and Pengaturan.

## Assets

- School logo: `/cropped-logo-SMKN-1-Cbn.png`.
- Login/preview building: `/smkn-hero-banner.png`, fallback `/banner.jpeg`.
- Department logos: `/logo jurusan/*` only for department context.
- Uploaded media: result from `POST /api/uploads`; JPEG/PNG/WebP/AVIF, max 5 MB.
- Use `object-cover` for photos, `object-contain` for logos. No base64. No stock image placeholders in final design.

## Shared Components

- Primary button: blue filled, 40 px height.
- Secondary: white border, 40 px.
- Destructive: red only for confirmation action.
- Input/select: 40 px, label above, focus ring blue.
- Table row: min 64 px; mobile becomes card.
- Badge: 24 px pill; status always includes text, not color alone.
- Dialog max 560 px; drawer 480 px desktop/full-screen mobile.
- Upload dropzone: dashed border, preview, replace/remove, progress/error state.
- Loading: structural skeleton. Empty: icon + explanation + role-appropriate CTA.
- Motion: 120-220 ms, ease-out; respect reduced motion; no autoplay/parallax/count-up.

## Accessibility

Explicit labels, keyboard operation, visible focus, Escape-close dialogs, focus trap, WCAG AA contrast, alt text. Icon-only action requires tooltip and `aria-label`.
