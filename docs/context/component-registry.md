# Component & Template Registry — [NAMA_PROJECT]

> Last updated: 2026-08-11 — diisi dari data lengkap tim desain.
> **Ini file hidup.** Tim desain nambah entry di sini kapan saja mereka riset komponen baru — bukan cuma sekali di awal. AI/programmer **wajib cek file ini duluan** sebelum menulis kode UI section manapun (lihat Strict Rule #1 di `AI_CONTEXT.md`). Kalau section/component ada di registry atau list component dari PIC, implementasi **wajib memakai/adaptasi entry tersebut** dan **dilarang membuat UI dari scratch**, kecuali entry eksplisit ditandai referensi saja atau PIC/reviewer membatalkan.
>
> **Ini bukan cuma kumpulan component kecil.** Ada 3 jenis entry di sini — kolom **Tipe** menandai bedanya:
> - **Component** — potongan UI siap pakai (kode di-copy, sesuaikan data & token warna).
> - **Layout Pattern** — pola susunan/grid, bukan 1 komponen visual spesifik.
> - **Template Reference** — contoh halaman/dashboard penuh dari situs lain, dipakai sebagai **referensi struktur/pattern**, BUKAN untuk implementasi verbatim (apalagi yang premium/berlisensi) — lihat kolom "Cara Pakai".
>
> ⚠️ **Aura Build (`aura.build`) memblokir automated access** — AI tidak bisa membuka linknya sendiri untuk baca kode. Untuk semua entry Aura Build di bawah, **PIC/tim desain wajib copy manual kode/screenshot-nya ke SRS terkait** sebelum AI mulai implementasi bagian itu.

---

## A. Hero Banner (Home)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [hero-liquid-metal](https://www.cult-ui.com/docs/components/hero-liquid-metal) | Cult UI | Component | Efek visual utama hero | Implementasi langsung |
| [Component 3C578A7](https://www.aura.build/component/3C578A7) | Aura Build | Component | *"component untuk heronya"* | Implementasi langsung (copy manual — lihat catatan blokir di atas) |
| [blur-vignette](https://www.ui-layouts.com/components/blur-vignette) | UI Layouts | Component | Kemungkinan efek overlay/background hero | Implementasi langsung |

## B. Sambutan Kepala Sekolah (Home) — sticky saat scroll

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [stacking-card](https://www.ui-layouts.com/components/stacking-card) | UI Layouts | Component | *"section sambutan dibuat sticky"* — konfirmasi eksplisit tim desain | Implementasi langsung |

## C. Layout Grid / Galeri (dipakai di section yang butuh grid — usulan: Sarana Prasarana, Kerja Sama Industri, Guru & Staff — **konfirmasi section spesifiknya ke tim desain**)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [masonary-grid](https://www.ui-layouts.com/components/masonary-grid) | UI Layouts | Layout Pattern | | Implementasi langsung |
| [Component A9851D](https://www.aura.build/component/A9851D) | Aura Build | Layout Pattern | *"buat layoutnya"* | Implementasi langsung (copy manual) |
| [grid](https://www.ui-layouts.com/components/grid) | UI Layouts | Layout Pattern | Disebut 2x di data asli | Implementasi langsung |

## D. Kartu & Detail Berita (Halaman Berita)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [cutout-card](https://www.cult-ui.com/docs/components/cutout-card) | Cult UI | Component | **Konfirmasi eksplisit tim desain: "desain tampilan berita"** (disebut 2x) | Implementasi langsung |
| [minimal-card](https://www.cult-ui.com/docs/components/minimal-card) | Cult UI | Component | Kemungkinan varian card alternatif | Implementasi langsung — konfirmasi kapan dipakai vs cutout-card |
| [linear-modal](https://www.ui-layouts.com/components/linear-modal) | UI Layouts | Component | *"model animasinya"* — kemungkinan animasi buka detail berita | Implementasi langsung |
| [Component DDF867F](https://www.aura.build/component/DDF867F) | Aura Build | Component | Belum ada catatan | Perlu konfirmasi tim desain (copy manual) |

## E. Expandable / "Baca Selengkapnya" (dipakai umum, muncul 2x tanpa catatan section spesifik)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [expandable](https://www.cult-ui.com/docs/components/expandable) | Cult UI | Component | Usulan pemakaian: Sejarah, Struktur Organisasi, Sarana Prasarana, atau bagian "baca selengkapnya" manapun | **Perlu konfirmasi section spesifik ke tim desain sebelum dipakai** |

## F. Video Profil (Home)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [hero-video-dialog](https://magicui.design/docs/components/hero-video-dialog) | Magic UI | Component | | Implementasi langsung |
| [hover-video-player](https://www.cult-ui.com/docs/components/hover-video-player) | Cult UI | Component | Kemungkinan varian alternatif | Implementasi langsung — konfirmasi kapan dipakai vs hero-video-dialog |
| [Component 88FF44A](https://www.aura.build/component/88FF44A) | Aura Build | Component | *"tampilan awalnya"* (state sebelum video diklik) | Implementasi langsung (copy manual) |

## G. Modal Umum (dipakai berulang di banyak tempat, belum ada section spesifik untuk sebagian)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [linear-modal](https://www.ui-layouts.com/components/linear-modal) | UI Layouts | Component | Disebut berulang di data asli — kemungkinan jadi pattern modal umum di banyak section | Implementasi langsung |
| [gallery-modal](https://www.ui-layouts.com/components/gallery-modal) | UI Layouts | Component | Usulan: Sarana Prasarana (lihat galeri foto) | Perlu konfirmasi section |
| [media-modal](https://www.ui-layouts.com/components/media-modal) | UI Layouts | Component | Usulan: Video Profil / galeri media umum | Perlu konfirmasi section |
| [Component 5082B](https://www.aura.build/component/5082B) | Aura Build | Component | Belum ada catatan | **Perlu konfirmasi tim desain (copy manual)** |
| [Component 2DBF8](https://www.aura.build/component/2DBF8) | Aura Build | Component | Belum ada catatan | **Perlu konfirmasi tim desain (copy manual)** |
| [Component CF99C](https://www.aura.build/component/CF99C) | Aura Build | Component | Belum ada catatan | **Perlu konfirmasi tim desain (copy manual)** |
| [Component FE731](https://www.aura.build/component/FE731) | Aura Build | Component | Belum ada catatan | **Perlu konfirmasi tim desain (copy manual)** |

## H. Animasi Teks & Logo Mitra (usulan: Kerja Sama Industri — Profil Sekolah)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [logo-carousel](https://www.cult-ui.com/docs/components/logo-carousel) | Cult UI | Component | **Konfirmasi eksplisit: "animasi textnya ambil dari sini"** — BUKAN dipakai sebagai logo carousel literal, cuma efek animasi teksnya yang direuse | Ambil pattern animasinya saja, bukan komponen utuh |
| [infinity-brand](https://www.ui-layouts.com/components/infinity-brand) | UI Layouts | Component | **Konfirmasi eksplisit: "untuk animasi logo brandnya"** — kandidat kuat untuk strip logo mitra industri berjalan | Implementasi langsung |

## I. Feature Carousel (usulan: Highlight Prestasi Home, atau showcase fitur)

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [feature-carousel](https://www.cult-ui.com/docs/components/feature-carousel) | Cult UI | Component | Disebut 2x di data asli | Implementasi langsung — konfirmasi section pastinya |

## J. Halaman Admin — Dashboard & Template Referensi

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [Component F46CA1](https://www.aura.build/component/F46CA1) | Aura Build | Component | | Implementasi langsung (copy manual) |
| [expandable-screen](https://www.cult-ui.com/docs/components/expandable-screen) | Cult UI | Component | | Implementasi langsung |
| [tailadmin.com/components](https://tailadmin.com/components) | TailAdmin | **Template Reference** | Library component admin dashboard lengkap (Tailwind) | Implementasi langsung — cek mana yang free tier vs pro |
| [preline.co — CMS Admin template](https://preline.co/templates/dashboards/cms-admin/?page=published.html) | Preline | **Template Reference (Premium)** | **Konfirmasi eksplisit tim desain: "contoh utama tapi premium, bisa jadi referensi"** | **Referensi struktur/visual saja — JANGAN copy kode langsung (berbayar/berlisensi)** |
| [github.com/htmlstreamofficial/preline](https://github.com/htmlstreamofficial/preline) | Preline (open-source) | **Template Reference** | Versi demo GitHub dari Preline | Cek lisensi repo dulu sebelum copy langsung; kalau ragu, treat sebagai referensi struktur saja |
| [shadcn-admin.netlify.app](https://shadcn-admin.netlify.app/) | Community (shadcn-based) | **Template Reference** | Demo admin template berbasis shadcn/ui | Implementasi langsung (open demo) |
| [shadcn-nextjs admin — form validation](https://shadcn-nextjs-admincn-admin-template-free.vercel.app/forms/form-validation) | Community (shadcn-based) | **Template Reference** | Contoh pattern form validation | Implementasi langsung — cocok untuk semua form CRUD admin di project ini |
| [flowbite-admin-dashboard — CRUD products](https://flowbite-admin-dashboard.vercel.app/crud/products/) | Flowbite | **Template Reference** | Contoh pattern CRUD — **relevan langsung untuk pattern `ContentList` di `architecture.md`** | Referensi pattern CRUD, adaptasi ke shadcn/token project |
| [tailwindadmin-reactjs-dark — dashboard general](https://tailwindadmin-reactjs-dark.netlify.app/dashboards/general) | Community | **Template Reference** | Contoh dashboard umum (dark mode) | Referensi struktur layout dashboard |

## K. Belum Dikelompokkan / Perlu Konfirmasi Tim Desain

| Component/Template | Sumber | Tipe | Catatan | Cara Pakai |
|---|---|---|---|---|
| [intro-disclosure](https://www.cult-ui.com/docs/components/intro-disclosure) | Cult UI | Component | Kandidat: onboarding admin saat login pertama, atau progressive disclosure di section manapun | **Perlu konfirmasi pemakaian ke tim desain** |
| [Aura Build — indie-showcase-56](https://www.aura.build/templates/indie-showcase-56) | Aura Build | **Template Reference** (bukan 1 component, tapi 1 halaman penuh) | Kandidat: referensi layout Kompetensi Keahlian / landing jurusan | **Perlu konfirmasi tim desain — ambil pattern-nya, bukan halaman utuh** |

---

## Cara Update Registry Ini

1. Tim desain nemu component/template baru → tambah baris di grup yang sesuai (atau bikin grup baru kalau section-nya belum ada di sini).
2. Kalau statusnya masih "perlu konfirmasi" → **jangan mulai Fase 1 SRS section itu** sebelum baris terkait dikonfirmasi section-nya (update kolom Catatan/Cara Pakai jadi jelas).
3. Setiap SRS (`docs/templates/SRS_TEMPLATE.md`) di bagian "Component/Template yang dipakai" **wajib merujuk ke baris spesifik di file ini**, bukan nulis ulang link manual biar tetap satu sumber kebenaran.
