import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Star, Bell, Smile, AlertCircle } from 'lucide-react';

export type LumiState = 
  | 'default'
  | 'heart'
  | 'star'
  | 'reading'
  | 'waving'
  | 'joy'
  | 'thanks'
  | 'send-love'
  | 'notification'
  | 'loading'
  | 'empty-search'
  | 'empty-bookmark'
  | '404';

interface LumiMascotProps {
  state?: LumiState;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  message?: string;
  className?: string;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({ 
  state = 'default',
  size = 'md', 
  interactive = true,
  message,
  className = ''
}) => {
  const [currentMood, setCurrentMood] = useState<LumiState>(state);
  const [showBubble, setShowBubble] = useState(false);

  // Sync state if prop changes
  React.useEffect(() => {
    setCurrentMood(state);
  }, [state]);

  const sizeDimensions = {
    xs: { px: 40, classes: 'w-10 h-10' },
    sm: { px: 64, classes: 'w-16 h-16' },
    md: { px: 96, classes: 'w-24 h-24 sm:w-28 sm:h-28' },
    lg: { px: 144, classes: 'w-36 h-36 sm:w-40 sm:h-40' },
    xl: { px: 200, classes: 'w-48 h-48 sm:w-56 sm:h-56' }
  };

  const getBubbleMessage = () => {
    if (message) return message;
    switch (currentMood) {
      case 'heart':
      case 'send-love':
        return 'Yêu thương luôn bên bạn!';
      case 'star':
      case 'joy':
        return 'Cùng LUMI tỏa sáng nhé!';
      case 'reading':
        return 'Học hỏi mỗi ngày với lòng trắc ẩn!';
      case 'waving':
      case 'default':
        return 'Chào bạn thân mến!';
      case 'thanks':
        return 'LUMI cảm ơn bạn rất nhiều!';
      case 'notification':
        return 'LUMI có điều mới muốn kể bạn nghe!';
      case 'loading':
        return 'LUMI đang chuẩn bị điều bất ngờ...';
      case 'empty-search':
        return 'LUMI chưa tìm thấy câu chuyện này!';
      case 'empty-bookmark':
        return 'Bạn chưa lưu câu chuyện nào!';
      case '404':
        return 'LUMI hình như đi lạc rồi!';
      default:
        return 'Nhìn bằng trái tim – Hành động bằng yêu thương!';
    }
  };

  const handleClick = () => {
    if (!interactive) return;
    const moods: LumiState[] = ['joy', 'heart', 'star', 'waving', 'thanks'];
    const next = moods[(moods.indexOf(currentMood) + 1) % moods.length];
    setCurrentMood(next);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3500);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {(showBubble || message || ['empty-search', 'empty-bookmark', '404', 'loading'].includes(currentMood)) && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl shadow-sky-500/10 border border-sky-100 text-xs font-semibold text-slate-700 whitespace-nowrap z-30 animate-in fade-in zoom-in-95 duration-200 flex items-center gap-1.5">
          {['heart', 'send-love', 'empty-bookmark'].includes(currentMood) ? (
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          ) : ['star', 'joy'].includes(currentMood) ? (
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          ) : currentMood === 'reading' || currentMood === 'empty-search' ? (
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
          ) : currentMood === '404' ? (
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          ) : (
            <Smile className="w-3.5 h-3.5 text-sky-500" />
          )}
          <span>{getBubbleMessage()}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-sky-100 rotate-45"></div>
        </div>
      )}

      {/* Mascot SVG Body */}
      <div 
        onClick={handleClick}
        className={`${sizeDimensions[size].classes} relative flex items-center justify-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300`}
        title="Linh vật LUMI – Lan tỏa lòng trắc ẩn"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-2 bg-sky-300/40 rounded-full blur-xl animate-pulse"></div>

        {/* SVG Mascot Graphic */}
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full drop-shadow-md z-10 overflow-visible"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Headphones Band */}
          <path 
            d="M 50 85 C 50 30, 150 30, 150 85" 
            stroke="#F59E0B" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          {/* Headphones Earmuff Left */}
          <rect x="34" y="65" width="22" height="42" rx="10" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          {/* Headphones Earmuff Right */}
          <rect x="144" y="65" width="22" height="42" rx="10" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />

