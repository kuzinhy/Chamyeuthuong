import React from 'react';
import { MapPin, ArrowRight, Heart, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { Story, ActiveNavPage } from '../../types';

interface FeaturedStoriesSectionProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (page: ActiveNavPage) => void;
  onLikeStory: (id: string) => void;
}

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  stories,
  onSelectStory,
  onNavigate,
  onLikeStory
}) => {
  const featured = stories.filter(s => s.featured).slice(0, 3);
  const displayStories = featured.length > 0 ? featured : stories.slice(0, 3);

  return (
    <section id="featured-stories-section" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gương Sáng & Hành Động Đẹp</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
              Câu Chuyện Tử Tế Nổi Bật
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Những câu chuyện có thật của học sinh và cộng đồng khắp ba miền, chứng minh lòng tốt luôn hiện diện ở quanh ta.
            </p>
          </div>

          <button
            onClick={() => onNavigate('stories')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 group cursor-pointer"
          >
            <span>Xem tất cả câu chuyện</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayStories.map(story => (
            <article 
              key={story.id} 
              className="lumi-card lumi-card-hover rounded-3xl overflow-hidden flex flex-col group border border-rose-100/70 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/10 cursor-pointer"
              onClick={() => onSelectStory(story)}
            >
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Gradient vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Category & Region Pill */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-rose-700 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                    {story.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-medium text-white shadow-sm flex items-center gap-1 group-hover:bg-slate-900 transition-colors">
                    <MapPin className="w-3 h-3 text-rose-400 group-hover:animate-bounce" />
                    {story.province}
                  </span>
                </div>

                {/* Read time */}
                <div className="absolute bottom-3 right-4 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-[11px] text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{story.readTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 
                    className="font-display font-bold text-lg sm:text-xl text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2"
                  >
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                {/* Card Footer with source & actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-600 truncate max-w-[130px]">
                    Nguồn: {story.sourceName}
                  </span>

                  <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => onLikeStory(story.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer group/like active:scale-90"
                      title="Thả tim câu chuyện"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover/like:scale-125 transition-transform" />
                      <span className="font-semibold">{story.likes}</span>
                    </button>

                    <button
                      onClick={() => onSelectStory(story)}
                      className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer group/read"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/read:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
