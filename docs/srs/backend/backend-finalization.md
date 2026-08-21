# SRS Section - Backend CMS MVP Finalization

> Kontrak implementasi backend untuk seluruh CMS MVP. Dokumen ini mengonsolidasikan backend lintas section; SRS section publik tetap menjadi sumber kontrak UI dan konten. User menyatakan seluruh Fase 2 section telah oke pada 2026-08-20. Status `Done` tetap hanya diubah reviewer manusia.

---

## 1. Metadata

| Field | Isi |
|---|---|
| Halaman | Sistem CMS dan API internal |
| Section | Backend foundation, data access, authorization, media, dan resource CMS |
| Tipe konten | `Functional` |
| Pattern data | `ContentList`, `SiteSetting`, dan `N/A` |
| PIC programmer | Belum ditetapkan |
| Reviewer / approver | Reviewer manusia |
| Issue / pull request | Belum ada |
| Tanggal dibuat | `2026-08-20` |
| Status SRS | `In Progress` |

## 2. Referensi Wajib

| Referensi | Lokasi / tautan | Status |
|---|---|---|
| Layout atau brief desain | Tidak berlaku untuk foundation backend; UI admin wajib mengikuti entry J registry saat dikerjakan | Berlaku |
| Component Registry | `docs/context/component-registry.md`, bagian J | Berlaku untuk admin UI |
| Code reference dari PIC | Tidak ada | N/A |
| Sumber konten | Fixture publik existing, dimigrasikan oleh seed idempoten | Berlaku |
| Konteks inti | `docs/context/AI_CONTEXT.md`, `project.md`, `architecture.md`, `decisions.md`, `glossary.md`, `AI_FINALIZATION_CONTEXT.md` | Berlaku |
| Planning | `docs/planning/01-current-state-and-target.md` sampai `05-implementation-roadmap.md`, `cms-content-and-collaboration.md` | Berlaku |
| ADR | ADR-003, ADR-004, ADR-005, ADR-006, ADR-007, ADR-008, ADR-010 | Berlaku |

### Precedence

1. `docs/context/AI_FINALIZATION_CONTEXT.md` adalah handoff implementasi backend terkini.
2. `docs/planning/*` adalah kontrak target terperinci.
3. ADR aktif menjelaskan keputusan arsitektur.
4. SRS section mengatur data dan UI section masing-masing.
5. Dokumen lama yang bertentangan, termasuk `/api/v1`, Bearer token, atau hard-delete default, tidak berlaku untuk MVP ini.

## 3. Requirement

### Tujuan

Mengganti fixture data publik yang disetujui secara bertahap dengan PostgreSQL tanpa mengubah layout, route, animasi, interaksi, atau perilaku responsif frontend. CMS menyediakan autentikasi cookie-session, otorisasi `super_admin` dan `jurusan_admin`, CRUD tervalidasi, media object storage, serta query publik ringan dan SEO-friendly dalam satu Next.js modular monolith.

### Batasan arsitektur

| Area | Requirement | Kriteria selesai |
|---|---|---|
| Deployment | Satu Next.js App Router service, PostgreSQL, satu provider object storage | Tidak ada Express, microservice, API gateway, atau service terpisah |
| Public rendering | Server Component memanggil `server/queries` langsung | Tidak ada HTTP request dari aplikasi ke `/api` sendiri pada halaman publik |
| Admin rendering | Route `/admin` terproteksi server; client memakai TanStack Query hanya untuk data admin/mutasi | Otorisasi tidak bergantung pada browser |
| HTTP layer | Handler tipis: authenticate, parse, Zod validate, authorize, service, envelope | Tidak ada business rule/SQL terduplikasi antar route |
| Domain layer | Service menangani aturan resource, scope, write orchestration; repository menangani Drizzle/SQL | Service tidak menerima `Request`; repository tidak mengetahui HTTP/UI |
| DTO | Semua row DB dipetakan sebelum UI/API | Password hash, token hash, audit internal tidak pernah keluar |
| UI preservation | Backend hanya mengganti sumber data/props | Tidak ada redesign route publik atau admin yang belum disetujui |

### Resource dalam scope

| Resource | Pattern | Storage | Public read | Admin authority |
|---|---|---|---|---|
| Jurusan | `ContentList` terbatas | `jurusan` | Active/published sesuai schema existing | `super_admin` mutation bila CMS jurusan disetujui; `jurusan_admin` read-only |
| Visi dan Misi | `SiteSetting` | `site_settings.school_vision_mission` | Ya | `super_admin` |
| Akreditasi | `SiteSetting` | `site_settings.school_accreditation` | Ya | `super_admin` |
| Post | `ContentList` | `posts` | Published only | Super semua; jurusan hanya miliknya |
| Kategori post | Master data | `post_categories` | Active only | Super semua; jurusan hanya miliknya |
| Guru dan Staff | `ContentList` | `guru`, `guru_categories` | Published/active only | Super semua; jurusan hanya miliknya |
| Sarana dan Prasarana | `ContentList` | `sarana_prasarana` | Published only | `super_admin` |
| Kerja Sama Industri | `ContentList` | `kerjasama_industri` | Published only | Super semua; jurusan hanya miliknya |
| Auth/session | Functional | `users`, `sessions` | Tidak | Internal admin |
| Upload media | Functional | Object storage + URL DB | Tidak | Authenticated admin |

