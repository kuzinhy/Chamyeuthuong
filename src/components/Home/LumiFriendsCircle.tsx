import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Smile, 
  Users, 
  MessageCircle, 
  Headphones, 
  BookOpen, 
  Send, 
  Flame,
  Award,
  Radio
} from 'lucide-react';
import { LumiMascot, LumiState } from '../LumiMascot';

interface CharacterVoice {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  color: string;
  badge: string;
}

interface LumiFriendsCircleProps {
  onOpenLetterModal?: () => void;
}

const CHARACTERS: CharacterVoice[] = [
  {
    id: 'lumi',
    name: 'LUMI',
    role: 'Mascot Trí tuệ Trắc ẩn',
    avatar: '🤖',
    quote: '“Có các bạn học sinh bên cạnh, LUMI không còn đơn độc! Hãy cùng nhau nhìn bằng trái tim và hành động bằng yêu thương nhé!”',
    color: 'from-[#1677FF] to-[#38BDF8]',
    badge: '💙 Sứ giả Trắc ẩn'
  },
  {
    id: 'an',
    name: 'Bạn An',
    role: 'Đại sứ Học đường (Lớp 11)',
    avatar: '👧',
    quote: '“Mỗi ngày đến trường, mình cùng LUMI lắng nghe và sẻ chia với những bạn đang gặp áp lực học tập!”',
    color: 'from-rose-500 to-pink-500',
    badge: '🌸 Lắng nghe & Thấu cảm'
  },
  {
    id: 'minh',
    name: 'Bạn Minh',
    role: 'Tình nguyện viên Trẻ (Lớp 12)',
    avatar: '👦',
    quote: '“Giai điệu 432Hz và những bức thư ẩn danh đã giúp tụi mình kết nối cả lớp lại gần nhau hơn!”',
    color: 'from-amber-500 to-orange-500',
    badge: '🎵 Âm nhạc & Hành động'
  },
  {
    id: 'drone',
    name: 'Bé Mầm (Mini Drone)',
    role: 'Trợ lý bồ câu số',
    avatar: '🕊️',
    quote: '“Tít tít! LUMI vừa tiếp nhận thêm một bức thư động viên từ các bạn học sinh!”',
    color: 'from-cyan-400 to-teal-500',
    badge: '💌 Cánh thư Yêu thương'
  }
];

