# SRS Section - Backend Completion and Production Readiness

> SRS pelengkap untuk gap terhadap `AI_FINALIZATION_CONTEXT.md` dan seluruh `docs/planning/*`. Tidak mengubah scope konten. Dokumen ini menutup area yang belum terbukti atau belum lengkap pada `backend-finalization.md`.

---

## 1. Metadata

| Field | Isi |
|---|---|
| Halaman | Sistem CMS dan API internal |
| Section | Backend completion, verification, admin operations, dan deployment readiness |
| Tipe konten | `Functional` |
| Pattern data | `ContentList`, `SiteSetting`, `N/A` |
| PIC programmer | Belum ditetapkan |
| Reviewer / approver | User / reviewer manual |
| Issue / pull request | Belum ada |
| Tanggal dibuat | `2026-08-20` |
| Status SRS | `In Progress` |

## 2. Referensi Wajib

| Referensi | Lokasi | Status |
|---|---|---|
| Konteks final | `docs/context/AI_FINALIZATION_CONTEXT.md` | Wajib |
| Planning | `docs/planning/01-current-state-and-target.md` sampai `05-implementation-roadmap.md`, `cms-content-and-collaboration.md` | Wajib |
| Backend SRS utama | `docs/srs/backend/backend-finalization.md` | Wajib |
| Architecture | `docs/context/architecture.md`, bagian layer responsibilities dan request pipeline | Wajib |
| Component registry | `docs/context/component-registry.md`, bagian J | Wajib untuk admin UI |
| Source fixtures | `components/sections/**`, `app/(public)/**` | Wajib untuk seed mapping |

## 3. Gap Scope

### Tujuan

Melengkapi implementasi backend agar kontrak layer, resource, media, seed, admin, cache, keamanan konten, chatbot foundation, dan verifikasi dapat diaudit secara repeatable. Existing public UI tetap dipertahankan; perubahan dibatasi pada data source, DTO, admin operations, dan backend support.

### Gap yang wajib ditutup

| Gap | Target |
|---|---|
| Service/repository tidak konsisten | Semua mutation route memanggil service; service memanggil repository/transaction; route tidak memanggil Drizzle langsung |
| Seed belum lengkap | Seed seluruh fixture approved ke tables/settings dengan natural key dan idempotency |
| Migration runtime belum terbukti | Disposable PostgreSQL migration + seed twice + schema assertion |
| Public singleton belum penuh | Visi/Misi dan Akreditasi memakai typed server DTO dan UI mapping |
| Admin CRUD terbatas | Admin list/form untuk semua resource in-scope, TanStack Query, invalidation, scope-aware UI |
| Upload lifecycle | Attach, replace, orphan cleanup policy, provider config, MIME/size/error checks |
| Markdown safety | Markdown body safe-rendered; arbitrary raw HTML ditolak/sanitized |
| Cache | Public query tags dan mutation invalidation setelah commit |
| Integration tests | Route/service tests untuk valid, validation, `401`, `403`, `404`, `409`, visibility, pagination, scope |
| Chatbot foundation | SRS/route/provider boundary/rate limit/knowledge scope/unavailable fallback; provider key server-only |
| Rate limit | Login, upload, chatbot; contact hanya jika contact endpoint diaktifkan |
| Operational handover | Environment, migration rollout, secret rotation, log redaction, media cleanup |

### Tidak termasuk

- Struktur Organisasi.
- Draft preview.
- Full audit history.
- Realtime dashboard atau analytics eksternal.
- Contact/newsletter workflow tanpa SRS scope terpisah.
- Redesign public UI atau admin visual language.

## 4. Requirements

### A. Layer contract

| Layer | Requirement | Acceptance |
|---|---|---|
| Route handler | Resolve session, parse Zod, authorize, invoke service, map error/envelope | No direct Drizzle write in mutation handlers |
| Service | Enforce ownership, cross-field rules, media orchestration, transactions | Unit-testable without `Request`/`Response` |
| Repository | Drizzle SQL, selected columns, transaction primitives | No HTTP/presentation dependency |
| Query | Public read model + DTO mapping | No raw Drizzle rows to UI |
| Validator | Shared Zod schema client/server | Same constraints in admin form and route |
| Auth | Session/role/scope only | No resource-specific business rules |

Migration path may be incremental, but every newly edited mutation route must use the full boundary. Existing routes are migrated resource-by-resource without changing API envelope.

### B. Complete seed contract

Seed must include:

