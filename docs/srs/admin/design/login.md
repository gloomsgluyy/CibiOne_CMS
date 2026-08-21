# UI Design — Login

**Route:** `/login`  
**API:** `POST /api/auth/login`

## Desktop

Split layout 56:44, viewport height. Left panel uses `/smkn-hero-banner.png`, dark blue overlay, school logo, `CibiOne CMS`, and copy `Ruang kerja pengelola konten SMKN 1 Cibinong`. Right panel white; form width 400 px, vertically centered.

## Content

- Heading: `Masuk ke CibiOne CMS`.
- Supporting text: `Kelola informasi sekolah dalam satu ruang kerja.`
- Field: Email.
- Field: Kata sandi with show/hide icon.
- Primary button full width: `Masuk`.
- No register, social login, demo account, or forgot-password link; backend unavailable.

## States

Loading button: spinner + `Memproses...`. Invalid credentials: general alert `Email atau kata sandi tidak valid.` Rate limit: `Terlalu banyak percobaan. Coba lagi nanti.` Preserve input; never reveal which credential failed.

## Mobile

Hide photo panel. Blue header 160 px with logo; white form card overlaps header by 24 px. Content padding 20 px.

## Deliverables

Desktop default/loading/error. Mobile default/loading/error. Keyboard focus state.
