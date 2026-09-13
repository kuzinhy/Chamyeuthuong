import React, { useState, useMemo } from 'react';
import { Mail, Heart, Send, Sparkles, Filter, ShieldCheck, MessageCircle, AlertCircle } from 'lucide-react';
import { Letter, LetterCategory } from '../types';

interface LettersPageProps {
  letters: Letter[];
  onOpenLetterModal: () => void;
  onLikeLetter: (id: string) => void;
}

export const LettersPage: React.FC<LettersPageProps> = ({
  letters,
  onOpenLetterModal,
  onLikeLetter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: LetterCategory[] = [
    'Cảm ơn',
    'Xin lỗi',
    'Động viên',
    'Tâm sự',
    'Gửi một người đặc biệt',
    'Khác'
  ];

  const approvedLetters = useMemo(() => {
    return letters.filter(l => {
      if (l.status !== 'approved') return false;
      if (selectedCategory !== 'all' && l.category !== selectedCategory) return false;
      return true;
    });
  }, [letters, selectedCategory]);

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
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>Không Gian Thư Tay & Tâm Sự Học Đường</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Hộp Thư Yêu Thương
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nơi bạn có thể trút bỏ những gánh nặng tâm lý, gửi lời cảm ơn hay xin lỗi đến một ai đó, và đón nhận những lời hồi đáp dịu dàng từ cộng đồng LUMI.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenLetterModal}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Gửi một lời yêu thương ẩn danh / có tên</span>
            </button>
          </div>
        </div>

        {/* Safety & Moderation Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-rose-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-600 space-y-0.5">
              <strong className="text-slate-800 block">Quy trình kiểm duyệt an toàn 100%:</strong>
              <span>Toàn bộ thư gửi đều qua hệ thống kiểm duyệt bảo mật để tuyệt đối không để lộ email, số điện thoại hay thông tin nhạy cảm của học sinh.</span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold shrink-0">
            {approvedLetters.length} bức thư đã xuất bản
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất cả thư ({letters.filter(l => l.status === 'approved').length})
          </button>
          {categories.map((cat) => {
            const count = letters.filter(l => l.status === 'approved' && l.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Letters Masonry / Cards Grid */}
        {approvedLetters.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-rose-100 p-8 space-y-3">
            <Heart className="w-10 h-10 text-rose-300 mx-auto animate-pulse" />
            <p className="text-sm font-semibold text-slate-700">Chưa có bức thư nào trong chủ đề này</p>
            <p className="text-xs text-slate-400">Hãy là người đầu tiên gửi một lời nhắn ấm áp!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedLetters.map((letter) => (
              <div
                key={letter.id}
                className={`p-6 sm:p-7 rounded-3xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative ${getThemeClass(letter.colorTheme)}`}
              >
                {/* Top header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 shadow-2xs">
                    {letter.category}
                  </span>
                  <span className="text-xs opacity-70 font-mono">
                    {letter.createdAt}
                  </span>
                </div>

                {/* Letter text */}
                <div className="space-y-2 flex-1">
                  <p className="text-base sm:text-lg font-handwriting text-xl sm:text-2xl leading-relaxed">
                    “{letter.content}”
                  </p>
                </div>

                {/* Reply from LUMI block if exists */}
                {letter.replyFromLumi && (
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-black/5 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
                      <Sparkles className="w-3 h-3" />
                      <span>Hồi đáp từ LUMI:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">
                      {letter.replyFromLumi}
                    </p>
                  </div>
                )}

                {/* Sender footer */}
                <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-xs">
                      {letter.isAnonymous ? 'Bạn giấu tên' : letter.senderName}
                    </p>
                    {letter.targetPerson && (
                      <p className="text-[11px] opacity-75">{letter.targetPerson}</p>
                    )}
                  </div>

                  <button
                    onClick={() => onLikeLetter(letter.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white shadow-2xs hover:scale-105 transition-all cursor-pointer"
                    title="Thả tim cho bức thư"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-bold text-slate-700">{letter.likes}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