### Resource held atau di luar scope

| Area | Status | Aturan |
|---|---|---|
| Sejarah | Static | Tidak ada tabel, endpoint, form, atau migrasi |
| Struktur Organisasi | Held | Jangan buat route, tabel, query, endpoint, form, atau seed |
| Hero, sambutan kepala sekolah, video profil, kontak, newsletter | Held | Jangan implementasi tanpa SRS/scope eksplisit |
| Chatbot dan knowledge management | Tahap akhir | Jangan implementasi sebelum provider, knowledge scope, prompt, rate limit disetujui |
| Draft preview | Future | Tidak ada preview token/route pada MVP |
| Audit history penuh | Future | Kolom audit minimum cukup |
| Analytics/chart/realtime | Future | Dashboard memakai agregat ringan saja |
| User management | Optional | Hanya bila operasi demo membutuhkannya |

### Acceptance criteria umum

- [ ] TypeScript strict dan production build lulus.
- [ ] Semua endpoint baru memakai `apiSuccess` atau `apiError`.
- [ ] Semua input tidak tepercaya: params, search params, JSON body, multipart metadata, tervalidasi di server.
- [ ] Semua mutasi mengikuti `authenticate -> validate -> authorize -> service -> repository`.
- [ ] `jurusan_admin` tidak dapat menentukan atau memalsukan `jurusan_id` melalui path, query, atau body.
- [ ] Public query/API tidak pernah mengembalikan draft, record nonaktif, password hash, token hash, atau audit internal.
- [ ] Semua list memakai pagination bounded: default `10`, minimum `1`, maksimum `50`.
- [ ] DTO memilih kolom yang benar-benar dikonsumsi UI; tidak ada `select *` untuk list publik/admin.
- [ ] Semua gambar tersimpan sebagai URL object storage, bukan base64/binary PostgreSQL.
- [ ] Migration baru diuji pada PostgreSQL disposable; seed dapat dijalankan berulang tanpa duplikasi.
- [ ] Penggantian fixture per section mempertahankan visual desktop/mobile yang telah disetujui.
- [ ] Tidak ada perubahan migration yang sudah diterapkan pada shared environment.

## 4. Kontrak Data dan API

### Konvensi database

| Aturan | Kontrak |
|---|---|
| Database | PostgreSQL melalui Drizzle |
| Penamaan | Kolom `snake_case`; properti TypeScript mengikuti mapping camelCase existing |
| Ownership | `jurusan_id = null` adalah sekolah-wide; hanya `super_admin` dapat membuat/mengubahnya |
| Audit minimum | Semua list editable memiliki `created_by`, `created_at`, `updated_at` |
| Visibility | `is_published` untuk record publik; `is_active` untuk master data yang dapat dipilih |
| URL media | URL object storage; key object digenerate server |
| Time | Simpan `timestamptz`; serialisasi DTO ISO 8601 |
| Delete | Unpublish/deactivate default untuk data bernilai historis; hard-delete hanya data tak terpakai/draft keliru sesuai service policy |
| Transaction | Mutasi yang menyentuh lebih dari satu row memakai transaksi repository |

### Skema target

| Table | Field minimum / perubahan |
|---|---|
| `users` | Pertahankan role `super_admin`/`jurusan_admin`, `jurusan_id`; tambah `is_active`, timestamps bila diperlukan UX admin |
| `sessions` | Ganti raw token dengan `token_hash`; `user_id`, `issued_at`, `expires_at`, nullable `revoked_at`; index token hash unique dan expiry |
| `jurusan` | Pertahankan data existing; mutation hanya setelah CMS jurusan disetujui |
| `posts` | Tambah `category_id`, `excerpt`, `gallery_urls` JSONB, `published_at`, `is_featured`, `featured_order`, `is_highlighted`, `highlight_order`, `view_count`, `is_popular_override` |
| `post_categories` | `id`, nullable `jurusan_id`, `name`, global unique `slug`, nullable `description`, `is_active`, audit fields |
| `guru_categories` | `id`, nullable `jurusan_id`, `name`, global unique `slug`, `sort_order`, `is_active`, audit fields |
| `guru` | `id`, nullable `jurusan_id`, nullable `category_id`, `name`, nullable `position`, nullable `bio`, nullable `image_url`, `sort_order`, `is_published`, audit fields |
| `sarana_prasarana` | `id`, `title`, nullable `description`, nullable `image_url`, semantic `presentation_slot`, `sort_order`, `is_published`, audit fields |
| `kerjasama_industri` | `id`, nullable `jurusan_id`, `name`, nullable `logo_url`, nullable `description`, nullable `website_url`, `sort_order`, `is_published`, audit fields |
| `site_settings` | Key-value JSONB retained; `updated_by`, `updated_at` |
| `chatbot_knowledge` | Tidak diubah dalam batch core CMS kecuali scope chatbot telah disetujui |