          {/* Main Body Shape - Soft Sky Blue */}
          <ellipse cx="100" cy="115" rx="68" ry="62" fill="url(#lumiSkyGradient)" stroke="#38BDF8" strokeWidth="3" />

          {/* Glowing Belly Highlight */}
          <ellipse cx="100" cy="130" rx="42" ry="32" fill="#FFFFFF" fillOpacity="0.4" />

          {/* Cheeks - Rosy Pink */}
          <ellipse cx="64" cy="120" rx="9" ry="5.5" fill="#FDA4AF" fillOpacity="0.85" />
          <ellipse cx="136" cy="120" rx="9" ry="5.5" fill="#FDA4AF" fillOpacity="0.85" />

          {/* Eyes State Switch */}
          {['heart', 'send-love', 'empty-bookmark'].includes(currentMood) ? (
            <g className="animate-pulse">
              <path d="M 75 100 A 4 4 0 0 0 67 100 Q 71 108 75 112 Q 79 108 83 100 A 4 4 0 0 0 75 100" fill="#E11D48" />
              <path d="M 125 100 A 4 4 0 0 0 117 100 Q 121 108 125 112 Q 129 108 133 100 A 4 4 0 0 0 125 100" fill="#E11D48" />
            </g>
          ) : currentMood === 'joy' || currentMood === 'thanks' ? (
            <g>
              {/* Happy Arched Eyes ^^ */}
              <path d="M 62 102 Q 72 90 82 102" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 118 102 Q 128 90 138 102" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {/* Big Expressive Anime Eyes */}
              <ellipse cx="72" cy="100" rx="7.5" ry="11" fill="#0F172A" />
              <circle cx="70" cy="96" r="3.5" fill="#FFFFFF" />
              <circle cx="75" cy="104" r="1.5" fill="#FFFFFF" />

              <ellipse cx="128" cy="100" rx="7.5" ry="11" fill="#0F172A" />
              <circle cx="126" cy="96" r="3.5" fill="#FFFFFF" />
              <circle cx="131" cy="104" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Sweet Smile */}
          <path d="M 92 118 Q 100 128 108 118" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />

          {/* Held Items State */}
          {['heart', 'send-love', 'empty-bookmark'].includes(currentMood) && (
            <g className="animate-bounce" style={{ transformOrigin: 'center' }}>
              <path 
                d="M 100 148 C 94 138, 80 138, 80 150 C 80 162, 100 174, 100 174 C 100 174, 120 162, 120 150 C 120 138, 106 138, 100 148 Z" 
                fill="#F43F5E" 
                stroke="#BE123C" 
                strokeWidth="2" 
              />
            </g>
          )}

          {currentMood === 'star' && (
            <g className="animate-spin" style={{ transformOrigin: '100px 150px' }}>
              <polygon 
                points="100,132 105,145 119,145 108,154 112,168 100,159 88,168 92,154 81,145 95,145" 
                fill="#F59E0B" 
                stroke="#D97706" 
                strokeWidth="1.5" 
              />
            </g>
          )}

          {(currentMood === 'reading' || currentMood === 'empty-search') && (
            <g transform="translate(75, 138)">
              {/* Open Book */}
              <rect x="0" y="4" width="24" height="18" rx="2" fill="#3B82F6" />
              <rect x="26" y="4" width="24" height="18" rx="2" fill="#60A5FA" />
              <line x1="5" y1="9" x2="19" y2="9" stroke="#EFF6FF" strokeWidth="1.5" />
              <line x1="5" y1="14" x2="16" y2="14" stroke="#EFF6FF" strokeWidth="1.5" />
              <line x1="31" y1="9" x2="45" y2="9" stroke="#EFF6FF" strokeWidth="1.5" />
              <line x1="31" y1="14" x2="42" y2="14" stroke="#EFF6FF" strokeWidth="1.5" />
            </g>
          )}

          {currentMood === 'waving' && (
            <g className="animate-wave" style={{ transformOrigin: '155px 120px' }}>
              <path d="M 155 120 C 170 110, 180 95, 175 90 C 170 85, 155 105, 150 115" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            </g>
          )}

          {/* Little Floating Head Sparkle */}
          <g transform="translate(142, 45)" className="animate-pulse">
            <path d="M 10 0 L 12 7 L 19 10 L 12 12 L 10 19 L 7 12 L 0 10 L 7 7 Z" fill="#FBBF24" />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="lumiSkyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="60%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
