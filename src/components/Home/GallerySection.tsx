import React from 'react';
import { Image, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { GalleryMediaItem, ActiveNavPage } from '../../types';

interface GallerySectionProps {
  galleryItems: GalleryMediaItem[];
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLightbox: (item: GalleryMediaItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryItems,
  onNavigate,
  onOpenLightbox
}) => {
  const displayItems = galleryItems.slice(0, 4);

  return (
    <section id="gallery-home-section" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
              <Image className="w-3.5 h-3.5" />
              <span>Ngôn Ngữ Thị Giác & Trải Nghiệm</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
              Thư Viện Hình Ảnh & Poster Can Thiệp
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Bộ sưu tập poster truyền thông, truyện tranh kỹ thuật số và hình ảnh hoạt động thực nghiệm tâm lý học đường.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
          >
            <span>Xem toàn bộ thư viện</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Masonry / Grid preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs hover:shadow-2xl hover:shadow-rose-500/15 hover:-translate-y-2 hover:border-rose-300 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-white space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white inline-block shadow-sm">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Tác giả: {item.credit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-slate-100 group-hover:bg-rose-50/30 transition-colors">
                <span className="text-[11px] font-semibold text-rose-600 block mb-1">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
