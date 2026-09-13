import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserNotification } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isStaff: boolean;
  savedStoryIds: string[];
  toggleBookmark: (storyId: string) => boolean; // returns true if added, false if removed
  isStoryBookmarked: (storyId: string) => boolean;
  notifications: UserNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole, customName?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
}

const AUTH_STORAGE_KEY = 'lumi_auth_user_v2';
const BOOKMARKS_STORAGE_KEY = 'lumi_bookmarks_v2';
const NOTIFICATIONS_STORAGE_KEY = 'lumi_notifications_v2';

const initialNotifications: UserNotification[] = [
  {
    id: 'notif-1',
    userId: 'super-admin-1',
    type: 'system',
    title: 'Chào mừng bạn đến với LUMI!',
    message: 'Không gian số lan tỏa lòng trắc ẩn: “Nhìn bằng trái tim – Hành động bằng yêu thương”.',
    targetUrl: '/ve-du-an',
    isRead: false,
    createdAt: 'Hôm nay'
  },
  {
    id: 'notif-2',
    userId: 'super-admin-1',
    type: 'new_story',
    title: 'Câu chuyện tử tế mới',
    message: 'LUMI vừa cập nhật câu chuyện đẹp về học sinh nhặt được tài sản trao trả người đánh rơi.',
    targetUrl: '/cau-chuyen',
    isRead: false,
    createdAt: 'Hôm qua'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default: Guest or Default Super Admin for demo
      return {
        id: 'usr-admin-default',
        email: 'lumichamiuthuong@gmail.com',
        displayName: 'Ban Quản Trị LUMI',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Nhìn bằng trái tim – Hành động bằng yêu thương. Cùng nhau lan tỏa điều tử tế.',
        province: 'Hà Nội',
        role: 'SUPER_ADMIN',
        createdAt: '2026-01-01'
      };
    } catch {
      return null;
    }
  });

  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['story-1', 'story-3'];
    } catch {
      return ['story-1', 'story-3'];
    }
  });

  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(savedStoryIds));
  }, [savedStoryIds]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const role: UserRole = user ? user.role : 'GUEST';
  const isLoggedIn = !!user && user.role !== 'GUEST';
  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isAdmin = ['SUPER_ADMIN', 'ADMIN'].includes(role);
  const isStaff = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MODERATOR'].includes(role);

  const toggleBookmark = (storyId: string): boolean => {
    if (!storyId) return false;
    let added = false;
    setSavedStoryIds(prev => {
      if (prev.includes(storyId)) {
        added = false;
        return prev.filter(id => id !== storyId);
      } else {
        added = true;
        return [storyId, ...prev];
      }
    });
    return added;
  };

  const isStoryBookmarked = (storyId: string): boolean => {
    return savedStoryIds.includes(storyId);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const loginWithGoogle = async () => {
    // Simulating OAuth Google Authentication
    const googleUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      email: 'nguyenhuy.thudaumot@gmail.com',
      displayName: 'Nguyễn Huy',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      bio: 'Học sinh THPT yêu thích các hoạt động lan tỏa lòng trắc ẩn và việc tốt học đường.',
      province: 'Bình Dương',
      role: 'MEMBER',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(googleUser);
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string): Promise<boolean> => {
    if (!email) return false;
    const isSpecialAdmin = email.trim().toLowerCase() === 'lumichamiuthuong@gmail.com';
    const newUser: UserProfile = {
      id: `usr-email-${Date.now()}`,
      email: email.trim().toLowerCase(),
      displayName: isSpecialAdmin ? 'Ban Quản Trị LUMI' : email.split('@')[0],
      avatarUrl: isSpecialAdmin 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      bio: isSpecialAdmin ? 'Quản trị viên hệ thống LUMI – Chạm Yêu Thương.' : 'Thành viên cộng đồng LUMI.',
      province: 'Hà Nội',
      role: isSpecialAdmin ? 'SUPER_ADMIN' : 'MEMBER',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const loginAsDemo = (demoRole: UserRole, customName?: string) => {
    const demoProfiles: Record<UserRole, UserProfile> = {
      SUPER_ADMIN: {
        id: 'demo-super-admin',
        email: 'lumichamiuthuong@gmail.com',
        displayName: customName || 'Ban Quản Trị LUMI (Super Admin)',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Quản trị tối cao hệ thống LUMI. Toàn quyền quản lý bài viết, kiểm duyệt, phân quyền và cấu hình website.',
        province: 'Hà Nội',
        role: 'SUPER_ADMIN',
        createdAt: '2026-01-01'
      },
      ADMIN: {
        id: 'demo-admin',
        email: 'admin@lumi.edu.vn',
        displayName: customName || 'Trần Thảo Linh (Admin)',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        bio: 'Quản trị viên nội dung & câu chuyện tử tế.',
        province: 'Đà Nẵng',
        role: 'ADMIN',
        createdAt: '2026-01-10'
      },
      EDITOR: {
        id: 'demo-editor',
        email: 'editor@lumi.edu.vn',
        displayName: customName || 'Hoàng Minh Quân (Biên tập viên)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'Biên tập viên các câu chuyện tử tế và sản phẩm truyền thông.',
        province: 'Hồ Chí Minh',
        role: 'EDITOR',
        createdAt: '2026-02-01'
      },
      MODERATOR: {
        id: 'demo-moderator',
        email: 'moderator@lumi.edu.vn',
        displayName: customName || 'Lê Bảo Châu (Kiểm duyệt viên)',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
        bio: 'Kiểm duyệt viên Hộp thư yêu thương và Câu chuyện bạn gửi.',
        province: 'Thừa Thiên Huế',
        role: 'MODERATOR',
        createdAt: '2026-02-15'
      },
      MEMBER: {
        id: 'demo-member',
        email: 'hocsinh.nguyendu@thpt.edu.vn',
        displayName: customName || 'Nguyễn Minh Anh (Học sinh THPT)',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        bio: 'Học sinh lớp 11 – Yêu thích đọc truyện tử tế và gửi lời yêu thương.',
        province: 'Nghệ An',
        role: 'MEMBER',
        createdAt: '2026-03-01'
      },
      GUEST: {
        id: 'guest',
        displayName: 'Khách vãng lai',
        role: 'GUEST',
        createdAt: new Date().toISOString().split('T')[0]
      }
    };

    setUser(demoProfiles[demoRole]);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsProfileDrawerOpen(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn,
        isAdmin,
        isSuperAdmin,
        isStaff,
        savedStoryIds,
        toggleBookmark,
        isStoryBookmarked,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        loginWithGoogle,
        loginWithEmail,
        loginAsDemo,
        logout,
        updateProfile,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isProfileDrawerOpen,
        openProfileDrawer: () => setIsProfileDrawerOpen(true),
        closeProfileDrawer: () => setIsProfileDrawerOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
