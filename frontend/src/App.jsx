import React, { useEffect, useMemo, useRef } from "react";
import MainLayout from "./components/layout/MainLayout";
import Sidebar from "./components/layout/Sidebar";
import HempMap from "./components/charts/HempMap";
import SankeyChart from "./components/charts/SankeyChart";
import RadarChart from "./components/charts/RadarChart";
import ProposalsTable from "./components/charts/ProposalsTable";
import ChartCard from "./components/common/ChartCard";
import useChainStore from "./store/useChainStore";
import useUrlSync from "./hooks/useUrlSync";
import { COLORS } from "./constants/colors";

function App() {
  const {
    allChains,
    selectedMainId,
    selectedSubId1,
    selectedSubId2,
    sankeyFilter,
    fetchChains,
  } = useChainStore();

  // URL 동기화 (Deep Linking)
  useUrlSync();

  const prevSankeyFilterRef = useRef(null);
  const prevMainIdRef = useRef(selectedMainId);

  // 초기 데이터 로드 (한 번만)
  useEffect(() => {
    if (allChains.length === 0) {
      fetchChains();
    }
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  const mainChain = useMemo(
    () => allChains.find((c) => c.id === selectedMainId),
    [allChains, selectedMainId]
  );
  
  useEffect(() => {
    prevMainIdRef.current = selectedMainId;
  }, [selectedMainId]);

  useEffect(() => {
    if (!sankeyFilter) {
      prevSankeyFilterRef.current = null;
      return;
    }

    const prevFilter = prevSankeyFilterRef.current;
    if (
      prevFilter &&
      prevFilter.sourceColumn === sankeyFilter.sourceColumn &&
      prevFilter.targetColumn === sankeyFilter.targetColumn &&
      prevFilter.sourceName === sankeyFilter.sourceName &&
      prevFilter.targetName === sankeyFilter.targetName
    ) {
      return;
    }

    prevSankeyFilterRef.current = sankeyFilter;

    const scrollContainer = document.getElementById("main-scroll-container");
    const proposalsSection = document.getElementById("proposals-section");
    if (!scrollContainer || !proposalsSection) return;

    setTimeout(() => {
      scrollContainer.scrollTo({ top: proposalsSection.offsetTop - 20, behavior: "smooth" });
    }, 100);
  }, [sankeyFilter]);

  return (
    <MainLayout leftSidebar={<Sidebar />}>
      <>
        <section
          className="w-full flex flex-col"
          style={{
            paddingTop: "clamp(60px, 8vw, 25px)", // 모바일: 60px (햄버거 버튼 공간), 데스크톱: 25px
            paddingLeft: "clamp(12px, 3vw, 24px)",
            paddingRight: "clamp(12px, 3vw, 24px)",
            paddingBottom: "24px",
            gap: "12px",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          <header
            id="dashboard-header"
            className="shrink-0 flex flex-col"
            style={{ gap: "1px", marginBottom: "clamp(16px, 4vw, 24px)" }}
          >
            <p className="text-body2-sb md:text-body2-sb text-sm text-gray-400">
              Deeper Analysis on Blockchains
            </p>
            <h1 className="text-title2-sb md:text-title2-sb text-xl text-gray-100">
              HEMP: Health Evaluation Metric using Proposals
            </h1>
          </header>

          {/* 버블차트 + 레이더차트 - 데스크톱: 가로, 모바일: 세로 */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 w-full items-stretch"
            style={{ gap: "12px" }}
          >
            <ChartCard 
              number={1} 
              title="HEMP Map" 
              minHeight="300px" 
              maxHeight="400px"
              showInfo={true}
              infoText="Circle size reflects the volume of proposals.<br />Chains are categorized into four tiers based on their ranking."
            >
              <HempMap />
            </ChartCard>

            <ChartCard number={2} title="HEMP Comparison Radar Chart" minHeight="300px" maxHeight="400px" mobileNoMaxHeight={true}>
              <RadarChart />
            </ChartCard>
          </div>

          {/* 생키차트 - 가로 스크롤 가능하므로 더 크게 */}
          <div style={{ marginBottom: "clamp(12px, 3vw, 59px)" }}>
            <ChartCard number={3} title="Proposal Configuration Flow" height="clamp(400px, 80vh, 600px)" noMaxHeight={true}>
              <SankeyChart />
            </ChartCard>
          </div>
        </section>

        <section
          id="proposals-section"
          className="w-full"
          style={{
            paddingLeft: "clamp(12px, 3vw, 24px)",
            paddingRight: "clamp(12px, 3vw, 24px)",
            paddingBottom: "24px",
            boxSizing: "border-box",
          }}
        >
          <ProposalsTable mainChain={mainChain} />
        </section>
      </>
    </MainLayout>
  );
}

export default App;
