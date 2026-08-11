# SRS Template — [NAMA_PROJECT]

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
| Halaman | *(contoh: Home)* |
| Section | *(contoh: Hero Banner)* |
| Tipe Konten | Static / Dynamic – List / Dynamic – Singleton / Functional *(pilih satu, lihat `glossary.md`)* |
| PIC Programmer | |
| Reviewer / Approver | |
| Component Registry Reference | *(link/nama entry di registry — WAJIB diisi sebelum Fase 1 mulai, kecuali sudah dikonfirmasi "tidak tersedia")* |
| Code Reference Folder | *(contoh: `docs/references/<halaman>/<section>/` — wajib diisi kalau user/PIC pernah mengirim code reference di chat)* |
| Tanggal dibuat | |

---

## Fase 1 — Frontend Implementation

### Input (diisi sebelum coding)

- **Layout dari tim desain**: *(link Figma / gambar / referensi visual)*
- **Deskripsi dari tim desain**: *(copy teks, behavior yang diharapkan, dsb)*
- **Component/Template yang dipakai**: *(nama + sumber — WAJIB dari Component Registry kalau tersedia)*
- **Code reference yang wajib diikuti**: *(folder/file di `docs/references/<halaman>/<section>/`; kalau ada, AI/programmer dilarang membuat UI dari scratch dan harus mengadaptasi reference tersebut)*
- **Kalau component digenerate sendiri (registry tidak punya)**: jelaskan bagaimana cara menyeragamkan dengan komponen lain yang sudah ada di project *(warna, spacing, radius, dsb — rujuk `tailwind.config.ts`)*

### Execution Log — Fase 1

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| | | | Not Started | |

**Status Fase 1 saat ini**: `Not Started`

> Kalau status = **Partial**, wajib isi: *"Sisa yang belum dikerjakan: ..."*
> Kalau status = **Rejected**, wajib isi: *"Alasan ditolak: ..."*

---

## Fase 2 — Backend Logic CMS

> ⚠️ **Skip fase ini kalau Tipe Konten = Static.** Kalau di-skip, tulis: *"Tidak berlaku — konten Static."*
> ⚠️ **Tidak boleh dimulai sebelum Fase 1 berstatus Done.**

### Input

- **Pattern yang dipakai**: `ContentList` / `SiteSetting` *(lihat `architecture.md`)*
- **Nama tabel / field tambahan di luar skema generik**: 
- **Endpoint API**: *(daftar route yang dibuat, ikut konvensi di `architecture.md`)*
- **Role akses**: public read? `super_admin` only? `jurusan_admin` scoped?

### Execution Log — Fase 2

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| | | | Not Started | |

**Status Fase 2 saat ini**: `Not Started`

---

## Fase 3 — Khusus AI Integration (isi HANYA kalau section ini = AI Chatbot)

> Lihat catatan arsitektur chatbot di `architecture.md` sebelum isi bagian ini.

### Input

- **Sumber knowledge base**: 
- **Provider LLM**: 
- **Approach**: context-stuffing / lainnya *(catat sebagai ADR baru di `decisions.md` kalau beda dari default)*

### Execution Log — Fase 3

| Tanggal | Dikerjakan oleh | Yang dikerjakan | Status | Catatan |
|---|---|---|---|---|
| | | | Not Started | |

**Status Fase 3 saat ini**: `Not Started`

---

## Approval Gate Summary

| Fase | Status | Disetujui oleh | Tanggal approve |
|---|---|---|---|
| Fase 1 | Not Started | | |
| Fase 2 | Not Started | | |
| Fase 3 *(kalau berlaku)* | Not Started | | |

**Ringkasan status SRS ini**: 🔴 Belum mulai
*(update jadi 🟡 In Progress / 🟠 Waiting for Approval / 🔴 Rejected / 🟢 Done sesuai fase yang aktif)*
