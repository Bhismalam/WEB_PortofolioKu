'use client';

import React from 'react';
import { Project } from '@/types/portfolio';
import { X, ExternalLink, Play, Code2, Sparkles } from 'lucide-react';
import { IconGithub, IconFigma } from '@/components/icons/SocialIcons';
import { Portal } from '@/components/public/Portal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language].projects;

  if (!project) return null;

  const displayDescription = language === 'en' && project.description_en ? project.description_en : project.description;
  const displayRichContent = language === 'en' && project.rich_content_en ? project.rich_content_en : project.rich_content;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl border border-white/20 shadow-2xl overflow-y-auto bg-[#12161f]/95 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media / Embed Header */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40">
          {project.embed_url ? (
            <iframe 
              src={project.embed_url}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img 
              src={project.thumbnail_url} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-900 text-blue-300 font-mono-tech text-xs border border-blue-500/30 uppercase tracking-wider">
              {project.category.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Title & Tech Stack Tags */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono-tech"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description & Rich Content Case Study */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-6 mb-8">
          <div>
            <h4 className="text-xs font-mono-tech text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> {t.overview}
            </h4>
            <p className="text-gray-300">{displayDescription}</p>
          </div>

          {displayRichContent && (
            <div>
              <h4 className="text-xs font-mono-tech text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> {t.solution}
              </h4>
              <p className="text-gray-300 whitespace-pre-line">{displayRichContent}</p>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
          {project.demo_url && (
            <a 
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-700/30"
            >
              <ExternalLink className="w-4 h-4" /> {t.liveDemo}
            </a>
          )}

          {project.github_url && (
            <a 
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full glass-card hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 text-sm flex items-center gap-2"
            >
              <IconGithub className="w-4 h-4 text-blue-400" /> {t.githubRepo}
            </a>
          )}

          {project.figma_url && (
            <a 
              href={project.figma_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full glass-card hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 text-sm flex items-center gap-2"
            >
              <IconFigma className="w-4 h-4 text-rose-400" /> {t.figmaProto}
            </a>
          )}
        </div>

      </div>
    </div>
    </Portal>
  );
};
