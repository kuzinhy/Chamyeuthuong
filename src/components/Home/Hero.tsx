import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, BookOpen, MessageCircle, Activity, Shield, Smile } from 'lucide-react';
import { LumiMascot, LumiState } from '../LumiMascot';
import { ActiveNavPage } from '../../types';

interface HeroProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
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
    borderStyle: 'border-rose-200/90 shadow-rose-500/15',
    badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    mood: 'joy',
    name: 'Hân hoan & Vui tươi',
    badge: '😊 Hân hoan',
    quote: '“Cùng LUMI lan tỏa nụ cười và sự tử tế nhé!”',
    icon: Smile,
    borderStyle: 'border-amber-200/90 shadow-amber-500/15',
    badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    mood: 'star',
    name: 'Tỏa sáng & Hy vọng',
    badge: '✨ Tỏa sáng',
    quote: '“Mỗi điều tử tế nhỏ bé là một vì sao sáng lấp lánh!”',
    icon: Sparkles,
    borderStyle: 'border-cyan-200/90 shadow-cyan-500/15',
    badgeStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    mood: 'thanks',
    name: 'Biết ơn & Tri ân',
    badge: '🙏 Biết ơn',
    quote: '“LUMI cảm ơn bạn vì luôn gieo mầm nhân ái mỗi ngày!”',
    icon: Heart,
    borderStyle: 'border-blue-200/90 shadow-blue-500/15',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    mood: 'waving',
    name: 'Thân thiện & Đồng hành',
    badge: '👋 Thân thiện',
    quote: '“Chào bạn thân mến! LUMI luôn ở đây lắng nghe và đồng hành cùng bạn!”',
    icon: Sparkles,
    borderStyle: 'border-sky-200/90 shadow-sky-500/15',
    badgeStyle: 'bg-sky-50 text-sky-700 border-sky-200'
  }
];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLetterModal }) => {
  const [currentEmotionIdx, setCurrentEmotionIdx] = useState<number>(-1);

  const handleTouchLumi = () => {
    setCurrentEmotionIdx((prev) => (prev + 1) % LUMI_EMOTIONS.length);
  };

  const activeEmotion = currentEmotionIdx >= 0 ? LUMI_EMOTIONS[currentEmotionIdx] : null;
  return (
    <section id="hero-section" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-sky-100/80">
      
      {/* =========================================================================
          LOAN MÀU & AMBIENT TECH BLUR BACKGROUND (Color Bleed & Mesh Gradient)
      ========================================================================== */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft cyber blue canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF] via-[#F8FAFC] to-white" />
        
        {/* Tech Grid Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{ 
            backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`, 
            backgroundSize: '28px 28px' 
          }} 
        />

        {/* Loan màu Orb 1: Cyan Tech Glow (Top Left) */}
        <div className="absolute -top-16 -left-12 w-[520px] h-[520px] bg-gradient-to-tr from-cyan-400/25 to-sky-300/20 rounded-full blur-[90px] mix-blend-multiply pointer-events-none animate-pulse duration-[7000ms]" />
        
        {/* Loan màu Orb 2: Deep Tech Blue / Indigo Bleed (Top Right) */}
        <div className="absolute top-10 right-0 w-[580px] h-[580px] bg-gradient-to-bl from-blue-500/20 via-sky-400/15 to-indigo-400/20 rounded-full blur-[110px] pointer-events-none" />

        {/* Loan màu Orb 3: Center Soft Ambient Light */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[320px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Main Title, Slogan, Description & Action Buttons (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            
            {/* Tech Status Pill with Pulse Dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sky-200/80 shadow-xs text-xs font-semibold text-sky-800 tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
              <span className="text-slate-700">Không Gian Số Lan Tỏa Lòng Trắc Ẩn</span>
              <span className="text-sky-300">•</span>
              <span className="text-sky-600 font-bold">THPT Nguyễn Du</span>
            </div>

            {/* Main Title & Slogan with Tech Gradient */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                LUMI – <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">CHẠM YÊU THƯƠNG</span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-sky-700 to-blue-800 bg-clip-text text-transparent tracking-tight">
                “Nhìn bằng trái tim – Hành động bằng yêu thương”
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Nền tảng can thiệp truyền thông số thuộc đề tài nghiên cứu khoa học hành vi, kết nối những tấm lòng tử tế và thắp sáng hành vi tương trợ của học sinh trên cả nước.
            </p>

            {/* Two Main Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-explore-stories-btn"
                onClick={() => onNavigate('stories')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>KHÁM PHÁ CÂU CHUYỆN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-send-letter-btn"
                onClick={onOpenLetterModal}
                className="px-6 py-3 rounded-xl bg-white/90 hover:bg-sky-50/80 text-slate-800 hover:text-sky-700 font-semibold text-sm border border-slate-200/90 hover:border-sky-300 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer active:scale-95 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>GỬI HỘP THƯ YÊU THƯƠNG</span>
              </button>
            </div>

            {/* High-Tech Trust Badges */}
            <div className="pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-sky-100/70">
                <div className="text-xl font-black text-slate-900 font-display">63</div>
                <div className="text-[11px] text-slate-500 font-medium">Tỉnh thành kết nối</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-sky-100/70">
                <div className="text-xl font-black text-sky-600 font-display">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Bảo mật & phi lợi nhuận</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-sky-100/70">
                <div className="text-xl font-black text-indigo-600 font-display">SPSS</div>
                <div className="text-[11px] text-slate-500 font-medium">Nghiên cứu hành vi</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Mascot with Ambient Light Halo (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Speech Bubble / Emotion Frame */}
            {!activeEmotion ? (
              /* Khung text ban đầu: Biến mất khi chạm vào LUMI */
              <div 
                id="hero-speech-bubble"
                className="relative mb-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-200/90 shadow-md shadow-sky-500/10 text-xs font-semibold text-slate-700 flex items-center gap-2 max-w-xs animate-in fade-in duration-300 z-10"
              >
                <MessageCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>“Chào bạn! Cùng LUMI lan tỏa một điều tử tế hôm nay nhé!”</span>
                {/* Bubble Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-sky-200/90 transform rotate-45" />
              </div>
            ) : (
              /* Khung hiển thị cảm xúc của LUMI khi chạm vào */
              <div 
                id="hero-emotion-bubble"
                key={activeEmotion.mood}
                className={`relative mb-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border ${activeEmotion.borderStyle} shadow-lg text-xs text-slate-700 flex flex-col items-center gap-1.5 max-w-xs animate-in fade-in zoom-in-95 duration-200 z-10`}
              >
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${activeEmotion.badgeStyle}`}>
                    <activeEmotion.icon className="w-3.5 h-3.5" />
                    {activeEmotion.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Cảm xúc LUMI
                  </span>
                </div>
                <p className="text-center font-medium text-slate-800 italic px-1">
                  {activeEmotion.quote}
                </p>
                {/* Bubble Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45" />
              </div>
            )}

            {/* Mascot with Soft Ambient Halo */}
            <div 
              id="hero-lumi-mascot-wrapper"
              onClick={handleTouchLumi}
              onTouchStart={handleTouchLumi}
              className="relative group cursor-pointer p-4 select-none"
              title="Chạm vào LUMI để đổi biểu cảm"
            >
              {/* Glowing Loan màu Backlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 via-cyan-300/30 to-blue-500/25 rounded-full blur-2xl group-hover:scale-110 transition-all duration-300 pointer-events-none" />
              
              <div className="relative transform group-hover:scale-105 active:scale-95 transition-all duration-300">
                <LumiMascot 
                  size="lg" 
                  state={activeEmotion ? activeEmotion.mood : 'default'}
                  interactive={true}
                  hideInternalBubble={true}
                  onMoodChange={(mood) => {
                    const idx = LUMI_EMOTIONS.findIndex(e => e.mood === mood);
                    if (idx !== -1) setCurrentEmotionIdx(idx);
                  }}
                />
              </div>
            </div>

            {/* Friendly hint */}
            <div 
              onClick={handleTouchLumi}
              className="text-[11px] text-slate-500 text-center mt-1 flex items-center gap-1.5 bg-white/70 hover:bg-white/90 px-3 py-1 rounded-full border border-sky-100 shadow-2xs backdrop-blur-sm cursor-pointer transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
              <span>
                {activeEmotion 
                  ? `Đang thể hiện: ${activeEmotion.name} • Chạm tiếp để đổi cảm xúc`
                  : 'Chạm vào LUMI để đổi biểu cảm và lắng nghe lời nhắn'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
