import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle, MessageCircle, HelpCircle } from 'lucide-react';
import { interactiveStories } from '../data/comicData';
import { ComicChoice } from '../types';

export const InteractiveComicPage: React.FC = () => {
  const currentStory = interactiveStories[0];
  const currentScenario = currentStory.scenarios[0];
  const [selectedChoice, setSelectedChoice] = useState<ComicChoice | null>(null);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Giải Pháp Can Thiệp 4: Truyện Tranh Tương Tác Phân Nhánh</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {currentStory.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {currentStory.summary}
          </p>
        </div>

        {/* Comic Scene Storyboard Card */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-rose-100/80 shadow-md overflow-hidden p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Illustration */}
            <div className="md:col-span-6 rounded-2xl overflow-hidden bg-slate-100 h-72 sm:h-80 shadow-inner relative group">
              <img
                src={currentScenario.illustration}
                alt={currentScenario.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold backdrop-blur-xs">
                Chương {currentScenario.chapterNumber}: {currentScenario.title}
              </div>
            </div>

            {/* Situation & Character Emotional State */}
            <div className="md:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Bối Cảnh Tình Huống
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {currentScenario.situation}
                </p>
              </div>

              {/* Character State */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Trạng thái cảm xúc của nhân vật:</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  {currentScenario.characterState}
                </p>
              </div>
            </div>

          </div>

          {/* Decision Box: "Nếu là bạn, bạn sẽ chọn phản ứng thế nào?" */}
          <div className="pt-6 border-t border-slate-100 space-y-6">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Điểm Rẽ Quyết Định: Bạn sẽ chọn hành động như thế nào?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentScenario.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => setSelectedChoice(choice)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedChoice?.id === choice.id
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-[1.01]'
                      : 'bg-slate-50 hover:bg-rose-50/40 text-slate-800 border-slate-200'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {choice.text}
                  </p>
                </button>
              ))}
            </div>

            {/* Outcome & Psychological Empathy Analysis Feedback */}
            {selectedChoice && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-warm-ivory to-amber-50 border border-rose-200 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Phân Tích Tác Động Tâm Lý & Hệ Quả Hành Vi</span>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-200 text-rose-900">
                    Điểm thấu cảm: {selectedChoice.empathyScore}/5
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 space-y-1">
                    <strong className="text-slate-900 block font-semibold">Phản ứng tức thì từ môi trường:</strong>
                    <p className="text-slate-600">{selectedChoice.feedback.immediateReaction}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 space-y-1">
                    <strong className="text-slate-900 block font-semibold">Tác động cảm xúc lên bạn học:</strong>
                    <p className="text-slate-600">{selectedChoice.feedback.emotionalImpact}</p>
                  </div>
                </div>

                {/* LUMI Empathy Guidance Message */}
                <div className="p-4 rounded-2xl bg-white border border-rose-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Lời Khuyên Thấu Cảm Từ LUMI:</span>
                  </div>
                  <p className="font-handwriting text-xl sm:text-2xl text-slate-800 leading-relaxed">
                    “{selectedChoice.feedback.lumiGuidance}”
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedChoice(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thử chọn một phản ứng khác để xem kết quả</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
