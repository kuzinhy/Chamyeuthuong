import { 
  Story, 
  Letter, 
  PhotovoiceItem, 
  SurveySubmission, 
  GalleryMediaItem, 
  MediaAsset,
  StorySubmission,
  AuditLog,
  SiteSettings,
  SongInfo,
  KindnessPoint,
  ResearchItem,
  UserProfile
} from '../types';
import { cmsService } from './cmsService';
import { where, orderBy, limit } from 'firebase/firestore';
import {
  INITIAL_STORIES,
  INITIAL_GALLERY,
  INITIAL_PHOTOVOICE,
  INITIAL_LETTERS,
  INITIAL_SONGS,
  INITIAL_MAP_POINTS,
  INITIAL_RESEARCH,
  INITIAL_SETTINGS,
  INITIAL_SUBMISSIONS
} from '../data/initialData';

// --- Local Storage Cache Helpers ---
function getLocalCache<T>(key: string): T[] | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLocalCache<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to write local cache:', e);
  }
}

/**
 * Combines Firestore documents with initial data.
 * - If an item was updated in Firestore, the Firestore version overrides the initial version.
 * - If an item was marked as deleted (isDeleted: true), it is excluded completely.
 * - Any initial items that haven't been touched or deleted remain visible.
 * - Any newly created Firestore items are included.
 */
function combineWithInitial<T extends { id: string; isDeleted?: boolean }>(
  firestoreItems: T[],
  initialItems: T[]
): T[] {
  const validFirestore = (firestoreItems || []).filter(item => !item.isDeleted);
  const deletedIds = new Set((firestoreItems || []).filter(item => item.isDeleted).map(item => item.id));
  const firestoreMap = new Map(validFirestore.map(item => [item.id, item]));

  const result: T[] = [...validFirestore];
  for (const initItem of initialItems) {
    if (!firestoreMap.has(initItem.id) && !deletedIds.has(initItem.id)) {
      result.push(initItem);
    }
  }
  return result;
}

