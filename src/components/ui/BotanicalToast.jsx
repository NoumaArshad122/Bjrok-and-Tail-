import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Info, X } from 'lucide-react';

export default function BotanicalToast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3600);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-6 inset-x-4 z-50 flex justify-center pointer-events-none"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1A3326] text-[#FBF9F5] shadow-2xl border border-[#2D543F] max-w-sm w-full"
          >
            <div className="w-7 h-7 rounded-full bg-[#C26747] text-white flex items-center justify-center shrink-0 shadow-sm">
              {type === 'success' ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
            </div>

            <p className="text-xs font-medium text-[#F4F1EA] flex-1 leading-snug">
              {message}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="text-[#DCE4DA]/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
