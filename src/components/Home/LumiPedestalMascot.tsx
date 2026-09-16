import React, { useState } from 'react';
import { LumiMascot, LumiState } from '../LumiMascot';
import { Heart, Sparkles, Smile, MessageCircle } from 'lucide-react';

interface LumiPedestalMascotProps {
  onEmotionChange?: (mood: LumiState) => void;
}

const LUMI_EMOTIONS: Array<{
  mood: LumiState;
  name: string;
  badge: string;
  quote: string;
  icon: React.ComponentType<{ className?: string }>;
  borderStyle: string;
  badgeStyle: string;
}> = [
  {
    mood: 'heart',
    name: 'Trắc ẩn & Yêu thương',
    badge: '❤️ Yêu thương',
    quote: '“Nhìn bằng trái tim – Yêu thương bằng hành động!”',
    icon: Heart,
    borderStyle: 'border-cyan-300 shadow-cyan-500/20',
    badgeStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    mood: 'joy',
    name: 'Hân hoan & Tươi vui',
    badge: '😊 Hân hoan',
    quote: '“Cùng LUMI lan tỏa nụ cười và năng lượng tích cực nhé!”',
    icon: Smile,
    borderStyle: 'border-blue-300 shadow-blue-500/20',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    mood: 'star',
    name: 'Tỏa sáng & Hy vọng',
    badge: '✨ Tỏa sáng',
    quote: '“Mỗi điều tử tế nhỏ bé là một vì sao sáng lấp lánh!”',
    icon: Sparkles,
    borderStyle: 'border-sky-300 shadow-sky-500/20',
    badgeStyle: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  {
    mood: 'thanks',
    name: 'Biết ơn & Tri ân',
    badge: '🙏 Biết ơn',
    quote: '“LUMI cảm ơn bạn vì luôn gieo mầm nhân ái mỗi ngày!”',
    icon: Heart,
    borderStyle: 'border-cyan-300 shadow-cyan-500/20',
    badgeStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  }
];

export const LumiPedestalMascot: React.FC<LumiPedestalMascotProps> = ({ onEmotionChange }) => {
  const [currentEmotionIdx, setCurrentEmotionIdx] = useState<number>(-1);

  const handleTouchLumi = () => {
    const nextIdx = (currentEmotionIdx + 1) % LUMI_EMOTIONS.length;
    setCurrentEmotionIdx(nextIdx);
    if (onEmotionChange) {
      onEmotionChange(LUMI_EMOTIONS[nextIdx].mood);
    }
  };

  const activeEmotion = currentEmotionIdx >= 0 ? LUMI_EMOTIONS[currentEmotionIdx] : null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      
      {/* Speech Bubble / Mood Floating Dialog */}
      <div className="min-h-[48px] flex items-center justify-center mb-1 z-20">
        {!activeEmotion ? (
          <div 
            onClick={handleTouchLumi}
            className="cursor-pointer bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-cyan-200/90 shadow-lg shadow-cyan-500/10 text-xs font-semibold text-slate-700 flex items-center gap-2 max-w-xs animate-in fade-in duration-300 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4 text-cyan-600 flex-shrink-0" />
            <span>“Cùng LUMI kiến tạo một tương lai tràn ngập yêu thương!”</span>
          </div>
        ) : (
          <div 
            key={activeEmotion.mood}
            onClick={handleTouchLumi}
            className={`cursor-pointer bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border ${activeEmotion.borderStyle} shadow-lg text-xs text-slate-700 flex flex-col items-center gap-1 max-w-xs animate-in zoom-in-95 duration-200`}
          >
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${activeEmotion.badgeStyle}`}>
                <activeEmotion.icon className="w-3 h-3" />
                {activeEmotion.badge}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Chạm để đổi cảm xúc
              </span>
            </div>
            <p className="text-center font-medium text-slate-800 italic px-1 text-[11.5px]">
              {activeEmotion.quote}
            </p>
          </div>
        )}
      </div>

      {/* Mascot on Pedestal Wrapper */}
      <div 
        onClick={handleTouchLumi}
        className="relative group cursor-pointer flex flex-col items-center justify-center"
        title="Chạm vào LUMI để tương tác"
      >
        {/* Holographic Cyan Light Column */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-cyan-400/30 via-blue-500/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Mascot Element with Floating Animation */}
        <div className="relative z-10 animate-float-gentle transform transition-transform duration-300 group-hover:scale-105">
          <LumiMascot 
            size="xl" 
            state={activeEmotion ? activeEmotion.mood : 'heart'} 
            interactive={false}
            hideInternalBubble={true}
          />
        </div>

        {/* --- 3D Digital Futuristic Pedestal Platform --- */}
        <div className="relative -mt-6 z-0 flex flex-col items-center">
          
          {/* Top Holographic Disc Ring */}
          <div className="w-48 sm:w-56 h-8 rounded-[100%] bg-gradient-to-r from-cyan-300 via-sky-100 to-blue-300 border-2 border-cyan-300 shadow-[0_0_25px_rgba(0,184,255,0.7)] flex items-center justify-center relative overflow-hidden">
            <div className="w-40 sm:w-48 h-5 rounded-[100%] bg-gradient-to-b from-cyan-500/40 via-blue-600/30 to-slate-900/60 flex items-center justify-center">
              <div className="w-32 sm:w-36 h-3 rounded-[100%] bg-cyan-200/80 blur-xs" />
            </div>
          </div>

          {/* Pedestal Cylinder Body with Inscription */}
          <div className="w-52 sm:w-64 h-12 -mt-3.5 rounded-b-3xl bg-gradient-to-b from-[#0B254A] via-[#0E356A] to-[#071833] border-x border-b border-cyan-400/50 shadow-2xl flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient Cyan Neon Glow Inside Pedestal */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00E5FF]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,184,255,0.35),transparent_70%)]" />

            {/* Inscribed Glowing Text */}
            <span className="relative z-10 text-[11px] sm:text-xs font-extrabold tracking-wider text-white uppercase text-center drop-shadow-[0_0_8px_rgba(56,214,255,0.9)] bg-gradient-to-r from-cyan-100 via-white to-cyan-200 bg-clip-text">
              VÌ MỘT THẾ GIỚI TỐT ĐẸP HƠN
            </span>
          </div>

          {/* Pedestal Base Shadow & Ground Reflection */}
          <div className="w-56 sm:w-72 h-4 -mt-1 rounded-[100%] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-md" />
          <div className="w-48 sm:w-60 h-2 -mt-2 rounded-[100%] bg-slate-900/15 blur-xs" />
        </div>

      </div>

    </div>
  );
};
