'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  onClose: () => void;
  labelledBy: string;
  size?: 'wide' | 'medium' | 'small';
  children: React.ReactNode;
}

const widths = {
  wide: 'sm:max-w-[1000px]',
  medium: 'sm:max-w-[760px]',
  small: 'sm:max-w-[440px]',
};

// Modal sheet: Esc and scrim close it, focus moves in and is trapped, page scroll is locked.
export const Dialog: React.FC<DialogProps> = ({ onClose, labelledBy, size = 'medium', children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const initial = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel;
    initial?.focus({ preventScroll: true });

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  // Only mounted after a user action, so document is available.
  return createPortal(
      <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
        <div className="scrim-in absolute inset-0 bg-[rgb(10_12_16/0.55)]" onClick={onClose} aria-hidden />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          tabIndex={-1}
          className={`sheet-in relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[24px] bg-canvas shadow-[0_24px_80px_rgb(0_0_0/0.28)] outline-none sm:rounded-[24px] ${widths[size]}`}
        >
          {children}
        </div>
      </div>,
    document.body
  );
};
