import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Check, 
  X, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { StorySubmission } from '../../types';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

export const AdminSubmissionsTab: React.FC = () => {
  const [submissions, setSubmissions] = useState<StorySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { showToast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await storage.getSubmissions();
      setSubmissions(data);
    } catch (error) {
      showToast('Không thể tải danh sách bài gửi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      await storage.updateSubmissionStatus(id, status);
      showToast(`Đã ${status === 'approved' ? 'duyệt' : 'từ chối'} bài gửi`, 'success');
      loadSubmissions();
    } catch (error) {
      showToast('Lỗi khi cập nhật trạng thái', 'error');
    }
  };

  const safeSubmissions = submissions || [];
  const filtered = safeSubmissions.filter(s => {
    if (!s) return false;
    const matchesSearch = 
      (s.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.authorName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Duyệt bài Đóng góp</h2>
          <p className="text-sm text-slate-500">Xem xét và phê duyệt các câu chuyện gửi về từ cộng đồng.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-sky-100 text-sky-700 rounded-lg">
            {safeSubmissions.filter(s => s && s.status === 'pending').length} bài chờ duyệt
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Tìm theo tiêu đề, người gửi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">⏳ Chờ duyệt</option>
          <option value="approved">✅ Đã duyệt</option>
          <option value="rejected">❌ Từ chối</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Bài đóng góp</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Người gửi</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div></div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Không có bài gửi nào.</td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{sub.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{sub.content}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Gửi lúc: {sub.submittedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">{sub.authorName}</p>
                    <p className="text-[10px] text-sky-600 font-mono">{sub.authorEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                      sub.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {sub.status === 'approved' ? 'ĐÃ DUYỆT' : sub.status === 'rejected' ? 'BỊ TỪ CHỐI' : 'CHỜ DUYỆT'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                      {sub.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(sub.id, 'approved')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Duyệt đăng"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(sub.id, 'rejected')}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Từ chối"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
