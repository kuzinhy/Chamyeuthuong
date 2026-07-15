import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Eye, Heart, Lightbulb, ShieldCheck, HeartHandshake, 
  ArrowRight, Sparkles 
} from 'lucide-react';

interface ImpactNode {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: any;
  color: string;
  glowColor: string;
}

export default function ImpactMap() {
  const [activeNode, setActiveNode] = useState<string>('node_action');

  const nodes: ImpactNode[] = [
    {
      id: "node_reception",
      title: "Tiếp Nhận",
      subtitle: "Xúc tác thị giác ban đầu",
      desc: "Học sinh bắt gặp các hình ảnh, tranh cổ động, hoặc phim ngắn đầy cảm xúc lướt qua trên mạng xã hội hoặc khuôn viên trường học.",
      icon: Eye,
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.4)"
    },
    {
      id: "node_emotion",
      title: "Cảm Xúc",
      subtitle: "Đánh thức thấu cảm tự nhiên",
      desc: "Những chất liệu thị giác thật chạm sâu vào tâm thức, khơi gợi xúc cảm nguyên bản: thương xót, buồn tủi, trăn trở, phẫn nộ.",
      icon: Heart,
      color: "from-blue-500 to-indigo-500",
      glowColor: "rgba(59, 130, 246, 0.4)"
    },
    {
      id: "node_awareness",
      title: "Nhận Thức",
      subtitle: "Xác định trách nhiệm cá nhân",
      desc: "Bộ não chuyển đổi từ trạng thái xúc động sang phân tích logic: 'Mình không thể bàng quan trước hành vi bạo lực học đường này'.",
      icon: Lightbulb,
      color: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.4)"
    },
    {
      id: "node_attitude",
      title: "Thái Độ",
      subtitle: "Hình thành ý chí hành động",
      desc: "Hình thành động cơ đạo đức vững chắc, cam kết sẵn sàng lên tiếng, bài trừ cái ác và bảo vệ bạn bè yếu thế xung quanh.",
      icon: ShieldCheck,
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.4)"
    },
    {
      id: "node_action",
      title: "Hành Vi",
      subtitle: "Thực hành lòng trắc ẩn",
      desc: "Hành động cụ thể: kéo bạn ra khỏi cuộc bắt nạt, báo cáo thầy cô, bầu bạn cùng người cô độc, lập nhóm sẻ chia thấu hiểu.",
      icon: HeartHandshake,
      color: "from-pink-500 to-cyan-400",
      glowColor: "rgba(236, 72, 153, 0.4)"
    }
  ];

  return (
    <section id="impact-map-section" className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden">
      {/* Background neon visual line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Cơ Chế Thay Đổi Hành Vi
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight mb-6">
            Bản Đồ Tác Động Tâm Lý
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Cách một kích thích thị giác đơn lẻ thâm nhập và tái cấu trúc hoàn toàn hệ thống hành vi đạo đức của học sinh trung học phổ thông.
          </p>
        </div>

        {/* Floating Diagram Flow (Horizontal on desktop, stacked on mobile) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 relative mb-20">
          {nodes.map((node, idx) => {
            const IconComponent = node.icon;
            const isActive = activeNode === node.id;
            
            return (
              <div 
                key={node.id} 
                className="flex flex-col lg:flex-row items-center w-full lg:w-auto"
                onMouseEnter={() => setActiveNode(node.id)}
              >
                {/* Node Box card */}
                <button
                  id={`impact-node-${node.id}`}
                  className={`relative w-64 lg:w-44 h-44 rounded-3xl bg-[#0b1329] border flex flex-col justify-center items-center p-4 transition-all duration-500 group cursor-pointer ${
                    isActive 
                      ? 'border-transparent shadow-[0_0_25px_rgba(6,182,212,0.15)] scale-105' 
                      : 'border-white/5 hover:border-white/15'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 30px ${node.glowColor}` : 'none'
                  }}
                >
                  {/* Glowing background inside active card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Glowing icon dome */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    isActive 
                      ? `bg-gradient-to-br ${node.color} text-white border-transparent` 
                      : 'bg-white/5 text-gray-500 border-white/10 group-hover:text-gray-300'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className={`text-base font-bold font-sans mt-4 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                  }`}>
                    {node.title}
                  </h3>
                  
                  <span className="text-[9px] font-mono text-gray-600 mt-1 uppercase tracking-widest text-center">
                    {node.subtitle.split(' ')[0]}...
                  </span>
                </button>

                {/* Animated Connective Arrow */}
                {idx < nodes.length - 1 && (
                  <div className="flex items-center justify-center my-4 lg:my-0 lg:mx-2 text-gray-700">
                    <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0 text-cyan-500/40 animate-[pulse_1.5s_infinite]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Explanation Overlay below diagram */}
        <div className="max-w-4xl mx-auto">
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const NodeIcon = node.icon;
            if (!isActive) return null;

            return (
              <motion.div
                id={`impact-card-detail-${node.id}`}
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-8 sm:p-12 bg-white/[0.02] border border-cyan-500/20 backdrop-blur-xl relative overflow-hidden flex flex-col sm:flex-row gap-8 items-start"
              >
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${node.color}`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${node.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <NodeIcon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Chi tiết chuỗi liên kết tâm lý</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans mb-4">{node.title} — {node.subtitle}</h3>
                  <p className="text-gray-300 text-base leading-relaxed font-light font-sans">{node.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
