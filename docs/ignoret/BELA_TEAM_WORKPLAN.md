# Rencana Kerja Tim Proposal dan Tim Programmer BELA

Dokumen ini membagi pekerjaan paralel antara:

- **Tim Penyusun Proposal (Non-Teknis):** riset, narasi, validasi klaim, visual dokumen, perencanaan pilot, metrik, dan penyatuan bukti.
- **Tim Programmer:** MVP, pengujian teknis, dokumentasi, demo, screenshot, dan bukti implementasi.

Tujuan utama: proposal terus berkembang tanpa menunggu aplikasi selesai, sementara tim programmer membangun bukti minimum yang langsung menaikkan skor lomba.

> Placeholder boleh digunakan selama pengerjaan internal. Sebelum proposal dikumpulkan, semua placeholder harus diganti bukti nyata, diberi label `belum tersedia`, atau dihapus. Jangan membiarkan tautan palsu, QR kosong, logo mitra tanpa izin, atau klaim fitur selesai tanpa bukti.

## 1. Strategi Pengerjaan

Gunakan tiga jalur secara paralel:

1. **Jalur A — Proposal dapat dikerjakan sekarang:** tidak bergantung pada kode.
2. **Jalur B — MVP teknis:** tim programmer membangun satu alur end-to-end.
3. **Jalur C — Integrasi bukti:** hasil programmer dimasukkan ke proposal oleh tim non-teknis.

Jangan menunggu seluruh sistem selesai. Target teknis lomba bukan produk nasional. Targetnya adalah satu alur pilot yang dapat diuji dan konsisten dengan proposal.

## 2. Status yang Boleh Dipakai

Gunakan status berikut secara konsisten pada proposal dan laporan tim:

| Status | Arti | Bukti minimum |
|---|---|---|
| Rancangan | baru berupa narasi/diagram | dokumen atau diagram |
| Mockup | tampilan statis | gambar/Figma |
| Prototipe interaktif | alur dapat diklik, belum memakai backend nyata | URL Figma/demo |
| Berjalan lokal | kode bekerja pada komputer pengembang | video dan README |
| Berjalan di staging | aplikasi dapat diakses lewat URL | URL dan akun demo |
| Diuji terbatas | telah dipakai pada skenario uji | hasil pengujian |
| Produksi terbatas | digunakan oleh pengguna/mitra nyata | log dan konfirmasi mitra |

Jangan memakai kata `MVP berjalan` jika baru ada mockup.

---

# Bagian I — Tim Penyusun Proposal

## 3. Pekerjaan yang Dapat Dimulai Sekarang

### 3.1 Tambahkan tabel Status Implementasi

**Letak:** awal Bab IV.

Gunakan isi sementara berikut, lalu perbarui dari laporan programmer:

| Modul | Status | Bukti | Batasan |
|---|---|---|---|
| Percakapan warga | `[STATUS_CHAT]` | `[LINK_DEMO_CHAT]` | tiga layanan MVP |
| Rule engine | `[STATUS_RULE_ENGINE]` | `[LINK_TEST_RULE]` | pre-screening, bukan keputusan hukum |
| PWA warga | `[STATUS_PWA]` | `[LINK_PWA]` | data pilot/sintetis |
| Dashboard paralegal | `[STATUS_DASHBOARD]` | `[LINK_DASHBOARD]` | belum/telah diuji oleh mitra |
| Notifikasi status | `[STATUS_NOTIFIKASI]` | `[LINK_VIDEO_NOTIFIKASI]` | simulasi/API nyata harus dijelaskan |
| Data jadwal dan OBH | `[STATUS_DATA]` | `[LINK_SUMBER_DATA]` | pembaruan manual pada pilot |

**Pemilik:** koordinator proposal.

**Selesai jika:** semua status sesuai bukti terbaru dan tidak ada klaim berlebihan.

### 3.2 Tambahkan posisi kebaruan BELA

**Letak:** akhir Bab I, sebelum metodologi.

**Draf:**

> BELA tidak mengklaim sebagai layanan bantuan hukum digital atau layanan berbasis WhatsApp pertama. Kebaruan yang diajukan adalah kombinasi pre-screening berbasis aturan yang sumbernya dapat ditelusuri, checklist dokumen yang dipersonalisasi, rujukan lokal, dan eskalasi paralegal dalam satu alur untuk tiga layanan hukum keluarga pada wilayah pilot. Efektivitas kombinasi ini akan dinilai melalui pengujian alur dan validasi bersama pendamping hukum.

