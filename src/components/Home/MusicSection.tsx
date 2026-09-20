import React, { useState, useEffect } from 'react';
import { Music, Play, Disc3, ArrowRight, Star } from 'lucide-react';
import { storage } from '../../services/storage';
import { SongInfo, ActiveNavPage } from '../../types';

interface MusicSectionProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({ onNavigate }) => {
  const [featuredSong, setFeaturedSong] = useState<SongInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage.getMusic().then(songs => {
      // Tìm bài hát được gắn cờ isFeatured, nếu không có thì lấy bài đầu tiên
      const featured = songs.find(s => s.isFeatured) || songs[0];
      setFeaturedSong(featured || null);
      setLoading(false);
    });
  }, []);

  if (loading || !featuredSong) return null;

  return (
    <section id="music-section" className="py-20 sm:py-28 bg-white border-t border-rose-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 rounded-3xl sm:rounded-[36px] p-6 sm:p-12 text-white shadow-2xl overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Cover Art & Player Disc */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group hover:border-rose-400/80 transition-all duration-500 hover:shadow-rose-500/20 hover:scale-102 cursor-pointer"
                onClick={() => onNavigate('music')}
              >
                <img
                  src={featuredSong.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}
                  alt={featuredSong.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Disc Icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex items-center justify-center shadow-xl shadow-rose-500/50 mb-3 group-hover:scale-115 group-hover:shadow-rose-500/80 transition-all duration-300 cursor-pointer">
                    <Play className="w-7 h-7 fill-white translate-x-0.5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs font-semibold text-rose-200 tracking-wider uppercase group-hover:text-white transition-colors">
                    MV Chủ Đề
                  </span>
                  <p className="text-base font-bold text-white mt-1 group-hover:scale-105 transition-transform">
                    {featuredSong.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Information & Lyrics Preview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/30 transition-colors cursor-default">
                <Music className="w-3.5 h-3.5 animate-bounce" />
                <span>Góc Âm Nhạc & MV Trị Liệu Cảm Xúc</span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  MV “{featuredSong.title}”
                </h3>
                <p className="text-sm text-rose-200 mt-1 font-medium">
                  {featuredSong.artist} • Nhạc sĩ: {featuredSong.composer}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {featuredSong.message || featuredSong.description}
              </p>

              {/* CTA button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="home-open-music-btn"
                  onClick={() => onNavigate('music')}
                  className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 hover:-translate-y-1 lumi-btn-shine transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 group"
                >
                  <Disc3 className="w-4 h-4 animate-spin group-hover:scale-115 transition-transform" style={{ animationDuration: '6s' }} />
                  <span>Nghe câu chuyện bằng âm nhạc & Xem lời bài hát</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
