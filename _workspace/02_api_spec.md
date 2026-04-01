# 시흥시작은도서관협의회 - API 명세서

## 기본 규칙

- Base URL: `/api`
- 응답 형식: JSON
- 인증: NextAuth.js 세션 기반 (관리자 전용 엔드포인트는 `[AUTH]` 표시)
- 페이지네이션: `?page=1&limit=10` (기본값: page=1, limit=10)
- 정렬: `?sort=createdAt&order=desc` (기본값)
- 에러 응답: `{ error: string, message: string }`

### 공통 응답 형식

```typescript
// 성공 (단일)
{
  data: T
}

// 성공 (목록)
{
  data: T[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// 에러
{
  error: "NOT_FOUND" | "UNAUTHORIZED" | "VALIDATION_ERROR" | "SERVER_ERROR",
  message: string
}
```

---

## 1. 인증 (Auth)

### POST /api/auth/[...nextauth]
NextAuth.js 내장 엔드포인트. Credentials Provider 사용.

### POST /api/auth/callback/credentials
관리자 로그인

**Request Body:**
```json
{
  "id": "admin",
  "password": "비밀번호"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "admin",
    "name": "관리자",
    "role": "admin"
  }
}
```

### GET /api/auth/session
현재 세션 확인

**Response (200):**
```json
{
  "user": {
    "id": "admin",
    "name": "관리자",
    "role": "admin"
  },
  "expires": "2026-04-30T00:00:00.000Z"
}
```

---

## 2. 회원 도서관 (Libraries)

### GET /api/libraries
도서관 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 (기본: 1) |
| limit | number | X | 한 페이지 수 (기본: 20) |
| search | string | X | 이름/주소 검색 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "꿈나무작은도서관",
      "address": "시흥시 정왕동 123-4",
      "lat": 37.3459,
      "lng": 126.7381,
      "phone": "031-123-4567",
      "hours": "월~금 10:00-18:00, 토 10:00-14:00",
      "description": "어린이 특화 작은도서관",
      "specialProgram": "그림책 읽어주기, 독서캠프",
      "imageUrl": "/uploads/images/library-1.jpg",
      "isActive": true,
      "order": 1,
      "createdAt": "2025-12-16T00:00:00.000Z",
      "updatedAt": "2026-01-15T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 22,
    "totalPages": 2
  }
}
```

### GET /api/libraries/:id
도서관 상세 조회

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "꿈나무작은도서관",
    "address": "시흥시 정왕동 123-4",
    "lat": 37.3459,
    "lng": 126.7381,
    "phone": "031-123-4567",
    "hours": "월~금 10:00-18:00, 토 10:00-14:00",
    "closedDays": "일요일, 공휴일",
    "description": "어린이 특화 작은도서관으로 그림책과 동화책이 풍부합니다.",
    "specialProgram": "그림책 읽어주기, 독서캠프, 북아트 체험",
    "imageUrl": "/uploads/images/library-1.jpg",
    "homepageUrl": "https://example.com",
    "isActive": true,
    "order": 1,
    "createdAt": "2025-12-16T00:00:00.000Z",
    "updatedAt": "2026-01-15T00:00:00.000Z"
  }
}
```

### POST /api/libraries `[AUTH]`
도서관 등록

**Request Body:**
```json
{
  "name": "꿈나무작은도서관",
  "address": "시흥시 정왕동 123-4",
  "lat": 37.3459,
  "lng": 126.7381,
  "phone": "031-123-4567",
  "hours": "월~금 10:00-18:00",
  "closedDays": "일요일, 공휴일",
  "description": "어린이 특화 작은도서관",
  "specialProgram": "그림책 읽어주기",
  "imageUrl": "/uploads/images/library-1.jpg",
  "homepageUrl": "https://example.com",
  "isActive": true,
  "order": 1
}
```

**Validation:**
- `name`: 필수, 최대 100자
- `address`: 필수, 최대 200자
- `lat`, `lng`: 선택, 숫자
- `phone`: 선택, 최대 20자
- `hours`: 선택, 최대 200자

**Response (201):**
```json
{
  "data": { /* 생성된 도서관 객체 */ }
}
```

### PUT /api/libraries/:id `[AUTH]`
도서관 정보 수정

**Request Body:** POST와 동일 (부분 업데이트 가능)

**Response (200):**
```json
{
  "data": { /* 수정된 도서관 객체 */ }
}
```

### DELETE /api/libraries/:id `[AUTH]`
도서관 삭제

**Response (200):**
```json
{
  "data": { "id": 1, "deleted": true }
}
```

