import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, BarChart2, Users, FileText } from 'lucide-react';
import { researchProjectData } from '../../data/researchData';
import { ActiveNavPage } from '../../types';

interface ResearchSectionProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onNavigate }) => {
  return (
    <section id="research-home-section" className="py-20 sm:py-28 bg-[#faf8f5] border-t border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Nghiên Cứu Khoa Học Hành Vi Học Đường</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Cơ Sở Khoa Học Đề Tài LUMI
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Đề tài: <em>“Tác động truyền thông thị giác có định hướng đến sự thay đổi hành vi trắc ẩn của học sinh trung học phổ thông”</em>
          </p>
        </div>

        {/* 4 Clean Visual Infographic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="p-6 rounded-3xl bg-white hover:bg-rose-50/30 border border-rose-100/80 hover:border-rose-300 shadow-xs hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-2 transition-all duration-300 space-y-3 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Đối tượng mẫu</span>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">300 Học Sinh</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Khối 10, 11, 12 cấp Trung học phổ thông tham gia thực nghiệm.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white hover:bg-amber-50/30 border border-rose-100/80 hover:border-amber-300 shadow-xs hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-300 space-y-3 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Phương pháp</span>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">Pre-test / Post-test</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Đo lường trước và sau can thiệp thị giác để so sánh biến đổi hành vi.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white hover:bg-sky-50/30 border border-rose-100/80 hover:border-sky-300 shadow-xs hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 space-y-3 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Phân tích dữ liệu</span>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">Cronbach’s & T-Test</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Kiểm định độ tin cậy thang đo (ND, TX, TA) và ý nghĩa thống kê.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white hover:bg-emerald-50/30 border border-rose-100/80 hover:border-emerald-300 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 space-y-3 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Nền tảng lý thuyết</span>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">Albert Bandura</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Lý thuyết học tập xã hội & Mô hình chuyển hóa Thấu cảm → Trắc ẩn.</p>
            </div>
          </div>

        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('research')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 lumi-btn-shine transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <span>Tìm hiểu chi tiết đề tài nghiên cứu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('survey')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-0.5 lumi-btn-shine transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <span>Tham gia làm phiếu khảo sát</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
