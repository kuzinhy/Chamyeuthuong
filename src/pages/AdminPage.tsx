import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
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
  Sparkles,
  Radio,
  Clock,
  Layers,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Compass,
  ChevronDown,
  Menu
} from 'lucide-react';
import { 
  Story, 
  Letter, 
  PhotovoiceItem, 
  SurveySubmission, 
  StorySubmission, 
  KindnessPoint, 
  ResearchItem, 
  GalleryMediaItem, 
  SiteSettings,
  ActiveNavPage,
  AuditLog
} from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { apiService, PresenceInfo } from '../services/api';
import { storageService } from '../services/storage';
import { Forbidden403Page } from './Forbidden403Page';
import { PROTECTED_ADMIN_EMAILS } from '../utils/adminAuth';

// Admin Sub-components
import { AdminStoriesTab } from '../components/admin/AdminStoriesTab';
import { AdminMapTab } from '../components/admin/AdminMapTab';
import { AdminLettersTab } from '../components/admin/AdminLettersTab';
import { AdminMusicTab } from '../components/admin/AdminMusicTab';
import { AdminGalleryTab } from '../components/admin/AdminGalleryTab';
import { AdminResearchTab } from '../components/admin/AdminResearchTab';
import { AdminSubmissionsTab } from '../components/admin/AdminSubmissionsTab';
import { AdminSettingsTab } from '../components/admin/AdminSettingsTab';
import { AdminAuditTab } from '../components/admin/AdminAuditTab';

interface AdminPageProps {
  letters: Letter[];
  photovoiceItems: PhotovoiceItem[];
  stories: Story[];
  surveys: SurveySubmission[];
  submissions: StorySubmission[];
  onApproveLetter: (id: string, reply?: string) => void;
  onRejectLetter: (id: string) => void;
  onDeleteLetter: (id: string) => void;
  onApprovePhotovoice: (id: string) => void;
  onRejectPhotovoice: (id: string) => void;
  onAddStory: (story: Story) => void;
  onUpdateStory?: (id: string, updates: Partial<Story>) => void;
  onDeleteStory?: (id: string) => void;
  onConvertSubmission?: (submissionId: string) => void;
  onRejectSubmission?: (submissionId: string, feedback?: string) => void;
  onNavigate?: (page: ActiveNavPage) => void;
}

export type AdminTabType = 
  | 'stories'
  | 'map'
  | 'letters'
  | 'music'
  | 'gallery'
  | 'research'
  | 'submissions'
  | 'settings'
  | 'audit';

