import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, CheckCircle, BarChart3, PieChart, ShieldCheck, Sparkles } from 'lucide-react';

const PRE_POST_DATA = [
  {
    category: 'Chỉ số Trắc ẩn Số',
    preTest: 52,
    postTest: 89,
    growth: '+37%'
  },
  {
    category: 'Nhận diện Vô cảm',
    preTest: 44,
    postTest: 92,
    growth: '+48%'
  },
  {
    category: 'Hành động Tử tế',
    preTest: 38,
    postTest: 81,
    growth: '+43%'
  },
  {
    category: 'Lắng nghe Đồng cảm',
    preTest: 49,
    postTest: 86,
    growth: '+37%'
  }
];

const RADAR_DIMENSIONS = [
  { dimension: 'Nhận thức Thấu cảm', val: 88, fullMark: 100 },
  { dimension: 'Cảm xúc Đồng điệu', val: 94, fullMark: 100 },
  { dimension: 'Hành động Trắc ẩn', val: 85, fullMark: 100 },
  { dimension: 'Bao dung Học đường', val: 82, fullMark: 100 },
  { dimension: 'Chia sẻ Tích cực', val: 91, fullMark: 100 },
  { dimension: 'Tự điều chỉnh Cảm xúc', val: 86, fullMark: 100 }
];

const GRADE_DISTRIBUTION = [
  { grade: 'Khối 10', count: 102, percentage: '34%' },
  { grade: 'Khối 11', count: 108, percentage: '36%' },
  { grade: 'Khối 12', count: 90, percentage: '30%' }
];

export const ResearchAnalyticsChart: React.FC = () => {
  const [activeGradeFilter, setActiveGradeFilter] = useState<'all' | '10' | '11' | '12'>('all');
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-rose-100 shadow-sm space-y-8">
      
      {/* Visualizer Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-lg sm:text-xl text-slate-900">
              Trực Quan Hóa Kết Quả Thực Nghiệm Pre/Post Test
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mẫu kiểm định thực nghiệm trên 300 học sinh THPT (p &lt; 0.001, t = 8.42)
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              chartType === 'bar' ? 'bg-white text-rose-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            So sánh Pre/Post
          </button>
          <button
            onClick={() => setChartType('radar')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              chartType === 'radar' ? 'bg-white text-rose-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tọa độ Thấu cảm
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100/80">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Tăng trưởng Trung bình</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">+41.2%</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Sau tác động truyền thông</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100">
          <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Học sinh Khảo sát</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">300</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Khối 10, 11, 12 cấp THPT</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider block">Độ Tin Cậy Cronbach's α</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">0.887</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Mức độ nhất quán rất cao</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">Ý Nghĩa Thống Kê</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">p &lt; .001</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Khác biệt có ý nghĩa khoa học</span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-100">
        {chartType === 'bar' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <span>Tỷ lệ (%) Thay đổi Chỉ số Cảm xúc Trước & Sau Chiến Dịch</span>
              </h4>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-300" />
                  <span>Pre-Test (Trước tác động)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-500" />
                  <span>Post-Test (Sau tác động)</span>
                </span>
              </div>
            </div>

            <div className="h-[320px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRE_POST_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="category" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', border: 'none' }}
                    formatter={(val: any) => [`${val}%`, 'Tỷ lệ']}
                  />
                  <Bar dataKey="preTest" name="Trước tác động (Pre-test)" fill="#94A3B8" radius={[6, 6, 0, 0]} barSize={28} />
                  <Bar dataKey="postTest" name="Sau tác động (Post-test)" fill="#F43F5E" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-800 text-center">
              Biểu Đồ Tọa Độ 6 Chiều Phát Triển Lòng Trắc Ẩn Số
            </h4>
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DIMENSIONS}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#334155', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} unit="%" />
                  <Radar name="Chỉ số Thấu cảm" dataKey="val" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.4} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Mức độ']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Grade Breakdown Cards */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm text-slate-800">Cơ Cấu Mẫu Khảo Sát Theo Khối Lớp:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GRADE_DISTRIBUTION.map((g, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900">{g.grade}</span>
                <span className="text-xs text-slate-500 block">{g.count} học sinh THPT</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-extrabold text-xs">
                {g.percentage}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
