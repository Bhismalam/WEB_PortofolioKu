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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[rgb(10_12_16/0.55)]">
        <div 
          className="bg-canvas w-full max-w-md rounded-[20px] p-6 sm:p-7 border border-danger/30 shadow-[0_24px_80px_rgb(0_0_0/0.18)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-canvas-2 hover:bg-canvas-3 text-ink-3 hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Warning Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-danger-soft border border-danger/30 text-danger flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-ink mb-2">
            {title}
          </h3>
          <p className="text-ink-2 text-xs leading-relaxed mb-6">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-canvas text-ink-2 hover:text-ink border-line text-xs transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-xl text-white font-semibold text-xs transition-all bg-danger hover:bg-[#a82824]"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
