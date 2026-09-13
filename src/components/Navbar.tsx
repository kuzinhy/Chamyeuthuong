import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
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
  LogOut,
  Volume2,
  VolumeX
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
    isStaff, 
    unreadNotificationCount, 
    openAuthModal, 
    openProfileDrawer, 
    logout 
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: ActiveNavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header" 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-sky-100' 
          : 'bg-white/85 backdrop-blur-sm py-3.5 border-b border-sky-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo LUMI */}
          <button 
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <LumiMascot size="xs" state="heart" interactive={false} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  LUMI
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full uppercase tracking-wider">
                  Chạm Yêu Thương
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Nhìn bằng trái tim – Hành động bằng yêu thương
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'home'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Trang chủ
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'stories' || activePage === 'story-detail'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Câu chuyện tử tế
            </button>

            <button
              onClick={() => handleNavClick('map')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'map'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Bản đồ trắc ẩn
            </button>

            <button
              onClick={() => handleNavClick('music')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'music'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Góc âm nhạc
            </button>

            <button
              onClick={() => handleNavClick('letters')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'letters'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Hộp thư yêu thương
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'gallery'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Góc hình ảnh
            </button>

            <button
              onClick={() => handleNavClick('research')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activePage === 'research'
                  ? 'bg-sky-100/80 text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
              }`}
            >
              Về dự án
            </button>

            {/* CTA Kể LUMI Nghe */}
            <button
              onClick={() => handleNavClick('submit-story')}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activePage === 'submit-story'
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-amber-700 bg-amber-50 hover:bg-amber-100/80'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-amber-600" />
              <span>Kể LUMI nghe</span>
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Background Audio Toggle */}
            {onToggleAudio && (
              <button
                onClick={onToggleAudio}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  isPlayingAudio 
                    ? 'bg-sky-100 text-sky-600 animate-pulse' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title={isPlayingAudio ? 'Tắt nhạc nền' : 'Bật nhạc nền thư giãn'}
                aria-label="Nhạc nền"
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            {/* Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-full text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all cursor-pointer"
              title="Tìm kiếm toàn trang"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Notifications Button */}
            {isLoggedIn && (
              <button
                onClick={openProfileDrawer}
                className="p-2 rounded-full text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all relative cursor-pointer"
                title="Thông báo"
                aria-label="Thông báo"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>
            )}

            {/* User Profile / Login Button */}
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-sky-200"
                  />
                  <span className="text-xs font-bold text-slate-700 hidden xl:inline max-w-[100px] truncate">
                    {user.displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:inline" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{user.displayName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email || role}</p>
                    </div>

                    <button
                      onClick={() => {
                        openProfileDrawer();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      <span>Trang cá nhân</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      <span>Câu chuyện đã lưu</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Lời nhắn của tôi</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileDrawer();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Câu chuyện tôi gửi</span>
                    </button>

                    {isStaff && (
                      <>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button
                          onClick={() => {
                            handleNavClick('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
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
                onClick={openAuthModal}
                className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer active:scale-95"
              >
                Đăng Nhập
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'home' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => handleNavClick('stories')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'stories' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Câu chuyện tử tế</span>
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'map' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Bản đồ lòng trắc ẩn</span>
          </button>

          <button
            onClick={() => handleNavClick('music')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'music' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <Music className="w-4 h-4 text-purple-500" />
            <span>Góc âm nhạc (MV Điều Chưa Nói)</span>
          </button>

          <button
            onClick={() => handleNavClick('letters')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'letters' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <Mail className="w-4 h-4 text-rose-500" />
            <span>Hộp thư yêu thương</span>
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'gallery' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <Image className="w-4 h-4 text-sky-500" />
            <span>Góc hình ảnh</span>
          </button>

          <button
            onClick={() => handleNavClick('research')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'research' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Về dự án</span>
          </button>

          <button
            onClick={() => handleNavClick('submit-story')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold bg-amber-50 text-amber-800`}
          >
            <Send className="w-4 h-4 text-amber-600" />
            <span>Kể LUMI nghe (Gửi câu chuyện)</span>
          </button>

          {isStaff && (
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-purple-200" />
                <span>Trang Quản Trị (CMS)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
