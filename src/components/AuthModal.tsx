import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ShieldCheck, UserCheck, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LumiMascot } from './LumiMascot';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail, loginAsDemo } = useAuth();
  const { showToast } = useToast();

  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'demo'>('student');

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Vui lòng nhập đúng định dạng email', { type: 'warning' });
      return;
    }
    setIsSubmitting(true);
    await loginWithEmail(emailInput);
    setIsSubmitting(false);
    showToast('Đăng nhập thành công!', { 
      description: `Chào mừng bạn đến với không gian số LUMI`,
      type: 'heart' 
    });
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    await loginWithGoogle();
    setIsSubmitting(false);
    showToast('Đăng nhập Google thành công!', { type: 'success' });
  };

  const handleDemoSelect = (role: UserRole) => {
    loginAsDemo(role);
    showToast(`Đã chuyển sang vai trò: ${role}`, { 
      description: 'Bạn có thể trải nghiệm đầy đủ quyền hạn của vai trò này',
      type: 'sparkle' 
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 p-6 text-white text-center">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-2">
              <LumiMascot size="sm" state="heart" interactive={false} />
            </div>

            <h3 className="text-xl font-bold font-sans">Tham Gia Cùng LUMI</h3>
            <p className="text-xs text-sky-100 mt-1">
              “Nhìn bằng trái tim – Hành động bằng yêu thương”
            </p>

            {/* Tab switch */}
            <div className="flex bg-white/15 p-1 rounded-2xl mt-5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('student')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'student' ? 'bg-white text-sky-600 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Học Sinh / Cá Nhân
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'demo' ? 'bg-white text-sky-600 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Trải Nghiệm Phân Quyền
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {activeTab === 'student' ? (
              <div className="space-y-4">
                {/* Google Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>

                <div className="flex items-center my-3">
                  <div className="flex-1 border-t border-slate-200"></div>
                  <span className="px-3 text-xs text-slate-400 font-medium">hoặc đăng nhập bằng Email</span>
                  <div className="flex-1 border-t border-slate-200"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Địa chỉ Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="tenban@thpt.edu.vn"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Đăng Nhập / Tiếp Tục</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed mt-2">
                  🔒 Bảo vệ học sinh: LUMI không chia sẻ email hay thông tin cá nhân của bạn ra bên ngoài.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 font-medium mb-3">
                  Chọn vai trò để kiểm thử tức thì quyền hạn và hệ thống phân quyền:
                </p>

                {/* Role Switch Buttons */}
                <button
                  onClick={() => handleDemoSelect('SUPER_ADMIN')}
                  className="w-full p-3 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 flex items-center justify-between text-left transition-all hover:border-purple-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500 text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-purple-950">SUPER ADMIN (Ban Quản Trị)</h5>
                      <p className="text-[11px] text-purple-700">Toàn quyền hệ thống, phân quyền, cấu hình CMS</p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={() => handleDemoSelect('ADMIN')}
                  className="w-full p-3 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 flex items-center justify-between text-left transition-all hover:border-sky-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-sky-500 text-white">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-sky-950">ADMIN (Quản Trị Viên)</h5>
                      <p className="text-[11px] text-sky-700">Quản lý bài viết, thư yêu thương, bản đồ, media</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDemoSelect('EDITOR')}
                  className="w-full p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 flex items-center justify-between text-left transition-all hover:border-emerald-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-emerald-950">EDITOR (Biên Tập Viên)</h5>
                      <p className="text-[11px] text-emerald-700">Tạo & chỉnh sửa câu chuyện tử tế, upload ảnh</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDemoSelect('MODERATOR')}
                  className="w-full p-3 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 flex items-center justify-between text-left transition-all hover:border-amber-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500 text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-amber-950">MODERATOR (Kiểm Duyệt Viên)</h5>
                      <p className="text-[11px] text-amber-700">Duyệt thư yêu thương & câu chuyện bạn gửi</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDemoSelect('MEMBER')}
                  className="w-full p-3 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 flex items-center justify-between text-left transition-all hover:border-rose-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-rose-500 text-white">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-rose-950">MEMBER (Học Sinh THPT)</h5>
                      <p className="text-[11px] text-rose-700">Lưu bài, gửi câu chuyện, gửi thư, nhận thông báo</p>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
