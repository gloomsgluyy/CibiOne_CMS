# Data Model and Migration Plan

> Status: Target schema contract for the CMS MVP.
>
> Last updated: 2026-08-20

## General Rules

- PostgreSQL and Drizzle ORM are the data layer.
- Use `snake_case` database columns through Drizzle's existing camelCase property mapping.
- List resources require `created_by`, `created_at`, and `updated_at`.
- `jurusan_id = null` means school-wide content.
- URLs point to object storage. Do not persist base64 image data.
- Use `is_published` for public visibility and `is_active` for selectable master data.

## Retained Base Tables

| Table | Purpose | Required changes |
|---|---|---|
| `jurusan` | Department/program information for public competence page and scope ownership | Retain; add CMS mutations only if approved |
| `users` | CMS users with role and optional department scope | Add timestamps and active status if required by admin UX |
| `sessions` | Cookie-session records | Replace raw `token` storage with `token_hash`; add issued/revoked timestamps |
| `posts` | Unified content for berita, pengumuman, prestasi, agenda | Extend as listed below |
| `site_settings` | School-wide singleton JSON settings | Retain |
| `chatbot_knowledge` | Knowledge chunks for chatbot | Add ownership, publication/active state, updater, and timestamps as chatbot implementation begins |

## New Tables

### `post_categories`

`id`, nullable `jurusan_id`, `name`, unique `slug`, nullable `description`, `is_active`, `created_by`, `created_at`, `updated_at`.

A used category is deactivated, not deleted. An unused category may be hard-deleted only by `super_admin`.

### `guru_categories`

`id`, nullable `jurusan_id`, `name`, unique `slug`, `sort_order`, `is_active`, `created_by`, `created_at`, `updated_at`.

Seed: `General`, `Staff`, `SIJA`, `RPL`, `TKJ`, `DKV`, `TKP`, `DPIB`, `TP`, `TFLM`, `TKR`, `TOI`.

### `guru`

`id`, nullable `jurusan_id`, nullable `category_id`, `name`, nullable `position`, nullable `bio`, nullable `image_url`, `sort_order`, `is_published`, `created_by`, `created_at`, `updated_at`.

### `sarana_prasarana`

`id`, `title`, nullable `description`, nullable `image_url`, `presentation_slot`, `sort_order`, `is_published`, `created_by`, `created_at`, `updated_at`.

`presentation_slot` is a controlled semantic enum such as `featured_large`, `standard`, `tall`, or `wide`. The frontend maps it to the existing bento layout; administrators never enter Tailwind classes.

### `kerjasama_industri`

`id`, nullable `jurusan_id`, `name`, nullable `logo_url`, nullable `description`, nullable `website_url`, `sort_order`, `is_published`, `created_by`, `created_at`, `updated_at`.

## Extended `posts` Table

Keep `posts` as the single table for `berita`, `pengumuman`, `prestasi`, and `agenda`. Add:

| Field | Purpose |
|---|---|
| nullable `category_id` | FK to `post_categories` |
| `excerpt` | Card, banner, and modal summary |
| `gallery_urls` JSONB | Optional additional images |
| nullable `published_at` | Publication date and newest ordering |
| `is_featured` and nullable `featured_order` | Berita focus carousel |
| `is_highlighted` and nullable `highlight_order` | Prestasi highlight/gallery |
| `view_count` default `0` | Popular ranking |
| `is_popular_override` default `false` | Editorial popular promotion |

The body representation must be selected once before implementation. Default recommendation: Markdown stored as text and rendered through a safe, sanitized renderer. Do not accept arbitrary untrusted HTML.

For public Berita detail, use the existing `/berita/[slug]` route and make `slug` globally unique. A detail API may remain ID-based for administration, but public queries resolve by slug.

## Settings Keys

| Key | Value shape |
|---|---|
| `school_vision_mission` | Background image, vision title/subtitle/description/points, mission title/subtitle/description/points |
| `school_accreditation` | Heading, description, fixed-slot cards with title, description, tag, optional image, and card type |

The existing `cms-content-and-collaboration.md` defines the exact JSON shapes. Preserve those shapes unless a schema change is agreed and reflected in that source document.

## Required Indexes

- `posts(type, is_published, published_at DESC)`
- `posts(type, is_featured, featured_order)`
- `posts(type, is_highlighted, highlight_order)`
- `posts(type, view_count DESC)`
- `posts(category_id)` and `posts(jurusan_id)`
- `post_categories(jurusan_id, is_active)`
- `guru(jurusan_id, category_id, is_published, sort_order)`
- `kerjasama_industri(jurusan_id, is_published, sort_order)`

## Migration and Seed Procedure

1. Reconcile schema work with the assigned schema owner; do not edit schema/migrations in parallel without coordination.
2. Update `db/schema.ts` and generate a new Drizzle migration.
3. Review the generated SQL and test it on a disposable development PostgreSQL database.
4. Write an idempotent seed script for baseline categories, public fixtures, singleton settings, and initial users through environment-provided credentials.
5. Verify rollback considerations. Never modify a migration already applied to a shared environment; issue a corrective migration.
6. Apply development first, then the demo/staging database, then production only after review.
