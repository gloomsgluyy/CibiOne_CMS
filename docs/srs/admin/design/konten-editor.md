# UI Design — Konten Editor

**Routes:** `/admin/konten/baru`, `/admin/konten/[id]`  
**API:** `POST /api/posts`, `GET/PUT /api/posts/[id]`, upload `/api/uploads`

## Layout

Desktop workspace dua panel. Panel kiri 330 px berisi manajemen konten, upload banner, dan publikasi. Panel kanan fleksibel berisi editor Markdown dan preview tampilan publik. Sticky local header: breadcrumb, page title, status badge; actions `Simpan draft`, `Terbitkan`/`Simpan perubahan`. Mobile satu kolom dengan action bar.

## Fields

- Type: berita/pengumuman/prestasi/agenda.
- Title, slug, category, excerpt.
- Body Markdown editor with `Tulis`/`Pratinjau`; basic syntax toolbar only.
- `eventDate` appears and becomes required for Agenda.
- Cover image and gallery max 20; upload dropzone with preview.
- Published toggle, published date, featured + order, highlighted + order, popular override.
- Pilihan publikasi: simpan draft, terbitkan sekarang, atau jadwalkan memakai `publishedAt`.
- Jurusan/school scope only selectable by super admin; hidden/server-controlled for jurusan admin.

## Validation

Show inline errors for max lengths, kebab-case slug, agenda date, required publish date, invalid URL, and duplicate slug. Preserve all entered data on failure. Do not design HTML rich-text storage or alt-text fields; backend stores Markdown and URLs only.

## Preview

Preview memakai pola halaman berita publik: hero/banner, tipe, judul, ringkasan, dan isi. Preview bukan sumber data kedua. Cover menggunakan rasio lebar. Scheduling diperbolehkan melalui `publishedAt`; tidak ada autosave, cropper, atau version history.

## Deliverables

New, edit populated, agenda variant, draft, published, validation errors, upload success/error, mobile sticky actions.
