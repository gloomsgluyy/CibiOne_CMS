# AI Context 2 - Current Project Handoff

> Read this first for the latest implementation status. Then read `AI_CONTEXT.md`, `AI_FINALIZATION_CONTEXT.md`, affected SRS files, and `docs/PRODUCTION_SETUP.md`.
>
> Updated: 2026-08-21

## Product

CibiOne CMS is a Next.js modular monolith for SMKN 1 Cibinong. It contains the existing public school website, protected CMS, REST route handlers, PostgreSQL data layer, media upload, and chatbot provider boundary. Preserve the approved public visual design when changing data sources.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript strict
- Tailwind CSS 4
- shadcn/ui using Base UI primitives
- Drizzle ORM and PostgreSQL
- TanStack Query for selected admin server state
- Local VPS filesystem for CMS images (`public/uploads/`)
- Next.js server cache and cache tags for public content
- Full self-hosted VPS deployment target (Nginx, PM2, PostgreSQL)
- Node.js 22 LTS

## Implemented Backend

- Expanded Drizzle schema and committed migrations under `drizzle/`.
- Tables cover users, sessions, jurusan, posts, post/guru categories, guru, facilities, industry partners, settings, and chatbot knowledge.
- Cookie authentication stores a random raw token client-side and token hash in PostgreSQL.
- Roles: `super_admin`, `jurusan_admin`.
- Server-side jurusan scoping exists across core CRUD paths. Never trust a client-provided scope for authorization.
- Zod validators and standard `{ success, data/error, meta? }` API envelopes.
- CRUD route handlers for posts, categories, guru, facilities, partners, jurusan, and settings.
- Local filesystem upload endpoint with authentication, MIME allowlist, 5 MB limit, random filename, and baseline rate limiting.
- Public content query layer for posts, guru, facilities, partners, and settings.
- Initial post service/repository boundary and cache invalidation.
- Markdown sanitization helper.
- Dashboard aggregate and Top Posts queries.
- Posts analytics endpoint for total, published, drafts, views, and 14-day creation activity.
- Idempotent baseline seed plus optional initial super admin.
- Backend self-check command: `npm run test:backend`.

## Implemented CMS Frontend

- Protected `/admin` layout and responsive sidebar/sheet shell.
- Login screen and development-only preview login when no database exists.
- Dashboard summary cards and Top Posts.
- Resource list pages for content, guru, facilities, and industry partners.
- Category management pages for content and guru.
- Create/edit routes for content, guru, facilities, and partners.
- Content editor with Markdown editing, preview surface, image upload control, draft, immediate publish, and scheduling controls.
- Content analytics widget on `/admin/konten`.
- Settings index plus vision/mission and accreditation editors.
- Shadcn primitives under `components/ui/`.
- Chatbot menu exists, but `/admin/chatbot` remains a placeholder.
- Intro/tutorial disclosure was intentionally removed after review. Do not restore it unless explicitly requested.

## Public Frontend Integration

- Public berita list/detail/prestasi and profile sections now consume server queries where integrated.
- Existing visual structure, animations, and fallback assets remain important constraints.
- Public pages should use Server Components/server queries, not fetch their own internal API.

## Chatbot Reality

`POST /api/chatbot` is a provider boundary for knowledge-based Q&A. It loads active/published knowledge, sends `prompt` and `knowledge` to an external provider, and expects `{ answer: string }`.

It does not yet provide production NLU actions against CMS resources. Before adding actions, require:

- Explicit intent/action schema.
- Server-side authentication, authorization, and jurusan scope.
- Deterministic validation.
- Proposed-change preview.
- Explicit user confirmation before mutation.
- Idempotency and audit records.
- Prompt-injection containment; provider output must never directly authorize mutations.

## Environment

Required production variables:

```env
DATABASE_URL=
INITIAL_ADMIN_EMAIL=
INITIAL_ADMIN_PASSWORD=
CHATBOT_PROVIDER_URL=
CHATBOT_PROVIDER_KEY=
```

Never commit real values. A provider key was historically exposed in documentation and removed from the current source. Revoke it at the provider before production.

## Deployment

- Canonical runbook: `docs/PRODUCTION_SETUP.md`.
- GitHub CI: `.github/workflows/ci.yml`.
- CI runs `npm ci`, strict typecheck, and production build on pull requests and pushes to `main`.
- Deploy to the self-hosted VPS with Nginx, PM2, PostgreSQL, and persistent `public/uploads/` storage.
- Run reviewed Drizzle migrations separately from application build/restart.
- Do not use `drizzle-kit push` against production.
- Do not connect preview deployments to the production database.

## Known Production Gaps

- Runtime migration, seed, PostgreSQL integration, and filesystem upload have not been verified against disposable/production infrastructure in this workspace.
- In-memory rate limiting is per instance. Replace it with Upstash Redis or equivalent before relying on limits in multi-instance production.
- Scheduled publishing is incomplete. Public queries must enforce `publishedAt <= now`; add an idempotent protected cron/job before enabling scheduling.
- TanStack Query exists, but several newer generic admin pages still use direct `fetch` and local state.
- Public cache coverage and invalidation are incomplete outside initial posts/settings paths.
- Admin shell menu visibility is not fully role-aware.
- Visi/Misi and accreditation repeaters are incomplete.
- Mobile list/card parity needs visual review.
- Chatbot admin management UI and CMS action engine are not implemented.
- Full API authorization matrix and integration tests are not implemented.
- Password-change UI is not implemented.
- Service/repository layering remains partial for non-post resources.

## Performance Position

- Keep PostgreSQL as source of truth.
- TanStack Query is browser server-state caching; it does not optimize SQL itself.
- Existing indexes should be measured before adding more.
- Use Next.js cache tags for public reads; invalidate only after successful database mutation.
- Add Redis first for distributed rate limiting, analytics counters, or measured hot data. Do not add speculative cache complexity.
- Add query timing, error monitoring, and database metrics before tuning.

## Mandatory Verification

Run before merge/deploy:

```bash
npm ci
npm run test:backend
npx tsc --noEmit
npm run build
git diff --check
```

Runtime checks still required with real services:

- Migration and idempotent seed.
- Login/logout/session expiry.
- Super admin and jurusan admin scope matrix.
- CRUD validation, `401`, `403`, and ownership restrictions.
- Blob upload allowlist and size rejection.
- Public draft/schedule visibility.
- Cache freshness after mutation.
- Chatbot timeout, provider failure, and rate limiting.
- Desktop/mobile visual review.

## Editing Rules

- Preserve unrelated worktree changes.
- Prefer smallest correct changes.
- Preserve public frontend design unless a new SRS explicitly changes it.
- Never expose secrets, raw provider keys, session tokens, or production URLs with credentials.
- Do not claim production readiness solely from typecheck/build; real infrastructure verification remains mandatory.
