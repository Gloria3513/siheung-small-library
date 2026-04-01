import { Library, Post, Program, CommunityPost, Resource, GalleryAlbum } from "@/types";

export const dummyLibraries: Library[] = [
  {
    id: 1, name: "꿈나무작은도서관", address: "시흥시 정왕동 1234-5 꿈나무아파트 관리동 1층",
    lat: 37.3459, lng: 126.7381, phone: "031-123-4567",
    hours: "월~금 10:00-18:00, 토 10:00-14:00", closedDays: "일요일, 공휴일",
    description: "어린이 특화 작은도서관으로 그림책과 동화책이 풍부합니다. 매주 토요일 그림책 읽어주기 프로그램을 운영하고 있습니다.",
    specialProgram: "그림책 읽어주기, 독서캠프, 북아트 체험",
    imageUrl: "", isActive: true, order: 1,
    createdAt: "2025-06-01T00:00:00.000Z", updatedAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: 2, name: "햇살작은도서관", address: "시흥시 배곧동 89-3 햇살마을 커뮤니티센터 2층",
    lat: 37.3792, lng: 126.7342, phone: "031-234-5678",
    hours: "월~금 09:00-18:00, 토 10:00-15:00", closedDays: "일요일, 공휴일",
    description: "배곧신도시에 위치한 따뜻한 도서관입니다. 주민들의 사랑방 역할을 하고 있습니다.",
    specialProgram: "독서토론, 작가와의 만남, 어린이 영어동화",
    imageUrl: "", isActive: true, order: 2,
    createdAt: "2025-07-01T00:00:00.000Z", updatedAt: "2026-02-10T00:00:00.000Z",
  },
  {
    id: 3, name: "은행나무작은도서관", address: "시흥시 대야동 567-8 은행나무마을 경로당 옆",
    lat: 37.4432, lng: 126.8012, phone: "031-345-6789",
    hours: "월~금 10:00-17:00", closedDays: "토, 일, 공휴일",
    description: "마을 어르신과 어린이가 함께하는 세대통합 도서관입니다.",
    specialProgram: "세대통합 독서, 할머니 동화구연, 마을 역사 기록",
    imageUrl: "", isActive: true, order: 3,
    createdAt: "2025-08-01T00:00:00.000Z", updatedAt: "2026-01-20T00:00:00.000Z",
  },
  {
    id: 4, name: "물결작은도서관", address: "시흥시 월곶동 234-1 물결아파트 단지 내",
    lat: 37.3987, lng: 126.7156, phone: "031-456-7890",
    hours: "월~금 10:00-18:00, 토 10:00-13:00", closedDays: "일요일, 공휴일",
    description: "월곶 해안가 근처에 위치한 아늑한 도서관입니다.",
    specialProgram: "해양생태 독서, 환경 그림책 만들기",
    imageUrl: "", isActive: true, order: 4,
    createdAt: "2025-09-01T00:00:00.000Z", updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: 5, name: "산들바람작은도서관", address: "시흥시 능곡동 456-7 산들마을 주민센터 3층",
    lat: 37.4201, lng: 126.7845, phone: "031-567-8901",
    hours: "화~토 10:00-18:00", closedDays: "일, 월, 공휴일",
    description: "청소년 특화 프로그램을 운영하는 도서관입니다.",
    specialProgram: "청소년 독서모임, 진로독서, 미디어 리터러시",
    imageUrl: "", isActive: true, order: 5,
    createdAt: "2025-10-01T00:00:00.000Z", updatedAt: "2026-02-28T00:00:00.000Z",
  },
  {
    id: 6, name: "별빛작은도서관", address: "시흥시 신천동 789-2 별빛타운 상가 2층",
    lat: 37.4356, lng: 126.7923, phone: "031-678-9012",
    hours: "월~금 13:00-20:00, 토 10:00-17:00", closedDays: "일요일, 공휴일",
    description: "저녁 시간까지 운영하여 직장인도 이용 가능한 도서관입니다.",
    specialProgram: "야간 독서모임, 북큐레이션, 원데이 클래스",
    imageUrl: "", isActive: true, order: 6,
    createdAt: "2025-11-01T00:00:00.000Z", updatedAt: "2026-03-15T00:00:00.000Z",
  },
];