### Invariants data

| Invariant | Enforcement |
|---|---|
| Role valid | DB enum/check existing + Zod/service guard |
| `jurusan_admin` memiliki scope | Login/session resolver menolak user inactive atau role jurusan tanpa `jurusan_id` |
| School-wide record | `jurusan_id = null` hanya dibuat/diubah super admin |
| Slug post unik global | Unique DB constraint; service memetakan violation menjadi `409 SLUG_CONFLICT` |
| Slug kategori unik global | Unique DB constraint; service memetakan violation menjadi `409 SLUG_CONFLICT` |
| Kategori post scoped | Jurusan post hanya boleh memakai kategori jurusan sama; school-wide post hanya kategori school-wide; super admin dapat memakai scope yang konsisten |
| Kategori guru scoped | Guru jurusan hanya kategori jurusan sama atau aturan school-wide yang disetujui; service memvalidasi sebelum write |
| Published post | `is_published=true` membutuhkan `published_at`; service mengisi waktu publish saat absent |
| Draft post | `is_published=false` tidak muncul pada query/API publik; `published_at` boleh null |
| Agenda | `event_date` hanya relevan saat `type='agenda'`; validator menolak/normalisasi field untuk type lain |
| Featured/highlight order | Order hanya relevan jika flag terkait true; service mengosongkan order ketika flag false |
| View count | Non-negatif; increment atomik di repository, bukan read-modify-write aplikasi |
| Slot fasilitas | Nilai enum semantic yang disetujui: `featured_large`, `standard`, `tall`, `wide`; default `standard` |
| Settings keys | Hanya `school_vision_mission` dan `school_accreditation` pada batch ini |
| Delete kategori terpakai | Deactivate; hard-delete hanya super admin setelah repository membuktikan tidak ada referensi |

### Index wajib

| Table | Index | Query yang dilayani |
|---|---|---|
| `sessions` | unique `token_hash`; `expires_at` | Lookup session, cleanup expired |
| `posts` | `(type, is_published, published_at DESC)` | List latest publik |
| `posts` | `(type, is_featured, featured_order)` | Carousel berita |
| `posts` | `(type, is_highlighted, highlight_order)` | Highlight prestasi |
| `posts` | `(type, view_count DESC)` | Ranking popular |
| `posts` | `(category_id)`, `(jurusan_id)` | Filter kategori/scope |
| `post_categories` | `(jurusan_id, is_active)` | Filter kategori aktif scoped |
| `guru` | `(jurusan_id, category_id, is_published, sort_order)` | List guru publik scoped |
| `kerjasama_industri` | `(jurusan_id, is_published, sort_order)` | List mitra publik scoped |

Tidak menambah index spekulatif. Setelah data nyata tersedia, ukur query lambat dengan `EXPLAIN ANALYZE` sebelum menambah index lain.

### Seed dan migration

| Langkah | Requirement | Bukti |
|---|---|---|
| Ownership | Satu owner mengubah `db/schema.ts` dan menghasilkan migration | PIC/schema owner tercatat di PR |
| Generate | Gunakan Drizzle Kit sesuai konfigurasi repo | Migration baru reviewable |
| Review SQL | Periksa FK, default, nullability, unique constraint, index, statement destructive | Review manusia kedua |
| Disposable DB | Apply migration pada database PostgreSQL sementara | Log migrasi sukses |
| Seed | Upsert natural key stabil: setting key, slug, atau seed identifier; tidak bergantung urutan serial | Dua kali run menghasilkan data setara |
| Source | Map fixture final existing; tidak memasukkan credential | Mapping terdokumentasi di seed |
| Users | Credential awal hanya env variable; seed menyimpan password hash | Tidak ada password dalam repo/log |
| Rollout | Development, demo/staging, production setelah review | Catatan release |
| Correction | Migration yang sudah shared tidak diedit; buat corrective migration | Riwayat migration append-only |

### Session dan autentikasi

