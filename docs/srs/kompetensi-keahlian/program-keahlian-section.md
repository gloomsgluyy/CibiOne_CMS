# SRS — Section Program Keahlian (Logo Carousel)

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
| Halaman | Kompetensi Keahlian (Program Keahlian) |
| Section | Logo Carousel Jurusan |
| Tipe Konten | Dynamic – List |
| PIC Programmer | AI (Kiro) |
| Reviewer / Approver | - |
| Component Registry Reference | `infinity-brand` (UI Layouts) — untuk animasi logo brand berjalan |
| Code Reference Folder | Template LogoCloud dengan InfiniteSlider yang disediakan user |
| Tanggal dibuat | 2026-08-14 |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: 
  - Infinite scrolling logo carousel dengan 10 logo jurusan SMKN 1 Cibinong
  - Logo berjalan smooth dari kiri ke kanan (infinite loop)
  - Hover effect: slow down animation speed
  - Gradient mask di kiri dan kanan untuk fade effect
  
- **Deskripsi dari tim desain**: 
  - Section menampilkan logo semua program keahlian/jurusan di SMKN 1 Cibinong
  - Total 10 jurusan: DPIB, DKV, TP, RPL, SIJA, TFLM, TKJ, TKP, TKR, TOI
  - Logo berjalan terus menerus (infinite) dengan animasi smooth
  - Saat hover, animasi melambat untuk memberikan fokus pada logo tertentu
  - Warna background dan styling mengikuti tema halaman kontak (blue palette)
  
- **Data Logo Jurusan** (10 logo tersedia di `public/logo jurusan/`):
  1. **DPIB** - dpib.png (Desain Pemodelan dan Informasi Bangunan)
  2. **DKV** - logo-DKV_New-Revisi_Fix-1-e1731551656251.png (Desain Komunikasi Visual)
  3. **TP** - Logo-TP-1536x991.png (Teknik Pengelasan)
  4. **RPL** - rpl.png (Rekayasa Perangkat Lunak)
  5. **SIJA** - sija.png (Sistem Informasi Jaringan dan Aplikasi)
  6. **TFLM** - tflm.png (Teknik Fabrikasi Logam dan Manufaktur)
  7. **TKJ** - tkj.png (Teknik Komputer dan Jaringan)
  8. **TKP** - tkp.jpg (Teknik Konstruksi dan Perumahan)
  9. **TKR** - tkr.png (Teknik Kendaraan Ringan)
  10. **TOI** - toi.png (Teknik Otomasi Industri)

- **Component/Template yang dipakai**: 
  - Template `LogoCloud` dengan `InfiniteSlider` yang disediakan user
  - Component Registry Reference: `infinity-brand` dari UI Layouts
  - Adaptasi warna dari template orange ke blue (sesuai halaman kontak)

- **Code reference yang wajib diikuti**: 
  ```tsx
  import { InfiniteSlider } from "@/components/ui/infinite-slider";
  import { cn } from "@/lib/utils";

  type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };

  type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
  };

  export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    return (
      <div
        {...props}
        className={cn(
          "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
          className
        )}
      >
        <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
          {logos.map((logo) => (
            <img
              alt={logo.alt}
              className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
              height={logo.height || "auto"}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
            />
          ))}
        </InfiniteSlider>
      </div>
    );
  }
  ```

