import { 
  Story, 
  GalleryMediaItem, 
  PhotovoiceItem, 
  Letter, 
  SongInfo, 
  KindnessPoint, 
  ResearchItem,
  SiteSettings,
  StorySubmission
} from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    slug: 'cau-be-nhat-duoc-50-trieu-dong-tra-lai-nguoi-danh-roi',
    title: 'Học sinh lớp 11 nhặt được 50 triệu đồng trả lại người đánh rơi',
    excerpt: 'Em Nguyễn Văn Nam trên đường đi học về đã nhặt được chiếc ví chứa số tiền lớn và nhanh chóng tìm đến công an xã để bàn giao.',
    content: `Vào khoảng 17h chiều ngày 12/10, trên đoạn đường liên thôn thuộc xã Tân Lập, em Nguyễn Văn Nam (học sinh lớp 11A3, trường THPT Tân Lập) trong lúc đạp xe đi học về đã phát hiện một chiếc ví màu nâu rơi bên vệ đường.

Khi mở ra kiểm tra, Nam thấy bên trong có nhiều cọc tiền mệnh giá 500.000 đồng (tổng cộng 50 triệu đồng) cùng nhiều giấy tờ tùy thân quan trọng mang tên một tiểu thương tại chợ địa phương. Không một phút do dự, em đã đạp xe thẳng đến trụ sở Công an xã để nhờ các chiến sĩ tìm và trao trả lại cho người bị mất.

Nhận lại tài sản, người đánh rơi vô cùng xúc động và gửi lời cảm ơn chân thành đến em và gia đình, nhà trường.`,
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
    province: 'Bình Dương',
    region: 'Nam',
    latitude: 10.9805,
    longitude: 106.6519,
    category: 'Trung thực',
    tags: ['Trung thực', 'Gương sáng', 'Thanh thiếu niên'],
    message: 'Lòng trung thực là thước đo giá trị cao quý nhất của một con người. Một hành động tử tế nhỏ bé có thể thắp sáng niềm tin cho cả cộng đồng.',
    sourceName: 'Báo Tuổi Trẻ',
    sourceUrl: 'https://tuoitre.vn',
    sourcePublishDate: '2024-10-13',
    featured: true,
    status: 'published',
    views: 1420,
    likes: 384,
    readTime: '3 phút'
  },
  {
    id: 'story-2',
    slug: 'lop-hoc-0-dong-cua-co-gai-tre-vung-cao',
    title: 'Lớp học tình thương "0 đồng" gieo con chữ nơi rẻo cao Tây Bắc',
    excerpt: 'Suốt 3 năm qua, cô giáo trẻ cùng nhóm bạn tình nguyện đã kiên trì vượt dốc đèo đem tri thức và bữa cơm ấm đến cho trẻ em nghèo.',
    content: `Ẩn mình giữa những dãy núi mờ sương của tỉnh Hà Giang, lớp học tình thương do cô giáo Mai Hương thành lập đã trở thành mái ấm thứ hai của hơn 40 em nhỏ đồng bào dân tộc thiểu số. 

Mỗi buổi chiều cuối tuần, gian nhà sàn nhỏ lại rộn vang tiếng cười và tiếng đánh vần bi bô. Không chỉ dạy chữ, nhóm còn vận động tài trợ xây dựng tủ sách cộng đồng với hơn 1.000 đầu sách thiếu nhi và tổ chức các bữa trưa dinh dưỡng ấm cúng.`,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    province: 'Hà Giang',
    region: 'Bắc',
    latitude: 22.8233,
    longitude: 104.9839,
    category: 'Giúp đỡ cộng đồng',
    tags: ['Giáo dục', 'Tình nguyện', 'Vùng cao'],
    message: 'Yêu thương cho đi là yêu thương còn mãi. Tri thức và lòng nhân ái sẽ nâng cánh ước mơ cho những mầm non tương lai.',
    sourceName: 'Báo Thanh Niên',
    sourceUrl: 'https://thanhnien.vn',
    sourcePublishDate: '2024-09-20',
    featured: true,
    status: 'published',
    views: 2150,
    likes: 612,
    readTime: '4 phút'
  },
  {
    id: 'story-3',
    slug: 'nhom-ban-tre-cuu-tro-dong-bao-vung-lu-mien-trung',
    title: 'Biệt đội xuồng phao xuyên đêm cứu trợ bà con rốn lũ',
    excerpt: 'Những chàng trai tuổi mười tám đôi mươi đã không ngại nguy hiểm, xuyên màn đêm mưa lũ đưa lương thực và thuốc men đến từng nóc nhà bị cô lập.',
    content: `Trong đợt bão lũ lịch sử vừa qua tại miền Trung, nhóm bạn trẻ tình nguyện tại Quảng Trị đã thành lập đội phản ứng nhanh bằng xuồng hơi. Trong suốt 5 ngày đêm nước lũ dâng cao, nhóm đã trực tiếp tiếp cận và giải cứu an toàn cho hơn 20 hộ gia đình, đồng thời phân phát hơn 1.500 suất quà gồm bánh mì, nước uống và thuốc khử trùng nước.`,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    province: 'Quảng Trị',
    region: 'Trung',
    latitude: 16.75,
    longitude: 107.1856,
    category: 'Dũng cảm',
    tags: ['Dũng cảm', 'Cứu trợ', 'Lũ lụt'],
    message: 'Sức mạnh của tuổi trẻ tỏa sáng rực rỡ nhất khi được cống hiến vì sự an toàn và hạnh phúc của đồng bào mình.',
    sourceName: 'VnExpress',
    sourceUrl: 'https://vnexpress.net',
    sourcePublishDate: '2024-11-02',
    featured: false,
    status: 'published',
    views: 980,
    likes: 420,
    readTime: '3 phút'
  }
];

