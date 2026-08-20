# CMS Content, Backend, and Collaboration Guide

> Status: Approved scope for implementation planning. This document does not approve an SRS phase or authorize starting its Fase 2 before the human reviewer marks Fase 1 as `Done`.
>
> Last updated: 2026-08-20

## Purpose

This is the shared implementation contract for making the existing public UI CMS-driven without changing its visual structure, animations, routes, or interaction flow. It covers the Profil Sekolah and Berita pages, the data model, backend API, frontend integration boundary, authorization, and GitHub collaboration process.

Read this together with `docs/context/AI_CONTEXT.md`, `docs/context/architecture.md`, `docs/context/decisions.md`, and the affected SRS files before coding.

## Locked Content Classification

| Page | Section or feature | Classification | Storage pattern | Admin scope |
|---|---|---|---|---|
| Profil Sekolah | Sejarah | Static | Source code | None |
| Profil Sekolah | Visi & Misi | Dynamic - Singleton | `site_settings` | `super_admin` |
| Profil Sekolah | Guru & Staff | Dynamic - List | `guru` + `guru_categories` | Super admin; jurusan admin for own jurusan |
| Profil Sekolah | Sarana & Prasarana | Dynamic - List | `sarana_prasarana` | `super_admin` |
| Profil Sekolah | Akreditasi | Dynamic - Singleton | `site_settings` | `super_admin` |
| Profil Sekolah | Kerja Sama Industri | Dynamic - List | `kerjasama_industri` | Super admin; jurusan admin for own jurusan |
| Profil Sekolah | Struktur Organisasi | Held | No implementation now | None |
| Berita | Banner carousel, Terbaru, Populer, list, article detail | Dynamic - List | `posts` where `type = 'berita'` | Super admin; jurusan admin for own jurusan |
| Berita | Highlight/Pencapaian Sekolah | Dynamic - List | `posts` where `type = 'prestasi'` | Super admin; jurusan admin for own jurusan |
| Berita | Categories | Dynamic - List, managed master data | `post_categories` | Super admin; jurusan admin for own jurusan |
| Highlight Prestasi | Gallery, sort, modal detail | Dynamic - List | `posts` where `type = 'prestasi'` | Same as posts |

### UI Preservation Rule

The arrays currently embedded in section files are temporary fixtures only. The following must remain visually and behaviorally equivalent when data moves to the CMS:

- Visi/Misi stays a two-panel expanding accordion with its existing animation and default image.
- Guru & Staff stays a filtered, paginated horizontal expanding-card display. Collapsed cards only show the photo; no position/academic title is rendered in that state. The badge is positioned at the active card's upper corner.
- Sarana & Prasarana keeps `InteractiveImageBentoGallery`, including spans, autoplay, drag behavior, and modal.
- Akreditasi keeps its existing asymmetric bento layout. Admin enters individual cards; the UI assigns a stable presentation slot rather than allowing arbitrary Tailwind classes.
- Kerja Sama Industri keeps the logo cloud/infinite slider and detail modal.
- Berita keeps its existing focus carousel, latest/popular tabs, list filters, modals, detail route, and Prestasi gallery/modal.

## Database Contract

All image fields store an object-storage URL, never base64. Use Vercel Blob or an S3-compatible provider.

### Existing Tables to Retain and Extend

`jurusan`, `users`, `sessions`, `posts`, `site_settings`, and `chatbot_knowledge` remain the base schema. Add `created_by`, `published_at`, and `updated_at` consistently to every editable list table where missing.

### `posts`

Keep one table for `berita`, `pengumuman`, `prestasi`, and `agenda` as required by ADR-006. Extend it so the current page behavior can be produced from queries instead of duplicate frontend arrays.

