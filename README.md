# CibiOne CMS

> Website CMS Terdesentralisasi untuk SMKN 1 Cibinong - JHIC 2026

[![Next.js](https://img.shields.io/badge/Next.js-15.5.23-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE.md)

---

## 🎯 Tentang Project

**CibiOne CMS** adalah sistem manajemen konten website sekolah yang memungkinkan setiap jurusan/kompetensi keahlian di SMKN 1 Cibinong mengelola konten mereka secara mandiri. Dilengkapi dengan AI Chatbot untuk menjawab pertanyaan pengunjung 24/7.

**Dibangun untuk:** Jagoan Hosting Innovation Competition (JHIC) 2026

### Fitur Utama

- ✅ **Multi-role Access Control**: Super Admin & Admin Jurusan
- ✅ **Terdesentralisasi**: Setiap jurusan kelola kontennya sendiri
- ✅ **AI Chatbot**: Knowledge base per jurusan
- ✅ **SEO Optimized**: Server-side rendering
- ✅ **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone <repository-url>
cd CibiOne_cms

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan DATABASE_URL Anda

# Run migrations
npx drizzle-kit generate
npx drizzle-kit migrate

# Start development server
npm run dev
```

Buka http://localhost:3000 di browser Anda.

---

## 📚 Dokumentasi

| Dokumen | Deskripsi |
|---------|-----------|
| **[DOCUMENTATION.md](DOCUMENTATION.md)** | Dokumentasi lengkap project (teknologi, arsitektur, API, dll) |
| **[PANDUAN_PENGGUNAAN.md](docs/PANDUAN_PENGGUNAAN.md)** | Panduan untuk end-user (admin sekolah & admin jurusan) |
| **[API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** | Dokumentasi REST API lengkap |
| **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** | Panduan deployment ke production (Vercel) |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Panduan kontribusi untuk developer |
| **[CHANGELOG.md](CHANGELOG.md)** | Catatan perubahan setiap versi |
| **[SECURITY.md](SECURITY.md)** | Kebijakan keamanan & cara report vulnerability |
| **[LICENSE.md](LICENSE.md)** | Lisensi & atribusi third-party |

### Dokumentasi Internal (Developer)

| File | Deskripsi |
|------|-----------|
| [AI_CONTEXT.md](docs/context/AI_CONTEXT.md) | Guidelines untuk AI assistant |
| [architecture.md](docs/context/architecture.md) | System architecture detail |
| [project.md](docs/context/project.md) | Project overview & site map |
| [component-registry.md](docs/context/component-registry.md) | Component sources mapping |
| [decisions.md](docs/context/decisions.md) | Architecture Decision Records (ADR) |
| [glossary.md](docs/context/glossary.md) | Terminology & definitions |
| [SRS_TEMPLATE.md](docs/context/SRS_TEMPLATE.md) | Template untuk Software Requirement Spec |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: shadcn/ui, Cult UI, Magic UI, UI Layouts
- **Database**: PostgreSQL + Drizzle ORM
- **State Management**: TanStack Query (admin), Server Components (public)
- **Validation**: Zod
- **Deployment**: Vercel
- **Storage**: Vercel Blob

---

## 📂 Struktur Project

```
CibiOne_cms/
├── app/
│   ├── (public)/           # Halaman publik (SSR)
│   ├── admin/              # Dashboard admin (CSR)
│   └── api/                # REST API endpoints
├── components/
│   ├── ui/                 # Base UI components
│   ├── sections/           # Section components
│   └── admin/              # Admin components
├── db/
│   ├── schema.ts           # Database schema
│   └── index.ts            # DB connection
├── lib/
│   ├── auth.ts             # Auth utilities
│   ├── api-response.ts     # API helpers
│   └── utils.ts            # General utilities
├── docs/
│   ├── context/            # Project documentation
│   ├── srs/                # Section requirements
│   └── references/         # Code references
└── public/                 # Static assets
```

---

## 🎓 Aturan Kerja (Developer)

### WAJIB Dibaca Sebelum Mulai:

1. **[AI_CONTEXT.md](docs/context/AI_CONTEXT.md)** - Rule inti project
2. **[architecture.md](docs/context/architecture.md)** - Pattern backend & struktur
3. **[component-registry.md](docs/context/component-registry.md)** - Daftar component yang tersedia

### Workflow Development:

1. **Cek Component Registry** sebelum buat UI baru
2. **Buat SRS** di `docs/srs/<halaman>/<section>.md` sebelum coding
3. **Follow Pattern**:
   - Dynamic list → `ContentList` pattern
   - Singleton → `SiteSetting` pattern
4. **Update SRS Execution Log** setiap ada progress

---

## 🧪 Available Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm start` | Run production server |
| `npm run lint` | Lint code dengan ESLint |
| `npx drizzle-kit generate` | Generate migration |
| `npx drizzle-kit migrate` | Run migration |
| `npx drizzle-kit studio` | Open database GUI |

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Posts (Berita/Pengumuman/Prestasi/Agenda)
- `GET /api/posts` - List posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Jurusan
- `GET /api/jurusan` - List jurusan
- `POST /api/jurusan` - Create jurusan (super_admin only)

### Site Settings
- `GET /api/settings/:key` - Get setting
- `PUT /api/settings/:key` - Update setting (super_admin only)

**Lihat [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) untuk detail lengkap.**

---

## 🚢 Deployment

Deploy ke Vercel dengan 1-click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/CibiOne_cms)

**Manual deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Lihat [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) untuk panduan lengkap.**

---

## 🤝 Contributing

Kami menerima kontribusi! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk guidelines.

### Quick Contributing:

1. Fork repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m '[Fase1] Add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Create Pull Request

---

## 📄 License

Project ini menggunakan MIT License. Lihat [LICENSE.md](LICENSE.md) untuk detail.

### Third-Party Components:

- shadcn/ui (MIT)
- Cult UI (with attribution)
- Magic UI (MIT)
- UI Layouts (with attribution)

---

## 👥 Tim

### Programming
- Developer 1 - Backend & Infrastructure
- Developer 2 - Frontend & UI
- Developer 3 - Full-stack & Integration

### Design & Content
- Designer 1 - UI/UX & Component Research
- Designer 2 - Content & Competition Materials

---

## 🏆 Competition

**Jagoan Hosting Innovation Competition (JHIC) 2026**
- Kategori: Web Development / CMS Innovation
- Institusi: SMKN 1 Cibinong
- Website: https://smkn1cibinong.sch.id

---

## 📞 Support

- **Documentation**: Lihat folder `docs/`
- **Issues**: [GitHub Issues](https://github.com/your-org/CibiOne_cms/issues)
- **Email**: support@cibionecms.com

---

## 🌟 Features Roadmap

### v0.1.0 (Current - August 2026)
- ✅ Core infrastructure
- ✅ Database schema
- ✅ Basic API endpoints
- ✅ Public pages
- 🔄 Admin dashboard (in progress)

### v0.2.0 (September 2026)
- [ ] Complete admin dashboard
- [ ] User management
- [ ] Bulk operations
- [ ] Advanced filters

### v0.3.0 (October 2026)
- [ ] AI Chatbot integration
- [ ] Knowledge base management
- [ ] Auto-tagging dengan AI

### v1.0.0 (December 2026)
- [ ] Production ready
- [ ] Complete testing
- [ ] Security audit
- [ ] Performance optimization

---

## ⚡ Performance

- Lighthouse Score: 90+ (target)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- SEO Score: 100

---

## 🔒 Security

Jika menemukan security vulnerability, jangan buat public issue. Email ke: **security@cibionecms.com**

Lihat [SECURITY.md](SECURITY.md) untuk detail kebijakan keamanan.

---

**Built with ❤️ for SMKN 1 Cibinong - JHIC 2026**

---

**Version:** 0.1.0 | **Last Updated:** August 20, 2026
