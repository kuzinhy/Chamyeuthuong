import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 1. Centralized Super Admin Configuration
const DEFAULT_SUPER_ADMIN_EMAILS = [
  'nguyenhuy.thudaumot@gmail.com',
  'hoanghuutrung1@gmail.com'
];

function getSuperAdminEmails(): string[] {
  if (process.env.SUPER_ADMIN_EMAILS) {
    return process.env.SUPER_ADMIN_EMAILS.split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);
  }
  return DEFAULT_SUPER_ADMIN_EMAILS;
}

function isSuperAdmin(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return getSuperAdminEmails().includes(cleanEmail);
}

// 2. Persistent Storage File Setup
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'lumi_db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServerDB {
  stories: any[];
  letters: any[];
  submissions: any[];
  auditLogs: any[];
  users: any[];
  settings: any;
  gallery: any[];
  music: any[];
  mapPoints: any[];
  research: any[];
}

const defaultGallerySeed = [
  {
    id: 'gal-1',
    title: 'Poster Chiến Dịch: Chạm – Ngừng Vô Cảm, Mở Yêu Thương',
    description: 'Sản phẩm truyền thông thị giác chính của dự án, sử dụng kỹ thuật typography tương phản và ánh sáng dịu nhẹ.',
    category: 'Sản phẩm truyền thông',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    date: '10/2024',
    credit: 'Ban Thiết Kế LUMI (Design by ng.m.huy)',
    source: 'Dự án Khoa học Hành vi THPT Nguyễn Du',
    likes: 184,
    tags: ['Poster', 'Truyền thông thị giác', 'Thông điệp nhân văn']
  },
  {
    id: 'gal-2',
    title: 'Bộ Truyện Tranh 4 Khung: "Chiếc Ô Ngày Mưa"',
    description: 'Tác phẩm truyện tranh kỹ thuật số kể về câu chuyện chia sẻ chiếc ô giữa giờ tan trường.',
    category: 'Truyện tranh',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    date: '09/2024',
    credit: 'CLB Mỹ Thuật Trẻ THPT',
    source: 'Cuộc thi Sáng tác Truyện tranh Trắc ẩn',
    likes: 156,
    tags: ['Truyện tranh', 'Nét vẽ cảm xúc', 'Chia sẻ']
  },
  {
    id: 'gal-3',
    title: 'Khoảnh Khắc Cùng Bạn Vượt Dốc: Tình Bạn Tri Kỷ',
    description: 'Bức ảnh ghi lại khoảnh khắc thường nhật của hai bạn học sinh cõng nhau đến giảng đường.',
    category: 'Hình ảnh câu chuyện',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    date: '08/2024',
    credit: 'Ảnh tư liệu báo chí',
    source: 'Báo Tuổi Trẻ & Dự Án LUMI',
    likes: 210,
    tags: ['Khoảnh khắc có thật', 'Nghị lực sống', 'Tình bạn']
  },
  {
    id: 'gal-4',
    title: 'Workshop Trải Nghiệm Thấu Cảm Học Đường Khối 10-12',
    description: 'Buổi sinh hoạt chuyên đề với 300 học sinh THPT Nguyễn Du tham gia các trò chơi nhập vai.',
    category: 'Hình ảnh hoạt động',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    date: '10/2024',
    credit: 'Ban Truyền Thông THPT Nguyễn Du',
    source: 'Hoạt động ngoại khóa trải nghiệm',
    likes: 142,
    tags: ['Workshop', 'Thực nghiệm', 'Học sinh THPT']
  },
  {
    id: 'gal-5',
    title: 'Infographic: 5 Bước Chuyển Hóa Từ Thấu Cảm Sang Trắc Ẩn',
    description: 'Sơ đồ trực quan hóa quy trình tâm lý học hành vi: Quan sát → Cảm xúc → Thấu cảm → Trắc ẩn → Hành động.',
    category: 'Sản phẩm truyền thông',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    date: '09/2024',
    credit: 'Nhóm Nghiên Cứu LUMI',
    source: 'Cơ sở lý luận đề tài nghiên cứu',
    likes: 198,
    tags: ['Infographic', 'Tâm lý học', 'Hành vi trắc ẩn']
  }
];

