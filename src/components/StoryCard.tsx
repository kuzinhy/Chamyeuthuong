import React from 'react';
import { MapPin, Heart, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onSelect: (story: Story) => void;
  onLike?: (id: string, e: React.MouseEvent) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelect,
  onLike
}) => {
  return (
    <article
      onClick={() => onSelect(story)}
      className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#BFDBFE] hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* 16:9 Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] text-xs font-semibold shadow-xs">
            {story.category}
          </span>
        </div>

        {/* Province Pill */}
        {story.province && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#0F172A] border border-[#E2E8F0] text-xs font-medium shadow-xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#2563EB]" />
              {story.province}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Title: 18-20px, font-weight 700, #0F172A, hover #2563EB */}
          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
            {story.title}
          </h3>

          {/* Excerpt: 14px, #475569, line-clamp-2 */}
          <p className="text-sm text-[#475569] line-clamp-2 leading-relaxed">
            {story.excerpt}
          </p>
        </div>

        {/* Meta info & Footer */}
        <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
            <span>{story.publishedAt || 'Vừa đăng'}</span>
          </div>

          {/* Likes & Views */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onLike) onLike(story.id, e);
              }}
              className="flex items-center gap-1 text-[#475569] hover:text-[#DC2626] transition-colors group/like"
              title="Thả tim lan tỏa"
            >
              <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]/20 group-hover/like:fill-[#DC2626]" />
              <span className="font-medium">{story.likes || 0}</span>
            </button>

            <div className="flex items-center gap-1 text-[#64748B]" title="Lượt xem">
              <Eye className="w-3.5 h-3.5" />
              <span>{story.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
