import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  async createProfile(uid: string, data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const docRef = doc(db, 'users', uid);
      const profile: UserProfile = {
        id: uid,
        email: data.email || '',
        displayName: data.displayName || '',
        avatarUrl: data.avatarUrl || '',
        role: data.role || 'viewer', // Default role
        status: 'active',
        createdAt: new Date().toISOString(),
        ...data
      };
      
      await setDoc(docRef, {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
      
      return profile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async updateLastLogin(uid: string) {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }
};