export const AdminPage: React.FC<AdminPageProps> = ({
  letters,
  photovoiceItems,
  stories,
  surveys,
  submissions,
  onApproveLetter,
  onRejectLetter,
  onDeleteLetter,
  onApprovePhotovoice,
  onRejectPhotovoice,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  onConvertSubmission,
  onRejectSubmission,
  onNavigate
}) => {
  const { user, role, isAdmin, isSuperAdmin, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTabType>('stories');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real-time presences state
  const [presences, setPresences] = useState<PresenceInfo[]>([]);

  // Collections state managed within Admin
  const [mapPoints, setMapPoints] = useState<KindnessPoint[]>(() => storageService.getMapPoints());
  const [musicList, setMusicList] = useState<any[]>(() => storageService.getMusic());
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(() => storageService.getGallery());
  const [researchItems, setResearchItems] = useState<ResearchItem[]>(() => storageService.getResearch());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => storageService.getSiteSettings());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => storageService.getAuditLogs());
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Sync with server API on mount
  useEffect(() => {
    const syncData = async () => {
      try {
        const [serverPoints, serverMusic, serverGallery, serverResearch, serverSettings] = await Promise.all([
          apiService.getMapPoints().catch(() => null),
          apiService.getMusicItems().catch(() => null),
          apiService.getGalleryItems().catch(() => null),
          apiService.getResearchItems().catch(() => null),
          apiService.getSettings().catch(() => null)
        ]);

        if (serverPoints) setMapPoints(serverPoints);
        if (serverMusic) setMusicList(serverMusic);
        if (serverGallery) setGalleryItems(serverGallery);
        if (serverResearch) setResearchItems(serverResearch);
        if (serverSettings) setSiteSettings(serverSettings);
      } catch {
        // Fall back to storageService defaults
      }
    };

    syncData();
  }, []);

  // Real-time heartbeat / presence ping
  useEffect(() => {
    if (!user || !isAdmin) return;

    const ping = async () => {
      try {
        const activeList = await apiService.sendPresence(
          user.email,
          user.displayName || user.email.split('@')[0],
          activeTab
        );
        setPresences(activeList);
      } catch {
        // quiet fallback
      }
    };

    ping();
    const interval = setInterval(ping, 10000);
    return () => clearInterval(interval);
  }, [user, isAdmin, activeTab]);

  // Load audit logs from server
  const loadLogs = useCallback(async () => {
    if (!user) return;
    setIsLoadingLogs(true);
    try {
      const logs = await apiService.getAuditLogs(user.email);
      setAuditLogs(logs);
    } catch {
      setAuditLogs(storageService.getAuditLogs());
    } finally {
      setIsLoadingLogs(false);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'audit') {
      loadLogs();
    }
  }, [activeTab, loadLogs]);

  // Guard: User must be authenticated and is Admin
  if (!user || !isAdmin) {
    return <Forbidden403Page onNavigate={onNavigate || (() => {})} />;
  }

  // --- CRUD HANDLERS FOR MAP POINTS ---
  const handleAddMapPoint = async (point: Partial<KindnessPoint>) => {
    const created = storageService.addMapPoint(point);
    setMapPoints(storageService.getMapPoints());
    try {
      await apiService.createMapPoint(point, user.email);
    } catch {
      // already in localStorage
    }
    showToast('Đã thêm điểm tử tế mới vào bản đồ', { type: 'success' });
  };

  const handleUpdateMapPoint = async (id: string, updates: Partial<KindnessPoint>) => {
    const updated = storageService.updateMapPoint(id, updates);
    setMapPoints(updated);
    try {
      await apiService.updateMapPoint(id, updates, user.email);
    } catch {
      // local updated
    }
    showToast('Đã cập nhật điểm bản đồ thành công', { type: 'success' });
  };

  const handleDeleteMapPoint = async (id: string) => {
    const updated = storageService.deleteMapPoint(id);
    setMapPoints(updated);
    try {
      await apiService.deleteMapPoint(id, user.email);
    } catch {
      // local updated
    }
    showToast('Đã xóa điểm tử tế khỏi bản đồ', { type: 'info' });
  };

  // --- CRUD HANDLERS FOR MUSIC ---
  const handleAddMusic = async (song: any) => {
    const created = storageService.addMusicItem(song);
    setMusicList(storageService.getMusic());
    try {
      await apiService.createMusicItem(song, user.email);
    } catch {
      // local
    }
    showToast('Đã thêm ca khúc mới vào Góc âm nhạc 432Hz', { type: 'success' });
  };

  const handleUpdateMusic = async (id: string, updates: any) => {
    const updated = storageService.updateMusicItem(id, updates);
    setMusicList(updated);
    try {
      await apiService.updateMusicItem(id, updates, user.email);
    } catch {
      // local
    }
    showToast('Đã cập nhật thông tin ca khúc', { type: 'success' });
  };

  const handleDeleteMusic = async (id: string) => {
    const updated = storageService.deleteMusicItem(id);
    setMusicList(updated);
    try {
      await apiService.deleteMusicItem(id, user.email);
    } catch {
      // local
    }
    showToast('Đã xóa bài hát khỏi hệ thống', { type: 'info' });
  };

  // --- CRUD HANDLERS FOR GALLERY ---
  const handleAddGalleryItem = async (item: Partial<GalleryMediaItem>) => {
    const created = storageService.addGalleryItem(item);
    setGalleryItems(storageService.getGallery());
    try {
      await apiService.createGalleryItem(item, user.email);
    } catch {
      // local
    }
    showToast('Đã đăng tác phẩm hình ảnh mới', { type: 'success' });
  };

  const handleUpdateGalleryItem = async (id: string, updates: Partial<GalleryMediaItem>) => {
    const updated = storageService.updateGalleryItem(id, updates);
    setGalleryItems(updated);
    try {
      await apiService.updateGalleryItem(id, updates, user.email);
    } catch {
      // local
    }
    showToast('Đã cập nhật tác phẩm hình ảnh', { type: 'success' });
  };

  const handleDeleteGalleryItem = async (id: string) => {
    const updated = storageService.deleteGalleryItem(id);
    setGalleryItems(updated);
    try {
      await apiService.deleteGalleryItem(id, user.email);
    } catch {
      // local
    }
    showToast('Đã xóa tác phẩm khỏi thư viện', { type: 'info' });
  };

  // --- CRUD HANDLERS FOR RESEARCH ---
  const handleAddResearch = async (item: Partial<ResearchItem>) => {
    const created = storageService.addResearchItem(item);
    setResearchItems(storageService.getResearch());
    try {
      await apiService.createResearchItem(item, user.email);
    } catch {
      // local
    }
    showToast('Đã thêm đề tài nghiên cứu khoa học mới', { type: 'success' });
  };

  const handleUpdateResearch = async (id: string, updates: Partial<ResearchItem>) => {
    const updated = storageService.updateResearchItem(id, updates);
    setResearchItems(updated);
    try {
      await apiService.updateResearchItem(id, updates, user.email);
    } catch {
      // local
    }
    showToast('Đã cập nhật đề tài nghiên cứu', { type: 'success' });
  };

  const handleDeleteResearch = async (id: string) => {
    const updated = storageService.deleteResearchItem(id);
    setResearchItems(updated);
    try {
      await apiService.deleteResearchItem(id, user.email);
    } catch {
      // local
    }
    showToast('Đã xóa đề tài khỏi danh mục nghiên cứu', { type: 'info' });
  };

  // --- SETTINGS HANDLER ---
  const handleSaveSettings = async (newSettings: SiteSettings) => {
    storageService.saveSiteSettings(newSettings);
    setSiteSettings(newSettings);
    try {
      await apiService.updateSettings(newSettings, user.email);
    } catch {
      // local
    }
    showToast('Đã lưu cấu hình chung website', { type: 'success' });
  };

  // Count pending submissions
  const pendingSubmissionsCount = submissions.filter(s => s.status === 'pending').length;
  const pendingLettersCount = letters.filter(l => l.status === 'pending').length;
  const otherAdminsOnline = presences.filter(p => p.userId?.toLowerCase() !== user.email.toLowerCase()).length;

  // 9 functional modules organized into 3 clear categories for the vertical left sidebar
  const menuCategories = [
    {
      title: 'Nội Dung Tử Tế',
      items: [
        {
          id: 'stories' as AdminTabType,
          label: '1. Câu chuyện tử tế',
          icon: BookOpen,
          badge: (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'stories' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {stories.length}
            </span>
          )
        },
        {
          id: 'map' as AdminTabType,
          label: '2. Bản đồ tử tế',
          icon: Compass,
          badge: (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'map' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {mapPoints.length}
            </span>
          )
        },
        {
          id: 'letters' as AdminTabType,
          label: '3. Hộp thư yêu thương',
          icon: Mail,
          badge: pendingLettersCount > 0 ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
              {pendingLettersCount} chờ
            </span>
          ) : (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'letters' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {letters.length}
            </span>
          )
        },
        {
          id: 'music' as AdminTabType,
          label: '4. Góc âm nhạc 432Hz',
          icon: Music,
          badge: (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'music' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {musicList.length}
            </span>
          )
        },
        {
          id: 'gallery' as AdminTabType,
          label: '5. Hình ảnh & Photovoice',
          icon: ImageIcon,
          badge: (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'gallery' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {galleryItems.length + photovoiceItems.length}
            </span>
          )
        },
        {
          id: 'research' as AdminTabType,
          label: '6. Đề tài nghiên cứu',
          icon: GraduationCap,
          badge: (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'research' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {researchItems.length}
            </span>
          )
        }
      ]
    },
    {
      title: 'Tiếp Nhận & Đóng Góp',
      items: [
        {
          id: 'submissions' as AdminTabType,
          label: '7. Bài đóng góp (Kể LUMI)',
          icon: Send,
          badge: pendingSubmissionsCount > 0 ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-sky-100 text-sky-800 border border-sky-300 animate-pulse">
              {pendingSubmissionsCount} mới
            </span>
          ) : (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              activeTab === 'submissions' 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-100 group-hover:text-sky-700'
            }`}>
              {submissions.length}
            </span>
          )
        }
      ]
    },
    {
      title: 'Hệ Thống & Điều Hành',
      items: [
        {
          id: 'settings' as AdminTabType,
          label: '8. Cấu hình website',
          icon: Settings,
          badge: undefined
        },
        {
          id: 'audit' as AdminTabType,
          label: '9. Quản trị & Kiểm toán',
          icon: Users,
          badge: (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Online
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-slate-50 text-slate-800 relative overflow-hidden font-sans selection:bg-sky-500 selection:text-white pt-20 pb-20">
      {/* High-tech Blue Glow / Ambient Soft Lighting */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[26rem] h-[26rem] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Top Command Bar: Modern Tech Blue & Clean White */}
        <div className="bg-white/95 backdrop-blur-xl border border-sky-100/90 rounded-3xl p-5 shadow-lg shadow-sky-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 p-0.5 shadow-md shadow-sky-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-sky-600" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/40" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Trung Tâm Quản Trị Hệ Thống LUMI</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 uppercase tracking-wider">
                    CMS 2.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>Quản trị viên: <strong className="text-sky-700 font-bold">{user.email}</strong></span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {otherAdminsOnline > 0 ? `Có ${otherAdminsOnline} quản trị viên khác đang online` : 'Hệ thống an toàn / Trực tuyến'}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                <span>Xem Trang Công Khai</span>
              </button>
            )}

            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all cursor-pointer shadow-2xs"
              title="Đăng xuất khỏi hệ thống quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* 2-Column Command Workspace: Vertical Left Sidebar & Right Dynamic Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT VERTICAL SIDEBAR MENU (Mép trái - Tone Xanh, Trắng, Nhạt) */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-24 space-y-4">
            
            {/* Mobile Expand / Collapse Bar */}
            <div className="lg:hidden bg-white/95 border border-sky-100 rounded-2xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800">
                  {menuCategories.flatMap(c => c.items).find(i => i.id === activeTab)?.label || 'Chọn phân hệ'}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-xs font-bold text-sky-700 border border-sky-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>{mobileMenuOpen ? 'Đóng menu' : 'Đổi phân hệ'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sidebar Content Panel */}
            <div className={`bg-white/95 backdrop-blur-xl border border-sky-100/90 rounded-3xl p-4 sm:p-5 shadow-lg shadow-sky-500/5 space-y-5 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200/80 shadow-2xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Menu Quản Trị
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-extrabold">
                  9 Phân hệ
                </span>
              </div>

              {/* Vertical Menu Groups */}
              <nav className="space-y-4">
                {menuCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-1.5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1">
                      {cat.title}
                    </div>

                    <div className="space-y-1">
                      {cat.items.map((item) => {
                        const isActive = activeTab === item.id;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all duration-150 text-left group cursor-pointer ${
                              isActive
                                ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-600 text-white shadow-md shadow-sky-500/20'
                                : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50/80'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                                isActive
                                  ? 'bg-white/20 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-700'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className={`truncate text-xs ${isActive ? 'text-white font-black' : 'font-semibold group-hover:text-sky-800'}`}>
                                {item.label}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {item.badge}
                              {isActive && (
                                <ChevronRight className="w-3.5 h-3.5 text-white animate-pulse" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Sidebar Footer: System Status */}
              <div className="pt-3 border-t border-sky-100">
                <div className="bg-gradient-to-br from-sky-50/90 via-blue-50/50 to-slate-50 rounded-2xl p-3.5 border border-sky-200/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Trạng thái máy chủ:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Trực tuyến
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Đồng bộ:</span>
                    <span className="text-sky-700 font-bold">Thời gian thực</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Phân quyền:</span>
                    <span className="text-indigo-700 font-bold">
                      {isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* RIGHT WORKSPACE: Dynamic Tab Body */}
          <main className="flex-1 w-full min-w-0">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-sky-500/5 border border-sky-100/90 text-slate-800 transition-all duration-200">
          
          {activeTab === 'stories' && (
            <AdminStoriesTab
              stories={stories}
              onAddStory={onAddStory}
              onUpdateStory={onUpdateStory}
              onDeleteStory={onDeleteStory}
              operatorEmail={user.email}
              onSelectStory={(story) => {
                if (onNavigate) {
                  onNavigate('stories');
                }
              }}
            />
          )}

          {activeTab === 'map' && (
            <AdminMapTab
              points={mapPoints}
              onAddPoint={handleAddMapPoint}
              onUpdatePoint={handleUpdateMapPoint}
              onDeletePoint={handleDeleteMapPoint}
              onNavigateToMap={onNavigate ? () => onNavigate('map') : undefined}
            />
          )}

          {activeTab === 'letters' && (
            <AdminLettersTab
              letters={letters}
              onApproveLetter={onApproveLetter}
              onRejectLetter={onRejectLetter}
              onDeleteLetter={onDeleteLetter}
              onAddLetter={(letter) => {
                storageService.addLetter(letter);
                showToast('Đã đăng lá thư mới vào Hộp thư', { type: 'success' });
              }}
              onUpdateLetter={(id, updates) => {
                storageService.updateLetter(id, updates);
                showToast('Đã lưu nội dung lá thư', { type: 'success' });
              }}
            />
          )}

          {activeTab === 'music' && (
            <AdminMusicTab
              musicList={musicList}
              onAddMusic={handleAddMusic}
              onUpdateMusic={handleUpdateMusic}
              onDeleteMusic={handleDeleteMusic}
              onNavigateToMusic={onNavigate ? () => onNavigate('music') : undefined}
            />
          )}

          {activeTab === 'gallery' && (
            <AdminGalleryTab
              galleryItems={galleryItems}
              photovoiceItems={photovoiceItems}
              onAddGalleryItem={handleAddGalleryItem}
              onUpdateGalleryItem={handleUpdateGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
              onApprovePhotovoice={onApprovePhotovoice}
              onRejectPhotovoice={onRejectPhotovoice}
              onNavigateToGallery={onNavigate ? () => onNavigate('gallery') : undefined}
            />
          )}

          {activeTab === 'research' && (
            <AdminResearchTab
              researchItems={researchItems}
              onAddResearch={handleAddResearch}
              onUpdateResearch={handleUpdateResearch}
              onDeleteResearch={handleDeleteResearch}
              onNavigateToResearch={onNavigate ? () => onNavigate('research') : undefined}
            />
          )}

          {activeTab === 'submissions' && (
            <AdminSubmissionsTab
              submissions={submissions}
              onConvertSubmission={(id) => {
                if (onConvertSubmission) onConvertSubmission(id);
                showToast('Đã phê duyệt và chuyển thành Câu chuyện tử tế công khai!', { type: 'success' });
              }}
              onRejectSubmission={(id, feedback) => {
                if (onRejectSubmission) onRejectSubmission(id, feedback);
                showToast('Đã từ chối bài đóng góp', { type: 'info' });
              }}
              onDeleteSubmission={(id) => {
                storageService.deleteSubmission(id);
                showToast('Đã xóa bài đóng góp', { type: 'info' });
              }}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsTab
              settings={siteSettings}
              onSaveSettings={handleSaveSettings}
              onResetDatabase={() => {
                storageService.resetToDefaults();
                showToast('Đã khôi phục dữ liệu mẫu ban đầu!', { type: 'sparkle' });
                window.location.reload();
              }}
            />
          )}

          {activeTab === 'audit' && (
            <AdminAuditTab
              logs={auditLogs}
              presences={presences}
              currentUserEmail={user.email}
              onRefreshLogs={loadLogs}
              isLoading={isLoadingLogs}
            />
          )}

            </div>
          </main>
        </div>

      </div>
    </div>
  );
};
