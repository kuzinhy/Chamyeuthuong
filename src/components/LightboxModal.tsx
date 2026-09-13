import React from 'react';
import { X, Heart, Share2, Sparkles, Tag, Calendar, User } from 'lucide-react';
import { GalleryMediaItem } from '../types';

interface LightboxModalProps {
  item: GalleryMediaItem | null;
  onClose: () => void;
  onLikeItem?: (id: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onLikeItem
}) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Image View */}
        <div className="lg:w-2/3 bg-black flex items-center justify-center p-4 min-h-[300px] lg:min-h-[500px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Metadata Details Sidebar */}
        <div className="lg:w-1/3 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              {item.category}
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-rose-400" />
                <span>Tác giả: <strong className="text-white">{item.credit}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>Thời gian: <strong className="text-white">{item.date}</strong></span>
              </div>
              {item.source && (
                <div className="text-[11px] text-slate-500 pt-1">
                  Nguồn: {item.source}
                </div>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onLikeItem && onLikeItem(item.id)}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Yêu thích ({item.likes})</span>
            </button>

            <span className="text-xs text-slate-500 font-mono">
              LUMI Gallery HD
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
