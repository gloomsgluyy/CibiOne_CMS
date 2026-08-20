# Current State and Target Scope

> Status: Implementation planning reference. This document does not approve any SRS phase.
>
> Last updated: 2026-08-20

## Purpose

This document separates the codebase condition found during the audit from the approved backend target. Read it with `cms-content-and-collaboration.md`; that document remains the detailed CMS content contract.

## Current Implementation State

The repository is a Next.js 15 App Router application with React 19, TypeScript, Tailwind CSS 4, Drizzle ORM, and PostgreSQL configuration.

### Public frontend

- The public routes and their interactive visual behavior are implemented.
- Most displayed content remains local fixture data inside public components.
- Jurusan is the only public resource that attempts a database-backed API request, with local fallback data.
- The public UI is the presentation contract. Backend work must replace data sources and preserve the existing layout, routes, animation, filters, carousels, modal behavior, and responsive behavior.

### Backend scaffold

- `db/schema.ts` contains `jurusan`, `users`, `sessions`, `posts`, `site_settings`, and `chatbot_knowledge`.
- `GET /api/jurusan` performs a real database query.
- `GET /api/posts`, `GET /api/guru`, and `GET /api/settings` currently return empty placeholder data.
- Post detail, guru detail, jurusan detail, settings detail, and chatbot routes are not implemented.
- Login, logout, session lookup, protected admin pages, upload handling, reviewed migrations, and seed scripts are not implemented.
- Zod is available but is not yet used by route handlers for request validation.

## Target MVP

The target is one modular-monolith Next.js application deployed as one service. It provides a CMS for school-wide and jurusan-owned content while retaining the approved public frontend.

### In scope

- Role-based CMS for `super_admin` and `jurusan_admin`.
- Public, database-driven content for Jurusan, Profil Sekolah, Berita, and Prestasi.
- Authenticated CRUD APIs with Zod validation and consistent response envelopes.
- Object-storage image uploads.
- PostgreSQL schema migrations and deterministic development seed data.
- Protected admin pages and basic content management forms.
- Chatbot foundation based on approved knowledge content, after core CMS CRUD is stable.

### Explicitly held or out of scope

- Struktur Organisasi is held; do not create its route, table, public UI, or CMS page yet.
- Draft preview, full audit history, newsletter workflows, email notifications, and advanced chatbot analytics are future enhancements unless a reviewer explicitly approves them.
- A separate backend service and microservice architecture are out of scope.

## Content Ownership Matrix

| Resource | Classification | Storage | `super_admin` | `jurusan_admin` |
|---|---|---|---|---|
| Sejarah | Static | Source code | No CMS action | No CMS action |
| Visi & Misi | Dynamic singleton | `site_settings` | Manage | No access |
| Akreditasi | Dynamic singleton | `site_settings` | Manage | No access |
| Guru & Staff | Dynamic list | `guru`, `guru_categories` | Manage all | Manage own jurusan records |
| Sarana & Prasarana | Dynamic list | `sarana_prasarana` | Manage | No access |
| Kerja Sama Industri | Dynamic list | `kerjasama_industri` | Manage all | Manage own jurusan records |
| Berita, Pengumuman, Prestasi, Agenda | Dynamic list | `posts`, `post_categories` | Manage all | Manage own jurusan records |
| Jurusan | Dynamic list | `jurusan` | Manage when CMS is approved | Read only |
| Chatbot knowledge | Dynamic list | `chatbot_knowledge` | Manage all | Only own-jurusan data if enabled later |

For every `jurusan_admin` mutation, the server obtains `jurusan_id` from the session. It must not accept a client-provided ownership value. School-wide records have `jurusan_id = null` and are `super_admin` only.

## Required Source Reading

Before changing a section, read in this order:

1. `docs/context/AI_CONTEXT.md`
2. `docs/context/project.md`
3. `docs/context/architecture.md`
4. `docs/context/decisions.md`
5. `docs/context/component-registry.md`
6. The affected SRS under `docs/srs/`
7. `docs/planning/cms-content-and-collaboration.md`
8. The relevant document in this planning package

The component registry and supplied references remain mandatory. Do not recreate approved public UI from scratch.