export const INITIAL_GALLERY: GalleryMediaItem[] = [
  {
    id: 'gallery-1',
    title: 'Bữa cơm trưa ấm áp tại trường vùng cao',
    description: 'Nụ cười rạng rỡ của các em học sinh khi được nhận những phần cơm ấm nóng từ các anh chị tình nguyện viên.',
    category: 'Hình ảnh hoạt động',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-15',
    credit: 'LUMI Team',
    likes: 128,
    tags: ['Tình nguyện', 'Trẻ em', 'Ấm áp']
  },
  {
    id: 'gallery-2',
    title: 'Đôi bạn cùng tiến vượt khó học giỏi',
    description: 'Bức ảnh ghi lại khoảnh khắc Minh cõng người bạn khiếm thị của mình qua cây cầu khỉ mỗi ngày đến trường.',
    category: 'Hình ảnh câu chuyện',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    date: '2024-09-28',
    credit: 'CLB Phóng viên trẻ',
    likes: 245,
    tags: ['Tình bạn', 'Nghị lực', 'Gương sáng']
  },
  {
    id: 'gallery-3',
    title: 'Poster: Lắng nghe bằng trái tim',
    description: 'Tác phẩm đạt giải Nhất cuộc thi thiết kế thông điệp trắc ẩn học đường THPT 2024.',
    category: 'Poster truyền thông',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    date: '2024-11-01',
    credit: 'Ban Truyền thông LUMI',
    likes: 310,
    tags: ['Truyền thông', 'Thiết kế', 'Trắc ẩn']
  }
];

export const INITIAL_PHOTOVOICE: PhotovoiceItem[] = [
  {
    id: 'pv-1',
    title: 'Góc sân trường và chiếc chổi của bác lao công',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Trần Minh Anh',
    authorGrade: 'Khối 11',
    school: 'THPT Chuyên Hùng Vương',
    storyText: 'Mỗi buổi sáng sớm, khi học sinh chúng em chưa đến trường, bác lao công đã cần mẫn quét từng chiếc lá bàng rơi. Em nhận ra sự thầm lặng ấy chính là lòng tận tụy đáng quý nhất.',
    reflectionPrompt: 'Bạn đã từng gửi một lời cảm ơn chân thành đến những người lao động thầm lặng xung quanh mình chưa?',
    submittedAt: '2024-10-18',
    likes: 89,
    status: 'approved'
  },
  {
    id: 'pv-2',
    title: 'Bàn tay gầy của ngoại và bài học sẻ chia',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Lê Hoàng Yến',
    authorGrade: 'Khối 12',
    school: 'THPT Nguyễn Trãi',
    storyText: 'Bức ảnh chụp bàn tay ngoại đang chia chiếc bánh mì cho cô bé bán vé số ngoài ngõ. Ngoại dạy em rằng: sẻ chia không phụ thuộc vào việc mình có nhiều hay ít, mà ở tấm lòng.',
    reflectionPrompt: 'Hành động yêu thương nào từ gia đình đã truyền cảm hứng sâu sắc nhất cho bạn?',
    submittedAt: '2024-10-22',
    likes: 134,
    status: 'approved'
  }
];

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'letter-1',
    senderName: 'Một bạn học sinh giấu tên',
    isAnonymous: true,
    category: 'Cảm ơn',
    content: 'Cảm ơn bạn tổ trưởng đã luôn kiên nhẫn giảng bài môn Toán cho mình sau mỗi giờ học. Nhờ có bạn mà mình đã không còn tự ti và đạt điểm tốt trong kỳ thi vừa qua!',
    createdAt: '2024-10-25',
    likes: 42,
    status: 'approved',
    replyFromLumi: 'Thật tuyệt vời khi tình bạn và sự hỗ trợ chân thành đã mang lại niềm tin lớn cho bạn. Hãy tiếp tục lan tỏa sự tử tế này nhé!',
    colorTheme: 'rose',
    isPublic: true
  },
  {
    id: 'letter-2',
    senderName: 'Khánh Linh',
    isAnonymous: false,
    category: 'Động viên',
    content: 'Gửi đến tất cả các bạn sĩ tử 2k7 đang chuẩn bị cho kỳ thi tốt nghiệp: Hãy vững tin vào bản thân, các bạn đã nỗ lực hết mình rồi!',
    createdAt: '2024-10-28',
    likes: 67,
    status: 'approved',
    replyFromLumi: 'Lời chúc ấm áp từ bạn chắc chắn sẽ tiếp thêm rất nhiều năng lượng tích cực cho các bạn học sinh!',
    colorTheme: 'sky',
    isPublic: true
  }
];

