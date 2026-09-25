'use client';

import React from 'react';
import { Skill } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';

interface SkillsBentoProps {
  skills: Skill[];
}

export const SkillsBento: React.FC<SkillsBentoProps> = ({ skills }) => {
  const { language } = useLanguage();
  const t = translations[language].skills;

  if (skills.length === 0) return null;

  const years = (skill: Skill) =>
    language === 'en'
      ? skill.experience_years_en || skill.experience_years.replace('Thn', 'Yrs')
      : skill.experience_years;

  const baseGroups = [
    { id: 'design', label: t.design },
    { id: 'frontend', label: t.frontend },
    { id: 'backend', label: t.backend },
    { id: 'tools', label: t.tools },
  ];
  const known = new Set(baseGroups.map((g) => g.id));
  const groups = [
    ...baseGroups.map((g) => ({ ...g, items: skills.filter((s) => s.category === g.id) })),
    { id: 'other', label: t.other, items: skills.filter((s) => !known.has(s.category)) },
  ].filter((g) => g.items.length > 0);

  const renderList = (items: Skill[]) => (
    <ul className="divide-y divide-graphite-line border-y border-graphite-line">
      {items.map((skill) => (
        <li key={skill.id} className="flex items-baseline justify-between gap-6 py-3.5">
          <span className="text-[17px] text-on-graphite">{skill.name}</span>
          {skill.experience_years && (
            <span className="tabular shrink-0 font-mono text-[13px] text-on-graphite-2">{years(skill)}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section id="skills" className="scroll-mt-16 bg-graphite py-20 text-on-graphite md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-[16ch] text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{t.title}</h2>
        <p className="mt-3 max-w-[48ch] text-[17px] text-on-graphite-2">{t.subtitle}</p>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-3 text-[15px] font-semibold text-on-graphite">{group.label}</h3>
              {renderList(group.items)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};