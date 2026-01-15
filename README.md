# HEMP 2.0

**HEMP2는 기존 HEMP 프로젝트를 기반으로, 프론트엔드 단일 구조에서 백엔드 API 기반 아키텍처로 확장한 버전입니다.**  
데이터 흐름 분리, 반응형 UX, 사용자 인터랙션 확장을 중심으로 2.0을 설계했습니다.

## 📋 프로젝트 개요

HEMP(Health Evaluation Metric using Proposals)는 블록체인 프로포절 데이터를 기반으로 체인의 건강도를 평가하고 시각화하는 대시보드입니다.

### 🆕 HEMP 2.0의 주요 변경사항

1. **백엔드 API 분리**
   - 프론트엔드와 백엔드를 명확히 분리
   - RESTful API를 통한 데이터 제공
   - 확장 가능한 서버 아키텍처 구축

2. **완전한 모바일 반응형 디자인**
   - 햄버거 메뉴를 통한 사이드바 접기/펼치기
   - 차트 세로 스택 배치 (모바일)
   - 반응형 폰트 스케일링 (CSS 변수 기반)
   - 가로 스크롤 UI (생키 차트, 프로포절 리스트)
   - 레이더 차트 메트릭 정보 세로 배치

3. **향상된 인터랙션**
   - 버블 차트 클릭을 통한 체인 선택
   - 우선순위 기반 슬롯 할당 (Main → Sub1 → Sub2)
   - 생키 차트 재선택 시 프로포절 리스트 토글
   - 빈 슬롯부터 자동 채우기

4. **개선된 로딩 경험**
   - Skeleton UI 구현 (버블, 레이더, 생키 차트)
   - 300ms 페이드 전환 애니메이션
   - 실제 차트 레이아웃 반영

## 🏗️ 프로젝트 구조

```
HEMP2/
├── frontend/          # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/        # 차트 컴포넌트
│   │   │   ├── skeletons/     # Skeleton UI
│   │   │   ├── layout/        # 레이아웃 (MainLayout, Sidebar)
│   │   │   └── common/        # 공통 컴포넌트
│   │   ├── store/             # Zustand 상태 관리
│   │   ├── constants/         # 상수 (색상, 설정)
│   │   └── data/              # Mock 데이터
│   └── package.json
│
├── backend/           # Express + TypeScript 백엔드
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── controllers/  # 요청 처리 로직
│   │   ├── services/     # 비즈니스 로직
│   │   ├── models/       # 데이터 모델
│   │   └── config/       # 설정 파일
│   └── package.json
│
├── README.md
└── .gitignore
```

## 🌿 브랜치 전략

### 기본 브랜치
- `main`: 배포/완성 상태
- `develop`: 기능 통합 브랜치 (실질적인 작업 기준)

### 기능 브랜치 네이밍 규칙
- `feature/{기능명}`: 새로운 기능 개발
- `fix/{버그명}`: 버그 수정
- `refactor/{내용}`: 리팩토링
- `chore/{내용}`: 환경 설정, 빌드 관련

### 주요 기능 브랜치
#### 백엔드
- `feature/backend-init`: 백엔드 초기 세팅
- `feature/api-chain-data`: 체인 데이터 API 구현

#### 프론트엔드
- `feature/frontend-api-integration`: API 연동
- `feature/mobile-responsive`: 모바일 반응형 레이아웃
- `feature/interaction-improvements`: 버블 클릭 선택 & 생키 토글
- `feature/skeleton-ui-completion`: 스켈레톤 UI 구현

## 📝 커밋 컨벤션

### 기본 포맷
```
type(scope): message
```

### Type 목록
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 기능 변경 없는 구조 개선
- `style`: UI, 스타일 (로직 변경 없음)
- `chore`: 설정, 빌드, 패키지
- `docs`: 문서

### 커밋 예시
```bash
feat(backend): initialize express server
feat(api): add chain data endpoint
feat(frontend): connect api to bubble chart
feat(ui): implement mobile responsive layout with hamburger menu
feat(chart): enable chain selection by bubble click
feat(ui): add skeleton ui for all charts
feat(responsive): add horizontal scroll for sankey and proposals
fix(chart): prevent duplicate chain selection
refactor(state): simplify chain slot priority logic
```

## 🚀 시작하기

### 전체 실행 (권장)

#### 1. Backend 실행
```bash
cd backend
npm install
npm run dev
# Backend: http://localhost:3000
```

#### 2. Frontend 실행 (새 터미널)
```bash
cd frontend
npm install
npm run dev
# Frontend: http://localhost:5173
```

### 개별 실행

#### Frontend만 실행 (Mock 데이터)
```bash
cd frontend
npm install
npm run dev
```

#### Backend만 실행
```bash
cd backend
npm install
npm run dev
```

