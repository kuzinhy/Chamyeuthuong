import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface GlobalLoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const GlobalLoadingOverlay: React.FC<GlobalLoadingOverlayProps> = ({
  isLoading,
  message = 'Đang đồng bộ dữ liệu...'
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top Micro-Progress Shimmer Bar */}
          <motion.div
            id="global-loading-top-bar"
            key="global-top-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none overflow-hidden bg-sky-100/60"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"
              initial={{ x: '-100%', width: '45%' }}
              animate={{ x: '250%' }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Central Frosted Backdrop & Floating Card */}
          <motion.div
            id="global-loading-backdrop"
            key="global-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[9990] flex items-center justify-center pointer-events-none bg-slate-900/15 backdrop-blur-[2px]"
          >
            <motion.div
              id="global-loading-card"
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{
                type: 'spring',
                damping: 24,
                stiffness: 300
              }}
              className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-sky-100/80 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-sky-950/15 flex items-center gap-4 max-w-sm mx-4 select-none"
            >
              {/* Animated Glowing Ring Mascot */}
              <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-sky-100 border-t-sky-600 border-r-cyan-500"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear'
                  }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full bg-sky-50 flex items-center justify-center"
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut'
                  }}
                >
                  <Sparkles className="w-4 h-4 text-sky-600" />
                </motion.div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                </div>
              </div>

              {/* Text & Status Details */}
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800 tracking-tight truncate">
                    {message}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Heart className="w-3 h-3 text-rose-400 shrink-0 fill-rose-400/20" />
                  <span className="text-xs text-slate-500 tracking-wide font-normal truncate">
                    Chạm Yêu Thương • LUMI
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
