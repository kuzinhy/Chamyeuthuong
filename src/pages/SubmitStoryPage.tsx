import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  MapPin, 
  Link2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Image as ImageIcon,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { vietnameseProvinces } from '../data/provincesData';
import { LumiMascot } from '../components/LumiMascot';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { StorySubmission, ActiveNavPage } from '../types';

interface SubmitStoryPageProps {
  onSubmitSubmission: (submission: Omit<StorySubmission, 'id' | 'submittedAt' | 'status'>) => void;
  onNavigate: (page: ActiveNavPage) => void;
}

export const SubmitStoryPage: React.FC<SubmitStoryPageProps> = ({
  onSubmitSubmission,
  onNavigate,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [authorName, setAuthorName] = useState(user?.displayName || '');
  const [title, setTitle] = useState('');
  const [province, setProvince] = useState(user?.province || 'Hà Nội');
  const [content, setContent] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Vui lòng điền tiêu đề và nội dung câu chuyện', { type: 'warning' });
      return;
    }
    if (!agreedTerms) {
      showToast('Vui lòng đồng ý để Ban biên tập LUMI kiểm duyệt bài viết', { type: 'warning' });
      return;
    }

    onSubmitSubmission({
      userId: user?.id,
      authorName: authorName.trim() || 'Học sinh ẩn danh',
      title: title.trim(),
      content: content.trim(),
      province,
      sourceName: sourceName.trim() || 'Học sinh tự kể',
      sourceUrl: sourceUrl.trim() || undefined,
      message: message.trim() || 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'
    });

    setIsSubmitted(true);
    showToast('Gửi câu chuyện thành công!', { 
      description: 'LUMI đã nhận được bài viết và sẽ phản hồi sớm nhất!',
      type: 'heart' 
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-sky-100 flex flex-col items-center">
          <LumiMascot size="lg" state="thanks" message="LUMI cảm ơn bạn rất nhiều!" />
          <h2 className="text-2xl font-bold text-slate-800 mt-6">Câu Chuyện Của Bạn Đã Được Gửi!</h2>
          <p className="text-slate-600 text-sm mt-3 max-w-md leading-relaxed">
            Ban Biên Tập LUMI sẽ đọc và kiểm duyệt nội dung cẩn thận trước khi xuất bản lên Bản tin câu chuyện tử tế toàn quốc nhé.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle('');
                setContent('');
                setMessage('');
              }}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all cursor-pointer"
            >
              Gửi Thêm Câu Chuyện Khác
            </button>

            <button
              onClick={() => onNavigate('stories')}
              className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              Khám Phá Câu Chuyện Tử Tế
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('stories')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách câu chuyện</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            Kể LUMI Nghe
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Lan Tỏa Câu Chuyện Tử Tế Quanh Bạn
          </h1>
          <p className="text-sky-100 text-sm mt-2 leading-relaxed">
            Bạn vừa chứng kiến một hành động đẹp ở trường học, một nghĩa cử nhân ái ở khu phố hay một tấm gương dũng cảm? Hãy chia sẻ cùng cộng đồng học sinh toàn quốc!
          </p>
        </div>

        <div className="absolute -right-4 -bottom-6 opacity-90 hidden sm:block">
          <LumiMascot size="lg" state="reading" interactive={false} />
        </div>
      </div>

      {/* Main Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Họ và Tên Người Gửi (hoặc Bút danh)
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nguyễn Văn A (hoặc Ẩn danh)"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Tỉnh / Thành Phố Diễn Ra Sự Việc *</span>
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white"
              >
                {vietnameseProvinces.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.region === 'Bắc' ? 'Miền Bắc' : p.region === 'Trung' ? 'Miền Trung' : 'Miền Nam'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tiêu Đề Câu Chuyện *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Hai bạn học sinh nhặt được túi xách trả lại người đi đường..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Nội Dung Chi Tiết Sự Việc *
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Kể chi tiết: Chuyện xảy ra ở đâu, khi nào, các nhân vật đã hành động ra sao, cảm xúc của mọi người..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Thông Điệp / Bài Học Bạn Muốn Gửi Gắm</span>
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="VD: Sự tử tế bắt đầu từ những hành động nhỏ nhất mỗi ngày..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Link Ảnh Minh Họa (nếu có)</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Nguồn Tin Tức Báo Chí (nếu có)</span>
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="VD: Báo Dân Trí / Báo Tuổi Trẻ / Fanpage trường"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Privacy & Moderation Agreement */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
            <input
              type="checkbox"
              id="agreement"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
            />
            <label htmlFor="agreement" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
              <strong>Tôi xác nhận thông tin trên là trung thực</strong> và đồng ý gửi để Ban Biên Tập LUMI kiểm duyệt, hiệu đính và xuất bản lan tỏa đến cộng đồng học sinh THPT trên toàn quốc.
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Câu Chuyện Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