| Field | Type | Purpose |
|---|---|---|
| `id` | serial PK | Record identity and detail API identity |
| `jurusan_id` | nullable FK `jurusan` | `null` for school-wide posts; ownership scope otherwise |
| `type` | existing enum | `berita`, `pengumuman`, `prestasi`, or `agenda` |
| `category_id` | nullable FK `post_categories` | Optional master category |
| `title` | text | Existing title |
| `slug` | unique text | Detail route `/berita/[slug]` |
| `excerpt` | text | Banner/card/modal summary |
| `body` | text | Full article or achievement description; Markdown/plain rich-text format must be chosen once by the backend team |
| `image_url` | nullable text | Hero/card/main gallery image |
| `gallery_urls` | nullable jsonb | Optional extra documentation images for article detail |
| `is_published` | boolean | Public visibility gate |
| `published_at` | nullable timestamptz | Latest ordering; null means draft/unpublished |
| `is_featured` | boolean | Include in the three-item Berita focus carousel |
| `featured_order` | nullable integer | Explicit carousel order, lower first |
| `is_highlighted` | boolean | Eligible for Pencapaian Sekolah on `/berita` |
| `highlight_order` | nullable integer | Explicit priority for school achievement highlight |
| `view_count` | integer default 0 | Popular ranking metric |
| `is_popular_override` | boolean default false | Allows editorial promotion without falsifying view count |
| `event_date` | existing nullable timestamptz | Used only for agenda |
| `created_by`, `created_at`, `updated_at` | existing audit fields | Ownership/audit |

Indexes: `(type, is_published, published_at desc)`, `(type, is_featured, featured_order)`, `(type, is_highlighted, highlight_order)`, `(type, view_count desc)`, `category_id`, and `jurusan_id`.

Popular ordering is deterministic: `is_popular_override DESC`, then `view_count DESC`, then `published_at DESC`. Newest ordering is `published_at DESC`. A public detail view increments `view_count` with an atomic database update, with basic abuse protection added by the backend owner if required.

### `post_categories`

Do not store arbitrary category strings in posts. This master table allows additions while preserving old articles when a category is retired.

| Field | Type | Purpose |
|---|---|---|
| `id` | serial PK | Identity |
| `jurusan_id` | nullable FK `jurusan` | Null for school-wide category; otherwise jurusan-owned |
| `name` | text | Display label such as `Kesiswaan` |
| `slug` | unique text | Stable filter/API value |
| `description` | nullable text | Optional admin context |
| `is_active` | boolean default true | Controls availability for new posts and public filter |
| `created_by`, `created_at`, `updated_at` | audit fields | Ownership/audit |

Deletion policy: a category linked to one or more posts cannot be hard-deleted. The delete action becomes a deactivation (`is_active = false`). Existing posts and their detail pages retain the category label; inactive categories are unavailable for new assignments and omitted from the normal public filter. An unused category may be hard-deleted by `super_admin` only.

### `guru_categories` and `guru`

Filters in Guru & Staff are CMS-managed. Seed the existing defaults: `General`, `Staff`, `SIJA`, `RPL`, `TKJ`, `DKV`, `TKP`, `DPIB`, `TP`, `TFLM`, `TKR`, and `TOI`.

`guru_categories` fields: `id`, nullable `jurusan_id`, `name`, `slug`, `sort_order`, `is_active`, `created_by`, timestamps. `jurusan_id` is used when the category represents a jurusan; `General` and `Staff` remain school-wide with `jurusan_id = null`.

`guru` fields: `id`, nullable `jurusan_id`, nullable `category_id`, `name`, `position`, `bio`, `image_url`, `sort_order`, `is_published`, `created_by`, timestamps. The active card consumes all public fields. The collapsed card only uses `image_url` and accessible `alt` text from `name`.

### `sarana_prasarana`

Fields: `id`, `title`, `description`, `image_url`, `presentation_slot`, `sort_order`, `is_published`, `created_by`, timestamps.

`presentation_slot` is an enum controlled by the UI, for example `featured_large`, `standard`, `tall`, and `wide`. The frontend maps each slot to its existing bento span. Admin must choose a semantic slot label, never enter raw Tailwind CSS. If no slot is set, use `standard`.

### `kerjasama_industri`

Fields: `id`, nullable `jurusan_id`, `name`, `logo_url`, `description`, `website_url`, `sort_order`, `is_published`, `created_by`, timestamps. The public slider only needs published records; clicking a logo reads the same record for the existing modal.

### `site_settings`

Use the existing key-value table for singletons.

| Key | JSON value shape |
|---|---|
| `school_vision_mission` | `{ "backgroundImageUrl": string, "vision": { "title": string, "subtitle": string, "description": string, "points": [{ "title": string, "description": string }] }, "mission": { "title": string, "subtitle": string, "description": string, "points": [{ "title": string, "description": string }] } }` |
| `school_accreditation` | `{ "heading": string, "description": string, "cards": [{ "slot": string, "title": string, "description": string, "tag": string, "imageUrl": string | null, "cardType": "image" | "text" }] }` |

