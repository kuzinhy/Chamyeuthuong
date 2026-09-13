import React from 'react';
import { Heart, Sparkles, Send, ArrowRight } from 'lucide-react';
import { ActiveNavPage } from '../../types';

interface CallToActionSectionProps {
  onOpenLetterModal: () => void;
  onNavigate: (page: ActiveNavPage) => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onOpenLetterModal,
  onNavigate
}) => {
  return (
    <section id="cta-home-section" className="py-20 sm:py-28 bg-gradient-to-b from-white to-rose-50/70 border-t border-rose-100/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-sm animate-pulse">
          <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
        </div>

        <div className="space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            “Một hành động nhỏ cũng có thể bắt đầu một thay đổi lớn.”
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hãy cùng LUMI thắp lên ngọn lửa của sự thấu cảm. Dành một lời động viên cho bạn bè, sẻ chia một câu chuyện đẹp, hoặc tham gia khảo sát để đóng góp vào đề tài nghiên cứu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenLetterModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-bold text-base shadow-xl shadow-rose-500/25 hover:shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-1 lumi-btn-shine transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-300" />
            <span>Lan tỏa điều tử tế</span>
          </button>

          <button
            onClick={() => onNavigate('stories')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-rose-50/80 text-slate-800 hover:text-rose-700 font-bold text-base border border-rose-200 hover:border-rose-400 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <span>Đọc thêm câu chuyện</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
