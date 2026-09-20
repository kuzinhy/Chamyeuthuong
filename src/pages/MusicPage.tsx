import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Disc3, 
  Heart, 
  Share2, 
} from 'lucide-react';
import { storage } from '../services/storage';
import { SongInfo } from '../types';

export const MusicPage: React.FC = () => {
  const [featuredSong, setFeaturedSong] = useState<SongInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'lyrics' | 'behind' | 'credits'>('lyrics');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    storage.getMusic().then(songs => {
      const featured = songs.find(s => s.isFeatured) || songs[0];
      setFeaturedSong(featured || null);
      setLoading(false);
    });
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Đã sao chép link MV vào bộ nhớ tạm!');
  };

  if (loading || !featuredSong) return <div className="pt-28 text-center">Đang tải nội dung...</div>;

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Top Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Music className="w-3.5 h-3.5 text-rose-600" />
            <span>Âm Nhạc Truyền Cảm Hứng & Trị Liệu Cảm Xúc</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            MV “{featuredSong.title}”
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {featuredSong.message || "Ca khúc chủ đề đặc biệt của chiến dịch."}
          </p>
        </div>

        {/* Video / Music Showcase Container */}
        <div className="bg-slate-900 rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl border border-slate-800 text-white">
          
          {/* Main Embed / Player Box */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${featuredSong.youtubeId}?autoplay=1`}
                title={featuredSong.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center group cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={featuredSong.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}
                  alt={featuredSong.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                />
                
                {/* Center Play Icon */}
                <div className="absolute flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-9 h-9 fill-white translate-x-1" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-rose-200 uppercase bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                    Bấm để xem & nghe MV chính thức
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Music Controls & Information Bar */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <h2 className="font-display font-bold text-2xl text-white">
                  {featuredSong.title}
                </h2>
                <p className="text-sm text-rose-300 font-medium">
                  {featuredSong.artist} • Nhạc sĩ: {featuredSong.composer}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    liked ? 'bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white' : 'text-rose-400'}`} />
                  <span>{liked ? 'Đã yêu thích' : 'Yêu thích MV'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Sub Tabs: Lời bài hát, Behind the song, Credits */}
            <div className="space-y-6">
              <div className="flex gap-3 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('lyrics')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'lyrics'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Lời bài hát (Lyrics)
                </button>

                <button
                  onClick={() => setActiveTab('behind')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'behind'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Thông điệp & Hậu trường
                </button>

                <button
                  onClick={() => setActiveTab('credits')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'credits'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Đội ngũ sản xuất
                </button>
              </div>

              {/* Tab 1: Lyrics */}
              {activeTab === 'lyrics' && (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  <div className="text-center space-y-3 font-sans">
                    {featuredSong.lyrics && featuredSong.lyrics.map((line, idx) => (
                      <p
                        key={idx}
                        className={`text-sm sm:text-base transition-colors ${
                          line.emphasis
                            ? 'font-bold text-rose-400 text-base sm:text-lg py-1'
                            : 'text-slate-300'
                        }`}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Behind the song */}
              {activeTab === 'behind' && (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-5 text-sm text-slate-300 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-rose-400 text-base mb-2">
                      Ý nghĩa & Thông điệp bài hát
                    </h4>
                    <p>{featuredSong.message}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-400 text-base mb-2">
                      Câu chuyện hậu trường sáng tác
                    </h4>
                    <p>{featuredSong.behindTheScenes}</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Credits */}
              {activeTab === 'credits' && (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-500">Đơn vị sản xuất:</span>
                    <span className="font-semibold text-white">{featuredSong.credits?.production}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-500">Thể hiện:</span>
                    <span className="font-semibold text-white">{featuredSong.credits?.vocals}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-500">Lời bài hát & Kịch bản:</span>
                    <span className="font-semibold text-white">{featuredSong.credits?.lyricsBy}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-500">Thiết kế mỹ thuật:</span>
                    <span className="font-semibold text-white">{featuredSong.credits?.visualDesign}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Đồng hành nghiên cứu:</span>
                    <span className="font-semibold text-white">{featuredSong.credits?.specialThanks}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
