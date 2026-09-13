import React, { useState, useMemo } from 'react';
import { Image, Filter, Eye, Heart, Sparkles, Tag, Layers } from 'lucide-react';
import { GalleryMediaItem, GalleryCategory } from '../types';

interface GalleryPageProps {
  galleryItems: GalleryMediaItem[];
  onOpenLightbox: (item: GalleryMediaItem) => void;
  onLikeItem: (id: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  galleryItems,
  onOpenLightbox,
  onLikeItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: GalleryCategory[] = [
    'Hình ảnh câu chuyện',
    'Truyện tranh',
    'Sản phẩm truyền thông',
    'Hình ảnh hoạt động'
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Image className="w-3.5 h-3.5 text-rose-600" />
            <span>Thư Viện Trực Quan Đa Phương Tiện</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Góc Hình Ảnh & Truyền Thông Thị Giác
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nơi trưng bày các tác phẩm đồ họa, poster can thiệp tâm lý, truyện tranh và hình ảnh hoạt động thực nghiệm thuộc dự án khoa học hành vi LUMI.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất cả tác phẩm ({galleryItems.length})
          </button>
          {categories.map((cat) => {
            const count = galleryItems.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="lumi-card lumi-card-hover rounded-3xl overflow-hidden border border-rose-100/80 group flex flex-col justify-between bg-white"
            >
              {/* Image Box */}
              <div 
                onClick={() => onOpenLightbox(item)}
                className="relative h-64 sm:h-72 overflow-hidden bg-slate-100 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-rose-700 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay with eye zoom */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-6 space-y-3">
                <h3 
                  onClick={() => onOpenLightbox(item)}
                  className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1 cursor-pointer"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-600">
                    {item.credit}
                  </span>

                  <button
                    onClick={() => onLikeItem(item.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
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
