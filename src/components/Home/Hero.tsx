import React from 'react';
import { Heart, Sparkles, ArrowRight, BookOpen, Mail, ShieldCheck } from 'lucide-react';
import { LumiMascot } from '../LumiMascot';
import { ActiveNavPage } from '../../types';

interface HeroProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLetterModal }) => {
  return (
    <section id="hero-section" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-rose-50/70 via-warm-ivory to-white">
      {/* Gentle floating ambient blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-rose-200/40 via-amber-200/30 to-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>
      <div className="absolute -top-10 right-10 w-72 h-72 bg-rose-200/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/80 shadow-xs text-xs font-semibold text-rose-700 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>LUMI – Lan tỏa lòng trắc ẩn</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span className="text-slate-500 font-normal">Dự án Khoa học Hành vi THPT</span>
          </div>

          {/* Slogan & Main Title */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
              NHÌN BẰNG <span className="text-gradient-coral">TRÁI TIM</span>
              <br />
              HÀNH ĐỘNG BẰNG <span className="text-gradient-coral">YÊU THƯƠNG</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Không gian số kết nối những câu chuyện tử tế, âm nhạc chữa lành và nghiên cứu thực nghiệm về sức mạnh của truyền thông thị giác trong việc đánh thức sự thấu cảm của học sinh.
            </p>
          </div>

          {/* Interactive Mascot Centerpiece */}
          <div className="py-2 flex justify-center">
            <LumiMascot size="lg" interactive={true} />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              id="hero-explore-stories-btn"
              onClick={() => onNavigate('stories')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-1 lumi-btn-shine transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              <span>Khám phá những câu chuyện tử tế</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              id="hero-send-letter-btn"
              onClick={onOpenLetterModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-rose-50/80 text-slate-800 hover:text-rose-700 font-semibold text-sm sm:text-base border border-rose-200/80 shadow-xs hover:shadow-md hover:border-rose-400 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform duration-300" />
              <span>Gửi lời yêu thương</span>
            </button>
          </div>

          {/* Impact stats ticker with dynamic hover states */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-rose-100/80 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-default">
              <div className="font-display font-bold text-xl sm:text-2xl text-rose-600 group-hover:scale-110 transition-transform duration-300">300+</div>
              <div className="text-xs text-slate-500 font-medium group-hover:text-slate-700">Học sinh khảo sát</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-rose-100/80 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-default">
              <div className="font-display font-bold text-xl sm:text-2xl text-amber-500 group-hover:scale-110 transition-transform duration-300">63</div>
              <div className="text-xs text-slate-500 font-medium group-hover:text-slate-700">Tỉnh thành kết nối</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-rose-100/80 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-default">
              <div className="font-display font-bold text-xl sm:text-2xl text-sky-500 group-hover:scale-110 transition-transform duration-300">6</div>
              <div className="text-xs text-slate-500 font-medium group-hover:text-slate-700">Giải pháp can thiệp</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-rose-100/80 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-default">
              <div className="font-display font-bold text-xl sm:text-2xl text-emerald-500 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-xs text-slate-500 font-medium group-hover:text-slate-700">Bảo mật & phi thương mại</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
