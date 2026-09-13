export type RegionType = 'Bắc' | 'Trung' | 'Nam';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MODERATOR' | 'MEMBER' | 'GUEST';

export interface UserProfile {
  id: string;
  email?: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  province?: string;
  role: UserRole;
  is_protected_admin?: boolean;
  createdAt: string;
}

export type StoryCategory = 
  | 'Trung thực'
  | 'Giúp đỡ người khác'
  | 'Giúp đỡ cộng đồng'
  | 'Dũng cảm'
  | 'Chia sẻ'
  | 'Sẻ chia'
  | 'Trách nhiệm'
  | 'Yêu thương'
  | 'Ước mơ'
  | 'Cộng đồng'
  | 'Tình bạn'
  | 'Gia đình'
  | 'Học đường'
  | 'Nghị lực'
  | 'Lòng biết ơn'
  | 'Bảo vệ môi trường'
  | 'Hiếu thảo';

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery?: string[];
  province: string;
  region: RegionType;
  latitude: number;
  longitude: number;
  category: StoryCategory;
  tags: string[];
  message: string; // "Thông điệp trắc ẩn / Điều LUMI muốn gửi đến bạn"
  sourceName: string; // Tên báo chí / nguồn
  sourceUrl: string; // URL nguồn gốc
  sourcePublishDate: string;
  author?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  version?: number;
  updatedBy?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StorySubmission {
  id: string;
  userId?: string;
  authorName: string;
  title: string;
  content: string;
  province: string;
  sourceUrl?: string;
  sourceName?: string;
  message?: string;
  imageUrl?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'converted_to_story';
  reviewedAt?: string;
  reviewedBy?: string;
  feedback?: string;
}

export interface SongInfo {
  id: string;
  title: string;
  slug: string;
  artist: string;
  composer: string;
  coverImage: string;
  youtubeId: string;
  audioUrl?: string;
  releaseDate: string;
  description: string;
  message: string;
  lyrics: Array<{
    time?: string;
    text: string;
    emphasis?: boolean;
  }>;
  credits: {
    production: string;
    vocals: string;
    lyricsBy: string;
    visualDesign: string;
    specialThanks: string;
  };
  behindTheScenes: string;
}

export type LetterCategory = 
  | 'Cảm ơn'
  | 'Xin lỗi'
  | 'Động viên'
  | 'Yêu thương'
  | 'Lời chúc'
  | 'Tâm sự'
  | 'Gửi một người đặc biệt'
  | 'Khác';

export interface Letter {
  id: string;
  userId?: string;
  senderName: string;
  isAnonymous: boolean;
  category: LetterCategory;
  content: string;
  targetPerson?: string;
  createdAt: string;
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
  replyFromLumi?: string;
  colorTheme?: 'rose' | 'amber' | 'sky' | 'emerald' | 'purple';
  isPublic?: boolean;
}

export type GalleryCategory = 
  | 'Câu chuyện tử tế'
  | 'Hình ảnh câu chuyện'
  | 'Hình ảnh hoạt động'
  | 'Poster truyền thông'
  | 'Infographic'
  | 'Truyện tranh'
  | 'Sản phẩm truyền thông'
  | 'Hoạt động dự án';

export interface GalleryMediaItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  imageUrl: string;
  thumbnailUrl?: string;
  date: string;
  credit: string;
  source?: string;
  likes: number;
  tags: string[];
}

export interface PhotovoiceItem {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  authorGrade: 'Khối 10' | 'Khối 11' | 'Khối 12' | 'Cựu học sinh / Khác';
  school: string;
  storyText: string;
  reflectionPrompt: string;
  submittedAt: string;
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ComicChoice {
  id: string;
  text: string;
  empathyScore: number;
  feedback: {
    immediateReaction: string;
    emotionalImpact: string;
    lumiGuidance: string;
  };
  nextScenarioId?: string;
}

export interface ComicScenario {
  id: string;
  chapterNumber: number;
  title: string;
  situation: string;
  dialogue?: string;
  illustration: string;
  characterState: string;
  choices: ComicChoice[];
}

export interface ComicStory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  author: string;
  scenarios: ComicScenario[];
}

export interface DemographicInfo {
  grade: 'Khối 10' | 'Khối 11' | 'Khối 12';
  gender: 'Nam' | 'Nữ';
  socialMediaTime: 'Dưới 1 giờ' | 'Từ 1 – dưới 3 giờ' | 'Từ 3 – dưới 5 giờ' | 'Trên 5 giờ';
  primaryPlatform: 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram' | 'Khác';
  otherPlatform?: string;
}

export interface SurveySubmission {
  id: string;
  surveyType: 'pre-test' | 'post-test';
  demographics: DemographicInfo;
  ndScores: { [key: string]: number };
  txScores: { [key: string]: number };
  taScores: { [key: string]: number };
  averageND: number;
  averageTX: number;
  averageTA: number;
  submittedAt: string;
}

export interface ExhibitionRoom {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  bannerImage: string;
  description: string;
  items: Array<{
    id: string;
    title: string;
    subtitle: string;
    mediaUrl: string;
    mediaType: 'image' | 'audio' | 'video' | 'text';
    content: string;
    quote?: string;
  }>;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video' | 'audio';
  alt: string;
  caption: string;
  credit: string;
  source: string;
  createdAt: string;
  size?: string;
}

export interface ProvinceData {
  id: string;
  name: string;
  slug: string;
  region: RegionType;
  latitude: number;
  longitude: number;
  storyCount: number;
}

export interface KindnessPoint {
  id: string;
  title: string;
  province: string;
  region: RegionType;
  latitude: number;
  longitude: number;
  address?: string;
  description: string;
  storyTitle?: string;
  storyCount?: number;
  createdAt?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  code: string;
  category: 'Khoa học hành vi' | 'Khảo sát thực nghiệm' | 'Giải pháp can thiệp' | 'Báo cáo SPSS' | 'Tài liệu tham khảo';
  sampleSize?: string;
  author: string;
  spssScore?: string;
  description: string;
  downloadUrl?: string;
  publishedDate?: string;
  status: 'published' | 'draft';
}

export interface UserNotification {
  id: string;
  userId: string;
  type: 'story_approved' | 'letter_approved' | 'new_story' | 'system';
  title: string;
  message: string;
  targetUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityTitle: string;
  timestamp: string;
  details?: string;
}

export interface SiteSettings {
  isMaintenanceMode: boolean;
  siteName: string;
  slogan: string;
  contactEmail: string;
  contactPhone: string;
  announcementText?: string;
}

export type ActiveNavPage = 
  | 'home'
  | 'stories'
  | 'story-detail'
  | 'music'
  | 'letters'
  | 'gallery'
  | 'map'
  | 'research'
  | 'submit-story'
  | 'photovoice'
  | 'comic'
  | 'survey'
  | 'exhibition'
  | 'admin'
  | 'profile'
  | 'dang-nhap';
