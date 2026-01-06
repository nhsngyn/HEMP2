import React, { useEffect, useMemo, useRef } from "react";
import MainLayout from "./components/layout/MainLayout";
import Sidebar from "./components/layout/Sidebar";
import HempMap from "./components/charts/HempMap";
import SankeyChart from "./components/charts/SankeyChart";
import RadarChart from "./components/charts/RadarChart";
import ProposalsTable from "./components/charts/ProposalsTable";
import useChainStore from "./store/useChainStore";
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
            paddingTop: "51px",
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
            className="flex flex-col md:flex-row w-full"
            style={{ gap: "12px" }}
          >
          <div
            className="w-full md:w-[52%] relative overflow-hidden rounded-2xl shadow-lg"
            style={{ 
              backgroundColor: COLORS.GRAYBG, 
              padding: "20px 0",
              height: "350px",
              minHeight: "300px"
            }}
          >
            <HempMap />
          </div>

          <div
            className="w-full md:w-[48%] relative overflow-hidden rounded-2xl shadow-lg"
            style={{ 
              backgroundColor: COLORS.GRAYBG, 
              padding: "20px 0",
              height: "350px",
              minHeight: "300px"
            }}
          >
            <RadarChart />
          </div>
          </div>

          {/* 생키차트 - 데스크톱: viewport 기반, 모바일: 고정 높이 */}
          <div
            className="w-full relative overflow-hidden rounded-2xl shadow-lg shrink-0"
            style={{ 
              backgroundColor: COLORS.GRAYBG, 
              marginBottom: "59px",
              padding: "20px 0" 
            }}
          >
            <div className="hidden md:block w-full" style={{ height: "calc(100vh - 51px - 88px - 350px - 12px - 59px)", minHeight: "300px" }}>
              <SankeyChart />
            </div>
            <div className="block md:hidden w-full" style={{ height: "400px" }}>
              <SankeyChart />
            </div>
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