- `school_vision_mission` with exact planning JSON shape.
- `school_accreditation` with fixed UI slots and card types.
- All 12 `guru_categories`: `General`, `Staff`, `SIJA`, `RPL`, `TKJ`, `DKV`, `TKP`, `DPIB`, `TP`, `TFLM`, `TKR`, `TOI`.
- Existing Guru fixture records mapped to `guru`.
- Existing Sarana fixture records mapped to `sarana_prasarana`, with semantic slot mapping.
- Existing partner fixture records mapped to `kerjasama_industri`.
- Existing Berita fixture records mapped to `posts(type='berita')`.
- Existing Prestasi fixture records mapped to `posts(type='prestasi')`.
- Approved post categories mapped to `post_categories`.
- Initial users only from environment-provided credentials.

Natural key rules:

| Resource | Natural key |
|---|---|
| Settings | `key` |
| Guru category | `slug` |
| Post category | `slug` |
| Post | `slug` |
| Guru/facility/partner | Stable seed slug/identifier; add explicit seed key if table contract needs it |

Seed rerun must update approved fixture fields without duplicating rows. Seed must never overwrite administrator-edited production content unless an explicit `SEED_FORCE=true` development-only flag is set.

### C. Migration and disposable DB verification

Required scripts:

```powershell
npm run db:generate
npm run db:migrate
npm run db:seed
```

Verification sequence:

1. Create empty disposable PostgreSQL database.
2. Apply migration from empty state.
3. Run seed once.
4. Record row counts and natural keys.
5. Run seed again.
6. Assert counts and natural keys unchanged.
7. Query all public resources; assert no unpublished fixture leaks.
8. Destroy disposable database after evidence capture.

### D. Typed singleton integration

Create typed mapping functions:

- `mapVisionMissionSetting(value)`.
- `mapAccreditationSetting(value)`.

Rules:

- Validate JSON at read boundary; malformed setting returns safe fallback/error state.
- `backgroundImageUrl` uses object URL or approved relative asset.
- Accreditation slots are allowlisted semantic values; no Tailwind class input.
- Public UI retains existing accordion and bento structure.
- Admin settings form uses `PUT /api/settings/[key]` and invalidates the matching public tag.

### E. Admin CMS

Protected client pages required:

| Page/resource | Required operations |
|---|---|
| Dashboard | Scoped aggregate, recent records, safe empty/loading/error states |
| Berita | List/filter, create, edit, publish/unpublish, deactivate/delete policy |
| Guru | List/filter category, create, edit, publish/unpublish |
| Guru categories | Create/edit/deactivate, scope-aware |
| Post categories | Create/edit/deactivate, scope-aware |
| Sarana | Create/edit, semantic slot, publish/unpublish; super admin only |
| Mitra | Create/edit, logo URL/upload, publish/unpublish, scope-aware |
| Settings | Visi/Misi and Akreditasi edit; super admin only |

Admin requirements:

- Use `AdminQueryProvider` and TanStack Query.
- Mutation success invalidates list and relevant dashboard/public tag.
- Browser-hidden `jurusan_id` is never trusted.
- Forms display server validation and permission errors.
- Loading, empty, error, success states exist.
- UI uses component registry J/reference, not an unrelated redesign.

### F. Media lifecycle

| Operation | Requirement |
|---|---|
| Upload | Authenticated, rate-limited, MIME allowlist, max 5 MB, server-generated key |
| Attach | Only provider URL returned by server or configured host accepted |
| Replace | Update DB first; delete old object best effort after successful association |
| Failed DB write | Mark orphan URL for cleanup; never delete currently referenced old media |
| Record deactivate/delete | Preserve or cleanup object only after reference check |
| Error | No provider credential or raw provider error reaches client |
| Audit | Log object key/record ID, never token or secret |

### G. Content safety

- Store Markdown text only.
- Reject or sanitize raw HTML.
- Use safe Markdown renderer with allowed tags/attributes.
- Strip unsafe URL schemes (`javascript:`, `data:`, `vbscript:`).
- Render article body through DTO; never use `dangerouslySetInnerHTML` on untrusted input without sanitizer.
- Gallery URLs pass provider/relative URL validation.

### H. Cache

| Query | Tag |
|---|---|
| Posts | `public-posts`, `public-posts-{type}` |
| Guru | `public-guru` |
| Facilities | `public-facilities` |
| Partners | `public-partners` |
| Settings | `public-setting-{key}` |

Rules:

- Public query cache is optional only when no stale data risk exists; once enabled, every mutation invalidates after successful commit.
- Admin query uses `no-store` server behavior and TanStack cache client-side.
- Drafts never share public cache keys.

### I. Chatbot foundation

Chatbot remains separate functional scope but completion requires a safe foundation:

