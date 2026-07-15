import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, User, MessageSquareHeart } from 'lucide-react';
import { MessageWallPost } from '../types';
import { useToast } from '../context/ToastContext';

export default function MessageWall() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<MessageWallPost[]>([]);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('Tôi sẽ làm một điều tử tế hôm nay');
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Default pre-seeded quotes from real students of the Nguyễn Du trial
  const defaultSeeds: MessageWallPost[] = [
    {
      id: "seed_1",
      name: "Tường Vy (Lớp 11A3)",
      text: "Hôm nay mình đã chủ động ngồi cạnh và chia sẻ hộp bút màu với bạn học bị cô lập trong lớp vẽ.",
      timestamp: "Vừa xong",
      avatarSeed: 1
    },
    {
      id: "seed_2",
      name: "Khánh Nam (Lớp 12A1)",
      text: "Sự im lặng của đám đông đáng sợ hơn cả cái ác. Mình cam kết từ nay sẽ dũng cảm đứng lên can thiệp bảo vệ bạn bè.",
      timestamp: "10 phút trước",
      avatarSeed: 2
    },
    {
      id: "seed_3",
      name: "Minh Thư (Lớp 10C2)",
      text: "Một ánh mắt biết lắng nghe, một lời hỏi thăm chân thành là liều thuốc chữa lành tốt nhất cho sự cô đơn học đường.",
      timestamp: "30 phút trước",
      avatarSeed: 3
    },
    {
      id: "seed_4",
      name: "Học sinh Nguyễn Du",
      text: "Hãy làm một điều tử tế nhỏ bé mỗi ngày. Sự tử tế có tính lan tỏa, nó sẽ quay trở về ôm lấy bạn lúc khó khăn.",
      timestamp: "1 giờ trước",
      avatarSeed: 4
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('cham_message_wall');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages(defaultSeeds);
      }
    } else {
      setMessages(defaultSeeds);
      localStorage.setItem('cham_message_wall', JSON.stringify(defaultSeeds));
    }
  }, []);

  const triggerFlyingHearts = () => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100, // randomized horizontal dispersion
      y: Math.random() * -150 - 100 // randomized height float
    }));
    setHearts(newHearts);
    
    // Clear hearts after animation ends (1.5s)
    setTimeout(() => {
      setHearts([]);
    }, 1500);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const posterName = inputName.trim() || "Học sinh ẩn danh";
    const newPost: MessageWallPost = {
      id: `custom_${Date.now()}`,
      name: posterName,
      text: inputText.trim(),
      timestamp: "Vừa xong",
      avatarSeed: Math.floor(Math.random() * 5) + 1
    };

    const updated = [newPost, ...messages];
    setMessages(updated);
    localStorage.setItem('cham_message_wall', JSON.stringify(updated));
    
    // Trigger the beautiful interactive heart explosion
    triggerFlyingHearts();

    showToast("Thắp sáng thành công! 💖", {
      description: `${posterName} vừa gửi đi một cam kết hành động tử tế lên Tường Yêu Thương.`,
      type: 'heart'
    });

    // Reset inputs
    setInputName('');
    setInputText('Tôi sẽ làm một điều tử tế hôm nay');
  };

  return (
    <section id="message-wall-section" className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-sky-50/20 to-[#f0f9ff] overflow-hidden">
      {/* Grid Pattern and radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.02)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-300/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-300/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-sky-50 border border-sky-100 shadow-sm">
            Lan Tỏa Sự Tử Tế
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Tường Lời Nhắn Yêu Thương
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            Gửi đi cam kết hành động tử tế của bạn hôm nay. Mỗi thông điệp gửi đi sẽ thắp sáng một trái tim trắc ẩn trên bản đồ học đường.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Form and flying hearts box */}
          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_40px_rgba(14,165,233,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 to-indigo-600" />
              
              <div className="flex items-center gap-2 mb-6">
                <MessageSquareHeart className="w-5 h-5 text-sky-500 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-800 font-sans">Gửi thông điệp tử tế</h3>
              </div>

              <form onSubmit={handlePostSubmit} className="flex flex-col gap-5">
                {/* Name field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Tên của bạn (Tùy chọn)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Nhập tên hoặc lớp học..."
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-sky-500 rounded-xl text-slate-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Message text field with preset support */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Lời nhắn của bạn</label>
                  <textarea 
                    rows={4}
                    placeholder="Viết lời cam kết tử tế hoặc một chia sẻ thấu cảm..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-sky-500 rounded-xl text-slate-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors resize-none leading-relaxed shadow-sm"
                  />
                </div>

                {/* Preset Fast Actions */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setInputText('Tôi sẽ làm một điều tử tế hôm nay.')}
                    className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                  >
                    “Tôi sẽ làm một điều tử tế...”
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText('Luôn đứng lên bảo vệ người bị cô lập.')}
                    className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                  >
                    “Luôn bảo vệ người cô lập...”
                  </button>
                </div>

                {/* Submit button with relative spawning visualizer */}
                <div className="relative">
                  <button
                    id="submit-pledge-btn"
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 text-white font-sans font-medium text-sm shadow-md shadow-sky-500/10 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    Thắp sáng một trái tim
                  </button>

                  {/* Floating heart container right over the button */}
                  <AnimatePresence>
                    {hearts.map((h) => (
                      <motion.div
                        key={h.id}
                        initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
                        animate={{ opacity: 0, scale: 1.8, x: h.x, y: h.y }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-0 pointer-events-none text-red-500 select-none text-3xl z-30"
                      >
                        ❤️
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Wall of messages (Bento grid style scrollable) */}
          <div className="lg:col-span-7 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((post) => {
                const avatarGradients = [
                  "from-sky-100 to-sky-200 text-sky-700 border-sky-200",
                  "from-purple-100 to-purple-200 text-purple-700 border-purple-200",
                  "from-emerald-100 to-emerald-200 text-emerald-700 border-emerald-200",
                  "from-amber-100 to-amber-200 text-amber-700 border-amber-200",
                  "from-pink-100 to-pink-200 text-pink-700 border-pink-200"
                ];
                const gradStyle = avatarGradients[(post.avatarSeed || 1) % avatarGradients.length];

                return (
                  <motion.div
                    id={`wall-message-post-${post.id}`}
                    key={post.id}
                    initial={{ opacity: 0, x: 25, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.015, borderColor: '#38bdf8' }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="p-6 rounded-2xl bg-white border border-slate-100 relative overflow-hidden transition-all group shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/5 to-transparent blur-xl pointer-events-none" />
                    
                    <div className="flex gap-4 items-start relative z-10">
                      {/* Glowing Avatar Placeholder */}
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradStyle} border flex items-center justify-center font-mono text-sm font-bold shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {post.name.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-bold text-slate-800 font-sans">{post.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-3">
                          “{post.text}”
                        </p>

                        {/* Interactive heart counters & reaction on individual posts */}
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-mono text-slate-400">Đã gửi cam kết học đường</span>
                          
                          <motion.button
                            id={`like-post-btn-${post.id}`}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              // Trigger localized flying heart
                              triggerFlyingHearts();
                              showToast("Lan tỏa thấu cảm! ❤️", {
                                description: `Bạn vừa gửi gắm sự đồng cảm chân thành tới thông điệp của ${post.name}.`,
                                type: 'heart',
                                duration: 3000
                              });
                            }}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-100 text-xs text-slate-500 hover:text-red-500 transition-all cursor-pointer shadow-sm"
                          >
                            <Heart className="w-3.5 h-3.5 fill-none group-hover:fill-red-500 transition-colors" />
                            <span>Đồng cảm</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
