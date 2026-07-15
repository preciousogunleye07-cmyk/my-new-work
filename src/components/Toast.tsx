import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div id="toast-container" className="fixed top-6 left-6 right-6 md:left-auto md:right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-[calc(100vw-3rem)] md:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-[#FAF6F0] border border-[#E0D4C5] text-[#2B1E17] p-4 flex items-start gap-3 shadow-[0_10px_30px_rgba(43,30,23,0.05)] rounded-none relative overflow-hidden group"
          >
            {/* Elegant side accent bar */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                toast.type === 'success' ? 'bg-[#7C522C]' : toast.type === 'error' ? 'bg-red-500' : 'bg-[#2B1E17]'
              }`} 
            />

            <div className="pt-0.5">
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-[#7C522C]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#2B1E17]" />}
              {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
            </div>

            <div className="flex-1">
              <p className="text-[11px] font-sans font-medium tracking-wide leading-relaxed pr-4">
                {toast.text}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#2B1E17]/40 hover:text-[#2B1E17] p-0.5 transition-colors"
              aria-label="Close Notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
export { Toast };
