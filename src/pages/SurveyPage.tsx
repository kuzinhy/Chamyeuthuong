import React, { useState } from 'react';
import { GraduationCap, Award, Send, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surveyQuestions } from '../data/surveyData';
import { ResearchAnalyticsChart } from '../components/ResearchAnalyticsChart';

interface SurveyPageProps {
  onSubmitSurvey: (submission: {
    surveyType: 'pre-test' | 'post-test';
    studentGender: string;
    studentGrade: string;
    schoolName: string;
    answers: Record<string, number>;
  }) => void;
}

export const SurveyPage: React.FC<SurveyPageProps> = ({ onSubmitSurvey }) => {
  const [surveyType, setSurveyType] = useState<'pre-test' | 'post-test'>('pre-test');
  const [studentGender, setStudentGender] = useState('Nữ');
  const [studentGrade, setStudentGrade] = useState('Khối 11');
  const [schoolName, setSchoolName] = useState('Trường THPT');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(0);

  const totalQuestions = surveyQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectScore = (code: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [code]: score
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      alert(`Bạn còn ${totalQuestions - answeredCount} câu hỏi chưa trả lời. Hãy hoàn thành tất cả các mục nhé!`);
      return;
    }

    const totalScore = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);
    const avgScore = Number((totalScore / totalQuestions).toFixed(2));
    setCalculatedScore(avgScore);

    onSubmitSurvey({
      surveyType,
      studentGender,
      studentGrade,
      schoolName,
      answers
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCompleted(true);
  };

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
            <span>Phiếu Đo Lường Thực Nghiệm Khoa Học</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Khảo Sát Chỉ Số Thấu Cảm & Trắc Ẩn
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Phiếu khảo sát Likert 5 mức độ phục vụ nghiên cứu thực nghiệm đề tài Khoa học Hành vi LUMI. Ý kiến chân thực của bạn là đóng góp quý báu cho công trình nghiên cứu.
          </p>
        </div>

        {completed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-rose-200 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Cảm Ơn Bạn Đã Hoàn Thành Khảo Sát!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Dữ liệu của bạn đã được mã hóa bảo mật và lưu trữ phục vụ phân tích thống kê T-Test và Cronbach’s Alpha.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-100 max-w-md mx-auto space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase">Điểm thấu cảm trung bình của bạn:</span>
              <div className="font-display font-extrabold text-4xl text-rose-600">
                {calculatedScore} / 5.0
              </div>
              <p className="text-xs text-slate-500">
                {calculatedScore >= 4.0 ? 'Bạn có chỉ số thấu cảm và tinh thần tương thân tương ái rất cao!' : 'Cùng LUMI lan tỏa thêm nhiều thấu cảm mỗi ngày nhé!'}
              </p>
            </div>

            {/* Embedded Live Analytics Chart */}
            <div className="text-left pt-6 border-t border-slate-100">
              <ResearchAnalyticsChart />
            </div>

            <button
              onClick={() => {
                setCompleted(false);
                setAnswers({});
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
            >
              Làm lại bài khảo sát mới
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Sticky progress bar */}
            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs sticky top-24 z-20 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Tiến độ hoàn thành: {answeredCount}/{totalQuestions} câu</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Part A: Demographic info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-5">
              <h3 className="font-display font-bold text-lg text-slate-900 pb-2 border-b border-slate-100">
                Phần A: Thông Tin Nhân Khẩu Học (Bảo mật 100%)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giai đoạn đo lường</label>
                  <select
                    value={surveyType}
                    onChange={(e) => setSurveyType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="pre-test">Pre-test (Trước can thiệp)</option>
                    <option value="post-test">Post-test (Sau can thiệp)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giới tính</label>
                  <select
                    value={studentGender}
                    onChange={(e) => setStudentGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="Nữ">Nữ</option>
                    <option value="Nam">Nam</option>
                    <option value="Khác">Khác / Không muốn tiết lộ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Khối lớp</label>
                  <select
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="Khối 10">Khối 10</option>
                    <option value="Khối 11">Khối 11</option>
                    <option value="Khối 12">Khối 12</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Part B: Likert scale questions */}
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900">
                <strong>Quy ước đánh giá (Thang đo Likert 5 mức độ):</strong> 1 = Hoàn toàn không đồng ý • 2 = Không đồng ý • 3 = Trung lập • 4 = Đồng ý • 5 = Hoàn toàn đồng ý.
              </div>

              {surveyQuestions.map((q, idx) => (
                <div 
                  key={q.code}
                  className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {q.groupName} • {q.code}
                      </span>
                      <h4 className="font-display font-medium text-sm sm:text-base text-slate-900 leading-snug">
                        {q.text}
                      </h4>
                    </div>
                  </div>

                  {/* 5 Score Options */}
                  <div className="grid grid-cols-5 gap-2 pt-2">
                    {[1, 2, 3, 4, 5].map((score) => {
                      const isSelected = answers[q.code] === score;
                      return (
                        <button
                          type="button"
                          key={score}
                          onClick={() => handleSelectScore(q.code, score)}
                          className={`py-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-rose-500 text-white border-rose-500 font-bold shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50/60'
                          }`}
                        >
                          <span className="text-sm sm:text-base font-bold">{score}</span>
                          <span className="text-[9px] sm:text-[10px] hidden sm:block opacity-80 leading-none">
                            {score === 1 ? 'Rất không đồng ý' : score === 2 ? 'Không đồng ý' : score === 3 ? 'Trung lập' : score === 4 ? 'Đồng ý' : 'Rất đồng ý'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Bar */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-lg text-center space-y-4">
              <button
                type="submit"
                disabled={answeredCount < totalQuestions}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-95"
              >
                <Send className="w-5 h-5" />
                <span>Gửi kết quả khảo sát ({answeredCount}/{totalQuestions})</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
