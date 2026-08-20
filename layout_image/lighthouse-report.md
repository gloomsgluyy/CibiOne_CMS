# Laporan Lighthouse — Performance Audit

## Ringkasan Skor
- **Performance Score:** 44 / 100 (Buruk — merah)
- Skor performa dihitung dari kombinasi beberapa metrik lab (bukan dari metrik lapangan/real user).

## Core Metrics
| Metrik | Nilai | Status |
|---|---|---|
| First Contentful Paint (FCP) | 1.2 s | 🔴 Buruk |
| Largest Contentful Paint (LCP) | 17.2 s | 🔴 Sangat Buruk |
| Total Blocking Time (TBT) | 3,930 ms | 🔴 Sangat Buruk |
| Cumulative Layout Shift (CLS) | 0 | 🟢 Baik |
| Speed Index | 3.9 s | 🔴 Buruk |

---

## INSIGHTS (Peluang Optimasi)

### 1. Render-blocking requests — Potensi hemat 360 ms
Request yang memblokir render awal halaman sehingga menunda LCP.

| URL | Transfer Size | Duration |
|---|---|---|
| `localhost` (total) | 13.9 KiB | 170 ms |
| `/_app/layout.css?v178...` (localhost) | 13.9 KiB | 170 ms |

Saran: pertimbangkan `defer` atau `inline` CSS kritikal.

---

### 2. Forced reflow
Forced reflow terjadi ketika JavaScript membaca properti geometris (mis. `offsetWidth`) setelah style di-invalidate akibat perubahan DOM. Bisa menurunkan performa.

**Top function call (total reflow time):**
- `.../next-devtools/index.js:1832:258453` — 4 ms

**Source breakdown (total reflow time):**
| Source | Total reflow time |
|---|---|
| [unattributed] | 29 ms |
| `/build/install/hook.js:104227` | 8 ms |
| `/knockoutjs/build/output/knockout...` | 0 ms |
| `.../client/image-component.js:9428` | 0 ms |
| `.../client/image-component.js:9424` | 0 ms |

---

### 3. LCP Breakdown
Idealnya sebagian besar waktu LCP dihabiskan untuk loading resource, bukan delay.

| Subphase | Duration |
|---|---|
| Time to first byte | 290 ms |
| Resource load delay | 60 ms |
| Resource load duration | 30 ms |
| Element render delay | **2,140 ms** |

Elemen LCP: gambar "Gedung SMKN 1 Cibinong".

---

### 4. LCP Request Discovery
Masalah yang ditemukan pada elemen LCP:
- ❌ `fetchpriority=high` sebaiknya diterapkan pada image preload
- ✅ Request dapat ditemukan langsung dari initial document
- ❌ Resource LCP sebaiknya tidak menggunakan lazy-loading

---

### 5. Network Dependency Tree
Maximum critical path latency: **511 ms**

```
/favicon (localhost) — 375 ms, 11.42 KiB
└── /_app/layout.css?v178... (localhost) — 383 ms, 13.90 KiB
    ├── /media/8888e3829fa9a34-s.p.woff2 (localhost) — 511 ms, 12.90 KiB
    ├── /media/e64a9039ac93e42-s.p.woff2 (localhost) — 510 ms, 8.01 KiB
    ├── /media/6ff17ea75a08d6ea7-s.p.woff2 (localhost) — 510 ms, 8.19 KiB
    └── /media/046...a97172-s.p.woff2 (localhost) — 499 ms, 8.10 KiB
```

**Preconnected origins:** tidak ada origin yang di-preconnect.
**Preconnect candidates:** tidak ada kandidat origin tambahan yang layak di-preconnect (maks. rekomendasi 4 origin).

---

### 6. Improve Image Delivery — Potensi hemat 22 KiB
Gambar LCP "Gedung SMKN 1 Cibinong" via `/next/image...`

| URL | Resource Size | Est. Savings |
|---|---|---|
| localhost (image) | 42.9 KiB | 21.7 KiB |

Catatan: meningkatkan faktor kompresi gambar dapat memperkecil ukuran unduhan (potensi hemat 21.7 KiB).

---

### 7. Legacy JavaScript — Potensi hemat 10 KiB
Polyfill/transform untuk browser lama yang mungkin tidak diperlukan lagi untuk browser modern (target Baseline ES6+).

| URL | Wasted bytes |
|---|---|
| `/chunks/main-app.js?v178...` (localhost, total) | 10.4 KiB |
| ...71489 — `core-js` polyfill | ~1 KiB |
| ...71490 — `Array.prototype.at` | — |
| ...71473 — `Array.prototype.flat` | — |
| ...71528 — `Array.prototype.flatMap` | — |
| ...71806 — `Object.fromEntries` | — |
| ...71184 — `Object.hasOwn` | — |
| ...71731 — `String.prototype.trimStart` | — |
| ...72184 — `String.prototype.trimEnd` | — |

---

### 8. Optimize DOM size
Tidak ada masalah signifikan terdeteksi.

### 9. 3rd Parties
Tidak ada masalah signifikan terdeteksi. (Insight lebih lanjut tersedia via Chrome DevTools Performance Panel.)

---

## DIAGNOSTICS

