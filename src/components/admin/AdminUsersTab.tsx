import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Mail, 
  Search, 
  UserPlus, 
  ShieldCheck,
  UserCheck,
  UserX,
  Clock,
  Trash2,
  AlertTriangle,
  X,
  CheckCircle2,
  Filter,
  RefreshCw
} from 'lucide-react';
import { storage } from '../../services/storage';
import { UserProfile, UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatFirestoreTimestamp } from '../../utils/dateUtils';
import { useToast } from '../../context/ToastContext';

export const AdminUsersTab: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'admin' | 'member'>('all');
  
  // Modals
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer');
  const [submittingInvite, setSubmittingInvite] = useState(false);
  
  // Delete modal
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserProfile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await storage.getUsers();
      setUsers(allUsers || []);
    } catch (error) {
      showToast('Không thể tải danh sách người dùng', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: UserRole) => {
    try {
      await storage.updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      showToast('Cập nhật quyền thành công', 'success');
    } catch (error) {
      showToast('Lỗi khi cập nhật quyền', 'error');
    }
  };

  const handleToggleStatus = async (user: UserProfile) => {
    const isMe = !!currentUser?.email && currentUser.email.toLowerCase() === user.email?.toLowerCase();
    if (isMe) {
      showToast('Bạn không thể tự khóa tài khoản của chính mình!', 'error');
      return;
    }
    const newStatus: 'active' | 'suspended' = user.status === 'active' ? 'suspended' : 'active';
    try {
      await storage.updateUserStatus(user.id, newStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      showToast(
        newStatus === 'active' 
          ? `Đã kích hoạt tài khoản "${user.displayName || user.email}" thành công!` 
          : `Đã khóa tài khoản "${user.displayName || user.email}"!`, 
        'success'
      );
    } catch (error) {
      showToast('Lỗi khi thay đổi trạng thái tài khoản', 'error');
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;
    const isMe = !!currentUser?.email && currentUser.email.toLowerCase() === deleteConfirmUser.email?.toLowerCase();
    if (isMe) {
      showToast('Bạn không thể tự xóa tài khoản của chính mình!', 'error');
      setDeleteConfirmUser(null);
      return;
    }

    setDeleting(true);
    try {
      await storage.deleteUser(deleteConfirmUser.id);
      setUsers(prev => prev.filter(u => u.id !== deleteConfirmUser.id));
      showToast(`Đã xóa thành viên "${deleteConfirmUser.displayName || deleteConfirmUser.email}" thành công!`, 'success');
      setDeleteConfirmUser(null);
    } catch (error) {
      showToast('Lỗi khi xóa thành viên', 'error');
    } finally {
      setDeleting(false);
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
      const newUser: UserProfile = {
        id: mockUid,
        email,
        displayName: inviteName.trim() || email.split('@')[0],
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        role: inviteRole,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      await storage.addUser(newUser);
      setUsers(prev => [newUser, ...prev.filter(u => u.email.toLowerCase() !== email)]);

      showToast(`Đã thêm thành viên ${email} thành công!`, 'success');
      setIsInviteOpen(false);
      setInviteEmail('');
      setInviteName('');
      setInviteRole('viewer');
    } catch (error) {
      showToast('Lỗi khi thêm thành viên', 'error');
    } finally {
      setSubmittingInvite(false);
    }
  };

  const filteredUsers = (users || []).filter(u => {
    if (!u) return false;
    const matchesSearch = (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'active') return u.status === 'active';
    if (statusFilter === 'suspended') return u.status === 'suspended';
    if (statusFilter === 'admin') return u.role === 'admin' || u.role === 'super_admin';
    if (statusFilter === 'member') return u.role === 'viewer' || u.role === 'editor';
    return true;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin': return <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px]">SUPER ADMIN</span>;
      case 'admin': return <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px]">ADMIN</span>;
      case 'editor': return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">EDITOR</span>;
      case 'viewer': return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">THÀNH VIÊN</span>;
      default: return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">{role}</span>;
    }
  };

  const isManager = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl border border-sky-100 shadow-xs backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-600" />
            <span>Quản Lý Thành Viên & Người Dùng</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
              {users.length} tài khoản
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Xem danh sách, phân quyền quản trị, kích hoạt hoặc khóa và xóa tài khoản thành viên trong hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={loadUsers}
            title="Làm mới danh sách"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Thành Viên</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status / Role Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto w-full md:w-auto text-xs font-semibold text-slate-600">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'all' ? 'bg-white text-sky-700 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Tất cả ({users.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'active' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Đang hoạt động ({users.filter(u => u.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('suspended')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'suspended' ? 'bg-white text-rose-700 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Bị khóa ({users.filter(u => u.status === 'suspended').length})
          </button>
          <button
            onClick={() => setStatusFilter('admin')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'admin' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Quản trị ({users.filter(u => u.role === 'admin' || u.role === 'super_admin').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Tìm theo tên, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Thành viên</th>
                <th className="px-5 py-3.5">Vai trò</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5">Đăng nhập cuối</th>
                <th className="px-5 py-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex justify-center items-center gap-2 text-slate-500">
                      <RefreshCw className="w-5 h-5 text-sky-600 animate-spin" />
                      <span>Đang tải danh sách thành viên...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    Không tìm thấy thành viên nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isMe = !!currentUser?.email && currentUser.email.toLowerCase() === u.email?.toLowerCase();
                  const isSuperAdmin = u.role === 'super_admin' || u.is_protected_admin;
                  const canManageThisUser = isManager && (!isSuperAdmin || currentUser?.role === 'super_admin');

                  return (
                    <tr key={u.id} className={`transition-colors ${isMe ? 'bg-sky-50/40 hover:bg-sky-50/70' : 'hover:bg-slate-50/60'}`}>
                      {/* User Info */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden shadow-xs">
                              {u.avatarUrl ? (
                                <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs bg-slate-100">
                                  {(u.displayName || u.email).charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            {isMe && (
                              <span 
                                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" 
                                title="Bạn đang trực tuyến"
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className={`font-bold ${isMe ? 'text-sky-900 font-extrabold' : 'text-slate-800'}`}>
                                {u.displayName || 'Chưa đặt tên'}
                              </p>
                              {isMe && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-sky-200 text-sky-800 uppercase">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-3.5">
                        {canManageThisUser && !isMe ? (
                          <select 
                            value={u.role}
                            onChange={(e) => updateRole(u.id, e.target.value as UserRole)}
                            className="text-xs font-semibold bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer"
                          >
                            <option value="super_admin">Super Admin</option>
                            <option value="admin">Admin (Toàn quyền)</option>
                            <option value="editor">Editor (Biên tập)</option>
                            <option value="viewer">Viewer (Thành viên)</option>
                          </select>
                        ) : (
                          getRoleBadge(u.role)
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            u.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {u.status === 'active' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>HOẠT ĐỘNG</span>
                              </>
                            ) : (
                              <>
                                <UserX className="w-3 h-3" />
                                <span>BỊ KHÓA</span>
                              </>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Last login */}
                      <td className="px-5 py-3.5 text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{isMe ? 'Vừa xong' : formatFirestoreTimestamp(u.lastLoginAt || u.createdAt)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {canManageThisUser && !isMe && (
                            <>
                              {/* Activate / Suspend Button */}
                              <button 
                                onClick={() => handleToggleStatus(u)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  u.status === 'active' 
                                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200' 
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}
                                title={u.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                              >
                                {u.status === 'active' ? (
                                  <>
                                    <UserX className="w-3.5 h-3.5" />
                                    <span>Khóa</span>
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="w-3.5 h-3.5" />
                                    <span>Kích hoạt</span>
                                  </>
                                )}
                              </button>

                              {/* Delete Button */}
                              <button 
                                onClick={() => setDeleteConfirmUser(u)}
                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                                title="Xóa thành viên"
                              >
                                <Trash2 className="w-4 h-4" />
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
      </div>

      {/* Delete User Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">Xóa thành viên này?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tài khoản <span className="font-bold text-slate-800">"{deleteConfirmUser.displayName || deleteConfirmUser.email}"</span> ({deleteConfirmUser.email}) sẽ bị xóa hoàn toàn khỏi cơ sở dữ liệu.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                disabled={deleting}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={deleting}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm shadow-rose-600/30 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {deleting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite / Add Modal */}
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
                <h3 className="text-base font-bold text-slate-800">Thêm thành viên mới</h3>
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phân quyền hệ thống
                </label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-semibold"
                >
                  <option value="viewer">Viewer (Thành viên - Xem và tương tác)</option>
                  <option value="editor">Editor (Biên tập viên nội dung)</option>
                  <option value="admin">Admin (Quản trị viên toàn quyền)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Thành viên sẽ được kích hoạt ngay lập tức và có thể đăng nhập vào hệ thống.
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
                  <span>Xác nhận thêm</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

