import React from 'react';

interface FlagProps {
  className?: string;
}

export const FlagID: React.FC<FlagProps> = ({ className = "w-4 h-3" }) => (
  <svg
    viewBox="0 0 60 40"
    className={`inline-block rounded-[2px] overflow-hidden border border-white/20 shadow-sm shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect width="60" height="20" fill="#E11D48" />
    <rect y="20" width="60" height="20" fill="#FFFFFF" />
  </svg>
);

export const FlagEN: React.FC<FlagProps> = ({ className = "w-4 h-3" }) => (
  <svg
    viewBox="0 0 60 30"
    className={`inline-block rounded-[2px] overflow-hidden border border-white/20 shadow-sm shrink-0 ${className}`}
    aria-hidden="true"
  >
    <clipPath id="gb-s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="gb-t">
      <path d="M30,15 L0,0 v30 z M30,15 L60,30 v-30 z M30,15 L0,30 h60 z M30,15 L60,0 h-60 z" />
    </clipPath>
    <g clipPath="url(#gb-s)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M0,30 L60,0" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M0,30 L60,0" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb-t)" />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);
