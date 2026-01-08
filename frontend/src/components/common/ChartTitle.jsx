import React from 'react';

/**
 * ChartTitle - 모든 차트에서 사용하는 공통 타이틀 컴포넌트
 * 
 * @param {number} number - 차트 번호 (1, 2, 3)
 * @param {string} title - 차트 제목
 */
const ChartTitle = ({ number, title }) => {
  return (
    <div className="absolute z-10 flex items-center gap-3" style={{ top: '20px', left: '20px' }}>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: '#ffffff15',
          color: '#D1D5DB',
          fontSize: '12px',
          lineHeight: '130%',
          letterSpacing: '-0.02em',
          fontWeight: '600'
        }}
      >
        {number}
      </div>
      <h2
        style={{ 
          color: '#D1D5DB',
          fontSize: '14px',
          lineHeight: '140%',
          letterSpacing: '-0.02em',
          fontWeight: '700'
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default ChartTitle;

