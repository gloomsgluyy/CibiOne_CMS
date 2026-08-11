# Architecture — [NAMA_PROJECT]

> Last updated: 2026-08-11

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTS                              │
│                                                                │
│   Pengunjung Publik            Admin (super_admin /           │
│   (Home, Profil, Jurusan,       jurusan_admin)                │
│    Berita, Kontak)                                             │
└───────────────┬──────────────────────────┬────────────────────┘
                │                          │
                ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 (App Router)                    │
│                                                                │
│  app/(public)/...        →  Server Components, fetch          │
│                              langsung ke DB/service layer      │
│                                                                │
│  app/admin/...           →  Client Components + TanStack       │
│                              Query, panggil app/api/**          │
│                                                                │
│  app/api/**/route.ts     →  Route Handlers (REST-style)        │
│                              = "backend logic" project ini      │
│                                                                │
│  app/api/chatbot/route.ts → LLM call + knowledge base per      │
│                               jurusan                           │
└───────────────┬─────────────────────────────────────────────┘
                │ Drizzle ORM
                ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL (single database)                 │
└─────────────────────────────────────────────────────────────┘
```

Satu Next.js app, satu deploy (Vercel), tidak ada backend service terpisah. Ini disengaja supaya "ringan dan kenceng" — tidak ada network hop tambahan antara frontend-backend seperti arsitektur microservice.

---

## Struktur Folder (wajib diikuti)

```
[repo-name]/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Home
│   │   ├── profil-sekolah/page.tsx
│   │   ├── kompetensi-keahlian/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── berita/[slug]/page.tsx
│   │   └── kontak/page.tsx
│   ├── admin/
│   │   ├── page.tsx                 # Halaman utama admin
│   │   ├── berita/...
│   │   ├── guru/...
│   │   └── chatbot/...
│   └── api/
│       ├── posts/route.ts           # GET list, POST create — semua berita/pengumuman/prestasi/agenda
│       ├── posts/[id]/route.ts      # GET/PUT/DELETE by id
│       ├── guru/route.ts
│       ├── guru/[id]/route.ts
│       ├── jurusan/route.ts
│       ├── jurusan/[id]/route.ts
│       ├── settings/[key]/route.ts  # SiteSetting pattern
│       └── chatbot/route.ts
├── components/
│   ├── ui/                          # shadcn/ui — JANGAN diedit manual di luar convention shadcn
│   ├── sections/                    # 1 komponen per section halaman publik
│   └── admin/                       # komponen form/tabel admin
├── db/
│   ├── schema.ts                    # semua tabel Drizzle di sini
│   └── index.ts                     # koneksi DB
├── lib/
│   ├── auth.ts
│   └── api-response.ts              # helper envelope respons standar
└── docs/
    ├── context/                     # file ini + AI_CONTEXT.md dkk
    ├── templates/SRS_TEMPLATE.md
    └── srs/<halaman>/<section>.md
```

---

## Pattern Backend #1 — `ContentList` (untuk Dynamic – List)

Dipakai untuk: `posts` (berita/pengumuman/prestasi/agenda), `guru`, `jurusan`, `sarana_prasarana`, `kerjasama_industri`, `struktur_organisasi`.

**Skema tabel generik** (field wajib ada di semua tabel `ContentList`, boleh tambah field spesifik sesuai kebutuhan section):

```ts
{
  id: serial primary key,
  jurusan_id: integer references jurusan(id), nullable, // null = konten sekolah-wide
  title: text not null,
  slug: text unique,               // untuk yang butuh URL sendiri (posts)
  body: text,                       // rich text / markdown
  image_url: text,                  // dari Vercel Blob, BUKAN base64
  is_published: boolean default true,
  created_by: integer references users(id),
  created_at: timestamptz default now(),
  updated_at: timestamptz default now(),
}
```

**Contoh tabel `posts` (unifikasi berita/pengumuman/prestasi/agenda):**

```ts
{
  ...field generik di atas,
  type: enum('berita','pengumuman','prestasi','agenda') not null,
  event_date: timestamptz,          // dipakai khusus type='agenda'
}
```

**Konvensi API route:**

| Method | Route | Fungsi | Akses |
|---|---|---|---|
| GET | `/api/posts?type=berita&jurusan_id=&page=&limit=` | List + filter + pagination | Public (hanya `is_published=true`) / Admin (semua) |
| GET | `/api/posts/[id]` | Detail satu item | Public / Admin |
| POST | `/api/posts` | Create | Admin (jurusan_admin hanya boleh set `jurusan_id` miliknya sendiri) |
| PUT | `/api/posts/[id]` | Update | Admin (scoped) |
| DELETE | `/api/posts/[id]` | Delete | Admin (scoped) |

Pattern ini **sama persis** dipakai untuk resource `ContentList` lainnya (`guru`, `jurusan`, dst) — cuma ganti nama resource. **Programmer tidak boleh membuat variasi bentuk response/URL sendiri** per resource.

---

## Pattern Backend #2 — `SiteSetting` (untuk Dynamic – Singleton)

Dipakai untuk: Sambutan Kepala Sekolah, Video Profil, Akreditasi, Lokasi, Maps, WhatsApp, Email.

**Skema tabel:**

```ts
{
  key: text primary key,      // ex: 'contact_whatsapp', 'principal_message'
  value: jsonb,                // fleksibel: string, atau object {text, image_url}
  updated_by: integer references users(id),
  updated_at: timestamptz default now(),
}
```

**Konvensi API route:**

| Method | Route | Fungsi | Akses |
|---|---|---|---|
| GET | `/api/settings/[key]` | Ambil satu setting | Public |
| GET | `/api/settings` | Ambil semua (untuk admin dashboard) | Admin |
| PUT | `/api/settings/[key]` | Update value | `super_admin` only (settings itu sekolah-wide, bukan per jurusan) |

---

## Response Envelope Standar (WAJIB dipakai semua endpoint)

```json
// Sukses
{ "success": true, "data": { ... } }

