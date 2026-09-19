import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Story, ActiveNavPage } from '../../types';
import { StoryCard } from '../StoryCard';

interface FeaturedStoriesSectionProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (page: ActiveNavPage) => void;
  onLikeStory: (id: string) => void;
}

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  stories = [],
  onSelectStory,
  onNavigate,
  onLikeStory
}) => {
  const safeStories = stories || [];
  const featured = safeStories.filter(s => s && s.featured).slice(0, 3);
  const displayStories = featured.length > 0 ? featured : safeStories.slice(0, 3);

  return (
    <section id="featured-stories-section" className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Gương Sáng & Hành Động Đẹp</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Câu Chuyện Tử Tế Nổi Bật
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-xl">
              Những câu chuyện có thật của học sinh và cộng đồng khắp ba miền, chứng minh lòng tốt luôn hiện diện ở quanh ta.
            </p>
          </div>

          <button
            onClick={() => onNavigate('stories')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] group cursor-pointer"
          >
            <span>Xem tất cả câu chuyện</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayStories.map(story => (
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
      </div>
    </section>
  );
};
