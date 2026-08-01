# Memory & Decision Log: Web Portfolio Project

## Catatan Keputusan Arsitektur & Desain
- **[2026-08-01] Shift to Full-Stack Next.js + Supabase**:
  - Arsitektur dipastikan menjadi **Full-Stack CMS** menggunakan Next.js App Router & Supabase (PostgreSQL, Auth, Storage).
  - Styling menggunakan **Tailwind CSS + Shadcn/ui** digabungkan dengan **Glassmorphism & Neon Glow** custom CSS.
- **[2026-08-01] Visual Vibe & Color Palette**:
  - **Dark Mode Default**: Background `#0A0015` ke `#1A0033` (Radial Deep Purple gradient).
  - **Accent 1 (Violet)**: `#6D28D9` (Glowing effects, tombol utama).
  - **Accent 2 (Cyan)**: `#22D3EE` (Kontras, link, ikon skills, highlight).
  - **Cards & Containers**: `rgba(255, 255, 255, 0.05)` dengan `backdrop-filter: blur(...)` (Glassmorphism).
- **[2026-08-01] Tipografi**:
  - Headings: Inter / Sora / Poppins.
  - Code/Skills: JetBrains Mono / Fira Code.
- **[2026-08-01] Multi-category Support**:
  - Katalog mendukung Web Dev (Live Demo & GitHub), UI/UX (Figma link), Social Media (Gallery), dan Content Creation (TikTok/Reels embeds).

---

## Preferensi & Aturan Pengembang
- **Estetika Visual**: WOW Factor, Glassmorphism, Micro-interactions, Skeleton loading states, Active constellation/aurora background.
- **Security & Proteksi**: Halaman Admin `/admin` diproteksi middleware Supabase Auth.
- **Clean Architecture**: Komponen UI modular, Supabase helper client decoupled, TypeScript strict types untuk data Schema.
