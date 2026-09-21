import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  setPersistence, 
  browserLocalPersistence, 
  User as FirebaseUser 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App safely (singleton instance)
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore with databaseId from config
export const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Authentication with local persistence for cross-tab & multi-session support
export const auth = getAuth(firebaseApp);
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Firebase setPersistence warning:', err);
  });
}

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firebase Storage
export const storage = getStorage(firebaseApp);

/**
 * Sign in with Google Popup using Firebase Authentication
 */
export async function signInWithFirebaseGoogle(): Promise<{
  firebaseUser: FirebaseUser;
  email: string;
  displayName: string;
  photoURL: string;
}> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return {
      firebaseUser: result.user,
      email: result.user.email || '',
      displayName: result.user.displayName || 'Người dùng LUMI',
      photoURL: result.user.photoURL || ''
    };
  } catch (error: any) {
    console.error('Firebase Google Sign-In Error:', error);
    if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('unauthorized-domain')) {
      error.isUnauthorizedDomain = true;
      error.currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
    }
    throw error;
  }
}

/**
 * Sign out of Firebase Authentication
 */
export async function signOutFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn('Firebase Sign-Out Warning:', error);
  }
}
