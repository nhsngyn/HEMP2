import React, { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import ChartTitle from './ChartTitle';

/**
 * ChartCard - 모든 차트를 감싸는 공통 카드 컴포넌트
 * 
 * @param {number} number - 차트 번호 (1, 2, 3)
 * @param {string} title - 차트 제목
 * @param {string} height - 카드 높이 (기본값: "auto")
 * @param {string} minHeight - 카드 최소 높이 (선택)
 * @param {string} maxHeight - 카드 최대 높이 (선택)
 * @param {boolean} noMaxHeight - 최대 높이 제한 제거 (선택)
 * @param {boolean} mobileNoMaxHeight - 모바일에서만 최대 높이 제한 제거 (선택)
 * @param {React.ReactNode} children - 차트 내용
 */
const ChartCard = ({ number, title, height = "auto", minHeight, maxHeight, noMaxHeight = false, mobileNoMaxHeight = false, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldRemoveMaxHeight = noMaxHeight || (mobileNoMaxHeight && isMobile);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg ${shouldRemoveMaxHeight ? 'max-h-none' : ''}`}
      style={{ 
        backgroundColor: COLORS.GRAYBG,
        padding: "20px",
        height: height === "auto" ? height : height,
        minHeight: minHeight,
        maxHeight: shouldRemoveMaxHeight ? 'none' : maxHeight,
        overflowAnchor: 'none'
      }}
    >
      <ChartTitle number={number} title={title} />
      {children}
    </div>
  );
};

export default ChartCard;
