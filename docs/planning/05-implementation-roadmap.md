# Implementation Roadmap and Verification

> Status: Ordered implementation plan for the CMS MVP.
>
> Last updated: 2026-08-20

## Delivery Principles

- Preserve the currently approved public UI. Replace fixtures through DTO props and mapping layers rather than redesigning components.
- Keep each pull request focused on one logical concern.
- Do not start a section's Fase 2 before its Fase 1 is marked `Done` by the human reviewer.
- Coordinate `db/schema.ts` and migration work through a single schema owner.

## Recommended Sequence

### 1. Secure and establish runtime foundations

1. Rotate/revoke the credential exposed in historical documentation and remove it from tracked documentation/history using a separately reviewed security process.
2. Confirm PostgreSQL and object-storage providers and configure local/deployment environment variables without committing values.
3. Confirm Drizzle migration configuration, development database connectivity, and package availability.
4. Add the server folder conventions only when implementing their first consumers.

### 2. Complete schema, migrations, and seeds

1. Implement the agreed extended schema and new tables.
2. Generate and review a Drizzle migration.
3. Build an idempotent seed script with current frontend fixtures mapped to the target tables/settings.
4. Test migration and seed against a disposable database.

### 3. Implement auth and authorization

1. Add login, logout, and current-session endpoints.
2. Add password hashing and hashed session-token storage.
3. Protect the admin layout and add shared server-side role/scope helpers.
4. Add tests for unauthenticated, expired, cross-jurusan, and super-admin cases.

### 4. Implement public read queries

1. Create repositories, public queries, DTOs, and mapping functions for each resource.
2. Integrate Jurusan first because its API/database scaffold already exists.
3. Replace Profil fixtures one resource at a time: Visi/Misi, Guru, Sarana, Akreditasi, then Mitra.
4. Replace Berita and Prestasi fixtures through shared queries so the home section, list page, and detail route never duplicate content data.
5. Keep an explicit empty/error fallback only where it preserves the public page safely.

### 5. Implement CMS APIs and forms

1. Add validated CRUD handlers for posts and categories.
2. Add Guru and profile-resource handlers.
3. Add settings handlers and media upload handling.
4. Build protected CMS forms and lists using TanStack Query, with cache invalidation after successful mutations.
5. Implement user management for `super_admin` only if it is needed for demo operations.

### 6. Implement chatbot last

1. Define chatbot prompt, provider, rate limit, knowledge-management workflow, and whether conversations are persisted before coding.
2. Use approved, scoped `chatbot_knowledge` entries rather than arbitrary live web content.
3. Never expose provider keys to the browser.
4. Add a safe unavailable fallback for provider or rate-limit failure.

## Test Checklist

For each changed resource, test:

- Valid request and response envelope.
- Zod validation failures.
- `401` without a valid session.
- `403` for cross-jurusan mutation or school-wide resource mutation by `jurusan_admin`.
- Public reads omit drafts and inactive master data.
- Pagination, filtering, sort order, and unique-slug/category conflict behavior.
- Media upload type and size validation.
- Desktop and mobile visual parity with the approved public UI.

Before merge, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
npx tsc --noEmit;
npm run build;
git diff --check
```

Add route/service tests using the project-selected test runner when the first backend test infrastructure is introduced.

## Collaboration Boundaries

| Workstream | Primary files |
|---|---|
| Schema and auth foundation | `db/**`, `server/auth/**`, `lib/auth.ts`, `lib/api-response.ts` |
| Posts and categories | `app/api/posts/**`, `app/api/post-categories/**`, related server modules and admin pages |
| Profil resources | Guru/facility/partner/settings routes, related server modules and admin pages |
| Public integration | `app/(public)/**`, shared DTO/query modules, section props |
| Documentation | `docs/**` and SRS execution records |

Never resolve a conflict by resetting, force-pushing, or overwriting another programmer's work. Do not change an SRS status to `Done`; only the human reviewer may do that.
