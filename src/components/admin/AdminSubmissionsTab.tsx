import React, { useState } from 'react';
import { 
  Send, 
  Check, 
  X, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Search,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { StorySubmission } from '../../types';

interface AdminSubmissionsTabProps {
  submissions: StorySubmission[];
  onConvertSubmission: (id: string) => void;
  onRejectSubmission: (id: string, feedback?: string) => void;
  onDeleteSubmission?: (id: string) => void;
}

export const AdminSubmissionsTab: React.FC<AdminSubmissionsTabProps> = ({
  submissions,
  onConvertSubmission,
  onRejectSubmission,
  onDeleteSubmission
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  // Modals
  const [viewingSub, setViewingSub] = useState<StorySubmission | null>(null);
  const [rejectingSub, setRejectingSub] = useState<StorySubmission | null>(null);
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = submissions.filter(s => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmReject = () => {
    if (!rejectingSub) return;
    onRejectSubmission(rejectingSub.id, rejectFeedback);
    setRejectingSub(null);
    setRejectFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Send className="w-5 h-5 text-sky-600" />
            <span>Quản Lý Bài Đóng Góp (Kể LUMI Nghe)</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
              {filtered.length} bài gửi về
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Duyệt các câu chuyện do học sinh và cộng đồng chia sẻ. 1 click chuyển đổi thành câu chuyện chính thức trên website!
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, người gửi hoặc nội dung bài đóng góp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái duyệt</option>
            <option value="pending">⏳ Đang chờ duyệt</option>
            <option value="approved">✅ Đã chuyển thành câu chuyện</option>
            <option value="rejected">❌ Đã từ chối</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Bài đóng góp</th>
                <th className="px-4 py-3">Người gửi / Trường</th>
                <th className="px-4 py-3">Địa phương & Chuyên mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400">
                    <Send className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Chưa có bài đóng góp nào trong danh sách</p>
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-bold text-slate-800 line-clamp-1">{sub.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{sub.content}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Gửi lúc: {sub.submittedAt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-700">{sub.authorName}</p>
                      <p className="text-[11px] text-slate-400">{sub.authorSchool || 'Chưa cung cấp trường'}</p>
                      <p className="text-[10px] text-sky-600 font-mono">{sub.authorEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{sub.province}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {sub.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {sub.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Đã duyệt xuất bản
                        </span>
                      ) : sub.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                          <X className="w-3 h-3" /> Đã từ chối
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">
                          <Clock className="w-3 h-3" /> Chờ biên tập
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setViewingSub(sub)}
                        title="Xem toàn văn"
                        className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {sub.status !== 'approved' && (
                        <button
                          onClick={() => onConvertSubmission(sub.id)}
                          title="Duyệt & Xuất bản thành Câu chuyện chính thức"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt đăng</span>
                        </button>
                      )}

                      {sub.status === 'pending' && (
                        <button
                          onClick={() => {
                            setRejectingSub(sub);
                            setRejectFeedback('');
                          }}
                          title="Từ chối bài này"
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {onDeleteSubmission && (
                        <button
                          onClick={() => setDeleteConfirmId(sub.id)}
                          title="Xóa bài đóng góp"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Viewing Modal */}
      {viewingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold">
                  {viewingSub.category} • {viewingSub.province}
                </span>
                <h3 className="font-bold text-slate-800 text-base mt-1">{viewingSub.title}</h3>
              </div>
              <button onClick={() => setViewingSub(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Người gửi: <strong>{viewingSub.authorName}</strong> ({viewingSub.authorSchool || 'Chưa rõ trường'})</span>
              <span>{viewingSub.submittedAt}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              {viewingSub.content}
            </div>

            {viewingSub.feedback && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-700">
                <strong>Góp ý từ Ban Biên Tập:</strong> {viewingSub.feedback}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingSub(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Đóng
              </button>
              {viewingSub.status !== 'approved' && (
                <button
                  onClick={() => {
                    onConvertSubmission(viewingSub.id);
                    setViewingSub(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-md"
                >
                  Duyệt & Đăng bài ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Từ chối bài đóng góp</h3>
            <p className="text-xs text-slate-500">
              Nhập lý do hoặc lời góp ý xây dựng để học sinh có thể hoàn thiện câu chuyện hơn:
            </p>
            <textarea
              rows={3}
              placeholder="Ví dụ: Câu chuyện cần bổ sung địa chỉ cụ thể hoặc bằng chứng xác thực..."
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingSub(null)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xóa bài đóng góp này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Dữ liệu bài gửi sẽ bị xóa khỏi cơ sở dữ liệu.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (onDeleteSubmission) onDeleteSubmission(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