const defaultMusicSeed = [
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

const defaultMapPointsSeed = [
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

const defaultResearchSeed = [
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

function loadDB(): ServerDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      let needsSave = false;

      if (!parsed.gallery || !Array.isArray(parsed.gallery)) {
        parsed.gallery = defaultGallerySeed;
        needsSave = true;
      }
      if (!parsed.music || !Array.isArray(parsed.music)) {
        parsed.music = defaultMusicSeed;
        needsSave = true;
      }
      if (!parsed.mapPoints || !Array.isArray(parsed.mapPoints)) {
        parsed.mapPoints = defaultMapPointsSeed;
        needsSave = true;
      }
      if (!parsed.research || !Array.isArray(parsed.research)) {
        parsed.research = defaultResearchSeed;
        needsSave = true;
      }
      if (needsSave) {
        saveDB(parsed);
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading lumi_db.json:', err);
  }

  // Initial seed database
  const initialSeed: ServerDB = {
    stories: [
      {
        id: 'story-1',
        slug: 'cau-be-nhat-ve-chai-tra-lai-vi-tien',
        title: 'Cậu bé nhặt ve chai trả lại ví tiền có 15 triệu đồng cho người đánh rơi',
        excerpt: 'Giữa cái nắng gắt của buổi trưa hè, cậu học trò nghèo không chút do dự chạy theo chiếc xe máy để trả lại chiếc ví vừa rơi...',
        content: 'Câu chuyện diễn ra tại ngã tư đường Hoàng Văn Thụ, TP. Thủ Dầu Một, Bình Dương. Em Nguyễn Văn Nam, học sinh lớp 10, trong lúc phụ giúp gia đình đã nhặt được một chiếc ví da màu đen bên trong có hơn 15 triệu đồng cùng nhiều giấy tờ tùy thân quan trọng. Không một chút đắn đo, Nam lập tức mang chiếc ví đến trụ sở Công an phường gần nhất để nhờ tìm và trao trả lại cho người bị mất.',
        message: 'Lòng trung thực không phụ thuộc vào hoàn cảnh giàu nghèo. Đó là viên ngọc quý sáng nhất trong tâm hồn của mỗi con người.',
        category: 'Trung thực',
        province: 'Bình Dương',
        region: 'south',
        coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: '2026-05-12',
        sourceName: 'Báo Tuổi Trẻ',
        sourceUrl: 'https://tuoitre.vn',
        sourcePublishDate: '2026-05-12',
        likes: 128,
        views: 1420,
        featured: true,
        status: 'published',
        author: 'LUMI Team',
        tags: ['Trung thực', 'Gương sáng', 'Bình Dương'],
        version: 1,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'story-2',
        slug: 'lop-hoc-0-dong-cua-nhom-hoc-sinh-chuyen',
        title: 'Lớp học 0 đồng cuối tuần của nhóm học sinh THPT Chuyên',
        excerpt: 'Cứ mỗi sáng Chủ nhật, căn phòng nhỏ tại nhà văn hóa khu phố lại rộn rã tiếng giảng bài của những "thầy cô giáo" tuổi 16, 17...',
        content: 'Dự án "Đom Đóm Thắp Sáng" do nhóm 8 bạn học sinh khối 11 sáng lập đã duy trì suốt hơn 8 tháng qua. Các bạn tình nguyện dạy kèm miễn phí môn Toán, Tiếng Anh và Kỹ năng sống cho hơn 30 em nhỏ có hoàn cảnh khó khăn tại làng chài ven sông. Bằng sự kiên nhẫn và tình yêu thương, các bạn đã giúp nhiều em tiến bộ rõ rệt trong học tập.',
        message: 'Tri thức khi được trao đi bằng cả tấm lòng sẽ trở thành ngọn đuốc thắp sáng tương lai của những mảnh đời kém may mắn.',
        category: 'Giúp đỡ cộng đồng',
        province: 'Đà Nẵng',
        region: 'central',
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        publishedAt: '2026-05-10',
        sourceName: 'Báo Dân Trí',
        sourceUrl: 'https://dantri.com.vn',
        sourcePublishDate: '2026-05-10',
        likes: 95,
        views: 980,
        featured: true,
        status: 'published',
        author: 'LUMI Team',
        tags: ['Giáo dục', 'Sẻ chia', 'Đà Nẵng'],
        version: 1,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'story-3',
        slug: 'chuyen-xe-yeu-thuong-cua-cau-hoc-tro-vung-cao',
        title: 'Chuyến xe yêu thương 5 năm cõng bạn khuyết tật đến trường',
        excerpt: 'Nắng cũng như mưa, suốt 5 năm ròng rã, đôi chân của Minh chính là đôi chân của Thắng trên con đường đồi dốc tìm con chữ...',
        content: 'Tại một điểm trường vùng cao thuộc tỉnh Hà Giang, câu chuyện cảm động về tình bạn đẹp giữa hai cậu học trò đã lan tỏa khắp cả nước. Thắng bị bại liệt từ nhỏ, gia đình lại khó khăn không có phương tiện đưa đón. Thấy bạn có nguy cơ phải nghỉ học, Minh đã tình nguyện mỗi ngày dậy từ 5 giờ sáng, đi bộ qua 3 ngọn đồi để cõng bạn đến lớp.',
        message: 'Tình bạn chân thành và sự thấu cảm có sức mạnh vượt qua mọi rào cản địa lý và nghịch cảnh cuộc sống.',
        category: 'Nghị lực',
        province: 'Hà Giang',
        region: 'north',
        coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        publishedAt: '2026-05-08',
        sourceName: 'Báo Thanh Niên',
        sourceUrl: 'https://thanhnien.vn',
        sourcePublishDate: '2026-05-08',
        likes: 215,
        views: 2340,
        featured: true,
        status: 'published',
        author: 'LUMI Team',
        tags: ['Nghị lực', 'Tình bạn', 'Hà Giang'],
        version: 1,
        updatedAt: new Date().toISOString()
      }
    ],
    letters: [
      {
        id: 'letter-1',
        senderName: 'Một người bạn giấu tên',
        isAnonymous: true,
        category: 'Động viên',
        content: 'Gửi cậu, người bạn ngồi cùng bàn hôm nay bỗng dưng im lặng. Tớ biết cậu đang chịu nhiều áp lực vì kỳ thi sắp tới. Hãy nhớ rằng kết quả thi không định nghĩa giá trị con người cậu. Cậu đã luôn cố gắng hết mình rồi, cố lên nhé! Có tớ ở đây cùng cậu.',
        targetPerson: 'Bạn cùng bàn lớp 11A2',
        createdAt: '2026-05-15 09:30',
        likes: 42,
        status: 'approved',
        replyFromLumi: 'Cảm ơn cậu đã tinh tế nhận ra nỗi buồn của bạn. Một lời động viên kịp thời lúc này chính là chiếc ô che mát tâm hồn bạn ấy đấy!',
        colorTheme: 'sky'
      },
      {
        id: 'letter-2',
        senderName: 'Minh Anh',
        isAnonymous: false,
        category: 'Xin lỗi',
        content: 'Tớ xin lỗi vì tuần trước đã vô tình cười đùa khi thấy cậu bị điểm kém. Tớ nhận ra hành động vô tư của mình đã khiến cậu tổn thương. Tớ thực sự rất hối hận và mong cậu cho tớ cơ hội được xin lỗi trực tiếp.',
        targetPerson: 'Gửi Tuấn Dũng',
        createdAt: '2026-05-14 16:45',
        likes: 29,
        status: 'approved',
        replyFromLumi: 'Dũng cảm nói lời xin lỗi là bước đầu tiên để hàn gắn những vết thương vô hình. LUMI tin bạn ấy sẽ cảm nhận được sự chân thành của cậu.',
        colorTheme: 'amber'
      }
    ],
    submissions: [
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
      }
    ],
    auditLogs: [
      {
        id: 'audit-init-1',
        userId: 'admin-nguyenhuy',
        email: 'nguyenhuy.thudaumot@gmail.com',
        action: 'PUBLISH_POST',
        entityType: 'story',
        entityId: 'story-1',
        entityTitle: 'Cậu bé nhặt ve chai trả lại ví tiền có 15 triệu đồng',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'audit-init-2',
        userId: 'admin-hoanghuutrung',
        email: 'hoanghuutrung1@gmail.com',
        action: 'UPDATE_POST',
        entityType: 'story',
        entityId: 'story-2',
        entityTitle: 'Lớp học 0 đồng cuối tuần của nhóm học sinh THPT Chuyên',
        timestamp: new Date().toISOString()
      }
    ],
    users: [
      {
        id: 'usr-admin-1',
        email: 'nguyenhuy.thudaumot@gmail.com',
        displayName: 'Nguyễn Huy',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        role: 'SUPER_ADMIN',
        is_protected_admin: true,
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        lastLoginAt: new Date().toISOString()
      },
      {
        id: 'usr-admin-2',
        email: 'hoanghuutrung1@gmail.com',
        displayName: 'Hoàng Hữu Trung',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
        role: 'SUPER_ADMIN',
        is_protected_admin: true,
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        lastLoginAt: new Date().toISOString()
      }
    ],
    settings: {
      siteName: 'LUMI – LAN TỎA LÒNG TRẮC ẨN',
      slogan: 'Nhìn bằng trái tim – Hành động bằng yêu thương',
      allowSubmissions: true,
      maintenanceMode: false
    },
    gallery: [],
    music: [],
    mapPoints: [],
    research: []
  };

  saveDB(initialSeed);
  return initialSeed;
}

function saveDB(data: ServerDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving lumi_db.json:', err);
  }
}

