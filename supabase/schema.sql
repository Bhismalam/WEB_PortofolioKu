-- Supabase Database Schema for Full-Stack CMS Web Portfolio
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS everywhere.

-- 1. Table: Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  description_en TEXT,
  rich_content TEXT,
  rich_content_en TEXT,
  category TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  demo_url TEXT,
  github_url TEXT,
  figma_url TEXT,
  embed_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add new columns if the table already existed from a previous version of this schema
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS rich_content_en TEXT;
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- 3. Table: Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'design', 'tools')),
  icon_name TEXT NOT NULL,
  proficiency_level INT DEFAULT 80 CHECK (proficiency_level BETWEEN 1 AND 100),
  experience_years TEXT DEFAULT '1+ Thn',
  experience_years_en TEXT DEFAULT '1+ Yrs',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS experience_years_en TEXT DEFAULT '1+ Yrs';

-- 4. Table: Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  issue_date_en TEXT,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: Profile Bio
CREATE TABLE IF NOT EXISTS public.profile_bio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT 'John Doe',
  headline TEXT NOT NULL DEFAULT 'Full-Stack Developer & UI/UX Designer',
  headline_en TEXT,
  bio_summary TEXT NOT NULL,
  bio_summary_en TEXT,
  status_badge TEXT DEFAULT 'Available for Hire',
  status_badge_en TEXT,
  cv_pdf_url TEXT,
  social_links JSONB DEFAULT '{"github": "", "linkedin": "", "instagram": "", "tiktok": ""}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profile_bio ADD COLUMN IF NOT EXISTS headline_en TEXT;
ALTER TABLE public.profile_bio ADD COLUMN IF NOT EXISTS bio_summary_en TEXT;
ALTER TABLE public.profile_bio ADD COLUMN IF NOT EXISTS status_badge_en TEXT;

-- Seed a single profile row if the table is empty (dashboard expects exactly one row)
INSERT INTO public.profile_bio (full_name, headline, bio_summary, status_badge)
SELECT 'Bhisma Tech', 'Full-Stack Developer & UI/UX Specialist', 'Membangun aplikasi web modern.', 'Available for Hire'
WHERE NOT EXISTS (SELECT 1 FROM public.profile_bio);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_bio ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (anyone can view the portfolio content)
DROP POLICY IF EXISTS "Allow public read access for categories" ON public.categories;
CREATE POLICY "Allow public read access for categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for projects" ON public.projects;
CREATE POLICY "Allow public read access for projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for skills" ON public.skills;
CREATE POLICY "Allow public read access for skills" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for certificates" ON public.certificates;
CREATE POLICY "Allow public read access for certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for profile_bio" ON public.profile_bio;
CREATE POLICY "Allow public read access for profile_bio" ON public.profile_bio FOR SELECT USING (true);

-- Admin-only Write Policies (CRUD restricted to this single owner account)
-- Change the email below if you ever log in with a different admin address.
DROP POLICY IF EXISTS "Allow auth users write access for projects" ON public.projects;
DROP POLICY IF EXISTS "Admin only write access for categories" ON public.categories;
CREATE POLICY "Admin only write access for categories" ON public.categories
  FOR ALL USING (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com');

DROP POLICY IF EXISTS "Admin only write access for projects" ON public.projects;
CREATE POLICY "Admin only write access for projects" ON public.projects
  FOR ALL USING (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com');

DROP POLICY IF EXISTS "Allow auth users write access for skills" ON public.skills;
DROP POLICY IF EXISTS "Admin only write access for skills" ON public.skills;
CREATE POLICY "Admin only write access for skills" ON public.skills
  FOR ALL USING (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com');

DROP POLICY IF EXISTS "Admin only write access for certificates" ON public.certificates;
CREATE POLICY "Admin only write access for certificates" ON public.certificates
  FOR ALL USING (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com');

DROP POLICY IF EXISTS "Allow auth users write access for profile_bio" ON public.profile_bio;
DROP POLICY IF EXISTS "Admin only write access for profile_bio" ON public.profile_bio;
CREATE POLICY "Admin only write access for profile_bio" ON public.profile_bio
  FOR ALL USING (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'bagusbhismantara12@gmail.com');

-- Storage Bucket Setup (create these manually in Supabase Storage Dashboard)
-- Bucket 1: 'portfolio-media' (Public) — project thumbnails & certificate images
-- Bucket 2: 'resumes' (Public) — CV PDF uploads
