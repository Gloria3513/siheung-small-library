# 시흥시작은도서관협의회 - 데이터베이스 스키마

## ERD (텍스트 다이어그램)

```
┌─────────────┐
│    User      │
│─────────────│
│ id (PK)      │
│ loginId      │
│ password     │
│ name         │
│ role         │
└─────────────┘

┌─────────────┐
│   Library    │
│─────────────│
│ id (PK)      │
│ name         │
│ address      │
│ lat / lng    │
│ phone        │
│ hours        │
│ closedDays   │
│ description  │
│ specialProg  │
│ imageUrl     │
│ homepageUrl  │
│ isActive     │
│ order        │
└─────────────┘

┌─────────────┐     ┌──────────────┐
│    Post      │     │  Attachment   │
│─────────────│     │──────────────│
│ id (PK)      │──┐  │ id (PK)       │
│ title        │  └──│ postId (FK)   │
│ content      │     │ name          │
│ category     │     │ url           │
│ images (JSON)│     │ size          │
│ isPinned     │     └──────────────┘
│ viewCount    │
└─────────────┘

┌─────────────┐
│   Program    │
│─────────────│
│ id (PK)      │
│ title        │
│ description  │
│ content      │
│ category     │
│ status       │
│ startDate    │
│ endDate      │
│ imageUrl     │
│ location     │
│ targetAud.   │
└─────────────┘

┌──────────────┐
│CommunityPost │
│──────────────│
│ id (PK)       │
│ title         │
│ content       │
│ category      │
│ authorName    │
│ password      │
│ viewCount     │
└──────────────┘

┌─────────────┐
│  Resource    │
│─────────────│
│ id (PK)      │
│ title        │
│ description  │
│ category     │
│ fileUrl      │
│ fileName     │
│ fileSize     │
│ downloadCnt  │
└─────────────┘

┌─────────────┐     ┌──────────────┐
│   Gallery    │     │ GalleryImage  │
│─────────────│     │──────────────│
│ id (PK)      │──┐  │ id (PK)       │
│ title        │  └──│ galleryId(FK) │
│ description  │     │ imageUrl      │
│ date         │     │ caption       │
└─────────────┘     │ order         │
                     └──────────────┘
```

