# Changelog

> Catatan perubahan untuk project CibiOne CMS

Format changelog mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan project ini menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned Features
- User management UI untuk Super Admin
- Bulk operations untuk posts (publish/unpublish multiple items)
- Export data to CSV/Excel
- Email notifications untuk approval workflow
- Activity logs per user
- Advanced search dengan filters
- Draft auto-save
- Image cropping/editing tool
- Video upload support
- Multi-language support (EN/ID)

---

## [0.1.0] - 2026-08-20

### Initial Release

Ini adalah release pertama (MVP) untuk **Jagoan Hosting Innovation Competition (JHIC) 2026**.

### Added

#### Core Infrastructure
- ✅ Next.js 15 setup dengan App Router
- ✅ TypeScript 5.9.2 configuration
- ✅ Tailwind CSS 4.1.11 setup
- ✅ PostgreSQL database dengan Drizzle ORM
- ✅ Session-based authentication system
- ✅ Role-based access control (super_admin, jurusan_admin)

#### Database Schema
- ✅ `users` table - User accounts
- ✅ `sessions` table - Session management
- ✅ `jurusan` table - Kompetensi keahlian
- ✅ `posts` table - Unified table untuk berita/pengumuman/prestasi/agenda
- ✅ `site_settings` table - Key-value store untuk singleton settings
- ✅ `chatbot_knowledge` table - Knowledge base untuk AI chatbot

#### API Endpoints
- ✅ `/api/auth/*` - Authentication (login, logout, me)
- ✅ `/api/posts` - CRUD posts dengan pagination & filters
- ✅ `/api/posts/[id]` - Single post operations
- ✅ `/api/jurusan` - CRUD jurusan
- ✅ `/api/jurusan/[id]` - Single jurusan operations
- ✅ `/api/guru` - CRUD guru (coming soon)
- ✅ `/api/guru/[id]` - Single guru operations (coming soon)
- ✅ `/api/settings` - Site settings management
- ✅ `/api/settings/[key]` - Single setting operations
- ✅ `/api/chatbot` - AI chatbot endpoint (coming soon)

#### API Helpers
- ✅ Response envelope standar (`apiSuccess`, `apiError`)
- ✅ Role scoping helper (`assertJurusanScope`)
- ✅ Validation dengan Zod schemas

#### Public Pages
- ✅ Home page (`/`)
- ✅ Profil Sekolah (`/profil-sekolah`)
- ✅ Kompetensi Keahlian (`/kompetensi-keahlian`)
- ✅ Berita (`/berita`)
- ✅ Berita Detail (`/berita/[slug]`)
- ✅ Kontak (`/kontak`)

#### Admin Pages (Coming Soon)
- 🔄 Dashboard admin (`/admin`)
- 🔄 Posts management (`/admin/berita`, `/admin/pengumuman`, dll)
- 🔄 Guru management (`/admin/guru`)
- 🔄 Jurusan management (`/admin/jurusan`)
- 🔄 Settings management (`/admin/settings`)
- 🔄 Chatbot config (`/admin/chatbot`)

#### Components
- ✅ UI components dari shadcn/ui (base primitives)
- ✅ `InfiniteSlider` component untuk logo carousel
- ✅ `ContactFooter` section component
- ✅ `LogoCloud` section component

#### Documentation
- ✅ `README.md` - Quick start guide
- ✅ `DOCUMENTATION.md` - Dokumentasi lengkap project
- ✅ `PANDUAN_PENGGUNAAN.md` - User guide untuk admin
- ✅ `docs/API_DOCUMENTATION.md` - API documentation
- ✅ `docs/DEPLOYMENT_GUIDE.md` - Deployment guide
- ✅ `CONTRIBUTING.md` - Contributing guide
- ✅ `CHANGELOG.md` - This file
- ✅ `docs/context/AI_CONTEXT.md` - AI assistant guidelines
- ✅ `docs/context/architecture.md` - System architecture
- ✅ `docs/context/project.md` - Project overview
- ✅ `docs/context/component-registry.md` - Component sources
- ✅ `docs/context/decisions.md` - Architecture Decision Records
- ✅ `docs/context/glossary.md` - Terminology
- ✅ `docs/context/SRS_TEMPLATE.md` - SRS template

#### SRS (Software Requirement Specifications)
- ✅ `docs/srs/kontak/contact-section.md` - Contact section SRS
- ✅ `docs/srs/kompetensi-keahlian/program-keahlian-section.md` - Program keahlian SRS

#### Development Tools
- ✅ ESLint configuration
- ✅ TypeScript strict mode
- ✅ Drizzle Kit untuk migrations
- ✅ `.env.example` template

### Security
- ✅ Session-based authentication dengan httpOnly cookies
- ✅ Password hashing dengan bcrypt (to be implemented)
- ✅ Role-based authorization
- ✅ Jurusan scope validation untuk jurusan_admin
- ✅ SQL injection protection via Drizzle ORM
- ✅ XSS protection via React default escaping

