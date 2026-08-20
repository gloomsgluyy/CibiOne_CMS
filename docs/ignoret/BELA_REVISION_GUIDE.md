# Panduan Revisi Proposal BELA

Dokumen kerja untuk menaikkan kualitas proposal **BELA — Kenali, Pahami, Dampingi** pada BEEFest SDLC 2026. Fokusnya bukan menambah fitur sebanyak mungkin, melainkan menaikkan bukti pada lima kriteria: Orisinalitas, Inovasi, Penggunaan Teknologi, Kesesuaian Tujuan dan Implementasi, serta Presentasi Visual.

> Prioritas utama: artefak berjalan dan hasil uji selalu lebih bernilai daripada narasi tambahan. Jangan menyatakan sesuatu sudah dibangun, teruji, aman, atau bermitra jika belum ada bukti yang dapat diperiksa.

## Urutan Eksekusi

1. Kerjakan butir **1–4** terlebih dahulu: bukti MVP dan validasi.
2. Kerjakan butir **5–7**: posisi BELA terhadap solusi yang sudah ada.
3. Kerjakan butir **8–15**: keandalan rule engine, privasi, dan keselamatan.
4. Kerjakan butir **16–24**: kelayakan pilot dan metrik dampak.
5. Kerjakan butir **25–34**: perbaikan visual, sumber, dan pemeriksaan akhir.

---

## A. Bukti Produk dan Validasi

### 1. Tambahkan tautan artefak MVP

**Tujuan:** membuktikan BELA lebih dari gagasan atau mockup.

**Tambahkan pada abstrak, halaman terakhir, atau lampiran:**

- URL demo yang dapat diakses juri;
- URL repositori bila aman dibuka;
- video demo 2–3 menit;
- QR code menuju video/demo;
- akun demo atau instruksi menjalankan demo bila sistem butuh login.

**Alur minimum yang harus didemokan:**

1. warga mengirim cerita awal lewat simulasi WhatsApp;
2. sistem meminta klarifikasi atau quick reply;
3. rule engine memberi hasil *pre-screening*, bukan keputusan hukum;
4. sistem menghasilkan checklist dokumen;
5. kasus berisiko/di luar cakupan dialihkan ke paralegal;
6. paralegal melihat alasan eskalasi dan memperbarui status;
7. warga menerima notifikasi status generik.

**Kalimat yang dapat dipakai:**

> Artefak MVP BELA dapat diuji melalui QR code pada lampiran. Demo menampilkan alur pemeriksaan awal prodeo dari percakapan warga hingga checklist dokumen dan eskalasi ke paralegal. Data dalam demo adalah data sintetis; demo tidak membuat keputusan hukum maupun memproses data warga asli.

**Jangan lakukan:** memasang QR ke halaman kosong, video konsep tanpa produk, atau repositori yang tidak dapat dijalankan tanpa dokumentasi.

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi, Penggunaan Teknologi, Presentasi Visual.

---

### 2. Tambahkan tabel status implementasi

**Tujuan:** memisahkan bukti yang sudah ada dari rencana. Kejujuran tahap produk meningkatkan kredibilitas.

**Letak:** awal Bab IV, sebelum evaluasi kesesuaian.

| Fitur/modul | Status saat pengajuan | Bukti yang dapat diuji | Batasan saat ini | Target berikutnya |
|---|---|---|---|---|
| Alur percakapan WhatsApp | Mockup/prototipe/interaktif | tautan/video/screenshot | hanya tiga layanan | uji pengguna pilot |
| Rule engine prodeo | Belum dibangun/prototipe | rule matrix/test case | bukan keputusan akhir | validasi paralegal |
| PWA status dan peta | Mockup/prototipe | tautan/video | data jadwal manual | integrasi pilot |
| Dashboard paralegal | Mockup/prototipe | tautan/video | belum dipakai mitra | uji workflow |
| Notifikasi kasus | Rencana/prototipe | log demo | bukan data perkara nyata | integrasi API |

Gunakan hanya status yang akurat: `rancangan`, `mockup`, `prototipe interaktif`, `berjalan di staging`, `diuji terbatas`, atau `produksi terbatas`.

**Kalimat yang dapat dipakai:**

> Proposal ini membedakan rancangan, prototipe, dan fungsi yang telah diuji. Status tersebut dicantumkan per modul agar klaim implementasi dapat ditelusuri dan tidak menyamakan rencana sprint dengan hasil pengembangan.

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi.

---

### 3. Lakukan uji pengguna dan uji ahli kecil

**Tujuan:** mengganti asumsi dengan bukti awal.

**Desain minimum yang realistis:**

- 10–20 calon pengguna dari kelompok target, atau proxy yang jelas bila akses warga belum tersedia;
- 2–3 paralegal, kader pendamping, atau petugas layanan sebagai penilai alur;
- satu skenario prodeo, satu Posbakum, satu itsbat nikah;
- moderator mencatat waktu, kesalahan, pertanyaan, dan titik berhenti;
- persetujuan peserta; hindari mengumpulkan perkara atau identitas sensitif bila belum perlu.

**Metrik minimum:**

