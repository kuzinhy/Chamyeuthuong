import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  onSnapshot,
  Timestamp,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Generic CMS Service ---

export const cmsService = {
  // Audit Log
  async logAction(action: string, module: string, documentId: string, description: string) {
    const path = 'auditLogs';
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      const logRef = doc(collection(db, path));
      await setDoc(logRef, {
        uid: user.uid,
        email: user.email,
        action,
        module,
        documentId,
        description,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  },

  // Generic Get All with Pagination
  async getAll<T>(collectionName: string, constraints: QueryConstraint[] = []) {
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as T));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, collectionName);
    }
  },

  // Generic Get One
  async getOne<T>(collectionName: string, id: string) {
    const path = `${collectionName}/${id}`;
    try {
      const docRef = doc(db, collectionName, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as T;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  // Generic Create
  async create<T extends DocumentData>(collectionName: string, data: T, id?: string) {
    try {
      const colRef = collection(db, collectionName);
      const docRef = id ? doc(colRef, id) : doc(colRef);
      const finalData = {
        ...data,
        isDeleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(docRef, finalData);
      
      await this.logAction('CREATE', collectionName, docRef.id, `Created new ${collectionName}`);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, collectionName);
    }
  },

  // Generic Update
  async update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>) {
    const path = `${collectionName}/${id}`;
    try {
      const docRef = doc(db, collectionName, id);
      const finalData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, finalData);
      
      await this.logAction('UPDATE', collectionName, id, `Updated ${collectionName}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Generic Soft Delete
  async softDelete(collectionName: string, id: string) {
    const path = `${collectionName}/${id}`;
    try {
      const user = auth.currentUser;
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        isDeleted: true,
        deletedAt: serverTimestamp(),
        deletedBy: user?.uid || 'unknown',
        updatedAt: serverTimestamp()
      });
      
      await this.logAction('DELETE', collectionName, id, `Soft deleted ${collectionName}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Generic Hard Delete
  async delete(collectionName: string, id: string) {
    const path = `${collectionName}/${id}`;
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      await this.logAction('HARD_DELETE', collectionName, id, `Permanently deleted ${collectionName}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Realtime Listener
  subscribe<T>(collectionName: string, callback: (data: T[]) => void, constraints: QueryConstraint[] = []) {
    const q = query(collection(db, collectionName), ...constraints);
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as T));
      callback(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, collectionName);
    });
  }
};
