import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDNb_Z90crRIUoNPy_B7IRbs1ur7xphh9w",
  authDomain: "chamyeuthuong-7db8d.firebaseapp.com",
  projectId: "chamyeuthuong-7db8d",
  storageBucket: "chamyeuthuong-7db8d.firebasestorage.app",
  messagingSenderId: "136118859620",
  appId: "1:136118859620:web:2c09bfbed3ff00767fac71",
  measurementId: "G-QF489ZNNNB"
};

// Initialize Firebase App safely (singleton instance)
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);

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
