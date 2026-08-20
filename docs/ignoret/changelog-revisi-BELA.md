# Changelog Revisi Proposal BELA — Panduan Terap Manual

Dokumen ini membandingkan proposal **versi asli** (PDF yang baru kamu upload) dengan
**versi revisi** yang sudah dibuat sebelumnya. Setiap butir berisi: posisi (bab/sub-bab),
kalimat yang sudah ada di dokumenmu sebagai penanda lokasi, dan teks yang perlu
ditambahkan atau diganti. Urutan mengikuti urutan bab dari awal ke akhir dokumen.

Cara pakai: buka docx-mu, cari kalimat "Cari kalimat ini" pakai Ctrl+F, lalu tambahkan/ganti
sesuai instruksi.

---

## BAB I — Pendahuluan

### 1.2 Rumusan Masalah — perkuat poin 1 dengan data yang sudah ada di 1.1

**Cari kalimat ini** (poin 1 rumusan masalah):
> "Warga tidak mampu, khususnya perempuan kepala keluarga di wilayah pedesaan, sebagian besar tidak mengetahui bahwa mekanisme pembebasan biaya perkara (prodeo) dan pendampingan hukum gratis (Posbakum) sudah tersedia secara hukum sejak tahun 2014."

**Ganti menjadi:**
> "Warga tidak mampu, khususnya perempuan kepala keluarga di wilayah pedesaan, sebagian besar tidak mengetahui bahwa mekanisme pembebasan biaya perkara (prodeo) dan pendampingan hukum gratis (Posbakum) sudah tersedia secara hukum sejak tahun 2014 — sebagaimana tercermin dari temuan PEKKA bahwa masyarakat miskin secara umum tidak dapat mengakses pengadilan sama sekali tanpa intervensi eksternal."

---

### 1.3 Tujuan dan Manfaat — hedge klaim "menilai kelayakan"

**Cari kalimat ini** (poin pertama Tujuan):
> "Membangun sistem percakapan yang dapat menilai kelayakan warga atas prodeo, Posbakum, dan itsbat nikah secara otomatis, konsisten, dan dapat dipertanggungjawabkan sumbernya."

**Ganti menjadi:**
> "Membangun sistem percakapan yang dapat melakukan pre-screening kelayakan warga atas prodeo, Posbakum, dan itsbat nikah secara otomatis, konsisten, dan dapat dipertanggungjawabkan sumbernya — bukan keputusan hukum akhir."

*(Alasan: "menilai kelayakan" terdengar seperti BELA yang memutuskan; "pre-screening" konsisten dengan batas kewenangan yang dijelaskan di Bab II.3)*

---

### 1.4 — TAMBAHKAN SUB-BAB BARU (posisi: setelah 1.3 selesai, sebelum BAB II dimulai)

**Sisipkan setelah kalimat terakhir bagian "b. Manfaat":**
> "...Bagi masyarakat luas: kontribusi nyata terhadap capaian target SDG 16.3 (akses keadilan yang setara) dan SDG 16.9 (identitas hukum bagi semua) di Indonesia."

**Tambahkan heading baru "1.4 Posisi BELA terhadap Solusi yang Sudah Ada", lalu isi:**

> Kebaruan BELA bukan terletak pada penggunaan WhatsApp semata. Layanan SAPA 129 milik Kementerian Pemberdayaan Perempuan dan Perlindungan Anak telah menunjukkan bahwa WhatsApp dapat digunakan sebagai kanal pelaporan dan bantuan bagi warga. Kontribusi BELA adalah menggabungkan pre-screening berbasis aturan yang sumbernya dapat ditelusuri, tiga jalur layanan hukum keluarga dalam satu pilot wilayah, checklist dokumen yang dipersonalisasi, serta eskalasi paralegal untuk kasus di luar batas otomatisasi — dalam satu alur yang berkesinambungan. BELA tidak mengklaim sebagai layanan bantuan hukum digital pertama di Indonesia.
>
> Tabel berikut membandingkan posisi BELA terhadap solusi sejenis yang sudah ada, agar pembeda dapat dinilai secara objektif, bukan berdasarkan klaim sepihak. Kolom yang tidak dapat dipastikan dari sumber publik yang ditinjau ditandai eksplisit sebagai "tidak dibuktikan dalam sumber yang ditinjau", bukan diasumsikan tidak ada.

