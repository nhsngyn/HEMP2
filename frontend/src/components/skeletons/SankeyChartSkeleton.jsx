import React from 'react';

/**
 * SankeyChart Skeleton Component
 * 
 * 설계 원칙:
 * - 5개의 세로 컬럼으로 Sankey 단계 구조 암시
 * - 각 컬럼에 2-3개 노드 (직사각형)
 * - 연결선은 1-2개만 희미하게 (복잡도 최소화)
 * - 컬럼 라벨 위치만 표시
 */
const SankeyChartSkeleton = ({ showShimmer = true }) => {
  // 5개 컬럼 위치
  const columns = [
    { x: '10%', label: 'Type', nodes: 3 },
    { x: '28%', label: 'Status', nodes: 3 },
    { x: '46%', label: 'Participation', nodes: 3 },
    { x: '64%', label: 'Vote Comp.', nodes: 3 },
    { x: '82%', label: 'Speed', nodes: 3 },
  ];

  // 노드 높이 계산 (균등 분산)
  const getNodePositions = (columnIndex, nodeCount) => {
    const startY = 25; // %
    const endY = 70; // %
    const spacing = (endY - startY) / (nodeCount + 1);
    
    return Array.from({ length: nodeCount }, (_, i) => ({
      y: startY + spacing * (i + 1),
      height: 8 + Math.random() * 4, // 8-12% 랜덤 높이
    }));
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/20" />

      {/* SVG Sankey */}
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* 연결선 (1-2개만 희미하게) */}
        <defs>
          <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6B7280" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 예시 연결선 1 (첫 번째 컬럼 → 두 번째 컬럼) */}
        <path
          d="M 12 30 C 20 30, 26 35, 28 35 L 28 40 C 26 40, 20 45, 12 45 Z"
          fill="url(#linkGradient)"
          opacity="0.3"
          className={showShimmer ? 'animate-pulse' : ''}
          style={{ animationDelay: '0.5s' }}
        />

        {/* 예시 연결선 2 (두 번째 컬럼 → 세 번째 컬럼) */}
        <path
          d="M 30 50 C 38 50, 44 55, 46 55 L 46 60 C 44 60, 38 65, 30 65 Z"
          fill="url(#linkGradient)"
          opacity="0.25"
          className={showShimmer ? 'animate-pulse' : ''}
          style={{ animationDelay: '0.7s' }}
        />

        {/* 컬럼과 노드 */}
        {columns.map((column, colIndex) => {
          const nodePositions = getNodePositions(colIndex, column.nodes);
          const x = parseFloat(column.x);

          return (
            <g key={`column-${colIndex}`}>
              {/* 세로 라인 (컬럼 위치 표시) */}
              <line
                x1={x}
                y1="20"
                x2={x}
                y2="75"
                stroke="#4C5564"
                strokeWidth="0.2"
                opacity="0.2"
                className={showShimmer ? 'animate-pulse' : ''}
                style={{ animationDelay: `${colIndex * 0.1}s` }}
              />

              {/* 노드들 */}
              {nodePositions.map((node, nodeIndex) => (
                <rect
                  key={`node-${colIndex}-${nodeIndex}`}
                  x={x - 1}
                  y={node.y}
                  width="2"
                  height={node.height}
                  fill="#6B7280"
                  opacity="0.3"
                  rx="0.5"
                  className={showShimmer ? 'animate-pulse' : ''}
                  style={{ animationDelay: `${colIndex * 0.1 + nodeIndex * 0.05}s` }}
                />
              ))}

              {/* 컬럼 라벨 위치 (직사각형) */}
              <rect
                x={x - 4}
                y="12"
                width="8"
                height="3"
                fill="#6B7280"
                opacity="0.2"
                rx="0.5"
                className={showShimmer ? 'animate-pulse' : ''}
                style={{ animationDelay: `${colIndex * 0.15}s` }}
              />
            </g>
          );
        })}
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

export default SankeyChartSkeleton;

