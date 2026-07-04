export const previewUser = {
  no: 1,
  userId: 'preview',
  name: '비스킷',
  nickname: '바삭한독서가',
  email: 'preview@biscuit.local',
  phone: '010-0000-0000',
  birth: '1995.05.05',
  gender: 'F',
  grade: 'L',
  authority: 'U',
  point: 3200,
  zipCode: '04524',
  address: '서울특별시 중구 세종대로',
  address_detail: '비스킷 서재',
  quitYn: 'N',
  tokenExpiresIn: 4102444800000,
  createdAt: '2023.08.21',
}

export const previewBooks = [
  {
    no: 101,
    isbn: '9788936434267',
    title: '아몬드',
    author: '손원평',
    publisher: '창비',
    publishedDate: '2017.03.31',
    image: 'https://kr.object.ncloudstorage.com/changbi/old/uploads/2017/03/20170330_061845.jpg',
    bookImgUrl: 'https://kr.object.ncloudstorage.com/changbi/old/uploads/2017/03/20170330_061845.jpg',
    detail: '감정을 느끼기 어려운 소년이 관계를 통해 세상과 만나는 성장소설입니다.',
    authorDetail: '이야기를 통해 사람과 사람 사이의 감정을 섬세하게 그립니다.',
    price: 14000,
    bookDtlUrl: 'https://book.naver.com',
  },
  {
    no: 102,
    isbn: '9788954682152',
    title: '작별하지 않는다',
    author: '한강',
    publisher: '문학동네',
    publishedDate: '2021.09.09',
    image: 'https://cdn.munhak.com/upload/book/cover/img_2024111414560001_s.jpg',
    bookImgUrl: 'https://cdn.munhak.com/upload/book/cover/img_2024111414560001_s.jpg',
    detail: '기억과 애도, 연결의 의미를 따라가는 깊고 아름다운 이야기입니다.',
    authorDetail: '인간의 존엄과 기억을 탐구하는 작품을 발표해 왔습니다.',
    price: 16800,
    bookDtlUrl: 'https://book.naver.com',
  },
  {
    no: 103,
    isbn: '9788937461033',
    title: '인간 실격',
    author: '다자이 오사무',
    publisher: '민음사',
    publishedDate: '2004.05.15',
    image: 'https://minumsa.minumsa.com/wp-content/uploads/bookcover/103_인간실격-300x511.jpg',
    bookImgUrl: 'https://minumsa.minumsa.com/wp-content/uploads/bookcover/103_인간실격-300x511.jpg',
    detail: '자기 고백을 통해 인간의 불안과 고독을 응시하는 작품입니다.',
    authorDetail: '일본 근대문학을 대표하는 작가입니다.',
    price: 11000,
    bookDtlUrl: 'https://book.naver.com',
  },
]

const goods = [
  { no: 1, name: '바삭군 북마크 세트', price: 6500, inventory: 12, content: '책장을 펼칠 때마다 만나는 비스킷 북마크입니다.', saleYn: 'Y', image: '/images/goods/goods_bookmark01-thumb.jpg', detail: '/images/goods/goods_bookmark01-1.jpg' },
  { no: 2, name: '비스킷 독서 머그', price: 12000, inventory: 8, content: '독서 시간을 포근하게 채워 주는 세라믹 머그입니다.', saleYn: 'Y', image: '/images/goods/goods_mug01-thumb.jpg', detail: '/images/goods/goods_mug01-1.jpg' },
  { no: 3, name: '바삭군 에코백', price: 18000, inventory: 5, content: '책 두세 권을 넉넉하게 담을 수 있는 코튼 에코백입니다.', saleYn: 'Y', image: '/images/goods/goods_ecobag01-thumb.jpg', detail: '/images/goods/goods_ecobag01-1.jpg' },
  { no: 4, name: '독서 기록 메모패드', price: 4500, inventory: 20, content: '마음에 남은 문장을 가볍게 기록하는 메모패드입니다.', saleYn: 'Y', image: '/images/goods/goods_memo01-thumb.jpg', detail: '/images/goods/goods_memo01-1.jpg' },
  { no: 5, name: '비스킷 데스크 캘린더', price: 9000, inventory: 0, content: '매달 새로운 독서 문장을 만나는 탁상 달력입니다.', saleYn: 'N', image: '/images/goods/goods_calendar01-thumb.jpg', detail: '/images/goods/goods_calendar01-1.jpg' },
  { no: 6, name: '바삭군 핀버튼', price: 3000, inventory: 15, content: '가방에 작은 독서 취향을 더해 주는 핀버튼입니다.', saleYn: 'Y', image: '/images/goods/goods_pinbutton01-thumb.jpg', detail: '/images/goods/goods_pinbutton01-1.jpg' },
]

