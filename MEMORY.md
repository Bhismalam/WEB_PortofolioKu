# Memory & Decision Log: Web Portfolio Project

## Catatan Keputusan Arsitektur & Desain
- **[2026-08-01] Shift to Full-Stack Next.js + Supabase**:
  - Arsitektur dipastikan menjadi **Full-Stack CMS** menggunakan Next.js App Router & Supabase (PostgreSQL, Auth, Storage).
  - Styling menggunakan **Tailwind CSS** dengan token desain (lihat `DESIGN.md`).
- **[2026-09-25] Redesain total (menggantikan tema neon/glassmorphism 2026-08-01)**:
  - Arah desain: standar kategori dengan acuan Apple + Stripe, dipilih lewat Impeccable. Tema terang (#FFFFFF / #F5F5F7), teks #1D1D1F, satu aksen biru #0058F0 khusus untuk aksi, dan satu band graphite #0B0F15 untuk keahlian.
  - Tipografi: Geist, dan Geist Mono hanya untuk data.
  - Glow, glass, gradient text, typewriter, statistik palsu, dan bar persentase skill dihapus.
  - Proyek dan sertifikat masih contoh. Setelah konten asli masuk, set `PORTFOLIO_CONTENT_READY=true` agar catatan "Contoh tampilan" hilang dan link verifikasi tampil.
  - Sumber kebenaran: `PRODUCT.md` (produk) dan `DESIGN.md` (sistem visual).
- **[2026-08-01] Multi-category Support**:
  - Katalog mendukung Web Dev (Live Demo & GitHub), UI/UX (Figma link), Social Media (Gallery), dan Content Creation (TikTok/Reels embeds).

---

## Preferensi & Aturan Pengembang
- **Estetika Visual**: tenang, presisi, dan jujur. Karya yang berbicara, bukan efek. Satu animasi terorkestrasi (masuknya hero dan transisi studi kasus).
- **Security & Proteksi**: Halaman Admin `/admin` diproteksi middleware Supabase Auth.
- **Clean Architecture**: Komponen UI modular, Supabase helper client decoupled, TypeScript strict types untuk data Schema.