| Metrik | Rumus | Mengapa penting |
|---|---|---|
| Completion rate | pengguna menuntaskan alur / pengguna memulai alur | menunjukkan alur tidak membingungkan |
| Waktu menuju checklist | median menit dari pesan pertama ke checklist | menguji janji penghematan waktu |
| Ketepatan routing | routing sesuai review paralegal / seluruh kasus uji | menguji rule engine |
| Error recovery | pengguna pulih dari salah input / salah input | menguji UX dan quick reply |
| Pemahaman output | pengguna dapat menjelaskan langkah berikutnya / peserta | menguji bahasa sederhana |

**Visual:** gunakan satu tabel hasil dan satu grafik batang. Cantumkan `n`, tanggal, metode, dan batas sampel kecil.

**Kalimat yang dapat dipakai setelah uji selesai:**

> Uji terbatas melibatkan `n=...` peserta dan `n=...` penilai paralegal/kader. Pada skenario data sintetis, `...%` peserta menuntaskan alur, median waktu menuju checklist adalah `...` menit, dan `.../...` hasil routing disetujui penilai. Hasil ini bersifat eksploratif, bukan bukti dampak populasi.

**Kriteria terdampak:** Inovasi, Kesesuaian Tujuan dan Implementasi, Presentasi Visual.

---

### 4. Tambahkan studi kasus end-to-end anonim

**Tujuan:** memperlihatkan hubungan antara masalah warga, keputusan sistem, aturan, dan aksi manusia.

**Letak:** setelah tabel kesesuaian masalah–fitur pada Bab IV.

**Format yang disarankan:**

| Tahap | Input/aksi | Respons BELA | Bukti aturan | Batas keputusan |
|---|---|---|---|---|
| Cerita awal | “Saya ingin mengurus ...” | klasifikasi awal | tidak ada keputusan | minta klarifikasi bila yakin rendah |
| Klarifikasi | quick reply/pertanyaan | identifikasi jalur layanan | rule ID | hanya pre-screening |
| Kelayakan awal | jawaban kondisi ekonomi | checklist awal | pasal/aturan terkait | pengadilan tetap memutus |
| Dokumen | foto/daftar dokumen | cek kelengkapan | format lokal tervalidasi | tidak memverifikasi keaslian |
| Eskalasi | kasus kompleks | antrean paralegal | trigger eskalasi | respons manusia |
| Rujukan | jadwal/lokasi | tautan dan arahan | sumber jadwal | jadwal dapat berubah |

Gunakan tokoh anonim seperti `Warga A`; jangan pakai cerita perkara nyata tanpa izin tertulis.

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi, Penggunaan Teknologi.

---

## B. Orisinalitas dan Posisi terhadap Prior Art

### 5. Perbaiki pernyataan kebaruan

**Masalah saat ini:** WhatsApp, bantuan, rujukan, dan pelacakan bukan ide yang belum pernah ada. Kebaruan harus spesifik dan dapat dibandingkan.

**Ganti atau tambahkan paragraf ini:**

> Kebaruan BELA bukan pada penggunaan WhatsApp semata. Layanan SAPA 129 telah menunjukkan WhatsApp dapat digunakan sebagai kanal pelaporan dan bantuan. Kontribusi BELA adalah menggabungkan pre-screening berbasis aturan yang sumbernya dapat ditelusuri, tiga jalur layanan hukum keluarga dalam satu pilot wilayah, checklist dokumen yang dipersonalisasi, serta eskalasi paralegal untuk kasus di luar batas otomatisasi. BELA tidak mengklaim sebagai layanan bantuan hukum digital pertama.

**Catatan:** sesuaikan pembanding dan kutipan dengan sumber yang benar-benar dibuka.

**Kriteria terdampak:** Orisinalitas.

---

### 6. Tambahkan tabel pembanding

**Tujuan:** juri dapat melihat pembeda BELA dalam 20 detik.

**Letak:** akhir Bab I atau awal Bab IV.

| Solusi | Pengguna utama | Kanal | Cakupan | Pre-screening aturan | Eskalasi manusia | Pelacakan status | Batas pembanding |
|---|---|---|---|---|---|---|---|
| SAPA 129 | korban/keterangan kekerasan perempuan-anak | telepon, WhatsApp, form | perlindungan kekerasan | tidak dibuktikan pada sumber yang dipakai | tersedia | tidak dinilai | domain berbeda |
| SID Bankum | OBH dan verifikator | web | administrasi bantuan hukum | workflow OBH | tersedia dalam proses institusi | tersedia untuk proses OBH | bukan intake publik sederhana |
| Posbakum/OBH | pencari bantuan hukum | layanan langsung | bantuan hukum umum | tergantung layanan | manusia | bervariasi | akses awal dapat tersebar |
| BELA | warga target pilot | WhatsApp, PWA, dashboard | prodeo, Posbakum, itsbat nikah | ya, pre-screening dapat ditelusuri | ya | pilot, belum integrasi nasional | masih perlu validasi lapangan |

**Aturan:** jangan isi `ya` untuk kemampuan solusi lain tanpa sumber langsung. Gunakan `tidak dibuktikan dalam sumber yang ditinjau` bila perlu.

**Kriteria terdampak:** Orisinalitas, Inovasi.

---

### 7. Tambahkan batas klaim kebaruan

