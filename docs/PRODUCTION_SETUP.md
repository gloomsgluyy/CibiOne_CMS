# CibiOne CMS: Clone sampai Production

Runbook default: GitHub `main` -> self-hosted VPS, PostgreSQL lokal, media lokal. Chatbot tetap memakai provider AI eksternal.

## 1. Prasyarat

- GitHub repository
- Node.js 22 LTS
- npm 10+
- VPS Ubuntu/Debian dengan storage persisten
- PostgreSQL lokal pada VPS atau host internal terpisah
- Provider chatbot yang kompatibel dengan kontrak internal

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

## 3. PostgreSQL Lokal

Install PostgreSQL pada VPS atau host internal. Jangan expose port PostgreSQL ke internet; aplikasi cukup memakai `127.0.0.1` bila database berada di VPS yang sama.

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres createuser --pwprompt cibione
sudo -u postgres createdb --owner=cibione cibione
```

Isi `.env.local`:

```env
DATABASE_URL="postgresql://cibione:REPLACE_PASSWORD@127.0.0.1:5432/cibione"
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

## 4. Media Lokal dan Chatbot

Upload disimpan di `public/uploads/<session-id>/` pada disk VPS. Directory ini harus persisten, writable oleh user aplikasi, masuk backup, dan tidak boleh dihapus saat deploy. Jangan menyimpan upload di repository.

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

## 7. Deployment VPS

Gunakan PM2 sebagai process manager Node.js; jangan mencampurnya dengan systemd service untuk process aplikasi yang sama.

Install kebutuhan pada Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y git nginx
node --version
npm --version
sudo npm install -g pm2
```

Gunakan Node.js 22 LTS. Jika Node belum tersedia, install melalui NodeSource atau `nvm` sesuai kebijakan server.

Clone dan build pertama:

```bash
sudo mkdir -p /var/www/cibione-cms
sudo chown -R "$USER":"$USER" /var/www/cibione-cms
git clone https://github.com/gloomsgluyy/CibiOne_CMS.git /var/www/cibione-cms
cd /var/www/cibione-cms
npm ci
mkdir -p public/uploads
chmod 750 public/uploads
npm run build
```

Buat env production di server:

```bash
nano .env.production
chmod 600 .env.production
```

Isi variable dari `.env.example`. Jangan commit `.env.production` dan jangan menyimpan secret di PM2 ecosystem file.

Jalankan Next.js melalui PM2:

```bash
set -a
. ./.env.production
set +a
pm2 start npm --name cibione-cms -- start
pm2 save
pm2 startup
```

Jalankan command yang dicetak oleh `pm2 startup` dengan `sudo`, lalu ulangi:

```bash
pm2 save
```

Operasional:

```bash
pm2 status
pm2 logs cibione-cms
pm2 restart cibione-cms --update-env
pm2 stop cibione-cms
pm2 delete cibione-cms
```

Buat `/etc/nginx/sites-available/cibione-cms` dengan domain dan TLS yang sudah ada:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    client_max_body_size 5m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan site dan firewall:

```bash
sudo ln -s /etc/nginx/sites-available/cibione-cms /etc/nginx/sites-enabled/cibione-cms
sudo nginx -t
sudo systemctl reload nginx
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Jangan membuka port `3000` atau `5432` ke internet.

Deploy update manual:

```bash
cd /var/www/cibione-cms
git status
git pull --ff-only origin main
npm ci
npm run test:backend
npx tsc --noEmit
npm run build
pm2 restart cibione-cms --update-env
pm2 save
```

Jika release membawa migration, jalankan migration yang sudah direview sebelum restart aplikasi baru:

```bash
set -a
. ./.env.production
set +a
npx drizzle-kit migrate
```

Jangan otomatis menjalankan migration dari setiap worker PM2. Jalankan satu kali dari deployment job/operator. Gunakan migration backward-compatible agar aplikasi lama tetap bekerja selama deployment.

### Auto-deploy dari GitHub Actions

Workflow `.github/workflows/deploy.yml` menjalankan deploy hanya setelah workflow `CI` pada `main` berhasil. Workflow memakai SSH biasa, bukan self-hosted runner, sehingga GitHub tidak mendapat shell runner permanen pada VPS.

