# SRS — Section Kontak (Footer)

> **Cara pakai**: Copy file ini ke `docs/srs/<halaman>/<section>.md`, isi semua bagian sebelum mulai coding. Baca `docs/context/AI_CONTEXT.md`, `architecture.md`, dan `glossary.md` dulu kalau belum familiar dengan istilah/rule di bawah.
>
> **Rule untuk AI agent yang mengerjakan SRS ini:**
> 1. Cek Component Registry SEBELUM menulis kode UI. Kalau component/template section ini sudah ada di registry atau list component dari PIC → HANYA implementasi/adaptasi, dilarang generate dari scratch.
> 2. Jangan mulai Fase 2 kalau Fase 1 belum berstatus **Done**.
> 3. Jangan pernah set status jadi **Done** sendiri — AI paling jauh boleh set **Waiting for Approval**. Yang mengubah jadi Done adalah reviewer manusia.
> 4. Kalau status sebelumnya **Rejected**, baca alasan reject dulu sebelum melanjutkan — jangan mulai ulang dari nol kecuali reviewer bilang begitu.
> 5. Tiap ada progres, TAMBAH baris baru di Execution Log — jangan menimpa/menghapus baris lama.

---

## Metadata

| Field | Isi |
|---|---|
| Halaman | Kontak |
| Section | Contact Footer (Section Kontak & Footer) |
| Tipe Konten | Dynamic – Singleton (untuk data kontak) + Functional (untuk form) |
| PIC Programmer | - |
| Reviewer / Approver | - |
| Component Registry Reference | Template reference dari footer yang disediakan user (styled dengan desain modern glass-morphism) |
| Code Reference Folder | `docs/references/kontak/footer-template/` (template HTML yang diberikan user) |
| Tanggal dibuat | 2026-08-13 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: Template footer modern dengan glass-morphism effect yang disediakan oleh user, disesuaikan untuk kebutuhan sekolah SMKN 1 Cibinong

- **Deskripsi dari tim desain**: 
  - Section footer yang mencakup informasi kontak sekolah (alamat, telepon, email, social media)
  - Form kontak untuk pengunjung mengirim pesan
  - Navigasi footer dengan link ke halaman utama
  - Newsletter subscription
  - Social media links (Facebook, Twitter, YouTube, Instagram)
  - Design menggunakan glass-morphism dengan warna brand orange (sesuai identitas SMKN 1 Cibinong)

- **Data Kontak yang harus ditampilkan**:
  - **Alamat**: Jl. Raya Karadenan No.7, Karadenan, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16111
  - **Nomor Telepon**: (+62) 2518663 846
  - **Email**: smkn1cibinongbgr@gmail.com
  - **Social Media**:
    - Facebook: web.facebook.com/smknegeri1cibinong
    - Twitter: twitter.com/smkn1cbn
    - YouTube: www.youtube.com/c/SMKN1Cibinong_Official
    - Instagram: www.instagram.com/smkn1cbn_official/

