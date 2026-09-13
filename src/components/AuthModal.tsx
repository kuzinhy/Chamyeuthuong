import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ShieldCheck, ArrowRight, Lock, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LumiMascot } from './LumiMascot';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithFirebasePopup, loginWithGoogle } = useAuth();
  const { showToast } = useToast();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDomainNotice, setShowDomainNotice] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const copyCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.hostname);
      setCopiedDomain(true);
      showToast('Đã sao chép tên miền vào bộ nhớ tạm!', {
        description: window.location.hostname,
        type: 'success'
      });
      setTimeout(() => setCopiedDomain(false), 3000);
    }
  };

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Vui lòng nhập địa chỉ Gmail hợp lệ', { type: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginWithGoogle(cleanEmail);
      setIsSubmitting(false);
      closeAuthModal();
      showToast('Đăng nhập thành công!', { 
        description: `Chào mừng ${cleanEmail} đến với không gian số LUMI`,
        type: 'heart' 
      });
    } catch (err: any) {
      setIsSubmitting(false);
      showToast('Đăng nhập không thành công', {
        description: err.message || 'Vui lòng kiểm tra lại địa chỉ Gmail.',
        type: 'error'
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithFirebasePopup();
      setIsSubmitting(false);
      closeAuthModal();
      showToast('Đăng nhập Google thành công!', { type: 'success' });
    } catch (err: any) {
      setIsSubmitting(false);
      if (err?.code === 'auth/popup-closed-by-user') {
        showToast('Đã đóng cửa sổ đăng nhập Google', { type: 'info' });
        return;
      }
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain') || err?.isUnauthorizedDomain) {
        setShowDomainNotice(true);
        showToast('Tên miền cần thêm vào Firebase Console', {
          description: 'Xem hướng dẫn trong bảng hoặc đăng nhập tức thì với Gmail bên dưới.',
          type: 'warning'
        });
        return;
      }
      showToast('Không thể đăng nhập Google', {
        description: err.message || 'Vui lòng thử lại hoặc nhập Gmail bên dưới.',
        type: 'error'
      });
    }
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
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative bg-[#2563EB] p-6 text-white text-center">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-2">
              <LumiMascot size="sm" state="heart" interactive={false} />
            </div>

            <h3 className="text-xl font-bold font-sans">Đăng Nhập LUMI</h3>
            <p className="text-xs text-blue-100 mt-1">
              “Nhìn bằng trái tim – Hành động bằng yêu thương”
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Domain Notice */}
              {showDomainNotice && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 text-xs shadow-xs">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Tên miền chưa được thêm vào Firebase</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDomainNotice(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed mb-2">
                    Firebase yêu cầu thêm tên miền vào danh sách <strong>Authorized domains</strong>.
                  </p>
                  <div className="flex items-center justify-between gap-1 p-1.5 bg-white rounded-lg border border-amber-200 mb-2">
                    <span className="font-mono text-[11px] text-slate-700 truncate">{currentHostname}</span>
                    <button
                      type="button"
                      onClick={copyCurrentDomain}
                      className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      {copiedDomain ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedDomain ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 border-[#E2E8F0] hover:border-[#2563EB] bg-white hover:bg-slate-50 text-[#0F172A] text-sm font-semibold transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{isSubmitting ? 'Đang kết nối...' : 'Đăng nhập bằng tài khoản Google'}</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="px-3 text-xs text-slate-400 font-medium">hoặc đăng nhập bằng Gmail</span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Địa chỉ Gmail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="vidu@gmail.com"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu / Mã PIN
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                >
                  <span>Đăng Nhập</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Bảo mật & Phân quyền: Đăng nhập bằng Gmail được hệ thống xác thực trực tiếp và phân quyền tự động theo danh sách cấp phép.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
