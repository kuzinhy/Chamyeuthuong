import { Story } from '../types';

export const initialStories: Story[] = [
  {
    id: 'story-1',
    slug: 'hoc-sinh-nhat-duoc-tien-mang-den-cong-an-xa-tim-nguoi-danh-roi',
    title: 'Học sinh nhặt được tiền mang đến công an xã tìm người đánh rơi',
    excerpt: 'Nhặt được số tiền lớn trên đường đi học về, em học sinh đã nhanh chóng đến trụ sở Công an xã để nhờ tìm và trao trả lại tận tay người đánh rơi.',
    content: `Trên đường tan trường trở về nhà, em học sinh tình cờ phát hiện một cọc tiền bị đánh rơi bên lề đường. Không một chút đắn đo hay nảy sinh lòng tham, em đã lập tức mang toàn bộ số tiền đến trụ sở Công an xã để trình báo và nhờ lực lượng chức năng xác minh người đánh mất.

Qua kiểm tra và xác minh nhanh chóng, cơ quan công an đã liên hệ được với người dân đánh rơi tài sản trong lúc đi chợ mua thuốc cho người thân bị bệnh. Nhận lại số tiền cả gia đình dành dụm, người đánh rơi đã xúc động gửi lời cảm ơn chân thành đến em học sinh và gia đình.

Hành động cao đẹp của em đã được nhà trường và chính quyền địa phương biểu dương trước toàn thể học sinh trong buổi lễ chào cờ đầu tuần, trở thành tấm gương sáng về sự trung thực và nghĩa cử nhân ái.`,
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
    ],
    province: 'Nghệ An',
    region: 'Trung',
    latitude: 18.6734,
    longitude: 105.6813,
    category: 'Trung thực',
    tags: ['Trung thực', 'Nhặt được của rơi', 'Gương sáng học đường', 'Báo Lao Động'],
    message: 'Lòng tử tế bắt đầu từ sự trung thực. Khi nhặt được tài sản không thuộc về mình, lựa chọn trả lại cho người đánh mất chính là cách trao đi sự tin tưởng và lan tỏa một lối sống đẹp.',
    sourceName: 'Báo Lao Động',
    sourceUrl: 'https://laodong.vn',
    sourcePublishDate: '2026-01-18',
    featured: true,
    status: 'published',
    likes: 428,
    views: 1520,
    readTime: '3 phút đọc',
    seoTitle: 'Học sinh nhặt được tiền mang đến công an xã tìm người đánh rơi | LUMI',
    seoDescription: 'Câu chuyện tấm gương học sinh trung thực nhặt được tiền trả lại người đánh rơi.'
  },
  {
    id: 'story-2',
    slug: 'hoc-sinh-nhat-duoc-tien-ban-giao-cong-an-tim-nguoi-danh-roi',
    title: 'Học sinh nhặt được tiền, bàn giao công an tìm người đánh rơi',
    excerpt: 'Dù hoàn cảnh gia đình còn nhiều khó khăn, em học sinh vẫn quyết định bàn giao toàn bộ số tiền nhặt được cho công an để trả lại người mất.',
    content: `Trong khi đang đạp xe trên đoạn đường vắng, em học sinh nhìn thấy một bọc tiền rơi ven đường. Dù hoàn cảnh gia đình còn nhiều vất vả, em vẫn không ngần ngại tìm đến trụ sở công an gần nhất để giao nộp.

Lực lượng công an sau đó đã nhanh chóng thông báo trên hệ thống phát thanh của xã và các trang thông tin để tìm kiếm chủ nhân. Chỉ sau vài giờ, người đánh rơi – một người lao động tự do chuẩn bị tiền nộp viện phí – đã đến nhận lại tài sản nguyên vẹn.

Hành động ấy không chỉ giúp cứu vãn một hoàn cảnh ngặt nghèo mà còn khẳng định phẩm chất cao quý của thế hệ học sinh Việt Nam.`,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    province: 'Hà Nội',
    region: 'Bắc',
    latitude: 21.0285,
    longitude: 105.8542,
    category: 'Trách nhiệm',
    tags: ['Trách nhiệm', 'Nhặt được của rơi', 'Học sinh Hà Nội', 'Báo Lao Động'],
    message: 'Một hành động nhỏ nhưng thể hiện trách nhiệm lớn: biết trân trọng tài sản của người khác và chủ động tìm cách trao trả.',
    sourceName: 'Báo Lao Động',
    sourceUrl: 'https://laodong.vn',
    sourcePublishDate: '2026-01-20',
    featured: true,
    status: 'published',
    likes: 385,
    views: 1240,
    readTime: '3 phút đọc',
    seoTitle: 'Học sinh nhặt được tiền, bàn giao công an tìm người đánh rơi | LUMI',
    seoDescription: 'Hành động đẹp thể hiện tinh thần trách nhiệm của học sinh.'
  },
  {
    id: 'story-3',
    slug: 'tang-bang-khen-nam-sinh-so-cuu-cho-phi-cong-trong-vu-roi-may-bay',
    title: 'Tặng Bằng khen nam sinh sơ cứu cho phi công trong vụ rơi máy bay',
    excerpt: 'Nam sinh Nguyễn Thành Khang với lòng dũng cảm và kỹ năng sơ cứu kịp thời đã hỗ trợ cứu chữa phi công gặp sự cố máy bay quân sự.',
    content: `Chủ tịch UBND tỉnh đã trao tặng Bằng khen đột xuất cho em Nguyễn Thành Khang (học sinh THPT) vì đã có hành động dũng cảm, kịp thời tiếp cận hiện trường và thực hiện các thao tác sơ cứu ban đầu cho phi công trong vụ máy bay gặp sự cố huấn luyện.

Thời điểm xảy ra tai nạn, Khang đang ở gần khu vực hiện trường. Không quản ngại nguy hiểm trước nguy cơ cháy nổ, em đã nhanh chóng chạy đến kiểm tra tình trạng nạn nhân, dùng các kỹ năng sơ cấp cứu đã được học ở trường để cố định vết thương và gọi đội cứu hộ y tế.

Sự bình tĩnh, lòng dũng cảm và tinh thần trắc ẩn xả thân vì người khác của nam sinh Nguyễn Thành Khang đã nhận được sự cảm phục lớn từ cộng đồng và các cấp lãnh đạo.`,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    province: 'Quảng Nam',
    region: 'Trung',
    latitude: 15.5394,
    longitude: 108.0191,
    category: 'Dũng cảm',
    tags: ['Dũng cảm', 'Nguyễn Thành Khang', 'Sơ cứu kịp thời', 'Báo Dân trí'],
    message: 'Lòng dũng cảm xuất phát từ tình yêu thương và sự thấu cảm sinh mệnh con người. Khi ta dám bước tới vì người khác, ta đã trở thành người hùng thực thụ.',
    author: 'Nguyễn Thành Khang',
    sourceName: 'Báo Dân trí',
    sourceUrl: 'https://dantri.com.vn',
    sourcePublishDate: '2026-02-01',
    featured: true,
    status: 'published',
    likes: 672,
    views: 2890,
    readTime: '4 phút đọc',
    seoTitle: 'Tặng Bằng khen nam sinh sơ cứu cho phi công trong vụ rơi máy bay | LUMI',
    seoDescription: 'Tấm gương dũng cảm và trắc ẩn của nam sinh Nguyễn Thành Khang.'
  },
  {
    id: 'story-4',
    slug: 'hai-hoc-sinh-nhat-duoc-vi-tien-lien-mang-den-cong-an-tim-nguoi-danh-roi',
    title: 'Hai học sinh nhặt được ví tiền liền mang đến công an tìm người đánh rơi',
    excerpt: 'Hai người bạn cùng lớp cùng nhau mang chiếc ví chứa nhiều giấy tờ tùy thân và tiền mặt đến giao nộp cho công an để liên hệ chủ nhân.',
    content: `Trên đường đi học thêm, hai bạn học sinh lớp 11 đã phát hiện một chiếc ví da màu đen rơi bên vệ đường. Mở ra kiểm tra, hai em thấy bên trong có nhiều triệu đồng cùng toàn bộ giấy tờ tùy thân quan trọng bao gồm thẻ CCCD, bằng lái xe và thẻ ngân hàng.

Nhận thức được người mất ví chắc chắn đang rất lo lắng vì việc làm lại giấy tờ vô cùng phức tạp, hai em đã cùng nhau đến thẳng trụ sở công an phường gần nhất để trình báo.

Sau khi tiếp nhận, công an phường đã liên hệ ngay với chủ nhân chiếc ví là một giáo viên hưu trí. Nhận lại tài sản còn nguyên vẹn, cụ giáo viên đã rơi nước mắt cảm kích tấm lòng trong sáng của hai em.`,
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    province: 'Hải Phòng',
    region: 'Bắc',
    latitude: 20.8449,
    longitude: 106.6881,
    category: 'Trung thực',
    tags: ['Trung thực', 'Tình bạn đẹp', 'Nhặt được ví tiền', 'Báo Lao Động'],
    message: 'Sự trung thực khi được cùng nhau lan tỏa sẽ nhân đôi sức mạnh, tạo nên một tình bạn đẹp đẽ xây dựng trên nền tảng của lòng nhân ái.',
    sourceName: 'Báo Lao Động',
    sourceUrl: 'https://laodong.vn',
    sourcePublishDate: '2026-03-05',
    featured: true,
    status: 'published',
    likes: 310,
    views: 980,
    readTime: '3 phút đọc',
    seoTitle: 'Hai học sinh nhặt được ví tiền liền mang đến công an tìm người đánh rơi | LUMI',
    seoDescription: 'Hai em học sinh trung thực trả lại ví tiền và giấy tờ cho người mất.'
  },
  {
    id: 'story-5',
    slug: 'tuyen-duong-4-hoc-sinh-nhat-duoc-dien-thoai-iphone-tra-lai-nguoi-lam-roi',
    title: 'Tuyên dương 4 học sinh nhặt được điện thoại iPhone, trả lại người làm rơi',
    excerpt: 'Bốn học sinh THPT đã kiên nhẫn đứng chờ người gọi đến chiếc điện thoại iPhone nhặt được và trao trả lại tận tay người đánh rơi.',
    content: `Trường THPT đã tổ chức lễ tuyên dương dưới cờ cho nhóm 4 học sinh vì hành động đẹp nhặt được chiếc điện thoại iPhone đời mới có giá trị cao và nhanh chóng tìm cách trả lại cho người làm rơi.

Cụ thể, trong lúc tập thể dục tại công viên, nhóm bạn nhìn thấy chiếc điện thoại rơi trên ghế đá. Các em đã chủ động giữ gìn cẩn thận, sạc pin và chờ cuộc gọi từ người thân của chủ máy để hẹn gặp trao trả.

Người đánh rơi điện thoại – một du khách nước ngoài – vô cùng bất ngờ và xúc động trước sự chân thành, nhiệt tình và phong thái văn minh của các bạn học sinh Việt Nam.`,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    province: 'Hồ Chí Minh',
    region: 'Nam',
    latitude: 10.8231,
    longitude: 106.6297,
    category: 'Trung thực',
    tags: ['Tuyên dương', 'Học sinh TP.HCM', 'Trung thực', 'Báo Dân trí'],
    message: 'Văn minh và lòng tốt của một thế hệ thể hiện từ những cử chỉ nhỏ nhất: gìn giữ và trao trả niềm tin cho người xa lạ.',
    sourceName: 'Báo Dân trí',
    sourceUrl: 'https://dantri.com.vn',
    sourcePublishDate: '2026-03-09',
    featured: true,
    status: 'published',
    likes: 495,
    views: 1870,
    readTime: '3 phút đọc',
    seoTitle: 'Tuyên dương 4 học sinh nhặt được điện thoại iPhone, trả lại người làm rơi | LUMI',
    seoDescription: 'Nhóm 4 học sinh THPT được tuyên dương vì trao trả điện thoại giá trị cao.'
  },
  {
    id: 'story-6',
    slug: 'nhat-duoc-vang-hai-nu-sinh-o-ha-tinh-mang-tra-lai-cho-nguoi-danh-roi',
    title: 'Nhặt được vàng, hai nữ sinh ở Hà Tĩnh mang trả lại cho người đánh rơi',
    excerpt: 'Nhặt được túi vàng có giá trị hàng chục triệu đồng, hai nữ sinh THPT tại Hà Tĩnh đã lập tức nhờ nhà trường tìm kiếm người đánh rơi.',
    content: `Hai nữ sinh trường THPT tại Hà Tĩnh trong lúc dọn vệ sinh sân trường đã phát hiện một gói nhỏ bọc vải đỏ. Mở ra xem, hai em phát hiện bên trong có các nhẫn vàng và dây chuyền vàng trị giá lớn.

Ý thức được đây có thể là tài sản tích cóp cả đời của một gia đình chuẩn bị lo việc lớn hoặc chữa bệnh, hai em đã mang ngay lên nộp cho Ban Giám hiệu nhà trường để phát thông báo tìm kiếm.

Người đánh rơi – một phụ huynh đến trường làm thủ tục chuyển trường cho con – sau khi nhận lại số vàng đã rơi nước mắt và xin gửi tặng tiền cảm ơn nhưng hai em kiên quyết từ chối, chỉ mong người đánh rơi yên tâm.`,
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    province: 'Hà Tĩnh',
    region: 'Trung',
    latitude: 18.3559,
    longitude: 105.9059,
    category: 'Trung thực',
    tags: ['Hà Tĩnh', 'Nữ sinh trung thực', 'Nhặt được vàng', 'Báo Lao Động'],
    message: 'Giá trị của sự lương thiện quý giá hơn mọi thứ vàng bạc châu báu trên trần đời. Khi giữ được tâm trong sáng, tâm hồn bạn luôn tỏa sáng rực rỡ.',
    sourceName: 'Báo Lao Động',
    sourceUrl: 'https://laodong.vn',
    sourcePublishDate: '2026-03-31',
    featured: true,
    status: 'published',
    likes: 540,
    views: 2130,
    readTime: '3 phút đọc',
    seoTitle: 'Nhặt được vàng, hai nữ sinh ở Hà Tĩnh mang trả lại cho người đánh rơi | LUMI',
    seoDescription: 'Nghĩa cử cao đẹp của hai nữ sinh Hà Tĩnh trả lại túi vàng quý giá.'
  },
  {
    id: 'story-7',
    slug: 'nhat-duoc-vang-3-hoc-sinh-lop-9-o-da-nang-tra-lai-nguoi-danh-roi',
    title: 'Nhặt được vàng, 3 học sinh lớp 9 ở Đà Nẵng trả lại người đánh rơi',
    excerpt: 'Ba học sinh tại Đà Nẵng đã bàn giao chiếc lắc vàng nhặt được cho công an phường để trao trả lại cho người dân.',
    content: `Ba em học sinh trường THCS tại TP. Đà Nẵng trong lúc đi bộ trên vỉa hè đã nhặt được một chiếc lắc vàng có giá trị cao. Các em đã cùng nhau đến trụ sở Công an phường gần đó để trình báo và giao nộp tài sản.

Sau khi xác minh, Công an phường đã làm thủ tục trao trả lại chiếc lắc vàng cho một người dân đánh rơi khi đi dạo vào buổi sáng.

Ủy ban nhân dân quận và Thành đoàn Đà Nẵng đã biểu dương, tặng giấy khen đột xuất cho 3 em học sinh vì tinh thần trung thực, không tham của rơi, góp phần lan tỏa nét đẹp văn hóa người Đà Nẵng mến khách và nghĩa tình.`,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    province: 'Đà Nẵng',
    region: 'Trung',
    latitude: 16.0544,
    longitude: 108.2022,
    category: 'Trung thực',
    tags: ['Đà Nẵng', 'Trung thực', 'Học sinh Đà Nẵng', 'Nhặt được của rơi'],
    message: 'Những bài học đạo đức từ sách vở chỉ thật sự có ý nghĩa khi được các em hiện thực hóa thành những hành động đẹp ngoài đời sống thực tế.',
    sourceName: 'Báo Đà Nẵng & Dân Trí',
    sourceUrl: 'https://baodanang.vn',
    sourcePublishDate: '2026-04-13',
    featured: true,
    status: 'published',
    likes: 410,
    views: 1620,
    readTime: '3 phút đọc',
    seoTitle: 'Nhặt được vàng, 3 học sinh lớp 9 ở Đà Nẵng trả lại người đánh rơi | LUMI',
    seoDescription: 'Ba học sinh Đà Nẵng trả lại lắc vàng giá trị cho người đánh rơi.'
  },
  {
    id: 'story-8',
    slug: 'hon-6-2-ti-dong-hoc-bong-chap-canh-uoc-mo-tiep-suc-hoc-sinh-sinh-vien-vuot-kho',
    title: 'Hơn 6,2 tỉ đồng học bổng ‘Chắp cánh ước mơ’ tiếp sức học sinh, sinh viên vượt khó',
    excerpt: 'Chương trình học bổng ý nghĩa đã tiếp sức cho hàng ngàn học sinh có hoàn cảnh khó khăn trên khắp cả nước vững bước tới trường.',
    content: `Chương trình học bổng "Chắp cánh ước mơ" do Báo Tuổi Trẻ phối hợp cùng các đơn vị tổ chức đã trao tặng hơn 6,2 tỉ đồng cho học sinh, sinh viên nghèo vượt khó hiếu học tại các tỉnh thành trên cả nước.

Nhiều em học sinh mồ côi, gia đình chịu ảnh hưởng bởi thiên tai bão lũ nhưng vẫn nỗ lực đạt thành tích học tập xuất sắc đã nhận được những suất học bổng kịp thời để tiếp tục theo đuổi ước mơ tri thức.

Không chỉ là sự hỗ trợ tài chính, học bổng còn là nguồn động viên tinh thần to lớn, minh chứng cho sự chung tay của toàn xã hội trong việc nâng niu những ước mơ của thế hệ trẻ Việt Nam.`,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    province: 'Cần Thơ',
    region: 'Nam',
    latitude: 10.0452,
    longitude: 105.7469,
    category: 'Ước mơ',
    tags: ['Chắp cánh ước mơ', 'Học bổng', 'Vượt khó hiếu học', 'Báo Tuổi Trẻ'],
    message: 'Yêu thương trao đi là nguồn sức mạnh vô tận chắp cánh cho những ước mơ vượt qua mọi nghịch cảnh để nở hoa rực rỡ.',
    sourceName: 'Báo Tuổi Trẻ',
    sourceUrl: 'https://tuoitre.vn',
    sourcePublishDate: '2026-05-14',
    featured: true,
    status: 'published',
    likes: 620,
    views: 2950,
    readTime: '4 phút đọc',
    seoTitle: 'Hơn 6,2 tỉ đồng học bổng Chắp cánh ước mơ tiếp sức học sinh | LUMI',
    seoDescription: 'Hơn 6,2 tỉ đồng học bổng tiếp sức học sinh vượt khó đến trường.'
  }
];
