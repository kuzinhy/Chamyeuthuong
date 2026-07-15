import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Heart, X, Sparkles } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error' | 'heart' | 'sparkle';

export interface Toast {
  id: string;
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, options?: { description?: string; type?: ToastType; duration?: number }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((
    message: string,
    options?: { description?: string; type?: ToastType; duration?: number }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      message,
      description: options?.description,
      type: options?.type || 'info',
      duration: options?.duration || 4000,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            // Configure colors and icons based on type
            let icon = <Info className="w-5 h-5 text-sky-500" />;
            let borderColor = 'border-slate-100';
            let glowColor = 'shadow-[0_10px_30px_rgba(14,165,233,0.08)]';
            let iconBg = 'bg-sky-50 text-sky-600';
            
            if (toast.type === 'success') {
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
              borderColor = 'border-emerald-100';
              glowColor = 'shadow-[0_10px_30px_rgba(16,185,129,0.08)]';
              iconBg = 'bg-emerald-50 text-emerald-600';
            } else if (toast.type === 'heart') {
              icon = <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />;
              borderColor = 'border-pink-100';
              glowColor = 'shadow-[0_10px_30px_rgba(236,72,153,0.08)]';
              iconBg = 'bg-pink-50 text-pink-600';
            } else if (toast.type === 'sparkle') {
              icon = <Sparkles className="w-5 h-5 text-indigo-500" />;
              borderColor = 'border-indigo-100';
              glowColor = 'shadow-[0_10px_30px_rgba(99,102,241,0.08)]';
              iconBg = 'bg-indigo-50 text-indigo-600';
            } else if (toast.type === 'warning') {
              icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
              borderColor = 'border-amber-100';
              glowColor = 'shadow-[0_10px_30px_rgba(245,158,11,0.08)]';
              iconBg = 'bg-amber-50 text-amber-600';
            } else if (toast.type === 'error') {
              icon = <AlertCircle className="w-5 h-5 text-rose-500" />;
              borderColor = 'border-rose-100';
              glowColor = 'shadow-[0_10px_30px_rgba(244,63,94,0.08)]';
              iconBg = 'bg-rose-50 text-rose-600';
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`pointer-events-auto w-full bg-white/95 backdrop-blur-md border ${borderColor} ${glowColor} p-4 rounded-2xl flex items-start gap-3.5 relative overflow-hidden`}
              >
                {/* Left Accent indicator line */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  toast.type === 'success' ? 'bg-emerald-500' :
                  toast.type === 'heart' ? 'bg-pink-500' :
                  toast.type === 'sparkle' ? 'bg-indigo-500' :
                  toast.type === 'warning' ? 'bg-amber-500' :
                  toast.type === 'error' ? 'bg-rose-500' : 'bg-sky-500'
                }`} />

                {/* Icon wrapper */}
                <div className={`flex-shrink-0 p-2 rounded-xl ${iconBg} mt-0.5`}>
                  {icon}
                </div>

                {/* Text Content */}
                <div className="flex-grow pr-4">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-sans leading-snug">
                    {toast.message}
                  </h4>
                  {toast.description && (
                    <p className="text-[11px] sm:text-xs text-slate-500 font-light leading-relaxed mt-1">
                      {toast.description}
                    </p>
                  )}
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