**Tujuan:** menghindari penalti karena klaim “pertama” yang tidak dapat dibuktikan.

**Paragraf siap pakai:**

> BELA tidak mengklaim menciptakan hak hukum baru maupun menggantikan layanan bantuan hukum yang telah tersedia. Kontribusi yang diuji adalah penyatuan informasi, penyaringan awal yang transparan, dan rujukan manusia dalam alur yang lebih mudah dijalani warga pada wilayah pilot. Kebaruan ini bersifat kombinasi dan kontekstual; efektivitasnya perlu dibuktikan melalui uji lapangan.

**Kriteria terdampak:** Orisinalitas, Inovasi.

---

## C. Rule Engine dan Batas Keputusan

### 8. Tambahkan Rule Traceability Matrix

**Tujuan:** membuktikan rule engine bukan label teknologi.

**Letak:** lampiran teknis; ringkasannya masuk Bab III.

| Rule ID | Pertanyaan/masukan | Kondisi | Output sistem | Sumber resmi | Versi/tanggal cek | Trigger eskalasi |
|---|---|---|---|---|---|---|
| PRO-01 | kemampuan membayar | jawaban awal warga | indikasi perlu verifikasi kelayakan | pasal/aturan yang tepat | YYYY-MM-DD | jawaban tidak lengkap/konflik |
| POS-01 | jenis kebutuhan | layanan dalam cakupan | rujukan Posbakum/OBH | sumber layanan lokal | YYYY-MM-DD | kasus di luar tiga layanan |
| ITS-01 | status pencatatan nikah | kebutuhan itsbat terindikasi | checklist konsultasi | aturan terkait | YYYY-MM-DD | risiko kekerasan/konflik fakta |

**Wajib:**

- kutip pasal dan dokumen sumber yang tepat;
- tunjukkan siapa yang menyetujui perubahan aturan;
- tulis aturan tidak berlaku otomatis bila data lokal berubah;
- gunakan `indikasi` atau `pre-screening`, bukan `layak final`.

**Kriteria terdampak:** Penggunaan Teknologi, Kesesuaian Tujuan dan Implementasi.

---

### 9. Berikan satu contoh rule lengkap

**Tujuan:** mengubah arsitektur abstrak menjadi bukti mekanisme.

**Format:**

```text
Rule ID: PRO-01
Tujuan: mengarahkan warga ke pemeriksaan kelayakan prodeo.
Input: domisili, jenis perkara, pernyataan kondisi ekonomi, ketersediaan dokumen.
Jika: data belum lengkap atau NLU confidence rendah.
Maka: tampilkan klarifikasi/quick reply; jangan berikan hasil.
Jika: data cukup untuk pre-screening.
Maka: tampilkan “perlu verifikasi resmi”, checklist dokumen, dan rujukan Posbakum/pengadilan.
Jika: terdapat konflik data, ancaman keselamatan, atau pertanyaan di luar cakupan.
Maka: hentikan otomatisasi dan masukkan antrean paralegal.
Batas: BELA tidak menetapkan kelayakan akhir maupun keaslian dokumen.
Sumber: [pasal dan URL resmi].
```

Tambahkan 5–10 test case sintetis di lampiran: input, hasil diharapkan, hasil aktual, status lulus/gagal.

**Kriteria terdampak:** Penggunaan Teknologi.

---

### 10. Koreksi pembahasan SKTM dan kelayakan

**Masalah:** SKTM tidak boleh diposisikan sebagai satu-satunya syarat universal tanpa kutipan aturan spesifik dan pengecekan praktik lokal. BELA juga tidak berwenang memberi keputusan akhir.

**Ganti kalimat absolut dengan:**

> BELA melakukan pre-screening informatif untuk membantu warga memahami langkah awal dan dokumen yang mungkin diperlukan. Verifikasi kelayakan, penerimaan dokumen, dan keputusan akhir tetap berada pada pengadilan atau instansi berwenang. Checklist BELA harus mengikuti regulasi yang berlaku dan konfigurasi layanan setempat; bila ada ketidakpastian, warga dirujuk ke paralegal atau Posbakum.

Tambahkan sumber pasal, versi peraturan, tanggal akses, serta catatan bahwa konfigurasi pilot wajib disetujui mitra lokal.

**Kriteria terdampak:** Penggunaan Teknologi, Kesesuaian Tujuan dan Implementasi.

---

### 11. Tambahkan diagram batas keputusan

**Tujuan:** menunjukkan otomatisasi yang aman dan tidak berlebihan.

**Visual yang harus ada:**

```text
Cerita warga
   ↓
NLU yakin? ── tidak ──→ klarifikasi / quick reply
   │ ya
   ↓
Dalam tiga layanan MVP? ── tidak ──→ rujuk Posbakum / paralegal
   │ ya
   ↓
Data cukup? ── tidak ──→ checklist data minimum
   │ ya
   ↓
Pre-screening rule engine
   ↓
Risiko/konflik/permintaan nasihat hukum personal? ── ya ──→ paralegal
   │ tidak
   ↓
Checklist dan rujukan informasi
   ↓
Keputusan resmi instansi/pengadilan
```

**Tambahkan daftar trigger eskalasi:**

