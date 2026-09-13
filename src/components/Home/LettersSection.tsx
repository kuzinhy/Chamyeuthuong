import React from 'react';
import { Mail, Heart, ArrowRight, Sparkles, Send } from 'lucide-react';
import { Letter, ActiveNavPage } from '../../types';

interface LettersSectionProps {
  letters: Letter[];
  onOpenLetterModal: () => void;
  onNavigate: (page: ActiveNavPage) => void;
  onLikeLetter: (id: string) => void;
}

export const LettersSection: React.FC<LettersSectionProps> = ({
  letters,
  onOpenLetterModal,
  onNavigate,
  onLikeLetter
}) => {
  const approvedLetters = letters.filter(l => l.status === 'approved').slice(0, 4);

  const getThemeClass = (theme?: string) => {
    switch(theme) {
      case 'rose': return 'bg-rose-50/90 border-rose-200 text-rose-900';
      case 'purple': return 'bg-purple-50/90 border-purple-200 text-purple-900';
      case 'sky': return 'bg-sky-50/90 border-sky-200 text-sky-900';
      case 'emerald': return 'bg-emerald-50/90 border-emerald-200 text-emerald-900';
      default: return 'bg-amber-50/90 border-amber-200 text-amber-900';
    }
  };

  return (
    <section id="letters-home-section" className="py-20 sm:py-28 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Góc Gửi Gắm Tâm Tư</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
              Hộp Thư Yêu Thương
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Nơi lưu giữ những lời cảm ơn, xin lỗi, động viên chân thành giữa học sinh, thầy cô và bạn bè.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLetterModal}
              className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5 lumi-btn-shine transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Viết một lời yêu thương</span>
            </button>

            <button
              onClick={() => onNavigate('letters')}
              className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer group"
            >
              <span>Xem tất cả thư</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Postcard / Note cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedLetters.map((letter) => (
            <div
              key={letter.id}
              className={`p-6 rounded-3xl border shadow-sm lumi-postcard-hover flex flex-col justify-between space-y-4 relative group cursor-pointer ${getThemeClass(letter.colorTheme)}`}
            >
              {/* Category pill */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 shadow-2xs group-hover:scale-105 transition-transform">
                  {letter.category}
                </span>
                <span className="text-[10px] opacity-70 font-mono">
                  {letter.createdAt}
                </span>
              </div>

              {/* Letter content */}
              <p className="text-xs sm:text-sm font-handwriting text-lg sm:text-xl leading-relaxed flex-1 group-hover:text-slate-900 transition-colors">
                “{letter.content}”
              </p>

              {/* Sender & Target */}
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-xs">
                    {letter.isAnonymous ? 'Ẩn danh' : letter.senderName}
                  </p>
                  {letter.targetPerson && (
                    <p className="text-[10px] opacity-75">{letter.targetPerson}</p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeLetter(letter.id);
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/60 hover:bg-white hover:text-rose-600 transition-all cursor-pointer group/heart active:scale-90"
                  title="Thả tim cho lá thư này"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover/heart:scale-130 transition-transform" />
                  <span className="text-[11px] font-bold">{letter.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
