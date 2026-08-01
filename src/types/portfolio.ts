export type ProjectCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  rich_content?: string;
  category: string;
  thumbnail_url: string;
  tech_stack: string[];
  demo_url?: string;
  github_url?: string;
  figma_url?: string;
  embed_url?: string;
  featured?: boolean;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | string;
  icon_name: string;
  proficiency_level: number;
  experience_years: string;
}

export interface ProfileBio {
  id?: string;
  full_name: string;
  headline: string;
  bio_summary: string;
  status_badge: string;
  cv_pdf_url: string;
  social_links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
}
