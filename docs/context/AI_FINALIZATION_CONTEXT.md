# AI Finalization Context - CibiOne CMS

> Read this file first when continuing backend/CMS implementation. It is a concise, implementation-ready handoff for programmers and AI assistants.
>
> Last updated: 2026-08-20

## Mission

Build the CibiOne CMS MVP for SMKN 1 Cibinong (JHIC 2026). The existing public Next.js website is visually implemented but mostly uses hardcoded fixture data. Turn the approved content into CMS-driven data without changing the approved public layouts, routes, animations, interactions, or responsive behavior.

Use one Next.js 15 App Router modular monolith with React 19, TypeScript strict mode, Tailwind CSS 4, Drizzle ORM, PostgreSQL, object storage for images, and Vercel deployment. Do not create a separate backend service.

## Non-Negotiable Rules

1. Read `docs/context/AI_CONTEXT.md`, `project.md`, `architecture.md`, `decisions.md`, `component-registry.md`, the affected SRS, and `docs/planning/cms-content-and-collaboration.md` before editing a section.
2. The component registry and supplied code references are mandatory. Do not rebuild existing approved UI from scratch.
3. Public UI language and content are Bahasa Indonesia. Code identifiers and comments are English.
4. Do not mark an SRS phase `Done`; only the human reviewer can do that.
5. Do not begin Fase 2 for a section unless its Fase 1 is `Done`.
6. Never store image base64/binary data in PostgreSQL. Use object storage and store URLs.
7. Never commit, repeat, or expose secrets. A historical documentation file contains an exposed credential; it must be rotated/revoked outside normal feature work and must not be copied.
8. Preserve unrelated worktree changes. Do not use destructive Git commands.

## Current State

- Public frontend exists and must be preserved.
- The database schema currently has: `jurusan`, `users`, `sessions`, `posts`, `site_settings`, `chatbot_knowledge`.
- Only `GET /api/jurusan` makes a real database query.
- Posts, Guru, Settings, authentication, protected admin, uploads, migrations, seeds, and chatbot are not complete.
- Most public datasets are hardcoded fixtures. Jurusan has a local fallback around an API attempt.

## Approved CMS Scope

| Content | Data pattern | Authority |
|---|---|---|
| Sejarah | Static source code | No CMS |
| Visi/Misi | `site_settings`, key `school_vision_mission` | `super_admin` |
| Akreditasi | `site_settings`, key `school_accreditation` | `super_admin` |
| Guru & Staff | `guru`, `guru_categories` | Super admin all; jurusan admin own records |
| Sarana & Prasarana | `sarana_prasarana` | `super_admin` |
| Kerja Sama Industri | `kerjasama_industri` | Super admin all; jurusan admin own records |
| Berita, Pengumuman, Prestasi, Agenda | `posts`, `post_categories` | Super admin all; jurusan admin own records |
| Struktur Organisasi | Held | Do not implement |

Roles are exactly `super_admin` and `jurusan_admin`. For a `jurusan_admin`, derive `jurusan_id` from the authenticated session on the server. Never trust a client-submitted `jurusan_id`. School-wide content uses `jurusan_id = null` and is super-admin-only.

## Target Technical Contract

- Public Server Components call server query/service functions directly, not the application's own `/api` HTTP endpoints.
- Admin pages use protected client components and TanStack Query to call REST handlers under `/api`.
- Every mutation: authenticate -> Zod validate -> authorize -> service -> repository -> standard API envelope.
- Use `apiSuccess` / `apiError` consistently.
- Public endpoints return published/active records only.
- Use cookie sessions: random raw token in `HttpOnly`, `Secure`, `SameSite=Lax` cookie; store only a token hash in PostgreSQL; support expiry and revocation.
- Store passwords with Argon2id when runtime-supported, otherwise bcrypt.
- All raw database records are mapped to DTOs before reaching UI/API consumers.

## Required Schema Target

Extend `posts` with `category_id`, `excerpt`, `gallery_urls`, `published_at`, `is_featured`, `featured_order`, `is_highlighted`, `highlight_order`, `view_count`, and `is_popular_override`.

Create:

- `post_categories`: nullable `jurusan_id`, name, unique slug, description, active state, audit fields.
- `guru_categories`: nullable `jurusan_id`, name, unique slug, sort order, active state, audit fields.
- `guru`: nullable jurusan/category, name, position, bio, image URL, sort order, published state, audit fields.
- `sarana_prasarana`: title, description, image URL, controlled presentation slot, sort order, published state, audit fields.
- `kerjasama_industri`: nullable jurusan, name, logo URL, description, website URL, sort order, published state, audit fields.

Keep `posts` unified for `berita`, `pengumuman`, `prestasi`, and `agenda`. Public article routes use the existing globally unique slug route `/berita/[slug]`. Store article bodies as Markdown text and render through a safe/sanitized renderer unless the team explicitly approves another editor format.

## API Target

- Auth: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/session`.
- Posts: list/filter under `GET /api/posts`, mutations under `POST /api/posts` and `PUT`/`DELETE /api/posts/[id]`.
- Use the equivalent list and `[id]` CRUD shape for categories, guru, guru categories, facilities, and industry partners.
- Settings: `GET` and `PUT /api/settings/[key]`.
- Uploads: authenticated `POST /api/uploads` with MIME and size validation.
- Keep `/api` rather than adding a version prefix for MVP.

Response shapes:

```json
{ "success": true, "data": {} }
{ "success": true, "data": [], "meta": { "page": 1, "limit": 10, "total": 0 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```

## Implementation Order

1. Secure exposed historical credential separately; configure non-committed environment variables.
2. Reconcile schema changes with one schema owner, generate/review migration, and create idempotent seeds based on existing frontend fixtures.
3. Implement auth, session protection, roles, and scope helpers with tests.
4. Implement repositories, public queries, DTOs, and replace hardcoded public fixtures incrementally while preserving component contracts.
5. Implement Zod-validated CRUD APIs and CMS admin forms with TanStack Query.
6. Add object-storage upload workflow.
7. Implement chatbot only after core CMS is stable and provider/rate-limit/knowledge scope is agreed.

## Mandatory Verification

For every resource, test valid operations, validation errors, `401`, `403`, published-only public reads, pagination/filter/sorting, and ownership scoping. Check desktop and mobile pages visually after replacing a fixture.

Run before merge:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
npx tsc --noEmit;
npm run build;
git diff --check
```

## Planning Documents

- `docs/planning/01-current-state-and-target.md`
- `docs/planning/02-target-architecture.md`
- `docs/planning/03-data-model-and-migrations.md`
- `docs/planning/04-api-and-authorization-contract.md`
- `docs/planning/05-implementation-roadmap.md`
- `docs/planning/cms-content-and-collaboration.md`

If a requested implementation conflicts with this file or the existing SRS/ADR documents, stop and ask the reviewer for a decision rather than silently inventing a new pattern.