---

## 3. 게시글 (Posts) — 공지/소식/보도자료

### GET /api/posts
게시글 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 |
| limit | number | X | 한 페이지 수 (기본: 10) |
| category | string | X | `notice` \| `news` \| `press` |
| search | string | X | 제목/내용 검색 |
| pinned | boolean | X | 고정글만 필터 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "2026년 정기총회 안내",
      "content": "<p>2026년 정기총회를 아래와 같이 안내드립니다...</p>",
      "excerpt": "2026년 정기총회를 아래와 같이 안내드립니다...",
      "category": "notice",
      "images": ["/uploads/images/post-1-1.jpg"],
      "attachments": [
        {
          "name": "총회안내문.pdf",
          "url": "/uploads/files/총회안내문.pdf",
          "size": 1024000
        }
      ],
      "isPinned": true,
      "viewCount": 152,
      "createdAt": "2026-03-15T09:00:00.000Z",
      "updatedAt": "2026-03-15T09:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 45, "totalPages": 5 }
}
```

### GET /api/posts/:id
게시글 상세 조회 (조회수 +1)

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "title": "2026년 정기총회 안내",
    "content": "<p>전체 HTML 내용...</p>",
    "category": "notice",
    "images": ["/uploads/images/post-1-1.jpg", "/uploads/images/post-1-2.jpg"],
    "attachments": [
      {
        "name": "총회안내문.pdf",
        "url": "/uploads/files/총회안내문.pdf",
        "size": 1024000
      }
    ],
    "isPinned": true,
    "viewCount": 153,
    "prevPost": { "id": 0, "title": "이전 글 없음" },
    "nextPost": { "id": 2, "title": "다음 글 제목" },
    "createdAt": "2026-03-15T09:00:00.000Z",
    "updatedAt": "2026-03-15T09:00:00.000Z"
  }
}
```

### POST /api/posts `[AUTH]`
게시글 작성

**Request Body:**
```json
{
  "title": "제목",
  "content": "<p>HTML 내용</p>",
  "category": "notice",
  "images": ["/uploads/images/xxx.jpg"],
  "attachments": [
    { "name": "파일명.pdf", "url": "/uploads/files/xxx.pdf", "size": 1024000 }
  ],
  "isPinned": false
}
```

**Validation:**
- `title`: 필수, 최대 200자
- `content`: 필수
- `category`: 필수, `notice` | `news` | `press` 중 하나

**Response (201):** 생성된 게시글 객체

### PUT /api/posts/:id `[AUTH]`
게시글 수정

**Request Body:** POST와 동일 (부분 업데이트 가능)

**Response (200):** 수정된 게시글 객체

### DELETE /api/posts/:id `[AUTH]`
게시글 삭제

**Response (200):**
```json
{ "data": { "id": 1, "deleted": true } }
```

---

## 4. 사업/프로그램 (Programs)

### GET /api/programs
프로그램 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 |
| limit | number | X | 한 페이지 수 (기본: 10) |
| status | string | X | `planned` \| `ongoing` \| `completed` |
| category | string | X | 카테고리 필터 |
| year | number | X | 연도 필터 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "2026 작은도서관 연합 독서프로그램",
      "description": "시흥시 작은도서관 연합 독서프로그램입니다.",
      "content": "<p>상세 HTML 내용...</p>",
      "category": "reading",
      "status": "ongoing",
      "startDate": "2026-03-01",
      "endDate": "2026-06-30",
      "imageUrl": "/uploads/images/program-1.jpg",
      "location": "각 소속 도서관",
      "targetAudience": "시흥시 주민 누구나",
      "createdAt": "2026-02-15T00:00:00.000Z",
      "updatedAt": "2026-02-15T00:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 12, "totalPages": 2 }
}
```

### GET /api/programs/:id
프로그램 상세 조회

### POST /api/programs `[AUTH]`
프로그램 등록

**Request Body:**
```json
{
  "title": "프로그램 제목",
  "description": "간략 설명",
  "content": "<p>상세 HTML</p>",
  "category": "reading",
  "status": "planned",
  "startDate": "2026-03-01",
  "endDate": "2026-06-30",
  "imageUrl": "/uploads/images/program-1.jpg",
  "location": "장소",
  "targetAudience": "대상"
}
```

**Validation:**
- `title`: 필수, 최대 200자
- `status`: 필수, `planned` | `ongoing` | `completed`

### PUT /api/programs/:id `[AUTH]`
프로그램 수정

### DELETE /api/programs/:id `[AUTH]`
프로그램 삭제

---

## 5. 커뮤니티 (Community)

### GET /api/community
커뮤니티 글 목록

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 |
| limit | number | X | 한 페이지 수 (기본: 10) |
| category | string | X | `free` \| `book-recommend` \| `reading-group` \| `human-library` |
| search | string | X | 제목/내용 검색 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "이번 달 추천도서: 『나미야 잡화점의 기적』",
      "content": "<p>히가시노 게이고의 따뜻한 소설...</p>",
      "excerpt": "히가시노 게이고의 따뜻한 소설...",
      "category": "book-recommend",
      "authorName": "독서마니아",
      "viewCount": 45,
      "createdAt": "2026-03-20T14:30:00.000Z",
      "updatedAt": "2026-03-20T14:30:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 30, "totalPages": 3 }
}
```

