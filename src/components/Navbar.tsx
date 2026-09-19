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
  Palette,
  Home,
  Users
} from 'lucide-react';
import { ActiveNavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { LumiMascot } from './LumiMascot';

interface NavbarProps {
  activePage: ActiveNavPage;
  onNavigate: (page: ActiveNavPage) => void;
  onOpenSearch: () => void;
  onOpenLetterModal?: () => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenLetterModal,
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
      const scrolled = window.scrollY > 15;
      setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
          ? 'bg-white/95 backdrop-blur-xl shadow-xs py-3 border-b border-[#E2E8F0]' 
          : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-[#E2E8F0]/80'
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1677FF]/15 via-[#38BDF8]/20 to-[#22D3EE]/25 p-0.5 border border-[#BFDBFE] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                <LumiMascot size="xs" state="heart" interactive={false} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-white ring-1 ring-emerald-400/40"></span>
            </div>
            
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-[#0F172A]">
                  LUMI
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1677FF] border border-[#BFDBFE] tracking-wide">
                  Lan tỏa lòng trắc ẩn
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] font-medium hidden md:block mt-0.5">
                Nhìn bằng trái tim – Hành động bằng yêu thương
              </p>
            </div>
          </button>

          {/* Compact Streamlined Desktop Navigation Pill Container */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F8FAFC] p-1.5 rounded-full border border-[#E2E8F0] shadow-2xs backdrop-blur-md">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activePage === 'home'
                  ? 'bg-[#1677FF] text-white shadow-sm font-bold'
                  : 'text-[#475569] hover:text-[#1677FF] hover:bg-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activePage === 'stories' || activePage === 'story-detail'
                  ? 'bg-[#1677FF] text-white shadow-sm font-bold'
                  : 'text-[#475569] hover:text-[#1677FF] hover:bg-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Câu chuyện</span>
            </button>

            <button
              onClick={() => handleNavClick('music')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activePage === 'music'
                  ? 'bg-[#1677FF] text-white shadow-sm font-bold'
                  : 'text-[#475569] hover:text-[#1677FF] hover:bg-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Âm nhạc</span>
            </button>

            {/* Explore Dropdown */}
            <div className="relative" ref={exploreDropdownRef}>
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isExploreActive
                    ? 'bg-[#1677FF] text-white shadow-sm font-bold'
                    : 'text-[#475569] hover:text-[#1677FF] hover:bg-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Khám phá</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${exploreDropdownOpen ? 'rotate-180' : 'text-slate-400'}`} />
              </button>

              {exploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Các không gian trải nghiệm
                  </div>

                  <button
                    onClick={() => handleNavClick('map')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'map' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Bản đồ tử tế</div>
                      <div className="text-[10px] text-[#64748B]">Điểm sáng trắc ẩn 34+ tỉnh thành</div>
                    </div>
                  </button>

                  <div className="flex items-center justify-between gap-1 group/item">
                    <button
                      onClick={() => handleNavClick('letters')}
                      className={`flex-1 px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activePage === 'letters' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold">Hộp thư LUMI</div>
                        <div className="text-[10px] text-[#64748B]">Gửi gắm yêu thương & sẻ chia</div>
                      </div>
                    </button>
                    {onOpenLetterModal && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExploreDropdownOpen(false);
                          onOpenLetterModal();
                        }}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shrink-0 transition-colors cursor-pointer mr-1"
                        title="Viết và gửi một bức thư ngay"
                      >
                        Gửi thư
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleNavClick('photovoice')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'photovoice' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Dự án Photovoice</div>
                      <div className="text-[10px] text-[#64748B]">Kể chuyện qua ống kính học sinh</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('exhibition')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'exhibition' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Triển lãm ảo 2.5D</div>
                      <div className="text-[10px] text-[#64748B]">Không gian nghệ thuật số</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('comic')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'comic' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Truyện tranh tương tác</div>
                      <div className="text-[10px] text-[#64748B]">Trải nghiệm thấu cảm trực quan</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('survey')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'survey' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Khảo sát tâm lý</div>
                      <div className="text-[10px] text-[#64748B]">Đo lường & phản hồi trắc ẩn</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('research')}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activePage === 'research' ? 'bg-[#EFF6FF] text-[#1677FF] font-bold' : 'text-[#334155] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">Đề tài nghiên cứu</div>
                      <div className="text-[10px] text-[#64748B]">Báo cáo khoa học hành vi THPT</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick action: Gửi điều tử tế */}
            <button
              onClick={() => handleNavClick('submit-story')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#38BDF8] text-white text-xs font-semibold shadow-xs hover:shadow-md hover:brightness-105 transition-all cursor-pointer lumi-btn-shine"
              title="Gửi câu chuyện hoặc điều tử tế"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi điều tử tế</span>
            </button>

            {/* Search Trigger Button (Desktop & Mobile) */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#64748B] hover:text-[#1677FF] bg-[#F8FAFC] hover:bg-[#EFF6FF] transition-all cursor-pointer border border-[#E2E8F0]"
              title="Tìm kiếm (Phím tắt: ⌘K)"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4 text-[#64748B]" />
            </button>

            {/* Background 432Hz Ambient Sound Toggle */}
            {onToggleAudio && (
              <button
                onClick={onToggleAudio}
                className={`p-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center ${
                  isPlayingAudio 
                    ? 'bg-[#EFF6FF] text-[#1677FF] border border-[#BFDBFE] shadow-2xs ring-1 ring-[#BFDBFE]' 
                    : 'text-[#64748B] hover:text-[#0F172A] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
                title={isPlayingAudio ? 'Tắt nhạc nền 432Hz' : 'Bật nhạc nền thư giãn 432Hz'}
                aria-label="Nhạc nền"
              >
                {isPlayingAudio ? (
                  <div className="flex items-center gap-0.5 h-3.5">
                    <span className="w-0.5 h-3 bg-[#1677FF] rounded-full animate-pulse"></span>
                    <span className="w-0.5 h-4 bg-[#1677FF] rounded-full animate-pulse delay-75"></span>
                    <span className="w-0.5 h-2 bg-[#1677FF] rounded-full animate-pulse delay-150"></span>
                  </div>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#94A3B8]" />
                )}
              </button>
            )}

            {/* Notifications Button */}
            {isLoggedIn && (
              <button
                onClick={() => openProfileDrawer('notifications')}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#1677FF] bg-[#F8FAFC] hover:bg-[#EFF6FF] transition-all relative cursor-pointer border border-[#E2E8F0]"
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
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-xl hover:bg-[#F1F5F9] transition-all cursor-pointer border border-transparent hover:border-[#E2E8F0]"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.displayName}
                    className="w-7 h-7 rounded-lg object-cover border border-[#BFDBFE] shadow-2xs"
                  />
                  <span className="text-xs font-semibold text-[#334155] hidden xl:inline max-w-[90px] truncate">
                    {user.displayName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-[#F1F5F9]">
                      <p className="text-xs font-bold text-[#0F172A] truncate">{user.displayName}</p>
                      <p className="text-[10px] text-[#64748B] truncate font-mono">{user.email || role}</p>
                    </div>

                    <button
                      onClick={() => {
                        openProfileDrawer('bookmarks');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#334155] hover:bg-[#EFF6FF] hover:text-[#1677FF] flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#1677FF]" />
                      <span>Trang cá nhân</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('bookmarks');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#334155] hover:bg-[#EFF6FF] hover:text-[#1677FF] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      <span>Câu chuyện đã lưu</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('letters');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#334155] hover:bg-[#EFF6FF] hover:text-[#1677FF] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Lời nhắn của tôi</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('submissions');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#334155] hover:bg-[#EFF6FF] hover:text-[#1677FF] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Bài viết đã gửi</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer('notifications');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#334155] hover:bg-[#EFF6FF] hover:text-[#1677FF] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-teal-500" />
                      <span>Thông báo cá nhân</span>
                    </button>

                    {isAdmin && (
                      <>
                        <div className="border-t border-[#F1F5F9] my-1"></div>
                        <button
                          onClick={() => {
                            handleNavClick('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-[#1677FF] hover:bg-[#EFF6FF] flex items-center gap-2.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF]" />
                          <span>Trang Quản Trị (CMS)</span>
                        </button>
                      </>
                    )}

                    <div className="border-t border-[#F1F5F9] my-1"></div>
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:brightness-105 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 lumi-btn-shine"
              >
                <User className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#334155] hover:bg-[#F1F5F9] transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-sky-100 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              activePage === 'home' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => handleNavClick('stories')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'stories' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Câu chuyện</span>
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'map' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Bản đồ tử tế</span>
          </button>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleNavClick('letters')}
              className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                activePage === 'letters' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Hộp thư yêu thương</span>
            </button>
            {onOpenLetterModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLetterModal();
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shrink-0"
              >
                Gửi thư
              </button>
            )}
          </div>

          <button
            onClick={() => handleNavClick('music')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'music' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Góc âm nhạc 432Hz</span>
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'gallery' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Hình ảnh & Photovoice</span>
          </button>

          <button
            onClick={() => handleNavClick('research')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'research' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Đề tài nghiên cứu</span>
          </button>

          <button
            onClick={() => handleNavClick('survey')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activePage === 'survey' ? 'bg-[#006EFF] text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Khảo sát tâm lý</span>
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            {!isLoggedIn ? (
              <button
                onClick={() => handleNavClick('dang-nhap')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#006EFF] to-[#0095FF] text-white text-xs font-bold text-center shadow-xs"
              >
                Đăng nhập
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold text-center"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export const Navbar = React.memo(NavbarComponent);
