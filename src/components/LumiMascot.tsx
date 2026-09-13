import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Smile, AlertCircle } from 'lucide-react';

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
  expression?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  interactive?: boolean;
  message?: string;
  className?: string;
  onMoodChange?: (mood: LumiState) => void;
  hideInternalBubble?: boolean;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({ 
  state,
  expression,
  size = 'md', 
  interactive = true,
  message,
  className = '',
  onMoodChange,
  hideInternalBubble = false
}) => {
  const resolveInitialMood = (): LumiState => {
    if (expression) {
      if (expression === 'love') return 'heart';
      if (expression === 'concerned') return 'notification';
      if (expression === 'happy') return 'joy';
      return (expression as LumiState) || 'default';
    }
    return state || 'default';
  };

  const [currentMood, setCurrentMood] = useState<LumiState>(resolveInitialMood());
  const [showBubble, setShowBubble] = useState(false);

  React.useEffect(() => {
    setCurrentMood(resolveInitialMood());
  }, [state, expression]);

  const sizeDimensions: Record<string, { px: number; classes: string }> = {
    xs: { px: 40, classes: 'w-10 h-10' },
    sm: { px: 64, classes: 'w-16 h-16' },
    md: { px: 96, classes: 'w-24 h-24 sm:w-28 sm:h-28' },
    lg: { px: 144, classes: 'w-36 h-36 sm:w-40 sm:h-40' },
    xl: { px: 200, classes: 'w-48 h-48 sm:w-56 sm:h-56' }
  };

  let sizeClass = '';
  let sizeStyle: React.CSSProperties | undefined = undefined;

  if (typeof size === 'number') {
    sizeStyle = { width: `${size}px`, height: `${size}px` };
  } else if (typeof size === 'string' && sizeDimensions[size]) {
    sizeClass = sizeDimensions[size].classes;
  } else {
    sizeClass = sizeDimensions.md.classes;
  }

  const getBubbleMessage = () => {
    if (message) return message;
    switch (currentMood) {
      case 'heart':
      case 'send-love':
        return 'Nhìn bằng trái tim – Yêu thương bằng hành động!';
      case 'star':
      case 'joy':
        return 'Cùng LUMI lan tỏa việc tốt nhé!';
      case 'reading':
        return 'Học hỏi mỗi ngày với lòng trắc ẩn!';
      case 'waving':
      case 'default':
        return 'Chào bạn thân mến!';
      case 'thanks':
        return 'LUMI cảm ơn bạn rất nhiều!';
      case 'notification':
        return 'LUMI có điều mới muốn chia sẻ!';
      case 'loading':
        return 'LUMI đang chuẩn bị...';
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
    const moods: LumiState[] = ['heart', 'joy', 'star', 'thanks', 'waving'];
    const next = moods[(moods.indexOf(currentMood) + 1) % moods.length];
    setCurrentMood(next);
    onMoodChange?.(next);
    if (!hideInternalBubble) {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3500);
    }
  };

  const isJoy = currentMood === 'joy' || currentMood === 'thanks';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {!hideInternalBubble && (showBubble || message || ['empty-search', 'empty-bookmark', '404', 'loading'].includes(currentMood)) && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-100 text-xs font-semibold text-slate-700 whitespace-nowrap z-30 animate-in fade-in zoom-in-95 duration-200 flex items-center gap-1.5">
          {['heart', 'send-love', 'empty-bookmark'].includes(currentMood) ? (
            <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
          ) : ['star', 'joy'].includes(currentMood) ? (
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          ) : currentMood === 'reading' || currentMood === 'empty-search' ? (
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          ) : currentMood === '404' ? (
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          ) : (
            <Smile className="w-3.5 h-3.5 text-blue-500" />
          )}
          <span>{getBubbleMessage()}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-blue-100 rotate-45"></div>
        </div>
      )}

      {/* Official Mascot SVG Graphic */}
      <div 
        onClick={handleClick}
        style={sizeStyle}
        className={`${sizeClass} relative flex items-center justify-center ${interactive ? 'cursor-pointer' : ''} transform hover:scale-105 active:scale-95 transition-all duration-300`}
        title="Linh vật LUMI – Lan tỏa lòng trắc ẩn"
      >
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full drop-shadow-md z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`lumiBodyGrad_${currentMood}`} cx="38%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="18%" stopColor="#E0F2FE" />
              <stop offset="55%" stopColor="#7DD3FC" />
              <stop offset="85%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>

            <linearGradient id={`lumiGoldGrad_${currentMood}`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id={`lumiOrangeGrad_${currentMood}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>

            <radialGradient id={`lumiEyeIris_${currentMood}`} cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="35%" stopColor="#1E3A8A" />
              <stop offset="65%" stopColor="#2563EB" />
              <stop offset="88%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#38BDF8" />
            </radialGradient>

            <linearGradient id={`lumiHeartGrad_${currentMood}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="25%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#FBBF24" />
              <stop offset="90%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <filter id={`heartGlow_${currentMood}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT SOFT SHADOW */}
          <ellipse cx="250" cy="468" rx="110" ry="18" fill="#0F172A" fillOpacity="0.12" />

          {/* HEADPHONE CONNECTOR BAND BEHIND HEAD */}
          <path d="M 120 220 C 105 100, 395 100, 380 220" fill="none" stroke="#D97706" strokeWidth="18" strokeLinecap="round" />
          <path d="M 120 220 C 105 100, 395 100, 380 220" fill="none" stroke="#FBBF24" strokeWidth="12" strokeLinecap="round" />

          {/* BODY & LEGS BASE */}
          <g id="body-and-legs">
            <path d="M 190 330 C 170 370, 165 425, 210 435 C 235 438, 245 400, 250 400 C 255 400, 265 438, 290 435 C 335 425, 330 370, 310 330 Z" 
                  fill={`url(#lumiBodyGrad_${currentMood})`} stroke="#0284C7" strokeWidth="6" strokeLinejoin="round" />

            {/* Left Golden Shoe */}
            <ellipse cx="205" cy="452" rx="36" ry="18" fill={`url(#lumiOrangeGrad_${currentMood})`} stroke="#9A3412" strokeWidth="4" />
            <ellipse cx="205" cy="448" rx="32" ry="14" fill={`url(#lumiGoldGrad_${currentMood})`} />
            <ellipse cx="202" cy="445" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.75" />

            {/* Right Golden Shoe */}
            <ellipse cx="295" cy="452" rx="36" ry="18" fill={`url(#lumiOrangeGrad_${currentMood})`} stroke="#9A3412" strokeWidth="4" />
            <ellipse cx="295" cy="448" rx="32" ry="14" fill={`url(#lumiGoldGrad_${currentMood})`} />
            <ellipse cx="292" cy="445" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.75" />
          </g>

          {/* HEAD & DROPLET SILHOUETTE */}
          <g id="head">
            <path d="
              M 250 35
              C 260 22, 275 25, 278 40
              C 280 58, 268 70, 258 88
              C 320 105, 395 160, 388 250
              C 382 320, 315 350, 250 350
              C 185 350, 118 320, 112 250
              C 105 160, 180 105, 242 88
              C 232 70, 222 55, 230 40
              C 235 30, 244 26, 250 35 Z
            " 
            fill={`url(#lumiBodyGrad_${currentMood})`} 
            stroke="#0284C7" 
            strokeWidth="7" 
            strokeLinejoin="round" />

            {/* Top Tuft Droplet Highlight Curve */}
            <path d="M 245 48 C 255 35, 268 40, 268 52 C 265 65, 255 75, 250 82" 
                  fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.85" />

            {/* Soft Forehead Gloss Light */}
            <ellipse cx="205" cy="140" rx="42" ry="24" transform="rotate(-25 205 140)" fill="#FFFFFF" fillOpacity="0.45" />
            <ellipse cx="295" cy="120" rx="20" ry="10" transform="rotate(20 295 120)" fill="#FFFFFF" fillOpacity="0.3" />
          </g>

          {/* HEADPHONES */}
          {/* Left Earphone */}
          <g id="left-earphone" transform="rotate(-18 95 215)">
            <rect x="68" y="180" width="22" height="70" rx="10" fill="#EA580C" stroke="#9A3412" strokeWidth="4" />
            <rect x="74" y="185" width="18" height="60" rx="8" fill="#F59E0B" />
            <ellipse cx="66" cy="215" rx="14" ry="32" fill="#EA580C" stroke="#9A3412" strokeWidth="3.5" />
            <ellipse cx="64" cy="215" rx="11" ry="26" fill="#FBBF24" />
            <ellipse cx="50" cy="215" rx="12" ry="24" fill="#EA580C" stroke="#9A3412" strokeWidth="3" />
            <ellipse cx="48" cy="215" rx="9" ry="20" fill="#FBBF24" />
            <ellipse cx="38" cy="215" rx="9" ry="16" fill={`url(#lumiGoldGrad_${currentMood})`} stroke="#9A3412" strokeWidth="3" />
            <ellipse cx="36" cy="213" rx="4" ry="7" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Right Earphone */}
          <g id="right-earphone" transform="rotate(18 405 215)">
            <rect x="410" y="180" width="22" height="70" rx="10" fill="#EA580C" stroke="#9A3412" strokeWidth="4" />
            <rect x="408" y="185" width="18" height="60" rx="8" fill="#F59E0B" />
            <ellipse cx="434" cy="215" rx="14" ry="32" fill="#EA580C" stroke="#9A3412" strokeWidth="3.5" />
            <ellipse cx="436" cy="215" rx="11" ry="26" fill="#FBBF24" />
            <ellipse cx="450" cy="215" rx="12" ry="24" fill="#EA580C" stroke="#9A3412" strokeWidth="3" />
            <ellipse cx="452" cy="215" rx="9" ry="20" fill="#FBBF24" />
            <ellipse cx="462" cy="215" rx="9" ry="16" fill={`url(#lumiGoldGrad_${currentMood})`} stroke="#9A3412" strokeWidth="3" />
            <ellipse cx="460" cy="213" rx="4" ry="7" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* FACIAL FEATURES */}
          <g id="face">
            {/* Eyebrows */}
            <path d="M 162 178 C 172 166, 192 166, 202 174" fill="none" stroke="#0369A1" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 298 174 C 308 166, 328 166, 338 178" fill="none" stroke="#0369A1" strokeWidth="4.5" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <ellipse cx="168" cy="268" rx="18" ry="11" fill="#FB7185" fillOpacity="0.5" />
            <ellipse cx="332" cy="268" rx="18" ry="11" fill="#FB7185" fillOpacity="0.5" />

            {/* EYES */}
            {isJoy ? (
              /* Joyful Arched Anime Eyes (^^) */
              <g>
                <path d="M 170 230 C 182 205, 206 205, 218 230" fill="none" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
                <path d="M 168 232 C 160 234, 154 238, 152 244" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <path d="M 286 230 C 298 205, 322 205, 334 230" fill="none" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
                <path d="M 336 232 C 344 234, 350 238, 352 244" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : (
              /* Big Sparkling Anime Eyes */
              <>
                <g id="left-eye">
                  <ellipse cx="192" cy="225" rx="28" ry="36" fill={`url(#lumiEyeIris_${currentMood})`} stroke="#0F172A" strokeWidth="4.5" />
                  <path d="M 172 235 C 178 252, 206 252, 212 235 C 206 245, 178 245, 172 235 Z" fill="#67E8F9" opacity="0.9" />
                  <ellipse cx="192" cy="218" rx="15" ry="18" fill="#0A0F1D" />
                  <circle cx="182" cy="210" r="9" fill="#FFFFFF" />
                  <circle cx="204" cy="235" r="4.5" fill="#FFFFFF" />
                  <circle cx="180" cy="230" r="2.5" fill="#FFFFFF" opacity="0.75" />
                  <path d="M 160 215 C 168 190, 216 190, 224 212" fill="none" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 162 214 C 152 216, 146 222, 144 228" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 158 208 C 150 206, 145 208, 142 212" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                </g>

                <g id="right-eye">
                  <ellipse cx="308" cy="225" rx="28" ry="36" fill={`url(#lumiEyeIris_${currentMood})`} stroke="#0F172A" strokeWidth="4.5" />
                  <path d="M 288 235 C 294 252, 322 252, 328 235 C 322 245, 294 245, 288 235 Z" fill="#67E8F9" opacity="0.9" />
                  <ellipse cx="308" cy="218" rx="15" ry="18" fill="#0A0F1D" />
                  <circle cx="298" cy="210" r="9" fill="#FFFFFF" />
                  <circle cx="320" cy="235" r="4.5" fill="#FFFFFF" />
                  <circle cx="296" cy="230" r="2.5" fill="#FFFFFF" opacity="0.75" />
                  <path d="M 276 212 C 284 190, 332 190, 340 215" fill="none" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 338 214 C 348 216, 354 222, 356 228" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 342 208 C 350 206, 355 208, 358 212" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                </g>
              </>
            )}

            {/* Sweet Curved Smile */}
            <path d="M 236 250 C 242 260, 258 260, 264 250" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* GLOWING GOLDEN HEART IN CHEST */}
          <g id="glowing-heart" filter={`url(#heartGlow_${currentMood})`}>
            <path d="
              M 250 318
              C 250 318, 235 292, 212 292
              C 190 292, 178 310, 178 330
              C 178 358, 218 385, 250 408
              C 282 385, 322 358, 322 330
              C 322 310, 310 292, 288 292
              C 265 292, 250 318, 250 318 Z
            "
            fill={`url(#lumiHeartGrad_${currentMood})`}
            stroke="#D97706"
            strokeWidth="5"
            strokeLinejoin="round" />

            <ellipse cx="215" cy="312" rx="14" ry="8" transform="rotate(-30 215 312)" fill="#FFFFFF" fillOpacity="0.8" />
            <ellipse cx="285" cy="312" rx="14" ry="8" transform="rotate(30 285 312)" fill="#FFFFFF" fillOpacity="0.8" />
          </g>

          {/* BABY BLUE HANDS CLASPING THE HEART */}
          <g id="hands">
            <path d="
              M 168 335
              C 168 318, 195 320, 222 330
              C 230 334, 234 346, 226 352
              C 234 355, 234 366, 225 372
              C 232 376, 230 388, 220 390
              C 192 396, 168 375, 168 335 Z
            " 
            fill={`url(#lumiBodyGrad_${currentMood})`} 
            stroke="#0284C7" 
            strokeWidth="4.5" 
            strokeLinejoin="round" />
            <path d="M 215 348 C 205 346, 195 350, 185 352" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 216 368 C 206 366, 196 368, 188 370" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />

            <path d="
              M 332 335
              C 332 318, 305 320, 278 330
              C 270 334, 266 346, 274 352
              C 266 355, 266 366, 275 372
              C 268 376, 270 388, 280 390
              C 308 396, 332 375, 332 335 Z
            " 
            fill={`url(#lumiBodyGrad_${currentMood})`} 
            stroke="#0284C7" 
            strokeWidth="4.5" 
            strokeLinejoin="round" />
            <path d="M 285 348 C 295 346, 305 350, 315 352" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 284 368 C 294 366, 304 368, 312 370" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
};
