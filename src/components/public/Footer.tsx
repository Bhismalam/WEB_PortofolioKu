'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 py-10 bg-[#0a0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Left copyright */}
          <div className="flex flex-col">
            <span className="font-bold text-white text-base font-mono-tech flex items-center justify-center md:justify-start gap-1">
              BHISMA<span className="text-blue-400">.DEV</span>
            </span>
            <p className="text-xs text-gray-400 mt-1 flex items-center justify-center md:justify-start gap-1">
              &copy; {new Date().getFullYear()} {t.rights}
            </p>
          </div>

          {/* Center tech stack badge */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono-tech">
            <span>{t.poweredBy}</span>
          </div>

          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full glass-card hover:bg-blue-600/30 text-gray-300 hover:text-white border border-white/15 transition-all shadow-lg hover:scale-110"
            title={t.backToTop}
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>
      </div>
    </footer>
  );
};
