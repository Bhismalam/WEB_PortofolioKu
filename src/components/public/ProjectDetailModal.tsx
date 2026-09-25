'use client';

import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { IconGithub, IconFigma } from '@/components/icons/SocialIcons';
import { Dialog } from '@/components/public/Dialog';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { pick } from '@/lib/contact';
import { mediaTransitionName } from './PortfolioShowcase';

interface ProjectDetailModalProps {
  project: Project | null;
  categoryName: string;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, categoryName, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language].projects;

  if (!project) return null;

  const title = pick(language, project.title, project.title_en);
  const description = pick(language, project.description, project.description_en);
  const richContent = pick(language, project.rich_content, project.rich_content_en);

  const links = [
    project.demo_url && { href: project.demo_url, label: t.liveDemo, icon: <ArrowUpRight className="h-4 w-4" aria-hidden />, primary: true },
    project.github_url && { href: project.github_url, label: t.githubRepo, icon: <IconGithub className="h-4 w-4" />, primary: false },
    project.figma_url && { href: project.figma_url, label: t.figmaProto, icon: <IconFigma className="h-4 w-4" />, primary: false },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; primary: boolean }[];

  return (
    <Dialog onClose={onClose} labelledBy="project-title" size="wide">
      <div className="relative">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-2 sm:rounded-t-[24px]"
          style={{ viewTransitionName: mediaTransitionName(project.id) }}
        >
          {project.embed_url ? (
            <iframe
              src={project.embed_url}
              title={title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.thumbnail_url} alt={title} className="h-full w-full object-cover" />
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          data-autofocus
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_10px_rgb(0_0_0/0.18)] transition-colors hover:bg-canvas-2"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-6 pb-10 pt-8 sm:px-12 sm:pt-10">
        <h2 id="project-title" className="text-balance text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-[40px] sm:leading-[1.08]">
          {title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-8 md:col-span-8">
            <div>
              <h3 className="text-sm font-semibold text-ink">{t.overview}</h3>
              <p className="mt-2 max-w-[65ch] text-[17px] leading-relaxed text-ink-2">{description}</p>
            </div>
            {richContent && (
              <div>
                <h3 className="text-sm font-semibold text-ink">{t.solution}</h3>
                <p className="mt-2 max-w-[65ch] whitespace-pre-line text-[17px] leading-relaxed text-ink-2">{richContent}</p>
              </div>
            )}
          </div>

          <aside className="md:col-span-4">
            {categoryName && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-ink">{t.category}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{categoryName}</p>
              </div>
            )}
            {project.tech_stack.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-ink">{t.stack}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech_stack.map((tech) => (
                    <li key={tech} className="rounded-md bg-canvas-2 px-2 py-1 font-mono text-[13px] text-ink-2">
                      {tech}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {links.length > 0 && (
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium transition-colors ${
                      link.primary ? 'bg-accent text-white hover:bg-accent-hover' : 'bg-canvas-2 text-ink hover:bg-canvas-3'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </Dialog>
  );
};
