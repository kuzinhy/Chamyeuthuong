import React, { useState } from 'react';
import { 
  Music, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Play, 
  Radio, 
  Check, 
  X, 
  ExternalLink,
  Volume2
} from 'lucide-react';

interface AdminMusicTabProps {
  musicList: any[];
  onAddMusic: (song: any) => void;
  onUpdateMusic: (id: string, updates: any) => void;
  onDeleteMusic: (id: string) => void;
  onNavigateToMusic?: () => void;
}

export const AdminMusicTab: React.FC<AdminMusicTabProps> = ({
  musicList,
  onAddMusic,
  onUpdateMusic,
  onDeleteMusic,
  onNavigateToMusic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewYoutubeId, setPreviewYoutubeId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    composer: '',
    youtubeId: '',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    frequency: '432Hz',
    description: '',
    message: '',
    lyrics: '',
    status: 'published'
  });

  const filteredMusic = musicList.filter(s => 
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingSong(null);
    setFormData({
      title: '',
      artist: 'Dự án LUMI',
      composer: 'Ban Sáng Tác LUMI',
      youtubeId: '',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      frequency: '432Hz',
      description: 'Giai điệu xoa dịu tâm hồn và đánh thức lòng trắc ẩn học đường.',
      message: 'Mỗi thanh âm đều có thể chữa lành một trái tim.',
      lyrics: '',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (song: any) => {
    setEditingSong(song);
    setFormData({ ...song });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Vui lòng nhập tên bài hát!');
      return;
    }

    // Extract youtube ID if full URL pasted
    let cleanYoutubeId = formData.youtubeId.trim();
    if (cleanYoutubeId.includes('youtube.com/watch?v=')) {
      cleanYoutubeId = cleanYoutubeId.split('watch?v=')[1]?.split('&')[0] || cleanYoutubeId;
    } else if (cleanYoutubeId.includes('youtu.be/')) {
      cleanYoutubeId = cleanYoutubeId.split('youtu.be/')[1]?.split('?')[0] || cleanYoutubeId;
    }

    const payload = {
      ...formData,
      youtubeId: cleanYoutubeId,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    };

    if (editingSong) {
      onUpdateMusic(editingSong.id, payload);
    } else {
      onAddMusic(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onDeleteMusic(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Music className="w-5 h-5 text-indigo-500" />
            <span>Quản Lý Góc Âm Nhạc 432Hz</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {filteredMusic.length} ca khúc
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Đồng bộ mục "Góc âm nhạc 432Hz" trên menu. Quản lý các MV, bài hát chữa lành và tần số học đường.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {onNavigateToMusic && (
            <button
              onClick={onNavigateToMusic}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Trang Âm Nhạc</span>
            </button>
          )}
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ca khúc mới</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm bài hát theo tên hoặc nghệ sĩ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
      </div>

      {/* Music Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Bài hát & MV</th>
                <th className="px-4 py-3">Nghệ sĩ / Sáng tác</th>
                <th className="px-4 py-3">Tần số</th>
                <th className="px-4 py-3">Thông điệp</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMusic.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Music className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Chưa có bài hát nào</p>
                  </td>
                </tr>
              ) : (
                filteredMusic.map((song) => (
                  <tr key={song.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={song.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'}
                          alt={song.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{song.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">YouTube: {song.youtubeId || 'Chưa liên kết'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{song.artist}</p>
                      <p className="text-[10px] text-slate-400">ST: {song.composer || song.artist}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                        {song.frequency || '432Hz'}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-slate-600 line-clamp-1 text-[11px]">{song.message || song.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                        <Check className="w-3 h-3" /> Đang phát
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      {song.youtubeId && (
                        <button
                          onClick={() => setPreviewYoutubeId(song.youtubeId)}
                          title="Xem thử video"
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(song)}
                        title="Chỉnh sửa bài hát"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(song.id)}
                        title="Xóa bài hát"
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

      {/* Video Preview Modal */}
      {previewYoutubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-500" />
                <span>Xem Thử MV 432Hz</span>
              </h3>
              <button onClick={() => setPreviewYoutubeId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${previewYoutubeId}?autoplay=1`}
                title="Music Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
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
              <h3 className="text-base font-bold text-slate-800">Xóa ca khúc này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ca khúc sẽ bị gỡ khỏi chuyên mục âm nhạc 432Hz trên toàn bộ hệ thống.
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

      {/* Add / Edit Music Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Music className="w-4 h-4 text-indigo-500" />
                <span>{editingSong ? 'Chỉnh Sửa Bài Hát / MV' : 'Thêm Bài Hát / MV Mới'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên bài hát <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Điều Chưa Nói..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nghệ sĩ / Thể hiện</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Học sinh THPT..."
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nhạc sĩ / Sáng tác</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Dự án LUMI..."
                    value={formData.composer}
                    onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    YouTube ID / Link video
                  </label>
                  <input
                    type="text"
                    placeholder="dQw4w9WgXcQ hoặc link YouTube"
                    value={formData.youtubeId}
                    onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tần số âm thanh</label>
                  <input
                    type="text"
                    placeholder="432Hz"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ảnh bìa (Cover Image URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả & Thông điệp</label>
                <input
                  type="text"
                  placeholder="Thông điệp bài hát gửi gắm..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời bài hát (Lyrics)</label>
                <textarea
                  rows={4}
                  placeholder="Nhập lời bài hát..."
                  value={formData.lyrics}
                  onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
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
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 rounded-xl shadow-md shadow-indigo-500/20"
                >
                  {editingSong ? 'Lưu thay đổi' : 'Đăng ca khúc'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