// In-Memory Presence store
const activePresences: Map<string, { email: string; name: string; lastSeen: number; activePage?: string; editingStoryId?: string }> = new Map();

// Helper to log audit events
function logAudit(email: string, action: string, entityType: string, entityId: string, entityTitle?: string, details?: any) {
  const db = loadDB();
  const newLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: email,
    email: email.trim().toLowerCase(),
    action,
    entityType,
    entityId,
    entityTitle: entityTitle || entityId,
    details,
    timestamp: new Date().toISOString()
  };
  db.auditLogs.unshift(newLog);
  if (db.auditLogs.length > 200) db.auditLogs = db.auditLogs.slice(0, 200);
  saveDB(db);
}

// 3. Middlewares
function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const userEmail = (req.headers['x-user-email'] as string) || (req.body && req.body.operatorEmail);

  if (!userEmail) {
    return res.status(401).json({ error: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập tài khoản.' });
  }

  const normalized = userEmail.trim().toLowerCase();
  if (!isSuperAdmin(normalized)) {
    return res.status(403).json({ 
      error: 'FORBIDDEN', 
      message: 'Tài khoản của bạn không có quyền truy cập khu vực quản trị.' 
    });
  }

  (req as any).userEmail = normalized;
  next();
}

// ==========================================
// 4. API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Admin Presence Heartbeat
app.post('/api/auth/presence', (req, res) => {
  const { email, name, activePage, editingStoryId } = req.body;
  if (email) {
    const cleanEmail = email.trim().toLowerCase();
    activePresences.set(cleanEmail, {
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0],
      lastSeen: Date.now(),
      activePage,
      editingStoryId
    });
  }

  // Cleanup presences older than 45 seconds
  const now = Date.now();
  for (const [key, item] of activePresences.entries()) {
    if (now - item.lastSeen > 45000) {
      activePresences.delete(key);
    }
  }

  const onlineList = Array.from(activePresences.values());
  res.json({ onlineAdmins: onlineList });
});

