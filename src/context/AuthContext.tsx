import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserNotification } from '../types';
import { 
  onAuthStateChanged, 
  User as FirebaseUser, 
  signInAnonymously,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, signInWithFirebaseGoogle, signOutFirebase } from '../lib/firebase';
import { userService } from '../services/userService';
import { isSuperAdminEmail, normalizeEmail } from '../utils/adminAuth';

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
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!saved) return initialNotifications;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const syncUserProfile = async (firebaseUser: { uid: string; email?: string | null; displayName?: string | null; photoURL?: string | null; isAnonymous?: boolean }): Promise<UserProfile> => {
    let email = normalizeEmail(firebaseUser.email);
    // If email is not in Firebase Auth token (e.g. anonymous sign-in or fallback), check local session
    if (!email && typeof window !== 'undefined') {
      const stored = localStorage.getItem('lumi_auth_email');
      if (stored) {
        email = normalizeEmail(stored);
      }
    }

    const isSuperAdminUser = isSuperAdminEmail(email);

    // 1. Fetch profile by Firebase UID
    let profile = await userService.getProfile(firebaseUser.uid);

    // 2. If not found by UID, check if this email already exists in Firestore
    if (!profile && email) {
      const existingProfile = await userService.getProfileByEmail(email);
      if (existingProfile) {
        profile = await userService.createProfile(firebaseUser.uid, {
          email,
          displayName: firebaseUser.displayName || existingProfile.displayName || email.split('@')[0],
          avatarUrl: firebaseUser.photoURL || existingProfile.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
          role: isSuperAdminUser ? 'super_admin' : (existingProfile.role || 'viewer'),
          status: 'active'
        });
      }
    }

    // 3. If still no profile, create new profile
    if (!profile) {
      if (firebaseUser.isAnonymous && !email) {
        return {
          id: firebaseUser.uid,
          email: '',
          displayName: 'Khách LUMI',
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
          role: 'viewer',
          status: 'active',
          createdAt: new Date().toISOString()
        };
      }

      profile = await userService.createProfile(firebaseUser.uid, {
        email,
        displayName: firebaseUser.displayName || (email ? email.split('@')[0] : 'Người dùng LUMI'),
        avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${email || firebaseUser.uid}`,
        role: isSuperAdminUser ? 'super_admin' : 'viewer',
        status: 'active'
      });
    } else {
      // Ensure super admin accounts always retain super_admin role
      if (isSuperAdminUser && profile.role !== 'super_admin') {
        profile.role = 'super_admin';
        await userService.updateRole(firebaseUser.uid, 'super_admin');
      }
      await userService.updateLastLogin(firebaseUser.uid);
    }

    if (isSuperAdminUser) {
      profile.role = 'super_admin';
    }

    if (typeof window !== 'undefined') {
      if (email) {
        localStorage.setItem('lumi_auth_email', email);
      }
      localStorage.setItem('lumi_auth_profile', JSON.stringify(profile));
    }

    return profile;
  };

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: () => void = () => {};

    const initAuth = async () => {
      try {
        // Enforce browserLocalPersistence to guarantee user login state persists across sessions, tabs, and reloads
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.warn('Failed to set browserLocalPersistence in AuthProvider:', err);
      }

      if (!isMounted) return;

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!isMounted) return;
        setLoading(true);
        if (firebaseUser) {
          try {
            const profile = await syncUserProfile(firebaseUser);
            if (isMounted) setUser(profile);
          } catch (error) {
            console.error('Error syncing user profile:', error);
            if (isMounted) setUser(null);
          }
        } else {
          // Fallback to locally preserved session if available (e.g. cross-tab or fast reload)
          if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('lumi_auth_email');
            const storedProfile = localStorage.getItem('lumi_auth_profile');
            if (storedProfile && storedEmail) {
              try {
                const cached = JSON.parse(storedProfile) as UserProfile;
                if (cached && cached.email) {
                  const clean = normalizeEmail(cached.email);
                  if (isSuperAdminEmail(clean)) {
                    cached.role = 'super_admin';
                  }
                  if (isMounted) setUser(cached);
                } else {
                  if (isMounted) setUser(null);
                }
              } catch {
                if (isMounted) setUser(null);
              }
            } else {
              if (isMounted) setUser(null);
            }
          } else {
            if (isMounted) setUser(null);
          }
        }
        if (isMounted) setLoading(false);
      });
    };

    initAuth();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(savedStoryIds));
  }, [savedStoryIds]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const role: UserRole = user ? user.role : 'GUEST';
  const isLoggedIn = !!user;
  const isSuperAdmin = role === 'super_admin' || (user?.email ? isSuperAdminEmail(user.email) : false);
  const isAdmin = isSuperAdmin || role === 'admin';
  const isEditor = isSuperAdmin || role === 'admin' || role === 'editor';

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
      await setPersistence(auth, browserLocalPersistence);
      const { firebaseUser } = await signInWithFirebaseGoogle();
      setIsAuthModalOpen(false);
      const profile = await syncUserProfile(firebaseUser);
      setUser(profile);
      return profile;
    } catch (err: any) {
      console.error('Firebase login error:', err);
      throw err;
    }
  };

  const loginWithGoogle = async (email?: string): Promise<UserProfile> => {
    if (email && email.trim()) {
      const cleanEmail = normalizeEmail(email);
      const isSuperAdminUser = isSuperAdminEmail(cleanEmail);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumi_auth_email', cleanEmail);
      }
      
      let firebaseUid = '';
      try {
        await setPersistence(auth, browserLocalPersistence);
        if (!auth.currentUser) {
          const credential = await signInAnonymously(auth);
          firebaseUid = credential.user.uid;
        } else {
          firebaseUid = auth.currentUser.uid;
        }
      } catch (authError) {
        console.warn('Firebase signInAnonymously failed (using fallback mock UID):', authError);
        firebaseUid = `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
      }

      let profile = await userService.getProfileByEmail(cleanEmail);

      if (profile) {
        await userService.createProfile(firebaseUid, {
          email: cleanEmail,
          displayName: profile.displayName || cleanEmail.split('@')[0],
          avatarUrl: profile.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
          role: isSuperAdminUser ? 'super_admin' : (profile.role || 'viewer'),
          status: profile.status || 'active'
        });
        profile = await userService.getProfile(firebaseUid);
      } else {
        profile = await userService.createProfile(firebaseUid, {
          email: cleanEmail,
          displayName: cleanEmail.split('@')[0],
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
          role: isSuperAdminUser ? 'super_admin' : 'viewer',
          status: 'active'
        });
      }

      if (profile) {
        if (isSuperAdminUser && profile.role !== 'super_admin') {
          profile.role = 'super_admin';
          await userService.updateRole(firebaseUid, 'super_admin');
        }
        await userService.updateLastLogin(firebaseUid);
      }

      if (isSuperAdminUser && profile) {
        profile.role = 'super_admin';
      }

      if (typeof window !== 'undefined' && profile) {
        localStorage.setItem('lumi_auth_profile', JSON.stringify(profile));
      }

      setUser(profile);
      setIsAuthModalOpen(false);
      return profile!;
    }
    return loginWithFirebasePopup();
  };

  const logout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumi_auth_email');
        localStorage.removeItem('lumi_auth_profile');
      }
      await signOutFirebase();
      setUser(null);
      setIsProfileDrawerOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumi_auth_email');
        localStorage.removeItem('lumi_auth_profile');
      }
      setUser(null);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updates } : null);
    userService.updateLastLogin(user.id); 
  };

  const unreadNotificationCount = (notifications || []).filter(n => n && !n.isRead).length;

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
