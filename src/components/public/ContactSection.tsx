'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProfileBio } from '@/types/portfolio';
import { IconGithub, IconLinkedin, IconInstagram, IconTiktok } from '@/components/icons/SocialIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { CONTACT, getSocialLinks } from '@/lib/contact';

interface ContactSectionProps {
  profile: ProfileBio;
}

const socialIcons = {
  github: IconGithub,
  linkedin: IconLinkedin,
  instagram: IconInstagram,
  tiktok: IconTiktok,
};

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const socials = getSocialLinks(profile);

  // No mail backend yet: hand the message to the visitor's own email app.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${t.subject}: ${form.name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <section id="contact" className="scroll-mt-16 bg-canvas py-20 md:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 sm:px-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <h2 className="max-w-[12ch] text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-ink-2">{t.subtitle}</p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-ink-3">{t.emailLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all text-xl font-medium tracking-[-0.01em] text-accent hover:underline sm:text-2xl"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-3">{t.waLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`https://wa.me/${CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tabular text-xl font-medium tracking-[-0.01em] text-ink hover:text-accent sm:text-2xl"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </dd>
            </div>
          </dl>

          {socials.length > 0 && (
            <div className="mt-10">
              <p className="text-sm text-ink-3">{t.socialsLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => {
                  const Icon = socialIcons[s.key as keyof typeof socialIcons];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-canvas-2 px-4 text-sm font-medium text-ink transition-colors hover:bg-canvas-3"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="md:col-span-6">
          <div className="rounded-[24px] bg-canvas-2 p-6 sm:p-10">
            {sent ? (
              <div role="status" className="py-10">
                <p className="text-2xl font-semibold tracking-[-0.02em] text-ink">{t.successTitle}</p>
                <p className="mt-3 max-w-[40ch] text-[17px] text-ink-2">{t.successDesc}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="mt-8 inline-flex h-11 items-center rounded-full bg-canvas px-5 text-[15px] font-medium text-ink hover:bg-canvas-3"
                >
                  {t.again}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-ink">
                    {t.nameLabel}
                  </label>
                  <input id="c-name" type="text" required autoComplete="name" placeholder={t.namePlaceholder} value={form.name} onChange={update('name')} className="field" />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-ink">
                    {t.emailInputLabel}
                  </label>
                  <input id="c-email" type="email" required autoComplete="email" placeholder="nama@email.com" value={form.email} onChange={update('email')} className="field" />
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-ink">
                    {t.messageLabel}
                  </label>
                  <textarea id="c-message" rows={5} required placeholder={t.messagePlaceholder} value={form.message} onChange={update('message')} className="field resize-y" />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  {t.sendBtn}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </button>
                <p className="text-center text-sm text-ink-3">{t.sendHint}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
