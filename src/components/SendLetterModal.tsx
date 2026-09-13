import React, { useState } from 'react';
import { X, Heart, Send, Sparkles, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LetterCategory } from '../types';

interface SendLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (letter: {
    senderName: string;
    isAnonymous: boolean;
    category: LetterCategory;
    content: string;
    targetPerson?: string;
    colorTheme?: 'rose' | 'amber' | 'sky' | 'emerald' | 'purple';
  }) => void;
}

export const SendLetterModal: React.FC<SendLetterModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<LetterCategory>('Cảm ơn');
  const [targetPerson, setTargetPerson] = useState('');
  const [content, setContent] = useState('');
  const [colorTheme, setColorTheme] = useState<'rose' | 'amber' | 'sky' | 'emerald' | 'purple'>('rose');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      senderName: isAnonymous || !senderName.trim() ? 'Bạn giấu tên' : senderName.trim(),
      isAnonymous,
      category,
      content: content.trim(),
      targetPerson: targetPerson.trim() || undefined,
      colorTheme
    });

    // Trigger confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContent('');
      setTargetPerson('');
      setSenderName('');
      onClose();
    }, 2500);
  };

  const categories: LetterCategory[] = [
    'Cảm ơn',
    'Xin lỗi',
    'Động viên',
    'Tâm sự',
    'Gửi một người đặc biệt',
    'Khác'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl border border-rose-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-rose-50 to-amber-50/50 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Gửi Một Lời Yêu Thương
              </h3>
              <p className="text-xs text-rose-600 font-medium">Hộp Thư LUMI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-2xl text-slate-900">
              Yêu Thương Đã Được Gửi Đi!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Cảm ơn bạn đã sẻ chia. Thông điệp của bạn đã được chuyển đến ban biên tập LUMI để kiểm duyệt bảo mật trước khi xuất bản lên bảng tin công khai.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Loại lời nhắn
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      category === cat
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Person */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gửi tới (Ví dụ: Bạn cùng bàn, Thầy cô, Một người đặc biệt...)
              </label>
              <input
                type="text"
                placeholder="Để trống nếu gửi chung đến tất cả mọi người"
                value={targetPerson}
                onChange={(e) => setTargetPerson(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-400 bg-slate-50/50"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nội dung lời nhắn <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Hãy viết ra những điều bạn muốn nói từ tận đáy lòng..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-handwriting text-xl focus:outline-none focus:border-rose-400 bg-rose-50/20 resize-none"
              ></textarea>
            </div>

            {/* Sender and Anonymous Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tên người gửi
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-rose-600">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400"
                  />
                  <span>Gửi ẩn danh</span>
                </label>
              </div>

              {!isAnonymous && (
                <input
                  type="text"
                  placeholder="Nhập tên hoặc biệt danh của bạn"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-400 bg-slate-50/50"
                />
              )}
            </div>

            {/* Moderation safety notice */}
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Bảo mật học đường:</strong> Toàn bộ thông điệp sẽ được ban biên tập duyệt cẩn trọng trước khi hiển thị công khai để đảm bảo không có thông tin cá nhân nhạy cảm hay nội dung tiêu cực.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!content.trim()}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Gửi yêu thương ngay</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
