import { SongInfo } from '../types';

export const featuredSong: SongInfo = {
  id: 'song-dieu-chua-noi',
  slug: 'dieu-chua-noi',
  title: 'Điều Chưa Nói',
  artist: 'Dự Án LUMI x Nhóm Nhạc Học Sinh THPT Nguyễn Du',
  composer: 'Dự Án Khoa Học Hành Vi LUMI',
  coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  youtubeId: 'dQw4w9WgXcQ', // Default safe embed placeholder, can be customized in admin
  releaseDate: 'Tháng 10/2024',
  description: 'Ca khúc chủ đề chính thức của Chiến dịch LUMI – CHẠM IU THƯƠNG. Bản ballad nhẹ nhàng chạm vào những góc khuất tâm hồn của tuổi học trò, nơi có những nỗi đau thầm kín, sự cô lập và khát khao được lắng nghe, thấu cảm.',
  message: 'Đôi khi, điều một người bạn cần nhất không phải là lời phán xét hay những giải pháp đao to búa lớn, mà chỉ là một cái nắm tay ấm áp và câu nói: "Có tớ ở đây cùng cậu rồi". Hãy dũng cảm cất lên những điều chưa nói để yêu thương được kết nối.',
  lyrics: [
    { time: '00:15', text: 'Có những ngày sân trường bỗng thênh thang...', emphasis: false },
    { time: '00:23', text: 'Từng bước chân đi qua những tiếng cười rộn rã...', emphasis: false },
    { time: '00:32', text: 'Chỉ riêng một góc nhỏ ngồi lặng im trong bóng râm,', emphasis: true },
    { time: '00:40', text: 'Nụ cười gượng gạo giấu sau trang vở buồn.', emphasis: false },
    { time: '00:52', text: 'Ta bước vội qua nhau giữa dòng đời hối hả,', emphasis: false },
    { time: '01:01', text: 'Vô tình quên đi một ánh mắt đang nhìn theo.', emphasis: true },
    { time: '01:10', text: 'Một lời hỏi thăm ngỡ như là rất nhỏ,', emphasis: false },
    { time: '01:18', text: 'Sao lại ngập ngừng... để lại bao điều chưa nói?', emphasis: true },
    { time: '01:30', text: '[Điệp khúc] Nhìn bằng trái tim, sẽ thấy những vết xước vô hình,', emphasis: true },
    { time: '01:40', text: 'Hành động bằng yêu thương, xua tan mùa đông lạnh giá.', emphasis: true },
    { time: '01:50', text: 'Chạm nhẹ bờ vai, gửi một cái ôm thật thà,', emphasis: false },
    { time: '02:00', text: 'Để biết rằng giữa cuộc đời, bạn không hề đơn độc một mình.', emphasis: true },
    { time: '02:18', text: 'Lời xin lỗi muộn màng, lời cảm ơn sâu lắng...', emphasis: false },
    { time: '02:28', text: 'Hãy nói ra hôm nay, khi trái tim còn rung động.', emphasis: true },
    { time: '02:40', text: 'LUMI – Thắp sáng lên ngọn lửa của lòng trắc ẩn.', emphasis: true }
  ],
  credits: {
    production: 'Ban Truyền Thông & Khoa Học Hành Vi THPT Nguyễn Du',
    vocals: 'CLB Âm Nhạc Trẻ THPT Nguyễn Du',
    lyricsBy: 'Nhóm Nghiên Cứu LUMI',
    visualDesign: 'Dự án CHẠM IU THƯƠNG (Design by ng.m.huy)',
    specialThanks: 'Thầy Cô Tham Vấn Tâm Lý & 300 Học Sinh Khối 10-12'
  },
  behindTheScenes: 'Ca khúc được chắt lọc từ hơn 100 câu chuyện tâm sự có thật của các bạn học sinh từng trải qua cảm giác bị cô lập, tẩy chay học đường hoặc đối mặt với áp lực tâm lý. Quá trình sáng tác và thu âm kéo dài 3 tháng với sự tham gia nhiệt huyết của các bạn trẻ.'
};

export const songDetails = featuredSong;
