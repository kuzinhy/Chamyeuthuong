import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Download, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  Check, 
  AlertTriangle,
  Sparkles,
  Layers,
  Globe
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { storageService } from '../../services/storage';

interface AdminSettingsTabProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  onResetDatabase?: () => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  settings,
  onSaveSettings,
  onResetDatabase
}) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportBackup = () => {
    const jsonStr = storageService.exportFullDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumi-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmReset = () => {
    if (onResetDatabase) {
      onResetDatabase();
    } else {
      storageService.resetToDefaults();
      window.location.reload();
    }
    setResetConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-600" />
            <span>Cấu Hình Chung Website & Cơ Sở Dữ Liệu</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Điều chỉnh tiêu đề trang, slogan chiến dịch, khẩu hiệu nhân văn và sao lưu toàn bộ dữ liệu hệ thống.
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Xuất File Sao Lưu Dữ Liệu (.JSON)</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-600" />
            <span>Thông tin thương hiệu & Chiến dịch</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Hiển thị ở thanh điều hướng, banner trang chủ và chân trang</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên dự án / Website
            </label>
            <input
              type="text"
              value={formData.siteName || ''}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Phụ đề chiến dịch
            </label>
            <input
              type="text"
              value={formData.siteSubtitle || ''}
              onChange={(e) => setFormData({ ...formData, siteSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Khẩu hiệu chính (Slogan)
          </label>
          <input
            type="text"
            value={formData.slogan || ''}
            onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Tuyên ngôn trắc ẩn (Compassion Manifest)
          </label>
          <textarea
            rows={3}
            value={formData.manifestText || ''}
            onChange={(e) => setFormData({ ...formData, manifestText: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email liên hệ ban tổ chức
            </label>
            <input
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Đường dây nóng (Hotline)
            </label>
            <input
              type="text"
              value={formData.hotline || ''}
              onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.allowSubmissions ?? true}
              onChange={(e) => setFormData({ ...formData, allowSubmissions: e.target.checked })}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
            />
            <span className="text-xs font-bold text-slate-700">
              Mở cổng tiếp nhận bài đóng góp câu chuyện từ học sinh
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Đã lưu cấu hình!' : 'Lưu thay đổi'}</span>
          </button>
        </div>
      </form>

      {/* Danger Zone: Database Reset */}
      <div className="bg-rose-50/50 rounded-2xl border border-rose-200/80 p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-700">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-sm">Vùng nguy hiểm: Khôi phục cơ sở dữ liệu mẫu</h3>
        </div>
        <p className="text-xs text-rose-600/80">
          Hành động này sẽ khôi phục lại toàn bộ 8 câu chuyện mẫu ban đầu, các địa điểm 63 tỉnh thành, bài hát 432Hz và đề tài nghiên cứu chuẩn mực của LUMI.
        </p>
        <button
          onClick={() => setResetConfirmOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          Khôi phục dữ liệu ban đầu
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Khôi phục dữ liệu gốc?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tất cả các bài viết, thư yêu thương hoặc hình ảnh tự tạo sẽ được đặt lại về dữ liệu mặc định.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm"
              >
                Xác nhận khôi phục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
