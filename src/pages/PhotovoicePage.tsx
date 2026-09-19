import React, { useState } from 'react';
import { Camera, Heart, Plus, Sparkles, Send, ShieldCheck, Check, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotovoiceItem } from '../types';

interface PhotovoicePageProps {
  photovoiceItems: PhotovoiceItem[];
  onSubmitPhotovoice: (item: {
    title: string;
    studentName: string;
    grade: string;
    imageUrl: string;
    story: string;
    reflectionPrompt: string;
    theme: string;
  }) => void;
  onLikeItem: (id: string) => void;
}

export const PhotovoicePage: React.FC<PhotovoicePageProps> = ({
  photovoiceItems = [],
  onSubmitPhotovoice,
  onLikeItem
}) => {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('11A2');
  const [imageUrl, setImageUrl] = useState('');
  const [story, setStory] = useState('');
  const [theme, setTheme] = useState('Góc nhìn trắc ẩn');
  const [submitted, setSubmitted] = useState(false);

  const approvedItems = (photovoiceItems || []).filter(p => p && p.status === 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !story.trim()) return;

    onSubmitPhotovoice({
      title: title.trim(),
      studentName: studentName.trim() || 'Học sinh giấu tên',
      grade,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      story: story.trim(),
      reflectionPrompt: 'Lắng nghe những điều bình dị',
      theme
    });

    confetti({ particleCount: 70, spread: 50 });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitOpen(false);
      setTitle('');
      setStory('');
      setImageUrl('');
    }, 2000);
  };

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span>Phương Pháp Nghiên Cứu Hình Ảnh Tham Gia (Photovoice)</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Góc Nhìn Học Sinh (Photovoice)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Học sinh THPT dùng ống kính máy ảnh ghi lại những khoảnh khắc đời thường và chia sẻ cảm xúc, tiếng nói nội tâm về lòng thấu cảm học đường.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Đóng góp tác phẩm Photovoice của bạn</span>
            </button>
          </div>
        </div>

        {/* Modal Submit Photovoice */}
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <Check className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="font-display font-bold text-xl text-slate-900">Đã gửi bài dự thi Photovoice!</h3>
                  <p className="text-xs text-slate-500">Bài viết sẽ được ban biên tập kiểm duyệt và xuất bản sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-display font-bold text-lg text-slate-900">Chia Sẻ Ảnh & Câu Chuyện Của Bạn</h3>
                    <button type="button" onClick={() => setIsSubmitOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-semibold">Đóng</button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên tác phẩm *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nụ cười sau giờ tan trường"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ tên học sinh</label>
                      <input
                        type="text"
                        placeholder="Để trống nếu ẩn danh"
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lớp / Trường</label>
                      <input
                        type="text"
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Đường dẫn ảnh (URL hoặc chọn mẫu)</label>
                    <input
                      type="text"
                      placeholder="https://... (hoặc để trống để dùng ảnh mẫu)"
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Câu chuyện phía sau bức ảnh *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Khoảnh khắc này diễn ra khi nào? Bạn cảm thấy điều gì và bài học về sự sẻ chia ở đây là gì?"
                      value={story}
                      onChange={e => setStory(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md"
                  >
                    Gửi tác phẩm Photovoice
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Photovoice Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedItems.map(item => (
            <div
              key={item.id}
              className="lumi-card rounded-3xl overflow-hidden border border-rose-100/80 bg-white flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold text-rose-700 shadow-2xs">
                    {item.theme}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    “{item.story}”
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Tác giả: <strong className="text-slate-700">{item.studentName}</strong> ({item.grade})</span>
                  <button
                    onClick={() => onLikeItem(item.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
