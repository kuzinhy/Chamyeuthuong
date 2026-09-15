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

export const storage = {
  // --- Stories / Posts ---
  async getStories(): Promise<Story[]> {
    const stories = await cmsService.getAll<Story>('posts', [orderBy('createdAt', 'desc')]);
    return (stories || []).filter(s => s.isDeleted !== true);
  },

  async saveStory(story: Story): Promise<void> {
    if (story.id && !story.id.startsWith('temp-')) {
      await cmsService.update('posts', story.id, story);
    } else {
      const { id, ...data } = story;
      await cmsService.create('posts', data as any);
    }
  },

  async deleteStory(id: string): Promise<void> {
    await cmsService.softDelete('posts', id);
  },

  async toggleStoryFeature(id: string): Promise<void> {
    const story = await cmsService.getOne<Story>('posts', id);
    if (story) {
      await cmsService.update('posts', id, { featured: !story.featured });
    }
  },

  // --- Submissions ---
  async getSubmissions(): Promise<StorySubmission[]> {
    const subs = await cmsService.getAll<StorySubmission>('submissions', [orderBy('submittedAt', 'desc')]);
    return subs || [];
  },

  async addSubmission(submission: StorySubmission): Promise<void> {
    const { id, ...data } = submission;
    await cmsService.create('submissions', data as any);
  },

  async updateSubmissionStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    await cmsService.update('submissions', id, { status });
  },

  // --- Letters ---
  async getLetters(): Promise<Letter[]> {
    const letters = await cmsService.getAll<Letter>('letters', [orderBy('createdAt', 'desc')]);
    return letters || [];
  },

  async addLetter(letter: Letter): Promise<void> {
    const { id, ...data } = letter;
    await cmsService.create('letters', data as any);
  },

  async updateLetterStatus(id: string, status: 'approved' | 'rejected' | 'pending', reply?: string): Promise<void> {
    await cmsService.update('letters', id, { status, replyFromLumi: reply });
  },

  async deleteLetter(id: string): Promise<void> {
    await cmsService.delete('letters', id);
  },

  // --- Photovoice ---
  async getPhotovoice(): Promise<PhotovoiceItem[]> {
    const items = await cmsService.getAll<PhotovoiceItem>('photovoice', [orderBy('createdAt', 'desc')]);
    return items || [];
  },

  async addPhotovoice(item: PhotovoiceItem): Promise<void> {
    const { id, ...data } = item;
    await cmsService.create('photovoice', data as any);
  },

  async updatePhotovoiceStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    await cmsService.update('photovoice', id, { status });
  },

  async deletePhotovoice(id: string): Promise<void> {
    await cmsService.delete('photovoice', id);
  },

  // --- Gallery ---
  async getGallery(): Promise<GalleryMediaItem[]> {
    const items = await cmsService.getAll<GalleryMediaItem>('gallery', [orderBy('createdAt', 'desc')]);
    return items || [];
  },

  async addGalleryItem(item: GalleryMediaItem): Promise<void> {
    const { id, ...data } = item;
    await cmsService.create('gallery', data as any);
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryMediaItem>): Promise<void> {
    await cmsService.update('gallery', id, updates);
  },

  async deleteGalleryItem(id: string): Promise<void> {
    await cmsService.delete('gallery', id);
  },

  // --- Surveys ---
  async getSurveys(): Promise<SurveySubmission[]> {
    const surveys = await cmsService.getAll<SurveySubmission>('surveys', [orderBy('submittedAt', 'desc')]);
    return surveys || [];
  },

  async addSurvey(survey: SurveySubmission): Promise<void> {
    const { id, ...data } = survey;
    await cmsService.create('surveys', data as any);
  },

  // --- Music ---
  async getMusic(): Promise<SongInfo[]> {
    const music = await cmsService.getAll<SongInfo>('music', [orderBy('order', 'asc')]);
    return music || [];
  },

  async addSong(song: SongInfo): Promise<void> {
    const { id, ...data } = song;
    await cmsService.create('music', data as any);
  },

  async updateMusic(id: string, updates: Partial<SongInfo>): Promise<void> {
    await cmsService.update('music', id, updates);
  },

  async deleteMusic(id: string): Promise<void> {
    await cmsService.delete('music', id);
  },

  // --- Map Points ---
  async getMapPoints(): Promise<KindnessPoint[]> {
    const points = await cmsService.getAll<KindnessPoint>('mapPoints');
    return points || [];
  },

  async addMapPoint(point: KindnessPoint): Promise<void> {
    const { id, ...data } = point;
    await cmsService.create('mapPoints', data as any);
  },

  async updateMapPoint(id: string, updates: Partial<KindnessPoint>): Promise<void> {
    await cmsService.update('mapPoints', id, updates);
  },

  async deleteMapPoint(id: string): Promise<void> {
    await cmsService.delete('mapPoints', id);
  },

  // --- Research ---
  async getResearch(): Promise<ResearchItem[]> {
    const items = await cmsService.getAll<ResearchItem>('research', [orderBy('order', 'asc')]);
    return items || [];
  },

  async addResearchItem(item: ResearchItem): Promise<void> {
    const { id, ...data } = item;
    await cmsService.create('research', data as any);
  },

  async updateResearchItem(id: string, updates: Partial<ResearchItem>): Promise<void> {
    await cmsService.update('research', id, updates);
  },

  async deleteResearchItem(id: string): Promise<void> {
    await cmsService.delete('research', id);
  },

  // --- Users ---
  async getUsers(): Promise<UserProfile[]> {
    const users = await cmsService.getAll<UserProfile>('users');
    return users || [];
  },

  // --- Settings ---
  async getSettings(): Promise<SiteSettings> {
    const settings = await cmsService.getOne<SiteSettings>('siteSettings', 'general');
    return settings || {
      isMaintenanceMode: false,
      siteName: 'LUMI – LAN TỎA LÒNG TRẮC ẨN',
      slogan: 'NHÌN BẰNG TRÁI TIM – HÀNH ĐỘNG BẰNG YÊU THƯƠNG',
      contactEmail: 'lumichamiuthuong@gmail.com',
      contactPhone: '0345824974',
      announcementText: 'Chào mừng các bạn học sinh THPT toàn quốc đến với không gian lan tỏa lòng trắc ẩn LUMI!'
    };
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    await cmsService.create('siteSettings', settings as any, 'general');
  },

  // --- Audit Logs ---
  async getAuditLogs(): Promise<AuditLog[]> {
    const logs = await cmsService.getAll<AuditLog>('auditLogs', [orderBy('createdAt', 'desc'), limit(100)]);
    return logs || [];
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
