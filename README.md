#  HEMP2

**Health Evaluation Metric using Proposals**

> 블록체인 거버넌스 데이터를 기반으로 체인의 ‘건강도’를 분석하고 비교하는 웹 기반 시각화 대시보드

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-93E729?style=for-the-badge&logo=vercel)](https://hemp2.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Running-3CA7C4?style=for-the-badge&logo=node.js)](https://hemp2.onrender.com/health)

<br/>
<p align="center">
  <b>⚡️ Performance Update:</b> 서버 업그레이드로 Cold Start 대기 시간 없이 <b>즉시 접속 가능</b>합니다.
</p>

</div>
---

##  프로젝트 개요

**“가격과 TVL이 높으면, 그 블록체인은 정말 건강하다고 볼 수 있을까?”**

기존의 블록체인 분석 서비스는 대부분 가격, 거래량, TVL처럼 **자산 지표**에 초점을 둡니다.
하지만 장기적으로 지속 가능한 체인은, 단순한 수치보다 **의사결정이 어떻게 이루어지고 있는지**, 즉 **거버넌스가 얼마나 잘 작동하는지**가 더 중요하다고 생각했습니다.

**HEMP2**는 블록체인의 거버넌스 기록인 **Proposal 데이터**를 기반으로,
체인의 내부 운영 상태를 여러 지표로 나누어 분석하고 이를 시각화한 프로젝트입니다.
각 체인이 얼마나 활발하게 참여되고, 얼마나 안정적으로 합의가 이루어지는지를 한눈에 비교할 수 있도록 설계했습니다.

###  프로젝트 규모

* **분석 대상**: Cosmos 생태계 내 18개 주요 블록체인
* **수집 데이터**: 약 5,000건 이상의 온체인 거버넌스 제안
* **테스트**: Backend 단위 테스트 13개 (전부 통과)
* **반응형 UI**: 모바일 / 태블릿 / 데스크톱 대응

---

##  주요 기능

### 1. HEMP Rank (사이드바)

* 18개 체인의 **종합 건강도 점수(0~100)** 기반 랭킹 제공
* **드래그 앤 드롭**으로 비교 체인 선택 (Main / Sub1 / Sub2)
* 선택 상태를 URL 쿼리로 동기화하여 결과 공유 가능

### 2. HEMP Map (버블 차트)

* **Score(건강도)** × **Participation(참여도)** 기준 포지셔닝
* 버블 크기는 Proposal 수량을 의미
* 클릭으로 체인 선택 및 해제

### 3. Radar Comparison (레이더 차트)

* 최대 **3개 체인**의 세부 지표 비교
* 5가지 핵심 지표를 레이더 차트로 시각화
* 모바일에서는 세로, 데스크톱에서는 가로 배치

### 4. Governance Flow (생키 차트)

* Proposal의 **Type → Status → Participation → Vote → Speed** 흐름 시각화
* 링크 클릭을 통한 필터링
* 모바일 환경에서 가로 스크롤 지원

### 5. Proposals Table

* 선택된 체인의 Proposal 상세 정보 제공
* 생키 차트 필터와 연동
* 정렬 및 검색 기능 지원

---

##  HEMP Scoring Logic (5 Metrics)

약 **5,000건 이상의 온체인 거버넌스 데이터**를 수집·전처리하여
아래 5가지 지표를 기준으로 체인별 점수를 계산했습니다.

| 지표                | 설명                | 의미       |
| ----------------- | ----------------- | -------- |
| **Participation** | 전체 토큰 대비 투표 참여 비율 | 커뮤니티 관심도 |
| **Consensus**     | 찬성·반대 비율 차이       | 의견 분열 정도 |
| **Stability**     | 투표율 변동성 (표준편차 역산) | 참여의 지속성  |
| **VIB**           | 상위 검증인 투표 집중도     | 탈중앙화 수준  |
| **Success Rate**  | 제안 통과 비율          | 거버넌스 효율성 |

> **VIB (Validator Influence Balance)**
> 특정 검증인에게 투표권이 집중될수록 낮은 점수를 부여했습니다.

---

##  기술 스택

### Frontend

* React 19
* Vite
* Zustand (전역 상태 관리)
* ECharts (버블 차트)
* D3.js (레이더 / 생키 차트 커스터마이징)
* @dnd-kit (드래그 앤 드롭)
* TailwindCSS
* Axios

### Backend

* Node.js + Express
* TypeScript
* Jest (단위 테스트)
* Helmet, Morgan, CORS

### Deployment

* Vercel (Frontend)
* Render (Backend API)

---

##  핵심 구현 포인트

* RESTful API 기준에 맞춘 에러 처리 및 상태 코드 설계
* Jest 기반 단위 테스트로 핵심 로직 검증
* Admin API를 통한 데이터 갱신 자동화
* Skeleton UI 적용으로 로딩 경험 개선
* 모바일 환경까지 고려한 반응형 대시보드 구성
* URL 동기화를 통한 분석 결과 공유 기능

---

##  프로젝트 히스토리

### HEMP (v1.0)

* 아주대학교 정보디자인 수업 팀 프로젝트
* 지표 설계 및 정적 시각화 중심

### HEMP2 (v2.0 ~)

* 1인 개발
* Backend API 구축
* 인터랙티브 대시보드 구현
* 모바일 반응형 확장
* 테스트 및 코드 품질 개선

---

##  링크

* **Live Demo**: [https://hemp2.vercel.app/](https://hemp2.vercel.app/)
* **Backend API**: [https://hemp2.onrender.com/health](https://hemp2.onrender.com/health)
* **GitHub**: [https://github.com/nhsngyn/HEMP2](https://github.com/nhsngyn/HEMP2)

---

## Developer

**Noh Sungyeon**
Frontend / Data Visualization / Backend