export const INITIAL_SONGS: SongInfo[] = [
  {
    id: 'song-1',
    title: 'Khúc Ca Trắc Ẩn – LUMI Song',
    slug: 'khuc-ca-trac-an-lumi',
    artist: 'Dàn hợp xướng LUMI Youth',
    composer: 'Nhạc sĩ Tuổi Trẻ & Dự án LUMI',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    youtubeId: 'dQw4w9WgXcQ',
    releaseDate: '2024-09-05',
    description: 'Bài hát chủ đề chính thức của dự án truyền thông giáo dục lòng trắc ẩn LUMI.',
    message: 'Hãy nhìn thế giới bằng đôi mắt thấu cảm và hành động bằng trái tim yêu thương.',
    lyrics: [
      { time: '0:15', text: 'Nhìn bằng trái tim, lắng nghe niềm thương' },
      { time: '0:30', text: 'Mỗi bước chân đi gieo ngàn hy vọng' },
      { time: '0:45', text: 'Nụ cười trao nhau xua tan giá lạnh', emphasis: true },
      { time: '1:00', text: 'Vì cuộc đời này đẹp biết bao khi có lòng trắc ẩn' }
    ],
    credits: {
      production: 'LUMI Studio',
      vocals: 'Thanh niên tình nguyện THPT',
      lyricsBy: 'Ban Cố vấn Dự án',
      visualDesign: 'Creative Arts LUMI',
      specialThanks: 'Ban Giám hiệu các trường THPT đối tác'
    },
    behindTheScenes: 'Ca khúc được thu âm và hoàn thiện với sự tham gia của hơn 50 học sinh THPT từ 10 tỉnh thành trên cả nước.'
  }
];

export const INITIAL_MAP_POINTS: KindnessPoint[] = [
  {
    id: 'point-1',
    title: 'Trạm bánh mì và nước uống miễn phí',
    province: 'TP. Hồ Chí Minh',
    region: 'Nam',
    latitude: 10.7769,
    longitude: 106.7009,
    address: 'Quận 1, TP. Hồ Chí Minh',
    description: 'Điểm cung cấp hơn 100 ổ bánh mì và bình nước mát mỗi ngày cho người lao động nghèo.',
    createdAt: '2024-10-01'
  },
  {
    id: 'point-2',
    title: 'Tủ sách trắc ẩn học đường',
    province: 'Hà Nội',
    region: 'Bắc',
    latitude: 21.0285,
    longitude: 105.8542,
    address: 'Trường THPT Chu Văn An, Hà Nội',
    description: 'Tủ sách do học sinh tự quản với hàng trăm cuốn sách kỹ năng sống và văn học nhân văn.',
    createdAt: '2024-09-15'
  }
];

export const INITIAL_RESEARCH: ResearchItem[] = [
  {
    id: 'res-1',
    title: 'Tác động của giáo dục lòng trắc ẩn đến hành vi giảm thiểu bạo lực học đường ở học sinh THPT',
    code: 'RES-LUMI-2024-01',
    category: 'Khoa học hành vi',
    sampleSize: '1.200 học sinh THPT',
    author: 'Nhóm Nghiên cứu Tâm lý Học đường LUMI',
    spssScore: 'Cronbach Alpha: 0.892, Sig < 0.001',
    description: 'Nghiên cứu khảo sát trên 1.200 học sinh THPT cho thấy các can thiệp thấu cảm giúp nâng cao chỉ số EQ và giảm 45% nguy cơ xung đột học đường.',
    downloadUrl: '#',
    publishedDate: '2024-10-15',
    status: 'published'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  isMaintenanceMode: false,
  siteName: 'LUMI – LAN TỎA LÒNG TRẮC ẨN',
  slogan: 'NHÌN BẰNG TRÁI TIM – HÀNH ĐỘNG BẰNG YÊU THƯƠNG',
  contactEmail: 'lumichamiuthuong@gmail.com',
  contactPhone: '0345824974',
  announcementText: 'Chào mừng các bạn học sinh THPT toàn quốc đến với không gian lan tỏa lòng trắc ẩn LUMI!'
};

export const INITIAL_SUBMISSIONS: StorySubmission[] = [];
