import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Save, 
  Eye, 
  ToggleLeft, 
  ToggleRight, 
  ChevronUp, 
  ChevronDown,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { useToast } from '../../context/ToastContext';

interface HomepageSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  order: number;
  isVisible: boolean;
  type: string;
}

interface AdminHomepageTabProps {
  onNavigate?: (page: any) => void;
}

export const AdminHomepageTab: React.FC<AdminHomepageTabProps> = ({ onNavigate }) => {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadHomepageConfig();
  }, []);

  const loadHomepageConfig = async () => {
    setLoading(true);
    try {
      const config = await cmsService.getOne<any>('homepage', 'config');
      if (config && config.sections) {
        setSections(config.sections.sort((a: any, b: any) => a.order - b.order));
      } else {
        // Default sections if none exist in Firestore
        const defaultSections: HomepageSection[] = [
          { id: 'hero', title: 'LUMI – CHẠM YÊU THƯƠNG', subtitle: '“Nhìn bằng trái tim – Hành động bằng yêu thương”', description: 'Nền tảng can thiệp truyền thông số...', order: 1, isVisible: true, type: 'hero' },
          { id: 'opening', title: 'Thông điệp mở đầu', description: 'Mỗi người chúng ta đều có khả năng khiến thế giới trở nên dịu dàng hơn...', order: 2, isVisible: true, type: 'message' },
          { id: 'features', title: 'Tính năng cốt lõi', order: 3, isVisible: true, type: 'features' },
          { id: 'stories', title: 'Câu chuyện tử tế', order: 4, isVisible: true, type: 'stories' }
        ];
        setSections(defaultSections);
      }
    } catch (error) {
      showToast('Không thể tải cấu hình trang chủ', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsService.create('homepage', { sections }, 'config');
      showToast('Đã lưu cấu hình trang chủ thành công', 'success');
    } catch (error) {
      showToast('Lỗi khi lưu cấu hình', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  };

  const moveOrder = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order values
    const ordered = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSections(ordered);
  };

  const updateSection = (id: string, updates: Partial<HomepageSection>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý nội dung Trang chủ</h2>
          <p className="text-sm text-slate-500">Tùy chỉnh các section, tiêu đề và thứ tự hiển thị ngoài trang chủ.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all cursor-pointer"
            onClick={() => {
              if (onNavigate) {
                onNavigate('home');
              } else {
                window.location.href = '/';
              }
            }}
          >
            <Eye className="w-4 h-4" /> Xem trước
          </button>
          <button 
            className="flex items-center gap-2 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm shadow-sky-200 disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div 
            key={section.id} 
            className={`bg-white rounded-2xl border ${section.isVisible ? 'border-slate-100' : 'border-slate-100 opacity-60'} p-5 shadow-sm transition-all`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => moveOrder(section.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => moveOrder(section.id, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Layout className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                      Order: {section.order}
                    </span>
                    <h3 className="font-bold text-slate-800">{section.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Loại section: {section.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleVisibility(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    section.isVisible 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {section.isVisible ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  {section.isVisible ? 'Hiển thị' : 'Đã ẩn'}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Tiêu đề chính</label>
                  <input 
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Mô tả / Nội dung</label>
                  <textarea 
                    value={section.description || ''}
                    onChange={(e) => updateSection(section.id, { description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {section.type === 'hero' && (
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Slogan / Subtitle</label>
                    <input 
                      type="text"
                      value={section.subtitle || ''}
                      onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={section.imageUrl || ''}
                      onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                {(section.type === 'hero' || section.type === 'banner') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Text Nút</label>
                      <input 
                        type="text"
                        value={section.buttonText || ''}
                        onChange={(e) => updateSection(section.id, { buttonText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Link Nút</label>
                      <input 
                        type="text"
                        value={section.buttonUrl || ''}
                        onChange={(e) => updateSection(section.id, { buttonUrl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
