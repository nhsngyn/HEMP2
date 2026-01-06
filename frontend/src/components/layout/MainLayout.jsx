import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../constants/colors";

const MainLayout = ({ leftSidebar, children }) => {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const CANVAS_WIDTH = 1680;
  const CANVAS_HEIGHT = 750;
  const CONTENT_RATIO = 0.8;
  const SIDEBAR_WIDTH = 260;

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 모바일에서는 사이드바를 제외하지 않음 (오버레이로 동작)
      const isMobile = viewportWidth < 768;
      const availableContentWidth = isMobile 
        ? viewportWidth 
        : viewportWidth - SIDEBAR_WIDTH;
      
      const targetContentWidth = CANVAS_WIDTH * CONTENT_RATIO;
      const targetContentHeight = CANVAS_HEIGHT;

      const scaleX = availableContentWidth / targetContentWidth;
      const scaleY = viewportHeight / targetContentHeight;
      let newScale = Math.min(scaleX, scaleY);

      // 모바일에서는 최소 스케일을 더 작게 허용 (0.4), 데스크톱은 0.5
      const minScale = isMobile ? 0.4 : 0.5;
      newScale = Math.max(minScale, Math.min(1.2, newScale));

      document.documentElement.style.setProperty("--scale", newScale);
      document.documentElement.style.setProperty("--base-font-size", `${16 * newScale}px`);

      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-screen h-screen flex overflow-hidden relative"
      style={{ backgroundColor: '#101010' }}
    >
      {/* 햄버거 메뉴 버튼 (모바일만) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 모바일 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 사이드바 - 데스크톱: flex item, 모바일: fixed 오버레이 */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-40 flex-shrink-0 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ 
          width: `${SIDEBAR_WIDTH}px`, 
          height: '100vh',
          backgroundColor: COLORS.GRAYBG 
        }}
      >
        {leftSidebar}
      </aside>

      {/* 메인 콘텐츠 - 모바일: 전체 너비, 데스크톱: flex-1 */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden w-full">
        <div
          id="main-scroll-container"
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            scrollBehavior: "smooth",
            backgroundColor: '#101010',
            width: '100%',
          }}
        >
          <div className="min-h-full w-full" style={{ backgroundColor: '#101010' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
