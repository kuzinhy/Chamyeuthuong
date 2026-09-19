export const researchProjectData = {
  title: 'Tác động truyền thông thị giác có định hướng đến sự thay đổi hành vi trắc ẩn của học sinh trung học phổ thông',
  shortTitle: 'Dự Án Nghiên Cứu Khoa Học Hành Vi LUMI',
  institution: 'Đề tài Nghiên cứu Khoa học Hành vi Học sinh THPT',
  sampleSize: '300 học sinh (Khối 10, 11, 12)',
  location: 'Thành phố Hồ Chí Minh & Bình Dương',
  academicField: 'Khoa học Xã hội & Hành vi – Tâm lý học Giáo dục',
  
  context: {
    problemStatement: 'Trong bối cảnh bùng nổ công nghệ số và mạng xã hội, "căn bệnh vô cảm" và sự suy giảm thấu cảm đang trở thành thách thức lớn ở lứa tuổi vị thành niên. Theo UNICEF Việt Nam (2024), có khoảng 32% thanh thiếu niên cảm thấy thiếu sự lắng nghe và chia sẻ từ gia đình, làm gia tăng nguy cơ hình thành thái độ bàng quan trong các mối quan hệ xã hội.',
    socialMediaStats: [
      { label: 'Người dùng MXH tại VN', value: '78+ Triệu', detail: 'Chiếm 79% dân số (Digital 2024 Vietnam)' },
      { label: 'Thanh thiếu niên >3h/ngày', value: '51%', detail: 'Xem video TikTok, YouTube, FB (Q&Me 2024)' },
      { label: 'Ảnh hưởng cảm xúc MXH', value: '84%', detail: 'Theo khảo sát của UNICEF Việt Nam 2021' },
      { label: 'Mẫu khảo sát thực nghiệm', value: '300 HS', detail: 'Khối 10, 11, 12 cấp THPT' }
    ],
    justification: 'Truyền thông thị giác (hình ảnh, video, infographic) có khả năng tác động trực tiếp và tức thì vào vùng cảm xúc của não bộ, giúp ghi nhớ nhanh hơn văn bản thuần túy. Đề tài vận dụng truyền thông thị giác có định hướng như một công cụ giáo dục cảm xúc tích cực, chuyển hóa sự thờ ơ thành lòng trắc ẩn cụ thể.'
  },

  objectives: [
    {
      id: 'obj-1',
      title: 'Khảo sát thực trạng',
      desc: 'Khảo sát thực trạng và các biểu hiện của hành vi trắc ẩn ở học sinh THPT trong môi trường học đường hiện nay.'
    },
    {
      id: 'obj-2',
      title: 'Thiết kế bộ can thiệp',
      desc: 'Thiết kế và triển khai hệ sinh thái truyền thông thị giác có định hướng (video truyền cảm hứng, poster, truyện tranh tương tác, triển lãm ảo).'
    },
    {
      id: 'obj-3',
      title: 'Đo lường & Đánh giá',
      desc: 'Đo lường và đánh giá sự thay đổi về nhận thức, cảm xúc và hành vi trắc ẩn của học sinh trước và sau khi tham gia can thiệp thực nghiệm.'
    }
  ],

  hypotheses: [
    {
      id: 'h-1',
      code: 'H1',
      title: 'Thói quen tiếp nhận trực quan',
      content: 'Do thói quen tiếp nhận thông tin hiện đại, học sinh THPT dễ bị tác động cảm xúc và nảy sinh sự đồng cảm thông qua hình ảnh/video hơn là các bài giảng lý thuyết.'
    },
    {
      id: 'h-2',
      code: 'H2',
      title: 'Hiệu quả can thiệp thực nghiệm',
      content: 'Can thiệp truyền thông thị giác có định hướng làm tăng đáng kể điểm số đánh giá hành vi trắc ẩn của nhóm thực nghiệm so với nhóm đối chứng.'
    },
    {
      id: 'h-3',
      code: 'H3',
      title: 'Quy luật chuyển hóa hành vi',
      content: 'Tần suất tiếp xúc với các sản phẩm truyền thông nhân văn tỷ lệ thuận với khả năng chuyển hóa từ "thấu cảm" (cảm xúc) sang "trắc ẩn" (hành động giúp đỡ).'
    }
  ],

  questions: [
    {
      id: 'q-1',
      num: '01',
      text: 'Thực trạng mức độ hành vi trắc ẩn và sự vô cảm của học sinh THPT hiện nay như thế nào?'
    },
    {
      id: 'q-2',
      num: '02',
      text: 'Các hình thức truyền thông thị giác cụ thể tác động ra sao đến quá trình nhận thức và thay đổi cảm xúc của các em?'
    },
    {
      id: 'q-3',
      num: '03',
      text: 'Giải pháp can thiệp truyền thông thị giác nào mang lại hiệu quả cao nhất trong việc thúc đẩy hành vi trắc ẩn bền vững?'
    }
  ],

  theories: [
    {
      name: 'Lý thuyết học tập xã hội (Albert Bandura)',
      desc: 'Con người học tập và định hình hành vi thông qua quan sát, tiếp nhận và mô phỏng các hình mẫu (modeling) trong môi trường truyền thông xung quanh.'
    },
    {
      name: 'Mô hình Thấu cảm – Trắc ẩn (Batson & Gilbert)',
      desc: 'Hành vi nhân ái bắt đầu từ Quan sát → Cảm xúc đồng cảm → Thấu hiểu → Nảy sinh động lực trắc ẩn → Hành động giúp đỡ cụ thể.'
    },
    {
      name: 'Đặc điểm tâm lý học sinh THPT (Piaget & Kohlberg)',
      desc: 'Giai đoạn vị thành niên phát triển tư duy trừu tượng, bắt đầu hình thành đạo đức ở mức cao hơn, dễ chịu ảnh hưởng bởi các hình tượng văn hóa và truyền thông số.'
    }
  ],

  empathyFlow: [
    { step: 1, label: 'QUAN SÁT', sub: 'Tiếp nhận hình ảnh & câu chuyện' },
    { step: 2, label: 'CẢM XÚC', sub: 'Rung cảm trước nỗi đau người khác' },
    { step: 3, label: 'THẤU CẢM', sub: 'Đặt mình vào vị trí đối phương' },
    { step: 4, label: 'TRẮC ẨN', sub: 'Mong muốn xoa dịu nỗi đau' },
    { step: 5, label: 'HÀNH ĐỘNG', sub: 'Giúp đỡ và chia sẻ thực tế' }
  ],

  methodology: {
    design: 'Nghiên cứu thực nghiệm với mô hình đo lường trước tác động (Pre-test) và sau tác động (Post-test).',
    tools: [
      { name: 'Cronbach’s Alpha', desc: 'Đánh giá độ tin cậy và tính nhất quán nội tại của các thang đo ND, TX, TA (yêu cầu > 0.7).' },
      { name: 'Paired-Sample T-Test', desc: 'Kiểm định sự khác biệt có ý nghĩa thống kê về điểm số trắc ẩn trước và sau can thiệp (p < 0.05).' },
      { name: 'Phỏng vấn sâu', desc: 'Thu thập cảm nhận định tính để làm sâu sắc thêm cơ chế biến đổi tâm lý của học sinh.' }
    ],
    pipeline: [
      '1. Khảo sát tiền can thiệp (Pre-test)',
      '2. Can thiệp truyền thông thị giác đa nền tảng (LUMI)',
      '3. Khảo sát hậu can thiệp (Post-test)',
      '4. Phân tích thống kê đối chiếu (T-Test)',
      '5. Đề xuất mô hình giáo dục nhân văn'
    ]
  },

  solutions: [
    {
      num: '01',
      title: 'Tạp chí điện tử đa phương tiện',
      desc: 'Xây dựng tạp chí số dưới dạng hình ảnh, infographic, typography và video ngắn với chủ đề sẻ chia, chống bạo lực học đường.',
      type: 'Tĩnh'
    },
    {
      num: '02',
      title: 'Thực nghiệm xã hội thị giác',
      desc: 'Triển khai poster ẩn dụ và bài viết tương tác trên mạng xã hội để đo lường mức độ lan tỏa và phản hồi của học sinh.',
      type: 'Tương tác'
    },
    {
      num: '03',
      title: 'Mô hình Photovoice',
      desc: 'Học sinh tự tay bấm máy ghi lại khoảnh khắc nhân văn hoặc góc khuất cô lập, viết câu chuyện phản tư cảm xúc.',
      type: 'Trải nghiệm'
    },
    {
      num: '04',
      title: 'Truyện tranh số tương tác',
      desc: 'Tình huống phân nhánh đưa ra các lựa chọn xử lý khi thấy bạn bè bị cô lập, phân tích cảm xúc nhân vật.',
      type: 'Trải nghiệm'
    },
    {
      num: '05',
      title: 'Sáng tác âm nhạc truyền cảm hứng',
      desc: 'Phát hành MV ca khúc chủ đề "Điều Chưa Nói", chạm vào cảm xúc thầm kín qua giai điệu giàu tính chữa lành.',
      type: 'Đa giác quan'
    },
    {
      num: '06',
      title: 'Không gian triển lãm ảo',
      desc: 'Phòng triển lãm trực tuyến 2.5D trưng bày tác phẩm nghệ thuật, thông điệp và hòm thư yêu thương không biên giới.',
      type: 'Nhập vai'
    }
  ]
};