- `POST /api/chatbot` validates prompt, length, and optional jurusan scope.
- Knowledge reads only approved active/published `chatbot_knowledge` rows.
- Provider key exists server-only.
- Rate limit applies before provider call.
- Provider failure, timeout, quota, and rate-limit failure return safe unavailable response.
- No conversation persistence unless explicitly enabled.
- No arbitrary live web content.
- Knowledge admin mutation requires separate authorization and scope.

### J. Rate limit

Rate limit at minimum:

- Login: per IP + identifier window.
- Upload: per session/IP window.
- Chatbot: per IP/session window.

Use Vercel/platform primitive or approved DB-backed implementation. Do not claim distributed guarantees if running only in-memory per function instance.

### K. Automated verification

For each resource, test:

- Valid response envelope.
- Invalid params/body => `422`.
- Missing/invalid/expired/revoked session => `401`.
- Cross-jurusan and school-wide forbidden mutation => `403`.
- Unknown ID/slug => `404`.
- Duplicate slug/category => `409`.
- Public excludes drafts/inactive category.
- Pagination max/default and deterministic ordering.
- DTO excludes hashes, tokens, audit internals.
- Upload invalid MIME/size/provider failure.
- Seed idempotency.
- Service scope invariants.

Non-trivial self-check must run without production credentials. If a test runner is introduced, keep test fixtures isolated and never use production DB URL.

## 5. API Additions

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/uploads` | Existing upload contract; complete provider/lifecycle handling |
| `POST` | `/api/chatbot` | Safe chatbot foundation after provider approval |
| `GET/PUT` | `/api/settings/[key]` | Typed singleton read/update |
| `GET` | `/api/dashboard` | Protected scoped dashboard DTO if client dashboard requires REST refresh |

No `/api/v1` prefix. No internal public page fetch to these routes.

## 6. Implementation Plan

| Step | Output | Evidence |
|---|---|---|
| 1 | Repository/service migration for all mutations | Route grep + service tests |
| 2 | Complete fixture seed | Seed diff/count/natural key evidence |
| 3 | Typed settings and public mapping | DTO/type assertions + visual check |
| 4 | Admin CRUD/resource forms | TanStack mutation/cache evidence |
| 5 | Media attach/replace cleanup | Provider integration test/log redaction |
| 6 | Markdown safe renderer | XSS fixture test |
| 7 | Public cache tags/invalidation | Mutation then query freshness test |
| 8 | Chatbot foundation/rate limit | Provider mock and unavailable fallback test |
| 9 | Full verification | All commands/checklist below |

## 7. Acceptance Criteria

- [ ] Every mutation route uses service and repository boundaries.
- [ ] Complete fixture seed is idempotent.
- [ ] Migration and seed pass disposable PostgreSQL verification.
- [ ] Visi/Misi and Akreditasi use typed settings end-to-end.
- [ ] All in-scope admin resources have protected CRUD UI or explicit approved operational alternative.
- [ ] TanStack Query invalidates affected caches after mutations.
- [ ] Upload attach/replace/failure cleanup is implemented.
- [ ] Markdown is safely rendered.
- [ ] Public cache invalidates after publish/update/deactivate.
- [ ] Chatbot foundation has provider boundary, scoped knowledge, server-only key, rate limit, fallback.
- [ ] Automated tests cover valid, validation, `401`, `403`, `404`, `409`, visibility, pagination, media, scope.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` passes.
- [ ] `git diff --check` passes.
- [ ] Manual desktop/mobile visual parity recorded.

## 8. Execution Log

| Tanggal | Fase | Pelaksana | Perubahan / hasil | Status | Catatan |
|---|---|---|---|---|---|
| 2026-08-20 | Dokumentasi | OpenCode | Membuat SRS backlog untuk gap terhadap finalization context dan planning. | In Progress | Belum ada perubahan kode pada SRS ini. |
| 2026-08-20 | CMS / Backend | OpenCode | Menambah chatbot provider boundary/fallback, per-instance rate limit login/upload/chatbot, Markdown sanitization, typed settings parser, public posts cache tag, settings/posts invalidation, migration chatbot knowledge metadata, dan self-check backend. | Partial | Build/TypeScript belum membuktikan DB/provider runtime. Service/repository dan CRUD admin seluruh resource masih harus dimigrasikan agar acceptance lengkap. |

## 9. Approval Gate

| Fase | Status | Disetujui oleh | Tanggal | Catatan |
|---|---|---|---|---|
| Fase 1 | N/A | | | Backend completion SRS. |
| Fase 2 | In Progress | | | Menunggu implementasi dan review manual. |
| Fase 3 | N/A | | | Chatbot foundation dipisahkan dari AI integration penuh. |

**Ringkasan:** `In Progress`