- risiko kekerasan atau ancaman langsung;
- anak, disabilitas, atau kebutuhan pendamping khusus;
- konflik fakta/data;
- pertanyaan hukum personal di luar aturan;
- NLU confidence rendah berulang;
- kasus pidana, tanah, waris, atau domain di luar MVP;
- warga meminta keputusan/representasi hukum.

**Kriteria terdampak:** Penggunaan Teknologi, Presentasi Visual.

---

## D. Privasi, Keamanan, dan Keselamatan

### 12. Tambahkan threat model pengguna rentan

**Tujuan:** mengubah daftar fitur keamanan menjadi mitigasi yang dapat diuji.

| Ancaman | Dampak | Mitigasi desain | Bukti/uji yang diperlukan | Batasan |
|---|---|---|---|---|
| perangkat dibuka pasangan/pelaku | informasi kasus terekspos | notifikasi generik, quick exit, panduan hapus lokal | uji tampilan notifikasi | BELA tidak mengendalikan perangkat pengguna |
| magic link diteruskan | akun/kasus diakses orang lain | token sekali pakai, kedaluwarsa, verifikasi ulang | test token expired/replay | URL masih dapat terlihat pada perangkat |
| akses berlebih staf | kebocoran data | RBAC, least privilege, audit log | matriks role dan log contoh | perlu SOP operasional |
| perangkat kader menyimpan data | kebocoran identitas warga | sesi terpisah, logout, larangan unduh, consent | uji mode pendamping | perangkat kader tetap berisiko |
| data tersimpan terlalu lama | dampak kebocoran membesar | retensi minimum, hapus terjadwal | kebijakan retensi | kebutuhan hukum dapat membatasi penghapusan |
| notifikasi mengungkap perkara | risiko keselamatan | pesan netral tanpa istilah hukum | screenshot pengujian | metadata WhatsApp tetap ada |

**Kriteria terdampak:** Penggunaan Teknologi, Inovasi.

---

### 13. Tambahkan arsitektur privasi operasional

**Paragraf siap pakai, sesuaikan hanya bila benar-benar diimplementasikan:**

> BELA menerapkan minimisasi data: sistem hanya meminta data yang diperlukan untuk layanan yang dipilih. Akses dashboard dibatasi berdasarkan peran dan wilayah kerja; setiap akses maupun perubahan status kasus dicatat dalam audit log. Data dilindungi saat transit dan saat tersimpan sesuai rancangan keamanan yang diuji pada lingkungan pilot. Sebelum pemrosesan, warga menerima penjelasan tujuan, pihak yang dapat mengakses data, masa retensi, serta cara menarik persetujuan atau mengajukan penghapusan data sesuai batas hukum yang berlaku.

**Tambahkan spesifikasi tabel:**

| Area | Keputusan minimum | Bukti |
|---|---|---|
| Data minimization | field wajib dan opsional | data dictionary |
| Auth dashboard | peran dan autentikasi | matriks akses |
| Audit | siapa melihat/mengubah kasus | contoh audit log |
| Enkripsi | transit dan at-rest | konfigurasi/arsitektur |
| Retensi | periode tiap tipe data | kebijakan retensi |
| Penghapusan | alur permintaan dan pengecualian | SOP |
| Insiden | kontak, triage, pemberitahuan | incident runbook |

**Jangan tulis “aman sepenuhnya” atau “sesuai UU PDP” tanpa audit hukum/teknis.**

**Kriteria terdampak:** Penggunaan Teknologi.

---

### 14. Tambahkan diagram siklus hidup data

**Tujuan:** membuat privasi mudah dinilai secara visual.

```text
Persetujuan warga
  ↓
Input minimum melalui WhatsApp/PWA
  ↓
Validasi dan pre-screening
  ↓
Penyimpanan kasus sesuai peran
  ↓
Akses paralegal bila ada eskalasi
  ↓
Notifikasi status generik
  ↓
Retensi minimum / penutupan kasus
  ↓
Penghapusan atau anonimisasi sesuai kebijakan
```

Beri label pada setiap panah: data apa yang bergerak, siapa penerima, apakah tersimpan, dan kapan dihapus.

**Kriteria terdampak:** Penggunaan Teknologi, Presentasi Visual.

---

### 15. Jelaskan keterbatasan WhatsApp dengan jujur

**Tujuan:** menghindari janji keamanan yang tidak mungkin dipenuhi aplikasi pihak ketiga.

**Tambahkan paragraf:**

> Fitur penghapusan riwayat pada BELA hanya menghapus atau menonaktifkan data dalam sistem BELA sesuai kebijakan retensi. Fitur tersebut tidak dapat menjamin penghapusan salinan pesan, tangkapan layar, notifikasi, atau cadangan pada perangkat warga maupun layanan pihak ketiga. Karena itu BELA menyediakan notifikasi generik, panduan pengamanan perangkat, dan jalur pendamping manusia untuk situasi berisiko.

**Kriteria terdampak:** Penggunaan Teknologi, Inovasi.

---

## E. Kelayakan Pilot dan Operasi Layanan

### 16. Ubah asumsi kapasitas menjadi hipotesis yang diuji

**Masalah:** pernyataan kapasitas 2–3 kasus/hari belum cukup tanpa konfirmasi mitra.

