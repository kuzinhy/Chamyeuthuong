import React from 'react';
import { ShieldAlert, ArrowLeft, Home, LogIn } from 'lucide-react';
import { LumiMascot } from '../components/LumiMascot';
import { ActiveNavPage } from '../types';
import { useAuth } from '../context/AuthContext';

interface Forbidden403PageProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const Forbidden403Page: React.FC<Forbidden403PageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[calc(100vh-144px)] flex items-center justify-center p-4 sm:p-6 bg-[#F8FAFC]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
          Truy cập bị từ chối (403)
        </h1>

        <p className="text-sm font-semibold text-[#DC2626] mb-3">
          Tài khoản của bạn không có quyền truy cập khu vực quản trị.
        </p>

        <p className="text-xs text-[#64748B] leading-relaxed mb-6">
          Khu vực quản trị chỉ dành riêng cho hai tài khoản Super Admin chính thức của dự án LUMI. Nếu bạn là học sinh hoặc thành viên, mời bạn quay lại trang chủ để khám phá những câu chuyện tử tế!
        </p>

        <div className="my-6">
          <LumiMascot state="notification" size={130} />
        </div>

        {user && (
          <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-[#475569] mb-6">
            Đang đăng nhập bằng: <span className="font-mono font-medium text-[#0F172A]">{user.email}</span>
            <div className="text-[11px] text-[#64748B] mt-0.5">Vai trò: <span className="font-semibold text-slate-700">{user.role}</span></div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            Về Trang Chủ
          </button>
          <button
            onClick={() => {
              logout();
              onNavigate('dang-nhap');
            }}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogIn className="w-4 h-4" />
            Đổi Tài Khoản
          </button>
        </div>
      </div>
    </div>
  );
};