// Google Authentication / Session Exchange
app.post('/api/auth/google-login', (req, res) => {
  const { email, displayName, avatarUrl } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email là bắt buộc.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = loadDB();

  // Role determination strictly server-side
  const isSuper = isSuperAdmin(cleanEmail);
  const assignedRole = isSuper ? 'SUPER_ADMIN' : 'MEMBER';

  let userProfile = db.users.find(u => u.email === cleanEmail);
  const now = new Date().toISOString();

  if (!userProfile) {
    userProfile = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      displayName: displayName || (isSuper ? (cleanEmail.includes('nguyenhuy') ? 'Nguyễn Huy' : 'Hoàng Hữu Trung') : cleanEmail.split('@')[0]),
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      role: assignedRole,
      is_protected_admin: isSuper,
      status: 'active',
      createdAt: now,
      lastLoginAt: now
    };
    db.users.push(userProfile);
  } else {
    // Preserve protected super admins
    userProfile.role = assignedRole;
    userProfile.is_protected_admin = isSuper;
    userProfile.lastLoginAt = now;
    if (displayName) userProfile.displayName = displayName;
    if (avatarUrl) userProfile.avatarUrl = avatarUrl;
  }

  saveDB(db);

  // Return sanitized session
  res.json({
    user: userProfile,
    role: assignedRole,
    isSuperAdmin: isSuper,
    redirectUrl: isSuper ? '/admin' : '/'
  });
});

