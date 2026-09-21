import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  MessageCircle, 
  Heart, 
  Clock, 
  ShieldCheck,
  Send,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Letter, LetterCategory } from '../../types';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';
import { formatFirestoreTimestamp } from '../../utils/dateUtils';

export const AdminLettersTab: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { showToast } = useToast();

  // Reply modal
  const [replyLetter, setReplyLetter] = useState<Letter | null>(null);
  const [replyText, setReplyText] = useState('');

  // Edit / Add modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<Letter | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Letter>>({
    senderName: '',
    targetPerson: '',
    category: 'Tri ân' as any,
    content: '',
    colorTheme: 'sky',
    isAnonymous: false,
    status: 'approved',
  });

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    setLoading(true);
    try {
      const data = await storage.getLetters();
      setLetters(data || []);
    } catch (error) {
      showToast('Không thể tải danh sách thư', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLetter = async (id: string, reply?: string) => {
    try {
      await storage.updateLetterStatus(id, 'approved', reply);
      showToast('Đã duyệt lá thư', 'success');
      loadLetters();
    } catch (error) {
      showToast('Lỗi khi duyệt thư', 'error');
    }
  };

  const handleRejectLetter = async (id: string) => {
    try {
      await storage.updateLetterStatus(id, 'rejected');
      showToast('Đã từ chối lá thư', 'info');
      loadLetters();
    } catch (error) {
      showToast('Lỗi khi từ chối thư', 'error');
    }
  };

  const handleDeleteLetter = async (id: string) => {
    try {
      await storage.deleteLetter(id);
      showToast('Đã xóa lá thư', 'success');
      loadLetters();
    } catch (error) {
      showToast('Lỗi khi xóa thư', 'error');
    }
  };

  const pendingCount = (letters || []).filter(l => (l.status || 'pending') === 'pending').length;
  const approvedCount = (letters || []).filter(l => l.status === 'approved').length;
  const rejectedCount = (letters || []).filter(l => l.status === 'rejected').length;

  const filteredLetters = (letters || []).filter(l => {
    if (!l) return false;
    const matchesSearch = 
      (l.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.senderName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.targetPerson && l.targetPerson.toLowerCase().includes(searchQuery.toLowerCase()));
    const letterStatus = l.status || 'pending';
    const matchesStatus = statusFilter === 'all' || letterStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || l.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingLetter(null);
    setFormData({
      senderName: 'Học sinh ẩn danh',
      targetPerson: 'Gửi người bạn cùng bàn',
      category: 'Cảm ơn',
      content: '',
      colorTheme: 'sky',
      isAnonymous: false,
      status: 'approved',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (letter: Letter) => {
    setEditingLetter(letter);
    setFormData({ ...letter });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content?.trim()) {
      showToast('Vui lòng nhập nội dung bức thư!', 'error');
      return;
    }

    try {
      if (editingLetter) {
        await storage.updateLetterStatus(editingLetter.id, formData.status || 'approved', formData.replyFromLumi);
        showToast('Đã cập nhật thông tin lá thư', 'success');
      } else {
        await storage.addLetter(formData as any);
        showToast('Đã thêm thư mới vào hệ thống!', 'success');
      }
      setIsModalOpen(false);
      loadLetters();
    } catch (error) {
      showToast('Lỗi khi lưu thư', 'error');
    }
  };

  const handleSendReply = () => {
    if (!replyLetter) return;
    handleApproveLetter(replyLetter.id, replyText);
    setReplyLetter(null);
    setReplyText('');
  };

  const CATEGORIES: LetterCategory[] = [
    'Cảm ơn',
    'Xin lỗi',
    'Động viên',
    'Yêu thương',
    'Lời chúc',
    'Tâm sự',
    'Gửi một người đặc biệt',
    'Khác'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Mail className="w-5 h-5 text-rose-500" />
            <span>Quản Lý Hộp Thư Yêu Thương</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {filteredLetters.length} lá thư
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Duyệt thư, gửi lời hồi đáp từ LUMI, chỉnh sửa hoặc xóa thư vi phạm tiêu chuẩn cộng đồng.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={loadLetters}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Làm mới danh sách từ máy chủ"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-rose-500' : ''}`} />
            <span>Làm mới</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm thư yêu thương</span>
          </button>
        </div>
      </div>

      {/* Quick Status Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tất cả ({letters.length})
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'pending'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Chờ duyệt ({pendingCount})</span>
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'approved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span>Đã duyệt ({approvedCount})</span>
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'rejected'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          <X className="w-3.5 h-3.5" />
          <span>Từ chối ({rejectedCount})</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo nội dung, người gửi hoặc người nhận..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">⏳ Đang chờ duyệt</option>
            <option value="approved">✅ Đã duyệt xuất bản</option>
            <option value="rejected">❌ Đã từ chối</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả chủ đề</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Letters List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Người gửi / Người nhận</th>
                <th className="px-4 py-3">Chủ đề</th>
                <th className="px-4 py-3">Nội dung thư</th>
                <th className="px-4 py-3">Phản hồi từ LUMI</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLetters.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Mail className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Không có lá thư nào</p>
                  </td>
                </tr>
              ) : (
                filteredLetters.map((letter) => (
                  <tr key={letter.id} className="hover:bg-rose-50/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-bold text-slate-800">
                        {letter.isAnonymous ? 'Ẩn danh' : letter.senderName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Đến: {letter.targetPerson || 'Người bạn giấu tên'}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {typeof letter.createdAt === 'string' ? letter.createdAt : formatFirestoreTimestamp(letter.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-100">
                        {letter.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="line-clamp-2 text-slate-700">{letter.content}</p>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      {letter.replyFromLumi ? (
                        <p className="line-clamp-2 text-sky-700 bg-sky-50 p-1.5 rounded-lg text-[11px] border border-sky-100">
                          {letter.replyFromLumi}
                        </p>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Chưa phản hồi</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {letter.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                          <Check className="w-3 h-3" /> Đã duyệt
                        </span>
                      ) : letter.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                          <X className="w-3 h-3" /> Từ chối
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">
                          <Clock className="w-3 h-3" /> Chờ duyệt
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      {letter.status !== 'approved' && (
                        <button
                          onClick={() => handleApproveLetter(letter.id)}
                          title="Duyệt xuất bản nhanh"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setReplyLetter(letter);
                          setReplyText(letter.replyFromLumi || '');
                        }}
                        title="Viết lời hồi đáp từ LUMI"
                        className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(letter)}
                        title="Chỉnh sửa thư"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(letter.id)}
                        title="Xóa thư"
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {replyLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Gửi Lời Hồi Đáp Từ LUMI</span>
              </h3>
              <button onClick={() => setReplyLetter(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[11px] font-bold text-slate-500">Nội dung thư của bạn:</p>
              <p className="text-xs text-slate-700 italic line-clamp-3 mt-1">"{replyLetter.content}"</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lời hồi đáp ấm áp & truyền cảm hứng:
              </label>
              <textarea
                rows={3}
                placeholder="Nhập lời động viên hoặc giải đáp từ LUMI..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReplyLetter(null)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSendReply}
                className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-xl shadow-md shadow-sky-500/20"
              >
                Lưu & Duyệt thư
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xóa lá thư này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Lá thư sẽ bị xóa vĩnh viễn khỏi Hộp thư yêu thương.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteLetter(deleteConfirmId)}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm shadow-rose-600/30"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Letter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingLetter ? 'Chỉnh Sửa Lá Thư' : 'Thêm Lá Thư Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Người gửi</label>
                  <input
                    type="text"
                    value={formData.senderName || ''}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Người nhận</label>
                  <input
                    type="text"
                    value={formData.targetPerson || ''}
                    onChange={(e) => setFormData({ ...formData, targetPerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Chủ đề</label>
                  <select
                    value={formData.category || 'Tri ân'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as LetterCategory })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Màu thiệp</label>
                  <select
                    value={formData.colorTheme || 'sky'}
                    onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer font-medium"
                  >
                    <option value="sky">Xanh thiên thanh (Sky)</option>
                    <option value="rose">Hồng dịu dàng (Rose)</option>
                    <option value="amber">Vàng ấm áp (Amber)</option>
                    <option value="emerald">Xanh ngọc hy vọng (Emerald)</option>
                    <option value="purple">Tím mộng mơ (Purple)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung thư <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phản hồi từ LUMI
                </label>
                <input
                  type="text"
                  value={formData.replyFromLumi || ''}
                  onChange={(e) => setFormData({ ...formData, replyFromLumi: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-md shadow-rose-500/20"
                >
                  {editingLetter ? 'Lưu cập nhật' : 'Đăng lá thư'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
