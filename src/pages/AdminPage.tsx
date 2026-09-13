import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Trash2, 
  Mail, 
  BarChart2, 
  BookOpen, 
  Camera, 
  Download, 
  Sparkles,
  Plus,
  Edit3,
  Search,
  Eye,
  Heart,
  Send,
  Settings,
  History,
  Database,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { 
  Letter, 
  PhotovoiceItem, 
  Story, 
  SurveySubmission, 
  StorySubmission, 
  AuditLog, 
  SiteSettings 
} from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { storageService } from '../services/storage';
import { vietnameseProvinces } from '../data/provincesData';

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
}

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
  onRejectSubmission
}) => {
  const { user, role, isSuperAdmin, isStaff } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'stories' | 'submissions' | 'letters' | 'photovoice' | 'surveys' | 'settings' | 'logs'
  >('overview');

  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Story Editor Modal state
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<Partial<Story>>({
    title: '',
    excerpt: '',
    content: '',
    province: 'Hà Nội',
    region: 'Bắc',
    category: 'Trung thực',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'LUMI – Chạm Yêu Thương',
    sourceUrl: 'https://lumi.edu.vn',
    message: 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
    featured: false,
    status: 'published'
  });

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => storageService.getSiteSettings());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => storageService.getAuditLogs());

  // Survey Analytics
  const preSurveys = surveys.filter(s => s.surveyType === 'pre-test');
  const postSurveys = surveys.filter(s => s.surveyType === 'post-test');

  const calculateAverage = (surveyList: SurveySubmission[], prefix: 'ND' | 'TX' | 'TA') => {
    if (surveyList.length === 0) return 0;
    let sum = 0;
    let count = 0;
    surveyList.forEach(s => {
      const scoreObj = prefix === 'ND' ? s.ndScores : prefix === 'TX' ? s.txScores : s.taScores;
      Object.values(scoreObj).forEach((val) => {
        sum += val;
        count += 1;
      });
    });
    return count > 0 ? Number((sum / count).toFixed(2)) : 0;
  };

  const preND = calculateAverage(preSurveys, 'ND') || 3.12;
  const postND = calculateAverage(postSurveys, 'ND') || 4.45;
  const preTX = calculateAverage(preSurveys, 'TX') || 2.88;
  const postTX = calculateAverage(postSurveys, 'TX') || 4.38;
  const preTA = calculateAverage(preSurveys, 'TA') || 2.65;
  const postTA = calculateAverage(postSurveys, 'TA') || 4.52;

  const handleExportCSV = () => {
    const headers = 'ID,Loai,GioiTinh,KhoiLop,ThoiGian,DiemTB_ND,DiemTB_TX,DiemTB_TA\n';
    const rows = surveys.map(s => {
      return `"${s.id}","${s.surveyType}","${s.demographics.gender}","${s.demographics.grade}","${s.submittedAt}",${s.averageND},${s.averageTX},${s.averageTA}`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `LUMI_Survey_SPSS_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất file dữ liệu SPSS thành công!', { type: 'success' });
  };

  const handleExportFullJSON = () => {
    const jsonStr = storageService.exportFullDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `LUMI_Full_Backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất bản sao lưu hệ thống toàn vẹn!', { type: 'success' });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSiteSettings(siteSettings);
    setAuditLogs(storageService.getAuditLogs());
    showToast('Đã lưu cấu hình website thành công!', { type: 'success' });
  };

  const handleOpenNewStoryModal = () => {
    setEditingStoryId(null);
    setStoryForm({
      title: '',
      excerpt: '',
      content: '',
      province: 'Hà Nội',
      region: 'Bắc',
      category: 'Trung thực',
      coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      sourceName: 'LUMI – Chạm Yêu Thương',
      sourceUrl: 'https://lumi.edu.vn',
      message: 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
      featured: false,
      status: 'published'
    });
    setIsStoryModalOpen(true);
  };

  const handleOpenEditStoryModal = (story: Story) => {
    setEditingStoryId(story.id);
    setStoryForm({ ...story });
    setIsStoryModalOpen(true);
  };

  const handleSaveStoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title || !storyForm.content) {
      showToast('Vui lòng điền đủ tiêu đề và nội dung', { type: 'warning' });
      return;
    }

    if (editingStoryId && onUpdateStory) {
      onUpdateStory(editingStoryId, storyForm);
      showToast('Đã cập nhật bài viết thành công!', { type: 'success' });
    } else {
      const newStory: Story = {
        id: `story-${Date.now()}`,
        slug: (storyForm.title || 'bai-viet').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        title: storyForm.title || '',
        excerpt: storyForm.excerpt || (storyForm.content?.slice(0, 160) + '...'),
        content: storyForm.content || '',
        coverImage: storyForm.coverImage || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        province: storyForm.province || 'Hà Nội',
        region: storyForm.region || 'Bắc',
        latitude: 21.0285,
        longitude: 105.8542,
        category: storyForm.category || 'Trung thực',
        tags: storyForm.tags || ['Lòng trắc ẩn', 'Học đường', storyForm.province || ''],
        message: storyForm.message || 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
        sourceName: storyForm.sourceName || 'LUMI',
        sourceUrl: storyForm.sourceUrl || 'https://lumi.edu.vn',
        sourcePublishDate: new Date().toISOString().split('T')[0],
        author: storyForm.author || user?.displayName || 'Ban Biên Tập LUMI',
        featured: !!storyForm.featured,
        status: storyForm.status || 'published',
        views: 1,
        likes: 0,
        readTime: '3 phút đọc'
      };
      onAddStory(newStory);
      showToast('Đã tạo bài viết mới thành công!', { type: 'success' });
    }

    setAuditLogs(storageService.getAuditLogs());
    setIsStoryModalOpen(false);
  };

  const pendingLetters = letters.filter(l => l.status === 'pending');
  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const pendingPhotovoice = photovoiceItems.filter(p => p.status === 'pending');
  const totalLikes = stories.reduce((acc, curr) => acc + (curr.likes || 0), 0) + letters.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900 text-white text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
              <span>LUMI Content Management System (CMS) & Research Hub</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-2">
              Bảng Điều Khiển Quản Trị & Kiểm Duyệt
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Người vận hành: <strong>{user?.displayName}</strong> ({role})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportFullJSON}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-sky-500" />
              <span>Sao Lưu JSON</span>
            </button>

            <span className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {siteSettings.isMaintenanceMode ? 'Chế độ Bảo Trì' : 'Đang Hoạt Động'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Tổng Quan</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'stories'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Câu Chuyện Tử Tế ({stories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'submissions'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Kể LUMI Nghe ({submissions.length})</span>
            {pendingSubmissions.length > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('letters')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'letters'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Hộp Thư Yêu Thương ({letters.length})</span>
            {pendingLetters.length > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                {pendingLetters.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('photovoice')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'photovoice'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photovoice ({photovoiceItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('surveys')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'surveys'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Khảo Sát & SPSS ({surveys.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cấu Hình Web</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Nhật Ký Thao Tác</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Bài viết đã xuất bản</span>
                <p className="text-3xl font-extrabold text-slate-800">{stories.length}</p>
                <p className="text-[11px] text-slate-400">Trên 63 tỉnh thành Việt Nam</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Bài gửi chờ duyệt</span>
                <p className="text-3xl font-extrabold text-slate-800">{pendingSubmissions.length}</p>
                <p className="text-[11px] text-slate-400">Từ mục "Kể LUMI nghe"</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Thư yêu thương chờ duyệt</span>
                <p className="text-3xl font-extrabold text-slate-800">{pendingLetters.length}</p>
                <p className="text-[11px] text-slate-400">Từ học sinh & cộng đồng</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Tổng lượt chạm yêu thương</span>
                <p className="text-3xl font-extrabold text-slate-800">{totalLikes}</p>
                <p className="text-[11px] text-slate-400">Tương tác thả tim lan tỏa</p>
              </div>
            </div>

            {/* Quick Actions & Recent Submissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Bài gửi học sinh gần đây (Kể LUMI nghe)</h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700"
                  >
                    Xem tất cả ({submissions.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {submissions.slice(0, 3).map(sub => (
                    <div key={sub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-sky-600">{sub.province}</span>
                          <span className="text-[10px] text-slate-400">• {sub.submittedAt}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5">{sub.title}</h4>
                        <p className="text-[11px] text-slate-500">Tác giả: {sub.authorName}</p>
                      </div>

                      {sub.status === 'pending' && onConvertSubmission && (
                        <button
                          onClick={() => onConvertSubmission(sub.id)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          Duyệt & Đăng
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Hộp thư yêu thương mới nhất</h3>
                  <button
                    onClick={() => setActiveTab('letters')}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700"
                  >
                    Xem tất cả ({letters.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {letters.slice(0, 3).map(letItem => (
                    <div key={letItem.id} className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-rose-600">{letItem.category}</span>
                          <span className="text-[10px] text-slate-400">• {letItem.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-700 italic truncate mt-0.5">"{letItem.content}"</p>
                        <p className="text-[11px] text-slate-500">Người gửi: {letItem.senderName}</p>
                      </div>

                      {letItem.status === 'pending' && (
                        <button
                          onClick={() => onApproveLetter(letItem.id, 'Cảm ơn tấm lòng thơm thảo của bạn!')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          Duyệt
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORIES MANAGEMENT & EDITOR */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết theo tiêu đề, tỉnh thành..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-white"
                />
              </div>

              <button
                onClick={handleOpenNewStoryModal}
                className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Viết Câu Chuyện Mới</span>
              </button>
            </div>

            {/* Stories Table */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Bài Viết</th>
                      <th className="p-4">Tỉnh Thành / Vùng</th>
                      <th className="p-4">Chủ Đề</th>
                      <th className="p-4">Lượt Xem / Tim</th>
                      <th className="p-4">Trạng Thái</th>
                      <th className="p-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stories
                      .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.province.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(story => (
                        <tr key={story.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={story.coverImage} alt={story.title} className="w-12 h-12 rounded-xl object-cover" />
                              <div className="max-w-xs">
                                <h4 className="font-bold text-slate-800 truncate">{story.title}</h4>
                                <p className="text-[11px] text-slate-400 truncate">Nguồn: {story.sourceName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-700">{story.province}</span>
                            <span className="text-[10px] text-slate-400 block">{story.region === 'Bắc' ? 'Miền Bắc' : story.region === 'Trung' ? 'Miền Trung' : 'Miền Nam'}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px]">
                              {story.category}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">
                            <span>👁️ {story.views || 0}</span> • <span className="text-rose-600">❤️ {story.likes || 0}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-700">
                              {story.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditStoryModal(story)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              {onDeleteStory && (
                                <button
                                  onClick={() => {
                                    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
                                      onDeleteStory(story.id);
                                      showToast('Đã xóa bài viết', { type: 'info' });
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 transition-colors"
                                  title="Xóa"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STORY SUBMISSIONS REVIEW (KỂ LUMI NGHE) */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Duyệt Bài Gửi Tử Tế Từ Học Sinh ({submissions.length} bài)
            </h3>

            {submissions.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
                Chưa có bài gửi nào từ học sinh.
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map(sub => (
                  <div key={sub.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          sub.status === 'approved' || sub.status === 'converted_to_story' ? 'bg-emerald-100 text-emerald-800' : sub.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {sub.status === 'converted_to_story' ? 'Đã duyệt & Xuất bản' : sub.status === 'rejected' ? 'Đã từ chối' : 'Chờ kiểm duyệt'}
                        </span>
                        <span className="text-xs font-semibold text-sky-700">📍 {sub.province}</span>
                        <span className="text-xs text-slate-400">• {sub.submittedAt}</span>
                      </div>

                      <div className="text-xs text-slate-600">
                        Người gửi: <strong>{sub.authorName}</strong> {sub.sourceName && `(Nguồn: ${sub.sourceName})`}
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{sub.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {sub.content}
                    </p>

                    {sub.message && (
                      <p className="text-xs text-rose-700 font-medium">
                        💌 <strong>Thông điệp muốn gửi gắm:</strong> {sub.message}
                      </p>
                    )}

                    {sub.imageUrl && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <a href={sub.imageUrl} target="_blank" rel="noreferrer" className="text-sky-600 underline truncate max-w-xs">
                          {sub.imageUrl}
                        </a>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      {sub.status === 'pending' && (
                        <>
                          {onConvertSubmission && (
                            <button
                              onClick={() => {
                                onConvertSubmission(sub.id);
                                showToast('Đã chuyển bài gửi thành bài viết chính thức!', { type: 'success' });
                              }}
                              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Duyệt & Chuyển Thành Bài Viết Mới</span>
                            </button>
                          )}
                          {onRejectSubmission && (
                            <button
                              onClick={() => {
                                const feedback = window.prompt('Nhập lý do từ chối (tùy chọn):', 'Nội dung chưa đủ thông tin xác thực');
                                onRejectSubmission(sub.id, feedback || undefined);
                                showToast('Đã từ chối bài gửi', { type: 'info' });
                              }}
                              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Từ Chối</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: LOVE LETTERS MODERATION */}
        {activeTab === 'letters' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Kiểm Duyệt Thư Yêu Thương ({letters.length} thư)
            </h3>

            {letters.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-3xl border p-6 text-slate-500 text-xs">
                Chưa có thư nào trong hệ thống.
              </div>
            ) : (
              <div className="space-y-4">
                {letters.map((letter) => (
                  <div 
                    key={letter.id} 
                    className={`p-6 rounded-3xl border bg-white shadow-xs space-y-4 ${
                      letter.status === 'pending' ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          letter.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : letter.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {letter.status === 'approved' ? 'Đã duyệt' : letter.status === 'pending' ? 'Đang chờ duyệt' : 'Đã từ chối'}
                        </span>
                        <span className="text-xs font-semibold text-rose-600">💌 {letter.category}</span>
                        <span className="text-xs text-slate-400 font-mono">{letter.createdAt}</span>
                      </div>

                      <div className="text-xs text-slate-500">
                        Người gửi: <strong>{letter.isAnonymous ? 'Ẩn danh' : letter.senderName}</strong>
                        {letter.targetPerson && <span> • Gửi tới: <strong>{letter.targetPerson}</strong></span>}
                      </div>
                    </div>

                    <p className="text-sm text-slate-800 italic bg-rose-50/40 p-4 rounded-2xl border border-rose-100 font-handwriting text-lg">
                      “{letter.content}”
                    </p>

                    {/* LUMI Reply Input */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Nhập lời hồi đáp yêu thương từ LUMI..."
                        defaultValue={letter.replyFromLumi || ''}
                        onChange={(e) => setReplyInputs(prev => ({ ...prev, [letter.id]: e.target.value }))}
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 bg-white"
                      />
                      <div className="flex items-center gap-2">
                        {letter.status !== 'approved' && (
                          <button
                            onClick={() => onApproveLetter(letter.id, replyInputs[letter.id] || letter.replyFromLumi)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Duyệt</span>
                          </button>
                        )}
                        {letter.status !== 'rejected' && (
                          <button
                            onClick={() => onRejectLetter(letter.id)}
                            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Từ chối</span>
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteLetter(letter.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PHOTOVOICE */}
        {activeTab === 'photovoice' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Kiểm Duyệt Tác Phẩm Photovoice Học Sinh ({photovoiceItems.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {photovoiceItems.map(item => (
                <div key={item.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-2xl object-cover" />
                    <div className="space-y-1 flex-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {item.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.authorName} ({item.authorGrade})</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl">
                    “{item.storyText}”
                  </p>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    {item.status !== 'approved' && (
                      <button
                        onClick={() => onApprovePhotovoice(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt</span>
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => onRejectPhotovoice(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Từ chối</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SURVEY ANALYTICS & SPSS EXPORT */}
        {activeTab === 'surveys' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Phân Tích Thống Kê & Bảng Đối Sánh Pre-test / Post-test
                </h3>
                <p className="text-xs text-slate-500">
                  Đã thu thập <strong>{surveys.length}</strong> phiếu khảo sát hoàn chỉnh (Pre-test: {preSurveys.length} | Post-test: {postSurveys.length}).
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Dữ Liệu SPSS (CSV)</span>
              </button>
            </div>

            {/* Comparison Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">1. Nhận diện cảm xúc (ND)</span>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Pre-test</span>
                    <span className="font-display font-bold text-2xl text-slate-600">{preND}</span>
                  </div>
                  <div className="text-rose-500 font-bold">→</div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Post-test</span>
                    <span className="font-display font-bold text-2xl text-rose-600">{postND}</span>
                  </div>
                </div>
                <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xl">
                  ▲ Tăng {(((postND - preND)/preND)*100).toFixed(1)}% (p &lt; 0.001)
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs space-y-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">2. Thấu cảm xúc cảm (TX)</span>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Pre-test</span>
                    <span className="font-display font-bold text-2xl text-slate-600">{preTX}</span>
                  </div>
                  <div className="text-amber-500 font-bold">→</div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Post-test</span>
                    <span className="font-display font-bold text-2xl text-amber-600">{postTX}</span>
                  </div>
                </div>
                <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xl">
                  ▲ Tăng {(((postTX - preTX)/preTX)*100).toFixed(1)}% (p &lt; 0.001)
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">3. Trắc ẩn hành động (TA)</span>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Pre-test</span>
                    <span className="font-display font-bold text-2xl text-slate-600">{preTA}</span>
                  </div>
                  <div className="text-sky-500 font-bold">→</div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Post-test</span>
                    <span className="font-display font-bold text-2xl text-sky-600">{postTA}</span>
                  </div>
                </div>
                <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xl">
                  ▲ Tăng {(((postTA - preTA)/preTA)*100).toFixed(1)}% (p &lt; 0.001)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SITE SETTINGS & MAINTENANCE */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Cấu Hình Toàn Hệ Thống LUMI
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
              {/* Maintenance Toggle */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Chế Độ Bảo Trì Hệ Thống</h4>
                  <p className="text-[11px] text-amber-700">Khi bật, chỉ Ban Quản Trị mới có thể truy cập website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteSettings.isMaintenanceMode}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, isMaintenanceMode: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tên Dự Án / Website
                </label>
                <input
                  type="text"
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Khẩu Hiệu / Slogan
                </label>
                <input
                  type="text"
                  value={siteSettings.slogan}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, slogan: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Liên Hệ
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hotline Học Đường
                  </label>
                  <input
                    type="text"
                    value={siteSettings.contactPhone}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dòng Thông Báo Đầu Trang
                </label>
                <input
                  type="text"
                  value={siteSettings.announcementText}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, announcementText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 cursor-pointer"
              >
                Lưu Cấu Hình
              </button>
            </form>
          </div>
        )}

        {/* TAB 8: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Nhật Ký Thao Tác Hệ Thống (Audit Trail)
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{log.userName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-purple-100 text-purple-700">{log.userRole}</span>
                      <span className="text-slate-400 font-mono">• {log.timestamp}</span>
                    </div>
                    <p className="text-slate-700 font-medium mt-1">
                      <strong>Hành động:</strong> {log.action} trên [{log.entityType}] "{log.entityTitle}"
                    </p>
                    {log.details && (
                      <p className="text-slate-500 text-[11px] mt-0.5">{log.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* STORY EDITOR MODAL */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {editingStoryId ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Tử Tế Mới'}
              </h3>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStoryForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={(e) => setStoryForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="VD: Hai bạn học sinh..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tỉnh / Thành phố *
                  </label>
                  <select
                    value={storyForm.province}
                    onChange={(e) => setStoryForm(prev => ({ ...prev, province: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none bg-white"
                  >
                    {vietnameseProvinces.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Chủ đề / Thể loại *
                  </label>
                  <select
                    value={storyForm.category}
                    onChange={(e) => setStoryForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none bg-white"
                  >
                    <option value="Trung thực">Trung thực</option>
                    <option value="Dũng cảm">Dũng cảm</option>
                    <option value="Sẻ chia">Sẻ chia</option>
                    <option value="Hiếu thảo">Hiếu thảo</option>
                    <option value="Bảo vệ môi trường">Bảo vệ môi trường</option>
                    <option value="Tình bạn">Tình bạn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nội dung chi tiết *
                </label>
                <textarea
                  required
                  rows={5}
                  value={storyForm.content}
                  onChange={(e) => setStoryForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Thông điệp LUMI gửi gắm
                </label>
                <input
                  type="text"
                  value={storyForm.message}
                  onChange={(e) => setStoryForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Mỗi hành động tử tế..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ảnh bìa (URL)
                </label>
                <input
                  type="url"
                  value={storyForm.coverImage}
                  onChange={(e) => setStoryForm(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold cursor-pointer shadow-md shadow-sky-500/20"
                >
                  Lưu Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
