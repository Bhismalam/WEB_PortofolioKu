"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Code2,
  Sparkles,
  FolderGit2,
  ShieldCheck,
  Terminal,
} from "lucide-react";
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-900/30 border border-violet-500/30 backdrop-blur-md mb-6 shadow-lg shadow-violet-900/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono-tech text-cyan-300 font-medium tracking-wide">
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
                <span className="gradient-text-cyan border-b-2 border-cyan-400 inline-block pb-0.5">
                  {currentText}
                </span>
                <span className="animate-pulse text-cyan-400 font-bold ml-1">
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-violet-700/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.viewWork}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-card hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 font-medium transition-all text-center flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
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
                  <span>10+</span>
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

          {/* Right Column - Holographic Visual Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Card Frame */}
            <div className="relative w-full max-w-md p-6 glass-card rounded-3xl border border-white/15 shadow-2xl overflow-hidden group">
              {/* Header Visual Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono-tech text-gray-400 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  developer_profile.tsx
                </span>
              </div>

              {/* Main Avatar Graphic / Code Window */}
              <div className="relative rounded-2xl overflow-hidden bg-[#070010] p-5 border border-violet-900/40 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[2px] shadow-lg">
                    <div className="w-full h-full bg-[#0a0015] rounded-[14px] flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono-tech">
                      {profile.full_name}
                    </h3>
                    <p className="text-xs text-cyan-300 font-mono-tech">
                      Next.js & Supabase Stack
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Full-Stack Developer
                    </div>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="bg-[#04000a] p-3.5 rounded-xl border border-white/5 font-mono-tech text-xs leading-relaxed text-gray-300">
                  <div className="text-violet-400">
                    const <span className="text-cyan-300">developer</span> =
                    &#123;
                  </div>
                  <div className="pl-4 text-gray-400">
                    name:{" "}
                    <span className="text-emerald-300">
                      &apos;{profile.full_name}&apos;
                    </span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-400">
                    mode:{" "}
                    <span className="text-emerald-300">
                      &apos;Multi-Language i18n Active&apos;
                    </span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-400">
                    stack: [
                    <span className="text-amber-300">&apos;Next.js&apos;</span>,{" "}
                    <span className="text-amber-300">&apos;Tailwind&apos;</span>
                    ,{" "}
                    <span className="text-amber-300">&apos;Supabase&apos;</span>
                    ]
                  </div>
                  <div className="text-violet-400">&#125;;</div>
                </div>
              </div>

              {/* Floating Mini Badges */}
              <div className="flex items-center justify-between text-xs text-gray-300 pt-2">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FolderGit2 className="w-4 h-4 text-violet-400" />
                  GitHub Integration
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono-tech text-[11px]">
                  CMS Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
