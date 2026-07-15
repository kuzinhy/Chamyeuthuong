import { Facebook, Youtube, Video, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative bg-[#020617] text-gray-400 font-sans border-t border-white/5 py-16 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-white mb-6">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-sm text-black">
                CH
              </span>
              <span className="font-extrabold text-lg tracking-wider">CHẠM</span>
              <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 px-1.5 py-0.5 rounded tracking-widest uppercase">
                Campaign
              </span>
            </div>

            <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-4 uppercase">
              Dự án nghiên cứu & Chiến dịch truyền thông học đường:
            </p>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-3">
              “Tác động của truyền thông thị giác có định hướng đến sự thay đổi hành vi trắc ẩn của học sinh trung học phổ thông”
            </p>
            <p className="text-rose-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 flex items-center gap-1">
              <span>Slogan: NHÌN BẰNG TRÁI TIM - HÀNH ĐỘNG BẰNG YÊU THƯƠNG</span>
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Video className="w-4 h-4" /> {/* TikTok representation */}
              </a>
            </div>
          </div>

          {/* Contact details Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-2 border-b border-white/5 pb-2">Liên Hệ Dự Án</h4>
            
            <div className="flex gap-3 items-start text-xs sm:text-sm">
              <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="font-light text-gray-400">Trường THPT Nguyễn Du, TP. Hồ Chí Minh</p>
            </div>

            <div className="flex gap-3 items-start text-xs sm:text-sm">
              <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="font-light text-gray-400">cham.nguyendu.project@gmail.com</p>
            </div>

            <div className="flex gap-3 items-start text-xs sm:text-sm">
              <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="font-light text-gray-400">(+84) 902 456 789</p>
            </div>
          </div>

          {/* Custom QR Code Column */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4 border-b border-white/5 pb-2 w-full lg:text-right">Quét Mã QR</h4>
            
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col items-center gap-2">
              {/* Custom SVG stylized vector QR code representation */}
              <div className="w-28 h-28 bg-white p-2 rounded-xl relative flex items-center justify-center">
                <svg className="w-full h-full text-black" viewBox="0 0 29 29">
                  <path fill="currentColor" d="M0 0h9v9H0zm2 2v5h5V2zm18-2h9v9h-9zm2 2v5h5V2zM0 20h9v9H0zm2 2v5h5v-5zm22-1v4h-4v-4zm2-2h3v3h-3zm-6-2h3v4h-3zm3 10h4v3h-4zm-7-10h3v3h-3zm2 4h4v3h-4zm-8-3h3v4h-3zm-3 4h4v3h-4zm15-4h3v3h-3zm1-13h1v1h-1zm5 5h1v1h-1zM5 5h1v1H5zm19 19h1v1h-1zm-15 0h1v1H9z" />
                </svg>
                {/* Embedded brand symbol inside QR */}
                <div className="absolute w-6 h-6 rounded bg-[#0b1329] border border-cyan-400 flex items-center justify-center font-bold text-[8px] text-white select-none">
                  CH
                </div>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Ghé thăm Fanpage</span>
            </div>
          </div>

        </div>

        {/* Lower footer copyright bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono">
          <p>© {currentYear} Chiến dịch CHẠM • THPT Nguyễn Du. Bảo lưu mọi quyền.</p>
          <p className="flex items-center gap-1 mt-4 sm:mt-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Thiết kế & Phát triển cho Dự án Khoa học Hành vi THPT
          </p>
        </div>

      </div>
    </footer>
  );
}
