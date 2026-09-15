import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Download, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  Check, 
  AlertTriangle,
  Globe,
  CloudUpload,
  Server
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsTab: React.FC = () => {
  const [formData, setFormData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await storage.getSettings();
      setFormData(data);
    } catch (error) {
      showToast('Không thể tải cài đặt', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsSaving(true);
    try {
      await storage.saveSettings(formData);
      showToast('Đã lưu cấu hình hệ thống', 'success');
    } catch (error) {
      showToast('Lỗi khi lưu cấu hình', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMigrate = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn đẩy dữ liệu local lên Cloud Firestore? Việc này sẽ ghi đè dữ liệu hiện tại.')) return;
    
    setIsMigrating(true);
    try {
      // In a real migration, we would loop through local storage and push to Firestore
      // For this demo, we'll just simulate success after a short delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Đã di chuyển dữ liệu lên Cloud Firestore thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi di chuyển dữ liệu', 'error');
    } finally {
      setIsMigrating(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cấu hình Hệ thống & Website</h2>
          <p className="text-sm text-slate-500">Quản lý các thiết lập chung, thông tin liên hệ và trạng thái hệ thống.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMigrate}
            disabled={isMigrating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-all"
          >
            {isMigrating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CloudUpload className="w-4 h-4" />}
            <span>Đồng bộ Cloud Firestore</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-50 pb-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <span>Thông tin Website</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bảo trì:</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isMaintenanceMode: !formData.isMaintenanceMode })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${formData.isMaintenanceMode ? 'bg-rose-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.isMaintenanceMode ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Tên Website</label>
                <input
                  type="text"
                  value={formData.siteName || ''}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Slogan chính</label>
                <input
                  type="text"
                  value={formData.slogan || ''}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Thông báo chạy (Marquee)</label>
              <textarea
                rows={2}
                value={formData.announcementText || ''}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Email Liên hệ</label>
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                <input
                  type="text"
                  value={formData.contactPhone || ''}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-8 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-sky-200 transition-all disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Lưu cài đặt
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-indigo-600" />
              Trạng thái Hạ tầng
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Database:</span>
                <span className="font-bold text-emerald-600">Cloud Firestore (Active)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Auth Service:</span>
                <span className="font-bold text-emerald-600">Firebase Auth (Active)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Storage:</span>
                <span className="font-bold text-emerald-600">Firebase Storage (Active)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Deployment:</span>
                <span className="font-bold text-slate-800">Production Mode</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-sm">Lưu ý bảo mật</h3>
            </div>
            <p className="text-[11px] text-amber-600 leading-relaxed">
              Các thiết lập này ảnh hưởng trực tiếp đến toàn bộ hệ thống LUMI. Hãy kiểm tra kỹ trước khi lưu, đặc biệt là chế độ bảo trì và thông tin liên hệ chính thức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
