export type ProjectCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
  name_en?: string;
}

export interface Project {
  id: string;
  title: string;
  title_en?: string;
  slug: string;
  description: string;
  description_en?: string;
  rich_content?: string;
  rich_content_en?: string;
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
  experience_years_en?: string;
}

export interface ProfileBio {
  id?: string;
  full_name: string;
  headline: string;
  headline_en?: string;
  bio_summary: string;
  bio_summary_en?: string;
  status_badge: string;
  status_badge_en?: string;
  cv_pdf_url: string;
  social_links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  issue_date_en?: string;
  credential_id?: string;
  credential_url?: string;
  image_url: string;
  skills: string[];
}


