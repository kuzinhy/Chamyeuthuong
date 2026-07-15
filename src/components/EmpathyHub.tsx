import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Award, BookOpen, CheckSquare, Heart, ShieldAlert, 
  MessageSquare, HelpCircle, Download, FileText, ChevronRight, 
  Share2, Compass, AlertTriangle, ArrowRight, UserCheck, Sparkles, 
  FileCheck, Play, Printer, Smile, RefreshCw
} from 'lucide-react';
import GlowWrapper from './GlowWrapper';
import { useToast } from '../context/ToastContext';

interface Confession {
  id: string;
  role: string;
  text: string;
  time: string;
  likes: number;
}

export default function EmpathyHub() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'student' | 'parent' | 'teacher' | 'community'>('student');
  
  // Local states for Students
  const [kindnessDay, setKindnessDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1]);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [newConfessionText, setNewConfessionText] = useState('');
  const [newConfessionRole, setNewConfessionRole] = useState('Học sinh Lớp 11');

  // Local states for Parents
  const [checklist, setChecklist] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
  });
  const [parentCardIndex, setParentCardIndex] = useState(0);

  // Local states for Teachers
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  const [downloadPercent, setDownloadPercent] = useState(0);

  // Local states for Community (Pledge)
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeRegion, setPledgeRegion] = useState('Hà Nội');
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([
    'Không bàng quan im lặng',
    'Chủ động lắng nghe'
  ]);
  const [signedPledge, setSignedPledge] = useState<any | null>(null);
  const [pledgeCount, setPledgeCount] = useState(1420);
  const [animatePledgeCount, setAnimatePledgeCount] = useState(false);

  // Default seed confessions
  const defaultConfessions: Confession[] = [
    {
      id: 'c1',
      role: 'Cựu học sinh',
      text: 'Ngày xưa khi đi học, mình đã từng im lặng khi thấy một bạn cùng bàn bị các bạn khác giấu tập sách và cô lập. Đến giờ đi làm rồi, mình vẫn thấy hối hận vì lúc đó đã không đủ can đảm nói một lời bênh vực.',
      time: '10 phút trước',
      likes: 12
    },
    {
      id: 'c2',
      role: 'Phụ huynh học sinh',
      text: 'Đọc những chia sẻ này tôi mới hiểu hơn về tâm lý của con. Ở trường con đôi khi không dám kể về những bất an vì sợ cha mẹ lo lắng hoặc la mắng.',
      time: '2 giờ trước',
      likes: 8
    },
    {
      id: 'c3',
      role: 'Học sinh Lớp 10',
      text: 'Lớp mình vừa tham gia hoạt động Photovoice của dự án Chạm. Tụi mình đã cùng chụp ảnh và cùng khóc khi nghe một bạn chia sẻ về nỗi sợ bị bỏ rơi.',
      time: '4 giờ trước',
      likes: 19
    }
  ];

  useEffect(() => {
    // Load local storage values
    const savedConfessions = localStorage.getItem('cham_confessions');
    if (savedConfessions) {
      try { setConfessions(JSON.parse(savedConfessions)); } catch (e) { setConfessions(defaultConfessions); }
    } else {
      setConfessions(defaultConfessions);
      localStorage.setItem('cham_confessions', JSON.stringify(defaultConfessions));
    }

    const savedPledgeCount = localStorage.getItem('cham_pledge_count');
    if (savedPledgeCount) {
      setPledgeCount(parseInt(savedPledgeCount, 10));
    }

    const savedCompletedDays = localStorage.getItem('cham_completed_days');
    if (savedCompletedDays) {
      try { setCompletedDays(JSON.parse(savedCompletedDays)); } catch (e) {}
    }

    const savedPledge = localStorage.getItem('cham_signed_pledge');
    if (savedPledge) {
      try { setSignedPledge(JSON.parse(savedPledge)); } catch (e) {}
    }
  }, []);

  // Student: kindness missions
  const missions = [
    { day: 1, title: 'Lời chào buổi sáng', desc: 'Chào hỏi và cười thật tươi với ít nhất 3 bạn học hôm nay, đặc biệt là những bạn ít nói.' },
    { day: 2, title: 'Lời cảm ơn chân thành', desc: 'Nói lời cảm ơn tử tế tới các cô chú lao công, bác bảo vệ trường hoặc thầy cô đứng lớp.' },
    { day: 3, title: 'Đồng hành giờ trưa', desc: 'Chủ động rủ một người đang ngồi ăn trưa hoặc ngồi học một mình tham gia cùng nhóm của bạn.' },
    { day: 4, title: 'Lắng nghe sâu', desc: 'Dành 10 phút lắng nghe trọn vẹn một người bạn kể chuyện mà không ngắt lời hay phán xét.' },
    { day: 5, title: 'Mẩu giấy biết ơn', desc: 'Viết một mẩu giấy nhớ nhỏ khen ngợi điểm tốt của bạn cùng bàn và dán bí mật lên ngăn bàn của họ.' },
    { day: 6, title: 'Lan tỏa thông điệp', desc: 'Chia sẻ một thông điệp ý nghĩa về chống bạo lực học đường lên mạng xã hội kèm hashtag #ChamEmpathy.' },
    { day: 7, title: 'Hành động trắc ẩn', desc: 'Nếu thấy ai đó gặp khó khăn trong học tập hoặc cuộc sống, hãy dũng cảm chủ động đề xuất giúp đỡ.' }
  ];

  const toggleMissionComplete = (day: number) => {
    let updated;
    const mission = missions[day - 1];
    if (completedDays.includes(day)) {
      updated = completedDays.filter(d => d !== day);
      showToast("Đã hủy đánh dấu sứ mệnh", {
        description: `Đã hoàn tác ngày ${day}: ${mission.title}.`,
        type: 'warning'
      });
    } else {
      updated = [...completedDays, day];
      showToast("Sứ mệnh hoàn thành! 🌟", {
        description: `Chúc mừng bạn đã hoàn thành thử thách ngày ${day}: ${mission.title}!`,
        type: 'success'
      });
    }
    setCompletedDays(updated);
    localStorage.setItem('cham_completed_days', JSON.stringify(updated));
  };

  const handleConfessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfessionText.trim()) return;

    const newC: Confession = {
      id: `custom_c_${Date.now()}`,
      role: newConfessionRole,
      text: newConfessionText.trim(),
      time: 'Vừa xong',
      likes: 0
    };

    const updated = [newC, ...confessions];
    setConfessions(updated);
    localStorage.setItem('cham_confessions', JSON.stringify(updated));
    setNewConfessionText('');

    showToast("Gửi tâm sự thành công! 💬", {
      description: "Hệ thống đã nhận thông điệp ẩn danh của bạn một cách an toàn.",
      type: 'sparkle'
    });
  };

  const handleConfessionLike = (id: string) => {
    const updated = confessions.map(c => {
      if (c.id === id) {
        showToast("Đồng cảm sâu sắc! ❤️", {
          description: `Bạn đã chia sẻ sự đồng cảm với tâm sự của một ${c.role}.`,
          type: 'heart'
        });
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    setConfessions(updated);
    localStorage.setItem('cham_confessions', JSON.stringify(updated));
  };

  // Parent: early indicator score calculation
  const getParentScore = () => {
    return Object.values(checklist).filter(Boolean).length;
  };

  const parentIndicatorSummary = () => {
    const score = getParentScore();
    if (score === 0) {
      return {
        level: 'Bình thường (0/6)',
        color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
        advice: 'Con đang có trải nghiệm học đường tương đối ổn định. Hãy duy trì thói quen lắng nghe và tâm sự cùng con mỗi ngày để tạo dựng kết nối an toàn vững chắc.'
      };
    } else if (score <= 2) {
      return {
        level: 'Nhẹ - Cần theo dõi thêm (1-2/6)',
        color: 'text-amber-500 bg-amber-50 border-amber-100',
        advice: 'Có một vài dấu hiệu căng thẳng tâm lý nhẹ. Cha mẹ nên tăng cường các câu hỏi gợi mở, nói chuyện nhẹ nhàng sau giờ học, tạo không gian an toàn để con tự trải lòng mà không phán xét.'
      };
    } else {
      return {
        level: 'Đáng lưu ý - Cần can thiệp (3-6/6)',
        color: 'text-rose-500 bg-rose-50 border-rose-100',
        advice: 'Tần suất các dấu hiệu cho thấy con có thể đang gặp khủng hoảng học đường hoặc bị cô lập. Cha mẹ hãy bình tĩnh, kết nối ngay với giáo viên chủ nhiệm, chuyên gia tâm lý học đường để cùng đồng hành tháo gỡ an toàn cho con.'
      };
    }
  };

  const parentConversationStarters = [
    { q: "Hôm nay ở trường có điều gì làm con mỉm cười không?", desc: "Giúp con tập trung vào những tương tác tích cực thay vì áp lực học tập." },
    { q: "Nếu ngày hôm nay của con là một loại thời tiết, nó sẽ là nắng, mưa hay bão giông?", desc: "Dùng ẩn dụ thời tiết giúp con dễ dàng bộc lộ cảm xúc khi khó tìm từ ngữ chính xác." },
    { q: "Có bạn nào trong lớp dạo này hay ngồi một mình không con?", desc: "Khơi gợi lòng trắc ẩn của con đối với những người xung quanh mà không gây cảm giác gò bó." },
    { q: "Hôm nay có điều gì làm con cảm thấy bất an hay lúng túng không?", desc: "Mở cánh cửa để con thoải mái chia sẻ những tổn thương hoặc xung đột ẩn giấu." }
  ];

  // Teacher: interactive slide deck
  const classSlides = [
    {
      title: "1. Hiệu ứng người ngoài cuộc (Bystander Effect)",
      bullets: [
        "Sự bàng quan tập thể: Chúng ta nghĩ sẽ có ai đó khác đứng ra giải quyết.",
        "Mỗi cá nhân im lặng sẽ làm tăng nỗi sợ hãi cho người bị hại.",
        "Khi 1 người đứng lên, 80% đám đông sẽ chuyển biến hành vi tích cực theo."
      ],
      concept: "Khi mọi người đều im lặng, cái xấu sẽ được bình thường hóa."
    },
    {
      title: "2. Chuyển dịch: Từ thấu cảm sang Trắc ẩn",
      bullets: [
        "Thấu cảm cảm xúc (Empathy): Cảm thấy buồn khi nhìn bạn bị bắt nạt.",
        "Hành động trắc ẩn (Compassion): Chủ động dang tay ngăn cản hoặc dắt bạn đi chỗ khác.",
        "Dự án 'Chạm' hướng đến việc chuyển hóa suy nghĩ thành hành động thực tế."
      ],
      concept: "Hiểu là khởi đầu, hành động mới là sự cứu chuộc."
    },
    {
      title: "3. Quy tắc 3 bước can thiệp an toàn",
      bullets: [
        "BƯỚC 1 - NHẬN BIẾT: Xác định đúng hành vi cô lập, bạo lực tinh thần.",
        "BƯỚC 2 - LỰA CHỌN: Đánh giá độ an toàn để trực tiếp can thiệp hoặc tìm kiếm sự trợ giúp.",
        "BƯỚC 3 - HÀNH ĐỘNG: Phân tán đám đông, kéo nạn nhân ra ngoài, hoặc báo ngay cho giáo viên."
      ],
      concept: "Can thiệp thông minh luôn đặt sự an toàn lên hàng đầu."
    }
  ];

  const handleDownload = (filename: string) => {
    if (downloadProgress) return;
    setDownloadProgress(filename);
    setDownloadPercent(0);

    showToast("Bắt đầu tải tài liệu... 📥", {
      description: `Đang kết nối để tải file an toàn: ${filename}`,
      type: 'info',
      duration: 3000
    });
    
    const interval = setInterval(() => {
      setDownloadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            showToast("Tải về hoàn tất! 🎉", {
              description: `Tài liệu ${filename} đã được lưu về thiết bị của bạn thành công.`,
              type: 'success'
            });
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  // Community: Pledge submit
  const vietnameseCommitments = [
    "Tôi cam kết không im lặng khi chứng kiến bạo lực học đường.",
    "Tôi cam kết luôn chủ động lắng nghe và kết nối với người bị cô lập.",
    "Tôi cam kết lan tỏa các giá trị thấu cảm trong gia đình và xã hội.",
    "Tôi cam kết tôn trọng sự khác biệt cá nhân của mỗi người."
  ];

  const handleCommitmentToggle = (comm: string) => {
    if (selectedCommitments.includes(comm)) {
      setSelectedCommitments(selectedCommitments.filter(c => c !== comm));
    } else {
      setSelectedCommitments([...selectedCommitments, comm]);
    }
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;

    const pledge = {
      name: pledgeName.trim(),
      region: pledgeRegion,
      commitments: selectedCommitments,
      date: new Date().toLocaleDateString('vi-VN'),
      id: `PLEDGE-${Math.floor(Math.random() * 900000 + 100000)}`
    };

    setSignedPledge(pledge);
    localStorage.setItem('cham_signed_pledge', JSON.stringify(pledge));
    
    // Increment the global virtual sign count
    const nextCount = pledgeCount + 1;
    setPledgeCount(nextCount);
    localStorage.setItem('cham_pledge_count', nextCount.toString());
    
    setAnimatePledgeCount(true);
    setTimeout(() => setAnimatePledgeCount(false), 1200);

    showToast("Ký cam kết thành công! 📜", {
      description: `Cảm ơn ${pledge.name} đã thắp sáng cam kết trắc ẩn tại khu vực ${pledge.region}.`,
      type: 'success',
      duration: 5000
    });
  };

  const handleResetPledge = () => {
    const oldName = signedPledge?.name || '';
    setSignedPledge(null);
    setPledgeName('');
    localStorage.removeItem('cham_signed_pledge');
    showToast("Đã thu hồi cam kết", {
      description: `Đã xóa thông tin ký tên của ${oldName}. Bạn có thể điền lại thông tin mới.`,
      type: 'warning'
    });
  };

  return (
    <section id="empathy-hub-section" className="relative py-24 sm:py-32 bg-[#fafbfc] overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200/50" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-400/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-amber-400/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 shadow-xs rounded-full">
            Nền Tảng Đại Chúng
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Cổng Hành Động Trắc Ẩn Đa Vai Trò
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            Nâng cấp và cá nhân hóa trải nghiệm thấu cảm dựa trên vai trò của bạn. Hãy lựa chọn vai trò bên dưới để khám phá bộ công cụ hành động thực tế.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {[
            { id: 'student', label: 'Học sinh', icon: Smile, color: 'border-sky-500 text-sky-600 hover:bg-sky-50/50' },
            { id: 'parent', label: 'Phụ huynh', icon: Users, color: 'border-amber-500 text-amber-600 hover:bg-amber-50/50' },
            { id: 'teacher', label: 'Giáo viên & Nhà trường', icon: BookOpen, color: 'border-purple-500 text-purple-600 hover:bg-purple-50/50' },
            { id: 'community', label: 'Cộng đồng', icon: Award, color: 'border-pink-500 text-pink-600 hover:bg-pink-50/50' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                id={`hub-tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setDownloadProgress(null);
                }}
                className={`px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-xs border ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Display Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: STUDENT HUB */}
            {activeTab === 'student' && (
              <motion.div
                key="student-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Kindness challenge Left column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <GlowWrapper
                    borderRadius="rounded-3xl"
                    innerBg="bg-white"
                    glowColor="rgba(14, 165, 233, 0.2)"
                    className="w-full"
                    staticBorderColor="rgba(241, 245, 249, 1)"
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-xs font-mono text-sky-500 uppercase tracking-wider block mb-1">Thử thách mỗi ngày</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Thử Thách 7 Ngày Tử Tế cùng Lumi</h3>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-600 font-mono text-xs font-bold border border-sky-100 flex items-center gap-1">
                          <Smile className="w-3.5 h-3.5 text-sky-500 animate-bounce" />
                          <span>Đã làm: {completedDays.length}/7</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                        Mỗi ngày, hãy lật mở một thử thách hành động tử tế dưới đây. Hãy click để ghi dấu sau khi bạn hoàn thành sứ mệnh thấu cảm thực tế trong ngày nhé!
                      </p>

                      {/* Day Grid Selector */}
                      <div className="grid grid-cols-7 gap-2 mb-8">
                        {missions.map(m => {
                          const isCompleted = completedDays.includes(m.day);
                          const isActive = kindnessDay === m.day;
                          return (
                            <button
                              id={`kindness-day-btn-${m.day}`}
                              key={m.day}
                              onClick={() => setKindnessDay(m.day)}
                              className={`aspect-square rounded-xl font-mono font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer border ${
                                isCompleted 
                                  ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                                  : isActive
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                              }`}
                            >
                              <span>D{m.day}</span>
                              {isCompleted && <span className="text-[9px] mt-0.5">✓</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Mission Card Detail */}
                      <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100/60 flex flex-col justify-between items-start min-h-[160px]">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-sky-600 bg-sky-100/60 px-2.5 py-0.5 rounded-full font-bold">Ngày {kindnessDay}</span>
                            <h4 className="text-sm font-bold text-slate-800">{missions[kindnessDay-1].title}</h4>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mt-1 whitespace-pre-line">
                            {missions[kindnessDay-1].desc}
                          </p>
                        </div>

                        <button
                          id={`hub-complete-mission-btn-${kindnessDay}`}
                          onClick={() => toggleMissionComplete(kindnessDay)}
                          className={`mt-4 px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                            completedDays.includes(kindnessDay)
                              ? 'bg-amber-500 hover:bg-amber-600 text-white'
                              : 'bg-sky-500 hover:bg-sky-600 text-white'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{completedDays.includes(kindnessDay) ? "Huỷ đánh dấu" : "Tôi đã hoàn thành hôm nay!"}</span>
                        </button>
                      </div>
                    </div>
                  </GlowWrapper>
                </div>

                {/* Confession Box Right column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_40px_rgba(14,165,233,0.03)]">
                    <span className="text-xs font-mono text-indigo-500 uppercase tracking-wider block mb-1">Góc chia sẻ nội tâm</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-indigo-500" />
                      Lumi Confessions
                    </h3>

                    {/* Add Confession form */}
                    <form onSubmit={handleConfessionSubmit} className="flex flex-col gap-4 mb-8">
                      <div className="flex gap-2 items-center">
                        <select 
                          value={newConfessionRole} 
                          onChange={(e) => setNewConfessionRole(e.target.value)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-100"
                        >
                          <option value="Học sinh Lớp 10">Học sinh Lớp 10</option>
                          <option value="Học sinh Lớp 11">Học sinh Lớp 11</option>
                          <option value="Học sinh Lớp 12">Học sinh Lớp 12</option>
                          <option value="Phụ huynh học sinh">Phụ huynh học sinh</option>
                          <option value="Cựu học sinh">Cựu học sinh</option>
                        </select>
                        <span className="text-[10px] font-mono text-slate-400">Ẩn danh trọn vẹn</span>
                      </div>

                      <textarea 
                        rows={3}
                        placeholder="Hãy chia sẻ ẩn danh về một trải nghiệm bạn từng chứng kiến, băn khoăn hay đơn giản là một lời xin lỗi..."
                        value={newConfessionText}
                        onChange={(e) => setNewConfessionText(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 rounded-xl text-slate-800 font-sans text-xs focus:outline-none resize-none leading-relaxed"
                      />

                      <button
                        id="submit-confession-btn"
                        type="submit"
                        className="py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        Gửi tâm sự ẩn danh
                      </button>
                    </form>

                    {/* Scrolling Feed of Confessions */}
                    <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1.5 custom-scrollbar">
                      {confessions.map((c) => (
                        <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100/80 relative">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-indigo-500">{c.role}</span>
                            <span className="text-[9px] font-mono text-slate-400">{c.time}</span>
                          </div>
                          <p className="text-slate-700 text-xs leading-relaxed font-light italic">
                            “{c.text}”
                          </p>
                          <div className="flex justify-end mt-2">
                            <button
                              id={`like-conf-btn-${c.id}`}
                              onClick={() => handleConfessionLike(c.id)}
                              className="text-[10px] font-mono text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Heart className="w-3 h-3 fill-none hover:fill-red-500" />
                              <span>Đồng cảm ({c.likes})</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PARENT HUB */}
            {activeTab === 'parent' && (
              <motion.div
                key="parent-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Early warning checklist for parents */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <GlowWrapper
                    borderRadius="rounded-3xl"
                    innerBg="bg-white"
                    glowColor="rgba(245, 158, 11, 0.2)"
                    className="w-full"
                    staticBorderColor="rgba(241, 245, 249, 1)"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <ShieldAlert className="w-5.5 h-5.5 text-amber-500" />
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Cẩm nang Nhận Biết Khủng Hoảng Học Đường</h3>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm font-light mb-6 leading-relaxed">
                        Đôi khi con trẻ giữ im lặng trước sự cô lập hay bạo lực tinh thần để bảo vệ cha mẹ khỏi lo âu. Hãy tích chọn các dấu hiệu bất thường mà quý phụ huynh nhận thấy gần đây:
                      </p>

                      {/* Diagnostic Checklist */}
                      <div className="flex flex-col gap-3.5 mb-6">
                        {[
                          { key: 'item1', label: 'Con có biểu hiện từ chối hoặc tỏ ra vô cùng sợ hãi, mệt mỏi mỗi khi đến trường.' },
                          { key: 'item2', label: 'Kết quả học tập sa sút đột ngột hoặc mất tập trung kỳ lạ trong sinh hoạt.' },
                          { key: 'item3', label: 'Quần áo, sách vở hoặc dụng cụ học tập của con thường xuyên bị rách, hỏng không rõ lý do.' },
                          { key: 'item4', label: 'Con xuất hiện các vết thương bầm tím nhỏ bí ẩn nhưng thoái thác giải thích.' },
                          { key: 'item5', label: 'Con trở nên khép kín, cáu gắt vô cớ, mất ngủ hoặc thường xuyên thức giấc giữa đêm.' },
                          { key: 'item6', label: 'Con hoàn toàn né tránh nói về bạn bè hoặc không có bất cứ mối liên hệ nào ngoài giờ học.' }
                        ].map((item) => (
                          <label key={item.key} className="flex gap-3 items-start text-xs text-slate-600 font-normal leading-relaxed cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={(checklist as any)[item.key]}
                              onChange={() => setChecklist(prev => ({ ...prev, [item.key]: !(prev as any)[item.key] }))}
                              className="mt-0.5 rounded-sm border-slate-300 text-amber-500 focus:ring-amber-200 w-4 h-4"
                            />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Diagnostic Result Box */}
                      <div className={`p-5 rounded-2xl border ${parentIndicatorSummary().color} flex flex-col gap-2 transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Mức độ cần quan tâm:</span>
                          <span className="text-xs font-bold font-mono">{parentIndicatorSummary().level}</span>
                        </div>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                          {parentIndicatorSummary().advice}
                        </p>
                      </div>
                    </div>
                  </GlowWrapper>
                </div>

                {/* Parent-child dialogue starters */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_40px_rgba(245,158,11,0.03)]">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-wider block mb-1">Cầu nối yêu thương</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-amber-500 animate-spin-slow" />
                      Gợi Ý Đàm Thoại Mở Đồng Hành Cùng Con
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                      Thay vì những câu hỏi dồn dập về điểm số dễ tạo rào cản, quý phụ huynh có thể thử rút các thẻ câu hỏi gợi mở tâm lý dưới đây:
                    </p>

                    {/* Carousel Question starters */}
                    <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100/60 flex flex-col justify-between items-start min-h-[180px] relative overflow-hidden mb-6">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl pointer-events-none" />
                      
                      <div>
                        <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest block mb-2">Thẻ câu hỏi {parentCardIndex + 1} / 4</span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-3 italic">
                          “{parentConversationStarters[parentCardIndex].q}”
                        </h4>
                        <p className="text-slate-500 text-xs font-light leading-relaxed">
                          <strong className="text-slate-600 font-mono text-[10px] uppercase">Góc nhìn chuyên gia: </strong>
                          {parentConversationStarters[parentCardIndex].desc}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-6 justify-end w-full">
                        <button
                          id="prev-starter-card"
                          onClick={() => setParentCardIndex(prev => (prev - 1 + 4) % 4)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer text-xs"
                        >
                          ←
                        </button>
                        <button
                          id="next-starter-card"
                          onClick={() => setParentCardIndex(prev => (prev + 1) % 4)}
                          className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-1 cursor-pointer text-xs font-sans font-medium"
                        >
                          Thẻ tiếp theo
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: TEACHER HUB */}
            {activeTab === 'teacher' && (
              <motion.div
                key="teacher-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Simulated class lecture slides */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <GlowWrapper
                    borderRadius="rounded-3xl"
                    innerBg="bg-white"
                    glowColor="rgba(139, 92, 246, 0.2)"
                    className="w-full"
                    staticBorderColor="rgba(241, 245, 249, 1)"
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-xs font-mono text-purple-600 uppercase tracking-wider block mb-1">Tài nguyên đứng lớp</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Bộ Slide Giáo Án Sinh Hoạt 15 Phút</h3>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-600 font-mono text-xs font-bold border border-purple-100 flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 text-purple-500" />
                          <span>Slide {currentSlide + 1}/3</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                        Quý thầy cô có thể sử dụng slide tương tác trực quan ngay tại lớp học trong tiết sinh hoạt đầu tuần để khơi dậy nhận thức học sinh về hiệu ứng người bàng quan:
                      </p>

                      {/* Interactive slide frame */}
                      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white min-h-[250px] flex flex-col justify-between relative overflow-hidden mb-6 shadow-xl">
                        {/* Glowing backdrop circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />
                        
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-purple-400 font-sans border-b border-slate-800 pb-3 mb-4">
                            {classSlides[currentSlide].title}
                          </h4>
                          <ul className="flex flex-col gap-3">
                            {classSlides[currentSlide].bullets.map((b, i) => (
                              <li key={i} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 border-t border-slate-800/80 pt-4 flex justify-between items-center text-[10px] sm:text-xs">
                          <span className="text-slate-500 font-mono italic">“{classSlides[currentSlide].concept}”</span>
                          <div className="flex gap-1.5">
                            <button
                              id="prev-slide-btn"
                              disabled={currentSlide === 0}
                              onClick={() => setCurrentSlide(prev => prev - 1)}
                              className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white cursor-pointer"
                            >
                              Trước
                            </button>
                            <button
                              id="next-slide-btn"
                              disabled={currentSlide === 2}
                              onClick={() => setCurrentSlide(prev => prev + 1)}
                              className="px-2.5 py-1.5 rounded bg-purple-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-700 cursor-pointer font-sans"
                            >
                              Tiếp theo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowWrapper>
                </div>

                {/* Resource downloads Right column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_40px_rgba(139,92,246,0.03)]">
                    <span className="text-xs font-mono text-purple-600 uppercase tracking-wider block mb-1">Thư viện tài liệu</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Download className="w-5 h-5 text-purple-500" />
                      Tài Nguyên Sư Phạm Download
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                      Tải về tài liệu định dạng chuẩn (PDF, PPTX) được biên soạn bởi các chuyên gia tâm lý học đường thuộc ban cố vấn dự án Chạm:
                    </p>

                    {/* Downloadable list */}
                    <div className="flex flex-col gap-3">
                      {[
                        { name: "Cẩm_Nang_Thấu_Cảm_Học_Đường_2026.pdf", desc: "Hướng dẫn xây dựng CLB tâm lý tự quản lý", size: "4.8 MB" },
                        { name: "Slide_Bai_Giang_Cham_Sinh_Hoat.pptx", desc: "Slide bài giảng đầy đủ định dạng Microsoft PowerPoint", size: "12.5 MB" },
                        { name: "Bo_Tranh_Poster_Nhin_Bang_Trai_Tim.zip", desc: "Ảnh poster độ phân giải cao sẵn sàng in ấn khổ lớn", size: "38.2 MB" },
                        { name: "Phieu_Trac_Nghiem_Tam_Ly_Pre_Post.pdf", desc: "Biểu mẫu khảo sát tâm lý học sinh trước và sau can thiệp", size: "1.2 MB" }
                      ].map((doc, idx) => {
                        const isDownloadingThis = downloadProgress === doc.name;
                        return (
                          <div key={idx} className="p-4 rounded-xl border border-slate-100 hover:border-purple-200 bg-slate-50/50 hover:bg-white transition-all flex justify-between items-center gap-4">
                            <div className="flex gap-3 items-start overflow-hidden">
                              <FileText className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <div className="overflow-hidden">
                                <h4 className="text-xs font-bold text-slate-800 truncate">{doc.name}</h4>
                                <p className="text-[10px] text-slate-500 truncate mt-0.5">{doc.desc}</p>
                              </div>
                            </div>

                            <button
                              id={`download-doc-btn-${idx}`}
                              onClick={() => handleDownload(doc.name)}
                              className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all ${
                                isDownloadingThis 
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                              }`}
                            >
                              {isDownloadingThis ? `${downloadPercent}%` : doc.size}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {downloadProgress && (
                      <div className="mt-4 p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-center gap-2 text-xs text-purple-700">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang tạo link tải an toàn cho {downloadProgress}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: COMMUNITY HUB */}
            {activeTab === 'community' && (
              <motion.div
                key="community-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Pledge signing section */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_40px_rgba(236,72,153,0.03)]">
                    <span className="text-xs font-mono text-pink-600 uppercase tracking-wider block mb-1">Chiến dịch cam kết đại chúng</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Award className="w-5.5 h-5.5 text-pink-500" />
                      Bản Cam Kết Thắp Sáng Trắc Ẩn
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                      Hành động bắt đầu từ lời cam kết của trái tim. Hãy ký tên của bạn dưới đây để cùng đồng hành thắp sáng một môi trường học đường tràn đầy tình thương yêu:
                    </p>

                    {!signedPledge ? (
                      <form onSubmit={handlePledgeSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase">Họ và tên của bạn / Lớp học</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nhập tên của bạn hoặc ký danh..."
                            value={pledgeName}
                            onChange={(e) => setPledgeName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-pink-500 rounded-xl text-slate-800 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-pink-100"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase">Tỉnh / Thành phố sinh sống</label>
                          <select 
                            value={pledgeRegion}
                            onChange={(e) => setPledgeRegion(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl focus:outline-none"
                          >
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                            <option value="Bình Dương">Bình Dương</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Hải Phòng">Hải Phòng</option>
                            <option value="Đồng Nai">Đồng Nai</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                          </select>
                        </div>

                        {/* Checklist of Commitments */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Nội dung tôi cam kết</label>
                          {vietnameseCommitments.map((comm, idx) => {
                            const isChecked = selectedCommitments.includes(comm);
                            return (
                              <label key={idx} className="flex gap-2 items-start text-xs text-slate-600 font-normal leading-relaxed cursor-pointer select-none p-2 rounded-lg bg-slate-50/50 hover:bg-slate-50 border border-slate-100 transition-colors">
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => handleCommitmentToggle(comm)}
                                  className="mt-0.5 rounded-sm border-slate-300 text-pink-500 focus:ring-pink-200 w-3.5 h-3.5"
                                />
                                <span>{comm}</span>
                              </label>
                            );
                          })}
                        </div>

                        <button
                          id="submit-pledge-community-btn"
                          type="submit"
                          className="w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-sans font-medium text-xs shadow-md shadow-pink-500/10 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Ký cam kết thấu cảm</span>
                        </button>
                      </form>
                    ) : (
                      <div className="p-6 rounded-2xl bg-pink-50/40 border border-pink-100 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">✓</div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Cảm ơn {signedPledge.name}!</h4>
                          <p className="text-xs text-slate-500 font-light leading-relaxed mt-1">
                            Cam kết của bạn đã được lưu chính thức trên máy chủ dự án Chạm. Cùng nhau thắp sáng trắc ẩn!
                          </p>
                        </div>
                        <button
                          id="reset-pledge-btn"
                          onClick={handleResetPledge}
                          className="text-[10px] font-mono text-slate-400 hover:text-slate-600 underline cursor-pointer"
                        >
                          Thay đổi thông tin ký cam kết
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simulated Certificate generator Right column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <GlowWrapper
                    borderRadius="rounded-3xl"
                    innerBg="bg-white"
                    glowColor="rgba(236, 72, 153, 0.2)"
                    className="w-full h-full flex"
                    staticBorderColor="rgba(241, 245, 249, 1)"
                  >
                    <div className="p-8 w-full flex flex-col justify-between items-center text-center">
                      
                      {/* Counter of active pledges */}
                      <div className="mb-6">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">Cộng đồng thấu cảm trực tuyến</span>
                        <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-slate-900 flex items-center justify-center gap-2">
                          <motion.span
                            key={pledgeCount}
                            animate={animatePledgeCount ? { scale: [1, 1.25, 1], color: ['#0f172a', '#ec4899', '#0f172a'] } : {}}
                            transition={{ duration: 0.8 }}
                          >
                            {pledgeCount.toLocaleString('vi-VN')}
                          </motion.span>
                          <span className="text-sm text-slate-400 font-normal font-sans">chữ ký thấu cảm</span>
                        </div>
                      </div>

                      {/* Display Certificate inside card */}
                      <div className="w-full relative rounded-2xl border-4 border-double border-pink-100 p-6 sm:p-10 bg-radial-gradient from-white to-pink-50/20 shadow-inner flex flex-col justify-between items-center min-h-[300px] overflow-hidden">
                        {/* Decorative seals */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/5 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-500/5 blur-2xl pointer-events-none" />
                        
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-mono text-pink-600 uppercase tracking-[0.25em] font-bold">GIẤY CHỨNG NHẬN TRẮC ẨN</span>
                          <h4 className="text-base sm:text-xl font-bold font-sans text-slate-800 tracking-tight mt-2">ĐẠI SỨ CHIẾN DỊCH CHẠM</h4>
                          <div className="w-16 h-0.5 bg-pink-200 my-4" />
                        </div>

                        <div className="my-4">
                          <p className="text-[10px] font-mono text-slate-400">Trân trọng trao tặng cho:</p>
                          <p className="text-lg sm:text-2xl font-serif font-bold text-slate-900 mt-1 italic">
                            {signedPledge ? signedPledge.name : "Học sinh / Ký danh của bạn"}
                          </p>
                          <p className="text-[11px] text-slate-500 font-sans mt-3 px-4 max-w-md leading-relaxed font-light">
                            Đã dũng cảm đồng ý ký kết không bàng quan trước sự cô lập học đường, cam kết lắng nghe trắc ẩn và kiến tạo không gian sống tử tế.
                          </p>
                        </div>

                        <div className="w-full flex justify-between items-end text-[9px] font-mono text-slate-400 pt-6 border-t border-slate-100">
                          <div>
                            <div>Địa chỉ: <span className="text-slate-700 font-bold">{signedPledge ? signedPledge.region : "Chưa xác định"}</span></div>
                            <div>Thời gian: <span className="text-slate-700 font-bold">{signedPledge ? signedPledge.date : "Hôm nay"}</span></div>
                          </div>
                          <div className="text-right">
                            <div className="text-pink-500 font-bold font-serif italic text-xs mb-1">Project Chạm</div>
                            <div>Mã số: <span className="text-slate-700 font-bold">{signedPledge ? signedPledge.id : "CHAM-XXXXXX"}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Download/Share Actions */}
                      <div className="flex gap-3 mt-8 w-full justify-center">
                        <button
                          id="print-cert-btn"
                          onClick={() => {
                            if (!signedPledge) {
                              alert("Vui lòng điền thông tin ký cam kết ở cột bên trái trước khi tải chứng nhận!");
                              return;
                            }
                            handleDownload(`Chung_Nhan_Thau_Cam_${signedPledge.id}.pdf`);
                          }}
                          className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Tải chứng nhận PDF</span>
                        </button>
                        <button
                          id="share-cert-btn"
                          onClick={() => {
                            alert("Đã sao chép link chia sẻ chứng nhận đại sứ lên mạng xã hội!");
                          }}
                          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Chia sẻ thành tích</span>
                        </button>
                      </div>
                    </div>
                  </GlowWrapper>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