**Tambahkan tabel** (7 kolom: Solusi | Pengguna Utama | Kanal | Cakupan | Pre-screening Aturan | Eskalasi Manusia | Batas Pembanding):

| Solusi | Pengguna Utama | Kanal | Cakupan | Pre-screening Aturan | Eskalasi Manusia | Batas Pembanding |
|---|---|---|---|---|---|---|
| SAPA 129 | Korban/pelapor kekerasan perempuan & anak | Telepon, WhatsApp, form | Perlindungan kekerasan | Tidak dibuktikan dalam sumber yang ditinjau | Tersedia | Domain layanan berbeda dari bantuan hukum keluarga |
| SID Bankum | OBH dan verifikator | Web | Administrasi bantuan hukum | Workflow internal OBH | Tersedia dalam proses institusi | Ditujukan untuk institusi, bukan intake publik langsung |
| Posbakum/OBH (layanan langsung) | Pencari bantuan hukum | Tatap muka | Bantuan hukum umum | Tergantung petugas | Manusia sepenuhnya | Akses awal informasi masih tersebar dan manual |
| BELA | Warga target wilayah pilot | WhatsApp, PWA, dashboard | Prodeo, Posbakum, itsbat nikah | Ya — dapat ditelusuri ke rule engine | Ya, untuk kasus kompleks/berisiko | Cakupan masih satu wilayah pilot, belum tervalidasi lapangan |

**Tutup sub-bab dengan paragraf:**
> BELA tidak menciptakan hak hukum baru maupun menggantikan layanan bantuan hukum yang telah tersedia. Kontribusi yang diuji adalah penyatuan informasi, penyaringan awal yang transparan, dan rujukan manusia dalam alur yang lebih mudah dijalani warga pada wilayah pilot. Kebaruan ini bersifat kombinasi dan kontekstual; efektivitasnya perlu dibuktikan melalui uji lapangan, bukan diklaim selesai sejak tahap proposal.

---

## BAB II — Metodologi dan Perancangan

### 2.1 — tambahkan catatan status setelah 4 bullet Sprint

**Sisipkan setelah bullet "Sprint 3":**
> Untuk keperluan pengumpulan proposal ini, integrasi WhatsApp Business API resmi dari Meta memerlukan proses verifikasi bisnis yang melampaui jangka waktu kompetisi. Status implementasi setiap modul per tahap ini dicantumkan secara eksplisit pada Bab IV (lihat sub-bab status implementasi baru) agar tidak menyamakan rencana sprint dengan hasil pengembangan yang sudah selesai.

Juga ganti akhir bullet Sprint 0 dari "...sebagai dasar asumsi eskalasi pada Bab 4.1" menjadi "...sebagai hipotesis awal yang akan diuji (lihat Bab IV, sub-bab kelayakan pilot)".

---

### 2.2 — revisi kalimat penutup paragraf terakhir

**Cari kalimat ini:**
> "Dengan demikian WhatsApp tetap menjadi kanal teknis utama sistem, namun bukan syarat mutlak bagi warga secara individu untuk dapat terbantu."

**Ganti menjadi:**
> "Rancangan mode pendampingan ini dijelaskan lebih rinci pada Bab V (sub-bab aksesibilitas dan inklusi desain, ditambahkan)."

---

### 2.3 — perkuat batas kewenangan SKTM (poin revisi paling penting di bab ini)

**Sisipkan paragraf baru setelah paragraf yang diakhiri dengan** "...pemeriksaan ini sebatas memastikan dokumennya lengkap dan sesuai format, bukan menyatakan keasliannya." **dan sebelum** "Dua kondisi tepi turut ditangani...":

