import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Download, Users, CheckCircle2, Copy } from 'lucide-react';

export default function CTA() {
  const [showShareToast, setShowShareToast] = useState(false);
  const [showJoinToast, setShowJoinToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 2500);
  };

  const handleJoinCampaign = () => {
    setShowJoinToast(true);
    setTimeout(() => {
      setShowJoinToast(false);
    }, 3000);
  };

  return (
    <section id="cta-section" className="relative py-28 bg-[#020617] overflow-hidden text-center">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0b1329_40%,#020617_100%)]" />
      
      {/* Neon blur accent balls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        {/* Core Slogan Display */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-300 leading-tight tracking-tight mb-8 font-sans"
        >
          “Hãy bắt đầu bằng một<br/>
          <span className="text-white relative">
            ánh nhìn biết yêu thương.”
            <span className="absolute bottom-1 left-0 w-full h-[3px] bg-cyan-400 opacity-60" />
          </span>
        </motion.h2>

        {/* Sub text */}
        <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
          Hành trình xóa tan thờ ơ và lan tỏa thấu cảm học đường đang cần sự góp sức của bạn. Mỗi lượt chia sẻ, mỗi lời nói tử tế là một đốm sáng thắp bừng hy vọng.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto relative z-20">
          {/* Share */}
          <button
            id="cta-share-btn"
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            Chia sẻ chiến dịch
          </button>

          {/* Join */}
          <button
            id="cta-join-btn"
            onClick={handleJoinCampaign}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-sans text-sm font-semibold hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            Đăng ký tham gia
          </button>

          {/* Download */}
          <a
            id="cta-download-btn"
            href="#dashboard-section"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
            Tải tài liệu dự án
          </a>
        </div>

        {/* Real-time Toasts overlays */}
        <AnimatePresence>
          {showShareToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/80 border border-cyan-500/30 px-5 py-3 rounded-xl backdrop-blur-md flex items-center gap-2 text-white text-xs font-mono shadow-lg"
            >
              <Copy className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Đã sao chép liên kết chiến dịch vào bộ nhớ tạm!</span>
            </motion.div>
          )}

          {showJoinToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/80 border border-emerald-500/30 px-5 py-3 rounded-xl backdrop-blur-md flex items-center gap-2 text-white text-xs font-mono shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Cảm ơn bạn! Đã ghi nhận đăng ký tham gia ĐẠI SỨ TRẮC ẨN.</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
