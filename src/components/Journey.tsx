import { useState } from 'react';
import { BookOpen, Heart, Eye, Lightbulb, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneyStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  detailedText: string;
  icon: any;
  color: string;
  glowColor: string;
  visualEffect: string;
}

export default function Journey() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: JourneyStep[] = [
    {
      id: 0,
      title: "1. Tiếp Nhận",
      subtitle: "Quan sát & Nhận diện",
      description: "Học sinh được kích thích trực quan bằng các sản phẩm truyền thông định hướng chất lượng cao.",
      detailedText: "Bắt đầu bằng việc xem những thước phim ngắn đầy chân thực, những bức ảnh Photovoice sống động phản ánh bạo lực học đường, sự cô độc hay cử chỉ sẻ chia âm thầm. Việc tiếp cận này đánh thức các giác quan vật lý của học sinh, kéo các em ra khỏi trạng thái lướt nội dung vô thức.",
      icon: Eye,
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.4)",
      visualEffect: "reception"
    },
    {
      id: 1,
      title: "2. Cảm Xúc",
      subtitle: "Lay động trái tim",
      description: "Những câu chuyện thị giác khơi dậy xúc cảm chân thật, phá vỡ bức tường vô cảm.",
      detailedText: "Hình ảnh kích hoạt hệ thống noron phản chiếu trong não bộ. Học sinh bắt đầu cảm nhận thấy sự nhói lòng, niềm vui hay nỗi xót xa trước nghịch cảnh của nhân vật. Đây là điểm khởi đầu cho việc đánh giá chuẩn mực đạo đức của bản thân.",
      icon: Heart,
      color: "from-blue-500 to-indigo-500",
      glowColor: "rgba(59, 130, 246, 0.4)",
      visualEffect: "emotion"
    },
    {
      id: 2,
      title: "3. Thấu Cảm",
      subtitle: "Đặt mình vào vị trí",
      description: "Thấu hiểu nỗi đau của người khác như chính nỗi đau của mình.",
      detailedText: "Từ cảm xúc tức thời, học sinh đi sâu vào trạng thái thấu cảm nhận thức và cảm xúc. Các em tự đặt câu hỏi: 'Nếu mình là bạn ấy, mình sẽ cô độc thế nào?'. Mối liên kết tinh thần giữa người xem và đối tượng khó khăn được thiết lập bền vững.",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.4)",
      visualEffect: "empathy"
    },
    {
      id: 3,
      title: "4. Nhận Thức",
      subtitle: "Thay đổi tư duy",
      description: "Nhận ra trách nhiệm xã hội và mong muốn thay đổi cục diện thực tế xung quanh.",
      detailedText: "Đứng trước sự thấu cảm, học sinh THPT hình thành nhận thức đạo đức trưởng thành hơn. Các em hiểu rõ bàng quan cũng là một sự tổn thương lớn, từ đó nảy sinh ý thức bảo vệ bạn bè, bài trừ cái ác và mong muốn kiến tạo môi trường học đường hạnh phúc.",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.4)",
      visualEffect: "awareness"
    },
    {
      id: 4,
      title: "5. Hành Động",
      subtitle: "Hành vi trắc ẩn",
      description: "Chuyển hóa cảm xúc thấu cảm thành các hành động giúp đỡ cụ thể trong đời sống.",
      detailedText: "Hành trình kết thúc bằng việc ra quyết định hành động. Học sinh sẵn sàng đứng lên bảo vệ người bị bắt nạt, hỏi thăm bạn bị cô lập, tham gia quyên góp xã hội hoặc đơn giản là trao đi một ánh mắt cảm thông sâu sắc. Lòng trắc ẩn lúc này đã hoàn thiện từ nhận thức sang thực tiễn.",
      icon: HeartHandshake,
      color: "from-pink-500 to-cyan-400",
      glowColor: "rgba(236, 72, 153, 0.4)",
      visualEffect: "action"
    }
  ];

  const currentStep = steps[activeStep];
  const IconComponent = currentStep.icon;

  return (
    <section id="journey-section" className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden">
      {/* Background overlay details */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      
      {/* Visual background blob that morphs based on the active step */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[140px] opacity-10 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${currentStep.glowColor} 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Hành Trình Tâm Lý Học
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight mb-6">
            Hành Trình Chuyển Hóa Cảm Xúc
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Nhấp vào từng chặng để chứng kiến cách một sản phẩm truyền thông thị giác thâm nhập vào nhận thức và thúc đẩy hành vi trắc ẩn thực tế.
          </p>
        </div>

        {/* Story Journey Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Stepper controls (Left Column / Vertical navigation) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStep;
              
              return (
                <button
                  id={`journey-step-${step.id}`}
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-500 flex items-center gap-4 group cursor-pointer ${
                    isActive 
                      ? 'bg-white/[0.04] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02)]' 
                      : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  {/* Glowing vertical connector */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-[36px] top-[64px] w-[2px] h-[24px] bg-white/5 pointer-events-none hidden sm:block">
                      <div className={`w-full h-full bg-gradient-to-b from-cyan-500 to-purple-500 transition-transform duration-500 origin-top ${
                        idx < activeStep ? 'scale-y-100' : 'scale-y-0'
                      }`} />
                    </div>
                  )}

                  {/* Icon with glowing aura */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white border-transparent shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                      : 'bg-white/5 text-gray-500 border-white/10 group-hover:border-white/20 group-hover:text-gray-300'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'
                    }`}>
                      {step.subtitle}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold font-sans transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                    }`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Active arrow indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="journey-active-dot" 
                      className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive display area (Right Column) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-8 sm:p-12 backdrop-blur-xl"
              >
                {/* Accent glow line inside card */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${currentStep.color}`} />
                
                {/* Visual Graphic Representation using CSS animations */}
                <div className="mb-8 relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-10 animate-pulse`} />
                  
                  {/* Custom CSS anims based on stage */}
                  {currentStep.visualEffect === 'reception' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-cyan-500/20 animate-ping absolute" />
                      <div className="w-12 h-12 rounded-full border border-cyan-400/40 animate-pulse absolute" />
                    </div>
                  )}
                  {currentStep.visualEffect === 'emotion' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-10 h-10 text-red-500/30 animate-ping absolute" />
                      <Heart className="w-10 h-10 text-red-500/60 animate-bounce absolute" />
                    </div>
                  )}
                  {currentStep.visualEffect === 'empathy' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-indigo-500/30 border-dashed animate-spin" />
                    </div>
                  )}
                  {currentStep.visualEffect === 'awareness' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-16 bg-yellow-400/20 blur-sm absolute rotate-45" />
                      <div className="w-4 h-16 bg-yellow-400/20 blur-sm absolute -rotate-45" />
                    </div>
                  )}
                  {currentStep.visualEffect === 'action' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
                        <HeartHandshake className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>
                  )}

                  <IconComponent className="w-10 h-10 relative z-10 text-white" />
                </div>

                {/* Text explanation */}
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Chặng {activeStep + 1} • {currentStep.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 font-sans">
                  {currentStep.title}
                </h3>
                
                <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
                  {currentStep.description}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {currentStep.detailedText}
                </p>

                {/* Small indicator dots */}
                <div className="flex gap-2 mt-8 justify-start">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStep ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
