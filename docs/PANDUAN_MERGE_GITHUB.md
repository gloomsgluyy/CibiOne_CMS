# Panduan Merge dan Push GitHub Tanpa Konflik

Panduan ini memakai branch `main` sebagai branch integrasi. Setiap pekerjaan section dibuat pada branch terpisah dan digabungkan melalui pull request (PR), bukan langsung push ke `main`.

## Aturan Tim

- Satu task atau satu section memakai satu branch.
- Jangan mengerjakan file section yang sama tanpa kesepakatan dengan PIC.
- Jangan push langsung ke `main`; aktifkan branch protection di GitHub bila repository sudah dibuat.
- Commit hanya perubahan yang terkait task. Jangan memasukkan `.env`, kredensial, atau perubahan milik anggota lain.
- Update SRS dan execution log berada dalam PR yang sama dengan perubahan section.
- Sebelum mengedit UI, periksa Component Registry dan SRS section terkait.

## Alur Kerja Harian

### 1. Mulai dari `main` terbaru

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/kompetensi-jurusan-cms
```

`git pull --ff-only` sengaja dipakai agar Git berhenti bila riwayat lokal dan remote sudah bercabang. Ini mencegah merge commit yang tidak disengaja saat memulai kerja.

Gunakan nama branch yang jelas:

```text
feat/kompetensi-jurusan-cms
fix/kompetensi-modal-keyboard
docs/kompetensi-srs
chore/update-drizzle-migration
```

### 2. Kerjakan dan commit kecil yang utuh

Sebelum commit, cek perubahan yang akan masuk:

```bash
git status
git diff
git add "components/sections/kompetensi-section.tsx" "docs/srs/kompetensi-keahlian/program-keahlian-section.md"
git diff --staged
git commit -m "[Fase1] feat: improve kompetensi interaction"
```

Jangan gunakan `git add .` jika worktree berisi pekerjaan anggota lain atau file yang tidak terkait. Untuk Fase 2 gunakan prefix `[Fase2]`; untuk dokumentasi gunakan `docs:`.

### 3. Sinkronkan branch sebelum push dan sebelum membuat PR

```bash
git fetch origin
git rebase origin/main
```

Jika tidak ada konflik, lanjutkan:

```bash
git push -u origin feat/kompetensi-jurusan-cms
```

Setelah branch sudah pernah dipush, hasil rebase mengubah hash commit. Push pembaruannya harus aman untuk branch pribadi:

```bash
git push --force-with-lease origin feat/kompetensi-jurusan-cms
```

`--force-with-lease` hanya boleh dipakai pada branch feature milik sendiri, **tidak pernah pada `main`**, dan jangan dipakai bila ada anggota lain yang juga push ke branch tersebut.

## Jika Terjadi Konflik Saat Rebase

1. Hentikan pekerjaan baru dan lihat file yang konflik.

```bash
git status
```

2. Buka setiap file bertanda konflik. Pilih dan gabungkan isi yang benar, lalu hapus seluruh penanda berikut:

```text
<<<<<<<
=======
>>>>>>>
```

3. Jalankan pemeriksaan yang relevan, lalu lanjutkan rebase.

```bash
git add "<file-yang-sudah-diperbaiki>"
git rebase --continue
```

4. Ulangi sampai selesai. Setelah itu jalankan type check/build dan push dengan lease.

```bash
npx tsc --noEmit
npm run build
git push --force-with-lease origin feat/kompetensi-jurusan-cms
```

Jika solusi konflik belum jelas, batalkan rebase tanpa menghapus pekerjaan lokal dan tanyakan pemilik perubahan:

```bash
git rebase --abort
```

Jangan memilih salah satu sisi konflik secara membabi buta. Khusus schema database, migration, route API, dan dokumen konteks, koordinasikan terlebih dahulu karena kesalahan dapat memengaruhi pekerjaan seluruh tim.

## Membuat dan Menggabungkan Pull Request

1. Pastikan branch sudah direbase pada `origin/main`, build lulus, dan SRS diperbarui.
2. Push branch dan buat PR dengan base `main`.
3. Isi deskripsi dengan scope, file utama, cara uji, screenshot UI bila ada, serta blocker/risiko.
4. Minta minimal satu peer reviewer dan PIC/reviewer sesuai aturan tim.
5. Setelah review selesai, cek sekali lagi apakah `main` berubah. Jika berubah, rebase lagi sebelum merge.
6. Gunakan **Squash and merge** untuk menjaga riwayat `main` ringkas, lalu hapus branch feature.

Contoh dengan GitHub CLI:

```bash
gh pr create --base main --head feat/kompetensi-jurusan-cms --title "[Fase2] feat: dynamic jurusan content" --fill
gh pr merge <nomor-pr> --squash --delete-branch
```

## Setelah PR Di-merge

```bash
git switch main
git pull --ff-only origin main
git branch -d feat/kompetensi-jurusan-cms
```

Jika branch lokal belum bisa dihapus karena Git menyatakan belum merged, periksa apakah PR memang sudah di-squash. Setelah `main` terbaru sudah ditarik, penghapusan normal seharusnya aman. Jangan gunakan `-D` kecuali yakin branch tersebut sudah tidak diperlukan.

## Pencegahan Konflik Paling Efektif

- Bagi pekerjaan berdasarkan batas file: misalnya satu orang schema/API jurusan, satu orang UI section, satu orang dokumentasi/admin.
- Kirim commit kecil dan push secara teratur; jangan menyimpan perubahan besar berhari-hari di satu branch.
- Rebase pada `origin/main` sebelum mulai kerja, sebelum push besar, dan tepat sebelum merge.
- Jangan mengedit `db/schema.ts`, migration, `docs/context/*`, atau route yang sama secara paralel tanpa menyepakati pemilik file.
- Buat migration baru untuk perubahan schema. Jangan mengubah migration yang sudah dipakai anggota lain atau deployment bersama.
- Gunakan issue/PR untuk mencatat siapa yang memiliki task dan file yang disentuh.
- Jangan menyelesaikan konflik dengan `git reset --hard`, `git checkout --`, atau menimpa file teman.

## Checklist Sebelum Push

- [ ] `git status` hanya memuat file task sendiri.
- [ ] `git diff --staged` sudah diperiksa.
- [ ] Tidak ada secret atau `.env` yang ikut staged.
- [ ] SRS dan execution log diperbarui bila section berubah.
- [ ] `git fetch origin` dan `git rebase origin/main` berhasil.
- [ ] `npx tsc --noEmit` lulus.
- [ ] `npm run build` lulus untuk perubahan yang memengaruhi aplikasi.
- [ ] PR mendapat review sebelum digabungkan ke `main`.
