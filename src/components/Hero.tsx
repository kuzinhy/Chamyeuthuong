import { useEffect, useRef } from 'react';
import { ArrowDown, Play, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import LumiMascot from './LumiMascot';

interface HeroProps {
  onExploreClick: () => void;
  onWatchVideoClick: () => void;
}

export default function Hero({ onExploreClick, onWatchVideoClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      originalAlpha: number;
    }> = [];

    const colors = ['rgba(14, 165, 233, ', 'rgba(249, 115, 22, ', 'rgba(236, 72, 153, ']; // sky-blue, orange, pink

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const alpha = Math.random() * 0.4 + 0.2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: alpha,
          originalAlpha: alpha
        });
      }
    };

    initCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background light sky/warm cream gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#f0f9ff');
      gradient.addColorStop(0.5, '#f8fafc');
      gradient.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Mouse interactive radial spot light
      ctx.beginPath();
      const radialGlow = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 300
      );
      radialGlow.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      radialGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.05)');
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
      ctx.fill();

      // Connect lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            // Lines glow brighter when near the mouse pointer
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const mouseDist = Math.hypot(midX - mouseX, midY - mouseY);
            const mouseMultiplier = mouseDist < 200 ? (1.5 - mouseDist / 200) : 1;

            const alpha = (1 - dist / 130) * 0.15 * mouseMultiplier;
            ctx.strokeStyle = `rgba(14, 165, 233, ${Math.min(0.35, alpha)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Interaction with mouse (gentle physical push/attraction)
        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (distToMouse < 180) {
          const force = (180 - distToMouse) / 180;
          const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
          
          // Gentle push away
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
          
          // Elevate alpha close to mouse
          p.alpha = Math.min(0.9, p.originalAlpha + force * 0.4);
        } else {
          // Fade back to original alpha
          p.alpha = p.alpha > p.originalAlpha ? p.alpha - 0.01 : p.originalAlpha;
        }

        // Wrap around boundaries elegantly instead of bouncing
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center px-4">
      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-1" />

      {/* Soft Light-mode Glow Balls */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-200/30 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center select-none">
        {/* Lumi Mascot character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
          className="mb-3"
        >
          <LumiMascot size={180} />
        </motion.div>

        {/* Project Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100/80 text-xs font-mono text-sky-600 tracking-wider uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
          DỰ ÁN NGHIÊN CỨU KHOA HỌC HÀNH VI • ĐẠI DIỆN BỞI LUMI
        </motion.div>

        {/* Large Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-600 tracking-tight leading-[1.1] mb-6"
        >
          Một hình ảnh có thể <br className="hidden sm:inline" />
          <span className="text-slate-900 relative">
            thay đổi một trái tim.
            <span className="absolute bottom-1 left-0 w-full h-[4px] bg-gradient-to-r from-sky-400 to-amber-400 rounded-full opacity-60" />
          </span>
        </motion.h1>

        {/* Official Slogan Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mb-8 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-amber-500/10 border border-indigo-500/20 text-indigo-700 font-sans font-extrabold text-xs sm:text-sm tracking-[0.18em] uppercase shadow-xs flex items-center justify-center gap-2 max-w-full text-center"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>NHÌN BẰNG TRÁI TIM - HÀNH ĐỘNG BẰNG YÊU THƯƠNG</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-base sm:text-xl text-slate-600 font-sans tracking-wide max-w-2xl mb-10 font-normal leading-relaxed"
        >
          Mỗi hành động tử tế bắt đầu từ sự thấu cảm. Tác động truyền thông thị giác đến sự thay đổi hành vi trắc ẩn của học sinh trung học phổ thông.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 text-white font-sans font-medium text-base shadow-[0_10px_30px_rgba(14,165,233,0.25)] hover:shadow-[0_12px_35px_rgba(14,165,233,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Khám phá dự án
          </button>
          <button
            id="hero-watch-btn"
            onClick={onWatchVideoClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 border border-sky-100 hover:bg-sky-50 text-slate-700 hover:border-sky-300 shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Play className="w-4 h-4 text-sky-500 fill-sky-500 group-hover:scale-110 transition-transform" />
            Xem video chiến dịch
          </button>
        </motion.div>
      </div>

      {/* Down Arrow / Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono text-slate-400 tracking-[0.3em] uppercase mb-2 animate-pulse">Cuộn để khám phá</span>
        <button
          id="hero-scroll-down-btn"
          onClick={onExploreClick}
          className="w-10 h-10 rounded-full bg-white/80 border border-sky-100 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 shadow-sm transition-all duration-300 animate-bounce cursor-pointer"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
