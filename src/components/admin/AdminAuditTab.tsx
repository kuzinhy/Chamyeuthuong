import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  History, 
  Search, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { AuditLog } from '../../types';
import { PROTECTED_ADMIN_EMAILS } from '../../utils/adminAuth';
import { PresenceInfo } from '../../services/api';

interface AdminAuditTabProps {
  logs: AuditLog[];
  presences: PresenceInfo[];
  currentUserEmail?: string;
  onRefreshLogs?: () => void;
  isLoading?: boolean;
}

export const AdminAuditTab: React.FC<AdminAuditTabProps> = ({
  logs,
  presences,
  currentUserEmail,
  onRefreshLogs,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.entityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.entityTitle && log.entityTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Authorized Admins Card */}
      <div className="bg-white/80 rounded-2xl border border-sky-100 p-6 shadow-xs backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Danh Sách Quản Trị Viên Được Ủy Quyền (Super Admins)
              </h2>
              <p className="text-xs text-slate-500">
                Chỉ 2 tài khoản được cấp quyền Super Admin tối cao theo quy định bảo mật hệ thống LUMI.
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1.5 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2 Quản trị viên
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {PROTECTED_ADMIN_EMAILS.map((email, idx) => {
            const isMe = currentUserEmail?.toLowerCase() === email.toLowerCase();
            const isOnline = presences.some(p => p.userId?.toLowerCase() === email.toLowerCase());

            return (
              <div 
                key={email}
                className={`p-4 rounded-xl border transition-all ${
                  isMe 
                    ? 'bg-sky-50/70 border-sky-200 ring-1 ring-sky-300/50' 
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        {email.charAt(0).toUpperCase()}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        isOnline ? 'bg-emerald-500 ring-1 ring-emerald-400/50' : 'bg-slate-300'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-slate-800 text-xs">{email}</p>
                        {isMe && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-sky-200 text-sky-800 uppercase">
                            Bạn
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {idx === 0 ? 'Ban Chỉ Đạo Chiến Dịch LUMI' : 'Ban Cố Vấn Nghiên Cứu Khoa Học'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                    SUPER ADMIN
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Quyền tối cao: Đăng, sửa, xóa, quản lý
                  </span>
                  <span className={isOnline ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                    {isOnline ? '● Đang trực tuyến' : 'Ngoại tuyến'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-sky-600" />
              <span>Nhật Ký Thao Tác Hệ Thống (Audit Trail)</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ghi lại mọi hoạt động thêm, sửa, xóa và phê duyệt theo thời gian thực
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Lọc thao tác..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>

            {onRefreshLogs && (
              <button
                onClick={onRefreshLogs}
                disabled={isLoading}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
                title="Làm mới nhật ký"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2.5">Thời gian</th>
                <th className="px-3 py-2.5">Người thực hiện</th>
                <th className="px-3 py-2.5">Hành động</th>
                <th className="px-3 py-2.5">Đối tượng</th>
                <th className="px-3 py-2.5">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    Không có nhật ký nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, 50).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="px-3 py-2 font-bold text-slate-700">
                      {log.userName}
                    </td>
                    <td className="px-3 py-2 font-medium">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.action.includes('Xóa')
                          ? 'bg-rose-100 text-rose-700'
                          : log.action.includes('Thêm')
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-sky-100 text-sky-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-600 font-medium">
                      {log.entityType}: <strong className="text-slate-800">{log.entityTitle}</strong>
                    </td>
                    <td className="px-3 py-2 text-slate-400 text-[11px] max-w-xs truncate">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