// GET Stories (Public sees published, Admins see all)
app.get('/api/stories', (req, res) => {
  const db = loadDB();
  const userEmail = req.headers['x-user-email'] as string;
  const isAdminRequest = isSuperAdmin(userEmail);

  if (isAdminRequest) {
    res.json(db.stories);
  } else {
    const published = db.stories.filter(s => s.status === 'published');
    res.json(published);
  }
});

// CREATE Story (Super Admin only)
app.post('/api/stories', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const storyData = req.body;

  const newStory = {
    ...storyData,
    id: storyData.id || `story-${Date.now()}`,
    slug: storyData.slug || (storyData.title ? storyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `story-${Date.now()}`),
    likes: storyData.likes || 0,
    views: storyData.views || 0,
    publishedAt: storyData.publishedAt || new Date().toISOString().split('T')[0],
    version: 1,
    updatedAt: new Date().toISOString(),
    createdBy: operatorEmail
  };

  db.stories.unshift(newStory);
  saveDB(db);

  logAudit(operatorEmail, newStory.status === 'published' ? 'PUBLISH_POST' : 'CREATE_DRAFT', 'story', newStory.id, newStory.title);

  res.status(201).json(newStory);
});

// UPDATE Story (Super Admin only, with Conflict Handling)
app.put('/api/stories/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const updates = req.body;
  const expectedVersion = updates.expectedVersion;
  const forceOverwrite = updates.forceOverwrite === true;

  const index = db.stories.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy câu chuyện.' });
  }

  const currentStory = db.stories[index];

  // Conflict Handling Check:
  // If expectedVersion is specified and current version is newer
  if (expectedVersion !== undefined && currentStory.version > expectedVersion && !forceOverwrite) {
    return res.status(409).json({
      error: 'CONFLICT',
      currentVersion: currentStory.version,
      currentStory,
      message: `Bài viết này vừa được quản trị viên khác (${currentStory.updatedBy || 'Quản trị viên'}) cập nhật.`
    });
  }

  const nextVersion = (currentStory.version || 1) + 1;
  const updatedStory = {
    ...currentStory,
    ...updates,
    version: nextVersion,
    updatedAt: new Date().toISOString(),
    updatedBy: operatorEmail
  };

  delete updatedStory.expectedVersion;
  delete updatedStory.forceOverwrite;

  db.stories[index] = updatedStory;
  saveDB(db);

  logAudit(operatorEmail, 'UPDATE_POST', 'story', updatedStory.id, updatedStory.title, {
    version: nextVersion,
    forced: forceOverwrite
  });

  res.json(updatedStory);
});

