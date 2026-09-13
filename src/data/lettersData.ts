import { Letter } from '../types';

export const initialLetters: Letter[] = [
  {
    id: 'let-1',
    senderName: 'Một bạn nữ lớp 11A3',
    isAnonymous: false,
    category: 'Cảm ơn',
    content: 'Cảm ơn cậu – người bạn cùng bàn tốt bụng! Ngày hôm qua tớ đã khóc vì điểm thi kém và cảm giác bị mọi người xa lánh, nhưng viên kẹo dâu và mẩu giấy "Cậu đã cố gắng rất nhiều rồi, mệt thì tựa vào vai tớ nhé" của cậu đã cứu rỗi cả một tuần u ám của tớ. Tớ biết ơn cậu vô cùng!',
    targetPerson: 'Gửi bạn cùng bàn',
    createdAt: 'Hôm qua, 18:30',
    likes: 68,
    status: 'approved',
    replyFromLumi: 'Một cử chỉ nhỏ ấm áp cũng đủ thắp sáng cả một ngày u tối. Cảm ơn bạn đã can đảm trao đi sự tử tế dịu dàng ấy!',
    colorTheme: 'rose'
  },
  {
    id: 'let-2',
    senderName: 'Bạn giấu tên',
    isAnonymous: true,
    category: 'Xin lỗi',
    content: 'Gửi người bạn từng bị cả lớp tẩy chay năm lớp 10... Tớ xin lỗi vì ngày đó đã im lặng hùa theo đám đông, không dám đứng lên bảo vệ cậu chỉ vì sợ mình cũng bị cô lập. Đến giờ tớ vẫn luôn day dứt. Mong rằng ở trường mới, cậu đã tìm được những người bạn chân thành yêu quý cậu thật lòng.',
    targetPerson: 'Gửi người bạn năm xưa',
    createdAt: '2 ngày trước',
    likes: 92,
    status: 'approved',
    replyFromLumi: 'Dũng cảm nhận ra và nói lời xin lỗi chính là bước đầu tiên để trái tim chúng ta lớn lên trong trắc ẩn và sự bao dung.',
    colorTheme: 'purple'
  },
  {
    id: 'let-3',
    senderName: 'Một học sinh khối 12',
    isAnonymous: false,
    category: 'Động viên',
    content: 'Gửi các em khối 10 mới vào trường: Đừng quá lo lắng nếu tuần đầu tiên chưa thể hòa nhập ngay. Mỗi bông hoa đều có mùa nở rộ riêng. Hãy cứ sống chân thành, quan tâm đến bạn bè xung quanh, rồi ánh sáng ấm áp sẽ dẫn đường cho các em tìm thấy những người bạn tri kỷ.',
    targetPerson: 'Gửi tân học sinh khối 10',
    createdAt: '3 ngày trước',
    likes: 45,
    status: 'approved',
    replyFromLumi: 'Lời nhắn gửi chứa chan sự ân cần của một người anh/chị đi trước. Cảm ơn sự chu đáo của bạn!',
    colorTheme: 'sky'
  },
  {
    id: 'let-4',
    senderName: 'Thành viên CLB Tình Nguyện',
    isAnonymous: true,
    category: 'Tâm sự',
    content: 'Có những ngày nhìn thấy các cô chú lao công dọn rác sân trường giữa trời nắng gay gắt, tụi mình tự dặn lòng phải bỏ rác đúng nơi quy định và luôn cúi đầu chào cô chú thật lễ phép. Lòng trắc ẩn bắt đầu từ những điều giản dị như thế đấy.',
    targetPerson: 'Gửi mọi người',
    createdAt: '5 ngày trước',
    likes: 57,
    status: 'approved',
    replyFromLumi: 'Chính sự tôn trọng và biết ơn với những người lao động thầm lặng làm nên vẻ đẹp nhân cách của tuổi trẻ.',
    colorTheme: 'emerald'
  },
  {
    id: 'let-5',
    senderName: 'Học sinh ẩn danh',
    isAnonymous: true,
    category: 'Gửi một người đặc biệt',
    content: 'Gửi cô giáo chủ nhiệm: Cảm ơn cô vì đã không mắng mỏ khi em ngủ gật trên lớp, mà sau giờ học đã nhẹ nhàng hỏi em có gặp khó khăn gì ở nhà không. Lần đầu tiên em cảm thấy mình được một người lớn lắng nghe bằng tất cả sự thấu hiểu.',
    targetPerson: 'Cô giáo chủ nhiệm',
    createdAt: '1 tuần trước',
    likes: 114,
    status: 'approved',
    replyFromLumi: 'Sự thấu cảm của người thầy là ngọn hải đăng dìu dắt bao thế hệ học trò trưởng thành.',
    colorTheme: 'amber'
  }
];
