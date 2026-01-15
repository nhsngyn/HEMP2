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
 * @param {boolean} showInfo - 인포메이션 아이콘 표시 여부 (선택)
 * @param {string} infoText - 인포메이션 툴팁 텍스트 (선택)
 * @param {React.ReactNode} children - 차트 내용
 */
const ChartCard = ({ 
  number, 
  title, 
  height = "auto", 
  minHeight, 
  maxHeight, 
  noMaxHeight = false, 
  mobileNoMaxHeight = false, 
  showInfo = false,
  infoText = "",
  children 
}) => {
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
      className={`relative rounded-2xl shadow-lg ${shouldRemoveMaxHeight ? 'max-h-none' : ''}`}
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
      
      {showInfo && (
        <div 
          className="absolute group"
          style={{ top: '20px', right: '20px', zIndex: 9999 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-help opacity-70 hover:opacity-100 transition-opacity"
          >
            <circle cx="12" cy="12" r="7.5" stroke="#6D7380" />
            <circle cx="12" cy="8.2832" r="0.75" fill="#6D7380" />
            <rect x="11.25" y="10.166" width="1.5" height="6.30078" rx="0.75" fill="#6D7380" />
          </svg>

          {infoText && (
            <div
              className="
                absolute
                bottom-full
                right-0
                mb-2
                w-max
                max-w-[370px]
                p-2
                rounded-lg
                shadow-xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-200
                pointer-events-none
              "
              style={{ backgroundColor: COLORS.GRAY700, zIndex: 9999 }}
            >
              <p
                className="font-suit text-[12px] font-medium leading-[140%] text-left"
                style={{ color: COLORS.GRAY300 }}
                dangerouslySetInnerHTML={{ __html: infoText }}
              />
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-hidden" style={{ height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
