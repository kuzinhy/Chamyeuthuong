import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Star, 
  CheckCircle, 
  Clock, 
  Eye,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Story } from '../../types';
import { storage } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatFirestoreTimestamp } from '../../utils/dateUtils';

import { AdminStoryForm } from './AdminStoryForm';

export const AdminStoriesTab: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    try {
      const data = await storage.getStories();
      setStories(data);
    } catch (error) {
      showToast('Không thể tải danh sách bài viết', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<Story>) => {
    try {
      const payload = {
        ...data,
        updatedBy: user?.email || 'admin'
      };

      if (data.status === 'published' && !data.publishedAt) {
        (payload as any).publishedAt = new Date().toISOString();
      }

      await storage.saveStory(payload as any);
      showToast('Đã lưu bài viết thành công', 'success');
      await loadStories();
    } catch (error) {
      console.error('Error saving story:', error);
      showToast('Lỗi khi lưu bài viết', 'error');
      throw error;
    }
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingStory(null);
    setIsModalOpen(true);
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await storage.toggleStoryFeature(id);
      showToast('Cập nhật trạng thái nổi bật thành công', 'success');
      await loadStories();
    } catch (error) {
      showToast('Lỗi khi cập nhật trạng thái', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storage.deleteStory(id);
      showToast('Đã xóa bài viết thành công', 'success');
      await loadStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      showToast('Lỗi khi xóa bài viết', 'error');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const filteredStories = stories.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý Chuyện kể LUMI</h2>
          <p className="text-sm text-slate-500">Viết, chỉnh sửa và quản lý các câu chuyện tử tế trên toàn quốc.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-sky-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Viết bài mới
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Bài viết</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Khu vực</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Ngày đăng</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div></div>
                </td>
              </tr>
            ) : filteredStories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">Không tìm thấy bài viết nào.</td>
              </tr>
            ) : (
              filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        {story.coverImage ? (
                          <img src={story.coverImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300"><FileText className="w-6 h-6" /></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 line-clamp-1">{story.title}</p>
                        <p className="text-xs text-slate-400 line-clamp-1">Tác giả: {story.authorName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        story.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {story.status === 'published' ? 'ĐÃ ĐĂNG' : 'BẢN NHÁP'}
                      </span>
                      {story.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" /> NỔI BẬT
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {story.province}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 font-medium">{formatFirestoreTimestamp(story.publishedAt)}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleToggleFeatured(story.id)}
                        className={`p-2 rounded-lg transition-colors ${story.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:bg-slate-100'}`}
                        title="Đánh dấu nổi bật"
                      >
                        <Star className={`w-4 h-4 ${story.featured ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleEdit(story)}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(story.id)}
                        className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xóa bài viết này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Bài viết sẽ bị xóa khỏi hệ thống và không còn xuất hiện trên trang chủ.
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
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm shadow-rose-600/30"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AdminStoryForm 
          story={editingStory}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