Seed `backgroundImageUrl` with `/banner.jpeg` for Visi/Misi. The accordion animation and layout remain component-owned and are not editable by the admin. Akreditasi card `slot` values are fixed UI presentation slots so the bento structure remains complete when data is entered one-by-one.

### Held Future Table

Do not create an organization route or UI now. When approved, use `struktur_organisasi` with `id`, nullable `jurusan_id`, `name`, `position`, `image_url`, `parent_id`, `sort_order`, `is_published`, `created_by`, and timestamps. This reservation avoids a future incompatible design without expanding current scope.

## API Contract

All route handlers use `apiSuccess`/`apiError` and the existing response envelope. List responses include `{ page, limit, total }`. Public endpoints expose only published data; administrative endpoints may query drafts only after authentication.

| Resource | Public read | Admin mutations |
|---|---|---|
| Posts | `GET /api/posts?type=&category=&jurusan_id=&featured=&highlighted=&sort=latest|popular&page=&limit=`; `GET /api/posts/[id]` | `POST /api/posts`, `PUT /api/posts/[id]`, `DELETE /api/posts/[id]` |
| Categories | `GET /api/post-categories?type=&jurusan_id=` | `POST`, `PUT /api/post-categories/[id]`, `DELETE /api/post-categories/[id]` |
| Guru | `GET /api/guru?category=&jurusan_id=&page=&limit=`; `GET /api/guru/[id]` | `POST`, `PUT /api/guru/[id]`, `DELETE /api/guru/[id]` |
| Guru categories | `GET /api/guru-categories` | `POST`, `PUT /api/guru-categories/[id]`, deactivate/delete policy equivalent to post categories |
| Facilities | `GET /api/sarana-prasarana?page=&limit=` | `POST`, `PUT /api/sarana-prasarana/[id]`, `DELETE /api/sarana-prasarana/[id]` |
| Industry partners | `GET /api/kerjasama-industri?jurusan_id=` | `POST`, `PUT /api/kerjasama-industri/[id]`, `DELETE /api/kerjasama-industri/[id]` |
| Settings | `GET /api/settings/[key]` | `PUT /api/settings/[key]` |

Public page code fetches through a server-side service/query layer, not by requesting its own `/api` route. Route handlers exist for CMS/admin and external API needs. Client components only receive already-resolved serializable data and keep current interactive state, such as carousel index, tabs, filters, modals, and drag behavior.

## Authorization

| Action | `super_admin` | `jurusan_admin` |
|---|---|---|
| Read published public content | Yes | Yes |
| Manage school-wide singleton settings | Yes | No |
| Manage facilities and accreditation | Yes | No |
| Manage school-wide posts/categories | Yes | No |
| Create/edit/delete post or achievement for own `jurusan_id` | Yes | Yes |
| Create/edit/delete category for own `jurusan_id` | Yes | Yes |
| Create/edit/delete own-jurusan teacher and partner | Yes | Yes |
| Mutate another jurusan's record | Yes | No, return `403` |

The server derives `jurusan_id` from the authenticated session for `jurusan_admin`; it must never trust a client-submitted `jurusan_id`. School-wide records use `jurusan_id = null` and are super-admin only.

## Frontend Data Replacement Plan

| Current fixture | Replace with |
|---|---|
| `visiMisiData` | `school_vision_mission` setting, with local default only as an empty/error fallback |
| `guruStaffData` | paginated `guru` list plus `guru_categories` |
| `saranaPrasaranaItems` | `sarana_prasarana` mapped from `presentation_slot` to existing bento `span` |
| `galleryItems` in Akreditasi | `school_accreditation.cards` mapped by fixed slot |
| `partnerLogos` | `kerjasama_industri` records |
| `NEWS_ITEMS` in `berita-section.tsx` and `[slug]/page.tsx` | shared server query for `posts` type `berita`; never duplicate fixtures per route |
| `ACHIEVEMENTS` | shared server query for `posts` type `prestasi` |
| String category filters | active `post_categories` from CMS |

Use an explicit mapping layer/types shared between server queries and section props. Do not leak Drizzle records directly into UI components. This protects the UI from schema changes and gives one place to format dates, select image fallbacks, calculate slideshow groups, and map bento slots.

## Migration and Seed Order

1. Extend `db/schema.ts` and generate one reviewed Drizzle migration.
2. Apply migration to development database.
3. Seed default Visi/Misi and Akreditasi settings, all current Guru filter categories, current placeholder teachers, facilities, partners, post categories, news, and achievements.
4. Implement read services and replace public fixture imports one section at a time, preserving the current UI props.
5. Implement authenticated CRUD routes and Zod schemas.
6. Implement CMS forms using TanStack Query, uploads through object storage, validation, and cache invalidation.
7. Add authorization and API/integration tests before replacing the production/demo fixtures.

