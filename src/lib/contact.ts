import { ProfileBio } from '@/types/portfolio';
import type { Language } from '@/context/LanguageContext';

export const CONTACT = {
  email: 'bagusbhismantara12@gmail.com',
  whatsappNumber: '6287862734767',
  whatsappDisplay: '+62 878-6273-4767',
};

const DEFAULT_SOCIALS: ProfileBio['social_links'] = {
  github: 'https://github.com/Bhismalam',
  instagram: 'https://www.instagram.com/bhisma0_1/',
};

const SOCIAL_LABELS: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

// A link to a bare domain (e.g. "https://github.com") is a placeholder, not a profile.
const isProfileUrl = (url?: string) => {
  if (!url) return false;
  try {
    const { pathname } = new URL(url);
    return pathname.replace(/\//g, '').length > 0;
  } catch {
    return false;
  }
};

export const getSocialLinks = (profile?: ProfileBio) => {
  const merged = { ...DEFAULT_SOCIALS, ...(profile?.social_links ?? {}) };
  return (Object.keys(SOCIAL_LABELS) as (keyof typeof merged)[])
    .map((key) => {
      const url = isProfileUrl(merged[key]) ? merged[key] : DEFAULT_SOCIALS[key];
      return url && isProfileUrl(url) ? { key, label: SOCIAL_LABELS[key], url } : null;
    })
    .filter((s): s is { key: keyof typeof merged; label: string; url: string } => s !== null);
};

export const hasCv = (url?: string) => Boolean(url && url !== '#');

export const pick = (language: Language, id?: string, en?: string) =>
  language === 'en' && en ? en : id ?? '';
