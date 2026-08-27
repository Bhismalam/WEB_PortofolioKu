"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { ProfileBio } from "@/types/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

interface HeroProps {
  profile: ProfileBio;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = t.roles;

  useEffect(() => {
    const fullText = roles[roleIndex % roles.length];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(
          fullText.substring(0, currentText.length + (isDeleting ? -1 : 1)),
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Intro & Typewriter */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12161f] border border-blue-500/30 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono-tech text-blue-300 font-medium tracking-wide">
                {t.status}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
              {t.salutation}{" "}
              <span className="gradient-text-purple">{profile.full_name}</span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="h-12 sm:h-14 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl font-semibold text-gray-300 font-mono-tech">
                {t.typewriterPrefix}{" "}
                <span className="gradient-text-blue border-b-2 border-blue-400 inline-block pb-0.5">
                  {currentText}
                </span>
                <span className="animate-pulse text-blue-400 font-bold ml-1">
                  |
                </span>
              </span>
            </div>

            {/* Bio Summary */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
              {t.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.viewWork}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-card hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 font-medium transition-all text-center flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>{t.contactMe}</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 w-full max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tech text-white flex items-center gap-1">
                  <span>2+</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{t.yearsExp}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tech text-white flex items-center gap-1">
                  <span>5+</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {t.completedProj}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tech text-white flex items-center gap-1">
                  <span>100%</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {t.satisfaction}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Photo */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden border border-blue-500/40 bg-[#12161f] shadow-xl">
                <img
                  src="/profile.jpeg"
                  alt={profile.full_name}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Caption Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-[#12161f] border border-white/10 shadow-lg flex items-center gap-2 whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs font-mono-tech text-gray-300">
                  {profile.headline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
