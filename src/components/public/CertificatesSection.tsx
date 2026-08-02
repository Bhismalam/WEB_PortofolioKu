'use client';

import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Eye, X, Calendar, CheckCircle2 } from 'lucide-react';
import { Certificate } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { TiltCard } from '@/components/public/TiltCard';
import { ScrollReveal } from '@/components/public/ScrollReveal';
import { Portal } from '@/components/public/Portal';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const { language } = useLanguage();
  const t = translations[language].certificates;
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono-tech mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t.title} <span className="gradient-text-purple">{t.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={(index % 2) * 150}>
              <TiltCard className="glass-card rounded-3xl p-6 border border-white/10 hover:border-violet-500/40 transition-all duration-300 group flex flex-col justify-between hover:shadow-xl hover:shadow-violet-900/20 h-full">
                <div>
                  {/* Image Preview Thumbnail */}
                  <div 
                    onClick={() => setSelectedCert(cert)}
                    className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/10] bg-[#070010] border border-white/10 group-hover:border-violet-500/30 cursor-pointer"
                  >
                    <img 
                      src={cert.image_url} 
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070010] via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Issuer Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-card bg-[#0a0015]/80 text-cyan-300 text-xs font-mono-tech border border-cyan-500/30 flex items-center gap-1.5 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{cert.issuer}</span>
                    </div>

                    {/* Hover Eye Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-full glass-card text-white text-xs font-mono-tech flex items-center gap-2 border border-white/20 shadow-2xl">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        {t.viewCert}
                      </span>
                    </div>
                  </div>

                  {/* Content Header */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-400 font-mono-tech mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {language === 'en' && cert.issue_date_en ? cert.issue_date_en : cert.issue_date}
                    </span>
                    {cert.credential_id && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <span className="text-gray-500">ID:</span> {cert.credential_id}
                      </span>
                    )}
                  </div>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cert.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md bg-white/5 text-gray-300 text-[11px] font-mono-tech border border-white/10 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-mono-tech text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.viewCert}</span>
                  </button>

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-mono-tech flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>{t.verifyBtn}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* CERTIFICATE PREVIEW MODAL (Rendered in Portal) */}
      {selectedCert && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/20 bg-[#0a0015] relative shadow-2xl">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{selectedCert.title}</h3>
                    <p className="text-xs text-cyan-400 font-mono-tech">{selectedCert.issuer}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label={t.closeModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Certificate Image */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black mb-6">
                <img 
                  src={selectedCert.image_url} 
                  alt={selectedCert.title} 
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono-tech">
                <div className="space-y-1">
                  <div className="text-gray-400">
                    <span className="text-gray-500">{t.issuedOn}:</span> {language === 'en' && selectedCert.issue_date_en ? selectedCert.issue_date_en : selectedCert.issue_date}
                  </div>
                  {selectedCert.credential_id && (
                    <div className="text-gray-400">
                      <span className="text-gray-500">{t.credentialId}:</span> {selectedCert.credential_id}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {selectedCert.credential_url && (
                    <a
                      href={selectedCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-violet-900/40"
                    >
                      <span>{t.verifyBtn}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-full glass-card text-gray-300 hover:text-white"
                  >
                    {t.closeModal}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Portal>
      )}

    </section>
  );
};
