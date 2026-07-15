import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Journey from './components/Journey';
import Solutions from './components/Solutions';
import EmpathyHub from './components/EmpathyHub';
import VideoSection from './components/VideoSection';
import ImpactMap from './components/ImpactMap';
import MessageWall from './components/MessageWall';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulated high-end science media pre-loader
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (loading) {
      progressTimer = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            setTimeout(() => {
              setLoading(false);
            }, 600); // fade out duration offset
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 80);
    }
    return () => clearInterval(progressTimer);
  }, [loading]);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f0f9ff] text-slate-800 overflow-x-hidden selection:bg-sky-500/30 selection:text-slate-900">
      {/* Immersive loading screen overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="global-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-gradient-to-tr from-sky-50 via-white to-amber-50 z-50 flex flex-col justify-center items-center px-4"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c705_1px,transparent_1px),linear-gradient(to_bottom,#0284c705_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sky-300/20 blur-[100px] pointer-events-none animate-pulse" />

            <div className="flex flex-col items-center max-w-sm w-full relative z-10">
              {/* Brand symbol spinner */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-amber-400 flex items-center justify-center font-bold text-2xl text-white shadow-[0_8px_30px_rgba(14,165,233,0.2)] mb-6 animate-[pulse_1.5s_infinite]">
                LM
                <div className="absolute inset-0 rounded-2xl border border-white/30 animate-ping pointer-events-none" />
              </div>

              <span className="text-[10px] font-mono text-sky-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-500 animate-spin" /> PROJECT CHẠM • THPT NGUYỄN DU
              </span>
              <h1 className="text-lg font-bold text-slate-800 mb-2 tracking-wide font-sans text-center">Đang tải trải nghiệm thấu cảm...</h1>
              <p className="text-[10px] font-bold text-rose-500 tracking-[0.1em] uppercase mb-8 text-center font-sans max-w-xs leading-relaxed">
                NHÌN BẰNG TRÁI TIM • HÀNH ĐỘNG BẰNG YÊU THƯƠNG
              </p>

              {/* Progress indicator */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3 relative border border-slate-200/50">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-400 rounded-full transition-all duration-100"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <div className="flex justify-between w-full text-[10px] font-mono text-slate-400">
                <span>PROGRESS</span>
                <span className="text-sky-500 font-bold">{Math.min(100, loadingProgress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Campaign Layout (Visible after pre-loader clears) */}
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Main sections assemble */}
          <Hero 
            onExploreClick={() => handleScrollToSection('problem-section')}
            onWatchVideoClick={() => handleScrollToSection('video-section')}
          />
          <Problem />
          <Journey />
          <Solutions />
          <EmpathyHub />
          <VideoSection />
          <ImpactMap />
          <MessageWall />
          <CTA />
          <Footer />
        </motion.main>
      )}
    </div>
    </ToastProvider>
  );
}