> Verifikasi kelayakan, penerimaan dokumen, dan keputusan akhir tetap berada sepenuhnya pada pengadilan atau instansi berwenang. Checklist BELA disusun mengikuti regulasi yang berlaku dan konfigurasi layanan setempat; bila ada ketidakpastian pada suatu kasus, sistem merujuk warga ke paralegal atau Posbakum, bukan memberi kepastian hukum atas nama sistem.

*(Ini menegaskan ulang batas kewenangan BELA secara eksplisit, bukan hanya tersirat.)*

---

### 2.5 — tambahkan catatan pemisahan visual

**Sisipkan setelah caption "Gambar 2.4 Mockup Antarmuka: Percakapan WhatsApp dan PWA Warga":**
> *Catatan: mockup Dashboard Paralegal, mockup high-fidelity WhatsApp/PWA versi lanjutan, serta storyboard kondisi kosong/error/darurat merupakan aset visual tambahan yang dikerjakan secara terpisah melalui jalur ilustrasi (lihat berkas design-brief-BELA.md) — bukan bagian dari revisi teks proposal.*

---

### 2.6 — tambahkan batas jujur soal fitur hapus riwayat

**Sisipkan paragraf baru setelah paragraf yang sudah ada** (yang diakhiri "...bukan dirancang secara ad hoc."):

> Perlu ditegaskan pula bahwa fitur penghapusan riwayat pada BELA hanya menghapus atau menonaktifkan data dalam sistem BELA sesuai kebijakan retensi. Fitur tersebut tidak dapat menjamin penghapusan salinan pesan, tangkapan layar, notifikasi, atau cadangan pada perangkat warga maupun layanan pihak ketiga (WhatsApp/Meta), karena hal ini berada di luar kendali BELA sebagai aplikasi pihak ketiga. Karena itu BELA menyediakan notifikasi generik, panduan pengamanan perangkat, dan jalur pendamping manusia sebagai lapisan mitigasi tambahan untuk situasi berisiko, bukan mengandalkan penghapusan riwayat semata.

---

### 2.7 — TAMBAHKAN SUB-BAB BARU: "Batas Keputusan dan Trigger Eskalasi"

**Posisi:** setelah 2.6 selesai, sebelum BAB III dimulai.

> Diagram alur berikut menegaskan titik-titik keputusan yang membatasi otomatisasi BELA agar tidak melampaui kewenangannya:
>
> 1. Warga menyampaikan cerita awal dalam bahasa sehari-hari
> 2. NLU mengklasifikasikan kebutuhan hukum — jika keyakinan (confidence) rendah, sistem tidak menebak, melainkan menampilkan klarifikasi/quick reply
> 3. Sistem memeriksa apakah kebutuhan termasuk dalam tiga layanan inti MVP — jika tidak, warga dirujuk ke Posbakum/paralegal
> 4. Sistem memeriksa kelengkapan data — jika belum cukup, ditampilkan checklist data minimum
> 5. Rule engine melakukan pre-screening berbasis regulasi resmi
> 6. Sistem memeriksa indikasi risiko/konflik data/permintaan nasihat hukum personal — jika ya, otomatisasi dihentikan dan kasus masuk antrean paralegal
> 7. Jika tidak ada indikasi risiko, sistem menampilkan checklist dokumen dan rujukan informasi
> 8. Keputusan resmi tetap sepenuhnya berada pada instansi/pengadilan berwenang
>
> Kondisi yang selalu memicu eskalasi ke paralegal manusia, tanpa terkecuali:
> - Risiko kekerasan atau ancaman langsung terhadap keselamatan warga
> - Kasus melibatkan anak, penyandang disabilitas, atau kebutuhan pendampingan khusus
> - Konflik data atau fakta yang tidak dapat diselesaikan sistem
> - Pertanyaan hukum personal di luar cakupan aturan yang sudah divalidasi
> - Tingkat keyakinan NLU rendah secara berulang dalam satu sesi
> - Kasus di luar tiga layanan inti MVP (sengketa tanah, waris, pidana)
> - Warga secara eksplisit meminta keputusan/representasi hukum dari sistem

