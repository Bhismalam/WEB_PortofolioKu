'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-8 text-sm text-ink-3 sm:px-8">
        <p>
          © {new Date().getFullYear()} {name}. {t.rights}
        </p>
        <a href="#top" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium text-ink-2 hover:text-ink">
          {t.backToTop}
          <ArrowUp className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
};
