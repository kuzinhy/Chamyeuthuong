import { useState } from 'react';
import { 
  BookOpen, Eye, HelpCircle, Image, Info, Music, 
  Play, Users, X, ArrowUpRight, Sparkles, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SolutionCard } from '../types';

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionCard | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const solutions: SolutionCard[] = [
    {
      id: "poster",
      title: "Poster Truyền Cảm Hứng",
      subtitle: "Ngôn ngữ thị giác cô đọng",
      icon: "Image",
      color: "from-cyan-500 to-blue-500",
      description: "Thiết kế đồ họa cao cấp kết hợp thông điệp nhân văn sâu sắc đánh thẳng vào thị giác học sinh trong khuôn viên trường học.",
      visualContent: {
        type: "image",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
        caption: "Bộ Poster 'Nhìn Bằng Trái Tim' triển khai tại các sảnh lớp THPT",
        details: [
          "Sử dụng kỹ thuật tương phản màu sắc cao thu hút ánh nhìn lập tức.",
          "Kết hợp Typography khổ lớn với các thông điệp: 'Hãy là người dang tay, đừng là người quay lưng'.",
          "Tác động kích hoạt cảm nhận tức thời trong 3 giây tiếp xúc đầu tiên."
        ]
      }
    },
    {
      id: "video",
      title: "Video Ngắn Kịch Tính",
      subtitle: "Nhập vai & Đồng cảm",
      icon: "Play",
      color: "from-blue-500 to-indigo-500",
      description: "Thước phim kịch tính ngắn (1-3 phút) tập trung phản ánh bạo lực học đường tinh vi và sức mạnh cứu chuộc từ sự tử tế.",
      visualContent: {
        type: "video",
        url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
        caption: "Phim ngắn can thiệp xã hội 'Khoảng Lặng Sau Tiếng Cười'",
        details: [
          "Sử dụng góc quay thứ nhất giúp người xem trải nghiệm cảm giác bị cô lập.",
          "Chạm sâu vào hệ thống thần kinh phản chiếu (Mirror Neurons) của học sinh.",
          "Đo lường mức tăng đột biến của điểm số thấu cảm sau khi xem."
        ]
      }
    },
    {
      id: "infographic",
      title: "Infographic Khoa Học",
      subtitle: "Tri thức dẫn lối hành vi",
      icon: "Info",
      color: "from-indigo-500 to-purple-500",
      description: "Chuyển hóa số liệu nghiên cứu tâm lý học khô khan thành biểu đồ màu sắc, thu hút tư duy phân tích của học sinh.",
      visualContent: {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        caption: "Bản đồ hóa dữ liệu 'Tâm lý học đám đông & Hiệu ứng người ngoài cuộc'",
        details: [
          "Bố cục thông tin rõ ràng, phân cấp thị giác tinh tế.",
          "Giúp học sinh dễ dàng nắm bắt kiến thức: 'Tại sao chúng ta thường bàng quan khi có nhiều người xung quanh?'.",
          "Kích thích nhận thức lý trí về mặt trách nhiệm đạo đức cá nhân."
        ]
      }
    },
    {
      id: "photovoice",
      title: "Dự án Photovoice",
      subtitle: "Góc nhìn từ bên trong",
      icon: "Users",
      color: "from-purple-500 to-pink-500",
      description: "Để chính học sinh THPT tự chụp lại những khoảnh khắc về lòng trắc ẩn và sự vô cảm dưới ống kính góc nhìn của riêng mình.",
      visualContent: {
        type: "exhibition",
        url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
        caption: "Hành trình Photovoice 'Ống kính yêu thương' của 300 học sinh THPT Nguyễn Du",
        details: [
          "Hình ảnh thực tế không dàn dựng mang tính chân thực tuyệt đối.",
          "Tự sự kèm theo mỗi bức ảnh giúp người xem nghe thấy tiếng lòng nhân vật.",
          "Thúc đẩy quá trình tự vấn lương tâm đạo đức của các em."
        ]
      }
    },
    {
      id: "comic",
      title: "Truyện Tranh Số",
      subtitle: "Lựa chọn tình huống",
      icon: "BookOpen",
      color: "from-pink-500 to-red-500",
      description: "Truyện tranh kỹ thuật số với nhiều phân nhánh cốt truyện, cho phép học sinh tự đưa ra lựa chọn giải quyết bạo lực học đường.",
      visualContent: {
        type: "interactive",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        caption: "Truyện tranh tương tác thông minh 'Lựa chọn của Nam'",
        details: [
          "Mỗi lựa chọn dẫn đến một kết cục khác nhau (bàng quan vs cứu giúp).",
          "Lồng ghép phản hồi tâm lý học giải thích hệ quả của từng quyết định.",
          "Dễ dàng chia sẻ trên các nền tảng mạng xã hội học sinh hay dùng."
        ]
      }
    },
    {
      id: "music",
      title: "Âm Nhạc Truyền Cảm",
      subtitle: "Rung động tần số thấu cảm",
      icon: "Music",
      color: "from-red-500 to-cyan-500",
      description: "Sản phẩm âm nhạc lofi, acoustic êm dịu mang thông điệp thấu cảm sâu lắng, len lỏi vào danh sách nghe hàng ngày.",
      visualContent: {
        type: "audio",
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        caption: "Ca khúc chủ đề 'Để Lòng Mình Chạm Nhau' - Acoustic Version",
        details: [
          "Giai điệu thư giãn giảm căng thẳng, tăng trạng thái đón nhận cảm xúc.",
          "Lời nhạc dựa trên nhật ký chia sẻ ẩn danh của chính các bạn học sinh.",
          "Tiếp cận thính giác hỗ trợ khơi dậy thấu cảm tinh tế."
        ]
      }
    },
    {
      id: "exhibition",
      title: "Triển Lãm Ảo 3D",
      subtitle: "Không gian trải nghiệm nhập vai",
      icon: "Eye",
      color: "from-cyan-500 to-purple-500",
      description: "Thiết kế phòng triển lãm ảo trực tuyến chứa tất cả các sản phẩm truyền thông để học sinh tham quan từ xa.",
      visualContent: {
        type: "exhibition",
        url: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
        caption: "Phòng triển lãm VR 360 'Trạm Chạm - Kết nối thấu cảm'",
        details: [
          "Duyệt ngắm các tác phẩm tranh, ảnh bento grid trong phòng 3D.",
          "Cho phép để lại bình luận ẩn danh và gửi lời nhắn tử tế.",
          "Tạo môi trường an toàn và riêng tư tối đa cho biểu đạt cảm xúc."
        ]
      }
    }
  ];

  const renderIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case "Image": return <Image className={className} />;
      case "Play": return <Play className={className} />;
      case "Info": return <Info className={className} />;
      case "Users": return <Users className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      case "Music": return <Music className={className} />;
      case "Eye": return <Eye className={className} />;
      default: return <HelpCircle className={className} />;
    }
  };

  return (
    <section id="solutions-section" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#f0f9ff] to-white overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-100/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-sky-50 border border-sky-100 shadow-sm">
            Hệ Thống Giải Pháp Can Thiệp
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Bộ Công Cụ Truyền Thông Đa Chiều
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            Sự kết hợp tinh tế giữa thiết kế, nghệ thuật và công nghệ kịch bản tương tác để đánh thức lòng trắc ẩn từ nhiều hướng tiếp cận.
          </p>
        </div>

        {/* 3D Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <motion.div
              id={`solution-card-${sol.id}`}
              key={sol.id}
              onClick={() => {
                setSelectedSolution(sol);
                setMusicPlaying(false);
              }}
              whileHover={{ 
                y: -10, 
                rotateX: 2, 
                rotateY: -2,
                transition: { duration: 0.3 }
              }}
              className="relative group rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(14,165,233,0.03)] hover:shadow-[0_15px_45px_rgba(14,165,233,0.07)] hover:border-sky-200 p-8 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-80 backdrop-blur-md"
            >
              {/* Card top gradient lighting effect */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${sol.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Glowing icon circle */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.color} opacity-90 flex items-center justify-center text-white border border-white/10 shadow-sm`}>
                    {renderIcon(sol.icon, "w-6 h-6")}
                  </div>
                  <div className="p-1 rounded-full bg-slate-50 text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  {sol.subtitle}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans group-hover:text-sky-600 transition-colors">
                  {sol.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light line-clamp-3">
                  {sol.description}
                </p>
              </div>

              <div className="text-[11px] font-mono text-sky-600 tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá ngay</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Showcase Popup Modal */}
        <AnimatePresence>
          {selectedSolution && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  id="solution-modal-close"
                  onClick={() => {
                    setSelectedSolution(null);
                    setMusicPlaying(false);
                  }}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Mock Visual Content Area */}
                <div className="w-full md:w-1/2 relative bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex items-center justify-center overflow-hidden min-h-[250px] sm:min-h-[350px]">
                  {/* Glowing background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedSolution.color} opacity-10`} />
                  
                  {/* Image Type rendering */}
                  {selectedSolution.visualContent.type === "image" && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center p-6">
                      <img 
                        src={selectedSolution.visualContent.url} 
                        alt={selectedSolution.title}
                        className="w-full h-48 sm:h-64 object-cover rounded-2xl border border-slate-200 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs text-slate-500 mt-4 text-center italic font-light">
                        {selectedSolution.visualContent.caption}
                      </span>
                    </div>
                  )}

                  {/* Video Type rendering with mock custom play overlay */}
                  {selectedSolution.visualContent.type === "video" && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center p-6">
                      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md group flex items-center justify-center">
                        <img 
                          src={selectedSolution.visualContent.url} 
                          alt={selectedSolution.title}
                          className="absolute inset-0 w-full h-full object-cover brightness-50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="relative z-10 w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/40 animate-pulse pointer-events-none">
                          <Play className="w-7 h-7 fill-white translate-x-0.5" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                          <p className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-1">Trailer</p>
                          <p className="text-xs font-semibold text-white truncate">Phim kịch tính: Nỗi đau thầm lặng THPT</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 mt-4 text-center italic font-light">
                        {selectedSolution.visualContent.caption}
                      </span>
                    </div>
                  )}

                  {/* Audio Type with Interactive music visualizer player */}
                  {selectedSolution.visualContent.type === "audio" && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center p-8">
                      <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-6 relative flex items-center justify-center group">
                        <img 
                          src={selectedSolution.visualContent.url} 
                          alt="Album Art" 
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${musicPlaying ? 'scale-110 rotate-[30deg]' : 'scale-100'}`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <button
                          id="mock-play-music-btn"
                          onClick={() => setMusicPlaying(!musicPlaying)}
                          className="relative z-10 w-16 h-16 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          {musicPlaying ? (
                            <div className="flex gap-1.5 items-end h-5">
                              <span className="w-1 h-4 bg-sky-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
                              <span className="w-1 h-5 bg-sky-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                              <span className="w-1 h-3 bg-sky-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
                              <span className="w-1 h-5 bg-sky-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
                            </div>
                          ) : (
                            <Play className="w-6 h-6 fill-white translate-x-0.5" />
                          )}
                        </button>
                      </div>
                      
                      {/* Interactive dynamic sound lines */}
                      <div className="w-full h-8 flex items-center justify-center gap-1 mb-4">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-sky-500 rounded-full transition-all duration-300"
                            style={{
                              height: musicPlaying ? `${Math.random() * 24 + 4}px` : '4px',
                              opacity: musicPlaying ? Math.random() * 0.7 + 0.3 : 0.3
                            }}
                          />
                        ))}
                      </div>

                      <p className="text-slate-800 font-semibold text-center text-sm">{selectedSolution.visualContent.caption}</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">{musicPlaying ? "Đang phát thử bản 30s..." : "Nhấn nút để nghe thử giai điệu"}</p>
                    </div>
                  )}

                  {/* Interactive Digital Comic Frame Choice */}
                  {selectedSolution.visualContent.type === "interactive" && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center p-6">
                      <div className="w-full bg-slate-100 border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex gap-2 items-center text-[10px] font-mono text-pink-500 uppercase tracking-widest mb-3">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Học sinh đối diện bạo lực mạng</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal mb-4 bg-white p-3 rounded-lg border border-slate-200/60">
                          “Có tin đồn bôi nhọ bạn Linh trong group lớp. Ai cũng cười cợt và spam icon chế nhạo. Bạn thấy Linh ngồi khóc một mình ở góc hành lang lớp học...”
                        </p>
                        <div className="flex flex-col gap-2">
                          <button className="text-left text-xs p-2.5 rounded-xl bg-white border border-slate-200 hover:border-pink-300 hover:bg-pink-50/30 text-slate-700 hover:text-pink-700 transition-all">
                            A. Giả vờ không biết, hùa theo số đông để tránh bị ghét.
                          </button>
                          <button className="text-left text-xs p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 text-slate-700 hover:text-sky-700 transition-all">
                            B. Đến ngồi cạnh an ủi Linh và báo cáo bài viết xúc phạm.
                          </button>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 mt-4 text-center italic font-light">
                        {selectedSolution.visualContent.caption}
                      </span>
                    </div>
                  )}

                  {/* Virtual Gallery VR 360 viewer preview */}
                  {selectedSolution.visualContent.type === "exhibition" && selectedSolution.id === "exhibition" && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center p-6">
                      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md group flex items-center justify-center">
                        <img 
                          src={selectedSolution.visualContent.url} 
                          alt="VR Exhibition"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                        
                        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                          <span className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg border border-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                          <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1">Không gian VR 360</p>
                          <p className="text-xs font-semibold text-white truncate">Gặp gỡ 1,200+ lời nhắn tử tế trong không gian ảo</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 mt-4 text-center italic font-light">
                        {selectedSolution.visualContent.caption}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Side: Detailed Info */}
                <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-mono text-sky-600 uppercase tracking-widest block mb-1">Thông tin chi tiết</span>
                      <h3 className="text-2xl font-bold text-slate-900 font-sans">{selectedSolution.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedSolution.subtitle}</p>
                    </div>

                    <p className="text-slate-700 text-sm font-normal leading-relaxed mb-6">
                      {selectedSolution.description}
                    </p>

                    <div className="border-t border-slate-100 pt-6">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Các điểm cốt lõi:</h4>
                      <ul className="flex flex-col gap-3">
                        {selectedSolution.visualContent.details.map((detail, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-600 leading-relaxed font-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-6 flex justify-end">
                    <button
                      id="solution-modal-close-bottom"
                      onClick={() => {
                        setSelectedSolution(null);
                        setMusicPlaying(false);
                      }}
                      className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-sans text-xs transition-colors cursor-pointer"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