## Prisma 스키마

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// ============================================================
// 사용자 (관리자 전용)
// ============================================================
model User {
  id        Int      @id @default(autoincrement())
  loginId   String   @unique
  password  String   // bcrypt 해시
  name      String   @default("관리자")
  role      String   @default("admin") // "admin" only (확장 대비)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

// ============================================================
// 회원 도서관
// ============================================================
model Library {
  id             Int      @id @default(autoincrement())
  name           String   // 도서관 이름
  address        String   // 주소
  lat            Float?   // 위도
  lng            Float?   // 경도
  phone          String?  // 전화번호
  hours          String?  // 운영시간 (예: "월~금 10:00-18:00")
  closedDays     String?  // 휴관일 (예: "일요일, 공휴일")
  description    String?  // 도서관 소개 (텍스트)
  specialProgram String?  // 특색 프로그램 (쉼표 구분)
  imageUrl       String?  // 대표 이미지 URL
  homepageUrl    String?  // 홈페이지 URL
  isActive       Boolean  @default(true)  // 활성 상태
  order          Int      @default(0)     // 표시 순서
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("libraries")
}

// ============================================================
// 게시글 (공지사항, 활동소식, 보도자료)
// ============================================================
model Post {
  id          Int          @id @default(autoincrement())
  title       String       // 제목
  content     String       // HTML 본문
  excerpt     String?      // 요약 (목록 표시용, 자동 생성)
  category    String       // "notice" | "news" | "press"
  images      String       @default("[]") // JSON 배열 (이미지 URL 목록)
  isPinned    Boolean      @default(false) // 상단 고정
  viewCount   Int          @default(0)     // 조회수
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  attachments Attachment[]

  @@index([category])
  @@index([isPinned])
  @@index([createdAt])
  @@map("posts")
}

// 게시글 첨부파일
model Attachment {
  id     Int    @id @default(autoincrement())
  postId Int
  name   String // 파일 원본명
  url    String // 파일 URL
  size   Int    // 파일 크기 (bytes)
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@map("attachments")
}

// ============================================================
// 사업/프로그램
// ============================================================
model Program {
  id             Int      @id @default(autoincrement())
  title          String   // 사업/프로그램 제목
  description    String?  // 간략 설명
  content        String?  // 상세 HTML 내용
  category       String?  // 사업 분류 (예: "reading", "culture", "network", "education")
  status         String   @default("planned") // "planned" | "ongoing" | "completed"
  startDate      DateTime? // 시작일
  endDate        DateTime? // 종료일
  imageUrl       String?  // 대표 이미지
  location       String?  // 장소
  targetAudience String?  // 참여 대상
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([status])
  @@index([category])
  @@map("programs")
}

// ============================================================
// 커뮤니티 게시글 (도란도란)
// ============================================================
model CommunityPost {
  id         Int      @id @default(autoincrement())
  title      String   // 제목
  content    String   // HTML 본문
  category   String   // "free" | "book-recommend" | "reading-group" | "human-library"
  authorName String   // 작성자 닉네임
  password   String   // bcrypt 해시 (수정/삭제용)
  viewCount  Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([category])
  @@index([createdAt])
  @@map("community_posts")
}

// ============================================================
// 자료실
// ============================================================
model Resource {
  id            Int      @id @default(autoincrement())
  title         String   // 자료 제목
  description   String?  // 설명
  category      String   // "minutes" | "archive" | "form" | "etc"
  fileUrl       String   // 파일 URL
  fileName      String   // 파일 원본명
  fileSize      Int      @default(0) // 파일 크기 (bytes)
  downloadCount Int      @default(0) // 다운로드 횟수
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([category])
  @@map("resources")
}

// ============================================================
// 갤러리 (앨범)
// ============================================================
model Gallery {
  id          Int            @id @default(autoincrement())
  title       String         // 앨범 제목
  description String?        // 앨범 설명
  date        DateTime       // 행사/활동 날짜
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  images      GalleryImage[]

  @@index([date])
  @@map("galleries")
}

// 갤러리 이미지
model GalleryImage {
  id        Int     @id @default(autoincrement())
  galleryId Int
  imageUrl  String  // 이미지 URL
  caption   String? // 사진 설명
  order     Int     @default(0) // 표시 순서
  gallery   Gallery @relation(fields: [galleryId], references: [id], onDelete: Cascade)

  @@index([galleryId])
  @@map("gallery_images")
}
```

## 시드 데이터 구조 (prisma/seed.ts)

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. 관리자 계정 생성
  await prisma.user.upsert({
    where: { loginId: 'admin' },
    update: {},
    create: {
      loginId: 'admin',
      password: await bcrypt.hash('초기비밀번호', 12),
      name: '관리자',
      role: 'admin',
    },
  })

  // 2. 샘플 도서관 데이터
  const libraries = [
    {
      name: '꿈나무작은도서관',
      address: '경기도 시흥시 정왕동 123-4',
      lat: 37.3459,
      lng: 126.7381,
      phone: '031-123-4567',
      hours: '월~금 10:00-18:00, 토 10:00-14:00',
      closedDays: '일요일, 공휴일',
      description: '어린이 특화 작은도서관으로 그림책과 동화책이 풍부합니다.',
      specialProgram: '그림책 읽어주기, 독서캠프, 북아트 체험',
      isActive: true,
      order: 1,
    },
    {
      name: '햇살작은도서관',
      address: '경기도 시흥시 배곧동 456-7',
      lat: 37.3801,
      lng: 126.7332,
      phone: '031-234-5678',
      hours: '월~금 09:00-19:00, 토 09:00-17:00',
      closedDays: '일요일, 법정공휴일',
      description: '배곧신도시 주민을 위한 열린 도서관입니다.',
      specialProgram: '독서토론, 영어동화 스토리텔링',
      isActive: true,
      order: 2,
    },
    // ... 추가 도서관 데이터
  ]

  for (const library of libraries) {
    await prisma.library.create({ data: library })
  }

  // 3. 샘플 공지사항
  await prisma.post.create({
    data: {
      title: '시흥시작은도서관협의회 공식 출범 안내',
      content: '<p>2025년 12월 16일, 시흥시작은도서관협의회가 공식 출범하였습니다.</p>',
      excerpt: '2025년 12월 16일, 시흥시작은도서관협의회가 공식 출범하였습니다.',
      category: 'notice',
      isPinned: true,
    },
  })

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
```

## 카테고리 상수 정리

| 모델 | 필드 | 값 | 한글 레이블 |
|------|------|----|------------|
| Post | category | `notice` | 공지사항 |
| Post | category | `news` | 활동소식 |
| Post | category | `press` | 보도자료 |
| Program | status | `planned` | 예정 |
| Program | status | `ongoing` | 진행중 |
| Program | status | `completed` | 완료 |
| Program | category | `reading` | 독서 프로그램 |
| Program | category | `culture` | 문화 프로그램 |
| Program | category | `network` | 네트워크/교류 |
| Program | category | `education` | 교육/연수 |
| CommunityPost | category | `free` | 자유게시판 |
| CommunityPost | category | `book-recommend` | 추천도서 |
| CommunityPost | category | `reading-group` | 독서모임 |
| CommunityPost | category | `human-library` | 사람도서관 |
| Resource | category | `minutes` | 회의록 |
| Resource | category | `archive` | 자료집 |
| Resource | category | `form` | 서식 |
| Resource | category | `etc` | 기타 |

## 인덱스 전략

| 테이블 | 인덱스 컬럼 | 용도 |
|--------|------------|------|
| posts | category | 카테고리별 필터링 |
| posts | isPinned | 고정글 우선 정렬 |
| posts | createdAt | 최신순 정렬 |
| programs | status | 상태별 필터링 |
| programs | category | 카테고리별 필터링 |
| community_posts | category | 카테고리별 필터링 |
| community_posts | createdAt | 최신순 정렬 |
| resources | category | 카테고리별 필터링 |
| galleries | date | 날짜순 정렬 |
| gallery_images | galleryId | 앨범별 이미지 조회 |

## 마이그레이션 명령어

```bash
# 스키마 생성/변경 후
npx prisma migrate dev --name init

# Prisma Client 생성
npx prisma generate

# 시드 데이터 투입
npx prisma db seed

# DB 확인 (GUI)
npx prisma studio
```
