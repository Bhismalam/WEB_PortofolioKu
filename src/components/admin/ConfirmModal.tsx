'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Portal } from '@/components/public/Portal';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Hapus Sekarang',
  cancelText = 'Batal'
}) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
        <div 
          className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-7 border border-rose-500/30 bg-[#0a0015]/95 shadow-2xl shadow-rose-950/40 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Warning Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4 shadow-lg shadow-rose-900/20">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed mb-6 font-mono-tech">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl glass-card text-gray-300 hover:text-white border-white/10 text-xs font-mono-tech transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs font-mono-tech shadow-lg shadow-rose-900/40 transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
