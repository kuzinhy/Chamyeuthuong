import React, { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Compass, 
  Check, 
  X, 
  Layers, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { KindnessPoint, RegionType } from '../../types';
import { vietnameseProvinces } from '../../data/provincesData';

interface AdminMapTabProps {
  points: KindnessPoint[];
  onAddPoint: (point: Partial<KindnessPoint>) => void;
  onUpdatePoint: (id: string, updates: Partial<KindnessPoint>) => void;
  onDeletePoint: (id: string) => void;
  onNavigateToMap?: () => void;
}

export const AdminMapTab: React.FC<AdminMapTabProps> = ({
  points,
  onAddPoint,
  onUpdatePoint,
  onDeletePoint,
  onNavigateToMap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<KindnessPoint | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<KindnessPoint>>({
    title: '',
    province: 'Bình Dương',
    region: 'Nam',
    latitude: 11.1603,
    longitude: 106.6575,
    address: '',
    description: '',
    storyTitle: '',
    storyCount: 1
  });

  const filteredPoints = points.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.address && p.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || p.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleOpenAdd = () => {
    setEditingPoint(null);
    setFormData({
      title: '',
      province: 'Hà Nội',
      region: 'Bắc',
      latitude: 21.0285,
      longitude: 105.8542,
      address: '',
      description: '',
      storyTitle: '',
      storyCount: 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: KindnessPoint) => {
    setEditingPoint(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.province?.trim()) {
      alert('Vui lòng nhập tên điểm tử tế và chọn tỉnh thành!');
      return;
    }

    if (editingPoint) {
      onUpdatePoint(editingPoint.id, formData);
    } else {
      onAddPoint(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onDeletePoint(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-600" />
            <span>Quản Lý Bản Đồ Tử Tế (63 Tỉnh Thành)</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
              {filteredPoints.length} điểm ghi nhận
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Đồng bộ trực tiếp mục "Bản đồ tử tế" ngoài menu chính. Thêm, sửa, xóa tọa độ và các điểm lan tỏa tình thương.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {onNavigateToMap && (
            <button
              onClick={onNavigateToMap}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Bản Đồ Web</span>
            </button>
          )}

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm điểm tử tế mới</span>
          </button>
        </div>
      </div>

      {/* Search & Region Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên điểm tử tế, tỉnh thành hoặc địa chỉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
          />
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

      {/* Points Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Tên điểm tử tế</th>
                <th className="px-4 py-3">Tỉnh / Thành</th>
                <th className="px-4 py-3">Địa chỉ & Tọa độ</th>
                <th className="px-4 py-3">Câu chuyện gắn liền</th>
                <th className="px-4 py-3">Số câu chuyện</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPoints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <MapPin className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Chưa có điểm tử tế nào phù hợp với bộ lọc</p>
                  </td>
                </tr>
              ) : (
                filteredPoints.map((point) => (
                  <tr key={point.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p>{point.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-normal">{point.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-700">{point.province}</span>
                      <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                        {point.region}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <p className="line-clamp-1">{point.address || 'Trung tâm tỉnh/thành'}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <BookOpen className="w-3 h-3 text-sky-500 flex-shrink-0" />
                        <span className="line-clamp-1">{point.storyTitle || 'Chưa liên kết'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {point.storyCount || 1} chuyện
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(point)}
                        title="Chỉnh sửa điểm"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(point.id)}
                        title="Xóa điểm"
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
              <h3 className="text-base font-bold text-slate-800">Xóa điểm tử tế này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Điểm đánh dấu sẽ được gỡ khỏi bản đồ 63 tỉnh thành ngay lập tức.
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
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Point Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">
                  {editingPoint ? 'Chỉnh Sửa Điểm Tử Tế Bản Đồ' : 'Thêm Điểm Tử Tế Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên điểm tử tế <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Điểm tử tế Thủ Dầu Một..."
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={formData.province || 'Hà Nội'}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer font-medium"
                  >
                    {vietnameseProvinces.map(p => (
                      <option key={p} value={p}>{p}</option>
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
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer font-medium"
                  >
                    <option value="Bắc">Miền Bắc</option>
                    <option value="Trung">Miền Trung</option>
                    <option value="Nam">Miền Nam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vĩ độ (Latitude)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="21.0285"
                    value={formData.latitude || ''}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kinh độ (Longitude)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="105.8542"
                    value={formData.longitude || ''}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ cụ thể
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ngã tư Hoàng Văn Thụ, TP. Thủ Dầu Một..."
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Câu chuyện tử tế gắn liền
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cậu bé nhặt ve chai trả lại ví tiền..."
                  value={formData.storyTitle || ''}
                  onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả ý nghĩa nhân văn
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt hành động tử tế diễn ra tại đây..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-xl shadow-md shadow-sky-500/20"
                >
                  {editingPoint ? 'Lưu thay đổi' : 'Tạo điểm bản đồ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
