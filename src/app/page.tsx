import React from 'react';
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
  title: 'Bhisma — Web Developer & UI/UX Designer',
  description: 'Portofolio Bhisma: merancang antarmuka dan membangunnya sampai jadi. Web development, UI/UX design, dan konten.',
  openGraph: {
    title: 'Bhisma — Web Developer & UI/UX Designer',
    description: 'Merancang antarmuka dan membangunnya sampai jadi.',
    type: 'website',
  },
};

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Content counts as sample until the owner marks it real (PORTFOLIO_CONTENT_READY=true),
// so dummy rows stored in Supabase are never presented as genuine work or credentials.
const contentReady = process.env.PORTFOLIO_CONTENT_READY === 'true';

async function getPortfolioData() {
  let profile: ProfileBio = MOCK_PROFILE;
  let skills: Skill[] = MOCK_SKILLS;
  let certificates: Certificate[] = MOCK_CERTIFICATES;
  let projects: Project[] = MOCK_PROJECTS;
  let categories: Category[] = MOCK_CATEGORIES;

  let sampleProjects = true;
  let sampleCertificates = true;

  if (!hasSupabaseConfig) {
    return { profile, skills, certificates, projects, categories, sampleProjects, sampleCertificates };
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
  if (certsRes.data && certsRes.data.length > 0) { certificates = certsRes.data; sampleCertificates = !contentReady; }
  if (projectsRes.data && projectsRes.data.length > 0) { projects = projectsRes.data; sampleProjects = !contentReady; }
  if (categoriesRes.data && categoriesRes.data.length > 0) categories = categoriesRes.data;

  return { profile, skills, certificates, projects, categories, sampleProjects, sampleCertificates };
}

export default async function HomePage() {
  const { profile, skills, certificates, projects, categories, sampleProjects, sampleCertificates } = await getPortfolioData();

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <PortfolioShowcase projects={projects} categories={categories} isSample={sampleProjects} />
        <SkillsBento skills={skills} />
        <CertificatesSection certificates={certificates} isSample={sampleCertificates} />
        <ContactSection profile={profile} />
      </main>
      <Footer name={profile.full_name} />
    </>
  );
}
