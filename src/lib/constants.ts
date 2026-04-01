import { NavItem } from "@/types";

export const SITE_NAME = "시흥시작은도서관협의회";
export const SITE_DESCRIPTION =
  "시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티";
export const SITE_URL = "https://siheung-library.vercel.app";

export const NAV_ITEMS: NavItem[] = [
  { label: "소개", href: "/about" },
  { label: "회원도서관", href: "/libraries" },
  { label: "소식", href: "/news" },
  { label: "사업안내", href: "/programs" },
  { label: "도란도란", href: "/community" },
  { label: "자료실", href: "/resources" },
  { label: "갤러리", href: "/gallery" },
];

export const POST_CATEGORIES = {
  notice: "공지사항",
  news: "활동소식",
  press: "보도자료",
} as const;

export const COMMUNITY_CATEGORIES = {
  free: "자유게시판",
  "book-recommend": "추천도서",
  "reading-group": "독서모임",
  "human-library": "사람도서관",
} as const;

export const RESOURCE_CATEGORIES = {
  minutes: "회의록",
  archive: "자료모음",
  form: "서식",
  etc: "기타",
} as const;

export const PROGRAM_STATUS = {
  planned: "예정",
  ongoing: "진행중",
  completed: "완료",
} as const;

export const PROGRAM_STATUS_COLORS = {
  planned: "bg-blue-100 text-blue-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
} as const;
