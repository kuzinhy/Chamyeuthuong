import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Mail, 
  Search, 
  UserPlus, 
  MoreVertical,
  ShieldCheck,
  UserCheck,
  UserX,
  Clock,
  X
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { UserProfile, UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatFirestoreTimestamp } from '../../utils/dateUtils';
import { useToast } from '../../context/ToastContext';

export const AdminUsersTab: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer');
  const [submittingInvite, setSubmittingInvite] = useState(false);
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await cmsService.getAll<UserProfile>('users');
      setUsers(allUsers || []);
    } catch (error) {
      showToast('Không thể tải danh sách người dùng', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: UserRole) => {
    try {
      await cmsService.update('users', userId, { role: newRole });
      showToast('Cập nhật quyền thành công', 'success');
      loadUsers();
    } catch (error) {
      showToast('Lỗi khi cập nhật quyền', 'error');
    }
  };

  const updateStatus = async (userId: string, status: 'active' | 'suspended') => {
    try {
      await cmsService.update('users', userId, { status });
      showToast('Cập nhật trạng thái thành công', 'success');
      loadUsers();
    } catch (error) {
      showToast('Lỗi khi cập nhật trạng thái', 'error');
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.trim()) {
      showToast('Vui lòng nhập địa chỉ email', 'error');
      return;
    }

    setSubmittingInvite(true);
    try {
      const email = inviteEmail.trim().toLowerCase();
      const mockUid = `usr-${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
      await cmsService.create('users', {
        email,
        displayName: inviteName.trim() || email.split('@')[0],
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        role: inviteRole,
        status: 'active',
        createdAt: new Date().toISOString()
      }, mockUid);

      showToast(`Đã gửi lời mời tới ${email} thành công!`, 'success');
      setIsInviteOpen(false);
      setInviteEmail('');
      setInviteName('');
      setInviteRole('viewer');
      loadUsers();
    } catch (error) {
      showToast('Lỗi khi gửi lời mời', 'error');
    } finally {
      setSubmittingInvite(false);
    }
  };

  const filteredUsers = (users || []).filter(u => 
    u && (
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin': return <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px]">SUPER ADMIN</span>;
      case 'admin': return <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px]">ADMIN</span>;
      case 'editor': return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">EDITOR</span>;
      case 'viewer': return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">VIEWER</span>;
      default: return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý Người dùng & Phân quyền</h2>
          <p className="text-sm text-slate-500">Quản lý tài khoản quản trị viên và phân cấp quyền truy cập hệ thống.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <button 
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-sky-700 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Mời
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Người dùng</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Truy cập cuối</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div></div>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">Không tìm thấy người dùng nào.</td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isMe = !!currentUser?.email && currentUser.email.toLowerCase() === u.email?.toLowerCase();
                return (
                  <tr key={u.id} className={`transition-colors ${isMe ? 'bg-sky-50/40 hover:bg-sky-50/70' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden">
                            {u.avatarUrl ? <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">{u.displayName.charAt(0)}</div>}
                          </div>
                          {isMe && (
                            <span 
                              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.9)] ring-1 ring-emerald-300 animate-pulse" 
                              title="Đang trực tuyến"
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className={`text-sm font-bold ${isMe ? 'text-sky-900 font-extrabold' : 'text-slate-800'}`}>{u.displayName}</p>
                            {isMe && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-sky-200 text-sky-800 uppercase">
                                Bạn
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {u.status === 'active' ? 'HOẠT ĐỘNG' : 'BỊ KHÓA'}
                        </span>
                        {isMe && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Online
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        {isMe ? 'Vừa xong' : formatFirestoreTimestamp(u.lastLoginAt)}
                      </div>
                    </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {currentUser?.role === 'super_admin' && u.id !== currentUser.id && (
                        <>
                          <select 
                            value={u.role}
                            onChange={(e) => updateRole(u.id, e.target.value as UserRole)}
                            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500/20"
                          >
                            <option value="super_admin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                          <button 
                            onClick={() => updateStatus(u.id, u.status === 'active' ? 'suspended' : 'active')}
                            className={`p-1.5 rounded-lg transition-colors ${
                              u.status === 'active' ? 'hover:bg-rose-50 text-rose-500' : 'hover:bg-emerald-50 text-emerald-500'
                            }`}
                            title={u.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                          >
                            {u.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>
      {/* Invite Modal */}
      {isInviteOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsInviteOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Mời thành viên mới</h3>
              </div>
              <button 
                onClick={() => setIsInviteOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ Email <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên hiển thị (Tùy chọn)
                </label>
                <input 
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phân quyền hệ thống
                </label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="viewer">Viewer (Xem & tương tác bài viết)</option>
                  <option value="editor">Editor (Biên tập viên nội dung)</option>
                  <option value="moderator">Moderator (Kiểm duyệt bài gửi & thư)</option>
                  <option value="admin">Admin (Quản trị viên toàn quyền)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Người được mời sẽ có thể truy cập hệ thống ngay lập tức với quyền đã chỉ định.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submittingInvite}
                  className="flex items-center gap-2 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {submittingInvite ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <UserPlus className="w-3.5 h-3.5" />
                  )}
                  <span>Xác nhận mời</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
