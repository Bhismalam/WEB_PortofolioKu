import { createBrowserClient } from '@supabase/ssr';
import { Project, Skill, ProfileBio, Category, Certificate } from '@/types/portfolio';

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
  headline_en: 'Full-Stack Developer & UI/UX Specialist',
  bio_summary: 'Membangun aplikasi web modern berkinerja tinggi, antarmuka futuristik, dan konten visual kreatif dengan arsitektur skalabel.',
  bio_summary_en: 'Building high-performance modern web applications, futuristic interfaces, and creative visual content with scalable architecture.',
  status_badge: 'Available for Hire & Freelance',
  status_badge_en: 'Available for Hire & Freelance',
  cv_pdf_url: '#',
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com'
  }
};

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'Next.js 14', category: 'frontend', icon_name: 'Code2', proficiency_level: 92, experience_years: '3+ Thn', experience_years_en: '3+ Yrs' },
  { id: '2', name: 'React.js', category: 'frontend', icon_name: 'Atom', proficiency_level: 95, experience_years: '4+ Thn', experience_years_en: '4+ Yrs' },
  { id: '3', name: 'TypeScript', category: 'frontend', icon_name: 'FileCode2', proficiency_level: 88, experience_years: '3+ Thn', experience_years_en: '3+ Yrs' },
  { id: '4', name: 'Tailwind CSS', category: 'frontend', icon_name: 'Palette', proficiency_level: 96, experience_years: '4+ Thn', experience_years_en: '4+ Yrs' },
  { id: '5', name: 'Node.js & Express', category: 'backend', icon_name: 'Server', proficiency_level: 85, experience_years: '3+ Thn', experience_years_en: '3+ Yrs' },
  { id: '6', name: 'PostgreSQL & Supabase', category: 'backend', icon_name: 'Database', proficiency_level: 87, experience_years: '2+ Thn', experience_years_en: '2+ Yrs' },
  { id: '7', name: 'Figma UI/UX', category: 'design', icon_name: 'Figma', proficiency_level: 90, experience_years: '3+ Thn', experience_years_en: '3+ Yrs' },
  { id: '8', name: 'Glassmorphic Design', category: 'design', icon_name: 'Sparkles', proficiency_level: 94, experience_years: '2+ Thn', experience_years_en: '2+ Yrs' },
  { id: '9', name: 'Git & GitHub', category: 'tools', icon_name: 'GitBranch', proficiency_level: 90, experience_years: '4+ Thn', experience_years_en: '4+ Yrs' },
  { id: '10', name: 'Docker / Vercel', category: 'tools', icon_name: 'Cpu', proficiency_level: 82, experience_years: '2+ Thn', experience_years_en: '2+ Yrs' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Cyberpulse AI Dashboard',
    slug: 'cyberpulse-ai-dashboard',
    description: 'Sistem pemantauan analytics AI berbasis Glassmorphism real-time dengan chart interaktif dan tema dark neon.',
    description_en: 'Real-time Glassmorphism AI analytics monitoring system with interactive charts and dark neon theme.',
    rich_content: 'Cyberpulse AI Dashboard dirancang untuk mengolah telemetry data secara live. Menggunakan Server-Sent Events (SSE) dan komponen chart modular.',
    rich_content_en: 'Cyberpulse AI Dashboard is engineered for live telemetry data processing. Built using Server-Sent Events (SSE) and modular chart components.',
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
    description_en: 'Futuristic digital wallet interface design featuring transparent glassmorphism effects and modern micro-interactions.',
    rich_content: 'Riset UX mendalam untuk pengguna generasi Z, mempermudah investasi dan transfer antar bank dengan otentikasi biometrik.',
    rich_content_en: 'In-depth UX research tailored for Gen-Z users, streamlining investments and interbank transfers with biometric authentication.',
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
    description_en: 'High-engagement social media content design series for Cyberpunk Brand product launches.',
    rich_content: 'Desain banner Instagram Carousel 10-slide dan template TikTok Story yang menghasilkan 45% boost CTR.',
    rich_content_en: '10-slide Instagram Carousel banner designs and TikTok Story templates resulting in a 45% CTR boost.',
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
    description_en: 'Custom E-Commerce website with Stripe Payment Gateway, CMS admin panel, and automated shipping calculations.',
    rich_content: 'Integrasi penuh Supabase Database, Auth RLS, dan Vercel Edge Functions untuk performa maksimal.',
    rich_content_en: 'Full integration with Supabase Database, Auth RLS, and Vercel Edge Functions for maximum performance.',
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
    description_en: 'Short-form video content reviewing tech & coding tips with 250k+ total views across TikTok & Instagram.',
    rich_content: 'Video interaktif yang mengajarkan konsep Async/Await JavaScript dan tips produktivitas VS Code.',
    rich_content_en: 'Interactive videos teaching JavaScript Async/Await concepts and VS Code productivity tips.',
    category: 'content-creation',
    thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['CapCut Pro', 'Premiere Pro', 'Audio Motion'],
    embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera / Meta',
    issue_date: 'Jan 2024',
    issue_date_en: 'Jan 2024',
    credential_id: 'CERT-META-FE-8921',
    credential_url: 'https://coursera.org/verify/example',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    skills: ['React.js', 'JavaScript ES6+', 'UI/UX Design', 'CSS Frameworks']
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issue_date: 'Nov 2023',
    issue_date_en: 'Nov 2023',
    credential_id: 'AWS-CCP-992014',
    credential_url: 'https://aws.amazon.com/verification',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    skills: ['Cloud Computing', 'AWS S3', 'EC2', 'Serverless']
  },
  {
    id: 'cert-3',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    issue_date: 'Agu 2023',
    issue_date_en: 'Aug 2023',
    credential_id: 'GGL-UX-77402',
    credential_url: 'https://coursera.org/verify/example',
    image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping']
  },
  {
    id: 'cert-4',
    title: 'Full-Stack Web Development Bootcamp',
    issuer: 'Dicoding Academy',
    issue_date: 'Mei 2023',
    issue_date_en: 'May 2023',
    credential_id: 'DICODING-FS-4412',
    credential_url: 'https://dicoding.com/certificates/example',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'RESTful API']
  }
];
