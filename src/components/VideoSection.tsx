import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Subtitle {
  time: number; // in seconds
  text: string;
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30); // 30 seconds mock trailer

  const subtitles: Subtitle[] = [
    { time: 0, text: "Trong dòng chảy nhộn nhịp của mạng xã hội..." },
    { time: 4, text: "Nơi hàng triệu hình ảnh lướt qua mỗi giây..." },
    { time: 8, text: "Có những vết xước thầm lặng chưa từng được chia sẻ." },
    { time: 13, text: "Nhưng chúng ta tin rằng, một hình ảnh có thể chạm tới một trái tim..." },
    { time: 19, text: "Và đánh thức lòng trắc ẩn từ sâu thẳm mỗi tâm hồn." },
    { time: 24, text: "Hãy cùng 'CHẠM' - biến sự thấu cảm thành hành động hôm nay." }
  ];

  // Simulate video playback time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const activeSubtitle = subtitles
    .slice()
    .reverse()
    .find((sub) => currentTime >= sub.time);

  return (
    <section id="video-section" className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden">
      {/* Abstract mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/40 to-[#020617] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            Phim Truyền Cảm Hứng Chủ Đề
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight mb-6">
            Xem Thước Phim 'Chạm'
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Sản phẩm phim can thiệp xã hội do dự án lên kịch bản, tác động trực tiếp đến tuyến cảm xúc của 300 học sinh thử nghiệm.
          </p>
        </div>

        {/* Video Player Shell */}
        <div className="relative aspect-16/9 w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
          
          {/* Simulated Video Frame (Aesthetic dark landscape with gentle panning blur) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
              alt="Video Poster Background"
              className={`w-full h-full object-cover transition-all duration-1000 brightness-40 ${
                isPlaying ? 'scale-105 saturate-120' : 'scale-100 saturate-50'
              }`}
              referrerPolicy="no-referrer"
            />
            
            {/* Pulsing neon red record indicator */}
            {isPlaying && (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[9px] font-mono text-white uppercase tracking-wider">LIVE STREAMING</span>
              </div>
            )}

            {/* Campaign project branding logo inside player */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20 font-mono text-[10px] text-cyan-400">
              <Film className="w-3.5 h-3.5" />
              <span>PROJECT: CHẠM</span>
            </div>

            {/* Glowing filter overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
          </div>

          {/* Center Play Button Overlay */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col justify-center items-center z-25 bg-black/40 backdrop-blur-sm"
              >
                <button
                  id="video-center-play-btn"
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 cursor-pointer transition-all border border-white/20 group"
                >
                  <Play className="w-8 h-8 fill-white translate-x-1 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-white font-sans text-sm font-medium mt-4 tracking-wider uppercase">Bấm để phát Trailer</p>
                <p className="text-gray-400 text-xs mt-1 font-light font-mono">Thời lượng: 30s • Phim thực nghiệm</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtitles Overlay */}
          <AnimatePresence>
            {isPlaying && activeSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key={activeSubtitle.text}
                className="absolute bottom-20 left-10 right-10 z-20 text-center"
              >
                <span className="inline-block px-6 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white font-sans text-sm sm:text-base tracking-wide max-w-2xl leading-relaxed shadow-lg">
                  {activeSubtitle.text}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Player Custom Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-black/80 border-t border-white/5 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play / Pause button */}
              <button
                id="video-play-toggle-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              {/* Volume Button */}
              <button
                id="video-volume-toggle-btn"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
              </button>

              {/* Timing Display */}
              <span className="text-xs font-mono text-gray-400">
                00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 00:{duration}
              </span>
            </div>

            {/* Slider bar */}
            <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden relative hidden sm:block">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* High-quality badge */}
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded uppercase tracking-widest">
                Full HD 1080p
              </span>
            </div>
          </div>

        </div>

        {/* Small descriptive block below video player */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-xs text-gray-500 font-mono leading-relaxed">
            *Phim ngắn can thiệp được dựng dựa trên câu chuyện có thật về bạo lực ngôn từ tại THPT. 
            Kết quả nghiên cứu định lượng chứng minh tần suất tiếp xúc phim nhân văn tương quan thuận với điểm hành động trắc ẩn (+42.3%).
          </p>
        </div>

      </div>
    </section>
  );
}
