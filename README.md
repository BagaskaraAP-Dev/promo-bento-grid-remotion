# Iklan Bento Grid dan Demo Interaksi (60 Detik, 9:16 Vertikal)

Proyek video promosi berdurasi 60 detik (1.800 frame pada 30 FPS) dengan rasio vertikal 9:16 (1080x1920) yang diprogram menggunakan React, Remotion, dan TypeScript.

Video ini menggunakan tata letak bento grid, animasi berbasis koordinat dan pegas, voice-over bahasa Indonesia sintetis, serta efek suara dan musik latar yang dihasilkan secara komputasi.

---

## Spesifikasi Berkas Video

| Parameter | Nilai |
| :--- | :--- |
| Komposisi ID | PromoBentoGrid |
| Durasi | 60 Detik (1.800 frame) |
| Kecepatan Bingkai | 30 FPS |
| Resolusi | 1080 x 1920 (9:16 Vertikal) |
| Format Berkas | MP4 (H.264, AAC Stereo) |
| Jalur Berkas Hasil | out/promo-bento-grid-60s.mp4 |
| Ukuran Berkas | 18.8 MB |

---

## Struktur Lima Adegan

Pembagian durasi adegan disusun berurutan melalui komponen Series di Remotion:

### Adegan 1: Masalah Biaya Berlangganan (Frame 0 - 300)
Tipografi kinetik menampilkan perbandingan tagihan bulanan digital yang terpisah. Empat kartu simulasi biaya melayang, lalu bergerak memusat dan menyatu menjadi satu ikon portal digital terpadu.
Audio: vo_1.mp3 dan sfx_whoosh.wav.

### Adegan 2: Bento Grid Keunggulan Layanan (Frame 300 - 720)
Empat kartu modular masuk menggunakan fisika pegas (spring) bertahap:
1. Kartu Utama: Proses otomatisasi satu menit dengan indikator waktu nyata.
2. Kartu Fitur Kiri: Jaminan keaslian layanan dan garansi penggantian.
3. Kartu Fitur Kanan: Efisiensi biaya paket grup hingga 70 persen.
4. Kartu Bawah: Layanan pelanggan 24 jam dengan waktu respons di bawah 2 menit.
Audio: vo_2.mp3 dan sfx_pop.wav pada setiap kartu yang muncul.

### Adegan 3: Katalog Pilihan Paket (Frame 720 - 1110)
Tiga kartu paket langganan vertikal (Entertainment, All-Access Pro, Creative Suite). Kartu pilihan utama memiliki batas warna zamrud dengan animasi angka diskon dan sapuan kilau gradien cahaya berkala.
Audio: vo_3.mp3 dan sfx_chime.wav.

### Adegan 4: Simulasi Pemesanan Antarmuka 2.5D (Frame 1110 - 1470)
Kursor mouse bergerak menuju tombol aksi pemesanan, melakukan penekanan dengan efek riak (ripple), lalu beralih ke jendela konfirmasi transaksi berhasil dengan tanda centang aktif dalam 0.8 detik.
Audio: vo_4.mp3, sfx_click.wav, dan sfx_success.wav.

### Adegan 5: Ulasan Pengguna dan Aksi Penutup (Frame 1470 - 1800)
Tampilan penilaian 4.9 dari 5.0, dua kartu ulasan pembeli terverifikasi, tombol ajakan bertindak (CTA), serta transisi meredup (fade-out) pada 30 frame terakhir.
Audio: vo_5.mp3 dan sfx_whoosh.wav.

---

## Arsitektur Berkas

```text
├── out/
│   └── promo-bento-grid-60s.mp4
├── public/
│   └── assets/
│       ├── bgm_beat.wav
│       ├── sfx_chime.wav
│       ├── sfx_click.wav
│       ├── sfx_pop.wav
│       ├── sfx_success.wav
│       ├── sfx_whoosh.wav
│       ├── vo_1.mp3
│       ├── vo_2.mp3
│       ├── vo_3.mp3
│       ├── vo_4.mp3
│       └── vo_5.mp3
├── scripts/
│   └── gen-bento-audio.mjs
├── src/
│   ├── components/
│   │   └── Background.tsx
│   ├── scenes/
│   │   ├── Scene1Hook.tsx
│   │   ├── Scene2BentoGrid.tsx
│   │   ├── Scene3CatalogShimmer.tsx
│   │   ├── Scene4Checkout25D.tsx
│   │   └── Scene5SocialProofCTA.tsx
│   ├── styles/
│   │   ├── fonts.ts
│   │   └── theme.ts
│   ├── Main.tsx
│   ├── Root.tsx
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Sintesis Audio dan Suara

1. Voice-Over Bahasa Indonesia dibuat melalui model neural id-ID-ArdiNeural pada perkakas edge-tts.
2. Efek suara dan instrumen musik latar (scripts/gen-bento-audio.mjs) dibuat secara prosedural menggunakan generator sampel PCM 16-bit 44.1 kHz tanpa dependensi perpustakaan audio luar.
3. Musik pengiring (bgm_beat.wav) disusun dengan ketukan lo-fi 112 BPM (kick, snare, hi-hat, sub-bass, dan akord piano listrik) berdurasi penuh 60 detik.

---

## Instruksi Penggunaan

### 1. Instalasi Kebutuhan
```bash
npm install
```

### 2. Pratinjau Interaktif (Remotion Studio)
```bash
npm run dev
```
Buka peramban web pada alamat http://localhost:3000

### 3. Pemeriksaan Tipe
```bash
npm run check
```

### 4. Render Video
```bash
npm run build
```

Hasil render berkas tersimpan pada direktori out/promo-bento-grid-60s.mp4.
