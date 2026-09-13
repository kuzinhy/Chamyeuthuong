import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, LogOut, Copy, Check, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';
import { LumiMascot } from '../components/LumiMascot';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ActiveNavPage } from '../types';

interface LoginPageProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginWithGoogle, loginWithFirebasePopup, user, isLoggedIn, logout } = useAuth();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  // 1. Google Account Sign-In via Firebase Popup
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await loginWithFirebasePopup();
      if (result.role === 'SUPER_ADMIN') {
        showToast('Đăng nhập Quản Trị Viên thành công!', {
          description: 'Chào mừng bạn đến với Trung tâm Quản trị LUMI.',
          type: 'success'
        });
        onNavigate('admin');
      } else {
        showToast('Đăng nhập thành công!', {
          description: 'Chào mừng bạn đến với không gian số LUMI.',
          type: 'heart'
        });
        onNavigate('home');
      }
    } catch (firebaseErr: any) {
      console.warn('Firebase login attempt ended:', firebaseErr);
      if (firebaseErr?.code === 'auth/popup-closed-by-user') {
        showToast('Đã đóng cửa sổ đăng nhập Google', { type: 'info' });
      } else if (
        firebaseErr?.code === 'auth/unauthorized-domain' ||
        firebaseErr?.message?.includes('unauthorized-domain') ||
        firebaseErr?.isUnauthorizedDomain
      ) {
        setShowDomainNotice(true);
        setErrorMessage(null);
        showToast('Tên miền cần cấu hình trong Firebase Console', {
          description: 'Vui lòng xem thẻ hướng dẫn bên dưới hoặc dùng giải pháp đăng nhập tức thì bằng Gmail.',
          type: 'warning'
        });
      } else {
        const message = firebaseErr?.message || 'Không thể mở cửa sổ đăng nhập Google. Bạn có thể nhập địa chỉ Gmail bên dưới.';
        setErrorMessage(message);
        showToast('Đăng nhập không thành công', {
          description: message,
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Direct Gmail Authentication Form Submit
  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Vui lòng nhập địa chỉ Gmail của bạn.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setErrorMessage('Địa chỉ email không đúng định dạng. Ví dụ: tenban@gmail.com');
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithGoogle(cleanEmail);
      if (result.role === 'SUPER_ADMIN') {
        showToast('Đăng nhập Quản Trị Viên thành công!', {
          description: `Chào mừng ${user?.displayName || 'Quản trị viên'} đến với trang quản trị LUMI.`,
          type: 'success'
        });
        onNavigate('admin');
      } else {
        showToast('Đăng nhập thành công!', {
          description: 'Chào mừng bạn đến với không gian số lan tỏa lòng trắc ẩn LUMI.',
          type: 'heart'
        });
        onNavigate('home');
      }
    } catch (err: any) {
      const msg = err.message || 'Không thể xác thực Gmail. Vui lòng kiểm tra lại.';
      setErrorMessage(msg);
      showToast('Đăng nhập thất bại', {
        description: msg,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT COLUMN: Project Identity & Philosophy (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#DBEAFE]/40 p-8 sm:p-10 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BFDBFE] text-[#2563EB] text-xs font-semibold uppercase tracking-wider shadow-xs mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cổng Xác Thực Bảo Mật
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              LUMI
            </h1>
            <div className="text-sm sm:text-base font-bold text-[#2563EB] tracking-normal mb-3">
              LAN TỎA LÒNG TRẮC ẨN
            </div>

            <p className="text-xs text-[#475569] italic mb-6 leading-relaxed">
              “Nhìn bằng trái tim – Hành động bằng yêu thương”
            </p>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Dự án nghiên cứu khoa học hành vi THPT ứng dụng công nghệ số kết nối câu chuyện người tốt việc tốt và thúc đẩy hành vi nhân ái.
            </p>
          </div>

          <div className="my-6 flex flex-col items-center justify-center">
            <LumiMascot state="heart" size={140} interactive />
            <span className="text-xs text-[#64748B] mt-2 font-medium">Linh vật LUMI luôn đồng hành cùng bạn</span>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] text-center">
            <span className="text-[11px] text-[#94A3B8]">
              Xác thực thông qua tài khoản Google / Gmail
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Dedicated Gmail Authentication (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Đăng nhập bằng Gmail
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
                Sử dụng tài khoản Google hoặc nhập trực tiếp địa chỉ Gmail để đăng nhập
              </p>
            </div>

            {/* If Already Logged In */}
            {isLoggedIn && user ? (
              <div className="mb-6 p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                    alt={user.displayName}
                    className="w-11 h-11 rounded-full border-2 border-white shadow-xs object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0F172A] truncate">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-[#64748B] truncate font-mono">
                      {user.email}
                    </div>
                    <div className="text-[11px] text-[#2563EB] font-semibold mt-0.5">
                      {user.role === 'SUPER_ADMIN' ? 'Vai trò: QUẢN TRỊ VIÊN (Super Admin)' : 'Vai trò: THÀNH VIÊN (Member)'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {user.role === 'SUPER_ADMIN' ? (
                    <button
                      type="button"
                      onClick={() => onNavigate('admin')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Vào Trang Quản Trị
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('home')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Về Trang Chủ
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="py-2.5 px-3.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] hover:text-red-600 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                    title="Đăng xuất tài khoản hiện tại"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đổi tài khoản</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Firebase auth/unauthorized-domain Notice & Quick Help */}
            {showDomainNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-[#0F172A] shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                        Tên miền chưa được thêm vào Firebase Auth
                      </h4>
                      <button 
                        type="button" 
                        onClick={() => setShowDomainNotice(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer p-1"
                        title="Đóng thông báo"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      Firebase Authentication yêu cầu tên miền đang chạy ứng dụng phải nằm trong danh sách <strong className="font-semibold">Authorized Domains</strong> (Miền được ủy quyền).
                    </p>

                    {/* Domain badge & copy button */}
                    <div className="mt-2.5 p-2 rounded-xl bg-white border border-amber-200 flex items-center justify-between gap-2">
                      <code className="text-xs font-mono text-slate-800 font-semibold truncate select-all">
                        {currentHostname}
                      </code>
                      <button
                        type="button"
                        onClick={copyCurrentDomain}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors cursor-pointer flex-shrink-0"
                      >
                        {copiedDomain ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-green-700">Đã chép!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép tên miền</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* How to add to Firebase */}
                    <div className="mt-3 text-[11px] text-amber-900/90 space-y-1 bg-amber-100/50 p-2.5 rounded-xl border border-amber-200/60">
                      <p className="font-semibold text-amber-950">3 bước thêm tên miền vào Firebase Console:</p>
                      <p>1. Mở <strong className="font-semibold">Firebase Console</strong> → Dự án <code className="bg-white/80 px-1 py-0.5 rounded font-mono">chamyeuthuong-7db8d</code></p>
                      <p>2. Chọn <strong className="font-semibold">Authentication</strong> → Tab <strong className="font-semibold">Settings</strong> → <strong className="font-semibold">Authorized domains</strong></p>
                      <p>3. Bấm <strong className="font-semibold">Add domain</strong> và dán tên miền trên vào.</p>
                      
                      <div className="pt-1.5">
                        <a 
                          href="https://console.firebase.google.com/project/chamyeuthuong-7db8d/authentication/settings" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          Mở cài đặt Firebase Console <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Option 1: Official Google Sign-In */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 text-[#0F172A] border-2 border-[#E2E8F0] hover:border-[#2563EB] font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {/* Official Google G Logo */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{loading ? 'Đang kết nối Google...' : 'Đăng nhập bằng tài khoản Google'}</span>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-[#E2E8F0]"></div>
                <span className="px-3 text-xs text-[#94A3B8] font-medium">hoặc đăng nhập bằng địa chỉ Gmail</span>
                <div className="flex-1 border-t border-[#E2E8F0]"></div>
              </div>

              {/* Option 2: Direct Gmail Address Input Form */}
              <form onSubmit={handleGmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Địa chỉ Gmail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="vidu@gmail.com"
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Mật khẩu / Mã xác thực
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                >
                  <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Với Gmail'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Security Notice */}
            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#64748B]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Hệ thống phân quyền Role-Based Access Control (RBAC) tự động cấp quyền Quản Trị Viên (Super Admin) đối với địa chỉ Gmail được phân công quản lý dự án.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
