import { ComicStory } from '../types';

export const interactiveStories: ComicStory[] = [
  {
    id: 'comic-1',
    slug: 'chuyen-o-hanh-lang-so-3',
    title: 'Chuyện Ở Hành Lang Số 3: Tiếng Thì Thầm Vô Tình',
    summary: 'Bạn bắt gặp một nhóm bạn cùng lớp đang tụ tập chỉ trỏ và chế giễu chiếc cặp rách của một bạn học sinh nghèo. Bạn sẽ làm gì?',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    author: 'Nhóm Sáng Tạo Nội Dung LUMI',
    scenarios: [
      {
        id: 'scene-1',
        chapterNumber: 1,
        title: 'Tình Huống Bất Ngờ',
        situation: 'Giờ ra chơi, tại hành lang tầng 2, một nhóm học sinh đang xì xào bàn tán và cười cợt khi thấy Nam đi ngang qua với chiếc cặp sờn cũ đã được khâu lại nhiều lần. Nam cúi gằm mặt, bước thật nhanh vào lớp với đôi mắt đỏ hoe.',
        characterState: 'Nam đang cảm thấy xấu hổ, cô độc và tổn thương lòng tự trọng sâu sắc.',
        illustration: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        choices: [
          {
            id: 'c1',
            text: 'A. Lờ đi và tiếp tục đi làm việc của mình, vì không muốn dính vào rắc rối.',
            empathyScore: 1,
            feedback: {
              immediateReaction: 'Sự im lặng của người ngoài cuộc khiến nhóm bạn kia tiếp tục trêu chọc dữ dội hơn.',
              emotionalImpact: 'Nam cảm thấy cả thế giới xung quanh đều thờ ơ trước nỗi đau của mình, khiến sự cô lập càng tăng lên.',
              lumiGuidance: 'Sự bàng quan vô tình tiếp tay cho bạo lực tinh thần. Bạn không cần phải gây hấn, nhưng đừng chọn cách quay lưng.'
            },
            nextScenarioId: 'scene-2a'
          },
          {
            id: 'c2',
            text: 'B. Đến thẳng trước mặt nhóm bạn kia và quát mắng lớn tiếng để bảo vệ Nam.',
            empathyScore: 3,
            feedback: {
              immediateReaction: 'Không khí trở nên căng thẳng, xung đột bùng nổ và nhóm bạn kia phản kháng lại gay gắt.',
              emotionalImpact: 'Nam càng thêm hoảng sợ vì sự việc bị đẩy lên quá lớn và trở thành tâm điểm của cả trường.',
              lumiGuidance: 'Lòng trắc ẩn cần đi kèm sự khéo léo và bình tĩnh. Hãy giải quyết bằng sự ôn hòa thay vì dùng sự giận dữ đối đầu giận dữ.'
            },
            nextScenarioId: 'scene-2b'
          },
          {
            id: 'c3',
            text: 'C. Bước nhanh theo Nam vào lớp, đưa cho bạn hộp sữa và rủ Nam cùng làm bài tập nhóm.',
            empathyScore: 5,
            feedback: {
              immediateReaction: 'Nhóm bạn ngoài hành lang tự khắc cảm thấy hụt hẫng và giải tán khi thấy Nam có người đồng hành.',
              emotionalImpact: 'Nam ngước lên, nhận thấy sự tôn trọng và ấm áp, vết thương tự ái được xoa dịu kịp thời.',
              lumiGuidance: 'Tuyệt vời! Hành động thấu cảm trực tiếp và tế nhị là chiếc mỏ neo tốt nhất giúp người bạn tổn thương cảm thấy an toàn.'
            },
            nextScenarioId: 'scene-end'
          },
          {
            id: 'c4',
            text: 'D. Nhẹ nhàng kéo một bạn trong nhóm trêu chọc ra nói riêng: "Đừng nói vậy, bạn ấy sẽ buồn lắm đó".',
            empathyScore: 4,
            feedback: {
              immediateReaction: 'Người bạn kia giật mình nhận ra hành động đùa vui của mình đã đi quá giới hạn.',
              emotionalImpact: 'Giúp ngăn chặn hành vi từ gốc mà không làm bẽ mặt bất kỳ ai.',
              lumiGuidance: 'Một lời nhắc nhở chân thành, khéo léo với bạn bè có thể đánh thức lòng trắc ẩn đang ngủ quên ở họ.'
            },
            nextScenarioId: 'scene-end'
          }
        ]
      }
    ]
  }
];
