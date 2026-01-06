import React from 'react';

/**
 * ChartTitle - 모든 차트에서 사용하는 공통 타이틀 컴포넌트
 * 
 * @param {number} number - 차트 번호 (1, 2, 3)
 * @param {string} title - 차트 제목
 */
const ChartTitle = ({ number, title }) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex items-center gap-3 px-4">
      <div
        className="flex items-center justify-center rounded-full text-caption1-sb"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: '#ffffff15',
          color: '#D1D5DB'
        }}
      >
        {number}
      </div>
      <h2
        className="text-body3-b"
        style={{ color: '#D1D5DB' }}
      >
        {title}
      </h2>
    </div>
  );
};

export default ChartTitle;

