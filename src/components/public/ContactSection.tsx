'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { IconGithub, IconLinkedin, IconInstagram } from '@/components/icons/SocialIcons';
import { ProfileBio } from '@/types/portfolio';

interface ContactSectionProps {
  profile: ProfileBio;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate contact form submission / WhatsApp fallback
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-tech mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mari Berkolaborasi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hubungi & <span className="gradient-text-cyan">Diskusi Project</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Punya ide proyek menarik, tawaran pekerjaan, atau ingin berkonsultasi? Kirim pesan langsung di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Links & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                Informasi Kontak
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Saya selalu terbuka untuk berdiskusi mengenai proyek web baru, desain antarmuka, atau kesempatan kolaborasi.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:contact@bhisma.dev" 
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-cyan-300 border border-white/10 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-mono-tech">Email Langsung</div>
                    <div className="text-sm font-medium">contact@bhisma.dev</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-emerald-400 border border-white/10 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-mono-tech">WhatsApp Direct</div>
                    <div className="text-sm font-medium">+62 812-3456-7890</div>
                  </div>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-xs text-gray-400 font-mono-tech mb-3 uppercase tracking-wider">
                  Ikuti Media Sosial
                </div>
                <div className="flex items-center gap-3">
                  {profile.social_links.github && (
                    <a 
                      href={profile.social_links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-violet-600/20 text-gray-300 hover:text-violet-400 border border-white/10 transition-colors"
                    >
                      <IconGithub className="w-5 h-5" />
                    </a>
                  )}
                  {profile.social_links.linkedin && (
                    <a 
                      href={profile.social_links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-cyan-600/20 text-gray-300 hover:text-cyan-400 border border-white/10 transition-colors"
                    >
                      <IconLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {profile.social_links.instagram && (
                    <a 
                      href={profile.social_links.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-rose-600/20 text-gray-300 hover:text-rose-400 border border-white/10 transition-colors"
                    >
                      <IconInstagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative">
              
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Pesan Terkirim!</h4>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Terima kasih telah menghubungi. Saya akan membalas pesan Anda sesegera mungkin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                      Nama Lengkap *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama Anda..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                      Alamat Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                      Pesan / Detail Proyek *
                    </label>
                    <textarea 
                      rows={5}
                      required
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-violet-700/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