- **Component/Template yang dipakai**: Template footer dari user (code reference) yang sudah diadaptasi dengan:
  - Warna brand: Orange (#fb923c, #f97316, #fdba74) menggantikan emerald
  - Konten disesuaikan untuk sekolah (bukan perusahaan fintech)
  - Form kontak disesuaikan dengan kebutuhan sekolah (subject: Informasi Pendaftaran, Informasi Jurusan, Kerja Sama, Lainnya)
  - Social media icons untuk Facebook, Twitter, YouTube, Instagram
  - Logo sekolah menggantikan logo Water

- **Code reference yang wajib diikuti**: 
  - `docs/references/kontak/footer-template/` - template HTML yang disediakan user
  - Component sudah dibuat di: `components/sections/contact-footer.tsx`
  - Mengikuti struktur glass-morphism dengan backdrop-blur-xl
  - Border gradient menggunakan orange palette
  - Responsive grid layout (mobile-first)

- **Styling & Token**:
  - Primary color: Orange (orange-400, orange-300, orange-200)
  - Background: Transparent dengan white/5 dan backdrop blur
  - Border: orange-200/20 untuk consistency
  - Focus ring: orange-400/60
  - Hover states: orange-300, orange-400/20
  - Text: white, white/70, white/80 untuk hierarchy
  - Spacing: mengikuti Tailwind default (p-4, p-8, p-12, p-16)
  - Border radius: rounded-xl, rounded-2xl, rounded-3xl, rounded-full
  - Shadows: subtle dengan backdrop blur untuk glass effect

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-13 | AI (Kiro) | Membuat component `contact-footer.tsx` dengan adaptasi template dari user | Waiting for Approval | Component sudah dibuat dengan perubahan: (1) Warna brand orange menggantikan emerald, (2) Logo & nama sekolah, (3) Data kontak sesuai SMKN 1 Cibinong, (4) Social media icons lengkap, (5) Form disesuaikan untuk kebutuhan sekolah, (6) Navigasi footer untuk halaman sekolah |

**Status Fase 1 saat ini**: `Waiting for Approval`

> **Yang sudah dikerjakan**:
> - ✅ Component React `contact-footer.tsx` sudah dibuat
> - ✅ Semua data kontak SMKN 1 Cibinong sudah diintegrasikan
> - ✅ Styling disesuaikan dengan warna brand orange
> - ✅ Social media links (Facebook, Twitter, YouTube, Instagram) sudah ditambahkan dengan icons
> - ✅ Form kontak dengan field: nama, email, perihal (dropdown dengan opsi sesuai sekolah), pesan
> - ✅ Newsletter subscription form
> - ✅ Navigasi footer ke halaman: Profil, Kompetensi Keahlian, Informasi (Berita)
> - ✅ Responsive design (mobile-first)
> - ✅ Glass-morphism effect dengan backdrop blur
> - ✅ Accessibility: aria-labels untuk social media icons
>
> **Catatan tambahan**:
> - Form masih menggunakan `console.log` dan `alert` - akan diintegrasikan dengan backend di Fase 2
> - Newsletter subscription belum ada handler - akan diintegrasikan di Fase 2
> - Logo sekolah menggunakan URL placeholder (https://smkn1cibinong.sch.id/assets/logo.png) - perlu diganti dengan logo actual atau dari Vercel Blob

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Tidak boleh dimulai sebelum Fase 1 berstatus Done.**

### Input

- **Pattern yang dipakai**: 
  1. `SiteSetting` untuk data kontak (alamat, telepon, email, social media URLs)
  2. `ContentList` untuk messages/submissions dari form kontak (opsional - tergantung apakah admin ingin menyimpan pesan atau langsung kirim email)
  3. `SiteSetting` atau tabel terpisah untuk newsletter subscriptions

- **Nama tabel / field tambahan di luar skema generik**: 

  **A. Site Settings untuk data kontak** (menggunakan tabel `site_settings` yang sudah ada):
  ```
  Keys yang perlu dibuat:
  - 'contact_address' → value: { text: "Jl. Raya Karadenan No.7, ..." }
  - 'contact_phone' → value: { text: "(+62) 2518663 846", link: "tel:+622518663846" }
  - 'contact_email' → value: { text: "smkn1cibinongbgr@gmail.com", link: "mailto:..." }
  - 'social_facebook' → value: { url: "https://web.facebook.com/smknegeri1cibinong" }
  - 'social_twitter' → value: { url: "https://twitter.com/smkn1cbn" }
  - 'social_youtube' → value: { url: "https://www.youtube.com/c/SMKN1Cibinong_Official" }
  - 'social_instagram' → value: { url: "https://www.instagram.com/smkn1cbn_official/" }
  - 'school_logo' → value: { url: "..." } // URL logo dari Vercel Blob
  - 'school_description' → value: { text: "..." } // Deskripsi singkat sekolah di footer
  ```

  **B. Tabel `contact_messages` untuk menyimpan pesan dari form kontak** (opsional, tergantung requirement):
  ```ts
  {
    id: serial primary key,
    name: text not null,
    email: text not null,
    subject: enum('informasi-pendaftaran', 'informasi-jurusan', 'kerjasama', 'lainnya'),
    message: text not null,
    is_read: boolean default false,
    created_at: timestamptz default now(),
  }
  ```

  **C. Tabel `newsletter_subscriptions`**:
  ```ts
  {
    id: serial primary key,
    email: text not null unique,
    is_active: boolean default true,
    subscribed_at: timestamptz default now(),
  }
  ```

- **Endpoint API**: 

  | Method | Route | Fungsi | Akses |
  |---|---|---|---|
  | GET | `/api/settings/contact_*` | Ambil data kontak individual | Public |
  | GET | `/api/settings/social_*` | Ambil data social media individual | Public |
  | GET | `/api/settings?keys=contact_address,contact_phone,...` | Ambil multiple settings sekaligus (efficient) | Public |
  | PUT | `/api/settings/[key]` | Update setting (untuk admin edit kontak) | `super_admin` only |
  | POST | `/api/contact-messages` | Submit pesan dari form kontak | Public (dengan rate limiting) |
  | GET | `/api/contact-messages` | List pesan masuk (untuk admin) | `super_admin` only |
  | PUT | `/api/contact-messages/[id]` | Mark as read | `super_admin` only |
  | DELETE | `/api/contact-messages/[id]` | Hapus pesan | `super_admin` only |
  | POST | `/api/newsletter-subscriptions` | Subscribe newsletter | Public (dengan rate limiting & validation) |
  | GET | `/api/newsletter-subscriptions` | List subscribers (untuk admin) | `super_admin` only |
  | DELETE | `/api/newsletter-subscriptions/[email]` | Unsubscribe | Public (dengan token validation) atau `super_admin` |

- **Role akses**: 
  - **Public read**: GET settings untuk data kontak & social media
  - **Public write**: POST contact messages, POST newsletter subscriptions (dengan rate limiting)
  - **super_admin only**: Update settings, manage contact messages, manage newsletter subscriptions

- **Integrasi Email (opsional - untuk auto-notification)**:
  - Ketika ada form kontak masuk → kirim notifikasi email ke `smkn1cibinongbgr@gmail.com`
  - Bisa menggunakan Resend, SendGrid, atau email service lainnya
  - Implementasi di `app/api/contact-messages/route.ts`

### Execution Log — Fase 2

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| | | | Not Started | Menunggu Fase 1 selesai |

**Status Fase 2 saat ini**: `Not Started`

---

## Fase 3 — Khusus AI Integration (isi HANYA kalau section ini = AI Chatbot)

> **Tidak berlaku untuk section ini** — bukan AI Chatbot.

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Waiting for Approval | | |
| Fase 2 | Not Started | | |
| Fase 3 *(kalau berlaku)* | N/A | | |

**Ringkasan status SRS ini**: 🟠 Waiting for Approval (Fase 1)

---

## Catatan Implementasi

### Integrasi ke Halaman

Component `ContactFooter` dapat digunakan di:
1. **Semua halaman public** — sebagai footer global di `app/(public)/layout.tsx`
2. **Halaman Kontak khusus** — sebagai konten utama di `app/(public)/kontak/page.tsx`

Contoh penggunaan di layout:
```tsx
import { ContactFooter } from "@/components/sections/contact-footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ContactFooter />
    </>
  );
}
```

### Data Fetching (untuk Fase 2)

Component perlu diubah untuk fetch data dari API:
```tsx
// Contoh fetch multiple settings sekaligus
const response = await fetch('/api/settings?keys=contact_address,contact_phone,contact_email,social_facebook,social_twitter,social_youtube,social_instagram,school_logo,school_description');
const { data } = await response.json();
```

Atau buat Server Component untuk fetch langsung dari DB (lebih efficient):
```tsx
// app/(public)/kontak/page.tsx
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { ContactFooter } from "@/components/sections/contact-footer";
import { inArray } from "drizzle-orm";

export default async function ContactPage() {
  const settings = await db
    .select()
    .from(siteSettings)
    .where(inArray(siteSettings.key, [
      'contact_address',
      'contact_phone',
      'contact_email',
      'social_facebook',
      'social_twitter',
      'social_youtube',
      'social_instagram',
      'school_logo',
      'school_description'
    ]));
  
  const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
  
  return <ContactFooter settings={settingsMap} />;
}
```

### Rate Limiting

Untuk endpoint public (POST contact-messages, POST newsletter-subscriptions), implementasi rate limiting diperlukan untuk mencegah spam:
- Max 3 submissions per IP per 15 menit untuk contact form
- Max 1 subscription per email (unique constraint)
- Gunakan library seperti `@upstash/ratelimit` atau implementasi sederhana dengan Redis/memory cache

### Validasi

- Email validation: format email valid
- Phone validation: format nomor telepon Indonesia
- Message validation: min 10 karakter, max 1000 karakter
- XSS protection: sanitasi input sebelum disimpan
- CSRF protection: gunakan Next.js built-in protection

### Accessibility

Component sudah include:
- ✅ Semantic HTML (`<footer>`, `<form>`, proper heading hierarchy)
- ✅ Labels untuk semua form inputs
- ✅ `aria-label` untuk icon-only buttons (social media)
- ✅ Focus states yang jelas (`focus:ring-2`)
- ✅ Keyboard navigation support
- ✅ `required` attributes untuk mandatory fields

Perlu tambahan (untuk Fase 1 improvement):
- [ ] Error messages untuk form validation
- [ ] Success/loading states untuk form submission
- [ ] Screen reader announcements untuk form submission status