**Tambahkan tabel pembanding:**

| Solusi | Pengguna | Kanal | Cakupan | Rule traceability | Human handoff | Status tracking |
|---|---|---|---|---|---|---|
| SAPA 129 | `[ISI_BERDASARKAN_SUMBER]` | WhatsApp/telepon/form | kekerasan perempuan dan anak | tidak dibuktikan pada sumber yang ditinjau | ya | `[BELUM_DIVERIFIKASI]` |
| SID Bankum | OBH/verifikator | web | administrasi bantuan hukum | workflow institusi | proses institusi | ya |
| Posbakum/OBH lokal | pencari bantuan hukum | layanan langsung/kanal lokal | bervariasi | bervariasi | ya | bervariasi |
| BELA | warga pilot | chat/PWA | prodeo, Posbakum, itsbat nikah | dirancang tersedia | ya | dirancang tersedia |

**Pemilik:** tim riset.

**Selesai jika:** setiap fakta pembanding memiliki URL dan tanggal akses.

### 3.3 Perbaiki batas keputusan hukum

**Letak:** Bab II setelah flowchart dan Bab III setelah rule engine.

**Draf:**

> BELA memberikan pre-screening informatif, bukan penetapan kelayakan atau nasihat hukum final. Verifikasi dokumen, penerimaan permohonan, dan keputusan resmi tetap menjadi kewenangan pengadilan atau instansi terkait. Jika data tidak lengkap, bertentangan, berada di luar tiga layanan MVP, atau memerlukan pertimbangan hukum personal, sistem menghentikan otomatisasi dan menawarkan eskalasi manusia.

**Hapus/perbaiki:** kalimat yang menjadikan SKTM satu-satunya bukti universal tanpa kutipan pasal dan validasi praktik lokal.

**Pemilik:** penulis hukum/riset.

### 3.4 Susun Rule Traceability Matrix

Tim non-teknis menetapkan isi hukum. Programmer hanya menerapkan aturan yang telah disetujui.

| Rule ID | Layanan | Pertanyaan | Kondisi | Output aman | Sumber/pasal | Status validasi |
|---|---|---|---|---|---|---|
| PRO-01 | Prodeo | `[PERTANYAAN]` | `[KONDISI]` | klarifikasi/checklist/eskalasi | `[SUMBER_RESMI]` | `[BELUM/VALID]` |
| POS-01 | Posbakum | `[PERTANYAAN]` | `[KONDISI]` | rujukan informasi | `[SUMBER_RESMI]` | `[BELUM/VALID]` |
| ITS-01 | Itsbat nikah | `[PERTANYAAN]` | `[KONDISI]` | checklist konsultasi | `[SUMBER_RESMI]` | `[BELUM/VALID]` |

**Aturan kerja:**

- satu rule memiliki satu ID stabil;
- setiap rule mencantumkan sumber dan tanggal pemeriksaan;
- output menggunakan kata `indikasi`, `langkah awal`, atau `perlu verifikasi`;
- rule yang belum divalidasi tidak boleh dipakai untuk klaim hukum nyata;
- perubahan rule dicatat dalam changelog.

**Pemilik:** tim riset hukum.

**Handoff ke programmer:** spreadsheet/JSON final beserta expected output.

### 3.5 Susun diagram batas keputusan

Tim proposal dapat membuat visual sebelum aplikasi selesai:

```text
Cerita warga
   ↓
NLU/routing yakin? ── tidak ──→ klarifikasi atau quick reply
   │ ya
   ↓
Dalam layanan MVP? ── tidak ──→ rujuk Posbakum/paralegal
   │ ya
   ↓
Data cukup? ── tidak ──→ minta data minimum
   │ ya
   ↓
Pre-screening rule engine
   ↓
Risiko/konflik/pertanyaan personal? ── ya ──→ paralegal
   │ tidak
   ↓
Checklist dan rujukan informasi
   ↓
Keputusan resmi instansi
```

**Placeholder gambar:** `[GAMBAR_DIAGRAM_BATAS_KEPUTUSAN]`.

### 3.6 Susun studi kasus end-to-end

Gunakan data sintetis. Jangan menggunakan identitas atau kasus asli.