export const previewGoods = goods.map(({ image, detail, ...item }) => ({
  goods: item,
  images: { imgPath: image },
  detailImage: detail,
}))

const campaigns = [
  { recycleNo: 1, bookName: '아몬드', bookAuthor: '손원평', publisher: '창비', bookPrice: 14000, discountRate: 40, salePrice: 8400, status: 'S', saleYn: 'N', acceptYn: 'Y', bookImgUrl: '/images/thumb.jpg', bookDetail: previewBooks[0].detail, authorDetail: previewBooks[0].authorDetail },
  { recycleNo: 2, bookName: '작별하지 않는다', bookAuthor: '한강', publisher: '문학동네', bookPrice: 16800, discountRate: 35, salePrice: 10920, status: 'G', saleYn: 'N', acceptYn: 'Y', bookImgUrl: '/images/thumb.jpg', bookDetail: previewBooks[1].detail, authorDetail: previewBooks[1].authorDetail },
  { recycleNo: 3, bookName: '인간 실격', bookAuthor: '다자이 오사무', publisher: '민음사', bookPrice: 11000, discountRate: 50, salePrice: 5500, status: 'N', saleYn: 'Y', acceptYn: 'Y', bookImgUrl: '/images/thumb.jpg', bookDetail: previewBooks[2].detail, authorDetail: previewBooks[2].authorDetail },
]

export const previewCampaigns = campaigns.map((campaign, index) => ({
  ...campaign,
  bookImgUrl: previewBooks[index].bookImgUrl,
}))

export const previewBookclasses = [
  { no: 1, title: '한 문장씩 천천히 읽는 밤', intro: '매주 한 권을 읽고 오래 남은 문장을 함께 나눠요.', location: '서울특별시 중구', locationDetail: '시청역 인근', scheduleStart: '2026.11.21 19:30', scheduleEnd: '2026.11.21 21:00', leaderNickname: '바삭한독서가', partyMemCnt: 4, memberCnt: 8, joined: true, status: '모집중', statusCode: 'Y', bookTitle: previewBooks[0].title, bookAuthor: previewBooks[0].author, bookIsbn: previewBooks[0].isbn, bookImgUrl: previewBooks[0].bookImgUrl, bookDetail: previewBooks[0].detail },
  { no: 2, title: '주말 고전 읽기 모임', intro: '어렵게 느껴졌던 고전을 편안하게 이야기하는 모임입니다.', location: '서울특별시 마포구', locationDetail: '합정역 인근', scheduleStart: '2026.11.28 14:00', scheduleEnd: '2026.11.28 16:00', leaderNickname: '책과쿠키', partyMemCnt: 5, memberCnt: 10, joined: false, status: '모집중', statusCode: 'Y', bookTitle: previewBooks[2].title, bookAuthor: previewBooks[2].author, bookIsbn: previewBooks[2].isbn, bookImgUrl: previewBooks[2].bookImgUrl, bookDetail: previewBooks[2].detail },
  { no: 3, title: '우리의 기억과 문학', intro: '기억을 다룬 소설을 읽으며 서로의 감상을 존중해 나눕니다.', location: '서울특별시 성동구', locationDetail: '서울숲 인근', scheduleStart: '2026.12.05 11:00', scheduleEnd: '2026.12.05 13:00', leaderNickname: '페이지수집가', partyMemCnt: 3, memberCnt: 6, joined: false, status: '모집중', statusCode: 'Y', bookTitle: previewBooks[1].title, bookAuthor: previewBooks[1].author, bookIsbn: previewBooks[1].isbn, bookImgUrl: previewBooks[1].bookImgUrl, bookDetail: previewBooks[1].detail },
]

const events = [
  { no: 1, title: '올해의 문장을 들려주세요', content: '올해 읽은 책에서 가장 오래 남은 문장을 공유해 주세요.', event_start: [2026, 11, 1], event_end: [2027, 12, 31], cnt: 128, createdAt: '2026-11-01', thumbnail: '/images/event/event01_thumb.jpg', contentImage: '/images/event/event01_content.jpg' },
  { no: 2, title: '비스킷 독서 기록 챌린지', content: '한 달 동안 네 번의 독서 기록을 남기면 작은 선물을 드립니다.', event_start: [2026, 11, 10], event_end: [2027, 12, 31], cnt: 96, createdAt: '2026-11-10', thumbnail: '/images/event/event02_thumb.jpg', contentImage: '/images/event/event02_content.jpg' },
  { no: 3, title: '나만의 책갈피 만들기', content: '좋아하는 문장으로 나만의 책갈피를 완성해 보세요.', event_start: [2026, 11, 15], event_end: [2027, 12, 31], cnt: 74, createdAt: '2026-11-15', thumbnail: '/images/event/event03_thumb.jpg', contentImage: '/images/event/event03_content.jpg' },
]

