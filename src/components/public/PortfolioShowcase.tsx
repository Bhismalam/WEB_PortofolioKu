'use client';

import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project, Category } from '@/types/portfolio';
import { MOCK_CATEGORIES } from '@/lib/supabase/client';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { pick } from '@/lib/contact';

interface PortfolioShowcaseProps {
  projects: Project[];
  categories?: Category[];
  isSample?: boolean;
}

// Shared-element transition: the card image grows into the case study.
const withTransition = (update: () => void) => {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduced) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
};

export const mediaTransitionName = (id: string) => `media-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ projects, categories = MOCK_CATEGORIES, isSample = false }) => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const categoryName = (slug: string) => {
    const c = categories.find((cat) => cat.slug === slug);
    return c ? pick(language, c.name, c.name_en) : slug.replace(/-/g, ' ');
  };

  const usedSlugs = new Set(projects.map((p) => p.category));
  const tabs = [{ id: 'all', label: t.all }, ...categories.filter((c) => usedSlugs.has(c.slug)).map((c) => ({ id: c.slug, label: pick(language, c.name, c.name_en) }))];

  const filtered = category === 'all' ? projects : projects.filter((p) => p.category === category);
  const lead = category === 'all' ? filtered.find((p) => p.featured) ?? filtered[0] : undefined;
  const rest = lead ? filtered.filter((p) => p.id !== lead.id) : filtered;

  const open = (p: Project) => withTransition(() => setSelected(p));
  const close = () => withTransition(() => setSelected(null));

  const renderMedia = (project: Project, className: string, sizes: string) => (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-canvas-2 ${className}`}
      style={{ viewTransitionName: selected?.id === project.id ? 'none' : mediaTransitionName(project.id) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.thumbnail_url}
        alt=""
        sizes={sizes}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
      {project.embed_url && (
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-[0_2px_8px_rgb(0_0_0/0.15)]">
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
          {t.watch}
        </span>
      )}
    </div>
  );

  const renderMeta = (project: Project) => (
    <p className="text-sm text-ink-3">
      {categoryName(project.category)}
      {project.tech_stack.length > 0 && (
        <>
          <span aria-hidden> · </span>
          <span className="font-mono text-[13px]">{project.tech_stack.slice(0, 3).join(', ')}</span>
        </>
      )}
    </p>
  );

  return (
    <section id="work" className="scroll-mt-16 bg-canvas pb-20 pt-8 md:pb-28 md:pt-6">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">{t.title}</h2>
            <p className="mt-3 max-w-[48ch] text-[17px] text-ink-3">{t.subtitle}</p>
            {isSample && <p className="mt-2 text-sm text-ink-3">{t.sample}</p>}
          </div>

          {tabs.length > 2 && (
            <div role="group" aria-label={t.title} className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,black_80%,transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={category === tab.id}
                  onClick={() => setCategory(tab.id)}
                  className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
                    category === tab.id ? 'bg-ink text-canvas' : 'text-ink-2 hover:bg-canvas-2 hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="mt-14 rounded-[20px] bg-canvas-2 px-6 py-16 text-center text-ink-3">{t.empty}</p>
        )}

        {lead && (
          <article className="group relative mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
            {renderMedia(lead, "aspect-[16/10] md:col-span-8", "(min-width: 768px) 780px, 100vw")}
            <div className="md:col-span-4">
              <h3 className="text-balance text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink">
                <button type="button" onClick={() => open(lead)} className="text-left after:absolute after:inset-0 after:content-['']">
                  {pick(language, lead.title, lead.title_en)}
                </button>
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{pick(language, lead.description, lead.description_en)}</p>
              <div className="mt-4">{renderMeta(lead)}</div>
              <span className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent group-hover:underline" aria-hidden>
                {t.open}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
            {rest.map((project) => (
              <li key={project.id}>
                <article className="group relative">
                  {renderMedia(project, "aspect-[4/3]", "(min-width: 640px) 570px, 100vw")}
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink group-hover:text-accent">
                    <button type="button" onClick={() => open(project)} className="text-left after:absolute after:inset-0 after:content-['']">
                      {pick(language, project.title, project.title_en)}
                    </button>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-ink-2">
                    {pick(language, project.description, project.description_en)}
                  </p>
                  <div className="mt-3">{renderMeta(project)}</div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ProjectDetailModal project={selected} categoryName={selected ? categoryName(selected.category) : ''} onClose={close} />
    </section>
  );
};
