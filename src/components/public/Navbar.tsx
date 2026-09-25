'use client';

import React, { useEffect, useState } from 'react';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { ProfileBio } from '@/types/portfolio';
import { useLanguage, Language } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { hasCv } from '@/lib/contact';

interface NavbarProps {
  profile: ProfileBio;
}

const LanguageSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const options: Language[] = ['id', 'en'];

  return (
    <div
      role="group"
      aria-label={t.language}
      className={`inline-flex items-center rounded-full bg-canvas-2 p-0.5 text-xs font-medium ${className}`}
    >
      {options.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`h-7 min-w-9 rounded-full px-2.5 uppercase transition-colors ${
            language === lang ? 'bg-canvas text-ink shadow-[0_1px_2px_rgb(0_0_0/0.12)]' : 'text-ink-3 hover:text-ink'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: '#work', label: t.work },
    { href: '#skills', label: t.skills },
    { href: '#certificates', label: t.certificates },
    { href: '#contact', label: t.contact },
  ];

  const firstName = profile.full_name.split(' ')[0];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-canvas transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_1px_0_var(--color-line)]' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
          {firstName}
        </a>

        <nav aria-label="Utama" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-ink-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch />
          {hasCv(profile.cv_pdf_url) && (
            <a
              href={profile.cv_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-canvas transition-colors hover:bg-ink-2"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden />
              {t.downloadCv}
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.closeMenu : t.menu}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-canvas-2 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas px-5 pb-6 md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-[22px] font-semibold tracking-[-0.02em] text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
            <LanguageSwitch />
            {hasCv(profile.cv_pdf_url) && (
              <a
                href={profile.cv_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-canvas"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden />
                {t.downloadCv}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