### GET /api/community/:id
커뮤니티 글 상세 (조회수 +1)

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "title": "이번 달 추천도서",
    "content": "<p>전체 내용...</p>",
    "category": "book-recommend",
    "authorName": "독서마니아",
    "viewCount": 46,
    "prevPost": { "id": 0, "title": null },
    "nextPost": { "id": 2, "title": "다음 글" },
    "createdAt": "2026-03-20T14:30:00.000Z"
  }
}
```

### POST /api/community
커뮤니티 글 작성 (비회원도 가능, 비밀번호로 수정/삭제)

**Request Body:**
```json
{
  "title": "글 제목",
  "content": "<p>내용</p>",
  "category": "free",
  "authorName": "작성자 닉네임",
  "password": "글 비밀번호"
}
```

**Validation:**
- `title`: 필수, 최대 200자
- `content`: 필수
- `category`: 필수
- `authorName`: 필수, 최대 50자
- `password`: 필수, 4~20자

**Response (201):** 생성된 글 객체 (password 제외)

### PUT /api/community/:id
커뮤니티 글 수정 (비밀번호 확인 필요)

**Request Body:**
```json
{
  "title": "수정된 제목",
  "content": "<p>수정된 내용</p>",
  "password": "글 비밀번호"
}
```

**Response (200):** 수정된 글 객체

**Response (403):**
```json
{ "error": "UNAUTHORIZED", "message": "비밀번호가 일치하지 않습니다." }
```

### DELETE /api/community/:id
커뮤니티 글 삭제

**Request Body:**
```json
{ "password": "글 비밀번호" }
```

관리자는 비밀번호 없이 삭제 가능 (세션 확인).

### POST /api/community/:id/verify-password
비밀번호 확인 (수정 페이지 진입 전)

**Request Body:**
```json
{ "password": "글 비밀번호" }
```

**Response (200):**
```json
{ "data": { "verified": true } }
```

---

## 6. 자료실 (Resources)

### GET /api/resources
자료 목록

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 |
| limit | number | X | 한 페이지 수 (기본: 10) |
| category | string | X | `minutes` \| `archive` \| `form` \| `etc` |
| search | string | X | 제목 검색 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "2026년 1월 정기회의록",
      "description": "2026년 1월 15일 정기회의 회의록입니다.",
      "category": "minutes",
      "fileUrl": "/uploads/files/회의록_202601.pdf",
      "fileName": "회의록_202601.pdf",
      "fileSize": 2048000,
      "downloadCount": 15,
      "createdAt": "2026-01-16T00:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 20, "totalPages": 2 }
}
```

### GET /api/resources/:id
자료 상세 + 다운로드 카운트 증가

### POST /api/resources `[AUTH]`
자료 등록

**Request Body:**
```json
{
  "title": "자료 제목",
  "description": "설명",
  "category": "minutes",
  "fileUrl": "/uploads/files/xxx.pdf",
  "fileName": "원본파일명.pdf",
  "fileSize": 2048000
}
```

**Validation:**
- `title`: 필수, 최대 200자
- `category`: 필수
- `fileUrl`: 필수

### PUT /api/resources/:id `[AUTH]`
자료 수정

### DELETE /api/resources/:id `[AUTH]`
자료 삭제

---

## 7. 갤러리 (Gallery)

