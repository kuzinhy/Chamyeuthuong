import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Shield, 
  BookOpen, 
  Globe, 
  Music,
  GraduationCap,
  Send,
  Camera,
  Layers
} from 'lucide-react';
import { ActiveNavPage } from '../types';

interface FooterProps {
  onNavigate: (page: ActiveNavPage) => void;
  isHomePage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="main-footer" 
      className="bg-[#0F172A] text-[#CBD5E1] pt-16 pb-12 relative overflow-hidden border-t border-slate-800"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-48 bg-[#1677FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid - 4 Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Group 1: LUMI Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1677FF] to-[#22D3EE] p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <img src="/favicon.svg" alt="LUMI Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  LUMI
                </span>
                <div>
                  <span className="text-[10px] text-[#38BDF8] font-bold bg-[#1677FF]/20 px-2 py-0.5 rounded-full inline-block border border-[#1677FF]/30">
                    Lan tỏa lòng trắc ẩn
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold text-sky-200 leading-relaxed italic">
              “Nhìn bằng trái tim – Hành động bằng yêu thương”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Không gian số kết nối những câu chuyện, âm nhạc và hành động đẹp để nuôi dưỡng và lan tỏa lòng trắc ẩn trong giới trẻ và cộng đồng.
            </p>

            {/* Quick Contact Badge */}
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Hotline: <strong className="text-white font-mono">0345824974</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Email: <strong className="text-white font-mono">lumichamiuthuong@gmail.com</strong></span>
              </div>
            </div>
          </div>

          {/* Group 2: Khám Phá */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('stories')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Câu chuyện tử tế</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('music')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Music className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Âm nhạc 432Hz & MV</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('map')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Bản đồ lòng trắc ẩn 34+ tỉnh</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('photovoice')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Dự án ảnh Photovoice</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('exhibition')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Triển lãm không gian ảo 2.5D</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Group 3: Cộng Đồng & Tương Tác */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cộng Đồng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('letters')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Hộp thư yêu thương LUMI</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('submit-story')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Kể câu chuyện của bạn</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('comic')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Truyện tranh tương tác</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('survey')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Khảo sát tâm lý & phản hồi</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('research')}
                  className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Cơ sở khoa học (300 HS)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Group 4: Thông Tin & Bảo Mật */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Minh Bạch & An Toàn
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                Mọi câu chuyện được kiểm duyệt và trích nguồn minh bạch, hướng đến lan tỏa năng lượng tích cực cho môi trường học đường.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-medium pt-2 bg-emerald-950/40 border border-emerald-800/60 rounded-xl px-3 py-2 w-fit">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bảo mật 100% dữ liệu cá nhân</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} Chiến dịch LUMI – Lan tỏa lòng trắc ẩn. Bảo lưu mọi quyền.</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-center sm:text-right">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" /> 
            <span>Đề tài Nghiên cứu Khoa học Hành vi & Truyền thông thị giác</span>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.tiktok.com/@ng.m.huy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-white transition-colors underline decoration-[#1677FF] underline-offset-2 font-semibold"
            >
              Design by ng.m.huy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