---

### 2.8 — TAMBAHKAN SUB-BAB BARU: "Siklus Hidup Data"

**Posisi:** langsung setelah 2.7.

> 1. Persetujuan warga diminta di awal percakapan sebelum data apa pun disimpan
> 2. Input minimum dikumpulkan melalui WhatsApp/PWA, sesuai layanan yang dipilih warga
> 3. Data diproses untuk validasi dan pre-screening oleh rule engine
> 4. Kasus disimpan dalam basis data internal, akses dibatasi sesuai peran (RBAC)
> 5. Paralegal memperoleh akses hanya bila kasus dieskalasi, dicatat dalam audit log
> 6. Warga menerima notifikasi status yang bersifat generik, tanpa istilah hukum spesifik pada layar kunci
> 7. Data disimpan sesuai masa retensi minimum yang ditetapkan per jenis data
> 8. Data dihapus atau dianonimkan sesuai kebijakan retensi setelah kasus selesai atau atas permintaan warga

---

## BAB III — Eksplorasi Teknologi

### 3.3 — tambahkan penegasan batas penggunaan AI

**Sisipkan paragraf baru setelah bullet terakhir** ("Eskalasi manusia sebagai garis merah..."):

> Perlu ditegaskan bahwa kecerdasan buatan pada BELA digunakan secara terbatas dan disengaja: hanya pada lapisan pemahaman bahasa (NLU) untuk menerjemahkan kalimat warga, sementara keputusan pre-screening kelayakan hukum sepenuhnya dijalankan oleh mesin aturan deterministik yang bersumber langsung dari teks regulasi resmi — bukan oleh model AI generatif yang berisiko berhalusinasi atau memberi jawaban hukum yang keliru.

---

### 3.5 — TAMBAHKAN SUB-BAB BARU: "Rule Engine: Traceability dan Contoh Aturan"

**Posisi:** setelah 3.4 (Ringkasan Tech Stack), sebelum BAB IV.

> Setiap aturan dalam rule engine BELA dirancang agar dapat ditelusuri kembali ke pasal atau ketentuan resmi yang menjadi sumbernya, kondisi yang memicunya, serta output yang dihasilkan.

**Tabel Rule Traceability (ringkas):**

| Rule ID | Pertanyaan/Masukan | Output Sistem | Sumber Resmi | Trigger Eskalasi |
|---|---|---|---|---|
| PRO-01 | Kemampuan membayar biaya perkara | Indikasi perlu verifikasi kelayakan prodeo | UU No. 16/2011; Perma No. 1/2014 | Jawaban tidak lengkap/konflik data |
| POS-01 | Jenis kebutuhan bantuan hukum | Rujukan Posbakum/OBH terdekat | Data layanan Posbakum lokal | Kasus di luar tiga layanan inti MVP |
| ITS-01 | Status pencatatan pernikahan | Checklist konsultasi itsbat nikah | Aturan itsbat nikah terkait | Risiko kekerasan/konflik fakta |

**Tambahkan contoh satu rule lengkap** (format kode/monospace agar terlihat teknis):

```
Rule ID: PRO-01
Tujuan: mengarahkan warga ke pemeriksaan kelayakan prodeo.
Input: domisili, jenis perkara, pernyataan kondisi ekonomi, ketersediaan dokumen.
Jika: data belum lengkap atau NLU confidence rendah → tampilkan klarifikasi/quick reply; jangan berikan hasil.
Jika: data cukup untuk pre-screening → tampilkan "perlu verifikasi resmi", checklist dokumen, dan rujukan Posbakum/pengadilan.
Jika: terdapat konflik data, ancaman keselamatan, atau pertanyaan di luar cakupan → hentikan otomatisasi dan masukkan antrean paralegal.
Batas: BELA tidak menetapkan kelayakan akhir maupun keaslian dokumen.
Sumber: Perma No. 1 Tahun 2014 tentang Pedoman Pemberian Layanan Hukum bagi Masyarakat Tidak Mampu di Pengadilan.
```

