import React from 'react';
import { ConstellationBackground } from '@/components/public/ConstellationBackground';
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { SkillsBento } from '@/components/public/SkillsBento';
import { CertificatesSection } from '@/components/public/CertificatesSection';
import { PortfolioShowcase } from '@/components/public/PortfolioShowcase';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/public/Footer';
import { MOCK_PROFILE, MOCK_SKILLS, MOCK_PROJECTS, MOCK_CERTIFICATES, MOCK_CATEGORIES } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { ProfileBio, Skill, Project, Certificate, Category } from '@/types/portfolio';

export const metadata = {
  title: 'Bhisma.dev - Full-Stack Developer & UI/UX Specialist Portfolio',
  description: 'Portofolio interaktif Full-Stack Web Developer, UI/UX Designer, & Content Creator dengan tema Modern Tech, Glassmorphic UI, dan CMS Supabase.',
  openGraph: {
    title: 'Bhisma.dev - Full-Stack Developer Portfolio',
    description: 'Portofolio interaktif Full-Stack Web Developer, UI/UX Designer, & Content Creator.',
    type: 'website',
  },
};

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getPortfolioData() {
  let profile: ProfileBio = MOCK_PROFILE;
  let skills: Skill[] = MOCK_SKILLS;
  let certificates: Certificate[] = MOCK_CERTIFICATES;
  let projects: Project[] = MOCK_PROJECTS;
  let categories: Category[] = MOCK_CATEGORIES;

  if (!hasSupabaseConfig) {
    return { profile, skills, certificates, projects, categories };
  }

  const supabase = await createClient();

  const [profileRes, skillsRes, certsRes, projectsRes, categoriesRes] = await Promise.all([
    supabase.from('profile_bio').select('*').limit(1).maybeSingle(),
    supabase.from('skills').select('*').order('created_at', { ascending: true }),
    supabase.from('certificates').select('*').order('created_at', { ascending: false }),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name', { ascending: true }),
  ]);

  if (profileRes.data) profile = profileRes.data;
  if (skillsRes.data && skillsRes.data.length > 0) skills = skillsRes.data;
  if (certsRes.data && certsRes.data.length > 0) certificates = certsRes.data;
  if (projectsRes.data && projectsRes.data.length > 0) projects = projectsRes.data;
  if (categoriesRes.data && categoriesRes.data.length > 0) categories = categoriesRes.data;

  return { profile, skills, certificates, projects, categories };
}

export default async function HomePage() {
  const { profile, skills, certificates, projects, categories } = await getPortfolioData();

  return (
    <main className="relative min-h-screen selection:bg-blue-500 selection:text-black">
      {/* Animated Constellation & Aurora Background */}
      <ConstellationBackground />

      {/* Sticky Glassmorphism Header */}
      <Navbar profile={profile} cvUrl={profile.cv_pdf_url} statusBadge={profile.status_badge} />

      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Skills & Tech Stack Bento Grid */}
      <SkillsBento skills={skills} />

      {/* Official Certificates & Accreditations */}
      <CertificatesSection certificates={certificates} />

      {/* Projects Catalog & Interactive Showcase */}
      <PortfolioShowcase projects={projects} categories={categories} />

      {/* Contact Form Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
