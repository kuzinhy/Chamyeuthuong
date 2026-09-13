export interface SurveyQuestionItem {
  code: string;
  group: 'ND' | 'TX' | 'TA';
  groupName: string;
  text: string;
}

export const surveyQuestions: SurveyQuestionItem[] = [
  // NHÓM ND – TRUYỀN THÔNG THỊ GIÁC CÓ ĐỊNH HƯỚNG
  {
    code: 'ND1',
    group: 'ND',
    groupName: 'Truyền thông thị giác có định hướng',
    text: 'Bạn thường chú ý đến các hình ảnh hoặc video mang thông điệp nhân văn.'
  },
  {
    code: 'ND2',
    group: 'ND',
    groupName: 'Truyền thông thị giác có định hướng',
    text: 'Bạn cảm thấy hình ảnh/video giúp bạn hiểu thông điệp dễ hơn chữ viết.'
  },
  {
    code: 'ND3',
    group: 'ND',
    groupName: 'Truyền thông thị giác có định hướng',
    text: 'Những hình ảnh cảm động khiến bạn suy nghĩ nhiều hơn về cách đối xử với người khác.'
  },
  {
    code: 'ND4',
    group: 'ND',
    groupName: 'Truyền thông thị giác có định hướng',
    text: 'Các video truyền cảm hứng khiến bạn muốn làm điều tích cực.'
  },
  {
    code: 'ND5',
    group: 'ND',
    groupName: 'Truyền thông thị giác có định hướng',
    text: 'Nội dung truyền thông thị giác dễ tác động đến cảm xúc của bạn.'
  },

  // NHÓM TX – MỨC ĐỘ TIẾP XÚC TRUYỀN THÔNG
  {
    code: 'TX1',
    group: 'TX',
    groupName: 'Mức độ tiếp xúc truyền thông',
    text: 'Bạn thường xuyên xem nội dung trên mạng xã hội.'
  },
  {
    code: 'TX2',
    group: 'TX',
    groupName: 'Mức độ tiếp xúc truyền thông',
    text: 'Bạn thường bắt gặp các video hoặc hình ảnh mang thông điệp xã hội.'
  },
  {
    code: 'TX3',
    group: 'TX',
    groupName: 'Mức độ tiếp xúc truyền thông',
    text: 'Bạn dành nhiều thời gian tiếp cận nội dung trực quan trên Internet.'
  },
  {
    code: 'TX4',
    group: 'TX',
    groupName: 'Mức độ tiếp xúc truyền thông',
    text: 'Bạn thường theo dõi các nội dung liên quan đến giúp đỡ cộng đồng.'
  },
  {
    code: 'TX5',
    group: 'TX',
    groupName: 'Mức độ tiếp xúc truyền thông',
    text: 'Bạn dễ bị thu hút bởi các hình ảnh hoặc video đang lan truyền trên mạng.'
  },

  // NHÓM TA – HÀNH VI TRẮC ẨN
  {
    code: 'TA1',
    group: 'TA',
    groupName: 'Hành vi trắc ẩn',
    text: 'Bạn sẵn sàng giúp đỡ người gặp khó khăn.'
  },
  {
    code: 'TA2',
    group: 'TA',
    groupName: 'Hành vi trắc ẩn',
    text: 'Bạn cảm thấy đồng cảm với những người có hoàn cảnh khó khăn.'
  },
  {
    code: 'TA3',
    group: 'TA',
    groupName: 'Hành vi trắc ẩn',
    text: 'Bạn quan tâm đến cảm xúc của người khác.'
  },
  {
    code: 'TA4',
    group: 'TA',
    groupName: 'Hành vi trắc ẩn',
    text: 'Bạn thường chia sẻ hoặc hỗ trợ khi thấy người khác cần giúp đỡ.'
  },
  {
    code: 'TA5',
    group: 'TA',
    groupName: 'Hành vi trắc ẩn',
    text: 'Bạn cảm thấy mình nên có trách nhiệm với cộng đồng.'
  }
];

export const likertOptions = [
  { value: 1, label: 'Hoàn toàn không đồng ý' },
  { value: 2, label: 'Không đồng ý' },
  { value: 3, label: 'Trung lập' },
  { value: 4, label: 'Đồng ý' },
  { value: 5, label: 'Hoàn toàn đồng ý' }
];
