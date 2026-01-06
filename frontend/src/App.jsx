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
    isLoading,
    error,
    isInitialized,
    fetchChains,
  } = useChainStore();

  const prevSankeyFilterRef = useRef(null);
  const prevMainIdRef = useRef(selectedMainId);

  // 초기 데이터 로드
  useEffect(() => {
    if (!isInitialized) {
      fetchChains();
    }
  }, [isInitialized, fetchChains]);

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

  // 로딩 상태
  if (isLoading && !isInitialized) {
    return (
      <div className="w-screen h-screen flex items-center justify-center" style={{ backgroundColor: '#101010' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-body2-m">Loading HEMP Data...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error && !isInitialized) {
    return (
      <div className="w-screen h-screen flex items-center justify-center" style={{ backgroundColor: '#101010' }}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-title3-sb text-gray-100 mb-2">Failed to Load Data</h2>
          <p className="text-body2-m text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => fetchChains()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-body2-sb"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <MainLayout leftSidebar={<Sidebar />}>
      <>
        <section
          className="w-full flex flex-col"
          style={{
            paddingTop: "51px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px",
            gap: "12px",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          <header
            id="dashboard-header"
            className="shrink-0 flex flex-col"
            style={{ gap: "1px", marginBottom: "24px" }}
          >
            <p className="text-body2-sb text-gray-400">
              Deeper Analysis on Blockchains
            </p>
            <h1 className="text-title2-sb text-gray-100">
              HEMP: Health Evaluation Metric using Proposals
            </h1>
          </header>

          <div
            className="flex w-full"
            style={{ gap: "12px", height: "294px" }}
          >
            <div
              className="h-full w-[52%] relative overflow-hidden rounded-2xl shadow-lg"
              style={{ backgroundColor: COLORS.GRAYBG }}
            >
              <div className="absolute inset-0">
                <HempMap />
              </div>
            </div>

            <div
              className="h-full w-[48%] relative overflow-hidden rounded-2xl shadow-lg"
              style={{ backgroundColor: COLORS.GRAYBG }}
            >
              <RadarChart />
            </div>
          </div>

          <div
            className="w-full flex-1 relative overflow-hidden rounded-2xl shadow-lg"
            style={{ backgroundColor: COLORS.GRAYBG, marginBottom: "12px", minHeight: "480px" }}
          >
            <SankeyChart />
          </div>
        </section>

        <section
          id="proposals-section"
          className="w-full"
          style={{
            paddingLeft: "24px",
            paddingRight: "24px",
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