Pada VPS, siapkan user deploy non-root yang memiliki ownership project dan akses PM2:

```bash
sudo adduser --disabled-password --gecos "" cibione
sudo chown -R cibione:cibione /var/www/cibione-cms
sudo -iu cibione pm2 startup
```

Jalankan command `sudo` yang dicetak PM2 sebagai administrator, lalu sebagai user `cibione`:

```bash
sudo -iu cibione pm2 save
sudo chmod 750 /var/www/cibione-cms/scripts/deploy-vps.sh
```

Buat SSH key khusus deploy dari workstation. Jangan gunakan key personal atau root:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/cibione-deploy -C cibione-github-actions
ssh-copy-id -i ~/.ssh/cibione-deploy.pub cibione@SERVER_IP
ssh-keyscan -t ed25519 SERVER_IP
```


Tambahkan GitHub Actions **Environment** bernama `production`, aktifkan required reviewers, lalu isi secrets berikut:

| Secret | Isi |
| --- | --- |
| `DEPLOY_HOST` | hostname/IP VPS |
| `DEPLOY_USER` | `cibione` |
| `DEPLOY_PATH` | `/var/www/cibione-cms` |
| `DEPLOY_SSH_PRIVATE_KEY` | private key khusus deploy |
| `DEPLOY_KNOWN_HOSTS` | host key terverifikasi, bukan output mentah tanpa review |

Atur branch protection `main`: pull request wajib, CI wajib hijau, force-push dilarang. Push ke `main` akan menjalankan CI lalu deploy. Migration dijalankan sekali sebelum build/restart; migration tetap harus backward-compatible dan sudah direview.

Rollback otomatis belum dilakukan. Jika health check atau startup gagal, tahan release dan pulihkan commit terakhir secara manual setelah memastikan migration kompatibel. Jangan menaruh secret di repository.

## 8. Urutan Release Schema

Migration dan deployment harus backward-compatible:

1. Tambah kolom nullable atau tabel baru.
2. Deploy application yang bisa bekerja dengan schema lama dan baru.
3. Backfill data.
4. Jadikan constraint wajib pada release berikutnya.

Jangan menjalankan `drizzle-kit push` di production. Jangan menaruh `db:migrate` di build command atau semua worker PM2 karena migration dapat berjalan konkuren.

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

- Gunakan domain dan TLS yang sudah tersedia.
- Rotate semua credential historis.
- Aktifkan MFA GitHub dan chatbot provider.
- Simpan secrets hanya di `.env.production` dengan permission `600`.
- Backup PostgreSQL dan `public/uploads/` ke media berbeda; uji restore berkala.
- Batasi role `jurusan_admin` server-side; jangan percaya scope dari browser.
- Monitor error rate API login, upload, chatbot, dan database.

Backup harian minimal:

```bash
sudo -u postgres pg_dump -Fc cibione > /var/backups/cibione-$(date +%F).dump
tar -C /var/www/cibione-cms -czf /var/backups/cibione-uploads-$(date +%F).tar.gz public/uploads
```

Salin backup ke storage atau server lain yang dikuasai sendiri. Disk VPS yang sama bukan backup.

## 13. Checklist ready production

- [ ] `npm ci` berhasil.
- [ ] `npx tsc --noEmit` berhasil.
- [ ] `npm run build` berhasil.
- [ ] Migration production berhasil.
- [ ] Seed baseline berhasil.
- [ ] Login production berhasil.
- [ ] Logout dan session expiry berhasil.
- [ ] CRUD posts berhasil.
- [ ] Upload filesystem berhasil setelah restart/deploy.
- [ ] Public site hanya menampilkan konten terbit.
- [ ] Scheduled posts belum diaktifkan sebelum cron siap.
- [ ] Chatbot provider berhasil dan rate limit diuji.
- [ ] Role scope diuji dengan akun `jurusan_admin`.
- [ ] Backup dan restore diuji.
- [ ] Backup dan restore PostgreSQL serta media diuji.
