import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Tag, 
  ExternalLink,
  Sparkles,
  Camera,
  Heart,
  RefreshCw
} from 'lucide-react';
import { GalleryMediaItem, GalleryCategory, PhotovoiceItem } from '../../types';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

const CATEGORIES: GalleryCategory[] = [
  'Hình ảnh câu chuyện',
  'Truyện tranh',
  'Sản phẩm truyền thông',
  'Hình ảnh hoạt động'
];

export const AdminGalleryTab: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>([]);
  const [photovoiceItems, setPhotovoiceItems] = useState<PhotovoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState<'gallery' | 'photovoice'>('gallery');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [gallery, photovoice] = await Promise.all([
        storage.getGallery(),
        storage.getPhotovoice()
      ]);
      setGalleryItems(gallery || []);
      setPhotovoiceItems(photovoice || []);
    } catch (error) {
      showToast('Không thể tải dữ liệu thư viện', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryMediaItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<GalleryMediaItem>>({
    title: '',
    category: 'Sản phẩm truyền thông',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description: '',
    credit: 'Ban Truyền Thông LUMI',
    source: 'Dự án LUMI',
    tags: ['LUMI', 'Trắc ẩn']
  });
  const [tagInput, setTagInput] = useState('');

  const filteredGallery = (galleryItems || []).filter(item => {
    const matchesSearch = 
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.credit || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPhotovoice = (photovoiceItems || []).filter(p => 
    (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.story || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Sản phẩm truyền thông',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      description: '',
      credit: 'Ban Truyền Thông LUMI',
      source: 'Dự án LUMI',
      tags: ['LUMI', 'Truyền thông']
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryMediaItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.imageUrl?.trim()) {
      showToast('Vui lòng nhập tên tác phẩm và link ảnh hợp lệ!', 'error');
      return;
    }

    try {
      if (editingItem) {
        await storage.updateGalleryItem(editingItem.id, formData);
        showToast('Đã cập nhật tác phẩm', 'success');
      } else {
        await storage.addGalleryItem({
          ...formData,
          date: new Date().toLocaleDateString('vi-VN'),
          likes: 0
        } as any);
        showToast('Đã thêm tác phẩm mới', 'success');
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showToast('Lỗi khi lưu tác phẩm', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storage.deleteGalleryItem(id);
      showToast('Đã xóa tác phẩm', 'success');
      loadData();
    } catch (error) {
      showToast('Lỗi khi xóa tác phẩm', 'error');
    }
    setDeleteConfirmId(null);
  };

  const handleApprovePhotovoice = async (id: string) => {
    try {
      await storage.updatePhotovoiceStatus(id, 'approved');
      showToast('Đã duyệt bài Photovoice', 'success');
      loadData();
    } catch (error) {
      showToast('Lỗi khi duyệt bài Photovoice', 'error');
    }
  };

  const handleRejectPhotovoice = async (id: string) => {
    try {
      await storage.updatePhotovoiceStatus(id, 'rejected');
      showToast('Đã từ chối bài Photovoice', 'info');
      loadData();
    } catch (error) {
      showToast('Lỗi khi từ chối bài Photovoice', 'error');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tagToRemove) || []
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-500" />
            <span>Quản Lý Góc Hình Ảnh & Photovoice</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Đồng bộ mục "Góc hình ảnh & Photovoice" trên menu. Quản lý tranh ảnh, poster và duyệt tác phẩm học sinh gửi về.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {subTab === 'gallery' && (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm tác phẩm mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-tabs: Gallery vs Photovoice */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSubTab('gallery')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            subTab === 'gallery'
              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Thư viện đa phương tiện ({galleryItems.length})</span>
        </button>

        <button
          onClick={() => setSubTab('photovoice')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            subTab === 'photovoice'
              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Bài Photovoice học sinh ({photovoiceItems.length})</span>
        </button>
      </div>

      {/* GALLERY SUB-TAB */}
      {subTab === 'gallery' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tác phẩm theo tên, mô tả hoặc nguồn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">Tất cả thể loại tranh ảnh</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gallery Items Grid / Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Tác phẩm</th>
                    <th className="px-4 py-3">Thể loại</th>
                    <th className="px-4 py-3">Tác giả / Nguồn</th>
                    <th className="px-4 py-3">Ngày đăng</th>
                    <th className="px-4 py-3">Lượt tim</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGallery.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold">Chưa có tác phẩm nào phù hợp</p>
                      </td>
                    </tr>
                  ) : (
                    filteredGallery.map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0 cursor-pointer hover:opacity-90"
                              onClick={() => setPreviewImage(item.imageUrl)}
                            />
                            <div>
                              <p className="font-bold text-slate-800 line-clamp-1">{item.title}</p>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                              <div className="flex gap-1 mt-1">
                                {item.tags?.map(t => (
                                  <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          <p className="font-medium">{item.credit || 'LUMI Team'}</p>
                          <p className="text-[10px] text-slate-400">{item.source}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 text-rose-500 font-bold">
                          ❤️ {item.likes || 0}
                        </td>
                        <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => setPreviewImage(item.imageUrl)}
                            title="Xem ảnh to"
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Chỉnh sửa tác phẩm"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            title="Xóa tác phẩm"
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
        </div>
      )}

      {/* PHOTOVOICE SUB-TAB */}
      {subTab === 'photovoice' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Ảnh & Tiêu đề</th>
                    <th className="px-4 py-3">Học sinh / Lớp</th>
                    <th className="px-4 py-3">Câu chuyện kể</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPhotovoice.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-slate-400">
                        <Camera className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold">Chưa có bài Photovoice nào</p>
                      </td>
                    </tr>
                  ) : (
                    filteredPhotovoice.map((p) => (
                      <tr key={p.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0 cursor-pointer"
                              onClick={() => setPreviewImage(p.imageUrl)}
                            />
                            <div>
                              <p className="font-bold text-slate-800 line-clamp-1">{p.title}</p>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                                {p.theme}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-700">{p.studentName}</p>
                          <p className="text-[10px] text-slate-400">Khối/Lớp: {p.grade}</p>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <p className="line-clamp-2 text-slate-600">{p.story}</p>
                          {p.reflectionPrompt && (
                            <p className="text-[10px] text-sky-600 italic mt-0.5 line-clamp-1">
                              💡 {p.reflectionPrompt}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {p.status === 'approved' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                              <Check className="w-3 h-3" /> Đã xuất bản
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">
                              Chờ duyệt
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                          {p.status !== 'approved' && (
                            <button
                              onClick={() => handleApprovePhotovoice(p.id)}
                              title="Duyệt bài này"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleRejectPhotovoice(p.id)}
                            title="Từ chối bài"
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm cursor-pointer animate-in fade-in duration-150"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xóa tác phẩm này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tác phẩm sẽ bị xóa khỏi bộ sưu tập hình ảnh truyền thông.
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

      {/* Add / Edit Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                <span>{editingItem ? 'Chỉnh Sửa Tác Phẩm' : 'Thêm Tác Phẩm Thị Giác Mới'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề tác phẩm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Poster Chiến dịch Chạm Yêu Thương..."
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thể loại hình ảnh</label>
                <select
                  value={formData.category || 'Sản phẩm truyền thông'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer font-medium"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link hình ảnh (URL) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
                />
                {formData.imageUrl && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tác giả / Người thực hiện</label>
                  <input
                    type="text"
                    placeholder="LUMI Team"
                    value={formData.credit || ''}
                    onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nguồn / Đơn vị</label>
                  <input
                    type="text"
                    placeholder="Ban Truyền Thông"
                    value={formData.source || ''}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả tác phẩm</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả ý nghĩa, bối cảnh ra đời của bức tranh..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thẻ từ khóa (Tags)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Thêm tag (vd: Poster, Tranh vẽ)..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 font-bold rounded-lg cursor-pointer"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.tags?.map(t => (
                    <span key={t} className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                      {t}
                      <button type="button" onClick={() => handleRemoveTag(t)}>×</button>
                    </span>
                  ))}
                </div>
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
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-md shadow-amber-500/20"
                >
                  {editingItem ? 'Lưu cập nhật' : 'Đăng tác phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
