'use client';

import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Certificate } from '@/types/portfolio';
import { Dialog } from '@/components/public/Dialog';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { pick } from '@/lib/contact';

interface CertificatesSectionProps {
  certificates: Certificate[];
  isSample?: boolean;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates, isSample = false }) => {
  const { language } = useLanguage();
  const t = translations[language].certificates;
  const [selected, setSelected] = useState<Certificate | null>(null);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="scroll-mt-16 bg-canvas-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">{t.title}</h2>
        <p className="mt-3 max-w-[48ch] text-[17px] text-ink-3">{t.subtitle}</p>
        {isSample && <p className="mt-2 text-sm text-ink-3">{t.sample}</p>}

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {certificates.map((cert) => (
            <li key={cert.id} className="grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-3 py-6 sm:grid-cols-[120px_1fr_auto] sm:gap-x-8">
              <button
                type="button"
                onClick={() => setSelected(cert)}
                aria-label={`${t.viewCert}: ${cert.title}`}
                className="group aspect-[4/3] overflow-hidden rounded-xl bg-canvas-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image_url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{cert.title}</h3>
                <p className="mt-1 text-[15px] text-ink-2">
                  {cert.issuer}
                  <span className="text-ink-3"> · {pick(language, cert.issue_date, cert.issue_date_en)}</span>
                </p>
                {cert.skills?.length > 0 && (
                  <p className="mt-1.5 text-sm text-ink-3">{cert.skills.join(', ')}</p>
                )}
              </div>

              <div className="col-span-2 flex items-center gap-4 sm:col-span-1 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelected(cert)}
                  className="text-[15px] font-medium text-ink-2 hover:text-ink"
                >
                  {t.viewCert}
                </button>
                {cert.credential_url && !isSample && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline"
                  >
                    {t.verifyBtn}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <Dialog onClose={() => setSelected(null)} labelledBy="cert-title" size="medium">
          <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-8">
            <div>
              <h2 id="cert-title" className="text-xl font-semibold tracking-[-0.02em] text-ink">{selected.title}</h2>
              <p className="mt-1 text-[15px] text-ink-3">{selected.issuer}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t.closeModal}
              data-autofocus
              className="-mr-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink hover:bg-canvas-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-6 overflow-hidden rounded-2xl bg-canvas-2 sm:mx-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.image_url} alt={selected.title} className="max-h-[60svh] w-full object-contain" />
          </div>

          <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-ink-3">{t.issuedOn}</dt>
              <dd className="text-ink">{pick(language, selected.issue_date, selected.issue_date_en)}</dd>
              {selected.credential_id && (
                <>
                  <dt className="text-ink-3">{t.credentialId}</dt>
                  <dd className="font-mono text-[13px] text-ink">{selected.credential_id}</dd>
                </>
              )}
            </dl>
            {selected.credential_url && !isSample && (
              <a
                href={selected.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-[15px] font-medium text-white hover:bg-accent-hover"
              >
                {t.verifyBtn}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        </Dialog>
      )}
    </section>
  );
};
