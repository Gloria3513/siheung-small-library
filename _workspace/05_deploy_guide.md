# 시흥시작은도서관협의회 - 배포 가이드

## 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 변수를 설정합니다.

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | SQLite 데이터베이스 경로 | `file:./dev.db` |
| `NEXTAUTH_SECRET` | NextAuth 세션 암호화 키 | `openssl rand -base64 32` 로 생성 |
| `NEXTAUTH_URL` | 사이트 URL | `http://localhost:3000` (로컬) / `https://도메인.com` (프로덕션) |
| `ADMIN_EMAIL` | 관리자 로그인 이메일 | `admin@siheung-lib.kr` |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 | 안전한 비밀번호 설정 |
| `NEXT_PUBLIC_KAKAO_MAP_API_KEY` | 카카오맵 API 키 (선택) | 카카오 개발자 콘솔에서 발급 |

---

## 2. 로컬 개발 환경

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 파일 생성
cp .env.example .env.local
# .env.local 을 열어 실제 값으로 수정

# 3. Prisma 클라이언트 생성 + DB 마이그레이션
npx prisma generate
npx prisma db push

# 4. 시드 데이터 삽입 (선택)
npx prisma db seed

# 5. 개발 서버 실행
npm run dev
```

---

## 3. Vercel 배포

### 3.1 사전 준비

- [Vercel](https://vercel.com) 계정
- GitHub 저장소 연결

### 3.2 배포 단계

1. **Vercel에 프로젝트 Import**
   - Vercel 대시보드 > "Add New Project"
   - GitHub 저장소 선택

2. **빌드 설정**
   - Framework Preset: `Next.js` (자동 감지)
   - Build Command: `npx prisma generate && next build`
   - Output Directory: (기본값 유지)
   - Install Command: `npm install`

3. **환경 변수 등록**
   - Vercel 대시보드 > Settings > Environment Variables
   - 위 표의 모든 변수를 등록
   - `NEXTAUTH_URL`은 Vercel이 제공하는 도메인 또는 커스텀 도메인으로 설정

4. **배포 실행**
   - main 브랜치에 push하면 자동 배포

### 3.3 SQLite + Vercel 제한사항

Vercel은 서버리스 환경이므로 SQLite 파일 시스템에 제약이 있습니다.

#### MVP 단계 (현재)
- Vercel의 `/tmp` 디렉토리에 SQLite 파일을 배치
- **주의**: 서버리스 함수 인스턴스가 재시작되면 데이터가 초기화됩니다
- 소규모 트래픽, 데모/프로토타입 용도로 적합

#### 프로덕션 전환 시: Turso (LibSQL) 사용 권장

```bash
# Turso CLI 설치
brew install tursodatabase/tap/turso

# 로그인
turso auth login

# 데이터베이스 생성
turso db create siheung-library

# URL 및 토큰 확인
turso db show siheung-library --url
turso db tokens create siheung-library
```

Turso 전환 시 환경 변수를 아래와 같이 변경합니다:

```env
DATABASE_URL="libsql://siheung-library-[계정].turso.io"
DATABASE_AUTH_TOKEN="turso-토큰"
```

Prisma에서 Turso를 사용하려면 `@prisma/adapter-libsql` 어댑터를 추가합니다.

---

## 4. 커스텀 도메인 설정

### 4.1 Vercel 도메인 연결

1. Vercel 대시보드 > Settings > Domains
2. 도메인 입력 (예: `siheung-library.kr`)
3. Vercel이 제공하는 DNS 레코드를 도메인 등록기관에 설정

### 4.2 DNS 설정

| 유형 | 이름 | 값 |
|------|------|-----|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

### 4.3 SSL

- Vercel에서 자동으로 Let's Encrypt SSL 인증서를 발급/갱신합니다
- 별도 설정 불필요

---

## 5. 파일 업로드 저장소

### MVP 단계
- `public/uploads/` 디렉토리에 로컬 저장
- Vercel 배포 시 빌드에 포함된 정적 파일만 제공 가능

### 프로덕션 전환 시
- **Vercel Blob**: Vercel 내장 오브젝트 스토리지
- **Cloudflare R2**: 저렴한 S3 호환 스토리지
- **AWS S3**: 범용 클라우드 스토리지

---

## 6. 모니터링 및 로그

- **Vercel Analytics**: 대시보드에서 활성화 (무료 플랜 포함)
- **Vercel Logs**: Functions 탭에서 서버리스 함수 로그 확인
- **Speed Insights**: Core Web Vitals 모니터링

---

## 7. 트러블슈팅

### 빌드 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# Prisma 클라이언트 재생성
npx prisma generate
```

### 데이터베이스 초기화
```bash
# 스키마 변경 후 DB 재생성
npx prisma db push --force-reset

# 시드 데이터 재삽입
npx prisma db seed
```

### 환경 변수 미설정 오류
- Vercel 대시보드에서 모든 환경 변수가 올바르게 설정되었는지 확인
- `NEXTAUTH_SECRET`은 반드시 프로덕션용으로 새로 생성
