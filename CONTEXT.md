# Context Project: Web Portfolio (Full-Stack CMS Portfolio)

## Deskripsi & Tujuan Project
Project ini adalah pengembangan **Website Portofolio Full-Stack Dinamis berarsitektur CMS (Content Management System)**. Website ini dirancang untuk penggunaan jangka panjang sehingga pemilik/admin dapat menambah, mengubah, atau menghapus karya (projects), keahlian (skills), serta data resume/bio kapan saja melalui Dashboard Admin tanpa perlu mengubah kode sumber.

---

## 2 Sistem Utama
1. **Halaman Publik (Public / Visitor View)**:
   - Etalase interaktif untuk pengunjung, calon klien, atau rekruter.
   - Tema *Modern Tech*: Futuristis, Glassmorphism, Neon Glow (#6D28D9 Violet & #22D3EE Cyan), Dark Mode (#0A0015 ke #1A0033).
   - Menampilkan Hero Section (Teks dinamis typewriter, status *Available for Hire*, tombol CV), Skills & Tools (Bento Grid), Portfolio Showcase (Filtering Web Dev, UI/UX, Social Media, Content Creation / TikTok/Reels embed), Case Study Detail Page/Modal, serta Form Kontak.

2. **Dashboard Admin (CMS / Internal View)**:
   - Halaman terproteksi dengan Authentication System (Supabase Auth).
   - Management CRUD (Create, Read, Update, Delete) untuk Projects, Skills, Bio, & Social Links.
   - Dynamic Resume Manager (Upload CV PDF via Supabase Storage).

---

## Tech Stack & Architecture
- **Language**: TypeScript / JavaScript
- **Framework**: Next.js (React) - App Router, API Routes / Server Actions
- **Styling & UI**: Tailwind CSS + Shadcn/ui + Glassmorphism & Custom Neon Glow CSS
- **Database**: PostgreSQL (via Supabase)
- **Auth & Storage**: Supabase Auth & Supabase Storage
- **Deployment Target**: Vercel
- **Typography**: Inter / Sora / Poppins (Heading) & JetBrains Mono / Fira Code (Technical/Skills)

---

## Cakupan Konten Portfolio
- **Web Development**: Live demo link, GitHub repo link, deskripsi teknis, tech stack tags.
- **UI/UX Design**: Interface screenshots, wireframes, Figma prototype link.
- **Social Media Design**: Visual gallery & graphic content designs.
- **Content Creation**: Integrated / embedded video player (Instagram Reels / TikTok).
