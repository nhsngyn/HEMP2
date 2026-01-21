# HEMP2

**Health Evaluation Metric using Proposals**

> **블록체인 거버넌스 데이터**를 기반으로 체인의 ‘건강도’를 정량적으로 분석하고 시각화하는 웹 대시보드

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-93E729?style=for-the-badge&logo=vercel)](https://hemp2.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Running-3CA7C4?style=for-the-badge&logo=node.js)](https://hemp2.onrender.com/health)
[![Github](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/nhsngyn/HEMP2)

<br/>

> **⚡️ UX Performance Update**<br/>
> 사용자 경험 최적화를 위해 서버 인스턴스를 업그레이드했습니다.<br/>
> **Cold Start 지연 없이 즉시 접속하여 데이터를 확인하실 수 있습니다.**

</div>

---

## 📝 프로젝트 개요

**“가격(Price)과 TVL이 높으면, 그 블록체인은 정말 건강할까요?”**

기존의 블록체인 분석 서비스는 대부분 자산 가치에만 초점을 둡니다.
하지만 지속 가능한 생태계 조성을 위해서는 **'합의가 얼마나 민주적으로 이루어지는가'**, 즉 **거버넌스의 건전성**이 핵심이라고 판단했습니다.

**HEMP2**는 블록체인의 의사결정 기록인 **Proposal 데이터(약 5,000건)**를 수집·분석하여,
체인의 운영 상태를 5가지 핵심 지표로 시각화한 프로젝트입니다.
단순한 데이터 나열이 아닌, **'데이터가 갖는 의미(Insight)'**를 시각적으로 전달하는 데 집중했습니다.

### 📊 Project Scale

* **분석 대상**: Cosmos 생태계 내 18개 주요 블록체인 (Atom, Osmosis, etc.)
* **데이터 규모**: 약 **5,000건 이상**의 온체인 거버넌스 제안(Proposal) 전수 분석
* **테스트 커버리지**: Backend 핵심 로직 단위 테스트(Jest) **Pass**
* **환경 대응**: Mobile / Tablet / Desktop 반응형 UI 완벽 지원

---

## ✨ 주요 기능

### 1. HEMP Rank (Interactive Sidebar)
* 18개 체인의 **종합 건강도 점수(0~100)** 기반 실시간 랭킹
* **Drag & Drop** 인터페이스로 직관적인 비교군(Main/Sub) 선택 가능
* URL Query String 동기화로 분석 결과 공유 지원

### 2. HEMP Map (Bubble Chart)
* **Score(건강도) × Participation(참여도)** 매트릭스 분석
* 버블 크기(Proposal Volume)를 통한 3차원 데이터 시각화
* 클릭 인터랙션을 통한 즉각적인 체인 필터링

### 3. Radar Comparison
* 최대 **3개 체인**의 5대 지표(Participation, Consensus 등) 정밀 비교
* D3.js 기반의 커스텀 레이더 차트로 다차원 데이터 시각화

### 4. Governance Flow (Sankey Chart)
* 안건의 생애 주기(**Type → Status → Vote → Speed**)를 시각화
* 데이터 흐름을 한눈에 파악할 수 있는 인터랙티브 차트

---

## 📈 HEMP Scoring Logic (5 Metrics)

단순 수치 데이터를 **가치 있는 정보**로 변환하기 위해 다음과 같은 자체 평가 알고리즘을 설계했습니다.

| 지표 (Metric) | 분석 내용 | 인사이트 (Meaning) |
| :--- | :--- | :--- |
| **Participation** | 전체 토큰 대비 투표율 | 커뮤니티의 능동적 참여도 |
| **Consensus** | 찬성/반대 비율 격차 | 합의 도출 능력 및 분열 정도 |
| **Stability** | 투표율의 표준편차 역산 | 거버넌스 참여의 지속성 |
| **VIB** | 상위 검증인 투표 집중도 | 탈중앙화 수준 (Validator Influence Balance) |
| **Success Rate** | 제안 통과 비율 | 의사결정 시스템의 효율성 |

> **💡 VIB (Validator Influence Balance)란?**<br/>
> 특정 소수 검증인(Validator)에게 투표권이 집중되는 현상을 감지하여, 탈중앙화가 잘 이루어진 체인일수록 높은 점수를 부여하는 독자적 지표입니다.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
* **Core**: React 19, Vite
* **State Management**: **Zustand** (복잡한 필터링 로직 및 전역 상태 최적화)
* **Visualization**: **D3.js** (Custom Charts), ECharts
* **Interaction**: @dnd-kit (Drag & Drop System)
* **Style**: TailwindCSS

### Backend
* **Server**: Node.js, Express
* **Language**: TypeScript
* **Testing**: Jest (Unit Test)
* **Security**: Helmet, CORS

### DevOps
* **Deployment**: Vercel (FE), Render (BE)

---

## 🚀 Core Architecture & Technical Challenges

본 프로젝트는 **v1(팀 프로젝트)의 Tech Lead**로서 설계한 아키텍처를 기반으로, **v2(1인 개발)**에서 백엔드 구축 및 고도화를 수행한 결과물입니다.

### 1. Architecture & State Management
* **Scalable Folder Structure**: 유지보수성을 고려하여 컴포넌트, 훅, 비즈니스 로직을 분리한 아키텍처 설계
* **Zustand Store Optimization**: 체인 선택(Slot) 및 필터링 로직을 전역 상태로 관리하여, 복잡한 대시보드 내 컴포넌트 간 **불필요한 리렌더링 방지**
* **User Experience First**: 서버 Cold Start 문제 해결을 위한 인스턴스 업그레이드 및 스켈레톤 UI 적용

### 2. Data Engineering & Pipeline
* **Node.js ETL Pipeline**: Raw CSV 데이터를 UI 렌더링에 최적화된 JSON 포맷으로 자동 변환하는 **전처리 스크립트(`scripts/process-all-csv.cjs`)** 구축
* **Semantic Data Logic**: 단순 통계가 아닌 Consensus, Stability 등 의미 있는 비즈니스 지표를 산출하는 알고리즘 직접 구현
* **Backend Automation**: Admin API를 통해 최신 데이터를 주기적으로 갱신할 수 있는 파이프라인 설계

### 3. High-Performance Visualization
* **Custom Interaction**: `@dnd-kit`을 커스터마이징하여 모바일에서도 부드러운 랭킹 조작(Drag & Drop) 경험 구현
* **Optimization**: 5,000개 이상의 데이터 포인트를 렌더링하면서도 60fps를 유지하도록 차트 라이브러리 최적화

---

## 📅 Project History

### HEMP v1.0 (Team Project)
* **Role**: **Tech Lead & Frontend** (5인 팀)
* 초기 아키텍처 설계, 데이터 전처리 파이프라인 구축, 핵심 인터랙션 구현

### HEMP v2.0 (Solo Development)
* **Role**: **Full-Stack Developer** (1인 개발)
* Node.js 백엔드 서버 구축, REST API 설계
* 모바일 반응형 디자인 적용, 테스트 코드(Jest) 작성 및 리팩토링

---

## 🔗 Links

* **Live Demo**: [https://hemp2.vercel.app](https://hemp2.vercel.app)
* **Backend Health**: [https://hemp2.onrender.com/health](https://hemp2.onrender.com/health)
* **GitHub**: [https://github.com/nhsngyn/HEMP2](https://github.com/nhsngyn/HEMP2)

---

## Developer

**Noh Sungyeon**
*Frontend Developer interested in Data Visualization & Blockchain UX*
