# 시흥시작은도서관협의회 - 시스템 아키텍처

## 1. 기술 스택

| 영역 | 기술 | 버전 | 비고 |
|------|------|------|------|
| 프레임워크 | Next.js (App Router) | 14.x | RSC + Server Actions |
| 스타일링 | Tailwind CSS | 3.x | 모바일 퍼스트 |
| 데이터베이스 | SQLite | 3.x | 경량, 서버리스 |
| ORM | Prisma | 5.x | 타입 안전 쿼리 |
| 인증 | NextAuth.js | 4.x | Credentials Provider (관리자 전용) |
| 파일 업로드 | 로컬 스토리지 (`/public/uploads`) | - | MVP 단계 |
| 배포 | Vercel | - | Edge 최적화 |
| 언어 | TypeScript | 5.x | 전체 프로젝트 |

## 2. 시스템 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                     클라이언트 (브라우저)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ PC 브라우저 │  │ 모바일 브라우저│  │ 태블릿     │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Next.js 14 App Router               │    │
│  │                                                   │    │
│  │  ┌─────────────┐  ┌──────────────────────────┐   │    │
│  │  │  공개 페이지   │  │     관리자 페이지 (/admin) │   │    │
│  │  │  (SSR/SSG)   │  │     (CSR + Server Actions)│   │    │
│  │  └──────┬──────┘  └───────────┬──────────────┘   │    │
│  │         │                      │                   │    │
│  │         ▼                      ▼                   │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │           API Routes (/api/*)             │     │    │
│  │  │  ┌────────┐ ┌────────┐ ┌────────────┐    │     │    │
│  │  │  │  Auth   │ │  CRUD  │ │  File Upload│    │     │    │
│  │  │  └────────┘ └────────┘ └────────────┘    │     │    │
│  │  └──────────────────┬───────────────────────┘     │    │
│  │                      │                             │    │
│  │                      ▼                             │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │         Prisma ORM Layer                  │     │    │
│  │  └──────────────────┬───────────────────────┘     │    │
│  │                      │                             │    │
│  │                      ▼                             │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │         SQLite Database                   │     │    │
│  │  │         (prisma/dev.db)                   │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 3. 디렉토리 구조

```
siheung-small-library/
├── _workspace/                    # 설계 문서
├── prisma/
│   ├── schema.prisma              # DB 스키마
│   ├── seed.ts                    # 시드 데이터
│   └── dev.db                     # SQLite DB 파일
├── public/
│   ├── uploads/                   # 업로드 파일 저장
│   │   ├── images/
│   │   ├── galleries/
│   │   └── files/
│   ├── images/                    # 정적 이미지 (로고, 아이콘)
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── page.tsx               # 메인 페이지
│   │   ├── globals.css            # 글로벌 스타일
│   │   │
│   │   ├── (public)/              # 공개 페이지 그룹
│   │   │   ├── about/             # 협의회 소개
│   │   │   │   ├── page.tsx       # 인사말/설립목적
│   │   │   │   ├── history/page.tsx    # 연혁
│   │   │   │   ├── organization/page.tsx # 조직도
│   │   │   │   └── rules/page.tsx      # 회칙
│   │   │   │
│   │   │   ├── libraries/         # 회원 도서관
│   │   │   │   ├── page.tsx       # 도서관 목록 + 지도
│   │   │   │   └── [id]/page.tsx  # 도서관 상세
│   │   │   │
│   │   │   ├── news/              # 소식/공지
│   │   │   │   ├── page.tsx       # 목록 (탭: 공지/소식/보도)
│   │   │   │   └── [id]/page.tsx  # 상세
│   │   │   │
│   │   │   ├── programs/          # 사업 안내
│   │   │   │   ├── page.tsx       # 사업 목록
│   │   │   │   └── [id]/page.tsx  # 사업 상세
│   │   │   │
│   │   │   ├── community/         # 도란도란 (커뮤니티)
│   │   │   │   ├── page.tsx       # 커뮤니티 메인
│   │   │   │   ├── free/page.tsx          # 자유게시판
│   │   │   │   ├── books/page.tsx         # 추천도서
│   │   │   │   ├── reading-group/page.tsx # 독서모임
│   │   │   │   ├── human-library/page.tsx # 사람도서관
│   │   │   │   └── [id]/page.tsx          # 게시글 상세
│   │   │   │
│   │   │   ├── resources/         # 자료실
│   │   │   │   └── page.tsx       # 자료 목록 + 다운로드
│   │   │   │
│   │   │   └── gallery/           # 갤러리
│   │   │       ├── page.tsx       # 앨범 목록
│   │   │       └── [id]/page.tsx  # 앨범 상세 (사진 뷰어)
│   │   │
│   │   ├── admin/                 # 관리자 페이지
│   │   │   ├── layout.tsx         # 관리자 레이아웃 (사이드바)
│   │   │   ├── page.tsx           # 대시보드
│   │   │   ├── login/page.tsx     # 로그인
│   │   │   ├── libraries/         # 도서관 관리
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── posts/             # 게시글 관리
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── programs/          # 사업 관리
│   │   │   ├── community/         # 커뮤니티 관리
│   │   │   ├── resources/         # 자료 관리
│   │   │   └── gallery/           # 갤러리 관리
│   │   │
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── libraries/
│   │       │   ├── route.ts       # GET(목록), POST(생성)
│   │       │   └── [id]/route.ts  # GET, PUT, DELETE
│   │       ├── posts/
│   │       ├── programs/
│   │       ├── community/
│   │       ├── resources/
│   │       ├── gallery/
│   │       └── upload/route.ts    # 파일 업로드
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # 상단 네비게이션
│   │   │   ├── Footer.tsx         # 하단 푸터
│   │   │   ├── MobileNav.tsx      # 모바일 햄버거 메뉴
│   │   │   └── AdminSidebar.tsx   # 관리자 사이드바
│   │   │
│   │   ├── ui/                    # 공통 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # 메인 히어로 배너
│   │   │   ├── LatestNews.tsx     # 최신 소식
│   │   │   ├── FeaturedPrograms.tsx # 주요 사업
│   │   │   ├── LibraryMap.tsx     # 도서관 지도 미리보기
│   │   │   └── QuickLinks.tsx     # 바로가기
│   │   │
│   │   ├── library/
│   │   │   ├── LibraryCard.tsx    # 도서관 카드
│   │   │   ├── LibraryMap.tsx     # 카카오맵 연동
│   │   │   └── LibraryDetail.tsx  # 도서관 상세 정보
│   │   │
│   │   └── shared/
│   │       ├── PostList.tsx       # 게시글 목록 (공통)
│   │       ├── PostDetail.tsx     # 게시글 상세 (공통)
│   │       ├── RichTextEditor.tsx # 관리자 에디터
│   │       └── CategoryTabs.tsx   # 카테고리 탭
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Prisma 클라이언트 싱글톤
│   │   ├── auth.ts                # NextAuth 설정
│   │   ├── utils.ts               # 유틸리티 함수
│   │   └── constants.ts           # 상수 (카테고리, 메뉴 등)
│   │
│   └── types/
│       └── index.ts               # TypeScript 타입 정의
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── .env.local
```

## 4. 디자인 시스템

### 4.1 컬러 팔레트

```
Primary (숲/자연)
├── forest-900: #1A3009     # 가장 진한 녹색
├── forest-700: #2D5016     # 메인 녹색 ★
├── forest-500: #4A7C28     # 밝은 녹색
├── forest-300: #8CB86B     # 연한 녹색
└── forest-100: #E8F5E0     # 배경용 연녹색

Accent (따뜻한 갈색)
├── warm-900: #5C4510       # 진한 갈색
├── warm-700: #8B6914       # 메인 갈색 ★
├── warm-500: #B8941E       # 골드
├── warm-300: #D4B84A       # 밝은 골드
└── warm-100: #FFF3D0       # 연한 노란색

Neutral (따뜻한 회색)
├── cream:    #FFF8E7       # 크림 배경 ★
├── ivory:    #FFFDF5       # 밝은 배경
├── warm-gray-700: #4A4540  # 본문 텍스트
├── warm-gray-500: #7A7570  # 보조 텍스트
├── warm-gray-300: #C5C0B8  # 테두리
├── warm-gray-100: #F0EDE8  # 섹션 배경
└── white:    #FFFFFF        # 카드 배경

Status
├── info:    #2563EB
├── success: #16A34A
├── warning: #F59E0B
└── error:   #DC2626
```

### 4.2 타이포그래피

```
폰트: Pretendard (한글 최적화 웹폰트)
대체: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif

크기 체계:
├── text-xs:   12px  (0.75rem)   — 캡션, 날짜
├── text-sm:   14px  (0.875rem)  — 보조 텍스트
├── text-base: 16px  (1rem)      — 본문
├── text-lg:   18px  (1.125rem)  — 소제목
├── text-xl:   20px  (1.25rem)   — 카드 제목
├── text-2xl:  24px  (1.5rem)    — 섹션 제목
├── text-3xl:  30px  (1.875rem)  — 페이지 제목
└── text-4xl:  36px  (2.25rem)   — 히어로 타이틀
```

### 4.3 책 모티프 디자인 요소

| 요소 | 적용 위치 | 설명 |
|------|-----------|------|
| 📖 펼쳐진 책 실루엣 | 로고, 히어로 배경 | SVG 일러스트 |
| 📑 접힌 책갈피 | 카드 상단 장식 | CSS clip-path로 구현 |
| 📚 책등 패턴 | 도서관 목록 사이드바 | 반복 배경 패턴 |
| 🍃 나뭇잎 구분선 | 섹션 구분 | SVG divider |
| 📝 원고지 라인 | 커뮤니티 글쓰기 | 배경 패턴 |
| 🏠 작은집 아이콘 | 도서관 마커 | 카카오맵 커스텀 마커 |

### 4.4 컴포넌트 스타일 가이드

```
카드 (Card)
├── 배경: white
├── 모서리: rounded-xl (12px)
├── 그림자: shadow-sm hover:shadow-md
├── 테두리: border border-warm-gray-300/50
└── 전환: transition-shadow duration-200

버튼 (Button)
├── Primary:  bg-forest-700 text-white hover:bg-forest-900
├── Secondary: bg-warm-700 text-white hover:bg-warm-900
├── Outline:  border-forest-700 text-forest-700 hover:bg-forest-100
└── Ghost:    text-forest-700 hover:bg-forest-100

네비게이션
├── 배경: white/95 backdrop-blur
├── 높이: h-16 (모바일), h-20 (데스크탑)
├── 활성 메뉴: text-forest-700 border-b-2 border-forest-700
└── 호버: text-forest-500

배지 (Badge)
├── 공지: bg-red-100 text-red-700
├── 진행중: bg-green-100 text-green-700
├── 완료: bg-gray-100 text-gray-600
└── 카테고리: bg-forest-100 text-forest-700
```

## 5. 모바일 퍼스트 반응형 전략

### 브레이크포인트

```
모바일:     < 640px    (기본 스타일)
태블릿:     sm: 640px
소형 데스크탑: md: 768px
데스크탑:    lg: 1024px
와이드:     xl: 1280px
```

### 반응형 레이아웃 패턴

| 컴포넌트 | 모바일 | 태블릿 | 데스크탑 |
|----------|--------|--------|----------|
| 헤더 | 햄버거 메뉴 + 로고 | 축약 메뉴 | 전체 메뉴 |
| 히어로 | 1컬럼, 축소 텍스트 | 2컬럼 | 2컬럼, 장식 |
| 도서관 목록 | 1컬럼 카드 | 2컬럼 그리드 | 3컬럼 그리드 |
| 게시판 | 카드형 목록 | 카드형 목록 | 테이블 목록 |
| 갤러리 | 2컬럼 그리드 | 3컬럼 그리드 | 4컬럼 그리드 |
| 사이드바 | 하단 고정 or 접힘 | 좌측 고정 | 좌측 고정 |
| 지도 | 전체 폭, 높이 300px | 높이 400px | 좌측 목록+우측 지도 |

### 터치 최적화
- 최소 터치 타겟: 44x44px
- 스와이프 갤러리 지원
- 하단 플로팅 액션 버튼 (모바일 관리자)

## 6. SEO 전략

### 메타데이터 구조

```typescript
// 각 페이지별 generateMetadata() 활용
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${pageTitle} | 시흥시작은도서관협의회`,
    description: '시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티',
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: ['/images/og-image.jpg'],
      locale: 'ko_KR',
      type: 'website',
    },
  }
}
```

### SEO 체크리스트
- [x] 시맨틱 HTML (`<main>`, `<article>`, `<nav>`, `<section>`)
- [x] Next.js `generateMetadata` 동적 메타 태그
- [x] Open Graph / Twitter Card
- [x] `sitemap.xml` 자동 생성 (`app/sitemap.ts`)
- [x] `robots.txt` 설정 (`app/robots.ts`)
- [x] JSON-LD 구조화 데이터 (도서관 = `Library`, 게시글 = `Article`)
- [x] 이미지 alt 텍스트 필수
- [x] Next.js `<Image>` 컴포넌트로 자동 최적화
- [x] 정적 페이지 ISR (revalidate: 3600)

## 7. 인증/권한 구조

```
┌─────────────┐
│  관리자 계정   │  ← 환경변수로 설정 (ADMIN_ID, ADMIN_PASSWORD)
│  (1개, 고정)  │     MVP에서는 단일 관리자로 충분
└──────┬──────┘
       │ NextAuth.js Credentials Provider
       ▼
┌─────────────────────────────────┐
│        관리자 세션                 │
│  - 게시글 CRUD                   │
│  - 도서관 정보 관리                │
│  - 파일 업로드/삭제               │
│  - 갤러리 관리                    │
│  - 커뮤니티 글 삭제(관리)          │
└─────────────────────────────────┘

공개 사용자: 읽기 전용 (로그인 불필요)
커뮤니티 글쓰기: 비밀번호 기반 (비회원 글쓰기)
```

## 8. 성능 최적화 전략

| 전략 | 적용 |
|------|------|
| SSG (정적 생성) | 협의회 소개, 회칙 등 고정 페이지 |
| ISR (증분 정적 재생성) | 도서관 목록, 게시글 목록 (revalidate: 3600) |
| SSR (서버 렌더링) | 게시글 상세 (조회수 업데이트) |
| 이미지 최적화 | Next.js Image 컴포넌트 + WebP 변환 |
| 코드 분할 | 동적 import (지도, 에디터, 갤러리 뷰어) |
| 캐싱 | Prisma 쿼리 결과 캐시, fetch cache |

## 9. 배포 환경

### 환경 변수 (.env.local)

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="https://siheung-library.vercel.app"
NEXTAUTH_SECRET="랜덤_시크릿_키"

# Admin
ADMIN_ID="admin"
ADMIN_PASSWORD="해시된_비밀번호"

# Kakao Map (도서관 지도용)
NEXT_PUBLIC_KAKAO_MAP_API_KEY="카카오맵_API_키"
```

### Vercel 배포 설정
- Build Command: `npx prisma generate && next build`
- Output: Standalone
- SQLite: Vercel의 `/tmp` 한계로 인해 추후 Turso(LibSQL) 전환 고려
- 파일 업로드: 추후 Vercel Blob 또는 Cloudflare R2 전환 고려