const eventContent = [
  { title: '어서와, 비스킷은 처음이지?', eventType: '신규 가입', content: '지금 신규가입을 하면, 추첨을 통해 스타벅스 아메리카노 기프티콘 지급!', thumbnail: '/images/event/event01_thumb.jpg', contentImage: '/images/event/event01_content.jpg' },
  { title: '마음의 힘과 자신감을 키우는 법', eventType: '마음 회복', content: '심리학 박사가 전하는 마음 회복 프로젝트. 찌뿌둥한 마음 기지개 켤 준비가 되셨나요?', thumbnail: '/images/event/event02_thumb.jpg', contentImage: '/images/event/event02_content.jpg' },
  { title: '지나고 나서야 알게된 것들', eventType: '이야기 공유', content: '지나야만 알 수 있는 삶의 지혜에 대하여. 나만의 삶의 지혜가 있다면 공유해 주세요!', thumbnail: '/images/event/event03_thumb.jpg', contentImage: '/images/event/event03_content.jpg' },
]

export const previewEvents = events.map((event, index) => ({ ...event, ...eventContent[index] }))

export const previewReader = { ...previewUser, no: 2, userId: 'reader02', name: '독서가', nickname: '책과쿠키' }

export const previewBooklog = {
  no: 10,
  user_no: previewUser,
  user: previewUser,
  booklog_name: '한입 독서 기록',
  booklogName: '한입 독서 기록',
  intro: '책에서 건져 올린 문장과 생각을 천천히 기록합니다.',
}

export const previewBooklogs = [previewBooklog, {
  ...previewBooklog, no: 20, user_no: previewReader, user: previewReader,
  booklog_name: '책과 쿠키 한 조각', booklogName: '책과 쿠키 한 조각',
  intro: '천천히 읽고 오래 남은 문장을 나눕니다.',
}]

export const previewArticles = previewBooks.map((book, index) => ({
  no: index + 1,
  title: ['마음을 이해하는 연습', '기억이 우리를 이어 주는 방식', '불완전한 사람의 고백'][index],
  content: ['감정을 표현하는 일이 서툴러도 관계는 우리를 조금씩 변화시킨다.', '잊지 않으려는 마음은 결국 누군가의 곁에 남으려는 마음일지도 모른다.', '약함을 숨기는 대신 들여다볼 때 비로소 시작되는 이야기가 있다.'][index],
  groups: ['소설', '문장수집', '고전'][index],
  kinds: ['성장', '기억', '고독'][index],
  cnt: 42 + index * 17,
  likes: 8 + index * 3,
  created_at: [2026, 11, 15 - index, 20, 10, 0],
  updatedAt: `2026.11.${15 - index}`,
  createdAt: `2026.11.${15 - index}`,
  books_no: book,
  books: book,
  booklog_no: { no: index === 1 ? 20 : 10, user: index === 1 ? previewReader : previewUser },
  booklog: { no: index === 1 ? 20 : 10, user: index === 1 ? previewReader : previewUser },
}))

export const previewComments = [
  { no: 1, content: '저도 이 문장이 오래 남았어요.', del_yn: 'N', updated_at: [2026, 11, 16, 21, 5, 0], user_no: { ...previewUser, no: 2, userId: 'reader02', nickname: '책과쿠키' } },
]

export const previewOrders = [
  { no: 1, orderNo: 1, order_status: 'D', orderStatus: '배송중', status: '배송중', statusCode: 'D', createdAt: '2026-11-12T09:20:00', created_at: '2026-11-12T09:20:00', merchant_uid: 'BISCUIT-EXAMPLE-001', gno: 1, gname: previewGoods[0].goods.name, gprice: previewGoods[0].goods.price, gimgPath: previewGoods[0].images.imgPath, orderCnt: 1, orderPrice: previewGoods[0].goods.price, shipTo: previewUser.name, phone: previewUser.phone, shipPost: previewUser.zipCode, shipAddress: previewUser.address, shipDetail: previewUser.address_detail, payment: '카드', orderDate: '2026-11-12T09:20:00', pd_name: previewGoods[0].goods.name, name: previewGoods[0].goods.name, amount: previewGoods[0].goods.price, price: previewGoods[0].goods.price, pd_cnt: 1, cnt: 1 },
]