| Area | Requirement |
|---|---|
| Password | Hash Argon2id bila runtime mendukung; bcrypt bila tidak. Tidak pernah log/return password/hash. |
| Login | `POST /api/auth/login`; validasi credential; generic failure untuk user/password salah; user inactive ditolak. |
| Token | Generate random cryptographic raw token. Simpan hanya SHA-256 atau hash yang disetujui sebagai `token_hash`. |
| Cookie | Raw token hanya dalam cookie `HttpOnly`, `Secure` production, `SameSite=Lax`, `Path=/`, max age sesuai expiry. |
| Duration | Session 7 hari sesuai ADR-007, configurable internal server constant; jangan expose ke client sebagai authority. |
| Lookup | Hash token cookie, query session non-revoked/non-expired, join safe user DTO, cek `is_active`. |
| Logout | Revoke current DB session lalu clear cookie dengan options identik. Idempoten dari sudut client. |
| Expiry | Session expired diperlakukan tidak valid, cookie dibersihkan best effort. Cleanup batch opsional terjadwal, bukan request-path wajib. |
| Admin layout | Layout server redirect user tanpa session ke login; role/scope tetap diperiksa ulang setiap API mutasi. |
| CSRF | SameSite=Lax; mutating endpoint hanya menerima expected content type; bila admin cross-site requirement muncul, tambah origin/CSRF validation sebelum membuka capability. |
| Rate limit | Login wajib dibatasi sebelum demo. Upload dan chatbot dibatasi saat diaktifkan. Gunakan provider/platform primitive bila tersedia; jangan buat distributed limiter generik tanpa kebutuhan. |

### Otorisasi

| Aksi | `super_admin` | `jurusan_admin` |
|---|---|---|
| Read public published content | Allowed | Allowed |
| Read admin drafts | Semua | Hanya milik `session.jurusanId` |
| Create school-wide post/category | Allowed | `403` |
| Create own-jurusan post/category/guru/partner | Allowed | Allowed; ownership dari session |
| Read/update/delete record jurusan lain | Allowed | `403` |
| Manage Visi/Misi, Akreditasi, Sarana | Allowed | `403` |
| Manage user/jurusan admin | Bila feature diaktifkan | `403` |
| Upload media | Allowed | Allowed; kepemilikan resource tetap divalidasi saat URL dipakai |

Server mengabaikan `jurusan_id` pada create oleh `jurusan_admin`, lalu mengisi dari session. Pada update/delete, server membaca record terlebih dahulu dan membandingkan ownership; query body tidak dapat mengubah ownership. Bila record sekolah-wide atau jurusan lain, respons `403`, bukan fallback/rewriting diam-diam.

### Konvensi HTTP

| Kondisi | Status | Envelope error code |
|---|---|---|
| Success object | `200`/`201` | N/A |
| Success list | `200` | N/A |
| Malformed query syntax | `400` | `BAD_REQUEST` |
| Tidak login/session invalid/expired | `401` | `UNAUTHENTICATED` |
| Login gagal | `401` | `INVALID_CREDENTIALS` |
| Tidak berwenang | `403` | `FORBIDDEN` |
| Resource tidak ada dalam scope yang diizinkan | `404` | `NOT_FOUND` |
| Zod params/query/body invalid | `422` | `VALIDATION_ERROR` |
| Unique/referential business conflict | `409` | `SLUG_CONFLICT`, `RESOURCE_IN_USE`, atau `CONFLICT` |
| File terlalu besar/MIME tidak didukung | `422` | `INVALID_FILE` |
| Provider/DB unavailable | `500` | `INTERNAL_ERROR`; log detail hanya server |

```json
{ "success": true, "data": {} }
{ "success": true, "data": [], "meta": { "page": 1, "limit": 10, "total": 0 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Data tidak valid." } }
```

Pesan API aman, singkat, Bahasa Indonesia. Error cause, stack, SQL, credential, provider response mentah hanya untuk log server terstruktur.

### Endpoint resource

| Method | Route | Akses | Request/query | Respons/aturan |
|---|---|---|---|---|
| `POST` | `/api/auth/login` | Public | email/username dan password sesuai schema user existing | Session cookie + safe session DTO |
| `POST` | `/api/auth/logout` | Authenticated | Tidak ada body | Revoke session, clear cookie |
| `GET` | `/api/auth/session` | Authenticated | Tidak ada | Safe user/session DTO |
| `GET` | `/api/posts` | Public atau authenticated admin | `type`, `category`, `jurusan_id`, `featured`, `highlighted`, `sort`, `page`, `limit`, admin mode inferred session | Public hanya published; admin list scoped |
| `POST` | `/api/posts` | Admin | Post create schema | `201`; scope derived server |
| `GET` | `/api/posts/[id]` | Authenticated admin bila detail draft diperlukan | Numeric id | Scoped draft/detail DTO; public pages tidak memakai route ini |
| `PUT` | `/api/posts/[id]` | Admin | Post update schema | Scoped update DTO |
| `DELETE` | `/api/posts/[id]` | Admin | Clear confirmation di UI, no body requirement | Unpublish atau hard-delete sesuai policy/media cleanup |
| `GET/POST` | `/api/post-categories` | Public active list / Admin mutation | `jurusan_id`, bounded list; category body | Public active only; create scoped |
| `GET/PUT/DELETE` | `/api/post-categories/[id]` | Admin for detail/mutation | Numeric id/category schema | Used category deactivated |
| `GET/POST` | `/api/guru` | Public list / Admin mutation | `category`, `jurusan_id`, `page`, `limit`; guru body | Public published only |
| `GET/PUT/DELETE` | `/api/guru/[id]` | Admin for detail/mutation | Numeric id/guru schema | Ownership enforced |
| `GET/POST` | `/api/guru-categories` | Public active list / Admin mutation | bounded list/category body | Ownership enforced |
| `GET/PUT/DELETE` | `/api/guru-categories/[id]` | Admin | Numeric id/category schema | Used category deactivated |
| `GET/POST` | `/api/sarana-prasarana` | Public list / Admin mutation | `page`, `limit`; facility body | Super admin mutations only |
| `GET/PUT/DELETE` | `/api/sarana-prasarana/[id]` | Admin | Numeric id/facility schema | Super admin only |
| `GET/POST` | `/api/kerjasama-industri` | Public list / Admin mutation | `jurusan_id`, `page`, `limit`; partner body | Public published only |
| `GET/PUT/DELETE` | `/api/kerjasama-industri/[id]` | Admin | Numeric id/partner schema | Ownership enforced |
| `GET` | `/api/settings/[key]` | Public for approved keys | Exact allowlisted key | Safe setting DTO |
| `PUT` | `/api/settings/[key]` | Super admin | Per-key Zod value schema | Upsert setting; invalidate tag |
| `POST` | `/api/uploads` | Authenticated admin | Multipart file; optional allowed purpose | MIME/size/key validation; object URL DTO |