- **Styling & Token**:
  - Mengikuti color scheme halaman kontak (blue palette):
    - Primary color: Blue (blue-600, blue-500, blue-400)
    - Background: white dengan subtle gray tints
    - Border: gray-200, gray-300
    - Shadow: subtle dengan backdrop blur
  - Logo height: h-12 md:h-16 lg:h-20 (lebih besar dari template default untuk visibility)
  - Gap between logos: 42px (dari template)
  - Animation speed: 80 (normal), 25 (on hover)
  - Gradient mask untuk fade effect di kiri-kanan
  - Padding: py-8 md:py-12 untuk breathing room

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-14 | AI (Kiro) | Membuat SRS documentation untuk Program Keahlian section | Waiting for Approval | Dokumentasi SRS dibuat sesuai template |
| 2026-08-14 | AI (Kiro) | Membuat component InfiniteSlider | Waiting for Approval | Component dibuat di `components/ui/infinite-slider.tsx` dengan animation support |
| 2026-08-14 | AI (Kiro) | Membuat lib/utils.ts dengan cn() helper | Waiting for Approval | Utility function untuk merging Tailwind classes |
| 2026-08-14 | AI (Kiro) | Menambahkan CSS animation untuk infinite scroll | Waiting for Approval | Keyframes ditambahkan di `app/globals.css` |
| 2026-08-14 | AI (Kiro) | Membuat component LogoCloud | Waiting for Approval | Component dibuat di `components/sections/logo-cloud.tsx` dengan styling blue theme |
| 2026-08-14 | AI (Kiro) | Membuat halaman Kompetensi Keahlian | Waiting for Approval | Halaman dibuat di `app/(public)/kompetensi-keahlian/page.tsx` dengan 3 section: Hero, Logo Carousel, Programs Grid |

**Status Fase 1 saat ini**: `Waiting for Approval`

> **Yang sudah dikerjakan**:
> - ✅ SRS documentation dibuat lengkap sesuai template
> - ✅ Component `InfiniteSlider` dibuat dengan fitur:
>   - Smooth infinite loop animation
>   - Hover slow-down effect (80 → 25 speed)
>   - Reverse direction support
>   - Customizable gap dan speed
>   - Duplicate items untuk seamless loop
> - ✅ Component `LogoCloud` dibuat dengan fitur:
>   - Gradient mask untuk fade effect di kiri-kanan
>   - Responsive logo height (h-12 md:h-16 lg:h-20)
>   - Grayscale hover effect untuk interactivity
>   - Integration dengan InfiniteSlider
> - ✅ Halaman Program Keahlian dibuat dengan:
>   - Hero section dengan badge dan heading
>   - Logo carousel section dengan 10 logo jurusan
>   - Programs grid dengan card untuk setiap jurusan
>   - Responsive design (mobile, tablet, desktop)
>   - Blue color scheme sesuai halaman kontak
> - ✅ 10 logo jurusan sudah diintegrasikan dari `public/logo jurusan/`
> - ✅ CSS animations untuk infinite scroll ditambahkan
> - ✅ Utility function `cn()` dibuat untuk Tailwind class merging
>
> **Catatan tambahan**:
> - Dev server berjalan di http://localhost:3001
> - Halaman dapat diakses di http://localhost:3001/kompetensi-keahlian
> - Button "Pelajari Lebih Lanjut" belum ada handler - akan diintegrasikan di Fase 2
> - Data logo masih hardcoded - akan fetch dari API di Fase 2

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Tidak boleh dimulai sebelum Fase 1 berstatus Done.**

### Input

- **Pattern yang dipakai**: `ContentList` untuk data jurusan

- **Nama tabel / field tambahan di luar skema generik**: 

  **Tabel `jurusan` (sudah ada di schema, extend untuk logo)**:
  ```ts
  {
    id: serial primary key,
    nama: text not null,              // "SIJA", "TKJ", "RPL", dst
    nama_lengkap: text not null,      // "Sistem Informasi Jaringan dan Aplikasi"
    slug: text unique not null,       // "sija", "tkj", "rpl"
    deskripsi: text,                  // Deskripsi singkat jurusan
    logo_url: text,                   // URL logo dari Vercel Blob
    website_url: text,                // Link ke landing page jurusan (opsional)
    is_active: boolean default true,  // Untuk hide/show jurusan
    urutan: integer,                  // Untuk sorting manual
    created_at: timestamptz default now(),
    updated_at: timestamptz default now(),
  }
  ```

