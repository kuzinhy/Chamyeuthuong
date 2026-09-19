import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Calendar, Heart, Share2, Sparkles, ExternalLink, Eye, Check, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { Story } from '../types';
import { LumiMascot } from './LumiMascot';

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
  onLikeStory: (id: string) => void;
  onSelectStory: (story: Story) => void;
  allStories: Story[];
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onLikeStory,
  onSelectStory,
  allStories
}) => {
  const [copied, setCopied] = useState(false);
  const [likedAnimation, setLikedAnimation] = useState(false);

  // AI Speech Audiobook state
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [story?.id]);

  if (!story) return null;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ đọc thành tiếng Web Speech API.');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      return;
    }

    window.speechSynthesis.cancel();
    
    const textToRead = `${story.title}. ${story.excerpt || ''}. ${story.content?.replace(/<[^>]*>?/gm, '') || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onstart = () => setIsPlayingSpeech(true);
    utterance.onend = () => setIsPlayingSpeech(false);
    utterance.onerror = () => setIsPlayingSpeech(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const relatedStories = (allStories || [])
    .filter(s => s && s.id !== story.id && (s.category === story.category || s.region === story.region))
    .slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBigLike = () => {
    onLikeStory(story.id);
    setLikedAnimation(true);
    setTimeout(() => setLikedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[820px] bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-20 px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              {story.category}
            </span>
            {story.province && (
              <span className="text-xs text-[#64748B] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                {story.province}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
              title="Chia sẻ liên kết"
            >
              {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content: Max width 760px - 820px */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          
          {/* Article Header: Title 28px - 34px, font-bold, #0F172A */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0F172A] tracking-tight leading-snug">
              {story.title}
            </h1>

            {/* Meta Info: Author / Source, Date, Province, Likes, Views */}
            <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap pt-1 border-b border-[#E2E8F0] pb-4">
              <span className="font-semibold text-[#0F172A]">
                Nguồn: {story.sourceName || 'LUMI'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {story.publishedAt || 'Hôm nay'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#DC2626]">
                <Heart className="w-3.5 h-3.5 fill-[#DC2626]" />
                {story.likes || 0} lượt lan tỏa
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {story.views || 0} lượt xem
              </span>
            </div>
          </div>

          {/* AI Audio Story Reader Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50 border border-cyan-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSpeech}
                className={`p-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                  isPlayingSpeech 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                }`}
              >
                {isPlayingSpeech ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Tạm Dừng Đọc</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Nghe Đọc Câu Chuyện (Giọng LUMI AI)</span>
                  </>
                )}
              </button>

              {isPlayingSpeech && (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-1 h-5 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="w-1 h-4 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs font-semibold text-cyan-900 ml-1">Đang phát audio...</span>
                </div>
              )}
            </div>

            {/* Speed selection */}
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Tốc độ:</span>
              {[1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    speechRate === rate 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* 16:9 Large Cover Image */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-video w-full border border-[#E2E8F0]">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead paragraph */}
          <p className="text-base sm:text-lg font-medium text-[#1E293B] leading-relaxed italic border-l-4 border-[#2563EB] pl-4 bg-[#EFF6FF]/60 py-3 rounded-r-xl">
            {story.excerpt}
          </p>

          {/* Long-form Article Body: 16-17px, line-height 1.7, #334155 */}
          <div className="text-[16px] sm:text-[17px] text-[#334155] leading-[1.7] space-y-4 whitespace-pre-line font-normal">
            {story.content}
          </div>

          {/* Featured Message Block: Box #EFF6FF, border trái 4px #2563EB, padding 16px */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#EFF6FF] border-l-4 border-[#2563EB] border border-[#BFDBFE] space-y-2 relative">
            <div className="flex items-center gap-2 text-[#2563EB] text-sm font-bold">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Thông điệp nhân văn từ LUMI</span>
            </div>
            <p className="text-base sm:text-lg text-[#0F172A] font-medium leading-relaxed italic">
              “{story.message || 'Mỗi hành động tử tế là một ngọn nến thắp sáng niềm tin và lòng trắc ẩn trong tâm hồn mỗi học sinh.'}”
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Lan tỏa tình yêu thương đến cộng đồng học đường</span>
            </div>
          </div>

          {/* Big Like Button at the end of article */}
          <div className="pt-6 pb-2 text-center relative">
            {likedAnimation && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex gap-2 pointer-events-none animate-bounce">
                <Heart className="w-6 h-6 text-[#DC2626] fill-[#DC2626]" />
                <Heart className="w-8 h-8 text-[#2563EB] fill-[#2563EB]" />
                <Heart className="w-5 h-5 text-[#DC2626] fill-[#DC2626]" />
              </div>
            )}
            
            <button
              onClick={handleBigLike}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base shadow-lg shadow-[#2563EB]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Heart className={`w-5 h-5 fill-white ${likedAnimation ? 'scale-125' : ''} transition-transform`} />
              <span>Lan tỏa câu chuyện này ({story.likes || 0})</span>
            </button>
            <p className="text-xs text-[#64748B] mt-2">
              Nhấn để gửi một trái tim cảm kích đến tấm gương người tốt việc tốt này
            </p>
          </div>

          {/* Official Source Reference */}
          {story.sourceUrl && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
              <span>Nguồn gốc bài viết: <strong className="text-[#0F172A]">{story.sourceName}</strong></span>
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Xem bản tin gốc</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="pt-6 border-t border-[#E2E8F0] space-y-4">
              <h3 className="font-bold text-lg text-[#0F172A]">
                Câu Chuyện Tử Tế Liên Quan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedStories.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectStory(rel)}
                    className="p-3.5 rounded-2xl border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/40 transition-all cursor-pointer flex gap-3.5 items-center group bg-white shadow-xs"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
