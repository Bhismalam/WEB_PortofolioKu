'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FolderKanban, Layers, UserCheck, Plus, Trash2, Edit3, 
  LogOut, Database, FileText, Upload, Globe, Tag, Award, ShieldCheck 
} from 'lucide-react';
import { Project, Skill, ProfileBio, ProjectCategory, Category, Certificate } from '@/types/portfolio';
import { MOCK_PROJECTS, MOCK_SKILLS, MOCK_PROFILE, MOCK_CATEGORIES, MOCK_CERTIFICATES, supabase } from '@/lib/supabase/client';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Portal } from '@/components/public/Portal';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'categories' | 'certificates' | 'profile'>('projects');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [profile, setProfile] = useState<ProfileBio>(MOCK_PROFILE);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);

  const [loading, setLoading] = useState(true);

  // Load all CMS data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const [projRes, skillRes, profRes, catRes, certRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('created_at', { ascending: true }),
        supabase.from('profile_bio').select('*').limit(1).maybeSingle(),
        supabase.from('categories').select('*').order('name', { ascending: true }),
        supabase.from('certificates').select('*').order('created_at', { ascending: false }),
      ]);
      if (projRes.data) setProjects(projRes.data);
      if (skillRes.data) setSkills(skillRes.data);
      if (profRes.data) setProfile(profRes.data);
      if (catRes.data && catRes.data.length > 0) setCategories(catRes.data);
      if (certRes.data) setCertificates(certRes.data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Custom Delete Confirm Modal State
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    type: 'project' | 'skill' | 'category' | 'certificate' | null;
    id: string | null;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    title: '',
    message: ''
  });

  // Form State for Project CRUD
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'web-dev' as ProjectCategory,
    description: '',
    rich_content: '',
    thumbnail_url: '',
    tech_stack_raw: '',
    demo_url: '',
    github_url: '',
    figma_url: '',
    embed_url: ''
  });

  // State for CV Upload
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  // Uploads a file to a Supabase Storage bucket and returns its public URL
  const uploadToStorage = async (bucket: string, folder: string, file: File): Promise<string | null> => {
    if (!supabase) {
      alert('Supabase belum dikonfigurasi.');
      return null;
    }
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) {
      alert('Gagal upload file: ' + error.message);
      return null;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Harap pilih file berformat PDF!');
      return;
    }

    const url = await uploadToStorage('resumes', 'cv', file);
    if (!url) return;
    setCvFileName(file.name);
    setProfile(prev => ({ ...prev, cv_pdf_url: url }));
  };

  // Handler for Certificate Image File Upload
  const handleCertImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar berformat PNG, JPG, atau WEBP!');
      return;
    }

    const url = await uploadToStorage('portfolio-media', 'certificates', file);
    if (!url) return;
    setCertForm(prev => ({ ...prev, image_url: url }));
  };

  // Handler for Project Thumbnail File Upload
  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar berformat PNG, JPG, atau WEBP!');
      return;
    }

    const url = await uploadToStorage('portfolio-media', 'projects', file);
    if (!url) return;
    setProjectForm(prev => ({ ...prev, thumbnail_url: url }));
  };

  // Form State for Skill CRUD
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'design' | 'tools',
    icon_name: 'Code2',
    proficiency_level: 85,
    experience_years: '2+ Thn'
  });

  // Form State for Category CRUD
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Form State for Certificate CRUD
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_id: '',
    credential_url: '',
    image_url: '',
    skills_raw: ''
  });

  // Save Profile Bio (single-row upsert)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) { alert('Supabase belum dikonfigurasi.'); return; }

    const payload = {
      full_name: profile.full_name,
      status_badge: profile.status_badge,
      bio_summary: profile.bio_summary,
      cv_pdf_url: profile.cv_pdf_url,
      social_links: profile.social_links
    };

    if (profile.id) {
      const { data, error } = await supabase.from('profile_bio').update(payload).eq('id', profile.id).select().single();
      if (error) { alert('Gagal memperbarui profil: ' + error.message); return; }
      setProfile(data);
    } else {
      const { data, error } = await supabase.from('profile_bio').insert(payload).select().single();
      if (error) { alert('Gagal memperbarui profil: ' + error.message); return; }
      setProfile(data);
    }

    alert('Profil berhasil diperbarui!');
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  };

  // Open Project Form for Create or Edit
  const openProjectForm = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        category: project.category,
        description: project.description,
        rich_content: project.rich_content || '',
        thumbnail_url: project.thumbnail_url,
        tech_stack_raw: project.tech_stack.join(', '),
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        figma_url: project.figma_url || '',
        embed_url: project.embed_url || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: categories[0]?.slug || 'web-dev',
        description: '',
        rich_content: '',
        thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        tech_stack_raw: 'Next.js, TypeScript, Tailwind',
        demo_url: '',
        github_url: '',
        figma_url: '',
        embed_url: ''
      });
    }
    setShowProjectModal(true);
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) { alert('Supabase belum dikonfigurasi.'); return; }
    const techArray = projectForm.tech_stack_raw.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      rich_content: projectForm.rich_content || null,
      thumbnail_url: projectForm.thumbnail_url,
      tech_stack: techArray,
      demo_url: projectForm.demo_url || null,
      github_url: projectForm.github_url || null,
      figma_url: projectForm.figma_url || null,
      embed_url: projectForm.embed_url || null
    };

    if (editingProject) {
      const { data, error } = await supabase.from('projects').update(payload).eq('id', editingProject.id).select().single();
      if (error) { alert('Gagal menyimpan proyek: ' + error.message); return; }
      setProjects(projects.map(p => p.id === editingProject.id ? data : p));
    } else {
      const slug = projectForm.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
      const { data, error } = await supabase.from('projects').insert({ ...payload, slug }).select().single();
      if (error) { alert('Gagal menyimpan proyek: ' + error.message); return; }
      setProjects([data, ...projects]);
    }

    setShowProjectModal(false);
  };

  // Add New Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim() || !supabase) return;

    const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'cat-' + Date.now();
    const { data, error } = await supabase.from('categories').insert({ name: newCategoryName.trim(), slug }).select().single();
    if (error) { alert('Gagal menambah kategori: ' + error.message); return; }

    setCategories([...categories, data]);
    setNewCategoryName('');
    setShowCategoryModal(false);
  };

  // Trigger Custom Delete Confirmation Modal for Project
  const promptDeleteProject = (proj: Project) => {
    setConfirmDelete({
      isOpen: true,
      type: 'project',
      id: proj.id,
      title: `Hapus Proyek "${proj.title}"?`,
      message: `Apakah Anda yakin ingin menghapus proyek ini dari portofolio Anda secara permanen?`
    });
  };

  // Trigger Custom Delete Confirmation Modal for Skill
  const promptDeleteSkill = (skill: Skill) => {
    setConfirmDelete({
      isOpen: true,
      type: 'skill',
      id: skill.id,
      title: `Hapus Skill "${skill.name}"?`,
      message: `Apakah Anda yakin ingin menghapus keahlian "${skill.name}" ini dari daftar tech stack?`
    });
  };

  // Trigger Custom Delete Confirmation Modal for Category
  const promptDeleteCategory = (cat: Category) => {
    setConfirmDelete({
      isOpen: true,
      type: 'category',
      id: cat.id,
      title: `Hapus Kategori "${cat.name}"?`,
      message: `Apakah Anda yakin ingin menghapus kategori "${cat.name}" ini dari pilihan katalog?`
    });
  };

  // Trigger Custom Delete Confirmation Modal for Certificate
  const promptDeleteCert = (cert: Certificate) => {
    setConfirmDelete({
      isOpen: true,
      type: 'certificate',
      id: cert.id,
      title: `Hapus Sertifikat "${cert.title}"?`,
      message: `Apakah Anda yakin ingin menghapus sertifikat "${cert.title}" ini dari lisensi publik?`
    });
  };

  // Execute Deletion after confirmation
  const handleConfirmDelete = async () => {
    const { type, id } = confirmDelete;
    if (!supabase || !id) {
      setConfirmDelete({ isOpen: false, type: null, id: null, title: '', message: '' });
      return;
    }

    const tableByType: Record<string, string> = {
      project: 'projects',
      skill: 'skills',
      category: 'categories',
      certificate: 'certificates'
    };
    const table = type ? tableByType[type] : null;

    if (table) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus: ' + error.message);
        setConfirmDelete({ isOpen: false, type: null, id: null, title: '', message: '' });
        return;
      }
    }

    if (type === 'project') {
      setProjects(projects.filter(p => p.id !== id));
    } else if (type === 'skill') {
      setSkills(skills.filter(s => s.id !== id));
    } else if (type === 'category') {
      setCategories(categories.filter(c => c.id !== id));
    } else if (type === 'certificate') {
      setCertificates(certificates.filter(c => c.id !== id));
    }
    setConfirmDelete({ isOpen: false, type: null, id: null, title: '', message: '' });
  };

  // Add Skill
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const payload = {
      name: skillForm.name,
      category: skillForm.category,
      icon_name: skillForm.icon_name,
      proficiency_level: Number(skillForm.proficiency_level),
      experience_years: skillForm.experience_years
    };
    const { data, error } = await supabase.from('skills').insert(payload).select().single();
    if (error) { alert('Gagal menambah skill: ' + error.message); return; }
    setSkills([...skills, data]);
    setShowSkillModal(false);
    setSkillForm({ name: '', category: 'frontend', icon_name: 'Code2', proficiency_level: 85, experience_years: '2+ Thn' });
  };

  // Open Certificate Form for Create or Edit
  const openCertForm = (cert?: Certificate) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title,
        issuer: cert.issuer,
        issue_date: cert.issue_date,
        credential_id: cert.credential_id || '',
        credential_url: cert.credential_url || '',
        image_url: cert.image_url,
        skills_raw: cert.skills ? cert.skills.join(', ') : ''
      });
    } else {
      setEditingCert(null);
      setCertForm({
        title: '',
        issuer: '',
        issue_date: 'Jan 2024',
        credential_id: '',
        credential_url: '',
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        skills_raw: 'React.js, TypeScript'
      });
    }
    setShowCertModal(true);
  };

  // Save Certificate (Create or Update)
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) { alert('Supabase belum dikonfigurasi.'); return; }
    const skillsArray = certForm.skills_raw.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      title: certForm.title,
      issuer: certForm.issuer,
      issue_date: certForm.issue_date,
      credential_id: certForm.credential_id || null,
      credential_url: certForm.credential_url || null,
      image_url: certForm.image_url,
      skills: skillsArray
    };

    if (editingCert) {
      const { data, error } = await supabase.from('certificates').update(payload).eq('id', editingCert.id).select().single();
      if (error) { alert('Gagal menyimpan sertifikat: ' + error.message); return; }
      setCertificates(certificates.map(c => c.id === editingCert.id ? data : c));
    } else {
      const { data, error } = await supabase.from('certificates').insert(payload).select().single();
      if (error) { alert('Gagal menyimpan sertifikat: ' + error.message); return; }
      setCertificates([data, ...certificates]);
    }

    setShowCertModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-navbar border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 p-[1px]">
              <div className="w-full h-full bg-[#12161f] rounded-[11px] flex items-center justify-center font-bold text-blue-300 text-xs font-mono-tech">
                CMS
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-sm font-mono-tech">CMS DASHBOARD</span>
              <div className="text-[10px] text-blue-400">Admin Control Panel</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderKanban className="w-4 h-4" /> Kelola Proyek ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'categories' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tag className="w-4 h-4" /> Kelola Kategori ({categories.length})
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'skills' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" /> Kelola Skills ({skills.length})
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'certificates' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" /> Kelola Sertifikat ({certificates.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4" /> Profil & Resume CV
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <a 
            href="/"
            target="_blank"
            className="w-full mb-2 py-2.5 px-4 rounded-xl glass-card text-xs text-blue-300 font-mono-tech flex items-center justify-center gap-2 hover:bg-white/10"
          >
            <Globe className="w-3.5 h-3.5" /> Lihat Website Publik
          </a>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono-tech flex items-center justify-center gap-2 transition-colors border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeTab === 'projects' && 'Kelola Katalog Proyek'}
              {activeTab === 'categories' && 'Kelola Kategori Portofolio'}
              {activeTab === 'skills' && 'Kelola Tech Stack & Skills'}
              {activeTab === 'certificates' && 'Kelola Lisensi & Sertifikasi Resmi'}
              {activeTab === 'profile' && 'Pengaturan Profil & Dynamic CV'}
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono-tech">
              Perubahan di sini akan memperbarui tampilan Halaman Publik secara instan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full border text-xs font-mono-tech flex items-center gap-1.5 ${
              supabase
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              <Database className="w-3.5 h-3.5" /> Supabase Status: {supabase ? 'Connected' : 'Not Configured'}
            </div>
          </div>
        </header>

        {loading && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono-tech">
            Memuat data dari Supabase...
          </div>
        )}

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Daftar Karya Portofolio</h2>
              <button
                onClick={() => openProjectForm()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Proyek Baru
              </button>
            </div>

            {/* Projects Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-gray-400 font-mono-tech uppercase border-b border-white/10">
                  <tr>
                    <th className="p-4">Thumbnail & Judul</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Tech Stack</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={proj.thumbnail_url} 
                          alt={proj.title}
                          className="w-12 h-12 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{proj.title}</div>
                          <div className="text-gray-400 line-clamp-1 max-w-xs">{proj.description}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono-tech text-blue-300">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 uppercase text-[10px]">
                          {proj.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {proj.tech_stack.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-300 font-mono-tech text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openProjectForm(proj)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-blue-400"
                          title="Edit Proyek"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDeleteProject(proj)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Daftar Kategori Karya</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono-tech">
                  Kategori ini akan otomatis muncul pada filter tab Halaman Publik & Pilihan Dropdown Proyek.
                </p>
              </div>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Kategori Baru
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group hover:border-blue-500/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                      <p className="text-xs text-blue-400 font-mono-tech">Slug: {cat.slug}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => promptDeleteCategory(cat)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    title="Hapus Kategori"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS MANAGEMENT */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Daftar Keahlian & Tools</h2>
              <button
                onClick={() => setShowSkillModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Skill Baru
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="glass-card rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{skill.name}</h3>
                    <p className="text-xs text-blue-400 font-mono-tech">Category: {skill.category} ({skill.proficiency_level}%)</p>
                  </div>
                  <button
                    onClick={() => promptDeleteSkill(skill)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    title="Hapus Skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES MANAGEMENT */}
        {activeTab === 'certificates' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Daftar Sertifikat & Akreditasi</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono-tech">
                  Sertifikat di bawah akan tampil di section publik `#certificates` untuk memvalidasi kompetensi Anda.
                </p>
              </div>
              <button
                onClick={() => openCertForm()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Sertifikat Baru
              </button>
            </div>

            {/* Certificates Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-gray-400 font-mono-tech uppercase border-b border-white/10">
                  <tr>
                    <th className="p-4">Gambar & Judul Sertifikat</th>
                    <th className="p-4">Penerbit & Tanggal</th>
                    <th className="p-4">ID / Link Kredensial</th>
                    <th className="p-4">Keahlian Teruji</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={cert.image_url} 
                          alt={cert.title}
                          className="w-14 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{cert.title}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono-tech">
                        <div className="text-blue-300 font-bold">{cert.issuer}</div>
                        <div className="text-gray-400 text-[11px]">{cert.issue_date}</div>
                      </td>
                      <td className="p-4 font-mono-tech text-gray-300">
                        {cert.credential_id && (
                          <div className="text-blue-300">ID: {cert.credential_id}</div>
                        )}
                        {cert.credential_url ? (
                          <a 
                            href={cert.credential_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                          >
                            <ShieldCheck className="w-3 h-3" /> Verifikasi URL
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">Tanpa Link</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cert.skills?.map((s, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-300 font-mono-tech text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openCertForm(cert)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-blue-400"
                          title="Edit Sertifikat"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDeleteCert(cert)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Hapus Sertifikat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & RESUME */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl glass-card rounded-3xl p-8 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6">Edit Profile Bio & Dynamic Resume</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono-tech">
              <div>
                <label className="block text-gray-300 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={profile.full_name} 
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Status Badge Text</label>
                <input 
                  type="text" 
                  value={profile.status_badge} 
                  onChange={(e) => setProfile({ ...profile, status_badge: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Bio Ringkasan</label>
                <textarea
                  rows={4}
                  value={profile.bio_summary}
                  onChange={(e) => setProfile({ ...profile, bio_summary: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input resize-none"
                />
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <label className="block text-blue-300 font-bold mb-1 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Tautan Media Sosial
                </label>
                <div>
                  <label className="block text-gray-400 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    placeholder="https://www.instagram.com/username"
                    value={profile.social_links.instagram || ''}
                    onChange={(e) => setProfile({ ...profile, social_links: { ...profile.social_links, instagram: e.target.value } })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">TikTok URL</label>
                  <input
                    type="text"
                    placeholder="https://www.tiktok.com/@username"
                    value={profile.social_links.tiktok || ''}
                    onChange={(e) => setProfile({ ...profile, social_links: { ...profile.social_links, tiktok: e.target.value } })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    placeholder="https://www.linkedin.com/in/username"
                    value={profile.social_links.linkedin || ''}
                    onChange={(e) => setProfile({ ...profile, social_links: { ...profile.social_links, linkedin: e.target.value } })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/username"
                    value={profile.social_links.github || ''}
                    onChange={(e) => setProfile({ ...profile, social_links: { ...profile.social_links, github: e.target.value } })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              </div>

              {/* Dynamic Resume PDF Upload Handler */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-blue-300 font-bold mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Upload CV Resume PDF Terbaru
                </label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-gray-300 text-xs mb-1">Pilih file PDF CV dari perangkat Anda (Maks 5MB)</p>
                  
                  {cvFileName ? (
                    <div className="my-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                      <span className="flex items-center gap-2 truncate max-w-xs">
                        <FileText className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{cvFileName}</span>
                      </span>
                      <a 
                        href={profile.cv_pdf_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] underline"
                      >
                        Pratinjau CV
                      </a>
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-400 italic">Belum ada file baru dipilih</p>
                  )}

                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleCvUpload}
                    className="hidden" 
                    id="cv-upload" 
                  />
                  <label 
                    htmlFor="cv-upload" 
                    className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold cursor-pointer hover:opacity-90 shadow-md shadow-blue-900/40 transition-all text-xs"
                  >
                    {cvFileName ? 'Ganti File PDF' : 'Pilih File PDF CV'}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-sm tracking-wide mt-6"
              >
                Simpan Perubahan Bio
              </button>
            </form>
          </div>
        )}

      </main>

      {/* PROJECT CRUD MODAL */}
      {showProjectModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/20 bg-[#12161f]">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono-tech">
              <div>
                <label className="block text-gray-300 mb-1">Judul Proyek *</label>
                <input 
                  type="text" 
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Kategori *</label>
                  <select 
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                    className="w-full p-3 rounded-xl glass-input bg-[#12161f] text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.slug} className="bg-[#12161f] text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Tech Stack (pisahkan koma)</label>
                  <input 
                    type="text"
                    value={projectForm.tech_stack_raw}
                    onChange={(e) => setProjectForm({ ...projectForm, tech_stack_raw: e.target.value })}
                    placeholder="Next.js, TypeScript, Tailwind"
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 flex items-center justify-between">
                  <span>Thumbnail Image *</span>
                  <span className="text-[10px] text-blue-400">Upload File atau Input Link URL</span>
                </label>

                {/* Dropzone / Preview Box for Project Thumbnail */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] text-center hover:border-blue-400/60 transition-colors mb-3">
                  {projectForm.thumbnail_url ? (
                    <div className="relative group rounded-xl overflow-hidden max-h-40 bg-black border border-white/10 mb-2">
                      <img 
                        src={projectForm.thumbnail_url} 
                        alt="Preview Thumbnail" 
                        className="w-full h-36 object-contain mx-auto"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label 
                          htmlFor="proj-image-input" 
                          className="px-3 py-1.5 rounded-lg bg-blue-500 text-black font-bold cursor-pointer text-[11px] hover:bg-blue-400"
                        >
                          Ganti Gambar
                        </label>
                        <button
                          type="button"
                          onClick={() => setProjectForm({ ...projectForm, thumbnail_url: '' })}
                          className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-[11px] hover:bg-rose-400"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3">
                      <Upload className="w-7 h-7 text-blue-400 mx-auto mb-1 animate-bounce" />
                      <p className="text-gray-300 text-xs mb-0.5 font-bold">Pilih File Thumbnail Proyek (PNG, JPG, WEBP)</p>
                      <p className="text-[10px] text-gray-400">Pilih file gambar langsung dari perangkat Anda</p>
                    </div>
                  )}

                  <input 
                    type="file" 
                    accept="image/*" 
                    id="proj-image-input"
                    onChange={handleProjectImageUpload}
                    className="hidden" 
                  />
                  
                  {!projectForm.thumbnail_url && (
                    <label 
                      htmlFor="proj-image-input" 
                      className="inline-block mt-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold cursor-pointer hover:opacity-90 shadow-md shadow-blue-900/40 transition-all text-xs"
                    >
                      Upload Gambar Proyek
                    </label>
                  )}
                </div>

                <input 
                  type="text" 
                  required
                  placeholder="https://... atau data:image/..."
                  value={projectForm.thumbnail_url}
                  onChange={(e) => setProjectForm({ ...projectForm, thumbnail_url: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Deskripsi Ringkas *</label>
                <textarea 
                  rows={2}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Rich Content / Case Study Detail</label>
                <textarea 
                  rows={3}
                  value={projectForm.rich_content}
                  onChange={(e) => setProjectForm({ ...projectForm, rich_content: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Live Demo URL</label>
                  <input 
                    type="text"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">GitHub Repo URL</label>
                  <input 
                    type="text"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-gray-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}

      {/* CATEGORY CRUD MODAL */}
      {showCategoryModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-white/20 bg-[#12161f]">
            <h3 className="text-xl font-bold text-white mb-4">Tambah Kategori Baru</h3>
            <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-mono-tech">
              <div>
                <label className="block text-gray-300 mb-1">Nama Kategori *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Mobile Apps / Game Dev / Motion Graphics"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
                >
                  Tambah Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}

      {/* SKILL CRUD MODAL */}
      {showSkillModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-white/20 bg-[#12161f]">
            <h3 className="text-xl font-bold text-white mb-4">Tambah Skill Baru</h3>
            <form onSubmit={handleAddSkill} className="space-y-4 text-xs font-mono-tech">
              <div>
                <label className="block text-gray-300 mb-1">Nama Skill *</label>
                <input 
                  type="text" 
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Kategori *</label>
                <select 
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                  className="w-full p-3 rounded-xl glass-input bg-[#12161f] text-white"
                >
                  <option value="frontend" className="bg-[#12161f] text-white">Front-End</option>
                  <option value="backend" className="bg-[#12161f] text-white">Back-End</option>
                  <option value="design" className="bg-[#12161f] text-white">UI/UX Design</option>
                  <option value="tools" className="bg-[#12161f] text-white">Tools & DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Tingkat Kemahiran ({skillForm.proficiency_level}%)</label>
                <input 
                  type="range"
                  min="1"
                  max="100"
                  value={skillForm.proficiency_level}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency_level: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
                >
                  Tambah Skill
                </button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}

      {/* CERTIFICATE CRUD MODAL */}
      {showCertModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/20 bg-[#12161f]">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingCert ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs font-mono-tech">
              <div>
                <label className="block text-gray-300 mb-1">Judul Sertifikat *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Meta Front-End Developer Professional"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Penerbit / Institusi *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Coursera / Meta / Google"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Tanggal Terbit *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Jan 2024"
                    value={certForm.issue_date}
                    onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">ID Kredensial (Opsional)</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: CERT-META-FE-8921"
                    value={certForm.credential_id}
                    onChange={(e) => setCertForm({ ...certForm, credential_id: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">URL Verifikasi Kredensial (Opsional)</label>
                  <input 
                    type="text" 
                    placeholder="https://coursera.org/verify/..."
                    value={certForm.credential_url}
                    onChange={(e) => setCertForm({ ...certForm, credential_url: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 flex items-center justify-between">
                  <span>Gambar / Tangkapan Layar Sertifikat *</span>
                  <span className="text-[10px] text-blue-400 font-bold">Upload File atau Input Link URL</span>
                </label>

                {/* Dropzone & Live Image Preview Box */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] text-center hover:border-blue-400/60 transition-colors mb-3">
                  {certForm.image_url ? (
                    <div className="relative group rounded-xl overflow-hidden max-h-48 bg-black border border-white/10 mb-2">
                      <img 
                        src={certForm.image_url} 
                        alt="Preview Sertifikat" 
                        className="w-full h-44 object-contain mx-auto"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label 
                          htmlFor="cert-image-input" 
                          className="px-3.5 py-1.5 rounded-lg bg-blue-500 text-black font-bold cursor-pointer text-[11px] hover:bg-blue-400 transition-colors shadow-md"
                        >
                          Ganti Gambar
                        </label>
                        <button
                          type="button"
                          onClick={() => setCertForm({ ...certForm, image_url: '' })}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-[11px] hover:bg-rose-400 transition-colors shadow-md"
                        >
                          Hapus Gambar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                      <p className="text-gray-200 text-xs mb-1 font-bold">Pilih File Gambar Sertifikat (PNG, JPG, WEBP)</p>
                      <p className="text-[10px] text-gray-400">Pilih berkas foto/scan sertifikat dari galeri komputer Anda</p>
                    </div>
                  )}

                  <input 
                    type="file" 
                    accept="image/*" 
                    id="cert-image-input"
                    onChange={handleCertImageUpload}
                    className="hidden" 
                  />
                  
                  {!certForm.image_url && (
                    <label 
                      htmlFor="cert-image-input" 
                      className="inline-block mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold cursor-pointer hover:opacity-90 shadow-md shadow-blue-900/40 transition-all text-xs"
                    >
                      Pilih File Dari Komputer
                    </label>
                  )}
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 mb-1 block">Atau masukkan Link / URL Gambar Eksternal:</span>
                  <input 
                    type="text" 
                    required
                    placeholder="https://... atau data:image/..."
                    value={certForm.image_url}
                    onChange={(e) => setCertForm({ ...certForm, image_url: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Keahlian Teruji (pisahkan koma)</label>
                <input 
                  type="text" 
                  placeholder="React.js, TypeScript, UI/UX"
                  value={certForm.skills_raw}
                  onChange={(e) => setCertForm({ ...certForm, skills_raw: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-gray-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
                >
                  Simpan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}

      {/* CUSTOM CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.title}
        message={confirmDelete.message}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete({ isOpen: false, type: null, id: null, title: '', message: '' })}
      />

    </div>
  );
}