---

### 3.6 — TAMBAHKAN SUB-BAB BARU: "Privasi dan Keamanan Operasional"

**Posisi:** langsung setelah 3.5.

> BELA dirancang menerapkan minimisasi data: sistem hanya meminta data yang diperlukan untuk layanan yang dipilih warga. Akses dashboard dibatasi berdasarkan peran dan wilayah kerja; setiap akses maupun perubahan status kasus dirancang untuk dicatat dalam audit log.
>
> Rancangan ini belum diklaim sebagai "aman sepenuhnya" atau "sesuai UU PDP secara penuh" — kepatuhan menyeluruh terhadap UU No. 27/2022 tentang Pelindungan Data Pribadi memerlukan audit hukum dan teknis independen yang direncanakan sebagai bagian dari Sprint 0 dan Sprint 3, bukan diklaim selesai sejak tahap proposal.

**Tabel Threat Model:**

| Ancaman | Dampak | Mitigasi Desain | Batasan |
|---|---|---|---|
| Perangkat dibuka pasangan/pelaku | Informasi kasus terekspos | Notifikasi generik, quick exit, panduan hapus riwayat lokal | BELA tidak mengendalikan perangkat pengguna |
| Magic link diteruskan | Akun/kasus diakses orang lain | Token sekali pakai, kedaluwarsa singkat | URL tetap dapat terlihat pada perangkat penerima |
| Akses berlebih staf internal | Kebocoran data | RBAC, least privilege, audit log | Memerlukan SOP operasional konsisten |
| Perangkat kader menyimpan data | Kebocoran identitas warga | Sesi terpisah, logout otomatis, larangan unduh | Perangkat kader tetap berisiko di luar kendali sistem |
| Data tersimpan terlalu lama | Dampak kebocoran membesar | Retensi minimum, penghapusan terjadwal | Kebutuhan hukum dapat membatasi penghapusan |
| Notifikasi mengungkap jenis perkara | Risiko keselamatan warga | Pesan netral tanpa istilah hukum spesifik | Metadata WhatsApp tetap dapat terlihat |

---

## BAB IV — Evaluasi Kesesuaian

### 4.0 — TAMBAHKAN SUB-BAB BARU DI AWAL BAB IV: "Status Implementasi"

**Posisi:** sebelum "4.1 Evaluasi Mandiri", sebagai pembuka Bab IV.

> Tabel berikut membedakan rancangan, prototipe, dan fungsi yang telah diuji, agar klaim implementasi dapat ditelusuri dan tidak menyamakan rencana sprint dengan hasil pengembangan yang sudah selesai.

| Fitur/Modul | Status Saat Pengajuan | Batasan Saat Ini | Target Berikutnya |
|---|---|---|---|
| Alur percakapan WhatsApp | Rancangan alur + mockup visual | Belum terhubung ke WhatsApp Business API resmi | Prototipe interaktif dengan simulasi percakapan |
| Rule engine prodeo/Posbakum/itsbat nikah | Rancangan logika | Belum diimplementasikan sebagai kode berjalan | Implementasi + rule matrix teruji pada Sprint 2 |
| PWA status kasus dan peta | Mockup visual | Data jadwal masih rencana kurasi manual | Prototipe interaktif Sprint 1–2 |
| Dashboard paralegal | Rancangan komponen | Belum diuji bersama mitra paralegal | Mockup interaktif + uji alur kerja |
| Notifikasi status kasus | Rancangan alur | Bergantung biaya per-percakapan WhatsApp Business API | Simulasi log notifikasi |

---

### 4.1 — dua revisi kalimat penting

**Cari kalimat ini:**
> "...tersebar di ratusan sistem yang berdiri sendiri per pengadilan, tanpa satu API terpadu."

**Ganti menjadi:**
> "...tersebar di ratusan sistem yang berdiri sendiri per pengadilan, tanpa satu API terpadu yang dibuktikan tersedia untuk kebutuhan BELA."

