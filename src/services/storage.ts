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
  ResearchItem
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
  MAP_POINTS: 'lumi_map_points_v3',
  RESEARCH: 'lumi_research_v3',
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

const initialMapPoints: KindnessPoint[] = [
  {
    id: 'point-1',
    title: 'Điểm tử tế Thủ Dầu Một',
    province: 'Bình Dương',
    region: 'Nam',
    latitude: 11.1603,
    longitude: 106.6575,
    address: 'Ngã tư Hoàng Văn Thụ, TP. Thủ Dầu Một',
    description: 'Nơi diễn ra câu chuyện cậu bé nhặt ve chai trả lại ví tiền có 15 triệu đồng.',
    storyTitle: 'Cậu bé nhặt ve chai trả lại ví tiền',
    storyCount: 2
  },
  {
    id: 'point-2',
    title: 'Lớp học 0 đồng Đom Đóm',
    province: 'Đà Nẵng',
    region: 'Trung',
    latitude: 16.0544,
    longitude: 108.2022,
    address: 'Khu phố ven sông Cẩm Lệ, Đà Nẵng',
    description: 'Lớp học dạy kèm miễn phí môn Toán và Anh Văn cho 30 em nhỏ khó khăn do nhóm HS Chuyên phụ trách.',
    storyTitle: 'Lớp học 0 đồng cuối tuần',
    storyCount: 4
  },
  {
    id: 'point-3',
    title: 'Chuyến xe cõng bạn vùng cao',
    province: 'Hà Giang',
    region: 'Bắc',
    latitude: 22.8233,
    longitude: 104.9839,
    address: 'Điểm trường Mèo Vạc, Hà Giang',
    description: '5 năm ròng rã cõng bạn khuyết tật qua 3 ngọn đồi đến lớp tìm con chữ.',
    storyTitle: 'Chuyến xe yêu thương 5 năm',
    storyCount: 2
  },
  {
    id: 'point-4',
    title: 'Tủ bánh mì & Nước mát học đường',
    province: 'Hà Nội',
    region: 'Bắc',
    latitude: 21.0285,
    longitude: 105.8542,
    address: 'Khu vực Đống Đa, Hà Nội',
    description: 'Điểm tiếp sức bữa sáng ấm áp cho học sinh và người lao động nghèo.',
    storyTitle: 'Bữa sáng sẻ chia yêu thương',
    storyCount: 4
  },
  {
    id: 'point-5',
    title: 'Trạm sách & Quyên góp tri thức',
    province: 'Hồ Chí Minh',
    region: 'Nam',
    latitude: 10.8231,
    longitude: 106.6297,
    address: 'Quận 1, TP. Hồ Chí Minh',
    description: 'Điểm tiếp nhận hơn 1.000 đầu sách giáo khoa và đồ dùng học tập gửi tặng học sinh vùng bão lũ.',
    storyTitle: 'Trạm sách yêu thương tuổi trẻ',
    storyCount: 5
  }
];

const initialResearchItems: ResearchItem[] = [
  {
    id: 'res-1',
    title: 'Tác động truyền thông thị giác có định hướng đến sự thay đổi hành vi trắc ẩn của học sinh THPT',
    code: 'DT-LUMI-2025',
    category: 'Khoa học hành vi',
    sampleSize: '300 học sinh (Khối 10, 11, 12)',
    author: 'Nhóm Nghiên Cứu LUMI',
    spssScore: 'p < 0.001 (Ý nghĩa thống kê vượt trội)',
    description: 'Nghiên cứu thực nghiệm chứng minh tác động kích hoạt tế bào thần kinh gương (Mirror Neurons) từ hình ảnh câu chuyện người tốt việc tốt.',
    downloadUrl: '#',
    publishedDate: '2026-05',
    status: 'published'
  },
  {
    id: 'res-2',
    title: 'Khảo sát thực trạng mức độ thờ ơ và thấu cảm trong môi trường học đường số hóa',
    code: 'DT-SURVEY-01',
    category: 'Khảo sát thực nghiệm',
    sampleSize: '500 học sinh',
    author: 'Ban Cố Vấn Tâm Lý Học Đường',
    spssScore: 'Hệ số Cronbach Alpha = 0.882',
    description: 'Đo lường mức độ đồng cảm và biểu hiện hành vi giúp đỡ bạn bè trước bối cảnh bùng nổ mạng xã hội.',
    downloadUrl: '#',
    publishedDate: '2026-04',
    status: 'published'
  },
  {
    id: 'res-3',
    title: 'Quy trình 5 bước can thiệp thấu cảm bằng âm nhạc tần số 432Hz và nghệ thuật thị giác',
    code: 'DT-MUSIC-432',
    category: 'Giải pháp can thiệp',
    sampleSize: '120 học sinh can thiệp',
    author: 'Dự án CHẠM IU THƯƠNG',
    spssScore: 'Tỷ lệ cải thiện thái độ tích cực +42%',
    description: 'Kết hợp liệu pháp sóng âm tần số sinh học 432Hz và hình ảnh nhân văn giúp giảm căng thẳng và mở rộng lòng trắc ẩn.',
    downloadUrl: '#',
    publishedDate: '2026-03',
    status: 'published'
  }
];

