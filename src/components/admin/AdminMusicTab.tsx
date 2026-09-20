import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Youtube,
  Star,
  RefreshCw,
  Info,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { storage } from '../../services/storage';
import { useToast } from '../../context/ToastContext';
import { SongInfo } from '../../types';

export const AdminMusicTab: React.FC = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewYoutubeId, setPreviewYoutubeId] = useState<string | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'info' | 'lyrics' | 'story' | 'credits'>('info');
  const { showToast } = useToast();

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    setLoading(true);
    try {
      const data = await storage.getMusic();
      setMusicList(data || []);
    } catch (error) {
      showToast('Không thể tải danh sách âm nhạc', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    composer: '',
    youtubeId: '',
    audioUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    frequency: '432Hz',
    releaseDate: 'Tháng 10/2024',
    description: '',
    message: '',
    lyricsText: '',
    behindTheScenes: '',
    isFeatured: false,
    credits: {
      production: 'Ban Truyền Thông & Khoa Học Hành Vi Học Đường',
      vocals: 'CLB Âm Nhạc Trẻ Học Đường',
      lyricsBy: 'Nhóm Nghiên Cứu LUMI',
      visualDesign: 'Dự án CHẠM IU THƯƠNG',
      specialThanks: 'Thầy Cô Tham Vấn Tâm Lý & Học Sinh THPT'
    }
  });

  const featuredSong = musicList.find(s => s.isFeatured || s.slug === 'dieu-chua-noi' || s.id === 'song-dieu-chua-noi') || musicList[0];

  const filteredMusic = (musicList || []).filter(s => 
    s && (
      (s.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.artist || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.composer || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleOpenAdd = () => {
    setEditingSong(null);
    setActiveFormTab('info');
    setFormData({
      title: '',
      artist: 'Dự Án LUMI',
      composer: 'Ban Sáng Tác LUMI',
      youtubeId: '',
      audioUrl: '',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      frequency: '432Hz',
      releaseDate: new Date().toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' }),
      description: 'Giai điệu xoa dịu tâm hồn và đánh thức lòng trắc ẩn học đường.',
      message: 'Mỗi thanh âm đều có thể chữa lành một trái tim.',
      lyricsText: '',
      behindTheScenes: '',
      isFeatured: false,
      credits: {
        production: 'LUMI Studio',
        vocals: 'Học sinh & Thanh niên tình nguyện',
        lyricsBy: 'Dự án LUMI',
        visualDesign: 'Design by LUMI',
        specialThanks: 'Thầy cô & Học sinh các trường THPT'
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (song: any) => {
    setEditingSong(song);
    setActiveFormTab('info');

    // Convert lyrics array to string if needed
    let lyricsStr = '';
    if (typeof song.lyrics === 'string') {
      lyricsStr = song.lyrics;
    } else if (Array.isArray(song.lyrics)) {
      lyricsStr = song.lyrics.map((l: any) => (l.time ? `[${l.time}] ` : '') + l.text).join('\n');
    }

    setFormData({
      title: song.title || '',
      artist: song.artist || '',
      composer: song.composer || '',
      youtubeId: song.youtubeId || '',
      audioUrl: song.audioUrl || '',
      coverImage: song.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      frequency: song.frequency || '432Hz',
      releaseDate: song.releaseDate || 'Tháng 10/2024',
      description: song.description || '',
      message: song.message || '',
      lyricsText: lyricsStr,
      behindTheScenes: song.behindTheScenes || '',
      isFeatured: !!song.isFeatured || song.slug === 'dieu-chua-noi' || song.id === 'song-dieu-chua-noi',
      credits: {
        production: song.credits?.production || 'Ban Truyền Thông LUMI',
        vocals: song.credits?.vocals || 'CLB Âm Nhạc Trẻ',
        lyricsBy: song.credits?.lyricsBy || 'Dự Án LUMI',
        visualDesign: song.credits?.visualDesign || 'Design Team LUMI',
        specialThanks: song.credits?.specialThanks || 'Học sinh & Thầy cô'
      }
    });
    setIsModalOpen(true);
  };

  const handleSetFeatured = async (song: any) => {
    try {
      // Tắt trạng thái featured của các bài hát khác
      for (const s of musicList) {
        if (s.isFeatured && s.id !== song.id) {
          await storage.updateMusic(s.id, { isFeatured: false });
        }
      }
      // Mark this song as featured
      await storage.updateMusic(song.id, { isFeatured: true });
      showToast(`Đã đặt "${song.title}" làm MV Chủ Đề Chính Thức!`, 'success');
      loadMusic();
    } catch (error) {
      showToast('Lỗi khi thiết lập MV chủ đề', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Vui lòng nhập tên bài hát / MV!', 'error');
      return;
    }

    let cleanYoutubeId = formData.youtubeId.trim();
    if (cleanYoutubeId.includes('youtube.com/watch?v=')) {
      cleanYoutubeId = cleanYoutubeId.split('watch?v=')[1]?.split('&')[0] || cleanYoutubeId;
    } else if (cleanYoutubeId.includes('youtu.be/')) {
      cleanYoutubeId = cleanYoutubeId.split('youtu.be/')[1]?.split('?')[0] || cleanYoutubeId;
    } else if (cleanYoutubeId.includes('youtube.com/embed/')) {
      cleanYoutubeId = cleanYoutubeId.split('embed/')[1]?.split('?')[0] || cleanYoutubeId;
    }

    // Parse lyrics text into structured array if possible, or keep as string
    const structuredLyrics = formData.lyricsText.split('\n').filter(l => l.trim().length > 0).map(line => {
      const match = line.match(/^\[(.*?)\]\s*(.*)$/);
      if (match) {
        return { time: match[1], text: match[2], emphasis: line.includes('*') || line.includes('[Điệp khúc]') };
      }
      return { text: line.replace(/\*/g, ''), emphasis: line.includes('*') || line.includes('[Điệp khúc]') };
    });

    const payload = {
      title: formData.title.trim(),
      artist: formData.artist.trim(),
      composer: formData.composer.trim(),
      youtubeId: cleanYoutubeId,
      audioUrl: formData.audioUrl.trim(),
      coverImage: formData.coverImage.trim(),
      frequency: formData.frequency.trim() || '432Hz',
      releaseDate: formData.releaseDate.trim(),
      description: formData.description.trim(),
      message: formData.message.trim(),
      lyrics: structuredLyrics.length > 0 ? structuredLyrics : formData.lyricsText,
      behindTheScenes: formData.behindTheScenes.trim(),
      credits: formData.credits,
      isFeatured: formData.isFeatured,
      slug: formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    };

    try {
      // Nếu bài hát mới được đặt làm nổi bật, tắt các bài khác
      if (formData.isFeatured) {
        for (const s of musicList) {
          if (s.isFeatured && (!editingSong || s.id !== editingSong.id)) {
            await storage.updateMusic(s.id, { isFeatured: false });
          }
        }
      }

      if (editingSong) {
        await storage.updateMusic(editingSong.id, payload);
        showToast('Đã cập nhật bài hát & MV thành công!', 'success');
      } else {
        await storage.addSong(payload as any);
        showToast('Đã thêm bài hát & MV mới!', 'success');
      }
      setIsModalOpen(false);
      loadMusic();
    } catch (error) {
      showToast('Lỗi khi lưu bài hát', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storage.deleteMusic(id);
      showToast('Đã xóa bài hát khỏi hệ thống', 'success');
      loadMusic();
    } catch (error) {
      showToast('Lỗi khi xóa bài hát', 'error');
    }
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Music className="w-5 h-5 text-indigo-500" />
            <span>Quản Lý MV & Góc Âm Nhạc 432Hz</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {musicList.length} ca khúc
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Điều chỉnh hoặc thay thế MV chủ đề <strong className="text-indigo-600">"Điều Chưa Nói"</strong>, quản lý video YouTube, lời bài hát và nhạc tần số chữa lành.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={loadMusic}
            title="Làm mới"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ca khúc mới</span>
          </button>
        </div>
      </div>

      {/* Featured MV Spotlight Banner (Quick Edit & Adjustment for "Điều Chưa Nói") */}
      {featuredSong && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white border border-indigo-500/30 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-400/40 flex-shrink-0 group shadow-lg">
                <img 
                  src={featuredSong.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'} 
                  alt={featuredSong.title}
                  className="w-full h-full object-cover"
                />
                {featuredSong.youtubeId && (
                  <button 
                    onClick={() => setPreviewYoutubeId(featuredSong.youtubeId)}
                    className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer"
                    title="Xem thử video"
                  >
                    <Play className="w-8 h-8 text-white fill-white drop-shadow" />
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>MV CA KHÚC CHỦ ĐỀ HIỆN TẠI</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                    Tần số {featuredSong.frequency || '432Hz'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {featuredSong.title}
                </h3>
                <p className="text-xs text-indigo-200">
                  {featuredSong.artist} • Sáng tác: {featuredSong.composer}
                </p>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {featuredSong.message || featuredSong.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              {featuredSong.youtubeId && (
                <button
                  onClick={() => setPreviewYoutubeId(featuredSong.youtubeId)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span>Xem MV</span>
                </button>
              )}
              <button
                onClick={() => handleOpenEdit(featuredSong)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Điều Chỉnh / Thay Thế MV Này</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Note Box */}
      <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex items-start gap-3 text-xs text-slate-700">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            Hướng dẫn điều chỉnh hoặc thay thế MV "Điều Chưa Nói":
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
            <li><strong>Để thay video/link YouTube:</strong> Nhấn nút <em>"Điều Chỉnh / Thay Thế MV Này"</em> hoặc biểu tượng bút chì trên dòng bài hát, dán link YouTube mới (hoặc ID 11 ký tự) rồi bấm <em>"Lưu thay đổi"</em>.</li>
            <li><strong>Để thay thế bằng một bài hát/MV mới hoàn toàn:</strong> Nhấn <em>"Thêm ca khúc mới"</em>, nhập thông tin bài hát và tích chọn <em>"Đặt làm MV Ca khúc chủ đề"</em>. Hệ thống sẽ tự động cập nhật hiển thị đồng bộ lên Trang Chủ và Trang Âm Nhạc.</li>
          </ul>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên bài hát, ca sĩ, nhạc sĩ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-xs"
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
                <th className="px-4 py-3">Tần số & Phát hành</th>
                <th className="px-4 py-3">Thông điệp</th>
                <th className="px-4 py-3">Phân loại</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <RefreshCw className="w-6 h-6 mx-auto text-indigo-500 animate-spin mb-2" />
                    <span>Đang tải danh sách âm nhạc...</span>
                  </td>
                </tr>
              ) : filteredMusic.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Music className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Chưa có bài hát nào</p>
                  </td>
                </tr>
              ) : (
                filteredMusic.map((song) => {
                  const isCurrentFeatured = song.isFeatured || song.slug === 'dieu-chua-noi' || song.id === 'song-dieu-chua-noi';

                  return (
                    <tr key={song.id} className={`transition-colors ${isCurrentFeatured ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50/70'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={song.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'}
                            alt={song.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-800 line-clamp-1">{song.title}</p>
                              {isCurrentFeatured && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-extrabold text-[9px] uppercase border border-amber-200">
                                  MV Chủ Đề
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">
                              YouTube: {song.youtubeId || 'Chưa liên kết'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-700">{song.artist}</p>
                        <p className="text-[10px] text-slate-400">ST: {song.composer || song.artist}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 inline-block text-[10px]">
                            {song.frequency || '432Hz'}
                          </span>
                          <p className="text-[10px] text-slate-400">{song.releaseDate || '2024'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-slate-600 line-clamp-1 text-[11px]">{song.message || song.description}</p>
                      </td>
                      <td className="px-4 py-3">
                        {isCurrentFeatured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> MV Chiến dịch
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetFeatured(song)}
                            className="text-[10px] text-slate-500 hover:text-indigo-600 hover:underline cursor-pointer"
                            title="Đặt làm MV chủ đề chính thức"
                          >
                            Đặt làm chủ đề
                          </button>
                        )}
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
                          title="Chỉnh sửa bài hát / MV"
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
                  );
                })
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
                <span>Xem Thử Video MV</span>
              </h3>
              <button onClick={() => setPreviewYoutubeId(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
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
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingSong ? `Chỉnh Sửa / Thay Thế MV: ${editingSong.title}` : 'Thêm Ca Khúc / MV Mới'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Cập nhật link video YouTube, thông tin nghệ sĩ, lời bài hát và đội ngũ sản xuất.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setActiveFormTab('info')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFormTab === 'info' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                1. Thông tin MV & Video
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('lyrics')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFormTab === 'lyrics' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                2. Lời bài hát (Lyrics)
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('story')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFormTab === 'story' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                3. Hậu trường & Thông điệp
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('credits')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFormTab === 'credits' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                4. Đội ngũ sản xuất
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-1">
              {/* TAB 1: BASIC INFO & VIDEO */}
              {activeFormTab === 'info' && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tên bài hát / MV <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Điều Chưa Nói"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-bold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ca sĩ / Thể hiện</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Dự Án LUMI x Học Sinh THPT"
                        value={formData.artist}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nhạc sĩ / Sáng tác</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Dự Án Khoa Học Hành Vi LUMI"
                        value={formData.composer}
                        onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Link YouTube hoặc Video ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ hoặc dQw4w9WgXcQ"
                        value={formData.youtubeId}
                        onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                      />
                      {formData.youtubeId && (
                        <button
                          type="button"
                          onClick={() => {
                            let clean = formData.youtubeId.trim();
                            if (clean.includes('watch?v=')) clean = clean.split('watch?v=')[1]?.split('&')[0];
                            else if (clean.includes('youtu.be/')) clean = clean.split('youtu.be/')[1]?.split('?')[0];
                            setPreviewYoutubeId(clean);
                          }}
                          className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Xem thử</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Hỗ trợ dán toàn bộ đường link YouTube (youtube.com hoặc youtu.be), hệ thống sẽ tự động trích xuất mã video.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tần số âm thanh</label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-semibold"
                      >
                        <option value="432Hz">432Hz (Tần số chữa lành & giảm căng thẳng)</option>
                        <option value="528Hz">528Hz (Tần số tình yêu & tái tạo năng lượng)</option>
                        <option value="396Hz">396Hz (Giải phóng cảm giác tội lỗi & sợ hãi)</option>
                        <option value="Standard">Standard (Âm nhạc tiêu chuẩn)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian phát hành</label>
                      <input
                        type="text"
                        placeholder="Tháng 10/2024"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
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

                  {/* Featured Checkbox */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>Đặt làm MV Ca Khúc Chủ Đề Chiến Dịch</span>
                      </p>
                      <p className="text-[11px] text-amber-700">
                        Hiển thị nổi bật tại Banner Trang Chủ và trang chi tiết Góc Âm Nhạc.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: LYRICS */}
              {activeFormTab === 'lyrics' && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lời bài hát đầy đủ (Lyrics)
                    </label>
                    <textarea
                      rows={12}
                      placeholder="Nhập lời bài hát... Ví dụ:&#10;[00:15] Có những ngày sân trường bỗng thênh thang...&#10;[00:32] Chỉ riêng một góc nhỏ ngồi lặng im trong bóng râm...&#10;[01:30] [Điệp khúc] Nhìn bằng trái tim, sẽ thấy những vết xước vô hình..."
                      value={formData.lyricsText}
                      onChange={(e) => setFormData({ ...formData, lyricsText: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Mẹo: Có thể nhập dạng timeline <code>[00:15] Lời bài hát</code> để hiển thị khớp theo thời gian chạy video, hoặc nhập văn bản bình thường.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: BEHIND THE SCENES & MESSAGE */}
              {activeFormTab === 'story' && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thông điệp cốt lõi (Core Message)
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Đôi khi điều một người bạn cần nhất chỉ là một cái ôm và câu nói: Có tớ ở đây rồi..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mô tả chi tiết ca khúc
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả bối cảnh và ý nghĩa bài hát..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Câu chuyện hậu trường sáng tác & thu âm (Behind The Scenes)
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Kể về quá trình thu âm, những câu chuyện tâm sự thực tế từ học sinh..."
                      value={formData.behindTheScenes}
                      onChange={(e) => setFormData({ ...formData, behindTheScenes: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: PRODUCTION CREDITS */}
              {activeFormTab === 'credits' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị sản xuất (Production)</label>
                      <input
                        type="text"
                        value={formData.credits.production}
                        onChange={(e) => setFormData({
                          ...formData,
                          credits: { ...formData.credits, production: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Biểu diễn / Giọng hát (Vocals)</label>
                      <input
                        type="text"
                        value={formData.credits.vocals}
                        onChange={(e) => setFormData({
                          ...formData,
                          credits: { ...formData.credits, vocals: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Lời & Âm nhạc (Lyrics by)</label>
                      <input
                        type="text"
                        value={formData.credits.lyricsBy}
                        onChange={(e) => setFormData({
                          ...formData,
                          credits: { ...formData.credits, lyricsBy: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Thiết kế & Nghệ thuật (Visual)</label>
                      <input
                        type="text"
                        value={formData.credits.visualDesign}
                        onChange={(e) => setFormData({
                          ...formData,
                          credits: { ...formData.credits, visualDesign: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lời cảm ơn đặc biệt (Special Thanks)</label>
                    <input
                      type="text"
                      value={formData.credits.specialThanks}
                      onChange={(e) => setFormData({
                        ...formData,
                        credits: { ...formData.credits, specialThanks: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 rounded-xl shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    {editingSong ? 'Lưu Thay Đổi MV' : 'Đăng MV Mới'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