`GET /api/settings` tidak diperlukan pada batch ini. Jangan tambah endpoint agregat tanpa konsumen admin nyata.

### Validator minimum

| Validator | Aturan minimum |
|---|---|
| Shared pagination | Coerce integer; `page` default 1 min 1; `limit` default 10 min 1 max 50 |
| ID params | Coerce positive integer |
| Slug | Lowercase URL-safe slug; trim; nonempty; maximum yang sesuai column; service menangani unique conflict |
| URL | URL HTTPS atau relative public asset hanya bila field tersebut memang mengizinkan; no data URL |
| Post | Enum `type`; title/excerpt/body bounded; nullable image; gallery array URL bounded; valid category; flags/order/event date cross-field refine |
| Post filter | Allowlist enum type/sort/boolean; no arbitrary SQL sort field |
| Category | Name/slug required; description bounded; active boolean; no authoritative jurusan ID for jurusan admin |
| Guru | Name required; nullable position/bio/image; non-negative sort order; valid scoped category |
| Facility | Title required; controlled `presentation_slot`; non-negative sort order; publish boolean |
| Partner | Name required; optional valid logo/website URLs; non-negative sort order |
| Vision setting | Exact JSON object: background URL, vision/mission text and bounded point arrays |
| Accreditation setting | Exact JSON object; cards use allowlisted slots and `cardType`; fixed required slots enforced only if existing UI requires all slots |
| Upload | Allowlisted image MIME (`image/jpeg`, `image/png`, `image/webp`, `image/avif`); explicit max size from provider/UI constraint; reject SVG unless sanitization policy explicitly approved |

### DTO dan query publik

| Query | Input | Output minimum | Aturan performa |
|---|---|---|---|
| `getPublicPosts` | type/filter/sort/pagination | Card DTO: id, title, slug, excerpt, image URL, category label/slug, published date, feature/highlight fields bila dipakai | Select fields spesifik; count dan page query; published only |
| `getPublicPostBySlug` | globally unique slug | Article DTO: card fields, sanitized Markdown render input, gallery URLs | Published only; atomic view increment terpisah/terkontrol |
| `getPublicPostCategories` | type/scope bila UI perlu | Active category DTO | No inactive categories on filter UI |
| `getPublicGuru` | category/pagination | Guru card DTO | Image/name selalu tersedia fallback aman; published only |
| `getPublicGuruCategories` | optional jurusan | Active category DTO | Sort `sort_order`, then name |
| `getPublicFacilities` | none/bounded | Bento DTO, semantic slot only | Sort `sort_order`, then stable id |
| `getPublicPartners` | optional jurusan | Partner DTO | Sort `sort_order`, then name |
| `getPublicSetting` | allowlisted key | Typed per-key DTO | No generic raw JSON consumer |

Public detail `view_count` increment memakai `UPDATE ... SET view_count = view_count + 1` atomik. Jangan jalankan increment pada prefetch, crawler, atau setiap server render tanpa mitigasi abuse. Mulai dengan endpoint/action yang dipanggil setelah detail benar-benar dibuka, throttled per visitor/platform capability. Bila mitigasi belum tersedia, pertahankan `view_count` tanpa increment otomatis pada MVP dan gunakan `is_popular_override`.

### Cache dan invalidasi