---

**Cari kalimat ini** (paragraf kapasitas paralegal):
> "Kapasitas paralegal juga menjadi pertimbangan sadar, bukan asumsi kosong."

**Ganti kalimat pembuka paragraf itu menjadi:**
> "Estimasi volume eskalasi paralegal merupakan hipotesis operasional awal, bukan kapasitas yang telah dikonfirmasi mitra."

Dan di akhir paragraf yang sama, **cari:**
> "...bukan sekadar diasumsikan di atas kertas."

**Tambahkan setelahnya:**
> "Validasi ini dijadwalkan sebagai bagian dari deliverable Sprint 0 dan dirinci lebih lanjut pada Bab IV (sub-bab kelayakan pilot, ditambahkan)."

---

### 4.3.1 — TAMBAHKAN SUB-SUB-BAB BARU: "Studi Kasus End-to-End (Anonim)"

**Posisi:** setelah 4.3 (Penjelasan Lingkup MVP), sebelum 4.4 (Indikator Keberhasilan).

> Tokoh bersifat anonim ("Warga A") sebagai ilustrasi rancangan, bukan transkrip kasus nyata.

| Tahap | Input/Aksi | Respons BELA | Batas Keputusan |
|---|---|---|---|
| Cerita awal | "Saya ingin mengurus surat cerai tapi tidak ada biaya" | Klasifikasi awal oleh NLU (prodeo) | Tidak ada keputusan hukum |
| Klarifikasi | Warga A menjawab quick reply | Identifikasi jalur layanan | Hanya pre-screening |
| Kelayakan awal | Warga A tidak punya penghasilan tetap | Checklist awal + rujuk rule PRO-01 | Pengadilan tetap memutus |
| Dokumen | Warga A kirim foto SKTM | Cek kelengkapan format oleh paralegal | Tidak memverifikasi keaslian |
| Eskalasi | Sistem deteksi konflik data domisili | Kasus masuk antrean paralegal | Respons selanjutnya oleh manusia |
| Rujukan | Paralegal konfirmasi kelayakan awal | Jadwal sidang & lokasi Posbakum dikirim | Jadwal ditandai "perlu konfirmasi" bila belum terverifikasi |

---

### 4.4 — relabel tabel indikator keberhasilan

**Ganti header kolom** "Target Enam Bulan Pertama" **menjadi** "Target Pilot (Enam Bulan Pertama)", dan **tambahkan kolom ketiga** "Status Saat Ini" berisi "Target pilot — belum tersedia hasil uji" di setiap baris.

**Sisipkan paragraf baru sebelum tabel:**
> Label "Target Pilot" digunakan secara konsisten pada tabel ini untuk membedakan sasaran yang belum tercapai dari hasil uji yang sudah benar-benar diukur.

---

### 4.5 — TAMBAHKAN SUB-BAB BARU: "Baseline dan Rencana Pengukuran Dampak"

**Posisi:** setelah 4.4, sebelum BAB V.

Berisi tiga bagian:
1. **Rencana Pengumpulan Baseline** — metode wawancara singkat dengan calon pengguna/kader PEKKA, dengan tabel metrik baseline (waktu memahami syarat, proporsi berkas lengkap, jumlah kunjungan) — status "Direncanakan pada Sprint 0, belum dilaksanakan".
2. **Definisi Metrik Operasional** — tabel definisi presisi untuk completion rate, routing agreement, checklist completeness, median time to checklist, human response SLA (lengkap dengan rumus).
3. **Label Integritas Data** — empat label konsisten: *Target pilot* / *Proyeksi* / *Hasil uji* / *Tidak tersedia*, dengan contoh penerapan pada angka 1.440 warga di Bab V.3.c.

*(Isi lengkap tabel-tabel ini identik dengan yang ada di dokumen docx revisi sebelumnya — beri tahu saya kalau kamu mau saya tulis ulang detail tabelnya di sini.)*

---

