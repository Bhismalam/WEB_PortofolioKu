# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences carry equal weight:

- **Recruiters / HR** evaluating Bhisma for a job. They scan quickly: who they are, what they can build, proof of real work, and the CV.
- **Freelance clients** (small businesses, brands) looking for someone to build a website, design an interface, or produce visual content. They look for finished results and an easy way to get in touch.

A third, internal user is the owner themself, who maintains all content through the admin dashboard (`/admin`) without touching code.

## Product Purpose

A personal portfolio site for Bhisma, backed by a CMS, used over the long term. Visitors should leave knowing what they do, seeing proof of it, and knowing how to hire or contact them. Success means a recruiter or client reaches out, or downloads the CV.

## Positioning

A developer who also designs: one person who takes a product from UI/UX design all the way to working full-stack code (Next.js + Supabase). Social media design and short-form content creation are additional, supporting skills, not the lead.

## Operating Context

- Public page: hero, skills, certificates, project showcase filtered by category (Web Dev, UI/UX, Social Media, Content Creation), case study modal, contact form, and CV download.
- Bilingual interface: Indonesian (default) and English, switched through `LanguageContext`. Most CMS fields have an `_en` twin.
- Admin dashboard protected by Supabase Auth: CRUD for projects, skills, certificates, bio, and social links, plus CV PDF upload to Supabase Storage.
- When Supabase is not configured, the public page falls back to mock data in `src/lib/supabase/client.ts`.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, non-standard version; read `node_modules/next/dist/docs/` before writing code), React 19, Tailwind CSS 4, framer-motion, lucide-react, Supabase (Postgres, Auth, Storage). Deployment target: Vercel.
- All public content is driven by the CMS schema (`src/types/portfolio.ts`). Layouts must handle any number of projects, skills, and certificates, including zero and missing optional fields (demo, GitHub, Figma, and embed URLs).
- Project categories are dynamic (from the `categories` table), not hard-coded.
- The content-creation category embeds video (TikTok / Reels / YouTube).

## Brand Commitments

- Name: Bhisma. The site title currently uses "Bhisma.dev".
- Real personal photo at `public/profile.jpeg`, to be shown as a primary element, not as a small avatar.
- Standing preference (chosen 2026-09-25 over exploratory directions): the category-standard portfolio, executed at full craft. The quality bar is Apple and Stripe: spacious, precise, and trustworthy, with no novelty world.

## Evidence on Hand

- **Real:** the skill list, and the personal photo (`public/profile.jpeg`).
- **Placeholder / dummy (must not be presented as real):** every project (Cyberpulse, Aura, Neon Horizon, E-Commerce, Tech Review), every certificate (Meta, AWS, Google, Dicoding), the hero stats (years of experience, completed projects, client-satisfaction percentage), metrics inside project copy (for example "45% CTR boost" and "250k+ views"), the CV link (`#`), and the social links (bare domains).
- Future work must not invent testimonials, clients, numbers, or credentials. Designs must also look right once real content replaces the dummy data. Stats that cannot be backed with real numbers should be removed or kept CMS-driven, never hard-coded.

## Product Principles

1. **Proof over claims.** Real work and verifiable credentials carry the persuasion. Adjectives, fake metrics, and filler badges do not.
2. **Design and code together.** Every surface should show that the same person designs and builds it well.
3. **Two quick paths.** A recruiter can get to the CV, and a client can get to contact, from anywhere on the page.
4. **CMS-safe by default.** Layouts survive real, uneven, bilingual content from the admin dashboard.
5. **Personal, not templated.** The site should feel like Bhisma, not like a generated portfolio template.