// DELETE Story (Super Admin only)
app.delete('/api/stories/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;

  const target = db.stories.find(s => s.id === id);
  if (!target) {
    return res.status(404).json({ error: 'NOT_FOUND' });
  }

  db.stories = db.stories.filter(s => s.id !== id);
  saveDB(db);

  logAudit(operatorEmail, 'DELETE_POST', 'story', id, target.title);
  res.json({ success: true, deletedId: id });
});

// Public interaction: Like Story
app.post('/api/stories/:id/like', (req, res) => {
  const db = loadDB();
  const { id } = req.params;
  const story = db.stories.find(s => s.id === id);
  if (story) {
    story.likes = (story.likes || 0) + 1;
    saveDB(db);
    return res.json({ likes: story.likes });
  }
  res.status(404).json({ error: 'NOT_FOUND' });
});

// Public interaction: View Story
app.post('/api/stories/:id/view', (req, res) => {
  const db = loadDB();
  const { id } = req.params;
  const story = db.stories.find(s => s.id === id);
  if (story) {
    story.views = (story.views || 0) + 1;
    saveDB(db);
    return res.json({ views: story.views });
  }
  res.status(404).json({ error: 'NOT_FOUND' });
});

// GET Letters
app.get('/api/letters', (req, res) => {
  const db = loadDB();
  const userEmail = req.headers['x-user-email'] as string;
  const isAdminRequest = isSuperAdmin(userEmail);

  if (isAdminRequest) {
    res.json(db.letters);
  } else {
    res.json(db.letters.filter(l => l.status === 'approved'));
  }
});

// POST Submit Letter (Public)
app.post('/api/letters', (req, res) => {
  const db = loadDB();
  const letterData = req.body;
  const newLetter = {
    id: `letter-${Date.now()}`,
    senderName: letterData.senderName || 'Học sinh ẩn danh',
    isAnonymous: !!letterData.isAnonymous,
    category: letterData.category || 'Yêu thương',
    content: letterData.content,
    targetPerson: letterData.targetPerson || 'Gửi tất cả mọi người',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    likes: 0,
    status: 'approved', // Auto-approved for friendly demo & instant public joy
    replyFromLumi: 'Cảm ơn bạn đã trao gửi những lời yêu thương ấm áp đến không gian LUMI.',
    colorTheme: letterData.colorTheme || 'sky'
  };

  db.letters.unshift(newLetter);
  saveDB(db);
  res.status(201).json(newLetter);
});

// PUT Letter moderation (Admin only)
app.put('/api/letters/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const { status, replyFromLumi } = req.body;

  const letter = db.letters.find(l => l.id === id);
  if (!letter) return res.status(404).json({ error: 'NOT_FOUND' });

  if (status) letter.status = status;
  if (replyFromLumi !== undefined) letter.replyFromLumi = replyFromLumi;

  saveDB(db);
  logAudit(operatorEmail, 'MODERATE_LETTER', 'letter', id, `Lá thư từ ${letter.senderName}`);
  res.json(letter);
});

// DELETE Letter (Admin only)
app.delete('/api/letters/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;

  db.letters = db.letters.filter(l => l.id !== id);
  saveDB(db);
  logAudit(operatorEmail, 'DELETE_LETTER', 'letter', id);
  res.json({ success: true });
});

// GET Submissions (Admin only)
app.get('/api/submissions', authenticateAdmin, (req, res) => {
  const db = loadDB();
  res.json(db.submissions);
});

// POST Story Submission (Public)
app.post('/api/submissions', (req, res) => {
  const db = loadDB();
  const subData = req.body;
  const newSub = {
    id: `sub-${Date.now()}`,
    authorName: subData.authorName || 'Học sinh',
    title: subData.title,
    content: subData.content,
    province: subData.province || 'Hà Nội',
    sourceName: subData.sourceName || 'Học sinh chia sẻ',
    message: subData.message || '',
    imageUrl: subData.imageUrl || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'pending'
  };

  db.submissions.unshift(newSub);
  saveDB(db);
  res.status(201).json(newSub);
});