export const dummyPosts: Post[] = [
  {
    id: 1, title: "2026년 정기총회 안내", category: "notice",
    content: "<p>시흥시작은도서관협의회 2026년 정기총회를 아래와 같이 개최합니다.</p><p><strong>일시:</strong> 2026년 4월 15일(수) 14:00</p><p><strong>장소:</strong> 시흥시청 대회의실</p><p><strong>안건:</strong></p><ul><li>2025년 사업보고 및 결산</li><li>2026년 사업계획 및 예산안</li><li>임원 선출</li></ul><p>회원 도서관 관장님들의 많은 참석 부탁드립니다.</p>",
    excerpt: "시흥시작은도서관협의회 2026년 정기총회를 아래와 같이 개최합니다.",
    isPinned: true, viewCount: 152, images: [],
    attachments: [{ name: "2026_정기총회_안내문.pdf", url: "/uploads/files/총회안내문.pdf", size: 1024000 }],
    createdAt: "2026-03-15T09:00:00.000Z", updatedAt: "2026-03-15T09:00:00.000Z",
  },
  {
    id: 2, title: "봄맞이 도서관 주간 행사 안내", category: "notice",
    content: "<p>4월 도서관 주간을 맞이하여 시흥시 작은도서관들이 함께 다양한 행사를 준비했습니다.</p><p>각 도서관별 프로그램을 확인하시고 많은 참여 부탁드립니다.</p>",
    excerpt: "4월 도서관 주간을 맞이하여 시흥시 작은도서관들이 함께 다양한 행사를 준비했습니다.",
    isPinned: true, viewCount: 98, images: [],
    createdAt: "2026-03-20T10:00:00.000Z", updatedAt: "2026-03-20T10:00:00.000Z",
  },
  {
    id: 3, title: "꿈나무도서관 봄 독서캠프 성료", category: "news",
    content: "<p>꿈나무작은도서관에서 진행한 봄 독서캠프가 성공적으로 마무리되었습니다. 총 30명의 어린이가 참여하여 즐거운 시간을 보냈습니다.</p>",
    excerpt: "꿈나무작은도서관에서 진행한 봄 독서캠프가 성공적으로 마무리되었습니다.",
    isPinned: false, viewCount: 67, images: [],
    createdAt: "2026-03-18T14:00:00.000Z", updatedAt: "2026-03-18T14:00:00.000Z",
  },
  {
    id: 4, title: "시흥시 작은도서관 지원사업 선정 소식", category: "news",
    content: "<p>우리 협의회 소속 3개 도서관이 경기도 작은도서관 지원사업에 선정되었습니다.</p>",
    excerpt: "우리 협의회 소속 3개 도서관이 경기도 작은도서관 지원사업에 선정되었습니다.",
    isPinned: false, viewCount: 89, images: [],
    createdAt: "2026-03-10T11:00:00.000Z", updatedAt: "2026-03-10T11:00:00.000Z",
  },
  {
    id: 5, title: "[경인일보] 시흥시 작은도서관, 마을의 사랑방이 되다", category: "press",
    content: "<p>경인일보에서 시흥시 작은도서관의 활동을 취재한 기사가 보도되었습니다.</p>",
    excerpt: "경인일보에서 시흥시 작은도서관의 활동을 취재한 기사가 보도되었습니다.",
    isPinned: false, viewCount: 123, images: [],
    createdAt: "2026-03-05T08:00:00.000Z", updatedAt: "2026-03-05T08:00:00.000Z",
  },
];

