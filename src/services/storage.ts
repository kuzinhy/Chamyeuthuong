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

export const storage = {
  // --- Stories / Posts ---
  async getStories(): Promise<Story[]> {
    try {
      const stories = await cmsService.getAll<Story>('posts', [orderBy('createdAt', 'desc')]);
      const valid = (stories || []).filter(s => s.isDeleted !== true);
      return valid.length > 0 ? valid : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  },

  async saveStory(story: Story): Promise<void> {
    try {
      if (story.id && !story.id.startsWith('temp-') && !story.id.startsWith('story-')) {
        await cmsService.update('posts', story.id, story);
      } else {
        const { id, ...data } = story;
        await cmsService.create('posts', data as any);
      }
    } catch (e) {
      console.warn('saveStory fallback error:', e);
    }
  },

  async deleteStory(id: string): Promise<void> {
    try {
      await cmsService.softDelete('posts', id);
    } catch (e) {
      console.warn('deleteStory fallback error:', e);
    }
  },

  async toggleStoryFeature(id: string): Promise<void> {
    try {
      const story = await cmsService.getOne<Story>('posts', id);
      if (story) {
        await cmsService.update('posts', id, { featured: !story.featured });
      }
    } catch (e) {
      console.warn('toggleStoryFeature fallback error:', e);
    }
  },

  // --- Submissions ---
  async getSubmissions(): Promise<StorySubmission[]> {
    try {
      const subs = await cmsService.getAll<StorySubmission>('submissions', [orderBy('submittedAt', 'desc')]);
      return subs && subs.length > 0 ? subs : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  },

  async addSubmission(submission: StorySubmission): Promise<void> {
    try {
      const { id, ...data } = submission;
      await cmsService.create('submissions', data as any);
    } catch (e) {
      console.warn('addSubmission fallback error:', e);
    }
  },

  async updateSubmissionStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    try {
      await cmsService.update('submissions', id, { status });
    } catch (e) {
      console.warn('updateSubmissionStatus fallback error:', e);
    }
  },

  // --- Letters ---
  async getLetters(): Promise<Letter[]> {
    try {
      const letters = await cmsService.getAll<Letter>('letters', [orderBy('createdAt', 'desc')]);
      return letters && letters.length > 0 ? letters : INITIAL_LETTERS;
    } catch {
      return INITIAL_LETTERS;
    }
  },

  async addLetter(letter: Letter): Promise<void> {
    try {
      const { id, ...data } = letter;
      await cmsService.create('letters', data as any);
    } catch (e) {
      console.warn('addLetter fallback error:', e);
    }
  },

  async updateLetterStatus(id: string, status: 'approved' | 'rejected' | 'pending', reply?: string): Promise<void> {
    try {
      await cmsService.update('letters', id, { status, replyFromLumi: reply });
    } catch (e) {
      console.warn('updateLetterStatus fallback error:', e);
    }
  },

  async deleteLetter(id: string): Promise<void> {
    try {
      await cmsService.delete('letters', id);
    } catch (e) {
      console.warn('deleteLetter fallback error:', e);
    }
  },

  // --- Photovoice ---
  async getPhotovoice(): Promise<PhotovoiceItem[]> {
    try {
      const items = await cmsService.getAll<PhotovoiceItem>('photovoice', [orderBy('createdAt', 'desc')]);
      return items && items.length > 0 ? items : INITIAL_PHOTOVOICE;
    } catch {
      return INITIAL_PHOTOVOICE;
    }
  },

  async addPhotovoice(item: PhotovoiceItem): Promise<void> {
    try {
      const { id, ...data } = item;
      await cmsService.create('photovoice', data as any);
    } catch (e) {
      console.warn('addPhotovoice fallback error:', e);
    }
  },

  async updatePhotovoiceStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    try {
      await cmsService.update('photovoice', id, { status });
    } catch (e) {
      console.warn('updatePhotovoiceStatus fallback error:', e);
    }
  },

  async deletePhotovoice(id: string): Promise<void> {
    try {
      await cmsService.delete('photovoice', id);
    } catch (e) {
      console.warn('deletePhotovoice fallback error:', e);
    }
  },

  // --- Gallery ---
  async getGallery(): Promise<GalleryMediaItem[]> {
    try {
      const items = await cmsService.getAll<GalleryMediaItem>('gallery', [orderBy('createdAt', 'desc')]);
      return items && items.length > 0 ? items : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  },

  async addGalleryItem(item: GalleryMediaItem): Promise<void> {
    try {
      const { id, ...data } = item;
      await cmsService.create('gallery', data as any);
    } catch (e) {
      console.warn('addGalleryItem fallback error:', e);
    }
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryMediaItem>): Promise<void> {
    try {
      await cmsService.update('gallery', id, updates);
    } catch (e) {
      console.warn('updateGalleryItem fallback error:', e);
    }
  },

  async deleteGalleryItem(id: string): Promise<void> {
    try {
      await cmsService.delete('gallery', id);
    } catch (e) {
      console.warn('deleteGalleryItem fallback error:', e);
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
    try {
      const music = await cmsService.getAll<SongInfo>('music', [orderBy('order', 'asc')]);
      return music && music.length > 0 ? music : INITIAL_SONGS;
    } catch {
      return INITIAL_SONGS;
    }
  },

  async addSong(song: SongInfo): Promise<void> {
    try {
      const { id, ...data } = song;
      await cmsService.create('music', data as any);
    } catch (e) {
      console.warn('addSong fallback error:', e);
    }
  },

  async updateMusic(id: string, updates: Partial<SongInfo>): Promise<void> {
    try {
      await cmsService.update('music', id, updates);
    } catch (e) {
      console.warn('updateMusic fallback error:', e);
    }
  },

  async deleteMusic(id: string): Promise<void> {
    try {
      await cmsService.delete('music', id);
    } catch (e) {
      console.warn('deleteMusic fallback error:', e);
    }
  },

  // --- Map Points ---
  async getMapPoints(): Promise<KindnessPoint[]> {
    try {
      const points = await cmsService.getAll<KindnessPoint>('mapPoints');
      return points && points.length > 0 ? points : INITIAL_MAP_POINTS;
    } catch {
      return INITIAL_MAP_POINTS;
    }
  },

  async addMapPoint(point: KindnessPoint): Promise<void> {
    try {
      const { id, ...data } = point;
      await cmsService.create('mapPoints', data as any);
    } catch (e) {
      console.warn('addMapPoint fallback error:', e);
    }
  },

  async updateMapPoint(id: string, updates: Partial<KindnessPoint>): Promise<void> {
    try {
      await cmsService.update('mapPoints', id, updates);
    } catch (e) {
      console.warn('updateMapPoint fallback error:', e);
    }
  },

  async deleteMapPoint(id: string): Promise<void> {
    try {
      await cmsService.delete('mapPoints', id);
    } catch (e) {
      console.warn('deleteMapPoint fallback error:', e);
    }
  },

  // --- Research ---
  async getResearch(): Promise<ResearchItem[]> {
    try {
      const items = await cmsService.getAll<ResearchItem>('research', [orderBy('order', 'asc')]);
      return items && items.length > 0 ? items : INITIAL_RESEARCH;
    } catch {
      return INITIAL_RESEARCH;
    }
  },

  async addResearchItem(item: ResearchItem): Promise<void> {
    try {
      const { id, ...data } = item;
      await cmsService.create('research', data as any);
    } catch (e) {
      console.warn('addResearchItem fallback error:', e);
    }
  },

  async updateResearchItem(id: string, updates: Partial<ResearchItem>): Promise<void> {
    try {
      await cmsService.update('research', id, updates);
    } catch (e) {
      console.warn('updateResearchItem fallback error:', e);
    }
  },

  async deleteResearchItem(id: string): Promise<void> {
    try {
      await cmsService.delete('research', id);
    } catch (e) {
      console.warn('deleteResearchItem fallback error:', e);
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

