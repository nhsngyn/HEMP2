import React from 'react';

/**
 * RadarChart Skeleton Component
 * 
 * 설계 원칙:
 * - 5각형 격자로 레이더 차트 구조 암시
 * - 1-2개의 폴리곤으로 데이터 영역 표현
 * - 축 라벨 영역만 표시 (텍스트 없음)
 * - 단순하지만 명확한 레이더 차트 형태
 */
const RadarChartSkeleton = ({ showShimmer = true }) => {
  // 5각형 격자를 위한 각도 계산
  const angles = [0, 72, 144, 216, 288]; // 5개 축
  const centerX = 50; // 중심 X (%)
  const centerY = 50; // 중심 Y (%)
  
  // 격자 레벨 (3개 동심원)
  const gridLevels = [60, 40, 20]; // 반지름 (%)

  // 격자 포인트 계산
  const getPoint = (angle, radius) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  // 폴리곤 경로 생성
  const createPolygonPath = (radius) => {
    const points = angles.map(angle => getPoint(angle, radius));
    return points.map(p => `${p.x},${p.y}`).join(' ');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/20" />

      {/* SVG 레이더 차트 */}
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4">
        {/* 격자 (동심 5각형) */}
        {gridLevels.map((radius, index) => (
          <polygon
            key={`grid-${index}`}
            points={createPolygonPath(radius)}
            fill="none"
            stroke="#4C5564"
            strokeWidth="0.3"
            opacity="0.3"
            className={showShimmer ? 'animate-pulse' : ''}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}

        {/* 축 라인 */}
        {angles.map((angle, index) => {
          const endPoint = getPoint(angle, 65);
          return (
            <line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#4C5564"
              strokeWidth="0.3"
              opacity="0.4"
              className={showShimmer ? 'animate-pulse' : ''}
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          );
        })}

        {/* 데이터 폴리곤 1 (반투명) */}
        <polygon
          points={createPolygonPath(45)}
          fill="#6B7280"
          fillOpacity="0.15"
          stroke="#6B7280"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          className={showShimmer ? 'animate-pulse' : ''}
          style={{ animationDelay: '0.3s' }}
        />

        {/* 데이터 폴리곤 2 (더 작고 반투명) */}
        <polygon
          points={createPolygonPath(30)}
          fill="#9CA3AF"
          fillOpacity="0.1"
          stroke="#9CA3AF"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          className={showShimmer ? 'animate-pulse' : ''}
          style={{ animationDelay: '0.5s' }}
        />

        {/* 축 라벨 위치 (원형 표시) */}
        {angles.map((angle, index) => {
          const labelPoint = getPoint(angle, 72);
          return (
            <circle
              key={`label-${index}`}
              cx={labelPoint.x}
              cy={labelPoint.y}
              r="2"
              fill="#6B7280"
              opacity="0.3"
              className={showShimmer ? 'animate-pulse' : ''}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            />
          );
        })}

        {/* 중심점 */}
        <circle
          cx={centerX}
          cy={centerY}
          r="1.5"
          fill="#9CA3AF"
          opacity="0.5"
          className={showShimmer ? 'animate-pulse' : ''}
        />
      </svg>

      {/* shimmer 오버레이 */}
      {showShimmer && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/5 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s infinite',
          }}
        />
      )}

      {/* 로딩 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};

export default RadarChartSkeleton;