| Tahap | Aksi warga | Respons BELA | Rule/bukti | Batasan |
|---|---|---|---|---|
| Cerita awal | `[CONTOH_PESAN]` | klasifikasi awal | `[RULE_ID]` | belum memberi keputusan |
| Klarifikasi | memilih quick reply | pertanyaan lanjutan | `[RULE_ID]` | data minimum |
| Pre-screening | menjawab pertanyaan | hasil indikatif | `[PASAL]` | wajib verifikasi resmi |
| Dokumen | memilih dokumen tersedia | checklist | `[RULE_ID]` | tidak menilai keaslian |
| Eskalasi | kasus kompleks | tiket paralegal | `[TRIGGER]` | respons manusia |
| Rujukan | menerima lokasi/jadwal | langkah berikutnya | `[SUMBER_JADWAL]` | cek tanggal verifikasi |

Setelah programmer selesai, ganti teks respons dengan screenshot aplikasi.

### 3.7 Susun Threat Model

Tim proposal menetapkan risiko dan requirement; programmer membuktikan mitigasi teknis.

| Ancaman | Requirement proposal | Bukti yang diminta dari programmer |
|---|---|---|
| magic link diteruskan | token singkat, sekali pakai, kedaluwarsa | test replay/expired token |
| akses paralegal berlebih | role-based access | matriks akses dan screenshot penolakan |
| notifikasi membuka informasi | pesan generik | screenshot notifikasi |
| data terlalu lama tersimpan | kebijakan retensi | konfigurasi/job penghapusan atau desain |
| perangkat kader bersama | mode pendamping dan logout | demo sesi terpisah |
| perubahan data tanpa jejak | audit log | log perubahan status |

**Catatan:** jika mitigasi belum dibangun, tulis `rancangan keamanan`, bukan `telah diamankan`.

### 3.8 Susun data lifecycle

```text
Persetujuan → Input minimum → Pre-screening → Penyimpanan kasus
→ Akses paralegal bila perlu → Notifikasi → Penutupan
→ Penghapusan/anonimisasi sesuai kebijakan
```

Untuk setiap tahap, isi:

- data yang diproses;
- tujuan;
- pihak yang dapat mengakses;
- masa simpan;
- mekanisme penghapusan;
- ketergantungan pihak ketiga.

**Placeholder visual:** `[GAMBAR_DATA_LIFECYCLE]`.

### 3.9 Susun Pilot Readiness Canvas

| Pihak | Peran yang diharapkan | Status hubungan | Bukti | Risiko jika tidak tersedia | Fallback |
|---|---|---|---|---|---|
| PA/PN/Posbakum pilot | validasi proses dan jadwal | `[BELUM_DISETUJUI/DIHUBUNGI/SETUJU]` | `[LINK_NOTULEN_LOI]` | checklist tidak tervalidasi | label informasi umum |
| OBH/paralegal | review rule dan eskalasi | `[STATUS]` | `[BUKTI]` | antrean tidak ditangani | demo dengan kasus sintetis |
| PEKKA/kader | uji alur warga | `[STATUS]` | `[BUKTI]` | validasi pengguna terbatas | uji proxy, beri batasan |
| Desa | validasi alur administratif | `[STATUS]` | `[BUKTI]` | variasi lokal tidak diketahui | konfigurasi pilot manual |

**Jangan:** menampilkan logo sebagai mitra resmi jika baru direncanakan untuk dihubungi.

### 3.10 Susun service blueprint

Buat visual dengan lima lajur:

1. warga;
2. chat/PWA;
3. rule engine/backend;
4. paralegal;
5. pengadilan/Posbakum/OBH.

Tandai:

- titik handoff;
- data yang berpindah;
- jam layanan;
- target SLA;
- fallback saat mitra tidak tersedia;
- penutupan kasus.

**Placeholder:** `[GAMBAR_SERVICE_BLUEPRINT]`.

### 3.11 Susun metrik dan baseline

Pisahkan empat jenis angka:

- **baseline:** keadaan sebelum BELA, sudah diukur;
- **hasil uji:** hasil nyata dari sampel;
- **target:** sasaran masa depan;
- **proyeksi:** hitungan berbasis asumsi.

