# API and Authorization Contract

> Status: Target REST contract for CMS and client integrations.
>
> Last updated: 2026-08-20

## API Conventions

- Keep the existing `/api/...` prefix; do not introduce `/api/v1` for this MVP.
- Use `GET`, `POST`, `PUT`, and `DELETE` as established by the existing architecture contract.
- Route handlers always use `apiSuccess` and `apiError`.
- List response: `{ "success": true, "data": [], "meta": { "page": 1, "limit": 10, "total": 0 } }`.
- Error response: `{ "success": false, "error": { "code": "...", "message": "..." } }`.
- Use `400` for malformed query syntax, `401` for no valid session, `403` for a valid session without permission, `404` for unknown resources, `409` for uniqueness conflicts, and `422` for Zod validation failures.

## Authentication Endpoints

| Method | Route | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Validate credentials, issue session cookie |
| `POST` | `/api/auth/logout` | Authenticated | Revoke current session and clear cookie |
| `GET` | `/api/auth/session` | Authenticated | Return safe current user/session DTO |

Never return password hashes, session tokens, or other credentials.

## Content Endpoints

| Resource | Public read | Admin mutations |
|---|---|---|
| Posts | `GET /api/posts?type=&category=&jurusan_id=&featured=&highlighted=&sort=latest|popular&page=&limit=` | `POST /api/posts`, `PUT /api/posts/[id]`, `DELETE /api/posts/[id]` |
| Post categories | `GET /api/post-categories?jurusan_id=` | `POST /api/post-categories`, `PUT /api/post-categories/[id]`, `DELETE /api/post-categories/[id]` |
| Guru | `GET /api/guru?category=&jurusan_id=&page=&limit=` | `POST /api/guru`, `PUT /api/guru/[id]`, `DELETE /api/guru/[id]` |
| Guru categories | `GET /api/guru-categories` | `POST /api/guru-categories`, `PUT /api/guru-categories/[id]`, `DELETE /api/guru-categories/[id]` |
| Facilities | `GET /api/sarana-prasarana?page=&limit=` | `POST /api/sarana-prasarana`, `PUT /api/sarana-prasarana/[id]`, `DELETE /api/sarana-prasarana/[id]` |
| Industry partners | `GET /api/kerjasama-industri?jurusan_id=` | `POST /api/kerjasama-industri`, `PUT /api/kerjasama-industri/[id]`, `DELETE /api/kerjasama-industri/[id]` |
| Settings | `GET /api/settings/[key]` | `PUT /api/settings/[key]` |
| Uploads | None | `POST /api/uploads` |
| Chatbot | `POST /api/chatbot` after its scope is approved | Knowledge management is a separate admin scope |

`GET /api/posts/[id]`, `GET /api/guru/[id]`, and equivalent detail reads may be added when the admin UI needs them. Public page rendering should not use these APIs internally; it should use server query functions.

## Visibility and Sorting

- Public list/detail endpoints return only `is_published = true` records.
- Public category filters include only `is_active = true` categories, while a post can still display its inactive historic category.
- Latest posts order by `published_at DESC`.
- Popular posts order by `is_popular_override DESC`, then `view_count DESC`, then `published_at DESC`.
- A public post detail view increments `view_count` with an atomic database update. Add basic abuse protection before enabling it publicly.

## Authorization Matrix

| Action | `super_admin` | `jurusan_admin` |
|---|---|---|
| Read public content | Allowed | Allowed |
| Read all admin content including drafts | Allowed | Own-jurusan records only |
| Manage school-wide settings, facilities, accreditation | Allowed | Denied |
| Manage school-wide post/category | Allowed | Denied |
| Manage own-jurusan post, category, guru, partner | Allowed | Allowed |
| Manage another jurusan record | Allowed | Denied with `403` |
| Manage users and jurusan admins | Recommended `super_admin` responsibility | Denied |

## Delete Policy

- Categories associated with posts are deactivated using `is_active = false`.
- Public content with historical value should normally be unpublished rather than hard-deleted.
- Hard-delete is acceptable for unused master data or accidental drafts, after authorization and a clear admin confirmation.
- Deleting a database record must not leave referenced object-storage media unmanaged; define cleanup behavior in the resource service.

## Validation and DTOs

- Define resource schemas in `server/validators` and use them on both CMS forms and Route Handlers.
- Parse query parameters explicitly, including bounded `page` and `limit` values.
- Map database records to DTOs. Do not pass raw Drizzle rows to the public UI or return internal fields in API responses.
- Do not accept `jurusan_id` as an authoritative value from a `jurusan_admin`; overwrite or reject it based on session scope.
