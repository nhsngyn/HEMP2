# 🌿 HEMP2

**Health Evaluation Metric using Proposals**

> 블록체인 거버넌스 데이터를 기반으로 체인의 '건강도'를 분석·비교하는 인터랙티브 웹 대시보드

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-93E729?style=for-the-badge&logo=vercel)](https://hemp2.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Running-3CA7C4?style=for-the-badge&logo=node.js)](https://hemp2.onrender.com/health)

</div>

---

## 🧐 프로젝트 개요

**"가격과 TVL이 높으면 정말 건강한 블록체인일까?"**

기존 블록체인 분석 서비스는 대부분 가격, 거래량, TVL과 같은 **자산 중심 지표**에 집중합니다.
하지만 장기적으로 지속 가능한 블록체인은 **커뮤니티 참여와 합의 과정**, 즉 **거버넌스가 건강한 체인**이라고 생각했습니다.

**HEMP2**는 블록체인의 의사결정 기록인 **Proposal(거버넌스 제안)** 데이터를 분석하여
체인의 **내적 건강도**를 정량화하고, 이를 **직관적인 시각화 대시보드**로 제공하는 프로젝트입니다.

### 📊 프로젝트 규모
- **분석 대상**: 18개 주요 Cosmos 생태계 블록체인
- **수집 데이터**: 약 5,000건 이상의 온체인 거버넌스 제안
- **테스트 커버리지**: 13개 단위 테스트 (100% 통과)
- **반응형 지원**: 모바일/태블릿/데스크톱 완벽 대응

---

## ✨ 주요 기능

### 1️⃣ HEMP Rank (사이드바)
- 18개 주요 블록체인의 **종합 건강도 점수(0~100)** 기반 랭킹
- **드래그 앤 드롭**으로 비교 체인 선택 (Main/Sub1/Sub2)
- 선택 상태 URL 동기화 (결과 공유 가능)

### 2️⃣ HEMP Map (버블 차트)
- **Score(건강도)** × **Participation(참여도)** 2축 포지셔닝
- 버블 크기: 전체 Proposal 수량
- 클릭으로 체인 선택/해제

### 3️⃣ Radar Comparison (레이더 차트)
- 최대 **3개 체인** 동시 비교
- 5가지 핵심 지표를 레이더 차트로 시각화
- 모바일: 세로 배치 / 데스크톱: 가로 배치

### 4️⃣ Governance Flow (생키 차트)
- Proposal의 **Type → Status → Participation → Vote → Speed** 흐름 분석
- 링크 클릭으로 필터링
- 가로 스크롤 지원 (모바일)

### 5️⃣ Proposals Table
- 선택된 체인의 Proposal 상세 정보
- 생키 차트 필터 연동
- 정렬 및 검색 기능

---

## 📊 HEMP Scoring Logic (5 Metrics)

약 **5,000건 이상의 온체인 거버넌스 데이터**를 수집·가공하여
아래 5가지 지표를 기반으로 체인별 점수를 산출했습니다.

| 지표 | 설명 | 의미 |
|------|------|------|
| **Participation** | 전체 토큰 대비 투표 참여 비율 | 커뮤니티 관심도 |
| **Consensus** | 찬성·반대 비율 차이 | 의견 분열 여부 |
| **Stability** | 투표율 변동성(표준편차 역산) | 참여의 지속성 |
| **VIB** | 상위 검증인 투표 집중도 | 탈중앙화 수준 |
| **Success Rate** | 제안 통과 비율 | 거버넌스 효율성 |

> **VIB (Validator Influence Balance)**: 특정 검증인에게 투표권이 집중될수록 낮은 점수

---

## 🛠 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **Zustand** - 전역 상태 관리
- **ECharts** - 버블 차트
- **D3.js** - 레이더/생키 차트 커스터마이징
- **@dnd-kit** - 드래그 앤 드롭
- **TailwindCSS** - 스타일링
- **Axios** - HTTP 클라이언트

### Backend
- **Node.js + Express** - API 서버
- **TypeScript** - 타입 안정성
- **Jest** - 단위 테스트 (13 tests)
- **Helmet** - 보안 미들웨어
- **Morgan** - 로깅
- **CORS** - 크로스 오리진 처리

### Deployment
- **Vercel** - Frontend 호스팅
- **Render** - Backend API 호스팅

---

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/nhsngyn/HEMP2.git
cd HEMP2
```

#### 2. Backend 실행
```bash
cd backend
npm install
npm run dev
# 서버: http://localhost:3000
```

#### 3. Frontend 실행 (새 터미널)
```bash
cd frontend
npm install
npm run dev
# 앱: http://localhost:5173
```

### 테스트 실행
```bash
cd backend
npm test
```

---

## 📐 프로젝트 구조

```
HEMP2/
├── frontend/              # React 프론트엔드
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   │   ├── charts/    # 차트 컴포넌트
│   │   │   ├── ranking/   # 랭킹 (드래그앤드롭)
│   │   │   ├── layout/    # 레이아웃
│   │   │   └── skeletons/ # 로딩 UI
│   │   ├── store/         # Zustand 스토어
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── constants/     # 상수 (색상, 설정)
│   │   └── data/          # Mock 데이터
│   └── real_data/         # 실제 CSV 데이터
│
├── backend/               # Node.js 백엔드
│   ├── src/
│   │   ├── routes/        # API 라우트
│   │   ├── controllers/   # 요청 처리
│   │   ├── services/      # 비즈니스 로직
│   │   │   └── __tests__/ # Jest 테스트
│   │   ├── models/        # 데이터 모델
│   │   └── middleware/    # 미들웨어 (에러 처리)
│   └── dist/              # 빌드 결과물
│
└── README.md
```

---

## 🎯 핵심 기술적 성과

### 1. **전문적인 에러 처리**
- RESTful 표준에 맞는 HTTP 상태 코드 (400, 404, 500)
- `HttpException` 클래스로 명확한 에러 메시지

### 2. **테스트 주도 개발**
- Jest 기반 13개 단위 테스트
- 핵심 비즈니스 로직 검증
- 데이터 무결성 보장

### 3. **데이터 자동화**
- Admin API로 원격 데이터 갱신
- API Key 기반 인증
- 수동 스크립트 실행 불필요

### 4. **완벽한 반응형 UI**
- 모바일: 햄버거 메뉴, 세로 스택 레이아웃
- 데스크톱: 가로 배치, 고정 사이드바
- 가로 스크롤 힌트 (블러 효과)

### 5. **사용자 경험 최적화**
- Skeleton UI로 부드러운 로딩
- URL 동기화로 결과 공유
- 드래그 앤 드롭 직관적 인터랙션

---

## 🧠 UX 설계 철학

1. **학습 비용 최소화**
   - 드래그만으로 비교 체인 구성
   - 클릭으로 선택/해제
   
2. **정보 공유 편의성**
   - 비교 상태를 URL 쿼리로 동기화
   - 링크만 공유하면 동일한 화면 재현

3. **정보 디자인 관점**
   - 데이터 중심 프로젝트를 시각화로 구조화
   - 5가지 차트로 다차원 분석 제공

---

## 📂 프로젝트 히스토리

### HEMP (v1.0) - 2024
**아주대학교 정보디자인 수업 팀 프로젝트**
- 기획 및 지표 설계
- 데이터 수집 및 전처리
- 정적 시각화 프로토타입

### HEMP2 (v2.0 ~ v2.1) - 2025
**1인 개발 - 웹 서비스 고도화**

#### v2.0 (2025.01)
- ✅ Backend API 서버 구축
- ✅ 인터랙티브 대시보드 개발
- ✅ 모바일 반응형 확장
- ✅ 드래그 앤 드롭 UX 구현
- ✅ Skeleton UI 완성
- ✅ Vercel/Render 배포

#### v2.1 (2026.01)
- ✅ RESTful API 에러 처리 개선
- ✅ Jest 단위 테스트 작성 (13 tests)
- ✅ Admin API 추가
- ✅ 코드 품질 향상

---

## 🔗 링크

- **Live Demo**: https://hemp2.vercel.app/
- **Backend API**: https://hemp2.onrender.com/health
- **GitHub**: https://github.com/nhsngyn/HEMP2

---

## 👩‍💻 Developer

**Noh Sungyeon**

Frontend / Data Visualization / Backend

📧 Contact: [이메일 추가 권장]
🔗 Portfolio: [포트폴리오 링크 추가 권장]

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- **아주대학교 정보디자인** - 초기 프로젝트 기획
- **Cosmos Ecosystem** - 온체인 데이터 제공
- **Open Source Community** - React, D3.js, ECharts 등
