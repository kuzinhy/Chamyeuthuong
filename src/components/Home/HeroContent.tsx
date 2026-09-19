import React from 'react';
import { BookOpen, ArrowRight, Heart } from 'lucide-react';
import { ActiveNavPage } from '../../types';

interface HeroContentProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onNavigate,
  onOpenLetterModal
}) => {
  return (
    <div className="space-y-6 text-left relative z-10 max-w-2xl">
      
      {/* Top Badge: LUMI Chạm yêu thương */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200 shadow-xs text-xs font-bold text-sky-800 tracking-wide select-none">
        <span className="text-blue-600">💙</span>
        <span className="font-extrabold text-slate-900 tracking-tight">LUMI</span>
        <span className="text-slate-300 font-light">|</span>
        <span className="text-sky-700 font-medium">Chạm yêu thương</span>
      </div>

      {/* Main Title & Slogan */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F3A] tracking-tight leading-none">
            LUMI
          </h1>
          {/* Subtle flowing cyan wave accent */}
          <svg className="w-12 h-6 text-cyan-400 opacity-80" viewBox="0 0 60 20" fill="none">
            <path d="M2 10C15 2 25 18 38 10C48 3 55 12 58 10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] bg-gradient-to-r from-[#006EFF] via-[#0095FF] to-[#00D0FF] bg-clip-text text-transparent">
          CHẠM YÊU THƯƠNG
        </h2>

        <p className="text-lg sm:text-xl lg:text-2xl font-bold italic text-sky-950/90 tracking-tight pt-1">
          “Nhìn bằng trái tim – Hành động bằng yêu thương”
        </p>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
        Nền tảng lan tỏa những câu chuyện tử tế, kết nối những tấm lòng và truyền cảm hứng hành động vì một cộng đồng tốt đẹp hơn.
      </p>

      {/* Dual Modern CTAs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
        
        {/* Primary CTA */}
        <button
          id="hero-explore-stories-btn"
          onClick={() => onNavigate('stories')}
          className="px-7 py-3.5 rounded-[16px] bg-gradient-to-r from-[#006EFF] via-[#008CFF] to-[#00B8FF] hover:from-[#0056CC] hover:to-[#0095FF] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 lumi-btn-shine transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95"
        >
          <BookOpen className="w-4.5 h-4.5 text-white/90" />
          <span className="tracking-wide">KHÁM PHÁ CÂU CHUYỆN</span>
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary CTA */}
        <button
          id="hero-send-letter-btn"
          onClick={onOpenLetterModal}
          className="px-7 py-3.5 rounded-[16px] bg-white/90 hover:bg-sky-50 text-[#0B1F3A] hover:text-[#006EFF] font-bold text-sm border border-sky-200/90 hover:border-sky-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95 backdrop-blur-md"
        >
          <Heart className="w-4.5 h-4.5 text-[#006EFF] group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">GỬI HỘP THƯ YÊU THƯƠNG</span>
        </button>

      </div>

    </div>
  );
};
