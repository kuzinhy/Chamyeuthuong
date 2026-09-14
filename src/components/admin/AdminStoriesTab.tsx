import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  MapPin, 
  Tag, 
  Calendar, 
  ExternalLink,
  Sparkles,
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';
import { Story, StoryCategory, RegionType } from '../../types';
import { vietnameseProvinces } from '../../data/provincesData';

interface AdminStoriesTabProps {
  stories: Story[];
  onAddStory: (story: Story) => void;
  onUpdateStory?: (id: string, updates: Partial<Story>) => void;
  onDeleteStory?: (id: string) => void;
  operatorEmail?: string;
  onSelectStory?: (story: Story) => void;
}

const CATEGORIES: StoryCategory[] = [
  'Học đường',
  'Tình bạn',
  'Gia đình',
  'Giúp đỡ cộng đồng',
  'Bảo vệ môi trường',
  'Dũng cảm',
  'Trung thực',
  'Chia sẻ'
];

export const AdminStoriesTab: React.FC<AdminStoriesTabProps> = ({
  stories,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  operatorEmail,
  onSelectStory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Story>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Trung thực',
    province: 'Hà Nội',
    region: 'Bắc',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'LUMI – Chạm Yêu Thương',
    sourceUrl: 'https://lumi.edu.vn',
    sourcePublishDate: new Date().toISOString().split('T')[0],
    message: 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
    featured: false,
    status: 'published',
    tags: ['Tử tế', 'Lan tỏa']
  });

  const [tagInput, setTagInput] = useState('');

  // Filter stories
  const filteredStories = stories.filter(s => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || s.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const handleOpenAdd = () => {
    setEditingStory(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Trung thực',
      province: 'Hà Nội',
      region: 'Bắc',
      coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      sourceName: 'LUMI – Chạm Yêu Thương',
      sourceUrl: 'https://lumi.edu.vn',
      sourcePublishDate: new Date().toISOString().split('T')[0],
      message: 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
      featured: false,
      status: 'published',
      tags: ['Tử tế', 'Học đường']
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      ...story,
      tags: story.tags || []
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.content?.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết!');
      return;
    }

    if (editingStory) {
      if (onUpdateStory) {
        onUpdateStory(editingStory.id, {
          ...formData,
          updatedAt: new Date().toISOString(),
          version: (editingStory.version || 1) + 1
        });
      }
    } else {
      const newStory: Story = {
        id: `story-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        title: formData.title,
        excerpt: formData.excerpt || formData.content.slice(0, 150) + '...',
        content: formData.content,
        message: formData.message || 'Hành động nhỏ gieo mầm tử tế lớn.',
        category: formData.category as StoryCategory || 'Trung thực',
        province: formData.province || 'Hà Nội',
        region: (formData.region as RegionType) || 'Bắc',
        latitude: 21.0285,
        longitude: 105.8542,
        readTime: '3 phút đọc',
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date().toISOString().split('T')[0],
        sourceName: formData.sourceName || 'LUMI Ban Biên Tập',
        sourceUrl: formData.sourceUrl || '#',
        sourcePublishDate: formData.sourcePublishDate || new Date().toISOString().split('T')[0],
        likes: 0,
        views: 0,
        featured: !!formData.featured,
        status: (formData.status as 'published' | 'draft') || 'published',
        author: operatorEmail ? operatorEmail.split('@')[0] : 'Ban Biên Tập LUMI',
        tags: formData.tags || ['Tử tế', 'Học đường'],
        version: 1,
        updatedAt: new Date().toISOString(),
        updatedBy: operatorEmail
      };
      onAddStory(newStory);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (onDeleteStory) {
      onDeleteStory(id);
    }
    setDeleteConfirmId(null);
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

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600" />
            <span>Quản Lý Câu Chuyện Tử Tế</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
              {filteredStories.length} bài viết
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Đồng bộ trực tiếp mục "Câu chuyện tử tế" ngoài trang chủ. Hỗ trợ thêm, sửa, xóa, duyệt và ghim nổi bật.
          </p>
        </div>

        <button
          id="admin-add-story-btn"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm câu chuyện mới</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề bài viết, tỉnh thành hoặc tác giả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả chuyên mục</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả vùng miền</option>
            <option value="Bắc">Miền Bắc</option>
            <option value="Trung">Miền Trung</option>
            <option value="Nam">Miền Nam</option>
          </select>
        </div>
      </div>

      {/* Stories Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Bài viết</th>
                <th className="px-4 py-3">Chuyên mục</th>
                <th className="px-4 py-3">Địa phương</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Lượt xem / Tim</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Không tìm thấy câu chuyện phù hợp</p>
                  </td>
                </tr>
              ) : (
                filteredStories.map((story) => (
                  <tr key={story.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="px-4 py-3 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={story.coverImage} 
                          alt={story.title} 
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0" 
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 line-clamp-1">{story.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{story.excerpt}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {story.featured && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                                ★ Nổi bật
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              {story.publishedAt} • v{story.version || 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {story.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        {story.province} ({story.region})
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {story.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                          <Check className="w-3 h-3" /> Đã xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                          <Clock className="w-3 h-3" /> Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-medium">
                      👁️ {story.views} / ❤️ {story.likes}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      {onSelectStory && (
                        <button
                          onClick={() => onSelectStory(story)}
                          title="Xem bài viết"
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(story)}
                        title="Chỉnh sửa bài viết"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer font-bold"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(story.id)}
                        title="Xóa bài viết"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xác nhận xóa câu chuyện?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Hành động này sẽ xóa vĩnh viễn bài viết khỏi hệ thống và đồng bộ ngay trên giao diện người dùng.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-sm shadow-rose-600/30"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal (2-column professional CMS layout) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                  {editingStory ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingStory ? 'Chỉnh Sửa Câu Chuyện Tử Tế' : 'Thêm Câu Chuyện Tử Tế Mới'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Cập nhật cơ sở dữ liệu và xuất bản trực tiếp lên trang chủ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Core content */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tiêu đề câu chuyện <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Cậu bé nhặt ve chai trả lại ví tiền..."
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Đoạn trích tóm tắt (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả ngắn gọn để hiển thị ở thẻ ngoài trang chủ..."
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nội dung chi tiết <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Toàn văn câu chuyện chi tiết, các tình tiết cảm động..."
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thông điệp nhân văn (Bài học trắc ẩn)
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Lòng trung thực không phụ thuộc vào hoàn cảnh..."
                      value={formData.message || ''}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Right Column: Metadata, Categorization, Media */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Chuyên mục
                      </label>
                      <select
                        value={formData.category || 'Trung thực'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as StoryCategory })}
                        className="w-full px-3 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer font-medium"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vùng miền
                      </label>
                      <select
                        value={formData.region || 'Bắc'}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value as RegionType })}
                        className="w-full px-3 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer font-medium"
                      >
                        <option value="Bắc">Miền Bắc</option>
                        <option value="Trung">Miền Trung</option>
                        <option value="Nam">Miền Nam</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={formData.province || 'Hà Nội'}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer font-medium"
                    >
                      {vietnameseProvinces.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Link ảnh bìa (Cover Image URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.coverImage || ''}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-mono"
                    />
                    {formData.coverImage && (
                      <div className="mt-2 h-20 rounded-xl overflow-hidden border border-slate-200">
                        <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tên nguồn báo chí / tác giả
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Báo Tuổi Trẻ"
                        value={formData.sourceName || ''}
                        onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Trạng thái xuất bản
                      </label>
                      <select
                        value={formData.status || 'published'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-medium cursor-pointer"
                      >
                        <option value="published">Xuất bản công khai</option>
                        <option value="draft">Lưu bản nháp</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thẻ từ khóa (Tags)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Thêm tag (vd: Học bổng, Nghị lực)..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50/80 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 font-bold rounded-lg cursor-pointer text-slate-700"
                      >
                        Thêm
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.tags?.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
                          {t}
                          <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-rose-500">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                      />
                      <span className="text-xs font-bold text-slate-700">
                        ⭐ Ghim bài viết này lên khu vực Nổi Bật trang chủ
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-xl shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                >
                  {editingStory ? 'Lưu thay đổi bài viết' : 'Đăng tải bài viết ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
