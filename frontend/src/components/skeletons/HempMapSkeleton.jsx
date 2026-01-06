import React from 'react';

/**
 * HempMap (BubbleChart) Skeleton Component
 * 
 * 설계 원칙:
 * - 5-7개의 원형으로 버블 차트 암시
 * - 크기 다양성으로 score 차이 표현
 * - 축 라인으로 차트 구조 힌트
 * - shimmer 애니메이션으로 로딩 중임을 표현
 */
const HempMapSkeleton = ({ showShimmer = true }) => {
  // 버블 데이터 (크기와 위치는 고정값 사용 - 일관성 있는 UX)
  const bubbles = [
    // 큰 버블 (주요 체인)
    { size: 80, x: '25%', y: '30%', delay: '0s' },
    { size: 72, x: '65%', y: '45%', delay: '0.1s' },
    { size: 68, x: '45%', y: '60%', delay: '0.2s' },
    
    // 중간 버블
    { size: 56, x: '75%', y: '25%', delay: '0.3s' },
    { size: 52, x: '35%', y: '75%', delay: '0.4s' },
    
    // 작은 버블 (서브 체인)
    { size: 44, x: '82%', y: '65%', delay: '0.5s' },
    { size: 40, x: '15%', y: '55%', delay: '0.6s' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 (차트 영역 암시) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30" />
      
      {/* 축 라인 (X, Y축 힌트) */}
      <div className="absolute inset-0">
        {/* Y축 (세로) */}
        <div 
          className="absolute left-12 top-8 bottom-8 w-[1px] bg-gray-700/40"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, transparent 0%, #4C5564 50%, transparent 100%)'
          }}
        />
        
        {/* X축 (가로) */}
        <div 
          className="absolute left-8 right-8 bottom-12 h-[1px] bg-gray-700/40"
          style={{ 
            backgroundImage: 'linear-gradient(to right, transparent 0%, #4C5564 50%, transparent 100%)'
          }}
        />
        
        {/* 축 라벨 영역 (텍스트는 없지만 공간만 표시) */}
        <div className="absolute left-2 top-4 w-8 h-4 bg-gray-700/20 rounded" />
        <div className="absolute bottom-2 right-4 w-12 h-4 bg-gray-700/20 rounded" />
      </div>

      {/* 버블들 */}
      <div className="absolute inset-0">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`absolute rounded-full bg-gray-700/30 border border-gray-600/30 ${
              showShimmer ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: bubble.x,
              top: bubble.y,
              transform: 'translate(-50%, -50%)',
              animationDelay: showShimmer ? bubble.delay : '0s',
              animationDuration: '2s',
            }}
          >
            {/* 내부 글로우 효과 */}
            <div className="absolute inset-2 rounded-full bg-gray-600/10" />
            
            {/* 중앙 점 (체인 로고 위치 암시) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gray-600/40" />
            </div>
          </div>
        ))}
      </div>

      {/* shimmer 오버레이 (optional) */}
      {showShimmer && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/5 to-transparent animate-shimmer"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s infinite',
          }}
        />
      )}

      {/* 로딩 텍스트 (optional - 중앙 하단) */}
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

export default HempMapSkeleton;

