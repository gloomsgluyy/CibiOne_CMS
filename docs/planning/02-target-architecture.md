# Target Architecture

> Status: Approved implementation direction. It does not replace SRS approval.
>
> Last updated: 2026-08-20

## Architecture Decision

Use a modular monolith: one Next.js 15 App Router application, one PostgreSQL database, and one object-storage provider. The application is deployed as one Vercel project for the competition MVP.

```text
Public visitor                    CMS administrator
      |                                   |
      v                                   v
Public Server Components           Admin client components
      |                                   |
      +-------- server queries           +-------- /api route handlers
                                                   |
                                            auth -> validate -> authorize
                                                   |
                                            service -> repository
                                                   |
                                              Drizzle + PostgreSQL
                                                   |
                                             object storage for media
```

## Layer Responsibilities

| Layer | Responsibility | Must not do |
|---|---|---|
| `app/(public)` | Render SEO-friendly pages and pass resolved DTOs into existing interactive components | Fetch the app's own REST API over HTTP |
| `app/admin` | Render protected CMS screens and use TanStack Query for mutations and cache updates | Authorize solely in the browser |
| `app/api` | Parse HTTP requests, authenticate, validate, authorize, call services, return envelope | Contain duplicated database rules or UI mapping |
| `server/services` | Resource business rules, ownership enforcement, write orchestration | Read raw request objects or return Next.js responses |
| `server/repositories` | Drizzle queries and transactions | Know HTTP or presentation details |
| `server/queries` | Public read models and UI-ready DTO mapping | Expose raw Drizzle rows to components |
| `server/validators` | Shared Zod schemas for route input and CMS forms | Query the database |
| `server/auth` | Session lookup, password/session utilities, role and scope checks | Decide resource-specific business rules |

## Target Folder Structure

```text
app/
  (public)/
  admin/
    layout.tsx
    login/page.tsx
  api/
    auth/
    posts/
    post-categories/
    guru/
    guru-categories/
    sarana-prasarana/
    kerjasama-industri/
    settings/
    uploads/
    chatbot/
components/
  admin/
  sections/
  ui/
db/
  schema.ts
  migrations/
  seeds/
server/
  auth/
  dto/
  errors/
  media/
  queries/
  repositories/
  services/
  validators/
lib/
  api-response.ts
```

Add folders only when their first real use is implemented. Existing code can be migrated incrementally; do not perform a speculative large refactor.

## Request Pipeline

Every mutating route follows this sequence:

1. Resolve the authenticated session from the `HttpOnly` cookie.
2. Reject an absent or expired session with `401`.
3. Parse and validate params, query, and body with Zod; return `422` for invalid input.
4. Resolve authorization and jurusan scope; return `403` for unauthorized access.
5. Call a service, which invokes a repository or transaction.
6. Return `apiSuccess` or `apiError` from `lib/api-response.ts`.

Public read queries include only records that are published or active as applicable. Public pages call `server/queries` directly. REST endpoints serve the admin UI, client-side interaction, and external consumers.

## Authentication and Sessions

- Store a password hash only. Prefer Argon2id; bcrypt is acceptable if the deployed runtime cannot support Argon2id.
- Generate a cryptographically random session token at login.
- Store only a hash of that token in the `sessions` table, never the raw token.
- Send the raw token only as a `Secure`, `HttpOnly`, `SameSite=Lax` cookie in production.
- Store expiry, issue time, and revocation support in sessions.
- Protect `/admin` through the server layout and repeat authorization in each mutation service.
- Do not use JWT unless a concrete external-client requirement is approved.

## Media

- Store image files in Vercel Blob or an approved S3-compatible object store.
- Store only object URLs and optional metadata in PostgreSQL.
- Never store base64 images or blob binary content in PostgreSQL.
- Validate MIME type and file size before upload; generate non-user-controlled object keys.
- Delete or replace unused objects only after the associated record update succeeds or through a controlled cleanup job.

## Security Baseline

- Keep credentials only in local `.env*` files and deployment environment variables; never commit or document usable secret values.
- Validate all untrusted input with Zod.
- Enforce ownership on the server for every read of drafts and every mutation.
- Sanitize or safely render rich article content before it reaches the public page.
- Add basic rate limits to login, uploads, contact submission, and chatbot routes before demo deployment.
- Existing credentials exposed in historical documentation must be rotated/revoked and removed separately; do not copy them into new documentation.
