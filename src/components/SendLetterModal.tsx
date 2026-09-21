import React, { useState, useRef } from 'react';
import { 
  X, 
  Heart, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Upload, 
  ExternalLink, 
  Eye, 
  FileText, 
  Trash2,
  HelpCircle,
  School,
  User,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LetterCategory, Letter } from '../types';

interface SendLetterModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: (letter: Omit<Letter, 'id' | 'createdAt' | 'likes' | 'status'>) => void;
}

type AttachmentMode = 'none' | 'image-url' | 'image-upload' | 'drive-link';

export const SendLetterModal: React.FC<SendLetterModalProps> = ({
  isOpen = true,
  onClose,
  onSubmit
}) => {
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<LetterCategory>('Cảm ơn');
  const [title, setTitle] = useState('');
  const [targetPerson, setTargetPerson] = useState('');
  const [schoolOrProvince, setSchoolOrProvince] = useState('');
  const [content, setContent] = useState('');
  const [colorTheme, setColorTheme] = useState<'rose' | 'amber' | 'sky' | 'emerald' | 'purple'>('rose');
  
  // Media / Attachment state
  const [attachmentMode, setAttachmentMode] = useState<AttachmentMode>('none');
  const [imageUrl, setImageUrl] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadFileName, setUploadFileName] = useState<string>('');
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showDriveGuide, setShowDriveGuide] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Vui lòng chọn ảnh nhỏ hơn 5MB để đảm bảo tốc độ tải.');
        return;
      }
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAttachment = () => {
    setImageUrl('');
    setUploadedImagePreview(null);
    setUploadFileName('');
    setDriveUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getEffectiveImageUrl = (): string | undefined => {
    if (attachmentMode === 'image-upload' && uploadedImagePreview) {
      return uploadedImagePreview;
    }
    if (attachmentMode === 'image-url' && imageUrl.trim()) {
      return imageUrl.trim();
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const finalImageUrl = getEffectiveImageUrl();
    const finalDriveUrl = attachmentMode === 'drive-link' && driveUrl.trim() ? driveUrl.trim() : '';

    onSubmit({
      senderName: isAnonymous || !senderName.trim() ? 'Bạn giấu tên' : senderName.trim(),
      isAnonymous,
      category,
      title: title.trim() || 'Thư gửi yêu thương',
      content: content.trim(),
      targetPerson: targetPerson.trim() || 'Người bạn giấu tên',
      schoolOrProvince: schoolOrProvince.trim() || '',
      colorTheme,
      imageUrl: finalImageUrl || '',
      driveUrl: finalDriveUrl,
      status: 'pending',
      likes: 0,
      isPublic: true
    });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch { }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContent('');
      setTitle('');
      setTargetPerson('');
      setSchoolOrProvince('');
      setSenderName('');
      clearAttachment();
      setAttachmentMode('none');
      onClose();
    }, 2400);
  };

  const categories: LetterCategory[] = [
    'Cảm ơn',
    'Xin lỗi',
    'Động viên',
    'Yêu thương',
    'Lời chúc',
    'Tâm sự',
    'Gửi một người đặc biệt',
    'Khác'
  ];

  const colorThemes: Array<{ id: 'rose' | 'amber' | 'sky' | 'emerald' | 'purple'; name: string; bg: string; border: string }> = [
    { id: 'rose', name: 'Hồng Ấm Áp', bg: 'bg-rose-500', border: 'border-rose-300' },
    { id: 'sky', name: 'Lam Hy Vọng', bg: 'bg-sky-500', border: 'border-sky-300' },
    { id: 'emerald', name: 'Xanh Chữa Lành', bg: 'bg-emerald-500', border: 'border-emerald-300' },
    { id: 'amber', name: 'Hổ Phách Thân Thương', bg: 'bg-amber-500', border: 'border-amber-300' },
    { id: 'purple', name: 'Tím Mộng Mơ', bg: 'bg-purple-500', border: 'border-purple-300' }
  ];

  const getThemeCardClass = (theme: string) => {
    switch (theme) {
      case 'rose': return 'bg-[#FFF5F7] border-rose-200 text-rose-950';
      case 'purple': return 'bg-[#FAF5FF] border-purple-200 text-purple-950';
      case 'sky': return 'bg-[#F0F9FF] border-sky-200 text-sky-950';
      case 'emerald': return 'bg-[#F0FDF4] border-emerald-200 text-emerald-950';
      default: return 'bg-[#FFFBEB] border-amber-200 text-amber-950';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-rose-100 overflow-hidden my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-50 via-sky-50 to-amber-50 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                Gửi Lời Nhắn Hộp Thư Yêu Thương
              </h3>
              <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                <span>Hộp thư LUMI</span>
                <span>•</span>
                <span className="text-slate-500 font-normal">Sẻ chia cảm xúc học đường</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isPreviewMode 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isPreviewMode ? 'Chỉnh sửa' : 'Xem trước'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/90 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-10 sm:p-12 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner animate-bounce">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h4 className="font-display font-extrabold text-2xl text-slate-900">
              Yêu Thương Đã Được Trao Đi!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Cảm ơn bạn đã sẻ chia. Bức thư của bạn đã được gửi đến ban biên tập LUMI để kiểm duyệt bảo mật trước khi xuất hiện trên bảng tin tử tế công khai.
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 text-rose-700 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>LUMI luôn đồng hành và lắng nghe bạn</span>
            </div>
          </div>
        ) : isPreviewMode ? (
          /* Live Postcard Preview Mode */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Xem trước tấm thiệp của bạn
              </span>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-4 relative ${getThemeCardClass(colorTheme)}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 shadow-2xs">
                  {category}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date().toLocaleDateString('vi-VN')}
                </span>
              </div>

              {title && (
                <h4 className="font-bold text-base sm:text-lg text-slate-900">
                  {title}
                </h4>
              )}

              <p className="font-handwriting text-xl sm:text-2xl text-slate-800 leading-relaxed whitespace-pre-line">
                {content || '“Nội dung bức thư của bạn sẽ xuất hiện ở đây...”'}
              </p>

              {/* Attached Image Preview */}
              {getEffectiveImageUrl() && (
                <div className="rounded-2xl overflow-hidden border border-black/10 max-h-60 bg-black/5 flex items-center justify-center">
                  <img 
                    src={getEffectiveImageUrl()} 
                    alt="Hình ảnh đính kèm" 
                    referrerPolicy="no-referrer"
                    className="max-h-60 w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              {/* Attached Drive Link */}
              {attachmentMode === 'drive-link' && driveUrl && (
                <div className="p-3 rounded-2xl bg-white/90 border border-sky-200 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-sky-700 font-semibold truncate">
                    <ExternalLink className="w-4 h-4 shrink-0 text-sky-600" />
                    <span className="truncate">Tệp đính kèm Google Drive: {driveUrl}</span>
                  </div>
                </div>
              )}

              {/* Footer row */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-sm text-slate-900">
                    {isAnonymous || !senderName ? 'Bạn giấu tên 💌' : senderName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {schoolOrProvince && <span>{schoolOrProvince} • </span>}
                    <span>Gửi đến: {targetPerson || 'Mọi người'}</span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="flex-1 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Xác nhận gửi thư</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Input Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* 1. Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Chủ đề bức thư <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center truncate ${
                      category === cat
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs scale-102 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Sender Information & Anonymity */}
            <div className="bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                  <span>2. Thông tin người gửi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full border border-rose-200 shadow-2xs">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-rose-500 focus:ring-rose-400 cursor-pointer"
                  />
                  <span>Gửi ẩn danh</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Tên / Biệt danh của bạn
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? 'Đang gửi với danh xưng Bạn giấu tên' : 'Ví dụ: Mai Anh, Hoàng Nam, Bé Heo...'}
                    value={isAnonymous ? '' : senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-400 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <School className="w-3 h-3 text-slate-400" />
                    <span>Trường học / Tỉnh thành (Tuỳ chọn)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Lớp 11A3 - THPT Gia Định, TP.HCM"
                    value={schoolOrProvince}
                    onChange={(e) => setSchoolOrProvince(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-400 bg-white"
                  />
                </div>
              </div>

              {/* Target person & Letter Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-200/60">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Gửi tới ai? (Ví dụ: Bạn cùng bàn, Thầy cô, Crush...)
                  </label>
                  <input
                    type="text"
                    placeholder="Để trống nếu gửi chung tới mọi người"
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-400 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Tiêu đề bức thư (Tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Gửi người bạn đã cùng tôi vượt qua kỳ thi..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-400 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 3. Letter Content Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Nội dung tâm tư <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {content.length} ký tự
                </span>
              </div>
              <textarea
                rows={4}
                required
                placeholder="Hãy viết ra những điều chân thành nhất từ tận đáy lòng bạn. Có thể là một lời cảm ơn chưa kịp nói, một lời xin lỗi muộn màng, hay lời chúc tiếp thêm động lực cho bạn bè..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-rose-400 bg-rose-50/20 resize-none leading-relaxed text-slate-800 shadow-inner"
              ></textarea>
            </div>

            {/* 4. Color Theme Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-rose-500" />
                <span>4. Chọn tông màu bưu thiếp</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {colorThemes.map((ct) => (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => setColorTheme(ct.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      colorTheme === ct.id 
                        ? 'border-slate-800 bg-white shadow-xs font-bold ring-2 ring-slate-800' 
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${ct.bg}`} />
                    <span>{ct.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Attach Image or Google Drive (FEATURE REQUESTED) */}
            <div className="bg-gradient-to-br from-sky-50/60 to-slate-50 p-4 rounded-2xl border border-sky-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-sky-600" />
                  <span>5. Đính kèm hình ảnh hoặc Link Google Drive</span>
                </label>
                {attachmentMode !== 'none' && (
                  <button
                    type="button"
                    onClick={() => {
                      clearAttachment();
                      setAttachmentMode('none');
                    }}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Xoá đính kèm</span>
                  </button>
                )}
              </div>

              {/* Mode Selector Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttachmentMode('image-url')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    attachmentMode === 'image-url'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Dán Link Ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttachmentMode('image-upload')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    attachmentMode === 'image-upload'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải ảnh từ máy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttachmentMode('drive-link')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    attachmentMode === 'drive-link'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Link Google Drive</span>
                </button>
              </div>

              {/* Sub-UI: Mode 1: Image URL */}
              {attachmentMode === 'image-url' && (
                <div className="space-y-2 pt-1 animate-in fade-in">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Dán đường link ảnh trực tiếp (VD: https://.../photo.jpg)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-sky-200 text-xs sm:text-sm focus:outline-none focus:border-sky-400 bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Hỗ trợ đường dẫn ảnh từ Imgur, Facebook, Cloudinary hoặc bất kỳ máy chủ ảnh công khai nào (.jpg, .png, .webp).
                  </p>
                  {imageUrl && (
                    <div className="mt-2 p-2 rounded-xl bg-white border border-sky-100 flex items-center gap-3">
                      <img 
                        src={imageUrl} 
                        alt="Xem trước" 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="text-xs text-slate-600 truncate">
                        <span className="font-semibold text-slate-800 block">Đã nhận diện link ảnh</span>
                        <span className="text-[11px] text-slate-400 truncate">{imageUrl}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-UI: Mode 2: Upload from Device */}
              {attachmentMode === 'image-upload' && (
                <div className="space-y-2 pt-1 animate-in fade-in">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="letter-image-upload-input"
                  />
                  <label
                    htmlFor="letter-image-upload-input"
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-sky-300 hover:border-sky-400 bg-white/80 rounded-2xl cursor-pointer hover:bg-sky-50/50 transition-colors text-center"
                  >
                    <Upload className="w-6 h-6 text-sky-600 mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      {uploadFileName ? uploadFileName : 'Nhấp để chọn ảnh từ điện thoại / máy tính'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Hỗ trợ JPG, PNG, WEBP (tối đa 5MB)
                    </span>
                  </label>

                  {uploadedImagePreview && (
                    <div className="p-2 rounded-xl bg-white border border-sky-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 truncate">
                        <img 
                          src={uploadedImagePreview} 
                          alt="Xem trước tải lên" 
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" 
                        />
                        <span className="text-xs font-semibold text-slate-700 truncate">
                          {uploadFileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAttachment}
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Xoá ảnh"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-UI: Mode 3: Google Drive Link */}
              {attachmentMode === 'drive-link' && (
                <div className="space-y-2 pt-1 animate-in fade-in">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Dán link chia sẻ Google Drive (VD: https://drive.google.com/file/d/...)"
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-sky-200 text-xs sm:text-sm focus:outline-none focus:border-sky-400 bg-white"
                    />
                    <a
                      href="https://drive.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 text-xs font-semibold flex items-center gap-1 shrink-0"
                      title="Mở Google Drive để tải file lên"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mở Drive</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      Cho phép gán file ảnh, thư mục ảnh, video ngắn hay audio ghi âm.
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDriveGuide(!showDriveGuide)}
                      className="text-sky-600 hover:text-sky-800 font-semibold underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{showDriveGuide ? 'Đóng hướng dẫn' : 'Cách lấy link Drive'}</span>
                    </button>
                  </div>

                  {showDriveGuide && (
                    <div className="p-3 rounded-xl bg-white border border-sky-200 text-[11px] text-slate-600 space-y-1 animate-in fade-in">
                      <p className="font-bold text-slate-800">📌 Hướng dẫn chia sẻ link Google Drive:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-slate-600 pl-1">
                        <li>Mở Google Drive và tải file ảnh/tài liệu của bạn lên.</li>
                        <li>Nhấp chuột phải vào file &gt; chọn <strong>Chia sẻ (Share)</strong>.</li>
                        <li>Tại mục Quyền truy cập chung, chọn: <strong>Bất kỳ ai có đường liên kết (Anyone with link)</strong>.</li>
                        <li>Bấm <strong>Sao chép đường liên kết (Copy link)</strong> và dán vào ô bên trên.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* School Safety & Privacy Moderation Banner */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Bảo mật học đường an toàn:</strong> Toàn bộ thông điệp sẽ được ban biên tập LUMI kiểm duyệt trước khi hiển thị công khai để đảm bảo không để lộ số điện thoại, mật khẩu cá nhân hay nội dung tiêu cực.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                disabled={!content.trim()}
                className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                <span>Xem trước thiệp</span>
              </button>

              <button
                type="submit"
                disabled={!content.trim()}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Gửi yêu thương ngay</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