### 10. Minimize Main-Thread Work — 7.9 s total
| Category | Time Spent |
|---|---|
| Script Evaluation | 4,296 ms |
| Script Parsing & Compilation | 1,464 ms |
| Other | 1,440 ms |
| Style & Layout | 559 ms |
| Rendering | 190 ms |
| Garbage Collection | 92 ms |
| Parse HTML & CSS | 24 ms |

---

### 11. Reduce JavaScript Execution Time — 3.8 s
| Sumber | Total CPU Time | Script Evaluation | Script Parse |
|---|---|---|---|
| `localhost` (total) | 4,513 ms | 2,364 ms | 1,053 ms |
| `/chunks/main-app.js?v178...` | 2,609 ms | 1,847 ms | 678 ms |
| `/fonts...` | 1,589 ms | 554 ms | 72 ms |
| `.../antlai-page.js` | 305 ms | 2 ms | 302 ms |
| **Unattributable** | 2,285 ms | 1,208 ms | 351 ms |
| webpack-internal .../scheduler.development.js | 976 ms | 976 ms | 0 ms |
| chrome-extension (aapbdbdomjkkjkaocfhkllekejjeekj) build_compiled.js | 839 ms | 81 ms | 355 ms |
| webpack-internal .../motion-dom/.../batcher.mjs | 227 ms | 96 ms | 0 ms |
| webpack-internal .../next-devtools/index.js | 128 ms | 100 ms | 0 ms |
| **Ad Blocker Stands Adblocker** ext. content-helpers.js | 943 ms | 624 ms | 0 ms |

> Catatan: sebagian beban CPU berasal dari ekstensi browser (Ad Blocker, dsb.), bukan murni dari kode situs — perlu diuji ulang di lingkungan tanpa ekstensi untuk hasil bersih.

---

### 12. Minify JavaScript — Potensi hemat 31 KiB
| URL | Transfer Size | Est. Savings |
|---|---|---|
| `localhost` (total) | 27.5 KiB | 21.8 KiB |
| `.../chunks/webpack.js?v178...` | 27.5 KiB | 21.8 KiB |
| Ad Blocker Stands Adblocker — content-script.js | 12.4 KiB | 8.0 KiB |
| — popup-script.js | 6.9 KiB | 2.6 KiB |
| **Unattributable** | 6.9 KiB | 2.4 KiB |
| chrome-extension (ggogmpjfayfmbdogeejfkzenffgjmjop) content.js | 6.9 KiB | 2.4 KiB |

---

### 13. Page Prevented Back/Forward Cache Restoration — 1 failure reason
| Failure reason | Failure type |
|---|---|
| Halaman dengan resource utama `cache-control: no-store` tidak dapat masuk bfcache | Not actionable |

---

### 14. Minify CSS — Potensi hemat 10 KiB
| URL | Transfer Size | Est. Savings |
|---|---|---|
| **Unattributable** | 6.9 KiB | 7.2 KiB |
| Inline style (custom properties: `--color-fore`, `--color-background`, dll.) | 1.7 KiB | 2.7 KiB |
| Inline style (shadow host styling) | 2.6 KiB | 2.2 KiB |
| `localhost` (total) | 13.9 KiB | 2.6 KiB |
| `.../app/layout.css?v178...` | 13.9 KiB | 2.6 KiB |

---

### 15. Reduce Unused JavaScript — Potensi hemat 471 KiB
| URL | Transfer Size | Est. Savings |
|---|---|---|
| chrome-extension (aapbdbdomjkkjkaocfhkllekejjeekj) build/compiled.js | 714.8 KiB | 406.6 KiB |
| chrome-extension (mnojpmjdmbbfmejpflffifhffcmidifd) inject.js | 57.8 KiB | 34.3 KiB |

> Sebagian besar potensi hemat berasal dari ekstensi browser, bukan kode situs sendiri.

---

### 16. Avoid Long Main-Thread Tasks
- Ditemukan **15 long tasks**.

### 17. Use Timing Marks and Measures
- Ditemukan **1 timing mark** yang digunakan.

---

## Passed Audits
- 13 audit lolos (detail tidak terlihat penuh pada tangkapan layar, hanya jumlah).

---

## Ringkasan Prioritas Perbaikan (untuk AI/Developer)
1. **LCP (17.2 s) adalah masalah terbesar** — didominasi oleh *Element render delay* (2,140 ms). Perbaiki dengan:
   - Tambahkan `fetchpriority="high"` pada gambar LCP.
   - Hindari lazy-loading pada gambar LCP.
   - Kompresi gambar "Gedung SMKN 1 Cibinong" (potensi hemat 21.7 KiB).
2. **Total Blocking Time (3,930 ms) sangat tinggi** — kurangi eksekusi JS di main thread:
   - Kurangi Script Evaluation (4,296 ms) dan Parsing & Compilation (1,464 ms).
   - Pertimbangkan code-splitting/lazy-load komponen non-kritis.
3. **Reduce unused JavaScript (471 KiB)** — sebagian besar dari ekstensi browser; uji ulang lighthouse di mode Incognito tanpa ekstensi untuk hasil yang lebih akurat.
4. **Legacy JavaScript (10 KiB)** — hapus polyfill yang tidak diperlukan untuk browser modern (target Baseline ES6+).
5. **Render-blocking CSS (170 ms)** — pertimbangkan inline critical CSS atau defer.
6. **Minify JS/CSS** — total potensi hemat ~41 KiB dari minifikasi.
7. **Bfcache tidak aktif** karena header `cache-control: no-store` pada resource utama.
