import React from 'react';
import { ConstellationBackground } from '@/components/public/ConstellationBackground';
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { SkillsBento } from '@/components/public/SkillsBento';
import { PortfolioShowcase } from '@/components/public/PortfolioShowcase';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/public/Footer';
import { MOCK_PROFILE, MOCK_SKILLS, MOCK_PROJECTS } from '@/lib/supabase/client';

export const metadata = {
  title: 'Bhisma.dev - Full-Stack Developer & UI/UX Specialist Portfolio',
  description: 'Portofolio interaktif Full-Stack Web Developer, UI/UX Designer, & Content Creator dengan tema Modern Tech, Glassmorphic UI, dan CMS Supabase.',
  openGraph: {
    title: 'Bhisma.dev - Full-Stack Developer Portfolio',
    description: 'Portofolio interaktif Full-Stack Web Developer, UI/UX Designer, & Content Creator.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen selection:bg-cyan-500 selection:text-black">
      {/* Animated Constellation & Aurora Background */}
      <ConstellationBackground />

      {/* Sticky Glassmorphism Header */}
      <Navbar profile={MOCK_PROFILE} cvUrl={MOCK_PROFILE.cv_pdf_url} statusBadge={MOCK_PROFILE.status_badge} />

      {/* Hero Section */}
      <Hero profile={MOCK_PROFILE} />

      {/* Skills & Tech Stack Bento Grid */}
      <SkillsBento skills={MOCK_SKILLS} />

      {/* Projects Catalog & Interactive Showcase */}
      <PortfolioShowcase projects={MOCK_PROJECTS} />

      {/* Contact Form Section */}
      <ContactSection profile={MOCK_PROFILE} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