// List (dengan pagination)
{ "success": true, "data": [ ... ], "meta": { "page": 1, "limit": 10, "total": 42 } }

// Gagal
{ "success": false, "error": { "code": "NOT_FOUND", "message": "..." } }
```

Helper-nya ditaruh di `lib/api-response.ts` — semua route handler **wajib** pakai helper ini, bukan `Response.json()` manual, supaya bentuknya konsisten di seluruh endpoint yang ditulis 3 programmer berbeda.

---

## Auth & Role Scoping

- Session token random, disimpan di cookie `httpOnly`, tabel `sessions` (mirip pattern token 7 hari seperti prototype lain — cukup untuk scope ini, tidak perlu JWT).
- `users.role` = `super_admin` | `jurusan_admin`.
- `users.jurusan_id` nullable — diisi kalau role-nya `jurusan_admin`.
- **Setiap route handler yang mutasi data `ContentList` wajib cek**: kalau role `jurusan_admin`, request body/params `jurusan_id` harus sama dengan `users.jurusan_id` milik sesi yang login. Kalau tidak sama → 403. Ini logic yang sama dipakai di semua resource, taruh sebagai satu helper `assertJurusanScope()` di `lib/auth.ts`, jangan ditulis ulang per endpoint.

---

## Component Layering Rule (teknis dari Strict Rule #1 di `AI_CONTEXT.md`)

**Sumber component TIDAK dibatasi ke 1-2 library tertentu.** Daftar aktual (dengan link per section) ada di `docs/context/component-registry.md` — file itu satu-satunya rujukan, jangan menebak dari tabel stack di `AI_CONTEXT.md`.

Urutan cek:

1. **`component-registry.md`** — cek dulu, selalu, untuk section yang sedang dikerjakan. Kalau ada entry (dari sumber manapun — Cult UI, UI Layouts, Magic UI, Aura Build, atau sumber lain yang ditambahkan tim desain nanti), pakai apa adanya, **hanya implementasi**.
2. Kalau section belum punya entry di registry → **shadcn/ui** dipakai sebagai basis untuk elemen generik (button, input, table, dialog) supaya tidak reinvent primitives dari nol.
3. Kalau butuh block yang lebih spesifik dan tidak ada di registry maupun shadcn → boleh generate sendiri, **wajib** menyeragamkan dengan komponen lain yang sudah dipakai (lewat token, lihat bawah).

Karena sumbernya sengaja beragam (Cult UI, UI Layouts, Magic UI, Aura Build masing-masing punya "rasa" styling sendiri), **konsistensi visual dijaga lewat token, bukan lewat memilih satu library favorit**: semua warna/spacing/radius/font didefinisikan **satu kali** di `tailwind.config.ts` berdasarkan brand kit tim desain (oranye/hitam, identitas JHIC/sekolah). Setiap component yang di-copy dari sumber manapun **wajib direstyle** supaya konsumsi token ini — jangan dipakai apa adanya dengan warna/spacing/font bawaan sumbernya.

> Catatan khusus untuk entry dari **Aura Build**: situs ini memblokir automated access (robots disallowed), jadi AI coding assistant **tidak bisa** membuka/membaca isi halaman komponennya secara otomatis. Untuk entry Aura Build di registry, PIC/tim desain wajib **screenshot atau copy manual** kode komponennya ke SRS terkait sebelum AI mulai implementasi — jangan minta AI "buka link-nya sendiri".

---

## Catatan Arsitektur AI Chatbot (khusus — di luar pattern 2-fase standar)

Chatbot bukan content section biasa, jadi SRS-nya boleh punya **Fase 3 tambahan** (lihat `SRS_TEMPLATE.md`):

- **Fase 1**: UI widget chatbot (pakai component dari registry kalau ada).
- **Fase 2**: Backend CRUD untuk knowledge base per jurusan — tabel `chatbot_knowledge (id, jurusan_id, content_text, created_at)`, dikelola `jurusan_admin` lewat halaman Admin → Chatbot.
- **Fase 3 (khusus chatbot)**: Integrasi LLM. Approach paling ringan untuk scope prototype: **context-stuffing**, bukan vector DB/RAG penuh — ambil semua `chatbot_knowledge` milik jurusan terkait, masukkan sebagai system prompt, panggil LLM API di `app/api/chatbot/route.ts`. Kalau nanti knowledge base-nya membesar dan context-stuffing sudah tidak cukup, baru evaluasi vector search — jangan over-engineer dari awal.

Provider LLM belum ditentukan di file ini — putuskan & catat sebagai ADR baru di `decisions.md` saat tim mulai kerjakan section ini.
