'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/portfolio';
import { 
  Code2, Atom, FileCode2, Palette, Server, Database, 
  Sparkles, GitBranch, Cpu, Terminal, Layers
} from 'lucide-react';
import { IconFigma } from '@/components/icons/SocialIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

interface SkillsBentoProps {
  skills: Skill[];
}

const renderSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
    case 'Atom': return <Atom className="w-6 h-6 text-cyan-400" />;
    case 'FileCode2': return <FileCode2 className="w-6 h-6 text-blue-400" />;
    case 'Palette': return <Palette className="w-6 h-6 text-teal-400" />;
    case 'Server': return <Server className="w-6 h-6 text-violet-400" />;
    case 'Database': return <Database className="w-6 h-6 text-emerald-400" />;
    case 'Figma': return <IconFigma className="w-6 h-6 text-rose-400" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
    case 'GitBranch': return <GitBranch className="w-6 h-6 text-orange-400" />;
    case 'Cpu': return <Cpu className="w-6 h-6 text-purple-400" />;
    default: return <Terminal className="w-6 h-6 text-cyan-400" />;
  }
};

export const SkillsBento: React.FC<SkillsBentoProps> = ({ skills }) => {
  const { language } = useLanguage();
  const t = translations[language].skills;
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'design' | 'tools'>('all');

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-tech mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.title} <span className="gradient-text-cyan">{t.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            {t.subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: t.all },
              { id: 'frontend', label: t.frontend },
              { id: 'backend', label: t.backend },
              { id: 'design', label: t.design },
              { id: 'tools', label: t.tools }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all font-mono-tech ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'glass-card text-gray-400 hover:text-white border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-400/40"
            >
              {/* Top Row: Icon & Experience Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {renderSkillIcon(skill.icon_name)}
                </div>
                <span className="text-[11px] font-mono-tech px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                  {skill.experience_years}
                </span>
              </div>

              {/* Skill Name & Category */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-gray-400 capitalize mb-4 font-mono-tech">
                Category: {skill.category}
              </p>

              {/* Proficiency Meter */}
              <div className="w-full">
                <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tech">
                  <span className="text-gray-400">{t.proficiency}</span>
                  <span className="text-cyan-400 font-bold">{skill.proficiency_level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency_level}%` }}
                  />
                </div>
              </div>

              {/* Decorative Hover Glow Corner */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-all pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