| Metrik | Jenis | Definisi/rumus | Sumber | Nilai | Keterbatasan |
|---|---|---|---|---:|---|
| completion rate | hasil uji/target | selesai ÷ mulai | event log | `[NILAI]` | `[BATASAN]` |
| median waktu checklist | hasil uji/target | median waktu selesai-awal | event log | `[NILAI]` | `[BATASAN]` |
| routing agreement | hasil uji | disetujui reviewer ÷ direview | form paralegal | `[NILAI]` | sampel kecil |
| checklist completeness | baseline/hasil | lengkap ÷ kasus direview | audit checklist | `[NILAI]` | variasi lokal |
| SLA eskalasi | target/hasil | tiket sesuai SLA ÷ tiket | dashboard | `[NILAI]` | jam layanan |

**Perbaikan wajib:** angka 1.440 warga/tahun harus dilabeli `proyeksi`, bukan hasil.

### 3.12 Persiapkan metode uji pengguna

Tim proposal menyusun protokol. Programmer menyediakan aplikasi dan event log.

**Sampel minimum:**

- 10–20 pengguna target atau proxy yang dijelaskan;
- 2–3 paralegal/kader/petugas sebagai reviewer;
- 3 skenario sintetis, satu per layanan MVP.

**Tugas peserta:**

1. mulai dari cerita singkat;
2. menyelesaikan klarifikasi;
3. memahami hasil pre-screening;
4. menemukan checklist;
5. menjelaskan langkah berikutnya;
6. mencoba satu kondisi error.

**Catat:** waktu, completion, salah tekan, pertanyaan, pemahaman, dan komentar. Minta persetujuan; jangan meminta peserta menceritakan perkara sensitif asli.

### 3.13 Audit referensi

Buat spreadsheet sumber:

| ID | Judul | Penerbit | URL | Tanggal akses | Klaim yang didukung | Primer/sekunder | Status |
|---|---|---|---|---|---|---|---|
| S1 | `[JUDUL]` | `[PENERBIT]` | `[URL]` | `[TANGGAL]` | `[KLAIM]` | primer | terbuka |

Prioritaskan:

- JDIH Mahkamah Agung;
- peraturan.go.id/JDIH resmi;
- BPHN/SID Bankum;
- situs resmi pengadilan;
- dokumen resmi PEKKA/mitra riset yang dapat ditelusuri.

Hapus atau ganti sumber 2026 yang tidak dapat dibuka. Jangan membuat judul, angka, tahun, atau URL.

### 3.14 Siapkan slot visual

Placeholder yang boleh dipakai selama drafting:

```text
[QR_DEMO_MVP]
[LINK_GITHUB]
[LINK_STAGING]
[GAMBAR_CHAT_FLOW]
[GAMBAR_PWA_WARGA]
[GAMBAR_DASHBOARD_PARALEGAL]
[GAMBAR_ERROR_STATE]
[GAMBAR_SERVICE_BLUEPRINT]
[GAMBAR_DATA_LIFECYCLE]
[GRAFIK_HASIL_UJI]
```

**Aturan placeholder:**

- gunakan format seragam `[NAMA_PLACEHOLDER]` agar mudah dicari;
- tulis pemilik dan tenggat pada tracker, bukan di proposal final;
- jangan membuat QR sebelum URL final stabil;
- kosongkan ruang gambar secukupnya, tetapi jangan mengorbankan keterbacaan;
- sebelum ekspor final, cari semua pola `\[` dan periksa manual.

---

# Bagian II — Tim Programmer

## 4. Sasaran Teknis Minimum

Bangun satu vertical slice, bukan seluruh visi nasional:

```text
Chat simulasi warga
→ pertanyaan terstruktur
→ rule engine terversi
→ hasil pre-screening/checklist
→ eskalasi paralegal
→ dashboard mengubah status
→ warga melihat status/notifikasi simulasi
```

Tidak wajib untuk lomba tahap proposal:

- integrasi SIPP nasional;
- AI generatif;
- NLP Bahasa Sasak penuh;
- scraping ratusan pengadilan;
- aplikasi native;
- pembayaran;
- infrastruktur skala nasional.

## 5. Backlog Programmer Berdasarkan Prioritas

### P0. Fondasi demo

#### P0.1 Repository dan dokumentasi

**Kerjakan:**

- repository GitHub private/public sesuai strategi tim;
- `README.md` berisi masalah, cakupan MVP, cara menjalankan, akun demo, arsitektur singkat;
- `.env.example`, tanpa secret;
- data demo sintetis;
- lisensi/status penggunaan kode bila repositori dibuka.

