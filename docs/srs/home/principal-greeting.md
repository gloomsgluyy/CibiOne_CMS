# SRS — Home / Sambutan Kepala Sekolah

## Metadata

| Field | Isi |
|---|---|
| Halaman | Home |
| Section | Sambutan Kepala Sekolah |
| Tipe Konten | Static fallback, CMS-ready later |
| Code Reference Folder | `docs/references/home/principal-greeting/` |
| Component Reference | PrebuiltUI about section example pasted by user |

## Requirement

- Section tampil tepat di bawah Hero Banner.
- Layout mengadaptasi contoh about: gambar kiri, teks kanan, floating card di atas gambar.
- Gambar kiri adalah foto Kepala Sekolah saat asset tersedia.
- Floating card menampilkan nama Kepala Sekolah dan jabatan.
- Judul kanan: `Sambutan Kepala Sekolah`.
- CTA menuju `/profil-sekolah`.

## Batasan

- Tidak membuat CMS/API/upload pada fase ini.
- Tidak memakai remote image contoh.
- Tidak import font ulang di component.

## Execution Log

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| 2026-08-14 | AI Assistant | Membuat section `PrincipalGreeting` dari pola PrebuiltUI about dan mount setelah Hero Banner. | Waiting for Approval | Foto kepala sekolah belum tersedia, memakai fallback `/smkn-hero-banner.png`. |
| 2026-08-14 | AI Assistant | Memisahkan judul `Sambutan Kepala Sekolah` ke atas section dan dibuat center. | Waiting for Approval | Build production lolos. |
| 2026-08-14 | AI Assistant | Menghapus eyebrow `Profil Sekolah`, mengganti nama menjadi `Sugiyo, S.Pd, M.Pd`, menghapus avatar `KS`, dan mengarahkan foto ke `/kepala-sekolah-sugiyo.jpg`. | Waiting for Approval | File foto belum ditemukan di `public`; perlu asset lokal agar build lolos. |
| 2026-08-14 | AI Assistant | Mengganti isi sambutan sesuai teks Kepala Sekolah dan mengembalikan image ke fallback lokal agar tidak 404. | Waiting for Approval | Build production lolos. Foto resmi perlu ditambahkan ke `public` sebelum path diganti lagi. |
| 2026-08-14 | AI Assistant | Menggunakan foto Kepala Sekolah dari `docs/image_reffrence/WhatsApp-Image-2025-02-04-at-14.30.04-1.jpeg` via static import. | Waiting for Approval | Build production lolos. |
| 2026-08-14 | AI Assistant | Memperkuat shadow card foto Kepala Sekolah dan menambahkan ring tipis. | Waiting for Approval | Perubahan visual minor; build tidak dijalankan ulang. |
| 2026-08-14 | AI Assistant | Menambahkan soft blue background blob, quote badge, dan card pada teks sambutan agar section tidak terlalu kosong. | Waiting for Approval | Build production lolos. |
| 2026-08-14 | AI Assistant | Menambahkan `TimelineAnimation` berbasis `motion/react` dan menerapkannya ke title, foto, dan card sambutan. | Waiting for Approval | Build production lolos. |
| 2026-08-14 | AI Assistant | Menambahkan card quote Kepala Sekolah setelah Sambutan dan placeholder section Highlight Prestasi berwarna biru. | Waiting for Approval | Card mengadaptasi reference testimonial; placeholder belum berisi komponen prestasi. |
| 2026-08-14 | AI Assistant | Mengisi placeholder Highlight Prestasi dengan mock conditional grid berdasarkan skala nasional, provinsi, kabupaten, dan sekolah. | Waiting for Approval | Source final akan memakai published `posts` bertipe `prestasi`; schema belum memiliki metadata skala prestasi. |