## 🛠️ 기술 스택

### Frontend
- **React 19**: UI 라이브러리
- **Vite**: 빌드 도구
- **D3.js**: 데이터 시각화 (생키, 버블)
- **ECharts**: 차트 라이브러리 (레이더)
- **Zustand**: 상태 관리
- **TailwindCSS**: 유틸리티 기반 CSS
- **Axios**: HTTP 클라이언트

### Backend
- **Node.js**: 런타임
- **Express**: 웹 프레임워크
- **TypeScript**: 타입 안정성
- **Jest**: 단위 테스트 프레임워크
- **ts-jest**: TypeScript Jest 지원
- **Helmet**: 보안 미들웨어
- **Morgan**: 로깅 미들웨어
- **CORS**: 크로스 오리진 리소스 공유

## 📊 주요 기능

### 1. **HEMP Map (버블 차트)**
- 체인별 건강도를 2차원 버블로 시각화
- X축: HEMP Score, Y축: Participation
- 버블 크기: 전체 프로포절 수
- 클릭으로 체인 선택 (Main/Sub1/Sub2 슬롯)

### 2. **Radar Chart**
- 5가지 지표 다차원 비교
  - VIB (Validator Influence Balance)
  - Participation
  - Success Rate
  - Stability
  - Consensus
- Main, Sub1, Sub2 체인 동시 비교
- 메트릭 정보 표시 (모바일: 차트 하단)

### 3. **Sankey Chart**
- 프로포절 구성 플로우 시각화
- 5단계 흐름: Type → Status → Participation → Vote Composition → Processing Speed
- 링크 클릭으로 필터링
- 가로 스크롤 지원 (1800px 고정 너비)

### 4. **Proposals Table**
- 선택된 체인의 프로포절 상세 정보
- 생키 차트 필터링 연동
- 가로 스크롤 지원

### 5. **Ranking Chart (사이드바)**
- DnD 기반 체인 랭킹 및 비교
- Main/Sub1/Sub2 슬롯 관리
- 모바일: 햄버거 메뉴로 접기/펼치기

## 📱 반응형 디자인

### Desktop (≥768px)
- 사이드바 고정 표시
- 버블 + 레이더 차트 가로 배치
- 차트 스케일 1.0 (원본 크기)

### Mobile (<768px)
- 햄버거 메뉴로 사이드바 접기
- 모든 차트 세로 배치
- 반응형 폰트 스케일 (0.4~0.6)
- 레이더 차트 메트릭 하단 배치
- 생키/프로포절 가로 스크롤

### 주요 반응형 기술
- **CSS 변수 스케일링**: `--scale` 변수로 전역 폰트 크기 조정
- **Tailwind Breakpoints**: `md:` prefix 활용
- **clamp() 함수**: 반응형 여백/간격
- **스크롤바 위치 제어**: `rotateX(180deg)` 트릭으로 상단 스크롤

## 🎨 디자인 시스템

### 색상 팔레트
- **Main Chain**: `#93E729` (Green)
- **Sub1 Chain**: `#3CA7C4` (Sky Blue)
- **Sub2 Chain**: `#BBB143` (Yellow)
- **Background**: `#17181C` (Dark Gray)

### 타이포그래피
- Font Family: SUIT
- 스케일 기반 폰트 크기 (12px~22px)
- 반응형 스케일 적용 (`calc(size * var(--scale))`)

## 🔧 개발 가이드

### 새 차트 추가하기
1. `src/components/charts/` 에 차트 컴포넌트 생성
2. `src/components/skeletons/` 에 Skeleton 컴포넌트 생성
3. `App.jsx` 에 차트 추가 및 레이아웃 조정
4. Zustand store에 필요한 상태 추가

### API 엔드포인트 추가
1. `backend/src/routes/` 에 라우트 정의
2. `backend/src/controllers/` 에 컨트롤러 로직
3. `backend/src/services/` 에 비즈니스 로직
4. Frontend `store/` 에서 API 호출

### 테스트 실행
```bash
# 백엔드 단위 테스트 실행
cd backend
npm test

# 테스트 + 커버리지 확인
npm run test:coverage

# Watch 모드로 테스트 실행
npm run test:watch
```

## ⚡ 성능 최적화

- **Skeleton UI**: 로딩 중 300ms 페이드 전환
- **useMemo**: 차트 데이터 계산 메모이제이션
- **CSS 변수**: 스케일 계산 최적화
- **가로 스크롤**: 큰 차트 성능 유지

## 🔐 Admin API

### 데이터 갱신 API
백엔드 서버에서 캐시된 체인/프로포절 데이터를 갱신할 수 있는 관리자용 API를 제공합니다.

