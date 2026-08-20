# Panduan Penggunaan CibiOne CMS

> Dokumentasi lengkap untuk pengguna akhir (Admin Sekolah & Admin Jurusan)

---

## 📋 Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Akses & Login](#akses--login)
3. [Dashboard Admin](#dashboard-admin)
4. [Mengelola Berita & Pengumuman](#mengelola-berita--pengumuman)
5. [Mengelola Prestasi](#mengelola-prestasi)
6. [Mengelola Agenda](#mengelola-agenda)
7. [Mengelola Data Guru](#mengelola-data-guru)
8. [Mengelola Jurusan](#mengelola-jurusan)
9. [Pengaturan Situs](#pengaturan-situs)
10. [AI Chatbot](#ai-chatbot)
11. [FAQ & Troubleshooting](#faq--troubleshooting)

---

## 🎯 Pengenalan

### Apa itu CibiOne CMS?

CibiOne CMS adalah sistem manajemen konten website SMKN 1 Cibinong yang memungkinkan setiap jurusan mengelola konten mereka secara mandiri tanpa harus menunggu approval dari admin pusat.

### Jenis Akun

#### 1. Super Admin
**Hak Akses:**
- ✅ Mengelola semua konten (berita, pengumuman, prestasi, agenda)
- ✅ Mengelola data guru semua jurusan
- ✅ Mengelola data jurusan/kompetensi keahlian
- ✅ Mengubah pengaturan situs (kontak, lokasi, maps)
- ✅ Mengelola akun admin jurusan
- ✅ Melihat semua statistik

#### 2. Admin Jurusan
**Hak Akses:**
- ✅ Mengelola konten jurusan sendiri (berita, pengumuman, prestasi, agenda)
- ✅ Mengelola data guru jurusan sendiri
- ✅ Mengelola knowledge base chatbot jurusan sendiri
- ❌ Tidak bisa mengubah pengaturan situs
- ❌ Tidak bisa mengelola data jurusan lain

---

## 🔐 Akses & Login

### URL Akses

- **Website Publik**: `https://smkn1cibinong.sch.id`
- **Dashboard Admin**: `https://smkn1cibinong.sch.id/admin`

### Login Pertama Kali

1. Buka URL dashboard admin
2. Masukkan **email** dan **password** yang diberikan oleh Super Admin
3. Klik tombol **"Masuk"**
4. Jika berhasil, Anda akan diarahkan ke dashboard

### Lupa Password

Hubungi Super Admin untuk reset password Anda.

### Logout

Klik tombol **"Keluar"** di pojok kanan atas dashboard.

---

## 📊 Dashboard Admin

### Halaman Utama Dashboard

Setelah login, Anda akan melihat:

**Untuk Super Admin:**
- Ringkasan total berita, pengumuman, prestasi, agenda
- Statistik konten per jurusan
- Aktivitas terbaru
- Quick actions (tambah berita, tambah pengumuman, dll)

**Untuk Admin Jurusan:**
- Ringkasan konten jurusan Anda
- Statistik views & engagement
- Aktivitas terbaru jurusan Anda
- Quick actions untuk jurusan Anda

### Menu Navigasi

| Menu | Deskripsi | Akses |
|------|-----------|-------|
| **Dashboard** | Halaman utama dengan ringkasan | Semua |
| **Berita** | Kelola berita sekolah/jurusan | Semua |
| **Pengumuman** | Kelola pengumuman | Semua |
| **Prestasi** | Kelola prestasi siswa/sekolah | Semua |
| **Agenda** | Kelola agenda kegiatan | Semua |
| **Guru & Staff** | Kelola data guru | Semua |
| **Jurusan** | Kelola data jurusan | Super Admin |
| **Chatbot** | Kelola knowledge base chatbot | Semua |
| **Pengaturan** | Pengaturan situs (kontak, lokasi) | Super Admin |

---

## 📰 Mengelola Berita & Pengumuman

### Menambah Berita Baru

1. Klik menu **"Berita"** di sidebar
2. Klik tombol **"+ Tambah Berita"**
3. Isi form:
   - **Judul**: Judul berita (max 200 karakter)
   - **Slug**: URL berita (auto-generate dari judul, bisa diubah)
   - **Jurusan**: Pilih jurusan terkait (opsional, kosongkan jika berita sekolah-wide)
   - **Gambar**: Upload gambar utama (max 5MB, format: JPG, PNG)
   - **Konten**: Tulis isi berita lengkap (support rich text: bold, italic, list, link)
   - **Status**: Pilih "Published" untuk langsung tayang, atau "Draft" untuk simpan dulu
4. Klik tombol **"Simpan"**

**Tips:**
- Gunakan gambar dengan resolusi minimal 1200x630px untuk tampilan optimal
- Judul yang menarik meningkatkan engagement
- Untuk Admin Jurusan: Anda hanya bisa memilih jurusan Anda sendiri

### Mengedit Berita

1. Klik menu **"Berita"**
2. Cari berita yang ingin diedit
3. Klik icon **"Edit"** (pensil) di sebelah kanan
4. Ubah data yang diperlukan
5. Klik **"Simpan"**

### Menghapus Berita

1. Klik menu **"Berita"**
2. Cari berita yang ingin dihapus
3. Klik icon **"Hapus"** (tempat sampah) di sebelah kanan
4. Konfirmasi penghapusan
5. Berita akan terhapus **permanen**

**⚠️ Peringatan:** Penghapusan tidak bisa dibatalkan!

### Filter & Pencarian

- **Filter by Jurusan**: Pilih jurusan di dropdown filter
- **Filter by Status**: Pilih "Published" atau "Draft"
- **Search**: Ketik kata kunci di kolom pencarian
- **Sort**: Urutkan by tanggal, judul, atau views

### Pengumuman

Cara mengelola **Pengumuman** sama persis dengan Berita, hanya berbeda menu dan jenis konten.

---

## 🏆 Mengelola Prestasi

### Menambah Prestasi Baru

1. Klik menu **"Prestasi"**
2. Klik tombol **"+ Tambah Prestasi"**
3. Isi form:
   - **Judul Prestasi**: Nama prestasi/penghargaan
   - **Slug**: URL prestasi (auto-generate)
   - **Jurusan**: Pilih jurusan pemilik prestasi
   - **Gambar**: Upload foto prestasi (piala, sertifikat, kegiatan)
   - **Deskripsi**: Ceritakan detail prestasi
   - **Status**: Published/Draft
4. Klik **"Simpan"**

**Contoh Prestasi:**
- Juara 1 Lomba LKS Nasional Bidang Web Technologies
- Juara 2 Kompetisi Robotik Tingkat Provinsi
- Best Presentation Award JHIC 2026

### Best Practices

- Upload foto dokumentasi yang jelas
- Cantumkan tingkat kompetisi (sekolah/kota/provinsi/nasional/internasional)
- Sebutkan nama siswa/tim yang berprestasi
- Tambahkan tanggal pencapaian prestasi

---

## 📅 Mengelola Agenda

### Menambah Agenda Baru

1. Klik menu **"Agenda"**
2. Klik tombol **"+ Tambah Agenda"**
3. Isi form:
   - **Judul Kegiatan**: Nama event/kegiatan
   - **Slug**: URL agenda
   - **Tanggal & Waktu**: Pilih tanggal dan jam pelaksanaan
   - **Lokasi**: Tempat pelaksanaan (opsional)
   - **Jurusan**: Jurusan penyelenggara (opsional)
   - **Gambar**: Poster/banner kegiatan
   - **Deskripsi**: Detail kegiatan, rundown, dll
   - **Status**: Published/Draft
4. Klik **"Simpan"**

**Contoh Agenda:**
- Open House Jurusan SIJA - 15 Januari 2026
- Workshop IoT for Beginners - 20 Januari 2026
- Kunjungan Industri ke PT. Telkom Indonesia - 25 Januari 2026

### Kalender View

Dashboard agenda menampilkan kalender visual untuk melihat semua kegiatan dalam sebulan.

---

## 👨‍🏫 Mengelola Data Guru

### Menambah Data Guru

1. Klik menu **"Guru & Staff"**
2. Klik tombol **"+ Tambah Guru"**
3. Isi form:
   - **Nama Lengkap**: Nama guru/staff
   - **NIP**: Nomor Induk Pegawai (opsional)
   - **Jabatan**: Guru Mata Pelajaran, Kepala Jurusan, Staff TU, dll
   - **Jurusan**: Jurusan pengampu (wajib untuk Admin Jurusan)
   - **Mata Pelajaran**: Mata pelajaran yang diampu (opsional)
   - **Foto**: Upload foto profil (max 2MB)
   - **Email**: Email kontak (opsional)
   - **No. Telepon**: Nomor telepon (opsional)
   - **Biografi**: Riwayat pendidikan, pengalaman, dll (opsional)
   - **Status**: Published/Draft
4. Klik **"Simpan"**

**Untuk Admin Jurusan:**
- Anda hanya bisa menambah guru untuk jurusan Anda sendiri
- Field "Jurusan" otomatis terisi dengan jurusan Anda

**Untuk Super Admin:**
- Bisa menambah guru untuk semua jurusan
- Bisa mengelola semua data guru

### Grid View vs List View

Toggle antara tampilan grid (kartu) dan list (tabel) sesuai preferensi Anda.

---

## 🎓 Mengelola Jurusan

**⚠️ Menu ini hanya untuk Super Admin**

### Menambah Jurusan Baru

1. Klik menu **"Jurusan"**
2. Klik tombol **"+ Tambah Jurusan"**
3. Isi form:
   - **Nama Jurusan**: Nama lengkap kompetensi keahlian
   - **Singkatan**: Akronim (contoh: SIJA, TKJ, RPL)
   - **Slug**: URL jurusan (auto-generate)
   - **Logo**: Upload logo jurusan
   - **Deskripsi Singkat**: 2-3 kalimat untuk preview
   - **Deskripsi Lengkap**: Detail tentang jurusan, prospek karir, dll
   - **Link Website**: URL landing page jurusan (jika ada)
   - **Status**: Published/Draft
4. Klik **"Simpan"**

### Mengaktifkan/Menonaktifkan Jurusan

Ubah status "Published" menjadi "Draft" untuk menyembunyikan jurusan dari website publik (misalnya jurusan yang sudah tidak menerima siswa baru).

---

## ⚙️ Pengaturan Situs

**⚠️ Menu ini hanya untuk Super Admin**

### Pengaturan Kontak

**Nomor WhatsApp:**
1. Klik menu **"Pengaturan"** → **"Kontak"**
2. Edit field **"Nomor WhatsApp"**
3. Format: `+62812345678` (dengan kode negara)
4. Klik **"Simpan"**

**Email Sekolah:**
1. Edit field **"Email"**
2. Format: `email@smkn1cibinong.sch.id`
3. Klik **"Simpan"**

### Pengaturan Lokasi

**Alamat:**
1. Klik menu **"Pengaturan"** → **"Lokasi"**
2. Edit field **"Alamat Lengkap"**
3. Contoh:
   ```
   Jl. Karadenan No.7A, Karadenan
   Kec. Cibinong, Kabupaten Bogor
   Jawa Barat 16913
   ```
4. Klik **"Simpan"**

**Google Maps Embed:**
1. Buka Google Maps
2. Cari lokasi sekolah
3. Klik **"Share"** → **"Embed a map"**
4. Copy kode embed
5. Paste di field **"Maps Embed Code"**
6. Klik **"Simpan"**

### Sambutan Kepala Sekolah

1. Klik menu **"Pengaturan"** → **"Sambutan"**
2. Upload foto Kepala Sekolah
3. Isi field:
   - **Nama**: Nama lengkap Kepala Sekolah
   - **NIP**: Nomor Induk Pegawai
   - **Sambutan**: Teks sambutan (support rich text)
4. Klik **"Simpan"**

### Video Profil

1. Klik menu **"Pengaturan"** → **"Video Profil"**
2. Upload video ke YouTube
3. Copy URL video (contoh: `https://www.youtube.com/watch?v=xxxxx`)
4. Paste di field **"URL Video"**
5. Klik **"Simpan"**

**Tips:** Video profil sebaiknya berdurasi 2-5 menit untuk engagement optimal.

---

## 🤖 AI Chatbot

### Apa itu AI Chatbot?

AI Chatbot adalah asisten virtual yang menjawab pertanyaan pengunjung website secara otomatis 24/7 berdasarkan knowledge base yang Anda kelola.

### Mengelola Knowledge Base

**Untuk Admin Jurusan:**

1. Klik menu **"Chatbot"**
2. Anda akan melihat knowledge base jurusan Anda
3. Klik **"+ Tambah Knowledge"**
4. Isi field **"Konten"** dengan informasi yang ingin diajarkan ke chatbot
5. Klik **"Simpan"**

**Contoh Knowledge Base:**

**Q: Apa saja jurusan yang tersedia di SMKN 1 Cibinong?**
```
Jawaban: SMKN 1 Cibinong memiliki 5 kompetensi keahlian:
1. Sistem Informatika, Jaringan, dan Aplikasi (SIJA)
2. Teknik Komputer dan Jaringan (TKJ)
3. Rekayasa Perangkat Lunak (RPL)
4. Teknik Elektronika Industri (TEI)
5. Teknik Otomasi Industri (TOI)
```

**Q: Apa prospek kerja lulusan SIJA?**
```
Jawaban: Lulusan SIJA dapat bekerja sebagai:
- Network Administrator
- System Engineer
- IT Support
- Cloud Engineer
- Cybersecurity Analyst
- Full-stack Developer
```

### Best Practices Knowledge Base

✅ **DO:**
- Tulis jawaban dalam format yang mudah dibaca
- Gunakan bullet points untuk list
- Update knowledge base secara berkala
- Tambahkan informasi terbaru (prestasi, kerjasama industri, dll)

❌ **DON'T:**
- Jangan tulis informasi yang salah/outdated
- Jangan gunakan bahasa yang terlalu formal/kaku
- Jangan copy-paste terlalu panjang tanpa struktur

### Testing Chatbot

1. Buka website publik
2. Klik icon chatbot di pojok kanan bawah
3. Kirim pertanyaan test
4. Lihat apakah jawaban sesuai dengan knowledge base Anda
5. Jika kurang sesuai, update knowledge base

---

## ❓ FAQ & Troubleshooting

### Umum

**Q: Berapa lama berita yang saya publish muncul di website publik?**

A: Berita muncul langsung setelah status diubah menjadi "Published" (real-time, tidak ada delay).

**Q: Apakah saya bisa menjadwalkan publish berita?**

A: Fitur scheduling belum tersedia di versi ini. Gunakan status "Draft" dan ubah ke "Published" secara manual saat waktunya tiba.

**Q: Berapa ukuran maksimal file gambar yang bisa diupload?**

A: Maksimal 5MB per file untuk gambar konten, 2MB untuk foto profil.

**Q: Format gambar apa saja yang didukung?**

A: JPG, JPEG, PNG. Format WEBP dan GIF tidak didukung saat ini.

### Error & Solusi

**Error: "Forbidden - Jurusan scope mismatch"**

**Penyebab:** Admin Jurusan mencoba mengelola konten jurusan lain.

**Solusi:** Pastikan Anda hanya memilih jurusan Anda sendiri di dropdown "Jurusan".

---

**Error: "Image upload failed"**

**Penyebab:** File terlalu besar atau format tidak didukung.

**Solusi:**
1. Compress gambar Anda (gunakan tools seperti TinyPNG)
2. Pastikan format JPG/PNG
3. Pastikan ukuran < 5MB

---

**Error: "Slug already exists"**

**Penyebab:** Slug URL sudah digunakan oleh konten lain.

**Solusi:** Ubah slug menjadi unique (tambahkan tahun, nomor, dll). Contoh: `berita-lomba-lks` → `berita-lomba-lks-2026`

---

**Error: "Session expired - Please login again"**

**Penyebab:** Session login Anda sudah habis (7 hari).

**Solusi:** Login ulang dengan email & password Anda.

---

### Performance Issues

**Q: Dashboard terasa lambat saat load data banyak**

**Solusi:**
- Gunakan filter untuk menampilkan data spesifik
- Gunakan pagination (jangan load semua data sekaligus)
- Clear browser cache

**Q: Upload gambar lama sekali**

**Solusi:**
- Compress gambar sebelum upload
- Pastikan koneksi internet stabil
- Gunakan browser modern (Chrome, Firefox, Edge)

---

### Akun & Keamanan

**Q: Bagaimana cara mengubah password saya?**

A: Hubungi Super Admin untuk reset password. Fitur self-service password change akan ditambahkan di versi berikutnya.

**Q: Apakah saya bisa login dari multiple devices?**

A: Ya, Anda bisa login dari komputer, laptop, dan tablet secara bersamaan dengan akun yang sama.

**Q: Apakah data saya aman?**

A: Ya, sistem menggunakan:
- HTTPS encryption untuk semua komunikasi
- Password hashing dengan algoritma bcrypt
- Session-based auth dengan httpOnly cookies
- Database backup otomatis setiap hari

---

## 📞 Bantuan & Support

Jika mengalami kendala yang tidak tercantum di dokumentasi ini:

**Untuk Admin Jurusan:**
- Hubungi Super Admin sekolah Anda
- Email: admin@smkn1cibinong.sch.id

**Untuk Super Admin:**
- Hubungi Tim Development
- Email: support@cibionecms.com
- WhatsApp: +62-xxx-xxxx-xxxx (jam kerja)

---

**Terakhir diupdate: 20 Agustus 2026**

**Versi Dokumentasi: 1.0.0**
