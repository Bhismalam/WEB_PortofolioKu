import { createBrowserClient } from '@supabase/ssr';
import { Project, Skill, ProfileBio, Category } from '@/types/portfolio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null;

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Web Dev', slug: 'web-dev' },
  { id: 'cat-2', name: 'UI/UX Design', slug: 'ui-ux' },
  { id: 'cat-3', name: 'Social Media', slug: 'social-media' },
  { id: 'cat-4', name: 'Content Creation', slug: 'content-creation' },
];

// Mock Fallback Data when Supabase DB is not connected yet
export const MOCK_PROFILE: ProfileBio = {
  full_name: 'Bhisma Tech',
  headline: 'Full-Stack Developer & UI/UX Specialist',
  bio_summary: 'Membangun aplikasi web modern berkinerja tinggi, antarmuka futuristik, dan konten visual kreatif dengan arsitektur skalabel.',
  status_badge: 'Available for Hire & Freelance',
  cv_pdf_url: '#',
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com'
  }
};

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'Next.js 14', category: 'frontend', icon_name: 'Code2', proficiency_level: 92, experience_years: '3+ Thn' },
  { id: '2', name: 'React.js', category: 'frontend', icon_name: 'Atom', proficiency_level: 95, experience_years: '4+ Thn' },
  { id: '3', name: 'TypeScript', category: 'frontend', icon_name: 'FileCode2', proficiency_level: 88, experience_years: '3+ Thn' },
  { id: '4', name: 'Tailwind CSS', category: 'frontend', icon_name: 'Palette', proficiency_level: 96, experience_years: '4+ Thn' },
  { id: '5', name: 'Node.js & Express', category: 'backend', icon_name: 'Server', proficiency_level: 85, experience_years: '3+ Thn' },
  { id: '6', name: 'PostgreSQL & Supabase', category: 'backend', icon_name: 'Database', proficiency_level: 87, experience_years: '2+ Thn' },
  { id: '7', name: 'Figma UI/UX', category: 'design', icon_name: 'Figma', proficiency_level: 90, experience_years: '3+ Thn' },
  { id: '8', name: 'Glassmorphic Design', category: 'design', icon_name: 'Sparkles', proficiency_level: 94, experience_years: '2+ Thn' },
  { id: '9', name: 'Git & GitHub', category: 'tools', icon_name: 'GitBranch', proficiency_level: 90, experience_years: '4+ Thn' },
  { id: '10', name: 'Docker / Vercel', category: 'tools', icon_name: 'Cpu', proficiency_level: 82, experience_years: '2+ Thn' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Cyberpulse AI Dashboard',
    slug: 'cyberpulse-ai-dashboard',
    description: 'Sistem pemantauan analytics AI berbasis Glassmorphism real-time dengan chart interaktif dan tema dark neon.',
    rich_content: 'Cyberpulse AI Dashboard dirancang untuk mengolah telemetry data secara live. Menggunakan Server-Sent Events (SSE) dan komponen chart modular.',
    category: 'web-dev',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Recharts'],
    demo_url: 'https://demo.example.com',
    github_url: 'https://github.com',
    featured: true
  },
  {
    id: 'p2',
    title: 'Aura Fintech Banking App UI/UX',
    slug: 'aura-fintech-banking',
    description: 'Desain antarmuka dompet digital futuristik dengan efek glassmorphism transparan dan micro-interactions modern.',
    rich_content: 'Riset UX mendalam untuk pengguna generasi Z, mempermudah investasi dan transfer antar bank dengan otentikasi biometrik.',
    category: 'ui-ux',
    thumbnail_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Figma', 'Prototyping', 'Design System', 'Glassmorphism'],
    figma_url: 'https://figma.com',
    featured: true
  },
  {
    id: 'p3',
    title: 'Neon Horizon Social Campaign',
    slug: 'neon-horizon-social',
    description: 'Seri desain konten media sosial high-engagement untuk peluncuran produk Cyberpunk Brand.',
    rich_content: 'Desain banner Instagram Carousel 10-slide dan template TikTok Story yang menghasilkan 45% boost CTR.',
    category: 'social-media',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Adobe Photoshop', 'Illustrator', '3D Blender'],
    demo_url: 'https://instagram.com',
    featured: false
  },
  {
    id: 'p4',
    title: 'Full-Stack Next.js E-Commerce Showcase',
    slug: 'nextjs-ecommerce-showcase',
    description: 'Website E-Commerce kustom dengan Stripe Payment Gateway, CMS admin panel, dan kalkulasi ongkir otomatis.',
    rich_content: 'Integrasi penuh Supabase Database, Auth RLS, dan Vercel Edge Functions untuk performa maksimal.',
    category: 'web-dev',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Next.js', 'Tailwind CSS', 'Stripe', 'Supabase'],
    demo_url: 'https://demo.example.com',
    github_url: 'https://github.com',
    featured: true
  },
  {
    id: 'p5',
    title: 'Tech Review TikTok & Reels Video',
    slug: 'tech-review-reels',
    description: 'Konten video pendek ulasan teknologi & coding tips dengan 250k+ total views di TikTok & Instagram.',
    rich_content: 'Video interaktif yang mengajarkan konsep Async/Await JavaScript dan tips produktivitas VS Code.',
    category: 'content-creation',
    thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['CapCut Pro', 'Premiere Pro', 'Audio Motion'],
    embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false
  }
];
