import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Music, 
  Mail, 
  Image, 
  MapPin, 
  GraduationCap, 
  Sparkles,
  Send,
  ShieldCheck,
  ChevronDown,
  Bell,
  User,
  Bookmark,
  Heart,
  LogOut,
  Volume2,
  VolumeX,
  Compass,
  Camera,
  ClipboardCheck,
  Palette
} from 'lucide-react';
import { ActiveNavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { LumiMascot } from './LumiMascot';

interface NavbarProps {
  activePage: ActiveNavPage;
  onNavigate: (page: ActiveNavPage) => void;
  onOpenSearch: () => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  isPlayingAudio = false,
  onToggleAudio
}) => {
  const { 
    user, 
    role, 
    isLoggedIn, 
    isAdmin, 
    isSuperAdmin,
    unreadNotificationCount, 
    openProfileDrawer, 
    logout 
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target as Node)) {
        setExploreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: ActiveNavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setExploreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isExploreActive = [
    'letters', 
    'music', 
    'gallery', 
    'research', 
    'submit-story', 
    'exhibition', 
    'comic', 
    'photovoice', 
    'survey'
  ].includes(activePage);

  return (
    <header 
      id="main-header" 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-xs py-2 border-b border-sky-100/90' 
          : 'bg-white/80 backdrop-blur-md py-3 border-b border-sky-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo & Slogan */}
          <button 
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none flex-shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-indigo-500/20 p-0.5 border border-sky-200/80 shadow-xs flex items-center justify-center">
                <LumiMascot size="xs" state="heart" interactive={false} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-400/40"></span>
            </div>
            
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  LUMI
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 uppercase tracking-wide">
                  Chạm Yêu Thương
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                Nhìn bằng trái tim – Hành động bằng yêu thương
              </p>
            </div>
          </button>

          {/* Compact Streamlined Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1 rounded-full border border-slate-200/70 shadow-2xs backdrop-blur-sm">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activePage === 'home'
                  ? 'bg-white text-sky-600 shadow-xs font-bold border border-sky-200/60'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
              }`}
            >
              Trang chủ
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activePage === 'stories' || activePage === 'story-detail'
                  ? 'bg-white text-sky-600 shadow-xs font-bold border border-sky-200/60'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
              }`}
            >
              Câu chuyện
            </button>

            <button
              onClick={() => handleNavClick('map')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activePage === 'map'
                  ? 'bg-white text-sky-600 shadow-xs font-bold border border-sky-200/60'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
              }`}
            >
              Bản đồ tử tế
            </button>

            {/* Explore Dropdown */}
            <div className="relative" ref={exploreDropdownRef}>
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  isExploreActive
                    ? 'bg-white text-sky-600 shadow-xs font-bold border border-sky-200/60'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                <span>Khám phá</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${exploreDropdownOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>

              {exploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-sky-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Các không gian trải nghiệm
                  </div>

                  <button
                    onClick={() => handleNavClick('letters')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'letters' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Hộp thư yêu thương</div>
                      <div className="text-[10px] text-slate-400">Gửi lời tri ân, xin lỗi & động viên</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('music')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'music' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Music className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Góc âm nhạc 432Hz</div>
                      <div className="text-[10px] text-slate-400">MV "Điều Chưa Nói" & nhạc chữa lành</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('gallery')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'gallery' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                      <Image className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Góc hình ảnh & Photovoice</div>
                      <div className="text-[10px] text-slate-400">Khoảnh khắc trắc ẩn học đường</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('research')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'research' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Đề tài nghiên cứu</div>
                      <div className="text-[10px] text-slate-400">Báo cáo khoa học hành vi THPT</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('exhibition')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'exhibition' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Triển lãm ảo 2.5D</div>
                      <div className="text-[10px] text-slate-400">Không gian nghệ thuật thực tế ảo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('comic')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'comic' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Truyện tranh tương tác</div>
                      <div className="text-[10px] text-slate-400">Trải nghiệm tương tác đa giác quan</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('photovoice')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'photovoice' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Dự án Photovoice</div>
                      <div className="text-[10px] text-slate-400">Kể chuyện qua ống kính học sinh</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('survey')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'survey' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Khảo sát tâm lý</div>
                      <div className="text-[10px] text-slate-400">Đo lường & phản hồi trắc ẩn học đường</div>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => handleNavClick('submit-story')}
                      className="w-full px-3 py-2 text-left text-xs font-bold text-sky-700 bg-sky-50/70 hover:bg-sky-100 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5 text-sky-600" />
                        <span>Kể LUMI nghe câu chuyện</span>
                      </span>
                      <span className="text-[9px] bg-sky-200/80 px-1.5 py-0.5 rounded text-sky-800 uppercase font-extrabold">Đăng</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin direct link if user is Super Admin or Admin */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  activePage === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quản trị</span>
                <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full uppercase font-mono">
                  {isSuperAdmin ? 'Super' : 'Admin'}
                </span>
              </button>
            )}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Search Trigger Bar */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-50 hover:bg-sky-50/80 border border-slate-200/80 text-slate-500 hover:text-sky-600 transition-all text-xs cursor-pointer shadow-2xs"
              title="Tìm kiếm (Phím tắt: ⌘K)"
              aria-label="Tìm kiếm"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-xs font-medium text-slate-500">Tìm kiếm...</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400">⌘K</kbd>
            </button>

            {/* Background 432Hz Ambient Sound Toggle */}
            {onToggleAudio && (
              <button
                onClick={onToggleAudio}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPlayingAudio 
                    ? 'bg-sky-100/90 text-sky-700 border border-sky-200 shadow-2xs ring-1 ring-sky-300/40' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'
                }`}
                title={isPlayingAudio ? 'Tắt nhạc nền 432Hz' : 'Bật nhạc nền thư giãn 432Hz'}
                aria-label="Nhạc nền"
              >
                {isPlayingAudio ? (
                  <>
                    <div className="flex items-center gap-0.5 h-3.5">
                      <span className="w-0.5 h-3 bg-sky-600 rounded-full animate-pulse"></span>
                      <span className="w-0.5 h-4 bg-sky-600 rounded-full animate-pulse delay-75"></span>
                      <span className="w-0.5 h-2 bg-sky-600 rounded-full animate-pulse delay-150"></span>
                    </div>
                    <span className="text-[11px] font-bold hidden md:inline text-sky-700">432Hz</span>
                  </>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                )}
              </button>
            )}

            {/* Notifications Button */}
            {isLoggedIn && (
              <button
                onClick={() => openProfileDrawer('notifications')}
                className="p-1.5 rounded-full text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all relative cursor-pointer"
                title="Thông báo"
                aria-label="Thông báo"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>
                )}
              </button>
            )}

            {/* User Profile / Login Button */}
            {isLoggedIn && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full hover:bg-slate-100/80 transition-all cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.displayName}
                    className="w-7 h-7 rounded-full object-cover border border-sky-200 shadow-2xs"
                  />
                  <span className="text-xs font-semibold text-slate-700 hidden xl:inline max-w-[90px] truncate">
                    {user.displayName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-sky-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{user.displayName}</p>
                      <p className="text-[10px] text-slate-400 truncate font-mono">{user.email || role}</p>
                    </div>

                    <button
                      onClick={() => {
                        openProfileDrawer('bookmarks');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      <span>Trang cá nhân</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('bookmarks');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      <span>Câu chuyện đã lưu</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('letters');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Lời nhắn của tôi</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('submissions');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Bài viết đã gửi</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('notifications');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-teal-500" />
                      <span>Thông báo cá nhân</span>
                    </button>

                    {isAdmin && (
                      <>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button
                          onClick={() => {
                            handleNavClick('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>Trang Quản Trị (CMS)</span>
                        </button>
                      </>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('dang-nhap')}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-bold shadow-xs shadow-sky-500/20 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Đăng Nhập</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-sky-100 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'home' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => handleNavClick('stories')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'stories' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Câu chuyện tử tế</span>
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'map' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Bản đồ tử tế 63 tỉnh thành</span>
          </button>

          <button
            onClick={() => handleNavClick('letters')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'letters' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Mail className="w-4 h-4 text-rose-500" />
            <span>Hộp thư yêu thương</span>
          </button>

          <button
            onClick={() => handleNavClick('music')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'music' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Music className="w-4 h-4 text-purple-500" />
            <span>Góc âm nhạc 432Hz</span>
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'gallery' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Image className="w-4 h-4 text-sky-500" />
            <span>Góc hình ảnh & Photovoice</span>
          </button>

          <button
            onClick={() => handleNavClick('research')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'research' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Đề tài nghiên cứu</span>
          </button>

          <button
            onClick={() => handleNavClick('exhibition')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'exhibition' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Triển lãm ảo 2.5D</span>
          </button>

          <button
            onClick={() => handleNavClick('comic')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'comic' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Truyện tranh tương tác</span>
          </button>

          <button
            onClick={() => handleNavClick('photovoice')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'photovoice' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <Camera className="w-4 h-4 text-rose-500" />
            <span>Dự án Photovoice</span>
          </button>

          <button
            onClick={() => handleNavClick('survey')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activePage === 'survey' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-teal-600" />
            <span>Khảo sát tâm lý trắc ẩn</span>
          </button>

          <button
            onClick={() => handleNavClick('submit-story')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold bg-sky-50 text-sky-800`}
          >
            <Send className="w-4 h-4 text-sky-600" />
            <span>Kể LUMI nghe (Gửi câu chuyện)</span>
          </button>

          {isAdmin && (
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Trang Quản Trị (CMS)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
