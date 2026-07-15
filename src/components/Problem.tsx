import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Eye, MessageSquareOff, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 1500, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [isIntersecting, end, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Problem() {
  return (
    <section id="problem-section" className="relative py-24 sm:py-32 bg-gradient-to-b from-sky-50/50 via-white to-white overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-sky-300/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-300/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-indigo-600 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100"
          >
            Thực trạng & Thử thách
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight mb-6"
          >
            Sự vô cảm trong thời đại số:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
              Tiếng chuông báo động
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed"
          >
            Sự phát triển mạnh mẽ của công nghệ kết nối chúng ta gần nhau hơn về mặt vật lý số, nhưng lại vô tình nới rộng khoảng cách của cảm xúc thật. Học sinh THPT ngày nay đang đối mặt với sự cô độc và chai sạm thấu cảm.
          </motion.p>
        </div>

        {/* Dynamic Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Stat 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(14,165,233,0.03)] hover:border-sky-300 hover:shadow-[0_15px_40px_rgba(14,165,233,0.1)] p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-500/0 via-sky-400 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-sky-500/5 blur-3xl group-hover:bg-sky-500/10 transition-colors duration-500 pointer-events-none" />
            
            <div className="mb-6 flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <MessageSquareOff className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-sky-500/80">UNICEF Việt Nam (2024)</span>
            </div>
            <div className="relative z-10">
              <div className="text-6xl sm:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedCounter end={32} suffix="%" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">Cảm thấy thiếu sự sẻ chia</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Học sinh cảm thấy hoàn toàn không nhận được sự lắng nghe, thấu hiểu hay đồng hành sâu sắc từ chính gia đình và người thân của mình.
              </p>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(14,165,233,0.03)] hover:border-blue-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.1)] p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none" />

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-blue-500/80">Khảo sát Q&Me (2024)</span>
            </div>
            <div className="relative z-10">
              <div className="text-6xl sm:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedCounter end={51} suffix="%" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Hơn 3 giờ/ngày trên mạng xã hội</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Dành phần lớn quỹ thời gian trong ngày xem video ngắn thụ động trên TikTok, Facebook, lười tương tác và xa rời các cảm xúc thực tế.
              </p>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(14,165,233,0.03)] hover:border-indigo-300 hover:shadow-[0_15px_40px_rgba(99,102,241,0.1)] p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-400 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500 pointer-events-none" />

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-indigo-500/80">UNICEF Việt Nam (2021)</span>
            </div>
            <div className="relative z-10">
              <div className="text-6xl sm:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500 mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedCounter end={84} suffix="%" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">Ảnh hưởng cảm xúc sâu sắc</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Thanh thiếu niên thừa nhận mạng xã hội chi phối trực tiếp đến thái độ sống và kích hoạt thói quen bàng quan, thờ ơ trước nỗi đau xung quanh.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Interactive Infographic Quote block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-sky-50/50 via-white to-amber-50/40 border border-sky-100/80 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-sky-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <span className="text-xs font-mono text-sky-600 uppercase tracking-widest mb-2 block font-bold">Thực trạng Việt Nam</span>
              <h4 className="text-xl sm:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                Việc tiếp xúc thường xuyên với nội dung nhanh giải trí khiến não bộ chai sạm cảm xúc thực tế.
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-6">
                Khi những thước phim bạo lực học đường, hoàn cảnh khó khăn trôi qua trên màn hình điện thoại chỉ trong 3 giây lướt ngón tay, học sinh THPT dần hình thành tư duy “bình thường hóa” tổn thương. Thói quen quan sát thụ động làm giảm năng lực thấu cảm của các em trong cuộc sống thực tế.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50/60 border border-sky-100/50 text-xs font-mono text-slate-700 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Bạo lực học đường gia tăng
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50/60 border border-sky-100/50 text-xs font-mono text-slate-700 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Hành vi thờ ơ phổ biến
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white border border-sky-100/50 hover:border-sky-300 hover:shadow-md transition-all shadow-sm">
                <div className="text-xs text-slate-400 font-mono mb-1">Mức sử dụng internet trung bình</div>
                <div className="text-2xl font-bold text-slate-800">6 giờ 18 phút <span className="text-xs text-sky-500 font-semibold">mỗi ngày</span></div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-sky-100/50 hover:border-sky-300 hover:shadow-md transition-all shadow-sm">
                <div className="text-xs text-slate-400 font-mono mb-1">Thời gian dùng Mạng xã hội</div>
                <div className="text-2xl font-bold text-slate-800">2 giờ 30 phút <span className="text-xs text-indigo-500 font-semibold">mỗi ngày</span></div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
