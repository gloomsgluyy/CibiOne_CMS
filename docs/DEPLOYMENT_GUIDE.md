# Deployment Guide - CibiOne CMS

> Panduan lengkap deployment ke production untuk CibiOne CMS

---

## 📋 Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Deployment ke Vercel](#deployment-ke-vercel)
3. [Setup Database Production](#setup-database-production)
4. [Environment Variables](#environment-variables)
5. [Setup Vercel Blob Storage](#setup-vercel-blob-storage)
6. [Custom Domain](#custom-domain)
7. [SSL Certificate](#ssl-certificate)
8. [Post-Deployment Checklist](#post-deployment-checklist)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Backup & Recovery](#backup--recovery)
11. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Sebelum deploy, pastikan Anda sudah memiliki:

- [ ] Akun GitHub/GitLab/Bitbucket
- [ ] Repository project sudah di-push ke Git
- [ ] Akun Vercel (gratis/pro)
- [ ] Akun database PostgreSQL (Vercel Postgres/Neon/Supabase)
- [ ] Domain custom (opsional)

---

## 🚀 Deployment ke Vercel

### Step 1: Connect Repository

1. **Login ke Vercel**
   - Buka https://vercel.com
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik tombol **"Add New Project"**
   - Pilih **"Import Git Repository"**
   - Pilih repository `CibiOne_cms`
   - Klik **"Import"**

### Step 2: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:**
```bash
npm run build
```

**Output Directory:** `.next` (default)

**Install Command:**
```bash
npm install
```

### Step 3: Environment Variables

Jangan deploy dulu! Tambahkan environment variables terlebih dahulu (lihat bagian [Environment Variables](#environment-variables)).

### Step 4: Deploy

- Klik tombol **"Deploy"**
- Vercel akan:
  1. Install dependencies
  2. Run build
  3. Deploy ke edge network
  4. Generate preview URL

**Deployment Time:** ~2-3 menit

**Preview URL:** `https://cibione-cms-xxxxx.vercel.app`

---

## 🗄️ Setup Database Production

### Option 1: Vercel Postgres (Recommended)

**Kelebihan:**
- Terintegrasi langsung dengan Vercel
- Setup cepat (1-click)
- Koneksi pool otomatis
- Free tier: 256 MB storage, 60 hours compute/month

**Setup:**

1. **Buka Project di Vercel Dashboard**
2. **Klik tab "Storage"**
3. **Klik "Create Database"**
4. **Pilih "Postgres"**
5. **Pilih Region** (pilih yang terdekat dengan user, contoh: Singapore untuk Indonesia)
6. **Klik "Create"**

Vercel akan otomatis:
- Membuat database PostgreSQL
- Generate connection string
- Inject environment variables ke project

7. **Copy Connection String**

```env
POSTGRES_URL="postgres://default:xxxxx@xxxx-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require"
```

8. **Rename ke DATABASE_URL** di environment variables

### Option 2: Neon (Serverless Postgres)

**Kelebihan:**
- Serverless (bayar per usage)
- Auto-scaling
- Free tier: 512 MB storage, 0.5 GB data transfer/month
- Cold start cepat

**Setup:**

1. Buka https://neon.tech
2. Sign up / Login
3. Klik **"Create Project"**
4. Pilih **Region**: AWS Asia Pacific (Singapore)
5. Isi **Project name**: `cibione-cms-prod`
6. Klik **"Create Project"**

7. **Copy Connection String**:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

8. **Tambahkan ke Vercel Environment Variables**

### Option 3: Supabase

**Kelebihan:**
- PostgreSQL managed
- Bonus: Auth, Storage, Realtime (jika dibutuhkan nanti)
- Free tier: 500 MB database, 1 GB file storage

**Setup:**

1. Buka https://supabase.com
2. Sign up / Login
3. Klik **"New Project"**
4. Isi:
   - **Organization**: buat baru atau pilih existing
   - **Name**: `cibione-cms`
   - **Database Password**: buat password kuat (SIMPAN!)
   - **Region**: Southeast Asia (Singapore)
5. Klik **"Create new project"** (tunggu ~2 menit)

6. **Setelah selesai, buka "Project Settings" → "Database"**

7. **Copy Connection String (URI)**:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
```

8. **Replace `[YOUR-PASSWORD]` dengan password yang tadi dibuat**

9. **Tambahkan ke Vercel Environment Variables**

### Run Migrations

Setelah database production setup, jalankan migrations:

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
npm run db:migrate
```

**Via Local dengan Production DB:**

```bash
# Set DATABASE_URL ke production
export DATABASE_URL="postgresql://..."

# Run migrations
npx drizzle-kit migrate

# Seed data (jika ada)
npm run seed
```

---

## 🔐 Environment Variables

### Vercel Dashboard

1. **Buka Project di Vercel**
2. **Klik "Settings" → "Environment Variables"**
3. **Tambahkan variable berikut:**

### Required Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://smkn1cibinong.sch.id` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://your-preview.vercel.app` | Preview |

### Optional Variables (jika digunakan)

| Variable | Value | Environment |
|----------|-------|-------------|
| `BLOB_READ_WRITE_TOKEN` | `vercel_blob_rw_xxxxx` | Production, Preview |
| `OPENAI_API_KEY` | `sk-xxxxx` | Production (untuk chatbot) |
| `SMTP_HOST` | `smtp.gmail.com` | Production (untuk email notif) |
| `SMTP_PORT` | `587` | Production |
| `SMTP_USER` | `noreply@smkn1cibinong.sch.id` | Production |
| `SMTP_PASSWORD` | `password` | Production |

### Environment Types

- **Production**: Untuk deployment ke production (main branch)
- **Preview**: Untuk PR dan branch lain (staging)
- **Development**: Untuk local development

**Best Practice:** Gunakan database terpisah untuk Production dan Preview!

### Add Variable via Vercel CLI

```bash
vercel env add DATABASE_URL production
# Paste value saat diminta

vercel env add DATABASE_URL preview
# Paste value preview database
```

---

## 📦 Setup Vercel Blob Storage

Untuk upload gambar (berita, foto guru, logo jurusan).

### Step 1: Create Blob Store

1. **Buka Project di Vercel**
2. **Klik "Storage" tab**
3. **Klik "Create Database"**
4. **Pilih "Blob"**
5. **Klik "Create"**

Vercel akan auto-inject environment variables:
- `BLOB_READ_WRITE_TOKEN`

### Step 2: Install Package

```bash
npm install @vercel/blob
```

### Step 3: Update Upload Code

File: `app/api/upload/route.ts` (buat jika belum ada)

```typescript
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json(
      { error: 'Filename and body required' },
      { status: 400 }
    );
  }

  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
```

### Step 4: Test Upload

```bash
curl -X POST "https://your-domain.vercel.app/api/upload?filename=test.jpg" \
  --data-binary "@test.jpg" \
  -H "Content-Type: image/jpeg"
```

Response:

```json
{
  "url": "https://xxxxx.public.blob.vercel-storage.com/test.jpg",
  "pathname": "test.jpg",
  "contentType": "image/jpeg",
  "contentDisposition": "inline; filename=\"test.jpg\""
}
```

---

## 🌐 Custom Domain

### Step 1: Add Domain di Vercel

1. **Buka Project → "Settings" → "Domains"**
2. **Klik "Add"**
3. **Masukkan domain**: `smkn1cibinong.sch.id`
4. **Klik "Add"**

### Step 2: Configure DNS

Vercel akan memberikan instruksi DNS. Ada 2 cara:

#### Option A: CNAME Record (Recommended)

**Di DNS Provider Anda** (contoh: Cloudflare, Niagahoster, dll):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `@` atau `smkn1cibinong.sch.id` | `cname.vercel-dns.com` | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | Auto |

#### Option B: A Record

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | Auto |
| `A` | `www` | `76.76.21.21` | Auto |

### Step 3: Wait for Propagation

- DNS propagation: 5 menit - 24 jam (biasanya 5-30 menit)
- Check status di Vercel dashboard
- Test: `dig smkn1cibinong.sch.id` atau `nslookup smkn1cibinong.sch.id`

### Step 4: Set as Primary Domain

1. **Di list domains, klik "..." di domain yang ingin dijadikan primary**
2. **Klik "Set as Primary Domain"**
3. **Semua deployment akan otomatis ke domain ini**

---

## 🔒 SSL Certificate

**Good news:** Vercel auto-provision SSL certificate (Let's Encrypt) untuk semua domain!

**Features:**
- ✅ Auto-renewal setiap 90 hari
- ✅ HTTPS redirect otomatis
- ✅ HTTP/2 support
- ✅ TLS 1.3 support

**No action needed!** SSL akan aktif dalam 5-10 menit setelah DNS propagation selesai.

### Verify SSL

```bash
curl -I https://smkn1cibinong.sch.id
```

Look for:

```
HTTP/2 200
strict-transport-security: max-age=63072000
```

### Force HTTPS

Di `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};
```

---

## ✅ Post-Deployment Checklist

### Functional Testing

- [ ] **Homepage loads**: Buka https://smkn1cibinong.sch.id
- [ ] **Admin dashboard accessible**: Buka https://smkn1cibinong.sch.id/admin
- [ ] **Login works**: Test login dengan akun super_admin
- [ ] **API endpoints responding**: Test POST /api/posts
- [ ] **Database connection OK**: Buat 1 berita test
- [ ] **Image upload works**: Upload gambar di form berita
- [ ] **Public pages render**: Cek halaman berita, profil, kontak
- [ ] **Chatbot works**: Test kirim message ke chatbot

### Performance Testing

- [ ] **Lighthouse score > 90**: Run di Chrome DevTools
- [ ] **Page load < 3 seconds**: Test dengan slow 3G
- [ ] **Images optimized**: Check WebP format
- [ ] **No console errors**: Open DevTools console

### Security Testing

- [ ] **HTTPS active**: No mixed content warnings
- [ ] **CORS configured**: Test API dari external origin
- [ ] **Auth working**: Can't access admin without login
- [ ] **Role scoping**: jurusan_admin can't edit other jurusan
- [ ] **SQL injection protected**: Try malicious inputs
- [ ] **XSS protected**: Try `<script>alert('xss')</script>` in forms

### SEO Testing

- [ ] **Meta tags present**: View page source, check `<meta>`
- [ ] **robots.txt exists**: https://smkn1cibinong.sch.id/robots.txt
- [ ] **sitemap.xml exists**: https://smkn1cibinong.sch.id/sitemap.xml
- [ ] **Google Search Console verified**
- [ ] **Open Graph tags**: Share link di WhatsApp/Facebook

### Monitoring Setup

- [ ] **Vercel Analytics enabled**
- [ ] **Error tracking setup** (Sentry/Bugsnag)
- [ ] **Uptime monitoring** (UptimeRobot/Pingdom)

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)

**Enable:**

1. Buka Project → "Analytics" tab
2. Klik "Enable Analytics"
3. Install package:

```bash
npm install @vercel/analytics
```

4. Update `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Metrics Available:**
- Page views
- Unique visitors
- Bounce rate
- Top pages
- Devices breakdown
- Geography

### Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)

1. **Sign up di https://sentry.io**
2. **Create Project**: Next.js
3. **Install SDK**:

```bash
npx @sentry/wizard@latest -i nextjs
```

4. **Follow wizard instructions**

5. **Environment Variables**:

```env
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Uptime Monitoring

**UptimeRobot (Free):**

1. Sign up di https://uptimerobot.com
2. Add New Monitor:
   - **Type**: HTTPS
   - **URL**: https://smkn1cibinong.sch.id
   - **Interval**: 5 minutes
   - **Alert**: Email saat down
3. Save

---

## 💾 Backup & Recovery

### Database Backup

**Automated (Recommended):**

**Vercel Postgres:**
- Auto-backup setiap hari (retained 7 days)
- Access via Vercel Dashboard → Storage → Backups

**Neon:**
- Point-in-time restore (retained 7-30 days, tergantung plan)
- Access via Neon Console → Project → Backups

**Supabase:**
- Auto-backup daily (retained 7 days on free tier)
- Access via Supabase Dashboard → Database → Backups

**Manual Backup:**

```bash
# Backup database ke file
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Compress
gzip backup-$(date +%Y%m%d).sql

# Upload ke cloud storage (Google Drive, Dropbox, dll)
```

**Schedule dengan cron** (di server/local machine):

```bash
# Tambah ke crontab
crontab -e

# Backup setiap hari jam 2 pagi
0 2 * * * /path/to/backup-script.sh
```

### Restore Database

```bash
# Unzip backup
gunzip backup-20260820.sql.gz

# Restore
psql $DATABASE_URL < backup-20260820.sql
```

### Code Backup

**Git adalah backup!** Pastikan:
- [ ] Push ke remote repository setiap hari
- [ ] Jangan commit `.env` atau secrets
- [ ] Tag setiap release: `git tag v1.0.0`

---

## 🔧 Troubleshooting

### Build Failed

**Error:** `Module not found`

**Solution:**
```bash
# Clear node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

**Error:** `Syntax error`

**Solution:** Check TypeScript errors:
```bash
npm run lint
npx tsc --noEmit
```

---

### Database Connection Failed

**Error:** `Connection timeout`

**Solution:**
- Check DATABASE_URL format
- Ensure IP whitelisted (untuk beberapa provider)
- Test connection locally:

```bash
psql $DATABASE_URL
```

---

**Error:** `SSL required`

**Solution:** Tambahkan `?sslmode=require` di connection string:

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

---

### Image Upload Failed

**Error:** `BLOB_READ_WRITE_TOKEN not found`

**Solution:**
- Pastikan Vercel Blob sudah dibuat
- Check environment variables di Vercel Dashboard
- Redeploy setelah add variable

---

### 404 on Custom Domain

**Solution:**
- Check DNS propagation: `dig smkn1cibinong.sch.id`
- Wait 5-30 minutes
- Clear browser cache
- Try incognito mode

---

### Slow Performance

**Solution:**

1. **Enable caching**:

```typescript
// app/api/posts/route.ts
export const revalidate = 60; // Cache 60 seconds
```

2. **Optimize images**: Use Next.js Image component

```typescript
import Image from 'next/image';

<Image 
  src="/image.jpg" 
  alt="..." 
  width={800} 
  height={600}
  loading="lazy"
/>
```

3. **Database indexing**:

```sql
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_jurusan_id ON posts(jurusan_id);
CREATE INDEX idx_posts_slug ON posts(slug);
```

---

### High Memory Usage

**Solution:**

Upgrade Vercel plan atau optimize queries:

```typescript
// ❌ Bad: Load semua data
const posts = await db.select().from(posts);

// ✅ Good: Pagination + limit
const posts = await db.select()
  .from(posts)
  .limit(10)
  .offset((page - 1) * 10);
```

---

## 📞 Support

### Vercel Support

- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Email**: support@vercel.com (Pro plan only)

### Project Support

- **GitHub Issues**: https://github.com/your-org/CibiOne_cms/issues
- **Email**: support@cibionecms.com
- **WhatsApp**: +62-xxx-xxxx-xxxx

---

**Deployment Guide Version:** 1.0.0

**Last Updated:** August 20, 2026

**Good luck with your deployment! 🚀**