| Area | Kebijakan |
|---|---|
| Public published queries | Cache Next.js server-side dengan tag per resource/scope setelah integrasi pertama membutuhkan cache |
| Mutasi | Setelah DB commit sukses, invalidate tag resource terkait; jangan invalidate sebelum write sukses |
| Admin/API | `no-store` atau cache client TanStack Query; data draft tidak masuk cache publik |
| Dashboard | Query protected, `no-store`; aggregate sekali per render/request |
| Cache key | Sertakan type, scope, sort, page/limit bila cache API/query parameterized |
| Stale media | URL immutable/versioned dari object storage bila provider mendukung; jangan menambah image proxy custom |

Cache tidak wajib sebelum query publik pertama terukur. Correctness, publish visibility, invalidation mutasi lebih penting dari cache spekulatif.

### Upload media

| Langkah | Requirement |
|---|---|
| Authenticate | Session valid wajib; rate limit sebelum demo |
| Validate | Periksa `Content-Type`, ukuran stream/file, MIME allowlist, filename tidak dipercaya |
| Key | Server generate key dengan prefix resource/purpose, UUID/random, extension allowlisted |
| Persist | Upload ke object storage; return URL + metadata minimum; file belum otomatis melekat ke record |
| Attach | Resource validator menerima URL hanya dari hostname/provider allowlist bila provider telah dikonfirmasi |
| Failure | Jika DB update gagal setelah upload, tandai URL orphan untuk cleanup best effort/controlled job; jangan hapus file lama sebelum DB commit sukses |
| Replace/delete | Setelah record berhasil menunjuk URL baru atau record terhapus, cleanup old URL best effort jika ownership terverifikasi; kegagalan cleanup dilog, tidak menggagalkan data mutation |
| Security | Tidak ada base64, public secret, user-controlled path, executable MIME, atau SVG tanpa policy sanitasi |

### Dashboard backend contract

Dashboard UI belum didesain ulang oleh SRS ini. Saat dashboard approved, backend menyediakan satu protected query DTO per render:

| Role | DTO |
|---|---|
| `super_admin` | Count published/draft per post type, total guru/facility/partner aktif sesuai card actual, ringkasan per jurusan, 5-10 recent record |
| `jurusan_admin` | Aggregate dan recent record hanya `session.jurusanId` |

Gunakan aggregate SQL (`COUNT` dengan filter) paralel bila independen, limit recent list `5-10`, select metadata saja. Jangan query body post, gallery JSON, image besar, analytics historis, realtime subscription, atau endpoint per dashboard card.

## 5. Rencana Implementasi

### Fase 1 - Frontend

Tidak berlaku. SRS ini foundation backend lintas section. Integrasi fixture ke section publik mengikuti SRS section tersebut dan tidak boleh mengubah UI approved.

**Status Fase 1:** `N/A`

### Fase 2 - CMS / Backend

| Urutan | Langkah | File terdampak indikatif | Bukti uji |
|---|---|---|---|
| 1 | Konfirmasi provider PostgreSQL, object storage, runtime password hash; siapkan env tanpa nilai rahasia | `.env.example` bila benar-benar diperlukan, deployment settings | Startup/connectivity aman; secret tidak tracked |
| 2 | Audit schema existing, tetapkan satu schema owner, implement schema target | `db/schema.ts`, `drizzle.config.ts` | Schema review |
| 3 | Generate/review migration, apply disposable DB | `db/migrations/**` | Migration up sukses; SQL reviewed |
| 4 | Implement seed idempoten dari fixture final dan initial admin env | `db/seeds/**`, package script bila perlu | Seed dijalankan dua kali tanpa duplicate |
| 5 | Implement password/session utilities, session resolver, cookie helpers, role/scope checks | `server/auth/**`, `lib/auth.ts` | Unit/integration test auth/scope |
| 6 | Implement auth routes dan server-protected admin layout | `app/api/auth/**`, `app/admin/layout.tsx` | Login/logout/session, redirect, expired/revoked test |
| 7 | Tambah shared validator, repository, DTO, service untuk resource pertama | `server/validators/**`, `server/repositories/**`, `server/dto/**`, `server/services/**` | Zod + DTO tests |
| 8 | Implement query publik dan ganti fixture satu resource per PR: jurusan, singleton, profil lists, post/prestasi | `server/queries/**`, affected `app/(public)/**` | Published-only, visual parity desktop/mobile |
| 9 | Implement CRUD post/category lalu resource profil sesuai endpoint contract | `app/api/posts/**`, category/resource route directories | Valid, `422`, `401`, `403`, `409`, pagination/sort tests |
| 10 | Implement upload object storage setelah provider disetujui | `server/media/**`, `app/api/uploads/route.ts` | MIME/size/auth/error tests |
| 11 | Implement minimal admin forms/lists hanya untuk resource backend complete | `app/admin/**`, `components/admin/**` | TanStack mutation/invalidation, role scope manual test |
| 12 | Tambah query dashboard setelah dashboard SRS/UI approved | `server/queries/dashboard.ts`, approved admin route | Scoped aggregate/performance test |
| 13 | Chatbot setelah core CMS stabil dan scope disetujui | chatbot-specific files | Separate SRS and provider/rate limit tests |