**Ganti gaya pernyataan:**

> Estimasi volume eskalasi merupakan hipotesis operasional awal, bukan kapasitas yang telah dikonfirmasi. Pada Sprint 0, BELA akan memvalidasi volume kasus, jam layanan, SLA respons, kapasitas paralegal, serta mekanisme pengalihan saat antrean penuh bersama mitra pilot.

**Tambahkan tabel validasi:**

| Asumsi | Nilai awal | Cara validasi | Pemilik validasi | Keputusan jika gagal |
|---|---:|---|---|---|
| percakapan per bulan | 300 | log pilot dan wawancara | product lead/mitra | turunkan target atau perluas kapasitas |
| rasio eskalasi | 20–30% | review sampel paralegal | koordinator paralegal | perbaiki aturan/triage |
| SLA tanggapan | tentukan bersama mitra | simulasi antrean | mitra layanan | fallback/routing ulang |
| ketersediaan jadwal | pembaruan berkala | audit sumber jadwal | admin lokal | tandai jadwal belum dikonfirmasi |

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi.

---

### 17. Tambahkan Pilot Readiness Canvas

**Tujuan:** menunjukkan pilot dapat dijalankan, bukan sekadar lokasi yang dipilih.

| Pihak | Peran | Bukti komitmen | Data/akses diperlukan | Risiko | Mitigasi |
|---|---|---|---|---|---|
| Pengadilan/Posbakum | validasi proses rujukan | surat minat/notulen | jadwal dan prosedur | tidak tersedia | mulai dengan data manual terkonfirmasi |
| OBH/paralegal | menangani eskalasi | kesediaan/SLA | kapasitas layanan | antrean penuh | batas antrean dan fallback |
| PEKKA/kader | pendamping akses | kesediaan pelatihan | alur pendamping | kebocoran perangkat | SOP mode pendamping |
| Desa | dokumen/rujukan administratif | koordinasi lokal | proses setempat | variasi prosedur | konfigurasi wilayah |
| Tim BELA | operasi dan keamanan | PIC jelas | dashboard/log | respons lambat | jadwal piket/runbook |

Lampirkan Letter of Intent, email konfirmasi, notulen, atau setidaknya rencana kontak. Jangan membuat logo mitra tampak sebagai kerja sama resmi tanpa izin.

**Kriteria terdampak:** Inovasi, Kesesuaian Tujuan dan Implementasi.

---

### 18. Tambahkan service blueprint dan SLA

**Tujuan:** memperjelas siapa melakukan apa sesudah bot menyerahkan kasus.

**Visual:** lima lajur: `Warga`, `WhatsApp/PWA`, `Rule Engine`, `Paralegal`, `Institusi`.

Tambahkan pada alur:

- titik handoff;
- informasi yang diteruskan;
- SLA respons manusia;
- jam layanan;
- status antrean;
- fallback jika paralegal tidak tersedia;
- penutupan kasus dan feedback.

**Tabel SLA contoh:**

| Kondisi | Respons sistem | Tindakan manusia | Target SLA | Fallback |
|---|---|---|---|---|
| pertanyaan rutin | checklist otomatis | tidak perlu | segera | n/a |
| NLU rendah | klarifikasi/quick reply | review bila berulang | `...` | Posbakum |
| kasus kompleks | tiket eskalasi | paralegal review | `...` jam kerja | mitra OBH lain |
| risiko keselamatan | pesan keselamatan/rujukan | petugas terlatih | secepat mungkin | kanal darurat relevan |

Jangan isi angka SLA aspiratif; sepakati dengan mitra atau tandai sebagai target pilot.

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi, Presentasi Visual.

---

### 19. Perjelas tata kelola kalender sidang keliling

**Tujuan:** memastikan fitur jadwal tidak menyesatkan warga.

**Tambahkan tabel:**

| Data | Pemilik sumber | Cara masuk | Frekuensi cek | Penanggung jawab | Status jika tidak terkonfirmasi |
|---|---|---|---|---|---|
| jadwal sidang keliling | pengadilan/mitra resmi | input manual/API bila tersedia | mingguan/sebelum acara | admin pilot | “Perlu konfirmasi” |
| lokasi Posbakum | pengadilan/OBH | verifikasi manual | bulanan | admin pilot | sembunyikan dari rekomendasi |
| kontak rujukan | mitra | verifikasi langsung | berkala | koordinator mitra | tampilkan kanal umum |

**Tambahkan aturan produk:** warga tidak boleh menerima jadwal sebagai kepastian jika belum ditandai terverifikasi pada tanggal pembaruan terakhir.

**Kriteria terdampak:** Penggunaan Teknologi, Kesesuaian Tujuan dan Implementasi.

---

### 20. Rancang mode pendamping bagi warga tanpa smartphone

**Tujuan:** menjadikan klaim inklusi dapat dioperasikan dengan aman.

**Tambahkan desain dan SOP:**

- kader memilih mode `Pendampingan Warga` sebelum membuat kasus;
- persetujuan warga direkam secara sederhana;
- setiap warga memiliki case ID berbeda;
- akun kader tidak boleh memakai satu percakapan untuk semua kasus;
- data sensitif tidak disimpan di galeri/perangkat kader;
- sesi otomatis keluar setelah selesai;
- kader diberi skrip batas peran: membantu input, bukan memberi nasihat hukum atau menjanjikan hasil;
- ada cara warga mengambil alih atau menghapus akses kader.

