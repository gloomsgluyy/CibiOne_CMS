# Cutout Card and Masonry Reference

References supplied by the user for Home / Berita Terbaru:

- Masonry layout using responsive CSS columns and `break-inside-avoid` cards.
- Compound `CutoutCard` component with media, image, overlay, inset label, pin, SVG corners, content, footer, and context-sensitive action.
- Staggered content animation with reduced-motion support.
- Shared-layout modal supplied by the user for the clicked-card detail phase.

Implementation status:

- `components/ui/cutout-card.tsx` contains the supplied component primitives.
- `components/sections/news-showcase.tsx` composes those primitives in a responsive masonry section.
- Clicking a card expands it into a portal dialog; its CTA then links to the full article route.
- Content is mock data during layout development. Final source will be published posts, excluding or separately handling `type = "prestasi"` based on homepage editorial rules.