export const dummyPrograms: Program[] = [
  {
    id: 1, title: "2026 작은도서관 연합 독서프로그램", status: "ongoing",
    description: "시흥시 작은도서관 연합 독서프로그램입니다. 올해의 테마는 '함께 읽는 우리 마을'입니다.",
    content: "<p>시흥시 작은도서관들이 함께하는 연합 독서프로그램입니다.</p><p>매월 선정된 도서를 함께 읽고 각 도서관에서 독서토론을 진행합니다.</p>",
    category: "reading", startDate: "2026-03-01", endDate: "2026-06-30",
    location: "각 소속 도서관", targetAudience: "시흥시 주민 누구나",
    createdAt: "2026-02-15T00:00:00.000Z", updatedAt: "2026-02-15T00:00:00.000Z",
  },
  {
    id: 2, title: "어린이 그림책 축제", status: "planned",
    description: "어린이날을 맞아 진행하는 그림책 축제입니다.",
    content: "<p>5월 어린이날을 맞이하여 그림책 축제를 개최합니다. 그림책 작가 초청 강연, 그림책 만들기 체험, 캐릭터 만나기 등 다양한 프로그램이 준비되어 있습니다.</p>",
    category: "event", startDate: "2026-05-03", endDate: "2026-05-05",
    location: "시흥시 문화의전당", targetAudience: "유아 및 초등학생",
    createdAt: "2026-03-01T00:00:00.000Z", updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: 3, title: "도서관 운영자 역량강화 연수", status: "completed",
    description: "작은도서관 운영자를 위한 역량강화 연수 프로그램입니다.",
    content: "<p>2026년 상반기 작은도서관 운영자 역량강화 연수가 완료되었습니다. 총 22명의 운영자가 참여하였습니다.</p>",
    category: "education", startDate: "2026-01-15", endDate: "2026-02-28",
    location: "시흥시 평생학습센터", targetAudience: "소속 도서관 운영자",
    createdAt: "2026-01-10T00:00:00.000Z", updatedAt: "2026-03-05T00:00:00.000Z",
  },
  {
    id: 4, title: "사람도서관: 마을의 이야기꾼", status: "ongoing",
    description: "마을 주민이 직접 '사람책'이 되어 자신의 이야기를 들려주는 프로그램입니다.",
    content: "<p>사람도서관은 한 사람의 경험과 지식을 책처럼 빌려 읽는 프로그램입니다. 매월 2회 진행됩니다.</p>",
    category: "community", startDate: "2026-03-01", endDate: "2026-12-31",
    location: "월별 순환 도서관", targetAudience: "시흥시 주민 누구나",
    createdAt: "2026-02-20T00:00:00.000Z", updatedAt: "2026-02-20T00:00:00.000Z",
  },
];

export const dummyCommunityPosts: CommunityPost[] = [
  {
    id: 1, title: "이번 달 추천도서: 『나미야 잡화점의 기적』", category: "book-recommend",
    content: "<p>히가시노 게이고의 따뜻한 소설을 추천합니다. 과거와 현재를 잇는 편지를 통해 사람들의 고민과 성장을 그린 작품입니다.</p>",
    excerpt: "히가시노 게이고의 따뜻한 소설을 추천합니다.",
    authorName: "독서마니아", viewCount: 45,
    createdAt: "2026-03-20T14:30:00.000Z", updatedAt: "2026-03-20T14:30:00.000Z",
  },
  {
    id: 2, title: "배곧 독서모임 신규 회원 모집합니다!", category: "reading-group",
    content: "<p>매주 수요일 저녁 7시, 햇살작은도서관에서 독서모임을 진행합니다. 함께 책 읽을 분들을 모집합니다.</p>",
    excerpt: "매주 수요일 저녁 7시, 햇살작은도서관에서 독서모임을 진행합니다.",
    authorName: "배곧책벌레", viewCount: 32,
    createdAt: "2026-03-18T10:00:00.000Z", updatedAt: "2026-03-18T10:00:00.000Z",
  },
  {
    id: 3, title: "아이와 함께 가기 좋은 도서관 추천해주세요", category: "free",
    content: "<p>시흥으로 이사 왔는데 5살 아이와 함께 가기 좋은 작은도서관 추천 부탁드려요!</p>",
    excerpt: "시흥으로 이사 왔는데 5살 아이와 함께 가기 좋은 작은도서관 추천 부탁드려요!",
    authorName: "새내기맘", viewCount: 28,
    createdAt: "2026-03-22T16:45:00.000Z", updatedAt: "2026-03-22T16:45:00.000Z",
  },
  {
    id: 4, title: "사람도서관 참여 후기 - 감동적이었습니다", category: "human-library",
    content: "<p>지난주 사람도서관에 참여했습니다. 30년간 목공 일을 하신 어르신의 이야기가 정말 감동적이었습니다.</p>",
    excerpt: "지난주 사람도서관에 참여했습니다. 30년간 목공 일을 하신 어르신의 이야기가 정말 감동적이었습니다.",
    authorName: "마을주민", viewCount: 56,
    createdAt: "2026-03-15T09:20:00.000Z", updatedAt: "2026-03-15T09:20:00.000Z",
  },
];