const initialMusicList: any[] = [
  {
    id: 'song-dieu-chua-noi',
    slug: 'dieu-chua-noi',
    title: 'Điều Chưa Nói',
    artist: 'Dự Án LUMI x Nhóm Nhạc Học Sinh THPT Nguyễn Du',
    composer: 'Dự Án Khoa Học Hành Vi LUMI',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '',
    frequency: '432Hz',
    releaseDate: '2026-05',
    description: 'Ca khúc chủ đề chính thức của Chiến dịch LUMI – CHẠM IU THƯƠNG. Bản hòa ca xoa dịu những tổn thương vô hình của tuổi học trò.',
    message: 'Hãy dũng cảm cất lên những điều chưa nói để yêu thương được kết nối.',
    status: 'published',
    lyrics: 'Có những ngày sân trường bỗng thênh thang...\nChỉ riêng một góc nhỏ ngồi lặng im trong bóng râm...\nNhìn bằng trái tim, sẽ thấy những vết xước vô hình,\nHành động bằng yêu thương, xua tan mùa đông lạnh giá.'
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
  deleteSubmission: (id: string): StorySubmission[] => {
    const updated = storageService.getSubmissions().filter(s => s.id !== id);
    storageService.saveSubmissions(updated);
    storageService.addAuditLog('Xóa bài đóng góp', 'StorySubmission', id);
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
  updateLetter: (id: string, updates: Partial<Letter>): Letter[] => {
    const letters = storageService.getLetters().map(l => 
      l.id === id ? { ...l, ...updates } : l
    );
    storageService.saveLetters(letters);
    storageService.addAuditLog('Cập nhật thư yêu thương', 'LoveLetter', id);
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
  addGalleryItem: (item: Partial<GalleryMediaItem>): GalleryMediaItem => {
    const current = storageService.getGallery();
    const newItem: GalleryMediaItem = {
      id: item.id || `gal-${Date.now()}`,
      title: item.title || 'Tác phẩm mới',
      description: item.description || '',
      category: item.category || 'Sản phẩm truyền thông',
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      date: item.date || new Date().toLocaleDateString('vi-VN'),
      credit: item.credit || 'LUMI Team',
      source: item.source || 'Ban Truyền Thông',
      likes: item.likes || 0,
      tags: item.tags || ['LUMI']
    };
    const updated = [newItem, ...current];
    storageService.saveGallery(updated);
    storageService.addAuditLog('Thêm tác phẩm hình ảnh', 'Gallery', newItem.title);
    return newItem;
  },
  updateGalleryItem: (id: string, updates: Partial<GalleryMediaItem>): GalleryMediaItem[] => {
    const current = storageService.getGallery();
    const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
    storageService.saveGallery(updated);
    storageService.addAuditLog('Cập nhật tác phẩm hình ảnh', 'Gallery', updates.title || id);
    return updated;
  },
  deleteGalleryItem: (id: string): GalleryMediaItem[] => {
    const current = storageService.getGallery();
    const item = current.find(i => i.id === id);
    const updated = current.filter(i => i.id !== id);
    storageService.saveGallery(updated);
    storageService.addAuditLog('Xóa tác phẩm hình ảnh', 'Gallery', item?.title || id);
    return updated;
  },

  // --- MUSIC ---
  getMusic: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.MUSIC);
      return data ? JSON.parse(data) : initialMusicList;
    } catch {
      return initialMusicList;
    }
  },
  saveMusic: (items: any[]) => {
    localStorage.setItem(KEYS.MUSIC, JSON.stringify(items));
  },
  addMusicItem: (song: any): any => {
    const current = storageService.getMusic();
    const newSong = {
      ...song,
      id: song.id || `song-${Date.now()}`,
      frequency: song.frequency || '432Hz',
      status: song.status || 'published'
    };
    const updated = [newSong, ...current];
    storageService.saveMusic(updated);
    storageService.addAuditLog('Thêm bài hát mới', 'Music', newSong.title);
    return newSong;
  },
  updateMusicItem: (id: string, updates: any): any[] => {
    const current = storageService.getMusic();
    const updated = current.map(s => s.id === id ? { ...s, ...updates } : s);
    storageService.saveMusic(updated);
    storageService.addAuditLog('Cập nhật bài hát', 'Music', updates.title || id);
    return updated;
  },
  deleteMusicItem: (id: string): any[] => {
    const current = storageService.getMusic();
    const song = current.find(s => s.id === id);
    const updated = current.filter(s => s.id !== id);
    storageService.saveMusic(updated);
    storageService.addAuditLog('Xóa bài hát', 'Music', song?.title || id);
    return updated;
  },

  // --- MAP POINTS ---
  getMapPoints: (): KindnessPoint[] => {
    try {
      const data = localStorage.getItem(KEYS.MAP_POINTS);
      return data ? JSON.parse(data) : initialMapPoints;
    } catch {
      return initialMapPoints;
    }
  },
  saveMapPoints: (points: KindnessPoint[]) => {
    localStorage.setItem(KEYS.MAP_POINTS, JSON.stringify(points));
  },
  addMapPoint: (point: Partial<KindnessPoint>): KindnessPoint => {
    const current = storageService.getMapPoints();
    const newPoint: KindnessPoint = {
      id: point.id || `point-${Date.now()}`,
      title: point.title || 'Điểm tử tế mới',
      province: point.province || 'Bình Dương',
      region: point.region || 'Nam',
      latitude: point.latitude || 10.8231,
      longitude: point.longitude || 106.6297,
      address: point.address || '',
      description: point.description || '',
      storyTitle: point.storyTitle || '',
      storyCount: point.storyCount || 1,
      createdAt: new Date().toISOString()
    };
    const updated = [newPoint, ...current];
    storageService.saveMapPoints(updated);
    storageService.addAuditLog('Thêm điểm bản đồ', 'MapPoint', newPoint.title);
    return newPoint;
  },
  updateMapPoint: (id: string, updates: Partial<KindnessPoint>): KindnessPoint[] => {
    const current = storageService.getMapPoints();
    const updated = current.map(p => p.id === id ? { ...p, ...updates } : p);
    storageService.saveMapPoints(updated);
    storageService.addAuditLog('Cập nhật điểm bản đồ', 'MapPoint', updates.title || id);
    return updated;
  },
  deleteMapPoint: (id: string): KindnessPoint[] => {
    const current = storageService.getMapPoints();
    const point = current.find(p => p.id === id);
    const updated = current.filter(p => p.id !== id);
    storageService.saveMapPoints(updated);
    storageService.addAuditLog('Xóa điểm bản đồ', 'MapPoint', point?.title || id);
    return updated;
  },

  // --- RESEARCH ---
  getResearch: (): ResearchItem[] => {
    try {
      const data = localStorage.getItem(KEYS.RESEARCH);
      return data ? JSON.parse(data) : initialResearchItems;
    } catch {
      return initialResearchItems;
    }
  },
  saveResearch: (items: ResearchItem[]) => {
    localStorage.setItem(KEYS.RESEARCH, JSON.stringify(items));
  },
  addResearchItem: (item: Partial<ResearchItem>): ResearchItem => {
    const current = storageService.getResearch();
    const newItem: ResearchItem = {
      id: item.id || `res-${Date.now()}`,
      title: item.title || 'Đề tài nghiên cứu mới',
      code: item.code || `DT-${Date.now().toString().slice(-4)}`,
      category: item.category || 'Khoa học hành vi',
      sampleSize: item.sampleSize || '300 học sinh',
      author: item.author || 'LUMI Research Team',
      spssScore: item.spssScore || 'p < 0.001',
      description: item.description || '',
      downloadUrl: item.downloadUrl || '#',
      publishedDate: item.publishedDate || new Date().toISOString().split('T')[0],
      status: item.status || 'published'
    };
    const updated = [newItem, ...current];
    storageService.saveResearch(updated);
    storageService.addAuditLog('Thêm đề tài nghiên cứu', 'Research', newItem.title);
    return newItem;
  },
  updateResearchItem: (id: string, updates: Partial<ResearchItem>): ResearchItem[] => {
    const current = storageService.getResearch();
    const updated = current.map(r => r.id === id ? { ...r, ...updates } : r);
    storageService.saveResearch(updated);
    storageService.addAuditLog('Cập nhật đề tài nghiên cứu', 'Research', updates.title || id);
    return updated;
  },
  deleteResearchItem: (id: string): ResearchItem[] => {
    const current = storageService.getResearch();
    const item = current.find(r => r.id === id);
    const updated = current.filter(r => r.id !== id);
    storageService.saveResearch(updated);
    storageService.addAuditLog('Xóa đề tài nghiên cứu', 'Research', item?.title || id);
    return updated;
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
      music: storageService.getMusic(),
      mapPoints: storageService.getMapPoints(),
      research: storageService.getResearch(),
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
    localStorage.setItem(KEYS.MUSIC, JSON.stringify(initialMusicList));
    localStorage.setItem(KEYS.MAP_POINTS, JSON.stringify(initialMapPoints));
    localStorage.setItem(KEYS.RESEARCH, JSON.stringify(initialResearchItems));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
  }
};