**Bukti untuk proposal:**

- `[LINK_GITHUB]`;
- screenshot README;
- commit hash versi demo.

**Selesai jika:** anggota tim lain dapat menjalankan proyek dari README.

#### P0.2 Chat simulasi

**Kerjakan:** antarmuka chat web yang meniru pola percakapan, bukan integrasi WhatsApp asli terlebih dahulu.

**Wajib:**

- pesan awal;
- quick reply;
- klarifikasi;
- indikator batas layanan;
- output checklist;
- tombol eskalasi;
- data sintetis.

**Tidak perlu:** menyalin UI WhatsApp secara identik atau memakai API berbayar sebelum alur terbukti.

**Bukti:** `[LINK_DEMO_CHAT]`, video, screenshot.

#### P0.3 Rule engine deterministik

**Kerjakan:** baca aturan dari JSON/konfigurasi terversi; jangan hard-code narasi hukum tersebar di komponen UI.

Contoh bentuk data:

```json
{
  "id": "PRO-01",
  "version": "2026-01",
  "question": "...",
  "conditions": [],
  "outcome": "needs_official_verification",
  "source": {
    "title": "...",
    "article": "...",
    "url": "..."
  },
  "escalateWhen": []
}
```

**Wajib:** hasil menampilkan rule ID/sumber; tidak menghasilkan keputusan final.

**Bukti:** screenshot rule trace, file konfigurasi, test output.

#### P0.4 Dashboard paralegal minimum

**Kerjakan satu layar fungsional:**

- daftar tiket;
- alasan eskalasi;
- jawaban terstruktur;
- rule ID dan sumber;
- status tiket;
- tindakan minta klarifikasi/rujuk/tutup;
- timestamp perubahan.

**Bukti:** `[LINK_DASHBOARD]`, screenshot sebelum/sesudah status berubah.

#### P0.5 Status warga

**Kerjakan:** halaman PWA sederhana dengan status `Berkas`, `Jadwal`, `Sidang`, `Selesai`, tetapi hanya tampilkan status yang benar-benar berasal dari data demo/backend.

**Bukti:** `[LINK_PWA]`, video perubahan status dashboard muncul pada PWA.

#### P0.6 Deployment staging

**Kerjakan:** URL stabil untuk penilaian.

**Wajib:**

- HTTPS;
- akun demo mudah digunakan;
- data dummy;
- seed/reset demo;
- halaman error yang jelas;
- tidak ada secret pada client/repository.

**Bukti:** `[LINK_STAGING]`, akun demo, tanggal deploy.

### P1. Keandalan dan bukti teknis

#### P1.1 Test rule engine

Buat test case minimum:

| Kasus | Input | Expected | Rule | Status |
|---|---|---|---|---|
| data lengkap dalam cakupan | sintetis | checklist + verifikasi resmi | PRO-01 | pass/fail |
| data kurang | sintetis | pertanyaan klarifikasi | PRO-01 | pass/fail |
| di luar cakupan | sintetis | eskalasi/rujukan | OUT-01 | pass/fail |
| data bertentangan | sintetis | eskalasi | SAFE-01 | pass/fail |
| risiko keselamatan | sintetis | safe response + human handoff | SAFE-02 | pass/fail |

**Bukti:** output test otomatis atau rekaman test manual terstruktur.

#### P1.2 Event logging untuk metrik

Catat event minimum tanpa menyimpan isi sensitif yang tidak diperlukan:

- `session_started`;
- `clarification_requested`;
- `flow_completed`;
- `checklist_generated`;
- `escalation_created`;
- `escalation_answered`;
- `status_changed`;
- `error_occurred`.

Sediakan ekspor agregat untuk completion rate dan waktu menuju checklist.

#### P1.3 Role-based access

Role minimum:

- `citizen_demo`;
- `paralegal`;
- `admin`.

Uji bahwa warga tidak dapat membuka dashboard; paralegal tidak dapat mengubah konfigurasi rule; admin tidak otomatis perlu membaca semua isi kasus bila tidak diperlukan.

**Bukti:** matriks role dan screenshot/hasil test akses ditolak.

#### P1.4 Audit log

Catat:

- siapa mengubah status;
- status lama dan baru;
- waktu;
- alasan/tindakan;
- tanpa menaruh secret atau data sensitif berlebihan.