// CONVERT Submission to Story (Admin only)
app.post('/api/submissions/:id/convert', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;

  const subIndex = db.submissions.findIndex(s => s.id === id);
  if (subIndex === -1) return res.status(404).json({ error: 'NOT_FOUND' });

  const sub = db.submissions[subIndex];
  sub.status = 'converted_to_story';

  const newStory = {
    id: `story-${Date.now()}`,
    slug: sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: sub.title,
    excerpt: sub.content.substring(0, 160) + '...',
    content: sub.content,
    message: sub.message || 'Mỗi hành động tử tế là một hạt mầm thiện lương được gieo vào cuộc sống.',
    category: 'Chia sẻ',
    province: sub.province,
    region: 'central',
    coverImage: sub.imageUrl,
    publishedAt: new Date().toISOString().split('T')[0],
    sourceName: sub.sourceName,
    sourceUrl: '#',
    sourcePublishDate: new Date().toISOString().split('T')[0],
    likes: 0,
    views: 0,
    featured: false,
    status: 'published',
    author: sub.authorName,
    tags: ['Kể LUMI Nghe', sub.province],
    version: 1,
    updatedAt: new Date().toISOString(),
    createdBy: operatorEmail
  };

  db.stories.unshift(newStory);
  saveDB(db);

  logAudit(operatorEmail, 'CONVERT_SUBMISSION', 'story', newStory.id, newStory.title);
  res.json({ submission: sub, story: newStory });
});

// GET Audit Logs (Admin only)
app.get('/api/audit-logs', authenticateAdmin, (req, res) => {
  const db = loadDB();
  res.json(db.auditLogs);
});

// GET Users (Admin only)
app.get('/api/users', authenticateAdmin, (req, res) => {
  const db = loadDB();
  res.json(db.users);
});

// ==========================================
// GALLERY CRUD ENDPOINTS
// ==========================================
app.get('/api/gallery', (req, res) => {
  const db = loadDB();
  res.json(db.gallery || []);
});

app.post('/api/gallery', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const item = req.body;
  const newItem = {
    ...item,
    id: item.id || `gal-${Date.now()}`,
    likes: item.likes || 0,
    date: item.date || new Date().toLocaleDateString('vi-VN')
  };
  if (!db.gallery) db.gallery = [];
  db.gallery.unshift(newItem);
  saveDB(db);
  logAudit(operatorEmail, 'CREATE_MEDIA', 'gallery', newItem.id, newItem.title);
  res.status(201).json(newItem);
});

app.put('/api/gallery/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const updates = req.body;
  const index = (db.gallery || []).findIndex(g => g.id === id);
  if (index === -1) return res.status(404).json({ error: 'NOT_FOUND' });

  db.gallery[index] = { ...db.gallery[index], ...updates };
  saveDB(db);
  logAudit(operatorEmail, 'UPDATE_MEDIA', 'gallery', id, db.gallery[index].title);
  res.json(db.gallery[index]);
});

app.delete('/api/gallery/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const item = (db.gallery || []).find(g => g.id === id);
  db.gallery = (db.gallery || []).filter(g => g.id !== id);
  saveDB(db);
  logAudit(operatorEmail, 'DELETE_MEDIA', 'gallery', id, item?.title);
  res.json({ success: true, deletedId: id });
});

// ==========================================
// MUSIC CRUD ENDPOINTS
// ==========================================
app.get('/api/music', (req, res) => {
  const db = loadDB();
  res.json(db.music || []);
});

app.post('/api/music', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const item = req.body;
  const newSong = {
    ...item,
    id: item.id || `song-${Date.now()}`,
    frequency: item.frequency || '432Hz',
    status: item.status || 'published'
  };
  if (!db.music) db.music = [];
  db.music.unshift(newSong);
  saveDB(db);
  logAudit(operatorEmail, 'CREATE_SONG', 'music', newSong.id, newSong.title);
  res.status(201).json(newSong);
});

app.put('/api/music/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const updates = req.body;
  const index = (db.music || []).findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'NOT_FOUND' });

  db.music[index] = { ...db.music[index], ...updates };
  saveDB(db);
  logAudit(operatorEmail, 'UPDATE_SONG', 'music', id, db.music[index].title);
  res.json(db.music[index]);
});