**Status Fase 2:** `Done` - user-directed pending manual review

### Fase 3 - AI Integration

Tidak berlaku pada backend core. Chatbot memerlukan SRS terpisah setelah scope/provider/rate limit/knowledge workflow disetujui.

**Status Fase 3:** `N/A`

## 6. Pengujian dan Handover

### Matriks pengujian wajib per resource

| Area | Cara uji | Hasil | Bukti / catatan |
|---|---|---|---|
| Schema migration | Database disposable: migrate dari state kosong/baseline | Pending | Nama migration, log, reviewer |
| Seed | Jalankan dua kali, cek count/slug/setting tidak duplikat | Pending | Output seed/query assertions |
| Valid request | Create, list, detail admin, update, delete/deactivate yang sah | Pending | Route/service test |
| Validation | Body/query/params invalid menghasilkan `422` | Pending | Route/service test |
| Authentication | Tanpa cookie, cookie invalid, expired, revoked menghasilkan `401` | Pending | Route/service test |
| Authorization | `jurusan_admin` cross-scope dan school-wide mutation menghasilkan `403` | Pending | Route/service test |
| Visibility | Draft/non-published dan category inactive tidak muncul publik | Pending | Query integration test |
| Pagination | Default 10, range 1-50, total benar, sort deterministic | Pending | Query/route test |
| Conflict | Duplicate slug, category referenced, invalid relation menghasilkan `409` | Pending | Route/service test |
| Media | MIME/size/auth failure; URL success; no base64 | Pending | Upload integration test |
| DTO | Internal fields tidak keluar response/props | Pending | Snapshot/assert test |
| Public UI | Fixture replacement tidak mengubah layout/route/animation/interaction desktop-mobile | Pending | Manual visual screenshot/checklist |
| Cache | Publish/update/delete membuat public query terbaru setelah invalidation | Pending | Integration/manual test |
| Performance | Query list memakai pagination/index contract; dashboard bounded | Pending | `EXPLAIN ANALYZE` bila data representatif |
| TypeScript/build | `npx tsc --noEmit`; `npm run build` | Pending | CI/local output |
| Diff hygiene | `git diff --check` | Pending | Command output |

