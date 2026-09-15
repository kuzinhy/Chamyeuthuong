import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserNotification } from '../types';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, signInWithFirebaseGoogle, signOutFirebase } from '../lib/firebase';
import { userService } from '../services/userService';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  loading: boolean;
  savedStoryIds: string[];
  toggleBookmark: (storyId: string) => boolean;
  isStoryBookmarked: (storyId: string) => boolean;
  notifications: UserNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  loginWithFirebasePopup: () => Promise<UserProfile>;
  loginWithGoogle: (email?: string) => Promise<UserProfile>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isProfileDrawerOpen: boolean;
  profileDrawerTab: 'bookmarks' | 'submissions' | 'letters' | 'notifications';
  setProfileDrawerTab: (tab: 'bookmarks' | 'submissions' | 'letters' | 'notifications') => void;
  openProfileDrawer: (initialTab?: 'bookmarks' | 'submissions' | 'letters' | 'notifications') => void;
  closeProfileDrawer: () => void;
}

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
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [profileDrawerTab, setProfileDrawerTab] = useState<'bookmarks' | 'submissions' | 'letters' | 'notifications'>('bookmarks');

  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          // Fetch or create profile
          let profile = await userService.getProfile(firebaseUser.uid);
          
          if (!profile) {
            // Check if this is the bootstrapped admin email
            const isBootstrappedAdmin = firebaseUser.email === 'nguyenhuy.thudaumot@gmail.com';
            
            profile = await userService.createProfile(firebaseUser.uid, {
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Người dùng LUMI',
              avatarUrl: firebaseUser.photoURL || '',
              role: isBootstrappedAdmin ? 'super_admin' : 'viewer',
              status: 'active'
            });
          } else {
            await userService.updateLastLogin(firebaseUser.uid);
          }
          
          setUser(profile);
        } catch (error) {
          console.error('Error syncing user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(savedStoryIds));
  }, [savedStoryIds]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const role: UserRole = user ? user.role : 'GUEST';
  const isLoggedIn = !!user;
  const isSuperAdmin = role === 'super_admin';
  const isAdmin = role === 'super_admin' || role === 'admin';
  const isEditor = role === 'super_admin' || role === 'admin' || role === 'editor';

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

  const loginWithFirebasePopup = async (): Promise<UserProfile> => {
    try {
      const { firebaseUser } = await signInWithFirebaseGoogle();
      setIsAuthModalOpen(false);

      // Immediately fetch or create profile so we can return it to the caller
      let profile = await userService.getProfile(firebaseUser.uid);
      
      if (!profile) {
        const isBootstrappedAdmin = firebaseUser.email === 'nguyenhuy.thudaumot@gmail.com';
        profile = await userService.createProfile(firebaseUser.uid, {
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Người dùng LUMI',
          avatarUrl: firebaseUser.photoURL || '',
          role: isBootstrappedAdmin ? 'super_admin' : 'viewer',
          status: 'active'
        });
      }
      
      return profile;
    } catch (err: any) {
      console.error('Firebase login error:', err);
      throw err;
    }
  };

  const loginWithGoogle = async (email?: string): Promise<UserProfile> => {
    if (email && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      const mockUid = `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
      let profile = await userService.getProfile(mockUid);
      if (!profile) {
        const isBootstrappedAdmin = cleanEmail === 'nguyenhuy.thudaumot@gmail.com';
        profile = await userService.createProfile(mockUid, {
          email: cleanEmail,
          displayName: cleanEmail.split('@')[0],
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
          role: isBootstrappedAdmin ? 'super_admin' : 'viewer',
          status: 'active'
        });
      } else {
        await userService.updateLastLogin(mockUid);
      }
      setUser(profile);
      setIsAuthModalOpen(false);
      return profile;
    }
    return loginWithFirebasePopup();
  };

  const logout = async () => {
    try {
      await signOutFirebase();
      setUser(null);
      setIsProfileDrawerOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updates } : null);
    userService.updateLastLogin(user.id); 
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
        isEditor,
        loading,
        savedStoryIds,
        toggleBookmark,
        isStoryBookmarked,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        loginWithFirebasePopup,
        loginWithGoogle,
        logout,
        updateProfile,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isProfileDrawerOpen,
        profileDrawerTab,
        setProfileDrawerTab,
        openProfileDrawer: (initialTab?: 'bookmarks' | 'submissions' | 'letters' | 'notifications') => {
          if (initialTab) {
            setProfileDrawerTab(initialTab);
          }
          setIsProfileDrawerOpen(true);
        },
        closeProfileDrawer: () => setIsProfileDrawerOpen(false),
      }}
    >
      {!loading && children}
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