- **Endpoint API**: 

  | Method | Route | Fungsi | Akses |
  |---|---|---|---|
  | GET | `/api/jurusan` | List semua jurusan yang `is_active = true`, sorted by `urutan` | Public |
  | GET | `/api/jurusan?include_inactive=true` | List semua jurusan termasuk yang tidak aktif | `super_admin` only |
  | GET | `/api/jurusan/[slug]` | Detail jurusan by slug | Public |
  | POST | `/api/jurusan` | Create jurusan baru | `super_admin` only |
  | PUT | `/api/jurusan/[id]` | Update jurusan | `super_admin` only |
  | DELETE | `/api/jurusan/[id]` | Delete jurusan (soft delete: set `is_active = false`) | `super_admin` only |
  | POST | `/api/jurusan/[id]/upload-logo` | Upload logo ke Vercel Blob | `super_admin` only |

- **Role akses**: 
  - **Public read**: GET jurusan yang aktif
  - **super_admin only**: CRUD jurusan, upload logo

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
| Fase 1 | In Progress | | |
| Fase 2 | Not Started | | |
| Fase 3 *(kalau berlaku)* | N/A | | |

**Ringkasan status SRS ini**: 🟡 In Progress (Fase 1)

---

## Catatan Implementasi

### Logo Mapping

```ts
export const JURUSAN_LOGOS = [
  {
    src: "/logo jurusan/dpib.png",
    alt: "DPIB - Desain Pemodelan dan Informasi Bangunan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/logo-DKV_New-Revisi_Fix-1-e1731551656251.png",
    alt: "DKV - Desain Komunikasi Visual",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/Logo-TP-1536x991.png",
    alt: "TP - Teknik Pengelasan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/rpl.png",
    alt: "RPL - Rekayasa Perangkat Lunak",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/sija.png",
    alt: "SIJA - Sistem Informasi Jaringan dan Aplikasi",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tflm.png",
    alt: "TFLM - Teknik Fabrikasi Logam dan Manufaktur",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkj.png",
    alt: "TKJ - Teknik Komputer dan Jaringan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkp.jpg",
    alt: "TKP - Teknik Konstruksi dan Perumahan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/tkr.png",
    alt: "TKR - Teknik Kendaraan Ringan",
    width: 120,
    height: 120
  },
  {
    src: "/logo jurusan/toi.png",
    alt: "TOI - Teknik Otomasi Industri",
    width: 120,
    height: 120
  }
];
```

### Integration Pattern

**Static Phase (Fase 1)**: Gunakan array `JURUSAN_LOGOS` hardcoded

**Dynamic Phase (Fase 2)**: Fetch dari API
```tsx
// app/(public)/kompetensi-keahlian/page.tsx
import { db } from "@/db";
import { jurusan } from "@/db/schema";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { eq } from "drizzle-orm";

export default async function KompetensiKeahlianPage() {
  const activeJurusan = await db
    .select()
    .from(jurusan)
    .where(eq(jurusan.is_active, true))
    .orderBy(jurusan.urutan);
  
  const logos = activeJurusan.map(j => ({
    src: j.logo_url || `/logo jurusan/${j.slug}.png`,
    alt: `${j.nama} - ${j.nama_lengkap}`,
    width: 120,
    height: 120
  }));
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
        Program Keahlian SMKN 1 Cibinong
      </h1>
      <LogoCloud logos={logos} />
    </div>
  );
}
```

### Styling Consistency

Warna mengikuti halaman kontak:
- Heading: `text-blue-900`
- Subheading: `text-blue-600`
- Background: `bg-white` atau `bg-gray-50`
- Border: `border-gray-200`
- Shadow: `shadow-xl` dengan `backdrop-blur-md`

### Accessibility

- ✅ Alt text untuk semua logo (nama jurusan + nama lengkap)
- ✅ `loading="lazy"` untuk performance
- ✅ `pointer-events-none` pada logo (tidak clickable di carousel, clickable di card jurusan nanti)
- ✅ Semantic HTML structure

### Performance

- Logo images sudah di-optimize (Next.js Image optimization atau manual compression)
- Lazy loading untuk logo yang belum visible
- Animation menggunakan CSS transform (hardware accelerated)
- Gradient mask menggunakan CSS mask-image (performant)