**Visual:** mockup satu layar pilihan `Saya mengakses untuk diri sendiri` / `Saya mendampingi warga`.

**Kriteria terdampak:** Inovasi, Penggunaan Teknologi, Presentasi Visual.

---

## F. Pengukuran Dampak

### 21. Bangun baseline sebelum pilot

**Tujuan:** target tidak berdiri tanpa pembanding.

**Kumpulkan secara aman:**

- berapa langkah/kunjungan yang biasanya dibutuhkan untuk memahami syarat;
- waktu yang diperlukan warga menemukan layanan;
- berapa berkas belum lengkap saat konsultasi pertama;
- sumber informasi awal warga;
- jarak/perjalanan perkiraan.

Gunakan survei singkat atau wawancara; catat metode, jumlah responden, tanggal, lokasi, dan keterbatasan. Jangan menyatakan “baseline mendekati nol” tanpa definisi dan data.

**Format:**

| Metrik | Baseline | Metode | Sampel | Periode | Keterbatasan |
|---|---:|---|---:|---|---|
| waktu memahami syarat | `...` | wawancara | `n=...` | `...` | self-report |
| berkas lengkap awal | `...%` | audit checklist | `n=...` | `...` | sampel pilot |
| kunjungan sebelum rujukan | `...` | wawancara | `n=...` | `...` | perkiraan warga |

**Kriteria terdampak:** Inovasi, Kesesuaian Tujuan dan Implementasi.

---

### 22. Tambahkan metrik operasional yang dapat diaudit

| Metrik | Definisi | Rumus | Sumber data | Target pilot | Risiko bias |
|---|---|---|---|---|---|
| completion rate | alur sampai checklist/routing selesai | selesai ÷ mulai | event log | `...` | pengguna berhenti karena faktor luar |
| routing agreement | hasil triage disetujui paralegal | disetujui ÷ direview | form review | `...` | sampel kasus terbatas |
| checklist completeness | berkas minimum lengkap saat rujukan | lengkap ÷ rujukan | review paralegal | `...` | syarat dapat berbeda lokal |
| median time to checklist | waktu pesan awal hingga output | median selisih waktu | event log | `...` | koneksi/perangkat |
| human response SLA | tiket dijawab sesuai SLA | sesuai SLA ÷ tiket | dashboard | `...` | jam layanan |
| privacy incident | kejadian valid per periode | jumlah kejadian | incident log | 0 target, bukan jaminan | under-reporting |

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi.

---

### 23. Buat definisi metrik dan rencana analisis

**Tujuan:** mencegah angka yang tidak dapat direplikasi.

Untuk setiap metrik tulis:

1. definisi persis;
2. pembilang dan penyebut;
3. event log/sumber data;
4. periode pengukuran;
5. siapa yang boleh mengubah data;
6. bagaimana data duplikat atau kasus batal dihitung;
7. target dan alasan target;
8. keterbatasan.

**Contoh:**

> Completion rate didefinisikan sebagai persentase sesi unik yang menghasilkan checklist, rujukan, atau tiket eskalasi yang tercatat. Sesi duplikat dari nomor yang sama dalam 24 jam digabung. Sesi yang berakhir karena gangguan sistem dilaporkan terpisah. Metrik dihitung mingguan dari event log dan ditinjau bersama paralegal pilot.

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi.

---

### 24. Pisahkan target, proyeksi, dan hasil

**Tujuan:** menjaga integritas klaim dampak.

**Gunakan label konsisten:**

- `Target pilot`: sasaran masa depan yang belum tercapai;
- `Proyeksi`: perhitungan berbasis asumsi yang dijelaskan;
- `Hasil uji`: temuan yang benar-benar diukur;
- `Tidak tersedia`: data belum dikumpulkan.

**Contoh perbaikan:**

> Angka 1.440 warga yang berpotensi terhubung dalam satu tahun adalah proyeksi berbasis target volume dan asumsi tingkat rujukan. Angka tersebut bukan hasil implementasi dan akan direvisi setelah baseline serta uji pilot tersedia.

**Kriteria terdampak:** Inovasi, Kesesuaian Tujuan dan Implementasi.

---

## G. Visual dan Pengalaman Pengguna

### 25. Perbesar dan pecah flowchart

**Masalah:** flowchart yang padat/berteks kecil sulit dinilai juri.

**Solusi:** buat dua visual, bukan satu:

1. **Alur warga:** cerita → klarifikasi → pre-screening → checklist → rujukan/status.
2. **Alur operasi:** webhook → NLU → rule engine → case store → antrean paralegal → notifikasi/audit.

Gunakan maksimal 8–10 node per diagram; teks minimal 12 pt pada PDF; warna punya legenda; jangan gunakan warna sebagai satu-satunya pembeda.

**Kriteria terdampak:** Presentasi Visual, Penggunaan Teknologi.

---

### 26. Tambahkan journey map sebelum vs sesudah BELA

**Tujuan:** menampilkan nilai pengguna tanpa paragraf panjang.

