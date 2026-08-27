'use client';

import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Globe } from 'lucide-react';
import { ProfileBio } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { FlagID, FlagEN } from '@/components/icons/Flags';

interface NavbarProps {
  cvUrl?: string;
  statusBadge?: string;
  profile?: ProfileBio;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cvUrl = '#', 
  statusBadge = 'Available for Hire',
  profile
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-navbar py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 p-[1px] shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#12161f] rounded-[11px] flex items-center justify-center">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-mono-tech text-lg">
                  BT
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-100 tracking-wider text-base font-mono-tech flex items-center gap-1.5">
                BHISMA<span className="text-blue-400">.DEV</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {statusBadge}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#12161f] px-4 py-1.5 rounded-full border border-white/10">
            <a href="#home" className="px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-full transition-all">
              {t.home}
            </a>
            <a href="#skills" className="px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-full transition-all">
              {t.skills}
            </a>
            <a href="#certificates" className="px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-full transition-all">
              {t.certificates}
            </a>
            <a href="#projects" className="px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-full transition-all">
              {t.projects}
            </a>
            <a href="#contact" className="px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-full transition-all">
              {t.contact}
            </a>
          </nav>

          {/* Language Switcher & Download CV CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-card hover:bg-white/10 text-xs font-mono-tech border border-white/15 transition-all shadow-md hover:scale-105"
              title="Ganti Bahasa / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className={`flex items-center gap-1.5 transition-colors ${language === 'id' ? 'text-blue-300 font-bold' : 'text-gray-400 opacity-70 hover:opacity-100'}`}>
                <FlagID className="w-4 h-3" /> ID
              </span>
              <span className="text-gray-600">|</span>
              <span className={`flex items-center gap-1.5 transition-colors ${language === 'en' ? 'text-blue-300 font-bold' : 'text-gray-400 opacity-70 hover:opacity-100'}`}>
                <FlagEN className="w-4 h-3" /> EN
              </span>
            </button>

            <a 
              href={cvUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-100 rounded-full group bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 group-hover:from-blue-600 group-hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#12161f] rounded-full group-hover:bg-opacity-0 flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                <span>{t.downloadCv}</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-navbar mt-2 border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-xs text-gray-400 font-mono-tech">Pilih Bahasa:</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-mono-tech border border-white/15"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className={`flex items-center gap-1.5 transition-colors ${language === 'id' ? 'text-blue-300 font-bold' : 'text-gray-400 opacity-70 hover:opacity-100'}`}>
                <FlagID className="w-4 h-3" /> ID
              </span>
              <span className="text-gray-600">|</span>
              <span className={`flex items-center gap-1.5 transition-colors ${language === 'en' ? 'text-blue-300 font-bold' : 'text-gray-400 opacity-70 hover:opacity-100'}`}>
                <FlagEN className="w-4 h-3" /> EN
              </span>
            </button>
          </div>

          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-blue-400 py-2 border-b border-white/5"
          >
            {t.home}
          </a>
          <a 
            href="#skills" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-blue-400 py-2 border-b border-white/5"
          >
            {t.skills}
          </a>
          <a 
            href="#certificates" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-blue-400 py-2 border-b border-white/5"
          >
            {t.certificates}
          </a>
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-blue-400 py-2 border-b border-white/5"
          >
            {t.projects}
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-blue-400 py-2 border-b border-white/5"
          >
            {t.contact}
          </a>
          <a
            href={cvUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-medium text-white text-center flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> {t.downloadCv}
          </a>
        </div>
      )}
    </header>
  );
};
