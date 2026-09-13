import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Search, 
  Filter, 
  Heart, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Layers,
  Compass
} from 'lucide-react';
import { Story, RegionType, StoryCategory } from '../types';

interface StoriesPageProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onLikeStory: (id: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  stories,
  onSelectStory,
  onLikeStory
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(stories.map(s => s.province))).sort();
  }, [stories]);

  const categories: StoryCategory[] = [
    'Tình bạn',
    'Gia đình',
    'Học đường',
    'Chia sẻ',
    'Giúp đỡ cộng đồng',
    'Nghị lực',
    'Lòng biết ơn'
  ];

  // Filtered stories
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      if (selectedRegion !== 'all' && story.region !== selectedRegion) return false;
      if (selectedCategory !== 'all' && story.category !== selectedCategory) return false;
      if (selectedProvince !== 'all' && story.province !== selectedProvince) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = story.title.toLowerCase().includes(q);
        const matchExcerpt = story.excerpt.toLowerCase().includes(q);
        const matchProvince = story.province.toLowerCase().includes(q);
        const matchTag = story.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchProvince && !matchTag) return false;
      }
      return true;
    });
  }, [stories, selectedRegion, selectedCategory, selectedProvince, searchQuery]);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Kho Tàng Câu Chuyện Tử Tế</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Những Bước Chân Yêu Thương
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tuyển tập những câu chuyện người thật việc thật về tình bạn, lòng bao dung và sự sẻ chia của học sinh và người trẻ trên khắp mọi miền Tổ quốc.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-3xl bg-white border border-rose-100/80 shadow-xs space-y-5">
          
          {/* Search bar & Province select */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tiêu đề câu chuyện, từ khóa, người hùng thầm lặng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-rose-400 bg-slate-50/50"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-rose-400 bg-slate-50/50 text-slate-700 cursor-pointer"
              >
                <option value="all">Tất cả Tỉnh/Thành</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Region Tabs (Bắc - Trung - Nam) */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-rose-500" />
              Vùng miền:
            </span>
            {[
              { id: 'all', label: 'Tất cả vùng miền' },
              { id: 'Bắc', label: 'Miền Bắc' },
              { id: 'Trung', label: 'Miền Trung' },
              { id: 'Nam', label: 'Miền Nam' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegion === r.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              Chủ đề:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả chủ đề
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Stories Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2">
          <span>Hiển thị <strong>{filteredStories.length}</strong> câu chuyện tử tế</span>
          {(selectedRegion !== 'all' || selectedCategory !== 'all' || selectedProvince !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSelectedProvince('all');
                setSearchQuery('');
              }}
              className="text-rose-600 hover:underline font-semibold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-rose-100 p-8 space-y-3">
            <Heart className="w-12 h-12 text-rose-300 mx-auto animate-pulse" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              Không tìm thấy câu chuyện nào phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Hãy thử chọn lại vùng miền hoặc đặt lại từ khóa tìm kiếm để khám phá thêm nhiều câu chuyện ấm áp khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map(story => (
              <article 
                key={story.id} 
                className="lumi-card lumi-card-hover rounded-3xl overflow-hidden flex flex-col group border border-rose-100/70"
              >
                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category & Region Pill */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-rose-700 shadow-sm">
                      {story.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-medium text-white shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {story.province}
                    </span>
                  </div>

                  {/* Read time */}
                  <div className="absolute bottom-3 right-4 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[11px] text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{story.readTime}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 
                      onClick={() => onSelectStory(story)}
                      className="font-display font-bold text-lg sm:text-xl text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {story.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-600 truncate max-w-[130px]" title={story.sourceName}>
                      {story.sourceName}
                    </span>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onLikeStory(story.id)}
                        className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Thả tim"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span>{story.likes}</span>
                      </button>

                      <button
                        onClick={() => onSelectStory(story)}
                        className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Đọc câu chuyện</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
