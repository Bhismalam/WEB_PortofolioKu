# TODO & Roadmap: Full-Stack CMS Web Portfolio Project

## Phase 1: Inisialisasi & Setup Project Next.js + Tailwind + Supabase
- [x] Perbarui file dokumentasi project (`CONTEXT.md`, `MEMORY.md`, `TODO.md`)
- [x] Inisialisasi proyek Next.js (TypeScript, Tailwind CSS, App Router)
- [x] Setup UI library (Tailwind Glassmorphism Utilities & Custom SVG Social Icons)
- [x] Konfigurasi Tema Warna (Dark Mode, `#0A0015` ke `#1A0033`, Accent Violet `#6D28D9` & Cyan `#22D3EE`)
- [x] Integrasi Font (Inter / Sora & JetBrains Mono)
- [x] Setup Supabase Client & Schema Database SQL (Tables: `projects`, `skills`, `profile_bio`, `categories`)

---

## Phase 2: Pengembangan Halaman Publik (Visitor View)
- [x] **Sticky Glassmorphism Header & Navigation**: Logo, Link Nav, Glowing "Download CV" Button
- [x] **Hero Section**: Dynamic Typewriter Effect, Status Badge ("Available for Hire"), Profile Avatar, Tombol CTA
- [x] **Active Constellation / Aurora Background**: Animasi latar belakang halus
- [x] **Skills & Tools Bento Grid**: Grid interaktif dengan ikon, level kemahiran, dan micro-animations
- [x] **Portfolio Showcase**:
  - Filter Kategori (All, Web Dev, UI/UX, Social Media, Content Creation)
  - Interactive Project Cards dengan efek Lift & Neon Glow saat hover
  - Embed Handler untuk Video Reels / TikTok
- [x] **Case Study Detail Page / Modal**: Rincian proyek, problem, solution, tools, preview links
- [x] **Contact Section**: Form kontak transparan & sosial media links
- [x] **Dynamic SEO & Open Graph Meta Tags**

---

## Phase 3: Pengembangan Dashboard Admin (CMS Internal View)
- [x] **Supabase Authentication**: Halaman Login Admin & Logout
- [x] **Admin Layout**: Sidebar navigasi, Status Koneksi Database, Header Admin
- [x] **CRUD Portfolio / Projects**: Form Tambah/Edit Proyek (Thumbnail Upload/URL, Kategori, Multi-select Tech Stack, Rich Description, Links)
- [x] **CRUD Skills & Bio**: Form update bio, link sosial media, dan keahlian
- [x] **Dynamic Resume Manager**: Form upload file CV (PDF) ke Supabase Storage

---

## Phase 4: Testing, Refinement & Deployment
- [x] Build Test & TypeScript Verification (`npm run build`)
- [x] Refinement visual & Uji Responsivitas (Mobile, Tablet, Desktop)
- [ ] Deploy ke Vercel / Supabase live project