| Tahap | Sebelum BELA | Risiko/biaya | Dengan BELA | Bukti yang akan diukur |
|---|---|---|---|---|
| mencari informasi | bertanya ke banyak pihak | waktu/ongkos | guided conversation | waktu menuju checklist |
| memahami syarat | istilah dan dokumen tidak jelas | berkas kurang | checklist personal | kelengkapan berkas |
| mencari layanan | jadwal tersebar | perjalanan gagal | rujukan lokal terverifikasi | rujukan berhasil |
| kasus kompleks | tidak tahu jalur | salah arah | tiket paralegal | SLA respons |
| memantau proses | bertanya berulang | kecemasan | status generik | kepuasan/pemahaman |

**Kriteria terdampak:** Inovasi, Presentasi Visual.

---

### 27. Tambahkan mockup dashboard paralegal

**Tujuan:** saat ini sisi warga lebih tampak daripada bukti kerja manusia di belakangnya.

**Komponen wajib:**

- antrean kasus dan prioritas;
- alasan eskalasi yang dapat dibaca;
- ringkasan jawaban tanpa data berlebih;
- rule ID/sumber aturan yang dipakai;
- status dan SLA;
- tindakan: minta klarifikasi, beri arahan, rujuk, tutup;
- audit trail sederhana;
- indikator consent dan batas akses.

**Jangan:** membuat dashboard penuh grafik dekoratif. Tunjukkan satu tugas paralegal selesai dari awal sampai akhir.

**Kriteria terdampak:** Presentasi Visual, Penggunaan Teknologi.

---

### 28. Tambahkan state kosong, error, dan darurat

**Tujuan:** UX matang terlihat dari penanganan kondisi gagal.

Buat mockup/mini storyboard untuk:

- NLU tidak yakin: quick reply dan opsi paralegal;
- layanan di luar cakupan: penjelasan batas dan rujukan;
- jadwal belum terkonfirmasi: status jelas, jangan tampil sebagai pasti;
- dokumen belum lengkap: checklist dan alasan;
- paralegal belum tersedia: estimasi/saluran alternatif;
- kondisi darurat: pesan keselamatan serta kanal rujukan yang sesuai dan terverifikasi.

**Kriteria terdampak:** Presentasi Visual, Inovasi.

---

### 29. Tunjukkan aksesibilitas pada desain

**Tujuan:** target mencakup lansia, disabilitas, dan warga berbahasa daerah; desain harus membuktikannya.

**Tambahkan spesifikasi:**

- ukuran teks minimum dan kontras warna;
- tombol quick reply besar, label jelas;
- tidak mengandalkan ikon tanpa teks;
- bahasa sederhana, hindari jargon;
- pilihan input teks/voice note/menu;
- rencana bahasa Sasak: tahap, data pelatihan, validasi penutur, fallback;
- kompatibilitas layar kecil dan koneksi tidak stabil;
- mode pendamping kader.

**Kalimat siap pakai:**

> Aksesibilitas BELA dinilai melalui penyelesaian tugas, bukan sekadar tampilan. Alur inti menyediakan pilihan quick reply dan bahasa sederhana; dukungan Bahasa Sasak belum diklaim selesai pada MVP dan akan divalidasi bersama penutur serta mitra lokal sebelum diterapkan.

**Kriteria terdampak:** Presentasi Visual, Inovasi.

---

### 30. Ubah paragraf panjang menjadi bukti yang dipindai cepat

**Tujuan:** juri membaca proposal dengan waktu terbatas.

**Aturan penyuntingan:**

- satu paragraf maksimal satu gagasan;
- gunakan tabel untuk asumsi, risiko, peran, metrik, dan keputusan;
- gunakan diagram untuk alur dan arsitektur;
- letakkan `klaim → bukti → batasan` berdekatan;
- setiap angka harus punya sumber atau label target/proyeksi;
- setiap istilah teknis muncul pertama kali dengan penjelasan sederhana.

**Struktur Bab IV yang lebih efektif:**

1. status implementasi;
2. mapping masalah–fitur–bukti;
3. studi kasus end-to-end;
4. hasil uji atau rencana uji;
5. asumsi/batasan;
6. metrik dan target.

**Kriteria terdampak:** seluruh kriteria, terutama Presentasi Visual.

---

## H. Sumber, Klaim, dan Pemeriksaan Akhir

### 31. Audit seluruh referensi dan tanggal

**Tujuan:** sumber yang tidak dapat dibuka mengurangi kepercayaan seluruh proposal.

**Checklist tiap referensi:**

- organisasi/penerbit;
- judul dokumen;
- tanggal terbit atau status `tanpa tanggal`;
- URL langsung yang dapat dibuka;
- tanggal diakses;
- halaman/pasal bila menjadi dasar rule;
- jenis bukti: primer, sekunder, atau referensi teknis;
- klaim proposal yang didukung.

**Khusus referensi bertahun 2026:** pastikan benar-benar ada saat proposal dinilai. Jika belum terbit atau tidak dapat diakses, hapus, ganti sumber resmi terdahulu, atau tulis sebagai rencana validasi.

**Kriteria terdampak:** Orisinalitas, Inovasi, Penggunaan Teknologi.

---