export const dummyResources: Resource[] = [
  {
    id: 1, title: "2026년 1월 정기회의록", description: "2026년 1월 15일 정기회의 회의록입니다.",
    category: "minutes", fileUrl: "/uploads/files/회의록_202601.pdf",
    fileName: "회의록_202601.pdf", fileSize: 2048000, downloadCount: 15,
    createdAt: "2026-01-16T00:00:00.000Z",
  },
  {
    id: 2, title: "2026년 사업계획서", description: "2026년 연간 사업계획서입니다.",
    category: "archive", fileUrl: "/uploads/files/사업계획서_2026.pdf",
    fileName: "사업계획서_2026.pdf", fileSize: 3072000, downloadCount: 25,
    createdAt: "2026-01-20T00:00:00.000Z",
  },
  {
    id: 3, title: "도서관 가입신청서", description: "협의회 가입을 위한 신청서 양식입니다.",
    category: "form", fileUrl: "/uploads/files/가입신청서.hwp",
    fileName: "가입신청서.hwp", fileSize: 512000, downloadCount: 42,
    createdAt: "2025-12-01T00:00:00.000Z",
  },
  {
    id: 4, title: "2025년 결산보고서", description: "2025년 연간 결산보고서입니다.",
    category: "archive", fileUrl: "/uploads/files/결산보고서_2025.pdf",
    fileName: "결산보고서_2025.pdf", fileSize: 4096000, downloadCount: 18,
    createdAt: "2026-02-01T00:00:00.000Z",
  },
];

export const dummyGalleryAlbums: GalleryAlbum[] = [
  {
    id: 1, title: "2026 신년 네트워킹 행사",
    description: "소속 도서관 관장님들의 신년 네트워킹 행사 사진입니다.",
    date: "2026-01-20", imageCount: 15,
    createdAt: "2026-01-21T00:00:00.000Z",
    images: [
      { id: 1, imageUrl: "", caption: "개회식 전경", order: 1 },
      { id: 2, imageUrl: "", caption: "회장님 인사말씀", order: 2 },
      { id: 3, imageUrl: "", caption: "네트워킹 시간", order: 3 },
      { id: 4, imageUrl: "", caption: "단체 사진", order: 4 },
    ],
  },
  {
    id: 2, title: "꿈나무도서관 봄 독서캠프",
    description: "어린이들과 함께한 봄 독서캠프 현장입니다.",
    date: "2026-03-15", imageCount: 12,
    createdAt: "2026-03-16T00:00:00.000Z",
    images: [
      { id: 5, imageUrl: "", caption: "독서 시간", order: 1 },
      { id: 6, imageUrl: "", caption: "북아트 체험", order: 2 },
      { id: 7, imageUrl: "", caption: "간식 시간", order: 3 },
    ],
  },
  {
    id: 3, title: "도서관 운영자 역량강화 연수",
    description: "2026년 상반기 역량강화 연수 현장 사진입니다.",
    date: "2026-02-20", imageCount: 8,
    createdAt: "2026-02-21T00:00:00.000Z",
    images: [
      { id: 8, imageUrl: "", caption: "강의 현장", order: 1 },
      { id: 9, imageUrl: "", caption: "조별 토론", order: 2 },
    ],
  },
];

export const historyData = [
  { year: "2024", events: ["시흥시작은도서관협의회 설립 추진위원회 구성", "창립총회 개최 (22개 도서관 참여)"] },
  { year: "2025", events: ["정기총회 개최", "제1회 작은도서관 한마당 개최", "도서관 운영자 역량강화 연수 시작", "시흥시와 업무협약 체결"] },
  { year: "2026", events: ["연합 독서프로그램 시작", "사람도서관 프로젝트 런칭", "어린이 그림책 축제 기획"] },
];
