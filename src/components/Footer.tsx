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
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { ActiveNavPage } from '../types';

interface FooterProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-rose-500">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  LUMI – CHẠM IU THƯƠNG
                </span>
                <p className="text-xs text-rose-400 font-medium">Lan tỏa lòng trắc ẩn</p>
              </div>
            </div>

            <p className="text-base text-rose-200/90 font-handwriting text-xl leading-relaxed">
              “NHÌN BẰNG TRÁI TIM – HÀNH ĐỘNG BẰNG YÊU THƯƠNG”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Không gian số lan tỏa lòng trắc ẩn và nền tảng can thiệp truyền thông thị giác có định hướng thuộc đề tài nghiên cứu khoa học hành vi học sinh THPT Nguyễn Du.
            </p>

            {/* Quick Contact Badge */}
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Hotline: <strong className="text-white font-mono">0345824974</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Email: <strong className="text-white font-mono">lumichamiuthuong@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Dự án: <strong className="text-white">Chạm Iu Thương</strong></span>
              </div>
            </div>
          </div>

          {/* Col 3: Khám phá */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('stories')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Câu chuyện tử tế
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('map')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Bản đồ lòng trắc ẩn
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('music')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  MV "Điều Chưa Nói"
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('letters')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Hộp thư yêu thương
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Góc hình ảnh & Poster
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trải nghiệm tương tác */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Trải Nghiệm Số
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('photovoice')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Dự án Photovoice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('comic')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Truyện tranh tương tác
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('survey')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Khảo sát Pre/Post Test
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('exhibition')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Triển lãm ảo 2.5D
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('research')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Cơ sở khoa học (300 HS)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Nguồn tư liệu & Bảo mật */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Minh Bạch & Nguồn
            </h4>
            <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <p>
                Nội dung câu chuyện được tuyển chọn và trích dẫn minh bạch từ các cơ quan báo chí uy tín (Tuổi Trẻ, Dân Trí, Tiền Phong, Thanh Niên) kết hợp câu chuyện học sinh THPT.
              </p>
              <div className="flex items-center gap-1 text-slate-300 font-medium pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bảo mật 100% dữ liệu học sinh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} Chiến dịch LUMI – CHẠM IU THƯƠNG • THPT Nguyễn Du. Bảo lưu mọi quyền.</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-center sm:text-right">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" /> 
            <span>Dự án Nghiên cứu Khoa học Hành vi & Truyền thông thị giác</span>
            <span className="text-slate-600">|</span>
            <a 
              href="https://www.tiktok.com/@ng.m.huy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 transition-colors underline decoration-rose-400/30 underline-offset-2 font-medium"
            >
              Design by ng.m.huy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