**Bukti:** screenshot audit trail.

#### P1.5 Magic link aman atau simulasi jujur

Jika dibangun:

- token acak, singkat masa berlaku;
- sekali pakai atau dapat dicabut;
- terikat pada sesi/kasus;
- tidak memuat data pribadi pada URL;
- test expired dan replay.

Jika belum dibangun, gunakan login/demo link biasa dan tulis `magic link masih rancangan`. Jangan memalsukan bukti.

#### P1.6 Error states

Bangun minimal:

- NLU/routing tidak yakin;
- layanan di luar cakupan;
- data jadwal belum tersedia;
- backend gagal;
- tiket menunggu paralegal;
- sesi kedaluwarsa.

**Bukti:** `[GAMBAR_ERROR_STATE]`.

### P2. Nilai tambah setelah P0 dan P1 selesai

#### P2.1 Integrasi WhatsApp sandbox

Kerjakan hanya jika waktu dan akses memungkinkan. Simulasi web yang solid lebih bernilai daripada integrasi WhatsApp setengah jadi.

Jika dibangun, dokumentasikan:

- provider/API;
- batas sandbox;
- biaya;
- template message;
- webhook security;
- data yang dikirim ke pihak ketiga.

#### P2.2 Peta lokasi pilot

Gunakan data sintetis atau lokasi resmi terverifikasi. Tampilkan tanggal terakhir diverifikasi dan label `Perlu konfirmasi` bila jadwal belum pasti.

#### P2.3 Mode pendamping kader

Tambahkan pilihan:

- akses untuk diri sendiri;
- mendampingi warga.

Pisahkan case ID, consent, sesi, dan akses. Jangan menyimpan foto ke galeri perangkat secara otomatis.

#### P2.4 Aksesibilitas

Uji:

- keyboard navigation;
- label form;
- kontras;
- ukuran target sentuh;
- layar kecil;
- koneksi lambat;
- bahasa sederhana.

Sediakan hasil audit ringkas dan screenshot mobile.

---

# Bagian III — Kontrak Handoff

## 6. Artefak yang Diserahkan Programmer

Tim programmer menyerahkan paket berikut kepada tim proposal:

| Artefak | Format | Placeholder proposal | Pemilik |
|---|---|---|---|
| Repository | URL | `[LINK_GITHUB]` | tech lead |
| Demo staging | URL | `[LINK_STAGING]` | DevOps/programmer |
| Akun demo | teks aman | `[AKUN_DEMO]` | tech lead |
| Video demo | URL MP4/YouTube unlisted | `[LINK_VIDEO_DEMO]` | programmer |
| Chat screenshot | PNG resolusi tinggi | `[GAMBAR_CHAT_FLOW]` | frontend |
| PWA screenshot | PNG mobile | `[GAMBAR_PWA_WARGA]` | frontend |
| Dashboard screenshot | PNG desktop | `[GAMBAR_DASHBOARD_PARALEGAL]` | frontend |
| Diagram arsitektur aktual | SVG/PNG | `[GAMBAR_ARSITEKTUR_AKTUAL]` | backend/tech lead |
| Hasil test | Markdown/HTML | `[LINK_TEST_RULE]` | backend/QA |
| Metrik uji | CSV/tabel | `[DATA_HASIL_UJI]` | QA |
| Matriks akses | Markdown | `[MATRIKS_RBAC]` | backend |
| Threat-model evidence | screenshot/test | `[BUKTI_KEAMANAN]` | tech lead |

**Nama file disarankan:**

```text
evidence/
  01-chat-flow.png
  02-pwa-status.png
  03-paralegal-dashboard.png
  04-error-state.png
  05-architecture.svg
  06-rule-test-report.md
  07-rbac-matrix.md
  08-demo-script.md
  09-usability-results.csv
```

## 7. Informasi yang Diserahkan Tim Proposal

Tim proposal harus memberi programmer:

| Input | Format | Mengapa diperlukan |
|---|---|---|
| scope tiga layanan | dokumen final | mencegah scope creep |
| rule matrix tervalidasi | spreadsheet/JSON | sumber implementasi |
| kata-kata aman pada output | copy deck | mencegah keputusan hukum absolut |
| daftar trigger eskalasi | tabel | menentukan human handoff |
| skenario demo | dokumen | menjaga demo konsisten |
| data dummy | JSON/CSV | menghindari data pribadi |
| requirement privasi | tabel | menentukan akses dan retensi |
| metrik/event | tabel | menentukan logging |

