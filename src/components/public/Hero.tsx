'use client';

import React from 'react';
import { ArrowDown, ArrowDownToLine } from 'lucide-react';
import { ProfileBio } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { hasCv, pick } from '@/lib/contact';

interface HeroProps {
  profile: ProfileBio;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const roles = pick(language, profile.headline, profile.headline_en) || t.roles;
  const status = pick(language, profile.status_badge, profile.status_badge_en);
  const bio = pick(language, profile.bio_summary, profile.bio_summary_en);

  return (
    <section id="top" className="relative pt-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pb-10 pt-8 sm:px-8 md:grid-cols-12 md:items-start md:gap-12 md:pb-6 md:pt-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <p className="rise text-lg font-medium tracking-[-0.01em] text-ink-2 sm:text-xl md:pt-2">
            {t.greeting} <span className="text-ink">{profile.full_name}</span>
          </p>

          <h1
            className="rise mt-4 max-w-[14ch] text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[68px]"
            style={{ animationDelay: '80ms' }}
          >
            {t.statement}
          </h1>

          <p className="rise mt-6 text-balance text-[17px] text-ink-3" style={{ animationDelay: '160ms' }}>
            {roles}
          </p>

          {bio && (
            <p
              className="rise mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink-2"
              style={{ animationDelay: '200ms' }}
            >
              {bio}
            </p>
          )}

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '260ms' }}>
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {t.viewWork}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            {hasCv(profile.cv_pdf_url) && (
              <a
                href={profile.cv_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden />
                {t.downloadCv}
              </a>
            )}
            {status && (
              <p className="inline-flex items-center gap-2 text-sm text-ink-3 sm:ml-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-success" aria-hidden />
                {status}
              </p>
            )}
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-5">
          <div className="unveil relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[28px] bg-[#2b2b2d] sm:max-w-[380px] md:ml-auto md:mr-0 md:max-w-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpeg"
              alt={t.photoAlt}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 18%' }}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
