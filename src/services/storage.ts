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
  SongInfo
} from '../types';
import { initialStories } from '../data/storiesData';
import { initialLetters } from '../data/lettersData';
import { initialPhotovoice } from '../data/photovoiceData';
import { initialGalleryItems } from '../data/galleryData';
import { songDetails } from '../data/musicData';

const KEYS = {
  STORIES: 'lumi_stories_v3',
  SUBMISSIONS: 'lumi_submissions_v3',
  LETTERS: 'lumi_letters_v3',
  PHOTOVOICE: 'lumi_photovoice_v3',
  GALLERY: 'lumi_gallery_v3',
  SURVEYS: 'lumi_surveys_v3',
  MEDIA: 'lumi_media_v3',
  MUSIC: 'lumi_music_v3',
  SETTINGS: 'lumi_settings_v3',
  AUDIT_LOGS: 'lumi_audit_logs_v3',
};

// Initial Story Submissions
const initialSubmissions: StorySubmission[] = [
  {
    id: 'sub-1',
    authorName: 'Trần Minh Khang',
    title: 'Nhặt được túi đựng 20 triệu đồng và laptop trả lại cho sinh viên nghèo',
    content: 'Em và bạn cùng lớp trên đường đi học về đã nhặt được chiếc túi xách rơi giữa đường. Sau khi mở ra kiểm tra thấy có số tiền lớn cùng laptop chứa luận văn tốt nghiệp, tụi em đã lập tức mang đến công an phường...',
    province: 'Hà Nội',
    sourceName: 'Học sinh tự kể',
    message: 'Biết nghĩ cho sự lo lắng của người khác là bài học lớn nhất em nhận được.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    submittedAt: '2026-05-18 10:30',
    status: 'pending'
  },
  {
    id: 'sub-2',
    authorName: 'Lê Thảo Nguyên',
    title: 'CLB Trắc ẩn học đường quyên góp sách vở cho học sinh vùng bão lũ',
    content: 'Nhóm học sinh chúng em tại TP.HCM đã tự tay gói hơn 1.000 phần quà sách giáo khoa và đồ dùng học tập gửi tặng các bạn học sinh vùng cao...',
    province: 'Hồ Chí Minh',
    sourceName: 'CLB Trắc ẩn THPT',
    message: 'Tình yêu thương không biên giới khi được sẻ chia.',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    submittedAt: '2026-05-19 14:15',
    status: 'pending'
  }
];

// Initial Site Settings
const initialSettings: SiteSettings = {
  isMaintenanceMode: false,
  siteName: 'LUMI – LAN TỎA LÒNG TRẮC ẨN',
  slogan: 'NHÌN BẰNG TRÁI TIM – HÀNH ĐỘNG BẰNG YÊU THƯƠNG',
  contactEmail: 'lumichamiuthuong@gmail.com',
  contactPhone: '0345824974',
  announcementText: 'Chào mừng các bạn học sinh THPT toàn quốc đến với không gian lan tỏa lòng trắc ẩn LUMI!'
};

// Initial Audit Logs
const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userName: 'Ban Quản Trị LUMI',
    userRole: 'SUPER_ADMIN',
    action: 'Khởi tạo hệ thống',
    entityType: 'System',
    entityTitle: 'Khởi tạo 8 câu chuyện tử tế ban đầu & 63 tỉnh thành',
    timestamp: '2026-05-15 08:00',
    details: 'Hệ thống đã nạp đầy đủ dữ liệu thực tế và chuẩn hóa SEO.'
  }
];

