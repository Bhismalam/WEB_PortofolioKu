# Context Project: Web Portfolio (Full-Stack CMS Portfolio)

## Deskripsi & Tujuan Project
Project ini adalah pengembangan **Website Portofolio Full-Stack Dinamis berarsitektur CMS (Content Management System)**. Website ini dirancang untuk penggunaan jangka panjang sehingga pemilik/admin dapat menambah, mengubah, atau menghapus karya (projects), keahlian (skills), serta data resume/bio kapan saja melalui Dashboard Admin tanpa perlu mengubah kode sumber.

---

## 2 Sistem Utama
1. **Halaman Publik (Public / Visitor View)**:
   - Etalase untuk pengunjung, calon klien, atau rekruter.
   - Tampilan: portofolio standar yang bersih dengan acuan kualitas Apple + Stripe. Tema terang, satu aksen biru, dan satu band graphite. Detail lengkapnya ada di `DESIGN.md`, dan konteks produknya di `PRODUCT.md`.
   - Menampilkan Hero (foto, pernyataan diri, status ketersediaan, CTA), Karya pilihan (filter kategori dinamis, studi kasus dalam dialog, embed video), Keahlian (dikelompokkan Desain / Front-end / Back-end / Tools), Sertifikat, serta Kontak (email, WhatsApp, form yang membuka aplikasi email).

2. **Dashboard Admin (CMS / Internal View)**:
   - Halaman terproteksi dengan Authentication System (Supabase Auth).
   - Management CRUD (Create, Read, Update, Delete) untuk Projects, Skills, Bio, & Social Links.
   - Dynamic Resume Manager (Upload CV PDF via Supabase Storage).

---

## Tech Stack & Architecture
- **Language**: TypeScript / JavaScript
- **Framework**: Next.js (React) - App Router, API Routes / Server Actions
- **Styling & UI**: Tailwind CSS 4 dengan token desain di `src/app/globals.css` (`@theme`)
- **Database**: PostgreSQL (via Supabase)
- **Auth & Storage**: Supabase Auth & Supabase Storage
- **Deployment Target**: Vercel
- **Typography**: Geist (semua teks) & Geist Mono (hanya data: nama teknologi, durasi, ID)

---

## Cakupan Konten Portfolio
- **Web Development**: Live demo link, GitHub repo link, deskripsi teknis, tech stack tags.
- **UI/UX Design**: Interface screenshots, wireframes, Figma prototype link.
- **Social Media Design**: Visual gallery & graphic content designs.
- **Content Creation**: Integrated / embedded video player (Instagram Reels / TikTok).