Programmer tidak boleh mengarang kriteria hukum sendiri saat requirement belum jelas. Tandai blocker dan minta validasi.

## 8. Template Update Mingguan

Setiap tim mengisi sekali per minggu:

```markdown
## Minggu [N] — [TANGGAL]

### Selesai
- [item + link bukti]

### Sedang Dikerjakan
- [item + pemilik + target]

### Blocker
- [masalah + keputusan yang diperlukan + pemilik keputusan]

### Perubahan Klaim Proposal
- [klaim lama]
- [bukti baru]
- [klaim revisi]

### Placeholder yang Siap Diganti
- [PLACEHOLDER] → [URL/file]
```

---

# Bagian IV — Jadwal Kerja Minimum

## 9. Sprint 1 — Proposal dan Vertical Slice

**Tim proposal:**

- status implementasi;
- kebaruan dan tabel pembanding;
- rule matrix awal;
- skenario demo;
- batas keputusan;
- daftar placeholder.

**Tim programmer:**

- repository dan README;
- chat simulasi;
- satu rule prodeo;
- satu checklist;
- dashboard tiket minimum;
- PWA status minimum.

**Output sprint:** demo satu alur menggunakan data sintetis.

## 10. Sprint 2 — Bukti dan Keamanan Dasar

**Tim proposal:**

- threat model;
- service blueprint;
- pilot canvas;
- protokol uji;
- audit sumber.

**Tim programmer:**

- semua tiga jalur MVP atau satu jalur matang plus dua jalur terbatas;
- automated/manual rule tests;
- RBAC;
- audit log;
- error states;
- event logging;
- deployment staging.

**Output sprint:** URL demo, hasil test, screenshot final.

## 11. Sprint 3 — Uji dan Integrasi Proposal

**Bersama:**

- uji 10–20 pengguna/proxy dan 2–3 reviewer;
- perbaiki blocker terbesar;
- hitung metrik;
- rekam video demo;
- ganti placeholder;
- ekspor PDF dan audit final.

**Output sprint:** proposal berbasis bukti, bukan rencana saja.

---

# Bagian V — Definition of Done

## 12. Proposal Siap Dikirim Jika

- [ ] Tidak ada placeholder tersisa tanpa penjelasan.
- [ ] Semua URL dan QR dibuka dari perangkat lain.
- [ ] Status implementasi sesuai aplikasi sebenarnya.
- [ ] Setiap angka diberi label baseline, hasil, target, atau proyeksi.
- [ ] Rule engine tidak diklaim memberi keputusan hukum final.
- [ ] Pembanding memiliki sumber yang dapat ditelusuri.
- [ ] Mitra tidak diklaim resmi tanpa bukti.
- [ ] Screenshot terbaca pada PDF 100%.
- [ ] Data demo sepenuhnya sintetis.
- [ ] Batasan teknis dan operasional dinyatakan.

## 13. MVP Siap Didemokan Jika

- [ ] Satu alur end-to-end selesai tanpa edit database manual.
- [ ] Data dapat di-reset ke kondisi demo.
- [ ] Rule ID dan sumber terlihat.
- [ ] Kasus di luar cakupan tidak dijawab otomatis.
- [ ] Eskalasi masuk dashboard.
- [ ] Perubahan status terlihat oleh warga.
- [ ] Role warga tidak dapat membuka dashboard.
- [ ] Error state utama tersedia.
- [ ] Test rule utama lulus.
- [ ] README dapat diikuti anggota non-programmer.
- [ ] Tidak ada secret atau data pribadi pada repository/demo.

## 14. Prioritas Jika Waktu Sangat Terbatas

Kerjakan hanya enam hal ini:

1. tabel status implementasi yang jujur;
2. rule matrix satu layanan yang tervalidasi;
3. chat simulasi sampai checklist;
4. eskalasi dan dashboard paralegal;
5. video demo serta screenshot;
6. uji kecil dengan hasil terukur.

Fitur peta, WhatsApp API asli, NLU canggih, SIPP nasional, dan ekspansi wilayah ditunda. Satu alur yang berjalan dan diuji lebih kuat daripada sepuluh modul kosong.