export const storageService = {
  // --- STORIES ---
  getStories: (): Story[] => {
    try {
      const data = localStorage.getItem(KEYS.STORIES);
      return data ? JSON.parse(data) : initialStories;
    } catch {
      return initialStories;
    }
  },
  saveStories: (stories: Story[]) => {
    localStorage.setItem(KEYS.STORIES, JSON.stringify(stories));
  },
  addStory: (story: Story) => {
    const stories = storageService.getStories();
    const updated = [story, ...stories];
    storageService.saveStories(updated);
    storageService.addAuditLog('Tạo bài viết mới', 'Story', story.title);
    return updated;
  },
  updateStory: (id: string, updates: Partial<Story>): Story[] => {
    const stories = storageService.getStories().map(s => s.id === id ? { ...s, ...updates } : s);
    storageService.saveStories(stories);
    storageService.addAuditLog('Cập nhật bài viết', 'Story', updates.title || id);
    return stories;
  },
  deleteStory: (id: string): Story[] => {
    const story = storageService.getStories().find(s => s.id === id);
    const stories = storageService.getStories().filter(s => s.id !== id);
    storageService.saveStories(stories);
    storageService.addAuditLog('Xóa bài viết', 'Story', story?.title || id);
    return stories;
  },
  likeStory: (id: string): Story | null => {
    let updatedStory: Story | null = null;
    const stories = storageService.getStories().map(s => {
      if (s.id === id) {
        updatedStory = { ...s, likes: s.likes + 1 };
        return updatedStory;
      }
      return s;
    });
    storageService.saveStories(stories);
    return updatedStory;
  },
  viewStory: (id: string) => {
    const stories = storageService.getStories().map(s => {
      if (s.id === id) {
        return { ...s, views: (s.views || 0) + 1 };
      }
      return s;
    });
    storageService.saveStories(stories);
  },

  // --- STORY SUBMISSIONS (KỂ LUMI NGHE) ---
  getSubmissions: (): StorySubmission[] => {
    try {
      const data = localStorage.getItem(KEYS.SUBMISSIONS);
      return data ? JSON.parse(data) : initialSubmissions;
    } catch {
      return initialSubmissions;
    }
  },
  saveSubmissions: (submissions: StorySubmission[]) => {
    localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions));
  },
  addSubmission: (submission: Omit<StorySubmission, 'id' | 'submittedAt' | 'status'>): StorySubmission => {
    const submissions = storageService.getSubmissions();
    const newSub: StorySubmission = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toLocaleString('vi-VN'),
      status: 'pending'
    };
    const updated = [newSub, ...submissions];
    storageService.saveSubmissions(updated);
    return newSub;
  },
  approveSubmissionAndConvertToStory: (submissionId: string): { submissions: StorySubmission[]; newStory: Story } => {
    const submissions = storageService.getSubmissions();
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) throw new Error('Submission not found');

    // Create story from submission
    const newStory: Story = {
      id: `story-${Date.now()}`,
      slug: sub.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: sub.title,
      excerpt: sub.content.slice(0, 160) + '...',
      content: sub.content,
      coverImage: sub.imageUrl || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      province: sub.province,
      region: 'Bắc',
      latitude: 21.0285,
      longitude: 105.8542,
      category: 'Trung thực',
      tags: ['Kể LUMI nghe', 'Học sinh lan tỏa', sub.province],
      message: sub.message || 'Mỗi hành động tử tế đều thắp sáng một niềm tin.',
      sourceName: sub.sourceName || 'Kể LUMI Nghe',
      sourceUrl: sub.sourceUrl || 'https://lumi.edu.vn',
      sourcePublishDate: new Date().toISOString().split('T')[0],
      author: sub.authorName,
      featured: false,
      status: 'published',
      views: 1,
      likes: 0,
      readTime: '3 phút đọc'
    };

    // Add to stories
    storageService.addStory(newStory);

    // Update submission status
    const updatedSubmissions = submissions.map(s => 
      s.id === submissionId ? { ...s, status: 'converted_to_story' as const, reviewedAt: new Date().toLocaleString('vi-VN') } : s
    );
    storageService.saveSubmissions(updatedSubmissions);
    storageService.addAuditLog('Duyệt & Chuyển thành bài viết', 'StorySubmission', sub.title);

    return { submissions: updatedSubmissions, newStory };
  },
  rejectSubmission: (id: string, feedback?: string): StorySubmission[] => {
    const updated = storageService.getSubmissions().map(s => 
      s.id === id ? { ...s, status: 'rejected' as const, feedback: feedback || 'Nội dung chưa đủ thông tin xác thực.' } : s
    );
    storageService.saveSubmissions(updated);
    storageService.addAuditLog('Từ chối bài gửi', 'StorySubmission', id);
    return updated;
  },

  // --- LOVE LETTERS ---
  getLetters: (): Letter[] => {
    try {
      const data = localStorage.getItem(KEYS.LETTERS);
      return data ? JSON.parse(data) : initialLetters;
    } catch {
      return initialLetters;
    }
  },
  saveLetters: (letters: Letter[]) => {
    localStorage.setItem(KEYS.LETTERS, JSON.stringify(letters));
  },
  addLetter: (letter: Omit<Letter, 'id' | 'createdAt' | 'likes' | 'status'>): Letter => {
    const letters = storageService.getLetters();
    const newLetter: Letter = {
      ...letter,
      id: `letter-${Date.now()}`,
      createdAt: 'Vừa xong',
      likes: 0,
      status: 'pending',
      replyFromLumi: 'Cảm ơn bạn đã gửi gắm yêu thương! Lời nhắn của bạn đang được duyệt để xuất bản lên Hộp thư chung nhé.'
    };
    const updated = [newLetter, ...letters];
    storageService.saveLetters(updated);
    return newLetter;
  },
  approveLetter: (id: string, reply?: string): Letter[] => {
    const letters = storageService.getLetters().map(l => 
      l.id === id ? { ...l, status: 'approved' as const, ...(reply ? { replyFromLumi: reply } : {}) } : l
    );
    storageService.saveLetters(letters);
    storageService.addAuditLog('Duyệt thư yêu thương', 'LoveLetter', id);
    return letters;
  },
  rejectLetter: (id: string): Letter[] => {
    const letters = storageService.getLetters().map(l => 
      l.id === id ? { ...l, status: 'rejected' as const } : l
    );
    storageService.saveLetters(letters);
    storageService.addAuditLog('Từ chối thư yêu thương', 'LoveLetter', id);
    return letters;
  },
  deleteLetter: (id: string): Letter[] => {
    const letters = storageService.getLetters().filter(l => l.id !== id);
    storageService.saveLetters(letters);
    storageService.addAuditLog('Xóa thư yêu thương', 'LoveLetter', id);
    return letters;
  },
  likeLetter: (id: string): Letter | null => {
    let updatedLetter: Letter | null = null;
    const letters = storageService.getLetters().map(l => {
      if (l.id === id) {
        updatedLetter = { ...l, likes: l.likes + 1 };
        return updatedLetter;
      }
      return l;
    });
    storageService.saveLetters(letters);
    return updatedLetter;
  },

  // --- PHOTOVOICE ---
  getPhotovoice: (): PhotovoiceItem[] => {
    try {
      const data = localStorage.getItem(KEYS.PHOTOVOICE);
      return data ? JSON.parse(data) : initialPhotovoice;
    } catch {
      return initialPhotovoice;
    }
  },
  getPhotovoiceItems: (): PhotovoiceItem[] => {
    return storageService.getPhotovoice();
  },
  savePhotovoice: (items: PhotovoiceItem[]) => {
    localStorage.setItem(KEYS.PHOTOVOICE, JSON.stringify(items));
  },
  addPhotovoice: (item: Omit<PhotovoiceItem, 'id' | 'submittedAt' | 'likes' | 'status'>): PhotovoiceItem => {
    const current = storageService.getPhotovoice();
    const newItem: PhotovoiceItem = {
      ...item,
      id: `pv-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('vi-VN'),
      likes: 0,
      status: 'pending'
    };
    const updated = [newItem, ...current];
    storageService.savePhotovoice(updated);
    return newItem;
  },
  addPhotovoiceItem: (item: {
    title: string;
    studentName: string;
    grade: string;
    imageUrl: string;
    story: string;
    reflectionPrompt: string;
    theme: string;
  }): PhotovoiceItem => {
    return storageService.addPhotovoice({
      title: item.title,
      authorName: item.studentName,
      authorGrade: item.grade as any,
      school: 'THPT Nguyễn Du',
      imageUrl: item.imageUrl,
      storyText: item.story,
      reflectionPrompt: item.reflectionPrompt
    });
  },
  approvePhotovoice: (id: string): PhotovoiceItem[] => {
    const updated = storageService.getPhotovoice().map(item => 
      item.id === id ? { ...item, status: 'approved' as const } : item
    );
    storageService.savePhotovoice(updated);
    return updated;
  },
  approvePhotovoiceItem: (id: string): PhotovoiceItem[] => {
    return storageService.approvePhotovoice(id);
  },
  rejectPhotovoice: (id: string): PhotovoiceItem[] => {
    const updated = storageService.getPhotovoice().map(item => 
      item.id === id ? { ...item, status: 'rejected' as const } : item
    );
    storageService.savePhotovoice(updated);
    return updated;
  },
  rejectPhotovoiceItem: (id: string): PhotovoiceItem[] => {
    return storageService.rejectPhotovoice(id);
  },
  likePhotovoiceItem: (id: string): PhotovoiceItem | null => {
    let updatedItem: PhotovoiceItem | null = null;
    const items = storageService.getPhotovoice().map(item => {
      if (item.id === id) {
        updatedItem = { ...item, likes: item.likes + 1 };
        return updatedItem;
      }
      return item;
    });
    storageService.savePhotovoice(items);
    return updatedItem;
  },

  // --- GALLERY ---
  getGallery: (): GalleryMediaItem[] => {
    try {
      const data = localStorage.getItem(KEYS.GALLERY);
      return data ? JSON.parse(data) : initialGalleryItems;
    } catch {
      return initialGalleryItems;
    }
  },
  getGalleryItems: (): GalleryMediaItem[] => {
    return storageService.getGallery();
  },
  saveGallery: (items: GalleryMediaItem[]) => {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
  },
  likeGalleryItem: (id: string): GalleryMediaItem | null => {
    let updatedItem: GalleryMediaItem | null = null;
    const items = storageService.getGallery().map(item => {
      if (item.id === id) {
        updatedItem = { ...item, likes: item.likes + 1 };
        return updatedItem;
      }
      return item;
    });
    storageService.saveGallery(items);
    return updatedItem;
  },

  // --- SURVEYS ---
  getSurveys: (): SurveySubmission[] => {
    try {
      const data = localStorage.getItem(KEYS.SURVEYS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  getSurveyResponses: (): SurveySubmission[] => {
    return storageService.getSurveys();
  },
  addSurveyResponse: (submission: {
    surveyType: 'pre-test' | 'post-test';
    studentGender: string;
    studentGrade: string;
    schoolName: string;
    answers: Record<string, number>;
  }): SurveySubmission => {
    const current = storageService.getSurveys();
    const ndScores: Record<string, number> = {};
    const txScores: Record<string, number> = {};
    const taScores: Record<string, number> = {};

    Object.entries(submission.answers).forEach(([key, val]) => {
      if (key.startsWith('ND')) ndScores[key] = val;
      else if (key.startsWith('TX')) txScores[key] = val;
      else if (key.startsWith('TA')) taScores[key] = val;
    });

    const ndVals = Object.values(ndScores);
    const txVals = Object.values(txScores);
    const taVals = Object.values(taScores);

    const avgND = ndVals.length ? Number((ndVals.reduce((a, b) => a + b, 0) / ndVals.length).toFixed(2)) : 0;
    const avgTX = txVals.length ? Number((txVals.reduce((a, b) => a + b, 0) / txVals.length).toFixed(2)) : 0;
    const avgTA = taVals.length ? Number((taVals.reduce((a, b) => a + b, 0) / taVals.length).toFixed(2)) : 0;

    const newSurv: SurveySubmission = {
      id: `surv-${Date.now()}`,
      surveyType: submission.surveyType,
      demographics: {
        grade: (submission.studentGrade as any) || 'Khối 11',
        gender: (submission.studentGender as any) || 'Nữ',
        socialMediaTime: 'Từ 1 – dưới 3 giờ',
        primaryPlatform: 'TikTok'
      },
      ndScores,
      txScores,
      taScores,
      averageND: avgND,
      averageTX: avgTX,
      averageTA: avgTA,
      submittedAt: new Date().toLocaleString('vi-VN')
    };

    const updated = [newSurv, ...current];
    localStorage.setItem(KEYS.SURVEYS, JSON.stringify(updated));
    return newSurv;
  },

  // --- SITE SETTINGS ---
  getSiteSettings: (): SiteSettings => {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : initialSettings;
    } catch {
      return initialSettings;
    }
  },
  saveSiteSettings: (settings: SiteSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    storageService.addAuditLog('Cập nhật cấu hình website', 'SiteSettings', 'Cấu hình chung');
  },

  // --- AUDIT LOGS ---
  getAuditLogs: (): AuditLog[] => {
    try {
      const data = localStorage.getItem(KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  },
  addAuditLog: (action: string, entityType: string, entityTitle: string, details?: string) => {
    const logs = storageService.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userName: 'Ban Quản Trị LUMI',
      userRole: 'SUPER_ADMIN',
      action,
      entityType,
      entityTitle,
      timestamp: new Date().toLocaleString('vi-VN'),
      details
    };
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify([newLog, ...logs.slice(0, 99)]));
  },

  // --- BACKUP & EXPORT ---
  exportFullDatabaseJSON: () => {
    return JSON.stringify({
      stories: storageService.getStories(),
      submissions: storageService.getSubmissions(),
      letters: storageService.getLetters(),
      gallery: storageService.getGallery(),
      surveys: storageService.getSurveys(),
      settings: storageService.getSiteSettings(),
      auditLogs: storageService.getAuditLogs(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  // Reset entire database to default seeds
  resetToDefaults: () => {
    localStorage.setItem(KEYS.STORIES, JSON.stringify(initialStories));
    localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(initialSubmissions));
    localStorage.setItem(KEYS.LETTERS, JSON.stringify(initialLetters));
    localStorage.setItem(KEYS.PHOTOVOICE, JSON.stringify(initialPhotovoice));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGalleryItems));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
  }
};
