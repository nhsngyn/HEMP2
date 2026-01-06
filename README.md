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

2. **반응형 디자인**
   - 모바일 환경 최적화
   - 랭킹 차트는 Drawer로 구현
   - 차트들을 세로로 나열하여 스크롤 가능

3. **향상된 인터랙션**
   - 버블 차트 클릭을 통한 체인 선택
   - 우선순위 기반 슬롯 할당 (Main → Sub1 → Sub2)
   - Reset 버튼으로 선택 초기화

4. **개선된 로딩 경험**
   - Skeleton UI 구현
   - 로딩 상태 시각화

## 🏗️ 프로젝트 구조

```
HEMP2/
├── frontend/          # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── constants/
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
- `feature/responsive-layout`: 반응형 레이아웃
- `feature/bubble-click-selection`: 버블 차트 클릭 선택
- `feature/reset-chain-selection`: 리셋 버튼 구현
- `feature/skeleton-ui`: 스켈레톤 UI 구현

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
feat(ui): implement responsive mobile layout
feat(chart): enable chain selection by bubble click
feat(state): add reset button for chain slots
feat(ui): add skeleton ui for loading state
fix(chart): prevent duplicate chain selection
refactor(state): simplify chain slot priority logic
```

## 🚀 시작하기

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🛠️ 기술 스택

### Frontend
- React 19
- Vite
- D3.js
- Zustand
- TailwindCSS

### Backend
- Node.js
- Express
- TypeScript

## 📊 주요 기능

1. **Hemp Map**: 체인별 건강도를 버블 차트로 시각화
2. **Radar Chart**: 다차원 평가 지표 비교
3. **Sankey Chart**: 프로포절 흐름 시각화
4. **Proposals Table**: 프로포절 상세 정보 테이블
5. **Ranking Chart**: DnD 기반 체인 랭킹 및 비교

## 📱 반응형 디자인

- **Desktop**: 기존 레이아웃 유지
- **Mobile**: 
  - 랭킹 차트 → Drawer
  - 차트들 세로 배치
  - 터치 최적화

## 🔗 관련 링크

- [HEMP 1.0 Repository](https://github.com/nhsngyn/HEMP)
- [Live Demo](#) (배포 후 추가 예정)

## 👥 Contributors

- [@nhsngyn](https://github.com/nhsngyn)

## 📄 License

MIT License

