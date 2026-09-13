import React from 'react';
import { X, MapPin, Clock, Heart, Share2, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { Story } from '../types';

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
  onLikeStory: (id: string) => void;
  onSelectStory: (story: Story) => void;
  allStories: Story[];
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onLikeStory,
  onSelectStory,
  allStories
}) => {
  if (!story) return null;

  const relatedStories = allStories
    .filter(s => s.id !== story.id && (s.category === story.category || s.region === story.region))
    .slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết câu chuyện vào bộ nhớ tạm!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl border border-rose-100 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Bar with Close button */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-700">
              {story.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              {story.province} ({story.region})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLikeStory(story.id)}
              className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Thả tim"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{story.likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Chia sẻ câu chuyện"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight">
              {story.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span className="font-medium">Ngày đăng: {story.publishedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readTime}
              </span>
              <span>•</span>
              <span className="text-rose-600 font-medium">Nguồn: {story.sourceName}</span>
            </div>
          </div>

          {/* Large Cover Hero Image */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 h-72 sm:h-96">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead paragraph */}
          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed italic border-l-4 border-rose-500 pl-4 bg-rose-50/40 py-3 rounded-r-2xl">
            {story.excerpt}
          </p>

          {/* Long-form Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-normal">
            {story.content}
          </div>

          {/* Featured Message Block: "Điều LUMI muốn gửi đến bạn" */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-warm-ivory to-amber-50 border border-rose-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-600 text-sm font-bold">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Điều LUMI Muốn Gửi Đến Bạn</span>
            </div>
            <p className="font-handwriting text-xl sm:text-2xl text-slate-800 leading-relaxed">
              “{story.message}”
            </p>
          </div>

          {/* Official Source Reference Block */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-800">Nguồn tư liệu báo chí: </span>
              <span>{story.sourceName}</span>
            </div>
            {story.sourceUrl && (
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 font-semibold hover:underline flex items-center gap-1 inline-flex"
              >
                <span>Xem bài viết gốc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Câu Chuyện Tử Tế Liên Quan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedStories.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectStory(rel)}
                    className="p-4 rounded-2xl border border-rose-100 hover:border-rose-300 bg-white hover:bg-rose-50/30 transition-all cursor-pointer flex gap-4 items-center group"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-rose-600">{rel.category}</span>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