export const storage = {
  // --- Stories / Posts ---
  async getStories(): Promise<Story[]> {
    const CACHE_KEY = 'lumi_cms_stories_v3';
    try {
      const stories = await cmsService.getAll<Story>('posts');
      const combined = combineWithInitial(stories || [], INITIAL_STORIES);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<Story>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_STORIES;
    }
  },

  async saveStory(story: Story): Promise<void> {
    const CACHE_KEY = 'lumi_cms_stories_v3';
    const id = story.id && !story.id.startsWith('temp-') ? story.id : `story-${Date.now()}`;
    const storyToSave = { ...story, id };
    
    // Update local cache immediately so changes are never lost
    const current = await this.getStories();
    const updated = [storyToSave, ...current.filter(s => s.id !== id)];
    setLocalCache(CACHE_KEY, updated);

    // Persist to Firestore
    try {
      const { id: _, ...data } = storyToSave;
      await cmsService.create('posts', data as any, id);
    } catch (e) {
      console.warn('saveStory firestore sync warning (persisted in local cache):', e);
    }
  },

  async deleteStory(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_stories_v3';
    const current = await this.getStories();
    setLocalCache(CACHE_KEY, current.filter(s => s.id !== id));
    try {
      await cmsService.softDelete('posts', id);
    } catch (e) {
      console.warn('deleteStory firestore warning:', e);
    }
  },

  async toggleStoryFeature(id: string): Promise<void> {
    const current = await this.getStories();
    const story = current.find(s => s.id === id);
    if (story) {
      await this.saveStory({ ...story, featured: !story.featured });
    }
  },

  // --- Submissions ---
  async getSubmissions(): Promise<StorySubmission[]> {
    const CACHE_KEY = 'lumi_cms_submissions_v3';
    try {
      const subs = await cmsService.getAll<StorySubmission>('submissions');
      const combined = combineWithInitial(subs || [], INITIAL_SUBMISSIONS);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<StorySubmission>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_SUBMISSIONS;
    }
  },

  async addSubmission(submission: StorySubmission): Promise<void> {
    const CACHE_KEY = 'lumi_cms_submissions_v3';
    const id = submission.id || `sub-${Date.now()}`;
    const newSub = { ...submission, id };
    const current = await this.getSubmissions();
    setLocalCache(CACHE_KEY, [newSub, ...current.filter(s => s.id !== id)]);

    try {
      const { id: _, ...data } = newSub;
      await cmsService.create('submissions', data as any, id);
    } catch (e) {
      console.warn('addSubmission firestore warning:', e);
    }
  },

  async updateSubmissionStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    const CACHE_KEY = 'lumi_cms_submissions_v3';
    const current = await this.getSubmissions();
    const existing = current.find(s => s.id === id) || INITIAL_SUBMISSIONS.find(s => s.id === id) || {};
    const updatedSub = { ...existing, status, id } as StorySubmission;

    const updated = current.map(s => s.id === id ? updatedSub : s);
    if (!current.some(s => s.id === id)) updated.unshift(updatedSub);
    setLocalCache(CACHE_KEY, updated);

    try {
      const { id: _, ...data } = updatedSub;
      await cmsService.create('submissions', data as any, id);
    } catch (e) {
      console.warn('updateSubmissionStatus firestore warning:', e);
    }
  },

  // --- Letters ---
  async getLetters(): Promise<Letter[]> {
    const CACHE_KEY = 'lumi_cms_letters_v3';
    try {
      const letters = await cmsService.getAll<Letter>('letters');
      const combined = combineWithInitial(letters || [], INITIAL_LETTERS);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<Letter>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_LETTERS;
    }
  },

  async addLetter(letter: Letter): Promise<void> {
    const CACHE_KEY = 'lumi_cms_letters_v3';
    const id = letter.id || `letter-${Date.now()}`;
    const newLetter = { ...letter, id };
    const current = await this.getLetters();
    setLocalCache(CACHE_KEY, [newLetter, ...current.filter(l => l.id !== id)]);

    try {
      const { id: _, ...data } = newLetter;
      await cmsService.create('letters', data as any, id);
    } catch (e) {
      console.warn('addLetter firestore warning:', e);
    }
  },

  async updateLetterStatus(id: string, status: 'approved' | 'rejected' | 'pending', reply?: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_letters_v3';
    const current = await this.getLetters();
    const existing = current.find(l => l.id === id) || INITIAL_LETTERS.find(l => l.id === id) || {};
    const updatedLetter = { ...existing, status, replyFromLumi: reply, id } as Letter;

    const updated = current.map(l => l.id === id ? updatedLetter : l);
    if (!current.some(l => l.id === id)) updated.unshift(updatedLetter);
    setLocalCache(CACHE_KEY, updated);

    try {
      const { id: _, ...data } = updatedLetter;
      await cmsService.create('letters', data as any, id);
    } catch (e) {
      console.warn('updateLetterStatus firestore warning:', e);
    }
  },

  async deleteLetter(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_letters_v3';
    const current = await this.getLetters();
    setLocalCache(CACHE_KEY, current.filter(l => l.id !== id));
    try {
      await cmsService.softDelete('letters', id);
    } catch (e) {
      console.warn('deleteLetter firestore warning:', e);
    }
  },

  // --- Photovoice ---
  async getPhotovoice(): Promise<PhotovoiceItem[]> {
    const CACHE_KEY = 'lumi_cms_photovoice_v3';
    try {
      const items = await cmsService.getAll<PhotovoiceItem>('photovoice');
      const combined = combineWithInitial(items || [], INITIAL_PHOTOVOICE);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<PhotovoiceItem>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_PHOTOVOICE;
    }
  },

  async addPhotovoice(item: PhotovoiceItem): Promise<void> {
    const CACHE_KEY = 'lumi_cms_photovoice_v3';
    const id = item.id || `pv-${Date.now()}`;
    const newItem = { ...item, id };
    const current = await this.getPhotovoice();
    setLocalCache(CACHE_KEY, [newItem, ...current.filter(p => p.id !== id)]);

    try {
      const { id: _, ...data } = newItem;
      await cmsService.create('photovoice', data as any, id);
    } catch (e) {
      console.warn('addPhotovoice firestore warning:', e);
    }
  },

  async updatePhotovoiceStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    const CACHE_KEY = 'lumi_cms_photovoice_v3';
    const current = await this.getPhotovoice();
    const existing = current.find(p => p.id === id) || INITIAL_PHOTOVOICE.find(p => p.id === id) || {};
    const updated = { ...existing, status, id } as PhotovoiceItem;

    const updatedList = current.map(p => p.id === id ? updated : p);
    if (!current.some(p => p.id === id)) updatedList.unshift(updated);
    setLocalCache(CACHE_KEY, updatedList);

    try {
      const { id: _, ...data } = updated;
      await cmsService.create('photovoice', data as any, id);
    } catch (e) {
      console.warn('updatePhotovoiceStatus firestore warning:', e);
    }
  },

  async deletePhotovoice(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_photovoice_v3';
    const current = await this.getPhotovoice();
    setLocalCache(CACHE_KEY, current.filter(p => p.id !== id));
    try {
      await cmsService.softDelete('photovoice', id);
    } catch (e) {
      console.warn('deletePhotovoice firestore warning:', e);
    }
  },

  // --- Gallery ---
  async getGallery(): Promise<GalleryMediaItem[]> {
    const CACHE_KEY = 'lumi_cms_gallery_v3';
    try {
      const items = await cmsService.getAll<GalleryMediaItem>('gallery');
      const combined = combineWithInitial(items || [], INITIAL_GALLERY);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch (e) {
      console.warn('getGallery firestore error, falling back to cache:', e);
      const cached = getLocalCache<GalleryMediaItem>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_GALLERY;
    }
  },

  async addGalleryItem(item: GalleryMediaItem): Promise<void> {
    const CACHE_KEY = 'lumi_cms_gallery_v3';
    const id = item.id || `gallery-${Date.now()}`;
    const newItem: GalleryMediaItem = {
      ...item,
      id,
      date: item.date || new Date().toLocaleDateString('vi-VN'),
      likes: item.likes || 0
    };

    // Update local cache immediately
    const current = await this.getGallery();
    const updated = [newItem, ...current.filter(c => c.id !== id)];
    setLocalCache(CACHE_KEY, updated);

    // Save to Firestore with setDoc
    try {
      const { id: _, ...data } = newItem;
      await cmsService.create('gallery', data as any, id);
    } catch (e) {
      console.warn('addGalleryItem firestore warning (saved in local cache):', e);
    }
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryMediaItem>): Promise<void> {
    const CACHE_KEY = 'lumi_cms_gallery_v3';
    const current = await this.getGallery();
    const existing = current.find(c => c.id === id) || INITIAL_GALLERY.find(g => g.id === id) || {};
    const mergedItem: GalleryMediaItem = {
      ...existing,
      ...updates,
      id
    } as GalleryMediaItem;

    // Update local cache immediately
    const updated = current.map(c => c.id === id ? mergedItem : c);
    if (!current.some(c => c.id === id)) {
      updated.unshift(mergedItem);
    }
    setLocalCache(CACHE_KEY, updated);

    // Save to Firestore with setDoc merge
    try {
      const { id: _, ...data } = mergedItem;
      await cmsService.create('gallery', data as any, id);
    } catch (e) {
      console.warn('updateGalleryItem firestore warning (saved in local cache):', e);
    }
  },

  async deleteGalleryItem(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_gallery_v3';
    const current = await this.getGallery();
    const updated = current.filter(c => c.id !== id);
    setLocalCache(CACHE_KEY, updated);

    try {
      await cmsService.softDelete('gallery', id);
    } catch (e) {
      console.warn('deleteGalleryItem firestore warning:', e);
    }
  },

  // --- Surveys ---
  async getSurveys(): Promise<SurveySubmission[]> {
    try {
      const surveys = await cmsService.getAll<SurveySubmission>('surveys', [orderBy('submittedAt', 'desc')]);
      return surveys || [];
    } catch {
      return [];
    }
  },

  async addSurvey(survey: SurveySubmission): Promise<void> {
    try {
      const { id, ...data } = survey;
      await cmsService.create('surveys', data as any);
    } catch (e) {
      console.warn('addSurvey fallback error:', e);
    }
  },

  // --- Music ---
  async getMusic(): Promise<SongInfo[]> {
    const CACHE_KEY = 'lumi_cms_music_v3';
    try {
      const items = await cmsService.getAll<SongInfo>('music');
      const combined = combineWithInitial(items || [], INITIAL_SONGS);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<SongInfo>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_SONGS;
    }
  },

  async addSong(song: SongInfo): Promise<void> {
    const CACHE_KEY = 'lumi_cms_music_v3';
    const id = song.id || `song-${Date.now()}`;
    const newSong = { ...song, id };
    const current = await this.getMusic();
    setLocalCache(CACHE_KEY, [newSong, ...current.filter(s => s.id !== id)]);

    try {
      const { id: _, ...data } = newSong;
      await cmsService.create('music', data as any, id);
    } catch (e) {
      console.warn('addSong firestore warning:', e);
    }
  },

  async updateMusic(id: string, updates: Partial<SongInfo>): Promise<void> {
    const CACHE_KEY = 'lumi_cms_music_v3';
    const current = await this.getMusic();
    const existing = current.find(s => s.id === id) || INITIAL_SONGS.find(s => s.id === id) || {};
    const merged = { ...existing, ...updates, id } as SongInfo;

    const updated = current.map(s => s.id === id ? merged : s);
    if (!current.some(s => s.id === id)) updated.unshift(merged);
    setLocalCache(CACHE_KEY, updated);

    try {
      const { id: _, ...data } = merged;
      await cmsService.create('music', data as any, id);
    } catch (e) {
      console.warn('updateMusic firestore warning:', e);
    }
  },

  async deleteMusic(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_music_v3';
    const current = await this.getMusic();
    setLocalCache(CACHE_KEY, current.filter(s => s.id !== id));
    try {
      await cmsService.softDelete('music', id);
    } catch (e) {
      console.warn('deleteMusic firestore warning:', e);
    }
  },

  // --- Map Points ---
  async getMapPoints(): Promise<KindnessPoint[]> {
    const CACHE_KEY = 'lumi_cms_map_points_v3';
    try {
      const points = await cmsService.getAll<KindnessPoint>('mapPoints');
      const combined = combineWithInitial(points || [], INITIAL_MAP_POINTS);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<KindnessPoint>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_MAP_POINTS;
    }
  },

  async addMapPoint(point: KindnessPoint): Promise<void> {
    const CACHE_KEY = 'lumi_cms_map_points_v3';
    const id = point.id || `point-${Date.now()}`;
    const newPoint = { ...point, id };
    const current = await this.getMapPoints();
    setLocalCache(CACHE_KEY, [newPoint, ...current.filter(p => p.id !== id)]);

    try {
      const { id: _, ...data } = newPoint;
      await cmsService.create('mapPoints', data as any, id);
    } catch (e) {
      console.warn('addMapPoint firestore warning:', e);
    }
  },

  async updateMapPoint(id: string, updates: Partial<KindnessPoint>): Promise<void> {
    const CACHE_KEY = 'lumi_cms_map_points_v3';
    const current = await this.getMapPoints();
    const existing = current.find(p => p.id === id) || INITIAL_MAP_POINTS.find(p => p.id === id) || {};
    const merged = { ...existing, ...updates, id } as KindnessPoint;

    const updated = current.map(p => p.id === id ? merged : p);
    if (!current.some(p => p.id === id)) updated.unshift(merged);
    setLocalCache(CACHE_KEY, updated);

    try {
      const { id: _, ...data } = merged;
      await cmsService.create('mapPoints', data as any, id);
    } catch (e) {
      console.warn('updateMapPoint firestore warning:', e);
    }
  },

  async deleteMapPoint(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_map_points_v3';
    const current = await this.getMapPoints();
    setLocalCache(CACHE_KEY, current.filter(p => p.id !== id));
    try {
      await cmsService.softDelete('mapPoints', id);
    } catch (e) {
      console.warn('deleteMapPoint firestore warning:', e);
    }
  },

  // --- Research ---
  async getResearch(): Promise<ResearchItem[]> {
    const CACHE_KEY = 'lumi_cms_research_v3';
    try {
      const items = await cmsService.getAll<ResearchItem>('research');
      const combined = combineWithInitial(items || [], INITIAL_RESEARCH);
      setLocalCache(CACHE_KEY, combined);
      return combined;
    } catch {
      const cached = getLocalCache<ResearchItem>(CACHE_KEY);
      return cached && cached.length > 0 ? cached : INITIAL_RESEARCH;
    }
  },

  async addResearchItem(item: ResearchItem): Promise<void> {
    const CACHE_KEY = 'lumi_cms_research_v3';
    const id = item.id || `res-${Date.now()}`;
    const newItem = { ...item, id };
    const current = await this.getResearch();
    setLocalCache(CACHE_KEY, [newItem, ...current.filter(r => r.id !== id)]);

    try {
      const { id: _, ...data } = newItem;
      await cmsService.create('research', data as any, id);
    } catch (e) {
      console.warn('addResearchItem firestore warning:', e);
    }
  },

  async updateResearchItem(id: string, updates: Partial<ResearchItem>): Promise<void> {
    const CACHE_KEY = 'lumi_cms_research_v3';
    const current = await this.getResearch();
    const existing = current.find(r => r.id === id) || INITIAL_RESEARCH.find(r => r.id === id) || {};
    const merged = { ...existing, ...updates, id } as ResearchItem;

    const updated = current.map(r => r.id === id ? merged : r);
    if (!current.some(r => r.id === id)) updated.unshift(merged);
    setLocalCache(CACHE_KEY, updated);

    try {
      const { id: _, ...data } = merged;
      await cmsService.create('research', data as any, id);
    } catch (e) {
      console.warn('updateResearchItem firestore warning:', e);
    }
  },

  async deleteResearchItem(id: string): Promise<void> {
    const CACHE_KEY = 'lumi_cms_research_v3';
    const current = await this.getResearch();
    setLocalCache(CACHE_KEY, current.filter(r => r.id !== id));
    try {
      await cmsService.softDelete('research', id);
    } catch (e) {
      console.warn('deleteResearchItem firestore warning:', e);
    }
  },

  // --- Users ---
  async getUsers(): Promise<UserProfile[]> {
    try {
      const users = await cmsService.getAll<UserProfile>('users');
      return users || [];
    } catch {
      return [];
    }
  },

  // --- Settings ---
  async getSettings(): Promise<SiteSettings> {
    try {
      const settings = await cmsService.getOne<SiteSettings>('siteSettings', 'general');
      return settings || INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    try {
      await cmsService.create('siteSettings', settings as any, 'general');
    } catch (e) {
      console.warn('saveSettings fallback error:', e);
    }
  },

  // --- Audit Logs ---
  async getAuditLogs(): Promise<AuditLog[]> {
    try {
      const logs = await cmsService.getAll<AuditLog>('auditLogs', [orderBy('createdAt', 'desc'), limit(100)]);
      return logs || [];
    } catch {
      return [];
    }
  },

  // --- Online Presence Tracking ---
  recordPresence(email: string, name?: string): void {
    if (!email) return;
    try {
      const key = 'lumi_active_presences_v1';
      const cleanEmail = email.trim().toLowerCase();
      const existingRaw = localStorage.getItem(key);
      let presences: Array<{ email: string; name: string; lastSeen: number }> = existingRaw ? JSON.parse(existingRaw) : [];
      
      // Filter out stale ones older than 30 minutes
      const now = Date.now();
      presences = presences.filter(p => p.email !== cleanEmail && now - p.lastSeen < 30 * 60 * 1000);
      
      presences.push({
        email: cleanEmail,
        name: name || cleanEmail.split('@')[0],
        lastSeen: now
      });

      localStorage.setItem(key, JSON.stringify(presences));
    } catch (e) {
      console.warn('Could not update presence in storage:', e);
    }
  },

  getPresences(): Array<{ email: string; name: string; lastSeen: number }> {
    try {
      const key = 'lumi_active_presences_v1';
      const existingRaw = localStorage.getItem(key);
      if (!existingRaw) return [];
      const presences: Array<{ email: string; name: string; lastSeen: number }> = JSON.parse(existingRaw);
      const now = Date.now();
      // Only return ones active within the last 15 minutes
      return presences.filter(p => now - p.lastSeen < 15 * 60 * 1000);
    } catch {
      return [];
    }
  }
};

