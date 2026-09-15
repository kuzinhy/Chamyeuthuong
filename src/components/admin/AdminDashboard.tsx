import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  FileEdit, 
  Users, 
  Clock, 
  ArrowRight,
  TrendingUp,
  PlusCircle,
  Image as ImageIcon,
  Settings,
  Layout,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatFirestoreTimestamp } from '../../utils/dateUtils';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  pendingPosts: number;
  totalUsers: number;
  recentLogs: any[];
}

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // For now, we'll get real counts from storage where possible, 
      // or mock them if storage doesn't have a direct count method yet
      const [stories, submissions, users, logs] = await Promise.all([
        storage.getStories(),
        storage.getSubmissions(),
        storage.getUsers(),
        storage.getAuditLogs()
      ]);

      setStats({
        totalPosts: stories.length,
        publishedPosts: stories.filter(s => s.status === 'published').length,
        draftPosts: stories.filter(s => s.status === 'draft').length,
        pendingPosts: submissions.filter(s => s.status === 'pending').length,
        totalUsers: users.length || 1, // Fallback
        recentLogs: logs || []
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      // Fallback stats so UI doesn't crash
      setStats({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        pendingPosts: 0,
        totalUsers: 1,
        recentLogs: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
      </div>
    );
  }

  const cards = [
    { title: 'Tổng bài viết', value: stats.totalPosts, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', tab: 'stories' },
    { title: 'Đã xuất bản', value: stats.publishedPosts, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', tab: 'stories' },
    { title: 'Bản nháp', value: stats.draftPosts, icon: FileEdit, color: 'text-amber-600', bg: 'bg-amber-100', tab: 'stories' },
    { title: 'Chờ duyệt', value: stats.pendingPosts, icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100', tab: 'submissions' },
    { title: 'Quản trị viên', value: stats.totalUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', tab: 'users' },
  ];

  const quickActions = [
    { title: 'Viết bài mới', icon: PlusCircle, tab: 'stories', color: 'bg-sky-500' },
    { title: 'Upload Media', icon: ImageIcon, tab: 'gallery', color: 'bg-indigo-500' },
    { title: 'Sửa trang chủ', icon: Layout, tab: 'homepage', color: 'bg-emerald-500' },
    { title: 'Cài đặt hệ thống', icon: Settings, tab: 'settings', color: 'bg-slate-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Xin chào, {user?.displayName}</h1>
          <p className="text-slate-500">Chào mừng bạn quay lại hệ thống quản trị nội dung LUMI.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>Lần đăng nhập cuối: {formatFirestoreTimestamp(user?.lastLoginAt)}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => onNavigate(card.tab)}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500 font-medium">{card.title}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              Hoạt động gần đây
            </h2>
            <button 
              onClick={() => onNavigate('audit')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
            >
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {stats.recentLogs.length > 0 ? (
                stats.recentLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      log.action?.includes('CREATE') ? 'bg-emerald-500' : 
                      log.action?.includes('DELETE') ? 'bg-rose-500' : 'bg-sky-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {log.email} <span className="font-normal text-slate-500">{log.description}</span>
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {formatFirestoreTimestamp(log.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Module: {log.module} • ID: {log.documentId}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400 text-sm">
                  Chưa có hoạt động nào được ghi lại.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Truy cập nhanh</h2>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => onNavigate(action.tab)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-sky-200 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className={`w-10 h-10 ${action.color} text-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800">{action.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Thao tác hệ thống</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
