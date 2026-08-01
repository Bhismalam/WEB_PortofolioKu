'use client';

import React, { useState } from 'react';
import { Project, ProjectCategory, Category } from '@/types/portfolio';
import { MOCK_CATEGORIES } from '@/lib/supabase/client';
import { ProjectDetailModal } from './ProjectDetailModal';
import { 
  FolderKanban, ExternalLink, Play, Sparkles, Layers 
} from 'lucide-react';
import { IconGithub, IconFigma } from '@/components/icons/SocialIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

interface PortfolioShowcaseProps {
  projects: Project[];
  categories?: Category[];
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ 
  projects,
  categories = MOCK_CATEGORIES 
}) => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: t.all },
    ...categories.map(c => ({ id: c.slug, label: c.name }))
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono-tech mb-4">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.title} <span className="gradient-text-purple">{t.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            {t.subtitle}
          </p>

          {/* Dynamic Filtering Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all font-mono-tech ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-700/30 scale-105'
                    : 'glass-card text-gray-400 hover:text-white border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-violet-500/50 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-900/30"
            >
              {/* Image Thumbnail Container */}
              <div className="relative h-56 w-full overflow-hidden bg-black/40">
                <img 
                  src={project.thumbnail_url} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0a0015]/80 backdrop-blur-md text-cyan-300 font-mono-tech text-[11px] border border-cyan-500/30 uppercase tracking-wider">
                    {project.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Video Play Icon if Content Creation */}
                {project.embed_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-lg shadow-violet-900/50 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300 text-[11px] font-mono-tech border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="text-[11px] text-gray-400 font-mono-tech self-center">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Links Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-400">
                    <span className="text-violet-400 group-hover:text-cyan-300 font-mono-tech flex items-center gap-1 font-medium">
                      {t.caseStudy} &rarr;
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.demo_url && (
                        <a 
                          href={project.demo_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Live Demo"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="GitHub Repo"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-violet-400 transition-colors"
                        >
                          <IconGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.figma_url && (
                        <a 
                          href={project.figma_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Figma Prototype"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-rose-400 transition-colors"
                        >
                          <IconFigma className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
