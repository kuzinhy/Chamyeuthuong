import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Search, 
  Heart, 
  Layers, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { Story, RegionType, StoryCategory } from '../types';
import { StoryCard } from '../components/StoryCard';

interface StoriesPageProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onLikeStory: (id: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  stories = [],
  onSelectStory,
  onLikeStory
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const safeStories = stories || [];

  // Extract all unique provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(safeStories.map(s => s?.province))).filter(Boolean).sort();
  }, [safeStories]);

  const categories: StoryCategory[] = [
    'Trung thực',
    'Giúp đỡ cộng đồng',
    'Tình bạn',
    'Gia đình',
    'Học đường',
    'Chia sẻ',
    'Nghị lực',
    'Lòng biết ơn'
  ];

  // Filtered stories
  const filteredStories = useMemo(() => {
    return safeStories.filter(story => {
      if (!story) return false;
      if (selectedRegion !== 'all' && story.region !== selectedRegion) return false;
      if (selectedCategory !== 'all' && story.category !== selectedCategory) return false;
      if (selectedProvince !== 'all' && story.province !== selectedProvince) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (story.title || '').toLowerCase().includes(q);
        const matchExcerpt = (story.excerpt || '').toLowerCase().includes(q);
        const matchProvince = (story.province || '').toLowerCase().includes(q);
        const matchTag = (story.tags || []).some(t => t && t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchProvince && !matchTag) return false;
      }
      return true;
    });
  }, [safeStories, selectedRegion, selectedCategory, selectedProvince, searchQuery]);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho Tàng Câu Chuyện Tử Tế</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Những Bước Chân Yêu Thương
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Tuyển tập những câu chuyện người thật việc thật về sự trung thực, tình bạn và lòng trắc ẩn của học sinh khắp mọi miền Tổ quốc.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          
          {/* Search bar & Province select */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tiêu đề câu chuyện, tấm gương tử tế, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] bg-[#F8FAFC]"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl border border-[#E2E8F0] text-sm text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="all">📍 Tất cả tỉnh thành ({provinces.length})</option>
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#E2E8F0]">
            <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
              Vùng miền:
            </span>
            {[
              { id: 'all', label: 'Toàn quốc' },
              { id: 'north', label: 'Miền Bắc' },
              { id: 'central', label: 'Miền Trung' },
              { id: 'south', label: 'Miền Nam' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedRegion === r.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#EFF6FF] hover:text-[#2563EB]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
              Chủ đề:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-slate-200'
              }`}
            >
              Tất cả chủ đề
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#EFF6FF] hover:text-[#2563EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Stories Counter */}
        <div className="flex items-center justify-between text-xs text-[#64748B] font-medium px-2">
          <span>Hiển thị <strong>{filteredStories.length}</strong> câu chuyện tử tế</span>
          {(selectedRegion !== 'all' || selectedCategory !== 'all' || selectedProvince !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSelectedProvince('all');
                setSearchQuery('');
              }}
              className="text-[#2563EB] hover:underline font-semibold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E2E8F0] p-8 space-y-3 shadow-xs">
            <Heart className="w-12 h-12 text-[#BFDBFE] mx-auto" />
            <h3 className="font-bold text-lg text-[#0F172A]">
              Không tìm thấy câu chuyện nào phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Hãy thử chọn lại vùng miền hoặc đặt lại từ khóa tìm kiếm để khám phá thêm nhiều câu chuyện ấm áp khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                onSelect={onSelectStory}
                onLike={(id, e) => {
                  e.stopPropagation();
                  onLikeStory(id);
                }}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
