# Template SRS Section - [NAMA_PROJECT]

> Salin template ini ke `docs/srs/<halaman>/<nama-section>.md` sebelum coding. Baca `AI_CONTEXT.md`, `project.md`, `architecture.md`, `decisions.md`, `glossary.md`, dan `component-registry.md` terlebih dahulu.
>
> Aturan wajib: PIC mengisi requirement dan execution log. Hanya reviewer manusia yang dapat mengubah status fase menjadi `Done`. Fase 2 hanya boleh dimulai setelah Fase 1 berstatus `Done`.

---

## 1. Metadata

| Field | Isi |
|---|---|
| Halaman | |
| Section | |
| Tipe konten | `Static` / `Dynamic - List` / `Dynamic - Singleton` / `Functional` |
| Pattern data | `ContentList` / `SiteSetting` / `N/A` |
| PIC programmer | |
| Reviewer / approver | |
| Issue / pull request | |
| Tanggal dibuat | `YYYY-MM-DD` |
| Status SRS | `Draft` / `In Progress` / `Waiting for Approval` / `Done` |

## 2. Referensi Wajib

| Referensi | Lokasi / tautan | Status |
|---|---|---|
| Layout atau brief desain | | |
| Component Registry | `docs/context/component-registry.md` - tulis entry spesifik, atau `Tidak tersedia - dikonfirmasi oleh <nama/tanggal>` | |
| Code reference dari PIC | `docs/references/<halaman>/<section>/` atau `Tidak ada` | |
| Sumber konten | | |
| ADR / konteks teknis terkait | | |

> Jika registry atau code reference tersedia, UI wajib diadaptasi dari referensi tersebut. Jangan membuat pengganti dari nol.

## 3. Requirement

### Tujuan

Jelaskan masalah pengguna dan hasil yang harus dicapai section ini dalam 2-4 kalimat.

### Konten dan perilaku

| Elemen | Requirement | Sumber data | Kriteria selesai |
|---|---|---|---|
| | | | |

### Acceptance criteria

- [ ] Tulis kriteria yang dapat diuji, termasuk tampilan desktop dan mobile bila berupa UI.
- [ ] Tulis state kosong, loading, dan error bila memakai data dinamis.
- [ ] Tulis aturan akses bila ada admin atau data privat.

### Di luar scope

- |

## 4. Kontrak Data dan API

> Isi untuk `Dynamic - List` atau `Dynamic - Singleton`. Untuk `Static` tulis `Tidak berlaku - konten static`.

### Model data

| Field | Tipe | Wajib | Aturan / contoh |
|---|---|---|---|
| | | | |

### Endpoint

| Method | Route | Tujuan | Akses | Request / query | Respons |
|---|---|---|---|---|---|
| | | | | | |

### Validasi dan keamanan

- Validasi Zod:
- Aturan publish / urutan:
- Role dan scope jurusan:
- Penyimpanan berkas: URL Vercel Blob/S3, bukan base64 dalam database.

## 5. Rencana Implementasi

### Fase 1 - Frontend

| Langkah | File terdampak | Bukti uji |
|---|---|---|
| | | |

**Status Fase 1:** `Not Started`

### Fase 2 - CMS / Backend

> Lewati fase ini untuk konten `Static`. Jangan memulai sebelum Fase 1 diset `Done` oleh reviewer manusia.

| Langkah | File terdampak | Bukti uji |
|---|---|---|
| | | |

**Status Fase 2:** `Not Started`

### Fase 3 - AI Integration

> Isi hanya untuk section AI Chatbot; selain itu tulis `Tidak berlaku`.

**Status Fase 3:** `N/A`

## 6. Execution Log

> Tambahkan baris baru setiap ada progres. Jangan menghapus riwayat. Status yang boleh dipakai: `Not Started`, `In Progress`, `Partial`, `Waiting for Approval`, `Rejected`, dan `Done` (reviewer manusia saja).

| Tanggal | Fase | Pelaksana | Perubahan / hasil | Status | Catatan atau blocker |
|---|---|---|---|---|---|
| | | | | Not Started | |

## 7. Pengujian dan Handover

| Area | Cara uji | Hasil | Bukti / catatan |
|---|---|---|---|
| TypeScript / build | | | |
| UI desktop dan mobile | | | |
| API / validasi | | | |
| Akses / otorisasi | | | |

## 8. Approval Gate

| Fase | Status | Disetujui oleh | Tanggal | Catatan review |
|---|---|---|---|---|
| Fase 1 | Not Started | | | |
| Fase 2 | Not Started / N/A | | | |
| Fase 3 | N/A | | | |

**Ringkasan:** `Draft`
