import { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';
import useChainStore from '../../store/useChainStore';
import { COLORS } from '../../constants/colors';
import ChartTitle from '../common/ChartTitle';
import RadarChartSkeleton from '../skeletons/RadarChartSkeleton';

const METRICS = [
  { key: 'vib', label: 'VIB (Validator Influence Balance)', maxValue: 26 },
  { key: 'participation', label: 'Participation', maxValue: 26 },
  { key: 'rejection', label: 'Success Rate', maxValue: 16 },
  { key: 'stability', label: 'Stability', maxValue: 16 },
  { key: 'consensus', label: 'Consensus', maxValue: 16 },
];

const CHART_CONFIG = {
  GRID_LEVELS: 5,
  RADAR_SIZE: 240, // 가장 큰 정오각형 폴리곤의 가로세로 크기 (174 -> 240, 약 38% 증가)
  TOTAL_WIDTH: 315, // 라벨 포함 전체 가로 크기
  TOTAL_HEIGHT: 213, // 라벨 포함 전체 세로 크기
  TOP_MARGIN: 20, // 타이틀과 VIB 요소 사이의 여백
};

const CHAIN_CONFIGS = [
  { key: 'sub2', color: COLORS.SUB2, opacity: 0.2, strokeWidth: 1.5, strokeOpacity: 0.6 },
  { key: 'sub1', color: COLORS.SUB1, opacity: 0.2, strokeWidth: 1.5, strokeOpacity: 0.6 },
  { key: 'main', color: COLORS.MAIN, opacity: 0.2, strokeWidth: 1.5, strokeOpacity: 0.6 },
];

const RadarChart = () => {
  const svgRef = useRef(null);
  const radarContainerRef = useRef(null);
  const { allChains, selectedMainId, selectedSubId1, selectedSubId2, isLoading } = useChainStore();
  
  const [showSkeleton, setShowSkeleton] = useState(true);

  // 체인 데이터 배열로 통합
  const chains = useMemo(() => {
    const findChain = (id) => allChains.find(c => c.id === id);
    return {
      main: findChain(selectedMainId),
      sub1: findChain(selectedSubId1),
      sub2: findChain(selectedSubId2),
    };
  }, [allChains, selectedMainId, selectedSubId1, selectedSubId2]);

  const { main: mainChain, sub1: subChain1, sub2: subChain2 } = chains;

  // 지표별 최대값 헬퍼
  const getMetricMax = (metricKey) => {
    const metric = METRICS.find((m) => m.key === metricKey);
    return metric?.maxValue ?? 20;
  };

  // 메트릭 값 가져오기 (지표별 만점 기준으로 캡)
  const getValue = (chain, metricKey) => {
    if (!chain) return 0;
    const raw = chain[metricKey];
    const max = getMetricMax(metricKey);
    if (raw == null) return 0;
    return Math.min(raw, max);
  };

  // 모든 체인의 중앙값 계산
  const medianValues = useMemo(() => {
    if (!allChains || allChains.length === 0) {
      return METRICS.reduce((acc, metric) => {
        acc[metric.key] = 0;
        return acc;
      }, {});
    }

    const medians = {};
    METRICS.forEach(metric => {
      const values = allChains
        .map(chain => getValue(chain, metric.key))
        .filter(v => v > 0)
        .sort((a, b) => a - b);

      if (values.length === 0) {
        medians[metric.key] = 0;
      } else if (values.length % 2 === 0) {
        // 짝수 개일 때 중간 두 값의 평균
        const mid = values.length / 2;
        medians[metric.key] = (values[mid - 1] + values[mid]) / 2;
      } else {
        // 홀수 개일 때 중간 값
        medians[metric.key] = values[Math.floor(values.length / 2)];
      }
    });

    return medians;
  }, [allChains]);

  // 중앙값으로 만든 가상 체인 객체
  const medianChain = useMemo(() => {
    return {
      name: 'Median',
      ...medianValues
    };
  }, [medianValues]);

  // Skeleton 전환 로직 (최소 300ms 대기)
  useEffect(() => {
    if (!isLoading && allChains.length > 0) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      setShowSkeleton(true);
    }
  }, [isLoading, allChains.length]);

  // 레이더 차트 그리기
  useEffect(() => {
    if (!svgRef.current || !radarContainerRef.current) return;

    const drawChart = () => {
      if (!svgRef.current || !radarContainerRef.current) return;

      d3.select(svgRef.current).selectAll('*').remove();

      const containerWidth = radarContainerRef.current.clientWidth;
      const containerHeight = radarContainerRef.current.clientHeight;

      if (containerWidth === 0 || containerHeight === 0) {
        setTimeout(drawChart, 100);
        return;
      }

      const svg = d3.select(svgRef.current);
      svg.attr('width', containerWidth).attr('height', containerHeight);

      // 차트 설정 - 반응형 레이더 크기 계산
      // 컨테이너 크기에 맞춰 레이더 크기 조정
      const labelGap = 8; // 정오각형 모서리와 라벨 끝 사이 간격
      const labelSpace = 50; // 라벨을 위한 공간 (양쪽)
      
      // 컨테이너에서 라벨 공간을 빼고 남은 공간의 80%를 레이더 크기로 사용
      const availableWidth = containerWidth - labelSpace * 2;
      const availableHeight = containerHeight - labelSpace * 2;
      const radarSize = Math.min(availableWidth, availableHeight, 300) * 0.8; // 최대 300px
      
      const radius = radarSize / 2;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      
      // 라벨 오프셋 계산
      const totalPadding = (CHART_CONFIG.TOTAL_WIDTH - CHART_CONFIG.RADAR_SIZE) / 2;
      const labelOffset = totalPadding - labelGap;
      
      const numAxes = METRICS.length;
      const angleStep = (2 * Math.PI) / numAxes;

      // 스케일 생성 (0~지표별 최대값 → 0~radius)
      const scales = METRICS.map(metric =>
        d3.scaleLinear().domain([0, metric.maxValue]).range([0, radius])
      );

      // 라인 생성 함수
      const createLine = () => d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveLinearClosed);

      // 그리드 그리기
      const drawGrid = () => {
        const gridGroup = svg.append('g').attr('class', 'grid');
        for (let level = 1; level <= CHART_CONFIG.GRID_LEVELS; level++) {
          const levelRadius = (radius * level) / CHART_CONFIG.GRID_LEVELS;
          const points = Array.from({ length: numAxes }, (_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return [
              centerX + Math.cos(angle) * levelRadius,
              centerY + Math.sin(angle) * levelRadius
            ];
          });

          gridGroup.append('path')
            .attr('d', createLine()(points))
            .attr('fill', 'none')
            .attr('stroke', '#374151')
            .attr('stroke-width', 1)
            .attr('opacity', 0.3);
        }
      };

      // 축 그리기
      const drawAxes = () => {
        const axesGroup = svg.append('g').attr('class', 'axes');
        METRICS.forEach((metric, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = centerX + Math.cos(angle) * radius;
          const endY = centerY + Math.sin(angle) * radius;

          // 축 선
          axesGroup.append('line')
            .attr('x1', centerX).attr('y1', centerY)
            .attr('x2', endX).attr('y2', endY)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1)
            .attr('opacity', 0.5);

          // 축 라벨 (정오각형 모서리로부터 labelOffset 거리)
          const labelX = centerX + Math.cos(angle) * (radius + labelOffset);
          const labelY = centerY + Math.sin(angle) * (radius + labelOffset);

          if (metric.key === 'vib') {
            // VIB는 두 줄로 표시
            const textGroup = axesGroup.append('text')
              .attr('x', labelX)
              .attr('y', labelY)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .attr('fill', '#9ca3af')
              .attr('font-family', 'SUIT')
              .attr('font-size', '12px')
              .attr('font-weight', '500')
              .attr('letter-spacing', '-0.24px'); // -0.02em = -0.24px at 12px

            textGroup.append('tspan')
              .attr('x', labelX)
              .attr('dy', '0em')
              .text('VIB (Validator');

            textGroup.append('tspan')
              .attr('x', labelX)
              .attr('dy', '1.3em') // 130% line-height
              .text('Influence Balance)');
          } else {
            // 다른 메트릭은 한 줄로 표시 (caption1-m)
            axesGroup.append('text')
              .attr('x', labelX)
              .attr('y', labelY)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .attr('fill', '#9ca3af')
              .attr('font-family', 'SUIT')
              .attr('font-size', '12px')
              .attr('font-weight', '500')
              .attr('letter-spacing', '-0.24px') // -0.02em = -0.24px at 12px
              .text(metric.label);
          }
        });
      };

      // 폴리곤 생성 함수
      const createPolygon = (chain, useCenterPoint = false, useDefaultValue = false) => {
        if (!chain) return null;

        const points = METRICS.map((metric, i) => {
          let distance;
          if (useCenterPoint) {
            // 각 축의 중앙~약간 위에 배치 (0.6, 즉 60%)
            distance = radius * 0.6;
          } else if (useDefaultValue) {
            // 기본값 15 사용 (각 지표 만점 대비 비율로 정규화)
            const normalized = 15 / metric.maxValue; // 0~1
            distance = normalized * radius;
          } else {
            // 실제 값 반영 (0~1 범위로 정규화 후 반지름에 매핑)
            const value = getValue(chain, metric.key);
            const normalized = metric.maxValue > 0 ? value / metric.maxValue : 0; // 0~1
            distance = normalized * radius;
          }
          const angle = i * angleStep - Math.PI / 2;
          return [
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance
          ];
        });

        return { points, line: createLine() };
      };

      // 데이터 폴리곤 그리기
      const drawPolygons = () => {
        const dataGroup = svg.append('g').attr('class', 'data');

        // 중앙값 폴리곤을 항상 먼저 그리기 (배경 레이어)
        const hasSelectedChain = !!mainChain;
        // 항상 실제 median 값 반영
        const medianPolygon = createPolygon(medianChain, false, false);
        if (medianPolygon) {
          const medianStrokeColor = hasSelectedChain ? COLORS.GRAY500 : COLORS.GRAY300;
          const medianStrokeWidth = hasSelectedChain ? 0.7 : 1;

          dataGroup.append('path')
            .attr('d', medianPolygon.line(medianPolygon.points))
            .attr('fill', '#9CA3AE')
            .attr('fill-opacity', 0.03)
            .attr('stroke', medianStrokeColor)
            .attr('stroke-width', medianStrokeWidth)
            .attr('stroke-dasharray', '5,5')
            .attr('stroke-opacity', 0.8)

            .lower(); // 배경 레이어로 이동
        }

        // 메인 체인이 있으면 메인/서브 체인 폴리곤 그리기 (위 레이어)
        if (mainChain) {
          const chainMap = { sub2: subChain2, sub1: subChain1, main: mainChain };
          CHAIN_CONFIGS.forEach(config => {
            const chain = chainMap[config.key];
            const polygon = createPolygon(chain);
            if (polygon) {
              // 초기에는 중심에서 아주 작은 폴리곤으로 시작
              const initialPoints = polygon.points.map(([x, y]) => {
                const dx = x - centerX;
                const dy = y - centerY;
                const factor = 0.1; // 10% 크기에서 시작
                return [centerX + dx * factor, centerY + dy * factor];
              });

              const path = dataGroup.append('path')
                .attr('d', polygon.line(initialPoints))
                .attr('fill', config.color)
                .attr('fill-opacity', config.opacity)
                .attr('stroke', config.color)
                .attr('stroke-width', config.strokeWidth)
                .attr('stroke-opacity', config.strokeOpacity);

              // 메인/서브 체인이 선택되거나 변경될 때 부드럽게 확장되는 애니메이션
              path
                .transition()
                .duration(700)
                .ease(d3.easeCubicOut)
                .attr('d', polygon.line(polygon.points));
            }
          });
        }
      };

      // 차트 그리기 실행
      drawGrid();
      drawAxes();
      drawPolygons();
    };

    // Initial render
    drawChart();

    // Window resize 이벤트
    const handleResize = () => drawChart();
    window.addEventListener('resize', handleResize);

    // ResizeObserver로 컨테이너 크기 변경 감지 (더 정확함)
    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });

    if (radarContainerRef.current) {
      resizeObserver.observe(radarContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [mainChain, subChain1, subChain2, medianChain]);

  // 점수 계산 (메인 체인이 없으면 중앙값 사용)
  const { scorePercentage, displayChain } = useMemo(() => {
    const chain = mainChain || medianChain;
    if (!chain) return { scorePercentage: 0, displayChain: null };
    const total = METRICS.reduce((sum, metric) => sum + getValue(chain, metric.key), 0);
    const maxTotal = METRICS.reduce((sum, metric) => sum + metric.maxValue, 0);
    return {
      scorePercentage: Math.round((total / maxTotal) * 100),
      displayChain: chain
    };
  }, [mainChain, medianChain]);


  return (
    <div className="w-full h-full relative">
      <ChartTitle number={2} title="HEMP Comparison Radar Chart" />
      
      {/* Skeleton 오버레이 (로딩 중에만 표시) */}
      {showSkeleton && (
        <div className="absolute inset-0 z-10 transition-opacity duration-300" style={{ top: '20px' }}>
          <RadarChartSkeleton showShimmer={true} />
        </div>
      )}

      {/* 실제 차트 (항상 렌더링) */}
      <div 
        className="transition-opacity duration-300 md:absolute md:overflow-y-auto overflow-x-hidden md:overflow-hidden" 
        style={{ 
          opacity: showSkeleton ? 0 : 1, 
          top: '20px',
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div
          className="radar_arena w-full flex flex-col md:flex-row h-full"
          style={{
            gap: '24px',
            padding: '20px 24px'
          }}
        >
            {/* 레이더 차트 - 모바일: 전체 너비, 데스크톱: 60% */}
            <div 
              ref={radarContainerRef} 
              className="w-full md:w-[60%] shrink-0 flex items-center justify-center" 
              style={{ minHeight: '300px', height: 'auto' }}
            >
              <svg ref={svgRef} className="w-full h-full" />
            </div>

        {/* Divider - 모바일: 가로선, 데스크톱: 세로선 */}
        <div className="md:hidden border-t border-gray-700 w-full" style={{ margin: '0 -24px', width: 'calc(100% + 48px)' }}></div>
        <div className="hidden md:block border-r border-gray-700" style={{ height: '100%' }}></div>

        {/* 점수 정보 - 모바일: 전체 너비, 데스크톱: 40% */}
        <div
          className="info_arena w-full md:w-[40%] flex flex-col"
          style={{
            gap: '20px',
            paddingTop: '0px',
            paddingBottom: '20px',
            boxSizing: 'border-box'
          }}
        >
          {/* Chain name badge */}
          <div className="flex justify-start">
            <div
              className="rounded-md px-3 py-1"
              style={{
                backgroundColor: '#282a2e'
              }}
            >
              <span
                style={{
                  fontFamily: 'SUIT',
                  fontWeight: 500,
                  fontSize: 'clamp(13px, 3vw, 14px)',
                  lineHeight: '140%',
                  letterSpacing: '-0.02em',
                  color: mainChain ? COLORS.MAIN : '#9ca3af'
                }}
              >
                {mainChain ? mainChain.name : 'Median'}
              </span>
            </div>
          </div>

          {/* HEMP Score */}
          <div className="flex flex-col gap-3">
            <p style={{ fontFamily: 'SUIT', fontWeight: 700, fontSize: '18px', lineHeight: '145%', letterSpacing: '-0.01em', color: '#E8EAED' }}>
              HEMP Score
            </p>
            <div className="flex items-baseline gap-2 justify-end">
              <span
                style={{
                  fontFamily: 'SUIT',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 6vw, 64px)',
                  lineHeight: '110%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: mainChain ? COLORS.MAIN : '#FFFFFF'
                }}
              >
                {scorePercentage}
              </span>
              <span style={{ fontFamily: 'SUIT', fontWeight: 500, fontSize: 'clamp(12px, 3vw, 14px)', lineHeight: '140%', letterSpacing: '-0.02em', color: '#4C5564' }}>
                /100
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Individual metric scores */}
          <div className="flex flex-col" style={{ gap: '6px' }}>
            {METRICS.map(metric => {
              const value = getValue(displayChain, metric.key);
              const displayLabel = metric.key === 'vib' ? 'VIB' : metric.label;
              return (
                <div
                  key={metric.key}
                  className="flex justify-between items-center"
                >
                  <span style={{ fontFamily: 'SUIT', fontWeight: 500, fontSize: 'clamp(13px, 3vw, 14px)', lineHeight: '140%', letterSpacing: '-0.02em', color: '#9CA3AE' }}>
                    {displayLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span style={{ fontFamily: 'SUIT', fontWeight: 500, fontSize: 'clamp(15px, 3.5vw, 16px)', lineHeight: '140%', letterSpacing: '-0.02em', minWidth: '40px', textAlign: 'right', color: '#FFFFFF' }}>
                      {Math.round(value)}
                    </span>
                    <span style={{ fontFamily: 'SUIT', fontWeight: 500, fontSize: 'clamp(13px, 3vw, 14px)', lineHeight: '140%', letterSpacing: '-0.02em', color: '#4C5564' }}>
                      /{metric.maxValue}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </div >
  );
};

export default RadarChart;