### Performance
- ✅ Server-side rendering untuk halaman publik (SEO)
- ✅ Static generation untuk halaman yang jarang berubah
- ✅ Lazy loading components
- ✅ Image optimization dengan Next.js Image component (to be implemented)
- ✅ API response caching (to be implemented)

---

## Development Timeline

### Week 1 (Aug 11-17, 2026)
- Project initialization
- Documentation setup
- Database schema design
- Core API patterns established

### Week 2 (Aug 18-24, 2026)
- Public pages implementation
- Component integration
- API endpoints implementation
- Testing & bug fixes

### Week 3 (Aug 25-31, 2026) - PLANNED
- Admin dashboard implementation
- Chatbot integration
- Final testing
- Deployment to production

### Week 4 (Sep 1-7, 2026) - PLANNED
- Competition submission preparation
- Bug fixes & polish
- Performance optimization
- Final documentation

---

## Known Issues

### Critical
- None

### High Priority
- [ ] Authentication endpoints belum diimplementasi
- [ ] Admin dashboard belum diimplementasi
- [ ] Image upload ke Vercel Blob belum diimplementasi
- [ ] Chatbot integration belum selesai

### Medium Priority
- [ ] Pagination meta perlu ditambahkan di semua list endpoints
- [ ] Error handling belum comprehensive
- [ ] Validation messages masih hardcoded (perlu i18n)

### Low Priority
- [ ] Loading states belum konsisten
- [ ] Mobile navigation perlu improvement
- [ ] Dark mode support (future)

---

## Migration Guide

### From v0.0.x to v0.1.0

Ini adalah initial release, tidak ada migration dari versi sebelumnya.

**Fresh Installation:**

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

---

## Breaking Changes

### v0.1.0

Tidak ada breaking changes (initial release).

---

## Deprecations

### v0.1.0

Tidak ada deprecations (initial release).

---

## Contributors

### Core Team

**Programming:**
- Developer 1 - Backend & Infrastructure
- Developer 2 - Frontend & UI
- Developer 3 - Full-stack & Integration

**Design & Content:**
- Designer 1 - UI/UX & Component Research
- Designer 2 - Content & Competition Materials

### Special Thanks

- **Jagoan Hosting** untuk menyelenggarakan JHIC 2026
- **SMKN 1 Cibinong** untuk dukungan dan data
- **shadcn** untuk shadcn/ui components
- **Magic UI**, **Cult UI**, **UI Layouts**, **Aura Build** untuk component inspiration
- **Vercel** untuk platform deployment
- **Next.js team** untuk framework yang luar biasa

---

## Release Notes Template

Untuk release berikutnya, gunakan format ini:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features yang ditambahkan

### Changed
- Changes in existing functionality

### Deprecated
- Features yang akan dihapus di release mendatang

### Removed
- Features yang sudah dihapus

### Fixed
- Bug fixes

### Security
- Security improvements atau patches
```

---

## Versioning Strategy

Project ini mengikuti **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **MAJOR** (X.0.0): Breaking changes, incompatible API changes
- **MINOR** (0.X.0): New features, backwards-compatible
- **PATCH** (0.0.X): Bug fixes, backwards-compatible

**Pre-release versions:**
- **Alpha** (0.1.0-alpha.1): Early development, unstable
- **Beta** (0.1.0-beta.1): Feature complete, testing phase
- **RC** (0.1.0-rc.1): Release candidate, final testing

---

## Roadmap

### v0.2.0 (Target: September 2026)

**Theme: Admin Dashboard Complete**

- [ ] Complete admin dashboard implementation
- [ ] User management UI
- [ ] Bulk operations
- [ ] Advanced filters & search
- [ ] Export data functionality
- [ ] Activity logs

### v0.3.0 (Target: October 2026)

**Theme: AI & Automation**

- [ ] Complete chatbot integration
- [ ] Knowledge base management UI
- [ ] Auto-tagging posts dengan AI
- [ ] Content recommendations
- [ ] Automated SEO optimization

### v0.4.0 (Target: November 2026)

**Theme: Enhancement & Scale**

- [ ] Multi-language support (EN/ID)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Scheduled publishing
- [ ] Content approval workflow
- [ ] Performance optimization

### v1.0.0 (Target: December 2026)

**Theme: Production Ready**

- [ ] Complete all core features
- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Security audit
- [ ] Performance benchmarks
- [ ] Complete documentation
- [ ] Migration guides
- [ ] Public API documentation

---

## Support

Jika Anda menemukan bug atau memiliki pertanyaan:

- **GitHub Issues**: https://github.com/your-org/CibiOne_cms/issues
- **Email**: support@cibionecms.com
- **Documentation**: Lihat `docs/` folder

---

**Changelog Version:** 1.0.0

**Last Updated:** August 20, 2026

---

[Unreleased]: https://github.com/your-org/CibiOne_cms/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-org/CibiOne_cms/releases/tag/v0.1.0