app.delete('/api/music/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const song = (db.music || []).find(m => m.id === id);
  db.music = (db.music || []).filter(m => m.id !== id);
  saveDB(db);
  logAudit(operatorEmail, 'DELETE_SONG', 'music', id, song?.title);
  res.json({ success: true, deletedId: id });
});

// ==========================================
// MAP POINTS CRUD ENDPOINTS
// ==========================================
app.get('/api/map-points', (req, res) => {
  const db = loadDB();
  res.json(db.mapPoints || []);
});

app.post('/api/map-points', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const item = req.body;
  const newPoint = {
    ...item,
    id: item.id || `point-${Date.now()}`,
    storyCount: item.storyCount || 1,
    createdAt: new Date().toISOString()
  };
  if (!db.mapPoints) db.mapPoints = [];
  db.mapPoints.unshift(newPoint);
  saveDB(db);
  logAudit(operatorEmail, 'CREATE_MAP_POINT', 'mapPoint', newPoint.id, newPoint.title);
  res.status(201).json(newPoint);
});

app.put('/api/map-points/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const updates = req.body;
  const index = (db.mapPoints || []).findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'NOT_FOUND' });

  db.mapPoints[index] = { ...db.mapPoints[index], ...updates };
  saveDB(db);
  logAudit(operatorEmail, 'UPDATE_MAP_POINT', 'mapPoint', id, db.mapPoints[index].title);
  res.json(db.mapPoints[index]);
});

app.delete('/api/map-points/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const point = (db.mapPoints || []).find(p => p.id === id);
  db.mapPoints = (db.mapPoints || []).filter(p => p.id !== id);
  saveDB(db);
  logAudit(operatorEmail, 'DELETE_MAP_POINT', 'mapPoint', id, point?.title);
  res.json({ success: true, deletedId: id });
});

// ==========================================
// RESEARCH CRUD ENDPOINTS
// ==========================================
app.get('/api/research', (req, res) => {
  const db = loadDB();
  res.json(db.research || []);
});

app.post('/api/research', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const item = req.body;
  const newItem = {
    ...item,
    id: item.id || `res-${Date.now()}`,
    publishedDate: item.publishedDate || new Date().toISOString().split('T')[0],
    status: item.status || 'published'
  };
  if (!db.research) db.research = [];
  db.research.unshift(newItem);
  saveDB(db);
  logAudit(operatorEmail, 'CREATE_RESEARCH', 'research', newItem.id, newItem.title);
  res.status(201).json(newItem);
});

app.put('/api/research/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const updates = req.body;
  const index = (db.research || []).findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'NOT_FOUND' });

  db.research[index] = { ...db.research[index], ...updates };
  saveDB(db);
  logAudit(operatorEmail, 'UPDATE_RESEARCH', 'research', id, db.research[index].title);
  res.json(db.research[index]);
});

app.delete('/api/research/:id', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  const { id } = req.params;
  const item = (db.research || []).find(r => r.id === id);
  db.research = (db.research || []).filter(r => r.id !== id);
  saveDB(db);
  logAudit(operatorEmail, 'DELETE_RESEARCH', 'research', id, item?.title);
  res.json({ success: true, deletedId: id });
});

// ==========================================
// SETTINGS ENDPOINTS
// ==========================================
app.get('/api/settings', (req, res) => {
  const db = loadDB();
  res.json(db.settings || {});
});

app.put('/api/settings', authenticateAdmin, (req, res) => {
  const db = loadDB();
  const operatorEmail = (req as any).userEmail;
  db.settings = { ...db.settings, ...req.body };
  saveDB(db);
  logAudit(operatorEmail, 'UPDATE_SETTINGS', 'settings', 'global', 'Cấu hình chung website');
  res.json(db.settings);
});

// ==========================================
// 5. VITE INTEGRATION & SERVER STARTUP
// ==========================================
async function startServer() {
  // Initial database check
  loadDB();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LUMI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
