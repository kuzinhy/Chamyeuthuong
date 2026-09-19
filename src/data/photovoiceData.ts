import { PhotovoiceItem } from '../types';

export const initialPhotovoice: PhotovoiceItem[] = [
  {
    id: 'pv-1',
    title: 'Góc Căng Tin Vắng Bóng Một Người Bạn',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80',
    authorName: 'Nguyễn Thảo Nhi',
    authorGrade: 'Khối 11',
    school: 'Trường THPT',
    storyText: 'Bức ảnh chụp góc bàn ăn căng tin giờ ra chơi. Trong khi các bàn khác rộn ràng tiếng cười nói, có một bạn ngồi một mình cắm tai nghe và cặm cụi ăn thật nhanh. Mình chụp bức ảnh này vì từng thấy chính mình trong đó.',
    reflectionPrompt: 'Sự cô lập trong môi trường học đường không chỉ đến từ bạo lực thể xác, mà ẩn giấu trong chính sự vô tình lướt qua của chúng ta. Một lời mời ngồi chung có thể thay đổi cả một ngày của bạn ấy.',
    submittedAt: '12/10/2024',
    likes: 89,
    status: 'approved'
  },
  {
    id: 'pv-2',
    title: 'Vệt Mồ Hôi Của Bác Bảo Vệ Giờ Tan Trường',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    authorName: 'Trần Minh Khang',
    authorGrade: 'Khối 10',
    school: 'Trường THPT',
    storyText: 'Chiều mưa ngập trước cổng trường, bác bảo vệ một tay cầm ô che cho từng bạn học sinh lên xe buýt, lưng áo ướt sũng nước mưa. Mình bấm máy ngay khoảnh khắc bác nở nụ cười hiền hậu dù rất mệt.',
    reflectionPrompt: 'Lòng trắc ẩn không đòi hỏi điều gì vĩ đại. Đó là khi ta biết trân quý những hy sinh thầm lặng của những người xung quanh ta mỗi ngày.',
    submittedAt: '15/10/2024',
    likes: 124,
    status: 'approved'
  },
  {
    id: 'pv-3',
    title: 'Vết Xước Trên Bàn Học & Những Lời Viết Vội',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
    authorName: 'Lê Hoàng Yến',
    authorGrade: 'Khối 12',
    school: 'THPT Chu Văn An',
    storyText: 'Mặt bàn học lớp 12 phủ đầy những vết bút xóa và dòng chữ tự động viên: "Cố lên, chỉ còn vài tháng nữa thôi!". Mình đã dùng bút dạ vẽ thêm một bông hoa nhỏ bên cạnh dòng chữ ấy.',
    reflectionPrompt: 'Áp lực thi cử và kỳ vọng đè nặng lên vai mỗi học sinh cuối cấp. Đôi khi chỉ một nét vẽ khích lệ vô danh cũng tiếp thêm sức mạnh cho người ngồi bàn sau.',
    submittedAt: '18/10/2024',
    likes: 95,
    status: 'approved'
  }
];
