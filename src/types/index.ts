// 회원 도서관
export interface Library {
  id: number;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  phone?: string;
  hours?: string;
  closedDays?: string;
  description?: string;
  specialProgram?: string;
  imageUrl?: string;
  homepageUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// 게시글 (공지/소식/보도자료)
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  category: "notice" | "news" | "press";
  images?: string[];
  attachments?: Attachment[];
  isPinned: boolean;
  viewCount: number;
  prevPost?: { id: number; title: string | null };
  nextPost?: { id: number; title: string | null };
  createdAt: string;
  updatedAt: string;
}

// 사업/프로그램
export interface Program {
  id: number;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  status: "planned" | "ongoing" | "completed";
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  location?: string;
  targetAudience?: string;
  createdAt: string;
  updatedAt: string;
}

// 커뮤니티 글
export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  category: "free" | "book-recommend" | "reading-group" | "human-library";
  authorName: string;
  viewCount: number;
  prevPost?: { id: number; title: string | null };
  nextPost?: { id: number; title: string | null };
  createdAt: string;
  updatedAt: string;
}

// 자료
export interface Resource {
  id: number;
  title: string;
  description?: string;
  category: "minutes" | "archive" | "form" | "etc";
  fileUrl: string;
  fileName: string;
  fileSize: number;
  downloadCount: number;
  createdAt: string;
}

// 갤러리 앨범
export interface GalleryAlbum {
  id: number;
  title: string;
  description?: string;
  date: string;
  thumbnailUrl?: string;
  imageCount?: number;
  images?: GalleryImage[];
  createdAt: string;
}

// 갤러리 이미지
export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption?: string;
  order: number;
}

// 첨부파일
export interface Attachment {
  name: string;
  url: string;
  size: number;
}

// 페이지네이션
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API 응답
export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

export interface ApiError {
  error: string;
  message: string;
}

// 네비게이션 메뉴
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
