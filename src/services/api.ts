// Client-side API Service for Real Database Sync and Auth Verification
import { createClient } from '@supabase/supabase-js';
import { 
  Story, 
  Letter, 
  StorySubmission, 
  UserProfile, 
  AuditLog, 
  GalleryMediaItem, 
  SongInfo, 
  KindnessPoint, 
  ResearchItem,
  SiteSettings 
} from '../types';

export interface PresenceInfo {
  email: string;
  name: string;
  lastSeen?: number;
  activePage?: string;
  editingStoryId?: string;
}

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to make authenticated requests to our fullstack server
async function fetchWithAuth(url: string, options: RequestInit = {}, operatorEmail?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (operatorEmail) {
    headers['x-user-email'] = operatorEmail;
  }

  const res = await fetch(url, { ...options, headers });
  return res;
}

export const apiService = {
  // Authentication & Session
  async loginWithGoogle(email: string, displayName?: string, avatarUrl?: string) {
    const res = await fetch('/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, displayName, avatarUrl })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Lỗi đăng nhập');
    }
    return await res.json() as { user: UserProfile; role: string; isSuperAdmin: boolean; redirectUrl: string };
  },

  // Online Presence Heartbeat
  async sendPresence(email: string, name: string, activePage?: string, editingStoryId?: string): Promise<PresenceInfo[]> {
    try {
      const res = await fetch('/api/auth/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, activePage, editingStoryId })
      });
      if (res.ok) {
        const data = await res.json();
        return (data.onlineAdmins || []) as PresenceInfo[];
      }
    } catch {
      // ignore transient network
    }
    return [];
  },

  // Stories
  async getStories(operatorEmail?: string): Promise<Story[]> {
    try {
      const res = await fetchWithAuth('/api/stories', {}, operatorEmail);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API getStories fallback to local cache:', e);
    }
    return [];
  },

  async createStory(story: Partial<Story>, operatorEmail: string): Promise<Story> {
    const res = await fetchWithAuth('/api/stories', {
      method: 'POST',
      body: JSON.stringify(story)
    }, operatorEmail);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Không thể tạo bài viết.');
    }
    return await res.json();
  },

  async updateStory(
    id: string, 
    updates: Partial<Story>, 
    operatorEmail: string,
    expectedVersion?: number, 
    forceOverwrite?: boolean
  ): Promise<{ success: boolean; story?: Story; conflict?: boolean; currentStory?: Story; message?: string }> {
    const payload = {
      ...updates,
      expectedVersion,
      forceOverwrite
    };
    const res = await fetchWithAuth(`/api/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }, operatorEmail);

    if (res.status === 409) {
      const conflictData = await res.json();
      return {
        success: false,
        conflict: true,
        currentStory: conflictData.currentStory,
        message: conflictData.message
      };
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Không thể cập nhật bài viết.');
    }

    const updated = await res.json();
    return { success: true, story: updated };
  },

  async deleteStory(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/stories/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Không thể xóa bài viết.');
    }
    return true;
  },

  async likeStory(id: string): Promise<number | null> {
    try {
      const res = await fetch(`/api/stories/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        return data.likes;
      }
    } catch (e) {
      console.warn('likeStory error:', e);
    }
    return null;
  },

  async viewStory(id: string): Promise<number | null> {
    try {
      const res = await fetch(`/api/stories/${id}/view`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        return data.views;
      }
    } catch (e) {
      console.warn('viewStory error:', e);
    }
    return null;
  },

  // Letters
  async getLetters(operatorEmail?: string): Promise<Letter[]> {
    try {
      const res = await fetchWithAuth('/api/letters', {}, operatorEmail);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('getLetters error:', e);
    }
    return [];
  },

  async submitLetter(letterData: Partial<Letter>): Promise<Letter> {
    const res = await fetch('/api/letters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(letterData)
    });
    if (!res.ok) throw new Error('Không thể gửi thư.');
    return await res.json();
  },

  async moderateLetter(id: string, updates: { status?: 'approved' | 'rejected' | 'pending'; replyFromLumi?: string }, operatorEmail: string): Promise<Letter> {
    const res = await fetchWithAuth(`/api/letters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể duyệt thư.');
    return await res.json();
  },

  async deleteLetter(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/letters/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    return res.ok;
  },

  // Submissions (Kể LUMI Nghe)
  async getSubmissions(operatorEmail: string): Promise<StorySubmission[]> {
    try {
      const res = await fetchWithAuth('/api/submissions', {}, operatorEmail);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getSubmissions error:', e);
    }
    return [];
  },

  async submitStorySubmission(data: Partial<StorySubmission>): Promise<StorySubmission> {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Không thể gửi câu chuyện.');
    return await res.json();
  },

  async convertSubmission(id: string, operatorEmail: string): Promise<{ submission: StorySubmission; story: Story }> {
    const res = await fetchWithAuth(`/api/submissions/${id}/convert`, {
      method: 'POST'
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể chuyển thành bài viết.');
    return await res.json();
  },

  // Audit Logs
  async getAuditLogs(operatorEmail: string): Promise<AuditLog[]> {
    try {
      const res = await fetchWithAuth('/api/audit-logs', {}, operatorEmail);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getAuditLogs error:', e);
    }
    return [];
  },

  // Users
  async getUsers(operatorEmail: string): Promise<any[]> {
    try {
      const res = await fetchWithAuth('/api/users', {}, operatorEmail);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getUsers error:', e);
    }
    return [];
  },

  // Gallery
  async getGalleryItems(): Promise<GalleryMediaItem[]> {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getGalleryItems error:', e);
    }
    return [];
  },

  async createGalleryItem(item: Partial<GalleryMediaItem>, operatorEmail: string): Promise<GalleryMediaItem> {
    const res = await fetchWithAuth('/api/gallery', {
      method: 'POST',
      body: JSON.stringify(item)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể thêm tác phẩm hình ảnh.');
    return await res.json();
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryMediaItem>, operatorEmail: string): Promise<GalleryMediaItem> {
    const res = await fetchWithAuth(`/api/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể cập nhật tác phẩm.');
    return await res.json();
  },

  async deleteGalleryItem(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/gallery/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể xóa tác phẩm.');
    return true;
  },

  // Music
  async getMusicItems(): Promise<any[]> {
    try {
      const res = await fetch('/api/music');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getMusicItems error:', e);
    }
    return [];
  },

  async createMusicItem(song: any, operatorEmail: string): Promise<any> {
    const res = await fetchWithAuth('/api/music', {
      method: 'POST',
      body: JSON.stringify(song)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể thêm bài hát.');
    return await res.json();
  },

  async updateMusicItem(id: string, updates: any, operatorEmail: string): Promise<any> {
    const res = await fetchWithAuth(`/api/music/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể cập nhật bài hát.');
    return await res.json();
  },

  async deleteMusicItem(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/music/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể xóa bài hát.');
    return true;
  },

  // Map Points
  async getMapPoints(): Promise<KindnessPoint[]> {
    try {
      const res = await fetch('/api/map-points');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getMapPoints error:', e);
    }
    return [];
  },

  async createMapPoint(point: Partial<KindnessPoint>, operatorEmail: string): Promise<KindnessPoint> {
    const res = await fetchWithAuth('/api/map-points', {
      method: 'POST',
      body: JSON.stringify(point)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể thêm điểm bản đồ.');
    return await res.json();
  },

  async updateMapPoint(id: string, updates: Partial<KindnessPoint>, operatorEmail: string): Promise<KindnessPoint> {
    const res = await fetchWithAuth(`/api/map-points/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể cập nhật điểm bản đồ.');
    return await res.json();
  },

  async deleteMapPoint(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/map-points/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể xóa điểm bản đồ.');
    return true;
  },

  // Research
  async getResearchItems(): Promise<ResearchItem[]> {
    try {
      const res = await fetch('/api/research');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getResearchItems error:', e);
    }
    return [];
  },

  async createResearchItem(item: Partial<ResearchItem>, operatorEmail: string): Promise<ResearchItem> {
    const res = await fetchWithAuth('/api/research', {
      method: 'POST',
      body: JSON.stringify(item)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể thêm tài liệu nghiên cứu.');
    return await res.json();
  },

  async updateResearchItem(id: string, updates: Partial<ResearchItem>, operatorEmail: string): Promise<ResearchItem> {
    const res = await fetchWithAuth(`/api/research/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể cập nhật tài liệu nghiên cứu.');
    return await res.json();
  },

  async deleteResearchItem(id: string, operatorEmail: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/research/${id}`, {
      method: 'DELETE'
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể xóa tài liệu nghiên cứu.');
    return true;
  },

  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('getSettings error:', e);
    }
    return {} as SiteSettings;
  },

  async updateSettings(settings: Partial<SiteSettings>, operatorEmail: string): Promise<SiteSettings> {
    const res = await fetchWithAuth('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    }, operatorEmail);
    if (!res.ok) throw new Error('Không thể lưu cài đặt.');
    return await res.json();
  }
};
