import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  ShieldAlert, 
  Target, 
  Brain, 
  HelpCircle, 
  Users, 
  BookOpen, 
  BarChart2, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Download,
  Flame,
  Award
} from 'lucide-react';
import { researchProjectData } from '../data/researchData';
import { ActiveNavPage } from '../types';
import { ResearchAnalyticsChart } from '../components/ResearchAnalyticsChart';

interface ResearchPageProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const navItems = [
    { id: 'intro', label: '1. Thông tin chung', icon: FileText },
    { id: 'rationale', label: '2. Bối cảnh & Lý do', icon: ShieldAlert },
    { id: 'objectives', label: '3. Mục tiêu nghiên cứu', icon: Target },
    { id: 'hypotheses', label: '4. Giả thuyết khoa học', icon: Brain },
    { id: 'questions', label: '5. Câu hỏi nghiên cứu', icon: HelpCircle },
    { id: 'sample', label: '6. Mẫu & Khách thể', icon: Users },
    { id: 'theory', label: '7. Cơ sở lý luận', icon: BookOpen },
    { id: 'methodology', label: '8. Phương pháp & Kiểm định', icon: BarChart2 },
    { id: 'solutions', label: '9. Hệ sinh thái 6 giải pháp', icon: Layers },
  ];

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
            <span>Hồ Sơ Khoa Học Hành Vi THPT 2024–2025</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            {researchProjectData.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Công trình nghiên cứu khoa học hành vi thực nghiệm về lòng trắc ẩn của học sinh THPT dưới tác động của truyền thông thị giác có định hướng.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('survey')}
              className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Tham gia phiếu khảo sát thực nghiệm</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-xs space-y-2 sticky top-24">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pb-2 block border-b border-slate-100">
              Mục lục công trình
            </span>
            <div className="space-y-1 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-rose-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xs space-y-8 min-h-[500px]">
            
            {/* Section 1: Intro */}
            {activeSection === 'intro' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mục 1</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                  {researchProjectData.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 block">Lĩnh vực nghiên cứu:</span>
                    <strong className="text-slate-800">{researchProjectData.academicField}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 block">Đơn vị thực hiện:</span>
                    <strong className="text-slate-800">{researchProjectData.institution}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 block">Quy mô mẫu:</span>
                    <strong className="text-slate-800">{researchProjectData.sampleSize}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 block">Địa bàn khảo sát:</span>
                    <strong className="text-slate-800">{researchProjectData.location}</strong>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Tóm tắt đề tài (Abstract)</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {researchProjectData.context.problemStatement}
                  </p>
                </div>
              </div>
            )}

            {/* Section 2: Rationale */}
            {activeSection === 'rationale' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Mục 2</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Bối Cảnh & Lý Do Chọn Đề Tài
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {researchProjectData.context.problemStatement}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {researchProjectData.context.socialMediaStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="font-display font-bold text-xl text-rose-600">{stat.value}</span>
                      <strong className="text-xs text-slate-800 block">{stat.label}</strong>
                      <span className="text-[11px] text-slate-500">{stat.detail}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                  <strong className="text-emerald-900 block font-display text-base">Tính cấp thiết & Giải pháp:</strong>
                  <p className="text-xs sm:text-sm text-slate-700">
                    {researchProjectData.context.justification}
                  </p>
                </div>
              </div>
            )}

            {/* Section 3: Objectives */}
            {activeSection === 'objectives' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Mục 3</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Mục Tiêu Nghiên Cứu Cụ Thể
                </h2>
                <div className="space-y-4">
                  {researchProjectData.objectives.map((obj) => (
                    <div key={obj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {obj.id.slice(-1)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{obj.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{obj.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Hypotheses */}
            {activeSection === 'hypotheses' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Mục 4</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Giả Thuyết Khoa Học (Hypotheses)
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {researchProjectData.hypotheses.map(hyp => (
                    <div key={hyp.id} className="p-5 rounded-2xl bg-gradient-to-r from-rose-50/60 to-warm-ivory border border-rose-100 space-y-1.5">
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{hyp.code}</span>
                      <h4 className="font-display font-bold text-base text-slate-900">{hyp.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{hyp.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Questions */}
            {activeSection === 'questions' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Mục 5</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Câu Hỏi Nghiên Cứu
                </h2>
                <div className="space-y-4">
                  {researchProjectData.questions.map(q => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 flex items-start gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 shrink-0 mt-0.5">{q.num}</span>
                      <p className="text-xs sm:text-sm font-medium text-slate-800">{q.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Sample */}
            {activeSection === 'sample' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Mục 6</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Đối Tượng Nghiên Cứu & Khách Thể
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-rose-50 rounded-2xl text-center">
                    <div className="font-display font-bold text-2xl text-rose-600">300</div>
                    <div className="text-xs text-slate-600 font-medium">Học sinh khảo sát</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl text-center">
                    <div className="font-display font-bold text-2xl text-amber-600">10, 11, 12</div>
                    <div className="text-xs text-slate-600 font-medium">Khối lớp tham gia</div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl text-center">
                    <div className="font-display font-bold text-2xl text-emerald-600">{researchProjectData.institution}</div>
                    <div className="text-xs text-slate-600 font-medium">Địa bàn khảo sát</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mẫu nghiên cứu được lựa chọn ngẫu nhiên phân tầng đại diện cho 3 khối học sinh THPT với tỉ lệ cân bằng giới tính nhằm đảm bảo tính khách quan và khoa học.
                </p>
              </div>
            )}

            {/* Section 7: Theory */}
            {activeSection === 'theory' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mục 7</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Cơ Sở Lý Luận & Mô Hình Chuyển Hóa
                </h2>
                
                {/* 5-Stage Diagram */}
                <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Sơ đồ 5 bước chuyển hóa hành vi LUMI
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {researchProjectData.empathyFlow.map((step) => (
                      <div key={step.step} className="p-3 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                        <span className="text-xs font-bold text-rose-400 block">Bước {step.step}: {step.label}</span>
                        <span className="text-[10px] text-slate-300 block leading-tight">{step.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-base text-slate-800">Các lý thuyết nền tảng:</h4>
                  <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                    {researchProjectData.theories.map((theory, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900 block font-semibold">{theory.name}</strong>
                        <p className="text-slate-600">{theory.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 8: Methodology */}
            {activeSection === 'methodology' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Mục 8</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Phương Pháp & Quy Trình Kiểm Định Thống Kê
                </h2>
                
                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <p className="text-slate-600">{researchProjectData.methodology.design}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {researchProjectData.methodology.tools.map((t, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
                        <span className="font-bold text-rose-800 block text-xs uppercase">{t.name}</span>
                        <p className="text-xs text-slate-600">{t.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <strong className="text-slate-900 block font-semibold">Quy trình thực nghiệm:</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {researchProjectData.methodology.pipeline.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Pre/Post Test Analytics Chart */}
                  <div className="pt-4">
                    <ResearchAnalyticsChart />
                  </div>
                </div>
              </div>
            )}

            {/* Section 9: Solutions */}
            {activeSection === 'solutions' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Mục 9</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Hệ Sinh Thái 6 Giải Pháp Can Thiệp Của Dự Án
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {researchProjectData.solutions.map((sol) => (
                    <div key={sol.num} className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Giải pháp {sol.num}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{sol.type}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900">{sol.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{sol.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