### 4.6 — TAMBAHKAN SUB-BAB BARU: "Kelayakan Pilot"

**Posisi:** setelah 4.5, sebelum BAB V.

Berisi empat bagian:
1. **Validasi Asumsi Kapasitas** — tabel asumsi (300 percakapan/bulan, rasio eskalasi 20-30%, SLA, jadwal) dengan cara validasi dan keputusan jika gagal.
2. **Pilot Readiness Canvas** — tabel pihak (Pengadilan Praya, OBH/paralegal, PEKKA/kader, Kantor Desa, Tim BELA) dengan peran, bukti komitmen (rencana, bukan konfirmasi tertulis), risiko, mitigasi.
3. **Service Blueprint dan Target SLA** — tabel kondisi → respons sistem → tindakan manusia → fallback.
4. **Tata Kelola Kalender Sidang Keliling** — tabel sumber data jadwal dengan status "Perlu konfirmasi" bila belum terverifikasi.

---

### 4.7 — TAMBAHKAN SUB-BAB BARU: "Asumsi dan Batasan"

**Posisi:** penutup Bab IV, sebelum BAB V.

Tabel 6 baris: SIPP, jadwal sidang keliling, bahasa Sasak, keputusan hukum akhir, data pribadi warga, kapasitas mitra paralegal — masing-masing dengan kondisi saat ini, dampak, dan mitigasi/keputusan.

---

## BAB V — Analisis Potensi Pengguna

### 5.2 — revisi kalimat penutup

**Cari kalimat ini:**
> "...sehingga warga hanya perlu benar-benar bepergian satu kali, yaitu saat berkasnya sudah lengkap dan jadwalnya sudah pasti."

**Ganti menjadi:**
> "...sehingga warga idealnya hanya perlu benar-benar bepergian satu kali, yaitu saat berkasnya sudah lengkap dan jadwalnya sudah pasti — capaian ini akan diukur langsung melalui metrik completion rate dan checklist completeness selama pilot berjalan."

---

### 5.3.c — tambahkan label "proyeksi" pada angka dampak

**Cari kalimat ini:**
> "...berpotensi menghasilkan sekitar 3.600 percakapan pengecekan kelayakan, dengan perkiraan konservatif 40 persen atau sekitar 1.440 warga benar-benar terhubung..."

**Ganti menjadi:**
> "...berpotensi menghasilkan **proyeksi** sekitar 3.600 percakapan pengecekan kelayakan, dengan perkiraan konservatif 40 persen atau **proyeksi** sekitar 1.440 warga benar-benar terhubung ke sidang keliling atau Posbakum yang sebelumnya tidak mereka ketahui keberadaannya. Angka-angka ini adalah proyeksi berbasis asumsi target volume (bukan hasil uji) dan akan direvisi setelah baseline serta hasil pilot benar-benar tersedia."

---

### 5.4 — TAMBAHKAN SUB-BAB BARU: "Aksesibilitas dan Inklusi Desain"

**Posisi:** setelah 5.3, sebelum BAB VI.

> Aksesibilitas BELA dinilai melalui penyelesaian tugas, bukan sekadar tampilan visual. Dukungan Bahasa Sasak belum diklaim selesai pada MVP dan akan divalidasi bersama penutur asli serta mitra lokal sebelum diterapkan.

Spesifikasi (bullet list): ukuran teks & kontras, tombol quick reply besar, tidak mengandalkan ikon tanpa teks, bahasa sederhana, pilihan input teks/voice note/menu, kompatibilitas layar kecil & koneksi tidak stabil, mode pendamping kader.

**Sub-sub-bab 5.4.1 — Rancangan Mode Pendamping Kader** (bullet list SOP): kader memilih mode eksplisit, persetujuan warga direkam, case ID berbeda per warga, data tidak disimpan di galeri kader, sesi otomatis logout, skrip batas peran kader, warga bisa mengambil alih/hapus akses kader.

---

## BAB VI — Kesimpulan dan Rekomendasi

