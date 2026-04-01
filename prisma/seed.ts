import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('시드 데이터 생성 시작...')

  // 1. 관리자 계정
  const hashedAdminPassword = await bcrypt.hash('admin1234', 12)
  await prisma.user.upsert({
    where: { loginId: 'admin' },
    update: {},
    create: {
      loginId: 'admin',
      password: hashedAdminPassword,
      name: '관리자',
      role: 'admin',
    },
  })
  console.log('관리자 계정 생성 완료')

  // 2. 샘플 도서관 (6개)
  const libraries = [
    {
      name: '꿈나무작은도서관',
      address: '경기도 시흥시 정왕대로 233, 정왕본동 주민센터 2층',
      lat: 37.3459,
      lng: 126.7381,
      phone: '031-310-2865',
      hours: '월~금 10:00-18:00, 토 10:00-14:00',
      closedDays: '일요일, 공휴일',
      description: '정왕본동 주민센터 내에 위치한 어린이 특화 작은도서관입니다. 그림책과 동화책이 풍부하며, 아이들을 위한 다양한 독서 프로그램을 운영하고 있습니다.',
      specialProgram: '그림책 읽어주기, 독서캠프, 북아트 체험',
      isActive: true,
      order: 1,
    },
    {
      name: '햇살작은도서관',
      address: '경기도 시흥시 서울대학로 59번길 14, 배곧동 주민센터 3층',
      lat: 37.3801,
      lng: 126.7332,
      phone: '031-310-4812',
      hours: '월~금 09:00-19:00, 토 09:00-17:00',
      closedDays: '일요일, 법정공휴일',
      description: '배곧신도시 주민을 위한 열린 도서관입니다. 최신 베스트셀러와 다양한 장르의 도서를 갖추고 있습니다.',
      specialProgram: '독서토론, 영어동화 스토리텔링, 작가와의 만남',
      isActive: true,
      order: 2,
    },
    {
      name: '숲속작은도서관',
      address: '경기도 시흥시 은행로 12, 대야동 408-3',
      lat: 37.4434,
      lng: 126.8031,
      phone: '031-311-7890',
      hours: '월~금 10:00-18:00',
      closedDays: '주말, 공휴일',
      description: '대야동 주민을 위한 아늑한 작은도서관입니다. 숲과 자연을 테마로 한 특별 컬렉션을 보유하고 있습니다.',
      specialProgram: '숲속 독서회, 생태 그림책 모임',
      isActive: true,
      order: 3,
    },
    {
      name: '별빛작은도서관',
      address: '경기도 시흥시 신천로 100, 신천동 342-1',
      lat: 37.3752,
      lng: 126.7985,
      phone: '031-404-3456',
      hours: '월~금 10:00-20:00, 토 10:00-17:00',
      closedDays: '일요일, 공휴일',
      description: '야간 운영으로 직장인들도 이용할 수 있는 작은도서관입니다. 북카페 분위기의 편안한 독서 공간을 제공합니다.',
      specialProgram: '야간 독서모임, 직장인 북클럽, 인문학 강좌',
      isActive: true,
      order: 4,
    },
    {
      name: '동화나라작은도서관',
      address: '경기도 시흥시 목감중앙로 18, 목감동 산65-3',
      lat: 37.3999,
      lng: 126.8543,
      phone: '031-310-5678',
      hours: '월~금 09:30-17:30, 토 09:30-13:00',
      closedDays: '일요일, 공휴일',
      description: '목감지구에 위치한 어린이 전문 작은도서관입니다. 동화책을 중심으로 유아 및 초등학생을 위한 프로그램을 운영합니다.',
      specialProgram: '동화 구연, 어린이 독서교실, 방학 특별 프로그램',
      isActive: true,
      order: 5,
    },
    {
      name: '오이도작은도서관',
      address: '경기도 시흥시 오이도로 175, 정왕동 1839-2',
      lat: 37.3482,
      lng: 126.6872,
      phone: '031-499-1234',
      hours: '화~토 10:00-18:00',
      closedDays: '월요일, 일요일, 공휴일',
      description: '오이도 해양 문화와 함께하는 작은도서관입니다. 바다와 환경을 주제로 한 특색 있는 장서를 보유하고 있습니다.',
      specialProgram: '해양생태 독서, 환경 그림책 모임, 오이도 역사 탐방',
      isActive: true,
      order: 6,
    },
  ]

  for (const library of libraries) {
    await prisma.library.create({ data: library })
  }
  console.log('도서관 6개 생성 완료')

  // 3. 샘플 게시글 (4개)
  await prisma.post.create({
    data: {
      title: '시흥시작은도서관협의회 공식 출범 안내',
      content: '<p>안녕하세요, 시흥시작은도서관협의회입니다.</p><p>2025년 12월 16일, 시흥시 관내 작은도서관들이 모여 <strong>시흥시작은도서관협의회</strong>를 공식 출범하였습니다.</p><p>앞으로 회원 도서관 간 네트워크를 강화하고, 다양한 독서문화 프로그램을 기획하여 시흥시 주민들에게 더 나은 도서관 서비스를 제공하겠습니다.</p><p>많은 관심과 참여를 부탁드립니다.</p>',
      excerpt: '2025년 12월 16일, 시흥시작은도서관협의회가 공식 출범하였습니다. 앞으로 회원 도서관 간 네트워크를 강화하고 다양한 독서문화 프로그램을 기획하겠습니다.',
      category: 'notice',
      isPinned: true,
      viewCount: 234,
    },
  })

  await prisma.post.create({
    data: {
      title: '2026년 상반기 정기총회 개최 안내',
      content: '<p>2026년 상반기 정기총회를 아래와 같이 안내드립니다.</p><ul><li><strong>일시:</strong> 2026년 4월 15일(수) 14:00</li><li><strong>장소:</strong> 시흥시청 대회의실</li><li><strong>안건:</strong> 상반기 사업보고, 하반기 사업계획 심의, 임원 선출</li></ul><p>회원 도서관 관계자분들의 많은 참석을 부탁드립니다.</p>',
      excerpt: '2026년 상반기 정기총회를 2026년 4월 15일(수) 14:00, 시흥시청 대회의실에서 개최합니다.',
      category: 'notice',
      isPinned: true,
      viewCount: 156,
    },
  })

  await prisma.post.create({
    data: {
      title: '제1회 시흥 작은도서관 축제 성공적 개최',
      content: '<p>지난 3월 22일, 시흥시 중앙공원에서 <strong>제1회 시흥 작은도서관 축제</strong>가 성공적으로 개최되었습니다.</p><p>이번 축제에는 시흥시 관내 20여 개 작은도서관이 참여하여, 책 나눔 행사, 작가와의 만남, 어린이 독서 퀴즈 대회 등 다양한 프로그램을 진행했습니다.</p><p>약 500여 명의 시민들이 참여해 주셨으며, 작은도서관의 역할과 가치를 널리 알리는 뜻깊은 시간이었습니다.</p>',
      excerpt: '지난 3월 22일, 시흥시 중앙공원에서 제1회 시흥 작은도서관 축제가 성공적으로 개최되었습니다. 약 500여 명의 시민이 참여했습니다.',
      category: 'news',
      viewCount: 89,
    },
  })

  await prisma.post.create({
    data: {
      title: '시흥시, 작은도서관 지원 사업 확대 추진',
      content: '<p>시흥시가 2026년 작은도서관 지원 사업을 대폭 확대하기로 했습니다.</p><p>시흥시는 올해 작은도서관 운영 지원금을 전년 대비 30% 증액하고, 신규 작은도서관 설립을 위한 컨설팅 서비스를 제공할 예정입니다.</p><p>시흥시작은도서관협의회는 이번 지원 사업이 관내 작은도서관의 운영 활성화에 큰 도움이 될 것으로 기대하고 있습니다.</p>',
      excerpt: '시흥시가 2026년 작은도서관 지원 사업을 대폭 확대하기로 했습니다. 운영 지원금 30% 증액, 신규 설립 컨설팅 서비스 등이 포함됩니다.',
      category: 'press',
      viewCount: 67,
    },
  })
  console.log('게시글 4개 생성 완료')

  // 4. 샘플 프로그램 (3개)
  await prisma.program.create({
    data: {
      title: '2026 작은도서관 연합 독서프로그램',
      description: '시흥시 작은도서관들이 함께하는 연합 독서프로그램입니다.',
      content: '<p>시흥시 작은도서관들이 연합하여 진행하는 독서프로그램입니다.</p><p>매월 하나의 공통 도서를 선정하여, 각 도서관에서 독서토론을 진행합니다. 참가자들은 온라인 독서 커뮤니티를 통해 다른 도서관 참가자들과도 교류할 수 있습니다.</p><ul><li><strong>기간:</strong> 2026년 3월 ~ 2026년 6월</li><li><strong>대상:</strong> 시흥시 주민 누구나</li><li><strong>참여 방법:</strong> 가까운 소속 도서관에 방문 신청</li></ul>',
      category: 'reading',
      status: 'ongoing',
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-06-30'),
      location: '각 소속 도서관',
      targetAudience: '시흥시 주민 누구나',
    },
  })

  await prisma.program.create({
    data: {
      title: '작은도서관 운영자 역량강화 워크숍',
      description: '작은도서관 운영자를 위한 전문 역량강화 프로그램입니다.',
      content: '<p>작은도서관 운영에 필요한 실무 역량을 강화하기 위한 워크숍입니다.</p><p>도서관 운영 기획, 장서 관리, 프로그램 기획, 홍보 마케팅 등 실질적인 도움이 되는 교육을 제공합니다.</p>',
      category: 'education',
      status: 'planned',
      startDate: new Date('2026-05-10'),
      endDate: new Date('2026-05-11'),
      location: '시흥시 평생학습센터',
      targetAudience: '작은도서관 관장 및 운영자',
    },
  })

  await prisma.program.create({
    data: {
      title: '사람도서관: 이웃의 이야기',
      description: '시흥시 주민들이 직접 책이 되어 자신의 이야기를 나누는 프로그램입니다.',
      content: '<p>사람도서관은 사람이 책이 되어, 독자(참여자)에게 자신의 경험과 이야기를 들려주는 프로그램입니다.</p><p>시흥시의 다양한 주민들 — 퇴직 교사, 다문화 가정, 청년 창업가, 어르신 등 — 이 살아있는 책이 되어 이웃과 소통합니다.</p>',
      category: 'culture',
      status: 'completed',
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-02-28'),
      location: '별빛작은도서관',
      targetAudience: '시흥시 주민 누구나',
    },
  })
  console.log('프로그램 3개 생성 완료')

  // 5. 샘플 커뮤니티 게시글 (3개)
  const communityPassword = await bcrypt.hash('1234', 12)

  await prisma.communityPost.create({
    data: {
      title: '이번 달 추천도서: 나미야 잡화점의 기적',
      content: '<p>히가시노 게이고의 <strong>나미야 잡화점의 기적</strong>을 추천합니다.</p><p>고민 상담 편지를 받는 잡화점과 고아원 아이들의 이야기가 시간을 넘어 연결되는 감동적인 소설입니다. 따뜻한 봄날에 읽기 딱 좋은 책이에요.</p>',
      category: 'book-recommend',
      authorName: '독서마니아',
      password: communityPassword,
      viewCount: 45,
    },
  })

  await prisma.communityPost.create({
    data: {
      title: '정왕동 독서모임 함께하실 분 모집합니다',
      content: '<p>안녕하세요! 정왕동 근처에서 독서모임을 함께하실 분을 찾고 있습니다.</p><ul><li><strong>모임 주기:</strong> 격주 토요일 오전 10시</li><li><strong>장소:</strong> 꿈나무작은도서관</li><li><strong>장르:</strong> 소설 위주 (한국/세계 문학)</li></ul><p>관심 있으신 분은 도서관으로 문의해주세요!</p>',
      category: 'reading-group',
      authorName: '책벌레',
      password: communityPassword,
      viewCount: 32,
    },
  })

  await prisma.communityPost.create({
    data: {
      title: '도서관에서 만난 좋은 이웃',
      content: '<p>작은도서관에 다니면서 이웃들과 친해지게 되었어요. 처음엔 그냥 책 빌리러 갔는데, 이제는 매주 가는 게 즐거워요.</p><p>아이들도 도서관 프로그램 덕분에 책 읽는 습관이 생겼고, 같은 동네 부모님들과도 자연스럽게 친해졌습니다. 작은도서관이 정말 마을의 사랑방 같은 곳이네요. 감사합니다!</p>',
      category: 'free',
      authorName: '행복한맘',
      password: communityPassword,
      viewCount: 28,
    },
  })
  console.log('커뮤니티 게시글 3개 생성 완료')

  // 6. 샘플 갤러리 (2개)
  const gallery1 = await prisma.gallery.create({
    data: {
      title: '2026 신년 네트워킹 행사',
      description: '시흥시작은도서관협의회 회원 도서관 관장님들이 한자리에 모인 신년 네트워킹 행사입니다.',
      date: new Date('2026-01-20'),
      images: {
        create: [
          { imageUrl: '/uploads/galleries/event-1-01.jpg', caption: '개회식 전경', order: 1 },
          { imageUrl: '/uploads/galleries/event-1-02.jpg', caption: '회장님 인사말씀', order: 2 },
          { imageUrl: '/uploads/galleries/event-1-03.jpg', caption: '단체 사진', order: 3 },
        ],
      },
    },
  })

  const gallery2 = await prisma.gallery.create({
    data: {
      title: '제1회 시흥 작은도서관 축제',
      description: '시흥시 중앙공원에서 열린 제1회 작은도서관 축제 현장 스케치입니다.',
      date: new Date('2026-03-22'),
      images: {
        create: [
          { imageUrl: '/uploads/galleries/festival-01.jpg', caption: '축제 입구 전경', order: 1 },
          { imageUrl: '/uploads/galleries/festival-02.jpg', caption: '책 나눔 행사', order: 2 },
          { imageUrl: '/uploads/galleries/festival-03.jpg', caption: '어린이 독서 퀴즈 대회', order: 3 },
          { imageUrl: '/uploads/galleries/festival-04.jpg', caption: '작가와의 만남', order: 4 },
        ],
      },
    },
  })
  console.log('갤러리 2개 생성 완료')

  console.log('시드 데이터 생성 완료!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
