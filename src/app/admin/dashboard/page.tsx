'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FolderKanban, Layers, UserCheck, Plus, Trash2, Edit3, 
  LogOut, Database, FileText, Upload, Globe, Tag 
} from 'lucide-react';
import { Project, Skill, ProfileBio, ProjectCategory, Category } from '@/types/portfolio';
import { MOCK_PROJECTS, MOCK_SKILLS, MOCK_PROFILE, MOCK_CATEGORIES } from '@/lib/supabase/client';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'categories' | 'profile'>('projects');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [profile, setProfile] = useState<ProfileBio>(MOCK_PROFILE);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  // Custom Delete Confirm Modal State
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    type: 'project' | 'skill' | 'category' | null;
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

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Harap pilih file berformat PDF!');
      return;
    }

    setCvFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setProfile(prev => ({ ...prev, cv_pdf_url: objectUrl }));
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

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
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
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.tech_stack_raw.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? {
        ...p,
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description,
        rich_content: projectForm.rich_content,
        thumbnail_url: projectForm.thumbnail_url,
        tech_stack: techArray,
        demo_url: projectForm.demo_url,
        github_url: projectForm.github_url,
        figma_url: projectForm.figma_url,
        embed_url: projectForm.embed_url
      } : p));
    } else {
      const newProj: Project = {
        id: 'p-' + Date.now(),
        title: projectForm.title,
        slug: projectForm.title.toLowerCase().replace(/\s+/g, '-'),
        category: projectForm.category,
        description: projectForm.description,
        rich_content: projectForm.rich_content,
        thumbnail_url: projectForm.thumbnail_url,
        tech_stack: techArray,
        demo_url: projectForm.demo_url,
        github_url: projectForm.github_url,
        figma_url: projectForm.figma_url,
        embed_url: projectForm.embed_url
      };
      setProjects([newProj, ...projects]);
    }

    setShowProjectModal(false);
  };

  // Add New Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat: Category = {
      id: 'cat-' + Date.now(),
      name: newCategoryName.trim(),
      slug: slug || 'cat-' + Date.now()
    };

    setCategories([...categories, newCat]);
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

  // Execute Deletion after confirmation
  const handleConfirmDelete = () => {
    if (confirmDelete.type === 'project' && confirmDelete.id) {
      setProjects(projects.filter(p => p.id !== confirmDelete.id));
    } else if (confirmDelete.type === 'skill' && confirmDelete.id) {
      setSkills(skills.filter(s => s.id !== confirmDelete.id));
    } else if (confirmDelete.type === 'category' && confirmDelete.id) {
      setCategories(categories.filter(c => c.id !== confirmDelete.id));
    }
    setConfirmDelete({ isOpen: false, type: null, id: null, title: '', message: '' });
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const newSkill: Skill = {
      id: 's-' + Date.now(),
      name: skillForm.name,
      category: skillForm.category,
      icon_name: skillForm.icon_name,
      proficiency_level: Number(skillForm.proficiency_level),
      experience_years: skillForm.experience_years
    };
    setSkills([...skills, newSkill]);
    setShowSkillModal(false);
    setSkillForm({ name: '', category: 'frontend', icon_name: 'Code2', proficiency_level: 85, experience_years: '2+ Thn' });
  };

  return (
    <div className="min-h-screen bg-[#070010] text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-navbar border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#0a0015] rounded-[11px] flex items-center justify-center font-bold text-cyan-300 text-xs font-mono-tech">
                CMS
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-sm font-mono-tech">CMS DASHBOARD</span>
              <div className="text-[10px] text-violet-400">Admin Control Panel</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderKanban className="w-4 h-4" /> Kelola Proyek ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'categories' 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tag className="w-4 h-4" /> Kelola Kategori ({categories.length})
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'skills' 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" /> Kelola Skills ({skills.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-mono-tech flex items-center gap-2.5 transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-900/40' 
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
            className="w-full mb-2 py-2.5 px-4 rounded-xl glass-card text-xs text-cyan-300 font-mono-tech flex items-center justify-center gap-2 hover:bg-white/10"
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
              {activeTab === 'profile' && 'Pengaturan Profil & Dynamic CV'}
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono-tech">
              Perubahan di sini akan memperbarui tampilan Halaman Publik secara instan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-tech flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Supabase Status: Connected
            </div>
          </div>
        </header>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Daftar Karya Portofolio</h2>
              <button
                onClick={() => openProjectForm()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-violet-900/30"
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
                      <td className="p-4 font-mono-tech text-cyan-300">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 uppercase text-[10px]">
                          {proj.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {proj.tech_stack.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-violet-900/30 text-violet-300 font-mono-tech text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openProjectForm(proj)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-400"
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-violet-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Kategori Baru
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group hover:border-violet-500/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-300">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                      <p className="text-xs text-cyan-400 font-mono-tech">Slug: {cat.slug}</p>
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono-tech flex items-center gap-2 shadow-lg shadow-violet-900/30"
              >
                <Plus className="w-4 h-4" /> Tambah Skill Baru
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="glass-card rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{skill.name}</h3>
                    <p className="text-xs text-cyan-400 font-mono-tech">Category: {skill.category} ({skill.proficiency_level}%)</p>
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

        {/* TAB 4: PROFILE & RESUME */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl glass-card rounded-3xl p-8 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6">Edit Profile Bio & Dynamic Resume</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Profil berhasil diperbarui!'); }} className="space-y-4 text-xs font-mono-tech">
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

              {/* Dynamic Resume PDF Upload Handler */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Upload CV Resume PDF Terbaru
                </label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 text-center hover:border-cyan-400 transition-colors">
                  <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
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
                    className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold cursor-pointer hover:opacity-90 shadow-md shadow-violet-900/40 transition-all text-xs"
                  >
                    {cvFileName ? 'Ganti File PDF' : 'Pilih File PDF CV'}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm tracking-wide mt-6"
              >
                Simpan Perubahan Bio
              </button>
            </form>
          </div>
        )}

      </main>

      {/* PROJECT CRUD MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/20 bg-[#0a0015]">
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
                    className="w-full p-3 rounded-xl glass-input bg-[#0a0015] text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.slug} className="bg-[#0a0015] text-white">
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
                <label className="block text-gray-300 mb-1">Thumbnail Image URL *</label>
                <input 
                  type="text" 
                  required
                  value={projectForm.thumbnail_url}
                  onChange={(e) => setProjectForm({ ...projectForm, thumbnail_url: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input"
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY CRUD MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-white/20 bg-[#0a0015]">
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold"
                >
                  Tambah Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL CRUD MODAL */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-white/20 bg-[#0a0015]">
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
                  className="w-full p-3 rounded-xl glass-input bg-[#0a0015] text-white"
                >
                  <option value="frontend" className="bg-[#0a0015] text-white">Front-End</option>
                  <option value="backend" className="bg-[#0a0015] text-white">Back-End</option>
                  <option value="design" className="bg-[#0a0015] text-white">UI/UX Design</option>
                  <option value="tools" className="bg-[#0a0015] text-white">Tools & DevOps</option>
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold"
                >
                  Tambah Skill
                </button>
              </div>
            </form>
          </div>
        </div>
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
