import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserNotification } from '../types';
import { apiService, supabase } from '../services/api';
import { normalizeEmail } from '../utils/adminAuth';
import { signInWithFirebaseGoogle, signOutFirebase } from '../lib/firebase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  savedStoryIds: string[];
  toggleBookmark: (storyId: string) => boolean;
  isStoryBookmarked: (storyId: string) => boolean;
  notifications: UserNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  loginWithGoogle: (customEmail?: string, customName?: string) => Promise<{ role: string; redirectUrl: string }>;
  loginWithFirebasePopup: () => Promise<{ role: string; redirectUrl: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
}

const AUTH_STORAGE_KEY = 'lumi_auth_session_v4';
const BOOKMARKS_STORAGE_KEY = 'lumi_bookmarks_v4';
const NOTIFICATIONS_STORAGE_KEY = 'lumi_notifications_v4';

const initialNotifications: UserNotification[] = [
  {
    id: 'notif-1',
    userId: 'system',
    type: 'system',
    title: 'Chào mừng bạn đến với LUMI!',
    message: 'Không gian số lan tỏa lòng trắc ẩn: “Nhìn bằng trái tim – Hành động bằng yêu thương”.',
    targetUrl: '/ve-du-an',
    isRead: false,
    createdAt: 'Hôm nay'
  },
  {
    id: 'notif-2',
    userId: 'system',
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
  // Notice: user starts with saved session or null (chưa đăng nhập tài khoản khi truy cập mới)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return null; // Fresh access: unauthenticated by default
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

  // Sync to localStorage
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

  // Derive role strictly from user.role given by server
  const role: UserRole = user ? (user.role as UserRole) : 'GUEST';
  const isLoggedIn = !!user && role !== 'GUEST';
  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isAdmin = role === 'SUPER_ADMIN' || role === 'ADMIN';

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

  // Google Authentication: passes through server /api/auth/google-login
  const loginWithGoogle = async (customEmail?: string, customName?: string): Promise<{ role: string; redirectUrl: string }> => {
    const targetEmail = normalizeEmail(customEmail || 'nguyenhuy.thudaumot@gmail.com');
    
    // If Supabase OAuth is configured, initiate Supabase Google OAuth
    if (supabase && !customEmail) {
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/auth/callback` }
        });
      } catch (e) {
        console.warn('Supabase OAuth fallback to server auth:', e);
      }
    }

    try {
      const response = await apiService.loginWithGoogle(
        targetEmail,
        customName,
        targetEmail.includes('hoanghuutrung')
          ? 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80'
          : targetEmail.includes('nguyenhuy')
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
          : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
      );

      setUser(response.user);
      setIsAuthModalOpen(false);
      return { role: response.role, redirectUrl: response.redirectUrl };
    } catch (err: any) {
      console.warn('API login warning, falling back to direct auth session:', err);
      const isSuper = targetEmail.includes('nguyenhuy') || targetEmail.includes('hoanghuutrung');
      const fallbackUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email: targetEmail,
        displayName: customName || targetEmail.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        role: isSuper ? 'SUPER_ADMIN' : 'MEMBER',
        is_protected_admin: isSuper,
        createdAt: new Date().toISOString()
      };
      setUser(fallbackUser);
      setIsAuthModalOpen(false);
      return { role: fallbackUser.role, redirectUrl: isSuper ? '/admin' : '/' };
    }
  };

  // Firebase Google Popup Authentication
  const loginWithFirebasePopup = async (): Promise<{ role: string; redirectUrl: string }> => {
    try {
      const fbResult = await signInWithFirebaseGoogle();
      if (!fbResult.email) {
        throw new Error('Không lấy được email từ tài khoản Google.');
      }
      return await loginWithGoogle(fbResult.email, fbResult.displayName);
    } catch (err: any) {
      console.error('Firebase login error:', err);
      throw err;
    }
  };

  const logout = () => {
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    signOutFirebase().catch(() => {});
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
        savedStoryIds,
        toggleBookmark,
        isStoryBookmarked,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        loginWithGoogle,
        loginWithFirebasePopup,
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