### 6.1 — tambahkan kalimat penutup yang merujuk balik ke Bab I.4 dan Bab IV

**Sisipkan di akhir paragraf** (setelah "...sejalan langsung dengan target SDG 16.3 dan 16.9."):
> Sebagaimana ditegaskan pada Bab I.4, kontribusi ini bersifat kombinasi dan kontekstual, dan efektivitasnya akan dibuktikan melalui uji lapangan sebagaimana dirancang pada Bab IV, bukan diklaim selesai sejak tahap proposal.

---

## LAMPIRAN — TAMBAHKAN BAGIAN BARU (posisi: setelah Bab VI, sebelum Daftar Pustaka)

- **Lampiran A** — Rule Traceability Matrix versi lengkap (semua rule ID, kondisi detail, kolom "versi/tanggal cek" dan "ditinjau oleh" — catatan: kolom ini baru bisa diisi setelah sesi tinjauan bersama mitra hukum pada Sprint 0, jujurkan sebagai belum diisi).
- **Lampiran B** — rujukan silang ke Pilot Readiness Canvas di Bab IV.6.

---

## Daftar Pustaka

**Tambahkan entri baru di akhir daftar:**
> Kementerian Pemberdayaan Perempuan dan Perlindungan Anak. Layanan SAPA 129: Layanan Pengaduan Kekerasan Perempuan dan Anak. Dirujuk pada Bab I.4 sebagai pembanding kanal WhatsApp untuk layanan publik.

**Tambahkan catatan di akhir daftar pustaka (opsional, italic, ukuran font lebih kecil):**
> *Setiap tautan pada daftar pustaka ini sebaiknya dibuka ulang sebelum pengumpulan akhir, terutama sumber bertahun 2026, untuk memastikan masih dapat diakses saat dinilai juri.*

---

## Ringkasan Peta Perubahan (untuk dicentang satu per satu)

| # | Bab/Posisi | Jenis Perubahan |
|---|---|---|
| 1 | 1.2 poin 1 | Ganti kalimat |
| 2 | 1.3a | Ganti kalimat |
| 3 | **1.4 (baru)** | Tambah sub-bab + tabel pembanding |
| 4 | 2.1 | Tambah catatan + ganti akhir bullet Sprint 0 |
| 5 | 2.2 | Ganti kalimat penutup |
| 6 | 2.3 | Tambah paragraf batas kewenangan |
| 7 | 2.5 | Tambah catatan pemisahan visual |
| 8 | 2.6 | Tambah paragraf batas hapus riwayat |
| 9 | **2.7 (baru)** | Tambah sub-bab batas keputusan |
| 10 | **2.8 (baru)** | Tambah sub-bab siklus hidup data |
| 11 | 3.3 | Tambah paragraf batas AI |
| 12 | **3.5 (baru)** | Tambah sub-bab rule traceability |
| 13 | **3.6 (baru)** | Tambah sub-bab privasi & threat model |
| 14 | **4.0 (baru)** | Tambah tabel status implementasi |
| 15 | 4.1 | Ganti 2 kalimat (SIPP + kapasitas) |
| 16 | **4.3.1 (baru)** | Tambah studi kasus end-to-end |
| 17 | 4.4 | Relabel tabel + tambah kolom status |
| 18 | **4.5 (baru)** | Tambah baseline & definisi metrik |
| 19 | **4.6 (baru)** | Tambah kelayakan pilot (4 tabel) |
| 20 | **4.7 (baru)** | Tambah asumsi & batasan |
| 21 | 5.2 | Ganti kalimat penutup |
| 22 | 5.3.c | Tambah label "proyeksi" |
| 23 | **5.4 (baru)** | Tambah aksesibilitas & mode pendamping |
| 24 | 6.1 | Tambah kalimat penutup |
| 25 | **Lampiran (baru)** | Tambah bagian lampiran |
| 26 | Daftar Pustaka | Tambah 1 entri + 1 catatan |

Total: **9 sub-bab baru**, **~15 revisi kalimat/paragraf** pada teks yang sudah ada.