### 32. Tambahkan sitasi pasal untuk setiap aturan rule engine

**Tujuan:** rule engine dapat diaudit oleh juri/mitra hukum.

Buat lampiran:

| Rule ID | Regulasi | Pasal/bagian | Interpretasi sistem | Ditinjau oleh | Tanggal tinjau |
|---|---|---|---|---|---|
| PRO-01 | nama peraturan resmi | pasal tepat | kondisi dan output terbatas | nama/peran bila ada izin | YYYY-MM-DD |

**Aturan:** jangan menulis interpretasi hukum sebagai fakta bila belum divalidasi ahli/mitra. Tandai `perlu validasi hukum` bila masih hipotesis.

**Kriteria terdampak:** Penggunaan Teknologi, Kesesuaian Tujuan dan Implementasi.

---

### 33. Tambahkan bagian “Asumsi dan Batasan”

**Tujuan:** proposal kuat menjelaskan apa yang belum dapat dilakukan.

**Letak:** akhir Bab IV atau sebelum kesimpulan.

| Area | Kondisi saat ini | Dampak | Mitigasi/keputusan |
|---|---|---|---|
| SIPP | belum ada API nasional yang dibuktikan untuk kebutuhan BELA | status nasional tidak dapat dijanjikan | pilot satu wilayah; kerja sama resmi untuk perluasan |
| jadwal sidang | data bisa berubah/tersebar | rujukan dapat keliru | kurasi manual dan tanda verifikasi |
| Bahasa Sasak | belum tersedia pada MVP | warga tertentu dapat kesulitan | quick reply/kader; validasi tahap berikutnya |
| keputusan hukum | bukan kewenangan BELA | risiko warga salah paham | label pre-screening dan eskalasi manusia |
| data pribadi | sensitif | risiko keselamatan/kebocoran | minimisasi, RBAC, audit, retensi |
| kapasitas mitra | belum tervalidasi | antrean dapat bertambah | Sprint 0 dan SLA/fallback |

**Kriteria terdampak:** Kesesuaian Tujuan dan Implementasi, Penggunaan Teknologi.

---

### 34. Pemeriksaan akhir sebelum kirim

Gunakan daftar ini setelah seluruh revisi selesai.

#### Integritas klaim

- [ ] Tidak ada klaim “pertama”, “pasti”, “aman”, atau “siap nasional” tanpa bukti.
- [ ] Setiap angka diberi sumber, metode, atau label target/proyeksi.
- [ ] Setiap fitur diberi status implementasi yang jujur.
- [ ] Tidak ada data atau identitas warga asli dalam demo tanpa izin dan pengamanan.
- [ ] Semua mitra hanya disebut sebagai mitra resmi bila ada konfirmasi.

#### Produk dan teknologi

- [ ] Demo memperlihatkan satu alur end-to-end.
- [ ] Rule matrix memuat sumber, versi, output, dan trigger eskalasi.
- [ ] Keputusan akhir selalu dikembalikan ke instansi/petugas berwenang.
- [ ] Threat model, retensi, akses peran, audit, dan consent dijelaskan.
- [ ] Batas WhatsApp/magic link dijelaskan jujur.

#### Pilot dan dampak

- [ ] Pilot memiliki pihak, peran, data, risiko, dan fallback yang jelas.
- [ ] Metrik mempunyai definisi, rumus, sumber data, target, dan keterbatasan.
- [ ] Hasil uji dipisahkan dari target serta proyeksi.
- [ ] Uji pengguna melaporkan sampel, metode, dan keterbatasan.

#### Visual dan keterbacaan

- [ ] Flowchart dapat dibaca pada tampilan 100% PDF.
- [ ] Ada tabel pembanding, journey map, service blueprint, dan state error.
- [ ] Mockup menampilkan sisi warga dan paralegal.
- [ ] Warna, kontras, ukuran teks, serta label memenuhi kebutuhan pengguna target.
- [ ] QR demo diuji dari perangkat lain.

#### Referensi

- [ ] Setiap URL dibuka ulang.
- [ ] Semua dasar aturan rule engine memakai sumber primer bila tersedia.
- [ ] Tanggal akses dan halaman/pasal dicantumkan.
- [ ] Referensi yang gagal diakses sudah diganti atau tidak dipakai untuk klaim material.

---

## Target Kenaikan Skor

| Kriteria | Kondisi awal | Bukti yang paling menaikkan skor | Target realistis setelah revisi |
|---|---:|---|---:|
| Orisinalitas | 13/20 | tabel pembanding, posisi kebaruan jujur, rule matrix | 15–16/20 |
| Inovasi | 16/20 | uji pengguna, pilot readiness, dampak terukur | 17–18/20 |
| Penggunaan Teknologi | 14.5/20 | MVP, test case, threat model, governance data | 17–18/20 |
| Kesesuaian Tujuan dan Implementasi | 13.5/20 | demo, studi kasus, hasil uji, metrik baseline | 17–18/20 |
| Presentasi Visual | 14/20 | diagram terbaca, dashboard, error states, aksesibilitas | 16–17/20 |

Nilai ini bukan jaminan. Kenaikan terbesar datang dari **MVP yang benar-benar diuji**, bukan dari penambahan diagram atau istilah teknis.