## SRS Update Record

The following SRS files have their content classification and Fase 2 input aligned with this decision: `visi-misi.md`, `guru-staff.md`, `sarana-prasarana.md`, `akreditasi.md`, `kerja-sama-industri.md`, and `berita.md`.

This update is planning documentation only. It must not be interpreted as a reviewer approval, and no SRS status is changed to `Done` by this document.

## GitHub Collaboration and Merge Guide

### Ownership Split

| Workstream | Suggested owner | Exclusive files while active |
|---|---|---|
| Schema, migrations, auth helpers, API envelope | Backend owner | `db/**`, `lib/auth.ts`, `lib/api-response.ts`, migration files |
| Posts, categories, Berita/Prestasi public queries and CMS | Content owner | `app/api/posts/**`, `app/api/post-categories/**`, `app/admin/berita/**`, `components/sections/berita/**` |
| Profil dynamic resources and CMS | Profile owner | `app/api/guru/**`, new profile resource routes, `app/admin/guru/**`, affected Profil section files |
| Shared integration | Assigned reviewer | `app/(public)/**/page.tsx`, shared service/types, docs updates |

Before editing a shared file, notify the team in the pull request/task channel. Avoid parallel edits to `db/schema.ts`; collect all agreed schema changes into one owner branch and migration.

### Branch and Commit Convention

- Start each task from the current `main`: `git pull origin main`.
- Branch names: `feat/cms-posts-categories`, `feat/cms-profile-content`, `feat/cms-admin-berita`, `docs/cms-collaboration-guide`, or `fix/berita-detail-server-client`.
- Use focused commits. Existing convention: `[Fase1]`, `[Fase2]`, `fix:`, or `chore:` prefix, such as `[Fase2] add posts category schema`.
- Do not commit `.env`, database credentials, Vercel Blob tokens, or generated local files.
- Do not reformat unrelated files in a feature branch.

### Pull Request Sequence

1. Create a branch and write/update the affected SRS before UI/backend work.
2. Keep a PR to one logical concern: schema, resource API, admin form, public integration, or documentation.
3. Rebase or merge current `main` into the branch before requesting review; resolve only conflicts in files owned by the branch.
4. PR description must state scope, affected routes/tables, migration name, permission behavior, screenshots for UI-impacting work, and verification commands/results.
5. A different programmer reviews schema/API/auth changes. The designer/PIC reviews visual behavior. Only the human reviewer changes an SRS phase to `Done`.
6. Merge only after required checks pass and the branch is up to date. Use a normal merge or squash strategy consistently as selected by the repository maintainer; do not force-push shared branches.

### Migration Rules

- One migration owner creates migrations after the team agrees on the final schema for that batch.
- Migration filename includes an ordered timestamp and concise intent, for example `20260820_add_profile_content_resources.sql`.
- Never edit a migration already applied to a shared environment. Write a new corrective migration.
- Every migration PR includes seed/migration notes and rollback consideration.
- Apply migrations to a disposable development database before merge; staging/demo comes before production.

### Mandatory Verification Before Merge

- `npx tsc --noEmit`
- `npm run build`
- Route/API tests for the changed resource, including `401`, `403`, validation, published-only public reads, pagination, and category deactivation.
- Manual desktop and mobile check of the unchanged public UI.
- `git diff --check`
- Documentation and SRS updated with the decision/execution record; status remains reviewer-owned.

### Conflict Resolution

- Never use `git reset --hard`, force push, or overwrite another programmer's work to solve conflicts.
- For schema conflicts, stop and have the schema owner reconcile both features into one migration.
- For public component conflicts, preserve the approved UI and integrate only the data source/props change.
- If two tasks need the same file, split the work by commits and merge the shared contract/type change first.

## Implementation Suggestions

- Keep `Sejarah` static as currently approved.
- Add image upload fields to all visually image-driven CMS records, including Guru, Facility, Partner logo, Visi/Misi background, Akreditasi cards, and Posts/Prestasi.
- Add `sort_order` to list resources so admins can control presentation without relying on creation date.
- Use status toggles (`is_published`, `is_active`) instead of destructive deletes for public content with historical value.
- Add a draft preview only after CRUD is stable; it is useful but outside the current required scope.
