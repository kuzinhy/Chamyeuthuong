import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MapPin, 
  Mail, 
  Music, 
  Image as ImageIcon, 
  GraduationCap, 
  Send, 
  Settings, 
  Users, 
  LogOut, 
  ExternalLink,
  Clock,
  Layout,
  History,
  Menu,
  X,
  ChevronRight,
  Bell,
  Sparkles,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Forbidden403Page } from './Forbidden403Page';
import { ActiveNavPage } from '../types';

// Admin Sub-components
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminStoriesTab } from '../components/admin/AdminStoriesTab';
import { AdminMapTab } from '../components/admin/AdminMapTab';
import { AdminLettersTab } from '../components/admin/AdminLettersTab';
import { AdminMusicTab } from '../components/admin/AdminMusicTab';
import { AdminGalleryTab } from '../components/admin/AdminGalleryTab';
import { AdminResearchTab } from '../components/admin/AdminResearchTab';
import { AdminSubmissionsTab } from '../components/admin/AdminSubmissionsTab';
import { AdminSettingsTab } from '../components/admin/AdminSettingsTab';
import { AdminAuditTab } from '../components/admin/AdminAuditTab';
import { AdminHomepageTab } from '../components/admin/AdminHomepageTab';
import { AdminUsersTab } from '../components/admin/AdminUsersTab';

export type AdminTabType = 
  | 'dashboard'
  | 'stories'
  | 'homepage'
  | 'map'
  | 'letters'
  | 'music'
  | 'gallery'
  | 'research'
  | 'submissions'
  | 'settings'
  | 'audit'
  | 'users';

const MENU_GROUPS = [
  {
    title: 'Tổng quan',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'audit', label: 'Nhật ký hoạt động', icon: History },
    ]
  },
  {
    title: 'Quản lý Nội dung',
    items: [
      { id: 'homepage', label: 'Trang chủ (CMS)', icon: Layout },
      { id: 'stories', label: 'Bài viết / Chuyện kể', icon: BookOpen },
      { id: 'submissions', label: 'Duyệt bài gửi về', icon: Send },
      { id: 'letters', label: 'Hộp thư yêu thương', icon: Mail },
    ]
  },
  {
    title: 'Media & Interactive',
    items: [
      { id: 'gallery', label: 'Thư viện Media', icon: ImageIcon },
      { id: 'map', label: 'Bản đồ tử tế', icon: MapPin },
      { id: 'music', label: 'Âm nhạc 432Hz', icon: Music },
      { id: 'research', label: 'Nghiên cứu hành vi', icon: GraduationCap },
    ]
  },
  {
    title: 'Hệ thống',
    items: [
      { id: 'users', label: 'Người dùng & Quyền', icon: Users },
      { id: 'settings', label: 'Cài đặt chung', icon: Settings },
    ]
  }
];

interface AdminPageProps {
  onNavigate?: (page: ActiveNavPage) => void;
}

const AdminPageComponent: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user, role, isAdmin, isEditor, logout, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (authLoading) return null;

  if (!user || (!isAdmin && !isEditor)) {
    return <Forbidden403Page onNavigate={(p) => onNavigate ? onNavigate(p) : (window.location.href = '/')} />;
  }

  const menuGroups = MENU_GROUPS;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard onNavigate={setActiveTab} />;
      case 'stories': return <AdminStoriesTab />;
      case 'homepage': return <AdminHomepageTab onNavigate={onNavigate} />;
      case 'map': return <AdminMapTab />;
      case 'letters': return <AdminLettersTab />;
      case 'music': return <AdminMusicTab />;
      case 'gallery': return <AdminGalleryTab />;
      case 'research': return <AdminResearchTab />;
      case 'submissions': return <AdminSubmissionsTab />;
      case 'users': return <AdminUsersTab />;
      case 'settings': return <AdminSettingsTab />;
      case 'audit': return <AdminAuditTab />;
      default: return <AdminDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside 
        className={`bg-slate-900 text-slate-400 flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden lg:flex`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="ml-3 font-black text-white tracking-tighter text-xl">LUMI CMS</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {sidebarOpen && <p className="px-6 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{group.title}</p>}
              <nav className="px-3 space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTabType)}
                    className={`w-full flex items-center h-10 px-3 rounded-xl transition-all cursor-pointer ${
                      activeTab === item.id 
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' 
                        : 'hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                    {sidebarOpen && <span className="ml-3 text-sm font-bold truncate">{item.label}</span>}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <button 
            onClick={() => onNavigate ? onNavigate('home') : (window.location.href = '/')}
            className={`w-full flex items-center h-10 px-3 rounded-xl text-sky-400 bg-sky-950/40 hover:bg-sky-900/50 transition-all cursor-pointer ${!sidebarOpen && 'justify-center'}`}
            title="Quay lại xem Website"
          >
            <Home className="w-5 h-5 flex-shrink-0 text-sky-400" />
            {sidebarOpen && <span className="ml-3 text-sm font-bold">Về Website</span>}
          </button>
          <button 
            onClick={logout}
            className={`w-full flex items-center h-10 px-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3 text-sm font-bold">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-200 hidden lg:block" />
            <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="hidden sm:inline">QUẢN TRỊ VIÊN</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 uppercase">
                {menuGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate ? onNavigate('home') : (window.location.href = '/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-xl text-xs font-bold transition-all border border-slate-200/80 cursor-pointer shadow-2xs"
              title="Quay lại trang chủ người dùng"
            >
              <Home className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Về Website</span>
            </button>

            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Hệ thống Trực tuyến</span>
            </div>
            
            <button 
              onClick={() => setActiveTab('audit')}
              title="Xem nhật ký hoạt động / thông báo"
              className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">{user?.displayName}</p>
                <p className="text-[10px] font-black text-sky-600 uppercase mt-1 leading-none">{user?.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-[10px] bg-white overflow-hidden flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-sky-600 text-sm">{user?.displayName?.charAt(0)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <aside 
            className="absolute top-0 left-0 bottom-0 w-72 bg-slate-900 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span className="ml-3 font-black text-white tracking-tighter text-xl">LUMI CMS</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
              {menuGroups.map((group, idx) => (
                <div key={idx} className="mb-6">
                  <p className="px-6 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{group.title}</p>
                  <nav className="px-3 space-y-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as AdminTabType);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center h-12 px-4 rounded-xl transition-all cursor-pointer ${
                          activeTab === item.id 
                            ? 'bg-sky-600 text-white' 
                            : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="ml-3 text-sm font-bold">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 space-y-2">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('home');
                  else window.location.href = '/';
                }}
                className="w-full flex items-center h-11 px-4 rounded-xl text-sky-400 bg-sky-950/60 hover:bg-sky-900/60 font-bold transition-all cursor-pointer"
              >
                <Home className="w-5 h-5" />
                <span className="ml-3 text-sm">Quay lại Website</span>
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center h-11 px-4 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3 text-sm font-bold">Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export const AdminPage = React.memo(AdminPageComponent);
