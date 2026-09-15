import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, BookOpen, Tag, ArrowRight, Heart } from 'lucide-react';
import { Story, ActiveNavPage } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (page: ActiveNavPage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return (stories || []).filter(s => {
      if (!s) return false;
      const title = (s.title || '').toLowerCase();
      const province = (s.province || '').toLowerCase();
      const category = (s.category || '').toLowerCase();
      const excerpt = (s.excerpt || '').toLowerCase();
      const matchTags = Array.isArray(s.tags) && s.tags.some(t => typeof t === 'string' && t.toLowerCase().includes(q));

      return title.includes(q) ||
        province.includes(q) ||
        category.includes(q) ||
        excerpt.includes(q) ||
        matchTags;
    });
  }, [query, stories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center gap-3 bg-rose-50/40">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm câu chuyện, tỉnh thành (Hà Nội, Đà Nẵng, TP.HCM...), chủ đề..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Search Suggestions or Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {!query ? (
            <div className="py-8 text-center space-y-3">
              <Heart className="w-8 h-8 text-rose-300 mx-auto animate-pulse" />
              <p className="text-xs text-slate-500">
                Gợi ý từ khóa: <span className="font-semibold text-rose-600 cursor-pointer" onClick={() => setQuery('Tình bạn')}>Tình bạn</span>,{' '}
                <span className="font-semibold text-rose-600 cursor-pointer" onClick={() => setQuery('Hà Nội')}>Hà Nội</span>,{' '}
                <span className="font-semibold text-rose-600 cursor-pointer" onClick={() => setQuery('Chia sẻ')}>Chia sẻ</span>,{' '}
                <span className="font-semibold text-rose-600 cursor-pointer" onClick={() => setQuery('Nghị lực')}>Nghị lực</span>
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-medium text-slate-700">Không tìm thấy câu chuyện phù hợp với "{query}"</p>
              <p className="text-xs text-slate-400">Hãy thử tìm theo tên tỉnh thành hoặc từ khóa chung như "Học đường", "Tình bạn".</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Tìm thấy {filteredResults.length} câu chuyện
              </div>
              {filteredResults.map(story => (
                <div
                  key={story.id}
                  onClick={() => {
                    onSelectStory(story);
                    onClose();
                  }}
                  className="p-3 sm:p-4 rounded-2xl border border-slate-100 hover:border-rose-200 bg-white hover:bg-rose-50/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {story.category}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {story.province} ({story.region})
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-1">
                      {story.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {story.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
          <span>LUMI Search Engine</span>
          <button
            onClick={() => {
              onNavigate('stories');
              onClose();
            }}
            className="text-rose-600 font-semibold hover:underline"
          >
            Xem tất cả câu chuyện →
          </button>
        </div>
      </div>
    </div>
  );
};
