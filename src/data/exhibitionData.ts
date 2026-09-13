import { ExhibitionRoom } from '../types';

export const exhibitionRooms: ExhibitionRoom[] = [
  {
    id: 'room-stories',
    name: 'Phòng Câu Chuyện',
    subtitle: 'Nơi lưu giữ những bước chân tử tế',
    icon: 'BookOpen',
    themeColor: 'rose',
    bannerImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    description: 'Không gian tôn vinh những tấm gương học trò và câu chuyện tình bạn diệu kỳ trên dải đất hình chữ S.',
    items: [
      {
        id: 'ex-s1',
        title: 'Thập Kỷ Bước Cùng Bạn',
        subtitle: 'Thanh Hóa • 10 Năm Cõng Bạn',
        mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        content: 'Một tình bạn không khoảng cách, vượt qua dị tật thể xác bằng sự kiên định của đôi vai gầy và trái tim son sắt.',
        quote: '“Khi cậu cần một đôi chân, tớ sẽ luôn là người bước cạnh.”'
      },
      {
        id: 'ex-s2',
        title: 'Ánh Lửa Bên Bờ Sông Hồng',
        subtitle: 'Hà Nội • Lớp Học 0 Đồng',
        mediaUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        content: 'Những trang vở thơm mùi mực mới mang hy vọng đến cho các em nhỏ xóm chài giữa lòng thủ đô.',
        quote: '“Mỗi con chữ trao đi là một cánh cửa tương lai mở ra.”'
      }
    ]
  },
  {
    id: 'room-visuals',
    name: 'Phòng Hình Ảnh & Poster',
    subtitle: 'Ngôn ngữ của thị giác và xúc cảm',
    icon: 'Image',
    themeColor: 'sky',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description: 'Triển lãm các tác phẩm thiết kế đồ họa, poster can thiệp tâm lý và infographic thấu cảm.',
    items: [
      {
        id: 'ex-v1',
        title: 'Poster "Chạm"',
        subtitle: 'Visual Communication Campaign',
        mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        content: 'Thiết kế đoạt giải truyền thông học đường với sự tương phản giữa vùng bóng tối vô cảm và ánh sáng trắc ẩn.',
        quote: '“Nhìn bằng trái tim – Hành động bằng yêu thương.”'
      }
    ]
  },
  {
    id: 'room-photovoice',
    name: 'Phòng Photovoice',
    subtitle: 'Góc nhìn chân thật từ ống kính học sinh',
    icon: 'Camera',
    themeColor: 'amber',
    bannerImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    description: 'Nơi tiếng nói của các bạn học sinh được cất lên qua từng khung hình chụp lại thực trạng học đường.',
    items: [
      {
        id: 'ex-p1',
        title: 'Góc Căng Tin Vắng Bóng',
        subtitle: 'Ảnh chụp của học sinh lớp 11',
        mediaUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        content: 'Khoảnh khắc phản ánh sự cô lập vô hình giữa đám đông ồn ào giờ ra chơi.',
        quote: '“Một lời mời ngồi chung có thể sưởi ấm cả một ngày dài.”'
      }
    ]
  },
  {
    id: 'room-music',
    name: 'Phòng Âm Nhạc Trị Liệu',
    subtitle: 'Giai điệu kết nối những nhịp đập',
    icon: 'Music',
    themeColor: 'purple',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    description: 'Không gian lắng đọng với bản nhạc ballad xoa dịu tâm hồn và những giai điệu truyền cảm hứng.',
    items: [
      {
        id: 'ex-m1',
        title: 'MV "Điều Chưa Nói"',
        subtitle: 'Official Theme Song',
        mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        mediaType: 'audio',
        content: 'Bản phối acoustic nhẹ nhàng đưa người nghe chạm vào những góc sâu kín nhất của lòng trắc ẩn.',
        quote: '“Có tớ ở đây cùng cậu rồi, đừng sợ nhé.”'
      }
    ]
  },
  {
    id: 'room-unspoken',
    name: 'Phòng Điều Chưa Nói',
    subtitle: 'Chiếc hòm thư bí mật của những tâm tư',
    icon: 'Mail',
    themeColor: 'emerald',
    bannerImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    description: 'Nơi lưu giữ hàng trăm lá thư tay cảm ơn, xin lỗi và gửi gắm hy vọng của các bạn học sinh.',
    items: [
      {
        id: 'ex-u1',
        title: 'Hàng Trăm Bức Thư Tay',
        subtitle: 'Xoa Dịu Nỗi Đau Học Đường',
        mediaUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        mediaType: 'text',
        content: 'Những dòng chữ nắn nót xóa nhòa ranh giới vô cảm, mở ra những tình bạn chân thành mới.',
        quote: '“Cảm ơn cậu vì đã luôn kiên nhẫn lắng nghe tớ.”'
      }
    ]
  }
];