#### 1. 데이터 새로고침
```bash
POST /api/admin/refresh-data
Headers:
  X-Admin-API-Key: your-admin-key

Response:
{
  "success": true,
  "message": "Data refreshed successfully",
  "data": {
    "chainsLoaded": 18,
    "propositionsLoaded": 1250,
    "timestamp": "2026-01-15T12:00:00.000Z"
  }
}
```

#### 2. 시스템 상태 확인
```bash
GET /api/admin/status
Headers:
  X-Admin-API-Key: your-admin-key

Response:
{
  "success": true,
  "data": {
    "status": "operational",
    "uptime": 3600,
    "environment": "production",
    "cache": {
      "chainsCount": 18,
      "propositionsCount": 1250
    },
    "timestamp": "2026-01-15T12:00:00.000Z"
  }
}
```

#### Admin API Key 설정
1. 백엔드 `.env` 파일에 `ADMIN_API_KEY` 추가
2. 프로덕션 환경에서는 반드시 강력한 키로 변경
3. 환경 변수가 없으면 기본값 `hemp2-admin-dev-key` 사용 (개발용)

```bash
# .env 예시
ADMIN_API_KEY=your-secure-admin-key-here-2026
```

## 🧪 테스트

### 백엔드 단위 테스트
- **테스트 프레임워크**: Jest + ts-jest
- **테스트 대상**: `chainService` (핵심 비즈니스 로직)
- **테스트 커버리지**: 13개 테스트 케이스

#### 주요 테스트 시나리오
1. ✅ 필터링 없이 모든 체인 조회
2. ✅ minScore/maxScore로 점수 범위 필터링
3. ✅ 검색어로 체인 이름/ID 검색
4. ✅ 여러 필터 조합 (minScore + search)
5. ✅ 존재하는 체인 ID로 단일 체인 조회
6. ✅ 존재하지 않는 체인 ID 처리
7. ✅ 통계 데이터 검증 (평균 점수, 분포도)
8. ✅ 프로포절 필터링 (타입, 결과, 참여도 등)

```bash
# 테스트 실행
cd backend
npm test

# 결과 예시
PASS  src/services/__tests__/chainService.test.ts
  chainService
    getAllChains
      ✓ should return all chains without filters (4 ms)
      ✓ should filter chains by minScore
      ✓ should filter chains by maxScore
      ...
Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
```

## 🎯 코드 품질 개선사항

### 1. **RESTful API 에러 처리**
- ❌ **Before**: 모든 에러를 500 Internal Server Error로 처리
- ✅ **After**: 상황별 적절한 HTTP 상태 코드 반환
  - `400 Bad Request`: 잘못된 요청 파라미터
  - `404 Not Found`: 존재하지 않는 리소스
  - `500 Internal Server Error`: 서버 내부 오류

**HttpException 클래스 도입**
```typescript
// 체인이 존재하지 않는 경우
throw new HttpException(404, `Chain with ID '${id}' not found`);

// 잘못된 파라미터
throw new HttpException(400, 'minScore must be a number between 0 and 100');
```

### 2. **단위 테스트 (Unit Tests)**
- ✅ Jest 기반 테스트 환경 구축
- ✅ 핵심 비즈니스 로직 검증
- ✅ 데이터 무결성 보장
- ✅ 회귀 버그 방지

### 3. **데이터 갱신 자동화**
- ✅ Admin API를 통한 원격 데이터 갱신
- ✅ 수동 스크립트 실행 불필요
- ✅ API Key 기반 보안 인증
- ✅ 시스템 상태 모니터링 가능

## 🐛 알려진 이슈

- 없음 (현재 안정 버전)

## 🔗 관련 링크

- [HEMP 1.0 Repository](https://github.com/nhsngyn/HEMP)
- [Live Demo](#) (배포 후 추가 예정)

## 👥 Contributors

- [@nhsngyn](https://github.com/nhsngyn)

## 📄 License

MIT License

---

## 📈 버전 히스토리

### v2.1.0 (2026-01-15) 🆕
- ✅ **RESTful API 에러 처리 개선**: HttpException 클래스 도입
- ✅ **단위 테스트 구현**: Jest 기반 13개 테스트 케이스 작성
- ✅ **Admin API 추가**: 데이터 갱신 자동화 엔드포인트
- ✅ **코드 품질 향상**: 400/404/500 상태 코드 구분

### v2.0.0 (2025-01-06)
- ✅ Backend/Frontend 분리
- ✅ 완전한 모바일 반응형
- ✅ 햄버거 메뉴 구현
- ✅ Skeleton UI 완성
- ✅ 버블 클릭 선택
- ✅ 가로 스크롤 UI
- ✅ 반응형 폰트 스케일링

### v1.0.0
- 초기 HEMP 프로젝트