export const LumiFriendsCircle: React.FC<LumiFriendsCircleProps> = ({ onOpenLetterModal }) => {
  const [selectedCharId, setSelectedCharId] = useState<string>('lumi');
  const [lumiMood, setLumiMood] = useState<LumiState>('heart');
  const [cheerCount, setCheerCount] = useState<number>(1428);
  const [hasCheered, setHasCheered] = useState<boolean>(false);

  const activeChar = CHARACTERS.find(c => c.id === selectedCharId) || CHARACTERS[0];

  const handleSelectChar = (id: string) => {
    setSelectedCharId(id);
    if (id === 'lumi') setLumiMood('heart');
    else if (id === 'an') setLumiMood('joy');
    else if (id === 'minh') setLumiMood('star');
    else if (id === 'drone') setLumiMood('thanks');
  };

  const handleCheer = () => {
    if (!hasCheered) {
      setCheerCount(prev => prev + 1);
      setHasCheered(true);
      setLumiMood('joy');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-lg lg:max-w-xl mx-auto">
      
      {/* 1. Dynamic Interactive Speech Bubble */}
      <motion.div 
        key={activeChar.id}
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full mb-3 z-30 px-2"
      >
        <div className="bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-sky-200/90 shadow-lg shadow-sky-500/10 relative">
          
          {/* Header row of active speaker */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">{activeChar.avatar}</span>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-[#0F172A] leading-none">
                  {activeChar.name}
                </span>
                <span className="text-[10px] text-[#64748B] block font-medium">
                  {activeChar.role}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1677FF]">
              {activeChar.badge}
            </span>
          </div>

          {/* Quote */}
          <p className="text-xs sm:text-[13px] text-[#334155] italic font-medium leading-relaxed">
            {activeChar.quote}
          </p>

          {/* Small Speech Pointer Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b border-r border-sky-200/90 transform rotate-45" />
        </div>
      </motion.div>

      {/* 2. Interactive Character Stage: LUMI with Friends & Mini Drone */}
      <div className="relative w-full h-[320px] sm:h-[350px] flex items-end justify-center">
        
        {/* Holographic Ambient Light Pillar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 h-72 bg-gradient-to-t from-cyan-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Floating Flying Companion: Bé Mầm (Mini Drone) */}
        <motion.div 
          animate={{ 
            y: [-6, 6, -6],
            x: [-3, 3, -3]
          }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          onClick={() => handleSelectChar('drone')}
          className={`absolute top-0 right-6 sm:right-10 z-20 cursor-pointer group p-2 rounded-2xl transition-transform ${
            selectedCharId === 'drone' ? 'scale-110' : 'hover:scale-105'
          }`}
          title="Bé Mầm - Chú drone mang thư trắc ẩn"
        >
          <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-cyan-300 shadow-md shadow-cyan-500/15 flex items-center gap-2">
            <span className="text-xl animate-bounce">🕊️</span>
            <div>
              <div className="text-[10px] font-bold text-[#0F172A] leading-tight">Bé Mầm</div>
              <div className="text-[9px] text-[#0284C7] font-semibold flex items-center gap-0.5">
                <Send className="w-2.5 h-2.5" />
                Giao thư
              </div>
            </div>
          </div>
          {/* Cyber trail glow */}
          <div className="w-8 h-1 bg-cyan-400/40 rounded-full mx-auto blur-xs mt-1" />
        </motion.div>

        {/* --- Characters Group on Stage --- */}
        <div className="relative z-10 w-full flex items-end justify-center px-2">
          
          {/* LEFT COMPANION: BẠN AN (Học sinh THPT) */}
          <div 
            onClick={() => handleSelectChar('an')}
            className={`relative -mr-4 sm:-mr-6 mb-2 cursor-pointer transition-all duration-300 z-10 ${
              selectedCharId === 'an' ? 'scale-105 z-20' : 'hover:scale-102 opacity-95'
            }`}
            title="Bạn An - Đại sứ Học đường"
          >
            <div className="w-24 sm:w-28 flex flex-col items-center">
              {/* Badge */}
              <div className="mb-1 text-[9px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                Học sinh An
              </div>

              {/* Character Illustration SVG */}
              <div className="w-20 sm:w-24 h-40 sm:h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 100 160" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="anSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FED7AA" />
                      <stop offset="100%" stopColor="#FDBA74" />
                    </linearGradient>
                    <linearGradient id="anShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#E0F2FE" />
                    </linearGradient>
                    <linearGradient id="anHair" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  {/* Body / School Uniform */}
                  <path d="M 32 65 L 68 65 L 75 140 L 25 140 Z" fill="url(#anShirt)" />
                  {/* Scarf / Red tie */}
                  <polygon points="50,65 46,95 50,110 54,95" fill="#EF4444" />
                  <circle cx="50" cy="70" r="4" fill="#DC2626" />
                  
                  {/* Head & Hair */}
                  <ellipse cx="50" cy="40" rx="18" ry="20" fill="url(#anSkin)" />
                  {/* Hair */}
                  <path d="M 28 38 C 28 15, 72 15, 72 38 C 72 45, 68 55, 68 55 C 68 55, 62 45, 50 45 C 38 45, 32 55, 32 55 Z" fill="url(#anHair)" />
                  <ellipse cx="28" cy="42" rx="4" ry="12" fill="url(#anHair)" />
                  <ellipse cx="72" cy="42" rx="4" ry="12" fill="url(#anHair)" />

                  {/* Smiling Face */}
                  <circle cx="43" cy="38" r="2.5" fill="#0F172A" />
                  <circle cx="57" cy="38" r="2.5" fill="#0F172A" />
                  <path d="M 44 46 Q 50 52 56 46" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Blush */}
                  <circle cx="38" cy="43" r="3" fill="#FDA4AF" opacity="0.6" />
                  <circle cx="62" cy="43" r="3" fill="#FDA4AF" opacity="0.6" />

                  {/* Arms holding Notebook with Heart */}
                  <rect x="36" y="85" width="28" height="34" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  <path d="M 50 97 C 46 92, 40 96, 46 103 L 50 108 L 54 103 C 60 96, 54 92, 50 97 Z" fill="#F43F5E" />
                  {/* Hands */}
                  <circle cx="35" cy="100" r="5" fill="url(#anSkin)" />
                  <circle cx="65" cy="100" r="5" fill="url(#anSkin)" />
                </svg>
              </div>

              {/* Mini Speech Flag */}
              <div className="text-[9px] text-[#475569] font-medium bg-white/90 px-1.5 py-0.5 rounded-md border border-[#E2E8F0] shadow-2xs">
                💬 “Cùng sẻ chia”
              </div>
            </div>
          </div>

          {/* CENTER: LUMI ROBOT MASCOT (Vị trí trung tâm kết nối) */}
          <div 
            onClick={() => handleSelectChar('lumi')}
            className={`relative cursor-pointer transition-all duration-300 z-20 flex flex-col items-center ${
              selectedCharId === 'lumi' ? 'scale-105' : 'hover:scale-102'
            }`}
            title="LUMI - Chạm để tương tác cảm xúc"
          >
            {/* Glowing Heart Link Halo */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 px-2.5 py-0.5 rounded-full border border-sky-300 text-[10px] font-bold text-[#1677FF] shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>LUMI & Bạn bè</span>
            </div>

            {/* Mascot Element */}
            <div className="w-36 sm:w-44 h-36 sm:h-44 flex items-center justify-center animate-float-gentle">
              <LumiMascot 
                size="lg" 
                state={lumiMood} 
                interactive={false}
                hideInternalBubble={true}
              />
            </div>
          </div>

          {/* RIGHT COMPANION: BẠN MINH (Học sinh Năng động / Âm nhạc) */}
          <div 
            onClick={() => handleSelectChar('minh')}
            className={`relative -ml-4 sm:-ml-6 mb-2 cursor-pointer transition-all duration-300 z-10 ${
              selectedCharId === 'minh' ? 'scale-105 z-20' : 'hover:scale-102 opacity-95'
            }`}
            title="Bạn Minh - Tình nguyện viên & Âm nhạc"
          >
            <div className="w-24 sm:w-28 flex flex-col items-center">
              {/* Badge */}
              <div className="mb-1 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                Học sinh Minh
              </div>

              {/* Character Illustration SVG */}
              <div className="w-20 sm:w-24 h-40 sm:h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 100 160" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="minhSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FED7AA" />
                      <stop offset="100%" stopColor="#FDBA74" />
                    </linearGradient>
                    <linearGradient id="minhJacket" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>
                    <linearGradient id="minhHair" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  {/* Body / Active School Jacket */}
                  <path d="M 30 65 L 70 65 L 76 140 L 24 140 Z" fill="url(#minhJacket)" />
                  {/* White inner shirt */}
                  <polygon points="44,65 56,65 52,100 48,100" fill="#FFFFFF" />
                  
                  {/* Head & Modern Haircut */}
                  <ellipse cx="50" cy="40" rx="18" ry="19" fill="url(#minhSkin)" />
                  {/* Short energetic hair */}
                  <path d="M 28 35 C 28 16, 72 16, 72 35 C 72 25, 62 18, 50 18 C 38 18, 28 25, 28 35 Z" fill="url(#minhHair)" />

                  {/* Headphones around neck */}
                  <path d="M 32 50 C 32 62, 68 62, 68 50" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <rect x="29" y="44" width="7" height="12" rx="3" fill="#D97706" />
                  <rect x="64" y="44" width="7" height="12" rx="3" fill="#D97706" />

                  {/* Smiling Face */}
                  <circle cx="43" cy="38" r="2.5" fill="#0F172A" />
                  <circle cx="57" cy="38" r="2.5" fill="#0F172A" />
                  <path d="M 44 47 Q 50 53 56 47" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Hands waving thumbs-up */}
                  <circle cx="75" cy="85" r="5" fill="url(#minhSkin)" />
                  <path d="M 75 80 L 75 74" stroke="url(#minhSkin)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              {/* Mini Speech Flag */}
              <div className="text-[9px] text-[#475569] font-medium bg-white/90 px-1.5 py-0.5 rounded-md border border-[#E2E8F0] shadow-2xs">
                🎵 “Nhạc 432Hz”
              </div>
            </div>
          </div>

        </div>

        {/* --- 3D Digital Cyber Kindness Plaza Platform (Rộng rãi cho cả nhóm) --- */}
        <div className="absolute bottom-0 inset-x-0 z-0 flex flex-col items-center pointer-events-none">
          
          {/* Top Holographic Disc Ring */}
          <div className="w-72 sm:w-96 h-10 rounded-[100%] bg-gradient-to-r from-cyan-300 via-sky-100 to-blue-400 border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,184,255,0.6)] flex items-center justify-center relative overflow-hidden">
            <div className="w-64 sm:w-80 h-6 rounded-[100%] bg-gradient-to-b from-cyan-500/40 via-blue-600/30 to-slate-900/60 flex items-center justify-center">
              <div className="w-52 sm:w-64 h-3 rounded-[100%] bg-cyan-200/80 blur-xs" />
            </div>
          </div>

          {/* Pedestal Cylinder Body with Inscription */}
          <div className="w-80 sm:w-[420px] h-11 -mt-4 rounded-b-3xl bg-gradient-to-b from-[#0B254A] via-[#0E356A] to-[#071833] border-x border-b border-cyan-400/50 shadow-2xl flex items-center justify-between px-6 relative overflow-hidden">
            {/* Ambient Cyan Neon Glow */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00E5FF]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,184,255,0.35),transparent_70%)]" />

            {/* Inscribed Glowing Text */}
            <span className="relative z-10 text-[10px] sm:text-xs font-black tracking-wider text-cyan-200 uppercase flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(56,214,255,0.8)]">
              <Users className="w-3.5 h-3.5 text-cyan-300" />
              BIỆT ĐỘI TRẮC ẨN HỌC ĐƯỜNG
            </span>

            <span className="relative z-10 text-[9px] sm:text-[10px] font-mono text-cyan-300/90 font-bold">
              34+ TỈNH THÀNH
            </span>
          </div>

          {/* Platform Floor Reflection */}
          <div className="w-88 sm:w-[440px] h-4 -mt-1 rounded-[100%] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-md" />
        </div>

      </div>

      {/* 3. Interactive Companions Bar & Cheer Action */}
      <div className="w-full mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-sky-200/80 shadow-2xs">
        
        {/* Quick Avatar Switchers */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#64748B] mr-1 hidden sm:inline">Trò chuyện:</span>
          {CHARACTERS.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelectChar(c.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCharId === c.id
                  ? 'bg-[#1677FF] text-white shadow-xs font-bold scale-105'
                  : 'bg-white hover:bg-sky-50 text-[#334155] border border-[#E2E8F0]'
              }`}
            >
              <span>{c.avatar}</span>
              <span className="text-[11px]">{c.name.replace('Bạn ', '')}</span>
            </button>
          ))}
        </div>

        {/* Cheer Together Button */}
        <button
          onClick={handleCheer}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
            hasCheered 
              ? 'bg-rose-50 text-rose-600 border border-rose-200' 
              : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:brightness-105'
          }`}
          title="Thả tim cổ vũ LUMI & Các bạn học sinh"
        >
          <Heart className={`w-3.5 h-3.5 ${hasCheered ? 'fill-rose-500' : 'fill-white animate-pulse'}`} />
          <span>{hasCheered ? 'Đã cổ vũ!' : 'Cổ vũ cùng bạn'}</span>
          <span className="font-mono text-[10px] opacity-90">({cheerCount})</span>
        </button>

      </div>

      {/* Bottom Subtext */}
      <div className="w-full text-center mt-2.5">
        <p className="text-[11px] text-[#64748B] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>LUMI cùng học sinh toàn quốc kết nối yêu thương – Không một ai bị bỏ lại phía sau</span>
        </p>
      </div>

    </div>
  );
};
