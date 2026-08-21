# CibiOne CMS: Clone sampai Production

Runbook default: GitHub `main` -> Vercel, PostgreSQL managed, Vercel Blob.

## 1. Prasyarat

- GitHub repository
- Node.js 22 LTS
- npm 10+
- Vercel account
- Managed PostgreSQL: Neon atau Supabase
- Vercel Blob
- Provider chatbot yang kompatibel dengan kontrak internal
- Domain production

Local verification:

```bash
node --version
npm --version
```

Node 22 sudah digunakan di environment project. Jangan memakai Node 18 untuk production.

## 2. Clone dan install

```bash
git clone <REPOSITORY_URL>
cd CibiOneCMS
npm ci
copy .env.example .env.local
npx tsc --noEmit
npm run build
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Jangan commit `.env.local`. `.gitignore` sudah mengecualikan semua `.env*`, kecuali `.env.example`.

## 3. PostgreSQL

Buat database production di region terdekat pengguna, idealnya Singapore. Ambil connection string pooled dengan SSL.

Isi `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
INITIAL_ADMIN_EMAIL="admin@example.com"
INITIAL_ADMIN_PASSWORD="GANTI_DENGAN_PASSWORD_RANDOM_PANJANG"
```

Jangan memakai kredensial admin historis. Buat password baru, random, minimal 20 karakter.

Apply migration:

```bash
npx drizzle-kit migrate
npm run db:seed
```

Seed aman dijalankan ulang untuk baseline yang memakai conflict check. Setelah login pertama, ganti password admin bila flow tersedia. Jika belum tersedia, update password melalui prosedur database terkontrol, bukan menyimpan password plaintext.

## 4. Media dan chatbot

Buat Vercel Blob store. Isi token pada Vercel, bukan file lokal yang di-commit:

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

Chatbot saat ini membutuhkan provider eksternal:

```env
CHATBOT_PROVIDER_URL="https://provider.example/v1/chat"
CHATBOT_PROVIDER_KEY="SECRET_PROVIDER_KEY"
```

Kontrak request saat ini:

```json
{
  "prompt": "Pertanyaan user",
  "knowledge": ["Knowledge base aktif"]
}
```

Kontrak response minimal:

```json
{ "answer": "Jawaban chatbot" }
```

Tanpa dua variable chatbot, endpoint mengembalikan `503`. NLU dan aksi CMS belum menjadi action engine production; provider hanya menjawab berdasarkan knowledge base. Jangan mengiklankan aksi otomatis sebelum ada parser intent, authorization server-side, preview perubahan, dan confirmation token.

## 5. Jalankan local

Dengan database dan env terisi:

```bash
npm run dev
```

Buka:

```text
http://localhost:3000/login
```

Tanpa `DATABASE_URL`, hanya preview UI development yang tersedia. Mode itu tidak aktif pada production.

## 6. GitHub CI

Workflow `.github/workflows/ci.yml` menjalankan pada setiap push ke `main` dan setiap pull request:

```bash
npm ci
npx tsc --noEmit
npm run build
```

CI tidak membutuhkan database karena build repo memiliki fallback development. Jangan memasukkan production secrets ke CI hanya untuk build.

## 7. Auto-deploy setiap push `main`

1. Push repository ke GitHub.
2. Vercel -> `Add New Project` -> import repository.
3. Framework: Next.js.
4. Root directory: repository root.
5. Install command: `npm ci` atau default Vercel.
6. Build command: `npm run build`.
7. Production branch: `main`.
8. Tambahkan environment variables untuk `Production`, `Preview`, dan `Development` sesuai kebutuhan.
9. Deploy sekali.

Setelah terhubung, setiap push ke `main` membuat deployment production otomatis. Tidak perlu menjalankan `vercel deploy` manual.

Preview deployment otomatis dibuat untuk pull request. Jangan arahkan Preview ke database production. Gunakan database preview terpisah atau jangan isi `DATABASE_URL` pada Preview.

## 8. Urutan release schema

Migration dan deployment harus backward-compatible:

1. Tambah kolom nullable atau tabel baru.
2. Deploy application yang bisa bekerja dengan schema lama dan baru.
3. Backfill data.
4. Jadikan constraint wajib pada release berikutnya.

Jangan menjalankan `drizzle-kit push` di production. Jangan menaruh `db:migrate` di build command Vercel tanpa memahami risiko concurrent deployment.

Initial production:

```bash
DATABASE_URL="<PRODUCTION_URL>" npx drizzle-kit migrate
DATABASE_URL="<PRODUCTION_URL>" npm run db:seed
```

Untuk Windows PowerShell, isi env pada session terlebih dahulu:

```powershell
$env:DATABASE_URL = "<PRODUCTION_URL>"
npx drizzle-kit migrate
npm run db:seed
```

Untuk release rutin, jalankan migration dari protected migration job atau operator yang memiliki secret production. Setelah migration sukses, push `main` untuk deployment.

## 9. Database performance

Sudah tersedia:

- Drizzle ORM.
- Index posts untuk type/status/date, featured order, highlighted order, views, category, jurusan.
- Server-side cache Next.js untuk sebagian public posts.
- Cache tags untuk invalidation setelah mutation.
- TanStack Query pada admin untuk client cache dan invalidation.

TanStack Query tidak mempercepat query database secara langsung. Fungsinya mengurangi request berulang di browser.

Redis belum diperlukan pada deployment pertama. Tambahkan Upstash Redis hanya untuk:

- Rate limit lintas instance.
- Counter visitor atau event analytics.
- Queue/job pendek.
- Cache data yang memang terbukti lambat.

Jangan memakai Redis sebagai source of truth untuk posts, users, permission, atau settings.

Saat traffic naik, urutan optimasi:

1. Ukur query lambat dan cache hit rate.
2. Pastikan pagination memakai limit dan index.
3. Tambahkan `publishedAt <= now` pada semua public scheduled-post query.
4. Gunakan cache tag setelah mutation commit.
5. Pindahkan rate limiter ke Upstash Redis.
6. Tambahkan analytics event table atau provider analytics.
7. Baru cache query yang terbukti panas.

Rate limiter saat ini in-memory per instance. Aman sebagai baseline single instance, tidak cukup untuk multi-instance production karena setiap instance memiliki counter berbeda.

## 10. Cron dan scheduled posts

Editor sudah memiliki konsep scheduling, tetapi production membutuhkan worker/cron yang memproses post terjadwal. Jangan menganggap `publishedAt` otomatis menerbitkan data hanya karena timestamp berubah.

Sebelum fitur scheduling diaktifkan:

- Public query wajib memfilter `isPublished = true` dan `publishedAt <= now`.
- Buat endpoint/job protected untuk memproses scheduled posts.
- Lindungi cron dengan secret.
- Pastikan job idempotent.
- Uji timezone Asia/Jakarta.

## 11. Domain, security, backup

- Tambahkan custom domain di Vercel.
- Pastikan HTTPS aktif.
- Rotate semua credential historis.
- Aktifkan MFA GitHub, Vercel, database, Blob, dan chatbot provider.
- Simpan secrets hanya di Vercel/GitHub Secrets.
- Aktifkan backup database dan uji restore berkala.
- Batasi role `jurusan_admin` server-side; jangan percaya scope dari browser.
- Monitor error rate API login, upload, chatbot, dan database.

## 12. Checklist ready production

- [ ] `npm ci` berhasil.
- [ ] `npx tsc --noEmit` berhasil.
- [ ] `npm run build` berhasil.
- [ ] Migration production berhasil.
- [ ] Seed baseline berhasil.
- [ ] Login production berhasil.
- [ ] Logout dan session expiry berhasil.
- [ ] CRUD posts berhasil.
- [ ] Upload Blob berhasil.
- [ ] Public site hanya menampilkan konten terbit.
- [ ] Scheduled posts belum diaktifkan sebelum cron siap.
- [ ] Chatbot provider berhasil dan rate limit diuji.
- [ ] Role scope diuji dengan akun `jurusan_admin`.
- [ ] Backup dan restore diuji.
- [ ] Push kecil ke `main` menghasilkan deployment production otomatis.
