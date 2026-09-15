import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ExternalLink, 
  Sparkles,
  Lock,
  Mail
} from 'lucide-react';
import { LumiMascot } from '../components/LumiMascot';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ActiveNavPage } from '../types';

interface LoginPageProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginWithFirebasePopup, user, isLoggedIn, isAdmin, logout, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await loginWithFirebasePopup();
      if (result.role === 'super_admin' || result.role === 'admin') {
        showToast('Đăng nhập Quản Trị Viên thành công!', {
          description: 'Chào mừng bạn đến với hệ thống CMS chuyên nghiệp.',
          type: 'success'
        });
        onNavigate('admin');
      } else {
        showToast('Đăng nhập thành công!', {
          description: 'Chào mừng bạn đến với LUMI.',
          type: 'heart'
        });
        onNavigate('home');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      let message = err.message || 'Đã có lỗi xảy ra khi đăng nhập.';
      
      if (err.code === 'auth/popup-closed-by-user') {
        showToast('Đã hủy đăng nhập', 'info');
        return;
      }
      
      if (err.code === 'auth/unauthorized-domain') {
        message = 'Tên miền này chưa được ủy quyền. Vui lòng thêm domain vào Firebase Console > Authentication > Settings.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message = 'Phương thức đăng nhập Google chưa được bật trong Firebase Console.';
      } else if (err.message?.includes('permissions') || err.code?.includes('permission-denied')) {
        message = 'Lỗi phân quyền Firestore. Vui lòng kiểm tra lại Rules trong Firebase Console.';
      }

      setErrorMessage(message);
      showToast('Lỗi đăng nhập', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left: Branding */}
        <div className="md:w-5/12 bg-sky-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Gateway
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">LUMI</h1>
            <p className="text-sky-100 font-bold tracking-wide uppercase text-sm mb-6">Lan tỏa lòng trắc ẩn</p>
            <p className="text-sky-50 text-sm leading-relaxed opacity-90 italic">
              "Nhìn bằng trái tim - Hành động bằng yêu thương"
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <LumiMascot state="heart" size={160} interactive />
            <p className="text-[10px] font-bold text-sky-200 mt-4 uppercase tracking-widest">Linh vật LUMI đồng hành cùng bạn</p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <p className="text-[10px] text-sky-200 leading-relaxed">
              Hệ thống quản trị tích hợp Cloud Firestore & Firebase Auth bảo mật tuyệt đối.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Chào mừng bạn</h2>
              <p className="text-sm text-slate-500">Đăng nhập để bắt đầu hành trình lan tỏa điều tử tế cùng LUMI.</p>
            </div>

            {isLoggedIn && user ? (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-sky-50 text-sky-600 font-black text-xl uppercase">
                        {user.displayName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-black text-slate-800">{user.displayName}</p>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{user.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate(isAdmin ? 'admin' : 'home')}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm shadow-md shadow-sky-100 transition-all flex items-center justify-center gap-2"
                  >
                    Vào {isAdmin ? 'Trang Quản trị' : 'Trang chủ'} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={logout}
                    className="w-full py-3 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {errorMessage && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-50 rounded-2xl transition-all group disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span className="text-sm font-black text-slate-700 group-hover:text-sky-700 transition-colors">
                    {loading ? 'Đang kết nối...' : 'Tiếp tục với Google'}
                  </span>
                </button>

                <div className="relative py-4 flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Hỗ trợ</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                      QUYỀN TRUY CẬP ĐƯỢC TỰ ĐỘNG PHÂN PHỐI DỰA TRÊN EMAIL XÁC THỰC CỦA BAN TỔ CHỨC DỰ ÁN.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
