# PrebuiltUI About Example Reference

Source pasted in chat by user.

Adapted pattern:

- Two-column section.
- Left rounded image card with shadow.
- Floating white info card over image.
- Right text block with uppercase title, gradient underline, paragraphs, CTA pill.

Project adaptation:

- Removed inline Google Fonts import because Poppins already lives in `app/layout.tsx` and `app/globals.css`.
- Replaced raw `<img>` with `next/image`.
- Replaced template copy with `Sambutan Kepala Sekolah` content.
- Replaced floating card text with principal identity.
- Used local fallback image until official principal photo asset exists.