### GET /api/gallery
갤러리 앨범 목록

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | X | 페이지 번호 |
| limit | number | X | 한 페이지 수 (기본: 12) |
| search | string | X | 제목 검색 |
| year | number | X | 연도 필터 |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "2026 신년 네트워킹 행사",
      "description": "소속 도서관 관장님들의 신년 네트워킹 행사 사진입니다.",
      "date": "2026-01-20",
      "thumbnailUrl": "/uploads/galleries/event-1/thumb.jpg",
      "imageCount": 15,
      "createdAt": "2026-01-21T00:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 12, "total": 8, "totalPages": 1 }
}
```

### GET /api/gallery/:id
앨범 상세 (이미지 목록 포함)

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "title": "2026 신년 네트워킹 행사",
    "description": "소속 도서관 관장님들의 신년 네트워킹 행사 사진입니다.",
    "date": "2026-01-20",
    "images": [
      {
        "id": 1,
        "imageUrl": "/uploads/galleries/event-1/img-001.jpg",
        "caption": "개회식 전경",
        "order": 1
      },
      {
        "id": 2,
        "imageUrl": "/uploads/galleries/event-1/img-002.jpg",
        "caption": "회장님 인사말씀",
        "order": 2
      }
    ],
    "createdAt": "2026-01-21T00:00:00.000Z"
  }
}
```

### POST /api/gallery `[AUTH]`
갤러리 앨범 생성

**Request Body:**
```json
{
  "title": "앨범 제목",
  "description": "앨범 설명",
  "date": "2026-01-20",
  "images": [
    { "imageUrl": "/uploads/galleries/xxx.jpg", "caption": "설명", "order": 1 },
    { "imageUrl": "/uploads/galleries/yyy.jpg", "caption": "설명", "order": 2 }
  ]
}
```

**Validation:**
- `title`: 필수, 최대 200자
- `date`: 필수, YYYY-MM-DD 형식
- `images`: 최소 1장

### PUT /api/gallery/:id `[AUTH]`
앨범 수정 (이미지 추가/삭제/순서변경 포함)

**Request Body:**
```json
{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "date": "2026-01-20",
  "images": [
    { "id": 1, "imageUrl": "/uploads/galleries/xxx.jpg", "caption": "수정된 설명", "order": 1 },
    { "imageUrl": "/uploads/galleries/new.jpg", "caption": "새 이미지", "order": 2 }
  ]
}
```

이미지 배열에 `id`가 있으면 기존 이미지 수정, 없으면 새로 추가. 기존 이미지 중 배열에 없는 것은 삭제.

### DELETE /api/gallery/:id `[AUTH]`
앨범 삭제 (하위 이미지 모두 삭제)

---

## 8. 파일 업로드 (Upload)

### POST /api/upload `[AUTH]`
파일 업로드 (multipart/form-data)

**Request:**
```
Content-Type: multipart/form-data

file: (binary)
type: "image" | "file" | "gallery"
```

**Validation:**
- 이미지: jpg, jpeg, png, gif, webp (최대 5MB)
- 파일: pdf, doc, docx, hwp, hwpx, xlsx, pptx, zip (최대 20MB)
- 갤러리: jpg, jpeg, png, webp (최대 10MB)

**Response (200):**
```json
{
  "data": {
    "url": "/uploads/images/abc123.jpg",
    "fileName": "원본파일명.jpg",
    "fileSize": 1024000,
    "mimeType": "image/jpeg"
  }
}
```

### POST /api/upload/multiple `[AUTH]`
다중 파일 업로드

**Request:**
```
Content-Type: multipart/form-data

files: (binary[])  -- 최대 20개
type: "gallery"
```

**Response (200):**
```json
{
  "data": [
    { "url": "/uploads/galleries/abc.jpg", "fileName": "사진1.jpg", "fileSize": 1024000 },
    { "url": "/uploads/galleries/def.jpg", "fileName": "사진2.jpg", "fileSize": 2048000 }
  ]
}
```

### DELETE /api/upload `[AUTH]`
업로드된 파일 삭제

**Request Body:**
```json
{
  "url": "/uploads/images/abc123.jpg"
}
```

**Response (200):**
```json
{ "data": { "deleted": true } }
```

---

## 9. 에러 코드 정리

| HTTP 상태 | 에러 코드 | 설명 |
|-----------|-----------|------|
| 400 | VALIDATION_ERROR | 요청 데이터 유효성 검사 실패 |
| 401 | UNAUTHORIZED | 인증 필요 (로그인 안 됨) |
| 403 | FORBIDDEN | 권한 없음 (비밀번호 불일치 등) |
| 404 | NOT_FOUND | 리소스를 찾을 수 없음 |
| 409 | CONFLICT | 중복 데이터 |
| 413 | FILE_TOO_LARGE | 파일 크기 초과 |
| 415 | UNSUPPORTED_FILE_TYPE | 지원하지 않는 파일 형식 |
| 500 | SERVER_ERROR | 서버 내부 오류 |