### Verifikasi sebelum merge

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
npx tsc --noEmit;
npm run build;
git diff --check
```

Satu PR fokus pada satu logical concern: foundation schema/auth, satu resource API, satu public integration, upload, atau admin form. PR schema/auth/API membutuhkan reviewer programmer berbeda. Screenshot visual hanya wajib bila PR mengganti fixture/menyentuh UI.

### Handover operasi

| Item | Requirement |
|---|---|
| Environment | Dokumentasikan nama variable tanpa secret: database URL, object-storage credential, session/cookie config, initial admin credential input |
| Access | Initial `super_admin` dibentuk dengan secret dari environment; setelah demo, password diubah melalui prosedur aman |
| Backup | Gunakan backup provider PostgreSQL sebelum migration production; restore drill di luar scope MVP bila provider mendukung |
| Monitoring | Log server terstruktur untuk auth failure, permission denial, upload failure, DB/provider error; redact token/password/secret |
| Incident | Revoke sessions pada compromise; rotate exposed historical credential melalui proses security terpisah |
| Cleanup | Media orphan cleanup best effort/controlled job; tidak menghapus object pada request bila ownership belum pasti |

## 7. Keputusan Terbuka

| Keputusan | Owner | Dampak | Status |
|---|---|---|---|
| Provider PostgreSQL | Reviewer/deployment owner | Driver, pooling, migration target | Menunggu |
| Provider object storage | Reviewer/deployment owner | Upload adapter, URL allowlist, max size | Menunggu |
| Argon2id runtime support | Backend/deployment owner | Pilih Argon2id atau bcrypt | Menunggu verifikasi runtime |
| Exact login identifier | Backend owner, mengikuti schema user existing | Validator login dan admin UX | Audit schema sebelum implementasi |
| Maksimum upload | Reviewer/design/deployment owner | Validator/upload UX/cost | Menunggu provider |
| View counter abuse mitigation | Backend owner | Enable atomic increment atau gunakan editorial override saja | Menunggu capability platform |
| Dashboard UI approval | Reviewer/designer | Mulai dashboard query/UI | Menunggu SRS dashboard/UI |

## 8. Execution Log

| Tanggal | Fase | Pelaksana | Perubahan / hasil | Status | Catatan atau blocker |
|---|---|---|---|---|---|
| 2026-08-20 | Dokumentasi | OpenCode | Membuat SRS foundation backend berdasarkan context, ADR, planning, dan konfirmasi user bahwa Fase 2 section oke. | In Progress | Tidak ada kode/backend runtime diubah. Provider dan keputusan terbuka tercatat. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah schema target, migration Drizzle awal, session cookie hashed, auth API, post list/detail mutation, dan settings key API. | Partial | `npx tsc --noEmit` dan `npm run build` lulus. Guru/category/facility/partner, seed, public query integration, admin UI, upload menunggu batch berikutnya/provider. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah CRUD scoped untuk Guru/Staff, Sarana/Prasarana, dan Kerja Sama Industri; validator shared dan pagination bounded. | Partial | `npx tsc --noEmit`, `npm run build`, `git diff --check` lulus. Kategori master, seed, integrasi fixture, admin UI, dan upload belum dikerjakan. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah CRUD scoped dan deactivate policy untuk master `post_categories` dan `guru_categories`. | Partial | `npx tsc --noEmit`, `npm run build`, `git diff --check` lulus. Seed, integrasi fixture, admin UI, upload, serta route test DB masih tersisa. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah seed idempoten untuk singleton settings, kategori Guru default, dan initial `super_admin` dari environment; menambah script Drizzle/seed dan `.env.example` tanpa secret. | Partial | `npx tsc --noEmit`, `npm run build`, `git diff --check` lulus. Seed belum dapat dijalankan tanpa `DATABASE_URL`; fixture content belum dimapping agar tidak menebak data UI. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah `server/queries/public-content.ts`: DTO query server langsung untuk post, guru, kategori guru, fasilitas, mitra, dan singleton setting. | Partial | Query tidak memanggil `/api`, memilih kolom minimum, published/active only, serta aman saat `DATABASE_URL` belum ada. Integrasi prop UI tetap batch terpisah untuk mempertahankan component contract. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah server-protected `/admin` layout dan login cookie-session minimal di `/login`. | Partial | Layout mengalihkan session tidak valid ke login; setiap API mutasi tetap memverifikasi session dan scope. Admin CRUD UI/dashboard belum diimplementasikan karena registry/UI approval belum menentukan template final. |
| 2026-08-20 | CMS / Backend | OpenCode | Mengganti fixture Sarana/Prasarana dengan DTO `getPublicFacilities()` pada Server Component; fixture lama hanya fallback ketika query kosong/error. | Partial | Layout, bento interaction, autoplay, drag, modal, responsive behavior, dan semantic slot mapping dipertahankan. Resource publik lain menunggu mapping prop setara. |
| 2026-08-20 | CMS / Backend | OpenCode | Mengganti fixture Guru/Staff, Mitra Industri, Berita, dan Prestasi dengan DTO server query; fixture tetap fallback saat database kosong. | Partial | Filter/pagination client, carousel, modal, gallery, route publik, dan responsive behavior dipertahankan. Detail slug masih fixture legacy dan perlu route query-by-slug berikutnya. |
| 2026-08-20 | CMS / Backend | OpenCode | Mengganti detail `/berita/[slug]` fixture dengan published-only `getPublicPostBySlug`; legacy fixture tetap fallback jika DB kosong/error agar demo UI tidak blank. | In Progress | Public production memakai DB saat record tersedia. Final deploy verification, DB migration/seed, upload provider, route test DB, serta approved admin CRUD UI masih diperlukan sebelum reviewer dapat menandai Fase 2 `Done`. |
| 2026-08-20 | CMS / Backend | OpenCode | Menyelesaikan integrasi query publik Guru, Sarana, Mitra, Berita, Prestasi, dan detail slug; menambah protected admin layout/login. | Partial | `npx tsc --noEmit` dan `npm run build` lulus. Fase 2 belum `Done`: provider upload, migration/seed runtime, API integration tests, dan admin CRUD UI masih terbuka. Reviewer manusia tetap pemilik status `Done`. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah upload Vercel Blob tervalidasi, bcrypt password hash, TanStack Query admin list/mutation untuk Berita dan Guru, dashboard aggregate, repository/service awal post, serta detail API Jurusan. | Done | User menginstruksikan bypass gate status hingga review manual. Runtime PostgreSQL, seed, object storage, dan API integration test wajib diverifikasi pada environment deploy sebelum demo. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah cache/invalidation awal, safety Markdown, parser typed settings, rate-limit baseline, chatbot provider boundary/fallback, dan migration metadata knowledge. | Partial | SRS completion tetap authoritative untuk remaining work; runtime DB/provider belum diverifikasi. |

## 9. Approval Gate

| Fase | Status | Disetujui oleh | Tanggal | Catatan review |
|---|---|---|---|---|
| Fase 1 | N/A | | | Foundation backend; UI section punya gate SRS sendiri. |
| Fase 2 | Done | User-directed, pending manual review | 2026-08-20 | Gate reviewer dibypass atas instruksi user. Validasi runtime deployment belum dijalankan karena environment belum tersedia. |
| Fase 3 | N/A | | | Chatbot terpisah. |

**Ringkasan:** `Done` - user-directed pending manual review. Build, TypeScript, dan diff hygiene lulus; migration/seed/upload/API runtime wajib divalidasi setelah deployment environment tersedia.
