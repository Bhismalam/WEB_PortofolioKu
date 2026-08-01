-- Supabase Database Schema for Full-Stack CMS Web Portfolio

-- 1. Table: Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  rich_content TEXT,
  category TEXT NOT NULL CHECK (category IN ('web-dev', 'ui-ux', 'social-media', 'content-creation')),
  thumbnail_url TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  demo_url TEXT,
  github_url TEXT,
  figma_url TEXT,
  embed_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'design', 'tools')),
  icon_name TEXT NOT NULL,
  proficiency_level INT DEFAULT 80 CHECK (proficiency_level BETWEEN 1 AND 100),
  experience_years TEXT DEFAULT '1+ Thn',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: Profile Bio
CREATE TABLE IF NOT EXISTS public.profile_bio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT 'John Doe',
  headline TEXT NOT NULL DEFAULT 'Full-Stack Developer & UI/UX Designer',
  bio_summary TEXT NOT NULL,
  status_badge TEXT DEFAULT 'Available for Hire',
  cv_pdf_url TEXT,
  social_links JSONB DEFAULT '{"github": "", "linkedin": "", "instagram": "", "tiktok": ""}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_bio ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read access for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access for skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access for profile_bio" ON public.profile_bio FOR SELECT USING (true);

-- Authenticated Admin Policies (CRUD)
CREATE POLICY "Allow auth users write access for projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth users write access for skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth users write access for profile_bio" ON public.profile_bio FOR ALL USING (auth.role() = 'authenticated');

-- Storage Bucket Setup (Run in Supabase Storage Dashboard)
-- Bucket 1: 'portfolio-media' (Public)
-- Bucket 2: 'resumes' (Public)
