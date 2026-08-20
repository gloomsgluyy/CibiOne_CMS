# CibiOne CMS - Dokumentasi Lengkap

> **Website CMS Terdesentralisasi SMKN 1 Cibinong**  
> Dibangun untuk Jagoan Hosting Innovation Competition (JHIC) 2026

---

## 📋 Daftar Isi

1. [Ringkasan Project](#ringkasan-project)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Struktur Folder](#struktur-folder)
4. [Setup & Instalasi](#setup--instalasi)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Arsitektur System](#arsitektur-system)
8. [Panduan Development](#panduan-development)
9. [Deployment](#deployment)
10. [Kontribusi](#kontribusi)

---

## 🎯 Ringkasan Project

### Apa itu CibiOne CMS?

CibiOne CMS adalah Content Management System website sekolah untuk **SMKN 1 Cibinong** yang dirancang dengan pendekatan **terdesentralisasi**. Sistem ini memungkinkan setiap jurusan/kompetensi keahlian memiliki kontrol mandiri atas konten mereka tanpa harus menunggu approval dari admin pusat.

### Masalah yang Diselesaikan

- **Bottleneck Update Konten**: Update info jurusan yang sebelumnya memakan waktu 3-7 hari kerja kini bisa dilakukan langsung oleh admin jurusan
- **Visibilitas Jurusan**: Setiap jurusan memiliki ruang untuk menampilkan prestasi dan mitra industri mereka secara terpisah
- **Akses Informasi 24/7**: AI Chatbot terintegrasi untuk menjawab pertanyaan calon siswa secara otomatis

### Fitur Utama

1. **Multi-role Access Control**
   - `super_admin`: Akses penuh ke semua konten
   - `jurusan_admin`: Akses terbatas ke konten jurusan masing-masing

2. **Content Management**
   - Berita, Pengumuman, Prestasi, dan Agenda
   - Data Guru & Staff per jurusan
   - Kerja Sama Industri
   - Sarana Prasarana
   - Site Settings (kontak, lokasi, dll)

3. **AI Chatbot**
   - Knowledge base per jurusan
   - Response otomatis untuk pertanyaan umum

4. **SEO Optimized**
   - Server-side rendering untuk halaman publik
   - Fast page loads dengan Next.js 15

---

## 🛠️ Teknologi yang Digunakan

### Core Framework
- **Next.js 15** (App Router) - Framework utama
- **TypeScript 5.9.2** - Type safety
- **React 19.1.0** - UI library

### Styling & Components
- **Tailwind CSS 4.1.11** - Utility-first CSS
- **shadcn/ui** - Base component library
- **Cult UI, UI Layouts, Magic UI, Aura Build** - Component sources

### Database & ORM
- **PostgreSQL** - Database
- **Drizzle ORM 0.44.4** - Type-safe ORM
- **Drizzle Kit 0.31.4** - Migration tool

### State Management & Data Fetching
- **TanStack Query 5.85.0** - Server state management (admin)
- **Server Components** - Data fetching (public pages)

### Validation
- **Zod 4.0.17** - Schema validation

### Utilities
- **clsx** - Conditional classnames
- **tailwind-merge** - Tailwind class merging

### Deployment
- **Vercel** - Hosting platform
- **Vercel Blob** - File/image storage

---

## 📁 Struktur Folder

```
CibiOne_cms/
├── app/
│   ├── (public)/              # Halaman publik (SSR)
│   │   ├── page.tsx           # Home
│   │   ├── profil-sekolah/
│   │   ├── kompetensi-keahlian/
│   │   ├── berita/
│   │   │   ├── page.tsx       # List berita
│   │   │   └── [slug]/        # Detail berita
│   │   └── kontak/
│   ├── admin/                 # Dashboard admin (CSR)
│   │   ├── page.tsx           # Dashboard utama
│   │   ├── berita/
│   │   ├── guru/
│   │   └── chatbot/
│   ├── api/                   # Backend API routes
│   │   ├── posts/
│   │   │   ├── route.ts       # GET list, POST create
│   │   │   └── [id]/route.ts  # GET/PUT/DELETE by id
│   │   ├── guru/
│   │   ├── jurusan/
│   │   ├── settings/
│   │   └── chatbot/
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Base UI components (shadcn)
│   │   └── infinite-slider.tsx
│   ├── sections/              # Section components (public)
│   │   ├── contact-footer.tsx
│   │   └── logo-cloud.tsx
│   └── admin/                 # Admin components
├── db/
│   ├── schema.ts              # Database schema
│   └── index.ts               # DB connection
├── lib/
│   ├── auth.ts                # Auth utilities
│   ├── api-response.ts        # API response helpers
│   └── utils.ts               # General utilities
├── docs/
│   ├── context/               # Project documentation
│   │   ├── AI_CONTEXT.md      # AI guidelines
│   │   ├── architecture.md    # System architecture
│   │   ├── project.md         # Project overview
│   │   ├── component-registry.md
│   │   ├── decisions.md       # ADRs
│   │   ├── glossary.md        # Terminology
│   │   └── SRS_TEMPLATE.md
│   ├── srs/                   # Section requirements
│   └── references/            # Code references
├── public/                    # Static assets
├── drizzle.config.ts          # Drizzle configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── .env.example               # Environment variables template
└── README.md                  # Quick start guide
```

---

## 🚀 Setup & Instalasi

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd CibiOne_cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Copy `.env.example` ke `.env` dan isi dengan kredensial Anda:
   ```env
   DATABASE_URL="postgres://user:password@localhost:5432/cibione"
   ```

4. **Setup database**
   
   Buat database PostgreSQL:
   ```bash
   createdb cibione
   ```

   Generate dan run migrations:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. **Seed data (opsional)**
   
   Jika ada seed script, jalankan untuk data awal:
   ```bash
   npm run seed
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

   Buka http://localhost:3000 di browser Anda.

### Script NPM

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build production bundle |
| `npm start` | Jalankan production server |
| `npm run lint` | Lint code dengan ESLint |

---

## 🗄️ Database Schema

### Tabel: `users`

User accounts untuk admin sekolah dan admin jurusan.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `serial` | Primary key |
| `name` | `text` | Nama lengkap user |
| `email` | `text` | Email (unique) |
| `password_hash` | `text` | Hashed password |
| `role` | `enum` | `super_admin` atau `jurusan_admin` |
| `jurusan_id` | `integer` | Foreign key ke `jurusan`, nullable |

### Tabel: `sessions`

Session tokens untuk authentication.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `serial` | Primary key |
| `user_id` | `integer` | Foreign key ke `users` |
| `token` | `text` | Session token (unique) |
| `expires_at` | `timestamptz` | Expiry timestamp |

### Tabel: `jurusan`

Daftar kompetensi keahlian di sekolah.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `serial` | Primary key |
| `title` | `text` | Nama jurusan |
| `slug` | `text` | URL slug (unique) |
| `body` | `text` | Deskripsi jurusan |
| `image_url` | `text` | URL logo/foto jurusan |
| `is_published` | `boolean` | Status publish |
| `created_at` | `timestamptz` | Timestamp dibuat |
| `updated_at` | `timestamptz` | Timestamp diupdate |

### Tabel: `posts`

Unified table untuk Berita, Pengumuman, Prestasi, dan Agenda.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `serial` | Primary key |
| `jurusan_id` | `integer` | Foreign key ke `jurusan`, nullable |
| `type` | `enum` | `berita`, `pengumuman`, `prestasi`, `agenda` |
| `title` | `text` | Judul |
| `slug` | `text` | URL slug (unique) |
| `body` | `text` | Konten (rich text/markdown) |
| `image_url` | `text` | URL gambar |
| `event_date` | `timestamptz` | Tanggal event (untuk agenda) |
| `is_published` | `boolean` | Status publish |
| `created_by` | `integer` | Foreign key ke `users` |
| `created_at` | `timestamptz` | Timestamp dibuat |
| `updated_at` | `timestamptz` | Timestamp diupdate |

### Tabel: `site_settings`

Key-value store untuk singleton settings (kontak, lokasi, dll).

| Field | Type | Description |
|-------|------|-------------|
| `key` | `text` | Primary key (e.g., 'contact_whatsapp') |
| `value` | `jsonb` | Value (fleksibel: string, object, dll) |
| `updated_by` | `integer` | Foreign key ke `users` |
| `updated_at` | `timestamptz` | Timestamp diupdate |

### Tabel: `chatbot_knowledge`

Knowledge base untuk AI Chatbot per jurusan.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `serial` | Primary key |
| `jurusan_id` | `integer` | Foreign key ke `jurusan` |
| `content_text` | `text` | Konten knowledge base |
| `created_at` | `timestamptz` | Timestamp dibuat |

---

## 🔌 API Endpoints

Semua API menggunakan **response envelope standar**:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**List Response (dengan pagination):**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### Posts (Berita/Pengumuman/Prestasi/Agenda)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts` | List posts dengan filter & pagination | Public (published only) / Admin (all) |
| GET | `/api/posts/[id]` | Get single post | Public / Admin |
| POST | `/api/posts` | Create new post | Admin |
| PUT | `/api/posts/[id]` | Update post | Admin (scoped) |
| DELETE | `/api/posts/[id]` | Delete post | Admin (scoped) |

**Query Parameters untuk GET `/api/posts`:**
- `type`: Filter by type (`berita`, `pengumuman`, `prestasi`, `agenda`)
- `jurusan_id`: Filter by jurusan
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Jurusan

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jurusan` | List all jurusan | Public |
| GET | `/api/jurusan/[id]` | Get single jurusan | Public |
| POST | `/api/jurusan` | Create jurusan | Super Admin |
| PUT | `/api/jurusan/[id]` | Update jurusan | Super Admin |
| DELETE | `/api/jurusan/[id]` | Delete jurusan | Super Admin |

### Guru

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/guru` | List guru | Public |
| GET | `/api/guru/[id]` | Get single guru | Public |
| POST | `/api/guru` | Create guru | Admin (scoped) |
| PUT | `/api/guru/[id]` | Update guru | Admin (scoped) |
| DELETE | `/api/guru/[id]` | Delete guru | Admin (scoped) |

### Site Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/settings` | Get all settings | Admin |
| GET | `/api/settings/[key]` | Get single setting | Public |
| PUT | `/api/settings/[key]` | Update setting | Super Admin |

**Contoh keys yang tersedia:**
- `contact_whatsapp`: Nomor WhatsApp
- `contact_email`: Email kontak
- `contact_address`: Alamat sekolah
- `contact_maps`: Google Maps embed URL
- `principal_message`: Sambutan Kepala Sekolah

### Chatbot

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/chatbot` | Send message to chatbot | Public |

**Request Body:**
```json
{
  "message": "Apa saja jurusan yang tersedia?",
  "jurusan_id": 1 // optional
}
```

---

## 🏗️ Arsitektur System

### Overview

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

### Pattern Backend #1: ContentList

Untuk konten dinamis yang berupa list (berita, guru, jurusan, dll).

**Field wajib:**
- `id`, `title`, `slug`, `body`, `image_url`
- `jurusan_id` (nullable - null berarti sekolah-wide)
- `is_published`, `created_by`, `created_at`, `updated_at`

**Contoh:** `posts`, `guru`, `jurusan`, `sarana_prasarana`, `kerjasama_industri`

### Pattern Backend #2: SiteSetting

Untuk konten dinamis singleton (kontak, lokasi, dll).

**Schema:**
- `key`: Primary key (e.g., 'contact_whatsapp')
- `value`: JSONB (fleksibel: string, object, dll)
- `updated_by`, `updated_at`

**Contoh:** Nomor WhatsApp, Email, Alamat, Maps embed

### Authentication & Authorization

**Session-based Auth:**
- Token random disimpan di tabel `sessions`
- Cookie `httpOnly` dengan expiry 7 hari
- No JWT complexity - simple revocation via DB

**Role Scoping:**
```typescript
// Helper di lib/auth.ts
assertJurusanScope(user, jurusanId)
```

`jurusan_admin` hanya bisa CRUD content dengan `jurusan_id` yang sama dengan miliknya.

### Data Fetching Strategy

**Halaman Publik (app/(public)/)**
- Server Components
- Fetch data langsung di server
- Zero client-side JS untuk data fetching
- SEO optimized

**Admin Dashboard (app/admin/)**
- Client Components
- TanStack Query untuk state management
- Optimistic updates
- Cache invalidation

---

## 👨‍💻 Panduan Development

### Coding Conventions

**TypeScript:**
- Strict mode enabled
- Named exports untuk components
- Functional components only

**Styling:**
- Tailwind utility classes only
- No CSS modules or styled-components
- Follow design tokens di `tailwind.config.ts`

**Validation:**
- Zod untuk schema validation
- Reuse schema di client & server

**API Response:**
```typescript
// lib/api-response.ts
import { apiSuccess, apiError } from '@/lib/api-response';

// Success
return apiSuccess(data);

// Success dengan pagination
return apiSuccess(data, undefined, { page, limit, total });

// Error
return apiError({ code: 'NOT_FOUND', message: 'Resource not found' }, { status: 404 });
```

### Component Registry

**WAJIB cek `docs/context/component-registry.md` sebelum membuat UI baru!**

Jangan membuat component dari scratch jika sudah tersedia di registry dari:
- Cult UI
- UI Layouts
- Magic UI
- Aura Build
- shadcn/ui

### Workflow Development

1. **Buat SRS** di `docs/srs/<halaman>/<section>.md`
2. **Fase 1**: Implement frontend (UI)
3. **Review & Approve** Fase 1
4. **Fase 2**: Implement backend (API, DB)
5. **Review & Approve** Fase 2
6. **Testing**: Manual testing + fix bugs
7. **Deploy**: Push ke Vercel

### Commit Message Convention

```
[Fase1] Add hero banner component
[Fase2] Implement posts API endpoint
fix: Fix jurusan scoping in guru API
chore: Update dependencies
```

### Database Migrations

**Generate migration:**
```bash
npx drizzle-kit generate
```

**Apply migration:**
```bash
npx drizzle-kit migrate
```

**Studio (DB GUI):**
```bash
npx drizzle-kit studio
```

---

## 🚢 Deployment

### Vercel Deployment

Project ini dioptimalkan untuk Vercel deployment.

**Langkah deployment:**

1. **Push ke Git repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Login ke Vercel.com
   - Import project dari Git
   - Select repository

3. **Configure environment variables**
   - Add `DATABASE_URL` dengan connection string PostgreSQL production
   - Add Vercel Blob credentials (jika digunakan)

4. **Deploy**
   - Vercel akan otomatis build & deploy
   - URL production akan tersedia dalam beberapa menit

### Environment Variables Production

```env
DATABASE_URL="postgres://user:password@host:5432/database?sslmode=require"
BLOB_READ_WRITE_TOKEN="vercel_blob_token_here"
```

### Database Production

**Option 1: Vercel Postgres**
- Terintegrasi langsung dengan Vercel
- Setup otomatis
- Free tier tersedia

**Option 2: External PostgreSQL (Neon, Supabase, Railway)**
- Lebih fleksibel
- Potensial lebih murah untuk scale
- Butuh setup manual connection string

---

## 🤝 Kontribusi

### Tim Development

| Role | Jumlah | Tanggung Jawab |
|------|--------|----------------|
| Desain & Materi Lomba | 2 orang | UI layout, SRS, riset component |
| Programming | 3 orang | SRS detail, implementasi, review |

### Workflow Kontribusi

1. **Claim section** di `docs/srs/`
2. **Buat SRS** mengikuti template
3. **Implement** sesuai SRS
4. **Create Pull Request** dengan format:
   ```
   [Fase1] Implement Hero Banner section
   
   - Component dari Cult UI hero-liquid-metal
   - Responsive design
   - Animation on scroll
   
   Closes #<issue-number>
   ```
5. **Code review** oleh reviewer
6. **Merge** setelah approved

### Review Checklist

- [ ] Component dari registry (jika tersedia)
- [ ] Response API menggunakan envelope standar
- [ ] Jurusan scoping untuk `jurusan_admin`
- [ ] TypeScript strict mode pass
- [ ] Mobile responsive
- [ ] Loading states handled
- [ ] Error states handled
- [ ] SRS updated dengan execution log

---

## 📚 Resources

### Dokumentasi Internal

| File | Deskripsi |
|------|-----------|
| `docs/context/AI_CONTEXT.md` | Guidelines untuk AI assistant |
| `docs/context/architecture.md` | System architecture detail |
| `docs/context/project.md` | Project overview & site map |
| `docs/context/component-registry.md` | Component sources mapping |
| `docs/context/decisions.md` | Architecture Decision Records |
| `docs/context/glossary.md` | Terminology & definitions |

### External Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## 📄 License

Project ini dibuat untuk **Jagoan Hosting Innovation Competition (JHIC) 2026**.

---

## 📞 Contact

Untuk pertanyaan atau issues, silakan:
- Buat issue di repository
- Hubungi tim development

---

**Built with ❤️ for SMKN 1 Cibinong - JHIC 2026**
