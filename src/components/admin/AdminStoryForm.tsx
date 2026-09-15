import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Image as ImageIcon, 
  MapPin, 
  Type, 
  FileText, 
  Link as LinkIcon,
  Calendar,
  User,
  Globe,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Story, RegionType, StoryCategory } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AdminStoryFormProps {
  story?: Story | null;
  onSave: (story: Partial<Story>) => Promise<void>;
  onClose: () => void;
}

export const AdminStoryForm: React.FC<AdminStoryFormProps> = ({ story, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Story>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    province: '',
    region: 'Bắc',
    latitude: 21.0285,
    longitude: 105.8542,
    category: 'Yêu thương',
    tags: [],
    message: '',
    sourceName: '',
    sourceUrl: '',
    sourcePublishDate: '',
    author: '',
    authorName: '',
    featured: false,
    status: 'draft',
    readTime: '5 phút',
    views: 0,
    likes: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (story) {
      setFormData(story);
    }
  }, [story]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Vui lòng nhập tiêu đề bài viết', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      showToast(story ? 'Đã cập nhật bài viết' : 'Đã tạo bài viết mới', 'success');
      onClose();
    } catch (error) {
      showToast('Lỗi khi lưu bài viết', 'error');
    } finally {
      setIsSubmitting(false);
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

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(t => t !== tag)
    });
  };

  const categories: StoryCategory[] = [
    'Trung thực', 'Giúp đỡ người khác', 'Giúp đỡ cộng đồng', 'Dũng cảm', 'Chia sẻ', 
    'Sẻ chia', 'Trách nhiệm', 'Yêu thương', 'Ước mơ', 'Cộng đồng', 'Tình bạn', 
    'Gia đình', 'Học đường', 'Nghị lực', 'Lòng biết ơn', 'Bảo vệ môi trường', 'Hiếu thảo'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-sky-600" />
              {story ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            </h2>
            <p className="text-sm text-slate-500 font-medium">Cung cấp thông tin chi tiết cho câu chuyện tử tế.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="story-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title & Slug */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Tiêu đề bài viết</label>
                  <div className="relative">
                    <Type className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl transition-all font-bold text-slate-800 placeholder:font-normal"
                      placeholder="Nhập tiêu đề hấp dẫn..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Đường dẫn (Slug)</label>
                    <input 
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Thời gian đọc</label>
                    <input 
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      placeholder="VD: 5 phút"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Tóm tắt ngắn (Excerpt)</label>
                <textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl transition-all text-sm text-slate-700 min-h-[80px]"
                  placeholder="Một đoạn mô tả ngắn để thu hút người đọc..."
                />
              </div>

              {/* Main Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Nội dung chi tiết (Markdown / Text)</label>
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-3xl transition-all text-sm text-slate-700 min-h-[400px] font-medium leading-relaxed"
                  placeholder="Kể lại câu chuyện thật chi tiết và cảm xúc..."
                />
              </div>

              {/* Lumi Message */}
              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-3">
                <label className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Thông điệp từ LUMI
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-indigo-200 rounded-2xl text-sm text-indigo-900 placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Điều LUMI muốn gửi gắm qua câu chuyện này..."
                />
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="lg:col-span-4 space-y-6">
              {/* Cover Image */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Ảnh bìa (URL)</label>
                <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group">
                  {formData.coverImage ? (
                    <>
                      <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImage: '' })}
                          className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white/40 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Chưa có ảnh bìa</p>
                    </div>
                  )}
                </div>
                <input 
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Status & Featured */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Trạng thái đăng bài</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700"
                  >
                    <option value="draft">📝 Bản nháp</option>
                    <option value="published">🚀 Đã xuất bản</option>
                    <option value="archived">📁 Lưu trữ</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-900">Bài viết nổi bật</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              {/* Location & Meta */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Vùng miền & Tỉnh thành</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value as RegionType })}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      <option value="Bắc">Miền Bắc</option>
                      <option value="Trung">Miền Trung</option>
                      <option value="Nam">Miền Nam</option>
                    </select>
                    <input 
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Tỉnh / Thành phố"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Chủ đề chính</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as StoryCategory })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Tác giả gốc</label>
                  <div className="relative">
                    <User className="w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Tên tác giả..."
                    />
                  </div>
                </div>
              </div>

              {/* Source & Credits */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Nguồn gốc nội dung</label>
                  <input 
                    type="text"
                    value={formData.sourceName}
                    onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs mb-2"
                    placeholder="Tên báo / Tổ chức / Nguồn..."
                  />
                  <div className="relative">
                    <Globe className="w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      value={formData.sourceUrl}
                      onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Link bài viết gốc..."
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Từ khóa (Tags)</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.tags?.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-bold border border-sky-100">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-rose-500"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    placeholder="Thêm tag..."
                  />
                  <button 
                    type="button" 
                    onClick={handleAddTag}
                    className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Chỉnh sửa lần cuối: Vừa xong</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-all text-sm"
            >
              Hủy bỏ
            </button>
            <button 
              form="story-form"
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-900/20 hover:bg-sky-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Lưu bài viết
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
