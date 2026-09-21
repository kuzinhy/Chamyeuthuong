import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircleHeart,
  Compass,
  Radio
} from 'lucide-react';
import { ActiveNavPage } from '../../types';
import { LumiMascot, LumiState } from '../LumiMascot';

interface SimpleMissionHeroProps {
  onNavigate?: (page: ActiveNavPage) => void;
  onOpenLetterModal?: () => void;
}

// Framer Motion entrance variants with staggered orchestration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const SimpleMissionHero: React.FC<SimpleMissionHeroProps> = ({
  onNavigate = (_page: ActiveNavPage) => {},
  onOpenLetterModal = () => {},
}) => {
  const [mascotMood, setMascotMood] = useState<LumiState>('heart');

  const missionPillars = [
    {
      id: 'pillar-listen',
      icon: MessageCircleHeart,
      title: 'Lắng nghe & Thấu cảm',
      desc: 'Hộp thư ẩn danh tiếp nhận sẻ chia, xoa dịu áp lực tâm lý học đường an toàn và không phán xét.',
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
    },
    {
      id: 'pillar-kindness',
      icon: Sparkles,
      title: 'Lan tỏa Lòng tử tế',
      desc: 'Tôn vinh những câu chuyện đẹp, thắp sáng niềm tin và khích lệ hành động yêu thương mỗi ngày.',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      id: 'pillar-safe-school',
      icon: ShieldCheck,
      title: 'Học đường Không bạo lực',
      desc: 'Chung tay đẩy lùi bạo lực bằng sự thấu hiểu, gắn kết học sinh, thầy cô và gia đình.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
  ];

  return (
    <section 
      id="hero-mission-section"
      aria-label="Giới thiệu sứ mệnh LUMI"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-18 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-[#F8FAFC] border-b border-slate-200/80"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-10 left-1/6 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-16 right-1/6 w-80 h-80 rounded-full bg-rose-100/45 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Column: Mission Content (Badges, Titles, Mission Paragraph, CTAs) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left">
            
            {/* 1. Top Badge: Mission & Identity */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/80 shadow-xs text-xs font-semibold text-sky-800 tracking-wide select-none">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 shrink-0" />
                <span className="font-extrabold text-slate-900">LUMI</span>
                <span className="text-slate-300">•</span>
                <span className="text-sky-700">Sứ Mệnh Vì Học Đường Hạnh Phúc</span>
              </div>
            </motion.div>

            {/* 2. Main Title & Slogan */}
            <motion.div variants={itemVariants} className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]">
                Lan Tỏa Lòng Trắc Ẩn,{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Chạm Yêu Thương
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl font-semibold italic text-sky-950/90 tracking-tight">
                “Nhìn bằng trái tim – Hành động bằng yêu thương”
              </p>
            </motion.div>

            {/* 3. Concise Mission Paragraph */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              <strong className="text-slate-800 font-semibold">Sứ mệnh của LUMI:</strong> Kiến tạo không gian số an toàn và ấm áp, 
              kết nối những tấm lòng trắc ẩn để lắng nghe mọi tâm tư học sinh, đẩy lùi bạo lực học đường 
              và nhân rộng những hành động tử tế mỗi ngày trong cộng đồng.
            </motion.p>

            {/* 4. Action Buttons (CTAs) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <button
                id="hero-explore-stories-btn"
                onClick={() => onNavigate('stories')}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-white/90" />
                <span className="whitespace-nowrap">Khám Phá Câu Chuyện</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-send-letter-btn"
                onClick={onOpenLetterModal}
                className="px-6 py-3 rounded-xl bg-white hover:bg-rose-50/60 text-slate-800 hover:text-rose-600 font-semibold text-sm border border-slate-200 hover:border-rose-200 shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap">Gửi Hộp Thư Yêu Thương</span>
              </button>

              <button
                id="hero-scroll-ecosystem-btn"
                onClick={() => {
                  const el = document.getElementById('kindness-ecosystem-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('research');
                  }
                }}
                className="px-5 py-3 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 font-semibold text-sm border border-transparent active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-500 group-hover:text-slate-800" />
                <span className="whitespace-nowrap">Không Gian Số</span>
              </button>
            </motion.div>

            {/* 5. 3 Mission Pillars */}
            <motion.div 
              variants={itemVariants}
              className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {missionPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    variants={cardVariants}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className={`p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border ${pillar.border} shadow-2xs hover:shadow-xs transition-shadow duration-200 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-7 h-7 rounded-lg ${pillar.bg} ${pillar.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight line-clamp-1">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* Right Column: LUMI Mascot Compassion Companion Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="w-full max-w-sm rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-950/5 p-6 relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Subtle background ring */}
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-sky-100/50 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-rose-100/50 blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-4 border border-sky-100">
                <Radio className="w-3 h-3 text-sky-500 animate-pulse" />
                <span>Bạn đồng hành LUMI</span>
              </div>

              {/* Interactive Mascot */}
              <div className="relative my-2 cursor-pointer select-none" onClick={() => {
                const moods: LumiState[] = ['heart', 'joy', 'waving', 'star', 'thanks'];
                const nextMood = moods[(moods.indexOf(mascotMood) + 1) % moods.length];
                setMascotMood(nextMood);
              }}>
                <LumiMascot 
                  state={mascotMood} 
                  size="lg" 
                  interactive={true} 
                  hideInternalBubble={true}
                />
              </div>

              {/* Speech / Mission message from LUMI */}
              <div className="mt-4 p-3.5 rounded-xl bg-sky-50/70 border border-sky-100/80 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                “Chào bạn! LUMI luôn ở đây để lắng nghe tâm tư và cùng bạn gieo mầm tử tế vào mỗi ngày đến trường. Hãy sẻ chia cùng LUMI nhé!”
              </div>

              {/* Quick Prompt Button */}
              <button
                onClick={onOpenLetterModal}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Viết thư tâm sự cùng LUMI</span>
              </button>

              <p className="text-[11px] text-slate-400 mt-2.5 font-normal">
                Nhấn vào LUMI để đổi biểu cảm vui nhộn ✨
              </p>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
